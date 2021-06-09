(self.webpackChunkfc_frontend=self.webpackChunkfc_frontend||[]).push([[896],{9012:(e,t,a)=>{"use strict";a.d(t,{Z:()=>o});var n=a(5466),r=a(3074),l=a.n(r);function c(e){var t=e.value,a=e.onChange,r=e.type,l=void 0===r?"text":r,c=e.label,o=void 0===c?"Input Field":c,i=e.id,s=e.placeholder,u=void 0===s?"":s,m=e.error,p=void 0===m?"":m,d=e.className,f=void 0===d?"":d,b=e.variant,v=void 0===b?"classic":b,y=e.disabled,g=void 0!==y&&y,h=e.lableClass,E=void 0===h?"":h,k=e.inputClass,N=void 0===k?"":k,w="floating"==v?"form-floating":"",j="inline"==v?"row":"";return n.createElement("div",{className:"mb-3 ".concat(w," ").concat(j," ").concat(f)},!w&&n.createElement("label",{htmlFor:i,className:"form-label ".concat(E)},o),n.createElement("input",{value:t,onChange:function(e){return a(e.target.value)},type:l,className:"form-control ".concat(p?"is-invalid":""," ").concat(N),id:i,placeholder:w?o:u,disabled:g}),p&&n.createElement("div",{className:"invalid-feedback"},p),w&&n.createElement("label",{htmlFor:i,className:"form-label ".concat(E)},o))}c.propTypes={className:l().string,lableClass:l().string,inputClass:l().string,value:l().string,placeholder:l().string,onChange:l().func,type:l().string,label:l().string,id:l().string,variant:l().oneOf(["floating","inline","classic"]),error:l().string,disabled:l().bool};const o=c},1328:(e,t,a)=>{"use strict";a.d(t,{Z:()=>o});var n=a(5466),r=a(3074),l=a.n(r);function c(e){var t=e.elevation,a=void 0===t?3:t,r=e.className,l=void 0===r?"":r,c=e.style;return n.createElement("div",{className:"paper bg-light elevation-".concat(a," ").concat(l),style:c},e.children)}c.propTypes={elevation:l().oneOf([0,1,2,3,4,5,6]),children:l().node,className:l().string,style:l().object};const o=c},7819:(e,t,a)=>{"use strict";a.d(t,{Z:()=>m});var n=a(5466),r=a(3074),l=a.n(r);function c(e){var t=e.columns,a=e.hasActions;return n.createElement("thead",null,n.createElement("tr",null,t.map((function(e,t){return n.createElement("th",{className:"table-cell table-cell-head ".concat(e.right&&"table-cell-right"),scope:"col",key:e.key},e.lable)})),a&&n.createElement("th",{className:"table-cell table-cell-head table-cell-right",scope:"col"},"Akcije")))}c.propsType={columns:l().arrayOf(l().objectOf({key:l().string,lable:l().string,right:l().bool})),hasActions:l().bool};const o=c;function i(e){var t=e.columns,a=e.data,r=e.rowActions;return n.createElement("tbody",null,a.map((function(e){return n.createElement("tr",{key:e.id},t.map((function(t,a){return n.createElement("td",{className:"table-cell ".concat(t.right&&"table-cell-right"),key:e.id+"_"+(Array.isArray(t.key)?t.key.join("_"):t.key)},Array.isArray(t.key)?t.wrapper?t.wrapper(t.key.map((function(t){return e[t]}))):t.key.map((function(t){return e[t]})).join(" "):t.wrapper?t.wrapper(e[t.key]):e[t.key])})),!!r&&n.createElement("td",{className:"table-cell table-cell-right"},r.map((function(t,a){return n.createElement("span",{onClick:function(){return t.onAction(e)},key:e.id+"_action_"+a},t.content)}))))})))}i.propsType={columns:l().arrayOf(l().objectOf({key:l().string,lable:l().string,right:l().bool,wrapper:l().func})),data:l().array,rowActions:l().arrayOf(l().objectOf({content:l().node,onAction:l().func}))};const s=i;function u(e){var t=e.columns,a=e.data,r=e.rowActions;return n.createElement("table",{className:"table-root"},n.createElement(o,{columns:t,hasActions:!!r}),n.createElement(s,{columns:t,data:a,rowActions:r}))}u.propsType={columns:l().arrayOf(l().objectOf({key:l().string,lable:l().string,right:l().bool,sortable:l().bool,wrapper:l().func})),data:l().array,rowActions:l().arrayOf(l().objectOf({content:l().node,onAction:l().func}))};const m=u},3896:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>p});var n=a(5466),r=a(6098),l=a(6387),c=a(9012),o=a(1328),i=a(7819);function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=a){var n,r,l=[],c=!0,o=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);c=!0);}catch(e){o=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(o)throw r}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?u(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var m=[{key:"treningNaziv",lable:"Naziv treninga"},{key:"treningOpis",lable:"Opis trening"},{key:"treningTipTreninga",lable:"Tip treninga"},{key:"treningTrajanje",lable:"Trajanje treninga"},{key:"cena",lable:"Cena termina",right:!0,wrapper:function(e){return n.createElement("span",null,e," rsd")}},{key:"vremePocetka",lable:"Vreme termina",right:!0,wrapper:function(e){return n.createElement("span",null,new Intl.DateTimeFormat("default",{timeStyle:"short",dateStyle:"medium"}).format(new Date(e)))}},{key:"salaOznaka",lable:"Oznaka sale",right:!0},{key:["brojPrijavljenih","salaKapacitet"],lable:"Prijavljeno",right:!0,wrapper:function(e){var t=s(e,2),a=t[0],r=t[1];return n.createElement("span",null,a,"/",r)}}];const p=function(){(0,l.k6)();var e=s((0,n.useState)(""),2),t=e[0],a=e[1],u=s((0,n.useState)(""),2),p=u[0],d=u[1],f=s((0,n.useState)(""),2),b=f[0],v=f[1],y=s((0,n.useState)(""),2),g=y[0],h=y[1],E=s((0,n.useState)(""),2),k=E[0],N=E[1],w=s((0,n.useState)(""),2),j=w[0],A=w[1],C=s((0,n.useState)(""),2),O=C[0],S=C[1],T=(0,r.useQuery)(["treninzi","termini"],(function(){return fetch("http://localhost:8080/api/treninzi/search?naziv=".concat(t,"&opis=").concat(p,"&cena=").concat(b,"&tip=").concat(g,"&vremePocetka=").concat(k,"&orderBy=").concat(j,"&direction=").concat(O),{headers:{Authorization:"Bearer "+window.localStorage.getItem("token")}}).then((function(e){return e.json()}))})),x=T.isLoading,z=T.error,Z=T.data,P=T.refetch;return n.createElement(o.Z,{className:"pb-2"},n.createElement("div",{className:"d-flex justify-content-between p-3"},n.createElement("span",{className:"fs-5 fw-bold "},"Treninzi")),n.createElement("div",{className:"d-flex px-3 align-items-end pb-3"},n.createElement("div",{className:"col-2 px-2 ps-0"},n.createElement(c.Z,{id:"naziv",label:"Naziv",value:t,onChange:a})),n.createElement("div",{className:"col-2 px-2"},n.createElement(c.Z,{id:"opis",label:"Opis",value:p,onChange:d})),n.createElement("div",{className:"col-2 px-2"},n.createElement(c.Z,{id:"tip",label:"Tip treninga",value:g,onChange:h})),n.createElement("div",{className:"col-1 px-2"},n.createElement(c.Z,{id:"cena",label:"Cena",type:"number",value:b,onChange:v})),n.createElement("div",{className:"col-2 px-2"},n.createElement(c.Z,{id:"datum",label:"Datum termina",type:"date",value:k,onChange:N})),n.createElement("div",{className:"col-2 pb-3 px-2"},n.createElement("select",{className:"form-select ",onChange:function(e){switch(e.target.value){case"1":A("cena"),S("asc");break;case"2":A("cena"),S("desc");break;case"3":A("vremePocetak"),S("asc");break;case"4":A("vremePocetak"),S("desc")}},defaultValue:"0"},n.createElement("option",{value:"0"},"Sortiraj po"),n.createElement("option",{value:"1"},"Cena rastuce"),n.createElement("option",{value:"2"},"Cena opadajuce"),n.createElement("option",{value:"3"},"Datum rastuce"),n.createElement("option",{value:"4"},"Datum opadajuce"))),n.createElement("div",{className:"col-1 pb-3 ps-2 d-flex justify-content-end"},n.createElement("button",{className:"btn btn-secondary",onClick:P},"Pretrazi"))),x&&n.createElement("span",null,"Loading..."),!x&&(z||Z.error)&&n.createElement("span",null,"Error"),!x&&!(z||Z.error)&&n.createElement(i.Z,{className:"mx-1",data:Z,columns:m}))}}}]);