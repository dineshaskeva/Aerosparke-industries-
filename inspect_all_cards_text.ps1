Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile('D:\aerosparke-site\images\why-aerospark.jpg')

# 6 cards in why-aerospark.jpg (1024x576):
# Card 1: x: 12..338, y: 155..340
# Card 2: x: 345..672, y: 155..340
# Card 3: x: 679..1006, y: 155..340
# Card 4: x: 12..338, y: 360..545
# Card 5: x: 345..672, y: 360..545
# Card 6: x: 679..1006, y: 360..545

# For each card, let's find:
# 1. Where does the graphic start?
# 2. Where does the text end?

Write-Host "Analyzing cards in why-aerospark.jpg:"

# Card 1: Drone
# We saw text ends at x=200, drone starts at x=225
Write-Host "Card 1 (Drone): Text ends ~200, Drone starts ~225. Width to right edge (338): $($338 - 215)px"

# Card 2 (3D grid):
# Let's inspect x from 480 to 560 at y=200..320
$c2_textEnd = 0
for ($x = 480; $x -le 560; $x += 5) {
    # Check if there is dark text in y=240..300
    for ($y = 240; $y -le 300; $y++) {
        $p = $src.GetPixel($x, $y)
        if ($p.R -lt 80 -and $p.G -lt 80 -and $p.B -lt 80) {
            $c2_textEnd = $x
        }
    }
}
Write-Host "Card 2 (Precision): Last dark text pixel around x=${c2_textEnd}. Grid starts around x=525. Card right edge is 672."

# Card 3 (Pilot):
# Pilot is on the far right. Pilot body is at x=880..1000.
# Let's check text end:
$c3_textEnd = 0
for ($x = 800; $x -le 900; $x += 5) {
    for ($y = 240; $y -le 300; $y++) {
        $p = $src.GetPixel($x, $y)
        if ($p.R -lt 80 -and $p.G -lt 80 -and $p.B -lt 80) {
            $c3_textEnd = $x
        }
    }
}
Write-Host "Card 3 (Pilot): Last dark text pixel around x=${c3_textEnd}. Pilot starts around x=860. Card right edge is 1006."

# Card 4 (River & City):
$c4_textEnd = 0
for ($x = 140; $x -le 240; $x += 5) {
    for ($y = 440; $y -le 520; $y++) {
        $p = $src.GetPixel($x, $y)
        if ($p.R -lt 80 -and $p.G -lt 80 -and $p.B -lt 80) {
            $c4_textEnd = $x
        }
    }
}
Write-Host "Card 4 (River): Last dark text pixel around x=${c4_textEnd}. River/city starts around x=205. Card right edge is 338."

# Card 5 (Wireframe):
$c5_textEnd = 0
for ($x = 480; $x -le 560; $x += 5) {
    for ($y = 440; $y -le 520; $y++) {
        $p = $src.GetPixel($x, $y)
        if ($p.R -lt 80 -and $p.G -lt 80 -and $p.B -lt 80) {
            $c5_textEnd = $x
        }
    }
}
Write-Host "Card 5 (Wireframe): Last dark text pixel around x=${c5_textEnd}. Wireframe starts around x=520. Card right edge is 672."

# Card 6 (Handshake):
$c6_textEnd = 0
for ($x = 800; $x -le 900; $x += 5) {
    for ($y = 440; $y -le 520; $y++) {
        $p = $src.GetPixel($x, $y)
        if ($p.R -lt 80 -and $p.G -lt 80 -and $p.B -lt 80) {
            $c6_textEnd = $x
        }
    }
}
Write-Host "Card 6 (Handshake): Last dark text pixel around x=${c6_textEnd}. Handshake starts around x=850. Card right edge is 1006."

$src.Dispose()
