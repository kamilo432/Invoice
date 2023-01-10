import{z as e,b as t}from"./dom-utils-7f5be2f0.js";import{B as s}from"./dom-166a04be.js";import{_ as i}from"./_tslib-6e8ca86b.js";import{L as n}from"./lit-element-base-af247167.js";import{$ as r,r as l}from"./lit-element-b0a6fcba.js";import{n as o}from"./custom-element-bd7061f2.js";import"./css-classes-f3f8ed66.js";import"./data-qa-utils-8be7c726.js";let a=class extends n{render(){return r`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18ZM12 4C10.8954 4 10 4.89543 10 6V12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12V6C14 4.89543 13.1046 4 12 4Z" fill="currentColor" fill-opacity="0.75"/>
            </svg>
            <div>
                <p>This application references outdated DevExpress Blazor CSS resources. Refer to the following article for upgrade instructions: <a href="https://supportcenter.devexpress.com/ticket/details/t1081253" target="_blank">The location of CSS resources for DevExpress Blazor controls has changed</a>.</p>
            </div>
        `}static isStyleSheetDeprecated(e){return null!==e&&/\/dx-blazor(\.bs5)*\.css$/gi.test(e)}static create(){return document.createElement("dxbl-stylesheet-warning")}};a.styles=l`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            left: 0px;
            bottom: 0px;
            width: 100%;
            padding: 1.5rem;
            color: var(--bs-dark, var(--dark, rgb(33, 37, 41)));
            background-color: var(--bs-warning, var(--warning, rgb(255, 193, 7)));
            z-index: 10000;
            font-size: 0.875rem;
        }
        :host > svg {
            flex: 0 0 auto;
            margin-right: 1rem;
        }
        p {
            margin: 0;
        }
        a, span {
            font-weight: 600;
        }
        a {
            color: inherit;
        }`,a=i([o("dxbl-stylesheet-warning")],a);let c=null;class d{constructor(e,t){this._name=e,this._value=t}get name(){return this._name}get value(){return this._value}}class m{constructor(e,t){this._selectors=e,this._rules=t}get selectors(){return this._selectors}get rules(){return this._rules}toString(e){let t=this.rules.join("\n");for(let s=0;s<e.length;s++){const i=e[s];t=t.replace(new RegExp(`${i.name}`,"g"),i.value)}return`${this.selectors.join(",\n")} { ${t} }`}}class u{constructor(){this._rules=[],this._dummyContainer=null,this._ieCssStyles=[],this._styleElement=null,this.initialize()}get styleElement(){return null==this._styleElement&&(this._styleElement=this.createStyleElement()),this._styleElement}createStyleElement(){const e=document.createElement("STYLE");return document.head.appendChild(e),e}initialize(){this.initializeIeCssStyles(),this.initializeDummyElements(),this.initializeRules(),this.updateStyleElement(),this.removeDummyElements()}getAccentColor(){if(!this._dummyContainer)return"";const e=this._dummyContainer.querySelector("a");return window.getComputedStyle(e).color}getAccentShadowColor(e){const t=e.replace("rgb","").replace("(","").replace(")","").split(",").map((e=>e.trim()));t.push(".25");return`rgba(${t.join(",")})`}updateStyleElement(){s.IE?this.updateIEStyleElement():this.updateStyleElementCore()}updateIEStyleElement(){this._ieCssStyles&&(this.styleElement.innerHTML=this._ieCssStyles.map((e=>e.toString(this._rules))).join("\n"))}updateStyleElementCore(){if(this._rules){const e=this._rules.map((e=>`${e.name}: ${e.value}`)).join(";\n");this.styleElement.innerHTML=`:root{ ${e} }`}}update(){this._rules=[],this.initialize()}initializeIeCssStyles(){}initializeDummyElements(){}initializeRules(){}removeDummyElements(){}}class h extends u{initializeIeCssStyles(){this._ieCssStyles=[new m(["th:focus .dxColumnResizeAnchor"],["box-shadow: 0 0 0 1px --dx-accent-shadow-color;"]),new m(["th:focus .dxColumnResizeAnchor::after"],["border-left: 1px solid --dx-accent-color;","border-right: 1px solid --dx-accent-color;"]),new m([".table th:focus:before"],["box-shadow: 0 0 0 2px --dx-accent-color;"])]}initializeDummyElements(){const e=this.createDummyContainer(),t=this.createDummyLink();e.appendChild(t),document.documentElement.appendChild(e),this._dummyContainer=e}createDummyContainer(){const t=document.createElement("DIV");return t.style.top=e(-1e4),t.style.left=e(-1e4),t.className="dxAIFE",t.setAttribute("aria-hidden","true"),t}createDummyLink(){const e=document.createElement("A");return e.innerHTML="test",e.href="javascript:;",e}removeDummyElements(){this._dummyContainer&&document.documentElement.removeChild(this._dummyContainer),this._dummyContainer=null}initializeRules(){const e=this.getAccentColor();this._rules&&(this._rules.push(new d("--dx-accent-color",e)),this._rules.push(new d("--dx-accent-shadow-color",this.getAccentShadowColor(e))))}}class p extends u{initializeIeCssStyles(){this._ieCssStyles=[new m([".dxbs-gridview.dxbs-has-vertical-scrollbar.dxbs-vertical-scrollbar-visible > .card > .dxgvHSDC.dxbs-scrollbar-padding"],["padding-right: --dx-scrollbar-width;"])]}initializeRules(){this._rules&&this._rules.push(new d("--dx-scrollbar-width",e(t())))}}function y(){window.dxAccentColorStyle||(window.dxAccentColorStyle=new h)}function f(){c||(c=new p),c&&c.update()}function C(){const e=Array.from(document.styleSheets).map((e=>e.href)).filter(a.isStyleSheetDeprecated);e.length>0&&e.forEach((e=>{const t=a.create();document.body.appendChild(t)}))}const g={ensureAccentColorStyle:y,showDeprecatedStyleSheetWarningIfNeeded:C};export{g as default,y as ensureAccentColorStyle,C as showDeprecatedStyleSheetWarningIfNeeded,f as updateScrollbarStyle};
