# ULearn Sync: Convert PowerPoint to PDF
# Runs in Power Automate Desktop: "Run PowerShell script"
# Variables between % signs are replaced by Power Automate before running.
# Requires the Microsoft PowerPoint desktop app.
# Prints "OK" when the conversion succeeds. The flow only deletes the
# original PowerPoint file after it sees "OK".

$in = "%DownloadsFolder%\%DownloadedFileName%"
$out = "%CourseFolder%\%FileNameNoExtension%.pdf"

Unblock-File -Path $in

# Open PowerPoint without a window and save the slides as PDF (32 = PDF format)
$ppt = New-Object -ComObject PowerPoint.Application
$pres = $ppt.Presentations.Open($in, -1, 0, 0)
$pres.SaveAs($out, 32)
$pres.Close()
$ppt.Quit()

# Fully release PowerPoint so the original file can be deleted
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
[GC]::Collect()
[GC]::WaitForPendingFinalizers()

Write-Output "OK"
