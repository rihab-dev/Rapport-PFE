$path = 'd:\PFE\Rapport1\tex\chapitre4.tex'
$content = Get-Content -Raw -Encoding UTF8 $path
$lines = [System.Text.RegularExpressions.Regex]::Split($content, "\r?\n")
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($i -eq 36 -or $i -eq 39) {
        Write-Host "Line $($i + 1): $line"
        $chars = $line.ToCharArray()
        for ($j = 0; $j -lt $chars.Count; $j++) {
            $c = $chars[$j]
            if ([int][char]$c -gt 127) {
                Write-Host "  char[$j]=0x$([Convert]::ToString([int][char]$c,16).ToUpper()) '$c'"
            }
        }
    }
}
