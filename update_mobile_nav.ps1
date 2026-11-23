$ErrorActionPreference = 'Stop'

# 1. Update index.html
$indexFile = 'd:\aerosparke-site\index.html'
$indexContent = Get-Content $indexFile -Raw

$indexNavHeader = @"
      <nav id="nav">
        <div class="mobile-nav-top">
          <a class="mobile-nav-logo" href="#home" onclick="closeNav()">
            <img src="images/logo.png" alt="AEROSPARKe Industries" onerror="this.outerHTML='<b>AEROSPARKe</b>'">
          </a>
          <button class="mobile-nav-close" onclick="closeNav()" aria-label="Close Menu">&times;</button>
        </div>
"@

if (-not $indexContent.Contains('mobile-nav-top')) {
    $indexContent = $indexContent.Replace('      <nav id="nav">', $indexNavHeader)
    $indexContent = [regex]::Replace($indexContent, '<button class="bg"[^>]*>&#9776;</button>', '<button class="bg" id="hamburger-btn" onclick="openNav()" aria-label="Menu">&#9776;</button>')
    Set-Content -Path $indexFile -Value $indexContent -NoNewline
    Write-Output "Updated index.html mobile nav"
}

# 2. Update all pages/*.html
$pages = Get-ChildItem -Path 'd:\aerosparke-site\pages' -Filter '*.html'
$pageNavHeader = @"
    <nav id="nav">
      <div class="mobile-nav-top">
        <a class="mobile-nav-logo" href="../index.html" onclick="closeNav()">
          <img src="../images/logo.png" alt="AEROSPARKe Industries" onerror="this.outerHTML='<b>AEROSPARKe</b>'">
        </a>
        <button class="mobile-nav-close" onclick="closeNav()" aria-label="Close Menu">&times;</button>
      </div>
"@

foreach ($p in $pages) {
    $pContent = Get-Content $p.FullName -Raw
    if (-not $pContent.Contains('mobile-nav-top')) {
        $pContent = $pContent.Replace('    <nav id="nav">', $pageNavHeader)
        $pContent = [regex]::Replace($pContent, '<button class="bg"[^>]*>&#9776;</button>', '<button class="bg" id="hamburger-btn" onclick="openNav()" aria-label="Menu">&#9776;</button>')
        Set-Content -Path $p.FullName -Value $pContent -NoNewline
        Write-Output "Updated $($p.Name) mobile nav"
    }
}
