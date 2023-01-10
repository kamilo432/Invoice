import{_ as t}from"./_tslib-6e8ca86b.js";import{D as e,a as i,b as o,I as r}from"./popup-e5c1aca3.js";import{B as s}from"./getPopupRootSingleton-f8347fe3.js";import{ThumbDragStartedEvent as a,ThumbDragDeltaEvent as d,ThumbDragCompletedEvent as n}from"./thumb-b78dcc42.js";import{P as h}from"./point-9c6ab88a.js";import{R as l,a as p}from"./rect-7fc5c2ef.js";import{L as g,D as c}from"./layouthelper-4b19d191.js";import{E as m}from"./eventhelper-8570b930.js";import{C as u}from"./custom-events-helper-18f7786a.js";import{i as b,d as f}from"./events-interseptor-eeff27a3.js";import{$ as x,s as y,r as v}from"./lit-element-b0a6fcba.js";import{e as C}from"./property-d3853089.js";import{n as D}from"./custom-element-bd7061f2.js";import{D as w,a as R}from"./popupportal-85248f1b.js";import{dxBranchTagName as S}from"./branch-2ea85171.js";class H{constructor(t,e){this.width=Math.floor(t),this.height=Math.floor(e)}}class z extends CustomEvent{constructor(t,e){super(z.eventName,{detail:new H(t,e),bubbles:!0,composed:!0,cancelable:!0})}}z.eventName="dxbl-dropdown.resizeStarted",u.register(z.eventName,(t=>t.detail));class W extends CustomEvent{constructor(t,e){super(W.eventName,{detail:new H(t,e),bubbles:!0,composed:!0,cancelable:!0})}}W.eventName="dxbl-dropdown.resizeCompleted",u.register(W.eventName,(t=>t.detail));class N extends e{constructor(){super(...arguments),this.dragStart=null,this.dragBounds=null,this.dragStartedHandler=this.handleDragStarted.bind(this),this.dragDeltaHandler=this.handleDragDelta.bind(this),this.dragCompletedHandler=this.handleDragCompleted.bind(this),this.dragWidth=0,this.dragHeight=0,this.dragMaxWidth=0,this.dragMaxHeight=0,this.isInDragOperation=!1,this.dragCssStyle=null}get branchType(){return s.DropDown}renderTemplate(){return x`
            <dxbl-branch
                id="branch"
                branch-id="${this.branchId}"
                parent-branch-id="${this.parentBranchId}"
                type="${this.branchType}"
                style="${this.dragCssStyle}">
                <dxbl-dropdown-root
                    id="root"
                    style="${this.rootCssStyle}"
                    ?resizing="${this.resizing}"
                    drop-opposite="${this.actualDropOpposite}"
                    drop-direction="${this.actualDropDirection}"
                    drop-alignment="${this.actualDropAlignment}">
                    ${this.renderDefaultSlot()}
                    ${this.renderAdditionalSlots()}
                    ${this.renderBridgeSlot()}
                </dxbl-dropdown-root>
            </dxbl-branch>
        `}getRootTagName(){return"dxbl-dropdown-root"}connectedCallback(){super.connectedCallback(),this.addEventListener(a.eventName,this.dragStartedHandler),this.addEventListener(d.eventName,this.dragDeltaHandler),this.addEventListener(n.eventName,this.dragCompletedHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(a.eventName,this.dragStartedHandler),this.removeEventListener(d.eventName,this.dragDeltaHandler),this.removeEventListener(n.eventName,this.dragCompletedHandler)}get child(){return this.root}handleDragStarted(t){const e=m.getOriginalSource(t);if(!e)return;if(!e.hasAttribute("data-dropdown-thumb"))return;if(!this.child)return;this.lockPlacement(),this.dragStart=new h(t.detail.x,t.detail.y);const i=this.getRestrictBounds(),o=this.getPlacementTargetInterestPoints(this.placement),r=this.actualDropAlignment,s=this.actualDropDirection,a=g.getRelativeElementRect(this.child);this.dragBounds=this.calcResizeRect(i,o,r,s),this.dragMaxWidth=this.dragBounds.width,this.dragMaxHeight=this.dragBounds.height,this.isInDragOperation=!0,this.dragWidth=a.width,this.dragHeight=a.height,this.raiseResizeStarted(this.dragWidth,this.dragHeight)}willUpdate(t){super.willUpdate(t),this.dragCssStyle=this.isInDragOperation?`width: ${c.toPx(this.dragWidth)}; height: ${c.toPx(this.dragHeight)}; max-width: ${c.toPx(this.dragMaxWidth)}; max-height: ${c.toPx(this.dragMaxHeight)};`:null}updated(t){super.updated(t),this.root.offsetWidth<this.root.scrollWidth&&(this.dragWidth=this.root.scrollWidth),this.root.offsetHeight<this.root.scrollHeight&&(this.dragHeight=this.root.scrollHeight)}handleDragDelta(t){const e=m.getOriginalSource(t);e&&e.hasAttribute("data-dropdown-thumb")&&(this.dragWidth=Math.min(this.dragMaxWidth,this.actualDropDirection===i.Near?t.detail.x-this.offset.x:this.offset.x+this.childSize.width-t.detail.x),this.dragHeight=Math.min(this.dragMaxHeight,this.actualDropAlignment===o.bottom?t.detail.y-this.offset.y:this.offset.y+this.childSize.height-t.detail.y))}handleDragCompleted(t){var e,i;const o=m.getOriginalSource(t);o&&o.hasAttribute("data-dropdown-thumb")&&(this.isInDragOperation=!1,this.dragWidth=null!==(e=this.branch.offsetWidth)&&void 0!==e?e:0,this.dragHeight=null!==(i=this.branch.offsetHeight)&&void 0!==i?i:0,this.desiredWidth=c.toPx(this.dragWidth),this.desiredHeight=c.toPx(this.dragHeight),this.unlockPlacement(),this.raiseResizeCompleted(this.dragWidth,this.dragHeight))}calcResizeRect(t,e,s,a){if(a===i.Near){if(s===o.top){return l.intersect(t,p.createFromPoints(e[r.TopLeft],t.topRight))}return l.intersect(t,p.createFromPoints(e[r.BottomLeft],t.bottomRight))}if(s===o.top){return l.intersect(t,p.createFromPoints(e[r.TopRight],t.topLeft))}return l.intersect(t,p.createFromPoints(e[r.BottomRight],t.bottomLeft))}raiseResizeStarted(t,e){this.dispatchEvent(new z(t,e))}raiseResizeCompleted(t,e){this.dispatchEvent(new W(t,e))}calcRenderWidth(){return this.isInDragOperation?null:super.calcRenderWidth()}calcRenderHeight(){return this.isInDragOperation?null:super.calcRenderHeight()}shouldUpdateRootCssStyle(t){return super.shouldUpdateRootCssStyle(t)||t.has("isInDragOperation")||t.has("dragWidth")||t.has("dragHeight")||t.has("dragMaxWidth")||t.has("dragMaxHeight")}}t([b("#root",!0)],N.prototype,"root",void 0),t([b("#branch")],N.prototype,"branch",void 0),t([C({type:Number,reflect:!1})],N.prototype,"dragWidth",void 0),t([C({type:Number,reflect:!1})],N.prototype,"dragHeight",void 0),t([C({type:Number,reflect:!1})],N.prototype,"dragMaxWidth",void 0),t([C({type:Number,reflect:!1})],N.prototype,"dragMaxHeight",void 0),t([C({type:Boolean,reflect:!1})],N.prototype,"isInDragOperation",void 0),t([C({type:String,reflect:!1})],N.prototype,"dragCssStyle",void 0);let $=class extends N{};$=t([D("dxbl-dropdown")],$);let L=class extends w{createRenderRoot(){return this}};L=t([D("dxbl-dropdown-dialog")],L);let j=class extends y{constructor(){super(...arguments),this.topLeftClass=null,this.topRightClass=null,this.bottomLeftClass=null,this.bottomRightClass=null,this.dropOpposite=!1,this.dropDirection=i.Near,this.dropAlignment=o.bottom,this.resizing=!1}static get styles(){return v`
            :host {
                display: flex;
                position: relative;
                flex: 1 1 auto;
                flex-direction: column;
                box-sizing: border-box;
                min-height: 0;
            }
            .hidden {
                display: none;
            }
            ::slotted([slot="top-right"]) {
                position: absolute;
                z-index: 1001;
                top: 0px;
                right: 0px;
                transform: rotate(270deg);
                cursor: ne-resize;
            }
            ::slotted([slot="top-left"]) {
                position: absolute;
                z-index: 1001;
                top: 0px;
                left: 0px;
                transform: rotate(180deg);
                cursor: nw-resize;
            }
            ::slotted([slot="bottom-left"]) {
                position: absolute;
                z-index: 1001;
                bottom: 0px;
                left: 0px;
                transform: rotate(90deg);
                cursor: sw-resize;
            }
            ::slotted([slot="bottom-right"]) {
                position: absolute;
                z-index: 1001;
                bottom: 0px;
                right: 0px;
                cursor: se-resize;
                transform: rotate(0deg);
            }
        }`}connectedCallback(){super.connectedCallback(),this.calculateStyles(this.resizing,this.dropAlignment,this.dropDirection)}willUpdate(t){(t.has("dropAlignment")||t.has("dropDirection")||t.has("resizing"))&&this.calculateStyles(this.resizing,this.dropAlignment,this.dropDirection)}calculateStyles(t,e,r){this.topLeftClass=t&&e===o.top&&r===i.Far?null:"hidden",this.topRightClass=t&&e===o.top&&r===i.Near?null:"hidden",this.bottomLeftClass=t&&e===o.bottom&&r===i.Far?null:"hidden",this.bottomRightClass=t&&e===o.bottom&&r===i.Near?null:"hidden"}render(){return x`
            <slot></slot>
            <dxbl-thumb data-qa-thumb-location="top-left" data-dropdown-thumb class="${this.topLeftClass}">
                <slot name="top-left"></slot>
            </dxbl-thumb>
            <dxbl-thumb data-qa-thumb-location="top-right" data-dropdown-thumb class="${this.topRightClass}">
                <slot name="top-right"></slot>
            </dxbl-thumb>
            <dxbl-thumb data-qa-thumb-location="bottom-left" data-dropdown-thumb class="${this.bottomLeftClass}">
                <slot name="bottom-left"></slot>
            </dxbl-thumb>
            <dxbl-thumb data-qa-thumb-location="bottom-right" data-dropdown-thumb class="${this.bottomRightClass}">
                <slot name="bottom-right"></slot>
            </dxbl-thumb>`}};t([C({type:String,reflect:!1})],j.prototype,"topLeftClass",void 0),t([C({type:String,reflect:!1})],j.prototype,"topRightClass",void 0),t([C({type:String,reflect:!1})],j.prototype,"bottomLeftClass",void 0),t([C({type:String,reflect:!1})],j.prototype,"bottomRightClass",void 0),t([C({type:Object,attribute:"drop-opposite"})],j.prototype,"dropOpposite",void 0),t([C({type:String,attribute:"drop-direction"})],j.prototype,"dropDirection",void 0),t([C({type:String,attribute:"drop-alignment"})],j.prototype,"dropAlignment",void 0),t([C({type:Boolean,attribute:"resizing"})],j.prototype,"resizing",void 0),j=t([D("dxbl-dropdown-root")],j);const M=["dxbl-dropdown","dxbl-dropdown-dialog","dxbl-dropdown-root",S,R,f];function O(t){if(!t)throw new Error("failed");return t}const P=Object.freeze({__proto__:null,registeredComponents:M,getReference:O,default:{getReference:O,registeredComponents:M}});export{N as D,j as a,P as d,M as r};
