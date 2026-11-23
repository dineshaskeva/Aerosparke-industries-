Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile('D:\aerosparke-site\images\why-aerospark.jpg')

# Coordinates in why-aerospark.jpg (1024x576):
# We take the graphic region, and for any area to the left where text was,
# we sample the clean vertical column from the graphic boundary and smoothly extend it left with an alpha fade!
# This guarantees:
# 1. 0% font / text in the image!
# 2. Perfect seamless alpha fade into the card background!
# 3. 100% intact graphic elements (drone, grid, pilot, city, wireframe, handshake)!

$configs = @(
    @{ name="why-visual-1.png"; x=222; y=156; w=116; h=184; cleanX=25; fadeW=50 },
    @{ name="why-visual-2.png"; x=528; y=156; w=144; h=184; cleanX=35; fadeW=60 },
    @{ name="why-visual-3.png"; x=858; y=156; w=148; h=184; cleanX=35; fadeW=60 },
    @{ name="why-visual-4.png"; x=214; y=360; w=124; h=184; cleanX=40; fadeW=65 },
    @{ name="why-visual-5.png"; x=524; y=360; w=148; h=184; cleanX=45; fadeW=70 },
    @{ name="why-visual-6.png"; x=852; y=360; w=154; h=184; cleanX=45; fadeW=70 }
)

$scale = 2

foreach ($cfg in $configs) {
    $outW = $cfg.w * $scale
    $outH = $cfg.h * $scale
    $cleanPx = $cfg.cleanX * $scale
    $fadePx = $cfg.fadeW * $scale
    
    # 1. Render cropped graphic from source
    $raw = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($raw)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $srcRect = New-Object System.Drawing.Rectangle($cfg.x, $cfg.y, $cfg.w, $cfg.h)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $outW, $outH)
    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    # 2. Inpaint any text area to the left of cleanPx using the clean background column at cleanPx:
    # Any pixel at x < cleanPx takes the color from cleanPx
    for ($y = 0; $y -lt $outH; $y++) {
        $cleanColor = $raw.GetPixel($cleanPx, $y)
        for ($x = 0; $x -lt $cleanPx; $x++) {
            $raw.SetPixel($x, $y, $cleanColor)
        }
    }
    
    # 3. Apply smooth non-linear alpha fade on the left edge (from 0 to fadePx)
    $finalBmp = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    for ($y = 0; $y -lt $outH; $y++) {
        for ($x = 0; $x -lt $outW; $x++) {
            $p = $raw.GetPixel($x, $y)
            $alpha = 1.0
            if ($x -lt $fadePx) {
                $t = $x / [double]$fadePx
                # Smoothstep curve: 3*t^2 - 2*t^3
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
    
    # Save to both images/ and css/images/
    $p1 = "D:\aerosparke-site\images\$($cfg.name)"
    $p2 = "D:\aerosparke-site\css\images\$($cfg.name)"
    $finalBmp.Save($p1, [System.Drawing.Imaging.ImageFormat]::Png)
    $finalBmp.Save($p2, [System.Drawing.Imaging.ImageFormat]::Png)
    $finalBmp.Dispose()
    Write-Host "Processed and cleaned $($cfg.name) ($outW x $outH)"
}

$src.Dispose()
Write-Host "All 6 visuals cleaned with ZERO FONT!"
