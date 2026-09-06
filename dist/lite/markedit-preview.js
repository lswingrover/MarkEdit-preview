"use strict";(()=>{var e=Object.defineProperty,n=(o,u,c)=>u in o?e(o,u,{enumerable:!0,configurable:!0,writable:!0,value:c}):o[u]=c,t=(o,u,c)=>n(o,typeof u!="symbol"?u+"":u,c);const r=globalThis;if(typeof r.require>"u"){const o=()=>({}),u={"markedit-api":{MarkEdit:r.MarkEdit??Object.freeze({})},"@codemirror/view":{EditorView:{updateListener:{of:o}},keymap:{of:o},showPanel:{of:o}},"@codemirror/state":{Annotation:{define:()=>({of:o})},Compartment:class{constructor(){t(this,"of",o),t(this,"reconfigure",o),t(this,"get",()=>{})}},Prec:{highest:c=>c,high:c=>c,default:c=>c,low:c=>c,lowest:c=>c},EditorSelection:{cursor:c=>({from:c,to:c}),range:(c,a)=>({from:c,to:a}),single:(c,a)=>({from:c,to:a}),create:()=>({})}}};r.require=c=>u[c]??{}}})();const qr=require("@codemirror/view"),P=require("markedit-api"),oe=require("@codemirror/state");function _a(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function $r(){return typeof __FILE_PATH__=="string"}function Le(e,n=!0){const t=document.createElement("style");return t.textContent=e,document.head.appendChild(t),t.disabled=!n,t}function ko(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function Ea(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function an(e){const n=parseInt(e.dataset.lineFrom??"0"),t=parseInt(e.dataset.lineTo??"0");return{from:n,to:t}}function lt(e,n){let t=0,r=n;for(;r!==null&&r!==e;)t+=r.offsetTop,r=r.offsetParent;return t}function Pt(e,n,t,r=!0){const o=lt(e,n)+n.offsetHeight*t;at(e,o,r)}function at(e,n,t=!0){const r=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:n<=r?0:n,behavior:t?"smooth":"instant"})}function Aa(e){const n=document.createRange();n.selectNodeContents(e);const t=getSelection();t?.removeAllRanges(),t?.addRange(n)}function Sa(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function rn(e,n){return e.endsWith("/")?e+n:e+"/"+n}async function Da(e){const n=await P.MarkEdit.getFileContent(e);if(n===void 0)return{};try{const t=JSON.parse(n);return typeof t=="object"&&t!==null?t:{}}catch(t){return console.error(`Failed to parse JSON from ${e}:`,t),{}}}const yo={};function Ta(e){let n=yo[e];if(n)return n;n=yo[e]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);n.push(r)}for(let t=0;t<e.length;t++){const r=e.charCodeAt(t);n[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return n}function sn(e,n){typeof n!="string"&&(n=sn.defaultChars);const t=Ta(n);return e.replace(/(%[a-f0-9]{2})+/gi,function(r){let o="";for(let u=0,c=r.length;u<c;u+=3){const a=parseInt(r.slice(u+1,u+3),16);if(a<128){o+=t[a];continue}if((a&224)===192&&u+3<c){const l=parseInt(r.slice(u+4,u+6),16);if((l&192)===128){const d=a<<6&1984|l&63;d<128?o+="��":o+=String.fromCharCode(d),u+=3;continue}}if((a&240)===224&&u+6<c){const l=parseInt(r.slice(u+4,u+6),16),d=parseInt(r.slice(u+7,u+9),16);if((l&192)===128&&(d&192)===128){const f=a<<12&61440|l<<6&4032|d&63;f<2048||f>=55296&&f<=57343?o+="���":o+=String.fromCharCode(f),u+=6;continue}}if((a&248)===240&&u+9<c){const l=parseInt(r.slice(u+4,u+6),16),d=parseInt(r.slice(u+7,u+9),16),f=parseInt(r.slice(u+10,u+12),16);if((l&192)===128&&(d&192)===128&&(f&192)===128){let s=a<<18&1835008|l<<12&258048|d<<6&4032|f&63;s<65536||s>1114111?o+="����":(s-=65536,o+=String.fromCharCode(55296+(s>>10),56320+(s&1023))),u+=9;continue}}o+="�"}return o})}sn.defaultChars=";/?:@&=+$,#";sn.componentChars="";const xo={};function Fa(e){let n=xo[e];if(n)return n;n=xo[e]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);/^[0-9a-z]$/i.test(r)?n.push(r):n.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<e.length;t++)n[e.charCodeAt(t)]=e[t];return n}function zn(e,n,t){typeof n!="string"&&(t=n,n=zn.defaultChars),typeof t>"u"&&(t=!0);const r=Fa(n);let o="";for(let u=0,c=e.length;u<c;u++){const a=e.charCodeAt(u);if(t&&a===37&&u+2<c&&/^[0-9a-f]{2}$/i.test(e.slice(u+1,u+3))){o+=e.slice(u,u+3),u+=2;continue}if(a<128){o+=r[a];continue}if(a>=55296&&a<=57343){if(a>=55296&&a<=56319&&u+1<c){const l=e.charCodeAt(u+1);if(l>=56320&&l<=57343){o+=encodeURIComponent(e[u]+e[u+1]),u++;continue}}o+="%EF%BF%BD";continue}o+=encodeURIComponent(e[u])}return o}zn.defaultChars=";/?:@&=+$,-_.!~*'()#";zn.componentChars="-_.!~*'()";function Hr(e){let n="";return n+=e.protocol||"",n+=e.slashes?"//":"",n+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?n+="["+e.hostname+"]":n+=e.hostname||"",n+=e.port?":"+e.port:"",n+=e.pathname||"",n+=e.search||"",n+=e.hash||"",n}function st(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const Ma=/^([a-z0-9.+-]+:)/i,Ia=/:[0-9]*$/,Ra=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,La=["<",">",'"',"`"," ","\r",`
`,"	"],Na=["{","}","|","\\","^","`"].concat(La),Oa=["'"].concat(Na),wo=["%","/","?",";","#"].concat(Oa),vo=["/","?","#"],Ba=255,Co=/^[+a-z0-9A-Z_-]{0,63}$/,Pa=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,_o={javascript:!0,"javascript:":!0},Eo={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function jr(e,n){if(e&&e instanceof st)return e;const t=new st;return t.parse(e,n),t}st.prototype.parse=function(e,n){let t,r,o,u=e;if(u=u.trim(),!n&&e.split("#").length===1){const d=Ra.exec(u);if(d)return this.pathname=d[1],d[2]&&(this.search=d[2]),this}let c=Ma.exec(u);if(c&&(c=c[0],t=c.toLowerCase(),this.protocol=c,u=u.substr(c.length)),(n||c||u.match(/^\/\/[^@\/]+@[^@\/]+/))&&(o=u.substr(0,2)==="//",o&&!(c&&_o[c])&&(u=u.substr(2),this.slashes=!0)),!_o[c]&&(o||c&&!Eo[c])){let d=-1;for(let b=0;b<vo.length;b++)r=u.indexOf(vo[b]),r!==-1&&(d===-1||r<d)&&(d=r);let f,s;d===-1?s=u.lastIndexOf("@"):s=u.lastIndexOf("@",d),s!==-1&&(f=u.slice(0,s),u=u.slice(s+1),this.auth=f),d=-1;for(let b=0;b<wo.length;b++)r=u.indexOf(wo[b]),r!==-1&&(d===-1||r<d)&&(d=r);d===-1&&(d=u.length),u[d-1]===":"&&d--;const p=u.slice(0,d);u=u.slice(d),this.parseHost(p),this.hostname=this.hostname||"";const m=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!m){const b=this.hostname.split(/\./);for(let g=0,k=b.length;g<k;g++){const x=b[g];if(x&&!x.match(Co)){let v="";for(let E=0,S=x.length;E<S;E++)x.charCodeAt(E)>127?v+="x":v+=x[E];if(!v.match(Co)){const E=b.slice(0,g),S=b.slice(g+1),R=x.match(Pa);R&&(E.push(R[1]),S.unshift(R[2])),S.length&&(u=S.join(".")+u),this.hostname=E.join(".");break}}}}this.hostname.length>Ba&&(this.hostname=""),m&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const a=u.indexOf("#");a!==-1&&(this.hash=u.substr(a),u=u.slice(0,a));const l=u.indexOf("?");return l!==-1&&(this.search=u.substr(l),u=u.slice(0,l)),u&&(this.pathname=u),Eo[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};st.prototype.parseHost=function(e){let n=Ia.exec(e);n&&(n=n[0],n!==":"&&(this.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(this.hostname=e)};const za=Object.freeze(Object.defineProperty({__proto__:null,decode:sn,encode:zn,format:Hr,parse:jr},Symbol.toStringTag,{value:"Module"})),Ru=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Lu=/[\0-\x1F\x7F-\x9F]/,qa=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Ur=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Nu=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Ou=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,$a=Object.freeze(Object.defineProperty({__proto__:null,Any:Ru,Cc:Lu,Cf:qa,P:Ur,S:Nu,Z:Ou},Symbol.toStringTag,{value:"Module"})),Ha=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),ja=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var zt;const Ua=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),Ga=(zt=String.fromCodePoint)!==null&&zt!==void 0?zt:function(e){let n="";return e>65535&&(e-=65536,n+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),n+=String.fromCharCode(e),n};function Va(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=Ua.get(e))!==null&&n!==void 0?n:e}var ee;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(ee||(ee={}));const Ka=32;var Oe;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(Oe||(Oe={}));function Sr(e){return e>=ee.ZERO&&e<=ee.NINE}function Za(e){return e>=ee.UPPER_A&&e<=ee.UPPER_F||e>=ee.LOWER_A&&e<=ee.LOWER_F}function Wa(e){return e>=ee.UPPER_A&&e<=ee.UPPER_Z||e>=ee.LOWER_A&&e<=ee.LOWER_Z||Sr(e)}function Ya(e){return e===ee.EQUALS||Wa(e)}var Q;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(Q||(Q={}));var Ae;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(Ae||(Ae={}));class Ja{constructor(n,t,r){this.decodeTree=n,this.emitCodePoint=t,this.errors=r,this.state=Q.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=Ae.Strict}startEntity(n){this.decodeMode=n,this.state=Q.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,t){switch(this.state){case Q.EntityStart:return n.charCodeAt(t)===ee.NUM?(this.state=Q.NumericStart,this.consumed+=1,this.stateNumericStart(n,t+1)):(this.state=Q.NamedEntity,this.stateNamedEntity(n,t));case Q.NumericStart:return this.stateNumericStart(n,t);case Q.NumericDecimal:return this.stateNumericDecimal(n,t);case Q.NumericHex:return this.stateNumericHex(n,t);case Q.NamedEntity:return this.stateNamedEntity(n,t)}}stateNumericStart(n,t){return t>=n.length?-1:(n.charCodeAt(t)|Ka)===ee.LOWER_X?(this.state=Q.NumericHex,this.consumed+=1,this.stateNumericHex(n,t+1)):(this.state=Q.NumericDecimal,this.stateNumericDecimal(n,t))}addToNumericResult(n,t,r,o){if(t!==r){const u=r-t;this.result=this.result*Math.pow(o,u)+parseInt(n.substr(t,u),o),this.consumed+=u}}stateNumericHex(n,t){const r=t;for(;t<n.length;){const o=n.charCodeAt(t);if(Sr(o)||Za(o))t+=1;else return this.addToNumericResult(n,r,t,16),this.emitNumericEntity(o,3)}return this.addToNumericResult(n,r,t,16),-1}stateNumericDecimal(n,t){const r=t;for(;t<n.length;){const o=n.charCodeAt(t);if(Sr(o))t+=1;else return this.addToNumericResult(n,r,t,10),this.emitNumericEntity(o,2)}return this.addToNumericResult(n,r,t,10),-1}emitNumericEntity(n,t){var r;if(this.consumed<=t)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===ee.SEMI)this.consumed+=1;else if(this.decodeMode===Ae.Strict)return 0;return this.emitCodePoint(Va(this.result),this.consumed),this.errors&&(n!==ee.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,t){const{decodeTree:r}=this;let o=r[this.treeIndex],u=(o&Oe.VALUE_LENGTH)>>14;for(;t<n.length;t++,this.excess++){const c=n.charCodeAt(t);if(this.treeIndex=Qa(r,o,this.treeIndex+Math.max(1,u),c),this.treeIndex<0)return this.result===0||this.decodeMode===Ae.Attribute&&(u===0||Ya(c))?0:this.emitNotTerminatedNamedEntity();if(o=r[this.treeIndex],u=(o&Oe.VALUE_LENGTH)>>14,u!==0){if(c===ee.SEMI)return this.emitNamedEntityData(this.treeIndex,u,this.consumed+this.excess);this.decodeMode!==Ae.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;const{result:t,decodeTree:r}=this,o=(r[t]&Oe.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,o,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,t,r){const{decodeTree:o}=this;return this.emitCodePoint(t===1?o[n]&~Oe.VALUE_LENGTH:o[n+1],r),t===3&&this.emitCodePoint(o[n+2],r),r}end(){var n;switch(this.state){case Q.NamedEntity:return this.result!==0&&(this.decodeMode!==Ae.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case Q.NumericDecimal:return this.emitNumericEntity(0,2);case Q.NumericHex:return this.emitNumericEntity(0,3);case Q.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case Q.EntityStart:return 0}}}function Bu(e){let n="";const t=new Ja(e,r=>n+=Ga(r));return function(o,u){let c=0,a=0;for(;(a=o.indexOf("&",a))>=0;){n+=o.slice(c,a),t.startEntity(u);const d=t.write(o,a+1);if(d<0){c=a+t.end();break}c=a+d,a=d===0?c+1:c}const l=n+o.slice(c);return n="",l}}function Qa(e,n,t,r){const o=(n&Oe.BRANCH_LENGTH)>>7,u=n&Oe.JUMP_TABLE;if(o===0)return u!==0&&r===u?t:-1;if(u){const l=r-u;return l<0||l>=o?-1:e[t+l]-1}let c=t,a=c+o-1;for(;c<=a;){const l=c+a>>>1,d=e[l];if(d<r)c=l+1;else if(d>r)a=l-1;else return e[l+o]}return-1}const Pu=Bu(Ha);Bu(ja);function Xa(e,n=Ae.Legacy){return Pu(e,n)}function ec(e){return Pu(e,Ae.Strict)}function nc(e){return Object.prototype.toString.call(e)}function Gr(e){return nc(e)==="[object String]"}const tc=Object.prototype.hasOwnProperty;function rc(e,n){return tc.call(e,n)}function xt(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!="object")throw new TypeError(t+"must be object");Object.keys(t).forEach(function(r){e[r]=t[r]})}}),e}function oc(e,n,t){return[].concat(e.slice(0,n),t,e.slice(n+1))}function Vr(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function Mn(e){if(e>65535){e-=65536;const n=55296+(e>>10),t=56320+(e&1023);return String.fromCharCode(n,t)}return String.fromCharCode(e)}const zu=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,uc=/&([a-z#][a-z0-9]{1,31});/gi,ic=new RegExp(zu.source+"|"+uc.source,"gi"),ac=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function cc(e,n){if(n.charCodeAt(0)===35&&ac.test(n)){const r=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);return Vr(r)?Mn(r):e}const t=Xa(e);return t!==e?t:e}function lc(e){return e.indexOf("\\")<0?e:e.replace(zu,"$1")}function dn(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(ic,function(n,t,r){return t||cc(n,r)})}const sc=/[&<>"]/,dc=/[&<>"]/g,fc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function hc(e){return fc[e]}function ze(e){return sc.test(e)?e.replace(dc,hc):e}const pc=/[.?*+^$[\]\\(){}|-]/g;function mc(e){return e.replace(pc,"\\$&")}function V(e){switch(e){case 9:case 32:return!0}return!1}function In(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function qu(e){return Ur.test(e)||Nu.test(e)}function Rn(e){return qu(Mn(e))}function Ln(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function wt(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}function Ao(e){return e===32||e===9||e===10||e===13}function vt(e){let n=0;for(;n<e.length&&Ao(e.charCodeAt(n));n++);let t=e.length-1;for(;t>=n&&Ao(e.charCodeAt(t));t--);return e.slice(n,t+1)}const bc={mdurl:za,ucmicro:$a},gc=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:oc,asciiTrim:vt,assign:xt,escapeHtml:ze,escapeRE:mc,fromCodePoint:Mn,has:rc,isMdAsciiPunct:Ln,isPunctChar:qu,isPunctCharCode:Rn,isSpace:V,isString:Gr,isValidEntityCode:Vr,isWhiteSpace:In,lib:bc,normalizeReference:wt,unescapeAll:dn,unescapeMd:lc},Symbol.toStringTag,{value:"Module"}));function kc(e,n,t){let r,o,u,c;const a=e.posMax,l=e.pos;for(e.pos=n+1,r=1;e.pos<a;){if(u=e.src.charCodeAt(e.pos),u===93&&(r--,r===0)){o=!0;break}if(c=e.pos,e.md.inline.skipToken(e),u===91){if(c===e.pos-1)r++;else if(t)return e.pos=l,-1}}let d=-1;return o&&(d=e.pos),e.pos=l,d}function yc(e,n,t){let r,o=n;const u={ok:!1,pos:0,str:""};if(e.charCodeAt(o)===60){for(o++;o<t;){if(r=e.charCodeAt(o),r===10||r===60)return u;if(r===62)return u.pos=o+1,u.str=dn(e.slice(n+1,o)),u.ok=!0,u;if(r===92&&o+1<t){o+=2;continue}o++}return u}let c=0;for(;o<t&&(r=e.charCodeAt(o),!(r===32||r<32||r===127));){if(r===92&&o+1<t){if(e.charCodeAt(o+1)===32){o++;continue}o+=2;continue}if(r===40&&(c++,c>32))return u;if(r===41){if(c===0)break;c--}o++}return n===o||c!==0||(u.str=dn(e.slice(n,o)),u.pos=o,u.ok=!0),u}function xc(e,n,t,r){let o,u=n;const c={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(r)c.str=r.str,c.marker=r.marker;else{if(u>=t)return c;let a=e.charCodeAt(u);if(a!==34&&a!==39&&a!==40)return c;n++,u++,a===40&&(a=41),c.marker=a}for(;u<t;){if(o=e.charCodeAt(u),o===c.marker)return c.pos=u+1,c.str+=dn(e.slice(n,u)),c.ok=!0,c;if(o===40&&c.marker===41)return c;o===92&&u+1<t&&u++,u++}return c.can_continue=!0,c.str+=dn(e.slice(n,u)),c}const wc=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:yc,parseLinkLabel:kc,parseLinkTitle:xc},Symbol.toStringTag,{value:"Module"})),we={};we.code_inline=function(e,n,t,r,o){const u=e[n];return"<code"+o.renderAttrs(u)+">"+ze(u.content)+"</code>"};we.code_block=function(e,n,t,r,o){const u=e[n];return"<pre"+o.renderAttrs(u)+"><code>"+ze(e[n].content)+`</code></pre>
`};we.fence=function(e,n,t,r,o){const u=e[n],c=u.info?dn(u.info).trim():"";let a="",l="";if(c){const f=c.split(/(\s+)/g);a=f[0],l=f.slice(2).join("")}let d;if(t.highlight?d=t.highlight(u.content,a,l)||ze(u.content):d=ze(u.content),d.indexOf("<pre")===0)return d+`
`;if(c){const f=u.attrIndex("class"),s=u.attrs?u.attrs.slice():[];f<0?s.push(["class",t.langPrefix+a]):(s[f]=s[f].slice(),s[f][1]+=" "+t.langPrefix+a);const p={attrs:s};return`<pre><code${o.renderAttrs(p)}>${d}</code></pre>
`}return`<pre><code${o.renderAttrs(u)}>${d}</code></pre>
`};we.image=function(e,n,t,r,o){const u=e[n];return u.attrs[u.attrIndex("alt")][1]=o.renderInlineAsText(u.children,t,r),o.renderToken(e,n,t)};we.hardbreak=function(e,n,t){return t.xhtmlOut?`<br />
`:`<br>
`};we.softbreak=function(e,n,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};we.text=function(e,n){return ze(e[n].content)};we.html_block=function(e,n){return e[n].content};we.html_inline=function(e,n){return e[n].content};function bn(){this.rules=xt({},we)}bn.prototype.renderAttrs=function(n){let t,r,o;if(!n.attrs)return"";for(o="",t=0,r=n.attrs.length;t<r;t++)o+=" "+ze(n.attrs[t][0])+'="'+ze(n.attrs[t][1])+'"';return o};bn.prototype.renderToken=function(n,t,r){const o=n[t];let u="";if(o.hidden)return"";o.block&&o.nesting!==-1&&t&&n[t-1].hidden&&(u+=`
`),u+=(o.nesting===-1?"</":"<")+o.tag,u+=this.renderAttrs(o),o.nesting===0&&r.xhtmlOut&&(u+=" /");let c=!1;if(o.block&&(c=!0,o.nesting===1&&t+1<n.length)){const a=n[t+1];(a.type==="inline"||a.hidden||a.nesting===-1&&a.tag===o.tag)&&(c=!1)}return u+=c?`>
`:">",u};bn.prototype.renderInline=function(e,n,t){let r="";const o=this.rules;for(let u=0,c=e.length;u<c;u++){const a=e[u].type;typeof o[a]<"u"?r+=o[a](e,u,n,t,this):r+=this.renderToken(e,u,n)}return r};bn.prototype.renderInlineAsText=function(e,n,t){let r="";for(let o=0,u=e.length;o<u;o++)switch(e[o].type){case"text":r+=e[o].content;break;case"image":r+=this.renderInlineAsText(e[o].children,n,t);break;case"html_inline":case"html_block":r+=e[o].content;break;case"softbreak":case"hardbreak":r+=`
`;break}return r};bn.prototype.render=function(e,n,t){let r="";const o=this.rules;for(let u=0,c=e.length;u<c;u++){const a=e[u].type;a==="inline"?r+=this.renderInline(e[u].children,n,t):typeof o[a]<"u"?r+=o[a](e,u,n,t,this):r+=this.renderToken(e,u,n,t)}return r};function ie(){this.__rules__=[],this.__cache__=null}ie.prototype.__find__=function(e){for(let n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===e)return n;return-1};ie.prototype.__compile__=function(){const e=this,n=[""];e.__rules__.forEach(function(t){t.enabled&&t.alt.forEach(function(r){n.indexOf(r)<0&&n.push(r)})}),e.__cache__={},n.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(r){r.enabled&&(t&&r.alt.indexOf(t)<0||e.__cache__[t].push(r.fn))})})};ie.prototype.at=function(e,n,t){const r=this.__find__(e),o=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__[r].fn=n,this.__rules__[r].alt=o.alt||[],this.__cache__=null};ie.prototype.before=function(e,n,t,r){const o=this.__find__(e),u=r||{};if(o===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(o,0,{name:n,enabled:!0,fn:t,alt:u.alt||[]}),this.__cache__=null};ie.prototype.after=function(e,n,t,r){const o=this.__find__(e),u=r||{};if(o===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(o+1,0,{name:n,enabled:!0,fn:t,alt:u.alt||[]}),this.__cache__=null};ie.prototype.push=function(e,n,t){const r=t||{};this.__rules__.push({name:e,enabled:!0,fn:n,alt:r.alt||[]}),this.__cache__=null};ie.prototype.enable=function(e,n){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(r){const o=this.__find__(r);if(o<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[o].enabled=!0,t.push(r)},this),this.__cache__=null,t};ie.prototype.enableOnly=function(e,n){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(t){t.enabled=!1}),this.enable(e,n)};ie.prototype.disable=function(e,n){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(r){const o=this.__find__(r);if(o<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[o].enabled=!1,t.push(r)},this),this.__cache__=null,t};ie.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function ge(e,n,t){this.type=e,this.tag=n,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}ge.prototype.attrIndex=function(n){if(!this.attrs)return-1;const t=this.attrs;for(let r=0,o=t.length;r<o;r++)if(t[r][0]===n)return r;return-1};ge.prototype.attrPush=function(n){this.attrs?this.attrs.push(n):this.attrs=[n]};ge.prototype.attrSet=function(n,t){const r=this.attrIndex(n),o=[n,t];r<0?this.attrPush(o):this.attrs[r]=o};ge.prototype.attrGet=function(n){const t=this.attrIndex(n);let r=null;return t>=0&&(r=this.attrs[t][1]),r};ge.prototype.attrJoin=function(n,t){const r=this.attrIndex(n);r<0?this.attrPush([n,t]):this.attrs[r][1]=this.attrs[r][1]+" "+t};function $u(e,n,t){this.src=e,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=n}$u.prototype.Token=ge;const vc=/\r\n?|\n/g,Cc=/\0/g;function _c(e){let n;n=e.src.replace(vc,`
`),n=n.replace(Cc,"�"),e.src=n}function Ec(e){let n;e.inlineMode?(n=new e.Token("inline","",0),n.content=e.src,n.map=[0,1],n.children=[],e.tokens.push(n)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function Ac(e){const n=e.tokens;for(let t=0,r=n.length;t<r;t++){const o=n[t];o.type==="inline"&&e.md.inline.parse(o.content,e.md,e.env,o.children)}}function Sc(e){return/^<a[>\s]/i.test(e)}function Dc(e){return/^<\/a\s*>/i.test(e)}function Tc(e){const n=e.tokens;if(e.md.options.linkify)for(let t=0,r=n.length;t<r;t++){if(n[t].type!=="inline"||!e.md.linkify.pretest(n[t].content))continue;const o=n[t].children,u=[];let c=0;for(let a=o.length-1;a>=0;a--){const l=o[a];if(l.type==="link_close"){for(a--;o[a].level!==l.level&&o[a].type!=="link_open";)a--;continue}if(l.type==="html_inline"&&(Sc(l.content)&&c>0&&c--,Dc(l.content)&&c++),!(c>0)&&l.type==="text"&&e.md.linkify.test(l.content)){const d=l.content;let f=e.md.linkify.match(d);const s=[];let p=l.level,m=0;f.length>0&&f[0].index===0&&a>0&&o[a-1].type==="text_special"&&(f=f.slice(1));for(let b=0;b<f.length;b++){const g=f[b].url,k=e.md.normalizeLink(g);if(!e.md.validateLink(k))continue;let x=f[b].text;f[b].schema?f[b].schema==="mailto:"&&!/^mailto:/i.test(x)?x=e.md.normalizeLinkText("mailto:"+x).replace(/^mailto:/,""):x=e.md.normalizeLinkText(x):x=e.md.normalizeLinkText("http://"+x).replace(/^http:\/\//,"");const v=f[b].index;if(v>m){const N=new e.Token("text","",0);N.content=d.slice(m,v),N.level=p,s.push(N)}const E=new e.Token("link_open","a",1);E.attrs=[["href",k]],E.level=p++,E.markup="linkify",E.info="auto",s.push(E);const S=new e.Token("text","",0);S.content=x,S.level=p,s.push(S);const R=new e.Token("link_close","a",-1);R.level=--p,R.markup="linkify",R.info="auto",s.push(R),m=f[b].lastIndex}if(m<d.length){const b=new e.Token("text","",0);b.content=d.slice(m),b.level=p,s.push(b)}u.push({index:a,nodes:s})}}if(u.length>0){let a=o.length;for(const s of u)a+=s.nodes.length-1;const l=new Array(a);let d=0,f=0;u.reverse();for(let s=0;s<o.length;s++){const p=u[d];if(p?.index===s){for(const m of p.nodes)l[f++]=m;d++}else l[f++]=o[s]}n[t].children=l}}}const Hu=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,Fc=/\((c|tm|r)\)/i,Mc=/\((c|tm|r)\)/ig,Ic={c:"©",r:"®",tm:"™"};function Rc(e,n){return Ic[n.toLowerCase()]}function Lc(e){let n=0;for(let t=e.length-1;t>=0;t--){const r=e[t];r.type==="text"&&!n&&(r.content=r.content.replace(Mc,Rc)),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function Nc(e){let n=0;for(let t=e.length-1;t>=0;t--){const r=e[t];r.type==="text"&&!n&&Hu.test(r.content)&&(r.content=r.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function Oc(e){let n;if(e.md.options.typographer)for(n=e.tokens.length-1;n>=0;n--)e.tokens[n].type==="inline"&&(Fc.test(e.tokens[n].content)&&Lc(e.tokens[n].children),Hu.test(e.tokens[n].content)&&Nc(e.tokens[n].children))}const Bc=/['"]/,So=/['"]/g,Do="’";function tt(e,n,t,r){e[n]||(e[n]=[]),e[n].push({pos:t,ch:r})}function Pc(e,n){let t="",r=0;n.sort((o,u)=>o.pos-u.pos);for(let o=0;o<n.length;o++){const u=n[o];t+=e.slice(r,u.pos)+u.ch,r=u.pos+1}return t+e.slice(r)}function zc(e,n){let t;const r=[],o={};for(let u=0;u<e.length;u++){const c=e[u],a=e[u].level;for(t=r.length-1;t>=0&&!(r[t].level<=a);t--);if(r.length=t+1,c.type!=="text")continue;const l=c.content;let d=0;const f=l.length;e:for(;d<f;){So.lastIndex=d;const s=So.exec(l);if(!s)break;let p=!0,m=!0;d=s.index+1;const b=s[0]==="'";let g=32;if(s.index-1>=0)g=l.charCodeAt(s.index-1);else for(t=u-1;t>=0&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t--)if(e[t].content){g=e[t].content.charCodeAt(e[t].content.length-1);break}let k=32;if(d<f)k=l.charCodeAt(d);else for(t=u+1;t<e.length&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t++)if(e[t].content){k=e[t].content.charCodeAt(0);break}const x=Ln(g)||Rn(g),v=Ln(k)||Rn(k),E=In(g),S=In(k);if(S?p=!1:v&&(E||x||(p=!1)),E?m=!1:x&&(S||v||(m=!1)),k===34&&s[0]==='"'&&g>=48&&g<=57&&(m=p=!1),p&&m&&(p=x,m=v),!p&&!m){b&&tt(o,u,s.index,Do);continue}if(m)for(t=r.length-1;t>=0;t--){let R=r[t];if(r[t].level<a)break;if(R.single===b&&r[t].level===a){R=r[t];let N,$;b?(N=n.md.options.quotes[2],$=n.md.options.quotes[3]):(N=n.md.options.quotes[0],$=n.md.options.quotes[1]),tt(o,u,s.index,$),tt(o,R.token,R.pos,N),r.length=t;continue e}}p?r.push({token:u,pos:s.index,single:b,level:a}):m&&b&&tt(o,u,s.index,Do)}}Object.keys(o).forEach(function(u){e[u].content=Pc(e[u].content,o[u])})}function qc(e){if(e.md.options.typographer)for(let n=e.tokens.length-1;n>=0;n--)e.tokens[n].type!=="inline"||!Bc.test(e.tokens[n].content)||zc(e.tokens[n].children,e)}function $c(e){let n,t;const r=e.tokens,o=r.length;for(let u=0;u<o;u++){if(r[u].type!=="inline")continue;const c=r[u].children,a=c.length;for(n=0;n<a;n++)c[n].type==="text_special"&&(c[n].type="text");for(n=t=0;n<a;n++)c[n].type==="text"&&n+1<a&&c[n+1].type==="text"?c[n+1].content=c[n].content+c[n+1].content:(n!==t&&(c[t]=c[n]),t++);n!==t&&(c.length=t)}}const qt=[["normalize",_c],["block",Ec],["inline",Ac],["linkify",Tc],["replacements",Oc],["smartquotes",qc],["text_join",$c]];function Kr(){this.ruler=new ie;for(let e=0;e<qt.length;e++)this.ruler.push(qt[e][0],qt[e][1])}Kr.prototype.process=function(e){const n=this.ruler.getRules("");for(let t=0,r=n.length;t<r;t++)n[t](e)};Kr.prototype.State=$u;function ve(e,n,t,r){this.src=e,this.md=n,this.env=t,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const o=this.src;for(let u=0,c=0,a=0,l=0,d=o.length,f=!1;c<d;c++){const s=o.charCodeAt(c);if(!f)if(V(s)){a++,s===9?l+=4-l%4:l++;continue}else f=!0;(s===10||c===d-1)&&(s!==10&&c++,this.bMarks.push(u),this.eMarks.push(c),this.tShift.push(a),this.sCount.push(l),this.bsCount.push(0),f=!1,a=0,l=0,u=c+1)}this.bMarks.push(o.length),this.eMarks.push(o.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}ve.prototype.push=function(e,n,t){const r=new ge(e,n,t);return r.block=!0,t<0&&this.level--,r.level=this.level,t>0&&this.level++,this.tokens.push(r),r};ve.prototype.isEmpty=function(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]};ve.prototype.skipEmptyLines=function(n){for(let t=this.lineMax;n<t&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n};ve.prototype.skipSpaces=function(n){for(let t=this.src.length;n<t;n++){const r=this.src.charCodeAt(n);if(!V(r))break}return n};ve.prototype.skipSpacesBack=function(n,t){if(n<=t)return n;for(;n>t;)if(!V(this.src.charCodeAt(--n)))return n+1;return n};ve.prototype.skipChars=function(n,t){for(let r=this.src.length;n<r&&this.src.charCodeAt(n)===t;n++);return n};ve.prototype.skipCharsBack=function(n,t,r){if(n<=r)return n;for(;n>r;)if(t!==this.src.charCodeAt(--n))return n+1;return n};ve.prototype.getLines=function(n,t,r,o){if(n>=t)return"";const u=new Array(t-n);for(let c=0,a=n;a<t;a++,c++){let l=0;const d=this.bMarks[a];let f=d,s;for(a+1<t||o?s=this.eMarks[a]+1:s=this.eMarks[a];f<s&&l<r;){const p=this.src.charCodeAt(f);if(V(p))p===9?l+=4-(l+this.bsCount[a])%4:l++;else if(f-d<this.tShift[a])l++;else break;f++}l>r?u[c]=new Array(l-r+1).join(" ")+this.src.slice(f,s):u[c]=this.src.slice(f,s)}return u.join("")};ve.prototype.Token=ge;const Hc=65536;function $t(e,n){const t=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];return e.src.slice(t,r)}function To(e){const n=[],t=e.length;let r=0,o=e.charCodeAt(r),u=!1,c=0,a="";for(;r<t;)o===124&&(u?(a+=e.substring(c,r-1),c=r):(n.push(a+e.substring(c,r)),a="",c=r+1)),u=o===92,r++,o=e.charCodeAt(r);return n.push(a+e.substring(c)),n}function jc(e,n,t,r){if(n+2>t)return!1;let o=n+1;if(e.sCount[o]<e.blkIndent||e.sCount[o]-e.blkIndent>=4)return!1;let u=e.bMarks[o]+e.tShift[o];if(u>=e.eMarks[o])return!1;const c=e.src.charCodeAt(u++);if(c!==124&&c!==45&&c!==58||u>=e.eMarks[o])return!1;const a=e.src.charCodeAt(u++);if(a!==124&&a!==45&&a!==58&&!V(a)||c===45&&V(a))return!1;for(;u<e.eMarks[o];){const S=e.src.charCodeAt(u);if(S!==124&&S!==45&&S!==58&&!V(S))return!1;u++}let l=$t(e,n+1),d=l.split("|");const f=[];for(let S=0;S<d.length;S++){const R=d[S].trim();if(!R){if(S===0||S===d.length-1)continue;return!1}if(!/^:?-+:?$/.test(R))return!1;R.charCodeAt(R.length-1)===58?f.push(R.charCodeAt(0)===58?"center":"right"):R.charCodeAt(0)===58?f.push("left"):f.push("")}if(l=$t(e,n).trim(),l.indexOf("|")===-1||e.sCount[n]-e.blkIndent>=4)return!1;d=To(l),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop();const s=d.length;if(s===0||s!==f.length)return!1;if(r)return!0;const p=e.parentType;e.parentType="table";const m=e.md.block.ruler.getRules("blockquote"),b=e.push("table_open","table",1),g=[n,0];b.map=g;const k=e.push("thead_open","thead",1);k.map=[n,n+1];const x=e.push("tr_open","tr",1);x.map=[n,n+1];for(let S=0;S<d.length;S++){const R=e.push("th_open","th",1);f[S]&&(R.attrs=[["style","text-align:"+f[S]]]);const N=e.push("inline","",0);N.content=d[S].trim(),N.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let v,E=0;for(o=n+2;o<t&&!(e.sCount[o]<e.blkIndent);o++){let S=!1;for(let N=0,$=m.length;N<$;N++)if(m[N](e,o,t,!0)){S=!0;break}if(S||(l=$t(e,o).trim(),!l)||e.sCount[o]-e.blkIndent>=4||(d=To(l),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop(),E+=s-d.length,E>Hc))break;if(o===n+2){const N=e.push("tbody_open","tbody",1);N.map=v=[n+2,0]}const R=e.push("tr_open","tr",1);R.map=[o,o+1];for(let N=0;N<s;N++){const $=e.push("td_open","td",1);f[N]&&($.attrs=[["style","text-align:"+f[N]]]);const U=e.push("inline","",0);U.content=d[N]?d[N].trim():"",U.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return v&&(e.push("tbody_close","tbody",-1),v[1]=o),e.push("table_close","table",-1),g[1]=o,e.parentType=p,e.line=o,!0}function Uc(e,n,t){if(e.sCount[n]-e.blkIndent<4)return!1;let r=n+1,o=r;for(;r<t;){if(e.isEmpty(r)){r++;continue}if(e.sCount[r]-e.blkIndent>=4){r++,o=r;continue}break}e.line=o;const u=e.push("code_block","code",0);return u.content=e.getLines(n,o,4+e.blkIndent,!1)+`
`,u.map=[n,e.line],!0}function Gc(e,n,t,r){let o=e.bMarks[n]+e.tShift[n],u=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||o+3>u)return!1;const c=e.src.charCodeAt(o);if(c!==126&&c!==96)return!1;let a=o;o=e.skipChars(o,c);let l=o-a;if(l<3)return!1;const d=e.src.slice(a,o),f=e.src.slice(o,u);if(c===96&&f.indexOf(String.fromCharCode(c))>=0)return!1;if(r)return!0;let s=n,p=!1;for(;s++,!(s>=t||(o=a=e.bMarks[s]+e.tShift[s],u=e.eMarks[s],o<u&&e.sCount[s]<e.blkIndent));)if(e.src.charCodeAt(o)===c&&!(e.sCount[s]-e.blkIndent>=4)&&(o=e.skipChars(o,c),!(o-a<l)&&(o=e.skipSpaces(o),!(o<u)))){p=!0;break}l=e.sCount[n],e.line=s+(p?1:0);const m=e.push("fence","code",0);return m.info=f,m.content=e.getLines(n+1,s,l,!0),m.markup=d,m.map=[n,e.line],!0}function Vc(e,n,t,r){let o=e.bMarks[n]+e.tShift[n],u=e.eMarks[n];const c=e.lineMax;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(o)!==62)return!1;if(r)return!0;const a=[],l=[],d=[],f=[],s=e.md.block.ruler.getRules("blockquote"),p=e.parentType;e.parentType="blockquote";let m=!1,b;for(b=n;b<t;b++){const E=e.sCount[b]<e.blkIndent;if(o=e.bMarks[b]+e.tShift[b],u=e.eMarks[b],o>=u)break;if(e.src.charCodeAt(o++)===62&&!E){let R=e.sCount[b]+1,N,$;e.src.charCodeAt(o)===32?(o++,R++,$=!1,N=!0):e.src.charCodeAt(o)===9?(N=!0,(e.bsCount[b]+R)%4===3?(o++,R++,$=!1):$=!0):N=!1;let U=R;for(a.push(e.bMarks[b]),e.bMarks[b]=o;o<u;){const K=e.src.charCodeAt(o);if(V(K))K===9?U+=4-(U+e.bsCount[b]+($?1:0))%4:U++;else break;o++}m=o>=u,l.push(e.bsCount[b]),e.bsCount[b]=e.sCount[b]+1+(N?1:0),d.push(e.sCount[b]),e.sCount[b]=U-R,f.push(e.tShift[b]),e.tShift[b]=o-e.bMarks[b];continue}if(m)break;let S=!1;for(let R=0,N=s.length;R<N;R++)if(s[R](e,b,t,!0)){S=!0;break}if(S){e.lineMax=b,e.blkIndent!==0&&(a.push(e.bMarks[b]),l.push(e.bsCount[b]),f.push(e.tShift[b]),d.push(e.sCount[b]),e.sCount[b]-=e.blkIndent);break}a.push(e.bMarks[b]),l.push(e.bsCount[b]),f.push(e.tShift[b]),d.push(e.sCount[b]),e.sCount[b]=-1}const g=e.blkIndent;e.blkIndent=0;const k=e.push("blockquote_open","blockquote",1);k.markup=">";const x=[n,0];k.map=x,e.md.block.tokenize(e,n,b);const v=e.push("blockquote_close","blockquote",-1);v.markup=">",e.lineMax=c,e.parentType=p,x[1]=e.line;for(let E=0;E<f.length;E++)e.bMarks[E+n]=a[E],e.tShift[E+n]=f[E],e.sCount[E+n]=d[E],e.bsCount[E+n]=l[E];return e.blkIndent=g,!0}function Kc(e,n,t,r){const o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let u=e.bMarks[n]+e.tShift[n];const c=e.src.charCodeAt(u++);if(c!==42&&c!==45&&c!==95)return!1;let a=1;for(;u<o;){const d=e.src.charCodeAt(u++);if(d!==c&&!V(d))return!1;d===c&&a++}if(a<3)return!1;if(r)return!0;e.line=n+1;const l=e.push("hr","hr",0);return l.map=[n,e.line],l.markup=Array(a+1).join(String.fromCharCode(c)),!0}function Fo(e,n){const t=e.eMarks[n];let r=e.bMarks[n]+e.tShift[n];const o=e.src.charCodeAt(r++);if(o!==42&&o!==45&&o!==43)return-1;if(r<t){const u=e.src.charCodeAt(r);if(!V(u))return-1}return r}function Mo(e,n){const t=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];let o=t;if(o+1>=r)return-1;let u=e.src.charCodeAt(o++);if(u<48||u>57)return-1;for(;;){if(o>=r)return-1;if(u=e.src.charCodeAt(o++),u>=48&&u<=57){if(o-t>=10)return-1;continue}if(u===41||u===46)break;return-1}return o<r&&(u=e.src.charCodeAt(o),!V(u))?-1:o}function Zc(e,n){const t=e.level+2;for(let r=n+2,o=e.tokens.length-2;r<o;r++)e.tokens[r].level===t&&e.tokens[r].type==="paragraph_open"&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function Wc(e,n,t,r){let o,u,c,a,l=n,d=!0;if(e.sCount[l]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[l]-e.listIndent>=4&&e.sCount[l]<e.blkIndent)return!1;let f=!1;r&&e.parentType==="paragraph"&&e.sCount[l]>=e.blkIndent&&(f=!0);let s,p,m;if((m=Mo(e,l))>=0){if(s=!0,c=e.bMarks[l]+e.tShift[l],p=Number(e.src.slice(c,m-1)),f&&p!==1)return!1}else if((m=Fo(e,l))>=0)s=!1;else return!1;if(f&&e.skipSpaces(m)>=e.eMarks[l])return!1;if(r)return!0;const b=e.src.charCodeAt(m-1),g=e.tokens.length;s?(a=e.push("ordered_list_open","ol",1),p!==1&&(a.attrs=[["start",p]])):a=e.push("bullet_list_open","ul",1);const k=[l,0];a.map=k,a.markup=String.fromCharCode(b);let x=!1;const v=e.md.block.ruler.getRules("list"),E=e.parentType;for(e.parentType="list";l<t;){u=m,o=e.eMarks[l];const S=e.sCount[l]+m-(e.bMarks[l]+e.tShift[l]);let R=S;for(;u<o;){const pe=e.src.charCodeAt(u);if(pe===9)R+=4-(R+e.bsCount[l])%4;else if(pe===32)R++;else break;u++}const N=u;let $;N>=o?$=1:$=R-S,$>4&&($=1);const U=S+$;a=e.push("list_item_open","li",1),a.markup=String.fromCharCode(b);const K=[l,0];a.map=K,s&&(a.info=e.src.slice(c,m-1));const he=e.tight,Ce=e.tShift[l],Je=e.sCount[l],$e=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=U,e.tight=!0,e.tShift[l]=N-e.bMarks[l],e.sCount[l]=R,N>=o&&e.isEmpty(l+1)?e.line=Math.min(e.line+2,t):e.md.block.tokenize(e,l,t,!0),(!e.tight||x)&&(d=!1),x=e.line-l>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=$e,e.tShift[l]=Ce,e.sCount[l]=Je,e.tight=he,a=e.push("list_item_close","li",-1),a.markup=String.fromCharCode(b),l=e.line,K[1]=l,l>=t||e.sCount[l]<e.blkIndent||e.sCount[l]-e.blkIndent>=4)break;let J=!1;for(let pe=0,O=v.length;pe<O;pe++)if(v[pe](e,l,t,!0)){J=!0;break}if(J)break;if(s){if(m=Mo(e,l),m<0)break;c=e.bMarks[l]+e.tShift[l]}else if(m=Fo(e,l),m<0)break;if(b!==e.src.charCodeAt(m-1))break}return s?a=e.push("ordered_list_close","ol",-1):a=e.push("bullet_list_close","ul",-1),a.markup=String.fromCharCode(b),k[1]=l,e.line=l,e.parentType=E,d&&Zc(e,g),!0}function Yc(e,n,t,r){let o=e.bMarks[n]+e.tShift[n],u=e.eMarks[n],c=n+1;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(o)!==91)return!1;function a(v){const E=e.lineMax;if(v>=E||e.isEmpty(v))return null;let S=!1;if(e.sCount[v]-e.blkIndent>3&&(S=!0),e.sCount[v]<0&&(S=!0),!S){const $=e.md.block.ruler.getRules("reference"),U=e.parentType;e.parentType="reference";let K=!1;for(let he=0,Ce=$.length;he<Ce;he++)if($[he](e,v,E,!0)){K=!0;break}if(e.parentType=U,K)return null}const R=e.bMarks[v]+e.tShift[v],N=e.eMarks[v];return e.src.slice(R,N+1)}let l=e.src.slice(o,u+1);u=l.length;let d=-1;for(o=1;o<u;o++){const v=l.charCodeAt(o);if(v===91)return!1;if(v===93){d=o;break}else if(v===10){const E=a(c);E!==null&&(l+=E,u=l.length,c++)}else if(v===92&&(o++,o<u&&l.charCodeAt(o)===10)){const E=a(c);E!==null&&(l+=E,u=l.length,c++)}}if(d<0||l.charCodeAt(d+1)!==58)return!1;for(o=d+2;o<u;o++){const v=l.charCodeAt(o);if(v===10){const E=a(c);E!==null&&(l+=E,u=l.length,c++)}else if(!V(v))break}const f=e.md.helpers.parseLinkDestination(l,o,u);if(!f.ok)return!1;const s=e.md.normalizeLink(f.str);if(!e.md.validateLink(s))return!1;o=f.pos;const p=o,m=c,b=o;for(;o<u;o++){const v=l.charCodeAt(o);if(v===10){const E=a(c);E!==null&&(l+=E,u=l.length,c++)}else if(!V(v))break}let g=e.md.helpers.parseLinkTitle(l,o,u);for(;g.can_continue;){const v=a(c);if(v===null)break;l+=v,o=u,u=l.length,c++,g=e.md.helpers.parseLinkTitle(l,o,u,g)}let k;for(o<u&&b!==o&&g.ok?(k=g.str,o=g.pos):(k="",o=p,c=m);o<u;){const v=l.charCodeAt(o);if(!V(v))break;o++}if(o<u&&l.charCodeAt(o)!==10&&k)for(k="",o=p,c=m;o<u;){const v=l.charCodeAt(o);if(!V(v))break;o++}if(o<u&&l.charCodeAt(o)!==10)return!1;const x=wt(l.slice(1,d));return x?(r||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[x]>"u"&&(e.env.references[x]={title:k,href:s}),e.line=c),!0):!1}const Jc=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Qc="[a-zA-Z_:][a-zA-Z0-9:._-]*",Xc="[^\"'=<>`\\x00-\\x20]+",el="'[^']*'",nl='"[^"]*"',tl="(?:"+Xc+"|"+el+"|"+nl+")",rl="(?:\\s+"+Qc+"(?:\\s*=\\s*"+tl+")?)",ju="<[A-Za-z][A-Za-z0-9\\-]*"+rl+"*\\s*\\/?>",Uu="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",ol="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",ul="<[?][\\s\\S]*?[?]>",il="<![A-Za-z][^>]*>",al="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",cl=new RegExp("^(?:"+ju+"|"+Uu+"|"+ol+"|"+ul+"|"+il+"|"+al+")"),ll=new RegExp("^(?:"+ju+"|"+Uu+")"),je=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Za-z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Jc.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(ll.source+"\\s*$"),/^$/,!1]];function sl(e,n,t,r){let o=e.bMarks[n]+e.tShift[n],u=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(o)!==60)return!1;let c=e.src.slice(o,u),a=0;for(;a<je.length&&!je[a][0].test(c);a++);if(a===je.length)return!1;if(r)return je[a][2];let l=n+1;const d=je[a][1].test("");if(!je[a][1].test(c)){for(;l<t&&!(e.sCount[l]<e.blkIndent&&(d||!e.isEmpty(l)));l++)if(o=e.bMarks[l]+e.tShift[l],u=e.eMarks[l],c=e.src.slice(o,u),je[a][1].test(c)){c.length!==0&&l++;break}}e.line=l;const f=e.push("html_block","",0);return f.map=[n,l],f.content=e.getLines(n,l,e.blkIndent,!0),!0}function dl(e,n,t,r){let o=e.bMarks[n]+e.tShift[n],u=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let c=e.src.charCodeAt(o);if(c!==35||o>=u)return!1;let a=1;for(c=e.src.charCodeAt(++o);c===35&&o<u&&a<=6;)a++,c=e.src.charCodeAt(++o);if(a>6||o<u&&!V(c))return!1;if(r)return!0;u=e.skipSpacesBack(u,o);const l=e.skipCharsBack(u,35,o);l>o&&V(e.src.charCodeAt(l-1))&&(u=l),e.line=n+1;const d=e.push("heading_open","h"+String(a),1);d.markup="########".slice(0,a),d.map=[n,e.line];const f=e.push("inline","",0);f.content=vt(e.src.slice(o,u)),f.map=[n,e.line],f.children=[];const s=e.push("heading_close","h"+String(a),-1);return s.markup="########".slice(0,a),!0}function fl(e,n,t){const r=e.md.block.ruler.getRules("paragraph");if(e.sCount[n]-e.blkIndent>=4)return!1;const o=e.parentType;e.parentType="paragraph";let u=0,c,a=n+1;for(;a<t&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3)continue;if(e.sCount[a]>=e.blkIndent){let m=e.bMarks[a]+e.tShift[a];const b=e.eMarks[a];if(m<b&&(c=e.src.charCodeAt(m),(c===45||c===61)&&(m=e.skipChars(m,c),m=e.skipSpaces(m),m>=b))){u=c===61?1:2;break}}if(e.sCount[a]<0)continue;let p=!1;for(let m=0,b=r.length;m<b;m++)if(r[m](e,a,t,!0)){p=!0;break}if(p)break}if(!u)return e.parentType=o,!1;const l=vt(e.getLines(n,a,e.blkIndent,!1));e.line=a+1;const d=e.push("heading_open","h"+String(u),1);d.markup=String.fromCharCode(c),d.map=[n,e.line];const f=e.push("inline","",0);f.content=l,f.map=[n,e.line-1],f.children=[];const s=e.push("heading_close","h"+String(u),-1);return s.markup=String.fromCharCode(c),e.parentType=o,!0}function hl(e,n,t){const r=e.md.block.ruler.getRules("paragraph"),o=e.parentType;let u=n+1;for(e.parentType="paragraph";u<t&&!e.isEmpty(u);u++){if(e.sCount[u]-e.blkIndent>3||e.sCount[u]<0)continue;let d=!1;for(let f=0,s=r.length;f<s;f++)if(r[f](e,u,t,!0)){d=!0;break}if(d)break}const c=vt(e.getLines(n,u,e.blkIndent,!1));e.line=u;const a=e.push("paragraph_open","p",1);a.map=[n,e.line];const l=e.push("inline","",0);return l.content=c,l.map=[n,e.line],l.children=[],e.push("paragraph_close","p",-1),e.parentType=o,!0}const rt=[["table",jc,["paragraph","reference"]],["code",Uc],["fence",Gc,["paragraph","reference","blockquote","list"]],["blockquote",Vc,["paragraph","reference","blockquote","list"]],["hr",Kc,["paragraph","reference","blockquote","list"]],["list",Wc,["paragraph","reference","blockquote"]],["reference",Yc],["html_block",sl,["paragraph","reference","blockquote"]],["heading",dl,["paragraph","reference","blockquote"]],["lheading",fl],["paragraph",hl]];function Ct(){this.ruler=new ie;for(let e=0;e<rt.length;e++)this.ruler.push(rt[e][0],rt[e][1],{alt:(rt[e][2]||[]).slice()})}Ct.prototype.tokenize=function(e,n,t){const r=this.ruler.getRules(""),o=r.length,u=e.md.options.maxNesting;let c=n,a=!1;for(;c<t&&(e.line=c=e.skipEmptyLines(c),!(c>=t||e.sCount[c]<e.blkIndent));){if(e.level>=u){e.line=t;break}const l=e.line;let d=!1;for(let f=0;f<o;f++)if(d=r[f](e,c,t,!1),d){if(l>=e.line)throw new Error("block rule didn't increment state.line");break}if(!d)throw new Error("none of the block rules matched");e.tight=!a,e.isEmpty(e.line-1)&&(a=!0),c=e.line,c<t&&e.isEmpty(c)&&(a=!0,c++,e.line=c)}};Ct.prototype.parse=function(e,n,t,r){if(!e)return;const o=new this.State(e,n,t,r);this.tokenize(o,o.line,o.lineMax)};Ct.prototype.State=ve;function qn(e,n,t,r){this.src=e,this.env=t,this.md=n,this.tokens=r,this.tokens_meta=Array(r.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}qn.prototype.pushPending=function(){const e=new ge("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};qn.prototype.push=function(e,n,t){this.pending&&this.pushPending();const r=new ge(e,n,t);let o=null;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],o={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(o),r};qn.prototype.scanDelims=function(e,n){const t=this.posMax,r=this.src.charCodeAt(e);let o;if(e===0)o=32;else if(e===1)o=this.src.charCodeAt(0),(o&63488)===55296&&(o=65533);else if(o=this.src.charCodeAt(e-1),(o&64512)===56320){const k=this.src.charCodeAt(e-2);o=(k&64512)===55296?65536+(k-55296<<10)+(o-56320):65533}else(o&64512)===55296&&(o=65533);let u=e;for(;u<t&&this.src.charCodeAt(u)===r;)u++;const c=u-e;let a=u<t?this.src.charCodeAt(u):32;if((a&64512)===55296){const k=this.src.charCodeAt(u+1);a=(k&64512)===56320?65536+(a-55296<<10)+(k-56320):65533}else(a&64512)===56320&&(a=65533);const l=Ln(o)||Rn(o),d=Ln(a)||Rn(a),f=In(o),s=In(a),p=!s&&(!d||f||l),m=!f&&(!l||s||d);return{can_open:p&&(n||!m||l),can_close:m&&(n||!p||d),length:c}};qn.prototype.Token=ge;function pl(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function ml(e,n){let t=e.pos;for(;t<e.posMax&&!pl(e.src.charCodeAt(t));)t++;return t===e.pos?!1:(n||(e.pending+=e.src.slice(e.pos,t)),e.pos=t,!0)}function bl(e){return e>=65&&e<=90||e>=97&&e<=122}function gl(e){return e>=65&&e<=90||e>=97&&e<=122||e>=48&&e<=57||e===43||e===45||e===46}function kl(e,n){if(!e.md.options.linkify||e.linkLevel>0)return!1;const t=e.pos,r=e.posMax;if(t+3>r||e.src.charCodeAt(t)!==58||e.src.charCodeAt(t+1)!==47||e.src.charCodeAt(t+2)!==47)return!1;const o=t-Math.min(10,e.pending.length,t);let u=t;for(;u>o&&gl(e.src.charCodeAt(u-1));)u--;if(u===t||!bl(e.src.charCodeAt(u)))return!1;const c=t-u,a=e.md.linkify.matchAtStart(e.src.slice(u));if(!a)return!1;let l=a.url;if(l.length<=c)return!1;let d=l.length;for(;d>0&&l.charCodeAt(d-1)===42;)d--;d!==l.length&&(l=l.slice(0,d));const f=e.md.normalizeLink(l);if(!e.md.validateLink(f))return!1;if(!n){e.pending=e.pending.slice(0,-c);const s=e.push("link_open","a",1);s.attrs=[["href",f]],s.markup="linkify",s.info="auto";const p=e.push("text","",0);p.content=e.md.normalizeLinkText(l);const m=e.push("link_close","a",-1);m.markup="linkify",m.info="auto"}return e.pos+=l.length-c,!0}function yl(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==10)return!1;const r=e.pending.length-1,o=e.posMax;if(!n)if(r>=0&&e.pending.charCodeAt(r)===32)if(r>=1&&e.pending.charCodeAt(r-1)===32){let u=r-1;for(;u>=1&&e.pending.charCodeAt(u-1)===32;)u--;e.pending=e.pending.slice(0,u),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(t++;t<o&&V(e.src.charCodeAt(t));)t++;return e.pos=t,!0}const Zr=[];for(let e=0;e<256;e++)Zr.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){Zr[e.charCodeAt(0)]=1});function xl(e,n){let t=e.pos;const r=e.posMax;if(e.src.charCodeAt(t)!==92||(t++,t>=r))return!1;let o=e.src.charCodeAt(t);if(o===10){for(n||e.push("hardbreak","br",0),t++;t<r&&(o=e.src.charCodeAt(t),!!V(o));)t++;return e.pos=t,!0}if(o===32){if(!n){const a=e.push("text_special","",0);a.content="\\",a.markup="\\",a.info="escape"}return e.pos=t,!0}let u=e.src[t];if(o>=55296&&o<=56319&&t+1<r){const a=e.src.charCodeAt(t+1);a>=56320&&a<=57343&&(u+=e.src[t+1],t++)}const c="\\"+u;if(!n){const a=e.push("text_special","",0);o<256&&Zr[o]!==0?a.content=u:a.content=c,a.markup=c,a.info="escape"}return e.pos=t+1,!0}function wl(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==96)return!1;const o=t;t++;const u=e.posMax;for(;t<u&&e.src.charCodeAt(t)===96;)t++;const c=e.src.slice(o,t),a=c.length;if(e.backticksScanned&&(e.backticks[a]||0)<=o)return n||(e.pending+=c),e.pos+=a,!0;let l=t,d;for(;(d=e.src.indexOf("`",l))!==-1;){for(l=d+1;l<u&&e.src.charCodeAt(l)===96;)l++;const f=l-d;if(f===a){if(!n){const s=e.push("code_inline","code",0);s.markup=c,s.content=e.src.slice(t,d).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=l,!0}e.backticks[f]=d}return e.backticksScanned=!0,n||(e.pending+=c),e.pos+=a,!0}function vl(e,n){const t=e.pos,r=e.src.charCodeAt(t);if(n||r!==126)return!1;const o=e.scanDelims(e.pos,!0);let u=o.length;const c=String.fromCharCode(r);if(u<2)return!1;let a;u%2&&(a=e.push("text","",0),a.content=c,u--);for(let l=0;l<u;l+=2)a=e.push("text","",0),a.content=c+c,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:o.can_open,close:o.can_close});return e.pos+=o.length,!0}function Io(e,n){let t;const r=[],o=n.length;for(let u=0;u<o;u++){const c=n[u];if(c.marker!==126||c.end===-1)continue;const a=n[c.end];t=e.tokens[c.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=e.tokens[a.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",e.tokens[a.token-1].type==="text"&&e.tokens[a.token-1].content==="~"&&r.push(a.token-1)}for(;r.length;){const u=r.pop();let c=u+1;for(;c<e.tokens.length&&e.tokens[c].type==="s_close";)c++;c--,u!==c&&(t=e.tokens[c],e.tokens[c]=e.tokens[u],e.tokens[u]=t)}}function Cl(e){const n=e.tokens_meta,t=e.tokens_meta.length;Io(e,e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&Io(e,n[r].delimiters)}const Gu={tokenize:vl,postProcess:Cl};function _l(e,n){const t=e.pos,r=e.src.charCodeAt(t);if(n||r!==95&&r!==42)return!1;const o=e.scanDelims(e.pos,r===42);for(let u=0;u<o.length;u++){const c=e.push("text","",0);c.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:o.length,token:e.tokens.length-1,end:-1,open:o.can_open,close:o.can_close})}return e.pos+=o.length,!0}function Ro(e,n){const t=n.length;for(let r=t-1;r>=0;r--){const o=n[r];if(o.marker!==95&&o.marker!==42||o.end===-1)continue;const u=n[o.end],c=r>0&&n[r-1].end===o.end+1&&n[r-1].marker===o.marker&&n[r-1].token===o.token-1&&n[o.end+1].token===u.token+1,a=String.fromCharCode(o.marker),l=e.tokens[o.token];l.type=c?"strong_open":"em_open",l.tag=c?"strong":"em",l.nesting=1,l.markup=c?a+a:a,l.content="";const d=e.tokens[u.token];d.type=c?"strong_close":"em_close",d.tag=c?"strong":"em",d.nesting=-1,d.markup=c?a+a:a,d.content="",c&&(e.tokens[n[r-1].token].content="",e.tokens[n[o.end+1].token].content="",r--)}}function El(e){const n=e.tokens_meta,t=e.tokens_meta.length;Ro(e,e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&Ro(e,n[r].delimiters)}const Vu={tokenize:_l,postProcess:El};function Al(e,n){let t,r,o,u,c="",a="",l=e.pos,d=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const f=e.pos,s=e.posMax,p=e.pos+1,m=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(m<0)return!1;let b=m+1;if(b<s&&e.src.charCodeAt(b)===40){for(d=!1,b++;b<s&&(t=e.src.charCodeAt(b),!(!V(t)&&t!==10));b++);if(b>=s)return!1;if(l=b,o=e.md.helpers.parseLinkDestination(e.src,b,e.posMax),o.ok){for(c=e.md.normalizeLink(o.str),e.md.validateLink(c)?b=o.pos:c="",l=b;b<s&&(t=e.src.charCodeAt(b),!(!V(t)&&t!==10));b++);if(o=e.md.helpers.parseLinkTitle(e.src,b,e.posMax),b<s&&l!==b&&o.ok)for(a=o.str,b=o.pos;b<s&&(t=e.src.charCodeAt(b),!(!V(t)&&t!==10));b++);}(b>=s||e.src.charCodeAt(b)!==41)&&(d=!0),b++}if(d){if(typeof e.env.references>"u")return!1;if(b<s&&e.src.charCodeAt(b)===91?(l=b+1,b=e.md.helpers.parseLinkLabel(e,b),b>=0?r=e.src.slice(l,b++):b=m+1):b=m+1,r||(r=e.src.slice(p,m)),u=e.env.references[wt(r)],!u)return e.pos=f,!1;c=u.href,a=u.title}if(!n){e.pos=p,e.posMax=m;const g=e.push("link_open","a",1),k=[["href",c]];g.attrs=k,a&&k.push(["title",a]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=b,e.posMax=s,!0}function Sl(e,n){let t,r,o,u,c,a,l,d,f="";const s=e.pos,p=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const m=e.pos+2,b=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(b<0)return!1;if(u=b+1,u<p&&e.src.charCodeAt(u)===40){for(u++;u<p&&(t=e.src.charCodeAt(u),!(!V(t)&&t!==10));u++);if(u>=p)return!1;for(d=u,a=e.md.helpers.parseLinkDestination(e.src,u,e.posMax),a.ok&&(f=e.md.normalizeLink(a.str),e.md.validateLink(f)?u=a.pos:f=""),d=u;u<p&&(t=e.src.charCodeAt(u),!(!V(t)&&t!==10));u++);if(a=e.md.helpers.parseLinkTitle(e.src,u,e.posMax),u<p&&d!==u&&a.ok)for(l=a.str,u=a.pos;u<p&&(t=e.src.charCodeAt(u),!(!V(t)&&t!==10));u++);else l="";if(u>=p||e.src.charCodeAt(u)!==41)return e.pos=s,!1;u++}else{if(typeof e.env.references>"u")return!1;if(u<p&&e.src.charCodeAt(u)===91?(d=u+1,u=e.md.helpers.parseLinkLabel(e,u),u>=0?o=e.src.slice(d,u++):u=b+1):u=b+1,o||(o=e.src.slice(m,b)),c=e.env.references[wt(o)],!c)return e.pos=s,!1;f=c.href,l=c.title}if(!n){r=e.src.slice(m,b);const g=[];e.md.inline.parse(r,e.md,e.env,g);const k=e.push("image","img",0),x=[["src",f],["alt",""]];k.attrs=x,k.children=g,k.content=r,l&&x.push(["title",l])}return e.pos=u,e.posMax=p,!0}const Dl=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Tl=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Fl(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==60)return!1;const r=e.pos,o=e.posMax;for(;;){if(++t>=o)return!1;const c=e.src.charCodeAt(t);if(c===60)return!1;if(c===62)break}const u=e.src.slice(r+1,t);if(Tl.test(u)){const c=e.md.normalizeLink(u);if(!e.md.validateLink(c))return!1;if(!n){const a=e.push("link_open","a",1);a.attrs=[["href",c]],a.markup="autolink",a.info="auto";const l=e.push("text","",0);l.content=e.md.normalizeLinkText(u);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=u.length+2,!0}if(Dl.test(u)){const c=e.md.normalizeLink("mailto:"+u);if(!e.md.validateLink(c))return!1;if(!n){const a=e.push("link_open","a",1);a.attrs=[["href",c]],a.markup="autolink",a.info="auto";const l=e.push("text","",0);l.content=e.md.normalizeLinkText(u);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=u.length+2,!0}return!1}function Ml(e){return/^<a[>\s]/i.test(e)}function Il(e){return/^<\/a\s*>/i.test(e)}function Rl(e){const n=e|32;return n>=97&&n<=122}function Ll(e,n){if(!e.md.options.html)return!1;const t=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=t)return!1;const o=e.src.charCodeAt(r+1);if(o!==33&&o!==63&&o!==47&&!Rl(o))return!1;const u=e.src.slice(r).match(cl);if(!u)return!1;if(!n){const c=e.push("html_inline","",0);c.content=u[0],Ml(c.content)&&e.linkLevel++,Il(c.content)&&e.linkLevel--}return e.pos+=u[0].length,!0}const Nl=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Ol=/^&([a-z][a-z0-9]{1,31});/i;function Bl(e,n){const t=e.pos,r=e.posMax;if(e.src.charCodeAt(t)!==38||t+1>=r)return!1;if(e.src.charCodeAt(t+1)===35){const u=e.src.slice(t).match(Nl);if(u){if(!n){const c=u[1][0].toLowerCase()==="x"?parseInt(u[1].slice(1),16):parseInt(u[1],10),a=e.push("text_special","",0);a.content=Vr(c)?Mn(c):Mn(65533),a.markup=u[0],a.info="entity"}return e.pos+=u[0].length,!0}}else{const u=e.src.slice(t).match(Ol);if(u){const c=ec(u[0]);if(c!==u[0]){if(!n){const a=e.push("text_special","",0);a.content=c,a.markup=u[0],a.info="entity"}return e.pos+=u[0].length,!0}}}return!1}function Lo(e){const n={},t=e.length;if(!t)return;let r=0,o=-2;const u=[];for(let c=0;c<t;c++){const a=e[c];if(u.push(0),(e[r].marker!==a.marker||o!==a.token-1)&&(r=c),o=a.token,a.length=a.length||0,!a.close)continue;n.hasOwnProperty(a.marker)||(n[a.marker]=[-1,-1,-1,-1,-1,-1]);const l=n[a.marker][(a.open?3:0)+a.length%3];let d=r-u[r]-1,f=d;for(;d>l;d-=u[d]+1){const s=e[d];if(s.marker===a.marker&&s.open&&s.end<0){let p=!1;if((s.close||a.open)&&(s.length+a.length)%3===0&&(s.length%3!==0||a.length%3!==0)&&(p=!0),!p){const m=d>0&&!e[d-1].open?u[d-1]+1:0;u[c]=c-d+m,u[d]=m,a.open=!1,s.end=c,s.close=!1,f=-1,o=-2;break}}}f!==-1&&(n[a.marker][(a.open?3:0)+(a.length||0)%3]=f)}}function Pl(e){const n=e.tokens_meta,t=e.tokens_meta.length;Lo(e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&Lo(n[r].delimiters)}function zl(e){let n,t,r=0;const o=e.tokens,u=e.tokens.length;for(n=t=0;n<u;n++)o[n].nesting<0&&r--,o[n].level=r,o[n].nesting>0&&r++,o[n].type==="text"&&n+1<u&&o[n+1].type==="text"?o[n+1].content=o[n].content+o[n+1].content:(n!==t&&(o[t]=o[n]),t++);n!==t&&(o.length=t)}const Ht=[["text",ml],["linkify",kl],["newline",yl],["escape",xl],["backticks",wl],["strikethrough",Gu.tokenize],["emphasis",Vu.tokenize],["link",Al],["image",Sl],["autolink",Fl],["html_inline",Ll],["entity",Bl]],jt=[["balance_pairs",Pl],["strikethrough",Gu.postProcess],["emphasis",Vu.postProcess],["fragments_join",zl]];function $n(){this.ruler=new ie;for(let e=0;e<Ht.length;e++)this.ruler.push(Ht[e][0],Ht[e][1]);this.ruler2=new ie;for(let e=0;e<jt.length;e++)this.ruler2.push(jt[e][0],jt[e][1])}$n.prototype.skipToken=function(e){const n=e.pos,t=this.ruler.getRules(""),r=t.length,o=e.md.options.maxNesting,u=e.cache;if(typeof u[n]<"u"){e.pos=u[n];return}let c=!1;if(e.level<o){for(let a=0;a<r;a++)if(e.level++,c=t[a](e,!0),e.level--,c){if(n>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;c||e.pos++,u[n]=e.pos};$n.prototype.tokenize=function(e){const n=this.ruler.getRules(""),t=n.length,r=e.posMax,o=e.md.options.maxNesting;for(;e.pos<r;){const u=e.pos;let c=!1;if(e.level<o){for(let a=0;a<t;a++)if(c=n[a](e,!1),c){if(u>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(c){if(e.pos>=r)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};$n.prototype.parse=function(e,n,t,r){const o=new this.State(e,n,t,r);this.tokenize(o);const u=this.ruler2.getRules(""),c=u.length;for(let a=0;a<c;a++)u[a](o)};$n.prototype.State=qn;function ql(e){const n={};e=e||{},n.src_Any=Ru.source,n.src_Cc=Lu.source,n.src_Z=Ou.source,n.src_P=Ur.source,n.src_ZPCc=[n.src_Z,n.src_P,n.src_Cc].join("|"),n.src_ZCc=[n.src_Z,n.src_Cc].join("|");const t="[><｜]";return n.src_pseudo_letter=`(?:(?!${t}|${n.src_ZPCc})${n.src_Any})`,n.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",n.src_auth=`(?:(?:(?!${n.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`,n.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",n.src_host_terminator=`(?=$|${t}|${n.src_ZPCc})(?!${e["---"]?"-(?!--)|":"-|"}_|:\\d|\\.-|\\.(?!$|${n.src_ZPCc}))`,n.src_path=`(?:[/?#](?:(?!${n.src_ZCc}|${t}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${n.src_ZCc}|\\]).)*\\]|\\((?:(?!${n.src_ZCc}|[)]).)*\\)|\\{(?:(?!${n.src_ZCc}|[}]).)*\\}|\\"(?:(?!${n.src_ZCc}|["]).)+\\"|\\'(?:(?!${n.src_ZCc}|[']).)+\\'|\\'(?=${n.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${n.src_ZCc}|[.]|$)|`+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+`,(?!${n.src_ZCc}|$)|;(?!${n.src_ZCc}|$)|\\!+(?!${n.src_ZCc}|[!]|$)|\\?(?!${n.src_ZCc}|[?]|$))+|\\/)?`,n.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]{0,63}',n.src_xn="xn--[a-z0-9\\-]{1,59}",n.src_domain_root="(?:"+n.src_xn+`|${n.src_pseudo_letter}{1,63})`,n.src_domain="(?:"+n.src_xn+`|(?:${n.src_pseudo_letter})|(?:${n.src_pseudo_letter}(?:-|${n.src_pseudo_letter}){0,61}${n.src_pseudo_letter}))`,n.src_host=`(?:(?:(?:(?:${n.src_domain})\\.)*${n.src_domain}))`,n.tpl_host_fuzzy="(?:"+n.src_ip4+`|(?:(?:(?:${n.src_domain})\\.)+(?:%TLDS%)))`,n.tpl_host_no_ip_fuzzy=`(?:(?:(?:${n.src_domain})\\.)+(?:%TLDS%))`,n.src_host_strict=n.src_host+n.src_host_terminator,n.tpl_host_fuzzy_strict=n.tpl_host_fuzzy+n.src_host_terminator,n.src_host_port_strict=n.src_host+n.src_port+n.src_host_terminator,n.tpl_host_port_fuzzy_strict=n.tpl_host_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_port_no_ip_fuzzy_strict=n.tpl_host_no_ip_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_fuzzy_test=`localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${n.src_ZPCc}|>|$))`,n.tpl_email_fuzzy=`(^|${t}|"|\\(|${n.src_ZCc})(${n.src_email_name}@${n.tpl_host_fuzzy_strict})`,n.tpl_link_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${n.src_ZPCc}))((?![$+<=>^\`|｜])${n.tpl_host_port_fuzzy_strict}${n.src_path})`,n.tpl_link_no_ip_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${n.src_ZPCc}))((?![$+<=>^\`|｜])${n.tpl_host_port_no_ip_fuzzy_strict}${n.src_path})`,n}function Dr(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(r){e[r]=t[r]})}),e}function _t(e){return Object.prototype.toString.call(e)}function $l(e){return _t(e)==="[object String]"}function Hl(e){return _t(e)==="[object Object]"}function jl(e){return _t(e)==="[object RegExp]"}function No(e){return _t(e)==="[object Function]"}function Ul(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const Ku={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function Gl(e){return Object.keys(e||{}).reduce(function(n,t){return n||Ku.hasOwnProperty(t)},!1)}const Vl={"http:":{validate:function(e,n,t){const r=e.slice(n);return t.re.http||(t.re.http=new RegExp(`^\\/\\/${t.re.src_auth}${t.re.src_host_port_strict}${t.re.src_path}`,"i")),t.re.http.test(r)?r.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,n,t){const r=e.slice(n);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+`(?:localhost|(?:(?:${t.re.src_domain})\\.)+${t.re.src_domain_root})`+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(r)?n>=3&&e[n-3]===":"||n>=3&&e[n-3]==="/"?0:r.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(e,n,t){const r=e.slice(n);return t.re.mailto||(t.re.mailto=new RegExp(`^${t.re.src_email_name}@${t.re.src_host_strict}`,"i")),t.re.mailto.test(r)?r.match(t.re.mailto)[0].length:0}}},Kl="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",Zl="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function Wl(e){return function(n,t){const r=n.slice(t);return e.test(r)?r.match(e)[0].length:0}}function Oo(){return function(e,n){n.normalize(e)}}function dt(e){const n=e.re=ql(e.__opts__),t=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||t.push(Kl),t.push(n.src_xn),n.src_tlds=t.join("|");function r(a){return a.replace("%TLDS%",n.src_tlds)}n.email_fuzzy=RegExp(r(n.tpl_email_fuzzy),"i"),n.email_fuzzy_global=RegExp(r(n.tpl_email_fuzzy),"ig"),n.link_fuzzy=RegExp(r(n.tpl_link_fuzzy),"i"),n.link_fuzzy_global=RegExp(r(n.tpl_link_fuzzy),"ig"),n.link_no_ip_fuzzy=RegExp(r(n.tpl_link_no_ip_fuzzy),"i"),n.link_no_ip_fuzzy_global=RegExp(r(n.tpl_link_no_ip_fuzzy),"ig"),n.host_fuzzy_test=RegExp(r(n.tpl_host_fuzzy_test),"i");const o=[];e.__compiled__={};function u(a,l){throw new Error(`(LinkifyIt) Invalid schema "${a}": ${l}`)}Object.keys(e.__schemas__).forEach(function(a){const l=e.__schemas__[a];if(l===null)return;const d={validate:null,link:null};if(e.__compiled__[a]=d,Hl(l)){jl(l.validate)?d.validate=Wl(l.validate):No(l.validate)?d.validate=l.validate:u(a,l),No(l.normalize)?d.normalize=l.normalize:l.normalize?u(a,l):d.normalize=Oo();return}if($l(l)){o.push(a);return}u(a,l)}),o.forEach(function(a){e.__compiled__[e.__schemas__[a]]&&(e.__compiled__[a].validate=e.__compiled__[e.__schemas__[a]].validate,e.__compiled__[a].normalize=e.__compiled__[e.__schemas__[a]].normalize)}),e.__compiled__[""]={validate:null,normalize:Oo()};const c=Object.keys(e.__compiled__).filter(function(a){return a.length>0&&e.__compiled__[a]}).map(Ul).join("|");e.re.schema_test=RegExp(`(^|(?!_)(?:[><｜]|${n.src_ZPCc}))(${c})`,"i"),e.re.schema_search=RegExp(`(^|(?!_)(?:[><｜]|${n.src_ZPCc}))(${c})`,"ig"),e.re.schema_at_start=RegExp(`^${e.re.schema_search.source}`,"i"),e.re.pretest=RegExp(`(${e.re.schema_test.source})|(${e.re.host_fuzzy_test.source})|@`,"i")}function Zu(e,n,t,r){const o=e.slice(t,r);this.schema=n.toLowerCase(),this.index=t,this.lastIndex=r,this.raw=o,this.text=o,this.url=o}function ce(e,n){if(!(this instanceof ce))return new ce(e,n);n||Gl(e)&&(n=e,e={}),this.__opts__=Dr({},Ku,n),this.__schemas__=Dr({},Vl,e),this.__compiled__={},this.__tlds__=Zl,this.__tlds_replaced__=!1,this.re={},dt(this)}ce.prototype.add=function(n,t){return this.__schemas__[n]=t,dt(this),this};ce.prototype.set=function(n){return this.__opts__=Dr(this.__opts__,n),this};ce.prototype.test=function(n){if(!n.length)return!1;let t,r;if(this.re.schema_test.test(n)){for(r=this.re.schema_search,r.lastIndex=0;(t=r.exec(n))!==null;)if(this.testSchemaAt(n,t[2],r.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&n.search(this.re.host_fuzzy_test)>=0&&n.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&n.indexOf("@")>=0&&n.match(this.re.email_fuzzy)!==null)};ce.prototype.pretest=function(n){return this.re.pretest.test(n)};ce.prototype.testSchemaAt=function(n,t,r){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(n,r,this):0};ce.prototype.match=function(n){const t=[],r=[],o=[],u=[];let c,a,l;function d(p,m){return p?m?p.index!==m.index?p.index<m.index?p:m:p.lastIndex>=m.lastIndex?p:m:p:m}if(!n.length)return null;if(this.re.schema_test.test(n))for(l=this.re.schema_search,l.lastIndex=0;(c=l.exec(n))!==null;)a=this.testSchemaAt(n,c[2],l.lastIndex),a&&r.push({schema:c[2],index:c.index+c[1].length,lastIndex:c.index+c[0].length+a});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(l=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,l.lastIndex=0;(c=l.exec(n))!==null;)o.push({schema:"",index:c.index+c[1].length,lastIndex:c.index+c[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(l=this.re.email_fuzzy_global,l.lastIndex=0;(c=l.exec(n))!==null;)u.push({schema:"mailto:",index:c.index+c[1].length,lastIndex:c.index+c[0].length});const f=[0,0,0];let s=0;for(;;){const p=[r[f[0]],u[f[1]],o[f[2]]],m=d(d(p[0],p[1]),p[2]);if(!m)break;if(m===p[0]?f[0]++:m===p[1]?f[1]++:f[2]++,m.index<s)continue;const b=new Zu(n,m.schema,m.index,m.lastIndex);this.__compiled__[b.schema].normalize(b,this),t.push(b),s=m.lastIndex}return t.length?t:null};ce.prototype.matchAtStart=function(n){if(!n.length)return null;const t=this.re.schema_at_start.exec(n);if(!t)return null;const r=this.testSchemaAt(n,t[2],t[0].length);if(!r)return null;const o=new Zu(n,t[2],t.index+t[1].length,t.index+t[0].length+r);return this.__compiled__[o.schema].normalize(o,this),o};ce.prototype.tlds=function(n,t){return n=Array.isArray(n)?n:[n],t?(this.__tlds__=this.__tlds__.concat(n).sort().filter(function(r,o,u){return r!==u[o-1]}).reverse(),dt(this),this):(this.__tlds__=n.slice(),this.__tlds_replaced__=!0,dt(this),this)};ce.prototype.normalize=function(n){n.schema||(n.url=`http://${n.url}`),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url=`mailto:${n.url}`)};ce.prototype.onCompile=function(){};const cn=2147483647,ye=36,Wr=1,Nn=26,Yl=38,Jl=700,Wu=72,Yu=128,Ju="-",Ql=/^xn--/,Xl=/[^\0-\x7F]/,es=/[\x2E\u3002\uFF0E\uFF61]/g,ns={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Ut=ye-Wr,xe=Math.floor,Gt=String.fromCharCode;function Ne(e){throw new RangeError(ns[e])}function ts(e,n){const t=[];let r=e.length;for(;r--;)t[r]=n(e[r]);return t}function Qu(e,n){const t=e.split("@");let r="";t.length>1&&(r=t[0]+"@",e=t[1]),e=e.replace(es,".");const o=e.split("."),u=ts(o,n).join(".");return r+u}function Xu(e){const n=[];let t=0;const r=e.length;for(;t<r;){const o=e.charCodeAt(t++);if(o>=55296&&o<=56319&&t<r){const u=e.charCodeAt(t++);(u&64512)==56320?n.push(((o&1023)<<10)+(u&1023)+65536):(n.push(o),t--)}else n.push(o)}return n}const rs=e=>String.fromCodePoint(...e),os=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:ye},Bo=function(e,n){return e+22+75*(e<26)-((n!=0)<<5)},ei=function(e,n,t){let r=0;for(e=t?xe(e/Jl):e>>1,e+=xe(e/n);e>Ut*Nn>>1;r+=ye)e=xe(e/Ut);return xe(r+(Ut+1)*e/(e+Yl))},ni=function(e){const n=[],t=e.length;let r=0,o=Yu,u=Wu,c=e.lastIndexOf(Ju);c<0&&(c=0);for(let a=0;a<c;++a)e.charCodeAt(a)>=128&&Ne("not-basic"),n.push(e.charCodeAt(a));for(let a=c>0?c+1:0;a<t;){const l=r;for(let f=1,s=ye;;s+=ye){a>=t&&Ne("invalid-input");const p=os(e.charCodeAt(a++));p>=ye&&Ne("invalid-input"),p>xe((cn-r)/f)&&Ne("overflow"),r+=p*f;const m=s<=u?Wr:s>=u+Nn?Nn:s-u;if(p<m)break;const b=ye-m;f>xe(cn/b)&&Ne("overflow"),f*=b}const d=n.length+1;u=ei(r-l,d,l==0),xe(r/d)>cn-o&&Ne("overflow"),o+=xe(r/d),r%=d,n.splice(r++,0,o)}return String.fromCodePoint(...n)},ti=function(e){const n=[];e=Xu(e);const t=e.length;let r=Yu,o=0,u=Wu;for(const l of e)l<128&&n.push(Gt(l));const c=n.length;let a=c;for(c&&n.push(Ju);a<t;){let l=cn;for(const f of e)f>=r&&f<l&&(l=f);const d=a+1;l-r>xe((cn-o)/d)&&Ne("overflow"),o+=(l-r)*d,r=l;for(const f of e)if(f<r&&++o>cn&&Ne("overflow"),f===r){let s=o;for(let p=ye;;p+=ye){const m=p<=u?Wr:p>=u+Nn?Nn:p-u;if(s<m)break;const b=s-m,g=ye-m;n.push(Gt(Bo(m+b%g,0))),s=xe(b/g)}n.push(Gt(Bo(s,0))),u=ei(o,d,a===c),o=0,++a}++o,++r}return n.join("")},us=function(e){return Qu(e,function(n){return Ql.test(n)?ni(n.slice(4).toLowerCase()):n})},is=function(e){return Qu(e,function(n){return Xl.test(n)?"xn--"+ti(n):n})},ri={version:"2.3.1",ucs2:{decode:Xu,encode:rs},decode:ni,encode:ti,toASCII:is,toUnicode:us},as={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},cs={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},ls={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},ss={default:as,zero:cs,commonmark:ls},ds=/^(vbscript|javascript|file|data):/,fs=/^data:image\/(gif|png|jpeg|webp);/;function hs(e){const n=e.trim().toLowerCase();return ds.test(n)?fs.test(n):!0}const oi=["http:","https:","mailto:"];function ps(e){const n=jr(e,!0);if(n.hostname&&(!n.protocol||oi.indexOf(n.protocol)>=0))try{n.hostname=ri.toASCII(n.hostname)}catch{}return zn(Hr(n))}function ms(e){const n=jr(e,!0);if(n.hostname&&(!n.protocol||oi.indexOf(n.protocol)>=0))try{n.hostname=ri.toUnicode(n.hostname)}catch{}return sn(Hr(n),sn.defaultChars+"%")}function de(e,n){if(!(this instanceof de))return new de(e,n);n||Gr(e)||(n=e||{},e="default"),this.inline=new $n,this.block=new Ct,this.core=new Kr,this.renderer=new bn,this.linkify=new ce,this.validateLink=hs,this.normalizeLink=ps,this.normalizeLinkText=ms,this.utils=gc,this.helpers=xt({},wc),this.options={},this.configure(e),n&&this.set(n)}de.prototype.set=function(e){return xt(this.options,e),this};de.prototype.configure=function(e){const n=this;if(Gr(e)){const t=e;if(e=ss[t],!e)throw new Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(t){e.components[t].rules&&n[t].ruler.enableOnly(e.components[t].rules),e.components[t].rules2&&n[t].ruler2.enableOnly(e.components[t].rules2)}),this};de.prototype.enable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(o){t=t.concat(this[o].ruler.enable(e,!0))},this),t=t.concat(this.inline.ruler2.enable(e,!0));const r=e.filter(function(o){return t.indexOf(o)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+r);return this};de.prototype.disable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(o){t=t.concat(this[o].ruler.disable(e,!0))},this),t=t.concat(this.inline.ruler2.disable(e,!0));const r=e.filter(function(o){return t.indexOf(o)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+r);return this};de.prototype.use=function(e){const n=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,n),this};de.prototype.parse=function(e,n){if(typeof e!="string")throw new Error("Input data should be a String");const t=new this.core.State(e,this,n);return this.core.process(t),t.tokens};de.prototype.render=function(e,n){return n=n||{},this.renderer.render(this.parse(e,n),this.options,n)};de.prototype.parseInline=function(e,n){const t=new this.core.State(e,this,n);return t.inlineMode=!0,this.core.process(t),t.tokens};de.prototype.renderInline=function(e,n){return n=n||{},this.renderer.render(this.parseInline(e,n),this.options,n)};var Po=!1,fn={false:"push",true:"unshift",after:"push",before:"unshift"},ft={isPermalinkSymbol:!0};function Tr(e,n,t,r){var o;if(!Po){var u="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(u):console.warn(u),Po=!0}var c=[Object.assign(new t.Token("link_open","a",1),{attrs:[].concat(n.permalinkClass?[["class",n.permalinkClass]]:[],[["href",n.permalinkHref(e,t)]],Object.entries(n.permalinkAttrs(e,t)))}),Object.assign(new t.Token("html_block","",0),{content:n.permalinkSymbol,meta:ft}),new t.Token("link_close","a",-1)];n.permalinkSpace&&t.tokens[r+1].children[fn[n.permalinkBefore]](Object.assign(new t.Token("text","",0),{content:" "})),(o=t.tokens[r+1].children)[fn[n.permalinkBefore]].apply(o,c)}function ui(e){return"#"+e}function ii(e){return{}}var bs={class:"header-anchor",symbol:"#",renderHref:ui,renderAttrs:ii};function Hn(e){function n(t){return t=Object.assign({},n.defaults,t),function(r,o,u,c){return e(r,t,o,u,c)}}return n.defaults=Object.assign({},bs),n.renderPermalinkImpl=e,n}function Yr(e){var n=[],t=e.filter(function(r){if(r[0]!=="class")return!0;n.push(r[1])});return n.length>0&&t.unshift(["class",n.join(" ")]),t}var Et=Hn(function(e,n,t,r,o){var u,c=[Object.assign(new r.Token("link_open","a",1),{attrs:Yr([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],n.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(n.renderAttrs(e,r))))}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:ft}),new r.Token("link_close","a",-1)];if(n.space){var a=typeof n.space=="string"?n.space:" ";r.tokens[o+1].children[fn[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:a}))}(u=r.tokens[o+1].children)[fn[n.placement]].apply(u,c)});Object.assign(Et.defaults,{space:!0,placement:"after",ariaHidden:!1});var Ge=Hn(Et.renderPermalinkImpl);Ge.defaults=Object.assign({},Et.defaults,{ariaHidden:!0});var ai=Hn(function(e,n,t,r,o){var u=[Object.assign(new r.Token("link_open","a",1),{attrs:Yr([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],Object.entries(n.renderAttrs(e,r))))})].concat(n.safariReaderFix?[new r.Token("span_open","span",1)]:[],r.tokens[o+1].children,n.safariReaderFix?[new r.Token("span_close","span",-1)]:[],[new r.Token("link_close","a",-1)]);r.tokens[o+1].children=u});Object.assign(ai.defaults,{safariReaderFix:!1});var zo=Hn(function(e,n,t,r,o){var u;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(n.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+n.style+"`");if(!["aria-describedby","aria-labelledby"].includes(n.style)&&!n.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+n.style+"` style");if(n.style==="visually-hidden"&&!n.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var c=r.tokens[o+1].children.filter(function(s){return s.type==="text"||s.type==="code_inline"}).reduce(function(s,p){return s+p.content},""),a=[],l=[];if(n.class&&l.push(["class",n.class]),l.push(["href",n.renderHref(e,r)]),l.push.apply(l,Object.entries(n.renderAttrs(e,r))),n.style==="visually-hidden"){if(a.push(Object.assign(new r.Token("span_open","span",1),{attrs:[["class",n.visuallyHiddenClass]]}),Object.assign(new r.Token("text","",0),{content:n.assistiveText(c)}),new r.Token("span_close","span",-1)),n.space){var d=typeof n.space=="string"?n.space:" ";a[fn[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:d}))}a[fn[n.placement]](Object.assign(new r.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:ft}),new r.Token("span_close","span",-1))}else a.push(Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:ft}));n.style==="aria-label"?l.push(["aria-label",n.assistiveText(c)]):["aria-describedby","aria-labelledby"].includes(n.style)&&l.push([n.style,e]);var f=[Object.assign(new r.Token("link_open","a",1),{attrs:Yr(l)})].concat(a,[new r.Token("link_close","a",-1)]);(u=r.tokens).splice.apply(u,[o+3,0].concat(f)),n.wrapper&&(r.tokens.splice(o,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[0]+`
`})),r.tokens.splice(o+3+f.length+1,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[1]+`
`})))});function qo(e,n,t,r){var o=e,u=r;if(t&&Object.prototype.hasOwnProperty.call(n,o))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(n,o);)o=e+"-"+u,u+=1;return n[o]=!0,o}function on(e,n){n=Object.assign({},on.defaults,n),e.core.ruler.push("anchor",function(t){for(var r,o={},u=t.tokens,c=Array.isArray(n.level)?(r=n.level,function(s){return r.includes(s)}):(function(s){return function(p){return p>=s}})(n.level),a=0;a<u.length;a++){var l=u[a];if(l.type==="heading_open"&&c(Number(l.tag.substr(1)))){var d=n.getTokensText(u[a+1].children),f=l.attrGet("id");f=f==null?qo(f=n.slugifyWithState?n.slugifyWithState(d,t):n.slugify(d),o,!1,n.uniqueSlugStartIndex):qo(f,o,!0,n.uniqueSlugStartIndex),l.attrSet("id",f),n.tabIndex!==!1&&l.attrSet("tabindex",""+n.tabIndex),typeof n.permalink=="function"?n.permalink(f,n,t,a):(n.permalink||n.renderPermalink&&n.renderPermalink!==Tr)&&n.renderPermalink(f,n,t,a),a=u.indexOf(l),n.callback&&n.callback(l,{slug:f,title:d})}}})}Object.assign(zo.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),on.permalink={__proto__:null,legacy:Tr,renderHref:ui,renderAttrs:ii,makePermalink:Hn,linkInsideHeader:Et,ariaHidden:Ge,headerLink:ai,linkAfterHeader:zo},on.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(n){return["text","code_inline"].includes(n.type)}).map(function(n){return n.content}).join("")},permalink:!1,renderPermalink:Tr,permalinkClass:Ge.defaults.class,permalinkSpace:Ge.defaults.space,permalinkSymbol:"¶",permalinkBefore:Ge.defaults.placement==="before",permalinkHref:Ge.defaults.renderHref,permalinkAttrs:Ge.defaults.renderAttrs},on.default=on;function At(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Vt,$o;function gs(){if($o)return Vt;$o=1;function e(r,o){var u,c,a=r.attrs[r.attrIndex("href")][1];for(u=0;u<o.length;++u){if(c=o[u],typeof c.matcher=="function"){if(c.matcher(a,c))return c;continue}return c}}function n(r,o,u){Object.keys(u).forEach(function(c){var a,l=u[c];c==="className"&&(c="class"),a=o[r].attrIndex(c),a<0?o[r].attrPush([c,l]):o[r].attrs[a][1]=l})}function t(r,o){o?o=Array.isArray(o)?o:[o]:o=[],Object.freeze(o);var u=r.renderer.rules.link_open||this.defaultRender;r.renderer.rules.link_open=function(c,a,l,d,f){var s=e(c[a],o),p=s&&s.attrs;return p&&n(a,c,p),u(c,a,l,d,f)}}return t.defaultRender=function(r,o,u,c,a){return a.renderToken(r,o,u)},Vt=t,Vt}var ks=gs();const ys=At(ks);function xs(e,n,t,r){const o=Number(e[n].meta.id+1).toString();let u="";return typeof r.docId=="string"&&(u=`-${r.docId}-`),u+o}function ws(e,n){let t=Number(e[n].meta.id+1).toString();return e[n].meta.subId>0&&(t+=`:${e[n].meta.subId}`),`[${t}]`}function vs(e,n,t,r,o){const u=o.rules.footnote_anchor_name(e,n,t,r,o),c=o.rules.footnote_caption(e,n,t,r,o);let a=u;return e[n].meta.subId>0&&(a+=`:${e[n].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${u}" id="fnref${a}">${c}</a></sup>`}function Cs(e,n,t){return(t.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function _s(){return`</ol>
</section>
`}function Es(e,n,t,r,o){let u=o.rules.footnote_anchor_name(e,n,t,r,o);return e[n].meta.subId>0&&(u+=`:${e[n].meta.subId}`),`<li id="fn${u}" class="footnote-item">`}function As(){return`</li>
`}function Ss(e,n,t,r,o){let u=o.rules.footnote_anchor_name(e,n,t,r,o);return e[n].meta.subId>0&&(u+=`:${e[n].meta.subId}`),` <a href="#fnref${u}" class="footnote-backref">↩︎</a>`}function Ds(e){const n=e.helpers.parseLinkLabel,t=e.utils.isSpace;e.renderer.rules.footnote_ref=vs,e.renderer.rules.footnote_block_open=Cs,e.renderer.rules.footnote_block_close=_s,e.renderer.rules.footnote_open=Es,e.renderer.rules.footnote_close=As,e.renderer.rules.footnote_anchor=Ss,e.renderer.rules.footnote_caption=ws,e.renderer.rules.footnote_anchor_name=xs;function r(a,l,d,f){const s=a.bMarks[l]+a.tShift[l],p=a.eMarks[l];if(s+4>p||a.src.charCodeAt(s)!==91||a.src.charCodeAt(s+1)!==94)return!1;let m;for(m=s+2;m<p;m++){if(a.src.charCodeAt(m)===32)return!1;if(a.src.charCodeAt(m)===93)break}if(m===s+2||m+1>=p||a.src.charCodeAt(++m)!==58)return!1;if(f)return!0;m++,a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.refs||(a.env.footnotes.refs={});const b=a.src.slice(s+2,m-2);a.env.footnotes.refs[`:${b}`]=-1;const g=new a.Token("footnote_reference_open","",1);g.meta={label:b},g.level=a.level++,a.tokens.push(g);const k=a.bMarks[l],x=a.tShift[l],v=a.sCount[l],E=a.parentType,S=m,R=a.sCount[l]+m-(a.bMarks[l]+a.tShift[l]);let N=R;for(;m<p;){const U=a.src.charCodeAt(m);if(t(U))U===9?N+=4-N%4:N++;else break;m++}a.tShift[l]=m-S,a.sCount[l]=N-R,a.bMarks[l]=S,a.blkIndent+=4,a.parentType="footnote",a.sCount[l]<a.blkIndent&&(a.sCount[l]+=a.blkIndent),a.md.block.tokenize(a,l,d,!0),a.parentType=E,a.blkIndent-=4,a.tShift[l]=x,a.sCount[l]=v,a.bMarks[l]=k;const $=new a.Token("footnote_reference_close","",-1);return $.level=--a.level,a.tokens.push($),!0}function o(a,l){const d=a.posMax,f=a.pos;if(f+2>=d||a.src.charCodeAt(f)!==94||a.src.charCodeAt(f+1)!==91)return!1;const s=f+2,p=n(a,f+1);if(p<0)return!1;if(!l){a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.list||(a.env.footnotes.list=[]);const m=a.env.footnotes.list.length,b=[];a.md.inline.parse(a.src.slice(s,p),a.md,a.env,b);const g=a.push("footnote_ref","",0);g.meta={id:m},a.env.footnotes.list[m]={content:a.src.slice(s,p),tokens:b}}return a.pos=p+1,a.posMax=d,!0}function u(a,l){const d=a.posMax,f=a.pos;if(f+3>d||!a.env.footnotes||!a.env.footnotes.refs||a.src.charCodeAt(f)!==91||a.src.charCodeAt(f+1)!==94)return!1;let s;for(s=f+2;s<d;s++){if(a.src.charCodeAt(s)===32||a.src.charCodeAt(s)===10)return!1;if(a.src.charCodeAt(s)===93)break}if(s===f+2||s>=d)return!1;s++;const p=a.src.slice(f+2,s-1);if(typeof a.env.footnotes.refs[`:${p}`]>"u")return!1;if(!l){a.env.footnotes.list||(a.env.footnotes.list=[]);let m;a.env.footnotes.refs[`:${p}`]<0?(m=a.env.footnotes.list.length,a.env.footnotes.list[m]={label:p,count:0},a.env.footnotes.refs[`:${p}`]=m):m=a.env.footnotes.refs[`:${p}`];const b=a.env.footnotes.list[m].count;a.env.footnotes.list[m].count++;const g=a.push("footnote_ref","",0);g.meta={id:m,subId:b,label:p}}return a.pos=s,a.posMax=d,!0}function c(a){let l,d,f,s=!1;const p={};if(!a.env.footnotes||(a.tokens=a.tokens.filter(function(b){return b.type==="footnote_reference_open"?(s=!0,d=[],f=b.meta.label,!1):b.type==="footnote_reference_close"?(s=!1,p[":"+f]=d,!1):(s&&d.push(b),!s)}),!a.env.footnotes.list))return;const m=a.env.footnotes.list;a.tokens.push(new a.Token("footnote_block_open","",1));for(let b=0,g=m.length;b<g;b++){const k=new a.Token("footnote_open","",1);if(k.meta={id:b,label:m[b].label},a.tokens.push(k),m[b].tokens){l=[];const E=new a.Token("paragraph_open","p",1);E.block=!0,l.push(E);const S=new a.Token("inline","",0);S.children=m[b].tokens,S.content=m[b].content,l.push(S);const R=new a.Token("paragraph_close","p",-1);R.block=!0,l.push(R)}else m[b].label&&(l=p[`:${m[b].label}`]);l&&(a.tokens=a.tokens.concat(l));let x;a.tokens[a.tokens.length-1].type==="paragraph_close"?x=a.tokens.pop():x=null;const v=m[b].count>0?m[b].count:1;for(let E=0;E<v;E++){const S=new a.Token("footnote_anchor","",0);S.meta={id:b,subId:E,label:m[b].label},a.tokens.push(S)}x&&a.tokens.push(x),a.tokens.push(new a.Token("footnote_close","",-1))}a.tokens.push(new a.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",r,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",o),e.inline.ruler.after("footnote_inline","footnote_ref",u),e.core.ruler.after("inline","footnote_tail",c)}var Kt,Ho;function Ts(){if(Ho)return Kt;Ho=1;var e=!0,n=!1,t=!1;Kt=function(g,k){k&&(e=!k.enabled,n=!!k.label,t=!!k.labelAfter),g.core.ruler.after("inline","github-task-lists",function(x){for(var v=x.tokens,E=2;E<v.length;E++)u(v,E)&&(c(v[E],x.Token),r(v[E-2],"class","task-list-item"+(e?"":" enabled")),r(v[o(v,E-2)],"class","contains-task-list"))})};function r(g,k,x){var v=g.attrIndex(k),E=[k,x];v<0?g.attrPush(E):g.attrs[v]=E}function o(g,k){for(var x=g[k].level-1,v=k-1;v>=0;v--)if(g[v].level===x)return v;return-1}function u(g,k){return s(g[k])&&p(g[k-1])&&m(g[k-2])&&b(g[k])}function c(g,k){if(g.children.unshift(a(g,k)),g.children[1].content=g.children[1].content.slice(3),g.content=g.content.slice(3),n)if(t){g.children.pop();var x="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);g.children[0].content=g.children[0].content.slice(0,-1)+' id="'+x+'">',g.children.push(f(g.content,x,k))}else g.children.unshift(l(k)),g.children.push(d(k))}function a(g,k){var x=new k("html_inline","",0),v=e?' disabled="" ':"";return g.content.indexOf("[ ] ")===0?x.content='<input class="task-list-item-checkbox"'+v+'type="checkbox">':(g.content.indexOf("[x] ")===0||g.content.indexOf("[X] ")===0)&&(x.content='<input class="task-list-item-checkbox" checked=""'+v+'type="checkbox">'),x}function l(g){var k=new g("html_inline","",0);return k.content="<label>",k}function d(g){var k=new g("html_inline","",0);return k.content="</label>",k}function f(g,k,x){var v=new x("html_inline","",0);return v.content='<label class="task-list-item-label" for="'+k+'">'+g+"</label>",v.attrs=[{for:k}],v}function s(g){return g.type==="inline"}function p(g){return g.type==="paragraph_open"}function m(g){return g.type==="list_item_open"}function b(g){return g.content.indexOf("[ ] ")===0||g.content.indexOf("[x] ")===0||g.content.indexOf("[X] ")===0}return Kt}var Fs=Ts();const Ms=At(Fs),Is={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},Rs=(e,n={})=>{const{markers:t=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:r=Is,matchCaseSensitive:o=!1,titles:u={},classPrefix:c="markdown-alert"}=n,a=t==="*"?"\\w+":t.join("|"),l=new RegExp(`^\\\\?\\[\\!(${a})\\]([^\\n\\r]*)`,o?"":"i");e.core.ruler.after("block","github-alerts",d=>{const f=d.tokens;for(let s=0;s<f.length;s++)if(f[s].type==="blockquote_open"){const p=f[s],m=s;for(;f[s]?.type!=="blockquote_close"&&s<=f.length;)s+=1;const b=f[s],g=s,k=f.slice(m,g+1).find(R=>R.type==="inline");if(!k)continue;const x=k.content.match(l);if(!x)continue;const v=x[1].toLowerCase(),E=x[2].trim()||(u[v]??Ls(v)),S=r[v]??"";k.content=k.content.slice(x[0].length).trimStart(),p.type="alert_open",p.tag="div",p.meta={title:E,type:v,icon:S},b.type="alert_close",b.tag="div"}}),e.renderer.rules.alert_open=function(d,f){const{title:s,type:p,icon:m}=d[f].meta;return`<div class="${c} ${c}-${p}"><p class="${c}-title">${m}${s}</p>`}};function Ls(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Ns(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var te={},ot={},Re={},jo;function jn(){if(jo)return Re;jo=1;function e(c){return typeof c>"u"||c===null}function n(c){return typeof c=="object"&&c!==null}function t(c){return Array.isArray(c)?c:e(c)?[]:[c]}function r(c,a){if(a){const l=Object.keys(a);for(let d=0,f=l.length;d<f;d+=1){const s=l[d];c[s]=a[s]}}return c}function o(c,a){let l="";for(let d=0;d<a;d+=1)l+=c;return l}function u(c){return c===0&&Number.NEGATIVE_INFINITY===1/c}return Re.isNothing=e,Re.isObject=n,Re.toArray=t,Re.repeat=o,Re.isNegativeZero=u,Re.extend=r,Re}var Zt,Uo;function Un(){if(Uo)return Zt;Uo=1;function e(t,r){let o="";const u=t.reason||"(unknown reason)";return t.mark?(t.mark.name&&(o+='in "'+t.mark.name+'" '),o+="("+(t.mark.line+1)+":"+(t.mark.column+1)+")",!r&&t.mark.snippet&&(o+=`

`+t.mark.snippet),u+" "+o):u}function n(t,r){Error.call(this),this.name="YAMLException",this.reason=t,this.mark=r,this.message=e(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n.prototype.toString=function(r){return this.name+": "+e(this,r)},Zt=n,Zt}var Wt,Go;function Os(){if(Go)return Wt;Go=1;const e=jn();function n(o,u,c,a,l){let d="",f="";const s=Math.floor(l/2)-1;return a-u>s&&(d=" ... ",u=a-s+d.length),c-a>s&&(f=" ...",c=a+s-f.length),{str:d+o.slice(u,c).replace(/\t/g,"→")+f,pos:a-u+d.length}}function t(o,u){return e.repeat(" ",u-o.length)+o}function r(o,u){if(u=Object.create(u||null),!o.buffer)return null;u.maxLength||(u.maxLength=79),typeof u.indent!="number"&&(u.indent=1),typeof u.linesBefore!="number"&&(u.linesBefore=3),typeof u.linesAfter!="number"&&(u.linesAfter=2);const c=/\r?\n|\r|\0/g,a=[0],l=[];let d,f=-1;for(;d=c.exec(o.buffer);)l.push(d.index),a.push(d.index+d[0].length),o.position<=d.index&&f<0&&(f=a.length-2);f<0&&(f=a.length-1);let s="";const p=Math.min(o.line+u.linesAfter,l.length).toString().length,m=u.maxLength-(u.indent+p+3);for(let g=1;g<=u.linesBefore&&!(f-g<0);g++){const k=n(o.buffer,a[f-g],l[f-g],o.position-(a[f]-a[f-g]),m);s=e.repeat(" ",u.indent)+t((o.line-g+1).toString(),p)+" | "+k.str+`
`+s}const b=n(o.buffer,a[f],l[f],o.position,m);s+=e.repeat(" ",u.indent)+t((o.line+1).toString(),p)+" | "+b.str+`
`,s+=e.repeat("-",u.indent+p+3+b.pos)+`^
`;for(let g=1;g<=u.linesAfter&&!(f+g>=l.length);g++){const k=n(o.buffer,a[f+g],l[f+g],o.position-(a[f]-a[f+g]),m);s+=e.repeat(" ",u.indent)+t((o.line+g+1).toString(),p)+" | "+k.str+`
`}return s.replace(/\n$/,"")}return Wt=r,Wt}var Yt,Vo;function ue(){if(Vo)return Yt;Vo=1;const e=Un(),n=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],t=["scalar","sequence","mapping"];function r(u){const c={};return u!==null&&Object.keys(u).forEach(function(a){u[a].forEach(function(l){c[String(l)]=a})}),c}function o(u,c){if(c=c||{},Object.keys(c).forEach(function(a){if(n.indexOf(a)===-1)throw new e('Unknown option "'+a+'" is met in definition of "'+u+'" YAML type.')}),this.options=c,this.tag=u,this.kind=c.kind||null,this.resolve=c.resolve||function(){return!0},this.construct=c.construct||function(a){return a},this.instanceOf=c.instanceOf||null,this.predicate=c.predicate||null,this.represent=c.represent||null,this.representName=c.representName||null,this.defaultStyle=c.defaultStyle||null,this.multi=c.multi||!1,this.styleAliases=r(c.styleAliases||null),t.indexOf(this.kind)===-1)throw new e('Unknown kind "'+this.kind+'" is specified for "'+u+'" YAML type.')}return Yt=o,Yt}var Jt,Ko;function ci(){if(Ko)return Jt;Ko=1;const e=Un(),n=ue();function t(u,c){const a=[];return u[c].forEach(function(l){let d=a.length;a.forEach(function(f,s){f.tag===l.tag&&f.kind===l.kind&&f.multi===l.multi&&(d=s)}),a[d]=l}),a}function r(){const u={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function c(a){a.multi?(u.multi[a.kind].push(a),u.multi.fallback.push(a)):u[a.kind][a.tag]=u.fallback[a.tag]=a}for(let a=0,l=arguments.length;a<l;a+=1)arguments[a].forEach(c);return u}function o(u){return this.extend(u)}return o.prototype.extend=function(c){let a=[],l=[];if(c instanceof n)l.push(c);else if(Array.isArray(c))l=l.concat(c);else if(c&&(Array.isArray(c.implicit)||Array.isArray(c.explicit)))c.implicit&&(a=a.concat(c.implicit)),c.explicit&&(l=l.concat(c.explicit));else throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");a.forEach(function(f){if(!(f instanceof n))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(f.loadKind&&f.loadKind!=="scalar")throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(f.multi)throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),l.forEach(function(f){if(!(f instanceof n))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const d=Object.create(o.prototype);return d.implicit=(this.implicit||[]).concat(a),d.explicit=(this.explicit||[]).concat(l),d.compiledImplicit=t(d,"implicit"),d.compiledExplicit=t(d,"explicit"),d.compiledTypeMap=r(d.compiledImplicit,d.compiledExplicit),d},Jt=o,Jt}var Qt,Zo;function li(){if(Zo)return Qt;Zo=1;const e=ue();return Qt=new e("tag:yaml.org,2002:str",{kind:"scalar",construct:function(n){return n!==null?n:""}}),Qt}var Xt,Wo;function si(){if(Wo)return Xt;Wo=1;const e=ue();return Xt=new e("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(n){return n!==null?n:[]}}),Xt}var er,Yo;function di(){if(Yo)return er;Yo=1;const e=ue();return er=new e("tag:yaml.org,2002:map",{kind:"mapping",construct:function(n){return n!==null?n:{}}}),er}var nr,Jo;function fi(){if(Jo)return nr;Jo=1;const e=ci();return nr=new e({explicit:[li(),si(),di()]}),nr}var tr,Qo;function hi(){if(Qo)return tr;Qo=1;const e=ue();function n(o){if(o===null)return!0;const u=o.length;return u===1&&o==="~"||u===4&&(o==="null"||o==="Null"||o==="NULL")}function t(){return null}function r(o){return o===null}return tr=new e("tag:yaml.org,2002:null",{kind:"scalar",resolve:n,construct:t,predicate:r,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"}),tr}var rr,Xo;function pi(){if(Xo)return rr;Xo=1;const e=ue();function n(o){if(o===null)return!1;const u=o.length;return u===4&&(o==="true"||o==="True"||o==="TRUE")||u===5&&(o==="false"||o==="False"||o==="FALSE")}function t(o){return o==="true"||o==="True"||o==="TRUE"}function r(o){return Object.prototype.toString.call(o)==="[object Boolean]"}return rr=new e("tag:yaml.org,2002:bool",{kind:"scalar",resolve:n,construct:t,predicate:r,represent:{lowercase:function(o){return o?"true":"false"},uppercase:function(o){return o?"TRUE":"FALSE"},camelcase:function(o){return o?"True":"False"}},defaultStyle:"lowercase"}),rr}var or,eu;function mi(){if(eu)return or;eu=1;const e=jn(),n=ue();function t(d){return d>=48&&d<=57||d>=65&&d<=70||d>=97&&d<=102}function r(d){return d>=48&&d<=55}function o(d){return d>=48&&d<=57}function u(d){if(d===null)return!1;const f=d.length;let s=0,p=!1;if(!f)return!1;let m=d[s];if((m==="-"||m==="+")&&(m=d[++s]),m==="0"){if(s+1===f)return!0;if(m=d[++s],m==="b"){for(s++;s<f;s++){if(m=d[s],m!=="0"&&m!=="1")return!1;p=!0}return p&&isFinite(c(d))}if(m==="x"){for(s++;s<f;s++){if(!t(d.charCodeAt(s)))return!1;p=!0}return p&&isFinite(c(d))}if(m==="o"){for(s++;s<f;s++){if(!r(d.charCodeAt(s)))return!1;p=!0}return p&&isFinite(c(d))}}for(;s<f;s++){if(!o(d.charCodeAt(s)))return!1;p=!0}return p?isFinite(c(d)):!1}function c(d){let f=d,s=1,p=f[0];if((p==="-"||p==="+")&&(p==="-"&&(s=-1),f=f.slice(1),p=f[0]),f==="0")return 0;if(p==="0"){if(f[1]==="b")return s*parseInt(f.slice(2),2);if(f[1]==="x")return s*parseInt(f.slice(2),16);if(f[1]==="o")return s*parseInt(f.slice(2),8)}return s*parseInt(f,10)}function a(d){return c(d)}function l(d){return Object.prototype.toString.call(d)==="[object Number]"&&d%1===0&&!e.isNegativeZero(d)}return or=new n("tag:yaml.org,2002:int",{kind:"scalar",resolve:u,construct:a,predicate:l,represent:{binary:function(d){return d>=0?"0b"+d.toString(2):"-0b"+d.toString(2).slice(1)},octal:function(d){return d>=0?"0o"+d.toString(8):"-0o"+d.toString(8).slice(1)},decimal:function(d){return d.toString(10)},hexadecimal:function(d){return d>=0?"0x"+d.toString(16).toUpperCase():"-0x"+d.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),or}var ur,nu;function bi(){if(nu)return ur;nu=1;const e=jn(),n=ue(),t=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),r=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function o(d){return d===null||!t.test(d)?!1:isFinite(parseFloat(d,10))?!0:r.test(d)}function u(d){let f=d.toLowerCase();const s=f[0]==="-"?-1:1;return"+-".indexOf(f[0])>=0&&(f=f.slice(1)),f===".inf"?s===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:f===".nan"?NaN:s*parseFloat(f,10)}const c=/^[-+]?[0-9]+e/;function a(d,f){if(isNaN(d))switch(f){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===d)switch(f){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===d)switch(f){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(e.isNegativeZero(d))return"-0.0";const s=d.toString(10);return c.test(s)?s.replace("e",".e"):s}function l(d){return Object.prototype.toString.call(d)==="[object Number]"&&(d%1!==0||e.isNegativeZero(d))}return ur=new n("tag:yaml.org,2002:float",{kind:"scalar",resolve:o,construct:u,predicate:l,represent:a,defaultStyle:"lowercase"}),ur}var ir,tu;function gi(){return tu||(tu=1,ir=fi().extend({implicit:[hi(),pi(),mi(),bi()]})),ir}var ar,ru;function ki(){return ru||(ru=1,ar=gi()),ar}var cr,ou;function yi(){if(ou)return cr;ou=1;const e=ue(),n=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),t=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function r(c){return c===null?!1:n.exec(c)!==null||t.exec(c)!==null}function o(c){let a=0,l=null,d=n.exec(c);if(d===null&&(d=t.exec(c)),d===null)throw new Error("Date resolve error");const f=+d[1],s=+d[2]-1,p=+d[3];if(!d[4])return new Date(Date.UTC(f,s,p));const m=+d[4],b=+d[5],g=+d[6];if(d[7]){for(a=d[7].slice(0,3);a.length<3;)a+="0";a=+a}if(d[9]){const x=+d[10],v=+(d[11]||0);l=(x*60+v)*6e4,d[9]==="-"&&(l=-l)}const k=new Date(Date.UTC(f,s,p,m,b,g,a));return l&&k.setTime(k.getTime()-l),k}function u(c){return c.toISOString()}return cr=new e("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:r,construct:o,instanceOf:Date,represent:u}),cr}var lr,uu;function xi(){if(uu)return lr;uu=1;const e=ue();function n(t){return t==="<<"||t===null}return lr=new e("tag:yaml.org,2002:merge",{kind:"scalar",resolve:n}),lr}var sr,iu;function wi(){if(iu)return sr;iu=1;const e=ue(),n=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function t(c){if(c===null)return!1;let a=0;const l=c.length,d=n;for(let f=0;f<l;f++){const s=d.indexOf(c.charAt(f));if(!(s>64)){if(s<0)return!1;a+=6}}return a%8===0}function r(c){const a=c.replace(/[\r\n=]/g,""),l=a.length,d=n;let f=0;const s=[];for(let m=0;m<l;m++)m%4===0&&m&&(s.push(f>>16&255),s.push(f>>8&255),s.push(f&255)),f=f<<6|d.indexOf(a.charAt(m));const p=l%4*6;return p===0?(s.push(f>>16&255),s.push(f>>8&255),s.push(f&255)):p===18?(s.push(f>>10&255),s.push(f>>2&255)):p===12&&s.push(f>>4&255),new Uint8Array(s)}function o(c){let a="",l=0;const d=c.length,f=n;for(let p=0;p<d;p++)p%3===0&&p&&(a+=f[l>>18&63],a+=f[l>>12&63],a+=f[l>>6&63],a+=f[l&63]),l=(l<<8)+c[p];const s=d%3;return s===0?(a+=f[l>>18&63],a+=f[l>>12&63],a+=f[l>>6&63],a+=f[l&63]):s===2?(a+=f[l>>10&63],a+=f[l>>4&63],a+=f[l<<2&63],a+=f[64]):s===1&&(a+=f[l>>2&63],a+=f[l<<4&63],a+=f[64],a+=f[64]),a}function u(c){return Object.prototype.toString.call(c)==="[object Uint8Array]"}return sr=new e("tag:yaml.org,2002:binary",{kind:"scalar",resolve:t,construct:r,predicate:u,represent:o}),sr}var dr,au;function vi(){if(au)return dr;au=1;const e=ue(),n=Object.prototype.hasOwnProperty,t=Object.prototype.toString;function r(u){if(u===null)return!0;const c={},a=u;for(let l=0,d=a.length;l<d;l+=1){const f=a[l];let s=!1;if(t.call(f)!=="[object Object]")return!1;let p;for(p in f)if(n.call(f,p))if(!s)s=!0;else return!1;if(!s||n.call(c,p))return!1;Object.defineProperty(c,p,{value:!0})}return!0}function o(u){return u!==null?u:[]}return dr=new e("tag:yaml.org,2002:omap",{kind:"sequence",resolve:r,construct:o}),dr}var fr,cu;function Ci(){if(cu)return fr;cu=1;const e=ue(),n=Object.prototype.toString;function t(o){if(o===null)return!0;const u=o,c=new Array(u.length);for(let a=0,l=u.length;a<l;a+=1){const d=u[a];if(n.call(d)!=="[object Object]")return!1;const f=Object.keys(d);if(f.length!==1)return!1;c[a]=[f[0],d[f[0]]]}return!0}function r(o){if(o===null)return[];const u=o,c=new Array(u.length);for(let a=0,l=u.length;a<l;a+=1){const d=u[a],f=Object.keys(d);c[a]=[f[0],d[f[0]]]}return c}return fr=new e("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:t,construct:r}),fr}var hr,lu;function _i(){if(lu)return hr;lu=1;const e=ue(),n=Object.prototype.hasOwnProperty;function t(o){if(o===null)return!0;const u=o;for(const c in u)if(n.call(u,c)&&u[c]!==null)return!1;return!0}function r(o){return o!==null?o:{}}return hr=new e("tag:yaml.org,2002:set",{kind:"mapping",resolve:t,construct:r}),hr}var pr,su;function Jr(){return su||(su=1,pr=ki().extend({implicit:[yi(),xi()],explicit:[wi(),vi(),Ci(),_i()]})),pr}var du;function Bs(){if(du)return ot;du=1;const e=jn(),n=Un(),t=Os(),r=Jr(),o=Object.prototype.hasOwnProperty,u=1,c=2,a=3,l=4,d=1,f=2,s=3,p=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,m=/[\x85\u2028\u2029]/,b=/[,\[\]{}]/,g=/^(?:!|!!|![0-9A-Za-z-]+!)$/,k=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function x(i){return Object.prototype.toString.call(i)}function v(i){return i===10||i===13}function E(i){return i===9||i===32}function S(i){return i===9||i===32||i===10||i===13}function R(i){return i===44||i===91||i===93||i===123||i===125}function N(i){if(i>=48&&i<=57)return i-48;const y=i|32;return y>=97&&y<=102?y-97+10:-1}function $(i){return i===120?2:i===117?4:i===85?8:0}function U(i){return i>=48&&i<=57?i-48:-1}function K(i){switch(i){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function he(i){return i<=65535?String.fromCharCode(i):String.fromCharCode((i-65536>>10)+55296,(i-65536&1023)+56320)}function Ce(i,y,D){y==="__proto__"?Object.defineProperty(i,y,{configurable:!0,enumerable:!0,writable:!0,value:D}):i[y]=D}const Je=new Array(256),$e=new Array(256);for(let i=0;i<256;i++)Je[i]=K(i)?1:0,$e[i]=K(i);function J(i,y){this.input=i,this.filename=y.filename||null,this.schema=y.schema||r,this.onWarning=y.onWarning||null,this.legacy=y.legacy||!1,this.json=y.json||!1,this.listener=y.listener||null,this.maxDepth=typeof y.maxDepth=="number"?y.maxDepth:100,this.maxTotalMergeKeys=typeof y.maxTotalMergeKeys=="number"?y.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=i.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.totalMergeKeys=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function pe(i,y){const D={name:i.filename,buffer:i.input.slice(0,-1),position:i.position,line:i.line,column:i.position-i.lineStart};return D.snippet=t(D),new n(y,D)}function O(i,y){throw pe(i,y)}function Qe(i,y){i.onWarning&&i.onWarning.call(null,pe(i,y))}function _e(i,y,D){const T=i.anchorMapTransactions;if(T.length!==0){const _=T[T.length-1];o.call(_,y)||(_[y]={existed:o.call(i.anchorMap,y),value:i.anchorMap[y]})}i.anchorMap[y]=D}function It(i){i.anchorMapTransactions.push(Object.create(null))}function He(i){const y=i.anchorMapTransactions.pop(),D=i.anchorMapTransactions;if(D.length===0)return;const T=D[D.length-1],_=Object.keys(y);for(let h=0,w=_.length;h<w;h+=1){const C=_[h];o.call(T,C)||(T[C]=y[C])}}function Rt(i){const y=i.anchorMapTransactions.pop(),D=Object.keys(y);for(let T=D.length-1;T>=0;T-=1){const _=y[D[T]];_.existed?i.anchorMap[D[T]]=_.value:delete i.anchorMap[D[T]]}}function kn(i){return{position:i.position,line:i.line,lineStart:i.lineStart,lineIndent:i.lineIndent,firstTabInLine:i.firstTabInLine,tag:i.tag,anchor:i.anchor,kind:i.kind,result:i.result}}function Xe(i,y){i.position=y.position,i.line=y.line,i.lineStart=y.lineStart,i.lineIndent=y.lineIndent,i.firstTabInLine=y.firstTabInLine,i.tag=y.tag,i.anchor=y.anchor,i.kind=y.kind,i.result=y.result}const Kn={YAML:function(y,D,T){y.version!==null&&O(y,"duplication of %YAML directive"),T.length!==1&&O(y,"YAML directive accepts exactly one argument");const _=/^([0-9]+)\.([0-9]+)$/.exec(T[0]);_===null&&O(y,"ill-formed argument of the YAML directive");const h=parseInt(_[1],10),w=parseInt(_[2],10);h!==1&&O(y,"unacceptable YAML version of the document"),y.version=T[0],y.checkLineBreaks=w<2,w!==1&&w!==2&&Qe(y,"unsupported YAML version of the document")},TAG:function(y,D,T){let _;T.length!==2&&O(y,"TAG directive accepts exactly two arguments");const h=T[0];_=T[1],g.test(h)||O(y,"ill-formed tag handle (first argument) of the TAG directive"),o.call(y.tagMap,h)&&O(y,'there is a previously declared suffix for "'+h+'" tag handle'),k.test(_)||O(y,"ill-formed tag prefix (second argument) of the TAG directive");try{_=decodeURIComponent(_)}catch{O(y,"tag prefix is malformed: "+_)}y.tagMap[h]=_}};function ae(i,y,D,T){if(y<D){const _=i.input.slice(y,D);if(T)for(let h=0,w=_.length;h<w;h+=1){const C=_.charCodeAt(h);C===9||C>=32&&C<=1114111||O(i,"expected valid JSON character")}else p.test(_)&&O(i,"the stream contains non-printable characters");i.result+=_}}function Te(i){i.totalMergeKeys++,i.maxTotalMergeKeys!==-1&&i.totalMergeKeys>i.maxTotalMergeKeys&&O(i,"merge keys exceeded maxTotalMergeKeys ("+i.maxTotalMergeKeys+")")}function yn(i,y,D,T){e.isObject(D)||O(i,"cannot merge mappings; the provided source object is unacceptable"),Te(i);const _=Object.keys(D);for(let h=0,w=_.length;h<w;h+=1){const C=_[h];Te(i),o.call(y,C)||(Ce(y,C,D[C]),T[C]=!0)}}function Ee(i,y,D,T,_,h,w,C,F){if(Array.isArray(_)){_=Array.prototype.slice.call(_);for(let M=0,I=_.length;M<I;M+=1)Array.isArray(_[M])&&O(i,"nested arrays are not supported inside keys"),typeof _=="object"&&x(_[M])==="[object Object]"&&(_[M]="[object Object]")}if(typeof _=="object"&&x(_)==="[object Object]"&&(_="[object Object]"),_=String(_),y===null&&(y={}),T==="tag:yaml.org,2002:merge")if(Array.isArray(h)){h.length>100&&O(i,"abnormal merge sequence size");for(let M=0,I=h.length;M<I;M+=1)yn(i,y,h[M],D)}else yn(i,y,h,D);else!i.json&&!o.call(D,_)&&o.call(y,_)&&(i.line=w||i.line,i.lineStart=C||i.lineStart,i.position=F||i.position,O(i,"duplicated mapping key")),Ce(y,_,h),delete D[_];return y}function xn(i){const y=i.input.charCodeAt(i.position);y===10?i.position++:y===13?(i.position++,i.input.charCodeAt(i.position)===10&&i.position++):O(i,"a line break is expected"),i.line+=1,i.lineStart=i.position,i.firstTabInLine=-1}function W(i,y,D){let T=0,_=i.input.charCodeAt(i.position);for(;_!==0;){for(;E(_);)_===9&&i.firstTabInLine===-1&&(i.firstTabInLine=i.position),_=i.input.charCodeAt(++i.position);if(y&&_===35)do _=i.input.charCodeAt(++i.position);while(_!==10&&_!==13&&_!==0);if(v(_))for(xn(i),_=i.input.charCodeAt(i.position),T++,i.lineIndent=0;_===32;)i.lineIndent++,_=i.input.charCodeAt(++i.position);else break}return D!==-1&&T!==0&&i.lineIndent<D&&Qe(i,"deficient indentation"),T}function ke(i){let y=i.position,D=i.input.charCodeAt(y);return!!((D===45||D===46)&&D===i.input.charCodeAt(y+1)&&D===i.input.charCodeAt(y+2)&&(y+=3,D=i.input.charCodeAt(y),D===0||S(D)))}function en(i,y){y===1?i.result+=" ":y>1&&(i.result+=e.repeat(`
`,y-1))}function Zn(i,y,D){let T,_,h,w,C,F;const M=i.kind,I=i.result;let A=i.input.charCodeAt(i.position);if(S(A)||R(A)||A===35||A===38||A===42||A===33||A===124||A===62||A===39||A===34||A===37||A===64||A===96)return!1;if(A===63||A===45){const L=i.input.charCodeAt(i.position+1);if(S(L)||D&&R(L))return!1}for(i.kind="scalar",i.result="",T=_=i.position,h=!1;A!==0;){if(A===58){const L=i.input.charCodeAt(i.position+1);if(S(L)||D&&R(L))break}else if(A===35){const L=i.input.charCodeAt(i.position-1);if(S(L))break}else{if(i.position===i.lineStart&&ke(i)||D&&R(A))break;if(v(A))if(w=i.line,C=i.lineStart,F=i.lineIndent,W(i,!1,-1),i.lineIndent>=y){h=!0,A=i.input.charCodeAt(i.position);continue}else{i.position=_,i.line=w,i.lineStart=C,i.lineIndent=F;break}}h&&(ae(i,T,_,!1),en(i,i.line-w),T=_=i.position,h=!1),E(A)||(_=i.position+1),A=i.input.charCodeAt(++i.position)}return ae(i,T,_,!1),i.result?!0:(i.kind=M,i.result=I,!1)}function wn(i,y){let D,T,_=i.input.charCodeAt(i.position);if(_!==39)return!1;for(i.kind="scalar",i.result="",i.position++,D=T=i.position;(_=i.input.charCodeAt(i.position))!==0;)if(_===39)if(ae(i,D,i.position,!0),_=i.input.charCodeAt(++i.position),_===39)D=i.position,i.position++,T=i.position;else return!0;else v(_)?(ae(i,D,T,!0),en(i,W(i,!1,y)),D=T=i.position):i.position===i.lineStart&&ke(i)?O(i,"unexpected end of the document within a single quoted scalar"):(i.position++,E(_)||(T=i.position));O(i,"unexpected end of the stream within a single quoted scalar")}function Wn(i,y){let D,T,_,h=i.input.charCodeAt(i.position);if(h!==34)return!1;for(i.kind="scalar",i.result="",i.position++,D=T=i.position;(h=i.input.charCodeAt(i.position))!==0;){if(h===34)return ae(i,D,i.position,!0),i.position++,!0;if(h===92){if(ae(i,D,i.position,!0),h=i.input.charCodeAt(++i.position),v(h))W(i,!1,y);else if(h<256&&Je[h])i.result+=$e[h],i.position++;else if((_=$(h))>0){let w=_,C=0;for(;w>0;w--)h=i.input.charCodeAt(++i.position),(_=N(h))>=0?C=(C<<4)+_:O(i,"expected hexadecimal character");i.result+=he(C),i.position++}else O(i,"unknown escape sequence");D=T=i.position}else v(h)?(ae(i,D,T,!0),en(i,W(i,!1,y)),D=T=i.position):i.position===i.lineStart&&ke(i)?O(i,"unexpected end of the document within a double quoted scalar"):(i.position++,E(h)||(T=i.position))}O(i,"unexpected end of the stream within a double quoted scalar")}function Yn(i,y){let D=!0,T,_,h;const w=i.tag;let C;const F=i.anchor;let M,I,A,L;const B=Object.create(null);let z,q,H,j=i.input.charCodeAt(i.position);if(j===91)M=93,L=!1,C=[];else if(j===123)M=125,L=!0,C={};else return!1;for(i.anchor!==null&&_e(i,i.anchor,C),j=i.input.charCodeAt(++i.position);j!==0;){if(W(i,!0,y),j=i.input.charCodeAt(i.position),j===M)return i.position++,i.tag=w,i.anchor=F,i.kind=L?"mapping":"sequence",i.result=C,!0;if(D?j===44&&O(i,"expected the node content, but found ','"):O(i,"missed comma between flow collection entries"),q=z=H=null,I=A=!1,j===63){const Ie=i.input.charCodeAt(i.position+1);S(Ie)&&(I=A=!0,i.position++,W(i,!0,y))}T=i.line,_=i.lineStart,h=i.position,Me(i,y,u,!1,!0),q=i.tag,z=i.result,W(i,!0,y),j=i.input.charCodeAt(i.position),(A||i.line===T)&&j===58&&(I=!0,j=i.input.charCodeAt(++i.position),W(i,!0,y),Me(i,y,u,!1,!0),H=i.result),L?Ee(i,C,B,q,z,H,T,_,h):I?C.push(Ee(i,null,B,q,z,H,T,_,h)):C.push(z),W(i,!0,y),j=i.input.charCodeAt(i.position),j===44?(D=!0,j=i.input.charCodeAt(++i.position)):D=!1}O(i,"unexpected end of the stream within a flow collection")}function Fe(i,y){let D,T=d,_=!1,h=!1,w=y,C=0,F=!1,M,I=i.input.charCodeAt(i.position);if(I===124)D=!1;else if(I===62)D=!0;else return!1;for(i.kind="scalar",i.result="";I!==0;)if(I=i.input.charCodeAt(++i.position),I===43||I===45)d===T?T=I===43?s:f:O(i,"repeat of a chomping mode identifier");else if((M=U(I))>=0)M===0?O(i,"bad explicit indentation width of a block scalar; it cannot be less than one"):h?O(i,"repeat of an indentation width identifier"):(w=y+M-1,h=!0);else break;if(E(I)){do I=i.input.charCodeAt(++i.position);while(E(I));if(I===35)do I=i.input.charCodeAt(++i.position);while(!v(I)&&I!==0)}for(;I!==0;){for(xn(i),i.lineIndent=0,I=i.input.charCodeAt(i.position);(!h||i.lineIndent<w)&&I===32;)i.lineIndent++,I=i.input.charCodeAt(++i.position);if(!h&&i.lineIndent>w&&(w=i.lineIndent),v(I)){C++;continue}if(!h&&w===0&&O(i,"missing indentation for block scalar"),i.lineIndent<w){T===s?i.result+=e.repeat(`
`,_?1+C:C):T===d&&_&&(i.result+=`
`);break}D?E(I)?(F=!0,i.result+=e.repeat(`
`,_?1+C:C)):F?(F=!1,i.result+=e.repeat(`
`,C+1)):C===0?_&&(i.result+=" "):i.result+=e.repeat(`
`,C):i.result+=e.repeat(`
`,_?1+C:C),_=!0,h=!0,C=0;const A=i.position;for(;!v(I)&&I!==0;)I=i.input.charCodeAt(++i.position);ae(i,A,i.position,!1)}return!0}function Jn(i,y){const D=i.tag,T=i.anchor,_=[];let h=!1;if(i.firstTabInLine!==-1)return!1;i.anchor!==null&&_e(i,i.anchor,_);let w=i.input.charCodeAt(i.position);for(;w!==0&&(i.firstTabInLine!==-1&&(i.position=i.firstTabInLine,O(i,"tab characters must not be used in indentation")),w===45);){const C=i.input.charCodeAt(i.position+1);if(!S(C))break;if(h=!0,i.position++,W(i,!0,-1)&&i.lineIndent<=y){_.push(null),w=i.input.charCodeAt(i.position);continue}const F=i.line;if(Me(i,y,a,!1,!0),_.push(i.result),W(i,!0,-1),w=i.input.charCodeAt(i.position),(i.line===F||i.lineIndent>y)&&w!==0)O(i,"bad indentation of a sequence entry");else if(i.lineIndent<y)break}return h?(i.tag=D,i.anchor=T,i.kind="sequence",i.result=_,!0):!1}function Qn(i,y,D){let T,_,h,w;const C=i.tag,F=i.anchor,M={},I=Object.create(null);let A=null,L=null,B=null,z=!1,q=!1;if(i.firstTabInLine!==-1)return!1;i.anchor!==null&&_e(i,i.anchor,M);let H=i.input.charCodeAt(i.position);for(;H!==0;){!z&&i.firstTabInLine!==-1&&(i.position=i.firstTabInLine,O(i,"tab characters must not be used in indentation"));const j=i.input.charCodeAt(i.position+1),Ie=i.line;if((H===63||H===58)&&S(j))H===63?(z&&(Ee(i,M,I,A,L,null,_,h,w),A=L=B=null),q=!0,z=!0,T=!0):z?(z=!1,T=!0):O(i,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),i.position+=1,H=j;else{if(_=i.line,h=i.lineStart,w=i.position,!Me(i,D,c,!1,!0))break;if(i.line===Ie){for(H=i.input.charCodeAt(i.position);E(H);)H=i.input.charCodeAt(++i.position);if(H===58)H=i.input.charCodeAt(++i.position),S(H)||O(i,"a whitespace character is expected after the key-value separator within a block mapping"),z&&(Ee(i,M,I,A,L,null,_,h,w),A=L=B=null),q=!0,z=!1,T=!1,A=i.tag,L=i.result;else if(q)O(i,"can not read an implicit mapping pair; a colon is missed");else return i.tag=C,i.anchor=F,!0}else if(q)O(i,"can not read a block mapping entry; a multiline key may not be an implicit key");else return i.tag=C,i.anchor=F,!0}if((i.line===Ie||i.lineIndent>y)&&(z&&(_=i.line,h=i.lineStart,w=i.position),Me(i,y,l,!0,T)&&(z?L=i.result:B=i.result),z||(Ee(i,M,I,A,L,B,_,h,w),A=L=B=null),W(i,!0,-1),H=i.input.charCodeAt(i.position)),(i.line===Ie||i.lineIndent>y)&&H!==0)O(i,"bad indentation of a mapping entry");else if(i.lineIndent<y)break}return z&&Ee(i,M,I,A,L,null,_,h,w),q&&(i.tag=C,i.anchor=F,i.kind="mapping",i.result=M),q}function Xn(i){let y=!1,D=!1,T,_,h=i.input.charCodeAt(i.position);if(h!==33)return!1;i.tag!==null&&O(i,"duplication of a tag property"),h=i.input.charCodeAt(++i.position),h===60?(y=!0,h=i.input.charCodeAt(++i.position)):h===33?(D=!0,T="!!",h=i.input.charCodeAt(++i.position)):T="!";let w=i.position;if(y){do h=i.input.charCodeAt(++i.position);while(h!==0&&h!==62);i.position<i.length?(_=i.input.slice(w,i.position),h=i.input.charCodeAt(++i.position)):O(i,"unexpected end of the stream within a verbatim tag")}else{for(;h!==0&&!S(h);)h===33&&(D?O(i,"tag suffix cannot contain exclamation marks"):(T=i.input.slice(w-1,i.position+1),g.test(T)||O(i,"named tag handle cannot contain such characters"),D=!0,w=i.position+1)),h=i.input.charCodeAt(++i.position);_=i.input.slice(w,i.position),b.test(_)&&O(i,"tag suffix cannot contain flow indicator characters")}_&&!k.test(_)&&O(i,"tag name cannot contain such characters: "+_);try{_=decodeURIComponent(_)}catch{O(i,"tag name is malformed: "+_)}return y?i.tag=_:o.call(i.tagMap,T)?i.tag=i.tagMap[T]+_:T==="!"?i.tag="!"+_:T==="!!"?i.tag="tag:yaml.org,2002:"+_:O(i,'undeclared tag handle "'+T+'"'),!0}function et(i){let y=i.input.charCodeAt(i.position);if(y!==38)return!1;i.anchor!==null&&O(i,"duplication of an anchor property"),y=i.input.charCodeAt(++i.position);const D=i.position;for(;y!==0&&!S(y)&&!R(y);)y=i.input.charCodeAt(++i.position);return i.position===D&&O(i,"name of an anchor node must contain at least one character"),i.anchor=i.input.slice(D,i.position),!0}function Lt(i){let y=i.input.charCodeAt(i.position);if(y!==42)return!1;y=i.input.charCodeAt(++i.position);const D=i.position;for(;y!==0&&!S(y)&&!R(y);)y=i.input.charCodeAt(++i.position);i.position===D&&O(i,"name of an alias node must contain at least one character");const T=i.input.slice(D,i.position);return o.call(i.anchorMap,T)||O(i,'unidentified alias "'+T+'"'),i.result=i.anchorMap[T],W(i,!0,-1),!0}function nt(i,y,D,T){const _=kn(i);return It(i),Xe(i,y),i.tag=null,i.anchor=null,i.kind=null,i.result=null,Qn(i,D,T)&&i.kind==="mapping"?(He(i),!0):(Rt(i),Xe(i,_),!1)}function Me(i,y,D,T,_){let h,w,C=1,F=!1,M=!1,I=null,A,L,B;i.depth>=i.maxDepth&&O(i,"nesting exceeded maxDepth ("+i.maxDepth+")"),i.depth+=1,i.listener!==null&&i.listener("open",i),i.tag=null,i.anchor=null,i.kind=null,i.result=null;const z=h=w=l===D||a===D;if(T&&W(i,!0,-1)&&(F=!0,i.lineIndent>y?C=1:i.lineIndent===y?C=0:i.lineIndent<y&&(C=-1)),C===1)for(;;){const q=i.input.charCodeAt(i.position),H=kn(i);if(F&&(q===33&&i.tag!==null||q===38&&i.anchor!==null)||!Xn(i)&&!et(i))break;I===null&&(I=H),W(i,!0,-1)?(F=!0,w=z,i.lineIndent>y?C=1:i.lineIndent===y?C=0:i.lineIndent<y&&(C=-1)):w=!1}if(w&&(w=F||_),C===1||l===D)if(u===D||c===D?L=y:L=y+1,B=i.position-i.lineStart,C===1)if(w&&(Jn(i,B)||Qn(i,B,L))||Yn(i,L))M=!0;else{const q=i.input.charCodeAt(i.position);I!==null&&z&&!w&&q!==124&&q!==62&&nt(i,I,I.position-I.lineStart,L)||h&&Fe(i,L)||wn(i,L)||Wn(i,L)?M=!0:Lt(i)?(M=!0,(i.tag!==null||i.anchor!==null)&&O(i,"alias node should not have any properties")):Zn(i,L,u===D)&&(M=!0,i.tag===null&&(i.tag="?")),i.anchor!==null&&_e(i,i.anchor,i.result)}else C===0&&(M=w&&Jn(i,B));if(i.tag===null)i.anchor!==null&&_e(i,i.anchor,i.result);else if(i.tag==="?"){i.result!==null&&i.kind!=="scalar"&&O(i,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+i.kind+'"');for(let q=0,H=i.implicitTypes.length;q<H;q+=1)if(A=i.implicitTypes[q],A.resolve(i.result)){i.result=A.construct(i.result),i.tag=A.tag,i.anchor!==null&&_e(i,i.anchor,i.result);break}}else if(i.tag!=="!"){if(o.call(i.typeMap[i.kind||"fallback"],i.tag))A=i.typeMap[i.kind||"fallback"][i.tag];else{A=null;const q=i.typeMap.multi[i.kind||"fallback"];for(let H=0,j=q.length;H<j;H+=1)if(i.tag.slice(0,q[H].tag.length)===q[H].tag){A=q[H];break}}A||O(i,"unknown tag !<"+i.tag+">"),i.result!==null&&A.kind!==i.kind&&O(i,"unacceptable node kind for !<"+i.tag+'> tag; it should be "'+A.kind+'", not "'+i.kind+'"'),A.resolve(i.result,i.tag)?(i.result=A.construct(i.result,i.tag),i.anchor!==null&&_e(i,i.anchor,i.result)):O(i,"cannot resolve a node with !<"+i.tag+"> explicit tag")}return i.listener!==null&&i.listener("close",i),i.depth-=1,i.tag!==null||i.anchor!==null||M}function Nt(i){const y=i.position;let D=!1,T;for(i.version=null,i.checkLineBreaks=i.legacy,i.tagMap=Object.create(null),i.anchorMap=Object.create(null);(T=i.input.charCodeAt(i.position))!==0&&(W(i,!0,-1),T=i.input.charCodeAt(i.position),!(i.lineIndent>0||T!==37));){D=!0,T=i.input.charCodeAt(++i.position);let _=i.position;for(;T!==0&&!S(T);)T=i.input.charCodeAt(++i.position);const h=i.input.slice(_,i.position),w=[];for(h.length<1&&O(i,"directive name must not be less than one character in length");T!==0;){for(;E(T);)T=i.input.charCodeAt(++i.position);if(T===35){do T=i.input.charCodeAt(++i.position);while(T!==0&&!v(T));break}if(v(T))break;for(_=i.position;T!==0&&!S(T);)T=i.input.charCodeAt(++i.position);w.push(i.input.slice(_,i.position))}T!==0&&xn(i),o.call(Kn,h)?Kn[h](i,h,w):Qe(i,'unknown document directive "'+h+'"')}if(W(i,!0,-1),i.lineIndent===0&&i.input.charCodeAt(i.position)===45&&i.input.charCodeAt(i.position+1)===45&&i.input.charCodeAt(i.position+2)===45?(i.position+=3,W(i,!0,-1)):D&&O(i,"directives end mark is expected"),Me(i,i.lineIndent-1,l,!1,!0),W(i,!0,-1),i.checkLineBreaks&&m.test(i.input.slice(y,i.position))&&Qe(i,"non-ASCII line breaks are interpreted as content"),i.documents.push(i.result),i.position===i.lineStart&&ke(i)){i.input.charCodeAt(i.position)===46&&(i.position+=3,W(i,!0,-1));return}i.position<i.length-1&&O(i,"end of the stream or a document separator is expected")}function vn(i,y){i=String(i),y=y||{},i.length!==0&&(i.charCodeAt(i.length-1)!==10&&i.charCodeAt(i.length-1)!==13&&(i+=`
`),i.charCodeAt(0)===65279&&(i=i.slice(1)));const D=new J(i,y),T=i.indexOf("\0");for(T!==-1&&(D.position=T,O(D,"null byte is not allowed in input")),D.input+="\0";D.input.charCodeAt(D.position)===32;)D.lineIndent+=1,D.position+=1;for(;D.position<D.length-1;)Nt(D);return D.documents}function Ot(i,y,D){y!==null&&typeof y=="object"&&typeof D>"u"&&(D=y,y=null);const T=vn(i,D);if(typeof y!="function")return T;for(let _=0,h=T.length;_<h;_+=1)y(T[_])}function Bt(i,y){const D=vn(i,y);if(D.length!==0){if(D.length===1)return D[0];throw new n("expected a single document in the stream, but found more")}}return ot.loadAll=Ot,ot.load=Bt,ot}var mr={},fu;function Ps(){if(fu)return mr;fu=1;const e=jn(),n=Un(),t=Jr(),r=Object.prototype.toString,o=Object.prototype.hasOwnProperty,u=65279,c=9,a=10,l=13,d=32,f=33,s=34,p=35,m=37,b=38,g=39,k=42,x=44,v=45,E=58,S=61,R=62,N=63,$=64,U=91,K=93,he=96,Ce=123,Je=124,$e=125,J={};J[0]="\\0",J[7]="\\a",J[8]="\\b",J[9]="\\t",J[10]="\\n",J[11]="\\v",J[12]="\\f",J[13]="\\r",J[27]="\\e",J[34]='\\"',J[92]="\\\\",J[133]="\\N",J[160]="\\_",J[8232]="\\L",J[8233]="\\P";const pe=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],O=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function Qe(h,w){if(w===null)return{};const C={},F=Object.keys(w);for(let M=0,I=F.length;M<I;M+=1){let A=F[M],L=String(w[A]);A.slice(0,2)==="!!"&&(A="tag:yaml.org,2002:"+A.slice(2));const B=h.compiledTypeMap.fallback[A];B&&o.call(B.styleAliases,L)&&(L=B.styleAliases[L]),C[A]=L}return C}function _e(h){let w,C;const F=h.toString(16).toUpperCase();if(h<=255)w="x",C=2;else if(h<=65535)w="u",C=4;else if(h<=4294967295)w="U",C=8;else throw new n("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+w+e.repeat("0",C-F.length)+F}const It=1,He=2;function Rt(h){this.schema=h.schema||t,this.indent=Math.max(1,h.indent||2),this.noArrayIndent=h.noArrayIndent||!1,this.skipInvalid=h.skipInvalid||!1,this.flowLevel=e.isNothing(h.flowLevel)?-1:h.flowLevel,this.styleMap=Qe(this.schema,h.styles||null),this.sortKeys=h.sortKeys||!1,this.lineWidth=h.lineWidth||80,this.noRefs=h.noRefs||!1,this.noCompatMode=h.noCompatMode||!1,this.condenseFlow=h.condenseFlow||!1,this.quotingType=h.quotingType==='"'?He:It,this.forceQuotes=h.forceQuotes||!1,this.replacer=typeof h.replacer=="function"?h.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function kn(h,w){const C=e.repeat(" ",w);let F=0,M="";const I=h.length;for(;F<I;){let A;const L=h.indexOf(`
`,F);L===-1?(A=h.slice(F),F=I):(A=h.slice(F,L+1),F=L+1),A.length&&A!==`
`&&(M+=C),M+=A}return M}function Xe(h,w){return`
`+e.repeat(" ",h.indent*w)}function Kn(h,w){for(let C=0,F=h.implicitTypes.length;C<F;C+=1)if(h.implicitTypes[C].resolve(w))return!0;return!1}function ae(h){return h===d||h===c}function Te(h){return h>=32&&h<=126||h>=161&&h<=55295&&h!==8232&&h!==8233||h>=57344&&h<=65533&&h!==u||h>=65536&&h<=1114111}function yn(h){return Te(h)&&h!==u&&h!==l&&h!==a}function Ee(h,w,C){const F=yn(h),M=F&&!ae(h);return(C?F:F&&h!==x&&h!==U&&h!==K&&h!==Ce&&h!==$e)&&h!==p&&!(w===E&&!M)||yn(w)&&!ae(w)&&h===p||w===E&&M}function xn(h){return Te(h)&&h!==u&&!ae(h)&&h!==v&&h!==N&&h!==E&&h!==x&&h!==U&&h!==K&&h!==Ce&&h!==$e&&h!==p&&h!==b&&h!==k&&h!==f&&h!==Je&&h!==S&&h!==R&&h!==g&&h!==s&&h!==m&&h!==$&&h!==he}function W(h){return!ae(h)&&h!==E}function ke(h,w){const C=h.charCodeAt(w);let F;return C>=55296&&C<=56319&&w+1<h.length&&(F=h.charCodeAt(w+1),F>=56320&&F<=57343)?(C-55296)*1024+F-56320+65536:C}function en(h){return/^\n* /.test(h)}const Zn=1,wn=2,Wn=3,Yn=4,Fe=5;function Jn(h,w,C,F,M,I,A,L){let B,z=0,q=null,H=!1,j=!1;const Ie=F!==-1;let Cn=-1,_n=xn(ke(h,0))&&W(ke(h,h.length-1));if(w||A)for(B=0;B<h.length;z>=65536?B+=2:B++){if(z=ke(h,B),!Te(z))return Fe;_n=_n&&Ee(z,q,L),q=z}else{for(B=0;B<h.length;z>=65536?B+=2:B++){if(z=ke(h,B),z===a)H=!0,Ie&&(j=j||B-Cn-1>F&&h[Cn+1]!==" ",Cn=B);else if(!Te(z))return Fe;_n=_n&&Ee(z,q,L),q=z}j=j||Ie&&B-Cn-1>F&&h[Cn+1]!==" "}return!H&&!j?_n&&!A&&!M(h)?Zn:I===He?Fe:wn:C>9&&en(h)?Fe:A?I===He?Fe:wn:j?Yn:Wn}function Qn(h,w,C,F,M){h.dump=(function(){if(w.length===0)return h.quotingType===He?'""':"''";if(!h.noCompatMode&&(pe.indexOf(w)!==-1||O.test(w)))return h.quotingType===He?'"'+w+'"':"'"+w+"'";const I=h.indent*Math.max(1,C),A=h.lineWidth===-1?-1:Math.max(Math.min(h.lineWidth,40),h.lineWidth-I),L=F||h.flowLevel>-1&&C>=h.flowLevel;function B(z){return Kn(h,z)}switch(Jn(w,L,h.indent,A,B,h.quotingType,h.forceQuotes&&!F,M)){case Zn:return w;case wn:return"'"+w.replace(/'/g,"''")+"'";case Wn:return"|"+Xn(w,h.indent)+et(kn(w,I));case Yn:return">"+Xn(w,h.indent)+et(kn(Lt(w,A),I));case Fe:return'"'+Me(w)+'"';default:throw new n("impossible error: invalid scalar style")}})()}function Xn(h,w){const C=en(h)?String(w):"",F=h[h.length-1]===`
`,I=F&&(h[h.length-2]===`
`||h===`
`)?"+":F?"":"-";return C+I+`
`}function et(h){return h[h.length-1]===`
`?h.slice(0,-1):h}function Lt(h,w){const C=/(\n+)([^\n]*)/g;let F=(function(){let L=h.indexOf(`
`);return L=L!==-1?L:h.length,C.lastIndex=L,nt(h.slice(0,L),w)})(),M=h[0]===`
`||h[0]===" ",I,A;for(;A=C.exec(h);){const L=A[1],B=A[2];I=B[0]===" ",F+=L+(!M&&!I&&B!==""?`
`:"")+nt(B,w),M=I}return F}function nt(h,w){if(h===""||h[0]===" ")return h;const C=/ [^ ]/g;let F,M=0,I,A=0,L=0,B="";for(;F=C.exec(h);)L=F.index,L-M>w&&(I=A>M?A:L,B+=`
`+h.slice(M,I),M=I+1),A=L;return B+=`
`,h.length-M>w&&A>M?B+=h.slice(M,A)+`
`+h.slice(A+1):B+=h.slice(M),B.slice(1)}function Me(h){let w="",C=0;for(let F=0;F<h.length;C>=65536?F+=2:F++){C=ke(h,F);const M=J[C];!M&&Te(C)?(w+=h[F],C>=65536&&(w+=h[F+1])):w+=M||_e(C)}return w}function Nt(h,w,C){let F="";const M=h.tag;for(let I=0,A=C.length;I<A;I+=1){let L=C[I];h.replacer&&(L=h.replacer.call(C,String(I),L)),(y(h,w,L,!1,!1)||typeof L>"u"&&y(h,w,null,!1,!1))&&(F!==""&&(F+=","+(h.condenseFlow?"":" ")),F+=h.dump)}h.tag=M,h.dump="["+F+"]"}function vn(h,w,C,F){let M="";const I=h.tag;for(let A=0,L=C.length;A<L;A+=1){let B=C[A];h.replacer&&(B=h.replacer.call(C,String(A),B)),(y(h,w+1,B,!0,!0,!1,!0)||typeof B>"u"&&y(h,w+1,null,!0,!0,!1,!0))&&((!F||M!=="")&&(M+=Xe(h,w)),h.dump&&a===h.dump.charCodeAt(0)?M+="-":M+="- ",M+=h.dump)}h.tag=I,h.dump=M||"[]"}function Ot(h,w,C){let F="";const M=h.tag,I=Object.keys(C);for(let A=0,L=I.length;A<L;A+=1){let B="";F!==""&&(B+=", "),h.condenseFlow&&(B+='"');const z=I[A];let q=C[z];h.replacer&&(q=h.replacer.call(C,z,q)),y(h,w,z,!1,!1)&&(h.dump.length>1024&&(B+="? "),B+=h.dump+(h.condenseFlow?'"':"")+":"+(h.condenseFlow?"":" "),y(h,w,q,!1,!1)&&(B+=h.dump,F+=B))}h.tag=M,h.dump="{"+F+"}"}function Bt(h,w,C,F){let M="";const I=h.tag,A=Object.keys(C);if(h.sortKeys===!0)A.sort();else if(typeof h.sortKeys=="function")A.sort(h.sortKeys);else if(h.sortKeys)throw new n("sortKeys must be a boolean or a function");for(let L=0,B=A.length;L<B;L+=1){let z="";(!F||M!=="")&&(z+=Xe(h,w));const q=A[L];let H=C[q];if(h.replacer&&(H=h.replacer.call(C,q,H)),!y(h,w+1,q,!0,!0,!0))continue;const j=h.tag!==null&&h.tag!=="?"||h.dump&&h.dump.length>1024;j&&(h.dump&&a===h.dump.charCodeAt(0)?z+="?":z+="? "),z+=h.dump,j&&(z+=Xe(h,w)),y(h,w+1,H,!0,j)&&(h.dump&&a===h.dump.charCodeAt(0)?z+=":":z+=": ",z+=h.dump,M+=z)}h.tag=I,h.dump=M||"{}"}function i(h,w,C){const F=C?h.explicitTypes:h.implicitTypes;for(let M=0,I=F.length;M<I;M+=1){const A=F[M];if((A.instanceOf||A.predicate)&&(!A.instanceOf||typeof w=="object"&&w instanceof A.instanceOf)&&(!A.predicate||A.predicate(w))){if(C?A.multi&&A.representName?h.tag=A.representName(w):h.tag=A.tag:h.tag="?",A.represent){const L=h.styleMap[A.tag]||A.defaultStyle;let B;if(r.call(A.represent)==="[object Function]")B=A.represent(w,L);else if(o.call(A.represent,L))B=A.represent[L](w,L);else throw new n("!<"+A.tag+'> tag resolver accepts not "'+L+'" style');h.dump=B}return!0}}return!1}function y(h,w,C,F,M,I,A){h.tag=null,h.dump=C,i(h,C,!1)||i(h,C,!0);const L=r.call(h.dump),B=F;F&&(F=h.flowLevel<0||h.flowLevel>w);const z=L==="[object Object]"||L==="[object Array]";let q,H;if(z&&(q=h.duplicates.indexOf(C),H=q!==-1),(h.tag!==null&&h.tag!=="?"||H||h.indent!==2&&w>0)&&(M=!1),H&&h.usedDuplicates[q])h.dump="*ref_"+q;else{if(z&&H&&!h.usedDuplicates[q]&&(h.usedDuplicates[q]=!0),L==="[object Object]")F&&Object.keys(h.dump).length!==0?(Bt(h,w,h.dump,M),H&&(h.dump="&ref_"+q+h.dump)):(Ot(h,w,h.dump),H&&(h.dump="&ref_"+q+" "+h.dump));else if(L==="[object Array]")F&&h.dump.length!==0?(h.noArrayIndent&&!A&&w>0?vn(h,w-1,h.dump,M):vn(h,w,h.dump,M),H&&(h.dump="&ref_"+q+h.dump)):(Nt(h,w,h.dump),H&&(h.dump="&ref_"+q+" "+h.dump));else if(L==="[object String]")h.tag!=="?"&&Qn(h,h.dump,w,I,B);else{if(L==="[object Undefined]")return!1;if(h.skipInvalid)return!1;throw new n("unacceptable kind of an object to dump "+L)}if(h.tag!==null&&h.tag!=="?"){let j=encodeURI(h.tag[0]==="!"?h.tag.slice(1):h.tag).replace(/!/g,"%21");h.tag[0]==="!"?j="!"+j:j.slice(0,18)==="tag:yaml.org,2002:"?j="!!"+j.slice(18):j="!<"+j+">",h.dump=j+" "+h.dump}}return!0}function D(h,w){const C=[],F=[];T(h,C,F);const M=F.length;for(let I=0;I<M;I+=1)w.duplicates.push(C[F[I]]);w.usedDuplicates=new Array(M)}function T(h,w,C){if(h!==null&&typeof h=="object"){const F=w.indexOf(h);if(F!==-1)C.indexOf(F)===-1&&C.push(F);else if(w.push(h),Array.isArray(h))for(let M=0,I=h.length;M<I;M+=1)T(h[M],w,C);else{const M=Object.keys(h);for(let I=0,A=M.length;I<A;I+=1)T(h[M[I]],w,C)}}}function _(h,w){w=w||{};const C=new Rt(w);C.noRefs||D(h,C);let F=h;return C.replacer&&(F=C.replacer.call({"":F},"",F)),y(C,0,F,!0,!0)?C.dump+`
`:""}return mr.dump=_,mr}var hu;function zs(){if(hu)return te;hu=1;const e=Bs(),n=Ps();function t(r,o){return function(){throw new Error("Function yaml."+r+" is removed in js-yaml 4. Use yaml."+o+" instead, which is now safe by default.")}}return te.Type=ue(),te.Schema=ci(),te.FAILSAFE_SCHEMA=fi(),te.JSON_SCHEMA=gi(),te.CORE_SCHEMA=ki(),te.DEFAULT_SCHEMA=Jr(),te.load=e.load,te.loadAll=e.loadAll,te.dump=n.dump,te.YAMLException=Un(),te.types={binary:wi(),float:bi(),map:di(),null:hi(),pairs:Ci(),set:_i(),timestamp:yi(),bool:pi(),int:mi(),merge:xi(),omap:vi(),seq:si(),str:li()},te.safeLoad=t("safeLoad","load"),te.safeLoadAll=t("safeLoadAll","loadAll"),te.safeDump=t("safeDump","dump"),te}var qs=zs();const $s=Ns(qs),{Type:l1,Schema:s1,FAILSAFE_SCHEMA:d1,JSON_SCHEMA:f1,CORE_SCHEMA:Hs,DEFAULT_SCHEMA:h1,load:js,loadAll:p1,dump:m1,YAMLException:b1,types:g1,safeLoad:k1,safeLoadAll:y1,safeDump:x1}=$s;var br,pu;function Us(){return pu||(pu=1,br=function(n,t){var r=3,o="-",u=o.charCodeAt(0),c=o.length;function a(l,d,f,s){var p,m,b,g,k,x,v,E=!1,S=l.bMarks[d]+l.tShift[d],R=l.eMarks[d];if(d!==0||u!==l.src.charCodeAt(0))return!1;for(p=S+1;p<=R;p++)if(o[(p-S)%c]!==l.src[p]){v=p+1;break}if(b=Math.floor((p-S)/c),b<r)return!1;if(p-=(p-S)%c,s)return!0;for(m=d;m++,!(m>=f||l.src.slice(S,R)==="..."||(S=l.bMarks[m]+l.tShift[m],R=l.eMarks[m],S<R&&l.sCount[m]<l.blkIndent));)if(u===l.src.charCodeAt(S)&&!(l.sCount[m]-l.blkIndent>=4)){for(p=S+1;p<=R&&o[(p-S)%c]===l.src[p];p++);if(!(Math.floor((p-S)/c)<b)&&(p-=(p-S)%c,p=l.skipSpaces(p),!(p<R))){E=!0;break}}return k=l.parentType,x=l.lineMax,l.parentType="container",l.lineMax=m,g=l.push("front_matter",null,0),g.hidden=!0,g.markup=l.src.slice(d,p),g.block=!0,g.map=[d,m+(E?1:0)],g.meta=l.src.slice(v,S-1),l.parentType=k,l.lineMax=x,l.line=m+(E?1:0),t(g.meta),!0}n.block.ruler.before("table","front_matter",a,{alt:["paragraph","reference","blockquote","list"]})}),br}var Gs=Us();const Vs=At(Gs);function Ks(){return e=>{let n="";e.use(Vs,t=>{const r=Zs(t);r!==void 0?n=Ei(r,e.utils.escapeHtml):n=""}),e.renderer.rules.front_matter=(t,r,o,u,c)=>n===""?"":`<table class="markdown-frontMatter"${c.renderAttrs(t[r])}>
${n}
</table>
`}}function Zs(e){try{const n=js(e,{schema:Hs});if(n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.keys(n).length>0)return n}catch{}}function Ei(e,n){const t=Object.entries(e);return t.length===0?"":`<tbody>
${t.map(([o,u])=>`<tr><th scope="row">${n(o)}</th><td>${Fr(u,n)}</td></tr>`).join(`
`)}
</tbody>`}function Fr(e,n){if(e==null)return"";if(e instanceof Date)return n(Ws(e));if(Array.isArray(e))return e.every(Ys)?e.map(r=>Fr(r,n)).join(", "):`<ul>${e.map(r=>`<li>${Fr(r,n)}</li>`).join("")}</ul>`;if(typeof e=="object"){const t=Ei(e,n);return t===""?"":`<table>${t}</table>`}return n(String(e))}function Ws(e){if(Number.isNaN(e.getTime()))return"";const n=e.toISOString();return n.endsWith("T00:00:00.000Z")?n.slice(0,10):n}function Ys(e){if(e==null||e instanceof Date)return!0;const n=typeof e;return n==="string"||n==="number"||n==="boolean"||n==="bigint"}const Qr={rootValueKey:"extension.markeditPreview",defaultModes:["side-by-side","preview"],defaultPreset:"default"},Js=gn(P.MarkEdit.userSettings),fe=gn(Js[Qr.rootValueKey]),Ai=gn(fe.changeMode),Si=gn(fe.markdownIt),Qs=["automatic","quiet","notify","never"],An=(()=>{const e=fe.updateBehavior;return e&&Qs.includes(e)?e:Gn(fe.autoUpdate)?"quiet":"never"})(),Xs=Gn(fe.syncScroll);Gn(fe.hidePreviewButtons);Gn(fe.syntaxAutoDetect,!1);const e0=Gn(fe.imageHoverPreview,!1),St=fe.themeName??"github",Di=St==="none",gr=fe.styledHtmlColorScheme??fe.styledHtmlTheme??"auto";fe.mathDelimiters;const n0=Ai.modes??Qr.defaultModes,mu=gn(Ai.hotKey),t0=Si.preset??Qr.defaultPreset,r0=gn(Si.options);function gn(e,n={}){return e??n}function Gn(e,n=!0){return e??n}const o0=`.markdown-body {
  --base-size-16: 1rem;
  --base-size-24: 1.5rem;
  --base-size-4: 0.25rem;
  --base-size-40: 2.5rem;
  --base-size-8: 0.5rem;
  --base-text-weight-medium: 500;
  --base-text-weight-normal: 400;
  --base-text-weight-semibold: 600;
  --fontStack-monospace: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  --fontStack-sansSerif: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  --fgColor-accent: Highlight;
}

.markdown-body {
  /** CSS default easing. Use for hover state changes and micro-interactions. */
  /** Accelerating motion. Use for elements exiting the viewport (moving off-screen). */
  /** Smooth acceleration and deceleration. Use for elements moving or morphing within the viewport. */
  /** Decelerating motion. Use for elements entering the viewport or appearing on screen. */
  /** Constant motion with no acceleration. Use for continuous animations like progress bars or loaders. */
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  font-weight: var(--base-text-weight-normal, 400);
  color: var(--fgColor-default);
  background-color: var(--bgColor-default);
  font-family: var(--fontStack-sansSerif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji");
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

.markdown-body a {
  text-decoration: underline;
  text-underline-offset: .2rem;
}

.markdown-body .octicon {
  display: inline-block;
  fill: currentColor;
  vertical-align: text-bottom;
}

.markdown-body h1:hover .anchor .octicon-link:before,
.markdown-body h2:hover .anchor .octicon-link:before,
.markdown-body h3:hover .anchor .octicon-link:before,
.markdown-body h4:hover .anchor .octicon-link:before,
.markdown-body h5:hover .anchor .octicon-link:before,
.markdown-body h6:hover .anchor .octicon-link:before {
  width: 16px;
  height: 16px;
  content: ' ';
  display: inline-block;
  background-color: currentColor;
  -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
  mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
}

.markdown-body details,
.markdown-body figcaption,
.markdown-body figure {
  display: block;
}

.markdown-body summary {
  display: list-item;
}

.markdown-body [hidden] {
  display: none !important;
}

.markdown-body a {
  background-color: rgba(0,0,0,0);
  color: var(--fgColor-accent);
  text-decoration: none;
}

.markdown-body abbr[title] {
  border-bottom: none;
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
}

.markdown-body b,
.markdown-body strong {
  font-weight: var(--base-text-weight-semibold, 600);
}

.markdown-body dfn {
  font-style: italic;
}

.markdown-body h1 {
  margin: .67em 0;
  font-weight: var(--base-text-weight-semibold, 600);
  padding-bottom: .3em;
  font-size: 2em;
  border-bottom: 1px solid var(--borderColor-muted);
}

.markdown-body mark {
  background-color: var(--bgColor-attention-muted);
  color: var(--fgColor-default);
}

.markdown-body small {
  font-size: 90%;
}

.markdown-body sub,
.markdown-body sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

.markdown-body sub {
  bottom: -0.25em;
}

.markdown-body sup {
  top: -0.5em;
}

.markdown-body img {
  border-style: none;
  max-width: 100%;
  box-sizing: content-box;
}

.markdown-body code,
.markdown-body kbd,
.markdown-body pre,
.markdown-body samp {
  font-family: monospace;
  font-size: 1em;
}

.markdown-body figure {
  margin: 1em var(--base-size-40);
}

.markdown-body hr {
  box-sizing: content-box;
  overflow: hidden;
  background: rgba(0,0,0,0);
  border-bottom: 1px solid var(--borderColor-muted);
  height: .25em;
  padding: 0;
  margin: var(--base-size-24) 0;
  background-color: var(--borderColor-default);
  border: 0;
}

.markdown-body input {
  font: inherit;
  margin: 0;
  overflow: visible;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.markdown-body [type=button],
.markdown-body [type=reset],
.markdown-body [type=submit] {
  -webkit-appearance: button;
  appearance: button;
}

.markdown-body [type=checkbox],
.markdown-body [type=radio] {
  box-sizing: border-box;
  padding: 0;
}

.markdown-body [type=number]::-webkit-inner-spin-button,
.markdown-body [type=number]::-webkit-outer-spin-button {
  height: auto;
}

.markdown-body [type=search]::-webkit-search-cancel-button,
.markdown-body [type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
}

.markdown-body ::-webkit-input-placeholder {
  color: inherit;
  opacity: .54;
}

.markdown-body ::-webkit-file-upload-button {
  -webkit-appearance: button;
  appearance: button;
  font: inherit;
}

.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body ::placeholder {
  color: var(--fgColor-muted);
  opacity: 1;
}

.markdown-body hr::before {
  display: table;
  content: "";
}

.markdown-body hr::after {
  display: table;
  clear: both;
  content: "";
}

.markdown-body table {
  border-spacing: 0;
  border-collapse: collapse;
  display: block;
  width: max-content;
  max-width: 100%;
  overflow: auto;
  font-variant: tabular-nums;
}

.markdown-body td,
.markdown-body th {
  padding: 0;
}

.markdown-body details summary {
  cursor: pointer;
}

.markdown-body a:focus,
.markdown-body [role=button]:focus,
.markdown-body input[type=radio]:focus,
.markdown-body input[type=checkbox]:focus {
  outline: 2px solid var(--focus-outlineColor);
  outline-offset: -2px;
  box-shadow: none;
}

.markdown-body a:focus:not(:focus-visible),
.markdown-body [role=button]:focus:not(:focus-visible),
.markdown-body input[type=radio]:focus:not(:focus-visible),
.markdown-body input[type=checkbox]:focus:not(:focus-visible) {
  outline: solid 1px rgba(0,0,0,0);
}

.markdown-body a:focus-visible,
.markdown-body [role=button]:focus-visible,
.markdown-body input[type=radio]:focus-visible,
.markdown-body input[type=checkbox]:focus-visible {
  outline: 2px solid var(--focus-outlineColor);
  outline-offset: -2px;
  box-shadow: none;
}

.markdown-body a:not([class]):focus,
.markdown-body a:not([class]):focus-visible,
.markdown-body input[type=radio]:focus,
.markdown-body input[type=radio]:focus-visible,
.markdown-body input[type=checkbox]:focus,
.markdown-body input[type=checkbox]:focus-visible {
  outline-offset: 0;
}

.markdown-body kbd {
  display: inline-block;
  padding: var(--base-size-4);
  font: 11px var(--fontStack-monospace, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace);
  line-height: 10px;
  color: var(--fgColor-default);
  vertical-align: middle;
  background-color: var(--bgColor-muted);
  border: solid 1px var(--borderColor-neutral-muted);
  border-bottom-color: var(--borderColor-neutral-muted);
  border-radius: 6px;
  box-shadow: inset 0 -1px 0 var(--borderColor-neutral-muted);
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: var(--base-size-24);
  margin-bottom: var(--base-size-16);
  font-weight: var(--base-text-weight-semibold, 600);
  line-height: 1.25;
}

.markdown-body h2 {
  font-weight: var(--base-text-weight-semibold, 600);
  padding-bottom: .3em;
  font-size: 1.5em;
  border-bottom: 1px solid var(--borderColor-muted);
}

.markdown-body h3 {
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: 1.25em;
}

.markdown-body h4 {
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: 1em;
}

.markdown-body h5 {
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: .875em;
}

.markdown-body h6 {
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: .85em;
  color: var(--fgColor-muted);
}

.markdown-body p {
  margin-top: 0;
  margin-bottom: 10px;
}

.markdown-body blockquote {
  margin: 0;
  padding: 0 1em;
  color: var(--fgColor-muted);
  border-left: .25em solid var(--borderColor-default);
}

.markdown-body ul,
.markdown-body ol {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 2em;
}

.markdown-body ol ol,
.markdown-body ul ol {
  list-style-type: lower-roman;
}

.markdown-body ul ul ol,
.markdown-body ul ol ol,
.markdown-body ol ul ol,
.markdown-body ol ol ol {
  list-style-type: lower-alpha;
}

.markdown-body dd {
  margin-left: 0;
}

.markdown-body tt,
.markdown-body code,
.markdown-body samp {
  font-family: var(--fontStack-monospace, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace);
  font-size: 12px;
}

.markdown-body pre {
  margin-top: 0;
  margin-bottom: 0;
  font-family: var(--fontStack-monospace, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace);
  font-size: 12px;
  word-wrap: normal;
}

.markdown-body .octicon {
  display: inline-block;
  overflow: visible !important;
  vertical-align: text-bottom;
  fill: currentColor;
}

.markdown-body input::-webkit-outer-spin-button,
.markdown-body input::-webkit-inner-spin-button {
  margin: 0;
  appearance: none;
}

.markdown-body .mr-2 {
  margin-right: var(--base-size-8, 8px) !important;
}

.markdown-body::before {
  display: table;
  content: "";
}

.markdown-body::after {
  display: table;
  clear: both;
  content: "";
}

.markdown-body>*:first-child {
  margin-top: 0 !important;
}

.markdown-body>*:last-child {
  margin-bottom: 0 !important;
}

.markdown-body a:not([href]) {
  color: inherit;
  text-decoration: none;
}

.markdown-body .absent {
  color: var(--fgColor-danger);
}

.markdown-body .anchor {
  float: left;
  padding-right: var(--base-size-4);
  margin-left: -20px;
  line-height: 1;
}

.markdown-body .anchor:focus {
  outline: none;
}

.markdown-body p,
.markdown-body blockquote,
.markdown-body ul,
.markdown-body ol,
.markdown-body dl,
.markdown-body table,
.markdown-body pre,
.markdown-body details {
  margin-top: 0;
  margin-bottom: var(--base-size-16);
}

.markdown-body blockquote>:first-child {
  margin-top: 0;
}

.markdown-body blockquote>:last-child {
  margin-bottom: 0;
}

.markdown-body h1 .octicon-link,
.markdown-body h2 .octicon-link,
.markdown-body h3 .octicon-link,
.markdown-body h4 .octicon-link,
.markdown-body h5 .octicon-link,
.markdown-body h6 .octicon-link {
  color: var(--fgColor-default);
  vertical-align: middle;
  visibility: hidden;
}

.markdown-body h1:hover .anchor,
.markdown-body h2:hover .anchor,
.markdown-body h3:hover .anchor,
.markdown-body h4:hover .anchor,
.markdown-body h5:hover .anchor,
.markdown-body h6:hover .anchor {
  text-decoration: none;
}

.markdown-body h1:hover .anchor .octicon-link,
.markdown-body h2:hover .anchor .octicon-link,
.markdown-body h3:hover .anchor .octicon-link,
.markdown-body h4:hover .anchor .octicon-link,
.markdown-body h5:hover .anchor .octicon-link,
.markdown-body h6:hover .anchor .octicon-link {
  visibility: visible;
}

.markdown-body h1 tt,
.markdown-body h1 code,
.markdown-body h2 tt,
.markdown-body h2 code,
.markdown-body h3 tt,
.markdown-body h3 code,
.markdown-body h4 tt,
.markdown-body h4 code,
.markdown-body h5 tt,
.markdown-body h5 code,
.markdown-body h6 tt,
.markdown-body h6 code {
  padding: 0 .2em;
  font-size: inherit;
}

.markdown-body summary h1,
.markdown-body summary h2,
.markdown-body summary h3,
.markdown-body summary h4,
.markdown-body summary h5,
.markdown-body summary h6 {
  display: inline-block;
}

.markdown-body summary h1 .anchor,
.markdown-body summary h2 .anchor,
.markdown-body summary h3 .anchor,
.markdown-body summary h4 .anchor,
.markdown-body summary h5 .anchor,
.markdown-body summary h6 .anchor {
  margin-left: -40px;
}

.markdown-body summary h1,
.markdown-body summary h2 {
  padding-bottom: 0;
  border-bottom: 0;
}

.markdown-body ul.no-list,
.markdown-body ol.no-list {
  padding: 0;
  list-style-type: none;
}

.markdown-body ol[type="a s"] {
  list-style-type: lower-alpha;
}

.markdown-body ol[type="A s"] {
  list-style-type: upper-alpha;
}

.markdown-body ol[type="i s"] {
  list-style-type: lower-roman;
}

.markdown-body ol[type="I s"] {
  list-style-type: upper-roman;
}

.markdown-body ol[type="1"] {
  list-style-type: decimal;
}

.markdown-body div>ol:not([type]) {
  list-style-type: decimal;
}

.markdown-body ul ul,
.markdown-body ul ol,
.markdown-body ol ol,
.markdown-body ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body li>p {
  margin-top: var(--base-size-16);
}

.markdown-body li+li {
  margin-top: .25em;
}

.markdown-body dl {
  padding: 0;
}

.markdown-body dl dt {
  padding: 0;
  margin-top: var(--base-size-16);
  font-size: 1em;
  font-style: italic;
  font-weight: var(--base-text-weight-semibold, 600);
}

.markdown-body dl dd {
  padding: 0 var(--base-size-16);
  margin-bottom: var(--base-size-16);
}

.markdown-body table th {
  font-weight: var(--base-text-weight-semibold, 600);
}

.markdown-body table th,
.markdown-body table td {
  padding: 6px 13px;
  border: 1px solid var(--borderColor-default);
}

.markdown-body table td>:last-child {
  margin-bottom: 0;
}

.markdown-body table tr {
  background-color: var(--bgColor-default);
  border-top: 1px solid var(--borderColor-muted);
}

.markdown-body table tr:nth-child(2n) {
  background-color: var(--bgColor-muted);
}

.markdown-body table img {
  background-color: rgba(0,0,0,0);
}

.markdown-body img[align=right] {
  padding-left: 20px;
}

.markdown-body img[align=left] {
  padding-right: 20px;
}

.markdown-body .emoji {
  max-width: none;
  vertical-align: text-top;
  background-color: rgba(0,0,0,0);
}

.markdown-body span.frame {
  display: block;
  overflow: hidden;
}

.markdown-body span.frame>span {
  display: block;
  float: left;
  width: auto;
  padding: 7px;
  margin: 13px 0 0;
  overflow: hidden;
  border: 1px solid var(--borderColor-default);
}

.markdown-body span.frame span img {
  display: block;
  float: left;
}

.markdown-body span.frame span span {
  display: block;
  padding: 5px 0 0;
  clear: both;
  color: var(--fgColor-default);
}

.markdown-body span.align-center {
  display: block;
  overflow: hidden;
  clear: both;
}

.markdown-body span.align-center>span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: center;
}

.markdown-body span.align-center span img {
  margin: 0 auto;
  text-align: center;
}

.markdown-body span.align-right {
  display: block;
  overflow: hidden;
  clear: both;
}

.markdown-body span.align-right>span {
  display: block;
  margin: 13px 0 0;
  overflow: hidden;
  text-align: right;
}

.markdown-body span.align-right span img {
  margin: 0;
  text-align: right;
}

.markdown-body span.float-left {
  display: block;
  float: left;
  margin-right: 13px;
  overflow: hidden;
}

.markdown-body span.float-left span {
  margin: 13px 0 0;
}

.markdown-body span.float-right {
  display: block;
  float: right;
  margin-left: 13px;
  overflow: hidden;
}

.markdown-body span.float-right>span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: right;
}

.markdown-body code,
.markdown-body tt {
  padding: .2em .4em;
  margin: 0;
  font-size: 85%;
  white-space: break-spaces;
  background-color: var(--bgColor-neutral-muted);
  border-radius: 6px;
}

.markdown-body code br,
.markdown-body tt br {
  display: none;
}

.markdown-body del code {
  text-decoration: inherit;
}

.markdown-body samp {
  font-size: 85%;
}

.markdown-body pre code {
  font-size: 100%;
}

.markdown-body pre>code {
  padding: 0;
  margin: 0;
  word-break: normal;
  white-space: pre;
  background: rgba(0,0,0,0);
  border: 0;
}

.markdown-body .highlight {
  margin-bottom: var(--base-size-16);
}

.markdown-body .highlight pre {
  margin-bottom: 0;
  word-break: normal;
}

.markdown-body .highlight pre,
.markdown-body pre {
  padding: var(--base-size-16);
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  color: var(--fgColor-default);
  background-color: var(--bgColor-muted);
  border-radius: 6px;
}

.markdown-body pre code,
.markdown-body pre tt {
  display: inline;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: rgba(0,0,0,0);
  border: 0;
}

.markdown-body .csv-data td,
.markdown-body .csv-data th {
  padding: 5px;
  overflow: hidden;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  white-space: nowrap;
}

.markdown-body .csv-data .blob-num {
  padding: 10px var(--base-size-8) 9px;
  text-align: right;
  background: var(--bgColor-default);
  border: 0;
}

.markdown-body .csv-data tr {
  border-top: 0;
}

.markdown-body .csv-data th {
  font-weight: var(--base-text-weight-semibold, 600);
  background: var(--bgColor-muted);
  border-top: 0;
}

.markdown-body [data-footnote-ref]::before {
  content: "[";
}

.markdown-body [data-footnote-ref]::after {
  content: "]";
}

.markdown-body .footnotes {
  font-size: 12px;
  color: var(--fgColor-muted);
  border-top: 1px solid var(--borderColor-default);
}

.markdown-body .footnotes ol {
  padding-left: var(--base-size-16);
}

.markdown-body .footnotes ol ul {
  display: inline-block;
  padding-left: var(--base-size-16);
  margin-top: var(--base-size-16);
}

.markdown-body .footnotes li {
  position: relative;
}

.markdown-body .footnotes li:target::before {
  position: absolute;
  top: calc(var(--base-size-8)*-1);
  right: calc(var(--base-size-8)*-1);
  bottom: calc(var(--base-size-8)*-1);
  left: calc(var(--base-size-24)*-1);
  pointer-events: none;
  content: "";
  border: 2px solid var(--borderColor-accent-emphasis);
  border-radius: 6px;
}

.markdown-body .footnotes li:target {
  color: var(--fgColor-default);
}

.markdown-body .footnotes .data-footnote-backref g-emoji {
  font-family: monospace;
}

.markdown-body .pl-c {
  color: var(--color-prettylights-syntax-comment);
}

.markdown-body .pl-c1,
.markdown-body .pl-s .pl-v {
  color: var(--color-prettylights-syntax-constant);
}

.markdown-body .pl-e,
.markdown-body .pl-en {
  color: var(--color-prettylights-syntax-entity);
}

.markdown-body .pl-smi,
.markdown-body .pl-s .pl-s1 {
  color: var(--color-prettylights-syntax-storage-modifier-import);
}

.markdown-body .pl-ent {
  color: var(--color-prettylights-syntax-entity-tag);
}

.markdown-body .pl-k {
  color: var(--color-prettylights-syntax-keyword);
}

.markdown-body .pl-s,
.markdown-body .pl-pds,
.markdown-body .pl-s .pl-pse .pl-s1,
.markdown-body .pl-sr,
.markdown-body .pl-sr .pl-cce,
.markdown-body .pl-sr .pl-sre,
.markdown-body .pl-sr .pl-sra {
  color: var(--color-prettylights-syntax-string);
}

.markdown-body .pl-v,
.markdown-body .pl-smw {
  color: var(--color-prettylights-syntax-variable);
}

.markdown-body .pl-bu {
  color: var(--color-prettylights-syntax-brackethighlighter-unmatched);
}

.markdown-body .pl-ii {
  color: var(--color-prettylights-syntax-invalid-illegal-text);
  background-color: var(--color-prettylights-syntax-invalid-illegal-bg);
}

.markdown-body .pl-c2 {
  color: var(--color-prettylights-syntax-carriage-return-text);
  background-color: var(--color-prettylights-syntax-carriage-return-bg);
}

.markdown-body .pl-sr .pl-cce {
  font-weight: bold;
  color: var(--color-prettylights-syntax-string-regexp);
}

.markdown-body .pl-ml {
  color: var(--color-prettylights-syntax-markup-list);
}

.markdown-body .pl-mh,
.markdown-body .pl-mh .pl-en,
.markdown-body .pl-ms {
  font-weight: bold;
  color: var(--color-prettylights-syntax-markup-heading);
}

.markdown-body .pl-mi {
  font-style: italic;
  color: var(--color-prettylights-syntax-markup-italic);
}

.markdown-body .pl-mb {
  font-weight: bold;
  color: var(--color-prettylights-syntax-markup-bold);
}

.markdown-body .pl-md {
  color: var(--color-prettylights-syntax-markup-deleted-text);
  background-color: var(--color-prettylights-syntax-markup-deleted-bg);
}

.markdown-body .pl-mi1 {
  color: var(--color-prettylights-syntax-markup-inserted-text);
  background-color: var(--color-prettylights-syntax-markup-inserted-bg);
}

.markdown-body .pl-mc {
  color: var(--color-prettylights-syntax-markup-changed-text);
  background-color: var(--color-prettylights-syntax-markup-changed-bg);
}

.markdown-body .pl-mi2 {
  color: var(--color-prettylights-syntax-markup-ignored-text);
  background-color: var(--color-prettylights-syntax-markup-ignored-bg);
}

.markdown-body .pl-mdr {
  font-weight: bold;
  color: var(--color-prettylights-syntax-meta-diff-range);
}

.markdown-body .pl-ba {
  color: var(--color-prettylights-syntax-brackethighlighter-angle);
}

.markdown-body .pl-sg {
  color: var(--color-prettylights-syntax-sublimelinter-gutter-mark);
}

.markdown-body .pl-corl {
  text-decoration: underline;
  color: var(--color-prettylights-syntax-constant-other-reference-link);
}

.markdown-body [role=button]:focus:not(:focus-visible),
.markdown-body [role=tabpanel][tabindex="0"]:focus:not(:focus-visible),
.markdown-body button:focus:not(:focus-visible),
.markdown-body summary:focus:not(:focus-visible),
.markdown-body a:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}

.markdown-body [tabindex="0"]:focus:not(:focus-visible),
.markdown-body details-dialog:focus:not(:focus-visible) {
  outline: none;
}

.markdown-body g-emoji {
  display: inline-block;
  min-width: 1ch;
  font-family: "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 1em;
  font-style: normal !important;
  font-weight: var(--base-text-weight-normal, 400);
  line-height: 1;
  vertical-align: -0.075em;
}

.markdown-body g-emoji img {
  width: 1em;
  height: 1em;
}

.markdown-body a:has(>p,>div,>pre,>blockquote) {
  display: block;
}

.markdown-body a:has(>p,>div,>pre,>blockquote):not(:has(.snippet-clipboard-content,>pre)) {
  width: fit-content;
}

.markdown-body a:has(>p,>div,>pre,>blockquote):has(.snippet-clipboard-content,>pre):focus-visible {
  outline: 2px solid var(--focus-outlineColor);
  outline-offset: 2px;
}

.markdown-body .task-list-item {
  list-style-type: none;
}

.markdown-body .task-list-item label {
  font-weight: var(--base-text-weight-normal, 400);
}

.markdown-body .task-list-item.enabled label {
  cursor: pointer;
}

.markdown-body .task-list-item+.task-list-item {
  margin-top: var(--base-size-4);
}

.markdown-body .task-list-item .handle {
  display: none;
}

.markdown-body .task-list-item-checkbox {
  margin: 0 .2em .25em -1.4em;
  vertical-align: middle;
}

.markdown-body ul:dir(rtl) .task-list-item-checkbox {
  margin: 0 -1.6em .25em .2em;
}

.markdown-body ol:dir(rtl) .task-list-item-checkbox {
  margin: 0 -1.6em .25em .2em;
}

.markdown-body .contains-task-list:hover .task-list-item-convert-container,
.markdown-body .contains-task-list:focus-within .task-list-item-convert-container {
  display: block;
  width: auto;
  height: 24px;
  overflow: visible;
  clip-path: none;
}

.markdown-body ::-webkit-calendar-picker-indicator {
  filter: invert(50%);
}

.markdown-body .markdown-alert {
  padding: var(--base-size-8) var(--base-size-16);
  margin-bottom: var(--base-size-16);
  color: inherit;
  border-left: .25em solid var(--borderColor-default);
}

.markdown-body .markdown-alert>:first-child {
  margin-top: 0;
}

.markdown-body .markdown-alert>:last-child {
  margin-bottom: 0;
}

.markdown-body .markdown-alert .markdown-alert-title {
  display: flex;
  font-weight: var(--base-text-weight-medium, 500);
  align-items: center;
  line-height: 1;
}

.markdown-body .markdown-alert.markdown-alert-note {
  border-left-color: var(--borderColor-accent-emphasis);
}

.markdown-body .markdown-alert.markdown-alert-note .markdown-alert-title {
  color: var(--fgColor-accent);
}

.markdown-body .markdown-alert.markdown-alert-important {
  border-left-color: var(--borderColor-done-emphasis);
}

.markdown-body .markdown-alert.markdown-alert-important .markdown-alert-title {
  color: var(--fgColor-done);
}

.markdown-body .markdown-alert.markdown-alert-warning {
  border-left-color: var(--borderColor-attention-emphasis);
}

.markdown-body .markdown-alert.markdown-alert-warning .markdown-alert-title {
  color: var(--fgColor-attention);
}

.markdown-body .markdown-alert.markdown-alert-tip {
  border-left-color: var(--borderColor-success-emphasis);
}

.markdown-body .markdown-alert.markdown-alert-tip .markdown-alert-title {
  color: var(--fgColor-success);
}

.markdown-body .markdown-alert.markdown-alert-caution {
  border-left-color: var(--borderColor-danger-emphasis);
}

.markdown-body .markdown-alert.markdown-alert-caution .markdown-alert-title {
  color: var(--fgColor-danger);
}

.markdown-body>*:first-child>.heading-element:first-child {
  margin-top: 0 !important;
}

.markdown-body .highlight pre:has(+.zeroclipboard-container) {
  min-height: 52px;
}
`,u0=`.markdown-body {
  /* light */
  color-scheme: light;
  --fgColor-danger: #d1242f;
  --bgColor-attention-muted: #fff8c5;
  --bgColor-muted: #f6f8fa;
  --bgColor-neutral-muted: #818b981f;
  --borderColor-accent-emphasis: #0969da;
  --borderColor-attention-emphasis: #9a6700;
  --borderColor-danger-emphasis: #cf222e;
  --borderColor-default: #d1d9e0;
  --borderColor-done-emphasis: #8250df;
  --borderColor-success-emphasis: #1a7f37;
  --color-prettylights-syntax-brackethighlighter-angle: #59636e;
  --color-prettylights-syntax-brackethighlighter-unmatched: #82071e;
  --color-prettylights-syntax-carriage-return-bg: #cf222e;
  --color-prettylights-syntax-carriage-return-text: #f6f8fa;
  --color-prettylights-syntax-comment: #59636e;
  --color-prettylights-syntax-constant: #0550ae;
  --color-prettylights-syntax-constant-other-reference-link: #0a3069;
  --color-prettylights-syntax-entity: #6639ba;
  --color-prettylights-syntax-entity-tag: #0550ae;
  --color-prettylights-syntax-invalid-illegal-text: var(--fgColor-danger);
  --color-prettylights-syntax-keyword: #cf222e;
  --color-prettylights-syntax-markup-changed-bg: #ffd8b5;
  --color-prettylights-syntax-markup-changed-text: #953800;
  --color-prettylights-syntax-markup-deleted-bg: #ffebe9;
  --color-prettylights-syntax-markup-deleted-text: #82071e;
  --color-prettylights-syntax-markup-heading: #0550ae;
  --color-prettylights-syntax-markup-ignored-bg: #0550ae;
  --color-prettylights-syntax-markup-ignored-text: #d1d9e0;
  --color-prettylights-syntax-markup-inserted-bg: #dafbe1;
  --color-prettylights-syntax-markup-inserted-text: #116329;
  --color-prettylights-syntax-markup-list: #3b2300;
  --color-prettylights-syntax-meta-diff-range: #8250df;
  --color-prettylights-syntax-string: #0a3069;
  --color-prettylights-syntax-string-regexp: #116329;
  --color-prettylights-syntax-sublimelinter-gutter-mark: #818b98;
  --color-prettylights-syntax-variable: #953800;
  --fgColor-accent: #0969da;
  --fgColor-attention: #9a6700;
  --fgColor-done: #8250df;
  --fgColor-muted: #59636e;
  --fgColor-success: #1a7f37;
  --bgColor-default: #ffffff;
  --borderColor-muted: #d1d9e0b3;
  --color-prettylights-syntax-invalid-illegal-bg: var(--bgColor-danger-muted);
  --color-prettylights-syntax-markup-bold: #1f2328;
  --color-prettylights-syntax-markup-italic: #1f2328;
  --color-prettylights-syntax-storage-modifier-import: #1f2328;
  --fgColor-default: #1f2328;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,i0=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --fgColor-accent: #4493f8;
  --bgColor-attention-muted: #bb800926;
  --bgColor-default: #0d1117;
  --bgColor-muted: #151b23;
  --bgColor-neutral-muted: #656c7633;
  --borderColor-accent-emphasis: #1f6feb;
  --borderColor-attention-emphasis: #9e6a03;
  --borderColor-danger-emphasis: #da3633;
  --borderColor-default: #3d444d;
  --borderColor-done-emphasis: #8957e5;
  --borderColor-success-emphasis: #238636;
  --color-prettylights-syntax-brackethighlighter-angle: #9198a1;
  --color-prettylights-syntax-brackethighlighter-unmatched: #f85149;
  --color-prettylights-syntax-carriage-return-bg: #b62324;
  --color-prettylights-syntax-carriage-return-text: #f0f6fc;
  --color-prettylights-syntax-comment: #9198a1;
  --color-prettylights-syntax-constant: #79c0ff;
  --color-prettylights-syntax-constant-other-reference-link: #a5d6ff;
  --color-prettylights-syntax-entity: #d2a8ff;
  --color-prettylights-syntax-entity-tag: #7ee787;
  --color-prettylights-syntax-keyword: #ff7b72;
  --color-prettylights-syntax-markup-bold: #f0f6fc;
  --color-prettylights-syntax-markup-changed-bg: #5a1e02;
  --color-prettylights-syntax-markup-changed-text: #ffdfb6;
  --color-prettylights-syntax-markup-deleted-bg: #67060c;
  --color-prettylights-syntax-markup-deleted-text: #ffdcd7;
  --color-prettylights-syntax-markup-heading: #1f6feb;
  --color-prettylights-syntax-markup-ignored-bg: #1158c7;
  --color-prettylights-syntax-markup-ignored-text: #f0f6fc;
  --color-prettylights-syntax-markup-inserted-bg: #033a16;
  --color-prettylights-syntax-markup-inserted-text: #aff5b4;
  --color-prettylights-syntax-markup-italic: #f0f6fc;
  --color-prettylights-syntax-markup-list: #f2cc60;
  --color-prettylights-syntax-meta-diff-range: #d2a8ff;
  --color-prettylights-syntax-storage-modifier-import: #f0f6fc;
  --color-prettylights-syntax-string: #a5d6ff;
  --color-prettylights-syntax-string-regexp: #7ee787;
  --color-prettylights-syntax-sublimelinter-gutter-mark: #3d444d;
  --color-prettylights-syntax-variable: #ffa657;
  --fgColor-attention: #d29922;
  --fgColor-danger: #f85149;
  --fgColor-default: #f0f6fc;
  --fgColor-done: #ab7df8;
  --fgColor-muted: #9198a1;
  --fgColor-success: #3fb950;
  --borderColor-muted: #3d444db3;
  --color-prettylights-syntax-invalid-illegal-bg: var(--bgColor-danger-muted);
  --color-prettylights-syntax-invalid-illegal-text: var(--fgColor-danger);
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,a0=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #ffc60015;
  --bgColor-default: #193549;
  --bgColor-muted: #1f4662;
  --bgColor-neutral-muted: #e1efff1f;
  --borderColor-accent-emphasis: #ffc600;
  --borderColor-attention-emphasis: #e0a225;
  --borderColor-danger-emphasis: #f44747;
  --borderColor-default: #2a5070;
  --borderColor-done-emphasis: #a87ff0;
  --borderColor-success-emphasis: #3ad900;
  --fgColor-accent: #ffc600;
  --fgColor-attention: #e0a225;
  --fgColor-danger: #f44747;
  --fgColor-default: #e1efff;
  --fgColor-done: #b99bf0;
  --fgColor-muted: #7ca4bf;
  --fgColor-success: #3ad900;
  --borderColor-muted: #2a507080;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,c0=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #f1fa8c15;
  --bgColor-default: #282a36;
  --bgColor-muted: #21222c;
  --bgColor-neutral-muted: #f8f8f21a;
  --borderColor-accent-emphasis: #bd93f9;
  --borderColor-attention-emphasis: #f1fa8c;
  --borderColor-danger-emphasis: #ff5555;
  --borderColor-default: #44475a;
  --borderColor-done-emphasis: #bd93f9;
  --borderColor-success-emphasis: #50fa7b;
  --fgColor-accent: #bd93f9;
  --fgColor-attention: #f1fa8c;
  --fgColor-danger: #ff5555;
  --fgColor-default: #f8f8f2;
  --fgColor-done: #bd93f9;
  --fgColor-muted: #6272a4;
  --fgColor-success: #50fa7b;
  --borderColor-muted: #44475ab3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,l0=`.markdown-body {
  /* light */
  color-scheme: light;
  --bgColor-attention-muted: #fff8c5;
  --bgColor-default: #ffffff;
  --bgColor-muted: #f2f2f7;
  --bgColor-neutral-muted: #0000000d;
  --borderColor-accent-emphasis: #007aff;
  --borderColor-attention-emphasis: #9a6700;
  --borderColor-danger-emphasis: #d1242f;
  --borderColor-default: #d1d1d6;
  --borderColor-done-emphasis: #8250df;
  --borderColor-success-emphasis: #1a7f37;
  --fgColor-accent: #007aff;
  --fgColor-attention: #9a6700;
  --fgColor-danger: #d1242f;
  --fgColor-default: #000000;
  --fgColor-done: #8250df;
  --fgColor-muted: #8e8e93;
  --fgColor-success: #1a7f37;
  --borderColor-muted: #d1d1d6b3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,s0=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #bb800926;
  --bgColor-default: #1e1e1e;
  --bgColor-muted: #2c2c2e;
  --bgColor-neutral-muted: #ffffff1a;
  --borderColor-accent-emphasis: #007aff;
  --borderColor-attention-emphasis: #9e6a03;
  --borderColor-danger-emphasis: #da3633;
  --borderColor-default: #3a3a3c;
  --borderColor-done-emphasis: #8957e5;
  --borderColor-success-emphasis: #238636;
  --fgColor-accent: #007aff;
  --fgColor-attention: #d29922;
  --fgColor-danger: #f85149;
  --fgColor-default: #d1d1d6;
  --fgColor-done: #ab7df8;
  --fgColor-muted: #8e8e93;
  --fgColor-success: #3fb950;
  --borderColor-muted: #3a3a3cb3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,d0=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #ecc48d1a;
  --bgColor-default: #011627;
  --bgColor-muted: #0b2942;
  --bgColor-neutral-muted: #d6deeb1a;
  --borderColor-accent-emphasis: #82b1ff;
  --borderColor-attention-emphasis: #ecc48d;
  --borderColor-danger-emphasis: #ef5350;
  --borderColor-default: #1d3b53;
  --borderColor-done-emphasis: #c792ea;
  --borderColor-success-emphasis: #22da6e;
  --fgColor-accent: #82b1ff;
  --fgColor-attention: #ecc48d;
  --fgColor-danger: #ef5350;
  --fgColor-default: #d6deeb;
  --fgColor-done: #c792ea;
  --fgColor-muted: #637777;
  --fgColor-success: #22da6e;
  --borderColor-muted: #1d3b5380;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,f0=`.markdown-body {
  /* light */
  color-scheme: light;
  --bgColor-attention-muted: #ea9d341a;
  --bgColor-default: #faf4ed;
  --bgColor-muted: #f2e9de;
  --bgColor-neutral-muted: #5752791a;
  --borderColor-accent-emphasis: #56949f;
  --borderColor-attention-emphasis: #ea9d34;
  --borderColor-danger-emphasis: #b4637a;
  --borderColor-default: #cecacd;
  --borderColor-done-emphasis: #907aa9;
  --borderColor-success-emphasis: #286983;
  --fgColor-accent: #56949f;
  --fgColor-attention: #ea9d34;
  --fgColor-danger: #b4637a;
  --fgColor-default: #575279;
  --fgColor-done: #907aa9;
  --fgColor-muted: #9893a5;
  --fgColor-success: #286983;
  --borderColor-muted: #cecacdb3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,h0=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #f6c1771a;
  --bgColor-default: #191724;
  --bgColor-muted: #1f1d2e;
  --bgColor-neutral-muted: #e0def41a;
  --borderColor-accent-emphasis: #9ccfd8;
  --borderColor-attention-emphasis: #f6c177;
  --borderColor-danger-emphasis: #eb6f92;
  --borderColor-default: #403d52;
  --borderColor-done-emphasis: #c4a7e7;
  --borderColor-success-emphasis: #31748f;
  --fgColor-accent: #9ccfd8;
  --fgColor-attention: #f6c177;
  --fgColor-danger: #eb6f92;
  --fgColor-default: #e0def4;
  --fgColor-done: #c4a7e7;
  --fgColor-muted: #6e6a86;
  --fgColor-success: #31748f;
  --borderColor-muted: #403d5280;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,p0=`.markdown-body {
  /* light */
  color-scheme: light;
  --bgColor-attention-muted: #b5890026;
  --bgColor-default: #fdf6e3;
  --bgColor-muted: #eee8d5;
  --bgColor-neutral-muted: #586e751a;
  --borderColor-accent-emphasis: #268bd2;
  --borderColor-attention-emphasis: #b58900;
  --borderColor-danger-emphasis: #dc322f;
  --borderColor-default: #d5cec3;
  --borderColor-done-emphasis: #6c71c4;
  --borderColor-success-emphasis: #859900;
  --fgColor-accent: #268bd2;
  --fgColor-attention: #b58900;
  --fgColor-danger: #dc322f;
  --fgColor-default: #586e75;
  --fgColor-done: #6c71c4;
  --fgColor-muted: #93a1a1;
  --fgColor-success: #859900;
  --borderColor-muted: #d5cec3b3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,m0=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #b5890026;
  --bgColor-default: #002b36;
  --bgColor-muted: #073642;
  --bgColor-neutral-muted: #93a1a11a;
  --borderColor-accent-emphasis: #268bd2;
  --borderColor-attention-emphasis: #b58900;
  --borderColor-danger-emphasis: #dc322f;
  --borderColor-default: #2a4f5c;
  --borderColor-done-emphasis: #6c71c4;
  --borderColor-success-emphasis: #859900;
  --fgColor-accent: #268bd2;
  --fgColor-attention: #b58900;
  --fgColor-danger: #dc322f;
  --fgColor-default: #93a1a1;
  --fgColor-done: #6c71c4;
  --fgColor-muted: #657b83;
  --fgColor-success: #859900;
  --borderColor-muted: #2a4f5c80;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,b0=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #f4eee41a;
  --bgColor-default: #252335;
  --bgColor-muted: #2b2640;
  --bgColor-neutral-muted: #f0eff11a;
  --borderColor-accent-emphasis: #f92aad;
  --borderColor-attention-emphasis: #f4eee4;
  --borderColor-danger-emphasis: #f97e72;
  --borderColor-default: #443f5c;
  --borderColor-done-emphasis: #c792ea;
  --borderColor-success-emphasis: #72f1b8;
  --fgColor-accent: #f92aad;
  --fgColor-attention: #f4eee4;
  --fgColor-danger: #f97e72;
  --fgColor-default: #f0eff1;
  --fgColor-done: #c792ea;
  --fgColor-muted: #848bbd;
  --fgColor-success: #72f1b8;
  --borderColor-muted: #443f5c80;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,g0=`.markdown-body {
  /* light */
  color-scheme: light;
  --bgColor-attention-muted: #df86181a;
  --bgColor-default: #ffffff;
  --bgColor-muted: #f0f4f8;
  --bgColor-neutral-muted: #3e3e3e0d;
  --borderColor-accent-emphasis: #034c7c;
  --borderColor-attention-emphasis: #df8618;
  --borderColor-danger-emphasis: #d1242f;
  --borderColor-default: #cee1f0;
  --borderColor-done-emphasis: #6c36a9;
  --borderColor-success-emphasis: #357b42;
  --fgColor-accent: #034c7c;
  --fgColor-attention: #df8618;
  --fgColor-danger: #d1242f;
  --fgColor-default: #3e3e3e;
  --fgColor-done: #6c36a9;
  --fgColor-muted: #828282;
  --fgColor-success: #357b42;
  --borderColor-muted: #cee1f0b3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,k0=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #f7ecb51a;
  --bgColor-default: #282822;
  --bgColor-muted: #1e1e1a;
  --bgColor-neutral-muted: #ffffff1a;
  --borderColor-accent-emphasis: #5abeb0;
  --borderColor-attention-emphasis: #f7ecb5;
  --borderColor-danger-emphasis: #da3633;
  --borderColor-default: #3b3a32;
  --borderColor-done-emphasis: #d29ffc;
  --borderColor-success-emphasis: #8dec95;
  --fgColor-accent: #5abeb0;
  --fgColor-attention: #f7ecb5;
  --fgColor-danger: #f85149;
  --fgColor-default: #ffffff;
  --fgColor-done: #d29ffc;
  --fgColor-muted: #999999;
  --fgColor-success: #8dec95;
  --borderColor-muted: #3b3a3280;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,y0=`.markdown-body {
  /* light */
  color-scheme: light;
  --bgColor-attention-muted: #fff8c5;
  --bgColor-default: #ffffff;
  --bgColor-muted: #f2f2f7;
  --bgColor-neutral-muted: #0000000d;
  --borderColor-accent-emphasis: #0b4f79;
  --borderColor-attention-emphasis: #815f03;
  --borderColor-danger-emphasis: #c41a16;
  --borderColor-default: #d1d1d6;
  --borderColor-done-emphasis: #6c36a9;
  --borderColor-success-emphasis: #326d74;
  --fgColor-accent: #0b4f79;
  --fgColor-attention: #815f03;
  --fgColor-danger: #c41a16;
  --fgColor-default: #000000;
  --fgColor-done: #6c36a9;
  --fgColor-muted: #5d6c79;
  --fgColor-success: #326d74;
  --borderColor-muted: #d1d1d6b3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,x0=`.markdown-body {
  /* dark */
  color-scheme: dark;
  --bgColor-attention-muted: #d0bf691a;
  --bgColor-default: #1f1f24;
  --bgColor-muted: #2c2c31;
  --bgColor-neutral-muted: #ffffff1a;
  --borderColor-accent-emphasis: #5dd8ff;
  --borderColor-attention-emphasis: #d0bf69;
  --borderColor-danger-emphasis: #fc6a5d;
  --borderColor-default: #3a3a3f;
  --borderColor-done-emphasis: #a167e6;
  --borderColor-success-emphasis: #67b7a4;
  --fgColor-accent: #5dd8ff;
  --fgColor-attention: #d0bf69;
  --fgColor-danger: #fc6a5d;
  --fgColor-default: #ffffffd9;
  --fgColor-done: #a167e6;
  --fgColor-muted: #6c7986;
  --fgColor-success: #67b7a4;
  --borderColor-muted: #3a3a3fb3;
  --focus-outlineColor: var(--borderColor-accent-emphasis);
  --borderColor-neutral-muted: var(--borderColor-muted);
}
`,w0=`.markdown-alert {
  padding: 0.5rem 1rem;
  margin-bottom: 16px;
  color: inherit;
  border-left: .25em solid #888;
}

.markdown-alert>:first-child {
  margin-top: 0
}

.markdown-alert>:last-child {
  margin-bottom: 0
}

.markdown-alert .markdown-alert-title {
  display: flex;
  font-weight: 500;
  align-items: center;
  line-height: 1
}

.markdown-alert .markdown-alert-title .octicon {
  margin-right: 0.5rem;
  display: inline-block;
  overflow: visible !important;
  vertical-align: text-bottom;
  fill: currentColor;
}

.markdown-alert.markdown-alert-note {
  border-left-color: var(--color-note);
}

.markdown-alert.markdown-alert-note .markdown-alert-title {
  color: var(--color-note);
}

.markdown-alert.markdown-alert-important {
  border-left-color: var(--color-important);
}

.markdown-alert.markdown-alert-important .markdown-alert-title {
  color: var(--color-important);
}

.markdown-alert.markdown-alert-warning {
  border-left-color: var(--color-warning);
}

.markdown-alert.markdown-alert-warning .markdown-alert-title {
  color: var(--color-warning);
}

.markdown-alert.markdown-alert-tip {
  border-left-color: var(--color-tip);
}

.markdown-alert.markdown-alert-tip .markdown-alert-title {
  color: var(--color-tip);
}

.markdown-alert.markdown-alert-caution {
  border-left-color: var(--color-caution);
}

.markdown-alert.markdown-alert-caution .markdown-alert-title {
  color: var(--color-caution);
}
`,v0=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,C0=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,_0=`.code-copy-wrapper {
  position: relative;
}

.code-copy-button {
  position: absolute;
  top: 6px;
  right: 6px;
  opacity: 0;
  transition: opacity 0.2s, background 0.2s;
  border: 1px solid var(--borderColor-default, ButtonBorder);
  border-radius: 8px;
  padding: 6px 7px;
  background: var(--bgColor-muted, Canvas);
  color: var(--fgColor-muted, GrayText);

  /* Prevent elements from moving during opacity changes in Safari */
  will-change: opacity, background;
}

.code-copy-button:hover {
  background: var(--bgColor-neutral-muted, ButtonFace);
}

.code-copy-button:active {
  background: var(--borderColor-default, ButtonBorder);
}
`,ht={github:{light:u0,dark:i0},cobalt:{dark:a0},dracula:{dark:c0},minimal:{light:l0,dark:s0},"night-owl":{dark:d0},"rose-pine":{light:f0,dark:h0},solarized:{light:p0,dark:m0},synthwave84:{dark:b0},"winter-is-coming":{light:g0,dark:k0},xcode:{light:y0,dark:x0}};function E0(e="auto"){if(Di)return"";const n=ht[St]??ht.github,t=n.light??n.dark,r=n.dark??n.light,o=ko(t)??"#ffffff",u=ko(r)??"#0d1117";return[".markdown-body { padding: 25px; }",...Xr(e,`body { background: ${o}; }`,`body { background: ${u}; }`)].join(`
`)}function Ti(e="auto"){if(Di)return[`:root { color-scheme: ${e==="auto"?"light dark":e}; }`,"body, .markdown-body { background: Canvas; color: CanvasText; }"].join(`
`);const n=ht[St]??ht.github,t=n.light??n.dark,r=n.dark??n.light;return[o0,...Xr(e,t,r)].join(`
`)}function Fi(e="auto"){return[w0,...Xr(e,v0,C0)].join(`
`)}function Mi(){return _0}function Xr(e,n,t){const r=[];switch(e){case"light":r.push(n);break;case"dark":r.push(t);break;case"auto":r.push(`
        ${n}
        @media (prefers-color-scheme: dark) {
          ${t}
        }`);break}return r}const A0={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Edit Mode",sideBySideMode:"Side-by-Side Mode",previewMode:"Preview Mode",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",printRendered:"Print Rendered…",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",untitled:"Untitled",update:"Update",version:"Version",checkReleases:"Check Releases",updateAndRelaunch:"Update and Relaunch",newVersionAvailable:"is available!",viewReleasePage:"View Release Page",remindMeLater:"Remind Me Later",skipThisVersion:"Skip This Version",failedToUpdate:"Failed to update. Please try again later.",source:"Source",preview:"Preview"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"编辑模式",sideBySideMode:"并排模式",previewMode:"预览模式",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",printRendered:"打印渲染…",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",untitled:"未命名",update:"更新",version:"版本",checkReleases:"查看版本",updateAndRelaunch:"更新并重新启动",newVersionAvailable:"已发布！",viewReleasePage:"查看发布页面",remindMeLater:"稍后提醒我",skipThisVersion:"跳过这个版本",failedToUpdate:"更新失败，请稍后再试。",source:"源码",preview:"预览"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",printRendered:"列印渲染…",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",editMode:"編輯模式",sideBySideMode:"並排模式",previewMode:"預覽模式",untitled:"未命名",update:"更新",version:"版本",checkReleases:"檢視版本",updateAndRelaunch:"更新並重新啟動",newVersionAvailable:"已釋出！",viewReleasePage:"檢視釋出頁面",remindMeLater:"稍後提醒我",skipThisVersion:"跳過這個版本",failedToUpdate:"更新失敗，請稍後再試。",source:"原始碼",preview:"預覽"}};function G(e){return D0[e]}const S0=["default","zh-CN","zh-TW"],D0=A0[(()=>{const e=navigator.language;return S0.includes(e)?e:"default"})()];function eo(){return typeof P.MarkEdit.addExtension=="function"}async function no(e,n=!0){return await M0,me.render(e,{lineInfo:n})}function Ii(e){e()}async function Ri(e){const n=r=>`<style>
${r}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,n(E0(gr)),n(Ti(gr)),n(Fi(gr)),n(Mi()),"</body></html>"].join(`
`)}const me=de(t0,{html:!0,breaks:!0,linkify:!0,...r0}),T0=[];me.use(Ks());me.use(on);me.use(ys,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});me.use(Ds);me.use(Ms,{enabled:eo(),label:!0});me.use(Rs);const F0=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),M0=Promise.all(T0).then(()=>{for(const e of F0){const n=me.renderer.rules[e];me.renderer.rules[e]=(t,r,o,u,c)=>{const a=t[r];return u.lineInfo&&a.map?.length===2&&(a.attrSet("data-line-from",String(a.map[0])),a.attrSet("data-line-to",String(a.map[1]-1))),n?n(t,r,o,u,c):c.renderToken(t,r,o)}}for(const e of["fence","code_block"]){const n=me.renderer.rules[e];me.renderer.rules[e]=(t,r,o,u,c)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${n===void 0?c.renderToken(t,r,o):n(t,r,o,u,c)}
        <button title="${G("copyCode")}" aria-label="${G("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),I0=new DOMParser,R0="image-loader",to="cm-md-image-preview",bu=5;function Li(e){const n=I0.parseFromString(e,"text/html");return n.querySelectorAll("img").forEach(r=>{const o=r.getAttribute("src");o!==null&&(o.includes("://")||o.startsWith("data:image/")||(r.src=`${R0}://${o}`))}),n.body.innerHTML}function L0(e){typeof P.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",n=>{Be.panelPresenter!==void 0&&(clearTimeout(Be.panelPresenter),Be.panelPresenter=void 0),Be.panelPresenter=setTimeout(()=>{const t=n.target,r=t?.closest(".cm-md-link"),o=r?.dataset.linkUrl??r?.innerText??"";r!==null&&Sa(o)?N0(r,o):t?.classList.contains(to)||Sn()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Sn(!1)}),e.addEventListener("scroll",()=>Sn()))}async function N0(e,n){if(e===Be.focusedElement)return;const t=(await P.MarkEdit.getFileInfo())?.parentPath;if(t===void 0)return;const r=rn(t,n),o=await P.MarkEdit.getFileObject(r);if(o===void 0)return;const u=e.getBoundingClientRect(),c=document.createElement("img");c.className=to,c.style.position="fixed",c.style.left=`${u.left}px`,c.style.zIndex="10000",c.style.borderRadius="5px",c.style.opacity="0",c.style.transition="opacity 120ms",c.style.cursor="pointer",c.onclick=()=>{Sn(),window.open(n,"_blank")},c.onload=()=>{const l=Math.min(c.naturalHeight,240);c.style.height=`${l}px`;const d=u.top,f=window.innerHeight-u.bottom;d>f?c.style.top=`${u.top-l-bu}px`:c.style.top=`${u.bottom+bu}px`,requestAnimationFrame(()=>{c.style.opacity="1"})};const a=o.mimeType??"image/png";c.src=`data:${a};base64,${o.data}`,Sn(!1),Be.focusedElement=e,document.body.appendChild(c)}function Sn(e=!0){Be.focusedElement!==void 0&&(Be.focusedElement=void 0,document.querySelectorAll(`.${to}`).forEach(n=>{e?(n.style.opacity="0",n.addEventListener("transitionend",()=>n.remove(),{once:!0})):n.remove()}))}const Be={panelPresenter:void 0,focusedElement:void 0};let On=null,Mr=null;function ro(){On=null,Mr=null}function Ni(e){On===null&&(On=Array.from(e.querySelectorAll("[data-line-from]")).map(n=>({from:parseInt(n.dataset.lineFrom??"0",10),to:parseInt(n.dataset.lineTo??"0",10),el:n,top:lt(e,n)})))}function O0(e){return On===null&&Ni(e),On??[]}function B0(e){return Mr??=parseFloat(getComputedStyle(e).paddingTop)||0,Mr}let pt=null,kr;function gu(e){pt=e,kr!==void 0&&clearTimeout(kr),kr=setTimeout(()=>{pt=null},150)}function P0(e,n){if(!Xs)return;let t,r;e.addEventListener("scroll",()=>{pt!=="preview"&&(_f()||(t!==void 0&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{gu("editor"),Ir(e,n,!1)})))},{passive:!0}),n.addEventListener("scroll",()=>{pt!=="editor"&&(r!==void 0&&cancelAnimationFrame(r),r=requestAnimationFrame(()=>{gu("preview"),z0(n,e)}))},{passive:!0})}function Ir(e,n,t=!0){const{line:r,progress:o}=q0(e);$0(n,r,o,t)}function z0(e,n){const t=O0(e);if(t.length===0)return;const r=e.scrollTop,o=B0(e);let u=0,c=t.length-1,a,l=0;for(;u<=c;){const x=u+c>>>1,v=t[x].top-o;if(v+t[x].el.offsetHeight<=r)u=x+1;else if(x>0&&t[x-1].top-o+t[x-1].el.offsetHeight>r)c=x-1;else{a=t[x],l=Dt((r-v)/t[x].el.offsetHeight);break}}if(a===void 0)return;const{from:d,to:f}=a,s=d+Math.round(l*Math.max(0,f-d)),p=P.MarkEdit.editorView,m=Math.max(1,Math.min(p.state.doc.lines,s+1)),b=p.state.doc.line(m),g=p.lineBlockAt(b.from),k=g.top+g.height*(l%1);n.scrollTo({top:k,behavior:"instant"})}function q0(e,n=0){const t=P.MarkEdit.editorView,r=t.lineBlockAtHeight(e.scrollTop+n),o=t.state.doc.lineAt(r.from).number-1,u=r.height>0?Dt((e.scrollTop-r.top)/r.height):0;return{line:o,progress:u}}function $0(e,n,t,r=!0){if(n===0&&t===0)return at(e,0,r);const o=Array.from(document.querySelectorAll("[data-line-from]")),u=H0(o,n);if(u!==void 0){const{from:l,to:d}=an(u);return Pt(e,u,U0(n,t,l,d),r)}if(n===0)return at(e,0,r);const{beforeBlock:c,afterBlock:a}=j0(o,n);if(c!==void 0&&a!==void 0){const l=an(c),d=an(a),f=lt(e,c)+c.offsetHeight,s=lt(e,a),p=d.from-l.to,m=n-l.to+t,b=p>0?Dt(m/p):0;return at(e,f+(s-f)*b,r)}if(c!==void 0)return Pt(e,c,1,r);if(a!==void 0)return Pt(e,a,0,r)}function H0(e,n){let t=0,r=e.length-1;for(;t<=r;){const o=t+r>>>1,{from:u,to:c}=an(e[o]);if(n<u)r=o-1;else if(n>c)t=o+1;else return e[o]}}function j0(e,n){let t,r;for(const o of e){const{from:u,to:c}=an(o);if(c<n)t=o;else if(u>n){r=o;break}}return{beforeBlock:t,afterBlock:r}}function U0(e,n,t,r){const o=r-t;return o<1?e===t?n:0:Dt((e-t+n)/o)}function Dt(e){return Math.max(0,Math.min(1,e))}function G0(e){const n=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return n===null?null:{offset:n[1].length,replacement:n[2]===" "?"x":" "}}function V0(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}function Rr(e,n){return Array(n+1).join(e)}function Oi(e){return e.replace(/^\n*/,"")}function Bi(e){for(var n=e.length;n>0&&e[n-1]===`
`;)n--;return e.substring(0,n)}function Pi(e){return Bi(Oi(e))}var K0=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function oo(e){return uo(e,K0)}var zi=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function qi(e){return uo(e,zi)}function Z0(e){return Hi(e,zi)}var $i=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function W0(e){return uo(e,$i)}function Y0(e){return Hi(e,$i)}function uo(e,n){return n.indexOf(e.nodeName)>=0}function Hi(e,n){return e.getElementsByTagName&&n.some(function(t){return e.getElementsByTagName(t).length})}var J0=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function ji(e){return J0.reduce(function(n,t){return n.replace(t[0],t[1])},e)}var re={};re.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};re.lineBreak={filter:"br",replacement:function(e,n,t){return t.br+`
`}};re.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,n,t){var r=Number(n.nodeName.charAt(1));if(t.headingStyle==="setext"&&r<3){var o=Rr(r===1?"=":"-",e.length);return`

`+e+`
`+o+`

`}else return`

`+Rr("#",r)+" "+e+`

`}};re.blockquote={filter:"blockquote",replacement:function(e){return e=Pi(e).replace(/^/gm,"> "),`

`+e+`

`}};re.list={filter:["ul","ol"],replacement:function(e,n){var t=n.parentNode;return t.nodeName==="LI"&&t.lastElementChild===n?`
`+e:`

`+e+`

`}};re.listItem={filter:"li",replacement:function(e,n,t){var r=t.bulletListMarker+"   ",o=n.parentNode;if(o.nodeName==="OL"){var u=o.getAttribute("start"),c=Array.prototype.indexOf.call(o.children,n);r=(u?Number(u)+c:c+1)+".  "}var a=/\n$/.test(e);return e=Pi(e)+(a?`
`:""),e=e.replace(/\n/gm,`
`+" ".repeat(r.length)),r+e+(n.nextSibling?`
`:"")}};re.indentedCodeBlock={filter:function(e,n){return n.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,n,t){return`

    `+n.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};re.fencedCodeBlock={filter:function(e,n){return n.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,n,t){for(var r=n.firstChild.getAttribute("class")||"",o=(r.match(/language-(\S+)/)||[null,""])[1],u=n.firstChild.textContent,c=t.fence.charAt(0),a=3,l=new RegExp("^"+c+"{3,}","gm"),d;d=l.exec(u);)d[0].length>=a&&(a=d[0].length+1);var f=Rr(c,a);return`

`+f+o+`
`+u.replace(/\n$/,"")+`
`+f+`

`}};re.horizontalRule={filter:"hr",replacement:function(e,n,t){return`

`+t.hr+`

`}};re.inlineLink={filter:function(e,n){return n.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,n){var t=io(n.getAttribute("href")),r=ao(mt(n.getAttribute("title"))),o=r?' "'+r+'"':"";return"["+e+"]("+t+o+")"}};re.referenceLink={filter:function(e,n){return n.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,n,t){var r=io(n.getAttribute("href")),o=mt(n.getAttribute("title"));o&&(o=' "'+ao(o)+'"');var u,c;switch(t.linkReferenceStyle){case"collapsed":u="["+e+"][]",c="["+e+"]: "+r+o;break;case"shortcut":u="["+e+"]",c="["+e+"]: "+r+o;break;default:var a=this.references.length+1;u="["+e+"]["+a+"]",c="["+a+"]: "+r+o}return this.references.push(c),u},references:[],append:function(e){var n="";return this.references.length&&(n=`

`+this.references.join(`
`)+`

`,this.references=[]),n}};re.emphasis={filter:["em","i"],replacement:function(e,n,t){return e.trim()?t.emDelimiter+e+t.emDelimiter:""}};re.strong={filter:["strong","b"],replacement:function(e,n,t){return e.trim()?t.strongDelimiter+e+t.strongDelimiter:""}};re.code={filter:function(e){var n=e.previousSibling||e.nextSibling,t=e.parentNode.nodeName==="PRE"&&!n;return e.nodeName==="CODE"&&!t},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var n=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",t="`",r=e.match(/`+/gm)||[];r.indexOf(t)!==-1;)t=t+"`";return t+n+e+n+t}};re.image={filter:"img",replacement:function(e,n){var t=ji(mt(n.getAttribute("alt"))),r=io(n.getAttribute("src")||""),o=mt(n.getAttribute("title")),u=o?' "'+ao(o)+'"':"";return r?"!["+t+"]("+r+u+")":""}};function mt(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}function io(e){var n=e.replace(/([<>()])/g,"\\$1");return n.indexOf(" ")>=0?"<"+n+">":n}function ao(e){return e.replace(/"/g,'\\"')}function Ui(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var n in e.rules)this.array.push(e.rules[n])}Ui.prototype={add:function(e,n){this.array.unshift(n)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var n;return(n=yr(this.array,e,this.options))||(n=yr(this._keep,e,this.options))||(n=yr(this._remove,e,this.options))?n:this.defaultRule},forEach:function(e){for(var n=0;n<this.array.length;n++)e(this.array[n],n)}};function yr(e,n,t){for(var r=0;r<e.length;r++){var o=e[r];if(Q0(o,n,t))return o}}function Q0(e,n,t){var r=e.filter;if(typeof r=="string"){if(r===n.nodeName.toLowerCase())return!0}else if(Array.isArray(r)){if(r.indexOf(n.nodeName.toLowerCase())>-1)return!0}else if(typeof r=="function"){if(r.call(e,n,t))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function X0(e){var n=e.element,t=e.isBlock,r=e.isVoid,o=e.isPre||function(s){return s.nodeName==="PRE"};if(!(!n.firstChild||o(n))){for(var u=null,c=!1,a=null,l=ku(a,n,o);l!==n;){if(l.nodeType===3||l.nodeType===4){var d=l.data.replace(/[ \r\n\t]+/g," ");if((!u||/ $/.test(u.data))&&!c&&d[0]===" "&&(d=d.substr(1)),!d){l=xr(l);continue}l.data=d,u=l}else if(l.nodeType===1)t(l)||l.nodeName==="BR"?(u&&(u.data=u.data.replace(/ $/,"")),u=null,c=!1):r(l)||o(l)?(u=null,c=!0):u&&(c=!1);else{l=xr(l);continue}var f=ku(a,l,o);a=l,l=f}u&&(u.data=u.data.replace(/ $/,""),u.data||xr(u))}}function xr(e){var n=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),n}function ku(e,n,t){return e&&e.parentNode===n||t(n)?n.nextSibling||n.parentNode:n.firstChild||n.nextSibling||n.parentNode}var co=typeof window<"u"?window:{};function ed(){var e=co.DOMParser,n=!1;try{new e().parseFromString("","text/html")&&(n=!0)}catch{}return n}function nd(){var e=function(){};return td()?e.prototype.parseFromString=function(n){var t=new window.ActiveXObject("htmlfile");return t.designMode="on",t.open(),t.write(n),t.close(),t}:e.prototype.parseFromString=function(n){var t=document.implementation.createHTMLDocument("");return t.open(),t.write(n),t.close(),t},e}function td(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch{co.ActiveXObject&&(e=!0)}return e}var rd=ed()?co.DOMParser:nd();function od(e,n){var t;if(typeof e=="string"){var r=ud().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");t=r.getElementById("turndown-root")}else t=e.cloneNode(!0);return X0({element:t,isBlock:oo,isVoid:qi,isPre:n.preformattedCode?id:null}),t}var wr;function ud(){return wr=wr||new rd,wr}function id(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}function ad(e,n){return e.isBlock=oo(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=cd(e),e.flankingWhitespace=ld(e,n),e}function cd(e){return!qi(e)&&!W0(e)&&/^\s*$/i.test(e.textContent)&&!Z0(e)&&!Y0(e)}function ld(e,n){if(e.isBlock||n.preformattedCode&&e.isCode)return{leading:"",trailing:""};var t=sd(e.textContent);return t.leadingAscii&&yu("left",e,n)&&(t.leading=t.leadingNonAscii),t.trailingAscii&&yu("right",e,n)&&(t.trailing=t.trailingNonAscii),{leading:t.leading,trailing:t.trailing}}function sd(e){var n=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:n[1],leadingAscii:n[2],leadingNonAscii:n[3],trailing:n[4],trailingNonAscii:n[5],trailingAscii:n[6]}}function yu(e,n,t){var r,o,u;return e==="left"?(r=n.previousSibling,o=/ $/):(r=n.nextSibling,o=/^ /),r&&(r.nodeType===3?u=o.test(r.nodeValue):t.preformattedCode&&r.nodeName==="CODE"?u=!1:r.nodeType===1&&!oo(r)&&(u=o.test(r.textContent))),u}var dd=Array.prototype.reduce;function bt(e){if(!(this instanceof bt))return new bt(e);var n={rules:re,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(t,r){return r.isBlock?`

`:""},keepReplacement:function(t,r){return r.isBlock?`

`+r.outerHTML+`

`:r.outerHTML},defaultReplacement:function(t,r){return r.isBlock?`

`+t+`

`:t}};this.options=V0({},n,e),this.rules=new Ui(this.options)}bt.prototype={turndown:function(e){if(!pd(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var n=Gi.call(this,new od(e,this.options));return fd.call(this,n)},use:function(e){if(Array.isArray(e))for(var n=0;n<e.length;n++)this.use(e[n]);else if(typeof e=="function")e(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,n){return this.rules.add(e,n),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return ji(e)}};function Gi(e){var n=this;return dd.call(e.childNodes,function(t,r){r=new ad(r,n.options);var o="";return r.nodeType===3?o=r.isCode?r.nodeValue:n.escape(r.nodeValue):r.nodeType===1&&(o=hd.call(n,r)),Vi(t,o)},"")}function fd(e){var n=this;return this.rules.forEach(function(t){typeof t.append=="function"&&(e=Vi(e,t.append(n.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function hd(e){var n=this.rules.forNode(e),t=Gi.call(this,e),r=e.flankingWhitespace;return(r.leading||r.trailing)&&(t=t.trim()),r.leading+n.replacement(t,e,this.options)+r.trailing}function Vi(e,n){var t=Bi(e),r=Oi(n),o=Math.max(e.length-t.length,n.length-r.length),u=`

`.substring(0,o);return t+u+r}function pd(e){return e!=null&&(typeof e=="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}var xu=/highlight-(?:text|source)-([a-z0-9]+)/;function md(e){e.addRule("highlightedCodeBlock",{filter:function(n){var t=n.firstChild;return n.nodeName==="DIV"&&xu.test(n.className)&&t&&t.nodeName==="PRE"},replacement:function(n,t,r){var o=t.className||"",u=(o.match(xu)||[null,""])[1];return`

`+r.fence+u+`
`+t.firstChild.textContent+`
`+r.fence+`

`}})}function bd(e){e.addRule("strikethrough",{filter:["del","s","strike"],replacement:function(n){return"~"+n+"~"}})}var gd=Array.prototype.indexOf,kd=Array.prototype.every,hn={};hn.tableCell={filter:["th","td"],replacement:function(e,n){return Ki(e,n)}};hn.tableRow={filter:"tr",replacement:function(e,n){var t="",r={left:":--",right:"--:",center:":-:"};if(lo(n))for(var o=0;o<n.childNodes.length;o++){var u="---",c=(n.childNodes[o].getAttribute("align")||"").toLowerCase();c&&(u=r[c]||u),t+=Ki(u,n.childNodes[o])}return`
`+e+(t?`
`+t:"")}};hn.table={filter:function(e){return e.nodeName==="TABLE"&&lo(e.rows[0])},replacement:function(e){return e=e.replace(`

`,`
`),`

`+e+`

`}};hn.tableSection={filter:["thead","tbody","tfoot"],replacement:function(e){return e}};function lo(e){var n=e.parentNode;return n.nodeName==="THEAD"||n.firstChild===e&&(n.nodeName==="TABLE"||yd(n))&&kd.call(e.childNodes,function(t){return t.nodeName==="TH"})}function yd(e){var n=e.previousSibling;return e.nodeName==="TBODY"&&(!n||n.nodeName==="THEAD"&&/^\s*$/i.test(n.textContent))}function Ki(e,n){var t=gd.call(n.parentNode.childNodes,n),r=" ";return t===0&&(r="| "),r+e+" |"}function xd(e){e.keep(function(t){return t.nodeName==="TABLE"&&!lo(t.rows[0])});for(var n in hn)e.addRule(n,hn[n])}function wd(e){e.addRule("taskListItems",{filter:function(n){return n.type==="checkbox"&&n.parentNode.nodeName==="LI"},replacement:function(n,t){return(t.checked?"[x]":"[ ]")+" "}})}function vd(e){e.use([md,bd,xd,wd])}const Tt=[{id:"h1",label:"H1",title:"Heading 1",shortcut:{domKey:"1",cmKey:"Mod-1",display:"⌘1"}},{id:"h2",label:"H2",title:"Heading 2",shortcut:{domKey:"2",cmKey:"Mod-2",display:"⌘2"}},{id:"h3",label:"H3",title:"Heading 3",shortcut:{domKey:"3",cmKey:"Mod-3",display:"⌘3"}},{id:"sep1",label:"",title:"",isSep:!0},{id:"bold",label:"<b>B</b>",title:"Bold",shortcut:{domKey:"b",cmKey:"Mod-b",display:"⌘B"}},{id:"italic",label:"<i>I</i>",title:"Italic",shortcut:{domKey:"i",cmKey:"Mod-i",display:"⌘I"}},{id:"strike",label:"<s>S</s>",title:"Strikethrough",shortcut:{domKey:"x",cmKey:"Mod-Shift-x",shift:!0,display:"⇧⌘X"}},{id:"code",label:"&#x60;&#x60;",title:"Inline code",shortcut:{domKey:"e",cmKey:"Mod-e",display:"⌘E"}},{id:"codeblock",label:"&#x60;&#x60;&#x60;",title:"Code block",shortcut:{domKey:"c",cmKey:"Mod-Alt-c",alt:!0,display:"⌥⌘C"}},{id:"sep2",label:"",title:"",isSep:!0},{id:"blockquote",label:"&#8220;",title:"Blockquote",shortcut:{domKey:".",cmKey:"Mod-Shift-.",shift:!0,display:"⇧⌘."}},{id:"ul",label:"&bull;",title:"Unordered list",shortcut:{domKey:"8",cmKey:"Mod-Shift-8",shift:!0,display:"⇧⌘8"}},{id:"ol",label:"1.",title:"Ordered list",shortcut:{domKey:"7",cmKey:"Mod-Shift-7",shift:!0,display:"⇧⌘7"}},{id:"sep3",label:"",title:"",isSep:!0},{id:"link",label:"&#128279;",title:"Insert link",shortcut:{domKey:"k",cmKey:"Mod-k",display:"⌘K"}},{id:"image",label:"&#128247;",title:"Insert image",shortcut:{domKey:"k",cmKey:"Mod-Shift-k",shift:!0,display:"⇧⌘K"}},{id:"hr",label:"&#8212;",title:"Horizontal rule",shortcut:{domKey:"-",cmKey:"Mod-Shift--",shift:!0,display:"⇧⌘−"}},{id:"sep4",label:"",title:"",isSep:!0},{id:"alert",label:"&#9888;",title:"Alert / callout (always inserts a NOTE — edit the word to change type)",shortcut:{domKey:"a",cmKey:"Mod-Alt-a",alt:!0,display:"⌥⌘A"}},{id:"footnote",label:"[^]",title:"Insert footnote",shortcut:{domKey:"f",cmKey:"Mod-Alt-f",alt:!0,display:"⌥⌘F"}},{id:"sep5",label:"",title:"",isSep:!0},{id:"math",label:"&#8721;x",title:"Insert math (KaTeX)"},{id:"mermaid",label:"&#9096;",title:"Insert diagram (Mermaid)"}];function Cd(e,n){return(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===n.domKey&&e.shiftKey===(n.shift??!1)&&e.altKey===(n.alt??!1)}let vr;function Zi(e,n){return vr?.finish(void 0),new Promise(t=>{let r=!1;const o=document.createElement("div");o.className="formatting-picker-popover",o.setAttribute("role","dialog");const u=e.getBoundingClientRect();o.style.position="fixed",o.style.top=`${u.bottom+6}px`,o.style.left=`${u.left}px`;function c(f){r||(r=!0,vr=void 0,o.remove(),document.removeEventListener("keydown",a,!0),document.removeEventListener("mousedown",l,!0),t(f))}function a(f){f.key==="Escape"&&(f.preventDefault(),c(void 0))}function l(f){o.contains(f.target)||c(void 0)}vr={finish:c},n(o,c,()=>c(void 0)),document.body.appendChild(o);const d=o.getBoundingClientRect();d.right>window.innerWidth&&(o.style.left=`${Math.max(0,window.innerWidth-d.width-8)}px`),d.bottom>window.innerHeight&&(o.style.top=`${Math.max(0,u.top-d.height-6)}px`),document.addEventListener("keydown",a,!0),requestAnimationFrame(()=>document.addEventListener("mousedown",l,!0))})}function _d(e,n){const t=document.createElement("div");t.className=e,t.setAttribute("role","toolbar"),t.setAttribute("aria-label","Formatting toolbar");for(const r of Tt){if(r.isSep===!0){const c=document.createElement("span");c.className="wysiwyg-sep",c.setAttribute("aria-hidden","true"),t.appendChild(c);continue}const o=n[r.id];if(o===void 0)continue;const u=document.createElement("button");u.className="wysiwyg-btn",u.dataset.id=r.id,u.title=r.shortcut!==void 0?`${r.title} (${r.shortcut.display})`:r.title,u.innerHTML=r.label,u.type="button",u.addEventListener("mousedown",c=>{c.preventDefault(),o()}),t.appendChild(u)}return t}function Wi(e){return document.querySelector(`.unified-toolbar [data-id="${e}"]`)}const Ed=["NOTE","TIP","IMPORTANT","WARNING","CAUTION"],Ad={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'};function Sd(e){return e.charAt(0)+e.slice(1).toLowerCase()}async function Yi(){const e=Wi("alert")??document.body;return Zi(e,(n,t,r)=>{n.classList.add("alert-picker-popover");for(const u of Ed){const c=u.toLowerCase(),a=document.createElement("button");a.type="button",a.className="alert-picker-option",a.innerHTML=`
        <div class="markdown-alert markdown-alert-${c} alert-picker-preview">
          <p class="markdown-alert-title">${Ad[c]}${Sd(u)}</p>
        </div>
      `,a.addEventListener("mousedown",l=>{l.preventDefault(),t(u)}),n.appendChild(a)}const o=document.createElement("button");o.type="button",o.className="alert-picker-cancel",o.textContent="Cancel",o.addEventListener("mousedown",u=>{u.preventDefault(),r()}),n.appendChild(o)})}async function Ji(e,n){const t=Wi(e)??document.body;return Zi(t,(r,o,u)=>{r.classList.add("menu-picker-popover");for(const a of n){const l=document.createElement("button");l.type="button",l.className="menu-picker-option",l.dataset.id=a.id;const d=document.createElement("span");if(d.className="menu-picker-label",d.textContent=a.label,l.appendChild(d),a.hint!==void 0){const f=document.createElement("span");f.className="menu-picker-hint",f.textContent=a.hint,l.appendChild(f)}l.addEventListener("mousedown",f=>{f.preventDefault(),o(a.id)}),r.appendChild(l)}const c=document.createElement("button");c.type="button",c.className="menu-picker-cancel",c.textContent="Cancel",c.addEventListener("mousedown",a=>{a.preventDefault(),u()}),r.appendChild(c)})}const wu=[{id:"inline",label:"Inline math",latex:"a^2 + b^2 = c^2",display:!1},{id:"display",label:"Display math",latex:"a^2 + b^2 = c^2",display:!0},{id:"fraction",label:"Fraction",latex:"\\frac{a}{b}",display:!0},{id:"sqrt",label:"Square root",latex:"\\sqrt{x}",display:!0},{id:"sum",label:"Summation",latex:"\\sum_{i=1}^{n} i",display:!0},{id:"integral",label:"Integral",latex:"\\int_{a}^{b} f(x)\\,dx",display:!0},{id:"matrix",label:"Matrix",latex:"\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",display:!0}],vu=[{id:"flowchart",label:"Flowchart",code:["graph TD","  A[Start] --> B{Decision}","  B -->|Yes| C[OK]","  B -->|No| D[Stop]"].join(`
`)},{id:"sequence",label:"Sequence",code:["sequenceDiagram","  Alice->>Bob: Hello Bob","  Bob-->>Alice: Hi Alice"].join(`
`)},{id:"class",label:"Class",code:["classDiagram","  class Animal {","    +String name","    +eat()","  }","  Animal <|-- Dog"].join(`
`)},{id:"state",label:"State",code:["stateDiagram-v2","  [*] --> Idle","  Idle --> Running: start","  Running --> [*]: stop"].join(`
`)},{id:"er",label:"Entity relationship",code:["erDiagram","  CUSTOMER ||--o{ ORDER : places","  ORDER ||--|{ LINE_ITEM : contains"].join(`
`)},{id:"gantt",label:"Gantt",code:["gantt","  title Project","  dateFormat YYYY-MM-DD","  section Phase","  Task A :a1, 2026-01-01, 7d"].join(`
`)},{id:"pie",label:"Pie chart",code:["pie title Share",'  "A" : 40','  "B" : 35','  "C" : 25'].join(`
`)}];function Qi(e,n){return n?`$$${e}$$`:`$${e}$`}async function Xi(){const e=wu.map(t=>({id:t.id,label:t.label,hint:Qi(t.latex,t.display)})),n=await Ji("math",e);if(n!==void 0)return wu.find(t=>t.id===n)}async function ea(){const e=vu.map(t=>({id:t.id,label:t.label})),n=await Ji("mermaid",e);if(n!==void 0)return vu.find(t=>t.id===n)}function un(e,n,t=n){return e.changeByRange(r=>{const{from:o,to:u}=r,c=e.doc,a=c.sliceString(Math.max(0,o-n.length),o),l=c.sliceString(u,Math.min(c.length,u+t.length));return a===n&&l===t?{changes:[{from:o-n.length,to:o,insert:""},{from:u,to:u+t.length,insert:""}],range:oe.EditorSelection.range(o-n.length,u-n.length)}:{changes:[{from:o,to:o,insert:n},{from:u,to:u,insert:t}],range:o===u?oe.EditorSelection.cursor(o+n.length):oe.EditorSelection.range(o+n.length,u+n.length)}})}function Cr(e,n){const t="#".repeat(n)+" ";return e.changeByRange(r=>{const o=e.doc.lineAt(r.head),u=o.text.startsWith(t),c=o.text.replace(/^#{1,6}\s+/,""),a=u?c:t+c;return{changes:{from:o.from,to:o.to,insert:a},range:oe.EditorSelection.cursor(o.from+a.length)}})}function Dd(e){return e.changeByRange(n=>{const{from:t,to:r}=n,o=e.doc.sliceString(t,r)||"code block",u="```\n";return{changes:{from:t,to:r,insert:u+o+"\n```"},range:oe.EditorSelection.range(t+u.length,t+u.length+o.length)}})}function Td(e,n="NOTE"){return e.changeByRange(t=>{const r=e.doc,o=r.lineAt(t.from),u=r.lineAt(t.to),c=[];for(let f=o.number;f<=u.number;f++)c.push(r.line(f));const a=c.filter(f=>f.text.trim()!==""),l=a.length>0?a.map(f=>`> ${f.text}`).join(`
`):"> ",d=`> [!${n}]
${l}`;return{changes:{from:o.from,to:u.to,insert:d},range:oe.EditorSelection.cursor(o.from+d.length)}})}function na(e){const n=new Set;for(const r of e.matchAll(/\[\^(\d+)\]/g))n.add(Number(r[1]));let t=1;for(;n.has(t);)t++;return t}function Fd(e){let n=na(e.doc.toString());const t=e.doc.length,r=t>0?e.doc.sliceString(t-1,t):"",o=r!==""&&r!==`
`;return e.changeByRange(u=>{const c=n++,a=`[^${c}]`,l=`${o?`

`:""}[^${c}]: `;return{changes:[{from:u.from,to:u.to,insert:a},{from:t,to:t,insert:l}],range:oe.EditorSelection.cursor(u.from+a.length)}})}function Md(e,n,t){return e.changeByRange(r=>{const{from:o,to:u}=r,c=e.doc.sliceString(o,u)||n;if(!t){const p=`$${c}$`;return{changes:{from:o,to:u,insert:p},range:oe.EditorSelection.range(o+1,o+1+c.length)}}const a=e.doc.lineAt(o),d=a.text.slice(0,o-a.from).trim()!==""?`

`:"",f=`${d}$$
${c}
$$
`,s=o+d.length+3;return{changes:{from:o,to:u,insert:f},range:oe.EditorSelection.range(s,s+c.length)}})}function Id(e,n){return e.changeByRange(t=>{const{from:r,to:o}=t,u=e.doc.sliceString(r,o)||n,c=e.doc.lineAt(r),l=c.text.slice(0,r-c.from).trim()!==""?`

`:"",d=`${l}\`\`\`mermaid
${u}
\`\`\`
`,f=r+l.length+11;return{changes:{from:r,to:o,insert:d},range:oe.EditorSelection.range(f,f+u.length)}})}function Rd(e){return e.changeByRange(n=>{const{from:t,to:r}=n,c=(e.doc.lineAt(t).text.trim()!==""?`

`:"")+`---

`;return{changes:{from:t,to:r,insert:c},range:oe.EditorSelection.cursor(t+c.length)}})}function Ld(e){return so(e,()=>"> ",/^>\s?/)}function Nd(e){return so(e,()=>"- ",/^[-*+]\s+/)}function Od(e){return so(e,n=>`${n+1}. `,/^\d+[.)]\s+/)}function so(e,n,t){return e.changeByRange(r=>{const o=e.doc,u=o.lineAt(r.from),c=o.lineAt(r.to),a=[];for(let p=u.number;p<=c.number;p++)a.push(o.line(p));const l=a.filter(p=>p.text.trim()!==""),d=l.length>0&&l.every(p=>t.test(p.text)),f=l.map((p,m)=>{const b=p.text.replace(t,""),g=d?b:n(m)+b;return{from:p.from,to:p.to,insert:g}}),s=f.reduce((p,m)=>p+(m.insert.length-(m.to-m.from)),0);return{changes:f,range:oe.EditorSelection.range(u.from,c.to+s)}})}let ln;const ta={h1:()=>ut("h1"),h2:()=>ut("h2"),h3:()=>ut("h3"),bold:()=>Ve("bold"),italic:()=>Ve("italic"),strike:()=>Ve("strikeThrough"),code:zd,codeblock:qd,blockquote:()=>ut("blockquote"),ul:()=>Ve("insertUnorderedList"),ol:()=>Ve("insertOrderedList"),link:()=>{$d()},image:()=>{Hd()},hr:()=>Ve("insertHorizontalRule"),alert:()=>{jd()},footnote:Vd,math:()=>{Ud()},mermaid:()=>{Gd()}};function Bd(e){ln===void 0&&(ln=n=>{const t=Tt.find(o=>o.shortcut!==void 0&&Cd(n,o.shortcut));if(t===void 0)return;const r=ta[t.id];r!==void 0&&(n.preventDefault(),r())},e.addEventListener("keydown",ln))}function Pd(e){ln!==void 0&&(e.removeEventListener("keydown",ln),ln=void 0)}function Ve(e,n){document.execCommand(e,!1,n),De()}function ut(e){document.execCommand("formatBlock",!1,e),De()}function De(){document.querySelector(".markdown-body")?.dispatchEvent(new Event("input",{bubbles:!0}))}function gt(e){const n=document.createElement("span");return n.className="raw-markdown",n.textContent=e,n}function zd(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0),t=document.createElement("code");t.textContent=n.toString()||"code",n.deleteContents(),n.insertNode(t),n.setStartAfter(t),n.collapse(!0),e.removeAllRanges(),e.addRange(n),De()}function qd(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0),t=document.createElement("pre"),r=document.createElement("code");r.textContent=n.toString()||"code block",t.appendChild(r),n.deleteContents(),n.insertNode(t),n.setStartAfter(t),n.collapse(!0),e.removeAllRanges(),e.addRange(n),De()}async function $d(){const e=await P.MarkEdit.showTextBox({title:"Insert Link",placeholder:"https://example.com"});e===void 0||e.trim()===""||Ve("createLink",e.trim())}async function Hd(){const e=await P.MarkEdit.showTextBox({title:"Insert Image",placeholder:"https://example.com/image.png"});if(e===void 0||e.trim()==="")return;const n=window.getSelection();if(n===null||n.rangeCount===0)return;const t=n.getRangeAt(0),r=document.createElement("img");r.src=e.trim(),r.alt=t.toString()||"image",t.deleteContents(),t.insertNode(r),t.setStartAfter(r),t.collapse(!0),n.removeAllRanges(),n.addRange(t),De()}async function jd(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0).cloneRange(),t=await Yi();if(t===void 0)return;const r=n.toString()||"Useful information.",o=document.createElement("blockquote");o.appendChild(gt(`[!${t}]`)),o.appendChild(document.createElement("br")),o.appendChild(document.createTextNode(r)),n.deleteContents(),n.insertNode(o),n.setStartAfter(o),n.collapse(!0),e.removeAllRanges(),e.addRange(n),De()}async function Ud(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0).cloneRange(),t=await Xi();if(t===void 0)return;const r=n.toString()||t.latex,o=gt(Qi(r,t.display));n.deleteContents(),n.insertNode(o),n.setStartAfter(o),n.collapse(!0),e.removeAllRanges(),e.addRange(n),De()}async function Gd(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0).cloneRange(),t=await ea();if(t===void 0)return;const r=document.createElement("pre"),o=document.createElement("code");o.className="language-mermaid",o.textContent=n.toString()||t.code,r.appendChild(o),n.deleteContents(),n.insertNode(r),n.setStartAfter(r),n.collapse(!0),e.removeAllRanges(),e.addRange(n),De()}function Vd(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=document.querySelector(".markdown-body");if(n===null)return;const t=na(P.MarkEdit.editorAPI.getText()),r=e.getRangeAt(0);r.deleteContents();const o=gt(`[^${t}]`);r.insertNode(o);const u=document.createElement("p");u.appendChild(gt(`[^${t}]: `)),n.appendChild(u);const c=document.createRange();c.setStartAfter(o),c.collapse(!0),e.removeAllRanges(),e.addRange(c),De()}const fo=new oe.Compartment;function X(e,n){e.dispatch(n),e.focus()}function ra(e){return{h1:()=>X(e,Cr(e.state,1)),h2:()=>X(e,Cr(e.state,2)),h3:()=>X(e,Cr(e.state,3)),bold:()=>X(e,un(e.state,"**")),italic:()=>X(e,un(e.state,"*")),strike:()=>X(e,un(e.state,"~~")),code:()=>X(e,un(e.state,"`")),codeblock:()=>X(e,Dd(e.state)),blockquote:()=>X(e,Ld(e.state)),ul:()=>X(e,Nd(e.state)),ol:()=>X(e,Od(e.state)),link:()=>{Wd(e)},image:()=>{Yd(e)},hr:()=>X(e,Rd(e.state)),alert:()=>{Jd(e)},footnote:()=>X(e,Fd(e.state)),math:()=>{Kd(e)},mermaid:()=>{Zd(e)}}}async function Kd(e){const n=await Xi();n!==void 0&&X(e,Md(e.state,n.latex,n.display))}async function Zd(e){const n=await ea();n!==void 0&&X(e,Id(e.state,n.code))}async function Wd(e){const n=await P.MarkEdit.showTextBox({title:"Insert Link",placeholder:"https://example.com"});n===void 0||n.trim()===""||X(e,un(e.state,"[",`](${n.trim()})`))}async function Yd(e){const n=await P.MarkEdit.showTextBox({title:"Insert Image",placeholder:"https://example.com/image.png"});n===void 0||n.trim()===""||X(e,un(e.state,"![",`](${n.trim()})`))}async function Jd(e){const n=await Yi();n!==void 0&&X(e,Td(e.state,n))}const Qd=oe.Prec.highest(qr.keymap.of((()=>{const e=[];for(const n of Tt){if(n.shortcut===void 0)continue;const t=n.shortcut.cmKey;e.push({key:t,run:r=>(ra(r)[n.id](),!0)})}return e})()));function Xd(e){return()=>{const n=document.createElement("div");return n.style.height=`${e}px`,{top:!0,dom:n}}}function ef(){return[fo.of([]),Qd]}function nf(e,n){e.dispatch({effects:fo.reconfigure(qr.showPanel.of(Xd(n)))})}function tf(e){e.dispatch({effects:fo.reconfigure([])})}const oa="--markedit-toolbar-height",ua="markedit-unified-toolbar-active";let kt=null;function rf(){return P.MarkEdit.editorView.hasFocus}function of(){const e={};for(const n of Tt)n.isSep!==!0&&(e[n.id]=()=>{(rf()?ra(P.MarkEdit.editorView):ta)[n.id]?.()});return e}function ia(){return kt??=_d("unified-toolbar",of()),kt}function uf(){const e=ia();e.style.display="none",document.body.appendChild(e)}function af(){const e=ia();e.style.display="";const n=e.getBoundingClientRect().height;document.documentElement.style.setProperty(oa,`${n}px`),document.body.classList.add(ua),nf(P.MarkEdit.editorView,n)}function cf(){kt!==null&&(kt.style.display="none"),document.body.classList.remove(ua),document.documentElement.style.removeProperty(oa),tf(P.MarkEdit.editorView)}const ho=new bt({headingStyle:"atx",bulletListMarker:"-",codeBlockStyle:"fenced",fence:"```",emDelimiter:"*",strongDelimiter:"**",linkStyle:"inlined"});ho.use(vd);ho.addRule("rawMarkdown",{filter:e=>e.nodeName==="SPAN"&&e.classList.contains("raw-markdown"),replacement:(e,n)=>n.textContent??""});let Bn=!1,Ke;function po(){return Bn}function aa(){if(Bn)return;Bn=!0;const e=qe();e.contentEditable="true",e.spellcheck=!0,e.classList.add("wysiwyg-active"),e.addEventListener("input",ca),Bd(e),af(),ro(),e.focus()}function lf(){if(!Bn)return;Bn=!1,Ke!==void 0&&(clearTimeout(Ke),Ke=void 0),Lr(!1);const e=qe();e.contentEditable="false",e.classList.remove("wysiwyg-active"),e.removeEventListener("input",ca),Pd(e),cf(),ro(),Pn()}function ca(){Ke!==void 0&&clearTimeout(Ke),Lr(!0),Ke=setTimeout(()=>{Lr(!1),Ke=void 0},600),P.MarkEdit.editorAPI.setText(sf())}function sf(){const n=qe().cloneNode(!0);return n.querySelectorAll("[data-line-from],[data-line-to]").forEach(t=>{t.removeAttribute("data-line-from"),t.removeAttribute("data-line-to")}),ho.turndown(n.innerHTML)}const Ze={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body",updatePillClass:"markdown-update-pill"},Ft={viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"};var _r=function(e,n){return Number(e.slice(0,-1*n.length))},df=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:_r(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:_r(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:_r(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},la=function(e){return e.split(" ").map(df)},ff=function(e,n,t,r){t===void 0&&(t=0),r===void 0&&(r=!1);var o=r?e+1:e,u=n.slice(0,o).reduce(function(a,l){return a+l.numeric},0),c=t?e*t:0;return u+c},sa=function(e,n,t){return n.concat(t).map(function(r){return r.style[e]}).filter(function(r){return r!==void 0&&r!==""})},hf=function(e,n){return n.endsWith(e)?Number(n.slice(0,-1*e.length)):null},Cu=function(e){for(var n=0;n<e.length;n++)if(e[n].numeric>0)return n;return null},We=function(){return!1},pf=function(e,n,t){e.style[n]=t},Y=function(e,n,t){var r=e[n];return r!==void 0?r:t};function da(e){var n;return(n=[]).concat.apply(n,Array.from(e.ownerDocument.styleSheets).map(function(t){var r=[];try{r=Array.from(t.cssRules||[])}catch{}return r})).filter(function(t){var r=!1;try{r=e.matches(t.selectorText)}catch{}return r})}var mf="grid-template-columns",bf="grid-template-rows",ne=function(n,t,r){this.direction=n,this.element=t.element,this.track=t.track,n==="column"?(this.gridTemplateProp=mf,this.gridGapProp="grid-column-gap",this.cursor=Y(r,"columnCursor",Y(r,"cursor","col-resize")),this.snapOffset=Y(r,"columnSnapOffset",Y(r,"snapOffset",30)),this.dragInterval=Y(r,"columnDragInterval",Y(r,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=Y(r,"gridTemplateColumns")):n==="row"&&(this.gridTemplateProp=bf,this.gridGapProp="grid-row-gap",this.cursor=Y(r,"rowCursor",Y(r,"cursor","row-resize")),this.snapOffset=Y(r,"rowSnapOffset",Y(r,"snapOffset",30)),this.dragInterval=Y(r,"rowDragInterval",Y(r,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=Y(r,"gridTemplateRows")),this.onDragStart=Y(r,"onDragStart",We),this.onDragEnd=Y(r,"onDragEnd",We),this.onDrag=Y(r,"onDrag",We),this.writeStyle=Y(r,"writeStyle",pf),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=t.minSizeStart,this.minSizeEnd=t.minSizeEnd,t.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};ne.prototype.getDimensions=function(){var n=this.grid.getBoundingClientRect(),t=n.width,r=n.height,o=n.top,u=n.bottom,c=n.left,a=n.right;this.direction==="column"?(this.start=o,this.end=u,this.size=r):this.direction==="row"&&(this.start=c,this.end=a,this.size=t)};ne.prototype.getSizeAtTrack=function(n,t){return ff(n,this.computedPixels,this.computedGapPixels,t)};ne.prototype.getSizeOfTrack=function(n){return this.computedPixels[n].numeric};ne.prototype.getRawTracks=function(){var n=sa(this.gridTemplateProp,[this.grid],da(this.grid));if(!n.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return n[0]};ne.prototype.getGap=function(){var n=sa(this.gridGapProp,[this.grid],da(this.grid));return n.length?n[0]:null};ne.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};ne.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};ne.prototype.setTracks=function(n){this.tracks=n.split(" "),this.trackValues=la(n)};ne.prototype.setComputedTracks=function(n){this.computedTracks=n.split(" "),this.computedPixels=la(n)};ne.prototype.setGap=function(n){this.gap=n};ne.prototype.setComputedGap=function(n){this.computedGap=n,this.computedGapPixels=hf("px",this.computedGap)||0};ne.prototype.getMousePosition=function(n){return"touches"in n?n.touches[0][this.clientAxis]:n[this.clientAxis]};ne.prototype.startDragging=function(n){if(!("button"in n&&n.button!==0)){n.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=n.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var t=this.trackValues.filter(function(a){return a.type==="%"}),r=this.trackValues.filter(function(a){return a.type==="fr"});if(this.totalFrs=r.length,this.totalFrs){var o=Cu(r);o!==null&&(this.frToPixels=this.computedPixels[o].numeric/r[o].numeric)}if(t.length){var u=Cu(t);u!==null&&(this.percentageToPixels=this.computedPixels[u].numeric/t[u].numeric)}var c=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(n)-c,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",We),this.grid.addEventListener("dragstart",We),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};ne.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};ne.prototype.drag=function(n){var t=this.getMousePosition(n),r=this.getSizeOfTrack(this.track),o=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,u=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(r-this.dragStartOffset),c=o+this.snapOffset,a=u-this.snapOffset;t<c&&(t=o),t>a&&(t=u),t<o?t=o:t>u&&(t=u);var l=t-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,d=this.bTrackEnd-t+this.dragStartOffset-r-this.computedGapPixels;if(this.dragInterval>1){var f=Math.round(l/this.dragInterval)*this.dragInterval;d-=f-l,l=f}if(l<this.minSizeStart&&(l=this.minSizeStart),d<this.minSizeEnd&&(d=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=l+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var s=l/this.frToPixels;this.tracks[this.aTrack]=s+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var p=l/this.percentageToPixels;this.tracks[this.aTrack]=p+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=d+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var m=d/this.frToPixels;this.tracks[this.bTrack]=m+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var b=d/this.percentageToPixels;this.tracks[this.bTrack]=b+"%"}var g=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,g),this.onDrag(this.direction,this.track,g)};ne.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",We),this.grid.removeEventListener("dragstart",We),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};ne.prototype.destroy=function(n,t){n===void 0&&(n=!0),n||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),t&&t()):(this.needsDestroy=!0,t&&(this.destroyCb=t))};var _u=function(e,n,t){return n in e?e[n]:t},pn=function(e,n){return function(t){if(t.track<1)throw Error("Invalid track index: "+t.track+". Track must be between two other tracks.");var r=e==="column"?n.columnMinSizes||{}:n.rowMinSizes||{},o=e==="column"?"columnMinSize":"rowMinSize";return new ne(e,Object.assign({},{minSizeStart:_u(r,t.track-1,Y(n,o,Y(n,"minSize",0))),minSizeEnd:_u(r,t.track+1,Y(n,o,Y(n,"minSize",0)))},t),n)}},Ye=function(n){var t=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:n.columnGutters||[],rowGutters:n.rowGutters||[],columnMinSizes:n.columnMinSizes||{},rowMinSizes:n.rowMinSizes||{}},n),this.options.columnGutters.forEach(function(r){t.columnGutters[r.track]=pn("column",t.options)(r)}),this.options.rowGutters.forEach(function(r){t.rowGutters[r.track]=pn("row",t.options)(r)})};Ye.prototype.addColumnGutter=function(n,t){this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=pn("column",this.options)({element:n,track:t})};Ye.prototype.addRowGutter=function(n,t){this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=pn("row",this.options)({element:n,track:t})};Ye.prototype.removeColumnGutter=function(n,t){var r=this;t===void 0&&(t=!0),this.columnGutters[n]&&this.columnGutters[n].destroy(t,function(){delete r.columnGutters[n]})};Ye.prototype.removeRowGutter=function(n,t){var r=this;t===void 0&&(t=!0),this.rowGutters[n]&&this.rowGutters[n].destroy(t,function(){delete r.rowGutters[n]})};Ye.prototype.handleDragStart=function(n,t,r){t==="column"?(this.columnGutters[r]&&this.columnGutters[r].destroy(),this.columnGutters[r]=pn("column",this.options)({track:r}),this.columnGutters[r].startDragging(n)):t==="row"&&(this.rowGutters[r]&&this.rowGutters[r].destroy(),this.rowGutters[r]=pn("row",this.options)({track:r}),this.rowGutters[r].startDragging(n))};Ye.prototype.destroy=function(n){var t=this;n===void 0&&(n=!0),Object.keys(this.columnGutters).forEach(function(r){return t.columnGutters[r].destroy(n,function(){delete t.columnGutters[r]})}),Object.keys(this.rowGutters).forEach(function(r){return t.rowGutters[r].destroy(n,function(){delete t.rowGutters[r]})})};function gf(e){return new Ye(e)}const kf=`body .markdown-body details summary,
body .markdown-body .task-list-item.enabled label {
  cursor: default;
}

.cm-focused {
  outline: none !important;
}

.markdown-container {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5px 1fr;
}

.markdown-gutter {
  grid-row: 1/-1;
  grid-column: 2;
  cursor: col-resize;
  display: none;
  justify-content: center;
}

.markdown-divider {
  width: 1px;
  height: 100%;
  background: #e0e0e0;
}

.markdown-body {
  padding: 25px;
  overflow: scroll;
  display: none;
}

.markdown-body.overlay {
  position: absolute;
  inset: var(--markedit-content-inset, 0);
  display: block;
  z-index: 10000;
}

.markdown-container .markdown-gutter {
  display: flex;
}

.markdown-container .markdown-body {
  display: block;
}

.markdown-body .task-list-item-checkbox {
  width: 1.1em;
  height: 1.1em;
}

.markdown-update-pill {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 10000;
  padding: 4px 10px;
  border: none;
  border-radius: 999px;
  background-color: #0088ff;
  color: white;
  font-size: 11px;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  user-select: none;
  -webkit-user-select: none;
}

.markdown-update-pill:hover {
  filter: brightness(1.08);
}

.markdown-update-pill:active {
  filter: brightness(0.92);
}

@media (prefers-color-scheme: dark) {
  .markdown-divider {
    background: #2a2a2a;
  }

  .markdown-update-pill {
    background-color: #0091ff;
  }
}
`,yf=`/* ── Unified Formatting Toolbar ──────────────────────────────────────────────
   One toolbar spans the full window width, fixed above whichever pane(s) are
   visible — both in side-by-side mode, or the single visible pane in
   edit-only/preview-only mode. Each button routes to the source pane
   (CodeMirror) or preview pane (contentEditable) based on current focus; see
   unifiedToolbar.ts. Only rendered when WYSIWYG mode is active. */

.unified-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px 10px;
  z-index: 10001; /* above .markdown-body.overlay's 10000 */
  user-select: none;
  flex-wrap: wrap;
  background: var(--toolbar-bg, rgba(246, 246, 246, 0.94));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--toolbar-border, rgba(0,0,0,0.1));
}

.wysiwyg-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 26px;
  padding: 0 6px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: var(--toolbar-fg, #333);
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.1s;
}

.wysiwyg-btn:hover {
  background: var(--toolbar-hover, rgba(0,0,0,0.08));
}

.wysiwyg-btn:active {
  background: var(--toolbar-active, rgba(0,0,0,0.14));
}

.wysiwyg-sep {
  display: inline-block;
  width: 1px;
  height: 18px;
  margin: 0 4px;
  background: var(--toolbar-border, rgba(0,0,0,0.15));
  flex-shrink: 0;
}

/* Cursor cue that the preview is editable */
.markdown-body.wysiwyg-active {
  cursor: text;
  outline: none;
}

/* ── Space reservation ────────────────────────────────────────────────────────
   The toolbar is position:fixed, so it doesn't push anything down on its own.
   The source (CodeMirror) side reserves space via a CM6 panel (see
   sourceToolbar.ts's spacer); the preview side needs these two CSS overrides,
   one per way the pane can be positioned. --markedit-toolbar-height is set by
   unifiedToolbar.ts from the toolbar's own measured height. */
/* .markdown-container is a class on body itself (see view.ts's containerView),
 * not a descendant div — so this must be one compound selector on body, not
 * "body.X .markdown-container .Y" (that combinator never matches anything,
 * since .markdown-container and .markedit-unified-toolbar-active are the same
 * element). The 25px below must match .markdown-body's base padding in main.css. */
body.markedit-unified-toolbar-active.markdown-container .markdown-body {
  padding-top: calc(25px + var(--markedit-toolbar-height, 0px));
}

body.markedit-unified-toolbar-active .markdown-body.overlay {
  top: calc(var(--markedit-content-inset, 0px) + var(--markedit-toolbar-height, 0px));
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .unified-toolbar {
    --toolbar-bg: rgba(36, 36, 36, 0.94);
    --toolbar-border: rgba(255,255,255,0.1);
    --toolbar-fg: #ddd;
    --toolbar-hover: rgba(255,255,255,0.1);
    --toolbar-active: rgba(255,255,255,0.18);
  }
}
`,xf=`/* ── Picker popovers ──────────────────────────────────────────────────────────
   Shared chrome for anchored picker popovers (src/shared/pickerPopover.ts) —
   currently the alert-type picker, and the upcoming table-size picker. */

.formatting-picker-popover {
  z-index: 10002; /* above .unified-toolbar's 10001 */
  background: var(--toolbar-bg, rgba(246, 246, 246, 0.97));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--toolbar-border, rgba(0,0,0,0.1));
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  padding: 6px;
  min-width: 200px;
}

/* ── Alert-type picker ────────────────────────────────────────────────────── */

.alert-picker-option {
  display: block;
  width: 100%;
  border: none;
  background: transparent;
  padding: 3px;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
}

.alert-picker-option:hover,
.alert-picker-option:focus-visible {
  background: var(--toolbar-hover, rgba(0,0,0,0.08));
}

/* Scaled down for a compact list, but otherwise the real rendered markup —
 * same classes, same colors, same icons as the alert once it's inserted. */
.alert-picker-preview {
  margin-bottom: 0;
  padding: 0.35rem 0.6rem;
  pointer-events: none;
}

.alert-picker-preview .markdown-alert-title {
  font-size: 13px;
}

.alert-picker-cancel {
  display: block;
  width: 100%;
  border: none;
  background: transparent;
  margin-top: 4px;
  padding: 6px;
  border-radius: 6px;
  border-top: 1px solid var(--toolbar-border, rgba(0,0,0,0.1));
  color: var(--toolbar-fg, #333);
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  text-align: center;
}

.alert-picker-cancel:hover,
.alert-picker-cancel:focus-visible {
  background: var(--toolbar-hover, rgba(0,0,0,0.08));
}

/* ── Menu picker (math / mermaid templates) ───────────────────────────────── */

.menu-picker-option {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  border: none;
  background: transparent;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  color: var(--toolbar-fg, #333);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.menu-picker-option:hover,
.menu-picker-option:focus-visible {
  background: var(--toolbar-hover, rgba(0,0,0,0.08));
}

.menu-picker-label {
  font-size: 13px;
}

.menu-picker-hint {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  opacity: 0.55;
  white-space: nowrap;
}

.menu-picker-cancel {
  display: block;
  width: 100%;
  border: none;
  background: transparent;
  margin-top: 4px;
  padding: 6px;
  border-radius: 6px;
  border-top: 1px solid var(--toolbar-border, rgba(0,0,0,0.1));
  color: var(--toolbar-fg, #333);
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  text-align: center;
}

.menu-picker-cancel:hover,
.menu-picker-cancel:focus-visible {
  background: var(--toolbar-hover, rgba(0,0,0,0.08));
}

/* Dark mode — reuses the toolbar's own variables where they overlap. */
@media (prefers-color-scheme: dark) {
  .formatting-picker-popover {
    --toolbar-bg: rgba(36, 36, 36, 0.97);
    --toolbar-border: rgba(255,255,255,0.12);
    --toolbar-fg: #ddd;
    --toolbar-hover: rgba(255,255,255,0.1);
  }
}
`,yt=document.body,Dn=document.createElement("div"),Z=document.createElement("div"),Eu=Le("* { cursor: col-resize }",!1),fa=oe.Annotation.define();var se=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e))(se||{});function wf(){Le(kf),Le(Ti()),Le(Fi()),Le(Mi()),Le(yf),Le(xf);const e=document.createElement("div");e.className=Ze.dividerViewClass,Dn.appendChild(e),Dn.className=Ze.gutterViewClass,yt.appendChild(Dn),Z.className=Ze.previewPaneClass,yt.appendChild(Z),document.addEventListener("keydown",r=>{if(!r.metaKey||r.key!=="a")return;const o=P.MarkEdit.editorView?.contentDOM??document.querySelector(".cm-content");(Z.classList.contains("overlay")||document.activeElement!==o)&&(Aa(Z),r.preventDefault())}),new MutationObserver(Au).observe(Z,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{Au(),document.querySelector(".mermaid")!==null&&Pn()}),typeof P.MarkEdit.getFileInfo=="function"&&typeof P.MarkEdit.openFile=="function"&&Z.addEventListener("click",If),Z.addEventListener("click",Rf)}function Vn(e,n=!0){const t=le();Pe.viewMode=e,e!==t&&localStorage.setItem(Ft.viewModeCacheKey,String(e));const r=P.MarkEdit.editorView;e===0?r.focus():e===2&&r.contentDOM.blur(),e===1?(yt.classList.add(Ze.containerClass),Pe.splitter??=gf({columnGutters:[{track:1,element:Dn}],minSize:150,onDragStart:()=>Eu.disabled=!1,onDragEnd:()=>Eu.disabled=!0})):(yt.classList.remove(Ze.containerClass),Pe.splitter?.destroy(),Pe.splitter=void 0),e===2?Z.classList.add("overlay"):Z.classList.remove("overlay"),n&&Pn()}function vf(){const e=[0,...n0.map(r=>{switch(r){case"side-by-side":return 1;case"preview":return 2;default:return}}).filter(r=>r!==void 0)],n=e.indexOf(le()),t=n===-1?0:(n+1)%e.length;Vn(e[t])}function Cf(){const e=localStorage.getItem(Ft.viewModeCacheKey);if(e===null)return;const n=Number(e);le()!==n&&Vn(n,!0)}function le(){return Pe.viewMode}function Lr(e){Pe.wysiwygEditLock=e}function _f(){return Pe.wysiwygEditLock}async function Pn(){if(Pe.wysiwygEditLock||le()===0)return;const e=po()?Z.scrollTop:void 0,n=Li(await Mt());Z.innerHTML=n,ro(),requestAnimationFrame(()=>{Ni(Z),e!==void 0?Z.scrollTop=e:Ir(Nr(),Z,!1)}),Ii(()=>{e===void 0&&Ir(Nr(),qe(),!1);const t=localStorage.getItem(Ft.previewPageZoomKey);t!==null&&(Z.style.zoom=t)})}function Ef(e){if(le()===0||le()===1&&P.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;const n=Number(Z.style.zoom)||1,t=r=>String(Math.min(Math.max(r,.5),3));switch(e.key){case"-":Z.style.zoom=t(n-.1);break;case"=":Z.style.zoom=t(n+.1);break;case"0":Z.style.zoom="1";break;default:return}localStorage.setItem(Ft.previewPageZoomKey,Z.style.zoom),e.preventDefault(),e.stopPropagation()}function Af(){ha(!1)}async function Sf(){const n=(await mo(!0)).replace("</body>",'<script>window.addEventListener("load",()=>{window.print();});window.addEventListener("afterprint",()=>{window.close();});<\/script></body>'),o=P.MarkEdit.getDirectoryPath("home").replace(/\/Library\/Containers\/[^/]+\/Data\/?$/,"")+"/.markedit-print.html";if(!await P.MarkEdit.createFile({path:o,string:n,overwrites:!0})){await P.MarkEdit.showSavePanel({string:n,fileName:"print-rendered.html"});return}await P.MarkEdit.runService("Open URL","file://"+o)}function Df(){ha(!0)}async function Tf(){const e=await Mt(!1);await navigator.clipboard.writeText(e)}async function Ff(){const e=await Mt(!1),n=new ClipboardItem({"text/html":new Blob([e],{type:"text/html"}),"text/plain":new Blob([Z.innerText],{type:"text/plain"})});await navigator.clipboard.write([n])}function Nr(){return P.MarkEdit.editorView.scrollDOM}function qe(){return Z}async function mo(e){const n=await Mt(!1);return e?await Ri(n):`<meta charset="UTF-8">
${n}`}async function Mf(e,n){const t=await no(e,!1);return n?await Ri(t):`<meta charset="UTF-8">
${t}`}async function Mt(e=!0){const n=P.MarkEdit.editorAPI.getText();return await no(n,e)}function Au(){const e=getComputedStyle(Z).backgroundColor;Dn.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}async function ha(e){const n=await(async()=>{const r=await P.MarkEdit.getFileInfo();return r===void 0?`${G("untitled")}.html`:`${Ea(r.filePath)}.html`})(),t=await mo(e);P.MarkEdit.showSavePanel({fileName:n,string:t})}async function If(e){if(!(e.target instanceof Element))return;const n=e.target.closest("a");if(n===null)return;const t=n.getAttribute("href");if(!t?.startsWith("../"))return;const r=(await P.MarkEdit.getFileInfo())?.parentPath;if(r!==void 0){e.preventDefault(),e.stopPropagation();try{const o=rn(r,decodeURIComponent(t));await P.MarkEdit.openFile(o)}catch(o){console.error("Failed to open file:",o)}}}function Rf(e){const n=e.target;if(!(n instanceof HTMLInputElement)||!n.classList.contains("task-list-item-checkbox"))return;const t=n.closest("[data-line-from]");if(t===null){console.error("Failed to find task item block");return}const r=P.MarkEdit.editorAPI,o=r.getLineRange(an(t).from),u=G0(r.getText(o));if(u===null){n.checked=!n.checked,console.error("Failed to resolve task toggle");return}const c=o.from+u.offset;P.MarkEdit.editorView.dispatch({changes:{from:c,to:c+1,insert:u.replacement},annotations:fa.of(!0)})}const Pe={viewMode:0,splitter:void 0,wysiwygEditLock:!1};async function Or(){if(An==="never")return;const e=await pa();typeof e.tag_name=="string"&&e.name!=="1.10.2"&&(ga().has(e.name)||(An==="automatic"&&$r()?await bo(e.tag_name):An==="quiet"?(Br.pendingRelease=e,ma(e)):Nf(e)))}async function Lf(){const e=Date.now(),n=Number(localStorage.getItem(mn.lastCheckCacheKey)??"0");if(!(e-n<2592e5))try{await Or(),localStorage.setItem(mn.lastCheckCacheKey,String(e))}catch(t){console.error("Failed to check for updates:",t)}}async function pa(){return await(await fetch(mn.latestReleaseURL)).json()}async function bo(e){if(typeof __FILE_PATH__!="string")return console.error("Cannot download the latest build: unknown file path"),!1;try{const n=__FILE_PATH__,t="lite/",r=e===void 0?"main":`refs/tags/${encodeURIComponent(e)}`,o=`${mn.rawBaseURL}${r}/dist/${t}markedit-preview.js`,u=await fetch(o);if(!u.ok)return console.error(`Failed to download the latest build from ${o}`),!1;const c=await u.text();return await P.MarkEdit.createFile({path:n,string:c,overwrites:!0})}catch(n){return console.error("Failed to download the latest build:",n),!1}}function ma(e=Br.pendingRelease){if(e===void 0)return;const n=document.querySelector(`.${Ze.updatePillClass}`);if(n!==null){if(n.dataset.releaseName===e.name)return n;n.remove()}const t=document.createElement("button");return t.dataset.releaseName=e.name,t.className=Ze.updatePillClass,t.textContent=G("update"),t.style.display=le()===se.edit?"none":"",t.addEventListener("webkitmouseforcedown",r=>{r.preventDefault()}),t.addEventListener("click",()=>{const{title:r,actions:o}=ba(e,()=>{Br.pendingRelease=void 0,t.remove()}),[u,...c]=o,a=t.getBoundingClientRect(),l={x:a.left,y:a.bottom+10};P.MarkEdit.showContextMenu([{title:r},u,{separator:!0},...c],l)}),document.body.appendChild(t),t}async function Nf(e){const{title:n,actions:t}=ba(e),r=await P.MarkEdit.showAlert({title:n,message:e.body,buttons:t.map(o=>o.title)});t[r]?.action?.()}function ba(e,n=()=>{}){const t=`MarkEdit-preview ${e.name} ${G("newVersionAvailable")}`,r=[...$r()?[{title:G("updateAndRelaunch"),action:async()=>{await bo(e.tag_name)?P.MarkEdit.relaunchApp():P.MarkEdit.showAlert(G("failedToUpdate")),n()}}]:[],{title:G("viewReleasePage"),action:()=>{open(e.html_url),n()}},{title:G("remindMeLater"),action:n},{title:G("skipThisVersion"),action:()=>{const o=ga();o.add(e.name),localStorage.setItem(mn.skippedCacheKey,JSON.stringify([...o])),n()}}];return{title:t,actions:r}}function ga(){const e=localStorage.getItem(mn.skippedCacheKey);return new Set(JSON.parse(e??"[]"))}const mn={latestReleaseURL:"https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest",rawBaseURL:"https://raw.githubusercontent.com/MarkEdit-app/MarkEdit-preview/",lastCheckCacheKey:"updater.last-check-time",skippedCacheKey:"updater.skipped-versions"},Br={pendingRelease:void 0},Pr="markedit-preview",Su=`${Pr}.js`;function Of(e){const{destExists:n,bundleInfo:t,currentVersion:r}=e,o=t?.version===r,u=t?.fullBuild===!1;return!(n&&o&&u)}async function Bf(){try{const e=P.MarkEdit.getDirectoryPath("documents"),n=P.MarkEdit.getDirectoryPath("sharedContainer");if(e===void 0||n===void 0){console.error("Required directories are not accessible");return}const t=typeof __FILE_PATH__=="string"?__FILE_PATH__:rn(e,`scripts/${Su}`);if(await P.MarkEdit.getFileInfo(t)===void 0){console.error(`Source file not found at ${t}`);return}const o=t.split("/").pop()??Su,u=rn(n,"Shared/scripts"),c=rn(u,o),a=await P.MarkEdit.getFileInfo(c)!==void 0,l=rn(n,"Shared/metadata.json"),d=await Da(l),f=d[Pr];if(!Of({destExists:a,bundleInfo:f,currentVersion:"1.10.2"}))return;const s=await P.MarkEdit.getFileContent(t);if(s===void 0){console.error(`Failed to read content from ${t}`);return}await P.MarkEdit.createFile({path:u,isDirectory:!0}),await P.MarkEdit.createFile({path:c,string:s,overwrites:!0}),await P.MarkEdit.createFile({path:l,string:JSON.stringify({...d,[Pr]:{version:"1.10.2",fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error("Failed to copy the current file to shared container:",e)}}const Pf='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>',zf='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>';function qf(){const e=Du(G("source"),Pf),n=Du(G("preview"),zf),t=document.createElement("div");t.className="quicklook-segmented",t.setAttribute("role","tablist"),t.append(e,n);const r=document.createElement("div");return r.className="quicklook-toolbar",r.appendChild(t),{toolbar:r,sourceButton:e,previewButton:n}}function Du(e,n){const t=document.createElement("button");t.title=e,t.type="button",t.className="quicklook-segment",t.setAttribute("role","tab"),t.setAttribute("aria-label",e);const r=document.createElement("span");r.textContent=e,r.className="quicklook-segment-label";const o=document.createElement("span");return o.innerHTML=n,o.className="quicklook-segment-icon",t.append(r,o),t}function nn(){if(tn!==void 0)return tn;try{tn=localStorage.getItem(ka)==="source"?"source":"preview"}catch{console.error("Failed to read quick look mode from localStorage"),tn="preview"}return tn}function Tu(e){tn=e;try{localStorage.setItem(ka,e)}catch{console.error("Failed to write quick look mode to localStorage")}}let tn;const ka="ui.quicklook-mode";function $f(){const e=window,n=e.editor?.state?.doc.toString();return typeof n=="string"?n:(console.error("Failed to get text from host editor state"),e.config?.text??"")}function Hf(){document.addEventListener("webkitmouseforcewillbegin",e=>{const n=e.target;n instanceof Element&&n.closest("a")!==null&&e.preventDefault()})}function jf(e,n){const t=window,r=t.pinchZoomTarget;t.pinchZoomTarget=()=>{if(e()!=="preview")return r?.()??null;const o=n.querySelector(".quicklook-content");return o!==null?{scroller:n,inner:o}:null};for(const o of["gesturechange","gestureend"])document.addEventListener(o,()=>{if(e()!=="preview")return;const u=n.querySelector(".quicklook-content");u?.style.zoom.length?u?.style.setProperty("--quicklook-zoom",u.style.zoom):u?.style.removeProperty("--quicklook-zoom")},{passive:!1})}function Uf(e,n){let t;const r=window,o={start:r.startDragging,update:r.updateDragging,cancel:r.cancelDragging},u=()=>{const a=n.clientHeight,l=n.scrollHeight,d=l-a;if(d<=0||l<=0)return{clientHeight:a,scrollHeight:l,scrollbarHeight:a,scrollbarTop:0};const f=a*(a/l),p=n.scrollTop/d*(a-f);return{clientHeight:a,scrollHeight:l,scrollbarHeight:f,scrollbarTop:p}},c=(a,l,d="auto")=>{const{clientHeight:f,scrollHeight:s,scrollbarHeight:p}=u(),m=f-p;if(m>0){const b=(a-l)/m;n.scrollTo({top:b*(s-f),behavior:d})}};r.startDragging=a=>{if(e()!=="preview"){o.start?.(a);return}const{scrollbarTop:l,scrollbarHeight:d}=u(),f=Fu(n,a);t=f-l,(f<l||f>l+d)&&c(f,d*.5,"smooth")},r.updateDragging=a=>{if(e()!=="preview"){o.update?.(a);return}t!==void 0&&c(Fu(n,a),t)},r.cancelDragging=()=>{if(e()!=="preview"){o.cancel?.();return}t=void 0}}function Gf(e,n,t){t.addEventListener("wheel",r=>{const o=e()==="preview"?n:document.querySelector(".cm-scroller");o!==null&&(o.scrollTop+=r.deltaY,o.scrollLeft+=r.deltaX,r.preventDefault())},{passive:!1})}function Vf(e,n,t){const r=document.querySelector(".cm-scroller"),o=()=>{const c=(e()==="preview"?n:r)?.scrollTop??0;t.classList.toggle("scrolled",c>0),t.classList.toggle("scrolled-far",c>20)};return n.addEventListener("scroll",o,{passive:!0}),r?.addEventListener("scroll",o,{passive:!0}),o}function Kf(e){document.addEventListener("copy",n=>{if(!e.classList.contains("overlay"))return;const t=getSelection(),r=t!==null&&t.rangeCount>0?t.getRangeAt(0):null,o=r!==null&&!r.collapsed&&e.contains(r.commonAncestorContainer)?r:null,u=o??(()=>{const a=document.createRange();return a.selectNodeContents(e),a})(),c=document.createElement("div");c.appendChild(u.cloneContents()),n.clipboardData?.setData("text/html",c.innerHTML),n.clipboardData?.setData("text/plain",o!==null?o.toString():e.innerText),n.preventDefault(),n.stopPropagation()},!0)}function Fu(e,n){return n-e.getBoundingClientRect().top}const Zf=`body {
  --editor-inset-top: 34px;
}

/* Force scrolling bounces */
.cm-scroller > .cm-content {
  min-height: calc(100% + 1px);
}

.quicklook .markdown-body.overlay > .quicklook-content {
  display: flow-root;
  --quicklook-default-zoom: 0.9;
  zoom: var(--quicklook-default-zoom);

  /* Toolbar clearance minus the inset, normalized so it stays constant under pinch-zoom */
  --quicklook-toolbar-inset: 8px;
  --quicklook-toolbar-clearance: calc((var(--editor-inset-top) - var(--quicklook-toolbar-inset)) * var(--quicklook-default-zoom) / var(--quicklook-zoom, var(--quicklook-default-zoom)));
  /* Scroll content under the toolbar; scroller stays inset so its scrollbar is clear */
  margin-top: calc(-1 * var(--quicklook-toolbar-clearance)) !important;
  /* Add the clearance back so the bounce stays in the pane, not the page */
  min-height: calc(100% + var(--quicklook-toolbar-clearance) + 1px);
}

/* Tighten heading spacing for the limited Quick Look viewport */
.quicklook .markdown-body h1,
.quicklook .markdown-body h2,
.quicklook .markdown-body h3,
.quicklook .markdown-body h4,
.quicklook .markdown-body h5,
.quicklook .markdown-body h6 {
  margin-top: var(--base-size-16, 1rem);
  margin-bottom: var(--base-size-8, 0.5rem);
}

/* Links are not interactive in quicklook */
.quicklook .markdown-body a,
.quicklook .markdown-body a:hover,
.quicklook .markdown-body a:not([href]) {
  color: var(--fgColor-accent);
  text-decoration: none;
  cursor: text;
  user-select: text;
  -webkit-user-select: text;
  -webkit-touch-callout: none;
}

.quicklook .markdown-body.overlay {
  top: var(--editor-inset-top);
  overscroll-behavior: contain;
}

.quicklook-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--editor-inset-top);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background-color 0.15s ease;
  z-index: 10001;
}

.quicklook-toolbar.scrolled {
  backdrop-filter: saturate(200%) blur(20px);
  background: rgba(248, 248, 250, 0.8);
  border-bottom-color: rgba(0, 0, 0, 0.1);
}

.quicklook-segmented {
  display: inline-flex;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
}

.quicklook-segment {
  appearance: none;
  border: none;
  background: transparent;
  color: rgba(0, 0, 0, 0.85);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 12px;
  font-weight: 500;
  padding: 2px 16px;
  border-radius: 4px;
  user-select: none;
  -webkit-user-select: none;
  min-width: 64px;
}

.quicklook-segment:hover:not(.active) {
  background: rgba(0, 0, 0, 0.04);
}

.quicklook-segment.active {
  background: #ffffff;
  color: #000000;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}

.quicklook-segment-icon {
  display: none;
}

.quicklook-segment-icon svg {
  display: block;
  width: 13px;
  height: 13px;
}

/* Compact layout: hide the toolbar and show floating buttons */
@media (max-width: 580px) {
  body {
    --editor-inset-top: 0px;
  }

  .quicklook .markdown-body.overlay {
    top: 0;
    padding: 12px;
  }

  .quicklook .markdown-body.overlay > .quicklook-content {
    --quicklook-default-zoom: 0.8;
    --quicklook-toolbar-inset: 0px;
  }

  .quicklook-toolbar {
    top: 8px;
    right: 16px;
    left: auto;
    height: auto;
    background: transparent !important;
    border-bottom: none !important;
    backdrop-filter: none !important;
    transition: none;
    pointer-events: none;
  }

  /* Gradient behind the buttons, when content scrolls */
  .quicklook-toolbar::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: linear-gradient(to bottom, rgba(250, 250, 252, 0.95), rgba(250, 250, 252, 0));
    opacity: 0;
    transition: opacity 0.15s ease;
    pointer-events: none;
    z-index: -1;
  }

  .quicklook-toolbar.scrolled-far::before {
    opacity: 1;
  }

  .quicklook-segmented {
    pointer-events: auto;
    padding: 0;
    gap: 0;
    overflow: hidden;
    background: rgba(242, 242, 245, 0.85);
    backdrop-filter: saturate(180%) blur(12px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    border: 0.5px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
  }

  .quicklook-segment {
    padding: 2px 3px;
    min-width: 0;
  }

  .quicklook-segment:hover:not(.active) {
    background: transparent;
  }

  .quicklook-segment.active {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }

  .quicklook-segment-label {
    display: none;
  }

  .quicklook-segment-icon {
    display: flex;
    padding: 1px 2px;
  }
}

@media (prefers-color-scheme: dark) {
  .quicklook-toolbar.scrolled {
    background: rgba(28, 28, 30, 0.6);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .quicklook-segmented {
    background: rgba(255, 255, 255, 0.08);
  }

  .quicklook-segment {
    color: rgba(255, 255, 255, 0.8);
  }

  .quicklook-segment:hover:not(.active) {
    background: rgba(255, 255, 255, 0.05);
  }

  .quicklook-segment.active {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
}

@media (prefers-color-scheme: dark) and (max-width: 580px) {
  .quicklook-toolbar::before {
    background: linear-gradient(to bottom, rgba(18, 22, 28, 0.95), rgba(18, 22, 28, 0));
  }

  .quicklook-segmented {
    background: rgba(40, 40, 42, 0.85);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
    border-color: rgba(128, 128, 128, 0.15);
  }

  .quicklook-segment:hover:not(.active) {
    background: transparent;
  }

  .quicklook-segment.active {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.45);
  }
}
`;function Wf(e){Le(Zf),document.body.classList.add("quicklook");const{toolbar:n,sourceButton:t,previewButton:r}=qf();document.body.appendChild(n);const o=Yf(e),u=Vf(nn,e,n),c={previewPane:e,sourceButton:t,previewButton:r,refreshSeparator:u,ensureRendered:o.ensureRendered};t.addEventListener("click",()=>{Tu("source"),Er(c)}),r.addEventListener("click",()=>{Tu("preview"),Er(c)}),Er(c),setTimeout(o.ensureRendered,0),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e.querySelector(".mermaid")!==null&&(o.invalidate(),nn()==="preview"&&o.ensureRendered())}),Hf(),jf(nn,e),Uf(nn,e),Gf(nn,e,n),Kf(e)}function Er(e){const n=nn()==="source",t=!n;e.sourceButton.classList.toggle("active",n),e.previewButton.classList.toggle("active",t),e.sourceButton.setAttribute("aria-selected",String(n)),e.previewButton.setAttribute("aria-selected",String(t)),e.previewPane.classList.toggle("overlay",t),e.refreshSeparator(),t&&e.ensureRendered()}function Yf(e){let n=!1,t;return{ensureRendered:()=>(n||t||(t=(async()=>{try{const u=Li(await no($f(),!1));e.innerHTML=`<div class="quicklook-content">${u}</div>`,e.querySelectorAll("a[href]").forEach(c=>{c.removeAttribute("href"),c.removeAttribute("target")}),Ii(()=>{}),n=!0}catch(u){throw t=void 0,u}})()),t),invalidate:()=>{n=!1,t=void 0}}}var ct={exports:{}};var Jf=ct.exports,Mu;function Qf(){return Mu||(Mu=1,(function(e,n){(function(t,r){e.exports=r()})(Jf,(function(){var t=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(d){return typeof d}:function(d){return d&&typeof Symbol=="function"&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d},r=function(d,f){if(!(d instanceof f))throw new TypeError("Cannot call a class as a function")},o=(function(){function d(f,s){for(var p=0;p<s.length;p++){var m=s[p];m.enumerable=m.enumerable||!1,m.configurable=!0,"value"in m&&(m.writable=!0),Object.defineProperty(f,m.key,m)}}return function(f,s,p){return s&&d(f.prototype,s),p&&d(f,p),f}})(),u=Object.assign||function(d){for(var f=1;f<arguments.length;f++){var s=arguments[f];for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&(d[p]=s[p])}return d},c=(function(){function d(f){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,p=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],m=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;r(this,d),this.ctx=f,this.iframes=s,this.exclude=p,this.iframesTimeout=m}return o(d,[{key:"getContexts",value:function(){var s=void 0,p=[];return typeof this.ctx>"u"||!this.ctx?s=[]:NodeList.prototype.isPrototypeOf(this.ctx)?s=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?s=this.ctx:typeof this.ctx=="string"?s=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):s=[this.ctx],s.forEach(function(m){var b=p.filter(function(g){return g.contains(m)}).length>0;p.indexOf(m)===-1&&!b&&p.push(m)}),p}},{key:"getIframeContents",value:function(s,p){var m=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},b=void 0;try{var g=s.contentWindow;if(b=g.document,!g||!b)throw new Error("iframe inaccessible")}catch{m()}b&&p(b)}},{key:"isIframeBlank",value:function(s){var p="about:blank",m=s.getAttribute("src").trim(),b=s.contentWindow.location.href;return b===p&&m!==p&&m}},{key:"observeIframeLoad",value:function(s,p,m){var b=this,g=!1,k=null,x=function v(){if(!g){g=!0,clearTimeout(k);try{b.isIframeBlank(s)||(s.removeEventListener("load",v),b.getIframeContents(s,p,m))}catch{m()}}};s.addEventListener("load",x),k=setTimeout(x,this.iframesTimeout)}},{key:"onIframeReady",value:function(s,p,m){try{s.contentWindow.document.readyState==="complete"?this.isIframeBlank(s)?this.observeIframeLoad(s,p,m):this.getIframeContents(s,p,m):this.observeIframeLoad(s,p,m)}catch{m()}}},{key:"waitForIframes",value:function(s,p){var m=this,b=0;this.forEachIframe(s,function(){return!0},function(g){b++,m.waitForIframes(g.querySelector("html"),function(){--b||p()})},function(g){g||p()})}},{key:"forEachIframe",value:function(s,p,m){var b=this,g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},k=s.querySelectorAll("iframe"),x=k.length,v=0;k=Array.prototype.slice.call(k);var E=function(){--x<=0&&g(v)};x||E(),k.forEach(function(S){d.matches(S,b.exclude)?E():b.onIframeReady(S,function(R){p(S)&&(v++,m(R)),E()},E)})}},{key:"createIterator",value:function(s,p,m){return document.createNodeIterator(s,p,m,!1)}},{key:"createInstanceOnIframe",value:function(s){return new d(s.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(s,p,m){var b=s.compareDocumentPosition(m),g=Node.DOCUMENT_POSITION_PRECEDING;if(b&g)if(p!==null){var k=p.compareDocumentPosition(m),x=Node.DOCUMENT_POSITION_FOLLOWING;if(k&x)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(s){var p=s.previousNode(),m=void 0;return p===null?m=s.nextNode():m=s.nextNode()&&s.nextNode(),{prevNode:p,node:m}}},{key:"checkIframeFilter",value:function(s,p,m,b){var g=!1,k=!1;return b.forEach(function(x,v){x.val===m&&(g=v,k=x.handled)}),this.compareNodeIframe(s,p,m)?(g===!1&&!k?b.push({val:m,handled:!0}):g!==!1&&!k&&(b[g].handled=!0),!0):(g===!1&&b.push({val:m,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(s,p,m,b){var g=this;s.forEach(function(k){k.handled||g.getIframeContents(k.val,function(x){g.createInstanceOnIframe(x).forEachNode(p,m,b)})})}},{key:"iterateThroughNodes",value:function(s,p,m,b,g){for(var k=this,x=this.createIterator(p,s,b),v=[],E=[],S=void 0,R=void 0,N=function(){var U=k.getIteratorNode(x);return R=U.prevNode,S=U.node,S};N();)this.iframes&&this.forEachIframe(p,function($){return k.checkIframeFilter(S,R,$,v)},function($){k.createInstanceOnIframe($).forEachNode(s,function(U){return E.push(U)},b)}),E.push(S);E.forEach(function($){m($)}),this.iframes&&this.handleOpenIframes(v,s,m,b),g()}},{key:"forEachNode",value:function(s,p,m){var b=this,g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},k=this.getContexts(),x=k.length;x||g(),k.forEach(function(v){var E=function(){b.iterateThroughNodes(s,v,p,m,function(){--x<=0&&g()})};b.iframes?b.waitForIframes(v,E):E()})}}],[{key:"matches",value:function(s,p){var m=typeof p=="string"?[p]:p,b=s.matches||s.matchesSelector||s.msMatchesSelector||s.mozMatchesSelector||s.oMatchesSelector||s.webkitMatchesSelector;if(b){var g=!1;return m.every(function(k){return b.call(s,k)?(g=!0,!1):!0}),g}else return!1}}]),d})(),a=(function(){function d(f){r(this,d),this.ctx=f,this.ie=!1;var s=window.navigator.userAgent;(s.indexOf("MSIE")>-1||s.indexOf("Trident")>-1)&&(this.ie=!0)}return o(d,[{key:"log",value:function(s){var p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",m=this.opt.log;this.opt.debug&&(typeof m>"u"?"undefined":t(m))==="object"&&typeof m[p]=="function"&&m[p]("mark.js: "+s)}},{key:"escapeStr",value:function(s){return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(s){return this.opt.wildcards!=="disabled"&&(s=this.setupWildcardsRegExp(s)),s=this.escapeStr(s),Object.keys(this.opt.synonyms).length&&(s=this.createSynonymsRegExp(s)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(s=this.setupIgnoreJoinersRegExp(s)),this.opt.diacritics&&(s=this.createDiacriticsRegExp(s)),s=this.createMergedBlanksRegExp(s),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(s=this.createJoinersRegExp(s)),this.opt.wildcards!=="disabled"&&(s=this.createWildcardsRegExp(s)),s=this.createAccuracyRegExp(s),s}},{key:"createSynonymsRegExp",value:function(s){var p=this.opt.synonyms,m=this.opt.caseSensitive?"":"i",b=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var g in p)if(p.hasOwnProperty(g)){var k=p[g],x=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(g):this.escapeStr(g),v=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(k):this.escapeStr(k);x!==""&&v!==""&&(s=s.replace(new RegExp("("+this.escapeStr(x)+"|"+this.escapeStr(v)+")","gm"+m),b+("("+this.processSynomyms(x)+"|")+(this.processSynomyms(v)+")")+b))}return s}},{key:"processSynomyms",value:function(s){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(s=this.setupIgnoreJoinersRegExp(s)),s}},{key:"setupWildcardsRegExp",value:function(s){return s=s.replace(/(?:\\)*\?/g,function(p){return p.charAt(0)==="\\"?"?":""}),s.replace(/(?:\\)*\*/g,function(p){return p.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(s){var p=this.opt.wildcards==="withSpaces";return s.replace(/\u0001/g,p?"[\\S\\s]?":"\\S?").replace(/\u0002/g,p?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(s){return s.replace(/[^(|)\\]/g,function(p,m,b){var g=b.charAt(m+1);return/[(|)\\]/.test(g)||g===""?p:p+"\0"})}},{key:"createJoinersRegExp",value:function(s){var p=[],m=this.opt.ignorePunctuation;return Array.isArray(m)&&m.length&&p.push(this.escapeStr(m.join(""))),this.opt.ignoreJoiners&&p.push("\\u00ad\\u200b\\u200c\\u200d"),p.length?s.split(/\u0000+/).join("["+p.join("")+"]*"):s}},{key:"createDiacriticsRegExp",value:function(s){var p=this.opt.caseSensitive?"":"i",m=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],b=[];return s.split("").forEach(function(g){m.every(function(k){if(k.indexOf(g)!==-1){if(b.indexOf(k)>-1)return!1;s=s.replace(new RegExp("["+k+"]","gm"+p),"["+k+"]"),b.push(k)}return!0})}),s}},{key:"createMergedBlanksRegExp",value:function(s){return s.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(s){var p=this,m="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",b=this.opt.accuracy,g=typeof b=="string"?b:b.value,k=typeof b=="string"?[]:b.limiters,x="";switch(k.forEach(function(v){x+="|"+p.escapeStr(v)}),g){case"partially":default:return"()("+s+")";case"complementary":return x="\\s"+(x||this.escapeStr(m)),"()([^"+x+"]*"+s+"[^"+x+"]*)";case"exactly":return"(^|\\s"+x+")("+s+")(?=$|\\s"+x+")"}}},{key:"getSeparatedKeywords",value:function(s){var p=this,m=[];return s.forEach(function(b){p.opt.separateWordSearch?b.split(" ").forEach(function(g){g.trim()&&m.indexOf(g)===-1&&m.push(g)}):b.trim()&&m.indexOf(b)===-1&&m.push(b)}),{keywords:m.sort(function(b,g){return g.length-b.length}),length:m.length}}},{key:"isNumeric",value:function(s){return Number(parseFloat(s))==s}},{key:"checkRanges",value:function(s){var p=this;if(!Array.isArray(s)||Object.prototype.toString.call(s[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(s),[];var m=[],b=0;return s.sort(function(g,k){return g.start-k.start}).forEach(function(g){var k=p.callNoMatchOnInvalidRanges(g,b),x=k.start,v=k.end,E=k.valid;E&&(g.start=x,g.length=v-x,m.push(g),b=v)}),m}},{key:"callNoMatchOnInvalidRanges",value:function(s,p){var m=void 0,b=void 0,g=!1;return s&&typeof s.start<"u"?(m=parseInt(s.start,10),b=m+parseInt(s.length,10),this.isNumeric(s.start)&&this.isNumeric(s.length)&&b-p>0&&b-m>0?g=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(s))),this.opt.noMatch(s))):(this.log("Ignoring invalid range: "+JSON.stringify(s)),this.opt.noMatch(s)),{start:m,end:b,valid:g}}},{key:"checkWhitespaceRanges",value:function(s,p,m){var b=void 0,g=!0,k=m.length,x=p-k,v=parseInt(s.start,10)-x;return v=v>k?k:v,b=v+parseInt(s.length,10),b>k&&(b=k,this.log("End range automatically set to the max value of "+k)),v<0||b-v<0||v>k||b>k?(g=!1,this.log("Invalid range: "+JSON.stringify(s)),this.opt.noMatch(s)):m.substring(v,b).replace(/\s+/g,"")===""&&(g=!1,this.log("Skipping whitespace only range: "+JSON.stringify(s)),this.opt.noMatch(s)),{start:v,end:b,valid:g}}},{key:"getTextNodes",value:function(s){var p=this,m="",b=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(g){b.push({start:m.length,end:(m+=g.textContent).length,node:g})},function(g){return p.matchesExclude(g.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){s({value:m,nodes:b})})}},{key:"matchesExclude",value:function(s){return c.matches(s,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(s,p,m){var b=this.opt.element?this.opt.element:"mark",g=s.splitText(p),k=g.splitText(m-p),x=document.createElement(b);return x.setAttribute("data-markjs","true"),this.opt.className&&x.setAttribute("class",this.opt.className),x.textContent=g.textContent,g.parentNode.replaceChild(x,g),k}},{key:"wrapRangeInMappedTextNode",value:function(s,p,m,b,g){var k=this;s.nodes.every(function(x,v){var E=s.nodes[v+1];if(typeof E>"u"||E.start>p){if(!b(x.node))return!1;var S=p-x.start,R=(m>x.end?x.end:m)-x.start,N=s.value.substr(0,x.start),$=s.value.substr(R+x.start);if(x.node=k.wrapRangeInTextNode(x.node,S,R),s.value=N+$,s.nodes.forEach(function(U,K){K>=v&&(s.nodes[K].start>0&&K!==v&&(s.nodes[K].start-=R),s.nodes[K].end-=R)}),m-=R,g(x.node.previousSibling,x.start),m>x.end)p=x.end;else return!1}return!0})}},{key:"wrapMatches",value:function(s,p,m,b,g){var k=this,x=p===0?0:p+1;this.getTextNodes(function(v){v.nodes.forEach(function(E){E=E.node;for(var S=void 0;(S=s.exec(E.textContent))!==null&&S[x]!=="";)if(m(S[x],E)){var R=S.index;if(x!==0)for(var N=1;N<x;N++)R+=S[N].length;E=k.wrapRangeInTextNode(E,R,R+S[x].length),b(E.previousSibling),s.lastIndex=0}}),g()})}},{key:"wrapMatchesAcrossElements",value:function(s,p,m,b,g){var k=this,x=p===0?0:p+1;this.getTextNodes(function(v){for(var E=void 0;(E=s.exec(v.value))!==null&&E[x]!=="";){var S=E.index;if(x!==0)for(var R=1;R<x;R++)S+=E[R].length;var N=S+E[x].length;k.wrapRangeInMappedTextNode(v,S,N,function($){return m(E[x],$)},function($,U){s.lastIndex=U,b($)})}g()})}},{key:"wrapRangeFromIndex",value:function(s,p,m,b){var g=this;this.getTextNodes(function(k){var x=k.value.length;s.forEach(function(v,E){var S=g.checkWhitespaceRanges(v,x,k.value),R=S.start,N=S.end,$=S.valid;$&&g.wrapRangeInMappedTextNode(k,R,N,function(U){return p(U,v,k.value.substring(R,N),E)},function(U){m(U,v)})}),b()})}},{key:"unwrapMatches",value:function(s){for(var p=s.parentNode,m=document.createDocumentFragment();s.firstChild;)m.appendChild(s.removeChild(s.firstChild));p.replaceChild(m,s),this.ie?this.normalizeTextNode(p):p.normalize()}},{key:"normalizeTextNode",value:function(s){if(s){if(s.nodeType===3)for(;s.nextSibling&&s.nextSibling.nodeType===3;)s.nodeValue+=s.nextSibling.nodeValue,s.parentNode.removeChild(s.nextSibling);else this.normalizeTextNode(s.firstChild);this.normalizeTextNode(s.nextSibling)}}},{key:"markRegExp",value:function(s,p){var m=this;this.opt=p,this.log('Searching with expression "'+s+'"');var b=0,g="wrapMatches",k=function(v){b++,m.opt.each(v)};this.opt.acrossElements&&(g="wrapMatchesAcrossElements"),this[g](s,this.opt.ignoreGroups,function(x,v){return m.opt.filter(v,x,b)},k,function(){b===0&&m.opt.noMatch(s),m.opt.done(b)})}},{key:"mark",value:function(s,p){var m=this;this.opt=p;var b=0,g="wrapMatches",k=this.getSeparatedKeywords(typeof s=="string"?[s]:s),x=k.keywords,v=k.length,E=this.opt.caseSensitive?"":"i",S=function R(N){var $=new RegExp(m.createRegExp(N),"gm"+E),U=0;m.log('Searching with expression "'+$+'"'),m[g]($,1,function(K,he){return m.opt.filter(he,N,b,U)},function(K){U++,b++,m.opt.each(K)},function(){U===0&&m.opt.noMatch(N),x[v-1]===N?m.opt.done(b):R(x[x.indexOf(N)+1])})};this.opt.acrossElements&&(g="wrapMatchesAcrossElements"),v===0?this.opt.done(b):S(x[0])}},{key:"markRanges",value:function(s,p){var m=this;this.opt=p;var b=0,g=this.checkRanges(s);g&&g.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(g)),this.wrapRangeFromIndex(g,function(k,x,v,E){return m.opt.filter(k,x,v,E)},function(k,x){b++,m.opt.each(k,x)},function(){m.opt.done(b)})):this.opt.done(b)}},{key:"unmark",value:function(s){var p=this;this.opt=s;var m=this.opt.element?this.opt.element:"*";m+="[data-markjs]",this.opt.className&&(m+="."+this.opt.className),this.log('Removal selector "'+m+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(b){p.unwrapMatches(b)},function(b){var g=c.matches(b,m),k=p.matchesExclude(b);return!g||k?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(s){this._opt=u({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},s)},get:function(){return this._opt}},{key:"iterator",get:function(){return new c(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),d})();function l(d){var f=this,s=new a(d);return this.mark=function(p,m){return s.mark(p,m),f},this.markRegExp=function(p,m){return s.markRegExp(p,m),f},this.markRanges=function(p,m){return s.markRanges(p,m),f},this.unmark=function(p){return s.unmark(p),f},this}return l}))})(ct)),ct.exports}var Xf=Qf();const ya=At(Xf),Tn="markedit-preview-mark",xa="markedit-preview-mark-highlighted";let En=!1,go,Se=0,be=[],Fn=null,it=null;const Iu={github:{light:"#fae17d7f",dark:"#f2cc607f"},cobalt:{light:"#cad40f66",dark:"#cad40f66"},dracula:{light:"#ffffff40",dark:"#ffffff40"},minimal:{light:"#fae17d7f",dark:"#f2cc607f"},"night-owl":{light:"#5f7e9779",dark:"#5f7e9779"},"rose-pine":{light:"#6e6a864c",dark:"#6e6a8666"},solarized:{light:"#f4c09d",dark:"#584032"},synthwave84:{light:"#d18616bb",dark:"#d18616bb"},"winter-is-coming":{light:"#cee1f0",dark:"#103362"},xcode:{light:"#e4e4e4",dark:"#545558"}};function e1(e){if(go=e,Se=0,e.search.length===0){wa();return}const n=qe();va(n),r1(n)}function n1(e){be.length!==0&&(Se=e%be.length,Ca())}function wa(){Fn?.disconnect(),Fn=null,go=void 0,Se=0,be=[],new ya(qe()).unmark()}function t1(){if(le()===se.preview)return{numberOfItems:be.length,currentIndex:Se}}function va(e){const n=go;if(n===void 0||n.search.length===0||En)return;o1(),En=!0;const{search:t,caseSensitive:r,wholeWord:o,diacriticInsensitive:u,regexp:c}=n,a=new ya(e),l=()=>{be=Array.from(e.querySelectorAll(`.${Tn}`)),Se=be.length>0?Math.min(Se,be.length-1):0,Ca(),En=!1};a.unmark({done:()=>{if(c)try{const d=r?"":"i";a.markRegExp(new RegExp(t,d),{className:Tn,done:l})}catch{En=!1,Se=0,be=[]}else a.mark(t,{className:Tn,caseSensitive:r,diacritics:u,separateWordSearch:!1,accuracy:o?"exactly":"partially",done:l})}})}function Ca(){const e=le()!==se.sideBySide;be.forEach((n,t)=>{n.classList.toggle(xa,e&&t===Se)}),e&&be.length>0&&be[Se].scrollIntoView({behavior:"smooth",block:"center"})}function r1(e){Fn?.disconnect(),Fn=new MutationObserver(()=>{En||va(e)}),Fn.observe(e,{childList:!0})}function o1(){it===null&&(it=document.createElement("style"),document.head.appendChild(it));const{light:e,dark:n}=Iu[St]??Iu.github;it.textContent=[`.${Tn} { background: ${e} !important; color: inherit !important; }`,`.${xa} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,"@media (prefers-color-scheme: dark) {",`  .${Tn} { background: ${n} !important; }`,"}"].join(`
`)}window.__markeditPreviewInitialized__?console.error("MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior."):(wf(),eo()?(typeof P.MarkEdit.onAppReady=="function"?P.MarkEdit.onAppReady(()=>{Bf(),setTimeout(()=>{Or()},2e3),c1()}):setTimeout(()=>{Lf()},4e3),(An==="automatic"||An==="quiet")&&setInterval(()=>{Or()},6048e5)):Wf(qe()),window.__markeditPreviewInitialized__=!0);window.MarkEditGetHtml??=mo;window.MarkEditRenderHtml??=Mf;window.__markeditPreviewSPI__={performSearch:e1,setSearchMatchIndex:n1,clearSearch:wa,searchCounterInfo:t1};eo()&&(P.MarkEdit.addMainMenuItem({title:G("viewMode"),icon:_a()?"eye":void 0,children:[{title:G("changeMode"),action:()=>{vf(),zr()},key:mu.key??"V",modifiers:mu.modifiers??["Command"]},{separator:!0},Ar(G("editMode"),se.edit),Ar(G("sideBySideMode"),se.sideBySide),Ar(G("previewMode"),se.preview),{separator:!0},...i1(),{separator:!0},{title:"WYSIWYG Editing",action:u1,state:()=>({isSelected:po()})},{separator:!0},{title:`${G("version")} 1.10.2`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.10.2")},{title:`${G("checkReleases")} (GitHub)`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/latest")},...$r()?[{title:G("updateAndRelaunch"),action:async()=>{const e=await pa();await bo(e.tag_name)?P.MarkEdit.relaunchApp():P.MarkEdit.showAlert(G("failedToUpdate"))}}]:[]]}),P.MarkEdit.addExtension(ef()),uf(),P.MarkEdit.addExtension(qr.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(n=>n.annotation(fa))||(Ue.renderUpdater!==void 0&&clearTimeout(Ue.renderUpdater),Ue.renderUpdater=setTimeout(Pn,500)))})),P.MarkEdit.onEditorReady(()=>{e0&&L0(P.MarkEdit.editorView.scrollDOM),Cf(),requestAnimationFrame(async()=>{document.visibilityState==="visible"&&le()===se.preview&&typeof P.MarkEdit.getFileInfo=="function"&&(await P.MarkEdit.getFileInfo())?.filePath===void 0&&P.MarkEdit.editorAPI.getText().length===0&&Vn(se.edit,!1)}),Pn(),zr(),P0(Nr(),qe()),aa(),Ue.keyDownListener!==void 0&&document.removeEventListener("keydown",Ue.keyDownListener),Ue.keyDownListener=e=>Ef(e),document.addEventListener("keydown",Ue.keyDownListener)}));function u1(){po()?lf():(le()===se.edit&&Vn(se.sideBySide,!0),aa())}function Ar(e,n){return{title:e,action:()=>{Vn(n),zr()},state:()=>({isSelected:le()===n})}}function i1(){const e=[{title:G("copyHtml"),action:Tf},{title:G("copyRichText"),action:Ff}];return typeof P.MarkEdit.showSavePanel>"u"?e:[{title:G("saveCleanHtml"),action:Af},{title:G("saveStyledHtml"),action:Df},{title:G("printRendered"),action:Sf},...e]}function zr(){const e=ma();e!==void 0&&(e.style.display=le()===se.edit?"none":"")}const a1="1.8.0";async function c1(){try{const e=await fetch("https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest");if(!e.ok)return;const t=(await e.json()).tag_name.replace(/^v/,""),r=`fork-upstream-notified-${t}`;t>a1&&localStorage.getItem(r)===null&&(localStorage.setItem(r,"1"),await P.MarkEdit.showAlert({title:`Upstream MarkEdit-preview ${t} Available`,message:`The upstream shipped v${t}. Say "update markedit" in Cowork or run:
  cd ~/Developer/markedit-preview && bash update.sh`,buttons:["Got it"]}))}catch{}}const Ue={renderUpdater:void 0,keyDownListener:void 0};
