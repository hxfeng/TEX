var Scriptaculous={Version:"1.9.0",require:function(b){if($$("script[src$='"+b.replace(/^.*\//,"")+"']").length>0){return}var a=document.createElement("script");a.type="text/javascript";a.src=b;document.getElementsByTagName("head")[0].appendChild(a)},REQUIRED_PROTOTYPE:"1.6.0.3",load:function(){function a(c){var d=c.replace(/_.*|\./g,"");d=parseInt(d+"0".times(4-d.length));return c.indexOf("_")>-1?d-1:d}if((typeof Prototype=="undefined")||(typeof Element=="undefined")||(typeof Element.Methods=="undefined")||(a(Prototype.Version)<a(Scriptaculous.REQUIRED_PROTOTYPE))){throw ("script.aculo.us requires the Prototype JavaScript framework >= "+Scriptaculous.REQUIRED_PROTOTYPE)}var b=/scriptaculous\.js(\?.*)?$/;$$("script[src]").findAll(function(c){return c.src.match(b)}).each(function(d){var e=d.src.replace(b,""),c=d.src.match(/\?.*load=([a-z,]*)/);(c?c[1]:"builder,effects,dragdrop,controls,slider,sound").split(",").each(function(f){Scriptaculous.require(e+f+".js")})})}};Scriptaculous.load();