Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('D:\aerosparke-site\images\why-visual-1.png')

# In why-visual-1.png (232 x 368):
# Text "the" is at x < 60, y > 240.
# The background at y=250..368, x=65..75 is mountain haze/gradient.
# Let's inspect the pixels in x=0..60, y=240..368
# If we replace any pixel at x < 60 where brightness is dark (text),
# or even better: fill x=0..60 at y=240..368 with horizontal extension of column x=65!

for ($y = 240; $y -lt $img.Height; $y++) {
    $refPx = $img.GetPixel(65, $y)
    for ($x = 0; $x -lt 65; $x++) {
        # Calculate smooth alpha fade
        $t = $x / 65.0
        $alpha = (3.0 * [Math]::Pow($t, 2)) - (2.0 * [Math]::Pow($t, 3))
        $a = [int]([Math]::Round($alpha * 255))
        $newPx = [System.Drawing.Color]::FromArgb($a, $refPx.R, $refPx.G, $refPx.B)
        $img.SetPixel($x, $y, $newPx)
    }
}

$img.Save('D:\aerosparke-site\test_clean_v1.png')
$img.Dispose()
Write-Host "Saved test_clean_v1.png"
