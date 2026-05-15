$path = 'd:\PFE\Rapport1\tex\chapitre4.tex'
$content = Get-Content -Path $path -Raw -Encoding UTF8
$content = $content -replace 'd\uFFFD\?Tutilisation',"d'utilisation"
$content = $content -replace 'd\uFFFD\?Tavoir',"d'avoir"
$content = $content -replace 'l\uFFFD\?Tutilisateur',"l'utilisateur"
$content = $content -replace 'R\uFFFD\?ALISATION','RÉALISATION'
$content = $content -replace '\uFFFD\?"',"–"
$content = $content -replace '\uFFFD\? ',"À "
$content = $content -replace 'c\uFFFD"ur',"cœur"
$content = $content -replace '(?m)^%.*\uFFFD.*(?:\r?\n)?',''
Set-Content -Path $path -Value $content -Encoding UTF8
Write-Output 'done'
