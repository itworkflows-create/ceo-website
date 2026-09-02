Add-Type -AssemblyName System.Drawing
$imgPath = "d:\building-softwares\ceo-website\assets\elladria-logo-clean.png"
$img = New-Object System.Drawing.Bitmap($imgPath)

$outImg = New-Object System.Drawing.Bitmap($img.Width, $img.Height)

for ($y = 0; $y -lt $img.Height; $y++) {
    for ($x = 0; $x -lt $img.Width; $x++) {
        $p = $img.GetPixel($x, $y)
        if ($p.A -gt 10) {
            # Check if this pixel is near white/light (part of the white "Lanka" text)
            if ($p.R -gt 220 -and $p.G -gt 220 -and $p.B -gt 220) {
                # Change to executive dark navy/slate
                $newColor = [System.Drawing.Color]::FromArgb($p.A, 17, 35, 71)
                $outImg.SetPixel($x, $y, $newColor)
            } else {
                $outImg.SetPixel($x, $y, $p)
            }
        } else {
            $outImg.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$img.Dispose()
$outPath = "d:\building-softwares\ceo-website\assets\elladria-logo-dark.png"
$outImg.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$outImg.Dispose()
Write-Host "Created elladria-logo-dark.png with dark 'Lanka' text for white backgrounds."
