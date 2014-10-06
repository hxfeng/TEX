test:test.tex
	tex test.tex
	dvipdf test.dvi

clean:
	
	rm *.log *.dvi
