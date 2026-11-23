Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile('D:\aerosparke-site\images\why-aerospark.jpg')

# Clean Visual Crops - Starting strictly AFTER all text:
# Card 1: x=222..338 (w=116), y=155..340 (h=185) -> Drone
# Card 2: x=528..672 (w=144), y=155..340 (h=185) -> 3D Grid
# Card 3: x=858..1006 (w=148), y=155..340 (h=185) -> Pilot & Drone
# Card 4: x=214..338 (w=124), y=360..545 (h=185) -> River & City
# Card 5: x=524..672 (w=148), y=360..545 (h=185) -> Wireframe
# Card 6: x=852..1006 (w=154), y=360..545 (h=185) -> Handshake

$visuals = @(
    @{ name="why-visual-1.png"; x=222; y=156; w=116; h=184; fade=30 },
    @{ name="why-visual-2.png"; x=528; y=156; w=144; h=184; fade=35 },
    @{ name="why-visual-3.png"; x=858; y=156; w=148; h=184; fade=35 },
    @{ name="why-visual-4.png"; x=214; y=360; w=124; h=184; fade=30 },
    @{ name="why-visual-5.png"; x=524; y=360; w=148; h=184; fade=35 },
    @{ name="why-visual-6.png"; x=852; y=360; w=154; h=184; fade=35 }
)

# 2x supersampling for Ultra-HD crispness on high-res displays
$scale = 2

foreach ($v in $visuals) {
    $outW = $v.w * $scale
    $outH = $v.h * $scale
    $fadePx = $v.fade * $scale
    
    $bmp = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    # First, render the cropped graphic scaled 2x
    $raw = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($raw)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $srcRect = New-Object System.Drawing.Rectangle($v.x, $v.y, $v.w, $v.h)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $outW, $outH)
    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    # Now apply smooth non-linear alpha fade on the left edge
    for ($y = 0; $y -lt $outH; $y++) {
        for ($x = 0; $x -lt $outW; $x++) {
            $px = $raw.GetPixel($x, $y)
            $alpha = 1.0
            if ($x -lt $fadePx) {
                # Smooth sinusoidal curve from 0.0 to 1.0
                $t = $x / [double]$fadePx
                # Smoothstep: 3*t^2 - 2*t^3
                $alpha = (3.0 * [Math]::Pow($t, 2)) - (2.0 * [Math]::Pow($t, 3))
            }
            $a = [int]([Math]::Round($alpha * 255))
            if ($a -gt 255) { $a = 255 }
            if ($a -lt 0) { $a = 0 }
            
            $newPx = [System.Drawing.Color]::FromArgb($a, $px.R, $px.G, $px.B)
            $bmp.SetPixel($x, $y, $newPx)
        }
    }
    
    $raw.Dispose()
    
    $p1 = "D:\aerosparke-site\images\$($v.name)"
    $p2 = "D:\aerosparke-site\css\images\$($v.name)"
    $bmp.Save($p1, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Save($p2, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated clean visual: $($v.name) ($outW x $outH)"
}

$src.Dispose()
Write-Host "All 6 font-free clean visuals generated successfully!"
