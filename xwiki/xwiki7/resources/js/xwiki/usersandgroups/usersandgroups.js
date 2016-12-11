MSCheckbox=Class.create({initialize:function(d,c,f,b,e,a){this.table=e;this.idx=a;if(this.table&&this.idx&&this.table.fetchedRows[this.idx]){this.currentUorG=this.table.fetchedRows[this.idx].fullname;this.isUserInGroup=this.table.fetchedRows[this.idx].isuseringroup}else{this.currentUorG=window.unregUser;this.isUserInGroup=false}this.domNode=$(d);this.right=c;this.saveUrl=f;this.defaultState=b;this.state=b;this.states=[0,1,2];this.nrstates=this.states.length;this.images=["$xwiki.getSkinFile('js/xwiki/usersandgroups/img/none.png')","$xwiki.getSkinFile('js/xwiki/usersandgroups/img/allow.png')","$xwiki.getSkinFile('js/xwiki/usersandgroups/img/deny1.png')"];this.labels=["","",""];this.draw(this.state);this.attachEvents()},draw:function(b){while(this.domNode.childNodes.length>0){this.domNode.removeChild(this.domNode.firstChild)}var a=document.createElement("img");a.src=this.images[b];this.domNode.appendChild(a);if(this.labels[b]!=""){var c=document.createElement("span");c.appendChild(document.createTextNode(this.labels[b]));this.domNode.appendChild(c)}},next:function(){this.state=(this.state+1)%this.nrstates;if(this.table!=undefined){delete this.table.fetchedRows[this.idx]}this.draw(this.state)},createClickHandler:function(a){return function(){if(a.req){return}var e="";var d=(a.state+1)%a.nrstates;if(a.currentUorG==window.currentUser){if(d==2){var c="$escapetool.javascript($services.localization.render('rightsmanager.denyrightforcurrentuser'))".replace("__right__",a.right);if(!confirm(c)){var f="$escapetool.javascript($services.localization.render('rightsmanager.clearrightforcurrentuserinstead'))".replace("__right__",a.right);if(confirm(f)){e="clear";a.state=2;d=0}else{return}}}else{if(d==0){var f="$escapetool.javascript($services.localization.render('rightsmanager.clearrightforcurrentuser'))".replace("__right__",a.right);if(!confirm(f)){return}}}}else{if(a.isUserInGroup||(window.currentUser=="XWiki.XWikiGuest"&&a.currentUorG=="XWiki.XWikiAllGroup")){if(d==2){var c="$escapetool.javascript($services.localization.render('rightsmanager.denyrightforgroup'))".replace(/__right__/g,a.right);c=c.replace("__name__",a.currentUorG);if(!confirm(c)){var f="$escapetool.javascript($services.localization.render('rightsmanager.clearrightforgroupinstead'))".replace(/__right__/g,a.right);f=f.replace("__name__",a.currentUorG);if(confirm(f)){e="clear";a.state=2;d=0}else{return}}}else{if(d==0){var f="$escapetool.javascript($services.localization.render('rightsmanager.clearrightforgroup'))".replace(/__right__/g,a.right);f=f.replace("__name__",a.currentUorG);if(!confirm(f)){return}}}}else{if(a.right=="admin"){if(d==2){var c="$escapetool.javascript($services.localization.render('rightsmanager.denyrightforuorg'))".replace("__right__",a.right);c=c.replace("__name__",a.currentUorG);if(!confirm(c)){return}}else{if(d==0){var f="$escapetool.javascript($services.localization.render('rightsmanager.clearrightforuorg'))".replace("__right__",a.right);f=f.replace("__name__",a.currentUorG);if(!confirm(f)){return}}}}}}if(e==""){if(d==0){e="clear"}else{if(d==1){e="allow"}else{e="deny"}}}var b=a.saveUrl+"&action="+e+"&right="+a.right;a.req=new Ajax.Request(b,{method:"get",onSuccess:function(h){if(h.responseText.strip()=="SUCCESS"){a.next()}else{alert("$services.localization.render('platform.core.rightsManagement.saveFailure')");var g=unescape(window.location.pathname);window.location.href=g}},onFailure:function(){alert("$services.localization.render('platform.core.rightsManagement.ajaxFailure')")},onComplete:function(){delete a.req}})}},attachEvents:function(){Event.observe(this.domNode,"click",this.createClickHandler(this))}});function displayUsers(s,j,r,b){var d=s.userurl;var f=s.usersaveurl;var l=s.userinlineurl;var g=s.wikiname;var e=s.docurl;var n=document.createElement("tr");var h=document.createElement("td");h.setAttribute("data-title","$escapetool.javascript($services.localization.render('xe.admin.users.username'))");if(g=="local"){var o=document.createElement("a");o.href=d;o.appendChild(document.createTextNode(s.username));h.appendChild(o)}else{h.appendChild(document.createTextNode(s.username))}h.className="username";n.appendChild(h);var k=document.createElement("td");k.setAttribute("data-title","$escapetool.javascript($services.localization.render('xe.admin.users.firstname'))");k.appendChild(document.createTextNode(s.firstname));n.appendChild(k);var m=document.createElement("td");m.setAttribute("data-title","$escapetool.javascript($services.localization.render('xe.admin.users.lastname'))");m.appendChild(document.createTextNode(s.lastname));n.appendChild(m);var c=document.createElement("td");c.setAttribute("data-title","$escapetool.javascript($services.localization.render('xe.admin.users.manage'))");c.className="manage";if(g=="local"){var p=document.createElement("img");p.src='$xwiki.getSkinFile("js/xwiki/usersandgroups/img/edit.png")';p.title="$services.localization.render('edit')";Event.observe(p,"click",editUserOrGroup(l,f,e));p.className="icon-manage";c.appendChild(p);var q=document.createElement("img");if(s.grayed=="true"){q.src='$xwiki.getSkinFile("js/xwiki/usersandgroups/img/clearg.png")';q.className="icon-manageg"}else{q.src='$xwiki.getSkinFile("js/xwiki/usersandgroups/img/clear.png")';Event.observe(q,"click",deleteUserOrGroup(j,r,s.fullname,"user",b));q.className="icon-manage"}q.title="$services.localization.render('delete')";c.appendChild(q)}n.appendChild(c);return n}function displayGroups(r,k,q,b){var d=r.userurl;var l=r.userinlineurl;var f=r.usersaveurl;var h=r.wikiname;var e=r.docurl;var m=document.createElement("tr");var j=document.createElement("td");j.setAttribute("data-title","$escapetool.javascript($services.localization.render('xe.admin.groups.groupname'))");if(h=="local"){var n=document.createElement("a");n.href=d;n.appendChild(document.createTextNode(r.username));j.appendChild(n)}else{j.appendChild(document.createTextNode(r.username))}j.className="username";m.appendChild(j);var g=document.createElement("td");g.setAttribute("data-title","$escapetool.javascript($services.localization.render('xe.admin.groups.members'))");if(h=="local"){g.appendChild(document.createTextNode(r.members))}else{g.appendChild(document.createTextNode("-"))}m.appendChild(g);var c=document.createElement("td");c.setAttribute("data-title","$escapetool.javascript($services.localization.render('xe.admin.groups.manage'))");c.className="manage";if(h=="local"){var p=document.createElement("img");p.src='$xwiki.getSkinFile("js/xwiki/usersandgroups/img/clear.png")';p.title="$services.localization.render('delete')";Event.observe(p,"click",deleteUserOrGroup(k,q,r.fullname,"group",b));p.className="icon-manage";var o=document.createElement("img");o.src='$xwiki.getSkinFile("js/xwiki/usersandgroups/img/edit.png")';o.title="$services.localization.render('edit')";Event.observe(o,"click",editUserOrGroup(l,f,e));o.className="icon-manage";c.appendChild(o);c.appendChild(p)}m.appendChild(c);return m}function displayMembers(l,e,k,b){var f=document.createElement("tr");var d=document.createElement("td");var h=document.createTextNode(l.prettyname);if(l.wikiname=="local"){var g=document.createElement("a");g.href=l.memberurl;g.appendChild(h);d.appendChild(g)}else{d.appendChild(h)}d.className="username";f.appendChild(d);if(k.action=="inline"){var c=document.createElement("td");c.className="manage";var j=document.createElement("img");if(l.grayed=="true"){j.src='$xwiki.getSkinFile("js/xwiki/usersandgroups/img/clearg.png")';j.className="icon-manageg"}else{j.src='$xwiki.getSkinFile("js/xwiki/usersandgroups/img/clear.png")';Event.observe(j,"click",deleteMember(e,k,l.fullname,l.docurl,b));j.className="icon-manage"}j.title="$services.localization.render('delete')";c.appendChild(j);f.appendChild(c)}return f}function displayUsersAndGroups(q,e,p,n,b,j){var c=q.userurl;var g=p.json.uorg;var o=q.allows;var m=q.denys;if(j===undefined){j=XWiki.currentDocument}var h=j.getURL("view","xpage=saverights&clsname="+p.json.clsname+"&fullname="+encodeURIComponent(q.fullname)+"&uorg="+g);if(b!=undefined){h+="&form_token="+b}var k=document.createElement("tr");var d=document.createElement("td");if(g=="groups"){d.setAttribute("data-title","$escapetool.javascript($services.localization.render('rightsmanager.groupname'))")}else{d.setAttribute("data-title","$escapetool.javascript($services.localization.render('rightsmanager.username'))")}if(q.wikiname=="local"){var l=document.createElement("a");l.href=c;l.appendChild(document.createTextNode(q.username));d.appendChild(l)}else{d.appendChild(document.createTextNode(q.username))}var f={view:"$escapetool.javascript($services.localization.render('rightsmanager.view'))",comment:"$escapetool.javascript($services.localization.render('rightsmanager.comment'))",edit:"$escapetool.javascript($services.localization.render('rightsmanager.edit'))",script:"$escapetool.javascript($services.localization.render('rightsmanager.script'))","delete":"$escapetool.javascript($services.localization.render('rightsmanager.delete'))",admin:"$escapetool.javascript($services.localization.render('rightsmanager.admin'))",register:"$escapetool.javascript($services.localization.render('rightsmanager.register'))",programming:"$escapetool.javascript($services.localization.render('rightsmanager.programming'))",createwiki:"$escapetool.javascript($services.localization.render('rightsmanager.createwiki'))"};d.className="username";k.appendChild(d);window.activeRights.each(function(i){if(i){var t=document.createElement("td");t.className="rights";t.setAttribute("data-title",f[i]);var s=0;if(o.match("\\b"+i+"\\b")){s=1}else{if(m.match("\\b"+i+"\\b")){s=2}}var a=new MSCheckbox(t,i,h,s,p,e);k.appendChild(t)}});return k}function editUserOrGroup(a,c,b){return function(){window.lb=new Lightbox(a,c,b)}}function deleteUserOrGroup(c,d,b,a,e){return function(){var f="$escapetool.javascript($services.localization.render('rightsmanager.confirmdeletegroup'))";if(a=="user"){f="$escapetool.javascript($services.localization.render('rightsmanager.confirmdeleteuser'))"}if(confirm(f.replace("__name__",b))){new Ajax.Request("",{method:"get",parameters:{xpage:"deleteuorg",docname:b,form_token:e},onSuccess:function(g){d.deleteRow(c)}})}}}function deleteMember(b,c,a,e,d){return function(){var f=e+"?xpage=deletegroupmember&fullname="+a;if(d!=undefined){f+="&form_token="+d}if(confirm("$escapetool.javascript($services.localization.render('rightsmanager.confirmdeletemember'))")){new Ajax.Request(f,{method:"get",onSuccess:function(g){c.deleteRow(b)}})}}}function makeAddHandler(b,c,a){return function(){window.lb=new Lightbox(b,c,a)}}function setBooleanPropertyFromLiveCheckbox(c,b,a,d){return function(){var k="$xwiki.getURL('XWiki.XWikiPreferences', 'save')";var h="XWiki.XWikiPreferences";var j="0";if(b!=undefined&&b.length>0){k=b}if(a!=undefined&&a.length>0){h=a}if(d!=undefined){j=d}var e=c;var f="yes";var g="$xwiki.getSkinFile('js/xwiki/usersandgroups/img/allow-black.png')";var l="1";if(c.getAttribute("alt")=="yes"){f="no";g="$xwiki.getSkinFile('js/xwiki/usersandgroups/img/none.png')";l="0"}var i={};i.parameters={};i.parameters[h+"_"+j+"_"+c.id]=l;i.parameters["ajax"]="1";i.onSuccess=function(){e.alt=f;e.src=g};new Ajax.Request(k,i)}}function setGuestExtendedRights(a){return function(){var c='$xwiki.getURL("XWiki.XWikiPreferences", "save")';var b=a;if(a.getAttribute("alt")=="yes"){if(a.id.indexOf("view")>0){new Ajax.Request(c,{method:"post",parameters:{"XWiki.XWikiPreferences_0_authenticate_view":"0"},onSuccess:function(){b.alt="no";b.src="$xwiki.getSkinFile('js/xwiki/usersandgroups/img/none.png')"}})}else{new Ajax.Request(c,{method:"post",parameters:{"XWiki.XWikiPreferences_0_authenticate_edit":"0"},onSuccess:function(){b.alt="no";b.src="$xwiki.getSkinFile('js/xwiki/usersandgroups/img/none.png')"}})}}else{if(a.id.indexOf("view")>0){new Ajax.Request(c,{method:"post",parameters:{"XWiki.XWikiPreferences_0_authenticate_view":"1"},onSuccess:function(){b.alt="yes";b.src="$xwiki.getSkinFile('js/xwiki/usersandgroups/img/allow-black.png')"}})}else{new Ajax.Request(c,{method:"post",parameters:{"XWiki.XWikiPreferences_0_authenticate_edit":"1"},onSuccess:function(){b.alt="yes";b.src="$xwiki.getSkinFile('js/xwiki/usersandgroups/img/allow-black.png')"}})}}}};