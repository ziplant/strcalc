!function(e){var t={};function r(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(s,i,function(t){return e[t]}.bind(null,i));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=5)}([function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Calc",(function(){return Calc}));var _exp__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1);class Calc{constructor(e){this.template=__webpack_require__(3).calc,this.exp=new _exp__WEBPACK_IMPORTED_MODULE_0__.Exp,this.root=e,this.root.innerHTML="",this.root.appendChild(this.create(this.template));try{this.data=JSON.parse(localStorage.getItem(this.root.id))||{}}catch{this.data={}}this.input=this.root.querySelector(".calc_input"),this.output=this.root.querySelector(".calc_result"),this.input.value=this.data.exp||"",this.varList=this.data.vars;for(let e in this.data.vars)this.addVar(null,e,this.data.vars[e]);this.counting()}create(obj){let element=document.createElement(obj.elem);for(let e in obj.attributes)element.setAttribute(e,obj.attributes[e]);element.textContent=obj.text?obj.text:"";for(let key in obj.events)eval(`element.on${key} = (e) => {\n        this.${obj.events[key]}.call(this, e)\n      }`);for(let e in obj.children)element.appendChild(this.create(obj.children[e]));return element}limitVar(){let e=this.root.querySelector(".calc_btn--add");if(this.root.querySelectorAll(".vars_item").length>=5)return e.disabled=!0,void e.classList.add("calc_btn--disabled");e.disabled=!1,e.classList.remove("calc_btn--disabled")}addVar(e,t,r){let s=__webpack_require__(4).variable,i=this.root.querySelector(".calc_vars");s.children.key.attributes.value=t||"",s.children.value.attributes.value=r||"",i.appendChild(this.create(s)),this.limitVar()}removeVar(e){e.target.parentNode.remove();let t=e.target.parentNode.querySelector(".vars_key").value;t&&delete this.varList[t],this.limitVar(),this.setData(),this.counting()}inputVar(e){this.varList={};let t=this.root.querySelectorAll(".vars_key"),r=this.root.querySelectorAll(".vars_value");if(t.length==r.length){for(let e=0;e<t.length;e++)""!=t[e].value&&""!=r[e].value&&(this.varList[t[e].value]=r[e].value,this.setData());this.counting()}}counting(){this.setData(),this.output.innerHTML=this.exp.getResult(this.input.value,this.varList)}clear(){localStorage.removeItem(this.root.id),this.input.value="",this.output.innerHTML="",this.root.querySelector(".calc_vars").innerHTML="",this.varList={},this.limitVar()}setData(){localStorage.setItem(this.root.id,JSON.stringify({exp:this.input.value,vars:this.varList}))}}},function(e,t,r){"use strict";r.r(t),r.d(t,"Exp",(function(){return i}));var s=r(2);class i{constructor(){this.core=new s.Core}parseExp(e){if(this.core.isUndefined(e))return;for(~(e=e.replace(/ /g,"").replace(/,/g,"."))[0].indexOf("-")&&(e=e.replace("-","_"));~e.indexOf("|");)e=(e=e.replace("|","abs(")).replace("|",")");e=e.replace(/\(-/g,"(_");let t=[];for(let r=0;r<e.length;r++){let s="";if(this.core.isNum(e[r])||"_"==e[r]){for(s+=e[r],r++;r<e.length&&(this.core.isNum(e[r])||"."==e[r]);)s+=e[r],r++;r--,t.push(s)}else if(this.core.isString(e[r])){for(s+=e[r],r++;r<e.length&&(this.core.isString(e[r])||this.core.isNum(e[r]));)s+=e[r],r++;r--,t.push(s)}else if(!this.core.isOperation(e[r])||this.core.isUndefined(e[r+1])||this.core.isOperation(e[r+1])){if(!this.core.isBkt(e[r])&&!this.core.isFact(e[r]))return;t.push(e[r])}else t.push(e[r])}return t.forEach((e,t,r)=>{r[t]=e.replace("_","-")}),t}setVars(e,t){if(e){for(let r in t)if(r!=t[r])for(;e.includes(r);)e.splice(e.indexOf(r),1,...this.parseExp(`(${t[r]})`));return e}}getStack(e){if(this.core.isUndefined(e))return;if(this.core.isOperation(e[0])||this.core.isOperation(e[e.length-1])||this.core.isFact(e[0]))return;let t=[],r=[];for(let s=0;s<e.length;s++)if(this.core.isNum(e[s]))r.push(e[s]);else if(this.core.isFact(e[s]))t.length>0&&this.core.isString(t.peek())&&r.push(t.pop()),r.push(e[s]);else if(this.core.isString(e[s])||this.core.isOpenBkt(e[s]))t.push(e[s]);else if(this.core.isCloseBkt(e[s])){if(!~t.indexOf("("))return;for(;"("!=t.peek();)r.push(t.pop());t.pop()}else if(this.core.isOperation(e[s])){for(;t.length>0&&(this.core.isString(t.peek())||this.core.getPrior(t.peek())>=this.core.getPrior(e[s]));)r.push(t.pop());t.push(e[s])}else t.push(e[s]);if(!~t.indexOf("(")){for(;t.length>0;)r.push(t.pop());return r}}executeStack(e){if(!this.core.isUndefined(e)){for(let t=0;t<e.length;t++)t>1&&this.core.isOperation(e[t])?(e.splice(t-2,3,this.core.solveBinary(e[t-2],e[t-1],e[t])),t-=2):this.core.isFact(e[t])?(e.splice(t-1,2,this.core.getFact(e[t-1])),t--):t>0&&this.core.isString(e[t])&&(e.splice(t-1,2,this.core.solveFunction(e[t-1],e[t])),t--);if(!(e.length>1||e.some(isNaN)))return e[0]}}getResult(e,t){let r=this.executeStack(this.getStack(this.setVars(this.parseExp(e),t)));return this.core.isUndefined(r)?null:r}}},function(e,t,r){"use strict";r.r(t),r.d(t,"Core",(function(){return s}));class s{constructor(){Array.prototype.peek=function(){return this[this.length-1]}}round(e,t){return t=Math.pow(10,t),Math.round(e*t)/t}isUndefined(e){return void 0===e||""===e}isNum(e){return!!(Math.abs(+e)+1)}isOperation(e){return["^","/","*","+","-","%"].includes(e)}isString(e){return!!~e.toString().search(/^[a-z]+\d*$/i)}isBkt(e){return"("==e||")"==e}isOpenBkt(e){return"("==e}isCloseBkt(e){return")"==e}isFact(e){return"!"==e}getFact(e){for(let t=e-1;t>0;t--)e*=t;return e}getPrior(e){return{"^":4,"*":3,"/":3,"%":3,"+":2,"-":2,"(":1,")":1}[e]||0}solveBinary(e,t,r){let s;switch(r){case"*":s=+e*+t;break;case"/":s=+e/+t;break;case"-":s=+e-+t;break;case"+":s=+e+ +t;break;case"^":s=Math.pow(+e,+t);break;case"%":s=+e%+t}return this.round(s,14)}solveFunction(e,t){let r;switch(t){case"sin":r=Math.sin(e);break;case"cos":r=Math.cos(e);break;case"abs":r=Math.abs(e);break;case"sqrt":r=Math.sqrt(e);break;case"exp":r=Math.exp(e);break;case"tg":r=Math.tan(e);break;case"ctg":r=1/Math.tan(e);break;case"log":r=Math.log10(e);break;case"ln":r=Math.log(e);break;case"sec":r=1/Math.cos(e);break;case"cosec":r=1/Math.sin(e);break;case"arcsin":r=Math.asin(e);break;case"arccos":r=Math.acos(e);break;case"arctg":r=Math.atan(e);break;case"arcctg":r=Math.PI/2-Math.atan(e);break;case"sh":r=Math.sinh(e);break;case"ch":r=Math.cosh(e);break;case"th":r=Math.tanh(e);break;case"cth":r=Math.cosh(e)/Math.sinh(e);break;case"sgn":r=Math.sign(e);break;default:if(~t.search(/^log\d+/)){r=Math.log(+e)/Math.log(+t.replace("log",""));break}return}return this.round(r,14)}}},function(e,t){t.calc={elem:"div",attributes:{class:"calc"},children:{head:{elem:"div",attributes:{class:"calc_head"},children:{title:{elem:"h4",attributes:{class:"calc_title"},text:"Calculator"}}},input:{elem:"input",attributes:{type:"text",class:"calc_input"},events:{input:"counting"}},controls:{elem:"div",attributes:{class:"calc_controls"},children:{clear:{elem:"button",attributes:{class:"calc_btn calc_btn--clear"},text:"Clear",events:{click:"clear"}},add:{elem:"button",attributes:{class:"calc_btn calc_btn--add"},text:"Add variable",events:{click:"addVar"}}}},result:{elem:"p",attributes:{class:"calc_result"}},vars:{elem:"div",attributes:{class:"calc_vars vars"}}}}},function(e,t){t.variable={elem:"div",attributes:{class:"vars_item"},children:{key:{elem:"input",attributes:{class:"vars_key"},events:{input:"inputVar"}},eq:{elem:"div",attributes:{class:"vars_eq"},text:"="},value:{elem:"input",attributes:{class:"vars_value"},events:{input:"inputVar"}},remove:{elem:"button",attributes:{class:"vars_remove"},text:"Remove",events:{click:"removeVar"}}}}},function(e,t,r){r(6),r(0),r(2),r(1),r(3),e.exports=r(4)},function(e,t,r){"use strict";r.r(t);var s=r(0);Node.prototype.calc=function(){new s.Calc(this)},exports.calc=function(){Node.prototype.calc=function(){new s.Calc(this)}}}]);