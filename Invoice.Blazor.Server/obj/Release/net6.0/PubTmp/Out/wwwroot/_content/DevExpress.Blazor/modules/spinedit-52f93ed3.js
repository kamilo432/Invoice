import{_ as e}from"./_tslib-6e8ca86b.js";import{B as t,D as n}from"./dom-166a04be.js";import{k as s}from"./key-59f0f3b5.js";import{E as i}from"./eventhelper-8570b930.js";import{C as o}from"./custom-events-helper-18f7786a.js";import{s as r}from"./constants-4c28185b.js";import{n as a}from"./nameof-factory-64d95f5b.js";import{DxMaskedInputEditor as l,MaskProcessingMode as u}from"./masked-input-19562308.js";import{C as p}from"./css-classes-f3f8ed66.js";import{M as d,B as h}from"./mask-controller-0714e56c.js";import{e as c}from"./property-d3853089.js";import"./text-editor-1137e11e.js";import"./dx-ui-element-de378e9d.js";import"./logicaltreehelper-15991dcb.js";import"./layouthelper-4b19d191.js";import"./rect-7fc5c2ef.js";import"./point-9c6ab88a.js";import"./lit-element-base-af247167.js";import"./data-qa-utils-8be7c726.js";import"./lit-element-b0a6fcba.js";import"./input-a1f0e45d.js";import"./custom-element-bd7061f2.js";import"./disposable-d2c2d283.js";import"./dom-utils-7f5be2f0.js";class m extends CustomEvent{constructor(e,t){super(m.eventName,{detail:new v(e,t),bubbles:!0,composed:!0,cancelable:!0})}}m.eventName=r+".incrementValue";class v{constructor(e,t){this.Increment=e,this.PreviousValue=t}}var b;o.register(m.eventName,(e=>e.detail));const f=a();class B{}b=B,B.Prefix=p.Prefix+"-spin",B.BtnsContainer=b.Prefix+"-btns",B.IncBtn=b.Prefix+"-btn-inc",B.DecBtn=b.Prefix+"-btn-dec";class P extends l{constructor(){super(...arguments),this.regex=/^-?(\d)*$/,this.pointerDownTimerId=-1,this.selectionStateBeforePaste={start:null,end:null},this.boundOnPasteHandler=this.onPaste.bind(this),this.boundButtonOnPointerDownHandler=this.onButtonPointerDown.bind(this),this.boundButtonOnPointerUpHandler=this.onButtonPointerUp.bind(this),this.allowMouseWheel=!1,this.needExponentialView=!1,this.useAdaptiveLayout=!1,this.previousValue=""}get shouldProcessFocusOut(){return!this.fieldElement||!this.fieldElement.hasAttribute(d.suppressFocusEvents)}get shouldProcessWheel(){return this.allowMouseWheel}connectedCallback(){if(this.useAdaptiveLayout=this.useAdaptiveLayout||t.MobileUI,this.useAdaptiveLayout){const e=this.querySelector(`.${B.BtnsContainer}`);null==e||e.classList.remove(h.ButtonGroupVertical),null==e||e.classList.add(h.ButtonGroup)}super.connectedCallback(),this.addEventSubscription()}disconnectedCallback(){this.removeEventListener("paste",this.boundOnPasteHandler),this.removeEventListener("pointerdown",this.boundButtonOnPointerDownHandler),super.disconnectedCallback()}addEventSubscription(){this.addEventListener("paste",this.boundOnPasteHandler),this.addEventListener("pointerdown",this.boundButtonOnPointerDownHandler)}registerButton(e){this.hasSpinBtnClass(e)&&e.addEventListener("pointerdown",this.boundButtonOnPointerDownHandler)}unregisterButton(e){this.hasSpinBtnClass(e)&&(e.removeEventListener("pointerup",this.boundButtonOnPointerUpHandler),e.removeEventListener("pointerout",this.boundButtonOnPointerUpHandler),e.removeEventListener("pointerdown",this.boundButtonOnPointerDownHandler))}onTextInput(e){if(this.isServerMask)return;if(!this.inputElement||!i.containsInComposedPath(e,(e=>e===this.inputElement)))return;let t=this.selectionStateBeforePaste.start?this.inputElement.value.trim():this.inputElement.value;this.decimalSeparator&&(t=t.replace(/[.|,]/g,this.decimalSeparator));let n=this.inputElement.selectionStart,s=this.inputElement.selectionEnd;this.regex.test(t)?(t!==this.inputElement.value&&(this.inputElement.value=t),this.previousValue=t):(this.selectionStateBeforePaste.start&&this.selectionStateBeforePaste.end?(n=this.selectionStateBeforePaste.start,s=this.selectionStateBeforePaste.end):n&&s&&this.previousValue&&(n--,s+=this.previousValue.length-t.length),this.inputElement.value=this.previousValue),this.selectionStateBeforePaste.start&&(this.selectionStateBeforePaste.start=null,this.selectionStateBeforePaste.end=null),this.inputElement.selectionStart=n,this.inputElement.selectionEnd=s,super.onTextInput(e)}onPaste(e){this.isServerMask||this.inputElement&&i.containsInComposedPath(e,(e=>e===this.inputElement))&&(this.selectionStateBeforePaste.start=this.inputElement.selectionStart,this.selectionStateBeforePaste.end=this.inputElement.selectionEnd)}processKeyDown(e){const t=this.getFieldElement();return!!i.containsInComposedPath(e,(e=>e===t))&&(this.isNavigationKey(e)?(i.markHandled(e),this.incrementValue(e.keyCode===s.KeyCode.Up),!0):!!super.processKeyDown(e))}processWheel(e){this.incrementValue(e.deltaY<0)}onButtonPointerDown(e){const t=this.getButton(e);if(!t||!this.inputElement)return;e.preventDefault(),this.useAdaptiveLayout||n.setFocus(this.inputElement);const s=n.hasClassName(t,B.IncBtn);this.incrementValue(s),this.pointerDownTimerId=window.setTimeout(this.startPointerLongTap.bind(this),1e3,s),t.addEventListener("pointerup",this.boundButtonOnPointerUpHandler),t.addEventListener("pointerout",this.boundButtonOnPointerUpHandler)}getButton(e){const t=e.composedPath();for(const e in t){const n=t[e];if(n&&this.hasSpinBtnClass(n))return n}return null}hasSpinBtnClass(e){return n.hasClassName(e,B.IncBtn)||n.hasClassName(e,B.DecBtn)}startPointerLongTap(e){this.pointerDownTimerId=window.setInterval(this.incrementValue.bind(this),50,e)}onButtonPointerUp(e){let t=e.target;this.hasSpinBtnClass(t)||(t=n.getParentByTagName(t,"button")),clearTimeout(this.pointerDownTimerId),t.removeEventListener("pointerup",this.boundButtonOnPointerUpHandler),t.removeEventListener("pointerout",this.boundButtonOnPointerUpHandler),this.raiseApplyValue()}incrementValue(e){this.dispatchEvent(new m(e,this.fieldElementValue))}isNavigationKey(e){return e.keyCode===s.KeyCode.Up||e.keyCode===s.KeyCode.Down}updated(e){super.updated(e),(e.has(f("decimalSeparator"))||e.has(f("needExponentialView")))&&this.applyRegex()}applyRegex(){this.decimalSeparator&&(this.regex=this.needExponentialView?/^-?(\d+|[,.]\d+|\d+[,.]\d+|\d+[,.]|[,.])?([eE]?[+-]?(\d)*)?$/:/^-?(\d+|[,.]\d+|\d+[,.]\d+|\d+[,.]|[,.])?$/)}shouldProcessKeyUp(e){switch(e.key){case"ArrowUp":case"ArrowDown":return this.maskProcessingMode!==u.None}return super.shouldProcessKeyUp(e)}}e([c({type:Boolean,attribute:"allow-mouse-wheel"})],P.prototype,"allowMouseWheel",void 0),e([c({type:Boolean,attribute:"need-exponential-view"})],P.prototype,"needExponentialView",void 0),e([c({type:Boolean,attribute:"use-adaptive-layout"})],P.prototype,"useAdaptiveLayout",void 0),e([c({type:String,attribute:"previous-value"})],P.prototype,"previousValue",void 0),e([c({type:String,attribute:"decimal-separator"})],P.prototype,"decimalSeparator",void 0),customElements.define(r,P);const E={loadModule:function(){}};export{E as default};