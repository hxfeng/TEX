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


clean:
	
	rm *.log *.dvi
