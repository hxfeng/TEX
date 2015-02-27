cleanfiles=*.log *.dvi *.aux *.out *.toc *~
test:test.tex
	tex test.tex
	dvipdf test.dvi
mfbook.pdf:mfbook.tex
	tex mfbook.tex
	dvipdf mfbook.dvi 
texbook:tex
	dvipdf texbook.dvi
tex:texbook.tex
	tex texbook.tex
all:mfbook.pdf
	pdflatex a5book.tex
	pdflatex cjkutf8.tex
	pdflatex begintikz.tex
	pdflatex boxplot.tex
	pdflatex zihaotex.tex
	pdflatex cheetsheet.tex
	pdflatex circle.tex
	pdflatex cjkutf8.tex
	pdflatex fourier.tex
	pdflatex huge.tex
	pdflatex fourier.tex
	xelatex latextest.tex
	pdflatex mathtest.tex
	pdflatex mytesttex.tex
	pdflatex pdfcollect.tex
	pdflatex subtest.tex
	pdflatex tikz.tex
	pdflatex tikzpicture.tex
	pdflatex watermark.tex
	xelatex hxfeng.tex
clean:
	
	rm $(cleanfiles)
