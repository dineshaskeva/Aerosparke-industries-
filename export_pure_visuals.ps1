Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile('D:\aerosparke-site\images\why-aerospark.jpg')

# Pure Graphic Regions - Strictly past all text:
$crops = @(
    @{ name="clean_v1.png"; x=215; y=156; w=123; h=184; fade=25 },
    @{ name="clean_v2.png"; x=530; y=156; w=142; h=184; fade=30 },
    @{ name="clean_v3.png"; x=860; y=156; w=146; h=184; fade=30 },
    @{ name="clean_v4.png"; x=272; y=360; w=66;  h=184; fade=20 },
    @{ name="clean_v5.png"; x=575; y=360; w=97;  h=184; fade=25 },
    @{ name="clean_v6.png"; x=895; y=360; w=111; h=184; fade=25 }
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
    
    $finalBmp.Save("D:\aerosparke-site\$($cfg.name)", [System.Drawing.Imaging.ImageFormat]::Png)
    $finalBmp.Dispose()
    Write-Host "Exported $($cfg.name)"
}

$src.Dispose()
Write-Host "Done!"
