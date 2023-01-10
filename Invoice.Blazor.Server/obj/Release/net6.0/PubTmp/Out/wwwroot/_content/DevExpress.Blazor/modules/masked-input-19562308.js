import{_ as e}from"./_tslib-6e8ca86b.js";import{B as t}from"./dom-166a04be.js";import{E as s}from"./eventhelper-8570b930.js";import{m as i}from"./constants-4c28185b.js";import{F as n,C as r,B as o,a}from"./text-editor-1137e11e.js";import{DxInputEditorAttributes as c,DxInputEditor as l}from"./input-a1f0e45d.js";import{u as d}from"./mask-controller-0714e56c.js";import{C as p}from"./custom-events-helper-18f7786a.js";import{e as h}from"./property-d3853089.js";import"./dx-ui-element-de378e9d.js";import"./logicaltreehelper-15991dcb.js";import"./layouthelper-4b19d191.js";import"./rect-7fc5c2ef.js";import"./point-9c6ab88a.js";import"./lit-element-base-af247167.js";import"./data-qa-utils-8be7c726.js";import"./lit-element-b0a6fcba.js";import"./css-classes-f3f8ed66.js";import"./custom-element-bd7061f2.js";import"./disposable-d2c2d283.js";import"./dom-utils-7f5be2f0.js";import"./key-59f0f3b5.js";class u{constructor(e){this.deltaY=e}}var m,v,y;!function(e){e[e.forward=0]="forward",e[e.backward=1]="backward"}(m||(m={}));class b{constructor(e,t,s,i){this.direction=m.backward,this.selectionStart=e,this.selectionEnd=t,this.selectAll=i,this.direction=s}}class f extends Event{constructor(){super(f.eventName,{bubbles:!0,composed:!0,cancelable:!0})}}f.eventName=i+".applyValue";class S extends CustomEvent{constructor(e){super(S.eventName,{detail:new n(e),bubbles:!0,composed:!0,cancelable:!0})}}S.eventName=i+".autofill";class E extends Event{constructor(){super(E.eventName,{bubbles:!0,composed:!0,cancelable:!0})}}E.eventName=i+".updateSelection";class w extends CustomEvent{constructor(e){super(w.eventName,{detail:new u(e),bubbles:!0,composed:!0,cancelable:!0})}}w.eventName=i+".wheel";class P extends CustomEvent{constructor(e,t,s,i){super(P.eventName,{detail:new b(e,t,s,i),bubbles:!0,composed:!0,cancelable:!0})}}P.eventName=i+".selectionchange",p.register(P.eventName,(e=>e.detail)),p.register(S.eventName,(e=>e.detail)),p.register(f.eventName,(e=>e.detail)),p.register(E.eventName,(e=>e.detail)),p.register(w.eventName,(e=>e.detail)),function(e){e.syncSelectionStart="sync-selection-start",e.syncSelectionEnd="sync-selection-end",e.maskProcessingMode="mask-processing-mode"}(v||(v={})),function(e){e.None="None",e.Server="Server",e.Mono="Mono"}(y||(y={}));const k={...v,...c};class M extends l{constructor(){super(...arguments),this.wheelTimerId=-1,this.firstPointerPressed=!1,this.compositionProcessing=!1,this.compositionEndHandler=this.handleCompositionEnd.bind(this),this.pointerUpHandler=this.handlePointerUp.bind(this),this.clickHandler=this.handleClick.bind(this),this.wheelHandler=this.handleWheel.bind(this),this.syncSelectionStart=null,this.syncSelectionEnd=null,this.maskProcessingMode=y.None}get isServerMask(){return this.maskProcessingMode===y.Server}get shouldProcessFocusOut(){return!0}get shouldProcessWheel(){return this.isServerMask}get shouldProcessFocusIn(){return!0}get inputSelectionDirection(){var e;return"backward"===(null===(e=this.inputElement)||void 0===e?void 0:e.selectionDirection)?m.backward:m.forward}handlePointerUp(e){this.allowInput&&this.isServerMask&&this.processPointerUp(e)}handleCompositionEnd(e){this.dispatchEvent(new r(e)),this.inputElement.removeEventListener("compositionend",this.compositionEndHandler),this.compositionProcessing=!1}handleClick(e){this.applyInputSelection()}handleWheel(e){if(this.shouldProcessWheel&&(e.preventDefault(),this.processWheel(e),this.bindValueMode===o.OnLostFocus)){-1!==this.wheelTimerId&&clearTimeout(this.wheelTimerId);this.wheelTimerId=window.setTimeout((()=>{this.raiseApplyValue()}).bind(this),500)}}processWheel(e){this.dispatchEvent(new w(e.deltaY))}applyTextPropertyCore(){super.applyTextPropertyCore(),this.isServerMask&&this.focused&&(this.inputSelectionStart!==this.syncSelectionStart||this.inputSelectionEnd!==this.syncSelectionEnd)&&this.selectInputText(this.syncSelectionStart,this.syncSelectionEnd)}get shouldProcessFieldTextVersion(){return!this.isServerMask&&super.shouldProcessFieldTextVersion}get shouldRaiseFieldTextEvents(){return!this.isServerMask}processFocusIn(){var e;super.processFocusIn(),this.isServerMask&&!this.firstPointerPressed&&this.dispatchEvent(new E),this.addEventListener("wheel",this.wheelHandler),document.addEventListener(M.pointerUpEventType,this.pointerUpHandler),t.WebKitTouchUI&&(null===(e=this.inputElement)||void 0===e||e.addEventListener("click",this.clickHandler))}processFocusOut(e){var s;super.processFocusOut(e),this.removeEventListener("wheel",this.wheelHandler),document.removeEventListener(M.pointerUpEventType,this.pointerUpHandler),t.WebKitTouchUI&&(null===(s=this.inputElement)||void 0===s||s.removeEventListener("click",this.clickHandler))}processKeyDown(e){return super.processKeyDown(e),!!this.shouldProcessKeyDown(e)&&(s.markHandled(e),this.raiseKeyDown(e),!0)}processPointerDown(e){return super.processPointerDown(e),this.isServerMask&&!this.focused&&(this.firstPointerPressed=!0),!0}processKeyUp(e){if(!this.inputElement||!s.containsInComposedPath(e,(e=>e===this.inputElement)))return!1;const t=this.querySelector("input:-webkit-autofill");return this.isServerMask&&t&&t.value&&(this.dispatchEvent(new S(t.value)),s.markHandled(e)),this.shouldProcessKeyUp(e)&&(this.bindValueMode===o.OnLostFocus?this.raiseApplyValue():this.applyDefferedValue()),!0}applyDefferedValue(){this.bindValueMode===o.OnDelayedInput&&this.inputDelayDeferredAction.execute((()=>this.raiseApplyValue()))}raiseApplyValue(){this.dispatchEvent(new f)}processBeforeInput(e){return!!super.processBeforeInput(e)||!!this.isServerMask&&(e.isComposing&&!t.AndroidMobilePlatform?(this.compositionProcessing||(this.inputElement.addEventListener("compositionend",this.compositionEndHandler),this.compositionProcessing=!0),!0):(s.markHandled(e),this.shouldProcessBeforeInput(e)&&(this.applyInputSelection(),this.dispatchEvent(new a(e)),this.applyDefferedValue()),!0))}updated(e){super.updated(e)}shouldProcessKeyUp(e){if(!this.isServerMask)return!1;switch(e.key){case"ArrowUp":case"ArrowDown":case"Enter":case"Delete":return!0;case"z":return e.ctrlKey}return!1}shouldProcessKeyDown(e){if(!this.isServerMask)return!1;switch(e.key){case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"ArrowDown":case"Home":case"Delete":case"End":return!0;case"a":case"z":return e.ctrlKey}return!1}shouldProcessBeforeInput(e){switch(e.inputType){case"insertText":case"insertReplacementText":case"insertFromPaste":case"deleteContentBackward":case"deleteContentForward":case"deleteByCut":return!0;case"insertCompositionText":return t.AndroidMobilePlatform}return!1}onBindValueModeChanged(e){this.maskProcessingMode===y.Mono&&d(this.inputElement,this.bindValueMode,this.fieldInputDelay),super.onBindValueModeChanged(e)}onInputDelayChanged(){this.maskProcessingMode===y.Mono&&d(this.inputElement,this.bindValueMode,this.fieldInputDelay),super.onInputDelayChanged()}processPointerUp(e){return!this.isServerMask||(this.applyInputSelection(),this.firstPointerPressed&&(this.firstPointerPressed=!1),!0)}applyInputSelection(){if(this.syncSelectionStart!==this.inputSelectionStart||this.syncSelectionEnd!==this.inputSelectionEnd){const e=this.fieldElementValue.length===Math.abs(this.inputSelectionEnd-this.inputSelectionStart);this.raiseMaskSelectionChanged(this.inputSelectionStart,this.inputSelectionEnd,this.inputSelectionDirection,e)}}raiseMaskSelectionChanged(e,t,s,i){this.dispatchEvent(new P(e,t,s,i))}}M.pointerUpEventType=t.WebKitTouchUI?"touchend":"pointerup",e([h({type:Number,attribute:k.syncSelectionStart})],M.prototype,"syncSelectionStart",void 0),e([h({type:Number,attribute:k.syncSelectionEnd})],M.prototype,"syncSelectionEnd",void 0),e([h({type:y,attribute:k.maskProcessingMode})],M.prototype,"maskProcessingMode",void 0),customElements.define(i,M);const g={loadModule:function(){}};export{M as DxMaskedInputEditor,k as DxMaskedInputEditorAttributes,y as MaskProcessingMode,g as default};
