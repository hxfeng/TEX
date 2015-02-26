#!/bin/sh
 
for i in \
  AnnArbor Antibes Bergen Berkeley Berlin Boadilla boxes \
  CambridgeUS Copenhagen Darmstadt Dresden EastLansing \
  Frankfurt Goettingen Hannover Ilmenau JuanLesPins \
  Luebeck Madrid Malmoe Marburg Montpellier PaloAlto \
  Pittsburgh Rochester Singapore Szeged Warsaw; do (
  echo  "\\def\\themename{"$i"}\\input beamerthemeexample.tex" > beamerthemeexample"$i".tex; )
done
