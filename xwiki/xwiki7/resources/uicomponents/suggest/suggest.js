var XWiki=(function(b){var a=b.widgets=b.widgets||{};if(typeof a.XList=="undefined"){if(typeof console!="undefined"&&typeof console.warn=="function"){console.warn("[Suggest widget] Required class missing: XWiki.widgets.XList")}}else{a.Suggest=Class.create({options:{minchars:1,method:"get",varname:"input",className:"ajaxsuggest",timeout:2500,delay:500,offsety:0,shownoresults:true,noresults:"$services.localization.render('core.widgets.suggest.noResults')",maxheight:250,cache:false,seps:"",icon:null,resultsParameter:"results",resultId:"id",resultValue:"value",resultInfo:"info",resultInfoHTML:false,resultIcon:"icon",resultHint:"hint",resultType:"type",resultURL:"url",parentContainer:"body",highlight:true,fadeOnClear:true,hideButton:{positions:["top"],text:"$escapetool.javascript($services.localization.render('core.widgets.suggest.hide'))"},insertBeforeSuggestions:null,displayValue:false,displayValueText:"$services.localization.render('core.widgets.suggest.valuePrefix')",align:"left",unifiedLoader:false,loaderNode:null,propagateEventKeyCodes:[]},sInput:"",nInputChars:0,aSuggestions:{},iHighlighted:null,isActive:false,initialize:function(c,d){if(!c){return false}this.setInputField(c);this.options=Object.extend(Object.clone(this.options),d||{});if(typeof this.options.sources=="object"){this.isInMultiSourceMode=true;this.sources=this.options.sources}else{this.sources=this.options}this.sources=[this.sources].flatten().compact();if(this.sources.length==0){this.sources.push({script:function(e,f){f([])}})}if(!$(this.options.parentContainer)){this.options.parentContainer=$(document.body)}if(this.options.seps){this.seps=this.options.seps}else{this.seps=""}this.latestRequest=0},setInputField:function(c){this.detach();this.fld=$(c);if(this.fld.__x_suggest){this.fld.__x_suggest.detach()}this.fld.__x_suggest=this;this.onKeyUp=this.onKeyUp.bindAsEventListener(this);this.fld.observe("keyup",this.onKeyUp);this.onKeyPress=this.onKeyPress.bindAsEventListener(this);if(Prototype.Browser.IE||Prototype.Browser.WebKit||browser.isIE11up){this.fld.observe("keydown",this.onKeyPress)}else{this.fld.observe("keypress",this.onKeyPress)}this.fld.setAttribute("autocomplete","off");this.fld.observe("blur",function(d){this.latestRequest++}.bind(this))},onKeyUp:function(f){var d=f.keyCode;switch(d){case Event.KEY_RETURN:case Event.KEY_ESC:case Event.KEY_UP:case Event.KEY_DOWN:break;default:if(this.seps){var e=-1;for(var c=0;c<this.seps.length;c++){if(this.fld.value.lastIndexOf(this.seps.charAt(c))>e){e=this.fld.value.lastIndexOf(this.seps.charAt(c))}}if(e==-1){this.getSuggestions(this.fld.value)}else{this.getSuggestions(this.fld.value.substring(e+1))}}else{this.getSuggestions(this.fld.value)}}},onKeyPress:function(d){if(!$(this.isActive)){return}var c=d.keyCode;var e=true;switch(c){case Event.KEY_RETURN:if(!this.iHighlighted&&(Object.keys(this.aSuggestions).length==1&&this.aSuggestions[Object.keys(this.aSuggestions)[0]].length==1)){this.highlightFirst()}this.setHighlightedValue(d);break;case Event.KEY_ESC:this.clearSuggestions();break;case Event.KEY_UP:this.changeHighlight(c);break;case Event.KEY_DOWN:this.changeHighlight(c);break;default:e=false;break}if(e&&this.options.propagateEventKeyCodes&&this.options.propagateEventKeyCodes.indexOf(c)==-1){Event.stop(d)}},getSuggestions:function(g){g=g.strip().toLowerCase();if(g==this.sInput){return false}if(g.length<this.options.minchars){this.sInput="";this.clearSuggestions();return false}if(g.length>this.nInputChars&&Object.keys(this.aSuggestions).length&&this.options.cache){var m={};for(var l=0;l<Object.keys(this.aSuggestions).length;l++){var o=Object.keys(this.aSuggestions)[l];var h=[];for(var k=0;k<this.aSuggestions[o].length;k++){var e=this.aSuggestions[o][k];if(e.value.substr(0,g.length).toLowerCase()==g){h.push(e)}}if(h.length){m[o]=n}}this.sInput=g;this.nInputChars=g.length;this.aSuggestions=m;for(var l=0;l<sources.length;l++){var d=sources[l];var n=this.aSuggestions[d.id];if(n){this.createList(n,d)}}return false}else{this.sInput=g;this.nInputChars=g.length;this.prepareContainer();this.latestRequest++;var c=this;var f=this.latestRequest;clearTimeout(this.ajID);this.container.select(".hide-button-wrapper").invoke("hide");this.ajID=setTimeout(function(){c.doAjaxRequests(f)},this.options.delay)}return false},doAjaxRequests:function(f,d){if(this.fld.value.length<this.options.minchars){return}for(var c=0;c<this.sources.length;c++){var e=this.sources[c];if(typeof e.script=="function"){this.fld.addClassName("loading");e.script(this.fld.value.strip(),function(g){if(f==this.latestRequest){this.aSuggestions[e.id]=g||[];g&&this.createList(this.aSuggestions[e.id],e);this.fld.removeClassName("loading")}}.bind(this))}else{this.doAjaxRequest(e,f,d)}}},doAjaxRequest:function(f,g,e){var d=f.script+(f.script.indexOf("?")<0?"?":"&")+f.varname+"="+encodeURIComponent(this.fld.value.strip());var i=f.method||"get";var h={};if(f.json){h.Accept="application/json"}else{h.Accept="application/xml"}var c={method:i,requestHeaders:h,onCreate:this.fld.addClassName.bind(this.fld,"loading"),onSuccess:this.setSuggestions.bindAsEventListener(this,f,g),onFailure:function(j){new b.widgets.Notification("$services.localization.render('core.widgets.suggest.transportError')"+j.statusText,"error",{timeout:5})},onComplete:this.fld.removeClassName.bind(this.fld,"loading")};c.defaultValues=Object.clone(c);new Ajax.Request(d,Object.extend(c,e||{}))},setSuggestions:function(d,e,f){if(f<this.latestRequest){return}var c=this.parseResponse(d,e);this.aSuggestions[e.id]=c||[];c&&this.createList(this.aSuggestions[e.id],e)},_getNestedProperty:function(e,d){var c=d.split(".");while(c.length&&(e=e[c.shift()])){}return c.length>0?null:e},parseResponse:function(h,j){var d=[];if(j.json){var k=h.responseJSON;if(!k){return null}if(Object.isArray(k)){var g=k}else{var g=this._getNestedProperty(k,j.resultsParameter||this.options.resultsParameter)}for(var f=0;f<g.length;f++){var c=g[f];d.push({id:this._getNestedProperty(c,j.resultId||this.options.resultId),value:this._getNestedProperty(c,j.resultValue||this.options.resultValue),info:this._getNestedProperty(c,j.resultInfo||this.options.resultInfo),icon:this._getNestedProperty(c,j.resultIcon||this.options.resultIcon),hint:this._getNestedProperty(c,j.resultHint||this.options.resultHint),type:this._getNestedProperty(c,j.resultType||this.options.resultType),url:this._getNestedProperty(c,j.resultURL||this.options.resultURL)})}}else{var e=h.responseXML;var g=e.getElementsByTagName(j.resultsParameter||this.options.resultsParameter)[0].childNodes;for(var f=0;f<g.length;f++){if(g[f].hasChildNodes()){d.push({id:g[f].getAttribute("id"),value:g[f].childNodes[0].nodeValue,info:g[f].getAttribute("info"),icon:g[f].getAttribute("icon"),hint:g[f].getAttribute("hint"),type:g[f].getAttribute("type"),url:g[f].getAttribute("url")})}}}return d},prepareContainer:function(){if(!$(this.options.parentContainer).down(".suggestItems")){var m=new Element("div",{"class":"suggestItems "+this.options.className});var g=$(this.options.parentContainer).tagName.toLowerCase()=="body"?this.fld.cumulativeOffset():this.fld.positionedOffset();var j=this.fld.offsetWidth-2;var l=this.options.width||j;var c=this.fld.viewportOffset().left;var e=$("body").getWidth();if(this.options.align=="left"||(this.options.align=="auto"&&c+this.options.width<e)){m.style.left=g.left+"px"}else{if(this.options.align=="center"){m.style.left=g.left+(j-l)/2+"px"}else{m.style.left=(g.left+j-l)+"px"}}m.style.top=(g.top+this.fld.offsetHeight+this.options.offsety)+"px";m.style[this.options.width?"width":"minWidth"]=l+"px";var p=this;m.onmouseover=function(){p.killTimeout()};m.onmouseout=function(){p.resetTimeout()};this.resultContainer=new Element("div",{"class":"resultContainer"});m.appendChild(this.resultContainer);$(this.options.parentContainer).insert(m);this.container=m;if(this.options.insertBeforeSuggestions){this.resultContainer.insert(this.options.insertBeforeSuggestions)}document.fire("xwiki:suggest:containerCreated",{container:this.container,suggest:this})}if(this.isInMultiSourceMode){for(var r=0;r<this.sources.length;r++){var o=this.sources[r];o.id=o.id||r;if(this.resultContainer.down(".results"+o.id)){if(this.resultContainer.down(".results"+o.id).down("ul")){this.resultContainer.down(".results"+o.id).down("ul").remove()}if(!this.options.unifiedLoader){this.resultContainer.down(".results"+o.id).down(".sourceContent").addClassName("loading")}else{(this.options.loaderNode||this.fld).addClassName("loading");this.resultContainer.down(".results"+o.id).addClassName("hidden").addClassName("loading")}}else{var f=new Element("div",{"class":"results results"+o.id}),h=new Element("div",{"class":"sourceName"});if(this.options.unifiedLoader){f.addClassName("hidden").addClassName("loading")}if(typeof o.icon!="undefined"){var d=new Image();d.onload=function(){this.sourceHeader.setStyle({backgroundImage:"url("+this.iconImage.src+")"});this.sourceHeader.setStyle({textIndent:(this.iconImage.width+6)+"px"})}.bind({sourceHeader:h,iconImage:d});d.src=o.icon}h.insert(o.name);f.insert(h);var t="sourceContent "+(this.options.unifiedLoader?"":"loading");f.insert(new Element("div",{"class":t}));if(typeof o.before!=="undefined"){this.resultContainer.insert(o.before)}this.resultContainer.insert(f);if(typeof o.after!=="undefined"){this.resultContainer.insert(o.after)}}}}else{if(this.resultContainer.down("ul")){this.resultContainer.down("ul").remove()}}var n=typeof this.options.hideButton!=="undefined"&&typeof this.options.hideButton.positions==="object"&&this.options.hideButton.positions.length>0;if(n&&!this.container.down(".hide-button")){var k=this.options.hideButton.positions;for(var r=0;r<k.length;r++){var u=new Element("span",{"class":"hide-button"}).update(this.options.hideButton.text),q={};q[k[r]]=new Element("div",{"class":"hide-button-wrapper"}).update(u);u.observe("click",this.clearSuggestions.bindAsEventListener(this));this.container.insert(q)}}var s=this.container.fire("xwiki:suggest:containerPrepared",{container:this.container,suggest:this});return this.container},createList:function(c,d){this._createList(c,d);if(!this.isInMultiSourceMode||!this.resultContainer.down(".results.loading")){document.fire("xwiki:suggest:updated",{container:this.container,suggest:this})}},_createList:function(f,d){this.isActive=true;var c=this;this.killTimeout();if(this.isInMultiSourceMode){var j=this.resultContainer.down(".results"+d.id);j.removeClassName("loading");j.down(".sourceContent").removeClassName("loading");(f.length>0||this.options.shownoresults)&&j.removeClassName("hidden");if(this.options.unifiedLoader&&!this.resultContainer.down(".results.loading")){(this.options.loaderNode||this.fld).removeClassName("loading")}}else{var j=this.resultContainer}if(f.length==0&&!this.options.shownoresults){return false}j.down("ul")&&j.down("ul").remove();this.container.select(".hide-button-wrapper").invoke("show");var h=new b.widgets.XList([],{icon:this.options.icon,classes:"suggestList",eventListeners:{click:function(i){c.setHighlightedValue(i);return false},mouseover:function(){c.setHighlight(this.getElement())}}});for(var e=0,g=f.length;e<g;e++){var m=function(i){return((i||"")+"").escapeHTML()};var k=new Element("div").insert(new Element("span",{"class":"suggestId"}).update(m(f[e].id))).insert(new Element("span",{"class":"suggestValue"}).update(m(f[e].value))).insert(new Element("span",{"class":"suggestInfo"}).update(m(f[e].info))).insert(new Element("span",{"class":"suggestURL"}).update(m(f[e].url)));var l=new b.widgets.XListItem(this.createItemDisplay(f[e],d),{containerClasses:"suggestItem "+(f[e].type||""),value:k,noHighlight:true});h.addItem(l)}if(f.length==0){h.addItem(new b.widgets.XListItem(this.options.noresults,{classes:"noSuggestion",noHighlight:true}))}j.appendChild(h.getElement());this.suggest=j;var c=this;if(this.options.timeout>0){this.toID=setTimeout(function(){c.clearSuggestions()},this.options.timeout)}},createItemDisplay:function(g,c){var h=this.sInput?this.sInput.escapeHTML():this.sInput;var k=((g.value||"")+"").escapeHTML();var e=c.highlight?this.emphasizeMatches(h,k):k;if(g.hint){var d=(g.hint+"").escapeHTML();e+="<span class='hint'>"+d+"</span>"}if(!this.options.displayValue){var j=new Element("span",{"class":"info"}).update(e)}else{var j=new Element("div").insert(new Element("div",{"class":"value"}).update(e));if(g.info){var i=g.info+"";if(c.resultInfoHTML===undefined?!this.options.resultInfoHTML:!c.resultInfoHTML){i=i.escapeHTML()}j.insert(new Element("div",{"class":"info"}).update("<span class='legend'>"+this.options.displayValueText+"</span>"+i))}}if(g.icon){if(g.icon.indexOf(".")>=0||g.icon.indexOf("/")>=0){var f=new Element("img",{src:g.icon,"class":"icon"})}else{var f=new Element("i",{"class":"icon "+g.icon})}j.insert({top:f})}return j},emphasizeMatches:function(k,m){if(!k){return m}var c=m,i=k.split(/\s+/).uniq().compact(),d=0,g={};for(var e=0,n=i.length;e<n;e++){var h=c.toLowerCase().indexOf(i[e].toLowerCase());while(h>=0){var f=c.substring(h,h+i[e].length),l="";i[e].length.times(function(){l+=" "});g[h]=f;c=c.substring(0,h)+l+c.substring(h+i[e].length);h=c.toLowerCase().indexOf(i[e].toLowerCase())}}Object.keys(g).sortBy(function(j){return parseInt(j)}).each(function(j){var o=c.substring(0,parseInt(j)+d);var p=c.substring(parseInt(j)+g[j].length+d);c=o+"<em>"+g[j]+"</em>"+p;d+=9});return c},changeHighlight:function(c){var f=this.resultContainer;if(!f){return false}var g,d;if(this.iHighlighted){if(c==Event.KEY_DOWN){d=this.iHighlighted.next();if(!d&&this.iHighlighted.up("div.results")){var e=this.iHighlighted.up("div.results").next();while(e&&!d){d=e.down("li");e=e.next()}}if(!d){d=f.down("li")}}else{if(c==Event.KEY_UP){d=this.iHighlighted.previous();if(!d&&this.iHighlighted.up("div.results")){var e=this.iHighlighted.up("div.results").previous();while(e&&!d){d=e.down("li:last-child");e=e.previous()}}if(!d){d=f.select("ul")[f.select("ul").length-1].down("li:last-child")}}}}else{if(c==Event.KEY_DOWN){if(f.down("div.results")){d=f.down("div.results").down("li")}else{d=f.down("li")}}else{if(c==Event.KEY_UP){if(f.select("li")>0){d=f.select("li")[f.select("li").length-1]}}}}if(d){this.setHighlight(d)}},setHighlight:function(c){if(this.iHighlighted){this.clearHighlight()}c.addClassName("xhighlight");this.iHighlighted=c;this.killTimeout()},clearHighlight:function(){if(this.iHighlighted){this.iHighlighted.removeClassName("xhighlight");delete this.iHighlighted}},highlightFirst:function(){if(this.suggest&&this.suggest.down("ul")){var c=this.suggest.down("ul").down("li");if(c){this.setHighlight(c)}}},hasActiveSelection:function(){return this.iHighlighted},setHighlightedValue:function(c){if(this.iHighlighted&&!this.iHighlighted.hasClassName("noSuggestion")){var m=function(i){return i.textContent||i.innerText};var j=this.iHighlighted.down("img.icon");var f={suggest:this,id:m(this.iHighlighted.down(".suggestId")),value:m(this.iHighlighted.down(".suggestValue")),info:m(this.iHighlighted.down(".suggestInfo")),url:m(this.iHighlighted.down(".suggestURL")),icon:j?j.src:"",originalEvent:c};var k,l;if(this.sInput==""&&this.fld.value==""){k=l=f.value}else{if(this.seps){var d=-1;for(var g=0;g<this.seps.length;g++){if(this.fld.value.lastIndexOf(this.seps.charAt(g))>d){d=this.fld.value.lastIndexOf(this.seps.charAt(g))}}if(d==-1){k=l=f.value}else{l=this.fld.value.substring(0,d+1)+f.value;k=l.substring(d+1)}}else{k=l=f.value}}var c=Event.fire(this.fld,"xwiki:suggest:selected",Object.clone(f));if(!c.stopped){this.sInput=k;this.fld.value=l;this.fld.focus();this.clearSuggestions();typeof this.options.callback=="function"&&this.options.callback(Object.clone(f));if(this.fld.id.indexOf("_suggest")>0){var e=this.fld.id.substring(0,this.fld.id.indexOf("_suggest"));var h=$(e);if(h){h.value=f.info}}}}},killTimeout:function(){clearTimeout(this.toID)},resetTimeout:function(){clearTimeout(this.toID);var c=this;this.toID=setTimeout(function(){c.clearSuggestions()},1000)},clearSuggestions:function(){this.clearHighlight();this.killTimeout();this.isActive=false;var c=$(this.container);var e=this;if(c&&c.parentNode){if(this.options.fadeOnClear){var d=new Effect.Fade(c,{duration:"0.25",afterFinish:function(){if($(e.container)){$(e.container).remove()}}})}else{$(this.container).remove()}document.fire("xwiki:suggest:clearSuggestions",{suggest:this})}},detach:function(){if(this.fld){Event.stopObserving(this.fld,"keyup",this.onKeyUp);if(Prototype.Browser.IE||Prototype.Browser.WebKit){Event.stopObserving(this.fld,"keydown",this.onKeyPress)}else{Event.stopObserving(this.fld,"keypress",this.onKeyPress)}this.clearSuggestions();this.fld.__x_suggest=null;this.fld.setAttribute("autocomplete","on")}}})}return b})(XWiki||{});