input boxes 
prologues:=2;
verbatimtex
\documentclass[12pt]{article}
\usepackage{amsmath,amssymb,amsbsy,amsthm}
\usepackage{amsfonts}
\begin{document}
etex
filenametemplate "%j-%3c-mp.eps";
beginfig(1)
    pair A, B, C;
    A:=(0,0); B:=(1cm,0); C:=(0,1cm);
    draw A--B--C;
endfig;







beginfig(2)
  draw (-1.5cm,0)--(1.5cm,0);
  draw (0,-1.5cm)--(0,1.5cm);
  drawarrow (0,0)--(1cm,0)
            withpen pencircle scaled 2bp;
  drawarrow (0,0)--(0,1cm)
            withpen pencircle scaled 2bp;
endfig;
beginfig(3)
    pair A, B, C;
    A:=(0,0); B:=(1cm,0); C:=(0,1cm);
    fill A--B--C--cycle withcolor .8 white;
  
endfig;

beginfig(4)
  boxit.a1(btex $a$ etex);
  boxit.b1(btex etex);
  boxit.a2(btex $b$ etex);
  boxit.b2(btex etex);
  boxit.a3(btex $c$ etex);
  boxit.b3(btex etex);
  boxit.a4(btex $d$ etex);
  boxit.b4(btex etex);
  for i=1 upto 4:
    % Les boites a[i] et b[i] sont coll^^e9es
    a[i].e = b[i].w;
    % Il y a un peu d'espace entre b[i] et a[i+1]
    b[i].e + (5mm,0) = a[i+1].w;
    % La hauteur des boites est la m^^eame
    a[i].n - a[i].s = a[i+1].n - a[i+1].s = b[i].n - b[i].s ;
    % Les b[i] ne sont pas tr^^e8s larges
    b[i].e - b[i].w = (2mm,0);
  endfor;
  drawboxed(a1,b1,a2,b2,a3,b3,a4,b4);
  for i=1 upto 3:
    drawarrow b[i].c {up} .. a[i+1].c {down}
    cutafter bpath.a[i+1];
  endfor;
endfig;

verbatimtex
\end{document}
etex

end

