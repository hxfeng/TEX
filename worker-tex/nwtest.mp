input boxes
prologues:=2;
verbatimtex
\documentclass[12pt]{article}
\usepackage{amsmath,amssymb,amsbsy,amsthm}
\usepackage{amsfonts}
\begin{document}
etex

filenametemplate "%j-%3c-mp.mps";

beginfig(1)
    pair A, B, C, D, E, F;
    A:=(0,0); B:=(2cm,0); C:=(4cm,0); D:=(6cm,0); E:=(8cm,0); F:=(10cm,0);
    draw A--B--C--D--E--F;
endfig;

beginfig(2)
    pair A, B, C, D, E, F, G, H;
    A:=(0,0); B:=(3cm,0); D:=(0,3cm); C:=(3cm,3cm);
    E:=(1cm,1cm); F:=(4cm,1cm); H:=(1cm,4cm); G:=(4cm,4cm);
    draw A--B--C--D--cycle;
    draw E--F--G--H--cycle;
    draw A--E;
    draw B--F;
    draw C--G;
    draw D--H;
    dotlabel.bot(btex $abcyzx_{3}^{25}c'$ etex, F);
 
endfig;

beginfig(205)
  pair A,B,C,D,E,F;
  numeric d[];
  u := 3cm;
  A := (0,0);
  B := (u,0);
  D := B rotated 72;
  C := (u,0) + D;
  draw A--B--C--cycle;
  d[0] := 1;
  d[1] := sqrt( 2*(1+cosd(72)) );
  d[2] := sqrt( 2*(1-cosd(36)) );
  E := (d1/(d0+d1)) [A,C];
  F := (d0/(d0+d2)) [A,B];
  draw E--F--B--cycle;
  draw btex $A'$ etex shifted 1/3(E+F+B);
  draw E--A--F--cycle;
  draw btex $B$ etex shifted 1/3(E+A+F);
  draw C--E--B--cycle;
  draw btex $B'$ etex shifted 1/3(C+E+B);
endfig;

beginfig(239)
    circleit.a(btex essai etex);
    a.c = (0,0);
    drawboxed(a);
  
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
