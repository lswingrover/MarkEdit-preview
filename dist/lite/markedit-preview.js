"use strict";(()=>{const e=globalThis;if(typeof e.require>"u"){const n=()=>({}),t={MarkEdit:e.MarkEdit??Object.freeze({})},r={of:()=>({})},o=()=>({range:()=>({})});class u{}const a={"markedit-api":t,"@codemirror/view":{EditorView:{updateListener:r,mouseSelectionStyle:r,editorAttributes:r,baseTheme:()=>({})},Decoration:{mark:o,line:o},ViewPlugin:{fromClass:()=>({})},WidgetType:u,RectangleMarker:u,layer:()=>({}),Direction:{LTR:0,RTL:1},keymap:{of:n},showPanel:{of:n}},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})},Compartment:class{of(){return{}}reconfigure(){return{}}get(){}},Facet:{define:()=>r},StateField:{define:()=>({})},Prec:{highest:i=>i,high:i=>i,default:i=>i,low:i=>i,lowest:i=>i},EditorSelection:{cursor:i=>({from:i,to:i}),range:(i,c)=>({from:i,to:c}),single:(i,c)=>({from:i,to:c}),create:()=>({})}}};e.require=i=>a[i]??{}}})();const _=require("@codemirror/view"),C=require("markedit-api"),M=require("@codemirror/state"),he=require("@codemirror/language"),Yo=require("@lezer/highlight");function ea(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function me(e,n=!0){const t=document.createElement("style");return t.textContent=e,document.head.appendChild(t),t.disabled=!n,t}function Rr(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function na(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function qe(e){const n=parseInt(e.dataset.lineFrom??"0"),t=parseInt(e.dataset.lineTo??"0");return{from:n,to:t}}function Rn(e,n){let t=0,r=n;for(;r!==null&&r!==e;)t+=r.offsetTop,r=r.offsetParent;return t}function Fn(e,n,t,r=!0){const o=Rn(e,n)+n.offsetHeight*t;In(e,o,r)}function In(e,n,t=!0){const r=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:n<=r?0:n,behavior:t?"smooth":"instant"})}function ta(e){const n=document.createRange();n.selectNodeContents(e);const t=getSelection();t?.removeAllRanges(),t?.addRange(n)}function ra(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function Pe(e,n){return e.endsWith("/")?e+n:e+"/"+n}async function oa(e){const n=await C.MarkEdit.getFileContent(e);if(n===void 0)return{};try{const t=JSON.parse(n);return typeof t=="object"&&t!==null?t:{}}catch(t){return console.error(`Failed to parse JSON from ${e}:`,t),{}}}function Qo(e,n){return navigator.clipboard.write([e]).catch(t=>{console.error("Failed to copy:",t),C.MarkEdit.showAlert(n)})}function ua(e){const n=document.createElement("div");n.style.cssText="position: fixed; left: -10000px; top: 0;",n.innerHTML=e,document.body.appendChild(n);try{return n.innerText}finally{n.remove()}}const Or={};function ia(e){let n=Or[e];if(n)return n;n=Or[e]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);n.push(r)}for(let t=0;t<e.length;t++){const r=e.charCodeAt(t);n[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return n}function We(e,n){typeof n!="string"&&(n=We.defaultChars);const t=ia(n);return e.replace(/(%[a-f0-9]{2})+/gi,function(r){let o="";for(let u=0,a=r.length;u<a;u+=3){const i=parseInt(r.slice(u+1,u+3),16);if(i<128){o+=t[i];continue}if((i&224)===192&&u+3<a){const c=parseInt(r.slice(u+4,u+6),16);if((c&192)===128){const l=i<<6&1984|c&63;l<128?o+="��":o+=String.fromCharCode(l),u+=3;continue}}if((i&240)===224&&u+6<a){const c=parseInt(r.slice(u+4,u+6),16),l=parseInt(r.slice(u+7,u+9),16);if((c&192)===128&&(l&192)===128){const d=i<<12&61440|c<<6&4032|l&63;d<2048||d>=55296&&d<=57343?o+="���":o+=String.fromCharCode(d),u+=6;continue}}if((i&248)===240&&u+9<a){const c=parseInt(r.slice(u+4,u+6),16),l=parseInt(r.slice(u+7,u+9),16),d=parseInt(r.slice(u+10,u+12),16);if((c&192)===128&&(l&192)===128&&(d&192)===128){let s=i<<18&1835008|c<<12&258048|l<<6&4032|d&63;s<65536||s>1114111?o+="����":(s-=65536,o+=String.fromCharCode(55296+(s>>10),56320+(s&1023))),u+=9;continue}}o+="�"}return o})}We.defaultChars=";/?:@&=+$,#";We.componentChars="";const Br={};function aa(e){let n=Br[e];if(n)return n;n=Br[e]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);/^[0-9a-z]$/i.test(r)?n.push(r):n.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<e.length;t++)n[e.charCodeAt(t)]=e[t];return n}function xn(e,n,t){typeof n!="string"&&(t=n,n=xn.defaultChars),typeof t>"u"&&(t=!0);const r=aa(n);let o="";for(let u=0,a=e.length;u<a;u++){const i=e.charCodeAt(u);if(t&&i===37&&u+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(u+1,u+3))){o+=e.slice(u,u+3),u+=2;continue}if(i<128){o+=r[i];continue}if(i>=55296&&i<=57343){if(i>=55296&&i<=56319&&u+1<a){const c=e.charCodeAt(u+1);if(c>=56320&&c<=57343){o+=encodeURIComponent(e[u]+e[u+1]),u++;continue}}o+="%EF%BF%BD";continue}o+=encodeURIComponent(e[u])}return o}xn.defaultChars=";/?:@&=+$,-_.!~*'()#";xn.componentChars="-_.!~*'()";function Xt(e){let n="";return n+=e.protocol||"",n+=e.slashes?"//":"",n+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?n+="["+e.hostname+"]":n+=e.hostname||"",n+=e.port?":"+e.port:"",n+=e.pathname||"",n+=e.search||"",n+=e.hash||"",n}function On(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const ca=/^([a-z0-9.+-]+:)/i,sa=/:[0-9]*$/,la=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,da=["<",">",'"',"`"," ","\r",`
`,"	"],fa=["{","}","|","\\","^","`"].concat(da),ha=["'"].concat(fa),Pr=["%","/","?",";","#"].concat(ha),zr=["/","?","#"],pa=255,Hr=/^[+a-z0-9A-Z_-]{0,63}$/,ma=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,qr={javascript:!0,"javascript:":!0},$r={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function er(e,n){if(e&&e instanceof On)return e;const t=new On;return t.parse(e,n),t}On.prototype.parse=function(e,n){let t,r,o,u=e;if(u=u.trim(),!n&&e.split("#").length===1){const l=la.exec(u);if(l)return this.pathname=l[1],l[2]&&(this.search=l[2]),this}let a=ca.exec(u);if(a&&(a=a[0],t=a.toLowerCase(),this.protocol=a,u=u.substr(a.length)),(n||a||u.match(/^\/\/[^@\/]+@[^@\/]+/))&&(o=u.substr(0,2)==="//",o&&!(a&&qr[a])&&(u=u.substr(2),this.slashes=!0)),!qr[a]&&(o||a&&!$r[a])){let l=-1;for(let p=0;p<zr.length;p++)r=u.indexOf(zr[p]),r!==-1&&(l===-1||r<l)&&(l=r);let d,s;l===-1?s=u.lastIndexOf("@"):s=u.lastIndexOf("@",l),s!==-1&&(d=u.slice(0,s),u=u.slice(s+1),this.auth=d),l=-1;for(let p=0;p<Pr.length;p++)r=u.indexOf(Pr[p]),r!==-1&&(l===-1||r<l)&&(l=r);l===-1&&(l=u.length),u[l-1]===":"&&l--;const f=u.slice(0,l);u=u.slice(l),this.parseHost(f),this.hostname=this.hostname||"";const h=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!h){const p=this.hostname.split(/\./);for(let m=0,b=p.length;m<b;m++){const g=p[m];if(g&&!g.match(Hr)){let k="";for(let y=0,x=g.length;y<x;y++)g.charCodeAt(y)>127?k+="x":k+=g[y];if(!k.match(Hr)){const y=p.slice(0,m),x=p.slice(m+1),v=g.match(ma);v&&(y.push(v[1]),x.unshift(v[2])),x.length&&(u=x.join(".")+u),this.hostname=y.join(".");break}}}}this.hostname.length>pa&&(this.hostname=""),h&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const i=u.indexOf("#");i!==-1&&(this.hash=u.substr(i),u=u.slice(0,i));const c=u.indexOf("?");return c!==-1&&(this.search=u.substr(c),u=u.slice(0,c)),u&&(this.pathname=u),$r[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};On.prototype.parseHost=function(e){let n=sa.exec(e);n&&(n=n[0],n!==":"&&(this.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(this.hostname=e)};const ba=Object.freeze(Object.defineProperty({__proto__:null,decode:We,encode:xn,format:Xt,parse:er},Symbol.toStringTag,{value:"Module"})),Jo=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Xo=/[\0-\x1F\x7F-\x9F]/,ga=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,nr=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,eu=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,nu=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,ka=Object.freeze(Object.defineProperty({__proto__:null,Any:Jo,Cc:Xo,Cf:ga,P:nr,S:eu,Z:nu},Symbol.toStringTag,{value:"Module"})),ya=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),xa=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var ft;const va=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),wa=(ft=String.fromCodePoint)!==null&&ft!==void 0?ft:function(e){let n="";return e>65535&&(e-=65536,n+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),n+=String.fromCharCode(e),n};function Ca(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=va.get(e))!==null&&n!==void 0?n:e}var z;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(z||(z={}));const Ea=32;var ge;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(ge||(ge={}));function Bt(e){return e>=z.ZERO&&e<=z.NINE}function _a(e){return e>=z.UPPER_A&&e<=z.UPPER_F||e>=z.LOWER_A&&e<=z.LOWER_F}function Aa(e){return e>=z.UPPER_A&&e<=z.UPPER_Z||e>=z.LOWER_A&&e<=z.LOWER_Z||Bt(e)}function Sa(e){return e===z.EQUALS||Aa(e)}var O;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(O||(O={}));var le;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(le||(le={}));class Ta{constructor(n,t,r){this.decodeTree=n,this.emitCodePoint=t,this.errors=r,this.state=O.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=le.Strict}startEntity(n){this.decodeMode=n,this.state=O.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,t){switch(this.state){case O.EntityStart:return n.charCodeAt(t)===z.NUM?(this.state=O.NumericStart,this.consumed+=1,this.stateNumericStart(n,t+1)):(this.state=O.NamedEntity,this.stateNamedEntity(n,t));case O.NumericStart:return this.stateNumericStart(n,t);case O.NumericDecimal:return this.stateNumericDecimal(n,t);case O.NumericHex:return this.stateNumericHex(n,t);case O.NamedEntity:return this.stateNamedEntity(n,t)}}stateNumericStart(n,t){return t>=n.length?-1:(n.charCodeAt(t)|Ea)===z.LOWER_X?(this.state=O.NumericHex,this.consumed+=1,this.stateNumericHex(n,t+1)):(this.state=O.NumericDecimal,this.stateNumericDecimal(n,t))}addToNumericResult(n,t,r,o){if(t!==r){const u=r-t;this.result=this.result*Math.pow(o,u)+parseInt(n.substr(t,u),o),this.consumed+=u}}stateNumericHex(n,t){const r=t;for(;t<n.length;){const o=n.charCodeAt(t);if(Bt(o)||_a(o))t+=1;else return this.addToNumericResult(n,r,t,16),this.emitNumericEntity(o,3)}return this.addToNumericResult(n,r,t,16),-1}stateNumericDecimal(n,t){const r=t;for(;t<n.length;){const o=n.charCodeAt(t);if(Bt(o))t+=1;else return this.addToNumericResult(n,r,t,10),this.emitNumericEntity(o,2)}return this.addToNumericResult(n,r,t,10),-1}emitNumericEntity(n,t){var r;if(this.consumed<=t)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===z.SEMI)this.consumed+=1;else if(this.decodeMode===le.Strict)return 0;return this.emitCodePoint(Ca(this.result),this.consumed),this.errors&&(n!==z.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,t){const{decodeTree:r}=this;let o=r[this.treeIndex],u=(o&ge.VALUE_LENGTH)>>14;for(;t<n.length;t++,this.excess++){const a=n.charCodeAt(t);if(this.treeIndex=Da(r,o,this.treeIndex+Math.max(1,u),a),this.treeIndex<0)return this.result===0||this.decodeMode===le.Attribute&&(u===0||Sa(a))?0:this.emitNotTerminatedNamedEntity();if(o=r[this.treeIndex],u=(o&ge.VALUE_LENGTH)>>14,u!==0){if(a===z.SEMI)return this.emitNamedEntityData(this.treeIndex,u,this.consumed+this.excess);this.decodeMode!==le.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;const{result:t,decodeTree:r}=this,o=(r[t]&ge.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,o,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,t,r){const{decodeTree:o}=this;return this.emitCodePoint(t===1?o[n]&~ge.VALUE_LENGTH:o[n+1],r),t===3&&this.emitCodePoint(o[n+2],r),r}end(){var n;switch(this.state){case O.NamedEntity:return this.result!==0&&(this.decodeMode!==le.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case O.NumericDecimal:return this.emitNumericEntity(0,2);case O.NumericHex:return this.emitNumericEntity(0,3);case O.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case O.EntityStart:return 0}}}function tu(e){let n="";const t=new Ta(e,r=>n+=wa(r));return function(o,u){let a=0,i=0;for(;(i=o.indexOf("&",i))>=0;){n+=o.slice(a,i),t.startEntity(u);const l=t.write(o,i+1);if(l<0){a=i+t.end();break}a=i+l,i=l===0?a+1:a}const c=n+o.slice(a);return n="",c}}function Da(e,n,t,r){const o=(n&ge.BRANCH_LENGTH)>>7,u=n&ge.JUMP_TABLE;if(o===0)return u!==0&&r===u?t:-1;if(u){const c=r-u;return c<0||c>=o?-1:e[t+c]-1}let a=t,i=a+o-1;for(;a<=i;){const c=a+i>>>1,l=e[c];if(l<r)a=c+1;else if(l>r)i=c-1;else return e[c+o]}return-1}const ru=tu(ya);tu(xa);function Ma(e,n=le.Legacy){return ru(e,n)}function Fa(e){return ru(e,le.Strict)}function Ia(e){return Object.prototype.toString.call(e)}function tr(e){return Ia(e)==="[object String]"}const La=Object.prototype.hasOwnProperty;function Na(e,n){return La.call(e,n)}function Zn(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!="object")throw new TypeError(t+"must be object");Object.keys(t).forEach(function(r){e[r]=t[r]})}}),e}function Ra(e,n,t){return[].concat(e.slice(0,n),t,e.slice(n+1))}function rr(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function fn(e){if(e>65535){e-=65536;const n=55296+(e>>10),t=56320+(e&1023);return String.fromCharCode(n,t)}return String.fromCharCode(e)}const ou=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Oa=/&([a-z#][a-z0-9]{1,31});/gi,Ba=new RegExp(ou.source+"|"+Oa.source,"gi"),Pa=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function za(e,n){if(n.charCodeAt(0)===35&&Pa.test(n)){const r=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);return rr(r)?fn(r):e}const t=Ma(e);return t!==e?t:e}function Ha(e){return e.indexOf("\\")<0?e:e.replace(ou,"$1")}function Ke(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(Ba,function(n,t,r){return t||za(n,r)})}const qa=/[&<>"]/,$a=/[&<>"]/g,ja={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function Ua(e){return ja[e]}function xe(e){return qa.test(e)?e.replace($a,Ua):e}const Ga=/[.?*+^$[\]\\(){}|-]/g;function Va(e){return e.replace(Ga,"\\$&")}function I(e){switch(e){case 9:case 32:return!0}return!1}function hn(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function uu(e){return nr.test(e)||eu.test(e)}function pn(e){return uu(fn(e))}function mn(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function Yn(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}function jr(e){return e===32||e===9||e===10||e===13}function Qn(e){let n=0;for(;n<e.length&&jr(e.charCodeAt(n));n++);let t=e.length-1;for(;t>=n&&jr(e.charCodeAt(t));t--);return e.slice(n,t+1)}const Wa={mdurl:ba,ucmicro:ka},Ka=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:Ra,asciiTrim:Qn,assign:Zn,escapeHtml:xe,escapeRE:Va,fromCodePoint:fn,has:Na,isMdAsciiPunct:mn,isPunctChar:uu,isPunctCharCode:pn,isSpace:I,isString:tr,isValidEntityCode:rr,isWhiteSpace:hn,lib:Wa,normalizeReference:Yn,unescapeAll:Ke,unescapeMd:Ha},Symbol.toStringTag,{value:"Module"}));function Za(e,n,t){let r,o,u,a;const i=e.posMax,c=e.pos;for(e.pos=n+1,r=1;e.pos<i;){if(u=e.src.charCodeAt(e.pos),u===93&&(r--,r===0)){o=!0;break}if(a=e.pos,e.md.inline.skipToken(e),u===91){if(a===e.pos-1)r++;else if(t)return e.pos=c,-1}}let l=-1;return o&&(l=e.pos),e.pos=c,l}function Ya(e,n,t){let r,o=n;const u={ok:!1,pos:0,str:""};if(e.charCodeAt(o)===60){for(o++;o<t;){if(r=e.charCodeAt(o),r===10||r===60)return u;if(r===62)return u.pos=o+1,u.str=Ke(e.slice(n+1,o)),u.ok=!0,u;if(r===92&&o+1<t){o+=2;continue}o++}return u}let a=0;for(;o<t&&(r=e.charCodeAt(o),!(r===32||r<32||r===127));){if(r===92&&o+1<t){if(e.charCodeAt(o+1)===32){o++;continue}o+=2;continue}if(r===40&&(a++,a>32))return u;if(r===41){if(a===0)break;a--}o++}return n===o||a!==0||(u.str=Ke(e.slice(n,o)),u.pos=o,u.ok=!0),u}function Qa(e,n,t,r){let o,u=n;const a={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(r)a.str=r.str,a.marker=r.marker;else{if(u>=t)return a;let i=e.charCodeAt(u);if(i!==34&&i!==39&&i!==40)return a;n++,u++,i===40&&(i=41),a.marker=i}for(;u<t;){if(o=e.charCodeAt(u),o===a.marker)return a.pos=u+1,a.str+=Ke(e.slice(n,u)),a.ok=!0,a;if(o===40&&a.marker===41)return a;o===92&&u+1<t&&u++,u++}return a.can_continue=!0,a.str+=Ke(e.slice(n,u)),a}const Ja=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:Ya,parseLinkLabel:Za,parseLinkTitle:Qa},Symbol.toStringTag,{value:"Module"})),ce={};ce.code_inline=function(e,n,t,r,o){const u=e[n];return"<code"+o.renderAttrs(u)+">"+xe(u.content)+"</code>"};ce.code_block=function(e,n,t,r,o){const u=e[n];return"<pre"+o.renderAttrs(u)+"><code>"+xe(e[n].content)+`</code></pre>
`};ce.fence=function(e,n,t,r,o){const u=e[n],a=u.info?Ke(u.info).trim():"";let i="",c="";if(a){const d=a.split(/(\s+)/g);i=d[0],c=d.slice(2).join("")}let l;if(t.highlight?l=t.highlight(u.content,i,c)||xe(u.content):l=xe(u.content),l.indexOf("<pre")===0)return l+`
`;if(a){const d=u.attrIndex("class"),s=u.attrs?u.attrs.slice():[];d<0?s.push(["class",t.langPrefix+i]):(s[d]=s[d].slice(),s[d][1]+=" "+t.langPrefix+i);const f={attrs:s};return`<pre><code${o.renderAttrs(f)}>${l}</code></pre>
`}return`<pre><code${o.renderAttrs(u)}>${l}</code></pre>
`};ce.image=function(e,n,t,r,o){const u=e[n];return u.attrs[u.attrIndex("alt")][1]=o.renderInlineAsText(u.children,t,r),o.renderToken(e,n,t)};ce.hardbreak=function(e,n,t){return t.xhtmlOut?`<br />
`:`<br>
`};ce.softbreak=function(e,n,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};ce.text=function(e,n){return xe(e[n].content)};ce.html_block=function(e,n){return e[n].content};ce.html_inline=function(e,n){return e[n].content};function nn(){this.rules=Zn({},ce)}nn.prototype.renderAttrs=function(n){let t,r,o;if(!n.attrs)return"";for(o="",t=0,r=n.attrs.length;t<r;t++)o+=" "+xe(n.attrs[t][0])+'="'+xe(n.attrs[t][1])+'"';return o};nn.prototype.renderToken=function(n,t,r){const o=n[t];let u="";if(o.hidden)return"";o.block&&o.nesting!==-1&&t&&n[t-1].hidden&&(u+=`
`),u+=(o.nesting===-1?"</":"<")+o.tag,u+=this.renderAttrs(o),o.nesting===0&&r.xhtmlOut&&(u+=" /");let a=!1;if(o.block&&(a=!0,o.nesting===1&&t+1<n.length)){const i=n[t+1];(i.type==="inline"||i.hidden||i.nesting===-1&&i.tag===o.tag)&&(a=!1)}return u+=a?`>
`:">",u};nn.prototype.renderInline=function(e,n,t){let r="";const o=this.rules;for(let u=0,a=e.length;u<a;u++){const i=e[u].type;typeof o[i]<"u"?r+=o[i](e,u,n,t,this):r+=this.renderToken(e,u,n)}return r};nn.prototype.renderInlineAsText=function(e,n,t){let r="";for(let o=0,u=e.length;o<u;o++)switch(e[o].type){case"text":r+=e[o].content;break;case"image":r+=this.renderInlineAsText(e[o].children,n,t);break;case"html_inline":case"html_block":r+=e[o].content;break;case"softbreak":case"hardbreak":r+=`
`;break}return r};nn.prototype.render=function(e,n,t){let r="";const o=this.rules;for(let u=0,a=e.length;u<a;u++){const i=e[u].type;i==="inline"?r+=this.renderInline(e[u].children,n,t):typeof o[i]<"u"?r+=o[i](e,u,n,t,this):r+=this.renderToken(e,u,n,t)}return r};function K(){this.__rules__=[],this.__cache__=null}K.prototype.__find__=function(e){for(let n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===e)return n;return-1};K.prototype.__compile__=function(){const e=this,n=[""];e.__rules__.forEach(function(t){t.enabled&&t.alt.forEach(function(r){n.indexOf(r)<0&&n.push(r)})}),e.__cache__={},n.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(r){r.enabled&&(t&&r.alt.indexOf(t)<0||e.__cache__[t].push(r.fn))})})};K.prototype.at=function(e,n,t){const r=this.__find__(e),o=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__[r].fn=n,this.__rules__[r].alt=o.alt||[],this.__cache__=null};K.prototype.before=function(e,n,t,r){const o=this.__find__(e),u=r||{};if(o===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(o,0,{name:n,enabled:!0,fn:t,alt:u.alt||[]}),this.__cache__=null};K.prototype.after=function(e,n,t,r){const o=this.__find__(e),u=r||{};if(o===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(o+1,0,{name:n,enabled:!0,fn:t,alt:u.alt||[]}),this.__cache__=null};K.prototype.push=function(e,n,t){const r=t||{};this.__rules__.push({name:e,enabled:!0,fn:n,alt:r.alt||[]}),this.__cache__=null};K.prototype.enable=function(e,n){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(r){const o=this.__find__(r);if(o<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[o].enabled=!0,t.push(r)},this),this.__cache__=null,t};K.prototype.enableOnly=function(e,n){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(t){t.enabled=!1}),this.enable(e,n)};K.prototype.disable=function(e,n){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(r){const o=this.__find__(r);if(o<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[o].enabled=!1,t.push(r)},this),this.__cache__=null,t};K.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function re(e,n,t){this.type=e,this.tag=n,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}re.prototype.attrIndex=function(n){if(!this.attrs)return-1;const t=this.attrs;for(let r=0,o=t.length;r<o;r++)if(t[r][0]===n)return r;return-1};re.prototype.attrPush=function(n){this.attrs?this.attrs.push(n):this.attrs=[n]};re.prototype.attrSet=function(n,t){const r=this.attrIndex(n),o=[n,t];r<0?this.attrPush(o):this.attrs[r]=o};re.prototype.attrGet=function(n){const t=this.attrIndex(n);let r=null;return t>=0&&(r=this.attrs[t][1]),r};re.prototype.attrJoin=function(n,t){const r=this.attrIndex(n);r<0?this.attrPush([n,t]):this.attrs[r][1]=this.attrs[r][1]+" "+t};function iu(e,n,t){this.src=e,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=n}iu.prototype.Token=re;const Xa=/\r\n?|\n/g,ec=/\0/g;function nc(e){let n;n=e.src.replace(Xa,`
`),n=n.replace(ec,"�"),e.src=n}function tc(e){let n;e.inlineMode?(n=new e.Token("inline","",0),n.content=e.src,n.map=[0,1],n.children=[],e.tokens.push(n)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function rc(e){const n=e.tokens;for(let t=0,r=n.length;t<r;t++){const o=n[t];o.type==="inline"&&e.md.inline.parse(o.content,e.md,e.env,o.children)}}function oc(e){return/^<a[>\s]/i.test(e)}function uc(e){return/^<\/a\s*>/i.test(e)}function ic(e){const n=e.tokens;if(e.md.options.linkify)for(let t=0,r=n.length;t<r;t++){if(n[t].type!=="inline"||!e.md.linkify.pretest(n[t].content))continue;const o=n[t].children,u=[];let a=0;for(let i=o.length-1;i>=0;i--){const c=o[i];if(c.type==="link_close"){for(i--;o[i].level!==c.level&&o[i].type!=="link_open";)i--;continue}if(c.type==="html_inline"&&(oc(c.content)&&a>0&&a--,uc(c.content)&&a++),!(a>0)&&c.type==="text"&&e.md.linkify.test(c.content)){const l=c.content;let d=e.md.linkify.match(l);const s=[];let f=c.level,h=0;d.length>0&&d[0].index===0&&i>0&&o[i-1].type==="text_special"&&(d=d.slice(1));for(let p=0;p<d.length;p++){const m=d[p].url,b=e.md.normalizeLink(m);if(!e.md.validateLink(b))continue;let g=d[p].text;d[p].schema?d[p].schema==="mailto:"&&!/^mailto:/i.test(g)?g=e.md.normalizeLinkText("mailto:"+g).replace(/^mailto:/,""):g=e.md.normalizeLinkText(g):g=e.md.normalizeLinkText("http://"+g).replace(/^http:\/\//,"");const k=d[p].index;if(k>h){const w=new e.Token("text","",0);w.content=l.slice(h,k),w.level=f,s.push(w)}const y=new e.Token("link_open","a",1);y.attrs=[["href",b]],y.level=f++,y.markup="linkify",y.info="auto",s.push(y);const x=new e.Token("text","",0);x.content=g,x.level=f,s.push(x);const v=new e.Token("link_close","a",-1);v.level=--f,v.markup="linkify",v.info="auto",s.push(v),h=d[p].lastIndex}if(h<l.length){const p=new e.Token("text","",0);p.content=l.slice(h),p.level=f,s.push(p)}u.push({index:i,nodes:s})}}if(u.length>0){let i=o.length;for(const s of u)i+=s.nodes.length-1;const c=new Array(i);let l=0,d=0;u.reverse();for(let s=0;s<o.length;s++){const f=u[l];if(f?.index===s){for(const h of f.nodes)c[d++]=h;l++}else c[d++]=o[s]}n[t].children=c}}}const au=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,ac=/\((c|tm|r)\)/i,cc=/\((c|tm|r)\)/ig,sc={c:"©",r:"®",tm:"™"};function lc(e,n){return sc[n.toLowerCase()]}function dc(e){let n=0;for(let t=e.length-1;t>=0;t--){const r=e[t];r.type==="text"&&!n&&(r.content=r.content.replace(cc,lc)),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function fc(e){let n=0;for(let t=e.length-1;t>=0;t--){const r=e[t];r.type==="text"&&!n&&au.test(r.content)&&(r.content=r.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function hc(e){let n;if(e.md.options.typographer)for(n=e.tokens.length-1;n>=0;n--)e.tokens[n].type==="inline"&&(ac.test(e.tokens[n].content)&&dc(e.tokens[n].children),au.test(e.tokens[n].content)&&fc(e.tokens[n].children))}const pc=/['"]/,Ur=/['"]/g,Gr="’";function An(e,n,t,r){e[n]||(e[n]=[]),e[n].push({pos:t,ch:r})}function mc(e,n){let t="",r=0;n.sort((o,u)=>o.pos-u.pos);for(let o=0;o<n.length;o++){const u=n[o];t+=e.slice(r,u.pos)+u.ch,r=u.pos+1}return t+e.slice(r)}function bc(e,n){let t;const r=[],o={};for(let u=0;u<e.length;u++){const a=e[u],i=e[u].level;for(t=r.length-1;t>=0&&!(r[t].level<=i);t--);if(r.length=t+1,a.type!=="text")continue;const c=a.content;let l=0;const d=c.length;e:for(;l<d;){Ur.lastIndex=l;const s=Ur.exec(c);if(!s)break;let f=!0,h=!0;l=s.index+1;const p=s[0]==="'";let m=32;if(s.index-1>=0)m=c.charCodeAt(s.index-1);else for(t=u-1;t>=0&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t--)if(e[t].content){m=e[t].content.charCodeAt(e[t].content.length-1);break}let b=32;if(l<d)b=c.charCodeAt(l);else for(t=u+1;t<e.length&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t++)if(e[t].content){b=e[t].content.charCodeAt(0);break}const g=mn(m)||pn(m),k=mn(b)||pn(b),y=hn(m),x=hn(b);if(x?f=!1:k&&(y||g||(f=!1)),y?h=!1:g&&(x||k||(h=!1)),b===34&&s[0]==='"'&&m>=48&&m<=57&&(h=f=!1),f&&h&&(f=g,h=k),!f&&!h){p&&An(o,u,s.index,Gr);continue}if(h)for(t=r.length-1;t>=0;t--){let v=r[t];if(r[t].level<i)break;if(v.single===p&&r[t].level===i){v=r[t];let w,A;p?(w=n.md.options.quotes[2],A=n.md.options.quotes[3]):(w=n.md.options.quotes[0],A=n.md.options.quotes[1]),An(o,u,s.index,A),An(o,v.token,v.pos,w),r.length=t;continue e}}f?r.push({token:u,pos:s.index,single:p,level:i}):h&&p&&An(o,u,s.index,Gr)}}Object.keys(o).forEach(function(u){e[u].content=mc(e[u].content,o[u])})}function gc(e){if(e.md.options.typographer)for(let n=e.tokens.length-1;n>=0;n--)e.tokens[n].type!=="inline"||!pc.test(e.tokens[n].content)||bc(e.tokens[n].children,e)}function kc(e){let n,t;const r=e.tokens,o=r.length;for(let u=0;u<o;u++){if(r[u].type!=="inline")continue;const a=r[u].children,i=a.length;for(n=0;n<i;n++)a[n].type==="text_special"&&(a[n].type="text");for(n=t=0;n<i;n++)a[n].type==="text"&&n+1<i&&a[n+1].type==="text"?a[n+1].content=a[n].content+a[n+1].content:(n!==t&&(a[t]=a[n]),t++);n!==t&&(a.length=t)}}const ht=[["normalize",nc],["block",tc],["inline",rc],["linkify",ic],["replacements",hc],["smartquotes",gc],["text_join",kc]];function or(){this.ruler=new K;for(let e=0;e<ht.length;e++)this.ruler.push(ht[e][0],ht[e][1])}or.prototype.process=function(e){const n=this.ruler.getRules("");for(let t=0,r=n.length;t<r;t++)n[t](e)};or.prototype.State=iu;function se(e,n,t,r){this.src=e,this.md=n,this.env=t,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const o=this.src;for(let u=0,a=0,i=0,c=0,l=o.length,d=!1;a<l;a++){const s=o.charCodeAt(a);if(!d)if(I(s)){i++,s===9?c+=4-c%4:c++;continue}else d=!0;(s===10||a===l-1)&&(s!==10&&a++,this.bMarks.push(u),this.eMarks.push(a),this.tShift.push(i),this.sCount.push(c),this.bsCount.push(0),d=!1,i=0,c=0,u=a+1)}this.bMarks.push(o.length),this.eMarks.push(o.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}se.prototype.push=function(e,n,t){const r=new re(e,n,t);return r.block=!0,t<0&&this.level--,r.level=this.level,t>0&&this.level++,this.tokens.push(r),r};se.prototype.isEmpty=function(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]};se.prototype.skipEmptyLines=function(n){for(let t=this.lineMax;n<t&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n};se.prototype.skipSpaces=function(n){for(let t=this.src.length;n<t;n++){const r=this.src.charCodeAt(n);if(!I(r))break}return n};se.prototype.skipSpacesBack=function(n,t){if(n<=t)return n;for(;n>t;)if(!I(this.src.charCodeAt(--n)))return n+1;return n};se.prototype.skipChars=function(n,t){for(let r=this.src.length;n<r&&this.src.charCodeAt(n)===t;n++);return n};se.prototype.skipCharsBack=function(n,t,r){if(n<=r)return n;for(;n>r;)if(t!==this.src.charCodeAt(--n))return n+1;return n};se.prototype.getLines=function(n,t,r,o){if(n>=t)return"";const u=new Array(t-n);for(let a=0,i=n;i<t;i++,a++){let c=0;const l=this.bMarks[i];let d=l,s;for(i+1<t||o?s=this.eMarks[i]+1:s=this.eMarks[i];d<s&&c<r;){const f=this.src.charCodeAt(d);if(I(f))f===9?c+=4-(c+this.bsCount[i])%4:c++;else if(d-l<this.tShift[i])c++;else break;d++}c>r?u[a]=new Array(c-r+1).join(" ")+this.src.slice(d,s):u[a]=this.src.slice(d,s)}return u.join("")};se.prototype.Token=re;const yc=65536;function pt(e,n){const t=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];return e.src.slice(t,r)}function Vr(e){const n=[],t=e.length;let r=0,o=e.charCodeAt(r),u=!1,a=0,i="";for(;r<t;)o===124&&(u?(i+=e.substring(a,r-1),a=r):(n.push(i+e.substring(a,r)),i="",a=r+1)),u=o===92,r++,o=e.charCodeAt(r);return n.push(i+e.substring(a)),n}function xc(e,n,t,r){if(n+2>t)return!1;let o=n+1;if(e.sCount[o]<e.blkIndent||e.sCount[o]-e.blkIndent>=4)return!1;let u=e.bMarks[o]+e.tShift[o];if(u>=e.eMarks[o])return!1;const a=e.src.charCodeAt(u++);if(a!==124&&a!==45&&a!==58||u>=e.eMarks[o])return!1;const i=e.src.charCodeAt(u++);if(i!==124&&i!==45&&i!==58&&!I(i)||a===45&&I(i))return!1;for(;u<e.eMarks[o];){const x=e.src.charCodeAt(u);if(x!==124&&x!==45&&x!==58&&!I(x))return!1;u++}let c=pt(e,n+1),l=c.split("|");const d=[];for(let x=0;x<l.length;x++){const v=l[x].trim();if(!v){if(x===0||x===l.length-1)continue;return!1}if(!/^:?-+:?$/.test(v))return!1;v.charCodeAt(v.length-1)===58?d.push(v.charCodeAt(0)===58?"center":"right"):v.charCodeAt(0)===58?d.push("left"):d.push("")}if(c=pt(e,n).trim(),c.indexOf("|")===-1||e.sCount[n]-e.blkIndent>=4)return!1;l=Vr(c),l.length&&l[0]===""&&l.shift(),l.length&&l[l.length-1]===""&&l.pop();const s=l.length;if(s===0||s!==d.length)return!1;if(r)return!0;const f=e.parentType;e.parentType="table";const h=e.md.block.ruler.getRules("blockquote"),p=e.push("table_open","table",1),m=[n,0];p.map=m;const b=e.push("thead_open","thead",1);b.map=[n,n+1];const g=e.push("tr_open","tr",1);g.map=[n,n+1];for(let x=0;x<l.length;x++){const v=e.push("th_open","th",1);d[x]&&(v.attrs=[["style","text-align:"+d[x]]]);const w=e.push("inline","",0);w.content=l[x].trim(),w.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let k,y=0;for(o=n+2;o<t&&!(e.sCount[o]<e.blkIndent);o++){let x=!1;for(let w=0,A=h.length;w<A;w++)if(h[w](e,o,t,!0)){x=!0;break}if(x||(c=pt(e,o).trim(),!c)||e.sCount[o]-e.blkIndent>=4||(l=Vr(c),l.length&&l[0]===""&&l.shift(),l.length&&l[l.length-1]===""&&l.pop(),y+=s-l.length,y>yc))break;if(o===n+2){const w=e.push("tbody_open","tbody",1);w.map=k=[n+2,0]}const v=e.push("tr_open","tr",1);v.map=[o,o+1];for(let w=0;w<s;w++){const A=e.push("td_open","td",1);d[w]&&(A.attrs=[["style","text-align:"+d[w]]]);const F=e.push("inline","",0);F.content=l[w]?l[w].trim():"",F.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return k&&(e.push("tbody_close","tbody",-1),k[1]=o),e.push("table_close","table",-1),m[1]=o,e.parentType=f,e.line=o,!0}function vc(e,n,t){if(e.sCount[n]-e.blkIndent<4)return!1;let r=n+1,o=r;for(;r<t;){if(e.isEmpty(r)){r++;continue}if(e.sCount[r]-e.blkIndent>=4){r++,o=r;continue}break}e.line=o;const u=e.push("code_block","code",0);return u.content=e.getLines(n,o,4+e.blkIndent,!1)+`
`,u.map=[n,e.line],!0}function wc(e,n,t,r){let o=e.bMarks[n]+e.tShift[n],u=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||o+3>u)return!1;const a=e.src.charCodeAt(o);if(a!==126&&a!==96)return!1;let i=o;o=e.skipChars(o,a);let c=o-i;if(c<3)return!1;const l=e.src.slice(i,o),d=e.src.slice(o,u);if(a===96&&d.indexOf(String.fromCharCode(a))>=0)return!1;if(r)return!0;let s=n,f=!1;for(;s++,!(s>=t||(o=i=e.bMarks[s]+e.tShift[s],u=e.eMarks[s],o<u&&e.sCount[s]<e.blkIndent));)if(e.src.charCodeAt(o)===a&&!(e.sCount[s]-e.blkIndent>=4)&&(o=e.skipChars(o,a),!(o-i<c)&&(o=e.skipSpaces(o),!(o<u)))){f=!0;break}c=e.sCount[n],e.line=s+(f?1:0);const h=e.push("fence","code",0);return h.info=d,h.content=e.getLines(n+1,s,c,!0),h.markup=l,h.map=[n,e.line],!0}function Cc(e,n,t,r){let o=e.bMarks[n]+e.tShift[n],u=e.eMarks[n];const a=e.lineMax;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(o)!==62)return!1;if(r)return!0;const i=[],c=[],l=[],d=[],s=e.md.block.ruler.getRules("blockquote"),f=e.parentType;e.parentType="blockquote";let h=!1,p;for(p=n;p<t;p++){const y=e.sCount[p]<e.blkIndent;if(o=e.bMarks[p]+e.tShift[p],u=e.eMarks[p],o>=u)break;if(e.src.charCodeAt(o++)===62&&!y){let v=e.sCount[p]+1,w,A;e.src.charCodeAt(o)===32?(o++,v++,A=!1,w=!0):e.src.charCodeAt(o)===9?(w=!0,(e.bsCount[p]+v)%4===3?(o++,v++,A=!1):A=!0):w=!1;let F=v;for(i.push(e.bMarks[p]),e.bMarks[p]=o;o<u;){const q=e.src.charCodeAt(o);if(I(q))q===9?F+=4-(F+e.bsCount[p]+(A?1:0))%4:F++;else break;o++}h=o>=u,c.push(e.bsCount[p]),e.bsCount[p]=e.sCount[p]+1+(w?1:0),l.push(e.sCount[p]),e.sCount[p]=F-v,d.push(e.tShift[p]),e.tShift[p]=o-e.bMarks[p];continue}if(h)break;let x=!1;for(let v=0,w=s.length;v<w;v++)if(s[v](e,p,t,!0)){x=!0;break}if(x){e.lineMax=p,e.blkIndent!==0&&(i.push(e.bMarks[p]),c.push(e.bsCount[p]),d.push(e.tShift[p]),l.push(e.sCount[p]),e.sCount[p]-=e.blkIndent);break}i.push(e.bMarks[p]),c.push(e.bsCount[p]),d.push(e.tShift[p]),l.push(e.sCount[p]),e.sCount[p]=-1}const m=e.blkIndent;e.blkIndent=0;const b=e.push("blockquote_open","blockquote",1);b.markup=">";const g=[n,0];b.map=g,e.md.block.tokenize(e,n,p);const k=e.push("blockquote_close","blockquote",-1);k.markup=">",e.lineMax=a,e.parentType=f,g[1]=e.line;for(let y=0;y<d.length;y++)e.bMarks[y+n]=i[y],e.tShift[y+n]=d[y],e.sCount[y+n]=l[y],e.bsCount[y+n]=c[y];return e.blkIndent=m,!0}function Ec(e,n,t,r){const o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let u=e.bMarks[n]+e.tShift[n];const a=e.src.charCodeAt(u++);if(a!==42&&a!==45&&a!==95)return!1;let i=1;for(;u<o;){const l=e.src.charCodeAt(u++);if(l!==a&&!I(l))return!1;l===a&&i++}if(i<3)return!1;if(r)return!0;e.line=n+1;const c=e.push("hr","hr",0);return c.map=[n,e.line],c.markup=Array(i+1).join(String.fromCharCode(a)),!0}function Wr(e,n){const t=e.eMarks[n];let r=e.bMarks[n]+e.tShift[n];const o=e.src.charCodeAt(r++);if(o!==42&&o!==45&&o!==43)return-1;if(r<t){const u=e.src.charCodeAt(r);if(!I(u))return-1}return r}function Kr(e,n){const t=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];let o=t;if(o+1>=r)return-1;let u=e.src.charCodeAt(o++);if(u<48||u>57)return-1;for(;;){if(o>=r)return-1;if(u=e.src.charCodeAt(o++),u>=48&&u<=57){if(o-t>=10)return-1;continue}if(u===41||u===46)break;return-1}return o<r&&(u=e.src.charCodeAt(o),!I(u))?-1:o}function _c(e,n){const t=e.level+2;for(let r=n+2,o=e.tokens.length-2;r<o;r++)e.tokens[r].level===t&&e.tokens[r].type==="paragraph_open"&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function Ac(e,n,t,r){let o,u,a,i,c=n,l=!0;if(e.sCount[c]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[c]-e.listIndent>=4&&e.sCount[c]<e.blkIndent)return!1;let d=!1;r&&e.parentType==="paragraph"&&e.sCount[c]>=e.blkIndent&&(d=!0);let s,f,h;if((h=Kr(e,c))>=0){if(s=!0,a=e.bMarks[c]+e.tShift[c],f=Number(e.src.slice(a,h-1)),d&&f!==1)return!1}else if((h=Wr(e,c))>=0)s=!1;else return!1;if(d&&e.skipSpaces(h)>=e.eMarks[c])return!1;if(r)return!0;const p=e.src.charCodeAt(h-1),m=e.tokens.length;s?(i=e.push("ordered_list_open","ol",1),f!==1&&(i.attrs=[["start",f]])):i=e.push("bullet_list_open","ul",1);const b=[c,0];i.map=b,i.markup=String.fromCharCode(p);let g=!1;const k=e.md.block.ruler.getRules("list"),y=e.parentType;for(e.parentType="list";c<t;){u=h,o=e.eMarks[c];const x=e.sCount[c]+h-(e.bMarks[c]+e.tShift[c]);let v=x;for(;u<o;){const Re=e.src.charCodeAt(u);if(Re===9)v+=4-(v+e.bsCount[c])%4;else if(Re===32)v++;else break;u++}const w=u;let A;w>=o?A=1:A=v-x,A>4&&(A=1);const F=x+A;i=e.push("list_item_open","li",1),i.markup=String.fromCharCode(p);const q=[c,0];i.map=q,s&&(i.info=e.src.slice(a,h-1));const we=e.tight,dt=e.tShift[c],Qi=e.sCount[c],Ji=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=F,e.tight=!0,e.tShift[c]=w-e.bMarks[c],e.sCount[c]=v,w>=o&&e.isEmpty(c+1)?e.line=Math.min(e.line+2,t):e.md.block.tokenize(e,c,t,!0),(!e.tight||g)&&(l=!1),g=e.line-c>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=Ji,e.tShift[c]=dt,e.sCount[c]=Qi,e.tight=we,i=e.push("list_item_close","li",-1),i.markup=String.fromCharCode(p),c=e.line,q[1]=c,c>=t||e.sCount[c]<e.blkIndent||e.sCount[c]-e.blkIndent>=4)break;let Nr=!1;for(let Re=0,Xi=k.length;Re<Xi;Re++)if(k[Re](e,c,t,!0)){Nr=!0;break}if(Nr)break;if(s){if(h=Kr(e,c),h<0)break;a=e.bMarks[c]+e.tShift[c]}else if(h=Wr(e,c),h<0)break;if(p!==e.src.charCodeAt(h-1))break}return s?i=e.push("ordered_list_close","ol",-1):i=e.push("bullet_list_close","ul",-1),i.markup=String.fromCharCode(p),b[1]=c,e.line=c,e.parentType=y,l&&_c(e,m),!0}function Sc(e,n,t,r){let o=e.bMarks[n]+e.tShift[n],u=e.eMarks[n],a=n+1;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(o)!==91)return!1;function i(k){const y=e.lineMax;if(k>=y||e.isEmpty(k))return null;let x=!1;if(e.sCount[k]-e.blkIndent>3&&(x=!0),e.sCount[k]<0&&(x=!0),!x){const A=e.md.block.ruler.getRules("reference"),F=e.parentType;e.parentType="reference";let q=!1;for(let we=0,dt=A.length;we<dt;we++)if(A[we](e,k,y,!0)){q=!0;break}if(e.parentType=F,q)return null}const v=e.bMarks[k]+e.tShift[k],w=e.eMarks[k];return e.src.slice(v,w+1)}let c=e.src.slice(o,u+1);u=c.length;let l=-1;for(o=1;o<u;o++){const k=c.charCodeAt(o);if(k===91)return!1;if(k===93){l=o;break}else if(k===10){const y=i(a);y!==null&&(c+=y,u=c.length,a++)}else if(k===92&&(o++,o<u&&c.charCodeAt(o)===10)){const y=i(a);y!==null&&(c+=y,u=c.length,a++)}}if(l<0||c.charCodeAt(l+1)!==58)return!1;for(o=l+2;o<u;o++){const k=c.charCodeAt(o);if(k===10){const y=i(a);y!==null&&(c+=y,u=c.length,a++)}else if(!I(k))break}const d=e.md.helpers.parseLinkDestination(c,o,u);if(!d.ok)return!1;const s=e.md.normalizeLink(d.str);if(!e.md.validateLink(s))return!1;o=d.pos;const f=o,h=a,p=o;for(;o<u;o++){const k=c.charCodeAt(o);if(k===10){const y=i(a);y!==null&&(c+=y,u=c.length,a++)}else if(!I(k))break}let m=e.md.helpers.parseLinkTitle(c,o,u);for(;m.can_continue;){const k=i(a);if(k===null)break;c+=k,o=u,u=c.length,a++,m=e.md.helpers.parseLinkTitle(c,o,u,m)}let b;for(o<u&&p!==o&&m.ok?(b=m.str,o=m.pos):(b="",o=f,a=h);o<u;){const k=c.charCodeAt(o);if(!I(k))break;o++}if(o<u&&c.charCodeAt(o)!==10&&b)for(b="",o=f,a=h;o<u;){const k=c.charCodeAt(o);if(!I(k))break;o++}if(o<u&&c.charCodeAt(o)!==10)return!1;const g=Yn(c.slice(1,l));return g?(r||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[g]>"u"&&(e.env.references[g]={title:b,href:s}),e.line=a),!0):!1}const Tc=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Dc="[a-zA-Z_:][a-zA-Z0-9:._-]*",Mc="[^\"'=<>`\\x00-\\x20]+",Fc="'[^']*'",Ic='"[^"]*"',Lc="(?:"+Mc+"|"+Fc+"|"+Ic+")",Nc="(?:\\s+"+Dc+"(?:\\s*=\\s*"+Lc+")?)",cu="<[A-Za-z][A-Za-z0-9\\-]*"+Nc+"*\\s*\\/?>",su="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Rc="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Oc="<[?][\\s\\S]*?[?]>",Bc="<![A-Za-z][^>]*>",Pc="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",zc=new RegExp("^(?:"+cu+"|"+su+"|"+Rc+"|"+Oc+"|"+Bc+"|"+Pc+")"),Hc=new RegExp("^(?:"+cu+"|"+su+")"),Ce=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Za-z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Tc.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(Hc.source+"\\s*$"),/^$/,!1]];function qc(e,n,t,r){let o=e.bMarks[n]+e.tShift[n],u=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(o)!==60)return!1;let a=e.src.slice(o,u),i=0;for(;i<Ce.length&&!Ce[i][0].test(a);i++);if(i===Ce.length)return!1;if(r)return Ce[i][2];let c=n+1;const l=Ce[i][1].test("");if(!Ce[i][1].test(a)){for(;c<t&&!(e.sCount[c]<e.blkIndent&&(l||!e.isEmpty(c)));c++)if(o=e.bMarks[c]+e.tShift[c],u=e.eMarks[c],a=e.src.slice(o,u),Ce[i][1].test(a)){a.length!==0&&c++;break}}e.line=c;const d=e.push("html_block","",0);return d.map=[n,c],d.content=e.getLines(n,c,e.blkIndent,!0),!0}function $c(e,n,t,r){let o=e.bMarks[n]+e.tShift[n],u=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let a=e.src.charCodeAt(o);if(a!==35||o>=u)return!1;let i=1;for(a=e.src.charCodeAt(++o);a===35&&o<u&&i<=6;)i++,a=e.src.charCodeAt(++o);if(i>6||o<u&&!I(a))return!1;if(r)return!0;u=e.skipSpacesBack(u,o);const c=e.skipCharsBack(u,35,o);c>o&&I(e.src.charCodeAt(c-1))&&(u=c),e.line=n+1;const l=e.push("heading_open","h"+String(i),1);l.markup="########".slice(0,i),l.map=[n,e.line];const d=e.push("inline","",0);d.content=Qn(e.src.slice(o,u)),d.map=[n,e.line],d.children=[];const s=e.push("heading_close","h"+String(i),-1);return s.markup="########".slice(0,i),!0}function jc(e,n,t){const r=e.md.block.ruler.getRules("paragraph");if(e.sCount[n]-e.blkIndent>=4)return!1;const o=e.parentType;e.parentType="paragraph";let u=0,a,i=n+1;for(;i<t&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3)continue;if(e.sCount[i]>=e.blkIndent){let h=e.bMarks[i]+e.tShift[i];const p=e.eMarks[i];if(h<p&&(a=e.src.charCodeAt(h),(a===45||a===61)&&(h=e.skipChars(h,a),h=e.skipSpaces(h),h>=p))){u=a===61?1:2;break}}if(e.sCount[i]<0)continue;let f=!1;for(let h=0,p=r.length;h<p;h++)if(r[h](e,i,t,!0)){f=!0;break}if(f)break}if(!u)return e.parentType=o,!1;const c=Qn(e.getLines(n,i,e.blkIndent,!1));e.line=i+1;const l=e.push("heading_open","h"+String(u),1);l.markup=String.fromCharCode(a),l.map=[n,e.line];const d=e.push("inline","",0);d.content=c,d.map=[n,e.line-1],d.children=[];const s=e.push("heading_close","h"+String(u),-1);return s.markup=String.fromCharCode(a),e.parentType=o,!0}function Uc(e,n,t){const r=e.md.block.ruler.getRules("paragraph"),o=e.parentType;let u=n+1;for(e.parentType="paragraph";u<t&&!e.isEmpty(u);u++){if(e.sCount[u]-e.blkIndent>3||e.sCount[u]<0)continue;let l=!1;for(let d=0,s=r.length;d<s;d++)if(r[d](e,u,t,!0)){l=!0;break}if(l)break}const a=Qn(e.getLines(n,u,e.blkIndent,!1));e.line=u;const i=e.push("paragraph_open","p",1);i.map=[n,e.line];const c=e.push("inline","",0);return c.content=a,c.map=[n,e.line],c.children=[],e.push("paragraph_close","p",-1),e.parentType=o,!0}const Sn=[["table",xc,["paragraph","reference"]],["code",vc],["fence",wc,["paragraph","reference","blockquote","list"]],["blockquote",Cc,["paragraph","reference","blockquote","list"]],["hr",Ec,["paragraph","reference","blockquote","list"]],["list",Ac,["paragraph","reference","blockquote"]],["reference",Sc],["html_block",qc,["paragraph","reference","blockquote"]],["heading",$c,["paragraph","reference","blockquote"]],["lheading",jc],["paragraph",Uc]];function Jn(){this.ruler=new K;for(let e=0;e<Sn.length;e++)this.ruler.push(Sn[e][0],Sn[e][1],{alt:(Sn[e][2]||[]).slice()})}Jn.prototype.tokenize=function(e,n,t){const r=this.ruler.getRules(""),o=r.length,u=e.md.options.maxNesting;let a=n,i=!1;for(;a<t&&(e.line=a=e.skipEmptyLines(a),!(a>=t||e.sCount[a]<e.blkIndent));){if(e.level>=u){e.line=t;break}const c=e.line;let l=!1;for(let d=0;d<o;d++)if(l=r[d](e,a,t,!1),l){if(c>=e.line)throw new Error("block rule didn't increment state.line");break}if(!l)throw new Error("none of the block rules matched");e.tight=!i,e.isEmpty(e.line-1)&&(i=!0),a=e.line,a<t&&e.isEmpty(a)&&(i=!0,a++,e.line=a)}};Jn.prototype.parse=function(e,n,t,r){if(!e)return;const o=new this.State(e,n,t,r);this.tokenize(o,o.line,o.lineMax)};Jn.prototype.State=se;function vn(e,n,t,r){this.src=e,this.env=t,this.md=n,this.tokens=r,this.tokens_meta=Array(r.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}vn.prototype.pushPending=function(){const e=new re("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};vn.prototype.push=function(e,n,t){this.pending&&this.pushPending();const r=new re(e,n,t);let o=null;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],o={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(o),r};vn.prototype.scanDelims=function(e,n){const t=this.posMax,r=this.src.charCodeAt(e);let o;if(e===0)o=32;else if(e===1)o=this.src.charCodeAt(0),(o&63488)===55296&&(o=65533);else if(o=this.src.charCodeAt(e-1),(o&64512)===56320){const b=this.src.charCodeAt(e-2);o=(b&64512)===55296?65536+(b-55296<<10)+(o-56320):65533}else(o&64512)===55296&&(o=65533);let u=e;for(;u<t&&this.src.charCodeAt(u)===r;)u++;const a=u-e;let i=u<t?this.src.charCodeAt(u):32;if((i&64512)===55296){const b=this.src.charCodeAt(u+1);i=(b&64512)===56320?65536+(i-55296<<10)+(b-56320):65533}else(i&64512)===56320&&(i=65533);const c=mn(o)||pn(o),l=mn(i)||pn(i),d=hn(o),s=hn(i),f=!s&&(!l||d||c),h=!d&&(!c||s||l);return{can_open:f&&(n||!h||c),can_close:h&&(n||!f||l),length:a}};vn.prototype.Token=re;function Gc(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function Vc(e,n){let t=e.pos;for(;t<e.posMax&&!Gc(e.src.charCodeAt(t));)t++;return t===e.pos?!1:(n||(e.pending+=e.src.slice(e.pos,t)),e.pos=t,!0)}function Wc(e){return e>=65&&e<=90||e>=97&&e<=122}function Kc(e){return e>=65&&e<=90||e>=97&&e<=122||e>=48&&e<=57||e===43||e===45||e===46}function Zc(e,n){if(!e.md.options.linkify||e.linkLevel>0)return!1;const t=e.pos,r=e.posMax;if(t+3>r||e.src.charCodeAt(t)!==58||e.src.charCodeAt(t+1)!==47||e.src.charCodeAt(t+2)!==47)return!1;const o=t-Math.min(10,e.pending.length,t);let u=t;for(;u>o&&Kc(e.src.charCodeAt(u-1));)u--;if(u===t||!Wc(e.src.charCodeAt(u)))return!1;const a=t-u,i=e.md.linkify.matchAtStart(e.src.slice(u));if(!i)return!1;let c=i.url;if(c.length<=a)return!1;let l=c.length;for(;l>0&&c.charCodeAt(l-1)===42;)l--;l!==c.length&&(c=c.slice(0,l));const d=e.md.normalizeLink(c);if(!e.md.validateLink(d))return!1;if(!n){e.pending=e.pending.slice(0,-a);const s=e.push("link_open","a",1);s.attrs=[["href",d]],s.markup="linkify",s.info="auto";const f=e.push("text","",0);f.content=e.md.normalizeLinkText(c);const h=e.push("link_close","a",-1);h.markup="linkify",h.info="auto"}return e.pos+=c.length-a,!0}function Yc(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==10)return!1;const r=e.pending.length-1,o=e.posMax;if(!n)if(r>=0&&e.pending.charCodeAt(r)===32)if(r>=1&&e.pending.charCodeAt(r-1)===32){let u=r-1;for(;u>=1&&e.pending.charCodeAt(u-1)===32;)u--;e.pending=e.pending.slice(0,u),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(t++;t<o&&I(e.src.charCodeAt(t));)t++;return e.pos=t,!0}const ur=[];for(let e=0;e<256;e++)ur.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){ur[e.charCodeAt(0)]=1});function Qc(e,n){let t=e.pos;const r=e.posMax;if(e.src.charCodeAt(t)!==92||(t++,t>=r))return!1;let o=e.src.charCodeAt(t);if(o===10){for(n||e.push("hardbreak","br",0),t++;t<r&&(o=e.src.charCodeAt(t),!!I(o));)t++;return e.pos=t,!0}if(o===32){if(!n){const i=e.push("text_special","",0);i.content="\\",i.markup="\\",i.info="escape"}return e.pos=t,!0}let u=e.src[t];if(o>=55296&&o<=56319&&t+1<r){const i=e.src.charCodeAt(t+1);i>=56320&&i<=57343&&(u+=e.src[t+1],t++)}const a="\\"+u;if(!n){const i=e.push("text_special","",0);o<256&&ur[o]!==0?i.content=u:i.content=a,i.markup=a,i.info="escape"}return e.pos=t+1,!0}function Jc(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==96)return!1;const o=t;t++;const u=e.posMax;for(;t<u&&e.src.charCodeAt(t)===96;)t++;const a=e.src.slice(o,t),i=a.length;if(e.backticksScanned&&(e.backticks[i]||0)<=o)return n||(e.pending+=a),e.pos+=i,!0;let c=t,l;for(;(l=e.src.indexOf("`",c))!==-1;){for(c=l+1;c<u&&e.src.charCodeAt(c)===96;)c++;const d=c-l;if(d===i){if(!n){const s=e.push("code_inline","code",0);s.markup=a,s.content=e.src.slice(t,l).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=c,!0}e.backticks[d]=l}return e.backticksScanned=!0,n||(e.pending+=a),e.pos+=i,!0}function Xc(e,n){const t=e.pos,r=e.src.charCodeAt(t);if(n||r!==126)return!1;const o=e.scanDelims(e.pos,!0);let u=o.length;const a=String.fromCharCode(r);if(u<2)return!1;let i;u%2&&(i=e.push("text","",0),i.content=a,u--);for(let c=0;c<u;c+=2)i=e.push("text","",0),i.content=a+a,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:o.can_open,close:o.can_close});return e.pos+=o.length,!0}function Zr(e,n){let t;const r=[],o=n.length;for(let u=0;u<o;u++){const a=n[u];if(a.marker!==126||a.end===-1)continue;const i=n[a.end];t=e.tokens[a.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=e.tokens[i.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",e.tokens[i.token-1].type==="text"&&e.tokens[i.token-1].content==="~"&&r.push(i.token-1)}for(;r.length;){const u=r.pop();let a=u+1;for(;a<e.tokens.length&&e.tokens[a].type==="s_close";)a++;a--,u!==a&&(t=e.tokens[a],e.tokens[a]=e.tokens[u],e.tokens[u]=t)}}function es(e){const n=e.tokens_meta,t=e.tokens_meta.length;Zr(e,e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&Zr(e,n[r].delimiters)}const lu={tokenize:Xc,postProcess:es};function ns(e,n){const t=e.pos,r=e.src.charCodeAt(t);if(n||r!==95&&r!==42)return!1;const o=e.scanDelims(e.pos,r===42);for(let u=0;u<o.length;u++){const a=e.push("text","",0);a.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:o.length,token:e.tokens.length-1,end:-1,open:o.can_open,close:o.can_close})}return e.pos+=o.length,!0}function Yr(e,n){const t=n.length;for(let r=t-1;r>=0;r--){const o=n[r];if(o.marker!==95&&o.marker!==42||o.end===-1)continue;const u=n[o.end],a=r>0&&n[r-1].end===o.end+1&&n[r-1].marker===o.marker&&n[r-1].token===o.token-1&&n[o.end+1].token===u.token+1,i=String.fromCharCode(o.marker),c=e.tokens[o.token];c.type=a?"strong_open":"em_open",c.tag=a?"strong":"em",c.nesting=1,c.markup=a?i+i:i,c.content="";const l=e.tokens[u.token];l.type=a?"strong_close":"em_close",l.tag=a?"strong":"em",l.nesting=-1,l.markup=a?i+i:i,l.content="",a&&(e.tokens[n[r-1].token].content="",e.tokens[n[o.end+1].token].content="",r--)}}function ts(e){const n=e.tokens_meta,t=e.tokens_meta.length;Yr(e,e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&Yr(e,n[r].delimiters)}const du={tokenize:ns,postProcess:ts};function rs(e,n){let t,r,o,u,a="",i="",c=e.pos,l=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const d=e.pos,s=e.posMax,f=e.pos+1,h=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(h<0)return!1;let p=h+1;if(p<s&&e.src.charCodeAt(p)===40){for(l=!1,p++;p<s&&(t=e.src.charCodeAt(p),!(!I(t)&&t!==10));p++);if(p>=s)return!1;if(c=p,o=e.md.helpers.parseLinkDestination(e.src,p,e.posMax),o.ok){for(a=e.md.normalizeLink(o.str),e.md.validateLink(a)?p=o.pos:a="",c=p;p<s&&(t=e.src.charCodeAt(p),!(!I(t)&&t!==10));p++);if(o=e.md.helpers.parseLinkTitle(e.src,p,e.posMax),p<s&&c!==p&&o.ok)for(i=o.str,p=o.pos;p<s&&(t=e.src.charCodeAt(p),!(!I(t)&&t!==10));p++);}(p>=s||e.src.charCodeAt(p)!==41)&&(l=!0),p++}if(l){if(typeof e.env.references>"u")return!1;if(p<s&&e.src.charCodeAt(p)===91?(c=p+1,p=e.md.helpers.parseLinkLabel(e,p),p>=0?r=e.src.slice(c,p++):p=h+1):p=h+1,r||(r=e.src.slice(f,h)),u=e.env.references[Yn(r)],!u)return e.pos=d,!1;a=u.href,i=u.title}if(!n){e.pos=f,e.posMax=h;const m=e.push("link_open","a",1),b=[["href",a]];m.attrs=b,i&&b.push(["title",i]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=p,e.posMax=s,!0}function os(e,n){let t,r,o,u,a,i,c,l,d="";const s=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const h=e.pos+2,p=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(p<0)return!1;if(u=p+1,u<f&&e.src.charCodeAt(u)===40){for(u++;u<f&&(t=e.src.charCodeAt(u),!(!I(t)&&t!==10));u++);if(u>=f)return!1;for(l=u,i=e.md.helpers.parseLinkDestination(e.src,u,e.posMax),i.ok&&(d=e.md.normalizeLink(i.str),e.md.validateLink(d)?u=i.pos:d=""),l=u;u<f&&(t=e.src.charCodeAt(u),!(!I(t)&&t!==10));u++);if(i=e.md.helpers.parseLinkTitle(e.src,u,e.posMax),u<f&&l!==u&&i.ok)for(c=i.str,u=i.pos;u<f&&(t=e.src.charCodeAt(u),!(!I(t)&&t!==10));u++);else c="";if(u>=f||e.src.charCodeAt(u)!==41)return e.pos=s,!1;u++}else{if(typeof e.env.references>"u")return!1;if(u<f&&e.src.charCodeAt(u)===91?(l=u+1,u=e.md.helpers.parseLinkLabel(e,u),u>=0?o=e.src.slice(l,u++):u=p+1):u=p+1,o||(o=e.src.slice(h,p)),a=e.env.references[Yn(o)],!a)return e.pos=s,!1;d=a.href,c=a.title}if(!n){r=e.src.slice(h,p);const m=[];e.md.inline.parse(r,e.md,e.env,m);const b=e.push("image","img",0),g=[["src",d],["alt",""]];b.attrs=g,b.children=m,b.content=r,c&&g.push(["title",c])}return e.pos=u,e.posMax=f,!0}const us=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,is=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function as(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==60)return!1;const r=e.pos,o=e.posMax;for(;;){if(++t>=o)return!1;const a=e.src.charCodeAt(t);if(a===60)return!1;if(a===62)break}const u=e.src.slice(r+1,t);if(is.test(u)){const a=e.md.normalizeLink(u);if(!e.md.validateLink(a))return!1;if(!n){const i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(u);const l=e.push("link_close","a",-1);l.markup="autolink",l.info="auto"}return e.pos+=u.length+2,!0}if(us.test(u)){const a=e.md.normalizeLink("mailto:"+u);if(!e.md.validateLink(a))return!1;if(!n){const i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(u);const l=e.push("link_close","a",-1);l.markup="autolink",l.info="auto"}return e.pos+=u.length+2,!0}return!1}function cs(e){return/^<a[>\s]/i.test(e)}function ss(e){return/^<\/a\s*>/i.test(e)}function ls(e){const n=e|32;return n>=97&&n<=122}function ds(e,n){if(!e.md.options.html)return!1;const t=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=t)return!1;const o=e.src.charCodeAt(r+1);if(o!==33&&o!==63&&o!==47&&!ls(o))return!1;const u=e.src.slice(r).match(zc);if(!u)return!1;if(!n){const a=e.push("html_inline","",0);a.content=u[0],cs(a.content)&&e.linkLevel++,ss(a.content)&&e.linkLevel--}return e.pos+=u[0].length,!0}const fs=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,hs=/^&([a-z][a-z0-9]{1,31});/i;function ps(e,n){const t=e.pos,r=e.posMax;if(e.src.charCodeAt(t)!==38||t+1>=r)return!1;if(e.src.charCodeAt(t+1)===35){const u=e.src.slice(t).match(fs);if(u){if(!n){const a=u[1][0].toLowerCase()==="x"?parseInt(u[1].slice(1),16):parseInt(u[1],10),i=e.push("text_special","",0);i.content=rr(a)?fn(a):fn(65533),i.markup=u[0],i.info="entity"}return e.pos+=u[0].length,!0}}else{const u=e.src.slice(t).match(hs);if(u){const a=Fa(u[0]);if(a!==u[0]){if(!n){const i=e.push("text_special","",0);i.content=a,i.markup=u[0],i.info="entity"}return e.pos+=u[0].length,!0}}}return!1}function Qr(e){const n={},t=e.length;if(!t)return;let r=0,o=-2;const u=[];for(let a=0;a<t;a++){const i=e[a];if(u.push(0),(e[r].marker!==i.marker||o!==i.token-1)&&(r=a),o=i.token,i.length=i.length||0,!i.close)continue;n.hasOwnProperty(i.marker)||(n[i.marker]=[-1,-1,-1,-1,-1,-1]);const c=n[i.marker][(i.open?3:0)+i.length%3];let l=r-u[r]-1,d=l;for(;l>c;l-=u[l]+1){const s=e[l];if(s.marker===i.marker&&s.open&&s.end<0){let f=!1;if((s.close||i.open)&&(s.length+i.length)%3===0&&(s.length%3!==0||i.length%3!==0)&&(f=!0),!f){const h=l>0&&!e[l-1].open?u[l-1]+1:0;u[a]=a-l+h,u[l]=h,i.open=!1,s.end=a,s.close=!1,d=-1,o=-2;break}}}d!==-1&&(n[i.marker][(i.open?3:0)+(i.length||0)%3]=d)}}function ms(e){const n=e.tokens_meta,t=e.tokens_meta.length;Qr(e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&Qr(n[r].delimiters)}function bs(e){let n,t,r=0;const o=e.tokens,u=e.tokens.length;for(n=t=0;n<u;n++)o[n].nesting<0&&r--,o[n].level=r,o[n].nesting>0&&r++,o[n].type==="text"&&n+1<u&&o[n+1].type==="text"?o[n+1].content=o[n].content+o[n+1].content:(n!==t&&(o[t]=o[n]),t++);n!==t&&(o.length=t)}const mt=[["text",Vc],["linkify",Zc],["newline",Yc],["escape",Qc],["backticks",Jc],["strikethrough",lu.tokenize],["emphasis",du.tokenize],["link",rs],["image",os],["autolink",as],["html_inline",ds],["entity",ps]],bt=[["balance_pairs",ms],["strikethrough",lu.postProcess],["emphasis",du.postProcess],["fragments_join",bs]];function wn(){this.ruler=new K;for(let e=0;e<mt.length;e++)this.ruler.push(mt[e][0],mt[e][1]);this.ruler2=new K;for(let e=0;e<bt.length;e++)this.ruler2.push(bt[e][0],bt[e][1])}wn.prototype.skipToken=function(e){const n=e.pos,t=this.ruler.getRules(""),r=t.length,o=e.md.options.maxNesting,u=e.cache;if(typeof u[n]<"u"){e.pos=u[n];return}let a=!1;if(e.level<o){for(let i=0;i<r;i++)if(e.level++,a=t[i](e,!0),e.level--,a){if(n>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;a||e.pos++,u[n]=e.pos};wn.prototype.tokenize=function(e){const n=this.ruler.getRules(""),t=n.length,r=e.posMax,o=e.md.options.maxNesting;for(;e.pos<r;){const u=e.pos;let a=!1;if(e.level<o){for(let i=0;i<t;i++)if(a=n[i](e,!1),a){if(u>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(a){if(e.pos>=r)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};wn.prototype.parse=function(e,n,t,r){const o=new this.State(e,n,t,r);this.tokenize(o);const u=this.ruler2.getRules(""),a=u.length;for(let i=0;i<a;i++)u[i](o)};wn.prototype.State=vn;function gs(e){const n={};e=e||{},n.src_Any=Jo.source,n.src_Cc=Xo.source,n.src_Z=nu.source,n.src_P=nr.source,n.src_ZPCc=[n.src_Z,n.src_P,n.src_Cc].join("|"),n.src_ZCc=[n.src_Z,n.src_Cc].join("|");const t="[><｜]";return n.src_pseudo_letter=`(?:(?!${t}|${n.src_ZPCc})${n.src_Any})`,n.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",n.src_auth=`(?:(?:(?!${n.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`,n.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",n.src_host_terminator=`(?=$|${t}|${n.src_ZPCc})(?!${e["---"]?"-(?!--)|":"-|"}_|:\\d|\\.-|\\.(?!$|${n.src_ZPCc}))`,n.src_path=`(?:[/?#](?:(?!${n.src_ZCc}|${t}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${n.src_ZCc}|\\]).)*\\]|\\((?:(?!${n.src_ZCc}|[)]).)*\\)|\\{(?:(?!${n.src_ZCc}|[}]).)*\\}|\\"(?:(?!${n.src_ZCc}|["]).)+\\"|\\'(?:(?!${n.src_ZCc}|[']).)+\\'|\\'(?=${n.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${n.src_ZCc}|[.]|$)|`+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+`,(?!${n.src_ZCc}|$)|;(?!${n.src_ZCc}|$)|\\!+(?!${n.src_ZCc}|[!]|$)|\\?(?!${n.src_ZCc}|[?]|$))+|\\/)?`,n.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]{0,63}',n.src_xn="xn--[a-z0-9\\-]{1,59}",n.src_domain_root="(?:"+n.src_xn+`|${n.src_pseudo_letter}{1,63})`,n.src_domain="(?:"+n.src_xn+`|(?:${n.src_pseudo_letter})|(?:${n.src_pseudo_letter}(?:-|${n.src_pseudo_letter}){0,61}${n.src_pseudo_letter}))`,n.src_host=`(?:(?:(?:(?:${n.src_domain})\\.)*${n.src_domain}))`,n.tpl_host_fuzzy="(?:"+n.src_ip4+`|(?:(?:(?:${n.src_domain})\\.)+(?:%TLDS%)))`,n.tpl_host_no_ip_fuzzy=`(?:(?:(?:${n.src_domain})\\.)+(?:%TLDS%))`,n.src_host_strict=n.src_host+n.src_host_terminator,n.tpl_host_fuzzy_strict=n.tpl_host_fuzzy+n.src_host_terminator,n.src_host_port_strict=n.src_host+n.src_port+n.src_host_terminator,n.tpl_host_port_fuzzy_strict=n.tpl_host_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_port_no_ip_fuzzy_strict=n.tpl_host_no_ip_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_fuzzy_test=`localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${n.src_ZPCc}|>|$))`,n.tpl_email_fuzzy=`(^|${t}|"|\\(|${n.src_ZCc})(${n.src_email_name}@${n.tpl_host_fuzzy_strict})`,n.tpl_link_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${n.src_ZPCc}))((?![$+<=>^\`|｜])${n.tpl_host_port_fuzzy_strict}${n.src_path})`,n.tpl_link_no_ip_fuzzy=`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${n.src_ZPCc}))((?![$+<=>^\`|｜])${n.tpl_host_port_no_ip_fuzzy_strict}${n.src_path})`,n}function Pt(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(r){e[r]=t[r]})}),e}function Xn(e){return Object.prototype.toString.call(e)}function ks(e){return Xn(e)==="[object String]"}function ys(e){return Xn(e)==="[object Object]"}function xs(e){return Xn(e)==="[object RegExp]"}function Jr(e){return Xn(e)==="[object Function]"}function vs(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const fu={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function ws(e){return Object.keys(e||{}).reduce(function(n,t){return n||fu.hasOwnProperty(t)},!1)}const Cs={"http:":{validate:function(e,n,t){const r=e.slice(n);return t.re.http||(t.re.http=new RegExp(`^\\/\\/${t.re.src_auth}${t.re.src_host_port_strict}${t.re.src_path}`,"i")),t.re.http.test(r)?r.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,n,t){const r=e.slice(n);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+`(?:localhost|(?:(?:${t.re.src_domain})\\.)+${t.re.src_domain_root})`+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(r)?n>=3&&e[n-3]===":"||n>=3&&e[n-3]==="/"?0:r.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(e,n,t){const r=e.slice(n);return t.re.mailto||(t.re.mailto=new RegExp(`^${t.re.src_email_name}@${t.re.src_host_strict}`,"i")),t.re.mailto.test(r)?r.match(t.re.mailto)[0].length:0}}},Es="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",_s="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function As(e){return function(n,t){const r=n.slice(t);return e.test(r)?r.match(e)[0].length:0}}function Xr(){return function(e,n){n.normalize(e)}}function Bn(e){const n=e.re=gs(e.__opts__),t=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||t.push(Es),t.push(n.src_xn),n.src_tlds=t.join("|");function r(i){return i.replace("%TLDS%",n.src_tlds)}n.email_fuzzy=RegExp(r(n.tpl_email_fuzzy),"i"),n.email_fuzzy_global=RegExp(r(n.tpl_email_fuzzy),"ig"),n.link_fuzzy=RegExp(r(n.tpl_link_fuzzy),"i"),n.link_fuzzy_global=RegExp(r(n.tpl_link_fuzzy),"ig"),n.link_no_ip_fuzzy=RegExp(r(n.tpl_link_no_ip_fuzzy),"i"),n.link_no_ip_fuzzy_global=RegExp(r(n.tpl_link_no_ip_fuzzy),"ig"),n.host_fuzzy_test=RegExp(r(n.tpl_host_fuzzy_test),"i");const o=[];e.__compiled__={};function u(i,c){throw new Error(`(LinkifyIt) Invalid schema "${i}": ${c}`)}Object.keys(e.__schemas__).forEach(function(i){const c=e.__schemas__[i];if(c===null)return;const l={validate:null,link:null};if(e.__compiled__[i]=l,ys(c)){xs(c.validate)?l.validate=As(c.validate):Jr(c.validate)?l.validate=c.validate:u(i,c),Jr(c.normalize)?l.normalize=c.normalize:c.normalize?u(i,c):l.normalize=Xr();return}if(ks(c)){o.push(i);return}u(i,c)}),o.forEach(function(i){e.__compiled__[e.__schemas__[i]]&&(e.__compiled__[i].validate=e.__compiled__[e.__schemas__[i]].validate,e.__compiled__[i].normalize=e.__compiled__[e.__schemas__[i]].normalize)}),e.__compiled__[""]={validate:null,normalize:Xr()};const a=Object.keys(e.__compiled__).filter(function(i){return i.length>0&&e.__compiled__[i]}).map(vs).join("|");e.re.schema_test=RegExp(`(^|(?!_)(?:[><｜]|${n.src_ZPCc}))(${a})`,"i"),e.re.schema_search=RegExp(`(^|(?!_)(?:[><｜]|${n.src_ZPCc}))(${a})`,"ig"),e.re.schema_at_start=RegExp(`^${e.re.schema_search.source}`,"i"),e.re.pretest=RegExp(`(${e.re.schema_test.source})|(${e.re.host_fuzzy_test.source})|@`,"i")}function hu(e,n,t,r){const o=e.slice(t,r);this.schema=n.toLowerCase(),this.index=t,this.lastIndex=r,this.raw=o,this.text=o,this.url=o}function Y(e,n){if(!(this instanceof Y))return new Y(e,n);n||ws(e)&&(n=e,e={}),this.__opts__=Pt({},fu,n),this.__schemas__=Pt({},Cs,e),this.__compiled__={},this.__tlds__=_s,this.__tlds_replaced__=!1,this.re={},Bn(this)}Y.prototype.add=function(n,t){return this.__schemas__[n]=t,Bn(this),this};Y.prototype.set=function(n){return this.__opts__=Pt(this.__opts__,n),this};Y.prototype.test=function(n){if(!n.length)return!1;let t,r;if(this.re.schema_test.test(n)){for(r=this.re.schema_search,r.lastIndex=0;(t=r.exec(n))!==null;)if(this.testSchemaAt(n,t[2],r.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&n.search(this.re.host_fuzzy_test)>=0&&n.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&n.indexOf("@")>=0&&n.match(this.re.email_fuzzy)!==null)};Y.prototype.pretest=function(n){return this.re.pretest.test(n)};Y.prototype.testSchemaAt=function(n,t,r){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(n,r,this):0};Y.prototype.match=function(n){const t=[],r=[],o=[],u=[];let a,i,c;function l(f,h){return f?h?f.index!==h.index?f.index<h.index?f:h:f.lastIndex>=h.lastIndex?f:h:f:h}if(!n.length)return null;if(this.re.schema_test.test(n))for(c=this.re.schema_search,c.lastIndex=0;(a=c.exec(n))!==null;)i=this.testSchemaAt(n,a[2],c.lastIndex),i&&r.push({schema:a[2],index:a.index+a[1].length,lastIndex:a.index+a[0].length+i});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(c=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,c.lastIndex=0;(a=c.exec(n))!==null;)o.push({schema:"",index:a.index+a[1].length,lastIndex:a.index+a[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(c=this.re.email_fuzzy_global,c.lastIndex=0;(a=c.exec(n))!==null;)u.push({schema:"mailto:",index:a.index+a[1].length,lastIndex:a.index+a[0].length});const d=[0,0,0];let s=0;for(;;){const f=[r[d[0]],u[d[1]],o[d[2]]],h=l(l(f[0],f[1]),f[2]);if(!h)break;if(h===f[0]?d[0]++:h===f[1]?d[1]++:d[2]++,h.index<s)continue;const p=new hu(n,h.schema,h.index,h.lastIndex);this.__compiled__[p.schema].normalize(p,this),t.push(p),s=h.lastIndex}return t.length?t:null};Y.prototype.matchAtStart=function(n){if(!n.length)return null;const t=this.re.schema_at_start.exec(n);if(!t)return null;const r=this.testSchemaAt(n,t[2],t[0].length);if(!r)return null;const o=new hu(n,t[2],t.index+t[1].length,t.index+t[0].length+r);return this.__compiled__[o.schema].normalize(o,this),o};Y.prototype.tlds=function(n,t){return n=Array.isArray(n)?n:[n],t?(this.__tlds__=this.__tlds__.concat(n).sort().filter(function(r,o,u){return r!==u[o-1]}).reverse(),Bn(this),this):(this.__tlds__=n.slice(),this.__tlds_replaced__=!0,Bn(this),this)};Y.prototype.normalize=function(n){n.schema||(n.url=`http://${n.url}`),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url=`mailto:${n.url}`)};Y.prototype.onCompile=function(){};const $e=2147483647,ue=36,ir=1,bn=26,Ss=38,Ts=700,pu=72,mu=128,bu="-",Ds=/^xn--/,Ms=/[^\0-\x7F]/,Fs=/[\x2E\u3002\uFF0E\uFF61]/g,Is={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},gt=ue-ir,ie=Math.floor,kt=String.fromCharCode;function be(e){throw new RangeError(Is[e])}function Ls(e,n){const t=[];let r=e.length;for(;r--;)t[r]=n(e[r]);return t}function gu(e,n){const t=e.split("@");let r="";t.length>1&&(r=t[0]+"@",e=t[1]),e=e.replace(Fs,".");const o=e.split("."),u=Ls(o,n).join(".");return r+u}function ku(e){const n=[];let t=0;const r=e.length;for(;t<r;){const o=e.charCodeAt(t++);if(o>=55296&&o<=56319&&t<r){const u=e.charCodeAt(t++);(u&64512)==56320?n.push(((o&1023)<<10)+(u&1023)+65536):(n.push(o),t--)}else n.push(o)}return n}const Ns=e=>String.fromCodePoint(...e),Rs=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:ue},eo=function(e,n){return e+22+75*(e<26)-((n!=0)<<5)},yu=function(e,n,t){let r=0;for(e=t?ie(e/Ts):e>>1,e+=ie(e/n);e>gt*bn>>1;r+=ue)e=ie(e/gt);return ie(r+(gt+1)*e/(e+Ss))},xu=function(e){const n=[],t=e.length;let r=0,o=mu,u=pu,a=e.lastIndexOf(bu);a<0&&(a=0);for(let i=0;i<a;++i)e.charCodeAt(i)>=128&&be("not-basic"),n.push(e.charCodeAt(i));for(let i=a>0?a+1:0;i<t;){const c=r;for(let d=1,s=ue;;s+=ue){i>=t&&be("invalid-input");const f=Rs(e.charCodeAt(i++));f>=ue&&be("invalid-input"),f>ie(($e-r)/d)&&be("overflow"),r+=f*d;const h=s<=u?ir:s>=u+bn?bn:s-u;if(f<h)break;const p=ue-h;d>ie($e/p)&&be("overflow"),d*=p}const l=n.length+1;u=yu(r-c,l,c==0),ie(r/l)>$e-o&&be("overflow"),o+=ie(r/l),r%=l,n.splice(r++,0,o)}return String.fromCodePoint(...n)},vu=function(e){const n=[];e=ku(e);const t=e.length;let r=mu,o=0,u=pu;for(const c of e)c<128&&n.push(kt(c));const a=n.length;let i=a;for(a&&n.push(bu);i<t;){let c=$e;for(const d of e)d>=r&&d<c&&(c=d);const l=i+1;c-r>ie(($e-o)/l)&&be("overflow"),o+=(c-r)*l,r=c;for(const d of e)if(d<r&&++o>$e&&be("overflow"),d===r){let s=o;for(let f=ue;;f+=ue){const h=f<=u?ir:f>=u+bn?bn:f-u;if(s<h)break;const p=s-h,m=ue-h;n.push(kt(eo(h+p%m,0))),s=ie(p/m)}n.push(kt(eo(s,0))),u=yu(o,l,i===a),o=0,++i}++o,++r}return n.join("")},Os=function(e){return gu(e,function(n){return Ds.test(n)?xu(n.slice(4).toLowerCase()):n})},Bs=function(e){return gu(e,function(n){return Ms.test(n)?"xn--"+vu(n):n})},wu={version:"2.3.1",ucs2:{decode:ku,encode:Ns},decode:xu,encode:vu,toASCII:Bs,toUnicode:Os},Ps={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},zs={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},Hs={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},qs={default:Ps,zero:zs,commonmark:Hs},$s=/^(vbscript|javascript|file|data):/,js=/^data:image\/(gif|png|jpeg|webp);/;function Us(e){const n=e.trim().toLowerCase();return $s.test(n)?js.test(n):!0}const Cu=["http:","https:","mailto:"];function Gs(e){const n=er(e,!0);if(n.hostname&&(!n.protocol||Cu.indexOf(n.protocol)>=0))try{n.hostname=wu.toASCII(n.hostname)}catch{}return xn(Xt(n))}function Vs(e){const n=er(e,!0);if(n.hostname&&(!n.protocol||Cu.indexOf(n.protocol)>=0))try{n.hostname=wu.toUnicode(n.hostname)}catch{}return We(Xt(n),We.defaultChars+"%")}function J(e,n){if(!(this instanceof J))return new J(e,n);n||tr(e)||(n=e||{},e="default"),this.inline=new wn,this.block=new Jn,this.core=new or,this.renderer=new nn,this.linkify=new Y,this.validateLink=Us,this.normalizeLink=Gs,this.normalizeLinkText=Vs,this.utils=Ka,this.helpers=Zn({},Ja),this.options={},this.configure(e),n&&this.set(n)}J.prototype.set=function(e){return Zn(this.options,e),this};J.prototype.configure=function(e){const n=this;if(tr(e)){const t=e;if(e=qs[t],!e)throw new Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(t){e.components[t].rules&&n[t].ruler.enableOnly(e.components[t].rules),e.components[t].rules2&&n[t].ruler2.enableOnly(e.components[t].rules2)}),this};J.prototype.enable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(o){t=t.concat(this[o].ruler.enable(e,!0))},this),t=t.concat(this.inline.ruler2.enable(e,!0));const r=e.filter(function(o){return t.indexOf(o)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+r);return this};J.prototype.disable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(o){t=t.concat(this[o].ruler.disable(e,!0))},this),t=t.concat(this.inline.ruler2.disable(e,!0));const r=e.filter(function(o){return t.indexOf(o)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+r);return this};J.prototype.use=function(e){const n=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,n),this};J.prototype.parse=function(e,n){if(typeof e!="string")throw new Error("Input data should be a String");const t=new this.core.State(e,this,n);return this.core.process(t),t.tokens};J.prototype.render=function(e,n){return n=n||{},this.renderer.render(this.parse(e,n),this.options,n)};J.prototype.parseInline=function(e,n){const t=new this.core.State(e,this,n);return t.inlineMode=!0,this.core.process(t),t.tokens};J.prototype.renderInline=function(e,n){return n=n||{},this.renderer.render(this.parseInline(e,n),this.options,n)};var no=!1,Ze={false:"push",true:"unshift",after:"push",before:"unshift"},Pn={isPermalinkSymbol:!0};function zt(e,n,t,r){var o;if(!no){var u="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(u):console.warn(u),no=!0}var a=[Object.assign(new t.Token("link_open","a",1),{attrs:[].concat(n.permalinkClass?[["class",n.permalinkClass]]:[],[["href",n.permalinkHref(e,t)]],Object.entries(n.permalinkAttrs(e,t)))}),Object.assign(new t.Token("html_block","",0),{content:n.permalinkSymbol,meta:Pn}),new t.Token("link_close","a",-1)];n.permalinkSpace&&t.tokens[r+1].children[Ze[n.permalinkBefore]](Object.assign(new t.Token("text","",0),{content:" "})),(o=t.tokens[r+1].children)[Ze[n.permalinkBefore]].apply(o,a)}function Eu(e){return"#"+e}function _u(e){return{}}var Ws={class:"header-anchor",symbol:"#",renderHref:Eu,renderAttrs:_u};function Cn(e){function n(t){return t=Object.assign({},n.defaults,t),function(r,o,u,a){return e(r,t,o,u,a)}}return n.defaults=Object.assign({},Ws),n.renderPermalinkImpl=e,n}function ar(e){var n=[],t=e.filter(function(r){if(r[0]!=="class")return!0;n.push(r[1])});return n.length>0&&t.unshift(["class",n.join(" ")]),t}var et=Cn(function(e,n,t,r,o){var u,a=[Object.assign(new r.Token("link_open","a",1),{attrs:ar([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],n.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(n.renderAttrs(e,r))))}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:Pn}),new r.Token("link_close","a",-1)];if(n.space){var i=typeof n.space=="string"?n.space:" ";r.tokens[o+1].children[Ze[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:i}))}(u=r.tokens[o+1].children)[Ze[n.placement]].apply(u,a)});Object.assign(et.defaults,{space:!0,placement:"after",ariaHidden:!1});var _e=Cn(et.renderPermalinkImpl);_e.defaults=Object.assign({},et.defaults,{ariaHidden:!0});var Au=Cn(function(e,n,t,r,o){var u=[Object.assign(new r.Token("link_open","a",1),{attrs:ar([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],Object.entries(n.renderAttrs(e,r))))})].concat(n.safariReaderFix?[new r.Token("span_open","span",1)]:[],r.tokens[o+1].children,n.safariReaderFix?[new r.Token("span_close","span",-1)]:[],[new r.Token("link_close","a",-1)]);r.tokens[o+1].children=u});Object.assign(Au.defaults,{safariReaderFix:!1});var to=Cn(function(e,n,t,r,o){var u;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(n.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+n.style+"`");if(!["aria-describedby","aria-labelledby"].includes(n.style)&&!n.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+n.style+"` style");if(n.style==="visually-hidden"&&!n.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var a=r.tokens[o+1].children.filter(function(s){return s.type==="text"||s.type==="code_inline"}).reduce(function(s,f){return s+f.content},""),i=[],c=[];if(n.class&&c.push(["class",n.class]),c.push(["href",n.renderHref(e,r)]),c.push.apply(c,Object.entries(n.renderAttrs(e,r))),n.style==="visually-hidden"){if(i.push(Object.assign(new r.Token("span_open","span",1),{attrs:[["class",n.visuallyHiddenClass]]}),Object.assign(new r.Token("text","",0),{content:n.assistiveText(a)}),new r.Token("span_close","span",-1)),n.space){var l=typeof n.space=="string"?n.space:" ";i[Ze[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:l}))}i[Ze[n.placement]](Object.assign(new r.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:Pn}),new r.Token("span_close","span",-1))}else i.push(Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:Pn}));n.style==="aria-label"?c.push(["aria-label",n.assistiveText(a)]):["aria-describedby","aria-labelledby"].includes(n.style)&&c.push([n.style,e]);var d=[Object.assign(new r.Token("link_open","a",1),{attrs:ar(c)})].concat(i,[new r.Token("link_close","a",-1)]);(u=r.tokens).splice.apply(u,[o+3,0].concat(d)),n.wrapper&&(r.tokens.splice(o,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[0]+`
`})),r.tokens.splice(o+3+d.length+1,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[1]+`
`})))});function ro(e,n,t,r){var o=e,u=r;if(t&&Object.prototype.hasOwnProperty.call(n,o))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(n,o);)o=e+"-"+u,u+=1;return n[o]=!0,o}function ze(e,n){n=Object.assign({},ze.defaults,n),e.core.ruler.push("anchor",function(t){for(var r,o={},u=t.tokens,a=Array.isArray(n.level)?(r=n.level,function(s){return r.includes(s)}):(function(s){return function(f){return f>=s}})(n.level),i=0;i<u.length;i++){var c=u[i];if(c.type==="heading_open"&&a(Number(c.tag.substr(1)))){var l=n.getTokensText(u[i+1].children),d=c.attrGet("id");d=d==null?ro(d=n.slugifyWithState?n.slugifyWithState(l,t):n.slugify(l),o,!1,n.uniqueSlugStartIndex):ro(d,o,!0,n.uniqueSlugStartIndex),c.attrSet("id",d),n.tabIndex!==!1&&c.attrSet("tabindex",""+n.tabIndex),typeof n.permalink=="function"?n.permalink(d,n,t,i):(n.permalink||n.renderPermalink&&n.renderPermalink!==zt)&&n.renderPermalink(d,n,t,i),i=u.indexOf(c),n.callback&&n.callback(c,{slug:d,title:l})}}})}Object.assign(to.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),ze.permalink={__proto__:null,legacy:zt,renderHref:Eu,renderAttrs:_u,makePermalink:Cn,linkInsideHeader:et,ariaHidden:_e,headerLink:Au,linkAfterHeader:to},ze.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(n){return["text","code_inline"].includes(n.type)}).map(function(n){return n.content}).join("")},permalink:!1,renderPermalink:zt,permalinkClass:_e.defaults.class,permalinkSpace:_e.defaults.space,permalinkSymbol:"¶",permalinkBefore:_e.defaults.placement==="before",permalinkHref:_e.defaults.renderHref,permalinkAttrs:_e.defaults.renderAttrs},ze.default=ze;function nt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var yt,oo;function Ks(){if(oo)return yt;oo=1;function e(r,o){var u,a,i=r.attrs[r.attrIndex("href")][1];for(u=0;u<o.length;++u){if(a=o[u],typeof a.matcher=="function"){if(a.matcher(i,a))return a;continue}return a}}function n(r,o,u){Object.keys(u).forEach(function(a){var i,c=u[a];a==="className"&&(a="class"),i=o[r].attrIndex(a),i<0?o[r].attrPush([a,c]):o[r].attrs[i][1]=c})}function t(r,o){o?o=Array.isArray(o)?o:[o]:o=[],Object.freeze(o);var u=r.renderer.rules.link_open||this.defaultRender;r.renderer.rules.link_open=function(a,i,c,l,d){var s=e(a[i],o),f=s&&s.attrs;return f&&n(i,a,f),u(a,i,c,l,d)}}return t.defaultRender=function(r,o,u,a,i){return i.renderToken(r,o,u)},yt=t,yt}var Zs=Ks();const Ys=nt(Zs);function Qs(e,n,t,r){const o=Number(e[n].meta.id+1).toString();let u="";return typeof r.docId=="string"&&(u=`-${r.docId}-`),u+o}function Js(e,n){let t=Number(e[n].meta.id+1).toString();return e[n].meta.subId>0&&(t+=`:${e[n].meta.subId}`),`[${t}]`}function Xs(e,n,t,r,o){const u=o.rules.footnote_anchor_name(e,n,t,r,o),a=o.rules.footnote_caption(e,n,t,r,o);let i=u;return e[n].meta.subId>0&&(i+=`:${e[n].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${u}" id="fnref${i}">${a}</a></sup>`}function el(e,n,t){return(t.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function nl(){return`</ol>
</section>
`}function tl(e,n,t,r,o){let u=o.rules.footnote_anchor_name(e,n,t,r,o);return e[n].meta.subId>0&&(u+=`:${e[n].meta.subId}`),`<li id="fn${u}" class="footnote-item">`}function rl(){return`</li>
`}function ol(e,n,t,r,o){let u=o.rules.footnote_anchor_name(e,n,t,r,o);return e[n].meta.subId>0&&(u+=`:${e[n].meta.subId}`),` <a href="#fnref${u}" class="footnote-backref">↩︎</a>`}function ul(e){const n=e.helpers.parseLinkLabel,t=e.utils.isSpace;e.renderer.rules.footnote_ref=Xs,e.renderer.rules.footnote_block_open=el,e.renderer.rules.footnote_block_close=nl,e.renderer.rules.footnote_open=tl,e.renderer.rules.footnote_close=rl,e.renderer.rules.footnote_anchor=ol,e.renderer.rules.footnote_caption=Js,e.renderer.rules.footnote_anchor_name=Qs;function r(i,c,l,d){const s=i.bMarks[c]+i.tShift[c],f=i.eMarks[c];if(s+4>f||i.src.charCodeAt(s)!==91||i.src.charCodeAt(s+1)!==94)return!1;let h;for(h=s+2;h<f;h++){if(i.src.charCodeAt(h)===32)return!1;if(i.src.charCodeAt(h)===93)break}if(h===s+2||h+1>=f||i.src.charCodeAt(++h)!==58)return!1;if(d)return!0;h++,i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.refs||(i.env.footnotes.refs={});const p=i.src.slice(s+2,h-2);i.env.footnotes.refs[`:${p}`]=-1;const m=new i.Token("footnote_reference_open","",1);m.meta={label:p},m.level=i.level++,i.tokens.push(m);const b=i.bMarks[c],g=i.tShift[c],k=i.sCount[c],y=i.parentType,x=h,v=i.sCount[c]+h-(i.bMarks[c]+i.tShift[c]);let w=v;for(;h<f;){const F=i.src.charCodeAt(h);if(t(F))F===9?w+=4-w%4:w++;else break;h++}i.tShift[c]=h-x,i.sCount[c]=w-v,i.bMarks[c]=x,i.blkIndent+=4,i.parentType="footnote",i.sCount[c]<i.blkIndent&&(i.sCount[c]+=i.blkIndent),i.md.block.tokenize(i,c,l,!0),i.parentType=y,i.blkIndent-=4,i.tShift[c]=g,i.sCount[c]=k,i.bMarks[c]=b;const A=new i.Token("footnote_reference_close","",-1);return A.level=--i.level,i.tokens.push(A),!0}function o(i,c){const l=i.posMax,d=i.pos;if(d+2>=l||i.src.charCodeAt(d)!==94||i.src.charCodeAt(d+1)!==91)return!1;const s=d+2,f=n(i,d+1);if(f<0)return!1;if(!c){i.env.footnotes||(i.env.footnotes={}),i.env.footnotes.list||(i.env.footnotes.list=[]);const h=i.env.footnotes.list.length,p=[];i.md.inline.parse(i.src.slice(s,f),i.md,i.env,p);const m=i.push("footnote_ref","",0);m.meta={id:h},i.env.footnotes.list[h]={content:i.src.slice(s,f),tokens:p}}return i.pos=f+1,i.posMax=l,!0}function u(i,c){const l=i.posMax,d=i.pos;if(d+3>l||!i.env.footnotes||!i.env.footnotes.refs||i.src.charCodeAt(d)!==91||i.src.charCodeAt(d+1)!==94)return!1;let s;for(s=d+2;s<l;s++){if(i.src.charCodeAt(s)===32||i.src.charCodeAt(s)===10)return!1;if(i.src.charCodeAt(s)===93)break}if(s===d+2||s>=l)return!1;s++;const f=i.src.slice(d+2,s-1);if(typeof i.env.footnotes.refs[`:${f}`]>"u")return!1;if(!c){i.env.footnotes.list||(i.env.footnotes.list=[]);let h;i.env.footnotes.refs[`:${f}`]<0?(h=i.env.footnotes.list.length,i.env.footnotes.list[h]={label:f,count:0},i.env.footnotes.refs[`:${f}`]=h):h=i.env.footnotes.refs[`:${f}`];const p=i.env.footnotes.list[h].count;i.env.footnotes.list[h].count++;const m=i.push("footnote_ref","",0);m.meta={id:h,subId:p,label:f}}return i.pos=s,i.posMax=l,!0}function a(i){let c,l,d,s=!1;const f={};if(!i.env.footnotes||(i.tokens=i.tokens.filter(function(p){return p.type==="footnote_reference_open"?(s=!0,l=[],d=p.meta.label,!1):p.type==="footnote_reference_close"?(s=!1,f[":"+d]=l,!1):(s&&l.push(p),!s)}),!i.env.footnotes.list))return;const h=i.env.footnotes.list;i.tokens.push(new i.Token("footnote_block_open","",1));for(let p=0,m=h.length;p<m;p++){const b=new i.Token("footnote_open","",1);if(b.meta={id:p,label:h[p].label},i.tokens.push(b),h[p].tokens){c=[];const y=new i.Token("paragraph_open","p",1);y.block=!0,c.push(y);const x=new i.Token("inline","",0);x.children=h[p].tokens,x.content=h[p].content,c.push(x);const v=new i.Token("paragraph_close","p",-1);v.block=!0,c.push(v)}else h[p].label&&(c=f[`:${h[p].label}`]);c&&(i.tokens=i.tokens.concat(c));let g;i.tokens[i.tokens.length-1].type==="paragraph_close"?g=i.tokens.pop():g=null;const k=h[p].count>0?h[p].count:1;for(let y=0;y<k;y++){const x=new i.Token("footnote_anchor","",0);x.meta={id:p,subId:y,label:h[p].label},i.tokens.push(x)}g&&i.tokens.push(g),i.tokens.push(new i.Token("footnote_close","",-1))}i.tokens.push(new i.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",r,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",o),e.inline.ruler.after("footnote_inline","footnote_ref",u),e.core.ruler.after("inline","footnote_tail",a)}var xt,uo;function il(){if(uo)return xt;uo=1;var e=!0,n=!1,t=!1;xt=function(m,b){b&&(e=!b.enabled,n=!!b.label,t=!!b.labelAfter),m.core.ruler.after("inline","github-task-lists",function(g){for(var k=g.tokens,y=2;y<k.length;y++)u(k,y)&&(a(k[y],g.Token),r(k[y-2],"class","task-list-item"+(e?"":" enabled")),r(k[o(k,y-2)],"class","contains-task-list"))})};function r(m,b,g){var k=m.attrIndex(b),y=[b,g];k<0?m.attrPush(y):m.attrs[k]=y}function o(m,b){for(var g=m[b].level-1,k=b-1;k>=0;k--)if(m[k].level===g)return k;return-1}function u(m,b){return s(m[b])&&f(m[b-1])&&h(m[b-2])&&p(m[b])}function a(m,b){if(m.children.unshift(i(m,b)),m.children[1].content=m.children[1].content.slice(3),m.content=m.content.slice(3),n)if(t){m.children.pop();var g="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);m.children[0].content=m.children[0].content.slice(0,-1)+' id="'+g+'">',m.children.push(d(m.content,g,b))}else m.children.unshift(c(b)),m.children.push(l(b))}function i(m,b){var g=new b("html_inline","",0),k=e?' disabled="" ':"";return m.content.indexOf("[ ] ")===0?g.content='<input class="task-list-item-checkbox"'+k+'type="checkbox">':(m.content.indexOf("[x] ")===0||m.content.indexOf("[X] ")===0)&&(g.content='<input class="task-list-item-checkbox" checked=""'+k+'type="checkbox">'),g}function c(m){var b=new m("html_inline","",0);return b.content="<label>",b}function l(m){var b=new m("html_inline","",0);return b.content="</label>",b}function d(m,b,g){var k=new g("html_inline","",0);return k.content='<label class="task-list-item-label" for="'+b+'">'+m+"</label>",k.attrs=[{for:b}],k}function s(m){return m.type==="inline"}function f(m){return m.type==="paragraph_open"}function h(m){return m.type==="list_item_open"}function p(m){return m.content.indexOf("[ ] ")===0||m.content.indexOf("[x] ")===0||m.content.indexOf("[X] ")===0}return xt}var al=il();const cl=nt(al),sl={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},ll=(e,n={})=>{const{markers:t=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:r=sl,matchCaseSensitive:o=!1,titles:u={},classPrefix:a="markdown-alert"}=n,i=t==="*"?"\\w+":t.join("|"),c=new RegExp(`^\\\\?\\[\\!(${i})\\]([^\\n\\r]*)`,o?"":"i");e.core.ruler.after("block","github-alerts",l=>{const d=l.tokens;for(let s=0;s<d.length;s++)if(d[s].type==="blockquote_open"){const f=d[s],h=s;for(;d[s]?.type!=="blockquote_close"&&s<=d.length;)s+=1;const p=d[s],m=s,b=d.slice(h,m+1).find(v=>v.type==="inline");if(!b)continue;const g=b.content.match(c);if(!g)continue;const k=g[1].toLowerCase(),y=g[2].trim()||(u[k]??dl(k)),x=r[k]??"";b.content=b.content.slice(g[0].length).trimStart(),f.type="alert_open",f.tag="div",f.meta={title:y,type:k,icon:x},p.type="alert_close",p.tag="div"}}),e.renderer.rules.alert_open=function(l,d){const{title:s,type:f,icon:h}=l[d].meta;return`<div class="${a} ${a}-${f}"><p class="${a}-title">${h}${s}</p>`}};function dl(e){return e.charAt(0).toUpperCase()+e.slice(1)}var S=Symbol("NOT_RESOLVED");function G(e,n){return{tagName:e,nodeKind:"scalar",implicit:n.implicit??!1,matchByTagPrefix:n.matchByTagPrefix??!1,implicitFirstChars:n.implicitFirstChars??null,resolve:n.resolve,identify:n.identify,represent:n.represent??(t=>String(t)),representTagName:n.representTagName??(()=>e)}}function cr(e,n){const t=n.finalize===void 0;return{tagName:e,nodeKind:"sequence",implicit:!1,matchByTagPrefix:n.matchByTagPrefix??!1,create:n.create,addItem:n.addItem,finalize:n.finalize??(r=>r),carrierIsResult:t,identify:n.identify,represent:n.represent??(r=>r),representTagName:n.representTagName??(()=>e)}}function tt(e,n){const t=n.finalize===void 0;return{tagName:e,nodeKind:"mapping",implicit:!1,matchByTagPrefix:n.matchByTagPrefix??!1,create:n.create,addPair:n.addPair,has:n.has,keys:n.keys,get:n.get,finalize:n.finalize??(r=>r),carrierIsResult:t,identify:n.identify,represent:n.represent??(r=>r),representTagName:n.representTagName??(()=>e)}}var fl=G("tag:yaml.org,2002:str",{resolve:e=>e,identify:e=>typeof e=="string"}),hl=["","~","null","Null","NULL"],pl=G("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>hl.indexOf(e)!==-1?null:S,identify:e=>e===null,represent:()=>"null"}),ml=G("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(e,n)=>e==="null"||n&&e===""?null:S,identify:e=>e===null,represent:()=>"null"}),bl=["","~","null","Null","NULL"],gl=G("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>bl.indexOf(e)!==-1?null:S,identify:e=>e===null,represent:()=>"null"}),kl=["true","True","TRUE"],yl=["false","False","FALSE"],xl=G("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:e=>kl.indexOf(e)!==-1?!0:yl.indexOf(e)!==-1?!1:S,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),vl=["true"],wl=["false"],Cl=G("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:e=>vl.indexOf(e)!==-1?!0:wl.indexOf(e)!==-1?!1:S,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),El=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],_l=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],Al=G("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:e=>El.indexOf(e)!==-1?!0:_l.indexOf(e)!==-1?!1:S,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),Sl=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),Tl=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Dl(e){let n=e,t=1;return(n[0]==="-"||n[0]==="+")&&(n[0]==="-"&&(t=-1),n=n.slice(1)),n.startsWith("0b")?t*parseInt(n.slice(2),2):n.startsWith("0o")?t*parseInt(n.slice(2),8):n.startsWith("0x")?t*parseInt(n.slice(2),16):t*parseInt(n,10)}function Ml(e,n){if(n){if(!Tl.test(e))return S}else if(!Sl.test(e))return S;const t=Dl(e);return Number.isFinite(t)?t:S}var Su=G("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Ml,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),Fl=new RegExp("^-?(?:0|[1-9][0-9]*)$"),Il=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Ll(e){let n=e,t=1;return(n[0]==="-"||n[0]==="+")&&(n[0]==="-"&&(t=-1),n=n.slice(1)),n.startsWith("0b")?t*parseInt(n.slice(2),2):n.startsWith("0o")?t*parseInt(n.slice(2),8):n.startsWith("0x")?t*parseInt(n.slice(2),16):t*parseInt(n,10)}function Nl(e,n){if(n){if(!Il.test(e))return S}else if(!Fl.test(e))return S;const t=Ll(e);return Number.isFinite(t)?t:S}var Rl=G("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Nl,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),Ol=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");function Bl(e){let n=e.replace(/_/g,""),t=1;if((n[0]==="-"||n[0]==="+")&&(n[0]==="-"&&(t=-1),n=n.slice(1)),n.startsWith("0b"))return t*parseInt(n.slice(2),2);if(n.startsWith("0x"))return t*parseInt(n.slice(2),16);if(n.includes(":")){let r=0;for(const o of n.split(":"))r=r*60+Number(o);return t*r}return n!=="0"&&n[0]==="0"?t*parseInt(n,8):t*parseInt(n,10)}function Pl(e){if(!Ol.test(e))return S;const n=Bl(e);return Number.isFinite(n)?n:S}var Ht=G("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Pl,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),zl=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Hl=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function ql(e){if(!zl.test(e))return S;let n=e.toLowerCase();const t=n[0]==="-"?-1:1;if("+-".includes(n[0])&&(n=n.slice(1)),n===".inf")return t===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(n===".nan")return NaN;const r=t*parseFloat(n);return Number.isFinite(r)||Hl.test(e)?r:S}function $l(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const n=e.toString(10);return/^[-+]?[0-9]+e/.test(n)?n.replace("e",".e"):n}var Tu=G("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:ql,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:$l}),jl=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),Ul=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Gl(e,n){if(n){if(!Ul.test(e))return S;let r=e.toLowerCase();const o=r[0]==="-"?-1:1;if("+-".includes(r[0])&&(r=r.slice(1)),r===".inf")return o===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(r===".nan")return NaN;const u=o*parseFloat(r);return Number.isFinite(u)?u:S}if(!jl.test(e))return S;const t=Number(e);return Number.isFinite(t)?t:S}function Vl(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const n=e.toString(10);return/^[-+]?[0-9]+e/.test(n)?n.replace("e",".e"):n}var Wl=G("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Gl,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:Vl}),Kl=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Zl=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Yl(e){if(!Kl.test(e))return S;let n=e.toLowerCase().replace(/_/g,"");const t=n[0]==="-"?-1:1;if("+-".includes(n[0])&&(n=n.slice(1)),n===".inf")return t===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(n===".nan")return NaN;let r=0;if(n.includes(":")){for(const o of n.split(":"))r=r*60+Number(o);r*=t}else r=t*parseFloat(n);return Number.isFinite(r)||Zl.test(e)?r:S}function Ql(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const n=e.toString(10);return/^[-+]?[0-9]+e/.test(n)?n.replace("e",".e"):n}var qt=G("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Yl,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:Ql}),Jl=G("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(e,n)=>e==="<<"||n&&e===""?"<<":S,identify:()=>!1}),Xl=/^[A-Za-z0-9+/]*={0,2}$/;function e0(e){const n=e.replace(/\s/g,"");if(n.length%4!==0||!Xl.test(n))return S;const t=atob(n),r=new Uint8Array(t.length);for(let o=0;o<t.length;o++)r[o]=t.charCodeAt(o);return r}function n0(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n)}var t0=G("tag:yaml.org,2002:binary",{resolve:e0,identify:e=>Object.prototype.toString.call(e)==="[object Uint8Array]",represent:n0}),r0=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),o0=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function io(e,n,t,r=0,o=0,u=0,a=0){const i=new Date(Date.UTC(e,n,t,r,o,u,a));return i.setUTCFullYear(e,n,t),i}function u0(e){let n=r0.exec(e);if(n===null&&(n=o0.exec(e)),n===null)return S;const t=+n[1],r=+n[2]-1,o=+n[3];if(!n[4]){const d=io(t,r,o);return d.getUTCFullYear()!==t||d.getUTCMonth()!==r||d.getUTCDate()!==o?S:d}const u=+n[4],a=+n[5],i=+n[6];let c=0;if(u>23||a>59||i>59)return S;if(n[7]){let d=n[7].slice(0,3);for(;d.length<3;)d+="0";c=+d}const l=io(t,r,o,u,a,i,c);if(l.getUTCFullYear()!==t||l.getUTCMonth()!==r||l.getUTCDate()!==o)return S;if(n[9]){const d=+n[10],s=+(n[11]||0);if(d>23||s>59)return S;const f=(d*60+s)*6e4;l.setTime(l.getTime()-(n[9]==="-"?-f:f))}return l}var i0=G("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:u0,identify:e=>e instanceof Date,represent:e=>e.toISOString()}),a0=cr("tag:yaml.org,2002:seq",{create:()=>[],addItem:(e,n)=>{e.push(n)},identify:Array.isArray});function rt(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;const n=Object.getPrototypeOf(e);return n===null||n===Object.prototype}function ao(e,n){const t={};for(const r of n)e[r]!==void 0&&(t[r]=e[r]);return t}var c0=cr("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(e,n)=>{let t;if(n instanceof Map){if(n.size!==1)return"cannot resolve an ordered map item";t=n.keys().next().value}else if(rt(n)){const r=Object.keys(n);if(r.length!==1)return"cannot resolve an ordered map item";t=r[0]}else return"cannot resolve an ordered map item";return e.seen.has(t)?"duplicate key in ordered map":(e.seen.add(t),e.list.push(n),"")},finalize:e=>e.list,identify:()=>!1}),s0=cr("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(e,n)=>{if(n instanceof Map)return n.size!==1?"cannot resolve a pairs item":(e.push(n.entries().next().value),"");if(Object.prototype.toString.call(n)!=="[object Object]")return"cannot resolve a pairs item";const t=n,r=Object.keys(t);return r.length!==1?"cannot resolve a pairs item":(e.push([r[0],t[r[0]]]),"")},identify:()=>!1}),l0=tt("tag:yaml.org,2002:map",{create:()=>({}),identify:rt,represent:e=>{const n=new Map;for(const t of Object.keys(e))n.set(t,e[t]);return n},addPair:(e,n,t)=>{if(n!==null&&typeof n=="object")return"object-based map does not support complex keys";const r=String(n);return r==="__proto__"?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,""},has:(e,n)=>n!==null&&typeof n=="object"?!1:Object.prototype.hasOwnProperty.call(e,String(n)),keys:e=>Object.keys(e),get:(e,n)=>{const t=String(n);return Object.prototype.hasOwnProperty.call(e,t)?e[t]:null}}),d0=tt("tag:yaml.org,2002:set",{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{const n=new Map;for(const t of e)n.set(t,null);return n},addPair:(e,n,t)=>t!==null?"cannot resolve a set item":(e.add(n),""),has:(e,n)=>e.has(n),keys:e=>e.keys(),get:()=>null});function f0(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function h0(){return{scalar:[],sequence:[],mapping:[]}}function p0(e){const n=[];for(const t of e){let r=n.length;for(let o=0;o<n.length;o++){const u=n[o];if(u.nodeKind===t.nodeKind&&u.tagName===t.tagName&&u.matchByTagPrefix===t.matchByTagPrefix){r=o;break}}n[r]=t}return n}var ot=class Du{tags;implicitScalarTags;implicitScalarByFirstChar;implicitScalarAnyFirstChar;defaultScalarTag;defaultSequenceTag;defaultMappingTag;exact;prefix;constructor(n){const t=p0(n),r=[],o=f0(),u=h0();for(const d of t){if(d.nodeKind==="scalar"&&d.implicit){if(d.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");r.push(d)}switch(d.nodeKind){case"scalar":d.matchByTagPrefix?u.scalar.push(d):o.scalar[d.tagName]=d;break;case"sequence":d.matchByTagPrefix?u.sequence.push(d):o.sequence[d.tagName]=d;break;case"mapping":d.matchByTagPrefix?u.mapping.push(d):o.mapping[d.tagName]=d;break}}const a=r.filter(d=>d.implicitFirstChars===null),i=new Set;for(const d of r)if(d.implicitFirstChars!==null)for(const s of d.implicitFirstChars)i.add(s);const c=new Map;for(const d of i)c.set(d,r.filter(s=>s.implicitFirstChars===null||s.implicitFirstChars.indexOf(d)!==-1));const l=o.scalar["tag:yaml.org,2002:str"];if(!l)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=t,this.implicitScalarTags=r,this.implicitScalarByFirstChar=c,this.implicitScalarAnyFirstChar=a,this.defaultScalarTag=l,this.defaultSequenceTag=o.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=o.mapping["tag:yaml.org,2002:map"],this.exact=o,this.prefix=u}lookupScalarTag(n){const t=this.exact.scalar[n];if(t)return t;for(const r of this.prefix.scalar)if(n.startsWith(r.tagName))return r}lookupSequenceTag(n){const t=this.exact.sequence[n];if(t)return t;for(const r of this.prefix.sequence)if(n.startsWith(r.tagName))return r}lookupMappingTag(n){const t=this.exact.mapping[n];if(t)return t;for(const r of this.prefix.mapping)if(n.startsWith(r.tagName))return r}resolveImplicitScalarTag(n){const t=this.implicitScalarByFirstChar.get(n.charAt(0))??this.implicitScalarAnyFirstChar;for(const o of t){const u=o.resolve(n,!1,o.tagName);if(u!==S)return{value:u,tag:o}}const r=this.defaultScalarTag;return{value:r.resolve(n,!1,r.tagName),tag:r}}withTags(...n){let t=[];for(const r of n)t=t.concat(r);return new Du([...this.tags,...t])}},sr=new ot([fl,a0,l0]);new ot([...sr.tags,ml,Cl,Rl,Wl]);var Mu=new ot([...sr.tags,pl,xl,Su,Tu]),m0=new ot([...sr.tags,gl,Al,Ht,qt,i0,Jl,t0,c0,s0,d0]);m0.withTags({...Ht,resolve:(e,n,t)=>{const r=Ht.resolve(e,n,t);return r===S?Su.resolve(e,n,t):r}},{...qt,resolve:(e,n,t)=>{const r=qt.resolve(e,n,t);return r===S?Tu.resolve(e,n,t):r}});tt("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(e,n,t)=>(e.set(n,t),""),has:(e,n)=>e.has(n),keys:e=>e.keys(),get:(e,n)=>e.get(n),identify:e=>e instanceof Map||rt(e),represent:e=>{if(e instanceof Map)return e;const n=new Map,t=e;for(const r of Object.keys(t))n.set(r,t[r]);return n}});function co(e){if(Array.isArray(e)){const n=Array.prototype.slice.call(e);for(let t=0;t<n.length;t++){if(Array.isArray(n[t]))return null;typeof n[t]=="object"&&Object.prototype.toString.call(n[t])==="[object Object]"&&(n[t]="[object Object]")}return String(n)}return typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"?"[object Object]":String(e)}tt("tag:yaml.org,2002:map",{create:()=>({}),identify:rt,represent:e=>{const n=new Map;for(const t of Object.keys(e))n.set(t,e[t]);return n},addPair:(e,n,t)=>{const r=co(n);return r===null?"nested arrays are not supported inside keys":(r==="__proto__"?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,"")},has:(e,n)=>{const t=co(n);return t!==null&&Object.prototype.hasOwnProperty.call(e,t)},keys:e=>Object.keys(e),get:(e,n)=>{const t=String(n);return Object.prototype.hasOwnProperty.call(e,t)?e[t]:null}});var b0={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function vt(e,n,t,r,o){let u="",a="";const i=Math.floor(o/2)-1;return r-n>i&&(u=" ... ",n=r-i+u.length),t-r>i&&(a=" ...",t=r+i-a.length),{str:u+e.slice(n,t).replace(/\t/g,"→")+a,pos:r-n+u.length}}function wt(e,n){return" ".repeat(Math.max(n-e.length,0))+e}function g0(e,n){if(!e.buffer)return null;const t={...b0,...n},r=/\r?\n|\r|\0/g,o=[0],u=[];let a,i=-1;for(;a=r.exec(e.buffer);)u.push(a.index),o.push(a.index+a[0].length),e.position<=a.index&&i<0&&(i=o.length-2);i<0&&(i=o.length-1);let c="";const l=Math.min(e.line+t.linesAfter,u.length).toString().length,d=t.maxLength-(t.indent+l+3);for(let f=1;f<=t.linesBefore&&!(i-f<0);f++){const h=vt(e.buffer,o[i-f],u[i-f],e.position-(o[i]-o[i-f]),d);c=`${" ".repeat(t.indent)}${wt((e.line-f+1).toString(),l)} | ${h.str}
${c}`}const s=vt(e.buffer,o[i],u[i],e.position,d);c+=`${" ".repeat(t.indent)}${wt((e.line+1).toString(),l)} | ${s.str}
`,c+=`${"-".repeat(t.indent+l+3+s.pos)}^
`;for(let f=1;f<=t.linesAfter&&!(i+f>=u.length);f++){const h=vt(e.buffer,o[i+f],u[i+f],e.position-(o[i]-o[i+f]),d);c+=`${" ".repeat(t.indent)}${wt((e.line+f+1).toString(),l)} | ${h.str}
`}return c.replace(/\n$/,"")}function so(e,n){let t="";return e.mark?(e.mark.name&&(t+=`in "${e.mark.name}" `),t+=`(${e.mark.line+1}:${e.mark.column+1})`,!n&&e.mark.snippet&&(t+=`

${e.mark.snippet}`),`${e.reason} ${t}`):e.reason}var Fe=class Fu extends Error{reason;mark;constructor(n,t){super(),this.name="YAMLException",this.reason=n,this.mark=t,this.message=so(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(n){return`${this.name}: ${so(this,n)}`}static throwAt(n,t,r,o=""){let u=0,a=0;for(let c=0;c<t;c++){const l=n.charCodeAt(c);l===10?(u++,a=c+1):l===13&&(u++,n.charCodeAt(c+1)===10&&c++,a=c+1)}const i={name:o,buffer:n,position:t,line:u,column:t-a};throw i.snippet=g0(i),new Fu(r,i)}},j={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},D={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},Ye={BLOCK:1,FLOW:2},ae={CLIP:1,STRIP:2,KEEP:3},k0=-1;function lo(e){switch(e){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var Iu=new Array(256),Lu=new Array(256);for(let e=0;e<256;e++)Iu[e]=lo(e)?1:0,Lu[e]=lo(e);function y0(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function x0(e){return e>=48&&e<=57?e-48:(e|32)-97+10}function v0(e){return e===120?2:e===117?4:8}function zn(e,n,t){let r=0;for(;n<t;){const o=e.charCodeAt(n);if(o===10)r++,n++;else if(o===13)r++,n++,e.charCodeAt(n)===10&&n++;else if(o===32||o===9)n++;else break}return{position:n,breaks:r}}function lr(e){return e===1?" ":`
`.repeat(e-1)}function w0(e,n,t){let r="",o=n,u=n,a=n;for(;o<t;){const i=e.charCodeAt(o);if(i===10||i===13){r+=e.slice(u,a);const c=zn(e,o,t);r+=lr(c.breaks),o=u=a=c.position}else o++,i!==32&&i!==9&&(a=o)}return r+e.slice(u,a)}function C0(e,n,t){let r="",o=n,u=n,a=n;for(;o<t;){const i=e.charCodeAt(o);if(i===39)r+=e.slice(u,o)+"'",o+=2,u=a=o;else if(i===10||i===13){r+=e.slice(u,a);const c=zn(e,o,t);r+=lr(c.breaks),o=u=a=c.position}else o++,i!==32&&i!==9&&(a=o)}return r+e.slice(u,t)}function E0(e,n,t){let r="",o=n,u=n,a=n;for(;o<t;){const i=e.charCodeAt(o);if(i===92){r+=e.slice(u,o),o++;const c=e.charCodeAt(o);if(c===10||c===13)o=zn(e,o,t).position;else if(c<256&&Iu[c])r+=Lu[c],o++;else{let l=v0(c),d=0;for(;l>0;l--){o++;const s=x0(e.charCodeAt(o));d=(d<<4)+s}r+=y0(d),o++}u=a=o}else if(i===10||i===13){r+=e.slice(u,a);const c=zn(e,o,t);r+=lr(c.breaks),o=u=a=c.position}else o++,i!==32&&i!==9&&(a=o)}return r+e.slice(u,t)}function fo(e,n,t,r,o,u){const a=r<0?0:r,i=e.slice(n,t).replace(/\r\n?/g,`
`),c=i===""?[]:(i.endsWith(`
`)?i.slice(0,-1):i).split(`
`);let l="",d=!1,s=0,f=!1;for(const h of c){let p=0;for(;p<a&&h.charCodeAt(p)===32;)p++;if(r<0||p>=h.length){s++;continue}const m=h.slice(a),b=m.charCodeAt(0);u?b===32||b===9?(f=!0,l+=`
`.repeat(d?1+s:s)):f?(f=!1,l+=`
`.repeat(s+1)):s===0?d&&(l+=" "):l+=`
`.repeat(s):l+=`
`.repeat(d?1+s:s),l+=m,d=!0,s=0}return o===ae.KEEP?l+=`
`.repeat(d?1+s:s):o!==ae.STRIP&&d&&(l+=`
`),l}function _0(e,n){if(n.valueStart===k0)return"";const{valueStart:t,valueEnd:r}=n;if(n.fast)return e.slice(t,r);switch(n.style){case D.SINGLE_QUOTED:return C0(e,t,r);case D.DOUBLE_QUOTED:return E0(e,t,r);case D.LITERAL_BLOCK:return fo(e,t,r,n.indent,n.chomping,!1);case D.FOLDED_BLOCK:return fo(e,t,r,n.indent,n.chomping,!0);default:return w0(e,t,r)}}var A0=Object.assign(Object.create(null),{"!":"!","!!":"tag:yaml.org,2002:"});function Nu(e,n){if(e.startsWith("!<")&&e.endsWith(">"))return decodeURIComponent(e.slice(2,-1));const t=e.indexOf("!",1),r=t===-1?"!":e.slice(0,t+1),o=n?.[r]??A0[r]??r;return decodeURIComponent(o)+decodeURIComponent(e.slice(r.length))}var je=-1,S0="tag:yaml.org,2002:merge",dr={filename:"",schema:Mu,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function T0(e){return"tagStart"in e&&e.tagStart!==je?e.tagStart:"anchorStart"in e&&e.anchorStart!==je?e.anchorStart:"valueStart"in e&&e.valueStart!==je?e.valueStart:"start"in e?e.start:0}function $(e,n){Fe.throwAt(e.source,e.position,n,e.filename)}function Ru(e,n,t,r){try{return t.finalize(r)}catch(o){if(o instanceof Fe)throw o;Fe.throwAt(e.source,n,o instanceof Error?o.message:String(o),e.filename)}}function D0(e,n){const t=_0(e.source,n),r=n.tagStart===je?"":e.source.slice(n.tagStart,n.tagEnd),o=e.schema.defaultScalarTag;if(r!==""){if(r==="!")return{value:t,tag:o};const u=Nu(r,e.tagHandlers),a=e.schema.lookupScalarTag(u);if(a){const c=a.resolve(t,!0,u);return c===S&&$(e,`cannot resolve a node with !<${u}> explicit tag`),{value:c,tag:a}}const i=e.schema.lookupMappingTag(u)??e.schema.lookupSequenceTag(u);if(i){t!==""&&$(e,`cannot resolve a node with !<${u}> explicit tag`);const c=i.create(u);return{value:i.carrierIsResult?c:Ru(e,e.position,i,c),tag:i}}$(e,`unknown scalar tag !<${u}>`)}return n.style===D.PLAIN?e.schema.resolveImplicitScalarTag(t):{value:o.resolve(t,!1,o.tagName),tag:o}}function ho(e,n,t){const r=n.tagStart===je?"":e.source.slice(n.tagStart,n.tagEnd);return r===""||r==="!"?t:Nu(r,e.tagHandlers)}function Ou(e){return e.nodeKind==="mapping"}function po(e){e.totalMergeKeys++,e.maxTotalMergeKeys!==-1&&e.totalMergeKeys>e.maxTotalMergeKeys&&$(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`)}function mo(e,n,t,r){po(e);for(const o of r.keys(t)){if(po(e),n.tag.has(n.value,o))continue;const u=n.tag.addPair(n.value,o,r.get(t,o));u&&$(e,u),n.overridable??=new Set,n.overridable.add(o)}}function M0(e,n,t,r){if(e.position=n.keyPosition,Ou(r))mo(e,n,t,r);else if(r.nodeKind==="sequence"&&Array.isArray(t)){t.length>100&&$(e,"abnormal merge sequence size");for(const o of t){const u=e.nodeTags.get(o);u||$(e,"cannot merge mappings; the provided source object is unacceptable"),mo(e,n,o,u)}}else $(e,"cannot merge mappings; the provided source object is unacceptable")}function F0(e,n,t,r,o){if(e.position=n.keyPosition,n.keyIsMerge){M0(e,n,r,o);return}!e.json&&n.tag.has(n.value,t)&&!n.overridable?.has(t)&&$(e,"duplicated mapping key");const u=n.tag.addPair(n.value,t,r);u&&$(e,u),n.overridable?.delete(t)}function Ct(e,n,t){const r=e.frames[e.frames.length-1];if(r.kind==="document")r.value=n,r.hasValue=!0;else if(r.kind==="sequence"){Ou(t)&&e.nodeTags.set(n,t);const o=r.tag.addItem(r.value,n,r.index++);o&&$(e,o)}else if(r.hasKey){const o=r.key;r.key=void 0,r.hasKey=!1,F0(e,r,o,n,t)}else r.key=n,r.keyPosition=e.position,r.hasKey=!0,r.keyIsMerge=t.tagName===S0}function Et(e,n,t,r,o){if(n.anchorStart!==je){const u={value:t,tag:r,isValueFinal:o};return e.anchors.set(e.source.slice(n.anchorStart,n.anchorEnd),u),u}return null}function I0(e,n){const t={...dr,...n,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;t.eventIndex<t.events.length;){const r=t.events[t.eventIndex++];switch(t.position=T0(r),r.type){case j.DOCUMENT:t.anchors=new Map,t.nodeTags=new Map,t.aliasCount=0,t.tagHandlers=Object.create(null);for(const o of r.directives)o.kind==="tag"&&(t.tagHandlers[o.handle]=o.prefix);t.frames.push({kind:"document",position:t.position,value:void 0,hasValue:!1});break;case j.SCALAR:{const{value:o,tag:u}=D0(t,r);Et(t,r,o,u,!0),Ct(t,o,u);break}case j.SEQUENCE:{const o=ho(t,r,"tag:yaml.org,2002:seq"),u=t.schema.lookupSequenceTag(o);u||$(t,`unknown sequence tag !<${o}>`);const a=u.create(o),i=Et(t,r,a,u,u.carrierIsResult);t.frames.push({kind:"sequence",position:t.position,value:a,tag:u,anchor:i,index:0});break}case j.MAPPING:{const o=ho(t,r,"tag:yaml.org,2002:map"),u=t.schema.lookupMappingTag(o);u||$(t,`unknown mapping tag !<${o}>`);const a=u.create(o),i=Et(t,r,a,u,u.carrierIsResult);t.frames.push({kind:"mapping",position:t.position,value:a,tag:u,anchor:i,key:void 0,keyPosition:t.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case j.ALIAS:{t.maxAliases!==-1&&++t.aliasCount>t.maxAliases&&$(t,`aliases exceeded maxAliases (${t.maxAliases})`);const o=t.source.slice(r.anchorStart,r.anchorEnd),u=t.anchors.get(o);u||$(t,`unidentified alias "${o}"`),u.isValueFinal||$(t,`recursive alias "${o}" is not supported for tag ${u.tag.tagName} because it uses finalize()`),Ct(t,u.value,u.tag);break}case j.POP:{const o=t.frames.pop();if(o.kind==="mapping"&&o.hasKey&&(t.position=o.keyPosition,$(t,"incomplete mapping pair in event stream")),o.kind==="document")t.documents.push(o.value);else{const u=o.tag.carrierIsResult?o.value:Ru(t,o.position,o.tag,o.value);o.anchor&&(o.anchor.value=u,o.anchor.isValueFinal=!0),Ct(t,u,o.tag)}break}}}return t.documents}var T=-1,Bu=Object.prototype.hasOwnProperty,Qe=1,$t=2,Pu=3,Hn=4,L0=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,N0=/[,\[\]{}]/,zu=/^(?:!|!!|![0-9A-Za-z-]+!)$/,jt=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,Hu=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,R0=new RegExp(`^(?:${jt})*$`),O0=new RegExp(`^(?:${Hu})+$`),B0=new RegExp(`^(?:!(?:${jt})*|${Hu}(?:${jt})*)$`),fr={filename:"",maxDepth:100};function P0(e,n,t){e.events.push({type:j.DOCUMENT,explicitStart:n,explicitEnd:t,directives:e.directives})}function qu(e,n,t,r,o,u,a){e.events.push({type:j.SEQUENCE,start:n,anchorStart:t,anchorEnd:r,tagStart:o,tagEnd:u,style:a})}function Ut(e,n,t,r,o,u,a){e.events.push({type:j.MAPPING,start:n,anchorStart:t,anchorEnd:r,tagStart:o,tagEnd:u,style:a})}function bo(e,n){e.events.splice(n.eventsLength,0,{type:j.MAPPING,start:n.position,anchorStart:T,anchorEnd:T,tagStart:T,tagEnd:T,style:Ye.FLOW})}function tn(e,n,t,r,o,u,a,i,c=ae.CLIP,l=-1,d=!1){e.events.push({type:j.SCALAR,valueStart:n,valueEnd:t,anchorStart:r,anchorEnd:o,tagStart:u,tagEnd:a,style:i,chomping:c,indent:l,fast:d})}function z0(e,n,t){e.events.push({type:j.ALIAS,anchorStart:n,anchorEnd:t})}function Ue(e){e.events.push({type:j.POP})}function W(e){tn(e,T,T,T,T,T,T,D.PLAIN)}function go(){return{anchorStart:T,anchorEnd:T,tagStart:T,tagEnd:T}}function Ge(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function Te(e,n){e.position=n.position,e.line=n.line,e.lineStart=n.lineStart,e.lineIndent=n.lineIndent,e.firstTabInLine=n.firstTabInLine,e.events.length=n.eventsLength}function E(e,n){Fe.throwAt(e.input.slice(0,e.length),e.position,n,e.filename)}function P(e){return e===10||e===13}function Ie(e){return e===9||e===32}function ee(e){return Ie(e)||P(e)}function de(e){return e===0||ee(e)}function Le(e){return e===44||e===91||e===93||e===123||e===125}function H0(e){return e>=48&&e<=57?e-48:-1}function q0(e){if(e>=48&&e<=57)return e-48;const n=e|32;return n>=97&&n<=102?n-97+10:-1}function $0(e){return e===120?2:e===117?4:e===85?8:0}function j0(e){return e===48||e===97||e===98||e===116||e===9||e===110||e===118||e===102||e===114||e===101||e===32||e===34||e===47||e===92||e===78||e===95||e===76||e===80}function qn(e){e.input.charCodeAt(e.position)===10?e.position++:(e.position++,e.input.charCodeAt(e.position)===10&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function U(e,n){let t=0,r=e.input.charCodeAt(e.position),o=e.position===e.lineStart||ee(e.input.charCodeAt(e.position-1));for(;r!==0;){for(;Ie(r);)o=!0,r===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(n&&o&&r===35)do r=e.input.charCodeAt(++e.position);while(!P(r)&&r!==0);if(!P(r))break;for(qn(e),t++,o=!0,r=e.input.charCodeAt(e.position);r===32;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return t}function Je(e,n=e.position){const t=e.input.charCodeAt(n);if((t===45||t===46)&&t===e.input.charCodeAt(n+1)&&t===e.input.charCodeAt(n+2)){const r=e.input.charCodeAt(n+3);return r===0||ee(r)}return!1}function $u(e){e.position===e.lineStart&&e.input.charCodeAt(e.position)===65279&&(e.position++,e.lineStart=e.position)}function hr(e){if(e.position!==e.lineStart)return!1;if(Je(e))return!0;if(e.input.charCodeAt(e.position)!==65279)return!1;const n=Ge(e);$u(e),U(e,!0);const t=e.input.charCodeAt(e.position),r=e.position===e.lineStart&&(t===37||t===45&&Je(e));return Te(e,n),r}function ko(e){let n=e.input.charCodeAt(e.position);for(;n!==0&&!P(n);)n=e.input.charCodeAt(++e.position)}function ju(e,n,t){L0.test(e.input.slice(n,t))&&E(e,"the stream contains non-printable characters")}function U0(e,n,t){if(e.input.charCodeAt(e.position)!==33)return!1;n.tagStart!==T&&E(e,"duplication of a tag property");const r=e.position;let o=!1,u=!1,a="!",i=e.input.charCodeAt(++e.position);i===60?(o=!0,i=e.input.charCodeAt(++e.position)):i===33&&(u=!0,a="!!",i=e.input.charCodeAt(++e.position));let c=e.position,l;if(o){for(;i!==0&&i!==62;)i=e.input.charCodeAt(++e.position);i!==62&&E(e,"unexpected end of the stream within a verbatim tag"),l=e.input.slice(c,e.position),e.position++}else{for(;i!==0&&!ee(i)&&!(t&&Le(i));)i===33&&(u?E(e,"tag suffix cannot contain exclamation marks"):(a=e.input.slice(c-1,e.position+1),zu.test(a)||E(e,"named tag handle cannot contain such characters"),u=!0,c=e.position+1)),i=e.input.charCodeAt(++e.position);l=e.input.slice(c,e.position),N0.test(l)&&E(e,"tag suffix cannot contain flow indicator characters")}return l&&!(o?R0.test(l):O0.test(l))&&E(e,`tag name cannot contain such characters: ${l}`),!o&&a!=="!"&&a!=="!!"&&!Bu.call(e.tagHandlers,a)&&E(e,`undeclared tag handle "${a}"`),n.tagStart=r,n.tagEnd=e.position,!0}function G0(e,n){if(e.input.charCodeAt(e.position)!==38)return!1;n.anchorStart!==T&&E(e,"duplication of an anchor property"),e.position++;const t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!ee(e.input.charCodeAt(e.position))&&!Le(e.input.charCodeAt(e.position));)e.position++;return e.position===t&&E(e,"name of an anchor node must contain at least one character"),n.anchorStart=t,n.anchorEnd=e.position,!0}function V0(e,n){if(e.input.charCodeAt(e.position)!==42)return!1;(n.anchorStart!==T||n.tagStart!==T)&&E(e,"alias node should not have any properties"),e.position++;const t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!ee(e.input.charCodeAt(e.position))&&!Le(e.input.charCodeAt(e.position));)e.position++;return e.position===t&&E(e,"name of an alias node must contain at least one character"),z0(e,t,e.position),!0}function Gt(e,n){U(e,!1),e.lineIndent<n&&E(e,"deficient indentation")}function W0(e,n,t){if(e.input.charCodeAt(e.position)!==39)return!1;e.position++;const r=e.position;let o=!0;for(;e.input.charCodeAt(e.position)!==0;){const u=e.input.charCodeAt(e.position);if(u===39){if(e.input.charCodeAt(e.position+1)===39){o=!1,e.position+=2;continue}const a=e.position;return e.position++,tn(e,r,a,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,D.SINGLE_QUOTED,ae.CLIP,-1,o),!0}P(u)?(o=!1,Gt(e,n)):e.position===e.lineStart&&Je(e)?E(e,"unexpected end of the document within a single quoted scalar"):u!==9&&u<32?E(e,"expected valid JSON character"):e.position++}E(e,"unexpected end of the stream within a single quoted scalar")}function K0(e,n,t){if(e.input.charCodeAt(e.position)!==34)return!1;e.position++;const r=e.position;let o=!0;for(;e.input.charCodeAt(e.position)!==0;){const u=e.input.charCodeAt(e.position);if(u===34){const a=e.position;return e.position++,tn(e,r,a,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,D.DOUBLE_QUOTED,ae.CLIP,-1,o),!0}if(u===92){o=!1;const a=e.input.charCodeAt(++e.position);if(P(a))Gt(e,n);else if(j0(a))e.position++;else{let i=$0(a);for(i===0&&E(e,"unknown escape sequence");i-- >0;)e.position++,q0(e.input.charCodeAt(e.position))<0&&E(e,"expected hexadecimal character");e.position++}}else P(u)?(o=!1,Gt(e,n)):e.position===e.lineStart&&Je(e)?E(e,"unexpected end of the document within a double quoted scalar"):u!==9&&u<32?E(e,"expected valid JSON character"):e.position++}E(e,"unexpected end of the stream within a double quoted scalar")}function Z0(e,n,t){const r=e.input.charCodeAt(e.position);let o=ae.CLIP,u=-1,a=!1;if(r!==124&&r!==62)return!1;const i=r===124?D.LITERAL_BLOCK:D.FOLDED_BLOCK;for(e.position++;e.input.charCodeAt(e.position)!==0;){const h=e.input.charCodeAt(e.position),p=H0(h);if(h===43||h===45)o!==ae.CLIP&&E(e,"repeat of a chomping mode identifier"),o=h===43?ae.KEEP:ae.STRIP,e.position++;else if(p>=0)p===0&&E(e,"bad explicit indentation width of a block scalar; it cannot be less than one"),a&&E(e,"repeat of an indentation width identifier"),u=n+p-1,a=!0,e.position++;else break}let c=!1;for(;Ie(e.input.charCodeAt(e.position));)c=!0,e.position++;c&&e.input.charCodeAt(e.position)===35&&ko(e),P(e.input.charCodeAt(e.position))?qn(e):e.input.charCodeAt(e.position)!==0&&E(e,"a line break is expected");let l=a?u:-1,d=0;const s=e.position;let f=e.position;for(;e.input.charCodeAt(e.position)!==0;){const h=e.position;let p=0;for(;e.input.charCodeAt(h+p)===32;)p++;const m=e.input.charCodeAt(h+p);if(m===0){l>=0?p>l&&(f=h+p):p>0&&(f=h+p);break}if(hr(e))break;if(!a&&l===-1&&P(m)&&(d=Math.max(d,p)),!a&&l===-1&&!P(m)&&(m===9&&p<n&&(e.position=h+p,E(e,"tab characters must not be used in indentation")),p<d&&(e.position=h+p,E(e,"bad indentation of a mapping entry"))),l===-1&&m!==0&&!P(m)&&p<n){e.lineIndent=p,e.position=h+p;break}!a&&m!==0&&!P(m)&&l===-1&&(l=p);const b=l===-1?n+1:l;if(m!==0&&!P(m)&&p<b){e.lineIndent=p,e.position=h+p;break}ko(e),f=e.position,P(e.input.charCodeAt(e.position))&&(qn(e),f=e.position)}return ju(e,s,f),tn(e,s,f,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,i,o,l),!0}function Y0(e,n){const t=e.input.charCodeAt(e.position),r=n===Qe;if(t===0||ee(t)||t===35||t===38||t===42||t===33||t===124||t===62||t===39||t===34||t===37||t===64||t===96||r&&Le(t))return!1;if(t===63||t===45){const o=e.input.charCodeAt(e.position+1);if(de(o)||r&&Le(o))return!1}return!0}function Q0(e,n,t,r){if(!Y0(e,t))return!1;const o=e.position;let u=e.position,a=e.input.charCodeAt(e.position);const i=t===Qe;let c=!1;for(;a!==0&&!hr(e);){if(a===58){const l=e.input.charCodeAt(e.position+1);if(de(l)||i&&Le(l))break}else if(a===35){if(ee(e.input.charCodeAt(e.position-1)))break}else{if(i&&Le(a))break;if(P(a)){const l=e.position,d=e.line,s=e.lineStart,f=e.lineIndent;if(U(e,!1),e.lineIndent>=n){c=!0,a=e.input.charCodeAt(e.position);continue}e.position=l,e.line=d,e.lineStart=s,e.lineIndent=f;break}}Ie(a)||(u=e.position+1),a=e.input.charCodeAt(++e.position)}return u===o?!1:(ju(e,o,u),tn(e,o,u,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,D.PLAIN,ae.CLIP,-1,!c),!0)}function on(e,n){const t=e.line;U(e,!0),(e.line>t&&e.lineIndent<n||e.firstTabInLine!==-1&&e.lineIndent<n)&&E(e,"deficient indentation")}function J0(e,n,t){const r=e.input.charCodeAt(e.position),o=r===123,u=e.position;let a=!0;if(r!==91&&r!==123)return!1;const i=o?125:93;for(o?Ut(e,u,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,Ye.FLOW):qu(e,u,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,Ye.FLOW),e.position++;e.input.charCodeAt(e.position)!==0;){on(e,n);let c=e.input.charCodeAt(e.position);if(c===i)return e.position++,Ue(e),!0;a?c===44&&E(e,"expected the node content, but found ','"):E(e,"missed comma between flow collection entries");let l=!1,d=!1;c===63&&ee(e.input.charCodeAt(e.position+1))&&(l=d=!0,e.position+=1,on(e,n));const s=e.line,f=Ge(e),h=De(e,n,Qe,!1,!0);on(e,n),c=e.input.charCodeAt(e.position),(o||d||e.line===s)&&c===58?(l=!0,e.position++,on(e,n),o||bo(e,f),h||W(e),De(e,n,Qe,!1,!0)||W(e),on(e,n),o||Ue(e)):o&&l?(h||W(e),W(e)):o?W(e):l&&(bo(e,f),h||W(e),W(e),Ue(e)),c=e.input.charCodeAt(e.position),c===44?(a=!0,e.position++):a=!1}E(e,"unexpected end of the stream within a flow collection")}function yo(e,n,t){if(e.firstTabInLine!==-1||e.input.charCodeAt(e.position)!==45||!de(e.input.charCodeAt(e.position+1)))return!1;for(qu(e,e.position,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,Ye.BLOCK);e.input.charCodeAt(e.position)===45&&de(e.input.charCodeAt(e.position+1));){e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,E(e,"tab characters must not be used in indentation"));const r=e.line;e.position++;const o=U(e,!0)>0;if(e.firstTabInLine!==-1&&e.input.charCodeAt(e.position)===45&&de(e.input.charCodeAt(e.position+1))&&E(e,"bad indentation of a sequence entry"),o&&e.lineIndent<=n?W(e):De(e,n,Pu,!1,!0),U(e,!0),e.lineIndent<n||e.position>=e.length)break;e.lineIndent>n&&E(e,"bad indentation of a sequence entry"),e.line===r&&e.input.charCodeAt(e.position)===45&&de(e.input.charCodeAt(e.position+1))&&E(e,"bad indentation of a sequence entry")}return Ue(e),!0}function _t(e,n,t,r){let o=!1,u=!1,a=!1,i=!1;if(e.firstTabInLine!==-1)return!1;let c=e.input.charCodeAt(e.position);for(;c!==0;){!o&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,E(e,"tab characters must not be used in indentation"));const l=e.input.charCodeAt(e.position+1),d=e.line;if((c===63||c===58)&&de(l))a||(Ut(e,e.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,Ye.BLOCK),a=!0),c===63?(o&&W(e),u=!0,o=!0):(o||(W(e),u=!0),o=!1),e.position+=1,i=!0;else{o&&(W(e),o=!1);const s=Ge(e);if(!De(e,t,$t,!1,!0))break;if(e.line===d){for(c=e.input.charCodeAt(e.position);Ie(c);)c=e.input.charCodeAt(++e.position);if(c===58){if(c=e.input.charCodeAt(++e.position),de(c)||E(e,"a whitespace character is expected after the key-value separator within a block mapping"),!a){for(Te(e,s),Ut(e,s.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,Ye.BLOCK),a=!0,De(e,t,$t,!1,!0),c=e.input.charCodeAt(e.position);Ie(c);)c=e.input.charCodeAt(++e.position);e.position++}u=!0,o=!1,i=!1}else if(u)E(e,"expected ':' after a mapping key");else return r.anchorStart!==T||r.tagStart!==T?(Te(e,s),!1):!0}else if(u)E(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return r.anchorStart!==T||r.tagStart!==T?(Te(e,s),!1):!0}if(De(e,n,Hn,!0,i)&&(i=!1),o||i&&(W(e),i=!1),U(e,!0),c=e.input.charCodeAt(e.position),(e.line===d||e.lineIndent>n)&&c!==0)E(e,"bad indentation of a mapping entry");else if(e.lineIndent<n)break}return u?(o&&W(e),a&&Ue(e),!0):!1}function De(e,n,t,r,o,u=!0){e.depth>=e.maxDepth&&E(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let a=1,i=!1,c=!1,l=null;const d=go();let s=t===Hn||t===Pu,f=s;const h=s;if(r&&U(e,!0)&&(i=!0,e.lineIndent>n?a=1:e.lineIndent===n?a=0:a=-1),a===1)for(;;){const p=e.input.charCodeAt(e.position),m=Ge(e);if(i&&a!==1&&(p===33||p===38))break;if(i&&h&&(d.tagStart!==T||d.anchorStart!==T)&&(p===33||p===38)){const b=Ge(e),g=n+1;if(_t(e,e.position-e.lineStart,g,d)&&e.events[b.eventsLength]?.type===j.MAPPING)return e.depth--,!0;Te(e,b)}if(i&&(p===33&&d.tagStart!==T||p===38&&d.anchorStart!==T)||!U0(e,d,t===Qe)&&!G0(e,d))break;l===null&&(l=m),U(e,!0)?(i=!0,f=h,e.lineIndent>n?a=1:e.lineIndent===n?a=0:a=-1):f=!1}if(f&&(f=i||o),a===1||t===Hn){const p=t===Qe||t===$t?n:n+1,m=e.position-e.lineStart;if(a===1)if(f&&(yo(e,m,d)||_t(e,m,p,d))||J0(e,p,d))c=!0;else{const b=e.input.charCodeAt(e.position);if(l!==null&&u&&h&&!f&&b!==124&&b!==62){const g=Ge(e),k=l.position-l.lineStart;Te(e,l),_t(e,k,p,go())&&e.events[g.eventsLength]?.type===j.MAPPING?c=!0:Te(e,g)}!c&&(s&&Z0(e,p,d)||W0(e,p,d)||K0(e,p,d)||V0(e,d)||Q0(e,p,t,d))&&(c=!0)}else a===0&&(c=f&&yo(e,m,d))}return s=s&&!c,!c&&(d.anchorStart!==T||d.tagStart!==T||s)&&(tn(e,T,T,d.anchorStart,d.anchorEnd,d.tagStart,d.tagEnd,D.PLAIN),c=!0),e.depth--,c||d.anchorStart!==T||d.tagStart!==T}function X0(e){if(e.lineIndent>0||e.input.charCodeAt(e.position)!==37)return!1;e.position++;const n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!ee(e.input.charCodeAt(e.position));)e.position++;const t=e.input.slice(n,e.position),r=[];for(t.length===0&&E(e,"directive name must not be less than one character in length");e.input.charCodeAt(e.position)!==0&&!P(e.input.charCodeAt(e.position));){for(;Ie(e.input.charCodeAt(e.position));)e.position++;if(e.input.charCodeAt(e.position)===35||P(e.input.charCodeAt(e.position))||e.input.charCodeAt(e.position)===0)break;const o=e.position;for(;e.input.charCodeAt(e.position)!==0&&!ee(e.input.charCodeAt(e.position));)e.position++;r.push(e.input.slice(o,e.position))}if(P(e.input.charCodeAt(e.position))&&qn(e),t==="YAML"){e.directives.some(u=>u.kind==="yaml")&&E(e,"duplication of %YAML directive"),r.length!==1&&E(e,"YAML directive accepts exactly one argument");const o=/^([0-9]+)\.([0-9]+)$/.exec(r[0]);o===null&&E(e,"ill-formed argument of the YAML directive"),parseInt(o[1],10)!==1&&E(e,"unacceptable YAML version of the document"),e.directives.push({kind:"yaml",version:r[0]})}else if(t==="TAG"){r.length!==2&&E(e,"TAG directive accepts exactly two arguments");const[o,u]=r;zu.test(o)||E(e,"ill-formed tag handle (first argument) of the TAG directive"),Bu.call(e.tagHandlers,o)&&E(e,`there is a previously declared suffix for "${o}" tag handle`),B0.test(u)||E(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagHandlers[o]=u,e.directives.push({kind:"tag",handle:o,prefix:u})}return!0}function ed(e){e.directives=[],e.tagHandlers=Object.create(null);let n=!1;for(U(e,!0);X0(e);)n=!0,U(e,!0);let t=!1,r=!1,o=!0;if(e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45&&de(e.input.charCodeAt(e.position+3))){t=!0;const i=e.line;e.position+=3,U(e,!0),o=e.line>i}else n&&E(e,"directives end mark is expected");const u=e.events.length;if(!t&&e.position===e.lineStart&&e.input.charCodeAt(e.position)===46&&Je(e)){e.position+=3,U(e,!0);return}if(P0(e,t,!1),De(e,e.lineIndent-1,Hn,!1,o,o)||W(e),U(e,!0),e.position===e.lineStart&&Je(e)&&(r=e.input.charCodeAt(e.position)===46,r)){const i=e.line;e.position+=3,U(e,!0),e.line===i&&e.position<e.length&&E(e,"end of the stream or a document separator is expected")}const a=e.events[u];a?.type===j.DOCUMENT&&(a.explicitEnd=r),Ue(e),!r&&e.position<e.length&&!hr(e)&&E(e,"end of the stream or a document separator is expected")}function nd(e,n){const t=e.length,r={...fr,...n,input:`${e}\0`,length:t,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},o=e.indexOf("\0");for(o!==-1&&Fe.throwAt(e,o,"null byte is not allowed in input",r.filename);r.position<r.length&&($u(r),U(r,!0),!(r.position>=r.length));){const u=r.position;ed(r),r.position===u&&E(r,"can not read a document")}return r.events}var td={...fr,...dr};function rd(e,n={}){const t={...td,...n},r=String(e),o=Object.keys(fr),u=Object.keys(dr);return I0(nd(r,ao(t,o)),{...ao(t,u),source:r})}function od(e,n){const t=rd(e,n);if(t.length===0)throw new Fe("expected a document, but the input is empty");if(t.length===1)return t[0];throw new Fe("expected a single document in the stream, but found more")}function ut(e,n){return(e&1<<n)!==0}var xo={applyQuoteFlowKeysOption:ud,doubleQuoteForInvisibles:id,doubleQuoteWhitespaceOnly:ad,applyForceQuotesOption:cd,tryLongOrMultilineAsBlock:sd,quoteInvalidPlain:ld,fallbackToDoubleQuoted:dd};function Uu(e){return e.presenterOptions.quoteStyle==="single"&&ut(e.allowedStylesMask,D.SINGLE_QUOTED)?D.SINGLE_QUOTED:D.DOUBLE_QUOTED}function ud(e){e.presenterOptions.quoteFlowKeys&&(!e.isKey||!e.flowOnly||e.style!==D.PLAIN||(e.style=D.DOUBLE_QUOTED))}function id(e){e.style===D.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value)&&(e.style=D.DOUBLE_QUOTED)}function ad(e){e.style===D.PLAIN&&/^\s+$/.test(e.node.value)&&(e.style=D.DOUBLE_QUOTED)}function cd(e){e.presenterOptions.forceQuotes&&(e.isKey||e.style!==D.PLAIN||(e.style=e.node.value.includes(`
`)?D.DOUBLE_QUOTED:Uu(e)))}function sd(e){if(e.style!==D.PLAIN||e.isKey)return;const n=e.node.value,t=n.indexOf(`
`)!==-1;if(!ut(e.allowedStylesMask,D.LITERAL_BLOCK)){t&&(e.style=D.DOUBLE_QUOTED);return}const r=e.presenterOptions.lineWidth;if(r===-1){t&&(e.style=D.LITERAL_BLOCK);return}const o=Math.max(Math.min(r,40),r-e.shiftOfContent);let u=0,a=!1;for(;u<=n.length;){let i=n.length;const c=n.indexOf(`
`,u);c!==-1&&(i=c);const l=n.slice(u,i);if(l.length>o&&l[0]!==" "&&/ [^ \t]/.test(l)&&(a=!0),c===-1)break;u=c+1}a?e.style=D.FOLDED_BLOCK:t&&(e.style=D.LITERAL_BLOCK)}function ld(e){e.style===D.PLAIN&&!ut(e.allowedStylesMask,D.PLAIN)&&(e.style=Uu(e))}function dd(e){ut(e.allowedStylesMask,e.style)||(e.style=D.DOUBLE_QUOTED)}Object.keys(xo).map(e=>Reflect.get(xo,e));var At,vo;function fd(){return vo||(vo=1,At=function(n,t){var r=3,o="-",u=o.charCodeAt(0),a=o.length;function i(c,l,d,s){var f,h,p,m,b,g,k,y=!1,x=c.bMarks[l]+c.tShift[l],v=c.eMarks[l];if(l!==0||u!==c.src.charCodeAt(0))return!1;for(f=x+1;f<=v;f++)if(o[(f-x)%a]!==c.src[f]){k=f+1;break}if(p=Math.floor((f-x)/a),p<r)return!1;if(f-=(f-x)%a,s)return!0;for(h=l;h++,!(h>=d||c.src.slice(x,v)==="..."||(x=c.bMarks[h]+c.tShift[h],v=c.eMarks[h],x<v&&c.sCount[h]<c.blkIndent));)if(u===c.src.charCodeAt(x)&&!(c.sCount[h]-c.blkIndent>=4)){for(f=x+1;f<=v&&o[(f-x)%a]===c.src[f];f++);if(!(Math.floor((f-x)/a)<p)&&(f-=(f-x)%a,f=c.skipSpaces(f),!(f<v))){y=!0;break}}return b=c.parentType,g=c.lineMax,c.parentType="container",c.lineMax=h,m=c.push("front_matter",null,0),m.hidden=!0,m.markup=c.src.slice(l,f),m.block=!0,m.map=[l,h+(y?1:0)],m.meta=c.src.slice(k,x-1),c.parentType=b,c.lineMax=g,c.line=h+(y?1:0),t(m.meta),!0}n.block.ruler.before("table","front_matter",i,{alt:["paragraph","reference","blockquote","list"]})}),At}var hd=fd();const pd=nt(hd);function md(){return e=>{let n="";e.use(pd,t=>{const r=bd(t);r!==void 0?n=Gu(r,e.utils.escapeHtml):n=""}),e.renderer.rules.front_matter=(t,r,o,u,a)=>n===""?"":`<table class="markdown-frontMatter"${a.renderAttrs(t[r])}>
${n}
</table>
`}}function bd(e){try{const n=od(e,{schema:Mu});if(n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.keys(n).length>0)return n}catch{}}function Gu(e,n){const t=Object.entries(e);return t.length===0?"":`<tbody>
${t.map(([o,u])=>`<tr><th scope="row">${n(o)}</th><td>${Vt(u,n)}</td></tr>`).join(`
`)}
</tbody>`}function Vt(e,n){if(e==null)return"";if(e instanceof Date)return n(gd(e));if(Array.isArray(e))return e.every(kd)?e.map(r=>Vt(r,n)).join(", "):`<ul>${e.map(r=>`<li>${Vt(r,n)}</li>`).join("")}</ul>`;if(typeof e=="object"){const t=Gu(e,n);return t===""?"":`<table>${t}</table>`}return n(String(e))}function gd(e){if(Number.isNaN(e.getTime()))return"";const n=e.toISOString();return n.endsWith("T00:00:00.000Z")?n.slice(0,10):n}function kd(e){if(e==null||e instanceof Date)return!0;const n=typeof e;return n==="string"||n==="number"||n==="boolean"||n==="bigint"}const pr={rootValueKey:"extension.markeditPreview",defaultModes:["edit","side-by-side","preview","syntax-hidden"],defaultPreset:"default"},yd=rn(C.MarkEdit.userSettings),ne=rn(yd[pr.rootValueKey]),Vu=rn(ne.changeMode),Wu=rn(ne.markdownIt),xd=En(ne.syncScroll);En(ne.hidePreviewButtons);En(ne.syntaxAutoDetect,!1);const vd=En(ne.imageHoverPreview,!1),Ku=En(ne.inlineImages,!1),it=ne.themeName??"github",Zu=it==="none",St=ne.styledHtmlColorScheme??ne.styledHtmlTheme??"auto";ne.mathDelimiters;const wd=Vu.modes??pr.defaultModes,wo=rn(Vu.hotKey),Cd=Wu.preset??pr.defaultPreset,Ed=rn(Wu.options);function rn(e,n={}){return e??n}function En(e,n=!0){return e??n}const _d=`.markdown-body {
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
`,Ad=`.markdown-body {
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
`,Sd=`.markdown-body {
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
`,Td=`.markdown-body {
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
`,Dd=`.markdown-body {
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
`,Md=`.markdown-body {
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
`,Fd=`.markdown-body {
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
`,Id=`.markdown-body {
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
`,Ld=`.markdown-body {
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
`,Nd=`.markdown-body {
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
`,Rd=`.markdown-body {
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
`,Od=`.markdown-body {
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
`,Bd=`.markdown-body {
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
`,Pd=`.markdown-body {
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
`,zd=`.markdown-body {
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
`,Hd=`.markdown-body {
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
`,qd=`.markdown-body {
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
`,$d=`.markdown-alert {
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
`,jd=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,Ud=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,Gd=`.code-copy-wrapper {
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
`,$n={github:{light:Ad,dark:Sd},cobalt:{dark:Td},dracula:{dark:Dd},minimal:{light:Md,dark:Fd},"night-owl":{dark:Id},"rose-pine":{light:Ld,dark:Nd},solarized:{light:Rd,dark:Od},synthwave84:{dark:Bd},"winter-is-coming":{light:Pd,dark:zd},xcode:{light:Hd,dark:qd}};function Vd(e="auto"){if(Zu)return"";const n=$n[it]??$n.github,t=n.light??n.dark,r=n.dark??n.light,o=Rr(t)??"#ffffff",u=Rr(r)??"#0d1117";return[".markdown-body { padding: 25px; }",...mr(e,`body { background: ${o}; }`,`body { background: ${u}; }`)].join(`
`)}function Yu(e="auto"){if(Zu)return[`:root { color-scheme: ${e==="auto"?"light dark":e}; }`,"body, .markdown-body { background: Canvas; color: CanvasText; }"].join(`
`);const n=$n[it]??$n.github,t=n.light??n.dark,r=n.dark??n.light;return[_d,...mr(e,t,r)].join(`
`)}function Qu(e="auto"){return[$d,...mr(e,jd,Ud)].join(`
`)}function Ju(){return Gd}function mr(e,n,t){const r=[];switch(e){case"light":r.push(n);break;case"dark":r.push(t);break;case"auto":r.push(`
        ${n}
        @media (prefers-color-scheme: dark) {
          ${t}
        }`);break}return r}const Wd={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Markdown Source",sideBySideMode:"Preview (Side-by-Side)",previewMode:"Preview (Overlay)",syntaxHiddenMode:"Mixed (Syntax Hidden)",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",printRendered:"Print Rendered…",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",failedToCopy:"Failed to copy. Please try again.",untitled:"Untitled",version:"Version",source:"Source",preview:"Preview"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"Markdown 源码",sideBySideMode:"预览（并排）",previewMode:"预览（覆盖）",syntaxHiddenMode:"混合（隐藏语法）",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",printRendered:"打印渲染…",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",failedToCopy:"复制失败，请重试。",untitled:"未命名",version:"版本",source:"源码",preview:"预览"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",printRendered:"列印渲染…",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",failedToCopy:"複製失敗，請再試一次。",editMode:"Markdown 原始碼",sideBySideMode:"預覽（並排）",previewMode:"預覽（覆蓋）",syntaxHiddenMode:"混合（隱藏語法）",untitled:"未命名",version:"版本",source:"原始碼",preview:"預覽"}};function R(e){return Zd[e]}const Kd=["default","zh-CN","zh-TW"],Zd=Wd[(()=>{const e=navigator.language;return Kd.includes(e)?e:"default"})()];function br(){return typeof C.MarkEdit.addExtension=="function"}async function gr(e,n=!0){return await ni,Z.render(e,{lineInfo:n})}async function Yd(e,n){if(!n.startsWith("#"))return;await ni;const t=Z.normalizeLink(n).substring(1);return Z.parse(e,{}).find(o=>o.type==="heading_open"&&o.attrGet("id")===t)?.map?.[0]}async function Qd(e){return(await(await rf()).render(`markedit-mermaid-${tf++}`,e.trim())).svg}async function Jd(e){return(await Xd()).renderToString(e.trim(),{displayMode:!0,throwOnError:!1})}function Xu(e){e()}async function ei(e){const n=r=>`<style>
${r}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,n(Vd(St)),n(Yu(St)),n(Qu(St)),n(Ju()),"</body></html>"].join(`
`)}const Xd=async()=>({renderToString:(...e)=>""}),ef=async()=>({initialize:()=>{},render:async()=>({svg:""}),run:async({postRenderCallback:e})=>e?.()});let nf,Co,tf=0;async function rf(){const e=await(nf??=ef()),n=matchMedia("(prefers-color-scheme: dark)").matches;return n!==Co&&(e.initialize({theme:n?"dark":void 0}),Co=n),e}const Z=J(Cd,{html:!0,breaks:!0,linkify:!0,...Ed}),of=[];Z.use(md());Z.use(ze);Z.use(Ys,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});Z.use(ul);Z.use(cl,{enabled:br(),label:!0});Z.use(ll);const uf=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),ni=Promise.all(of).then(()=>{for(const e of uf){const n=Z.renderer.rules[e];Z.renderer.rules[e]=(t,r,o,u,a)=>{const i=t[r];return u.lineInfo&&i.map?.length===2&&(i.attrSet("data-line-from",String(i.map[0])),i.attrSet("data-line-to",String(i.map[1]-1))),n?n(t,r,o,u,a):a.renderToken(t,r,o)}}for(const e of["fence","code_block"]){const n=Z.renderer.rules[e];Z.renderer.rules[e]=(t,r,o,u,a)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${n===void 0?a.renderToken(t,r,o):n(t,r,o,u,a)}
        <button title="${R("copyCode")}" aria-label="${R("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),af=new DOMParser,cf="image-loader",kr="cm-md-image-preview",Eo=5;function ti(e){const n=af.parseFromString(e,"text/html");return n.querySelectorAll("img").forEach(r=>{const o=r.getAttribute("src");o!==null&&(r.src=ri(o))}),n.body.innerHTML}function ri(e){return e.includes("://")||e.startsWith("//")||e.startsWith("data:image/")?e:`${cf}://${e}`}function sf(e){typeof C.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",n=>{ke.panelPresenter!==void 0&&(clearTimeout(ke.panelPresenter),ke.panelPresenter=void 0),ke.panelPresenter=setTimeout(()=>{const t=n.target,r=t?.closest(".cm-md-link"),o=r?.dataset.linkUrl??r?.innerText??"";r!==null&&ra(o)?lf(r,o):t?.classList.contains(kr)||an()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&an(!1)}),e.addEventListener("scroll",()=>an()))}async function lf(e,n){if(e===ke.focusedElement)return;const t=(await C.MarkEdit.getFileInfo())?.parentPath;if(t===void 0)return;const r=Pe(t,n),o=await C.MarkEdit.getFileObject(r);if(o===void 0)return;const u=e.getBoundingClientRect(),a=document.createElement("img");a.className=kr,a.style.position="fixed",a.style.left=`${u.left}px`,a.style.zIndex="10000",a.style.borderRadius="5px",a.style.opacity="0",a.style.transition="opacity 120ms",a.style.cursor="pointer",a.onclick=()=>{an(),window.open(n,"_blank")},a.onload=()=>{const c=Math.min(a.naturalHeight,240);a.style.height=`${c}px`;const l=u.top,d=window.innerHeight-u.bottom;l>d?a.style.top=`${u.top-c-Eo}px`:a.style.top=`${u.bottom+Eo}px`,requestAnimationFrame(()=>{a.style.opacity="1"})};const i=o.mimeType??"image/png";a.src=`data:${i};base64,${o.data}`,an(!1),ke.focusedElement=e,document.body.appendChild(a)}function an(e=!0){ke.focusedElement!==void 0&&(ke.focusedElement=void 0,document.querySelectorAll(`.${kr}`).forEach(n=>{e?(n.style.opacity="0",n.addEventListener("transitionend",()=>n.remove(),{once:!0})):n.remove()}))}const ke={panelPresenter:void 0,focusedElement:void 0};let gn=null,Wt=null;function yr(){gn=null,Wt=null}function oi(e){gn===null&&(gn=Array.from(e.querySelectorAll("[data-line-from]")).map(n=>({from:parseInt(n.dataset.lineFrom??"0",10),to:parseInt(n.dataset.lineTo??"0",10),el:n,top:Rn(e,n)})))}function df(e){return gn===null&&oi(e),gn??[]}function ff(e){return Wt??=parseFloat(getComputedStyle(e).paddingTop)||0,Wt}let jn=null,Tt;function _o(e){jn=e,Tt!==void 0&&clearTimeout(Tt),Tt=setTimeout(()=>{jn=null},150)}function hf(e,n){if(!xd)return;let t,r;e.addEventListener("scroll",()=>{jn!=="preview"&&(o1()||(t!==void 0&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{_o("editor"),Kt(e,n,!1)})))},{passive:!0}),n.addEventListener("scroll",()=>{jn!=="editor"&&(r!==void 0&&cancelAnimationFrame(r),r=requestAnimationFrame(()=>{_o("preview"),pf(n,e)}))},{passive:!0})}function Kt(e,n,t=!0){const{line:r,progress:o}=mf(e);bf(n,r,o,t)}function pf(e,n){const t=df(e);if(t.length===0)return;const r=e.scrollTop,o=ff(e);let u=0,a=t.length-1,i,c=0;for(;u<=a;){const g=u+a>>>1,k=t[g].top-o;if(k+t[g].el.offsetHeight<=r)u=g+1;else if(g>0&&t[g-1].top-o+t[g-1].el.offsetHeight>r)a=g-1;else{i=t[g],c=at((r-k)/t[g].el.offsetHeight);break}}if(i===void 0)return;const{from:l,to:d}=i,s=l+Math.round(c*Math.max(0,d-l)),f=C.MarkEdit.editorView,h=Math.max(1,Math.min(f.state.doc.lines,s+1)),p=f.state.doc.line(h),m=f.lineBlockAt(p.from),b=m.top+m.height*(c%1);n.scrollTo({top:b,behavior:"instant"})}function mf(e,n=0){const t=C.MarkEdit.editorView,r=t.lineBlockAtHeight(e.scrollTop+n),o=t.state.doc.lineAt(r.from).number-1,u=r.height>0?at((e.scrollTop-r.top)/r.height):0;return{line:o,progress:u}}function bf(e,n,t,r=!0){if(n===0&&t===0)return In(e,0,r);const o=Array.from(document.querySelectorAll("[data-line-from]")),u=gf(o,n);if(u!==void 0){const{from:c,to:l}=qe(u);return Fn(e,u,yf(n,t,c,l),r)}if(n===0)return In(e,0,r);const{beforeBlock:a,afterBlock:i}=kf(o,n);if(a!==void 0&&i!==void 0){const c=qe(a),l=qe(i),d=Rn(e,a)+a.offsetHeight,s=Rn(e,i),f=l.from-c.to,h=n-c.to+t,p=f>0?at(h/f):0;return In(e,d+(s-d)*p,r)}if(a!==void 0)return Fn(e,a,1,r);if(i!==void 0)return Fn(e,i,0,r)}function gf(e,n){let t=0,r=e.length-1;for(;t<=r;){const o=t+r>>>1,{from:u,to:a}=qe(e[o]);if(n<u)r=o-1;else if(n>a)t=o+1;else return e[o]}}function kf(e,n){let t,r;for(const o of e){const{from:u,to:a}=qe(o);if(a<n)t=o;else if(u>n){r=o;break}}return{beforeBlock:t,afterBlock:r}}function yf(e,n,t,r){const o=r-t;return o<1?e===t?n:0:at((e-t+n)/o)}function at(e){return Math.max(0,Math.min(1,e))}function xf(e){const n=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return n===null?null:{offset:n[1].length,replacement:n[2]===" "?"x":" "}}function vf(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}function Zt(e,n){return Array(n+1).join(e)}function ui(e){return e.replace(/^\n*/,"")}function ii(e){for(var n=e.length;n>0&&e[n-1]===`
`;)n--;return e.substring(0,n)}function ai(e){return ii(ui(e))}var wf=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function xr(e){return vr(e,wf)}var ci=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function si(e){return vr(e,ci)}function Cf(e){return di(e,ci)}var li=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function Ef(e){return vr(e,li)}function _f(e){return di(e,li)}function vr(e,n){return n.indexOf(e.nodeName)>=0}function di(e,n){return e.getElementsByTagName&&n.some(function(t){return e.getElementsByTagName(t).length})}var Af=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function fi(e){return Af.reduce(function(n,t){return n.replace(t[0],t[1])},e)}var V={};V.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};V.lineBreak={filter:"br",replacement:function(e,n,t){return t.br+`
`}};V.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,n,t){var r=Number(n.nodeName.charAt(1));if(t.headingStyle==="setext"&&r<3){var o=Zt(r===1?"=":"-",e.length);return`

`+e+`
`+o+`

`}else return`

`+Zt("#",r)+" "+e+`

`}};V.blockquote={filter:"blockquote",replacement:function(e){return e=ai(e).replace(/^/gm,"> "),`

`+e+`

`}};V.list={filter:["ul","ol"],replacement:function(e,n){var t=n.parentNode;return t.nodeName==="LI"&&t.lastElementChild===n?`
`+e:`

`+e+`

`}};V.listItem={filter:"li",replacement:function(e,n,t){var r=t.bulletListMarker+"   ",o=n.parentNode;if(o.nodeName==="OL"){var u=o.getAttribute("start"),a=Array.prototype.indexOf.call(o.children,n);r=(u?Number(u)+a:a+1)+".  "}var i=/\n$/.test(e);return e=ai(e)+(i?`
`:""),e=e.replace(/\n/gm,`
`+" ".repeat(r.length)),r+e+(n.nextSibling?`
`:"")}};V.indentedCodeBlock={filter:function(e,n){return n.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,n,t){return`

    `+n.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};V.fencedCodeBlock={filter:function(e,n){return n.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,n,t){for(var r=n.firstChild.getAttribute("class")||"",o=(r.match(/language-(\S+)/)||[null,""])[1],u=n.firstChild.textContent,a=t.fence.charAt(0),i=3,c=new RegExp("^"+a+"{3,}","gm"),l;l=c.exec(u);)l[0].length>=i&&(i=l[0].length+1);var d=Zt(a,i);return`

`+d+o+`
`+u.replace(/\n$/,"")+`
`+d+`

`}};V.horizontalRule={filter:"hr",replacement:function(e,n,t){return`

`+t.hr+`

`}};V.inlineLink={filter:function(e,n){return n.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,n){var t=wr(n.getAttribute("href")),r=Cr(Un(n.getAttribute("title"))),o=r?' "'+r+'"':"";return"["+e+"]("+t+o+")"}};V.referenceLink={filter:function(e,n){return n.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,n,t){var r=wr(n.getAttribute("href")),o=Un(n.getAttribute("title"));o&&(o=' "'+Cr(o)+'"');var u,a;switch(t.linkReferenceStyle){case"collapsed":u="["+e+"][]",a="["+e+"]: "+r+o;break;case"shortcut":u="["+e+"]",a="["+e+"]: "+r+o;break;default:var i=this.references.length+1;u="["+e+"]["+i+"]",a="["+i+"]: "+r+o}return this.references.push(a),u},references:[],append:function(e){var n="";return this.references.length&&(n=`

`+this.references.join(`
`)+`

`,this.references=[]),n}};V.emphasis={filter:["em","i"],replacement:function(e,n,t){return e.trim()?t.emDelimiter+e+t.emDelimiter:""}};V.strong={filter:["strong","b"],replacement:function(e,n,t){return e.trim()?t.strongDelimiter+e+t.strongDelimiter:""}};V.code={filter:function(e){var n=e.previousSibling||e.nextSibling,t=e.parentNode.nodeName==="PRE"&&!n;return e.nodeName==="CODE"&&!t},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var n=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",t="`",r=e.match(/`+/gm)||[];r.indexOf(t)!==-1;)t=t+"`";return t+n+e+n+t}};V.image={filter:"img",replacement:function(e,n){var t=fi(Un(n.getAttribute("alt"))),r=wr(n.getAttribute("src")||""),o=Un(n.getAttribute("title")),u=o?' "'+Cr(o)+'"':"";return r?"!["+t+"]("+r+u+")":""}};function Un(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}function wr(e){var n=e.replace(/([<>()])/g,"\\$1");return n.indexOf(" ")>=0?"<"+n+">":n}function Cr(e){return e.replace(/"/g,'\\"')}function hi(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var n in e.rules)this.array.push(e.rules[n])}hi.prototype={add:function(e,n){this.array.unshift(n)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var n;return(n=Dt(this.array,e,this.options))||(n=Dt(this._keep,e,this.options))||(n=Dt(this._remove,e,this.options))?n:this.defaultRule},forEach:function(e){for(var n=0;n<this.array.length;n++)e(this.array[n],n)}};function Dt(e,n,t){for(var r=0;r<e.length;r++){var o=e[r];if(Sf(o,n,t))return o}}function Sf(e,n,t){var r=e.filter;if(typeof r=="string"){if(r===n.nodeName.toLowerCase())return!0}else if(Array.isArray(r)){if(r.indexOf(n.nodeName.toLowerCase())>-1)return!0}else if(typeof r=="function"){if(r.call(e,n,t))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function Tf(e){var n=e.element,t=e.isBlock,r=e.isVoid,o=e.isPre||function(s){return s.nodeName==="PRE"};if(!(!n.firstChild||o(n))){for(var u=null,a=!1,i=null,c=Ao(i,n,o);c!==n;){if(c.nodeType===3||c.nodeType===4){var l=c.data.replace(/[ \r\n\t]+/g," ");if((!u||/ $/.test(u.data))&&!a&&l[0]===" "&&(l=l.substr(1)),!l){c=Mt(c);continue}c.data=l,u=c}else if(c.nodeType===1)t(c)||c.nodeName==="BR"?(u&&(u.data=u.data.replace(/ $/,"")),u=null,a=!1):r(c)||o(c)?(u=null,a=!0):u&&(a=!1);else{c=Mt(c);continue}var d=Ao(i,c,o);i=c,c=d}u&&(u.data=u.data.replace(/ $/,""),u.data||Mt(u))}}function Mt(e){var n=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),n}function Ao(e,n,t){return e&&e.parentNode===n||t(n)?n.nextSibling||n.parentNode:n.firstChild||n.nextSibling||n.parentNode}var Er=typeof window<"u"?window:{};function Df(){var e=Er.DOMParser,n=!1;try{new e().parseFromString("","text/html")&&(n=!0)}catch{}return n}function Mf(){var e=function(){};return Ff()?e.prototype.parseFromString=function(n){var t=new window.ActiveXObject("htmlfile");return t.designMode="on",t.open(),t.write(n),t.close(),t}:e.prototype.parseFromString=function(n){var t=document.implementation.createHTMLDocument("");return t.open(),t.write(n),t.close(),t},e}function Ff(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch{Er.ActiveXObject&&(e=!0)}return e}var If=Df()?Er.DOMParser:Mf();function Lf(e,n){var t;if(typeof e=="string"){var r=Nf().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");t=r.getElementById("turndown-root")}else t=e.cloneNode(!0);return Tf({element:t,isBlock:xr,isVoid:si,isPre:n.preformattedCode?Rf:null}),t}var Ft;function Nf(){return Ft=Ft||new If,Ft}function Rf(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}function Of(e,n){return e.isBlock=xr(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=Bf(e),e.flankingWhitespace=Pf(e,n),e}function Bf(e){return!si(e)&&!Ef(e)&&/^\s*$/i.test(e.textContent)&&!Cf(e)&&!_f(e)}function Pf(e,n){if(e.isBlock||n.preformattedCode&&e.isCode)return{leading:"",trailing:""};var t=zf(e.textContent);return t.leadingAscii&&So("left",e,n)&&(t.leading=t.leadingNonAscii),t.trailingAscii&&So("right",e,n)&&(t.trailing=t.trailingNonAscii),{leading:t.leading,trailing:t.trailing}}function zf(e){var n=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:n[1],leadingAscii:n[2],leadingNonAscii:n[3],trailing:n[4],trailingNonAscii:n[5],trailingAscii:n[6]}}function So(e,n,t){var r,o,u;return e==="left"?(r=n.previousSibling,o=/ $/):(r=n.nextSibling,o=/^ /),r&&(r.nodeType===3?u=o.test(r.nodeValue):t.preformattedCode&&r.nodeName==="CODE"?u=!1:r.nodeType===1&&!xr(r)&&(u=o.test(r.textContent))),u}var Hf=Array.prototype.reduce;function Gn(e){if(!(this instanceof Gn))return new Gn(e);var n={rules:V,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(t,r){return r.isBlock?`

`:""},keepReplacement:function(t,r){return r.isBlock?`

`+r.outerHTML+`

`:r.outerHTML},defaultReplacement:function(t,r){return r.isBlock?`

`+t+`

`:t}};this.options=vf({},n,e),this.rules=new hi(this.options)}Gn.prototype={turndown:function(e){if(!jf(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var n=pi.call(this,new Lf(e,this.options));return qf.call(this,n)},use:function(e){if(Array.isArray(e))for(var n=0;n<e.length;n++)this.use(e[n]);else if(typeof e=="function")e(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,n){return this.rules.add(e,n),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return fi(e)}};function pi(e){var n=this;return Hf.call(e.childNodes,function(t,r){r=new Of(r,n.options);var o="";return r.nodeType===3?o=r.isCode?r.nodeValue:n.escape(r.nodeValue):r.nodeType===1&&(o=$f.call(n,r)),mi(t,o)},"")}function qf(e){var n=this;return this.rules.forEach(function(t){typeof t.append=="function"&&(e=mi(e,t.append(n.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function $f(e){var n=this.rules.forNode(e),t=pi.call(this,e),r=e.flankingWhitespace;return(r.leading||r.trailing)&&(t=t.trim()),r.leading+n.replacement(t,e,this.options)+r.trailing}function mi(e,n){var t=ii(e),r=ui(n),o=Math.max(e.length-t.length,n.length-r.length),u=`

`.substring(0,o);return t+u+r}function jf(e){return e!=null&&(typeof e=="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}var To=/highlight-(?:text|source)-([a-z0-9]+)/;function Uf(e){e.addRule("highlightedCodeBlock",{filter:function(n){var t=n.firstChild;return n.nodeName==="DIV"&&To.test(n.className)&&t&&t.nodeName==="PRE"},replacement:function(n,t,r){var o=t.className||"",u=(o.match(To)||[null,""])[1];return`

`+r.fence+u+`
`+t.firstChild.textContent+`
`+r.fence+`

`}})}function Gf(e){e.addRule("strikethrough",{filter:["del","s","strike"],replacement:function(n){return"~"+n+"~"}})}var Vf=Array.prototype.indexOf,Wf=Array.prototype.every,Xe={};Xe.tableCell={filter:["th","td"],replacement:function(e,n){return bi(e,n)}};Xe.tableRow={filter:"tr",replacement:function(e,n){var t="",r={left:":--",right:"--:",center:":-:"};if(_r(n))for(var o=0;o<n.childNodes.length;o++){var u="---",a=(n.childNodes[o].getAttribute("align")||"").toLowerCase();a&&(u=r[a]||u),t+=bi(u,n.childNodes[o])}return`
`+e+(t?`
`+t:"")}};Xe.table={filter:function(e){return e.nodeName==="TABLE"&&_r(e.rows[0])},replacement:function(e){return e=e.replace(`

`,`
`),`

`+e+`

`}};Xe.tableSection={filter:["thead","tbody","tfoot"],replacement:function(e){return e}};function _r(e){var n=e.parentNode;return n.nodeName==="THEAD"||n.firstChild===e&&(n.nodeName==="TABLE"||Kf(n))&&Wf.call(e.childNodes,function(t){return t.nodeName==="TH"})}function Kf(e){var n=e.previousSibling;return e.nodeName==="TBODY"&&(!n||n.nodeName==="THEAD"&&/^\s*$/i.test(n.textContent))}function bi(e,n){var t=Vf.call(n.parentNode.childNodes,n),r=" ";return t===0&&(r="| "),r+e+" |"}function Zf(e){e.keep(function(t){return t.nodeName==="TABLE"&&!_r(t.rows[0])});for(var n in Xe)e.addRule(n,Xe[n])}function Yf(e){e.addRule("taskListItems",{filter:function(n){return n.type==="checkbox"&&n.parentNode.nodeName==="LI"},replacement:function(n,t){return(t.checked?"[x]":"[ ]")+" "}})}function Qf(e){e.use([Uf,Gf,Zf,Yf])}const ct=[{id:"h1",label:"H1",title:"Heading 1",shortcut:{domKey:"1",cmKey:"Mod-1",display:"⌘1"}},{id:"h2",label:"H2",title:"Heading 2",shortcut:{domKey:"2",cmKey:"Mod-2",display:"⌘2"}},{id:"h3",label:"H3",title:"Heading 3",shortcut:{domKey:"3",cmKey:"Mod-3",display:"⌘3"}},{id:"sep1",label:"",title:"",isSep:!0},{id:"bold",label:"<b>B</b>",title:"Bold",shortcut:{domKey:"b",cmKey:"Mod-b",display:"⌘B"}},{id:"italic",label:"<i>I</i>",title:"Italic",shortcut:{domKey:"i",cmKey:"Mod-i",display:"⌘I"}},{id:"strike",label:"<s>S</s>",title:"Strikethrough",shortcut:{domKey:"x",cmKey:"Mod-Shift-x",shift:!0,display:"⇧⌘X"}},{id:"code",label:"&#x60;&#x60;",title:"Inline code",shortcut:{domKey:"e",cmKey:"Mod-e",display:"⌘E"}},{id:"codeblock",label:"&#x60;&#x60;&#x60;",title:"Code block",shortcut:{domKey:"c",cmKey:"Mod-Alt-c",alt:!0,display:"⌥⌘C"}},{id:"sep2",label:"",title:"",isSep:!0},{id:"blockquote",label:"&#8220;",title:"Blockquote",shortcut:{domKey:".",cmKey:"Mod-Shift-.",shift:!0,display:"⇧⌘."}},{id:"ul",label:"&bull;",title:"Unordered list",shortcut:{domKey:"8",cmKey:"Mod-Shift-8",shift:!0,display:"⇧⌘8"}},{id:"ol",label:"1.",title:"Ordered list",shortcut:{domKey:"7",cmKey:"Mod-Shift-7",shift:!0,display:"⇧⌘7"}},{id:"sep3",label:"",title:"",isSep:!0},{id:"link",label:"&#128279;",title:"Insert link",shortcut:{domKey:"k",cmKey:"Mod-k",display:"⌘K"}},{id:"image",label:"&#128247;",title:"Insert image",shortcut:{domKey:"k",cmKey:"Mod-Shift-k",shift:!0,display:"⇧⌘K"}},{id:"hr",label:"&#8212;",title:"Horizontal rule",shortcut:{domKey:"-",cmKey:"Mod-Shift--",shift:!0,display:"⇧⌘−"}},{id:"sep4",label:"",title:"",isSep:!0},{id:"alert",label:"&#9888;",title:"Alert / callout (always inserts a NOTE — edit the word to change type)",shortcut:{domKey:"a",cmKey:"Mod-Alt-a",alt:!0,display:"⌥⌘A"}},{id:"footnote",label:"[^]",title:"Insert footnote",shortcut:{domKey:"f",cmKey:"Mod-Alt-f",alt:!0,display:"⌥⌘F"}},{id:"sep5",label:"",title:"",isSep:!0},{id:"math",label:"&#8721;x",title:"Insert math (KaTeX)"},{id:"mermaid",label:"&#9096;",title:"Insert diagram (Mermaid)"}];function Jf(e,n){return(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===n.domKey&&e.shiftKey===(n.shift??!1)&&e.altKey===(n.alt??!1)}let It;function gi(e,n){return It?.finish(void 0),new Promise(t=>{let r=!1;const o=document.createElement("div");o.className="formatting-picker-popover",o.setAttribute("role","dialog");const u=e.getBoundingClientRect();o.style.position="fixed",o.style.top=`${u.bottom+6}px`,o.style.left=`${u.left}px`;function a(d){r||(r=!0,It=void 0,o.remove(),document.removeEventListener("keydown",i,!0),document.removeEventListener("mousedown",c,!0),t(d))}function i(d){d.key==="Escape"&&(d.preventDefault(),a(void 0))}function c(d){o.contains(d.target)||a(void 0)}It={finish:a},n(o,a,()=>a(void 0)),document.body.appendChild(o);const l=o.getBoundingClientRect();l.right>window.innerWidth&&(o.style.left=`${Math.max(0,window.innerWidth-l.width-8)}px`),l.bottom>window.innerHeight&&(o.style.top=`${Math.max(0,u.top-l.height-6)}px`),document.addEventListener("keydown",i,!0),requestAnimationFrame(()=>document.addEventListener("mousedown",c,!0))})}function Xf(e,n){const t=document.createElement("div");t.className=e,t.setAttribute("role","toolbar"),t.setAttribute("aria-label","Formatting toolbar");for(const r of ct){if(r.isSep===!0){const a=document.createElement("span");a.className="wysiwyg-sep",a.setAttribute("aria-hidden","true"),t.appendChild(a);continue}const o=n[r.id];if(o===void 0)continue;const u=document.createElement("button");u.className="wysiwyg-btn",u.dataset.id=r.id,u.title=r.shortcut!==void 0?`${r.title} (${r.shortcut.display})`:r.title,u.innerHTML=r.label,u.type="button",u.addEventListener("mousedown",a=>{a.preventDefault(),o()}),t.appendChild(u)}return t}function ki(e){return document.querySelector(`.unified-toolbar [data-id="${e}"]`)}const eh=["NOTE","TIP","IMPORTANT","WARNING","CAUTION"],nh={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'};function th(e){return e.charAt(0)+e.slice(1).toLowerCase()}async function yi(){const e=ki("alert")??document.body;return gi(e,(n,t,r)=>{n.classList.add("alert-picker-popover");for(const u of eh){const a=u.toLowerCase(),i=document.createElement("button");i.type="button",i.className="alert-picker-option",i.innerHTML=`
        <div class="markdown-alert markdown-alert-${a} alert-picker-preview">
          <p class="markdown-alert-title">${nh[a]}${th(u)}</p>
        </div>
      `,i.addEventListener("mousedown",c=>{c.preventDefault(),t(u)}),n.appendChild(i)}const o=document.createElement("button");o.type="button",o.className="alert-picker-cancel",o.textContent="Cancel",o.addEventListener("mousedown",u=>{u.preventDefault(),r()}),n.appendChild(o)})}async function xi(e,n){const t=ki(e)??document.body;return gi(t,(r,o,u)=>{r.classList.add("menu-picker-popover");for(const i of n){const c=document.createElement("button");c.type="button",c.className="menu-picker-option",c.dataset.id=i.id;const l=document.createElement("span");if(l.className="menu-picker-label",l.textContent=i.label,c.appendChild(l),i.hint!==void 0){const d=document.createElement("span");d.className="menu-picker-hint",d.textContent=i.hint,c.appendChild(d)}c.addEventListener("mousedown",d=>{d.preventDefault(),o(i.id)}),r.appendChild(c)}const a=document.createElement("button");a.type="button",a.className="menu-picker-cancel",a.textContent="Cancel",a.addEventListener("mousedown",i=>{i.preventDefault(),u()}),r.appendChild(a)})}const Do=[{id:"inline",label:"Inline math",latex:"a^2 + b^2 = c^2",display:!1},{id:"display",label:"Display math",latex:"a^2 + b^2 = c^2",display:!0},{id:"fraction",label:"Fraction",latex:"\\frac{a}{b}",display:!0},{id:"sqrt",label:"Square root",latex:"\\sqrt{x}",display:!0},{id:"sum",label:"Summation",latex:"\\sum_{i=1}^{n} i",display:!0},{id:"integral",label:"Integral",latex:"\\int_{a}^{b} f(x)\\,dx",display:!0},{id:"matrix",label:"Matrix",latex:"\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",display:!0}],Mo=[{id:"flowchart",label:"Flowchart",code:["graph TD","  A[Start] --> B{Decision}","  B -->|Yes| C[OK]","  B -->|No| D[Stop]"].join(`
`)},{id:"sequence",label:"Sequence",code:["sequenceDiagram","  Alice->>Bob: Hello Bob","  Bob-->>Alice: Hi Alice"].join(`
`)},{id:"class",label:"Class",code:["classDiagram","  class Animal {","    +String name","    +eat()","  }","  Animal <|-- Dog"].join(`
`)},{id:"state",label:"State",code:["stateDiagram-v2","  [*] --> Idle","  Idle --> Running: start","  Running --> [*]: stop"].join(`
`)},{id:"er",label:"Entity relationship",code:["erDiagram","  CUSTOMER ||--o{ ORDER : places","  ORDER ||--|{ LINE_ITEM : contains"].join(`
`)},{id:"gantt",label:"Gantt",code:["gantt","  title Project","  dateFormat YYYY-MM-DD","  section Phase","  Task A :a1, 2026-01-01, 7d"].join(`
`)},{id:"pie",label:"Pie chart",code:["pie title Share",'  "A" : 40','  "B" : 35','  "C" : 25'].join(`
`)}];function vi(e,n){return n?`$$${e}$$`:`$${e}$`}async function wi(){const e=Do.map(t=>({id:t.id,label:t.label,hint:vi(t.latex,t.display)})),n=await xi("math",e);if(n!==void 0)return Do.find(t=>t.id===n)}async function Ci(){const e=Mo.map(t=>({id:t.id,label:t.label})),n=await xi("mermaid",e);if(n!==void 0)return Mo.find(t=>t.id===n)}function He(e,n,t=n){return e.changeByRange(r=>{const{from:o,to:u}=r,a=e.doc,i=a.sliceString(Math.max(0,o-n.length),o),c=a.sliceString(u,Math.min(a.length,u+t.length));return i===n&&c===t?{changes:[{from:o-n.length,to:o,insert:""},{from:u,to:u+t.length,insert:""}],range:M.EditorSelection.range(o-n.length,u-n.length)}:{changes:[{from:o,to:o,insert:n},{from:u,to:u,insert:t}],range:o===u?M.EditorSelection.cursor(o+n.length):M.EditorSelection.range(o+n.length,u+n.length)}})}function Lt(e,n){const t="#".repeat(n)+" ";return e.changeByRange(r=>{const o=e.doc.lineAt(r.head),u=o.text.startsWith(t),a=o.text.replace(/^#{1,6}\s+/,""),i=u?a:t+a;return{changes:{from:o.from,to:o.to,insert:i},range:M.EditorSelection.cursor(o.from+i.length)}})}function rh(e){return e.changeByRange(n=>{const{from:t,to:r}=n,o=e.doc.sliceString(t,r)||"code block",u="```\n";return{changes:{from:t,to:r,insert:u+o+"\n```"},range:M.EditorSelection.range(t+u.length,t+u.length+o.length)}})}function oh(e,n="NOTE"){return e.changeByRange(t=>{const r=e.doc,o=r.lineAt(t.from),u=r.lineAt(t.to),a=[];for(let d=o.number;d<=u.number;d++)a.push(r.line(d));const i=a.filter(d=>d.text.trim()!==""),c=i.length>0?i.map(d=>`> ${d.text}`).join(`
`):"> ",l=`> [!${n}]
${c}`;return{changes:{from:o.from,to:u.to,insert:l},range:M.EditorSelection.cursor(o.from+l.length)}})}function Ei(e){const n=new Set;for(const r of e.matchAll(/\[\^(\d+)\]/g))n.add(Number(r[1]));let t=1;for(;n.has(t);)t++;return t}function uh(e){let n=Ei(e.doc.toString());const t=e.doc.length,r=t>0?e.doc.sliceString(t-1,t):"",o=r!==""&&r!==`
`;return e.changeByRange(u=>{const a=n++,i=`[^${a}]`,c=`${o?`

`:""}[^${a}]: `;return{changes:[{from:u.from,to:u.to,insert:i},{from:t,to:t,insert:c}],range:M.EditorSelection.cursor(u.from+i.length)}})}function ih(e,n,t){return e.changeByRange(r=>{const{from:o,to:u}=r,a=e.doc.sliceString(o,u)||n;if(!t){const f=`$${a}$`;return{changes:{from:o,to:u,insert:f},range:M.EditorSelection.range(o+1,o+1+a.length)}}const i=e.doc.lineAt(o),l=i.text.slice(0,o-i.from).trim()!==""?`

`:"",d=`${l}$$
${a}
$$
`,s=o+l.length+3;return{changes:{from:o,to:u,insert:d},range:M.EditorSelection.range(s,s+a.length)}})}function ah(e,n){return e.changeByRange(t=>{const{from:r,to:o}=t,u=e.doc.sliceString(r,o)||n,a=e.doc.lineAt(r),c=a.text.slice(0,r-a.from).trim()!==""?`

`:"",l=`${c}\`\`\`mermaid
${u}
\`\`\`
`,d=r+c.length+11;return{changes:{from:r,to:o,insert:l},range:M.EditorSelection.range(d,d+u.length)}})}function ch(e){return e.changeByRange(n=>{const{from:t,to:r}=n,a=(e.doc.lineAt(t).text.trim()!==""?`

`:"")+`---

`;return{changes:{from:t,to:r,insert:a},range:M.EditorSelection.cursor(t+a.length)}})}function sh(e){return Ar(e,()=>"> ",/^>\s?/)}function lh(e){return Ar(e,()=>"- ",/^[-*+]\s+/)}function dh(e){return Ar(e,n=>`${n+1}. `,/^\d+[.)]\s+/)}function Ar(e,n,t){return e.changeByRange(r=>{const o=e.doc,u=o.lineAt(r.from),a=o.lineAt(r.to),i=[];for(let f=u.number;f<=a.number;f++)i.push(o.line(f));const c=i.filter(f=>f.text.trim()!==""),l=c.length>0&&c.every(f=>t.test(f.text)),d=c.map((f,h)=>{const p=f.text.replace(t,""),m=l?p:n(h)+p;return{from:f.from,to:f.to,insert:m}}),s=d.reduce((f,h)=>f+(h.insert.length-(h.to-h.from)),0);return{changes:d,range:M.EditorSelection.range(u.from,a.to+s)}})}let Ve;const _i={h1:()=>Tn("h1"),h2:()=>Tn("h2"),h3:()=>Tn("h3"),bold:()=>Ae("bold"),italic:()=>Ae("italic"),strike:()=>Ae("strikeThrough"),code:ph,codeblock:mh,blockquote:()=>Tn("blockquote"),ul:()=>Ae("insertUnorderedList"),ol:()=>Ae("insertOrderedList"),link:()=>{bh()},image:()=>{gh()},hr:()=>Ae("insertHorizontalRule"),alert:()=>{kh()},footnote:vh,math:()=>{yh()},mermaid:()=>{xh()}};function fh(e){Ve===void 0&&(Ve=n=>{const t=ct.find(o=>o.shortcut!==void 0&&Jf(n,o.shortcut));if(t===void 0)return;const r=_i[t.id];r!==void 0&&(n.preventDefault(),r())},e.addEventListener("keydown",Ve))}function hh(e){Ve!==void 0&&(e.removeEventListener("keydown",Ve),Ve=void 0)}function Ae(e,n){document.execCommand(e,!1,n),pe()}function Tn(e){document.execCommand("formatBlock",!1,e),pe()}function pe(){document.querySelector(".markdown-body")?.dispatchEvent(new Event("input",{bubbles:!0}))}function Vn(e){const n=document.createElement("span");return n.className="raw-markdown",n.textContent=e,n}function ph(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0),t=document.createElement("code");t.textContent=n.toString()||"code",n.deleteContents(),n.insertNode(t),n.setStartAfter(t),n.collapse(!0),e.removeAllRanges(),e.addRange(n),pe()}function mh(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0),t=document.createElement("pre"),r=document.createElement("code");r.textContent=n.toString()||"code block",t.appendChild(r),n.deleteContents(),n.insertNode(t),n.setStartAfter(t),n.collapse(!0),e.removeAllRanges(),e.addRange(n),pe()}async function bh(){const e=await C.MarkEdit.showTextBox({title:"Insert Link",placeholder:"https://example.com"});e===void 0||e.trim()===""||Ae("createLink",e.trim())}async function gh(){const e=await C.MarkEdit.showTextBox({title:"Insert Image",placeholder:"https://example.com/image.png"});if(e===void 0||e.trim()==="")return;const n=window.getSelection();if(n===null||n.rangeCount===0)return;const t=n.getRangeAt(0),r=document.createElement("img");r.src=e.trim(),r.alt=t.toString()||"image",t.deleteContents(),t.insertNode(r),t.setStartAfter(r),t.collapse(!0),n.removeAllRanges(),n.addRange(t),pe()}async function kh(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0).cloneRange(),t=await yi();if(t===void 0)return;const r=n.toString()||"Useful information.",o=document.createElement("blockquote");o.appendChild(Vn(`[!${t}]`)),o.appendChild(document.createElement("br")),o.appendChild(document.createTextNode(r)),n.deleteContents(),n.insertNode(o),n.setStartAfter(o),n.collapse(!0),e.removeAllRanges(),e.addRange(n),pe()}async function yh(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0).cloneRange(),t=await wi();if(t===void 0)return;const r=n.toString()||t.latex,o=Vn(vi(r,t.display));n.deleteContents(),n.insertNode(o),n.setStartAfter(o),n.collapse(!0),e.removeAllRanges(),e.addRange(n),pe()}async function xh(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0).cloneRange(),t=await Ci();if(t===void 0)return;const r=document.createElement("pre"),o=document.createElement("code");o.className="language-mermaid",o.textContent=n.toString()||t.code,r.appendChild(o),n.deleteContents(),n.insertNode(r),n.setStartAfter(r),n.collapse(!0),e.removeAllRanges(),e.addRange(n),pe()}function vh(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=document.querySelector(".markdown-body");if(n===null)return;const t=Ei(C.MarkEdit.editorAPI.getText()),r=e.getRangeAt(0);r.deleteContents();const o=Vn(`[^${t}]`);r.insertNode(o);const u=document.createElement("p");u.appendChild(Vn(`[^${t}]: `)),n.appendChild(u);const a=document.createRange();a.setStartAfter(o),a.collapse(!0),e.removeAllRanges(),e.addRange(a),pe()}const Sr=new M.Compartment;function B(e,n){e.dispatch(n),e.focus()}function Ai(e){return{h1:()=>B(e,Lt(e.state,1)),h2:()=>B(e,Lt(e.state,2)),h3:()=>B(e,Lt(e.state,3)),bold:()=>B(e,He(e.state,"**")),italic:()=>B(e,He(e.state,"*")),strike:()=>B(e,He(e.state,"~~")),code:()=>B(e,He(e.state,"`")),codeblock:()=>B(e,rh(e.state)),blockquote:()=>B(e,sh(e.state)),ul:()=>B(e,lh(e.state)),ol:()=>B(e,dh(e.state)),link:()=>{Eh(e)},image:()=>{_h(e)},hr:()=>B(e,ch(e.state)),alert:()=>{Ah(e)},footnote:()=>B(e,uh(e.state)),math:()=>{wh(e)},mermaid:()=>{Ch(e)}}}async function wh(e){const n=await wi();n!==void 0&&B(e,ih(e.state,n.latex,n.display))}async function Ch(e){const n=await Ci();n!==void 0&&B(e,ah(e.state,n.code))}async function Eh(e){const n=await C.MarkEdit.showTextBox({title:"Insert Link",placeholder:"https://example.com"});n===void 0||n.trim()===""||B(e,He(e.state,"[",`](${n.trim()})`))}async function _h(e){const n=await C.MarkEdit.showTextBox({title:"Insert Image",placeholder:"https://example.com/image.png"});n===void 0||n.trim()===""||B(e,He(e.state,"![",`](${n.trim()})`))}async function Ah(e){const n=await yi();n!==void 0&&B(e,oh(e.state,n))}const Sh=M.Prec.highest(_.keymap.of((()=>{const e=[];for(const n of ct){if(n.shortcut===void 0)continue;const t=n.shortcut.cmKey;e.push({key:t,run:r=>(Ai(r)[n.id](),!0)})}return e})()));function Th(e){return()=>{const n=document.createElement("div");return n.style.height=`${e}px`,{top:!0,dom:n}}}function Dh(){return[Sr.of([]),Sh]}function Mh(e,n){e.dispatch({effects:Sr.reconfigure(_.showPanel.of(Th(n)))})}function Fh(e){e.dispatch({effects:Sr.reconfigure([])})}const Si="--markedit-toolbar-height",Ti="markedit-unified-toolbar-active";let Wn=null;function Ih(){return C.MarkEdit.editorView.hasFocus}function Lh(){const e={};for(const n of ct)n.isSep!==!0&&(e[n.id]=()=>{(Ih()?Ai(C.MarkEdit.editorView):_i)[n.id]?.()});return e}function Di(){return Wn??=Xf("unified-toolbar",Lh()),Wn}function Nh(){const e=Di();e.style.display="none",document.body.appendChild(e)}function Rh(){const e=Di();e.style.display="";const n=e.getBoundingClientRect().height;document.documentElement.style.setProperty(Si,`${n}px`),document.body.classList.add(Ti),Mh(C.MarkEdit.editorView,n)}function Oh(){Wn!==null&&(Wn.style.display="none"),document.body.classList.remove(Ti),document.documentElement.style.removeProperty(Si),Fh(C.MarkEdit.editorView)}const Tr=new Gn({headingStyle:"atx",bulletListMarker:"-",codeBlockStyle:"fenced",fence:"```",emDelimiter:"*",strongDelimiter:"**",linkStyle:"inlined"});Tr.use(Qf);Tr.addRule("rawMarkdown",{filter:e=>e.nodeName==="SPAN"&&e.classList.contains("raw-markdown"),replacement:(e,n)=>n.textContent??""});let kn=!1,Se;function Dr(){return kn}function Mi(){if(kn)return;kn=!0;const e=ve();e.contentEditable="true",e.spellcheck=!0,e.classList.add("wysiwyg-active"),e.addEventListener("input",Fi),fh(e),Rh(),yr(),e.focus()}function Bh(){if(!kn)return;kn=!1,Se!==void 0&&(clearTimeout(Se),Se=void 0),Yt(!1);const e=ve();e.contentEditable="false",e.classList.remove("wysiwyg-active"),e.removeEventListener("input",Fi),hh(e),Oh(),yr(),yn()}function Fi(){Se!==void 0&&clearTimeout(Se),Yt(!0),Se=setTimeout(()=>{Yt(!1),Se=void 0},600),C.MarkEdit.editorAPI.setText(Ph())}function Ph(){const n=ve().cloneNode(!0);return n.querySelectorAll("[data-line-from],[data-line-to]").forEach(t=>{t.removeAttribute("data-line-from"),t.removeAttribute("data-line-to")}),Tr.turndown(n.innerHTML)}function zh(e,n){const r=(n.target instanceof Element?n.target.closest("a"):null)?.getAttribute("href")??"";if(!r.startsWith("#"))return!1;const o=Hh(e,r);return o&&n.preventDefault(),o}function Hh(e,n){if(!n.startsWith("#"))return!1;const t=qh(n.substring(1)),r=[...e.querySelectorAll("[id]")].find(o=>o.id===t);return r===void 0?!1:(Fn(e,r,0,!1),!0)}function qh(e){try{return decodeURIComponent(e)}catch{return e}}const cn={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body"},st={viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"},Ii=new M.Compartment,$h=Ii.of([]);let Fo=0;async function Li(e,n){const t=++Fo,r=n?await Uh():[];t===Fo&&(e.dispatch({effects:Ii.reconfigure(r)}),n&&e.requestMeasure())}let jh;function Uh(){return jh??=Promise.resolve().then(()=>tm).then(e=>e.hiddenSyntaxExtension)}var Nt=function(e,n){return Number(e.slice(0,-1*n.length))},Gh=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:Nt(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:Nt(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:Nt(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},Ni=function(e){return e.split(" ").map(Gh)},Vh=function(e,n,t,r){t===void 0&&(t=0),r===void 0&&(r=!1);var o=r?e+1:e,u=n.slice(0,o).reduce(function(i,c){return i+c.numeric},0),a=t?e*t:0;return u+a},Ri=function(e,n,t){return n.concat(t).map(function(r){return r.style[e]}).filter(function(r){return r!==void 0&&r!==""})},Wh=function(e,n){return n.endsWith(e)?Number(n.slice(0,-1*e.length)):null},Io=function(e){for(var n=0;n<e.length;n++)if(e[n].numeric>0)return n;return null},Me=function(){return!1},Kh=function(e,n,t){e.style[n]=t},L=function(e,n,t){var r=e[n];return r!==void 0?r:t};function Oi(e){var n;return(n=[]).concat.apply(n,Array.from(e.ownerDocument.styleSheets).map(function(t){var r=[];try{r=Array.from(t.cssRules||[])}catch{}return r})).filter(function(t){var r=!1;try{r=e.matches(t.selectorText)}catch{}return r})}var Zh="grid-template-columns",Yh="grid-template-rows",H=function(n,t,r){this.direction=n,this.element=t.element,this.track=t.track,n==="column"?(this.gridTemplateProp=Zh,this.gridGapProp="grid-column-gap",this.cursor=L(r,"columnCursor",L(r,"cursor","col-resize")),this.snapOffset=L(r,"columnSnapOffset",L(r,"snapOffset",30)),this.dragInterval=L(r,"columnDragInterval",L(r,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=L(r,"gridTemplateColumns")):n==="row"&&(this.gridTemplateProp=Yh,this.gridGapProp="grid-row-gap",this.cursor=L(r,"rowCursor",L(r,"cursor","row-resize")),this.snapOffset=L(r,"rowSnapOffset",L(r,"snapOffset",30)),this.dragInterval=L(r,"rowDragInterval",L(r,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=L(r,"gridTemplateRows")),this.onDragStart=L(r,"onDragStart",Me),this.onDragEnd=L(r,"onDragEnd",Me),this.onDrag=L(r,"onDrag",Me),this.writeStyle=L(r,"writeStyle",Kh),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=t.minSizeStart,this.minSizeEnd=t.minSizeEnd,t.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};H.prototype.getDimensions=function(){var n=this.grid.getBoundingClientRect(),t=n.width,r=n.height,o=n.top,u=n.bottom,a=n.left,i=n.right;this.direction==="column"?(this.start=o,this.end=u,this.size=r):this.direction==="row"&&(this.start=a,this.end=i,this.size=t)};H.prototype.getSizeAtTrack=function(n,t){return Vh(n,this.computedPixels,this.computedGapPixels,t)};H.prototype.getSizeOfTrack=function(n){return this.computedPixels[n].numeric};H.prototype.getRawTracks=function(){var n=Ri(this.gridTemplateProp,[this.grid],Oi(this.grid));if(!n.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return n[0]};H.prototype.getGap=function(){var n=Ri(this.gridGapProp,[this.grid],Oi(this.grid));return n.length?n[0]:null};H.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};H.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};H.prototype.setTracks=function(n){this.tracks=n.split(" "),this.trackValues=Ni(n)};H.prototype.setComputedTracks=function(n){this.computedTracks=n.split(" "),this.computedPixels=Ni(n)};H.prototype.setGap=function(n){this.gap=n};H.prototype.setComputedGap=function(n){this.computedGap=n,this.computedGapPixels=Wh("px",this.computedGap)||0};H.prototype.getMousePosition=function(n){return"touches"in n?n.touches[0][this.clientAxis]:n[this.clientAxis]};H.prototype.startDragging=function(n){if(!("button"in n&&n.button!==0)){n.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=n.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var t=this.trackValues.filter(function(i){return i.type==="%"}),r=this.trackValues.filter(function(i){return i.type==="fr"});if(this.totalFrs=r.length,this.totalFrs){var o=Io(r);o!==null&&(this.frToPixels=this.computedPixels[o].numeric/r[o].numeric)}if(t.length){var u=Io(t);u!==null&&(this.percentageToPixels=this.computedPixels[u].numeric/t[u].numeric)}var a=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(n)-a,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",Me),this.grid.addEventListener("dragstart",Me),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};H.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};H.prototype.drag=function(n){var t=this.getMousePosition(n),r=this.getSizeOfTrack(this.track),o=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,u=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(r-this.dragStartOffset),a=o+this.snapOffset,i=u-this.snapOffset;t<a&&(t=o),t>i&&(t=u),t<o?t=o:t>u&&(t=u);var c=t-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,l=this.bTrackEnd-t+this.dragStartOffset-r-this.computedGapPixels;if(this.dragInterval>1){var d=Math.round(c/this.dragInterval)*this.dragInterval;l-=d-c,c=d}if(c<this.minSizeStart&&(c=this.minSizeStart),l<this.minSizeEnd&&(l=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=c+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var s=c/this.frToPixels;this.tracks[this.aTrack]=s+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var f=c/this.percentageToPixels;this.tracks[this.aTrack]=f+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=l+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var h=l/this.frToPixels;this.tracks[this.bTrack]=h+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var p=l/this.percentageToPixels;this.tracks[this.bTrack]=p+"%"}var m=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,m),this.onDrag(this.direction,this.track,m)};H.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",Me),this.grid.removeEventListener("dragstart",Me),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};H.prototype.destroy=function(n,t){n===void 0&&(n=!0),n||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),t&&t()):(this.needsDestroy=!0,t&&(this.destroyCb=t))};var Lo=function(e,n,t){return n in e?e[n]:t},en=function(e,n){return function(t){if(t.track<1)throw Error("Invalid track index: "+t.track+". Track must be between two other tracks.");var r=e==="column"?n.columnMinSizes||{}:n.rowMinSizes||{},o=e==="column"?"columnMinSize":"rowMinSize";return new H(e,Object.assign({},{minSizeStart:Lo(r,t.track-1,L(n,o,L(n,"minSize",0))),minSizeEnd:Lo(r,t.track+1,L(n,o,L(n,"minSize",0)))},t),n)}},Ne=function(n){var t=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:n.columnGutters||[],rowGutters:n.rowGutters||[],columnMinSizes:n.columnMinSizes||{},rowMinSizes:n.rowMinSizes||{}},n),this.options.columnGutters.forEach(function(r){t.columnGutters[r.track]=en("column",t.options)(r)}),this.options.rowGutters.forEach(function(r){t.rowGutters[r.track]=en("row",t.options)(r)})};Ne.prototype.addColumnGutter=function(n,t){this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=en("column",this.options)({element:n,track:t})};Ne.prototype.addRowGutter=function(n,t){this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=en("row",this.options)({element:n,track:t})};Ne.prototype.removeColumnGutter=function(n,t){var r=this;t===void 0&&(t=!0),this.columnGutters[n]&&this.columnGutters[n].destroy(t,function(){delete r.columnGutters[n]})};Ne.prototype.removeRowGutter=function(n,t){var r=this;t===void 0&&(t=!0),this.rowGutters[n]&&this.rowGutters[n].destroy(t,function(){delete r.rowGutters[n]})};Ne.prototype.handleDragStart=function(n,t,r){t==="column"?(this.columnGutters[r]&&this.columnGutters[r].destroy(),this.columnGutters[r]=en("column",this.options)({track:r}),this.columnGutters[r].startDragging(n)):t==="row"&&(this.rowGutters[r]&&this.rowGutters[r].destroy(),this.rowGutters[r]=en("row",this.options)({track:r}),this.rowGutters[r].startDragging(n))};Ne.prototype.destroy=function(n){var t=this;n===void 0&&(n=!0),Object.keys(this.columnGutters).forEach(function(r){return t.columnGutters[r].destroy(n,function(){delete t.columnGutters[r]})}),Object.keys(this.rowGutters).forEach(function(r){return t.rowGutters[r].destroy(n,function(){delete t.rowGutters[r]})})};function Qh(e){return new Ne(e)}const Jh=`body .markdown-body details summary,
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

.markdown-body a.suppress-underline {
  text-decoration: none !important;
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

.markdown-body.zoomed-in .mermaid {
  overflow-x: auto;
}

/* Clamped by mermaid's inline max-width, i.e. it ends up being the natural size */
.markdown-body.zoomed-in .mermaid > svg[style*="max-width"] {
  width: 10000px;
}

@media (prefers-color-scheme: dark) {
  .markdown-divider {
    background: #2a2a2a;
  }
}
`,Xh=`/* ── Unified Formatting Toolbar ──────────────────────────────────────────────
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
`,e1=`/* ── Picker popovers ──────────────────────────────────────────────────────────
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
`,Kn=document.body,sn=document.createElement("div"),N=document.createElement("div"),No=me("* { cursor: col-resize }",!1),Bi=M.Annotation.define();var Q=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e[e.syntaxHidden=3]="syntaxHidden",e))(Q||{});function n1(){me(Jh),me(Yu()),me(Qu()),me(Ju()),me(Xh),me(e1);const e=document.createElement("div");e.className=cn.dividerViewClass,sn.appendChild(e),sn.className=cn.gutterViewClass,Kn.appendChild(sn),N.className=cn.previewPaneClass,Kn.appendChild(N),document.addEventListener("keydown",r=>{if(!r.metaKey||r.key!=="a")return;const o=C.MarkEdit.editorView?.contentDOM??document.querySelector(".cm-content");(N.classList.contains("overlay")||document.activeElement!==o)&&(ta(N),r.preventDefault())}),new MutationObserver(Ro).observe(N,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{Ro(),document.querySelector(".mermaid")!==null&&yn()}),typeof C.MarkEdit.getFileInfo=="function"&&typeof C.MarkEdit.openFile=="function"&&N.addEventListener("click",f1),N.addEventListener("click",r=>{h1(r),p1(r)})}function _n(e,n=!0){const t=te();ye.viewMode=e,e!==t&&localStorage.setItem(st.viewModeCacheKey,String(e));const r=C.MarkEdit.editorView;Li(r,e===3),Mr()?r.focus():e===2&&r.contentDOM.blur(),e===1?(Kn.classList.add(cn.containerClass),ye.splitter??=Qh({columnGutters:[{track:1,element:sn}],minSize:150,onDragStart:()=>No.disabled=!1,onDragEnd:()=>No.disabled=!0})):(Kn.classList.remove(cn.containerClass),ye.splitter?.destroy(),ye.splitter=void 0),e===2?N.classList.add("overlay"):N.classList.remove("overlay"),n&&yn()}function t1(){const e=wd.map(u=>{switch(u){case"edit":return 0;case"side-by-side":return 1;case"preview":return 2;case"syntax-hidden":return 3;default:return}}).filter(u=>u!==void 0),t=e.some(u=>u===0||u===3)?e:[0,...e],r=t.indexOf(te()),o=r===-1?0:(r+1)%t.length;_n(t[o])}function r1(){const e=localStorage.getItem(st.viewModeCacheKey);if(e===null)return;const n=Number(e);if(te()===n){n===3&&Li(C.MarkEdit.editorView,!0);return}_n(n,!0)}function te(){return ye.viewMode}function Yt(e){ye.wysiwygEditLock=e}function o1(){return ye.wysiwygEditLock}function Mr(){const e=te();return e===0||e===3}async function yn(){if(ye.wysiwygEditLock||Mr())return;const e=Dr()?N.scrollTop:void 0,n=ti(await lt());N.innerHTML=n,yr(),requestAnimationFrame(()=>{oi(N),e!==void 0?N.scrollTop=e:Kt(Qt(),N,!1)}),Xu(()=>{e===void 0&&Kt(Qt(),ve(),!1);const t=localStorage.getItem(st.previewPageZoomKey);t!==null&&Ln(t)})}function u1(e){if(Mr()||te()===1&&C.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey&&e.key==="0")return;const n=Number(N.style.zoom)||1,t=r=>String(Math.min(Math.max(r,.5),3));switch(e.key){case"-":case"_":Ln(t(n-.1));break;case"=":case"+":Ln(t(n+.1));break;case"0":Ln("1");break;default:return}localStorage.setItem(st.previewPageZoomKey,N.style.zoom),e.preventDefault(),e.stopPropagation()}function i1(){Pi(!1)}async function a1(){const n=(await Fr(!0)).replace("</body>",'<script>window.addEventListener("load",()=>{window.print();});window.addEventListener("afterprint",()=>{window.close();});<\/script></body>'),o=C.MarkEdit.getDirectoryPath("home").replace(/\/Library\/Containers\/[^/]+\/Data\/?$/,"")+"/.markedit-print.html";if(!await C.MarkEdit.createFile({path:o,string:n,overwrites:!0})){await C.MarkEdit.showSavePanel({string:n,fileName:"print-rendered.html"});return}await C.MarkEdit.runService("Open URL","file://"+o)}function c1(){Pi(!0)}function s1(){const e=lt(!1),n=new ClipboardItem({"text/plain":e.then(t=>new Blob([t],{type:"text/plain"}))});return Qo(n,R("failedToCopy"))}function l1(){const e=lt(!1),n=new ClipboardItem({"text/html":e.then(t=>new Blob([t],{type:"text/html"})),"text/plain":e.then(t=>new Blob([ua(t)],{type:"text/plain"}))});return Qo(n,R("failedToCopy"))}function Qt(){return C.MarkEdit.editorView.scrollDOM}function ve(){return N}async function Fr(e){const n=await lt(!1);return e?await ei(n):`<meta charset="UTF-8">
${n}`}async function d1(e,n){const t=await gr(e,!1);return n?await ei(t):`<meta charset="UTF-8">
${t}`}async function lt(e=!0){const n=C.MarkEdit.editorAPI.getText();return await gr(n,e)}function Ro(){const e=getComputedStyle(N).backgroundColor;sn.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}function Ln(e){N.style.zoom=e,N.classList.toggle("zoomed-in",Number(e)>1)}async function Pi(e){const n=await(async()=>{const r=await C.MarkEdit.getFileInfo();return r===void 0?`${R("untitled")}.html`:`${na(r.filePath)}.html`})(),t=await Fr(e);C.MarkEdit.showSavePanel({fileName:n,string:t})}async function f1(e){if(!(e.target instanceof Element))return;const n=e.target.closest("a");if(n===null)return;const t=n.getAttribute("href");if(!t?.startsWith("../"))return;const r=(await C.MarkEdit.getFileInfo())?.parentPath;if(r!==void 0){e.preventDefault(),e.stopPropagation();try{const o=Pe(r,decodeURIComponent(t));await C.MarkEdit.openFile(o)}catch(o){console.error("Failed to open file:",o)}}}function h1(e){const n="suppress-underline",t=e.target instanceof Element?e.target.closest("a"):null;t!==null&&zh(N,e),!(t===null||t.classList.contains(n)||!t.matches(":hover"))&&(t.classList.add(n),t.addEventListener("mouseleave",()=>t.classList.remove(n),{once:!0}))}function p1(e){const n=e.target;if(!(n instanceof HTMLInputElement)||!n.classList.contains("task-list-item-checkbox"))return;const t=n.closest("[data-line-from]");if(t===null){console.error("Failed to find task item block");return}const r=C.MarkEdit.editorAPI,o=r.getLineRange(qe(t).from),u=xf(r.getText(o));if(u===null){n.checked=!n.checked,console.error("Failed to resolve task toggle");return}const a=o.from+u.offset;C.MarkEdit.editorView.dispatch({changes:{from:a,to:a+1,insert:u.replacement},annotations:Bi.of(!0)})}const ye={viewMode:0,splitter:void 0,wysiwygEditLock:!1},Jt="markedit-preview",Oo=`${Jt}.js`;function m1(e){const{destExists:n,bundleInfo:t,currentVersion:r}=e,o=t?.version===r,u=t?.fullBuild===!1;return!(n&&o&&u)}async function b1(){try{const e=C.MarkEdit.getDirectoryPath("documents"),n=C.MarkEdit.getDirectoryPath("sharedContainer");if(e===void 0||n===void 0){console.error("Required directories are not accessible");return}const t=typeof __FILE_PATH__=="string"?__FILE_PATH__:Pe(e,`scripts/${Oo}`);if(await C.MarkEdit.getFileInfo(t)===void 0){console.error(`Source file not found at ${t}`);return}const o=t.split("/").pop()??Oo,u=Pe(n,"Shared/scripts"),a=Pe(u,o),i=await C.MarkEdit.getFileInfo(a)!==void 0,c=Pe(n,"Shared/metadata.json"),l=await oa(c),d=l[Jt];if(!m1({destExists:i,bundleInfo:d,currentVersion:"1.11.2"}))return;const s=await C.MarkEdit.getFileContent(t);if(s===void 0){console.error(`Failed to read content from ${t}`);return}await C.MarkEdit.createFile({path:u,isDirectory:!0}),await C.MarkEdit.createFile({path:a,string:s,overwrites:!0}),await C.MarkEdit.createFile({path:c,string:JSON.stringify({...l,[Jt]:{version:"1.11.2",fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error("Failed to copy the current file to shared container:",e)}}const g1='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>',k1='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>';function y1(){const e=Bo(R("source"),g1),n=Bo(R("preview"),k1),t=document.createElement("div");t.className="quicklook-segmented",t.setAttribute("role","tablist"),t.append(e,n);const r=document.createElement("div");return r.className="quicklook-toolbar",r.appendChild(t),{toolbar:r,sourceButton:e,previewButton:n}}function Bo(e,n){const t=document.createElement("button");t.title=e,t.type="button",t.className="quicklook-segment",t.setAttribute("role","tab"),t.setAttribute("aria-label",e);const r=document.createElement("span");r.textContent=e,r.className="quicklook-segment-label";const o=document.createElement("span");return o.innerHTML=n,o.className="quicklook-segment-icon",t.append(r,o),t}function Oe(){if(Be!==void 0)return Be;try{Be=localStorage.getItem(zi)==="source"?"source":"preview"}catch{console.error("Failed to read quick look mode from localStorage"),Be="preview"}return Be}function Po(e){Be=e;try{localStorage.setItem(zi,e)}catch{console.error("Failed to write quick look mode to localStorage")}}let Be;const zi="ui.quicklook-mode";function x1(){const e=window,n=e.editor?.state?.doc.toString();return typeof n=="string"?n:(console.error("Failed to get text from host editor state"),e.config?.text??"")}function v1(){document.addEventListener("webkitmouseforcewillbegin",e=>{const n=e.target;n instanceof Element&&n.closest("a")!==null&&e.preventDefault()})}function w1(e,n){const t=window,r=t.pinchZoomTarget;t.pinchZoomTarget=()=>{if(e()!=="preview")return r?.()??null;const o=n.querySelector(".quicklook-content");return o!==null?{scroller:n,inner:o}:null};for(const o of["gesturechange","gestureend"])document.addEventListener(o,()=>{if(e()!=="preview")return;const u=n.querySelector(".quicklook-content");u?.style.zoom.length?u?.style.setProperty("--quicklook-zoom",u.style.zoom):u?.style.removeProperty("--quicklook-zoom")},{passive:!1})}function C1(e,n){let t;const r=window,o={start:r.startDragging,update:r.updateDragging,cancel:r.cancelDragging},u=()=>{const i=n.clientHeight,c=n.scrollHeight,l=c-i;if(l<=0||c<=0)return{clientHeight:i,scrollHeight:c,scrollbarHeight:i,scrollbarTop:0};const d=i*(i/c),f=n.scrollTop/l*(i-d);return{clientHeight:i,scrollHeight:c,scrollbarHeight:d,scrollbarTop:f}},a=(i,c,l="auto")=>{const{clientHeight:d,scrollHeight:s,scrollbarHeight:f}=u(),h=d-f;if(h>0){const p=(i-c)/h;n.scrollTo({top:p*(s-d),behavior:l})}};r.startDragging=i=>{if(e()!=="preview"){o.start?.(i);return}const{scrollbarTop:c,scrollbarHeight:l}=u(),d=zo(n,i);t=d-c,(d<c||d>c+l)&&a(d,l*.5,"smooth")},r.updateDragging=i=>{if(e()!=="preview"){o.update?.(i);return}t!==void 0&&a(zo(n,i),t)},r.cancelDragging=()=>{if(e()!=="preview"){o.cancel?.();return}t=void 0}}function E1(e,n,t){t.addEventListener("wheel",r=>{const o=e()==="preview"?n:document.querySelector(".cm-scroller");o!==null&&(o.scrollTop+=r.deltaY,o.scrollLeft+=r.deltaX,r.preventDefault())},{passive:!1})}function _1(e,n,t){const r=document.querySelector(".cm-scroller"),o=()=>{const a=(e()==="preview"?n:r)?.scrollTop??0;t.classList.toggle("scrolled",a>0),t.classList.toggle("scrolled-far",a>20)};return n.addEventListener("scroll",o,{passive:!0}),r?.addEventListener("scroll",o,{passive:!0}),o}function A1(e){document.addEventListener("copy",n=>{if(!e.classList.contains("overlay"))return;const t=getSelection(),r=t!==null&&t.rangeCount>0?t.getRangeAt(0):null,o=r!==null&&!r.collapsed&&e.contains(r.commonAncestorContainer)?r:null,u=o??(()=>{const i=document.createRange();return i.selectNodeContents(e),i})(),a=document.createElement("div");a.appendChild(u.cloneContents()),n.clipboardData?.setData("text/html",a.innerHTML),n.clipboardData?.setData("text/plain",o!==null?o.toString():e.innerText),n.preventDefault(),n.stopPropagation()},!0)}function zo(e,n){return n-e.getBoundingClientRect().top}const S1=`body {
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
  transition: background-color 0.2s ease;
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
    transition: opacity 0.2s ease;
    pointer-events: none;
    z-index: -1;
  }

  body:hover .quicklook-toolbar.scrolled-far::before {
    opacity: 1;
  }

  .quicklook-segmented {
    pointer-events: auto;
    padding: 0;
    gap: 0;
    overflow: hidden;
    opacity: 0;
    background: rgba(242, 242, 245, 0.85);
    backdrop-filter: saturate(180%) blur(12px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    border: 0.5px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    transition: opacity 0.2s ease;
  }

  body:hover .quicklook-segmented, .quicklook-segmented:focus-within {
    opacity: 1;
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
`;function T1(e){me(S1),document.body.classList.add("quicklook");const{toolbar:n,sourceButton:t,previewButton:r}=y1();document.body.appendChild(n);const o=D1(e),u=_1(Oe,e,n),a={previewPane:e,sourceButton:t,previewButton:r,refreshSeparator:u,ensureRendered:o.ensureRendered};t.addEventListener("click",()=>{Po("source"),Rt(a)}),r.addEventListener("click",()=>{Po("preview"),Rt(a)}),Rt(a),setTimeout(o.ensureRendered,0),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e.querySelector(".mermaid")!==null&&(o.invalidate(),Oe()==="preview"&&o.ensureRendered())}),v1(),w1(Oe,e),C1(Oe,e),E1(Oe,e,n),A1(e)}function Rt(e){const n=Oe()==="source",t=!n;e.sourceButton.classList.toggle("active",n),e.previewButton.classList.toggle("active",t),e.sourceButton.setAttribute("aria-selected",String(n)),e.previewButton.setAttribute("aria-selected",String(t)),e.previewPane.classList.toggle("overlay",t),e.refreshSeparator(),t&&e.ensureRendered()}function D1(e){let n=!1,t;return{ensureRendered:()=>(n||t||(t=(async()=>{try{const u=ti(await gr(x1(),!1));e.innerHTML=`<div class="quicklook-content">${u}</div>`,e.querySelectorAll("a[href]").forEach(a=>{a.removeAttribute("href"),a.removeAttribute("target")}),Xu(()=>{}),n=!0}catch(u){throw t=void 0,u}})()),t),invalidate:()=>{n=!1,t=void 0}}}var Nn={exports:{}};var M1=Nn.exports,Ho;function F1(){return Ho||(Ho=1,(function(e,n){(function(t,r){e.exports=r()})(M1,(function(){var t=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},r=function(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")},o=(function(){function l(d,s){for(var f=0;f<s.length;f++){var h=s[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(d,h.key,h)}}return function(d,s,f){return s&&l(d.prototype,s),f&&l(d,f),d}})(),u=Object.assign||function(l){for(var d=1;d<arguments.length;d++){var s=arguments[d];for(var f in s)Object.prototype.hasOwnProperty.call(s,f)&&(l[f]=s[f])}return l},a=(function(){function l(d){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],h=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;r(this,l),this.ctx=d,this.iframes=s,this.exclude=f,this.iframesTimeout=h}return o(l,[{key:"getContexts",value:function(){var s=void 0,f=[];return typeof this.ctx>"u"||!this.ctx?s=[]:NodeList.prototype.isPrototypeOf(this.ctx)?s=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?s=this.ctx:typeof this.ctx=="string"?s=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):s=[this.ctx],s.forEach(function(h){var p=f.filter(function(m){return m.contains(h)}).length>0;f.indexOf(h)===-1&&!p&&f.push(h)}),f}},{key:"getIframeContents",value:function(s,f){var h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},p=void 0;try{var m=s.contentWindow;if(p=m.document,!m||!p)throw new Error("iframe inaccessible")}catch{h()}p&&f(p)}},{key:"isIframeBlank",value:function(s){var f="about:blank",h=s.getAttribute("src").trim(),p=s.contentWindow.location.href;return p===f&&h!==f&&h}},{key:"observeIframeLoad",value:function(s,f,h){var p=this,m=!1,b=null,g=function k(){if(!m){m=!0,clearTimeout(b);try{p.isIframeBlank(s)||(s.removeEventListener("load",k),p.getIframeContents(s,f,h))}catch{h()}}};s.addEventListener("load",g),b=setTimeout(g,this.iframesTimeout)}},{key:"onIframeReady",value:function(s,f,h){try{s.contentWindow.document.readyState==="complete"?this.isIframeBlank(s)?this.observeIframeLoad(s,f,h):this.getIframeContents(s,f,h):this.observeIframeLoad(s,f,h)}catch{h()}}},{key:"waitForIframes",value:function(s,f){var h=this,p=0;this.forEachIframe(s,function(){return!0},function(m){p++,h.waitForIframes(m.querySelector("html"),function(){--p||f()})},function(m){m||f()})}},{key:"forEachIframe",value:function(s,f,h){var p=this,m=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},b=s.querySelectorAll("iframe"),g=b.length,k=0;b=Array.prototype.slice.call(b);var y=function(){--g<=0&&m(k)};g||y(),b.forEach(function(x){l.matches(x,p.exclude)?y():p.onIframeReady(x,function(v){f(x)&&(k++,h(v)),y()},y)})}},{key:"createIterator",value:function(s,f,h){return document.createNodeIterator(s,f,h,!1)}},{key:"createInstanceOnIframe",value:function(s){return new l(s.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(s,f,h){var p=s.compareDocumentPosition(h),m=Node.DOCUMENT_POSITION_PRECEDING;if(p&m)if(f!==null){var b=f.compareDocumentPosition(h),g=Node.DOCUMENT_POSITION_FOLLOWING;if(b&g)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(s){var f=s.previousNode(),h=void 0;return f===null?h=s.nextNode():h=s.nextNode()&&s.nextNode(),{prevNode:f,node:h}}},{key:"checkIframeFilter",value:function(s,f,h,p){var m=!1,b=!1;return p.forEach(function(g,k){g.val===h&&(m=k,b=g.handled)}),this.compareNodeIframe(s,f,h)?(m===!1&&!b?p.push({val:h,handled:!0}):m!==!1&&!b&&(p[m].handled=!0),!0):(m===!1&&p.push({val:h,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(s,f,h,p){var m=this;s.forEach(function(b){b.handled||m.getIframeContents(b.val,function(g){m.createInstanceOnIframe(g).forEachNode(f,h,p)})})}},{key:"iterateThroughNodes",value:function(s,f,h,p,m){for(var b=this,g=this.createIterator(f,s,p),k=[],y=[],x=void 0,v=void 0,w=function(){var F=b.getIteratorNode(g);return v=F.prevNode,x=F.node,x};w();)this.iframes&&this.forEachIframe(f,function(A){return b.checkIframeFilter(x,v,A,k)},function(A){b.createInstanceOnIframe(A).forEachNode(s,function(F){return y.push(F)},p)}),y.push(x);y.forEach(function(A){h(A)}),this.iframes&&this.handleOpenIframes(k,s,h,p),m()}},{key:"forEachNode",value:function(s,f,h){var p=this,m=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},b=this.getContexts(),g=b.length;g||m(),b.forEach(function(k){var y=function(){p.iterateThroughNodes(s,k,f,h,function(){--g<=0&&m()})};p.iframes?p.waitForIframes(k,y):y()})}}],[{key:"matches",value:function(s,f){var h=typeof f=="string"?[f]:f,p=s.matches||s.matchesSelector||s.msMatchesSelector||s.mozMatchesSelector||s.oMatchesSelector||s.webkitMatchesSelector;if(p){var m=!1;return h.every(function(b){return p.call(s,b)?(m=!0,!1):!0}),m}else return!1}}]),l})(),i=(function(){function l(d){r(this,l),this.ctx=d,this.ie=!1;var s=window.navigator.userAgent;(s.indexOf("MSIE")>-1||s.indexOf("Trident")>-1)&&(this.ie=!0)}return o(l,[{key:"log",value:function(s){var f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",h=this.opt.log;this.opt.debug&&(typeof h>"u"?"undefined":t(h))==="object"&&typeof h[f]=="function"&&h[f]("mark.js: "+s)}},{key:"escapeStr",value:function(s){return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(s){return this.opt.wildcards!=="disabled"&&(s=this.setupWildcardsRegExp(s)),s=this.escapeStr(s),Object.keys(this.opt.synonyms).length&&(s=this.createSynonymsRegExp(s)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(s=this.setupIgnoreJoinersRegExp(s)),this.opt.diacritics&&(s=this.createDiacriticsRegExp(s)),s=this.createMergedBlanksRegExp(s),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(s=this.createJoinersRegExp(s)),this.opt.wildcards!=="disabled"&&(s=this.createWildcardsRegExp(s)),s=this.createAccuracyRegExp(s),s}},{key:"createSynonymsRegExp",value:function(s){var f=this.opt.synonyms,h=this.opt.caseSensitive?"":"i",p=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var m in f)if(f.hasOwnProperty(m)){var b=f[m],g=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(m):this.escapeStr(m),k=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(b):this.escapeStr(b);g!==""&&k!==""&&(s=s.replace(new RegExp("("+this.escapeStr(g)+"|"+this.escapeStr(k)+")","gm"+h),p+("("+this.processSynomyms(g)+"|")+(this.processSynomyms(k)+")")+p))}return s}},{key:"processSynomyms",value:function(s){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(s=this.setupIgnoreJoinersRegExp(s)),s}},{key:"setupWildcardsRegExp",value:function(s){return s=s.replace(/(?:\\)*\?/g,function(f){return f.charAt(0)==="\\"?"?":""}),s.replace(/(?:\\)*\*/g,function(f){return f.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(s){var f=this.opt.wildcards==="withSpaces";return s.replace(/\u0001/g,f?"[\\S\\s]?":"\\S?").replace(/\u0002/g,f?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(s){return s.replace(/[^(|)\\]/g,function(f,h,p){var m=p.charAt(h+1);return/[(|)\\]/.test(m)||m===""?f:f+"\0"})}},{key:"createJoinersRegExp",value:function(s){var f=[],h=this.opt.ignorePunctuation;return Array.isArray(h)&&h.length&&f.push(this.escapeStr(h.join(""))),this.opt.ignoreJoiners&&f.push("\\u00ad\\u200b\\u200c\\u200d"),f.length?s.split(/\u0000+/).join("["+f.join("")+"]*"):s}},{key:"createDiacriticsRegExp",value:function(s){var f=this.opt.caseSensitive?"":"i",h=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],p=[];return s.split("").forEach(function(m){h.every(function(b){if(b.indexOf(m)!==-1){if(p.indexOf(b)>-1)return!1;s=s.replace(new RegExp("["+b+"]","gm"+f),"["+b+"]"),p.push(b)}return!0})}),s}},{key:"createMergedBlanksRegExp",value:function(s){return s.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(s){var f=this,h="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",p=this.opt.accuracy,m=typeof p=="string"?p:p.value,b=typeof p=="string"?[]:p.limiters,g="";switch(b.forEach(function(k){g+="|"+f.escapeStr(k)}),m){case"partially":default:return"()("+s+")";case"complementary":return g="\\s"+(g||this.escapeStr(h)),"()([^"+g+"]*"+s+"[^"+g+"]*)";case"exactly":return"(^|\\s"+g+")("+s+")(?=$|\\s"+g+")"}}},{key:"getSeparatedKeywords",value:function(s){var f=this,h=[];return s.forEach(function(p){f.opt.separateWordSearch?p.split(" ").forEach(function(m){m.trim()&&h.indexOf(m)===-1&&h.push(m)}):p.trim()&&h.indexOf(p)===-1&&h.push(p)}),{keywords:h.sort(function(p,m){return m.length-p.length}),length:h.length}}},{key:"isNumeric",value:function(s){return Number(parseFloat(s))==s}},{key:"checkRanges",value:function(s){var f=this;if(!Array.isArray(s)||Object.prototype.toString.call(s[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(s),[];var h=[],p=0;return s.sort(function(m,b){return m.start-b.start}).forEach(function(m){var b=f.callNoMatchOnInvalidRanges(m,p),g=b.start,k=b.end,y=b.valid;y&&(m.start=g,m.length=k-g,h.push(m),p=k)}),h}},{key:"callNoMatchOnInvalidRanges",value:function(s,f){var h=void 0,p=void 0,m=!1;return s&&typeof s.start<"u"?(h=parseInt(s.start,10),p=h+parseInt(s.length,10),this.isNumeric(s.start)&&this.isNumeric(s.length)&&p-f>0&&p-h>0?m=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(s))),this.opt.noMatch(s))):(this.log("Ignoring invalid range: "+JSON.stringify(s)),this.opt.noMatch(s)),{start:h,end:p,valid:m}}},{key:"checkWhitespaceRanges",value:function(s,f,h){var p=void 0,m=!0,b=h.length,g=f-b,k=parseInt(s.start,10)-g;return k=k>b?b:k,p=k+parseInt(s.length,10),p>b&&(p=b,this.log("End range automatically set to the max value of "+b)),k<0||p-k<0||k>b||p>b?(m=!1,this.log("Invalid range: "+JSON.stringify(s)),this.opt.noMatch(s)):h.substring(k,p).replace(/\s+/g,"")===""&&(m=!1,this.log("Skipping whitespace only range: "+JSON.stringify(s)),this.opt.noMatch(s)),{start:k,end:p,valid:m}}},{key:"getTextNodes",value:function(s){var f=this,h="",p=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(m){p.push({start:h.length,end:(h+=m.textContent).length,node:m})},function(m){return f.matchesExclude(m.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){s({value:h,nodes:p})})}},{key:"matchesExclude",value:function(s){return a.matches(s,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(s,f,h){var p=this.opt.element?this.opt.element:"mark",m=s.splitText(f),b=m.splitText(h-f),g=document.createElement(p);return g.setAttribute("data-markjs","true"),this.opt.className&&g.setAttribute("class",this.opt.className),g.textContent=m.textContent,m.parentNode.replaceChild(g,m),b}},{key:"wrapRangeInMappedTextNode",value:function(s,f,h,p,m){var b=this;s.nodes.every(function(g,k){var y=s.nodes[k+1];if(typeof y>"u"||y.start>f){if(!p(g.node))return!1;var x=f-g.start,v=(h>g.end?g.end:h)-g.start,w=s.value.substr(0,g.start),A=s.value.substr(v+g.start);if(g.node=b.wrapRangeInTextNode(g.node,x,v),s.value=w+A,s.nodes.forEach(function(F,q){q>=k&&(s.nodes[q].start>0&&q!==k&&(s.nodes[q].start-=v),s.nodes[q].end-=v)}),h-=v,m(g.node.previousSibling,g.start),h>g.end)f=g.end;else return!1}return!0})}},{key:"wrapMatches",value:function(s,f,h,p,m){var b=this,g=f===0?0:f+1;this.getTextNodes(function(k){k.nodes.forEach(function(y){y=y.node;for(var x=void 0;(x=s.exec(y.textContent))!==null&&x[g]!=="";)if(h(x[g],y)){var v=x.index;if(g!==0)for(var w=1;w<g;w++)v+=x[w].length;y=b.wrapRangeInTextNode(y,v,v+x[g].length),p(y.previousSibling),s.lastIndex=0}}),m()})}},{key:"wrapMatchesAcrossElements",value:function(s,f,h,p,m){var b=this,g=f===0?0:f+1;this.getTextNodes(function(k){for(var y=void 0;(y=s.exec(k.value))!==null&&y[g]!=="";){var x=y.index;if(g!==0)for(var v=1;v<g;v++)x+=y[v].length;var w=x+y[g].length;b.wrapRangeInMappedTextNode(k,x,w,function(A){return h(y[g],A)},function(A,F){s.lastIndex=F,p(A)})}m()})}},{key:"wrapRangeFromIndex",value:function(s,f,h,p){var m=this;this.getTextNodes(function(b){var g=b.value.length;s.forEach(function(k,y){var x=m.checkWhitespaceRanges(k,g,b.value),v=x.start,w=x.end,A=x.valid;A&&m.wrapRangeInMappedTextNode(b,v,w,function(F){return f(F,k,b.value.substring(v,w),y)},function(F){h(F,k)})}),p()})}},{key:"unwrapMatches",value:function(s){for(var f=s.parentNode,h=document.createDocumentFragment();s.firstChild;)h.appendChild(s.removeChild(s.firstChild));f.replaceChild(h,s),this.ie?this.normalizeTextNode(f):f.normalize()}},{key:"normalizeTextNode",value:function(s){if(s){if(s.nodeType===3)for(;s.nextSibling&&s.nextSibling.nodeType===3;)s.nodeValue+=s.nextSibling.nodeValue,s.parentNode.removeChild(s.nextSibling);else this.normalizeTextNode(s.firstChild);this.normalizeTextNode(s.nextSibling)}}},{key:"markRegExp",value:function(s,f){var h=this;this.opt=f,this.log('Searching with expression "'+s+'"');var p=0,m="wrapMatches",b=function(k){p++,h.opt.each(k)};this.opt.acrossElements&&(m="wrapMatchesAcrossElements"),this[m](s,this.opt.ignoreGroups,function(g,k){return h.opt.filter(k,g,p)},b,function(){p===0&&h.opt.noMatch(s),h.opt.done(p)})}},{key:"mark",value:function(s,f){var h=this;this.opt=f;var p=0,m="wrapMatches",b=this.getSeparatedKeywords(typeof s=="string"?[s]:s),g=b.keywords,k=b.length,y=this.opt.caseSensitive?"":"i",x=function v(w){var A=new RegExp(h.createRegExp(w),"gm"+y),F=0;h.log('Searching with expression "'+A+'"'),h[m](A,1,function(q,we){return h.opt.filter(we,w,p,F)},function(q){F++,p++,h.opt.each(q)},function(){F===0&&h.opt.noMatch(w),g[k-1]===w?h.opt.done(p):v(g[g.indexOf(w)+1])})};this.opt.acrossElements&&(m="wrapMatchesAcrossElements"),k===0?this.opt.done(p):x(g[0])}},{key:"markRanges",value:function(s,f){var h=this;this.opt=f;var p=0,m=this.checkRanges(s);m&&m.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(m)),this.wrapRangeFromIndex(m,function(b,g,k,y){return h.opt.filter(b,g,k,y)},function(b,g){p++,h.opt.each(b,g)},function(){h.opt.done(p)})):this.opt.done(p)}},{key:"unmark",value:function(s){var f=this;this.opt=s;var h=this.opt.element?this.opt.element:"*";h+="[data-markjs]",this.opt.className&&(h+="."+this.opt.className),this.log('Removal selector "'+h+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(p){f.unwrapMatches(p)},function(p){var m=a.matches(p,h),b=f.matchesExclude(p);return!m||b?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(s){this._opt=u({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},s)},get:function(){return this._opt}},{key:"iterator",get:function(){return new a(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),l})();function c(l){var d=this,s=new i(l);return this.mark=function(f,h){return s.mark(f,h),d},this.markRegExp=function(f,h){return s.markRegExp(f,h),d},this.markRanges=function(f,h){return s.markRanges(f,h),d},this.unmark=function(f){return s.unmark(f),d},this}return c}))})(Nn)),Nn.exports}var I1=F1();const Hi=nt(I1),ln="markedit-preview-mark",qi="markedit-preview-mark-highlighted";let un=!1,Ir,fe=0,X=[],dn=null,Dn=null;const qo={github:{light:"#fae17d7f",dark:"#f2cc607f"},cobalt:{light:"#cad40f66",dark:"#cad40f66"},dracula:{light:"#ffffff40",dark:"#ffffff40"},minimal:{light:"#fae17d7f",dark:"#f2cc607f"},"night-owl":{light:"#5f7e9779",dark:"#5f7e9779"},"rose-pine":{light:"#6e6a864c",dark:"#6e6a8666"},solarized:{light:"#f4c09d",dark:"#584032"},synthwave84:{light:"#d18616bb",dark:"#d18616bb"},"winter-is-coming":{light:"#cee1f0",dark:"#103362"},xcode:{light:"#e4e4e4",dark:"#545558"}};function L1(e){if(Ir=e,fe=0,e.search.length===0){$i();return}const n=ve();ji(n),O1(n)}function N1(e){X.length!==0&&(fe=e%X.length,Ui())}function $i(){dn?.disconnect(),dn=null,Ir=void 0,fe=0,X=[],new Hi(ve()).unmark()}function R1(){if(te()===Q.preview)return{numberOfItems:X.length,currentIndex:fe}}function ji(e){const n=Ir;if(n===void 0||n.search.length===0||un)return;B1(),un=!0;const{search:t,caseSensitive:r,wholeWord:o,diacriticInsensitive:u,regexp:a}=n,i=new Hi(e),c=()=>{X=Array.from(e.querySelectorAll(`.${ln}`)),fe=X.length>0?Math.min(fe,X.length-1):0,Ui(),un=!1};i.unmark({done:()=>{if(a)try{const l=r?"":"i";i.markRegExp(new RegExp(t,l),{className:ln,done:c})}catch{un=!1,fe=0,X=[]}else i.mark(t,{className:ln,caseSensitive:r,diacritics:u,separateWordSearch:!1,accuracy:o?"exactly":"partially",done:c})}})}function Ui(){const e=te()!==Q.sideBySide;X.forEach((n,t)=>{n.classList.toggle(qi,e&&t===fe)}),e&&X.length>0&&X[fe].scrollIntoView({behavior:"smooth",block:"center"})}function O1(e){dn?.disconnect(),dn=new MutationObserver(()=>{un||ji(e)}),dn.observe(e,{childList:!0})}function B1(){Dn===null&&(Dn=document.createElement("style"),document.head.appendChild(Dn));const{light:e,dark:n}=qo[it]??qo.github;Dn.textContent=[`.${ln} { background: ${e} !important; color: inherit !important; }`,`.${qi} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,"@media (prefers-color-scheme: dark) {",`  .${ln} { background: ${n} !important; }`,"}"].join(`
`)}window.__markeditPreviewInitialized__?console.error("MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior."):(n1(),br()?typeof C.MarkEdit.onAppReady=="function"&&C.MarkEdit.onAppReady(b1):T1(ve()),window.__markeditPreviewInitialized__=!0);window.MarkEditGetHtml??=Fr;window.MarkEditRenderHtml??=d1;window.__markeditPreviewSPI__={performSearch:L1,setSearchMatchIndex:N1,clearSearch:$i,searchCounterInfo:R1};br()&&(C.MarkEdit.addMainMenuItem({title:R("viewMode"),icon:ea()?"eye":void 0,children:[{title:R("changeMode"),action:t1,key:wo.key??"V",modifiers:wo.modifiers??["Command"]},{separator:!0},Mn(R("editMode"),Q.edit),Mn(R("sideBySideMode"),Q.sideBySide),Mn(R("previewMode"),Q.preview),Mn(R("syntaxHiddenMode"),Q.syntaxHidden),{separator:!0},...z1(),{separator:!0},{title:"WYSIWYG Editing",action:P1,state:()=>({isSelected:Dr()})},{separator:!0},{title:`${R("version")} 1.11.2`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.11.2")}]}),C.MarkEdit.addExtension(Dh()),Nh(),C.MarkEdit.addExtension([_.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(n=>n.annotation(Bi))||(Ee.renderUpdater!==void 0&&clearTimeout(Ee.renderUpdater),Ee.renderUpdater=setTimeout(yn,500)))}),$h]),C.MarkEdit.onEditorReady(()=>{vd&&sf(C.MarkEdit.editorView.scrollDOM),r1(),requestAnimationFrame(async()=>{document.visibilityState==="visible"&&te()===Q.preview&&typeof C.MarkEdit.getFileInfo=="function"&&(await C.MarkEdit.getFileInfo())?.filePath===void 0&&C.MarkEdit.editorAPI.getText().length===0&&_n(Q.edit,!1)}),yn(),hf(Qt(),ve()),Mi(),Ee.keyDownListener!==void 0&&document.removeEventListener("keydown",Ee.keyDownListener),Ee.keyDownListener=e=>u1(e),document.addEventListener("keydown",Ee.keyDownListener)}),typeof C.MarkEdit.onEditorConfigChange=="function"&&C.MarkEdit.onEditorConfigChange(e=>{e==="lineHeight"&&te()===Q.syntaxHidden&&C.MarkEdit.editorView?.requestMeasure()}));function P1(){Dr()?Bh():(te()===Q.edit&&_n(Q.sideBySide,!0),Mi())}function Mn(e,n){return{title:e,action:()=>_n(n),state:()=>({isSelected:te()===n})}}function z1(){const e=[{title:R("copyHtml"),action:s1},{title:R("copyRichText"),action:l1}];return typeof C.MarkEdit.showSavePanel>"u"?e:[{title:R("saveCleanHtml"),action:i1},{title:R("saveStyledHtml"),action:c1},{title:R("printRendered"),action:a1},...e]}const Ee={renderUpdater:void 0,keyDownListener:void 0},H1=Gi(!1),q1=Gi(!0),$1=M.Prec.high(_.keymap.of([{key:"ArrowUp",run:H1,shift:q1}])),j1=_.EditorView.mouseSelectionStyle.of((e,n)=>{if(n.button!==0||n.detail!==1||n.altKey||n.ctrlKey||n.metaKey||n.shiftKey)return null;const t={x:n.clientX,y:n.clientY};let r=e.posAndSideAtCoords(t,!1);return{get(o){if(!Number.isFinite(r.pos))return e.state.selection;if(Math.max(Math.abs(o.clientX-t.x),Math.abs(o.clientY-t.y))<=5)return M.EditorSelection.create([M.EditorSelection.cursor(r.pos,r.assoc)]);const a=e.posAndSideAtCoords({x:o.clientX,y:o.clientY},!1);return Number.isFinite(a.pos)?a.pos===r.pos?M.EditorSelection.create([M.EditorSelection.cursor(a.pos,a.assoc)]):M.EditorSelection.create([M.EditorSelection.range(r.pos,a.pos,void 0,void 0,a.assoc)]):e.state.selection},update(o){o.docChanged&&Number.isFinite(r.pos)&&(r={...r,pos:o.changes.mapPos(r.pos)})}}});function oe(e,n,t){return e.selection.ranges.some(r=>r.from<=t&&r.to>=n)}function Gi(e){return n=>{const t=M.EditorSelection.create(n.state.selection.ranges.map(r=>{let o=r;e&&o.undirectional&&o.head>=o.anchor&&(o=M.EditorSelection.range(o.head,o.anchor));let u=e||o.empty?U1(n,o):M.EditorSelection.cursor(o.from);return!e&&o.empty&&u.head===o.head&&(u=n.moveToLineBoundary(o,!1)),e?M.EditorSelection.range(o.anchor,u.head,u.goalColumn,u.bidiLevel??void 0,u.assoc):u}),n.state.selection.mainIndex);return t.eq(n.state.selection,!0)?!1:(n.dispatch({selection:t,scrollIntoView:!0,userEvent:"select"}),!0)}}function U1(e,n){const t=e.moveVertically(n,!1),r=e.state.doc.lineAt(n.head),o=e.state.doc.lineAt(t.head);if(r.number-o.number<=1)return t;const u=e.state.doc.line(r.number-1);if(!G1(e,u.from))return t;const a=e.lineBlockAt(u.from),i=t.goalColumn,c=e.coordsAtPos(n.head,n.assoc||1),l=i===void 0?c?.left:e.contentDOM.getBoundingClientRect().left+i;if(l===void 0)return t;const d=e.posAndSideAtCoords({x:l,y:e.documentTop+a.top+a.height/2});return d===null||d.pos<u.from||d.pos>u.to?t:M.EditorSelection.cursor(d.pos,d.assoc,void 0,i)}function G1(e,n){for(let t=he.syntaxTree(e.state).resolve(n,1);t!==null;t=t.parent)if(t.name.startsWith("ATXHeading"))return!0;return!1}const V1={note:"Note",tip:"Tip",important:"Important",warning:"Warning",caution:"Caution"};function W1(e,n){if(e.name!=="Blockquote")return;const t=e.node.getChild("Paragraph");if(t===null)return;let r=e.node.firstChild;for(;r!==null&&(r.from!==t.from||r.to!==t.to);){if(r.name!=="QuoteMark")return;r=r.nextSibling}if(r===null)return;const o=n.doc.lineAt(t.from),u=n.sliceDoc(t.from,o.to),a=/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?=[ \t]*$)/i.exec(u);if(a===null)return;const i=a[1].toLowerCase(),c=t.from,l=c+a[0].length;if(!oe(n,c,l))return{from:c,to:l,type:i,title:V1[i]}}function K1(e,n){if(e.name==="QuoteMark"&&!oe(n,e.from,e.to))return{from:e.from,to:e.to}}function Z1(e){if(e.name!=="Blockquote")return;let n=1,t=e.node.parent;for(;t!==null;)t.name==="Blockquote"&&(n+=1),t=t.parent;return{from:e.from,to:e.to,depth:n}}const Y1={note:'<svg class="octicon octicon-info" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'};class Q1 extends _.WidgetType{constructor(n,t){super(),this.type=n,this.title=t}type;title;eq(n){return n.type===this.type&&n.title===this.title}toDOM(){const n=document.createElement("span");n.className="cm-md-syntaxHiddenAlert",n.dataset.type=this.type;const t=n.appendChild(document.createElement("span"));t.className="cm-md-syntaxHiddenAlertIcon",t.innerHTML=Y1[this.type],t.setAttribute("aria-hidden","true");const r=n.appendChild(document.createElement("span"));return r.textContent=this.title,n}ignoreEvent(){return!1}}const J1=_.layer({above:!1,class:"cm-md-syntaxHiddenBlockquoteLayer",markers:ep,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(n=>n.reconfigured),mount:e=>e.setAttribute("aria-hidden","true")});function X1(e){const n=new Map,t=new Map;for(const{from:o,to:u}of e.visibleRanges)he.syntaxTree(e.state).iterate({from:o,to:u,enter:a=>{const i=Z1(a);if(i!==void 0&&n.set($o(i),i),a.name!=="QuoteMark")return;const c=ip(a.node);if(c===null)return;const l=$o(c),d=e.state.doc.lineAt(a.from).from,s=t.get(l)??new Map;s.set(d,{position:a.from,active:oe(e.state,a.from,a.to)}),t.set(l,s)}});const r=[];return n.forEach((o,u)=>{const a=t.get(u),i=new Set;e.viewportLineBlocks.forEach(c=>{const l=e.state.doc.lineAt(c.from);if(i.has(l.from)||l.to<o.from||l.from>=o.to)return;i.add(l.from);const d=a?.get(l.from);d?.active!==!0&&r.push({line:l.from,ownerFrom:o.from,anchor:d?.position,depth:o.depth})})}),r}function ep(e){const n=up(e),t=new Map;return X1(e).flatMap(r=>{const u=op(e,r.line)?.getBoundingClientRect(),a=e.coordsAtPos(r.line,1);if(u===void 0||a===null)return[];let i=r.anchor===void 0?void 0:e.coordsAtPos(r.anchor,1)?.left;if(i===void 0){let l=t.get(r.ownerFrom);l===void 0&&(l=rp(e,r.ownerFrom),t.set(r.ownerFrom,l)),i=a.left+l}const c=tp(e,r.anchor??r.ownerFrom);return[new np(r.depth,i-n.left,u.top-n.top,3,u.height,c.color,c.opacity)]})}class np extends _.RectangleMarker{constructor(n,t,r,o,u,a,i){super(`cm-md-syntaxHiddenBlockquoteBar cm-md-syntaxHiddenBlockquoteBar-depth-${n}`,t,r,o,u),this.color=a,this.opacity=i}color;opacity;draw(){const n=super.draw();return n.style.backgroundColor=this.color,n.style.opacity=`${this.opacity}`,n}update(n,t){return super.update(n,t)?(n.style.backgroundColor=this.color,n.style.opacity=`${this.opacity}`,!0):!1}eq(n){return super.eq(n)&&this.color===n.color&&this.opacity===n.opacity}}function tp(e,n){const t=e.domAtPos(n).node,r=t instanceof HTMLElement?t:t.parentElement;let o=1;for(let u=r;u!==null&&u!==e.scrollDOM;u=u.parentElement){const a=parseFloat(getComputedStyle(u).opacity);Number.isNaN(a)||(o*=a)}return{color:getComputedStyle(r??e.contentDOM).color,opacity:o}}function rp(e,n){const t=e.state.doc.lineAt(n),r=e.coordsAtPos(t.from,1),o=e.coordsAtPos(n,1);if(r!==null&&o!==null)return o.left-r.left;let u=0;for(const a of e.state.sliceDoc(t.from,n))u=a==="	"?u+e.state.tabSize-u%e.state.tabSize:u+1;return u*e.defaultCharacterWidth}function op(e,n){const t=e.domAtPos(n).node;return(t instanceof HTMLElement?t:t.parentElement)?.closest(".cm-line")}function up(e){const n=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===_.Direction.LTR?n.left:n.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:n.top-e.scrollDOM.scrollTop*e.scaleY}}function ip(e){let n=e.parent;for(;n!==null&&n.name!=="Blockquote";)n=n.parent;return n}function $o(e){return`${e.from}:${e.to}`}function Vi(e,n){if(e.name!=="ListMark")return;const t=e.node.parent,r=t?.getChild("Task"),o=r?.getChild("TaskMarker");if(!(t?.name!=="ListItem"||t.parent?.name!=="BulletList"||!/^[ \t]$/.test(n.sliceDoc(e.to,e.to+1))||oe(n,e.from,o?.to??e.to)))return{from:e.from,to:e.to,task:r!==null}}const ap=_.layer({above:!1,class:"cm-md-syntaxHiddenListBulletLayer",markers:sp,update:e=>e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(n=>n.reconfigured),mount:e=>e.setAttribute("aria-hidden","true")});function cp(e){const n=[];for(const{from:t,to:r}of e.visibleRanges)he.syntaxTree(e.state).iterate({from:t,to:r,enter:o=>{const u=Vi(o,e.state);u!==void 0&&!u.task&&n.push({from:u.from,to:u.to})}});return n}function sp(e){const n=fp(e);return cp(e).flatMap(t=>{const r=e.coordsForChar(t.from);if(r===null)return[];const o=dp(e,t.from);return[new lp(r.left-n.left,r.top-n.top,r.right-r.left,r.bottom-r.top,o.color,o.opacity,o.textShadow)]})}class lp extends _.RectangleMarker{constructor(n,t,r,o,u,a,i){super("cm-md-syntaxHiddenListBullet",n,t,r,o),this.color=u,this.opacity=a,this.textShadow=i}color;opacity;textShadow;draw(){const n=super.draw();return n.textContent="•",n.style.color=this.color,n.style.opacity=`${this.opacity}`,n.style.textShadow=this.textShadow,n}update(n,t){return super.update(n,t)?(n.style.color=this.color,n.style.opacity=`${this.opacity}`,n.style.textShadow=this.textShadow,!0):!1}eq(n){return super.eq(n)&&this.color===n.color&&this.opacity===n.opacity&&this.textShadow===n.textShadow}}function dp(e,n){const t=e.domAtPos(n).node,r=t instanceof HTMLElement?t:t.parentElement,o=getComputedStyle(r??e.contentDOM);let u=1;for(let a=r;a!==null&&a!==e.scrollDOM;a=a.parentElement){const i=parseFloat(getComputedStyle(a).opacity);Number.isNaN(i)||(u*=i)}return{color:o.color,opacity:u,textShadow:o.textShadow==="none"?"":o.textShadow}}function fp(e){const n=e.scrollDOM.getBoundingClientRect();return{left:(e.textDirection===_.Direction.LTR?n.left:n.right-e.scrollDOM.clientWidth*e.scaleX)-e.scrollDOM.scrollLeft*e.scaleX,top:n.top-e.scrollDOM.scrollTop*e.scaleY}}const jo=typeof ResizeObserver>"u"?void 0:new ResizeObserver(e=>{for(const n of e)bp(n.target)}),hp=[_.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=Uo(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.startState.readOnly!==e.state.readOnly||e.transactions.some(n=>n.reconfigured))&&(this.decorations=Uo(e.view))}},{decorations:e=>e.decorations}),_.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxFrame":{display:"inline-block",position:"relative",height:"1lh",margin:"0",textIndent:"0",verticalAlign:"top"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxMarker":{visibility:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckboxControl":{position:"absolute",insetBlockStart:"0",insetInlineStart:"-0.15em",display:"grid",placeItems:"center",width:"1em",height:"1lh"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenTaskCheckbox":{margin:"0",transform:"translateY(-0.09em) scale(var(--cm-md-task-checkbox-scale, 1))"}})];function pp(e){const n=[];for(const{from:t,to:r}of e.visibleRanges)he.syntaxTree(e.state).iterate({from:t,to:r,enter:o=>{if(o.name!=="TaskMarker")return;const u=o.node.parent,a=u?.parent,i=a?.getChild("ListMark"),c=o.to+1;u?.name==="Task"&&a?.name==="ListItem"&&a.parent?.name==="BulletList"&&i!==null&&i!==void 0&&e.state.sliceDoc(o.to,c)===" "&&!oe(e.state,i.from,o.to)&&n.push({from:i.from,to:c,markerFrom:o.from,listPrefix:e.state.sliceDoc(i.from,i.to+1),checked:e.state.sliceDoc(o.from,o.to)!=="[ ]",label:e.state.sliceDoc(c,e.state.doc.lineAt(o.to).to).trim()||"Task"})}});return n}function Uo(e){const n=e.state.readOnly||!e.state.facet(_.EditorView.editable),t=pp(e).map(r=>_.Decoration.replace({widget:new mp(r.markerFrom,r.listPrefix,r.checked,r.label,n)}).range(r.from,r.to));return _.Decoration.set(t,!0)}class mp extends _.WidgetType{constructor(n,t,r,o,u){super(),this.markerFrom=n,this.listPrefix=t,this.checked=r,this.label=o,this.disabled=u}markerFrom;listPrefix;checked;label;disabled;eq(n){return this.markerFrom===n.markerFrom&&this.listPrefix===n.listPrefix&&this.checked===n.checked&&this.label===n.label&&this.disabled===n.disabled}toDOM(n){const t=document.createElement("span");t.className="cm-md-syntaxHiddenTaskCheckboxFrame";const r=t.appendChild(document.createElement("span"));r.className="cm-md-syntaxHiddenTaskCheckboxMarker",r.textContent=this.listPrefix;const o=t.appendChild(document.createElement("span"));o.className="cm-md-syntaxHiddenTaskCheckboxControl";const u=o.appendChild(document.createElement("input"));return u.className="cm-md-syntaxHiddenTaskCheckbox",u.type="checkbox",this.updateInput(u),u.addEventListener("change",()=>gp(n,Number(u.dataset.markerFrom),u.checked)),jo?.observe(t),t}updateDOM(n){const t=n.querySelector(".cm-md-syntaxHiddenTaskCheckbox");return t===null?!1:(this.updateInput(t),!0)}destroy(n){jo?.unobserve(n)}ignoreEvent(){return!0}updateInput(n){n.checked=this.checked,n.disabled=this.disabled,n.dataset.markerFrom=`${this.markerFrom}`,n.setAttribute("aria-label",this.label)}}function bp(e){const n=e.querySelector(".cm-md-syntaxHiddenTaskCheckbox");if(n===null||n.offsetWidth===0)return;const t=parseFloat(getComputedStyle(e).fontSize);n.style.setProperty("--cm-md-task-checkbox-scale",`${t/n.offsetWidth}`)}function gp(e,n,t){const r=e.state.sliceDoc(n,n+3);if(e.state.readOnly||!e.state.facet(_.EditorView.editable)||!/^\[[ xX]\]$/.test(r))return;const o=e.state.changes({from:n+1,to:n+2,insert:t?"x":" "});e.dispatch({changes:o,effects:e.scrollSnapshot().map(o)??[],userEvent:"input"})}const kp=/^(?:vbscript|javascript|file|data):/,yp=/^data:image\/(?:gif|png|jpeg|webp);/;function xp(e){const n=e.trim().toLowerCase();return kp.test(n)&&!yp.test(n)?!1:(window.open(e,"_blank","noopener"),!0)}async function vp(e,n){const t=e.state.doc,r=t.toString(),o=await Yd(r,n);if(o===void 0||e.state.doc!==t)return!1;const u=e.state.doc.line(o+1).from,a=e.scrollDOM.scrollTop,i=c=>e.dispatch({effects:_.EditorView.scrollIntoView(u,{y:c,yMargin:5})});return e.dispatch({selection:M.EditorSelection.cursor(u)}),i("start"),setTimeout(()=>{e.state.doc===t&&Math.abs(e.scrollDOM.scrollTop-a)<.001&&i("center")},50),!0}const wp={link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/></svg>'};class Cp extends _.WidgetType{constructor(n,t,r,o,u){super(),this.kind=n,this.destination=r,this.label=o,this.highlightClasses=he.highlightingFor(t,u)??""}kind;destination;label;highlightClasses;toDOM(n){const t=document.createElement("button");return t.type="button",t.className=["cm-md-syntaxHiddenLinkButton",this.highlightClasses].filter(Boolean).join(" "),t.dataset.kind=this.kind,t.title=this.destination,t.innerHTML=wp[this.kind],t.setAttribute("aria-label",this.destination||this.label),t.addEventListener("click",r=>{r.stopPropagation(),this.destination.startsWith("#")?vp(n,this.destination):this.destination!==""&&xp(this.destination)}),t}eq(n){return n.kind===this.kind&&n.highlightClasses===this.highlightClasses&&n.destination===this.destination&&n.label===this.label}ignoreEvent(){return!0}}class Ep extends _.WidgetType{constructor(n,t){super(),this.destination=n,this.label=t}destination;label;toDOM(){const n=document.createElement("img");return n.className="cm-md-syntaxHiddenImage",n.src=ri(this.destination),n.alt=this.label,n.title=this.destination,n.draggable=!1,n}eq(n){return n.destination===this.destination&&n.label===this.label}ignoreEvent(){return!1}}class _p extends _.WidgetType{constructor(n){super(),this.source=n}source;toDOM(n){const t=document.createElement("div");return t.className="cm-md-syntaxHiddenBlockMath",Jd(this.source).then(r=>{t.isConnected&&(t.innerHTML=r,n.requestMeasure())}),t}eq(n){return n.source===this.source}ignoreEvent(){return!1}}class Ap extends _.WidgetType{constructor(n){super(),this.source=n}source;toDOM(n){const t=document.createElement("div");t.className="cm-md-syntaxHiddenMermaid";const r=matchMedia("(prefers-color-scheme: dark)");let o=0;const u=()=>{const i=++o;Qd(this.source).then(c=>{!t.isConnected||i!==o||(t.classList.remove("cm-md-syntaxHiddenMermaidError"),t.innerHTML=c,n.requestMeasure())},()=>{!t.isConnected||i!==o||(t.classList.add("cm-md-syntaxHiddenMermaidError"),t.textContent=this.source,n.requestMeasure())})},a=()=>u();return r.addEventListener("change",a),Ot.set(t,()=>{o+=1,r.removeEventListener("change",a)}),u(),t}destroy(n){Ot.get(n)?.(),Ot.delete(n)}eq(n){return n.source===this.source}ignoreEvent(){return!1}}const Ot=new WeakMap;M.StateField.define({create:e=>Go(e),update(e,n){return n.docChanged?Go(n.state):n.selection!==void 0?{all:e.all,visible:Wi(e.all,n.state)}:e},provide:e=>_.EditorView.decorations.from(e,n=>n.visible)});function Go(e){const n=Sp(e);return{all:n,visible:Wi(n,e)}}function Sp(e){const n=[];return he.syntaxTree(e).iterate({enter:t=>{const r=t.name==="BlockMath"?Tp(t,e):Dp(t,e);if(r!==void 0)return n.push(r),!1}}),_.Decoration.set(n,!0)}function Tp(e,n){const t=n.sliceDoc(e.from,e.to),r=t.slice(2,-2);if(!(!t.startsWith("$$")||!t.endsWith("$$")||r.trim()===""))return _.Decoration.replace({block:!0,widget:new _p(r)}).range(e.from,e.to)}function Dp(e,n){if(e.name!=="FencedCode")return;const t=e.node.getChild("CodeInfo"),r=e.node.lastChild;if(t===null||n.sliceDoc(t.from,t.to).trim()!=="mermaid"||r?.name!=="CodeMark")return;const o=n.sliceDoc(t.to,r.from).trim();if(o!=="")return _.Decoration.replace({block:!0,widget:new Ap(o)}).range(e.from,e.to)}function Wi(e,n){return e.size===0?e:e.update({filter:(t,r)=>!oe(n,t,r)})}function Mp(e,n){const t=e.node.parent;if(e.name!=="HeaderMark"||t?.name.startsWith("ATXHeading")!==!0||t.firstChild?.from!==e.from)return;const o=Ip(n,e.to,t.to);if(!(!Lp(n,o,t.to)||oe(n,t.from,t.to)))return{from:e.from,to:o}}function Fp(e,n){const t=e.node.parent;if(e.name!=="HeaderMark"||t?.name.startsWith("SetextHeading")!==!0)return;const r=n.doc.lineAt(e.from);if(!oe(n,t.from,t.to))return r.from}function Ip(e,n,t){return n+(/^ */.exec(e.sliceDoc(n,t))?.[0].length??0)}function Lp(e,n,t){return/\S/.test(e.sliceDoc(n,t))}function Np(e,n){if(e.name!=="HorizontalRule"||e.node.parent?.name!=="Document")return;const t=n.doc.lineAt(e.from);if(!oe(n,t.from,t.to))return _.Decoration.replace({widget:new Rp(he.highlightingFor(n,[Yo.tags.contentSeparator])??"")}).range(t.from,t.to)}class Rp extends _.WidgetType{constructor(n){super(),this.highlightClass=n}highlightClass;eq(n){return n.highlightClass===this.highlightClass}toDOM(){const n=document.createElement("span");return n.className=["cm-md-syntaxHiddenHorizontalRule",this.highlightClass].filter(Boolean).join(" "),n.setAttribute("role","separator"),n.setAttribute("aria-orientation","horizontal"),n}}const Op=new Map([["Emphasis","EmphasisMark"],["StrongEmphasis","EmphasisMark"],["Strikethrough","StrikethroughMark"],["InlineCode","CodeMark"]]),Bp=_.Decoration.mark({class:"cm-md-syntaxHiddenSource"}),Lr="cm-md-syntaxHiddenInlineCodeBoundary",Pp=_.Decoration.mark({class:`${Lr} cm-md-syntaxHiddenInlineCodeStart`}),zp=_.Decoration.mark({class:`${Lr} cm-md-syntaxHiddenInlineCodeEnd`}),Hp=_.Decoration.mark({class:`${Lr} cm-md-syntaxHiddenInlineCodeStart cm-md-syntaxHiddenInlineCodeEnd`});function qp(e,n){const t=e.node.parent;if(t===null||Op.get(t.name)!==e.name||oe(n,t.from,t.to))return[];const r=[Bp.range(e.from,e.to)];if(t.name!=="InlineCode"||e.from!==t.from)return r;const o=t.firstChild?.to,u=t.lastChild?.from;return o===void 0||u===void 0||o>=u||(u-o===1?r.push(Hp.range(o,u)):(r.push(Pp.range(o,o+1)),r.push(zp.range(u-1,u)))),r}const Vo=new WeakMap;function $p(e,n,t){if(!["Link","Image","Autolink"].includes(e.name)||oe(n,e.from,e.to))return;const r=Vp(e.node);if(e.name==="Autolink"){if(r.length<2)return;const d=n.sliceDoc(r[0].to,r[1].from);return/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(d)?{hidden:r.map(s=>({from:s.from,to:s.to})),label:{from:r[0].to,to:r[1].from},image:!1,destination:d,highlightTags:Wo(e.node)}:void 0}if(r.length<2)return;const o=e.node.getChild("LinkLabel");if(r.length===2&&(o===null||o.to-o.from===2))return;const u=e.node.getChild("URL");if(r.length>2&&u===null||["(","["].includes(n.sliceDoc(e.to,e.to+1)))return;const a=r[0],i=r[1],c=n.sliceDoc(a.to,i.from);if(!/\S/.test(c)||c.startsWith("^")&&e.to===i.to)return;const l=u===null?Up(o,n,t):n.sliceDoc(u.from,u.to);if(!(e.name==="Image"&&u===null&&l===""))return{hidden:[{from:a.from,to:a.to},{from:i.from,to:e.to}],label:{from:a.to,to:i.from},image:e.name==="Image",destination:l,highlightTags:Wo(e.node)}}function Wo(e){const n=[];for(let r=e;r!==null;r=r.parent)n.unshift(r);const t=new Set;for(const r of n){const o=Yo.getStyleTags(r);o!==null&&(r===e||o.inherit)&&o.tags.forEach(u=>t.add(u))}return[...t]}function jp(e){const n=he.syntaxTree(e);let t;return r=>{const o=Vo.get(n);return t??=o?.doc===e.doc?o.destinations:void 0,t===void 0&&(t=Gp(e,n),Vo.set(n,{doc:e.doc,destinations:t})),t.get(Ki(r))??""}}function Up(e,n,t){return e===null?"":t(n.sliceDoc(e.from+1,e.to-1))}function Gp(e,n){const t=new Map;return n.iterate({enter:r=>{if(r.name!=="LinkDefinitionID")return;const o=Ki(e.sliceDoc(r.from,r.to));if(t.has(o))return;const u=e.doc.lineAt(r.to),a=e.sliceDoc(r.node.parent?.to??r.to,u.to),i=/^:\s*(?:<([^>]*)>|(\S+))/.exec(a),c=i?.[1]??i?.[2];c!==void 0&&t.set(o,c)}}),t}function Ki(e){return e.trim().replace(/\s+/g," ").toLowerCase()}function Vp(e){const n=[];for(let t=e.firstChild;t!==null;t=t.nextSibling)t.name==="LinkMark"&&n.push(t);return n}const Wp=_.EditorView.baseTheme({"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource *":{fontSize:"0px !important",fontVariantLigatures:"none !important"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSource:has(> *)":{fontSize:"inherit !important",lineHeight:"inherit !important"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark *":{fontSize:"inherit !important",visibility:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListMark *":{fontSize:"inherit !important",visibility:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBullet":{display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Menlo, monospace",fontSize:"0.9em",pointerEvents:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenListBulletLayer, &.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteLayer":{zIndex:"0 !important"},"&.cm-md-syntaxHiddenMode *:has(> .cm-md-syntaxHiddenSource)::before":{display:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenQuoteMark + *::before":{display:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline":{height:"0",lineHeight:"0",overflow:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenSetextUnderline *::before":{display:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeStart .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeStart), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeStart":{borderTopLeftRadius:"3px",borderBottomLeftRadius:"3px",paddingInlineStart:"0.25em"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenInlineCodeEnd .cm-md-inlineCode, &.cm-md-syntaxHiddenMode .cm-md-inlineCode:has(.cm-md-syntaxHiddenInlineCodeEnd), &.cm-md-syntaxHiddenMode .cm-md-inlineCode.cm-md-syntaxHiddenInlineCodeEnd":{borderTopRightRadius:"3px",borderBottomRightRadius:"3px",paddingInlineEnd:"0.25em"},"&.cm-md-syntaxHiddenMode .cm-lineNumbers .cm-gutterElement":{overflow:"hidden"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockquoteBar":{pointerEvents:"none"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert":{display:"inline-flex",alignItems:"center",boxSizing:"border-box",height:"1em",lineHeight:"1em",verticalAlign:"middle",gap:"0.4em",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, sans-serif",fontStyle:"normal",fontWeight:"500",textIndent:"0"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:"#0969da"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:"#1a7f37"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:"#8250df"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:"#9a6700"},'&light.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:"#d1242f"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="note"]':{color:"#2f81f7"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="tip"]':{color:"#3fb950"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="important"]':{color:"#a371f7"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="warning"]':{color:"#d29922"},'&dark.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlert[data-type="caution"]':{color:"#f85149"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon":{display:"inline-block",width:"1em",height:"1em"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenAlertIcon svg":{display:"block",width:"100%",height:"100%",fill:"currentColor"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton":{display:"inline-block",appearance:"none",width:"0.9em",height:"0.9em",padding:"0",border:"0",background:"transparent",font:"inherit",marginInlineStart:"0.25em",verticalAlign:"-0.1em",cursor:"pointer"},":where(&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton)":{color:"inherit"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenLinkButton svg":{display:"block",width:"100%",height:"100%"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenHorizontalRule":{display:"inline-block",width:"100%",borderTop:"2px solid currentColor",verticalAlign:"middle",opacity:"0.35"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenImage":{display:"inline-block",maxWidth:"100%",height:"auto",verticalAlign:"middle"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath":{boxSizing:"border-box",width:"100%",paddingBlock:"0.5em",overflowX:"auto",overflowY:"hidden",textAlign:"center"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenBlockMath .katex-display":{margin:"0"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid":{boxSizing:"border-box",width:"100%",paddingBlock:"0.5em",overflowX:"auto",overflowY:"hidden",textAlign:"center"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaid svg":{display:"block",maxWidth:"100%",height:"auto",marginInline:"auto"},"&.cm-md-syntaxHiddenMode .cm-md-syntaxHiddenMermaidError":{whiteSpace:"pre-wrap",textAlign:"start"}}),Ko=_.Decoration.mark({class:"cm-md-syntaxHiddenSource"}),Kp=_.Decoration.mark({class:"cm-md-syntaxHiddenSource cm-md-syntaxHiddenQuoteMark"}),Zp=_.Decoration.mark({class:"cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenBulletMark"}),Yp=_.Decoration.mark({class:"cm-md-syntaxHiddenSource cm-md-syntaxHiddenListMark cm-md-syntaxHiddenTaskMark"}),Qp=_.Decoration.line({class:"cm-md-syntaxHiddenSetextUnderline"}),Jp=_.Decoration.mark({class:"cm-md-syntaxHiddenLinkLabel"}),Xp=_.Decoration.mark({class:"cm-md-syntaxHiddenImageLabel"}),Zi=M.Facet.define({combine:e=>e[e.length-1]??Ku}),em=[_.EditorView.editorAttributes.of({class:"cm-md-syntaxHiddenMode"}),$1,j1,_.ViewPlugin.fromClass(class{decorations;constructor(e){this.decorations=Zo(e)}update(e){(e.docChanged||e.selectionSet||e.viewportChanged||e.geometryChanged||e.transactions.some(n=>n.reconfigured))&&(this.decorations=Zo(e.view))}},{decorations:e=>e.decorations}),J1,ap,hp,Wp];function Yi(e=Ku){return[Zi.of(e),em]}const nm=Yi();function Zo(e){const n=[],t=new Set,r=e.state.facet(Zi),o=jp(e.state);for(const{from:u,to:a}of e.visibleRanges)he.syntaxTree(e.state).iterate({from:u,to:a,enter:i=>{const c=W1(i,e.state);c!==void 0&&!t.has(c.from)&&(t.add(c.from),n.push(_.Decoration.replace({widget:new Q1(c.type,c.title)}).range(c.from,c.to)));const l=K1(i,e.state);l!==void 0&&n.push(Kp.range(l.from,l.to));const d=Vi(i,e.state);if(d!==void 0){const b=d.task?Yp:Zp;n.push(b.range(d.from,d.to))}const s=$p(i,e.state,o);if(s!==void 0){const b=e.state.sliceDoc(s.label.from,s.label.to);if(r&&s.image&&s.destination!=="")n.push(_.Decoration.replace({widget:new Ep(s.destination,b)}).range(i.from,i.to));else{s.hidden.forEach(k=>n.push(Ko.range(k.from,k.to)));const g=s.image?Xp:Jp;n.push(g.range(s.label.from,s.label.to)),n.push(_.Decoration.widget({widget:new Cp(s.image?"image":"link",e.state,s.destination,b,s.highlightTags),side:-1}).range(s.label.to))}}const f=qp(i,e.state);n.push(...f);const h=Np(i,e.state);h!==void 0&&n.push(h);const p=Mp(i,e.state);p!==void 0&&n.push(Ko.range(p.from,p.to));const m=Fp(i,e.state);m!==void 0&&n.push(Qp.range(m))}});return _.Decoration.set(n,!0)}const tm=Object.freeze(Object.defineProperty({__proto__:null,createHiddenSyntaxExtension:Yi,hiddenSyntaxExtension:nm},Symbol.toStringTag,{value:"Module"}));
