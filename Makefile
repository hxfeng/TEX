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
fourier:fourier.tex
	pdflatex fourier.tex
a5book:a5book.tex
	pdflatex a5book.tex
	pdflatex begintikz.tex
	pdflatex boxplot.tex
	pdflatex cheetsheet.tex
	pdflatex circle.tex
	pdflatex cjkutf8.tex
	pdflatex fourier.tex
	pdflatex huge.tex
	xelatex latextest.tex
	pdflatex mathtest.tex
	pdflatex mytesttex.tex
	pdflatex pdfcollect.tex
	pdflatex subtest.tex
	pdflatex tikz.tex
	pdflatex tikzpicture.tex
	pdflatex watermark.tex
clean:
	
	rm *.log *.dvi *.aux *.out *.toc
