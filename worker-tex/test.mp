verbatimtex
\documentclass[12pt]{article}
\usepackage[T1]{fontenc}
\begin{document}
etex

beginfig(1)
    pair A, B, C;
    A:=(0,0); B:=(1cm,0); C:=(0,1cm);
    draw A--B--C;
  
endfig;







beginfig(19)
  draw (-1.5cm,0)--(1.5cm,0);
  draw (0,-1.5cm)--(0,1.5cm);
  drawarrow (0,0)--(1cm,0)
            withpen pencircle scaled 2bp;
  drawarrow (0,0)--(0,1cm)
            withpen pencircle scaled 2bp;
endfig;
beginfig(20)
    pair A, B, C;
    A:=(0,0); B:=(1cm,0); C:=(0,1cm);
    fill A--B--C--cycle withcolor .8 white;
  
endfig;





end

