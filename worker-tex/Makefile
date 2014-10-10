myfont:a.mf
	mf a.mf
	gftodvi a.2602gf 
	xdvipdfmx  a.dvi
testfont:font.tex
	tex font.tex
	dvipdf font.dvi
latexfont:
	pdflatex latexfonttest.tex
pagetest:page.tex
	pdflatex page.tex
article:article-example.tex
	pdflatex article-example.tex
sample:sample_article.TEX
	pdflatex sample_article.TEX
clean:

	rm *.dvi *.pdf *.dvi  *.log *.aux
	rm a.2602gf  a.600pk  a.8000pk   a.tfm
