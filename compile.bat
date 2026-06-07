@echo off
chcp 65001 > nul
echo ===== Compilation du rapport PFE (XeLaTeX) =====
echo.

echo Fermeture du PDF si ouvert dans un lecteur...
taskkill /f /im SumatraPDF.exe 2>nul
taskkill /f /im AcroRd32.exe 2>nul
taskkill /f /im Acrobat.exe 2>nul
taskkill /f /im FoxitReader.exe 2>nul

echo Nettoyage complet des fichiers auxiliaires...
del /f /q rapport.aux 2>nul
del /f /q rapport.toc 2>nul
del /f /q rapport.out 2>nul
del /f /q rapport.lof 2>nul
del /f /q rapport.lot 2>nul
del /f /q rapport.log 2>nul
del /f /q rapport.maf 2>nul
del /f /q rapport.synctex.gz 2>nul
del /f /q rapport.mtc 2>nul
del /f /q rapport.mtc0 2>nul
del /f /q rapport.mtc1 2>nul
del /f /q rapport.mtc2 2>nul
del /f /q rapport.mtc3 2>nul
del /f /q rapport.mtc4 2>nul
del /f /q rapport.mtc5 2>nul
del /f /q rapport.mtc6 2>nul
del /f /q rapport.mtc7 2>nul
del /f /q rapport.mtc8 2>nul
del /f /q rapport.xdv 2>nul

echo.
echo === Passe 1/4 - Generation du TOC ===
xelatex -interaction=nonstopmode rapport.tex
echo.

echo === Passe 2/4 - Resolution des references ===
xelatex -interaction=nonstopmode rapport.tex
echo.

echo === Passe 3/4 - Finalisation des tables ===
xelatex -interaction=nonstopmode rapport.tex
echo.

echo === Passe 4/4 - Stabilisation finale ===
xelatex -interaction=nonstopmode rapport.tex
echo.

echo ===================================
echo  Compilation terminee !
echo  Le fichier rapport.pdf est pret.
echo ===================================
pause
