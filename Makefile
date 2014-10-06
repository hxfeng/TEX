test:test.tex
	tex test.tex
	dvipdf test.dvi
cjk:cjk.tex
	xelatex cjk.tex
mfbook:mfbook.tex
	tex mfbook.tex
	dvipdf mfbook.dvi 
texbook:texbook.tex
	tex texbook.tex
	dvipdf texbook.dvi
zihao:zihaotex.tex
	pdflatex zihaotex.tex
cjkutf8:cjkutf8.tex
	pdflatex cjkutf8.tex
clean:
	
	rm *.log *.dvi
