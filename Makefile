test:test.tex
	tex test.tex
	dvipdf test.dvi
mfbook:mfbook.tex
	tex mfbook.tex
	dvipdf mfbook.dvi 
texbook:tex
	dvipdf texbook.dvi
tex:texbook.tex
	tex texbook.tex
zihao:zihaotex.tex
	pdflatex zihaotex.tex
cjkutf8:cjkutf8.tex
	pdflatex cjkutf8.tex
clean:
	
	rm *.log *.dvi *.aux *.pdf
