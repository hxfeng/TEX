require(["$!services.webjars.url('org.xwiki.platform:xwiki-platform-tree-webjar', 'require-config.min.js', {'evaluate': true})"],function(){require(["tree"],function(a){a(".location-picker").each(function(){var c=a(this);var b=c.find(".location-action-pick");var d=c.find(".modal");var f=d.find(".location-tree");var e=d.find(".modal-footer .btn-primary");b.click(function(g){g.preventDefault();d.modal()});d.on("shown.bs.modal",function(i){var h=b.attr("data-openTo");if(h&&h!==d.data("openTo")){d.data("openTo",h)}else{h=false}var g=a.jstree.reference(f);if(!g){g=f.xtree({core:{multiple:f.data("multiple")==="true"}}).one("ready.jstree",function(j,k){h&&k.instance.openTo(h)}).on("changed.jstree",function(j,k){e.prop("disabled",k.selected.size()===0)}).on("dblclick",".jstree-anchor",function(){e.click()})}else{if(h){g.deselect_all();g.close_all();g.openTo(h)}}});e.click(function(){d.modal("hide");d.triggerHandler("xwiki:locationTreePicker:select",{tree:a.jstree.reference(f)})})})})});require(["jquery","xwiki-meta"],function(a,b){a(".location-picker").each(function(){var c=a(this);var d=c.find(".location-wiki-field");var e=c.find("input.location-parent-field");c.find(".location-action-pick").click(function(k){var i=e.val();if(i){var f=d.val()||b.wiki;var h=XWiki.Model.resolve(i,XWiki.EntityType.SPACE,[f]);var g=new XWiki.EntityReference("WebHome",XWiki.EntityType.DOCUMENT,h);var j="document:"+XWiki.Model.serialize(g);a(this).attr("data-openTo",j)}});c.find(".modal").on("xwiki:locationTreePicker:select",function(g,l){var f=l.tree.get_selected()[0];var o=f.indexOf(":");var k=f.substr(0,o);var n=f.substr(o+1);var m=XWiki.Model.resolve(n,XWiki.EntityType.byName(k));var h=m.extractReference(XWiki.EntityType.WIKI);d.val(h?h.name:"");var i=m.extractReference(XWiki.EntityType.SPACE);var j=i?XWiki.Model.serialize(i.relativeTo(h)):"";e.val(j);e.triggerHandler("input")})})});require(["jquery","xwiki-meta","xwiki-events-bridge"],function(a,b){a(".location-picker").each(function(){var l=a(this);var o=l.find("input.location-title-field");var n=l.find(".location-wiki-field");var i=l.find("input.location-parent-field");var j=l.find("input.location-name-field");var p=l.find(".breadcrumb");var g=500;var u;var h=function(v){return v};var k=function(v){var w=p.children(".preview");if(w.length===0){w=a(document.createElement("li")).addClass("preview active").appendTo(p)}w.text(v)};var f=function(v){d();j.val(h(o.val()))};var d=function(){k(o.val())};var r=function(v){if(!o.val()){k(j.val())}};var t=function(){var v=o.val();k(v?v:j.val())};var m=function(w,x){var v;if(x){v=x.value}else{v=i.val()}clearTimeout(u);u=setTimeout(function(){q(n.val(),v)},g)};var s=function(v){q(n.val())};var q=function(v,y){v=v||n.val();y=y||i.val();var x=XWiki.Model.resolve(y||b.space,XWiki.EntityType.SPACE);var w=new XWiki.EntityReference("WebHome",XWiki.EntityType.DOCUMENT,x);v&&x.appendParent(new XWiki.WikiReference(v));a.post(e(),{xpage:"hierarchy_reference",reference:XWiki.Model.serialize(w)},function(A){var z=a(A);p.replaceWith(z);p=z;y||p.find("li").not(".wiki").remove();p.find(".active").removeClass("active");t()})};var e=function(){var w=XWiki.Model.resolve(b.space,XWiki.EntityType.SPACE);var x=w.getReversedReferenceChain().map(function(y){return encodeURIComponent(y.name)}).join("/");var v=XWiki.Document.URLTemplate;v=v.replace("__space__",x);v=v.replace("__page__",b.page);v=v.replace("__action__","get");return v};o.on("input",f);n.change(s);j.on("input",r);i.on("input xwiki:suggest:selected",m);if(!i.val()){m()}if(!j.val()){f()}else{d()}var c=l.find(".location-edit");l.find(".location-action-edit").click(function(v){v.preventDefault();c.toggleClass("hidden")})})});require(["jquery"],function(g){var c=function(i){return i.find(".location-actions").length>0&&i.find(".location-action-edit").length==0};var b=function(j){var m=j.find("input.location-name-field");if(m.length===0){return null}var k=j.find("input.location-title-field");var i=k.length>0&&c(j);var l=new LiveValidation(m[0],{validMessage:"$services.localization.render('core.validation.valid.message')",insertAfterWhatNode:i?k[0]:m[0]});l.displayMessageWhenEmpty=true;l.add(Validate.Custom,{failureMessage:"$services.localization.render('core.validation.required.message')",against:function(n){return !m.hasClass("empty")&&typeof n==="string"&&n.strip().length>0}});k.on("input",function(){setTimeout(function(){l.validate()},0)});return l};var h=function(l){var i=l.find("input.location-parent-field");if(i.length>0){var j=l.find(".breadcrumb-container");var k=j.length>0&&c(l);var m=new LiveValidation(i[0],{validMessage:"$services.localization.render('core.validation.valid.message')",onlyOnBlur:true,insertAfterWhatNode:k?j[0]:i[0]});m.displayMessageWhenEmpty=true;return m}else{return null}};var e=function(j,i,k){if(j._customValuesParams){j.remove(Validate.Custom,j._customValuesParams);delete j._customValuesParams}if(i.length>0){j._customValuesParams={failureMessage:k,against:function(n){for(var m=0;m<i.length;m++){var l=i[m];if(l===n||n.indexOf(l+".")===0){return true}}return false}};j.add(Validate.Custom,j._customValuesParams)}};var d=function(j,i){j.add(Validate.Custom,{failureMessage:"$services.localization.render('core.validation.required.message')",against:function(k){if(i.prop("checked")){return typeof k==="string"&&k.strip().length>0}else{return true}}});i.change(function(){j.validate()})};var f=function(j,i){j.change(function(){j.prop("checked")&&i.prop("checked",false)});i.change(function(){i.prop("checked")&&j.prop("checked",false)})};var a=[];g(".location-picker").each(function(){var k=g(this);var o=[];var m=h(k);if(m){o.push(m);k.data("spaceValidator",m)}var n=b(k);if(n){o.push(n);k.data("pageValidator",n)}a.push.apply(a,o);var l=k.find(".location-edit");var j=k.find(".location-action-edit");k.closest("form").submit(function(p){var q=LiveValidation.massValidate(o);if(!q&&l.hasClass("hidden")){j.click()}});var i=k.find("input.location-parent-field");i.on("input",function(){m.validate()})});g("form#create").each(function(){var k=g(this);var j=k.find(".location-picker");var l=j.data("spaceValidator");d(l,k.find("#terminal"));var m=function(o){var n=(o.attr("data-restrictions-are-suggestions")=="true");var r=[];var p=o.attr("data-allowed-spaces");if(!n&&p){r=g.parseJSON(o.attr("data-allowed-spaces"))}var q=o.attr("data-allowed-spaces-message");e(l,r,q)};k.find(".xwiki-select").on("xwiki:select:updated",function(o){var n=g('input[name="type"]:checked');m(n);l.validate()});var i=k.find('input[name="templateprovider"]');if(i.length==0){i=k.find('.xwiki-select input[name="type"]:checked')}m(i)});g("form#copy, form#rename").each(function(){var l=g(this);var k=l.find(".location-picker");var m=k.data("spaceValidator");var i=l.find('input[name="terminal"]');var j=l.find('input[name="deep"]');var n=l.find('select[name="language"]');d(m,i);f(j,i);n.change(function(){if(n.val()==="ALL"){j.prop("disabled",false)}else{j.prop({checked:false,disabled:true})}})})});