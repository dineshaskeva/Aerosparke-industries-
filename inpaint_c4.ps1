Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('D:\aerosparke-site\images\why-visual-4.png')
Write-Host "Card 4 image size: $($img.Width) x $($img.Height)"

# In why-visual-4.png (248 x 368):
# "scope" is at x: 0..75, y: 215..260.
# The background around "scope" is the river water (R: ~100..140, G: ~150..180, B: ~180..210)
# Text pixels are dark grey/navy: R < 70, G < 80, B < 90.

for ($y = 200; $y -le 280; $y++) {
    for ($x = 0; $x -le 80; $x++) {
        $p = $img.GetPixel($x, $y)
        # If it's a dark text pixel:
        if ($p.R -lt 75 -and $p.G -lt 85 -and $p.B -lt 100) {
            # Inpaint by sampling clean river water from y-10 or y+10 or x+20
            # Sample from $y - 12 (pure river water)
            $sample = $img.GetPixel($x, $y - 14)
            # Retain the alpha of the current pixel
            $newP = [System.Drawing.Color]::FromArgb($p.A, $sample.R, $sample.G, $sample.B)
            $img.SetPixel($x, $y, $newP)
        }
    }
}

$img.Save('D:\aerosparke-site\test_inpaint_c4.png')
$img.Dispose()
Write-Host "Saved test_inpaint_c4.png"
