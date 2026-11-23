Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile('D:\aerosparke-site\images\why-aerospark.jpg')

# Let's crop a window across the middle of each card from x=150 to 250 (relative to card start):
# Card 1: x from 160 to 240, y from 220 to 300
# Card 2: x from 480 to 560, y from 220 to 300
# Card 3: x from 810 to 890, y from 220 to 300
# Card 4: x from 160 to 240, y from 420 to 500
# Card 5: x from 480 to 560, y from 420 to 500
# Card 6: x from 810 to 890, y from 420 to 500

$crops = @(
    @{ name="test_c1.png"; x=160; y=200; w=100; h=100 },
    @{ name="test_c2.png"; x=480; y=200; w=100; h=100 },
    @{ name="test_c3.png"; x=810; y=200; w=100; h=100 },
    @{ name="test_c4.png"; x=160; y=400; w=100; h=100 },
    @{ name="test_c5.png"; x=480; y=400; w=100; h=100 },
    @{ name="test_c6.png"; x=810; y=400; w=100; h=100 }
)

foreach ($c in $crops) {
    $bmp = New-Object System.Drawing.Bitmap($c.w, $c.h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $rect = New-Object System.Drawing.Rectangle($c.x, $c.y, $c.w, $c.h)
    $g.DrawImage($src, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $bmp.Save("D:\aerosparke-site\$($c.name)")
    $bmp.Dispose()
}

$src.Dispose()
Write-Host "Exported text boundary test slices."
