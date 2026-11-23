Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile('D:\aerosparke-site\images\why-aerospark.jpg')
Write-Host "Source image size: $($src.Width) x $($src.Height)"

# In why-aerospark.jpg:
# Card 1 is at x: 12..338, y: 155..345 (approx)
# Let's check where the text is:
# "We deploy industry-leading drones, LiDAR and GIS platforms to deliver the highest quality spatial data."
# Text ends around what x?
# Drone body is at what x?

# In Card 1:
# The drone has dark propellers and gimbal camera.
# Let's inspect x range 150 to 330 at y = 170..330
# Drone left propeller tip is around what x?

# Let's find darkest pixel in x=150..250, y=170..250 (drone prop or text):
for ($x = 140; $x -le 320; $x += 10) {
    $minB = 255
    $minY = 0
    for ($y = 160; $y -le 330; $y++) {
        $p = $src.GetPixel($x, $y)
        # Text is dark grey/navy (R<50, G<50, B<70)
        # Drone is also dark
        # Sky is light blue (R>180, G>210, B>240)
        # Background is white (255, 255, 255)
        if ($p.B -lt $minB) { $minB = $p.B; $minY = $y }
    }
    Write-Host "x=${x}: min brightness=${minB} at y=${minY}"
}

$src.Dispose()
