Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile('D:\aerosparke-site\images\why-aerospark.jpg')

# In why-aerospark.jpg (1024x576):
# Card 4: x=230..338 (w=108, h=184), y=360
# Card 5: x=555..672 (w=117, h=184), y=360
# Card 6: x=880..1006 (w=126, h=184), y=360

$crops = @(
    @{ name="why-visual-4.png"; x=230; y=360; w=108; h=184; fade=30 },
    @{ name="why-visual-5.png"; x=555; y=360; w=117; h=184; fade=30 },
    @{ name="why-visual-6.png"; x=880; y=360; w=126; h=184; fade=30 }
)

$scale = 2

foreach ($cfg in $crops) {
    $outW = $cfg.w * $scale
    $outH = $cfg.h * $scale
    $fadePx = $cfg.fade * $scale
    
    $raw = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($raw)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $srcRect = New-Object System.Drawing.Rectangle($cfg.x, $cfg.y, $cfg.w, $cfg.h)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $outW, $outH)
    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    # Smoothstep alpha fade on the left edge
    $finalBmp = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    for ($y = 0; $y -lt $outH; $y++) {
        for ($x = 0; $x -lt $outW; $x++) {
            $p = $raw.GetPixel($x, $y)
            $alpha = 1.0
            if ($x -lt $fadePx) {
                $t = $x / [double]$fadePx
                $alpha = (3.0 * [Math]::Pow($t, 2)) - (2.0 * [Math]::Pow($t, 3))
            }
            $a = [int]([Math]::Round($alpha * 255))
            if ($a -gt 255) { $a = 255 }
            if ($a -lt 0) { $a = 0 }
            
            $newP = [System.Drawing.Color]::FromArgb($a, $p.R, $p.G, $p.B)
            $finalBmp.SetPixel($x, $y, $newP)
        }
    }
    $raw.Dispose()
    
    $p1 = "D:\aerosparke-site\images\$($cfg.name)"
    $p2 = "D:\aerosparke-site\css\images\$($cfg.name)"
    $finalBmp.Save($p1, [System.Drawing.Imaging.ImageFormat]::Png)
    $finalBmp.Save($p2, [System.Drawing.Imaging.ImageFormat]::Png)
    $finalBmp.Dispose()
    Write-Host "Exported $($cfg.name)"
}

$src.Dispose()
Write-Host "Done!"
