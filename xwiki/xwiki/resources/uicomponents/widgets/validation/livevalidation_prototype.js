var LiveValidation=Class.create();Object.extend(LiveValidation,{VERSION:"1.4 prototype",TEXTAREA:1,TEXT:2,PASSWORD:3,CHECKBOX:4,SELECT:5,FILE:6,massValidate:function(d){var b=true;for(var c=0,a=d.length;c<a;++c){var e=d[c].validate();if(b){b=e}}return b}});LiveValidation.prototype={validClass:"LV_valid",invalidClass:"LV_invalid",messageClass:"LV_validation_message",validFieldClass:"LV_valid_field",invalidFieldClass:"LV_invalid_field",initialize:function(b,a){if(!b){throw new Error("LiveValidation::initialize - No element reference or element id has been provided!")}this.element=$(b);if(!this.element){throw new Error("LiveValidation::initialize - No element with reference or id of '"+b+"' exists!")}this.elementType=this.getElementType();this.validations=[];this.form=this.element.form;this.options=Object.extend({validMessage:"Thankyou!",insertAfterWhatNode:this.element,onlyOnBlur:false,wait:0,onlyOnSubmit:false,beforeValidation:function(){},beforeValid:function(){},onValid:function(){this.insertMessage(this.createMessageSpan());this.addFieldClass()},afterValid:function(){},beforeInvalid:function(){},onInvalid:function(){this.insertMessage(this.createMessageSpan());this.addFieldClass()},afterInvalid:function(){},afterValidation:function(){},},a||{});var c=this.options.insertAfterWhatNode||this.element;this.options.insertAfterWhatNode=$(c);Object.extend(this,this.options);if(this.form){this.formObj=LiveValidationForm.getInstance(this.form);this.formObj.addField(this)}this.cFocus=this.doOnFocus.bindAsEventListener(this);Event.observe(this.element,"focus",this.cFocus);if(!this.onlyOnSubmit){switch(this.elementType){case LiveValidation.CHECKBOX:this.cClick=this.validate.bindAsEventListener(this);Event.observe(this.element,"click",this.cClick);case LiveValidation.SELECT:case LiveValidation.FILE:this.cChange=this.validate.bindAsEventListener(this);Event.observe(this.element,"change",this.cChange);break;default:if(!this.onlyOnBlur){this.cKeyup=this.deferValidation.bindAsEventListener(this);Event.observe(this.element,"keyup",this.cKeyup)}this.cBlur=this.validate.bindAsEventListener(this);Event.observe(this.element,"blur",this.cBlur)}}},destroy:function(){if(this.formObj){this.formObj.removeField(this);this.formObj.destroy()}var a=this.element;Event.stopObserving(a,"focus",this.cFocus);if(!this.onlyOnSubmit){switch(this.elementType){case LiveValidation.CHECKBOX:Event.stopObserving(a,"click",this.cClick);case LiveValidation.SELECT:case LiveValidation.FILE:Event.stopObserving(a,"change",this.cChange);break;default:if(!this.onlyOnBlur){Event.stopObserving(a,"keyup",this.cKeyup)}Event.stopObserving(a,"blur",this.cBlur)}}this.validations=[];this.removeMessageAndFieldClass()},add:function(a,b){this.validations.push({type:a,params:b||{}});return this},remove:function(a,b){this.validations=this.validations.reject(function(c){return(c.type==a&&c.params==b)});return this},deferValidation:function(a){if(this.wait>=300){this.removeMessageAndFieldClass()}if(this.timeout){clearTimeout(this.timeout)}this.timeout=setTimeout(this.validate.bind(this),this.wait)},doOnBlur:function(){this.focused=false;this.validate()},doOnFocus:function(){this.focused=true;this.removeMessageAndFieldClass()},getElementType:function(){var b=this.element.nodeName.toUpperCase();var a=this.element.type.toUpperCase();switch(true){case (b=="TEXTAREA"):return LiveValidation.TEXTAREA;case (b=="INPUT"&&a=="TEXT"):return LiveValidation.TEXT;case (b=="INPUT"&&a=="PASSWORD"):return LiveValidation.PASSWORD;case (b=="INPUT"&&a=="CHECKBOX"):return LiveValidation.CHECKBOX;case (b=="INPUT"&&a=="FILE"):return LiveValidation.FILE;case (b=="SELECT"):return LiveValidation.SELECT;case (b=="INPUT"):throw new Error("LiveValidation::getElementType - Cannot use LiveValidation on an "+a.toLowerCase()+" input!");default:throw new Error("LiveValidation::getElementType - Element must be an input, select, or textarea - "+b.toLowerCase()+" was given!")}},doValidations:function(){this.validationFailed=false;for(var b=0,a=this.validations.length;b<a;++b){this.validationFailed=!this.validateElement(this.validations[b].type,this.validations[b].params);if(this.validationFailed){return false}}this.message=this.validMessage;return true},validateElement:function(a,c){switch(a){case Validate.Presence:case Validate.Confirmation:case Validate.Acceptance:this.displayMessageWhenEmpty=true;break;case Validate.Custom:if(c.displayMessageWhenEmpty){this.displayMessageWhenEmpty=true}break}var d=(this.elementType==LiveValidation.SELECT)?this.element.options[this.element.selectedIndex].value:this.element.value;if(a==Validate.Acceptance){if(this.elementType!=LiveValidation.CHECKBOX){throw new Error("LiveValidation::validateElement - Element to validate acceptance must be a checkbox!")}d=this.element.checked}var e=true;try{a(d,c)}catch(b){if(b instanceof Validate.Error){if(d!==""||(d===""&&this.displayMessageWhenEmpty)){this.validationFailed=true;this.message=b.message.split("\n")[0];e=false}}else{throw b}}finally{return e}},validate:function(){if(!this.element.disabled){this.beforeValidation();var a=this.doValidations();if(a){this.beforeValid();this.onValid();this.afterValid();return true}else{this.beforeInvalid();this.onInvalid();this.afterInvalid();return false}this.afterValidation()}else{return true}},enable:function(){this.element.disabled=false;return this},disable:function(){this.element.disabled=true;this.removeMessageAndFieldClass();return this},createMessageSpan:function(){var a=document.createElement("span");var b=document.createTextNode(this.message);a.appendChild(b);return a},insertMessage:function(c){this.removeMessage();if(!this.validationFailed&&!this.validMessage){return}if((this.displayMessageWhenEmpty&&(this.elementType==LiveValidation.CHECKBOX||this.element.value==""))||this.element.value!=""){var b=this.validationFailed?this.invalidClass:this.validClass;$(c).addClassName(this.messageClass+" "+b);var a=this.insertAfterWhatNode.up();if(nxtSibling=this.insertAfterWhatNode.next()){a.insertBefore(c,nxtSibling)}else{a.appendChild(c)}}},addFieldClass:function(){this.removeFieldClass();if(!this.validationFailed){if(this.displayMessageWhenEmpty||this.element.value!=""){if(!this.element.hasClassName(this.validFieldClass)){this.element.addClassName(this.validFieldClass)}}}else{if(!this.element.hasClassName(this.invalidFieldClass)){this.element.addClassName(this.invalidFieldClass)}}},removeMessage:function(){var a=this.insertAfterWhatNode.next("."+this.messageClass);if(a){a.remove()}},removeFieldClass:function(){this.element.removeClassName(this.invalidFieldClass);this.element.removeClassName(this.validFieldClass)},removeMessageAndFieldClass:function(){this.removeMessage();this.removeFieldClass()}};var LiveValidationForm=Class.create();Object.extend(LiveValidationForm,{instances:{},getInstance:function(a){if(!a){throw new Error("LiveValidationForm::getInstance - No element reference or element id has been provided!")}var c=$(a);var b=Math.random()*Math.random();if(!c.id){c.id="formId_"+b.toString().replace(/\./,"")+new Date().valueOf()}if(!LiveValidationForm.instances[c.id]){LiveValidationForm.instances[c.id]=new LiveValidationForm(c)}return LiveValidationForm.instances[c.id]}});LiveValidationForm.prototype={beforeValidation:function(){},onValid:function(){},onInvalid:function(){},afterValidation:function(){},initialize:function(a){this.element=$(a);this.fields=[];this.oldOnSubmit=this.element.onsubmit||function(){};this.element.onsubmit=function(c){var b=false;this.beforeValidation(),this.valid=LiveValidation.massValidate(this.fields);this.valid?this.onValid():this.onInvalid();this.afterValidation();if(this.valid){b=this.oldOnSubmit.call(this.element,c)!==false}if(!b){Event.stop(c)}}.bindAsEventListener(this)},addField:function(a){this.fields.push(a)},removeField:function(a){this.fields=this.fields.without(a)},destroy:function(a){if(this.fields.length!=0&&!a){return false}this.element.onsubmit=this.oldOnSubmit;LiveValidationForm.instances[this.element.id]=null;return true}};var Validate={Presence:function(a,b){var c=Object.extend({failureMessage:"Can't be empty!"},b||{});if(a===""||a===null||a===undefined){Validate.fail(c.failureMessage)}return true},Numericality:function(b,c){var a=b;var b=Number(b);var c=c||{};var d={notANumberMessage:c.notANumberMessage||"Must be a number!",notAnIntegerMessage:c.notAnIntegerMessage||"Must be an integer!",wrongNumberMessage:c.wrongNumberMessage||"Must be "+c.is+"!",tooLowMessage:c.tooLowMessage||"Must not be less than "+c.minimum+"!",tooHighMessage:c.tooHighMessage||"Must not be more than "+c.maximum+"!",is:((c.is)||(c.is==0))?c.is:null,minimum:((c.minimum)||(c.minimum==0))?c.minimum:null,maximum:((c.maximum)||(c.maximum==0))?c.maximum:null,onlyInteger:c.onlyInteger||false};if(!isFinite(b)){Validate.fail(d.notANumberMessage)}if(d.onlyInteger&&((/\.0+$|\.$/.test(String(a)))||(b!=parseInt(b)))){Validate.fail(d.notAnIntegerMessage)}switch(true){case (d.is!==null):if(b!=Number(d.is)){Validate.fail(d.wrongNumberMessage)}break;case (d.minimum!==null&&d.maximum!==null):Validate.Numericality(b,{tooLowMessage:d.tooLowMessage,minimum:d.minimum});Validate.Numericality(b,{tooHighMessage:d.tooHighMessage,maximum:d.maximum});break;case (d.minimum!==null):if(b<Number(d.minimum)){Validate.fail(d.tooLowMessage)}break;case (d.maximum!==null):if(b>Number(d.maximum)){Validate.fail(d.tooHighMessage)}break}return true},Format:function(a,b){var a=String(a);var c=Object.extend({failureMessage:"Not valid!",pattern:/./,negate:false},b||{});if(!c.negate&&!c.pattern.test(a)){Validate.fail(c.failureMessage)}if(c.negate&&c.pattern.test(a)){Validate.fail(c.failureMessage)}return true},Email:function(a,b){var c=Object.extend({failureMessage:"Must be a valid email address!"},b||{});Validate.Format(a,{failureMessage:c.failureMessage,pattern:/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i});return true},Length:function(a,b){var a=String(a);var b=b||{};var c={wrongLengthMessage:b.wrongLengthMessage||"Must be "+b.is+" characters long!",tooShortMessage:b.tooShortMessage||"Must not be less than "+b.minimum+" characters long!",tooLongMessage:b.tooLongMessage||"Must not be more than "+b.maximum+" characters long!",is:((b.is)||(b.is==0))?b.is:null,minimum:((b.minimum)||(b.minimum==0))?b.minimum:null,maximum:((b.maximum)||(b.maximum==0))?b.maximum:null};switch(true){case (c.is!==null):if(a.length!=Number(c.is)){Validate.fail(c.wrongLengthMessage)}break;case (c.minimum!==null&&c.maximum!==null):Validate.Length(a,{tooShortMessage:c.tooShortMessage,minimum:c.minimum});Validate.Length(a,{tooLongMessage:c.tooLongMessage,maximum:c.maximum});break;case (c.minimum!==null):if(a.length<Number(c.minimum)){Validate.fail(c.tooShortMessage)}break;case (c.maximum!==null):if(a.length>Number(c.maximum)){Validate.fail(c.tooLongMessage)}break;default:throw new Error("Validate::Length - Length(s) to validate against must be provided!")}return true},Inclusion:function(c,d){var e=Object.extend({failureMessage:"Must be included in the list!",within:[],allowNull:false,partialMatch:false,caseSensitive:true,negate:false},d||{});if(e.allowNull&&c==null){return true}if(!e.allowNull&&c==null){Validate.fail(e.failureMessage)}if(!e.caseSensitive){var a=[];e.within.each(function(f){if(typeof f=="string"){f=f.toLowerCase()}a.push(f)});e.within=a;if(typeof c=="string"){c=c.toLowerCase()}}var b=(e.within.indexOf(c)==-1)?false:true;if(e.partialMatch){b=false;e.within.each(function(f){if(c.indexOf(f)!=-1){b=true}})}if((!e.negate&&!b)||(e.negate&&b)){Validate.fail(e.failureMessage)}return true},Exclusion:function(a,b){var c=Object.extend({failureMessage:"Must not be included in the list!",within:[],allowNull:false,partialMatch:false,caseSensitive:true},b||{});c.negate=true;Validate.Inclusion(a,c);return true},Confirmation:function(a,b){if(!b.match){throw new Error("Validate::Confirmation - Error validating confirmation: Id of element to match must be provided!")}var c=Object.extend({failureMessage:"Does not match!",match:null},b||{});c.match=$(b.match);if(!c.match){throw new Error("Validate::Confirmation - There is no reference with name of, or element with id of '"+c.match+"'!")}if(a!=c.match.value){Validate.fail(c.failureMessage)}return true},Acceptance:function(a,b){var c=Object.extend({failureMessage:"Must be accepted!"},b||{});if(!a){Validate.fail(c.failureMessage)}return true},Custom:function(a,b){var c=Object.extend({against:function(){return true},args:{},failureMessage:"Not valid!"},b||{});if(!c.against(a,c.args)){Validate.fail(c.failureMessage)}return true},now:function(a,d,c){if(!a){throw new Error("Validate::now - Validation function must be provided!")}var e=true;try{a(d,c||{})}catch(b){if(b instanceof Validate.Error){e=false}else{throw b}}finally{return e}},Error:function(a){this.message=a;this.name="ValidationError"},fail:function(a){throw new Validate.Error(a)}};