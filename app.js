/**
 * MALINDA - EXECUTIVE CEO & FOUNDER ADVISORY WEBSITE
 * Interactive Application Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initHeader();
  initMobileMenu();
  initTestimonialsSlider();
  initBookingWidget();
  initVideoModal();
  initSmoothScroll();
});

/* ---------------- 1. STICKY HEADER & SCROLL SPY ---------------- */
function initHeader() {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = document.querySelectorAll('.desktop-nav .nav-item');

  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let currentSection = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ---------------- 2. MOBILE DRAWER MENU ---------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta a');

  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
}

/* ---------------- 3. TESTIMONIALS SLIDER ---------------- */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prev-testi');
  const nextBtn = document.getElementById('next-testi');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateSlider(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateSlider(currentIndex + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      updateSlider(idx);
    });
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        updateSlider(currentIndex + 1); // Swiped Left -> Next
      } else {
        updateSlider(currentIndex - 1); // Swiped Right -> Prev
      }
    }
  }
}

/* ---------------- 4. INTERACTIVE BOOKING SCHEDULER ---------------- */
function initBookingWidget() {
  const datePills = document.querySelectorAll('.date-pill');
  const timeSlots = document.querySelectorAll('.time-slot');
  const bookingForm = document.getElementById('booking-form');
  const successBox = document.getElementById('booking-success');
  const confirmedEmail = document.getElementById('confirmed-email');
  const confirmedSlot = document.getElementById('confirmed-slot');
  const bookAnotherBtn = document.getElementById('book-another-btn');

  let selectedDate = 'Wed, Sep 2';
  let selectedTime = '10:00 AM';

  // Date selection
  datePills.forEach(pill => {
    pill.addEventListener('click', () => {
      datePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const numSpan = pill.querySelector('.day-num');
      selectedDate = numSpan ? numSpan.textContent.trim() : pill.textContent.trim();
    });
  });

  // Time slot selection
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
      selectedTime = slot.getAttribute('data-time') || slot.textContent.trim();
    });
  });

  // Form Submission
  if (bookingForm && successBox) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('founder-name');
      const emailInput = document.getElementById('founder-email');
      const companyInput = document.getElementById('company-url');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !companyInput.value.trim()) {
        alert('Please complete all required fields.');
        return;
      }

      const submitBtn = document.getElementById('submit-booking-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Reserving Consultation Slot...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Populate success message
        if (confirmedEmail) confirmedEmail.textContent = emailInput.value.trim();
        if (confirmedSlot) confirmedSlot.textContent = `${selectedDate} at ${selectedTime}`;

        // Swap view
        bookingForm.style.display = 'none';
        successBox.style.display = 'block';
      }, 700);
    });
  }

  // Book Another Slot button
  if (bookAnotherBtn && bookingForm && successBox) {
    bookAnotherBtn.addEventListener('click', () => {
      successBox.style.display = 'none';
      bookingForm.style.display = 'flex';
      bookingForm.reset();
    });
  }
}

/* ---------------- 5. VIDEO OVERVIEW MODAL ---------------- */
function initVideoModal() {
  const openBtn = document.getElementById('open-video-modal');
  const closeBtn = document.getElementById('close-video-modal');
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('modal-video-frame');

  if (!openBtn || !modal || !iframe) return;

  const videoSrc = iframe.getAttribute('data-src') || 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1';

  function openModal() {
    iframe.setAttribute('src', videoSrc);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    iframe.setAttribute('src', '');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ---------------- 6. SMOOTH SCROLL SPY & LINKS ---------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Footer Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
