Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile('D:\aerosparke-site\images\why-aerospark.jpg')

# In Card 4 (y: 360..540):
# Text: "We are committed to on-time, on-scope project delivery with transparent communication at every stage."
# Let's inspect x from 220 to 300 to find where "on-scope" ends:
Write-Host "Card 4 scan (y from 440 to 480):"
for ($x = 220; $x -le 290; $x += 5) {
    for ($y = 440; $y -le 480; $y++) {
        $p = $src.GetPixel($x, $y)
        # Text is dark navy (R<70, G<70, B<90)
        # Background is light river water/trees
        if ($p.R -lt 70 -and $p.G -lt 70 -and $p.B -lt 90) {
            Write-Host "Card 4 text at x=$x, y=$y (R=$($p.R), G=$($p.G), B=$($p.B))"
            break
        }
    }
}

# In Card 5 (y: 360..540):
# Text: "solve complex surveying and infrastructure challenges."
# Let's inspect x from 550 to 620 to find where "surveying" ends:
Write-Host "`nCard 5 scan (y from 460 to 510):"
for ($x = 550; $x -le 630; $x += 5) {
    for ($y = 460; $y -le 510; $y++) {
        $p = $src.GetPixel($x, $y)
        if ($p.R -lt 70 -and $p.G -lt 70 -and $p.B -lt 90) {
            Write-Host "Card 5 text at x=$x, y=$y (R=$($p.R), G=$($p.G), B=$($p.B))"
            break
        }
    }
}

# In Card 6 (y: 360..540):
# Text: "tailored to their specific needs."
# Let's inspect x from 870 to 950 to find where "needs." ends:
Write-Host "`nCard 6 scan (y from 480 to 530):"
for ($x = 870; $x -le 960; $x += 5) {
    for ($y = 480; $y -le 530; $y++) {
        $p = $src.GetPixel($x, $y)
        if ($p.R -lt 70 -and $p.G -lt 70 -and $p.B -lt 90) {
            Write-Host "Card 6 text at x=$x, y=$y (R=$($p.R), G=$($p.G), B=$($p.B))"
            break
        }
    }
}

$src.Dispose()
