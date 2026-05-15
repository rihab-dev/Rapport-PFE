$path='d:\PFE\Rapport1\tex\chapitre4.tex'
$content=Get-Content -Raw -Encoding UTF8 $path
$lines=[System.Text.RegularExpressions.Regex]::Split($content, "\r?\n")
$matches=@()
foreach ($line in $lines) {
    if ($line -match '�' -and $line.TrimStart().StartsWith('%')) {
        $matches += $line
    }
}
Write-Host "Count=$($matches.Count)"
foreach ($m in $matches | Select-Object -First 5) {
    Write-Host "MATCH: $m"
}
