$path = 'd:\PFE\Rapport1\tex\chapitre4.tex'
$content = Get-Content -Raw -Encoding UTF8 $path
$lines = [System.Text.RegularExpressions.Regex]::Split($content, "\r?\n")
$newLines = @()
foreach ($line in $lines) {
    if ($line.TrimStart().StartsWith('%') -and $line -match '[^\x00-\x7F]') {
        continue
    }
    $fixed = $line -replace '�?T', "'"
    $fixed = $fixed -replace '�', ''
    $newLines += $fixed
}
$final = [string]::Join("`n", $newLines)
Set-Content -Path $path -Value $final -Encoding UTF8
Write-Host "Repaired $path"
