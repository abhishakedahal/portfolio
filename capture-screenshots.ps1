# Retry screenshots for sites that failed or were too small
$chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
$outputDir = "c:\Users\N I T R O V15\Desktop\Learning\Personal Portfolio\src\assets\images\projects"

$sites = @(
    @{ name = "nima";         url = "https://nima-ea77c6.webflow.io/";   file = "project-nima.png" },
    @{ name = "crispstories"; url = "https://www.crispstories.com/";      file = "project-crispstories.png" },
    @{ name = "kwant";        url = "https://www.kwant.ai/";              file = "project-kwant.png" }
)

foreach ($site in $sites) {
    $outFile = Join-Path $outputDir $site.file
    Write-Host "Capturing $($site.name)..." -ForegroundColor Cyan

    # Build argument string - longer virtual time for JS-heavy Webflow sites
    $argList = @(
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-extensions",
        "--hide-scrollbars",
        "--window-size=1920,1080",
        "--force-device-scale-factor=1",
        "--virtual-time-budget=10000",
        "--run-all-compositor-stages-before-draw",
        "--screenshot=`"$outFile`"",
        "`"$($site.url)`""
    ) -join " "

    try {
        $proc = Start-Process -FilePath $chrome -ArgumentList $argList -Wait -PassThru -NoNewWindow
        Start-Sleep -Seconds 2

        if (Test-Path $outFile) {
            $size = (Get-Item $outFile).Length
            Write-Host "  OK - $($site.file) ($size bytes)" -ForegroundColor Green
        } else {
            Write-Host "  FAIL - file not created" -ForegroundColor Red
        }
    } catch {
        Write-Host "  ERROR: $_" -ForegroundColor Red
    }
    Start-Sleep -Seconds 2
}

Write-Host "`nDone." -ForegroundColor Yellow
