Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('C:\Users\user\.gemini\antigravity\brain\c0196231-c4dc-416f-b2b4-cc2a00192df7\.user_uploaded\media_1795448676722_79b2fc08.jpg')
Write-Host "Uploaded screenshot dimensions: $($img.Width) x $($img.Height)"

# Crop Card 1 from uploaded screenshot
$c1Rect = New-Object System.Drawing.Rectangle(0, 0, 340, 200)
$c1 = New-Object System.Drawing.Bitmap(340, 200)
$g = [System.Drawing.Graphics]::FromImage($c1)
$g.DrawImage($img, 0, 0, $c1Rect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$c1.Save('D:\aerosparke-site\user_card1_crop.png')
$c1.Dispose()

$img.Dispose()
Write-Host "Saved user_card1_crop.png"
