@echo off
echo === Nettoyage des fichiers auxiliaires ===
del /f /q rapport.aux rapport.toc rapport.lof rapport.lot rapport.out rapport.mtc* rapport.maf rapport.synctex.gz 2>nul
echo === Passe 1/3 ===
xelatex -interaction=nonstopmode rapport.tex
echo === Passe 2/3 ===
xelatex -interaction=nonstopmode rapport.tex
echo === Passe 3/3 ===
xelatex -interaction=nonstopmode rapport.tex
echo === Compilation terminee : rapport.pdf ===
