var XWiki=(function(e){e.ExtensionBehaviour=Class.create({initialize:function(f){this.finalize();this.container=f;this.container._extensionBehaviour=this;this._enhanceActions();this._enhanceMenuBehaviour();this._enhanceDescriptionBehaviour();this._enhanceDependenciesBehaviour();this._maybeScheduleRefresh()},finalize:function(){if(this.container){delete this.container._extensionBehaviour;this.container.remove()}this.container=undefined},getNamespace:function(){var f=this.container.down('input[name="extensionNamespace"]');return f?f.value:null},getId:function(){var f=this.container.down('input[name="extensionId"]');return f?f.value:null},getVersion:function(){var f=this.container.down('input[name="extensionVersion"]');return f?f.value:null},getStatus:function(){var g=$w(this.container.className);for(var f=0;f<g.length;f++){if(g[f].startsWith("extension-item-")){return g[f].substr(15)}}return null},_getServiceURL:function(g){if(g){g=e.getResource(g);g=new e.Document(g.name,g.space,g.wiki)}else{g=e.currentDocument}var f=e.contextaction=="view"||e.contextaction=="admin"?"get":e.contextaction;return g.getURL(f)},_onAjaxRequestFailure:function(f){if(f.status==401){new e.widgets.ConfirmationBox({onYes:function(){window.location.reload(true)}},{confirmationText:"$escapetool.javascript($services.localization.render('extensions.info.fetch.unauthorized'))"});return false}else{var g=f.statusText;if(f.statusText==""||f.status==12031){g="Server not responding"}new e.widgets.Notification("$escapetool.javascript($services.localization.render('extensions.info.fetch.failed'))"+g,"error");return true}},_submit:function(i,g){i.stop();var h=i.element().form;var j=new Hash(h.serialize({submit:false}));j.set(i.element().name,i.element().value);h.disable();var f={parameters:j,onFailure:this._onAjaxRequestFailure.bind(this),on0:function(k){k.request.options.onFailure(k)},onComplete:function(){h.enable()}};f.defaultValues=Object.clone(f);new Ajax.Request(this._getServiceURL(j.get("section")),Object.extend(f,g))},_update:function(j){var i=this.container.down(".extension-body");var k=!i||i.hasClassName("hidden");var g=this.container.down(".innerMenu li a.current");g&&(this._previouslySelectedMenuItem=g.getAttribute("href"));var f=this.getStatus();this.container.addClassName("hidden");this.container.insert({after:j});this.initialize(this.container.next());var l=this.container.down(".extension-body");var h=!l||l.hasClassName("hidden");k&&!h&&this._onToggleShowHideDetails({stop:function(){},element:function(){return this.container.down('button[value="hideDetails"]')}.bind(this)});if(f!=this.getStatus()){document.fire("xwiki:extension:statusChanged",{extension:this})}document.fire("xwiki:dom:updated",{elements:[this.container]})},_onShowDetails:function(f){this._submit(f,{onCreate:function(){this.container.insert({bottom:new Element("div",{"class":"extension-body loading"})})}.bind(this),onSuccess:function(g){this._update(g.responseText)}.bind(this),onComplete:function(g){g.request.options.defaultValues.onComplete(g);var h=this.container.down(".extension-body.loading");h&&h.remove()}.bind(this)})},_enhanceShowDetailsBehaviour:function(){var g=this.container.down('button[value="showDetails"]');if(!g){return}if(g.hasClassName("visibilityAction")){g=g.up();var f=this.container.down('button[value="hideDetails"]').up();g.__otherButton=f;f.__otherButton=g;this.container.select(".visibilityAction").invoke("observe","click",this._onToggleShowHideDetails.bindAsEventListener(this));g.remove()}else{g.observe("click",this._onShowDetails.bindAsEventListener(this))}},_onToggleShowHideDetails:function(g){g.stop();var f=g.element().up("span");this.container.down(".extension-body").toggleClassName("hidden");f.replace(f.__otherButton)},_enhanceActions:function(){this._enhanceShowDetailsBehaviour();var f=this._startJob.bindAsEventListener(this);this.container.select('button[name="extensionAction"]').each(function(g){if(!g.value.endsWith("Details")){g.observe("click",f)}})},_onBeforeStartJob:function(){var f=this.container.down(".extension-body");if(f){f.hasClassName("hidden")&&this._onToggleShowHideDetails({stop:function(){},element:function(){return this.container.down('button[value="showDetails"]')}.bind(this)});var g=this._prepareProgressSectionForLoading();this._activateMenuItem(f.down('.innerMenu li a[href="#'+g.previous().id+'"]'))}else{this.container.insert({bottom:new Element("div",{"class":"extension-body loading"})})}},_prepareProgressSectionForLoading:function(){var i=this.container.down(".extension-body-progress");if(!i){var g=this.container.select(".extension-body-section").last();i=new Element("div",{"class":"extension-body-progress extension-body-section loading"});g.insert({after:i});var f="extension-body-progress"+g.previous().id.substr($w(g.className)[0].length);g.insert({after:new Element("div",{id:f})});var j="$escapetool.javascript($services.localization.render('extensions.info.category.progress'))";var h=new Element("a",{href:"#"+f}).update(j);this._enhanceMenuItemBehaviour(h);this.container.down(".innerMenu").insert(new Element("li").insert(h))}else{if(i.down(".log-item-loading")){i.down(".extension-question").hide()}else{i.childElements().invoke("hide");i.addClassName("loading")}}return i},_onAfterStartJob:function(g){g.request.options.defaultValues.onComplete(g);var f=this.container.down(".extension-body.loading");if(f){f.remove()}else{this._restoreProgressSection()}},_restoreProgressSection:function(){var f=this.container.down(".extension-body-progress");if(f){f.childElements().invoke("show");f.removeClassName("loading")}},_startJob:function(f){this._submit(f,{onCreate:this._onBeforeStartJob.bind(this),onSuccess:function(g){this._update(g.responseText)}.bind(this),onComplete:this._onAfterStartJob.bind(this)})},refresh:function(f){this.container.addClassName("extension-item-loading");this._refresh(f);this.container.disable()},_refresh:function(g){var f=new Hash(this.container.serialize({submit:false}));g&&f.update(g);this._preserveMenuSelection=true;new Ajax.Request(this._getServiceURL(f.get("section")),{parameters:f,onSuccess:function(h){this._update(h.responseText)}.bind(this),onFailure:function(h){if(this._onAjaxRequestFailure(h)){this._maybeScheduleRefresh(10)}}.bind(this),on0:function(h){h.request.options.onFailure(h)}})},_maybeScheduleRefresh:function(f){f=f||1;this.container.hasClassName("extension-item-loading")&&!this.container.down('button[value="continue"]')&&this._refresh.bind(this).delay(f)},_enhanceMenuBehaviour:function(){var g=".innerMenu li a";var f=this.container.down(g+".current");if(!f||this._preserveMenuSelection){if(this._previouslySelectedMenuItem){f=this.container.down(g+'[href="'+this._previouslySelectedMenuItem+'"]')}else{if(!f){f=this.container.down(g)}}}this._preserveMenuSelection=false;if(f){this._activateMenuItem(f);this.container.select(g).each(this._enhanceMenuItemBehaviour,this)}},_enhanceMenuItemBehaviour:function(f){f.observe("click",function(g){g.stop();this._activateMenuItem(g.element())}.bindAsEventListener(this))},_activateMenuItem:function(g){this.container.select(".extension-body-section").invoke("setStyle",{display:"none"});var f=this.container.down(".innerMenu li a.current");if(f){f.removeClassName("current")}$(g.getAttribute("href").substring(1)).next(".extension-body-section").setStyle({display:"block"});g.addClassName("current")},_enhanceDependenciesBehaviour:function(){if(!this.container.hasClassName("extension-item-loading")){this._resolveUnknownDependency(this.container.select(".dependency-item.extension-item-unknown"),0)}},_resolveUnknownDependency:function(h,g){if(g>=h.length){return}var i=new Hash(this.container.serialize({submit:false}));i.unset("extensionVersion");i.unset("form_token");var f=h[g];i.set("extensionId",f.down(".extension-name").innerHTML);i.set("extensionVersionConstraint",f.down(".extension-version").innerHTML);new Ajax.Request(this._getServiceURL(i.get("section")),{parameters:i,onCreate:function(){f.removeClassName("extension-item-unknown").addClassName("extension-item-loading")},onSuccess:function(j){if(f.up("html")){f.insert({before:j.responseText});d(f.previous());f.remove();this._resolveUnknownDependency(h,g+1)}}.bind(this),onFailure:function(j){f.removeClassName("extension-item-loading").addClassName("extension-item-unknown");this._onAjaxRequestFailure(j)}.bind(this),on0:function(j){j.request.options.onFailure(j)}})},_enhanceDescriptionBehaviour:function(){var f=this.container.down(".extension-versions-link");f&&f.observe("click",function(g){g.stop();g.element().hide().up().addClassName("loading").setStyle({height:"16px",width:"16px"});this._refresh({listVersions:true})}.bindAsEventListener(this))}});e.ExtensionSearchFormBehaviour=Class.create({initialize:function(){this._enhanceSimpleSearch();this._enhanceAdvancedSearch()},_enhanceSimpleSearch:function(){var f=$("extension-search-simple");if(!f){return}$("extensionSearchRepositoryList").observe("change",function(h){$("extensionSearchInput").focus();var g=h.element().form;g.submit.bind(g).defer()}.bindAsEventListener(this))},_enhanceAdvancedSearch:function(){var i=$("extension-search-advanced");if(!i){return}var f=i.down("legend a");if(f){var h=f.up("legend").next().next();if(h){f.observe("click",function(j){j.stop();f.blur();h.toggleClassName("hidden");f.toggleClassName("expanded")});var g=h.down("a.actionCancel");if(g){g.observe("click",function(j){j.stop();g.up("form").select("input[type=text]").each(function(k){k.value=""});f.click()})}}}}});var b=function(f){return f.indexOf("?")<0?{}:f.toQueryParams()};var d=function(f){(f||$("body")).select("a.extension-link").each(function(h){var g=b(h.getAttribute("href"));var i=b(window.location.href);if(g.extensionId){i.extensionId=g.extensionId;i.extensionVersion=g.extensionVersion;if(g.extensionNamespace){i.extensionNamespace=g.extensionNamespace}}else{["extensionId","extensionVersion","extensionVersionConstraint","extensionNamespace"].each(function(j){delete i[j]})}h.setAttribute("href",e.currentDocument.getURL(e.contextaction,Object.toQueryString(i)))})};var a=function(f){((f&&f.memo.elements)||[$("body")]).each(function(g){g.select(".extension-item").each(function(h){!h._extensionBehaviour&&new e.ExtensionBehaviour(h)});d(g)})};var c=function(f){new e.ExtensionSearchFormBehaviour();a(f);return true};(e.domIsLoaded&&c())||document.observe("xwiki:dom:loaded",c);document.observe("xwiki:dom:updated",a);return e}(XWiki||{}));require(["jquery"],function(b){var a=function(){var c=this;var g=function(h){if(b(h.target).closest(".actions",this).length==0){b(this).parent("li").toggleClass("collapsed")}};var f=function(){var k=b(this).closest(".node",c).next("ul").find(".node").not(".parent").find('input[type="checkbox"]');var j=k.length;var h=k.filter(":checked").length;var i="$escapetool.javascript($services.localization.render('extensions.uninstall.cleanPages.selectedCount', ['__selectedCount__', '__total__']))";b(this).text(i.replace("__selectedCount__",h).replace("__total__",j));b(this).next().prop("checked",h>0)};var e=function(){b(this).closest(".node",c).next("ul").find('input[type="checkbox"]').prop("checked",b(this).prop("checked"))};var d=b(this).find("ul").prev(".node").addClass("parent");b(this).hasClass("collapsible")&&d.click(g);if(b(this).hasClass("selectable")){d.append('<span class="actions"><input type="checkbox"/></span>');d.find('.actions input[type="checkbox"]').click(e).before('<span class="selectedCount"/>').prev(".selectedCount").each(f);b(this).find('input[type="checkbox"]').click(function(){b(c).find(".selectedCount").each(f)})}};b(".document-tree").each(a);document.observe("xwiki:dom:updated",function(c){b(c.memo.elements).find(".document-tree").each(a)})});require(["jquery"],function(e){var a=function(f){if(e(this).children(".ui-progress").size()>0){setTimeout(e.proxy(b,this),f||1000)}else{e(this).prev("form").find("button").prop("disabled",false)}};var b=function(g){var f=e(this).prev("form").find("input[name=asyncURL]").prop("value");e.post(f,g||{},e.proxy(d,this)).fail(e.proxy(a,this,10000))};var d=function(g){var f=e(this).hide().after(g).next(".extensionUpdater");e(this).remove();f.each(a).each(function(){document.fire("xwiki:dom:updated",{elements:[this]})});f.children(".extension-body-progress").find(".log-item-loading").each(function(){this.parentNode.scrollTop=this.parentNode.scrollHeight})};var c=function(h){h.preventDefault();if(e(this).parent(".dropdown-menu").size()>0){var f=e(this).closest(".button-group").children(".dropdown-toggle");f.prev().insertAfter(this);f.before(this)}var g=e(this).closest("form");g.find("button").prop("disabled",true);var i={};i[this.name]=this.value;g.next(".extensionUpdater").each(e.proxy(b,null,i))};e(".extensionUpdater").each(a).prev("form").find("button").click(c)});