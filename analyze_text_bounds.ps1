Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile('D:\aerosparke-site\images\why-aerospark.jpg')

# 6 cards in why-aerospark.jpg (1024x576):
# Card 1: x: 12..338, y: 155..340 (Drone)
# Card 2: x: 345..672, y: 155..340 (Precision 3D Grid)
# Card 3: x: 679..1006, y: 155..340 (Pilot)
# Card 4: x: 12..338, y: 360..545 (River & City)
# Card 5: x: 345..672, y: 360..545 (Wireframe)
# Card 6: x: 679..1006, y: 360..545 (Handshake)

function AnalyzeCardTextBoundary($cName, $xStart, $xEnd, $yStart, $yEnd) {
    Write-Host "`n=== $cName (x=$xStart..$xEnd, y=$yStart..$yEnd) ==="
    # Find all text pixels. Text in cards is dark:
    # Font color is #475569 or dark navy: R<85, G<95, B<115
    # Let's inspect columns from xEnd-150 to xEnd
    $lastTextX = 0
    for ($x = $xStart + 120; $x -le $xEnd; $x++) {
        $hasText = $false
        for ($y = $yStart + 50; $y -le $yEnd - 20; $y++) {
            $p = $src.GetPixel($x, $y)
            # In Card 1, drone is at x>225. Drone has R<60, G<60, B<60.
            # In Card 2, terrain/trees are green (G>R, G>B). Text is neutral dark.
            # In Card 3, pilot is at x>865.
            # In Card 4, city buildings and river are at x>210.
            # In Card 5, wireframe is bright cyan (R<50, G>150, B>200). Text is dark.
            # In Card 6, handshake suit is at x>850.
            if ($p.R -lt 95 -and $p.G -lt 95 -and $p.B -lt 110) {
                # Is it text or graphic?
                # Check surrounding pixels: text has high contrast with white/light bg
                $up = $src.GetPixel($x, $y - 3)
                $down = $src.GetPixel($x, $y + 3)
                if ($up.R -gt 180 -or $down.R -gt 180) {
                    # Likely a letter stroke!
                    $hasText = $true
                    $lastTextX = $x
                }
            }
        }
        if ($hasText) {
            # Write-Host "Text detected at x=$x"
        }
    }
    Write-Host "Last text stroke detected at x=$lastTextX"
}

AnalyzeCardTextBoundary "Card 1 (Drone)" 12 338 155 340
AnalyzeCardTextBoundary "Card 2 (Precision)" 345 672 155 340
AnalyzeCardTextBoundary "Card 3 (Pilot)" 679 1006 155 340
AnalyzeCardTextBoundary "Card 4 (River)" 12 338 360 545
AnalyzeCardTextBoundary "Card 5 (Wireframe)" 345 672 360 545
AnalyzeCardTextBoundary "Card 6 (Handshake)" 679 1006 360 545

$src.Dispose()
