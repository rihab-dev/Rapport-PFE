$path='d:\PFE\Rapport1\tex\chapitre4.tex'
$bytes = [System.IO.File]::ReadAllBytes($path)
$lines = [System.Text.Encoding]::UTF8.GetString($bytes).Split([Environment]::NewLine)
$line = $lines[36]
Write-Host "Line 37:" $line
for ($i=0; $i -lt $line.Length; $i++) {
  $char = $line[$i]
  if ([int][char]$char -gt 127) {
    Write-Host "$i 0x$([Convert]::ToString([int][char]$char,16).ToUpper()) '$char'"
  }
}
