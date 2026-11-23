Add-Type -AssemblyName System.Drawing

function Create-MobilePortrait ($srcPath, $dstPath, $cropCenterXPercent) {
    if (-not (Test-Path $srcPath)) {
        Write-Warning "Source file not found: $srcPath"
        return
    }
    $src = [System.Drawing.Image]::FromFile($srcPath)
    $srcW = $src.Width
    $srcH = $src.Height
    
    # Target aspect ratio: 9:16 (mobile phone screen)
    $targetAspect = 9.0 / 16.0
    
    # We want to take a 9:16 slice of the full height
    $sliceW = [int]($srcH * $targetAspect)
    if ($sliceW -gt $srcW) { $sliceW = $srcW }
    
    $centerX = [int]($srcW * $cropCenterXPercent)
    $srcX = [int]($centerX - ($sliceW / 2))
    if ($srcX -lt 0) { $srcX = 0 }
    if (($srcX + $sliceW) -gt $srcW) { $srcX = $srcW - $sliceW }
    
    # High-resolution output bitmap (720 x 1280 or native slice size)
    $outW = 720
    $outH = 1280
    $destBmp = New-Object System.Drawing.Bitmap $outW, $outH
    $g = [System.Drawing.Graphics]::FromImage($destBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $srcRect = New-Object System.Drawing.Rectangle $srcX, 0, $sliceW, $srcH
    $destRect = New-Object System.Drawing.Rectangle 0, 0, $outW, $outH

    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $destBmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $g.Dispose()
    $destBmp.Dispose()
    $src.Dispose()
    Write-Output "Created: $dstPath ($outW x $outH)"
}

# 1. Careers Mobile (Center on drone and pilot at ~65%)
Create-MobilePortrait 'd:\aerosparke-site\images\careers.jpg' 'd:\aerosparke-site\images\careers-mobile.jpg' 0.65

# 2. Technology & Projects Mobile (Center on drone and operator at ~55%)
Create-MobilePortrait 'd:\aerosparke-site\images\tech.png' 'd:\aerosparke-site\images\tech-mobile.jpg' 0.52

# 3. Services Mobile (Center on aerial city and railway corridor at ~50%)
Create-MobilePortrait 'd:\aerosparke-site\images\service.jpg' 'd:\aerosparke-site\images\service-mobile.jpg' 0.50

# 4. Industries Mobile (From industries-original-portrait.jpg, upscale to 720x1280)
Create-MobilePortrait 'd:\aerosparke-site\images\industries-original-portrait.jpg' 'd:\aerosparke-site\images\industries-mobile.jpg' 0.50
