Add-Type -AssemblyName System.Drawing
$imgPath = "d:\building-softwares\ceo-website\assets\elladria-logo.png"
$img = New-Object System.Drawing.Bitmap($imgPath)
$minX = $img.Width
$minY = $img.Height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $img.Height; $y++) {
    for ($x = 0; $x -lt $img.Width; $x++) {
        $p = $img.GetPixel($x, $y)
        if ($p.A -gt 15) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$width = $maxX - $minX + 1
$height = $maxY - $minY + 1
$rect = New-Object System.Drawing.Rectangle($minX, $minY, $width, $height)
$cropped = $img.Clone($rect, $img.PixelFormat)
$img.Dispose()
$outPath = "d:\building-softwares\ceo-website\assets\elladria-logo-clean.png"
$cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
Write-Host "Success cropping logo to: $width x $height"
