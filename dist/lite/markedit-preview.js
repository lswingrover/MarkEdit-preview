"use strict";(()=>{const e=globalThis;if(typeof e.require>"u"){const n={"markedit-api":{MarkEdit:e.MarkEdit??Object.freeze({})},"@codemirror/view":{EditorView:{updateListener:{of:()=>({})}}},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})}}};e.require=t=>n[t]??{}}})();const gr=require("@codemirror/view"),B=require("markedit-api"),he=require("@codemirror/state");function Ai(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function kr(){return typeof __FILE_PATH__=="string"}function Ie(e,n=!0){const t=document.createElement("style");return t.textContent=e,document.head.appendChild(t),t.disabled=!n,t}function Kr(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function Si(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function an(e){const n=parseInt(e.dataset.lineFrom??"0"),t=parseInt(e.dataset.lineTo??"0");return{from:n,to:t}}function ct(e,n){let t=0,r=n;for(;r!==null&&r!==e;)t+=r.offsetTop,r=r.offsetParent;return t}function Ot(e,n,t,r=!0){const u=ct(e,n)+n.offsetHeight*t;it(e,u,r)}function it(e,n,t=!0){const r=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:n<=r?0:n,behavior:t?"smooth":"instant"})}function Di(e){const n=document.createRange();n.selectNodeContents(e);const t=getSelection();t?.removeAllRanges(),t?.addRange(n)}function Ti(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function rn(e,n){return e.endsWith("/")?e+n:e+"/"+n}async function Fi(e){const n=await B.MarkEdit.getFileContent(e);if(n===void 0)return{};try{const t=JSON.parse(n);return typeof t=="object"&&t!==null?t:{}}catch(t){return console.error(`Failed to parse JSON from ${e}:`,t),{}}}const Yr={};function Mi(e){let n=Yr[e];if(n)return n;n=Yr[e]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);n.push(r)}for(let t=0;t<e.length;t++){const r=e.charCodeAt(t);n[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return n}function sn(e,n){typeof n!="string"&&(n=sn.defaultChars);const t=Mi(n);return e.replace(/(%[a-f0-9]{2})+/gi,function(r){let u="";for(let o=0,c=r.length;o<c;o+=3){const a=parseInt(r.slice(o+1,o+3),16);if(a<128){u+=t[a];continue}if((a&224)===192&&o+3<c){const s=parseInt(r.slice(o+4,o+6),16);if((s&192)===128){const d=a<<6&1984|s&63;d<128?u+="��":u+=String.fromCharCode(d),o+=3;continue}}if((a&240)===224&&o+6<c){const s=parseInt(r.slice(o+4,o+6),16),d=parseInt(r.slice(o+7,o+9),16);if((s&192)===128&&(d&192)===128){const p=a<<12&61440|s<<6&4032|d&63;p<2048||p>=55296&&p<=57343?u+="���":u+=String.fromCharCode(p),o+=6;continue}}if((a&248)===240&&o+9<c){const s=parseInt(r.slice(o+4,o+6),16),d=parseInt(r.slice(o+7,o+9),16),p=parseInt(r.slice(o+10,o+12),16);if((s&192)===128&&(d&192)===128&&(p&192)===128){let l=a<<18&1835008|s<<12&258048|d<<6&4032|p&63;l<65536||l>1114111?u+="����":(l-=65536,u+=String.fromCharCode(55296+(l>>10),56320+(l&1023))),o+=9;continue}}u+="�"}return u})}sn.defaultChars=";/?:@&=+$,#";sn.componentChars="";const Jr={};function Ii(e){let n=Jr[e];if(n)return n;n=Jr[e]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);/^[0-9a-z]$/i.test(r)?n.push(r):n.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<e.length;t++)n[e.charCodeAt(t)]=e[t];return n}function Pn(e,n,t){typeof n!="string"&&(t=n,n=Pn.defaultChars),typeof t>"u"&&(t=!0);const r=Ii(n);let u="";for(let o=0,c=e.length;o<c;o++){const a=e.charCodeAt(o);if(t&&a===37&&o+2<c&&/^[0-9a-f]{2}$/i.test(e.slice(o+1,o+3))){u+=e.slice(o,o+3),o+=2;continue}if(a<128){u+=r[a];continue}if(a>=55296&&a<=57343){if(a>=55296&&a<=56319&&o+1<c){const s=e.charCodeAt(o+1);if(s>=56320&&s<=57343){u+=encodeURIComponent(e[o]+e[o+1]),o++;continue}}u+="%EF%BF%BD";continue}u+=encodeURIComponent(e[o])}return u}Pn.defaultChars=";/?:@&=+$,-_.!~*'()#";Pn.componentChars="-_.!~*'()";function yr(e){let n="";return n+=e.protocol||"",n+=e.slashes?"//":"",n+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?n+="["+e.hostname+"]":n+=e.hostname||"",n+=e.port?":"+e.port:"",n+=e.pathname||"",n+=e.search||"",n+=e.hash||"",n}function lt(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const Ri=/^([a-z0-9.+-]+:)/i,Li=/:[0-9]*$/,Ni=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,Oi=["<",">",'"',"`"," ","\r",`
`,"	"],Pi=["{","}","|","\\","^","`"].concat(Oi),Bi=["'"].concat(Pi),Qr=["%","/","?",";","#"].concat(Bi),Xr=["/","?","#"],zi=255,eu=/^[+a-z0-9A-Z_-]{0,63}$/,qi=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,nu={javascript:!0,"javascript:":!0},tu={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function xr(e,n){if(e&&e instanceof lt)return e;const t=new lt;return t.parse(e,n),t}lt.prototype.parse=function(e,n){let t,r,u,o=e;if(o=o.trim(),!n&&e.split("#").length===1){const d=Ni.exec(o);if(d)return this.pathname=d[1],d[2]&&(this.search=d[2]),this}let c=Ri.exec(o);if(c&&(c=c[0],t=c.toLowerCase(),this.protocol=c,o=o.substr(c.length)),(n||c||o.match(/^\/\/[^@\/]+@[^@\/]+/))&&(u=o.substr(0,2)==="//",u&&!(c&&nu[c])&&(o=o.substr(2),this.slashes=!0)),!nu[c]&&(u||c&&!tu[c])){let d=-1;for(let b=0;b<Xr.length;b++)r=o.indexOf(Xr[b]),r!==-1&&(d===-1||r<d)&&(d=r);let p,l;d===-1?l=o.lastIndexOf("@"):l=o.lastIndexOf("@",d),l!==-1&&(p=o.slice(0,l),o=o.slice(l+1),this.auth=p),d=-1;for(let b=0;b<Qr.length;b++)r=o.indexOf(Qr[b]),r!==-1&&(d===-1||r<d)&&(d=r);d===-1&&(d=o.length),o[d-1]===":"&&d--;const f=o.slice(0,d);o=o.slice(d),this.parseHost(f),this.hostname=this.hostname||"";const h=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!h){const b=this.hostname.split(/\./);for(let g=0,k=b.length;g<k;g++){const y=b[g];if(y&&!y.match(eu)){let w="";for(let E=0,A=y.length;E<A;E++)y.charCodeAt(E)>127?w+="x":w+=y[E];if(!w.match(eu)){const E=b.slice(0,g),A=b.slice(g+1),R=y.match(qi);R&&(E.push(R[1]),A.unshift(R[2])),A.length&&(o=A.join(".")+o),this.hostname=E.join(".");break}}}}this.hostname.length>zi&&(this.hostname=""),h&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const a=o.indexOf("#");a!==-1&&(this.hash=o.substr(a),o=o.slice(0,a));const s=o.indexOf("?");return s!==-1&&(this.search=o.substr(s),o=o.slice(0,s)),o&&(this.pathname=o),tu[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};lt.prototype.parseHost=function(e){let n=Li.exec(e);n&&(n=n[0],n!==":"&&(this.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(this.hostname=e)};const Hi=Object.freeze(Object.defineProperty({__proto__:null,decode:sn,encode:Pn,format:yr,parse:xr},Symbol.toStringTag,{value:"Module"})),Pu=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Bu=/[\0-\x1F\x7F-\x9F]/,ji=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,vr=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,zu=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,qu=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,$i=Object.freeze(Object.defineProperty({__proto__:null,Any:Pu,Cc:Bu,Cf:ji,P:vr,S:zu,Z:qu},Symbol.toStringTag,{value:"Module"})),Ui=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),Gi=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var Pt;const Vi=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),Zi=(Pt=String.fromCodePoint)!==null&&Pt!==void 0?Pt:function(e){let n="";return e>65535&&(e-=65536,n+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),n+=String.fromCharCode(e),n};function Wi(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=Vi.get(e))!==null&&n!==void 0?n:e}var ne;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(ne||(ne={}));const Ki=32;var Le;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(Le||(Le={}));function rr(e){return e>=ne.ZERO&&e<=ne.NINE}function Yi(e){return e>=ne.UPPER_A&&e<=ne.UPPER_F||e>=ne.LOWER_A&&e<=ne.LOWER_F}function Ji(e){return e>=ne.UPPER_A&&e<=ne.UPPER_Z||e>=ne.LOWER_A&&e<=ne.LOWER_Z||rr(e)}function Qi(e){return e===ne.EQUALS||Ji(e)}var ee;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(ee||(ee={}));var Te;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(Te||(Te={}));class Xi{constructor(n,t,r){this.decodeTree=n,this.emitCodePoint=t,this.errors=r,this.state=ee.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=Te.Strict}startEntity(n){this.decodeMode=n,this.state=ee.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,t){switch(this.state){case ee.EntityStart:return n.charCodeAt(t)===ne.NUM?(this.state=ee.NumericStart,this.consumed+=1,this.stateNumericStart(n,t+1)):(this.state=ee.NamedEntity,this.stateNamedEntity(n,t));case ee.NumericStart:return this.stateNumericStart(n,t);case ee.NumericDecimal:return this.stateNumericDecimal(n,t);case ee.NumericHex:return this.stateNumericHex(n,t);case ee.NamedEntity:return this.stateNamedEntity(n,t)}}stateNumericStart(n,t){return t>=n.length?-1:(n.charCodeAt(t)|Ki)===ne.LOWER_X?(this.state=ee.NumericHex,this.consumed+=1,this.stateNumericHex(n,t+1)):(this.state=ee.NumericDecimal,this.stateNumericDecimal(n,t))}addToNumericResult(n,t,r,u){if(t!==r){const o=r-t;this.result=this.result*Math.pow(u,o)+parseInt(n.substr(t,o),u),this.consumed+=o}}stateNumericHex(n,t){const r=t;for(;t<n.length;){const u=n.charCodeAt(t);if(rr(u)||Yi(u))t+=1;else return this.addToNumericResult(n,r,t,16),this.emitNumericEntity(u,3)}return this.addToNumericResult(n,r,t,16),-1}stateNumericDecimal(n,t){const r=t;for(;t<n.length;){const u=n.charCodeAt(t);if(rr(u))t+=1;else return this.addToNumericResult(n,r,t,10),this.emitNumericEntity(u,2)}return this.addToNumericResult(n,r,t,10),-1}emitNumericEntity(n,t){var r;if(this.consumed<=t)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===ne.SEMI)this.consumed+=1;else if(this.decodeMode===Te.Strict)return 0;return this.emitCodePoint(Wi(this.result),this.consumed),this.errors&&(n!==ne.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,t){const{decodeTree:r}=this;let u=r[this.treeIndex],o=(u&Le.VALUE_LENGTH)>>14;for(;t<n.length;t++,this.excess++){const c=n.charCodeAt(t);if(this.treeIndex=ea(r,u,this.treeIndex+Math.max(1,o),c),this.treeIndex<0)return this.result===0||this.decodeMode===Te.Attribute&&(o===0||Qi(c))?0:this.emitNotTerminatedNamedEntity();if(u=r[this.treeIndex],o=(u&Le.VALUE_LENGTH)>>14,o!==0){if(c===ne.SEMI)return this.emitNamedEntityData(this.treeIndex,o,this.consumed+this.excess);this.decodeMode!==Te.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;const{result:t,decodeTree:r}=this,u=(r[t]&Le.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,u,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,t,r){const{decodeTree:u}=this;return this.emitCodePoint(t===1?u[n]&~Le.VALUE_LENGTH:u[n+1],r),t===3&&this.emitCodePoint(u[n+2],r),r}end(){var n;switch(this.state){case ee.NamedEntity:return this.result!==0&&(this.decodeMode!==Te.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case ee.NumericDecimal:return this.emitNumericEntity(0,2);case ee.NumericHex:return this.emitNumericEntity(0,3);case ee.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case ee.EntityStart:return 0}}}function Hu(e){let n="";const t=new Xi(e,r=>n+=Zi(r));return function(u,o){let c=0,a=0;for(;(a=u.indexOf("&",a))>=0;){n+=u.slice(c,a),t.startEntity(o);const d=t.write(u,a+1);if(d<0){c=a+t.end();break}c=a+d,a=d===0?c+1:c}const s=n+u.slice(c);return n="",s}}function ea(e,n,t,r){const u=(n&Le.BRANCH_LENGTH)>>7,o=n&Le.JUMP_TABLE;if(u===0)return o!==0&&r===o?t:-1;if(o){const s=r-o;return s<0||s>=u?-1:e[t+s]-1}let c=t,a=c+u-1;for(;c<=a;){const s=c+a>>>1,d=e[s];if(d<r)c=s+1;else if(d>r)a=s-1;else return e[s+u]}return-1}const ju=Hu(Ui);Hu(Gi);function na(e,n=Te.Legacy){return ju(e,n)}function ta(e){return ju(e,Te.Strict)}function ra(e){return Object.prototype.toString.call(e)}function wr(e){return ra(e)==="[object String]"}const ua=Object.prototype.hasOwnProperty;function oa(e,n){return ua.call(e,n)}function kt(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!="object")throw new TypeError(t+"must be object");Object.keys(t).forEach(function(r){e[r]=t[r]})}}),e}function $u(e,n,t){return[].concat(e.slice(0,n),t,e.slice(n+1))}function Cr(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function Tn(e){if(e>65535){e-=65536;const n=55296+(e>>10),t=56320+(e&1023);return String.fromCharCode(n,t)}return String.fromCharCode(e)}const Uu=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,ia=/&([a-z#][a-z0-9]{1,31});/gi,aa=new RegExp(Uu.source+"|"+ia.source,"gi"),ca=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function la(e,n){if(n.charCodeAt(0)===35&&ca.test(n)){const r=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);return Cr(r)?Tn(r):e}const t=na(e);return t!==e?t:e}function sa(e){return e.indexOf("\\")<0?e:e.replace(Uu,"$1")}function dn(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(aa,function(n,t,r){return t||la(n,r)})}const da=/[&<>"]/,fa=/[&<>"]/g,ha={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function pa(e){return ha[e]}function Pe(e){return da.test(e)?e.replace(fa,pa):e}const ma=/[.?*+^$[\]\\(){}|-]/g;function ba(e){return e.replace(ma,"\\$&")}function V(e){switch(e){case 9:case 32:return!0}return!1}function Fn(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Gu(e){return vr.test(e)||zu.test(e)}function Mn(e){return Gu(Tn(e))}function In(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function yt(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}function ru(e){return e===32||e===9||e===10||e===13}function xt(e){let n=0;for(;n<e.length&&ru(e.charCodeAt(n));n++);let t=e.length-1;for(;t>=n&&ru(e.charCodeAt(t));t--);return e.slice(n,t+1)}const ga={mdurl:Hi,ucmicro:$i},ka=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:$u,asciiTrim:xt,assign:kt,escapeHtml:Pe,escapeRE:ba,fromCodePoint:Tn,has:oa,isMdAsciiPunct:In,isPunctChar:Gu,isPunctCharCode:Mn,isSpace:V,isString:wr,isValidEntityCode:Cr,isWhiteSpace:Fn,lib:ga,normalizeReference:yt,unescapeAll:dn,unescapeMd:sa},Symbol.toStringTag,{value:"Module"}));function ya(e,n,t){let r,u,o,c;const a=e.posMax,s=e.pos;for(e.pos=n+1,r=1;e.pos<a;){if(o=e.src.charCodeAt(e.pos),o===93&&(r--,r===0)){u=!0;break}if(c=e.pos,e.md.inline.skipToken(e),o===91){if(c===e.pos-1)r++;else if(t)return e.pos=s,-1}}let d=-1;return u&&(d=e.pos),e.pos=s,d}function xa(e,n,t){let r,u=n;const o={ok:!1,pos:0,str:""};if(e.charCodeAt(u)===60){for(u++;u<t;){if(r=e.charCodeAt(u),r===10||r===60)return o;if(r===62)return o.pos=u+1,o.str=dn(e.slice(n+1,u)),o.ok=!0,o;if(r===92&&u+1<t){u+=2;continue}u++}return o}let c=0;for(;u<t&&(r=e.charCodeAt(u),!(r===32||r<32||r===127));){if(r===92&&u+1<t){if(e.charCodeAt(u+1)===32)break;u+=2;continue}if(r===40&&(c++,c>32))return o;if(r===41){if(c===0)break;c--}u++}return n===u||c!==0||(o.str=dn(e.slice(n,u)),o.pos=u,o.ok=!0),o}function va(e,n,t,r){let u,o=n;const c={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(r)c.str=r.str,c.marker=r.marker;else{if(o>=t)return c;let a=e.charCodeAt(o);if(a!==34&&a!==39&&a!==40)return c;n++,o++,a===40&&(a=41),c.marker=a}for(;o<t;){if(u=e.charCodeAt(o),u===c.marker)return c.pos=o+1,c.str+=dn(e.slice(n,o)),c.ok=!0,c;if(u===40&&c.marker===41)return c;u===92&&o+1<t&&o++,o++}return c.can_continue=!0,c.str+=dn(e.slice(n,o)),c}const wa=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:xa,parseLinkLabel:ya,parseLinkTitle:va},Symbol.toStringTag,{value:"Module"})),ve={};ve.code_inline=function(e,n,t,r,u){const o=e[n];return"<code"+u.renderAttrs(o)+">"+Pe(o.content)+"</code>"};ve.code_block=function(e,n,t,r,u){const o=e[n];return"<pre"+u.renderAttrs(o)+"><code>"+Pe(e[n].content)+`</code></pre>
`};ve.fence=function(e,n,t,r,u){const o=e[n],c=o.info?dn(o.info).trim():"";let a="",s="";if(c){const p=c.split(/(\s+)/g);a=p[0],s=p.slice(2).join("")}let d;if(t.highlight?d=t.highlight(o.content,a,s)||Pe(o.content):d=Pe(o.content),d.indexOf("<pre")===0)return d+`
`;if(c){const p=o.attrIndex("class"),l=o.attrs?o.attrs.slice():[];p<0?l.push(["class",t.langPrefix+a]):(l[p]=l[p].slice(),l[p][1]+=" "+t.langPrefix+a);const f={attrs:l};return`<pre><code${u.renderAttrs(f)}>${d}</code></pre>
`}return`<pre><code${u.renderAttrs(o)}>${d}</code></pre>
`};ve.image=function(e,n,t,r,u){const o=e[n];return o.attrs[o.attrIndex("alt")][1]=u.renderInlineAsText(o.children,t,r),u.renderToken(e,n,t)};ve.hardbreak=function(e,n,t){return t.xhtmlOut?`<br />
`:`<br>
`};ve.softbreak=function(e,n,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};ve.text=function(e,n){return Pe(e[n].content)};ve.html_block=function(e,n){return e[n].content};ve.html_inline=function(e,n){return e[n].content};function bn(){this.rules=kt({},ve)}bn.prototype.renderAttrs=function(n){let t,r,u;if(!n.attrs)return"";for(u="",t=0,r=n.attrs.length;t<r;t++)u+=" "+Pe(n.attrs[t][0])+'="'+Pe(n.attrs[t][1])+'"';return u};bn.prototype.renderToken=function(n,t,r){const u=n[t];let o="";if(u.hidden)return"";u.block&&u.nesting!==-1&&t&&n[t-1].hidden&&(o+=`
`),o+=(u.nesting===-1?"</":"<")+u.tag,o+=this.renderAttrs(u),u.nesting===0&&r.xhtmlOut&&(o+=" /");let c=!1;if(u.block&&(c=!0,u.nesting===1&&t+1<n.length)){const a=n[t+1];(a.type==="inline"||a.hidden||a.nesting===-1&&a.tag===u.tag)&&(c=!1)}return o+=c?`>
`:">",o};bn.prototype.renderInline=function(e,n,t){let r="";const u=this.rules;for(let o=0,c=e.length;o<c;o++){const a=e[o].type;typeof u[a]<"u"?r+=u[a](e,o,n,t,this):r+=this.renderToken(e,o,n)}return r};bn.prototype.renderInlineAsText=function(e,n,t){let r="";for(let u=0,o=e.length;u<o;u++)switch(e[u].type){case"text":r+=e[u].content;break;case"image":r+=this.renderInlineAsText(e[u].children,n,t);break;case"html_inline":case"html_block":r+=e[u].content;break;case"softbreak":case"hardbreak":r+=`
`;break}return r};bn.prototype.render=function(e,n,t){let r="";const u=this.rules;for(let o=0,c=e.length;o<c;o++){const a=e[o].type;a==="inline"?r+=this.renderInline(e[o].children,n,t):typeof u[a]<"u"?r+=u[a](e,o,n,t,this):r+=this.renderToken(e,o,n,t)}return r};function ie(){this.__rules__=[],this.__cache__=null}ie.prototype.__find__=function(e){for(let n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===e)return n;return-1};ie.prototype.__compile__=function(){const e=this,n=[""];e.__rules__.forEach(function(t){t.enabled&&t.alt.forEach(function(r){n.indexOf(r)<0&&n.push(r)})}),e.__cache__={},n.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(r){r.enabled&&(t&&r.alt.indexOf(t)<0||e.__cache__[t].push(r.fn))})})};ie.prototype.at=function(e,n,t){const r=this.__find__(e),u=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__[r].fn=n,this.__rules__[r].alt=u.alt||[],this.__cache__=null};ie.prototype.before=function(e,n,t,r){const u=this.__find__(e),o=r||{};if(u===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(u,0,{name:n,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null};ie.prototype.after=function(e,n,t,r){const u=this.__find__(e),o=r||{};if(u===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(u+1,0,{name:n,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null};ie.prototype.push=function(e,n,t){const r=t||{};this.__rules__.push({name:e,enabled:!0,fn:n,alt:r.alt||[]}),this.__cache__=null};ie.prototype.enable=function(e,n){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(r){const u=this.__find__(r);if(u<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[u].enabled=!0,t.push(r)},this),this.__cache__=null,t};ie.prototype.enableOnly=function(e,n){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(t){t.enabled=!1}),this.enable(e,n)};ie.prototype.disable=function(e,n){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(r){const u=this.__find__(r);if(u<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[u].enabled=!1,t.push(r)},this),this.__cache__=null,t};ie.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function ke(e,n,t){this.type=e,this.tag=n,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}ke.prototype.attrIndex=function(n){if(!this.attrs)return-1;const t=this.attrs;for(let r=0,u=t.length;r<u;r++)if(t[r][0]===n)return r;return-1};ke.prototype.attrPush=function(n){this.attrs?this.attrs.push(n):this.attrs=[n]};ke.prototype.attrSet=function(n,t){const r=this.attrIndex(n),u=[n,t];r<0?this.attrPush(u):this.attrs[r]=u};ke.prototype.attrGet=function(n){const t=this.attrIndex(n);let r=null;return t>=0&&(r=this.attrs[t][1]),r};ke.prototype.attrJoin=function(n,t){const r=this.attrIndex(n);r<0?this.attrPush([n,t]):this.attrs[r][1]=this.attrs[r][1]+" "+t};function Vu(e,n,t){this.src=e,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=n}Vu.prototype.Token=ke;const Ca=/\r\n?|\n/g,_a=/\0/g;function Ea(e){let n;n=e.src.replace(Ca,`
`),n=n.replace(_a,"�"),e.src=n}function Aa(e){let n;e.inlineMode?(n=new e.Token("inline","",0),n.content=e.src,n.map=[0,1],n.children=[],e.tokens.push(n)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function Sa(e){const n=e.tokens;for(let t=0,r=n.length;t<r;t++){const u=n[t];u.type==="inline"&&e.md.inline.parse(u.content,e.md,e.env,u.children)}}function Da(e){return/^<a[>\s]/i.test(e)}function Ta(e){return/^<\/a\s*>/i.test(e)}function Fa(e){const n=e.tokens;if(e.md.options.linkify)for(let t=0,r=n.length;t<r;t++){if(n[t].type!=="inline"||!e.md.linkify.pretest(n[t].content))continue;let u=n[t].children,o=0;for(let c=u.length-1;c>=0;c--){const a=u[c];if(a.type==="link_close"){for(c--;u[c].level!==a.level&&u[c].type!=="link_open";)c--;continue}if(a.type==="html_inline"&&(Da(a.content)&&o>0&&o--,Ta(a.content)&&o++),!(o>0)&&a.type==="text"&&e.md.linkify.test(a.content)){const s=a.content;let d=e.md.linkify.match(s);const p=[];let l=a.level,f=0;d.length>0&&d[0].index===0&&c>0&&u[c-1].type==="text_special"&&(d=d.slice(1));for(let h=0;h<d.length;h++){const b=d[h].url,g=e.md.normalizeLink(b);if(!e.md.validateLink(g))continue;let k=d[h].text;d[h].schema?d[h].schema==="mailto:"&&!/^mailto:/i.test(k)?k=e.md.normalizeLinkText("mailto:"+k).replace(/^mailto:/,""):k=e.md.normalizeLinkText(k):k=e.md.normalizeLinkText("http://"+k).replace(/^http:\/\//,"");const y=d[h].index;if(y>f){const R=new e.Token("text","",0);R.content=s.slice(f,y),R.level=l,p.push(R)}const w=new e.Token("link_open","a",1);w.attrs=[["href",g]],w.level=l++,w.markup="linkify",w.info="auto",p.push(w);const E=new e.Token("text","",0);E.content=k,E.level=l,p.push(E);const A=new e.Token("link_close","a",-1);A.level=--l,A.markup="linkify",A.info="auto",p.push(A),f=d[h].lastIndex}if(f<s.length){const h=new e.Token("text","",0);h.content=s.slice(f),h.level=l,p.push(h)}n[t].children=u=$u(u,c,p)}}}}const Zu=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,Ma=/\((c|tm|r)\)/i,Ia=/\((c|tm|r)\)/ig,Ra={c:"©",r:"®",tm:"™"};function La(e,n){return Ra[n.toLowerCase()]}function Na(e){let n=0;for(let t=e.length-1;t>=0;t--){const r=e[t];r.type==="text"&&!n&&(r.content=r.content.replace(Ia,La)),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function Oa(e){let n=0;for(let t=e.length-1;t>=0;t--){const r=e[t];r.type==="text"&&!n&&Zu.test(r.content)&&(r.content=r.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function Pa(e){let n;if(e.md.options.typographer)for(n=e.tokens.length-1;n>=0;n--)e.tokens[n].type==="inline"&&(Ma.test(e.tokens[n].content)&&Na(e.tokens[n].children),Zu.test(e.tokens[n].content)&&Oa(e.tokens[n].children))}const Ba=/['"]/,uu=/['"]/g,ou="’";function tt(e,n,t,r){e[n]||(e[n]=[]),e[n].push({pos:t,ch:r})}function za(e,n){let t="",r=0;n.sort((u,o)=>u.pos-o.pos);for(let u=0;u<n.length;u++){const o=n[u];t+=e.slice(r,o.pos)+o.ch,r=o.pos+1}return t+e.slice(r)}function qa(e,n){let t;const r=[],u={};for(let o=0;o<e.length;o++){const c=e[o],a=e[o].level;for(t=r.length-1;t>=0&&!(r[t].level<=a);t--);if(r.length=t+1,c.type!=="text")continue;const s=c.content;let d=0;const p=s.length;e:for(;d<p;){uu.lastIndex=d;const l=uu.exec(s);if(!l)break;let f=!0,h=!0;d=l.index+1;const b=l[0]==="'";let g=32;if(l.index-1>=0)g=s.charCodeAt(l.index-1);else for(t=o-1;t>=0&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t--)if(e[t].content){g=e[t].content.charCodeAt(e[t].content.length-1);break}let k=32;if(d<p)k=s.charCodeAt(d);else for(t=o+1;t<e.length&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t++)if(e[t].content){k=e[t].content.charCodeAt(0);break}const y=In(g)||Mn(g),w=In(k)||Mn(k),E=Fn(g),A=Fn(k);if(A?f=!1:w&&(E||y||(f=!1)),E?h=!1:y&&(A||w||(h=!1)),k===34&&l[0]==='"'&&g>=48&&g<=57&&(h=f=!1),f&&h&&(f=y,h=w),!f&&!h){b&&tt(u,o,l.index,ou);continue}if(h)for(t=r.length-1;t>=0;t--){let R=r[t];if(r[t].level<a)break;if(R.single===b&&r[t].level===a){R=r[t];let N,j;b?(N=n.md.options.quotes[2],j=n.md.options.quotes[3]):(N=n.md.options.quotes[0],j=n.md.options.quotes[1]),tt(u,o,l.index,j),tt(u,R.token,R.pos,N),r.length=t;continue e}}f?r.push({token:o,pos:l.index,single:b,level:a}):h&&b&&tt(u,o,l.index,ou)}}Object.keys(u).forEach(function(o){e[o].content=za(e[o].content,u[o])})}function Ha(e){if(e.md.options.typographer)for(let n=e.tokens.length-1;n>=0;n--)e.tokens[n].type!=="inline"||!Ba.test(e.tokens[n].content)||qa(e.tokens[n].children,e)}function ja(e){let n,t;const r=e.tokens,u=r.length;for(let o=0;o<u;o++){if(r[o].type!=="inline")continue;const c=r[o].children,a=c.length;for(n=0;n<a;n++)c[n].type==="text_special"&&(c[n].type="text");for(n=t=0;n<a;n++)c[n].type==="text"&&n+1<a&&c[n+1].type==="text"?c[n+1].content=c[n].content+c[n+1].content:(n!==t&&(c[t]=c[n]),t++);n!==t&&(c.length=t)}}const Bt=[["normalize",Ea],["block",Aa],["inline",Sa],["linkify",Fa],["replacements",Pa],["smartquotes",Ha],["text_join",ja]];function _r(){this.ruler=new ie;for(let e=0;e<Bt.length;e++)this.ruler.push(Bt[e][0],Bt[e][1])}_r.prototype.process=function(e){const n=this.ruler.getRules("");for(let t=0,r=n.length;t<r;t++)n[t](e)};_r.prototype.State=Vu;function we(e,n,t,r){this.src=e,this.md=n,this.env=t,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const u=this.src;for(let o=0,c=0,a=0,s=0,d=u.length,p=!1;c<d;c++){const l=u.charCodeAt(c);if(!p)if(V(l)){a++,l===9?s+=4-s%4:s++;continue}else p=!0;(l===10||c===d-1)&&(l!==10&&c++,this.bMarks.push(o),this.eMarks.push(c),this.tShift.push(a),this.sCount.push(s),this.bsCount.push(0),p=!1,a=0,s=0,o=c+1)}this.bMarks.push(u.length),this.eMarks.push(u.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}we.prototype.push=function(e,n,t){const r=new ke(e,n,t);return r.block=!0,t<0&&this.level--,r.level=this.level,t>0&&this.level++,this.tokens.push(r),r};we.prototype.isEmpty=function(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]};we.prototype.skipEmptyLines=function(n){for(let t=this.lineMax;n<t&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n};we.prototype.skipSpaces=function(n){for(let t=this.src.length;n<t;n++){const r=this.src.charCodeAt(n);if(!V(r))break}return n};we.prototype.skipSpacesBack=function(n,t){if(n<=t)return n;for(;n>t;)if(!V(this.src.charCodeAt(--n)))return n+1;return n};we.prototype.skipChars=function(n,t){for(let r=this.src.length;n<r&&this.src.charCodeAt(n)===t;n++);return n};we.prototype.skipCharsBack=function(n,t,r){if(n<=r)return n;for(;n>r;)if(t!==this.src.charCodeAt(--n))return n+1;return n};we.prototype.getLines=function(n,t,r,u){if(n>=t)return"";const o=new Array(t-n);for(let c=0,a=n;a<t;a++,c++){let s=0;const d=this.bMarks[a];let p=d,l;for(a+1<t||u?l=this.eMarks[a]+1:l=this.eMarks[a];p<l&&s<r;){const f=this.src.charCodeAt(p);if(V(f))f===9?s+=4-(s+this.bsCount[a])%4:s++;else if(p-d<this.tShift[a])s++;else break;p++}s>r?o[c]=new Array(s-r+1).join(" ")+this.src.slice(p,l):o[c]=this.src.slice(p,l)}return o.join("")};we.prototype.Token=ke;const $a=65536;function zt(e,n){const t=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];return e.src.slice(t,r)}function iu(e){const n=[],t=e.length;let r=0,u=e.charCodeAt(r),o=!1,c=0,a="";for(;r<t;)u===124&&(o?(a+=e.substring(c,r-1),c=r):(n.push(a+e.substring(c,r)),a="",c=r+1)),o=u===92,r++,u=e.charCodeAt(r);return n.push(a+e.substring(c)),n}function Ua(e,n,t,r){if(n+2>t)return!1;let u=n+1;if(e.sCount[u]<e.blkIndent||e.sCount[u]-e.blkIndent>=4)return!1;let o=e.bMarks[u]+e.tShift[u];if(o>=e.eMarks[u])return!1;const c=e.src.charCodeAt(o++);if(c!==124&&c!==45&&c!==58||o>=e.eMarks[u])return!1;const a=e.src.charCodeAt(o++);if(a!==124&&a!==45&&a!==58&&!V(a)||c===45&&V(a))return!1;for(;o<e.eMarks[u];){const A=e.src.charCodeAt(o);if(A!==124&&A!==45&&A!==58&&!V(A))return!1;o++}let s=zt(e,n+1),d=s.split("|");const p=[];for(let A=0;A<d.length;A++){const R=d[A].trim();if(!R){if(A===0||A===d.length-1)continue;return!1}if(!/^:?-+:?$/.test(R))return!1;R.charCodeAt(R.length-1)===58?p.push(R.charCodeAt(0)===58?"center":"right"):R.charCodeAt(0)===58?p.push("left"):p.push("")}if(s=zt(e,n).trim(),s.indexOf("|")===-1||e.sCount[n]-e.blkIndent>=4)return!1;d=iu(s),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop();const l=d.length;if(l===0||l!==p.length)return!1;if(r)return!0;const f=e.parentType;e.parentType="table";const h=e.md.block.ruler.getRules("blockquote"),b=e.push("table_open","table",1),g=[n,0];b.map=g;const k=e.push("thead_open","thead",1);k.map=[n,n+1];const y=e.push("tr_open","tr",1);y.map=[n,n+1];for(let A=0;A<d.length;A++){const R=e.push("th_open","th",1);p[A]&&(R.attrs=[["style","text-align:"+p[A]]]);const N=e.push("inline","",0);N.content=d[A].trim(),N.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let w,E=0;for(u=n+2;u<t&&!(e.sCount[u]<e.blkIndent);u++){let A=!1;for(let N=0,j=h.length;N<j;N++)if(h[N](e,u,t,!0)){A=!0;break}if(A||(s=zt(e,u).trim(),!s)||e.sCount[u]-e.blkIndent>=4||(d=iu(s),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop(),E+=l-d.length,E>$a))break;if(u===n+2){const N=e.push("tbody_open","tbody",1);N.map=w=[n+2,0]}const R=e.push("tr_open","tr",1);R.map=[u,u+1];for(let N=0;N<l;N++){const j=e.push("td_open","td",1);p[N]&&(j.attrs=[["style","text-align:"+p[N]]]);const U=e.push("inline","",0);U.content=d[N]?d[N].trim():"",U.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return w&&(e.push("tbody_close","tbody",-1),w[1]=u),e.push("table_close","table",-1),g[1]=u,e.parentType=f,e.line=u,!0}function Ga(e,n,t){if(e.sCount[n]-e.blkIndent<4)return!1;let r=n+1,u=r;for(;r<t;){if(e.isEmpty(r)){r++;continue}if(e.sCount[r]-e.blkIndent>=4){r++,u=r;continue}break}e.line=u;const o=e.push("code_block","code",0);return o.content=e.getLines(n,u,4+e.blkIndent,!1)+`
`,o.map=[n,e.line],!0}function Va(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||u+3>o)return!1;const c=e.src.charCodeAt(u);if(c!==126&&c!==96)return!1;let a=u;u=e.skipChars(u,c);let s=u-a;if(s<3)return!1;const d=e.src.slice(a,u),p=e.src.slice(u,o);if(c===96&&p.indexOf(String.fromCharCode(c))>=0)return!1;if(r)return!0;let l=n,f=!1;for(;l++,!(l>=t||(u=a=e.bMarks[l]+e.tShift[l],o=e.eMarks[l],u<o&&e.sCount[l]<e.blkIndent));)if(e.src.charCodeAt(u)===c&&!(e.sCount[l]-e.blkIndent>=4)&&(u=e.skipChars(u,c),!(u-a<s)&&(u=e.skipSpaces(u),!(u<o)))){f=!0;break}s=e.sCount[n],e.line=l+(f?1:0);const h=e.push("fence","code",0);return h.info=p,h.content=e.getLines(n+1,l,s,!0),h.markup=d,h.map=[n,e.line],!0}function Za(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];const c=e.lineMax;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(u)!==62)return!1;if(r)return!0;const a=[],s=[],d=[],p=[],l=e.md.block.ruler.getRules("blockquote"),f=e.parentType;e.parentType="blockquote";let h=!1,b;for(b=n;b<t;b++){const E=e.sCount[b]<e.blkIndent;if(u=e.bMarks[b]+e.tShift[b],o=e.eMarks[b],u>=o)break;if(e.src.charCodeAt(u++)===62&&!E){let R=e.sCount[b]+1,N,j;e.src.charCodeAt(u)===32?(u++,R++,j=!1,N=!0):e.src.charCodeAt(u)===9?(N=!0,(e.bsCount[b]+R)%4===3?(u++,R++,j=!1):j=!0):N=!1;let U=R;for(a.push(e.bMarks[b]),e.bMarks[b]=u;u<o;){const Q=e.src.charCodeAt(u);if(V(Q))Q===9?U+=4-(U+e.bsCount[b]+(j?1:0))%4:U++;else break;u++}h=u>=o,s.push(e.bsCount[b]),e.bsCount[b]=e.sCount[b]+1+(N?1:0),d.push(e.sCount[b]),e.sCount[b]=U-R,p.push(e.tShift[b]),e.tShift[b]=u-e.bMarks[b];continue}if(h)break;let A=!1;for(let R=0,N=l.length;R<N;R++)if(l[R](e,b,t,!0)){A=!0;break}if(A){e.lineMax=b,e.blkIndent!==0&&(a.push(e.bMarks[b]),s.push(e.bsCount[b]),p.push(e.tShift[b]),d.push(e.sCount[b]),e.sCount[b]-=e.blkIndent);break}a.push(e.bMarks[b]),s.push(e.bsCount[b]),p.push(e.tShift[b]),d.push(e.sCount[b]),e.sCount[b]=-1}const g=e.blkIndent;e.blkIndent=0;const k=e.push("blockquote_open","blockquote",1);k.markup=">";const y=[n,0];k.map=y,e.md.block.tokenize(e,n,b);const w=e.push("blockquote_close","blockquote",-1);w.markup=">",e.lineMax=c,e.parentType=f,y[1]=e.line;for(let E=0;E<p.length;E++)e.bMarks[E+n]=a[E],e.tShift[E+n]=p[E],e.sCount[E+n]=d[E],e.bsCount[E+n]=s[E];return e.blkIndent=g,!0}function Wa(e,n,t,r){const u=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let o=e.bMarks[n]+e.tShift[n];const c=e.src.charCodeAt(o++);if(c!==42&&c!==45&&c!==95)return!1;let a=1;for(;o<u;){const d=e.src.charCodeAt(o++);if(d!==c&&!V(d))return!1;d===c&&a++}if(a<3)return!1;if(r)return!0;e.line=n+1;const s=e.push("hr","hr",0);return s.map=[n,e.line],s.markup=Array(a+1).join(String.fromCharCode(c)),!0}function au(e,n){const t=e.eMarks[n];let r=e.bMarks[n]+e.tShift[n];const u=e.src.charCodeAt(r++);if(u!==42&&u!==45&&u!==43)return-1;if(r<t){const o=e.src.charCodeAt(r);if(!V(o))return-1}return r}function cu(e,n){const t=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];let u=t;if(u+1>=r)return-1;let o=e.src.charCodeAt(u++);if(o<48||o>57)return-1;for(;;){if(u>=r)return-1;if(o=e.src.charCodeAt(u++),o>=48&&o<=57){if(u-t>=10)return-1;continue}if(o===41||o===46)break;return-1}return u<r&&(o=e.src.charCodeAt(u),!V(o))?-1:u}function Ka(e,n){const t=e.level+2;for(let r=n+2,u=e.tokens.length-2;r<u;r++)e.tokens[r].level===t&&e.tokens[r].type==="paragraph_open"&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function Ya(e,n,t,r){let u,o,c,a,s=n,d=!0;if(e.sCount[s]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[s]-e.listIndent>=4&&e.sCount[s]<e.blkIndent)return!1;let p=!1;r&&e.parentType==="paragraph"&&e.sCount[s]>=e.blkIndent&&(p=!0);let l,f,h;if((h=cu(e,s))>=0){if(l=!0,c=e.bMarks[s]+e.tShift[s],f=Number(e.src.slice(c,h-1)),p&&f!==1)return!1}else if((h=au(e,s))>=0)l=!1;else return!1;if(p&&e.skipSpaces(h)>=e.eMarks[s])return!1;if(r)return!0;const b=e.src.charCodeAt(h-1),g=e.tokens.length;l?(a=e.push("ordered_list_open","ol",1),f!==1&&(a.attrs=[["start",f]])):a=e.push("bullet_list_open","ul",1);const k=[s,0];a.map=k,a.markup=String.fromCharCode(b);let y=!1;const w=e.md.block.ruler.getRules("list"),E=e.parentType;for(e.parentType="list";s<t;){o=h,u=e.eMarks[s];const A=e.sCount[s]+h-(e.bMarks[s]+e.tShift[s]);let R=A;for(;o<u;){const de=e.src.charCodeAt(o);if(de===9)R+=4-(R+e.bsCount[s])%4;else if(de===32)R++;else break;o++}const N=o;let j;N>=u?j=1:j=R-A,j>4&&(j=1);const U=A+j;a=e.push("list_item_open","li",1),a.markup=String.fromCharCode(b);const Q=[s,0];a.map=Q,l&&(a.info=e.src.slice(c,h-1));const se=e.tight,Ce=e.tShift[s],kn=e.sCount[s],ze=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=U,e.tight=!0,e.tShift[s]=N-e.bMarks[s],e.sCount[s]=R,N>=u&&e.isEmpty(s+1)?e.line=Math.min(e.line+2,t):e.md.block.tokenize(e,s,t,!0),(!e.tight||y)&&(d=!1),y=e.line-s>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=ze,e.tShift[s]=Ce,e.sCount[s]=kn,e.tight=se,a=e.push("list_item_close","li",-1),a.markup=String.fromCharCode(b),s=e.line,Q[1]=s,s>=t||e.sCount[s]<e.blkIndent||e.sCount[s]-e.blkIndent>=4)break;let qe=!1;for(let de=0,X=w.length;de<X;de++)if(w[de](e,s,t,!0)){qe=!0;break}if(qe)break;if(l){if(h=cu(e,s),h<0)break;c=e.bMarks[s]+e.tShift[s]}else if(h=au(e,s),h<0)break;if(b!==e.src.charCodeAt(h-1))break}return l?a=e.push("ordered_list_close","ol",-1):a=e.push("bullet_list_close","ul",-1),a.markup=String.fromCharCode(b),k[1]=s,e.line=s,e.parentType=E,d&&Ka(e,g),!0}function Ja(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n],c=n+1;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(u)!==91)return!1;function a(w){const E=e.lineMax;if(w>=E||e.isEmpty(w))return null;let A=!1;if(e.sCount[w]-e.blkIndent>3&&(A=!0),e.sCount[w]<0&&(A=!0),!A){const j=e.md.block.ruler.getRules("reference"),U=e.parentType;e.parentType="reference";let Q=!1;for(let se=0,Ce=j.length;se<Ce;se++)if(j[se](e,w,E,!0)){Q=!0;break}if(e.parentType=U,Q)return null}const R=e.bMarks[w]+e.tShift[w],N=e.eMarks[w];return e.src.slice(R,N+1)}let s=e.src.slice(u,o+1);o=s.length;let d=-1;for(u=1;u<o;u++){const w=s.charCodeAt(u);if(w===91)return!1;if(w===93){d=u;break}else if(w===10){const E=a(c);E!==null&&(s+=E,o=s.length,c++)}else if(w===92&&(u++,u<o&&s.charCodeAt(u)===10)){const E=a(c);E!==null&&(s+=E,o=s.length,c++)}}if(d<0||s.charCodeAt(d+1)!==58)return!1;for(u=d+2;u<o;u++){const w=s.charCodeAt(u);if(w===10){const E=a(c);E!==null&&(s+=E,o=s.length,c++)}else if(!V(w))break}const p=e.md.helpers.parseLinkDestination(s,u,o);if(!p.ok)return!1;const l=e.md.normalizeLink(p.str);if(!e.md.validateLink(l))return!1;u=p.pos;const f=u,h=c,b=u;for(;u<o;u++){const w=s.charCodeAt(u);if(w===10){const E=a(c);E!==null&&(s+=E,o=s.length,c++)}else if(!V(w))break}let g=e.md.helpers.parseLinkTitle(s,u,o);for(;g.can_continue;){const w=a(c);if(w===null)break;s+=w,u=o,o=s.length,c++,g=e.md.helpers.parseLinkTitle(s,u,o,g)}let k;for(u<o&&b!==u&&g.ok?(k=g.str,u=g.pos):(k="",u=f,c=h);u<o;){const w=s.charCodeAt(u);if(!V(w))break;u++}if(u<o&&s.charCodeAt(u)!==10&&k)for(k="",u=f,c=h;u<o;){const w=s.charCodeAt(u);if(!V(w))break;u++}if(u<o&&s.charCodeAt(u)!==10)return!1;const y=yt(s.slice(1,d));return y?(r||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[y]>"u"&&(e.env.references[y]={title:k,href:l}),e.line=c),!0):!1}const Qa=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Xa="[a-zA-Z_:][a-zA-Z0-9:._-]*",ec="[^\"'=<>`\\x00-\\x20]+",nc="'[^']*'",tc='"[^"]*"',rc="(?:"+ec+"|"+nc+"|"+tc+")",uc="(?:\\s+"+Xa+"(?:\\s*=\\s*"+rc+")?)",Wu="<[A-Za-z][A-Za-z0-9\\-]*"+uc+"*\\s*\\/?>",Ku="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",oc="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",ic="<[?][\\s\\S]*?[?]>",ac="<![A-Za-z][^>]*>",cc="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",lc=new RegExp("^(?:"+Wu+"|"+Ku+"|"+oc+"|"+ic+"|"+ac+"|"+cc+")"),sc=new RegExp("^(?:"+Wu+"|"+Ku+")"),je=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Qa.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(sc.source+"\\s*$"),/^$/,!1]];function dc(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(u)!==60)return!1;let c=e.src.slice(u,o),a=0;for(;a<je.length&&!je[a][0].test(c);a++);if(a===je.length)return!1;if(r)return je[a][2];let s=n+1;const d=je[a][1].test("");if(!je[a][1].test(c)){for(;s<t&&!(e.sCount[s]<e.blkIndent&&(d||!e.isEmpty(s)));s++)if(u=e.bMarks[s]+e.tShift[s],o=e.eMarks[s],c=e.src.slice(u,o),je[a][1].test(c)){c.length!==0&&s++;break}}e.line=s;const p=e.push("html_block","",0);return p.map=[n,s],p.content=e.getLines(n,s,e.blkIndent,!0),!0}function fc(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let c=e.src.charCodeAt(u);if(c!==35||u>=o)return!1;let a=1;for(c=e.src.charCodeAt(++u);c===35&&u<o&&a<=6;)a++,c=e.src.charCodeAt(++u);if(a>6||u<o&&!V(c))return!1;if(r)return!0;o=e.skipSpacesBack(o,u);const s=e.skipCharsBack(o,35,u);s>u&&V(e.src.charCodeAt(s-1))&&(o=s),e.line=n+1;const d=e.push("heading_open","h"+String(a),1);d.markup="########".slice(0,a),d.map=[n,e.line];const p=e.push("inline","",0);p.content=xt(e.src.slice(u,o)),p.map=[n,e.line],p.children=[];const l=e.push("heading_close","h"+String(a),-1);return l.markup="########".slice(0,a),!0}function hc(e,n,t){const r=e.md.block.ruler.getRules("paragraph");if(e.sCount[n]-e.blkIndent>=4)return!1;const u=e.parentType;e.parentType="paragraph";let o=0,c,a=n+1;for(;a<t&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3)continue;if(e.sCount[a]>=e.blkIndent){let h=e.bMarks[a]+e.tShift[a];const b=e.eMarks[a];if(h<b&&(c=e.src.charCodeAt(h),(c===45||c===61)&&(h=e.skipChars(h,c),h=e.skipSpaces(h),h>=b))){o=c===61?1:2;break}}if(e.sCount[a]<0)continue;let f=!1;for(let h=0,b=r.length;h<b;h++)if(r[h](e,a,t,!0)){f=!0;break}if(f)break}if(!o)return e.parentType=u,!1;const s=xt(e.getLines(n,a,e.blkIndent,!1));e.line=a+1;const d=e.push("heading_open","h"+String(o),1);d.markup=String.fromCharCode(c),d.map=[n,e.line];const p=e.push("inline","",0);p.content=s,p.map=[n,e.line-1],p.children=[];const l=e.push("heading_close","h"+String(o),-1);return l.markup=String.fromCharCode(c),e.parentType=u,!0}function pc(e,n,t){const r=e.md.block.ruler.getRules("paragraph"),u=e.parentType;let o=n+1;for(e.parentType="paragraph";o<t&&!e.isEmpty(o);o++){if(e.sCount[o]-e.blkIndent>3||e.sCount[o]<0)continue;let d=!1;for(let p=0,l=r.length;p<l;p++)if(r[p](e,o,t,!0)){d=!0;break}if(d)break}const c=xt(e.getLines(n,o,e.blkIndent,!1));e.line=o;const a=e.push("paragraph_open","p",1);a.map=[n,e.line];const s=e.push("inline","",0);return s.content=c,s.map=[n,e.line],s.children=[],e.push("paragraph_close","p",-1),e.parentType=u,!0}const rt=[["table",Ua,["paragraph","reference"]],["code",Ga],["fence",Va,["paragraph","reference","blockquote","list"]],["blockquote",Za,["paragraph","reference","blockquote","list"]],["hr",Wa,["paragraph","reference","blockquote","list"]],["list",Ya,["paragraph","reference","blockquote"]],["reference",Ja],["html_block",dc,["paragraph","reference","blockquote"]],["heading",fc,["paragraph","reference","blockquote"]],["lheading",hc],["paragraph",pc]];function vt(){this.ruler=new ie;for(let e=0;e<rt.length;e++)this.ruler.push(rt[e][0],rt[e][1],{alt:(rt[e][2]||[]).slice()})}vt.prototype.tokenize=function(e,n,t){const r=this.ruler.getRules(""),u=r.length,o=e.md.options.maxNesting;let c=n,a=!1;for(;c<t&&(e.line=c=e.skipEmptyLines(c),!(c>=t||e.sCount[c]<e.blkIndent));){if(e.level>=o){e.line=t;break}const s=e.line;let d=!1;for(let p=0;p<u;p++)if(d=r[p](e,c,t,!1),d){if(s>=e.line)throw new Error("block rule didn't increment state.line");break}if(!d)throw new Error("none of the block rules matched");e.tight=!a,e.isEmpty(e.line-1)&&(a=!0),c=e.line,c<t&&e.isEmpty(c)&&(a=!0,c++,e.line=c)}};vt.prototype.parse=function(e,n,t,r){if(!e)return;const u=new this.State(e,n,t,r);this.tokenize(u,u.line,u.lineMax)};vt.prototype.State=we;function Bn(e,n,t,r){this.src=e,this.env=t,this.md=n,this.tokens=r,this.tokens_meta=Array(r.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}Bn.prototype.pushPending=function(){const e=new ke("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};Bn.prototype.push=function(e,n,t){this.pending&&this.pushPending();const r=new ke(e,n,t);let u=null;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],u={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(u),r};Bn.prototype.scanDelims=function(e,n){const t=this.posMax,r=this.src.charCodeAt(e);let u;if(e===0)u=32;else if(e===1)u=this.src.charCodeAt(0),(u&63488)===55296&&(u=65533);else if(u=this.src.charCodeAt(e-1),(u&64512)===56320){const k=this.src.charCodeAt(e-2);u=(k&64512)===55296?65536+(k-55296<<10)+(u-56320):65533}else(u&64512)===55296&&(u=65533);let o=e;for(;o<t&&this.src.charCodeAt(o)===r;)o++;const c=o-e;let a=o<t?this.src.charCodeAt(o):32;if((a&64512)===55296){const k=this.src.charCodeAt(o+1);a=(k&64512)===56320?65536+(a-55296<<10)+(k-56320):65533}else(a&64512)===56320&&(a=65533);const s=In(u)||Mn(u),d=In(a)||Mn(a),p=Fn(u),l=Fn(a),f=!l&&(!d||p||s),h=!p&&(!s||l||d);return{can_open:f&&(n||!h||s),can_close:h&&(n||!f||d),length:c}};Bn.prototype.Token=ke;function mc(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function bc(e,n){let t=e.pos;for(;t<e.posMax&&!mc(e.src.charCodeAt(t));)t++;return t===e.pos?!1:(n||(e.pending+=e.src.slice(e.pos,t)),e.pos=t,!0)}const gc=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function kc(e,n){if(!e.md.options.linkify||e.linkLevel>0)return!1;const t=e.pos,r=e.posMax;if(t+3>r||e.src.charCodeAt(t)!==58||e.src.charCodeAt(t+1)!==47||e.src.charCodeAt(t+2)!==47)return!1;const u=e.pending.match(gc);if(!u)return!1;const o=u[1],c=e.md.linkify.matchAtStart(e.src.slice(t-o.length));if(!c)return!1;let a=c.url;if(a.length<=o.length)return!1;let s=a.length;for(;s>0&&a.charCodeAt(s-1)===42;)s--;s!==a.length&&(a=a.slice(0,s));const d=e.md.normalizeLink(a);if(!e.md.validateLink(d))return!1;if(!n){e.pending=e.pending.slice(0,-o.length);const p=e.push("link_open","a",1);p.attrs=[["href",d]],p.markup="linkify",p.info="auto";const l=e.push("text","",0);l.content=e.md.normalizeLinkText(a);const f=e.push("link_close","a",-1);f.markup="linkify",f.info="auto"}return e.pos+=a.length-o.length,!0}function yc(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==10)return!1;const r=e.pending.length-1,u=e.posMax;if(!n)if(r>=0&&e.pending.charCodeAt(r)===32)if(r>=1&&e.pending.charCodeAt(r-1)===32){let o=r-1;for(;o>=1&&e.pending.charCodeAt(o-1)===32;)o--;e.pending=e.pending.slice(0,o),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(t++;t<u&&V(e.src.charCodeAt(t));)t++;return e.pos=t,!0}const Er=[];for(let e=0;e<256;e++)Er.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){Er[e.charCodeAt(0)]=1});function xc(e,n){let t=e.pos;const r=e.posMax;if(e.src.charCodeAt(t)!==92||(t++,t>=r))return!1;let u=e.src.charCodeAt(t);if(u===10){for(n||e.push("hardbreak","br",0),t++;t<r&&(u=e.src.charCodeAt(t),!!V(u));)t++;return e.pos=t,!0}let o=e.src[t];if(u>=55296&&u<=56319&&t+1<r){const a=e.src.charCodeAt(t+1);a>=56320&&a<=57343&&(o+=e.src[t+1],t++)}const c="\\"+o;if(!n){const a=e.push("text_special","",0);u<256&&Er[u]!==0?a.content=o:a.content=c,a.markup=c,a.info="escape"}return e.pos=t+1,!0}function vc(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==96)return!1;const u=t;t++;const o=e.posMax;for(;t<o&&e.src.charCodeAt(t)===96;)t++;const c=e.src.slice(u,t),a=c.length;if(e.backticksScanned&&(e.backticks[a]||0)<=u)return n||(e.pending+=c),e.pos+=a,!0;let s=t,d;for(;(d=e.src.indexOf("`",s))!==-1;){for(s=d+1;s<o&&e.src.charCodeAt(s)===96;)s++;const p=s-d;if(p===a){if(!n){const l=e.push("code_inline","code",0);l.markup=c,l.content=e.src.slice(t,d).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=s,!0}e.backticks[p]=d}return e.backticksScanned=!0,n||(e.pending+=c),e.pos+=a,!0}function wc(e,n){const t=e.pos,r=e.src.charCodeAt(t);if(n||r!==126)return!1;const u=e.scanDelims(e.pos,!0);let o=u.length;const c=String.fromCharCode(r);if(o<2)return!1;let a;o%2&&(a=e.push("text","",0),a.content=c,o--);for(let s=0;s<o;s+=2)a=e.push("text","",0),a.content=c+c,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:u.can_open,close:u.can_close});return e.pos+=u.length,!0}function lu(e,n){let t;const r=[],u=n.length;for(let o=0;o<u;o++){const c=n[o];if(c.marker!==126||c.end===-1)continue;const a=n[c.end];t=e.tokens[c.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=e.tokens[a.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",e.tokens[a.token-1].type==="text"&&e.tokens[a.token-1].content==="~"&&r.push(a.token-1)}for(;r.length;){const o=r.pop();let c=o+1;for(;c<e.tokens.length&&e.tokens[c].type==="s_close";)c++;c--,o!==c&&(t=e.tokens[c],e.tokens[c]=e.tokens[o],e.tokens[o]=t)}}function Cc(e){const n=e.tokens_meta,t=e.tokens_meta.length;lu(e,e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&lu(e,n[r].delimiters)}const Yu={tokenize:wc,postProcess:Cc};function _c(e,n){const t=e.pos,r=e.src.charCodeAt(t);if(n||r!==95&&r!==42)return!1;const u=e.scanDelims(e.pos,r===42);for(let o=0;o<u.length;o++){const c=e.push("text","",0);c.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:u.length,token:e.tokens.length-1,end:-1,open:u.can_open,close:u.can_close})}return e.pos+=u.length,!0}function su(e,n){const t=n.length;for(let r=t-1;r>=0;r--){const u=n[r];if(u.marker!==95&&u.marker!==42||u.end===-1)continue;const o=n[u.end],c=r>0&&n[r-1].end===u.end+1&&n[r-1].marker===u.marker&&n[r-1].token===u.token-1&&n[u.end+1].token===o.token+1,a=String.fromCharCode(u.marker),s=e.tokens[u.token];s.type=c?"strong_open":"em_open",s.tag=c?"strong":"em",s.nesting=1,s.markup=c?a+a:a,s.content="";const d=e.tokens[o.token];d.type=c?"strong_close":"em_close",d.tag=c?"strong":"em",d.nesting=-1,d.markup=c?a+a:a,d.content="",c&&(e.tokens[n[r-1].token].content="",e.tokens[n[u.end+1].token].content="",r--)}}function Ec(e){const n=e.tokens_meta,t=e.tokens_meta.length;su(e,e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&su(e,n[r].delimiters)}const Ju={tokenize:_c,postProcess:Ec};function Ac(e,n){let t,r,u,o,c="",a="",s=e.pos,d=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const p=e.pos,l=e.posMax,f=e.pos+1,h=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(h<0)return!1;let b=h+1;if(b<l&&e.src.charCodeAt(b)===40){for(d=!1,b++;b<l&&(t=e.src.charCodeAt(b),!(!V(t)&&t!==10));b++);if(b>=l)return!1;if(s=b,u=e.md.helpers.parseLinkDestination(e.src,b,e.posMax),u.ok){for(c=e.md.normalizeLink(u.str),e.md.validateLink(c)?b=u.pos:c="",s=b;b<l&&(t=e.src.charCodeAt(b),!(!V(t)&&t!==10));b++);if(u=e.md.helpers.parseLinkTitle(e.src,b,e.posMax),b<l&&s!==b&&u.ok)for(a=u.str,b=u.pos;b<l&&(t=e.src.charCodeAt(b),!(!V(t)&&t!==10));b++);}(b>=l||e.src.charCodeAt(b)!==41)&&(d=!0),b++}if(d){if(typeof e.env.references>"u")return!1;if(b<l&&e.src.charCodeAt(b)===91?(s=b+1,b=e.md.helpers.parseLinkLabel(e,b),b>=0?r=e.src.slice(s,b++):b=h+1):b=h+1,r||(r=e.src.slice(f,h)),o=e.env.references[yt(r)],!o)return e.pos=p,!1;c=o.href,a=o.title}if(!n){e.pos=f,e.posMax=h;const g=e.push("link_open","a",1),k=[["href",c]];g.attrs=k,a&&k.push(["title",a]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=b,e.posMax=l,!0}function Sc(e,n){let t,r,u,o,c,a,s,d,p="";const l=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const h=e.pos+2,b=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(b<0)return!1;if(o=b+1,o<f&&e.src.charCodeAt(o)===40){for(o++;o<f&&(t=e.src.charCodeAt(o),!(!V(t)&&t!==10));o++);if(o>=f)return!1;for(d=o,a=e.md.helpers.parseLinkDestination(e.src,o,e.posMax),a.ok&&(p=e.md.normalizeLink(a.str),e.md.validateLink(p)?o=a.pos:p=""),d=o;o<f&&(t=e.src.charCodeAt(o),!(!V(t)&&t!==10));o++);if(a=e.md.helpers.parseLinkTitle(e.src,o,e.posMax),o<f&&d!==o&&a.ok)for(s=a.str,o=a.pos;o<f&&(t=e.src.charCodeAt(o),!(!V(t)&&t!==10));o++);else s="";if(o>=f||e.src.charCodeAt(o)!==41)return e.pos=l,!1;o++}else{if(typeof e.env.references>"u")return!1;if(o<f&&e.src.charCodeAt(o)===91?(d=o+1,o=e.md.helpers.parseLinkLabel(e,o),o>=0?u=e.src.slice(d,o++):o=b+1):o=b+1,u||(u=e.src.slice(h,b)),c=e.env.references[yt(u)],!c)return e.pos=l,!1;p=c.href,s=c.title}if(!n){r=e.src.slice(h,b);const g=[];e.md.inline.parse(r,e.md,e.env,g);const k=e.push("image","img",0),y=[["src",p],["alt",""]];k.attrs=y,k.children=g,k.content=r,s&&y.push(["title",s])}return e.pos=o,e.posMax=f,!0}const Dc=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Tc=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Fc(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==60)return!1;const r=e.pos,u=e.posMax;for(;;){if(++t>=u)return!1;const c=e.src.charCodeAt(t);if(c===60)return!1;if(c===62)break}const o=e.src.slice(r+1,t);if(Tc.test(o)){const c=e.md.normalizeLink(o);if(!e.md.validateLink(c))return!1;if(!n){const a=e.push("link_open","a",1);a.attrs=[["href",c]],a.markup="autolink",a.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(o);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=o.length+2,!0}if(Dc.test(o)){const c=e.md.normalizeLink("mailto:"+o);if(!e.md.validateLink(c))return!1;if(!n){const a=e.push("link_open","a",1);a.attrs=[["href",c]],a.markup="autolink",a.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(o);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=o.length+2,!0}return!1}function Mc(e){return/^<a[>\s]/i.test(e)}function Ic(e){return/^<\/a\s*>/i.test(e)}function Rc(e){const n=e|32;return n>=97&&n<=122}function Lc(e,n){if(!e.md.options.html)return!1;const t=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=t)return!1;const u=e.src.charCodeAt(r+1);if(u!==33&&u!==63&&u!==47&&!Rc(u))return!1;const o=e.src.slice(r).match(lc);if(!o)return!1;if(!n){const c=e.push("html_inline","",0);c.content=o[0],Mc(c.content)&&e.linkLevel++,Ic(c.content)&&e.linkLevel--}return e.pos+=o[0].length,!0}const Nc=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Oc=/^&([a-z][a-z0-9]{1,31});/i;function Pc(e,n){const t=e.pos,r=e.posMax;if(e.src.charCodeAt(t)!==38||t+1>=r)return!1;if(e.src.charCodeAt(t+1)===35){const o=e.src.slice(t).match(Nc);if(o){if(!n){const c=o[1][0].toLowerCase()==="x"?parseInt(o[1].slice(1),16):parseInt(o[1],10),a=e.push("text_special","",0);a.content=Cr(c)?Tn(c):Tn(65533),a.markup=o[0],a.info="entity"}return e.pos+=o[0].length,!0}}else{const o=e.src.slice(t).match(Oc);if(o){const c=ta(o[0]);if(c!==o[0]){if(!n){const a=e.push("text_special","",0);a.content=c,a.markup=o[0],a.info="entity"}return e.pos+=o[0].length,!0}}}return!1}function du(e){const n={},t=e.length;if(!t)return;let r=0,u=-2;const o=[];for(let c=0;c<t;c++){const a=e[c];if(o.push(0),(e[r].marker!==a.marker||u!==a.token-1)&&(r=c),u=a.token,a.length=a.length||0,!a.close)continue;n.hasOwnProperty(a.marker)||(n[a.marker]=[-1,-1,-1,-1,-1,-1]);const s=n[a.marker][(a.open?3:0)+a.length%3];let d=r-o[r]-1,p=d;for(;d>s;d-=o[d]+1){const l=e[d];if(l.marker===a.marker&&l.open&&l.end<0){let f=!1;if((l.close||a.open)&&(l.length+a.length)%3===0&&(l.length%3!==0||a.length%3!==0)&&(f=!0),!f){const h=d>0&&!e[d-1].open?o[d-1]+1:0;o[c]=c-d+h,o[d]=h,a.open=!1,l.end=c,l.close=!1,p=-1,u=-2;break}}}p!==-1&&(n[a.marker][(a.open?3:0)+(a.length||0)%3]=p)}}function Bc(e){const n=e.tokens_meta,t=e.tokens_meta.length;du(e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&du(n[r].delimiters)}function zc(e){let n,t,r=0;const u=e.tokens,o=e.tokens.length;for(n=t=0;n<o;n++)u[n].nesting<0&&r--,u[n].level=r,u[n].nesting>0&&r++,u[n].type==="text"&&n+1<o&&u[n+1].type==="text"?u[n+1].content=u[n].content+u[n+1].content:(n!==t&&(u[t]=u[n]),t++);n!==t&&(u.length=t)}const qt=[["text",bc],["linkify",kc],["newline",yc],["escape",xc],["backticks",vc],["strikethrough",Yu.tokenize],["emphasis",Ju.tokenize],["link",Ac],["image",Sc],["autolink",Fc],["html_inline",Lc],["entity",Pc]],Ht=[["balance_pairs",Bc],["strikethrough",Yu.postProcess],["emphasis",Ju.postProcess],["fragments_join",zc]];function zn(){this.ruler=new ie;for(let e=0;e<qt.length;e++)this.ruler.push(qt[e][0],qt[e][1]);this.ruler2=new ie;for(let e=0;e<Ht.length;e++)this.ruler2.push(Ht[e][0],Ht[e][1])}zn.prototype.skipToken=function(e){const n=e.pos,t=this.ruler.getRules(""),r=t.length,u=e.md.options.maxNesting,o=e.cache;if(typeof o[n]<"u"){e.pos=o[n];return}let c=!1;if(e.level<u){for(let a=0;a<r;a++)if(e.level++,c=t[a](e,!0),e.level--,c){if(n>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;c||e.pos++,o[n]=e.pos};zn.prototype.tokenize=function(e){const n=this.ruler.getRules(""),t=n.length,r=e.posMax,u=e.md.options.maxNesting;for(;e.pos<r;){const o=e.pos;let c=!1;if(e.level<u){for(let a=0;a<t;a++)if(c=n[a](e,!1),c){if(o>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(c){if(e.pos>=r)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};zn.prototype.parse=function(e,n,t,r){const u=new this.State(e,n,t,r);this.tokenize(u);const o=this.ruler2.getRules(""),c=o.length;for(let a=0;a<c;a++)o[a](u)};zn.prototype.State=Bn;function qc(e){const n={};e=e||{},n.src_Any=Pu.source,n.src_Cc=Bu.source,n.src_Z=qu.source,n.src_P=vr.source,n.src_ZPCc=[n.src_Z,n.src_P,n.src_Cc].join("|"),n.src_ZCc=[n.src_Z,n.src_Cc].join("|");const t="[><｜]";return n.src_pseudo_letter="(?:(?!"+t+"|"+n.src_ZPCc+")"+n.src_Any+")",n.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",n.src_auth="(?:(?:(?!"+n.src_ZCc+"|[@/\\[\\]()]).)+@)?",n.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",n.src_host_terminator="(?=$|"+t+"|"+n.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+n.src_ZPCc+"))",n.src_path="(?:[/?#](?:(?!"+n.src_ZCc+"|"+t+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+n.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+n.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+n.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+n.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+n.src_ZCc+"|[']).)+\\'|\\'(?="+n.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+n.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+n.src_ZCc+"|$)|;(?!"+n.src_ZCc+"|$)|\\!+(?!"+n.src_ZCc+"|[!]|$)|\\?(?!"+n.src_ZCc+"|[?]|$))+|\\/)?",n.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',n.src_xn="xn--[a-z0-9\\-]{1,59}",n.src_domain_root="(?:"+n.src_xn+"|"+n.src_pseudo_letter+"{1,63})",n.src_domain="(?:"+n.src_xn+"|(?:"+n.src_pseudo_letter+")|(?:"+n.src_pseudo_letter+"(?:-|"+n.src_pseudo_letter+"){0,61}"+n.src_pseudo_letter+"))",n.src_host="(?:(?:(?:(?:"+n.src_domain+")\\.)*"+n.src_domain+"))",n.tpl_host_fuzzy="(?:"+n.src_ip4+"|(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%)))",n.tpl_host_no_ip_fuzzy="(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%))",n.src_host_strict=n.src_host+n.src_host_terminator,n.tpl_host_fuzzy_strict=n.tpl_host_fuzzy+n.src_host_terminator,n.src_host_port_strict=n.src_host+n.src_port+n.src_host_terminator,n.tpl_host_port_fuzzy_strict=n.tpl_host_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_port_no_ip_fuzzy_strict=n.tpl_host_no_ip_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+n.src_ZPCc+"|>|$))",n.tpl_email_fuzzy="(^|"+t+'|"|\\(|'+n.src_ZCc+")("+n.src_email_name+"@"+n.tpl_host_fuzzy_strict+")",n.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_fuzzy_strict+n.src_path+")",n.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_no_ip_fuzzy_strict+n.src_path+")",n}function ur(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(r){e[r]=t[r]})}),e}function wt(e){return Object.prototype.toString.call(e)}function Hc(e){return wt(e)==="[object String]"}function jc(e){return wt(e)==="[object Object]"}function $c(e){return wt(e)==="[object RegExp]"}function fu(e){return wt(e)==="[object Function]"}function Uc(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const Qu={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function Gc(e){return Object.keys(e||{}).reduce(function(n,t){return n||Qu.hasOwnProperty(t)},!1)}const Vc={"http:":{validate:function(e,n,t){const r=e.slice(n);return t.re.http||(t.re.http=new RegExp("^\\/\\/"+t.re.src_auth+t.re.src_host_port_strict+t.re.src_path,"i")),t.re.http.test(r)?r.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,n,t){const r=e.slice(n);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+"(?:localhost|(?:(?:"+t.re.src_domain+")\\.)+"+t.re.src_domain_root+")"+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(r)?n>=3&&e[n-3]===":"||n>=3&&e[n-3]==="/"?0:r.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(e,n,t){const r=e.slice(n);return t.re.mailto||(t.re.mailto=new RegExp("^"+t.re.src_email_name+"@"+t.re.src_host_strict,"i")),t.re.mailto.test(r)?r.match(t.re.mailto)[0].length:0}}},Zc="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",Wc="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function Kc(e){return function(n,t){const r=n.slice(t);return e.test(r)?r.match(e)[0].length:0}}function hu(){return function(e,n){n.normalize(e)}}function st(e){const n=e.re=qc(e.__opts__),t=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||t.push(Zc),t.push(n.src_xn),n.src_tlds=t.join("|");function r(a){return a.replace("%TLDS%",n.src_tlds)}n.email_fuzzy=RegExp(r(n.tpl_email_fuzzy),"i"),n.email_fuzzy_global=RegExp(r(n.tpl_email_fuzzy),"ig"),n.link_fuzzy=RegExp(r(n.tpl_link_fuzzy),"i"),n.link_fuzzy_global=RegExp(r(n.tpl_link_fuzzy),"ig"),n.link_no_ip_fuzzy=RegExp(r(n.tpl_link_no_ip_fuzzy),"i"),n.link_no_ip_fuzzy_global=RegExp(r(n.tpl_link_no_ip_fuzzy),"ig"),n.host_fuzzy_test=RegExp(r(n.tpl_host_fuzzy_test),"i");const u=[];e.__compiled__={};function o(a,s){throw new Error('(LinkifyIt) Invalid schema "'+a+'": '+s)}Object.keys(e.__schemas__).forEach(function(a){const s=e.__schemas__[a];if(s===null)return;const d={validate:null,link:null};if(e.__compiled__[a]=d,jc(s)){$c(s.validate)?d.validate=Kc(s.validate):fu(s.validate)?d.validate=s.validate:o(a,s),fu(s.normalize)?d.normalize=s.normalize:s.normalize?o(a,s):d.normalize=hu();return}if(Hc(s)){u.push(a);return}o(a,s)}),u.forEach(function(a){e.__compiled__[e.__schemas__[a]]&&(e.__compiled__[a].validate=e.__compiled__[e.__schemas__[a]].validate,e.__compiled__[a].normalize=e.__compiled__[e.__schemas__[a]].normalize)}),e.__compiled__[""]={validate:null,normalize:hu()};const c=Object.keys(e.__compiled__).filter(function(a){return a.length>0&&e.__compiled__[a]}).map(Uc).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+c+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+c+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i")}function Xu(e,n,t,r){const u=e.slice(t,r);this.schema=n.toLowerCase(),this.index=t,this.lastIndex=r,this.raw=u,this.text=u,this.url=u}function ce(e,n){if(!(this instanceof ce))return new ce(e,n);n||Gc(e)&&(n=e,e={}),this.__opts__=ur({},Qu,n),this.__schemas__=ur({},Vc,e),this.__compiled__={},this.__tlds__=Wc,this.__tlds_replaced__=!1,this.re={},st(this)}ce.prototype.add=function(n,t){return this.__schemas__[n]=t,st(this),this};ce.prototype.set=function(n){return this.__opts__=ur(this.__opts__,n),this};ce.prototype.test=function(n){if(!n.length)return!1;let t,r;if(this.re.schema_test.test(n)){for(r=this.re.schema_search,r.lastIndex=0;(t=r.exec(n))!==null;)if(this.testSchemaAt(n,t[2],r.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&n.search(this.re.host_fuzzy_test)>=0&&n.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&n.indexOf("@")>=0&&n.match(this.re.email_fuzzy)!==null)};ce.prototype.pretest=function(n){return this.re.pretest.test(n)};ce.prototype.testSchemaAt=function(n,t,r){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(n,r,this):0};ce.prototype.match=function(n){const t=[],r=[],u=[],o=[];let c,a,s;function d(f,h){return f?h?f.index!==h.index?f.index<h.index?f:h:f.lastIndex>=h.lastIndex?f:h:f:h}if(!n.length)return null;if(this.re.schema_test.test(n))for(s=this.re.schema_search,s.lastIndex=0;(c=s.exec(n))!==null;)a=this.testSchemaAt(n,c[2],s.lastIndex),a&&r.push({schema:c[2],index:c.index+c[1].length,lastIndex:c.index+c[0].length+a});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(s=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,s.lastIndex=0;(c=s.exec(n))!==null;)u.push({schema:"",index:c.index+c[1].length,lastIndex:c.index+c[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(s=this.re.email_fuzzy_global,s.lastIndex=0;(c=s.exec(n))!==null;)o.push({schema:"mailto:",index:c.index+c[1].length,lastIndex:c.index+c[0].length});const p=[0,0,0];let l=0;for(;;){const f=[r[p[0]],o[p[1]],u[p[2]]],h=d(d(f[0],f[1]),f[2]);if(!h)break;if(h===f[0]?p[0]++:h===f[1]?p[1]++:p[2]++,h.index<l)continue;const b=new Xu(n,h.schema,h.index,h.lastIndex);this.__compiled__[b.schema].normalize(b,this),t.push(b),l=h.lastIndex}return t.length?t:null};ce.prototype.matchAtStart=function(n){if(!n.length)return null;const t=this.re.schema_at_start.exec(n);if(!t)return null;const r=this.testSchemaAt(n,t[2],t[0].length);if(!r)return null;const u=new Xu(n,t[2],t.index+t[1].length,t.index+t[0].length+r);return this.__compiled__[u.schema].normalize(u,this),u};ce.prototype.tlds=function(n,t){return n=Array.isArray(n)?n:[n],t?(this.__tlds__=this.__tlds__.concat(n).sort().filter(function(r,u,o){return r!==o[u-1]}).reverse(),st(this),this):(this.__tlds__=n.slice(),this.__tlds_replaced__=!0,st(this),this)};ce.prototype.normalize=function(n){n.schema||(n.url="http://"+n.url),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url="mailto:"+n.url)};ce.prototype.onCompile=function(){};const cn=2147483647,ye=36,Ar=1,Rn=26,Yc=38,Jc=700,eo=72,no=128,to="-",Qc=/^xn--/,Xc=/[^\0-\x7F]/,el=/[\x2E\u3002\uFF0E\uFF61]/g,nl={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},jt=ye-Ar,xe=Math.floor,$t=String.fromCharCode;function Re(e){throw new RangeError(nl[e])}function tl(e,n){const t=[];let r=e.length;for(;r--;)t[r]=n(e[r]);return t}function ro(e,n){const t=e.split("@");let r="";t.length>1&&(r=t[0]+"@",e=t[1]),e=e.replace(el,".");const u=e.split("."),o=tl(u,n).join(".");return r+o}function uo(e){const n=[];let t=0;const r=e.length;for(;t<r;){const u=e.charCodeAt(t++);if(u>=55296&&u<=56319&&t<r){const o=e.charCodeAt(t++);(o&64512)==56320?n.push(((u&1023)<<10)+(o&1023)+65536):(n.push(u),t--)}else n.push(u)}return n}const rl=e=>String.fromCodePoint(...e),ul=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:ye},pu=function(e,n){return e+22+75*(e<26)-((n!=0)<<5)},oo=function(e,n,t){let r=0;for(e=t?xe(e/Jc):e>>1,e+=xe(e/n);e>jt*Rn>>1;r+=ye)e=xe(e/jt);return xe(r+(jt+1)*e/(e+Yc))},io=function(e){const n=[],t=e.length;let r=0,u=no,o=eo,c=e.lastIndexOf(to);c<0&&(c=0);for(let a=0;a<c;++a)e.charCodeAt(a)>=128&&Re("not-basic"),n.push(e.charCodeAt(a));for(let a=c>0?c+1:0;a<t;){const s=r;for(let p=1,l=ye;;l+=ye){a>=t&&Re("invalid-input");const f=ul(e.charCodeAt(a++));f>=ye&&Re("invalid-input"),f>xe((cn-r)/p)&&Re("overflow"),r+=f*p;const h=l<=o?Ar:l>=o+Rn?Rn:l-o;if(f<h)break;const b=ye-h;p>xe(cn/b)&&Re("overflow"),p*=b}const d=n.length+1;o=oo(r-s,d,s==0),xe(r/d)>cn-u&&Re("overflow"),u+=xe(r/d),r%=d,n.splice(r++,0,u)}return String.fromCodePoint(...n)},ao=function(e){const n=[];e=uo(e);const t=e.length;let r=no,u=0,o=eo;for(const s of e)s<128&&n.push($t(s));const c=n.length;let a=c;for(c&&n.push(to);a<t;){let s=cn;for(const p of e)p>=r&&p<s&&(s=p);const d=a+1;s-r>xe((cn-u)/d)&&Re("overflow"),u+=(s-r)*d,r=s;for(const p of e)if(p<r&&++u>cn&&Re("overflow"),p===r){let l=u;for(let f=ye;;f+=ye){const h=f<=o?Ar:f>=o+Rn?Rn:f-o;if(l<h)break;const b=l-h,g=ye-h;n.push($t(pu(h+b%g,0))),l=xe(b/g)}n.push($t(pu(l,0))),o=oo(u,d,a===c),u=0,++a}++u,++r}return n.join("")},ol=function(e){return ro(e,function(n){return Qc.test(n)?io(n.slice(4).toLowerCase()):n})},il=function(e){return ro(e,function(n){return Xc.test(n)?"xn--"+ao(n):n})},co={version:"2.3.1",ucs2:{decode:uo,encode:rl},decode:io,encode:ao,toASCII:il,toUnicode:ol},al={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},cl={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},ll={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},sl={default:al,zero:cl,commonmark:ll},dl=/^(vbscript|javascript|file|data):/,fl=/^data:image\/(gif|png|jpeg|webp);/;function hl(e){const n=e.trim().toLowerCase();return dl.test(n)?fl.test(n):!0}const lo=["http:","https:","mailto:"];function pl(e){const n=xr(e,!0);if(n.hostname&&(!n.protocol||lo.indexOf(n.protocol)>=0))try{n.hostname=co.toASCII(n.hostname)}catch{}return Pn(yr(n))}function ml(e){const n=xr(e,!0);if(n.hostname&&(!n.protocol||lo.indexOf(n.protocol)>=0))try{n.hostname=co.toUnicode(n.hostname)}catch{}return sn(yr(n),sn.defaultChars+"%")}function pe(e,n){if(!(this instanceof pe))return new pe(e,n);n||wr(e)||(n=e||{},e="default"),this.inline=new zn,this.block=new vt,this.core=new _r,this.renderer=new bn,this.linkify=new ce,this.validateLink=hl,this.normalizeLink=pl,this.normalizeLinkText=ml,this.utils=ka,this.helpers=kt({},wa),this.options={},this.configure(e),n&&this.set(n)}pe.prototype.set=function(e){return kt(this.options,e),this};pe.prototype.configure=function(e){const n=this;if(wr(e)){const t=e;if(e=sl[t],!e)throw new Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(t){e.components[t].rules&&n[t].ruler.enableOnly(e.components[t].rules),e.components[t].rules2&&n[t].ruler2.enableOnly(e.components[t].rules2)}),this};pe.prototype.enable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(u){t=t.concat(this[u].ruler.enable(e,!0))},this),t=t.concat(this.inline.ruler2.enable(e,!0));const r=e.filter(function(u){return t.indexOf(u)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+r);return this};pe.prototype.disable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(u){t=t.concat(this[u].ruler.disable(e,!0))},this),t=t.concat(this.inline.ruler2.disable(e,!0));const r=e.filter(function(u){return t.indexOf(u)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+r);return this};pe.prototype.use=function(e){const n=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,n),this};pe.prototype.parse=function(e,n){if(typeof e!="string")throw new Error("Input data should be a String");const t=new this.core.State(e,this,n);return this.core.process(t),t.tokens};pe.prototype.render=function(e,n){return n=n||{},this.renderer.render(this.parse(e,n),this.options,n)};pe.prototype.parseInline=function(e,n){const t=new this.core.State(e,this,n);return t.inlineMode=!0,this.core.process(t),t.tokens};pe.prototype.renderInline=function(e,n){return n=n||{},this.renderer.render(this.parseInline(e,n),this.options,n)};var mu=!1,fn={false:"push",true:"unshift",after:"push",before:"unshift"},dt={isPermalinkSymbol:!0};function or(e,n,t,r){var u;if(!mu){var o="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(o):console.warn(o),mu=!0}var c=[Object.assign(new t.Token("link_open","a",1),{attrs:[].concat(n.permalinkClass?[["class",n.permalinkClass]]:[],[["href",n.permalinkHref(e,t)]],Object.entries(n.permalinkAttrs(e,t)))}),Object.assign(new t.Token("html_block","",0),{content:n.permalinkSymbol,meta:dt}),new t.Token("link_close","a",-1)];n.permalinkSpace&&t.tokens[r+1].children[fn[n.permalinkBefore]](Object.assign(new t.Token("text","",0),{content:" "})),(u=t.tokens[r+1].children)[fn[n.permalinkBefore]].apply(u,c)}function so(e){return"#"+e}function fo(e){return{}}var bl={class:"header-anchor",symbol:"#",renderHref:so,renderAttrs:fo};function qn(e){function n(t){return t=Object.assign({},n.defaults,t),function(r,u,o,c){return e(r,t,u,o,c)}}return n.defaults=Object.assign({},bl),n.renderPermalinkImpl=e,n}function Sr(e){var n=[],t=e.filter(function(r){if(r[0]!=="class")return!0;n.push(r[1])});return n.length>0&&t.unshift(["class",n.join(" ")]),t}var Ct=qn(function(e,n,t,r,u){var o,c=[Object.assign(new r.Token("link_open","a",1),{attrs:Sr([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],n.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(n.renderAttrs(e,r))))}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:dt}),new r.Token("link_close","a",-1)];if(n.space){var a=typeof n.space=="string"?n.space:" ";r.tokens[u+1].children[fn[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:a}))}(o=r.tokens[u+1].children)[fn[n.placement]].apply(o,c)});Object.assign(Ct.defaults,{space:!0,placement:"after",ariaHidden:!1});var Ue=qn(Ct.renderPermalinkImpl);Ue.defaults=Object.assign({},Ct.defaults,{ariaHidden:!0});var ho=qn(function(e,n,t,r,u){var o=[Object.assign(new r.Token("link_open","a",1),{attrs:Sr([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],Object.entries(n.renderAttrs(e,r))))})].concat(n.safariReaderFix?[new r.Token("span_open","span",1)]:[],r.tokens[u+1].children,n.safariReaderFix?[new r.Token("span_close","span",-1)]:[],[new r.Token("link_close","a",-1)]);r.tokens[u+1]=Object.assign(new r.Token("inline","",0),{children:o})});Object.assign(ho.defaults,{safariReaderFix:!1});var bu=qn(function(e,n,t,r,u){var o;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(n.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+n.style+"`");if(!["aria-describedby","aria-labelledby"].includes(n.style)&&!n.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+n.style+"` style");if(n.style==="visually-hidden"&&!n.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var c=r.tokens[u+1].children.filter(function(l){return l.type==="text"||l.type==="code_inline"}).reduce(function(l,f){return l+f.content},""),a=[],s=[];if(n.class&&s.push(["class",n.class]),s.push(["href",n.renderHref(e,r)]),s.push.apply(s,Object.entries(n.renderAttrs(e,r))),n.style==="visually-hidden"){if(a.push(Object.assign(new r.Token("span_open","span",1),{attrs:[["class",n.visuallyHiddenClass]]}),Object.assign(new r.Token("text","",0),{content:n.assistiveText(c)}),new r.Token("span_close","span",-1)),n.space){var d=typeof n.space=="string"?n.space:" ";a[fn[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:d}))}a[fn[n.placement]](Object.assign(new r.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:dt}),new r.Token("span_close","span",-1))}else a.push(Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:dt}));n.style==="aria-label"?s.push(["aria-label",n.assistiveText(c)]):["aria-describedby","aria-labelledby"].includes(n.style)&&s.push([n.style,e]);var p=[Object.assign(new r.Token("link_open","a",1),{attrs:Sr(s)})].concat(a,[new r.Token("link_close","a",-1)]);(o=r.tokens).splice.apply(o,[u+3,0].concat(p)),n.wrapper&&(r.tokens.splice(u,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[0]+`
`})),r.tokens.splice(u+3+p.length+1,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[1]+`
`})))});function gu(e,n,t,r){var u=e,o=r;if(t&&Object.prototype.hasOwnProperty.call(n,u))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(n,u);)u=e+"-"+o,o+=1;return n[u]=!0,u}function un(e,n){n=Object.assign({},un.defaults,n),e.core.ruler.push("anchor",function(t){for(var r,u={},o=t.tokens,c=Array.isArray(n.level)?(r=n.level,function(l){return r.includes(l)}):(function(l){return function(f){return f>=l}})(n.level),a=0;a<o.length;a++){var s=o[a];if(s.type==="heading_open"&&c(Number(s.tag.substr(1)))){var d=n.getTokensText(o[a+1].children),p=s.attrGet("id");p=p==null?gu(p=n.slugifyWithState?n.slugifyWithState(d,t):n.slugify(d),u,!1,n.uniqueSlugStartIndex):gu(p,u,!0,n.uniqueSlugStartIndex),s.attrSet("id",p),n.tabIndex!==!1&&s.attrSet("tabindex",""+n.tabIndex),typeof n.permalink=="function"?n.permalink(p,n,t,a):(n.permalink||n.renderPermalink&&n.renderPermalink!==or)&&n.renderPermalink(p,n,t,a),a=o.indexOf(s),n.callback&&n.callback(s,{slug:p,title:d})}}})}Object.assign(bu.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),un.permalink={__proto__:null,legacy:or,renderHref:so,renderAttrs:fo,makePermalink:qn,linkInsideHeader:Ct,ariaHidden:Ue,headerLink:ho,linkAfterHeader:bu},un.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(n){return["text","code_inline"].includes(n.type)}).map(function(n){return n.content}).join("")},permalink:!1,renderPermalink:or,permalinkClass:Ue.defaults.class,permalinkSpace:Ue.defaults.space,permalinkSymbol:"¶",permalinkBefore:Ue.defaults.placement==="before",permalinkHref:Ue.defaults.renderHref,permalinkAttrs:Ue.defaults.renderAttrs},un.default=un;function _t(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ut,ku;function gl(){if(ku)return Ut;ku=1;function e(r,u){var o,c,a=r.attrs[r.attrIndex("href")][1];for(o=0;o<u.length;++o){if(c=u[o],typeof c.matcher=="function"){if(c.matcher(a,c))return c;continue}return c}}function n(r,u,o){Object.keys(o).forEach(function(c){var a,s=o[c];c==="className"&&(c="class"),a=u[r].attrIndex(c),a<0?u[r].attrPush([c,s]):u[r].attrs[a][1]=s})}function t(r,u){u?u=Array.isArray(u)?u:[u]:u=[],Object.freeze(u);var o=r.renderer.rules.link_open||this.defaultRender;r.renderer.rules.link_open=function(c,a,s,d,p){var l=e(c[a],u),f=l&&l.attrs;return f&&n(a,c,f),o(c,a,s,d,p)}}return t.defaultRender=function(r,u,o,c,a){return a.renderToken(r,u,o)},Ut=t,Ut}var kl=gl();const yl=_t(kl);function xl(e,n,t,r){const u=Number(e[n].meta.id+1).toString();let o="";return typeof r.docId=="string"&&(o=`-${r.docId}-`),o+u}function vl(e,n){let t=Number(e[n].meta.id+1).toString();return e[n].meta.subId>0&&(t+=`:${e[n].meta.subId}`),`[${t}]`}function wl(e,n,t,r,u){const o=u.rules.footnote_anchor_name(e,n,t,r,u),c=u.rules.footnote_caption(e,n,t,r,u);let a=o;return e[n].meta.subId>0&&(a+=`:${e[n].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${o}" id="fnref${a}">${c}</a></sup>`}function Cl(e,n,t){return(t.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function _l(){return`</ol>
</section>
`}function El(e,n,t,r,u){let o=u.rules.footnote_anchor_name(e,n,t,r,u);return e[n].meta.subId>0&&(o+=`:${e[n].meta.subId}`),`<li id="fn${o}" class="footnote-item">`}function Al(){return`</li>
`}function Sl(e,n,t,r,u){let o=u.rules.footnote_anchor_name(e,n,t,r,u);return e[n].meta.subId>0&&(o+=`:${e[n].meta.subId}`),` <a href="#fnref${o}" class="footnote-backref">↩︎</a>`}function Dl(e){const n=e.helpers.parseLinkLabel,t=e.utils.isSpace;e.renderer.rules.footnote_ref=wl,e.renderer.rules.footnote_block_open=Cl,e.renderer.rules.footnote_block_close=_l,e.renderer.rules.footnote_open=El,e.renderer.rules.footnote_close=Al,e.renderer.rules.footnote_anchor=Sl,e.renderer.rules.footnote_caption=vl,e.renderer.rules.footnote_anchor_name=xl;function r(a,s,d,p){const l=a.bMarks[s]+a.tShift[s],f=a.eMarks[s];if(l+4>f||a.src.charCodeAt(l)!==91||a.src.charCodeAt(l+1)!==94)return!1;let h;for(h=l+2;h<f;h++){if(a.src.charCodeAt(h)===32)return!1;if(a.src.charCodeAt(h)===93)break}if(h===l+2||h+1>=f||a.src.charCodeAt(++h)!==58)return!1;if(p)return!0;h++,a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.refs||(a.env.footnotes.refs={});const b=a.src.slice(l+2,h-2);a.env.footnotes.refs[`:${b}`]=-1;const g=new a.Token("footnote_reference_open","",1);g.meta={label:b},g.level=a.level++,a.tokens.push(g);const k=a.bMarks[s],y=a.tShift[s],w=a.sCount[s],E=a.parentType,A=h,R=a.sCount[s]+h-(a.bMarks[s]+a.tShift[s]);let N=R;for(;h<f;){const U=a.src.charCodeAt(h);if(t(U))U===9?N+=4-N%4:N++;else break;h++}a.tShift[s]=h-A,a.sCount[s]=N-R,a.bMarks[s]=A,a.blkIndent+=4,a.parentType="footnote",a.sCount[s]<a.blkIndent&&(a.sCount[s]+=a.blkIndent),a.md.block.tokenize(a,s,d,!0),a.parentType=E,a.blkIndent-=4,a.tShift[s]=y,a.sCount[s]=w,a.bMarks[s]=k;const j=new a.Token("footnote_reference_close","",-1);return j.level=--a.level,a.tokens.push(j),!0}function u(a,s){const d=a.posMax,p=a.pos;if(p+2>=d||a.src.charCodeAt(p)!==94||a.src.charCodeAt(p+1)!==91)return!1;const l=p+2,f=n(a,p+1);if(f<0)return!1;if(!s){a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.list||(a.env.footnotes.list=[]);const h=a.env.footnotes.list.length,b=[];a.md.inline.parse(a.src.slice(l,f),a.md,a.env,b);const g=a.push("footnote_ref","",0);g.meta={id:h},a.env.footnotes.list[h]={content:a.src.slice(l,f),tokens:b}}return a.pos=f+1,a.posMax=d,!0}function o(a,s){const d=a.posMax,p=a.pos;if(p+3>d||!a.env.footnotes||!a.env.footnotes.refs||a.src.charCodeAt(p)!==91||a.src.charCodeAt(p+1)!==94)return!1;let l;for(l=p+2;l<d;l++){if(a.src.charCodeAt(l)===32||a.src.charCodeAt(l)===10)return!1;if(a.src.charCodeAt(l)===93)break}if(l===p+2||l>=d)return!1;l++;const f=a.src.slice(p+2,l-1);if(typeof a.env.footnotes.refs[`:${f}`]>"u")return!1;if(!s){a.env.footnotes.list||(a.env.footnotes.list=[]);let h;a.env.footnotes.refs[`:${f}`]<0?(h=a.env.footnotes.list.length,a.env.footnotes.list[h]={label:f,count:0},a.env.footnotes.refs[`:${f}`]=h):h=a.env.footnotes.refs[`:${f}`];const b=a.env.footnotes.list[h].count;a.env.footnotes.list[h].count++;const g=a.push("footnote_ref","",0);g.meta={id:h,subId:b,label:f}}return a.pos=l,a.posMax=d,!0}function c(a){let s,d,p,l=!1;const f={};if(!a.env.footnotes||(a.tokens=a.tokens.filter(function(b){return b.type==="footnote_reference_open"?(l=!0,d=[],p=b.meta.label,!1):b.type==="footnote_reference_close"?(l=!1,f[":"+p]=d,!1):(l&&d.push(b),!l)}),!a.env.footnotes.list))return;const h=a.env.footnotes.list;a.tokens.push(new a.Token("footnote_block_open","",1));for(let b=0,g=h.length;b<g;b++){const k=new a.Token("footnote_open","",1);if(k.meta={id:b,label:h[b].label},a.tokens.push(k),h[b].tokens){s=[];const E=new a.Token("paragraph_open","p",1);E.block=!0,s.push(E);const A=new a.Token("inline","",0);A.children=h[b].tokens,A.content=h[b].content,s.push(A);const R=new a.Token("paragraph_close","p",-1);R.block=!0,s.push(R)}else h[b].label&&(s=f[`:${h[b].label}`]);s&&(a.tokens=a.tokens.concat(s));let y;a.tokens[a.tokens.length-1].type==="paragraph_close"?y=a.tokens.pop():y=null;const w=h[b].count>0?h[b].count:1;for(let E=0;E<w;E++){const A=new a.Token("footnote_anchor","",0);A.meta={id:b,subId:E,label:h[b].label},a.tokens.push(A)}y&&a.tokens.push(y),a.tokens.push(new a.Token("footnote_close","",-1))}a.tokens.push(new a.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",r,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",u),e.inline.ruler.after("footnote_inline","footnote_ref",o),e.core.ruler.after("inline","footnote_tail",c)}var Gt,yu;function Tl(){if(yu)return Gt;yu=1;var e=!0,n=!1,t=!1;Gt=function(g,k){k&&(e=!k.enabled,n=!!k.label,t=!!k.labelAfter),g.core.ruler.after("inline","github-task-lists",function(y){for(var w=y.tokens,E=2;E<w.length;E++)o(w,E)&&(c(w[E],y.Token),r(w[E-2],"class","task-list-item"+(e?"":" enabled")),r(w[u(w,E-2)],"class","contains-task-list"))})};function r(g,k,y){var w=g.attrIndex(k),E=[k,y];w<0?g.attrPush(E):g.attrs[w]=E}function u(g,k){for(var y=g[k].level-1,w=k-1;w>=0;w--)if(g[w].level===y)return w;return-1}function o(g,k){return l(g[k])&&f(g[k-1])&&h(g[k-2])&&b(g[k])}function c(g,k){if(g.children.unshift(a(g,k)),g.children[1].content=g.children[1].content.slice(3),g.content=g.content.slice(3),n)if(t){g.children.pop();var y="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);g.children[0].content=g.children[0].content.slice(0,-1)+' id="'+y+'">',g.children.push(p(g.content,y,k))}else g.children.unshift(s(k)),g.children.push(d(k))}function a(g,k){var y=new k("html_inline","",0),w=e?' disabled="" ':"";return g.content.indexOf("[ ] ")===0?y.content='<input class="task-list-item-checkbox"'+w+'type="checkbox">':(g.content.indexOf("[x] ")===0||g.content.indexOf("[X] ")===0)&&(y.content='<input class="task-list-item-checkbox" checked=""'+w+'type="checkbox">'),y}function s(g){var k=new g("html_inline","",0);return k.content="<label>",k}function d(g){var k=new g("html_inline","",0);return k.content="</label>",k}function p(g,k,y){var w=new y("html_inline","",0);return w.content='<label class="task-list-item-label" for="'+k+'">'+g+"</label>",w.attrs=[{for:k}],w}function l(g){return g.type==="inline"}function f(g){return g.type==="paragraph_open"}function h(g){return g.type==="list_item_open"}function b(g){return g.content.indexOf("[ ] ")===0||g.content.indexOf("[x] ")===0||g.content.indexOf("[X] ")===0}return Gt}var Fl=Tl();const Ml=_t(Fl),Il={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},Rl=(e,n={})=>{const{markers:t=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:r=Il,matchCaseSensitive:u=!1,titles:o={},classPrefix:c="markdown-alert"}=n,a=t==="*"?"\\w+":t.join("|"),s=new RegExp(`^\\\\?\\[\\!(${a})\\]([^\\n\\r]*)`,u?"":"i");e.core.ruler.after("block","github-alerts",d=>{const p=d.tokens;for(let l=0;l<p.length;l++)if(p[l].type==="blockquote_open"){const f=p[l],h=l;for(;p[l]?.type!=="blockquote_close"&&l<=p.length;)l+=1;const b=p[l],g=l,k=p.slice(h,g+1).find(R=>R.type==="inline");if(!k)continue;const y=k.content.match(s);if(!y)continue;const w=y[1].toLowerCase(),E=y[2].trim()||(o[w]??Ll(w)),A=r[w]??"";k.content=k.content.slice(y[0].length).trimStart(),f.type="alert_open",f.tag="div",f.meta={title:E,type:w,icon:A},b.type="alert_close",b.tag="div"}}),e.renderer.rules.alert_open=function(d,p){const{title:l,type:f,icon:h}=d[p].meta;return`<div class="${c} ${c}-${f}"><p class="${c}-title">${h}${l}</p>`}};function Ll(e){return e.charAt(0).toUpperCase()+e.slice(1)}var Nl=Object.create,po=Object.defineProperty,Ol=Object.getOwnPropertyDescriptor,Pl=Object.getOwnPropertyNames,Bl=Object.getPrototypeOf,zl=Object.prototype.hasOwnProperty,Z=(e,n)=>()=>(n||(e((n={exports:{}}).exports,n),e=null),n.exports),ql=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(var u=Pl(n),o=0,c=u.length,a;o<c;o++)a=u[o],!zl.call(e,a)&&a!==t&&po(e,a,{get:(s=>n[s]).bind(null,a),enumerable:!(r=Ol(n,a))||r.enumerable});return e},Hl=(e,n,t)=>(t=e!=null?Nl(Bl(e)):{},ql(po(t,"default",{value:e,enumerable:!0}),e)),Hn=Z(((e,n)=>{function t(s){return typeof s>"u"||s===null}function r(s){return typeof s=="object"&&s!==null}function u(s){return Array.isArray(s)?s:t(s)?[]:[s]}function o(s,d){if(d){const p=Object.keys(d);for(let l=0,f=p.length;l<f;l+=1){const h=p[l];s[h]=d[h]}}return s}function c(s,d){let p="";for(let l=0;l<d;l+=1)p+=s;return p}function a(s){return s===0&&Number.NEGATIVE_INFINITY===1/s}n.exports.isNothing=t,n.exports.isObject=r,n.exports.toArray=u,n.exports.repeat=c,n.exports.isNegativeZero=a,n.exports.extend=o})),jn=Z(((e,n)=>{function t(u,o){let c="";const a=u.reason||"(unknown reason)";return u.mark?(u.mark.name&&(c+='in "'+u.mark.name+'" '),c+="("+(u.mark.line+1)+":"+(u.mark.column+1)+")",!o&&u.mark.snippet&&(c+=`

`+u.mark.snippet),a+" "+c):a}function r(u,o){Error.call(this),this.name="YAMLException",this.reason=u,this.mark=o,this.message=t(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r.prototype.toString=function(o){return this.name+": "+t(this,o)},n.exports=r})),jl=Z(((e,n)=>{var t=Hn();function r(c,a,s,d,p){let l="",f="";const h=Math.floor(p/2)-1;return d-a>h&&(l=" ... ",a=d-h+l.length),s-d>h&&(f=" ...",s=d+h-f.length),{str:l+c.slice(a,s).replace(/\t/g,"→")+f,pos:d-a+l.length}}function u(c,a){return t.repeat(" ",a-c.length)+c}function o(c,a){if(a=Object.create(a||null),!c.buffer)return null;a.maxLength||(a.maxLength=79),typeof a.indent!="number"&&(a.indent=1),typeof a.linesBefore!="number"&&(a.linesBefore=3),typeof a.linesAfter!="number"&&(a.linesAfter=2);const s=/\r?\n|\r|\0/g,d=[0],p=[];let l,f=-1;for(;l=s.exec(c.buffer);)p.push(l.index),d.push(l.index+l[0].length),c.position<=l.index&&f<0&&(f=d.length-2);f<0&&(f=d.length-1);let h="";const b=Math.min(c.line+a.linesAfter,p.length).toString().length,g=a.maxLength-(a.indent+b+3);for(let y=1;y<=a.linesBefore&&!(f-y<0);y++){const w=r(c.buffer,d[f-y],p[f-y],c.position-(d[f]-d[f-y]),g);h=t.repeat(" ",a.indent)+u((c.line-y+1).toString(),b)+" | "+w.str+`
`+h}const k=r(c.buffer,d[f],p[f],c.position,g);h+=t.repeat(" ",a.indent)+u((c.line+1).toString(),b)+" | "+k.str+`
`,h+=t.repeat("-",a.indent+b+3+k.pos)+`^
`;for(let y=1;y<=a.linesAfter&&!(f+y>=p.length);y++){const w=r(c.buffer,d[f+y],p[f+y],c.position-(d[f]-d[f+y]),g);h+=t.repeat(" ",a.indent)+u((c.line+y+1).toString(),b)+" | "+w.str+`
`}return h.replace(/\n$/,"")}n.exports=o})),oe=Z(((e,n)=>{var t=jn(),r=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],u=["scalar","sequence","mapping"];function o(a){const s={};return a!==null&&Object.keys(a).forEach(function(d){a[d].forEach(function(p){s[String(p)]=d})}),s}function c(a,s){if(s=s||{},Object.keys(s).forEach(function(d){if(r.indexOf(d)===-1)throw new t('Unknown option "'+d+'" is met in definition of "'+a+'" YAML type.')}),this.options=s,this.tag=a,this.kind=s.kind||null,this.resolve=s.resolve||function(){return!0},this.construct=s.construct||function(d){return d},this.instanceOf=s.instanceOf||null,this.predicate=s.predicate||null,this.represent=s.represent||null,this.representName=s.representName||null,this.defaultStyle=s.defaultStyle||null,this.multi=s.multi||!1,this.styleAliases=o(s.styleAliases||null),u.indexOf(this.kind)===-1)throw new t('Unknown kind "'+this.kind+'" is specified for "'+a+'" YAML type.')}n.exports=c})),mo=Z(((e,n)=>{var t=jn(),r=oe();function u(a,s){const d=[];return a[s].forEach(function(p){let l=d.length;d.forEach(function(f,h){f.tag===p.tag&&f.kind===p.kind&&f.multi===p.multi&&(l=h)}),d[l]=p}),d}function o(){const a={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function s(d){d.multi?(a.multi[d.kind].push(d),a.multi.fallback.push(d)):a[d.kind][d.tag]=a.fallback[d.tag]=d}for(let d=0,p=arguments.length;d<p;d+=1)arguments[d].forEach(s);return a}function c(a){return this.extend(a)}c.prototype.extend=function(s){let d=[],p=[];if(s instanceof r)p.push(s);else if(Array.isArray(s))p=p.concat(s);else if(s&&(Array.isArray(s.implicit)||Array.isArray(s.explicit)))s.implicit&&(d=d.concat(s.implicit)),s.explicit&&(p=p.concat(s.explicit));else throw new t("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");d.forEach(function(f){if(!(f instanceof r))throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(f.loadKind&&f.loadKind!=="scalar")throw new t("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(f.multi)throw new t("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),p.forEach(function(f){if(!(f instanceof r))throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const l=Object.create(c.prototype);return l.implicit=(this.implicit||[]).concat(d),l.explicit=(this.explicit||[]).concat(p),l.compiledImplicit=u(l,"implicit"),l.compiledExplicit=u(l,"explicit"),l.compiledTypeMap=o(l.compiledImplicit,l.compiledExplicit),l},n.exports=c})),bo=Z(((e,n)=>{n.exports=new(oe())("tag:yaml.org,2002:str",{kind:"scalar",construct:function(t){return t!==null?t:""}})})),go=Z(((e,n)=>{n.exports=new(oe())("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(t){return t!==null?t:[]}})})),ko=Z(((e,n)=>{n.exports=new(oe())("tag:yaml.org,2002:map",{kind:"mapping",construct:function(t){return t!==null?t:{}}})})),yo=Z(((e,n)=>{n.exports=new(mo())({explicit:[bo(),go(),ko()]})})),xo=Z(((e,n)=>{var t=oe();function r(c){if(c===null)return!0;const a=c.length;return a===1&&c==="~"||a===4&&(c==="null"||c==="Null"||c==="NULL")}function u(){return null}function o(c){return c===null}n.exports=new t("tag:yaml.org,2002:null",{kind:"scalar",resolve:r,construct:u,predicate:o,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"})})),vo=Z(((e,n)=>{var t=oe();function r(c){if(c===null)return!1;const a=c.length;return a===4&&(c==="true"||c==="True"||c==="TRUE")||a===5&&(c==="false"||c==="False"||c==="FALSE")}function u(c){return c==="true"||c==="True"||c==="TRUE"}function o(c){return Object.prototype.toString.call(c)==="[object Boolean]"}n.exports=new t("tag:yaml.org,2002:bool",{kind:"scalar",resolve:r,construct:u,predicate:o,represent:{lowercase:function(c){return c?"true":"false"},uppercase:function(c){return c?"TRUE":"FALSE"},camelcase:function(c){return c?"True":"False"}},defaultStyle:"lowercase"})})),wo=Z(((e,n)=>{var t=Hn(),r=oe();function u(l){return l>=48&&l<=57||l>=65&&l<=70||l>=97&&l<=102}function o(l){return l>=48&&l<=55}function c(l){return l>=48&&l<=57}function a(l){if(l===null)return!1;const f=l.length;let h=0,b=!1;if(!f)return!1;let g=l[h];if((g==="-"||g==="+")&&(g=l[++h]),g==="0"){if(h+1===f)return!0;if(g=l[++h],g==="b"){for(h++;h<f;h++){if(g=l[h],g!=="0"&&g!=="1")return!1;b=!0}return b&&Number.isFinite(s(l))}if(g==="x"){for(h++;h<f;h++){if(!u(l.charCodeAt(h)))return!1;b=!0}return b&&Number.isFinite(s(l))}if(g==="o"){for(h++;h<f;h++){if(!o(l.charCodeAt(h)))return!1;b=!0}return b&&Number.isFinite(s(l))}}for(;h<f;h++){if(!c(l.charCodeAt(h)))return!1;b=!0}return b?Number.isFinite(s(l)):!1}function s(l){let f=l,h=1,b=f[0];if((b==="-"||b==="+")&&(b==="-"&&(h=-1),f=f.slice(1),b=f[0]),f==="0")return 0;if(b==="0"){if(f[1]==="b")return h*parseInt(f.slice(2),2);if(f[1]==="x")return h*parseInt(f.slice(2),16);if(f[1]==="o")return h*parseInt(f.slice(2),8)}return h*parseInt(f,10)}function d(l){return s(l)}function p(l){return Object.prototype.toString.call(l)==="[object Number]"&&l%1===0&&!t.isNegativeZero(l)}n.exports=new r("tag:yaml.org,2002:int",{kind:"scalar",resolve:a,construct:d,predicate:p,represent:{binary:function(l){return l>=0?"0b"+l.toString(2):"-0b"+l.toString(2).slice(1)},octal:function(l){return l>=0?"0o"+l.toString(8):"-0o"+l.toString(8).slice(1)},decimal:function(l){return l.toString(10)},hexadecimal:function(l){return l>=0?"0x"+l.toString(16).toUpperCase():"-0x"+l.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}})})),Co=Z(((e,n)=>{var t=Hn(),r=oe(),u=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),o=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function c(l){return l===null||!u.test(l)?!1:Number.isFinite(parseFloat(l,10))?!0:o.test(l)}function a(l){let f=l.toLowerCase();const h=f[0]==="-"?-1:1;return"+-".indexOf(f[0])>=0&&(f=f.slice(1)),f===".inf"?h===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:f===".nan"?NaN:h*parseFloat(f,10)}var s=/^[-+]?[0-9]+e/;function d(l,f){if(isNaN(l))switch(f){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===l)switch(f){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===l)switch(f){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(t.isNegativeZero(l))return"-0.0";const h=l.toString(10);return s.test(h)?h.replace("e",".e"):h}function p(l){return Object.prototype.toString.call(l)==="[object Number]"&&(l%1!==0||t.isNegativeZero(l))}n.exports=new r("tag:yaml.org,2002:float",{kind:"scalar",resolve:c,construct:a,predicate:p,represent:d,defaultStyle:"lowercase"})})),_o=Z(((e,n)=>{n.exports=yo().extend({implicit:[xo(),vo(),wo(),Co()]})})),Eo=Z(((e,n)=>{n.exports=_o()})),Ao=Z(((e,n)=>{var t=oe(),r=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),u=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function o(s){return s===null?!1:r.exec(s)!==null||u.exec(s)!==null}function c(s){let d=0,p=null,l=r.exec(s);if(l===null&&(l=u.exec(s)),l===null)throw new Error("Date resolve error");const f=+l[1],h=+l[2]-1,b=+l[3];if(!l[4])return new Date(Date.UTC(f,h,b));const g=+l[4],k=+l[5],y=+l[6];if(l[7]){for(d=l[7].slice(0,3);d.length<3;)d+="0";d=+d}if(l[9]){const E=+l[10],A=+(l[11]||0);p=(E*60+A)*6e4,l[9]==="-"&&(p=-p)}const w=new Date(Date.UTC(f,h,b,g,k,y,d));return p&&w.setTime(w.getTime()-p),w}function a(s){return s.toISOString()}n.exports=new t("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:o,construct:c,instanceOf:Date,represent:a})})),So=Z(((e,n)=>{var t=oe();function r(u){return u==="<<"||u===null}n.exports=new t("tag:yaml.org,2002:merge",{kind:"scalar",resolve:r})})),Do=Z(((e,n)=>{var t=oe(),r=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function u(s){if(s===null)return!1;let d=0;const p=s.length,l=r;for(let f=0;f<p;f++){const h=l.indexOf(s.charAt(f));if(!(h>64)){if(h<0)return!1;d+=6}}return d%8===0}function o(s){const d=s.replace(/[\r\n=]/g,""),p=d.length,l=r;let f=0;const h=[];for(let g=0;g<p;g++)g%4===0&&g&&(h.push(f>>16&255),h.push(f>>8&255),h.push(f&255)),f=f<<6|l.indexOf(d.charAt(g));const b=p%4*6;return b===0?(h.push(f>>16&255),h.push(f>>8&255),h.push(f&255)):b===18?(h.push(f>>10&255),h.push(f>>2&255)):b===12&&h.push(f>>4&255),new Uint8Array(h)}function c(s){let d="",p=0;const l=s.length,f=r;for(let b=0;b<l;b++)b%3===0&&b&&(d+=f[p>>18&63],d+=f[p>>12&63],d+=f[p>>6&63],d+=f[p&63]),p=(p<<8)+s[b];const h=l%3;return h===0?(d+=f[p>>18&63],d+=f[p>>12&63],d+=f[p>>6&63],d+=f[p&63]):h===2?(d+=f[p>>10&63],d+=f[p>>4&63],d+=f[p<<2&63],d+=f[64]):h===1&&(d+=f[p>>2&63],d+=f[p<<4&63],d+=f[64],d+=f[64]),d}function a(s){return Object.prototype.toString.call(s)==="[object Uint8Array]"}n.exports=new t("tag:yaml.org,2002:binary",{kind:"scalar",resolve:u,construct:o,predicate:a,represent:c})})),To=Z(((e,n)=>{var t=oe(),r=Object.prototype.hasOwnProperty,u=Object.prototype.toString;function o(a){if(a===null)return!0;const s=[],d=a;for(let p=0,l=d.length;p<l;p+=1){const f=d[p];let h=!1;if(u.call(f)!=="[object Object]")return!1;let b;for(b in f)if(r.call(f,b))if(!h)h=!0;else return!1;if(!h)return!1;if(s.indexOf(b)===-1)s.push(b);else return!1}return!0}function c(a){return a!==null?a:[]}n.exports=new t("tag:yaml.org,2002:omap",{kind:"sequence",resolve:o,construct:c})})),Fo=Z(((e,n)=>{var t=oe(),r=Object.prototype.toString;function u(c){if(c===null)return!0;const a=c,s=new Array(a.length);for(let d=0,p=a.length;d<p;d+=1){const l=a[d];if(r.call(l)!=="[object Object]")return!1;const f=Object.keys(l);if(f.length!==1)return!1;s[d]=[f[0],l[f[0]]]}return!0}function o(c){if(c===null)return[];const a=c,s=new Array(a.length);for(let d=0,p=a.length;d<p;d+=1){const l=a[d],f=Object.keys(l);s[d]=[f[0],l[f[0]]]}return s}n.exports=new t("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:u,construct:o})})),Mo=Z(((e,n)=>{var t=oe(),r=Object.prototype.hasOwnProperty;function u(c){if(c===null)return!0;const a=c;for(const s in a)if(r.call(a,s)&&a[s]!==null)return!1;return!0}function o(c){return c!==null?c:{}}n.exports=new t("tag:yaml.org,2002:set",{kind:"mapping",resolve:u,construct:o})})),Dr=Z(((e,n)=>{n.exports=Eo().extend({implicit:[Ao(),So()],explicit:[Do(),To(),Fo(),Mo()]})})),$l=Z(((e,n)=>{var t=Hn(),r=jn(),u=jl(),o=Dr(),c=Object.prototype.hasOwnProperty,a=1,s=2,d=3,p=4,l=1,f=2,h=3,b=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,g=/[\x85\u2028\u2029]/,k=/[,\[\]{}]/,y=/^(?:!|!!|![0-9A-Za-z-]+!)$/,w=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function E(i){return Object.prototype.toString.call(i)}function A(i){return i===10||i===13}function R(i){return i===9||i===32}function N(i){return i===9||i===32||i===10||i===13}function j(i){return i===44||i===91||i===93||i===123||i===125}function U(i){if(i>=48&&i<=57)return i-48;const x=i|32;return x>=97&&x<=102?x-97+10:-1}function Q(i){return i===120?2:i===117?4:i===85?8:0}function se(i){return i>=48&&i<=57?i-48:-1}function Ce(i){switch(i){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function kn(i){return i<=65535?String.fromCharCode(i):String.fromCharCode((i-65536>>10)+55296,(i-65536&1023)+56320)}function ze(i,x,_){x==="__proto__"?Object.defineProperty(i,x,{configurable:!0,enumerable:!0,writable:!0,value:_}):i[x]=_}var qe=new Array(256),de=new Array(256);for(let i=0;i<256;i++)qe[i]=Ce(i)?1:0,de[i]=Ce(i);function X(i,x){this.input=i,this.filename=x.filename||null,this.schema=x.schema||o,this.onWarning=x.onWarning||null,this.legacy=x.legacy||!1,this.json=x.json||!1,this.listener=x.listener||null,this.maxDepth=typeof x.maxDepth=="number"?x.maxDepth:100,this.maxMergeSeqLength=typeof x.maxMergeSeqLength=="number"?x.maxMergeSeqLength:20,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=i.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function Gn(i,x){const _={name:i.filename,buffer:i.input.slice(0,-1),position:i.position,line:i.line,column:i.position-i.lineStart};return _.snippet=u(_),new r(x,_)}function z(i,x){throw Gn(i,x)}function Je(i,x){i.onWarning&&i.onWarning.call(null,Gn(i,x))}function _e(i,x,_){const T=i.anchorMapTransactions;if(T.length!==0){const C=T[T.length-1];c.call(C,x)||(C[x]={existed:c.call(i.anchorMap,x),value:i.anchorMap[x]})}i.anchorMap[x]=_}function Ft(i){i.anchorMapTransactions.push(Object.create(null))}function He(i){const x=i.anchorMapTransactions.pop(),_=i.anchorMapTransactions;if(_.length===0)return;const T=_[_.length-1],C=Object.keys(x);for(let L=0,m=C.length;L<m;L+=1){const v=C[L];c.call(T,v)||(T[v]=x[v])}}function Mt(i){const x=i.anchorMapTransactions.pop(),_=Object.keys(x);for(let T=_.length-1;T>=0;T-=1){const C=x[_[T]];C.existed?i.anchorMap[_[T]]=C.value:delete i.anchorMap[_[T]]}}function yn(i){return{position:i.position,line:i.line,lineStart:i.lineStart,lineIndent:i.lineIndent,firstTabInLine:i.firstTabInLine,tag:i.tag,anchor:i.anchor,kind:i.kind,result:i.result}}function Qe(i,x){i.position=x.position,i.line=x.line,i.lineStart=x.lineStart,i.lineIndent=x.lineIndent,i.firstTabInLine=x.firstTabInLine,i.tag=x.tag,i.anchor=x.anchor,i.kind=x.kind,i.result=x.result}var Vn={YAML:function(x,_,T){x.version!==null&&z(x,"duplication of %YAML directive"),T.length!==1&&z(x,"YAML directive accepts exactly one argument");const C=/^([0-9]+)\.([0-9]+)$/.exec(T[0]);C===null&&z(x,"ill-formed argument of the YAML directive");const L=parseInt(C[1],10),m=parseInt(C[2],10);L!==1&&z(x,"unacceptable YAML version of the document"),x.version=T[0],x.checkLineBreaks=m<2,m!==1&&m!==2&&Je(x,"unsupported YAML version of the document")},TAG:function(x,_,T){let C;T.length!==2&&z(x,"TAG directive accepts exactly two arguments");const L=T[0];C=T[1],y.test(L)||z(x,"ill-formed tag handle (first argument) of the TAG directive"),c.call(x.tagMap,L)&&z(x,'there is a previously declared suffix for "'+L+'" tag handle'),w.test(C)||z(x,"ill-formed tag prefix (second argument) of the TAG directive");try{C=decodeURIComponent(C)}catch{z(x,"tag prefix is malformed: "+C)}x.tagMap[L]=C}};function ae(i,x,_,T){if(x<_){const C=i.input.slice(x,_);if(T)for(let L=0,m=C.length;L<m;L+=1){const v=C.charCodeAt(L);v===9||v>=32&&v<=1114111||z(i,"expected valid JSON character")}else b.test(C)&&z(i,"the stream contains non-printable characters");i.result+=C}}function Me(i,x,_,T){t.isObject(_)||z(i,"cannot merge mappings; the provided source object is unacceptable");const C=Object.keys(_);for(let L=0,m=C.length;L<m;L+=1){const v=C[L];c.call(x,v)||(ze(x,v,_[v]),T[v]=!0)}}function Ee(i,x,_,T,C,L,m,v,I){if(Array.isArray(C)){C=Array.prototype.slice.call(C);for(let S=0,D=C.length;S<D;S+=1)Array.isArray(C[S])&&z(i,"nested arrays are not supported inside keys"),typeof C=="object"&&E(C[S])==="[object Object]"&&(C[S]="[object Object]")}if(typeof C=="object"&&E(C)==="[object Object]"&&(C="[object Object]"),C=String(C),x===null&&(x={}),T==="tag:yaml.org,2002:merge")if(Array.isArray(L)){L.length>i.maxMergeSeqLength&&z(i,"merge sequence length exceeded maxMergeSeqLength ("+i.maxMergeSeqLength+")");const S=new Set;for(let D=0,M=L.length;D<M;D+=1){const F=L[D];S.has(F)||(S.add(F),Me(i,x,F,_))}}else Me(i,x,L,_);else!i.json&&!c.call(_,C)&&c.call(x,C)&&(i.line=m||i.line,i.lineStart=v||i.lineStart,i.position=I||i.position,z(i,"duplicated mapping key")),ze(x,C,L),delete _[C];return x}function Xe(i){const x=i.input.charCodeAt(i.position);x===10?i.position++:x===13?(i.position++,i.input.charCodeAt(i.position)===10&&i.position++):z(i,"a line break is expected"),i.line+=1,i.lineStart=i.position,i.firstTabInLine=-1}function Y(i,x,_){let T=0,C=i.input.charCodeAt(i.position);for(;C!==0;){for(;R(C);)C===9&&i.firstTabInLine===-1&&(i.firstTabInLine=i.position),C=i.input.charCodeAt(++i.position);if(x&&C===35)do C=i.input.charCodeAt(++i.position);while(C!==10&&C!==13&&C!==0);if(A(C))for(Xe(i),C=i.input.charCodeAt(i.position),T++,i.lineIndent=0;C===32;)i.lineIndent++,C=i.input.charCodeAt(++i.position);else break}return _!==-1&&T!==0&&i.lineIndent<_&&Je(i,"deficient indentation"),T}function en(i){let x=i.position,_=i.input.charCodeAt(x);return!!((_===45||_===46)&&_===i.input.charCodeAt(x+1)&&_===i.input.charCodeAt(x+2)&&(x+=3,_=i.input.charCodeAt(x),_===0||N(_)))}function Ae(i,x){x===1?i.result+=" ":x>1&&(i.result+=t.repeat(`
`,x-1))}function Zn(i,x,_){let T,C,L,m,v,I;const S=i.kind,D=i.result;let M=i.input.charCodeAt(i.position);if(N(M)||j(M)||M===35||M===38||M===42||M===33||M===124||M===62||M===39||M===34||M===37||M===64||M===96)return!1;if(M===63||M===45){const F=i.input.charCodeAt(i.position+1);if(N(F)||_&&j(F))return!1}for(i.kind="scalar",i.result="",T=C=i.position,L=!1;M!==0;){if(M===58){const F=i.input.charCodeAt(i.position+1);if(N(F)||_&&j(F))break}else if(M===35){if(N(i.input.charCodeAt(i.position-1)))break}else{if(i.position===i.lineStart&&en(i)||_&&j(M))break;if(A(M))if(m=i.line,v=i.lineStart,I=i.lineIndent,Y(i,!1,-1),i.lineIndent>=x){L=!0,M=i.input.charCodeAt(i.position);continue}else{i.position=C,i.line=m,i.lineStart=v,i.lineIndent=I;break}}L&&(ae(i,T,C,!1),Ae(i,i.line-m),T=C=i.position,L=!1),R(M)||(C=i.position+1),M=i.input.charCodeAt(++i.position)}return ae(i,T,C,!1),i.result?!0:(i.kind=S,i.result=D,!1)}function Wn(i,x){let _,T,C=i.input.charCodeAt(i.position);if(C!==39)return!1;for(i.kind="scalar",i.result="",i.position++,_=T=i.position;(C=i.input.charCodeAt(i.position))!==0;)if(C===39)if(ae(i,_,i.position,!0),C=i.input.charCodeAt(++i.position),C===39)_=i.position,i.position++,T=i.position;else return!0;else A(C)?(ae(i,_,T,!0),Ae(i,Y(i,!1,x)),_=T=i.position):i.position===i.lineStart&&en(i)?z(i,"unexpected end of the document within a single quoted scalar"):(i.position++,R(C)||(T=i.position));z(i,"unexpected end of the stream within a single quoted scalar")}function xn(i,x){let _,T,C,L=i.input.charCodeAt(i.position);if(L!==34)return!1;for(i.kind="scalar",i.result="",i.position++,_=T=i.position;(L=i.input.charCodeAt(i.position))!==0;){if(L===34)return ae(i,_,i.position,!0),i.position++,!0;if(L===92){if(ae(i,_,i.position,!0),L=i.input.charCodeAt(++i.position),A(L))Y(i,!1,x);else if(L<256&&qe[L])i.result+=de[L],i.position++;else if((C=Q(L))>0){let m=C,v=0;for(;m>0;m--)L=i.input.charCodeAt(++i.position),(C=U(L))>=0?v=(v<<4)+C:z(i,"expected hexadecimal character");i.result+=kn(v),i.position++}else z(i,"unknown escape sequence");_=T=i.position}else A(L)?(ae(i,_,T,!0),Ae(i,Y(i,!1,x)),_=T=i.position):i.position===i.lineStart&&en(i)?z(i,"unexpected end of the document within a double quoted scalar"):(i.position++,R(L)||(T=i.position))}z(i,"unexpected end of the stream within a double quoted scalar")}function Kn(i,x){let _=!0,T,C,L;const m=i.tag;let v;const I=i.anchor;let S,D,M,F;const P=Object.create(null);let O,q,H,$=i.input.charCodeAt(i.position);if($===91)S=93,F=!1,v=[];else if($===123)S=125,F=!0,v={};else return!1;for(i.anchor!==null&&_e(i,i.anchor,v),$=i.input.charCodeAt(++i.position);$!==0;){if(Y(i,!0,x),$=i.input.charCodeAt(i.position),$===S)return i.position++,i.tag=m,i.anchor=I,i.kind=F?"mapping":"sequence",i.result=v,!0;_?$===44&&z(i,"expected the node content, but found ','"):z(i,"missed comma between flow collection entries"),q=O=H=null,D=M=!1,$===63&&N(i.input.charCodeAt(i.position+1))&&(D=M=!0,i.position++,Y(i,!0,x)),T=i.line,C=i.lineStart,L=i.position,De(i,x,a,!1,!0),q=i.tag,O=i.result,Y(i,!0,x),$=i.input.charCodeAt(i.position),(M||i.line===T)&&$===58&&(D=!0,$=i.input.charCodeAt(++i.position),Y(i,!0,x),De(i,x,a,!1,!0),H=i.result),F?Ee(i,v,P,q,O,H,T,C,L):D?v.push(Ee(i,null,P,q,O,H,T,C,L)):v.push(O),Y(i,!0,x),$=i.input.charCodeAt(i.position),$===44?(_=!0,$=i.input.charCodeAt(++i.position)):_=!1}z(i,"unexpected end of the stream within a flow collection")}function Yn(i,x){let _,T=l,C=!1,L=!1,m=x,v=0,I=!1,S,D=i.input.charCodeAt(i.position);if(D===124)_=!1;else if(D===62)_=!0;else return!1;for(i.kind="scalar",i.result="";D!==0;)if(D=i.input.charCodeAt(++i.position),D===43||D===45)l===T?T=D===43?h:f:z(i,"repeat of a chomping mode identifier");else if((S=se(D))>=0)S===0?z(i,"bad explicit indentation width of a block scalar; it cannot be less than one"):L?z(i,"repeat of an indentation width identifier"):(m=x+S-1,L=!0);else break;if(R(D)){do D=i.input.charCodeAt(++i.position);while(R(D));if(D===35)do D=i.input.charCodeAt(++i.position);while(!A(D)&&D!==0)}for(;D!==0;){for(Xe(i),i.lineIndent=0,D=i.input.charCodeAt(i.position);(!L||i.lineIndent<m)&&D===32;)i.lineIndent++,D=i.input.charCodeAt(++i.position);if(!L&&i.lineIndent>m&&(m=i.lineIndent),A(D)){v++;continue}if(!L&&m===0&&z(i,"missing indentation for block scalar"),i.lineIndent<m){T===h?i.result+=t.repeat(`
`,C?1+v:v):T===l&&C&&(i.result+=`
`);break}_?R(D)?(I=!0,i.result+=t.repeat(`
`,C?1+v:v)):I?(I=!1,i.result+=t.repeat(`
`,v+1)):v===0?C&&(i.result+=" "):i.result+=t.repeat(`
`,v):i.result+=t.repeat(`
`,C?1+v:v),C=!0,L=!0,v=0;const M=i.position;for(;!A(D)&&D!==0;)D=i.input.charCodeAt(++i.position);ae(i,M,i.position,!1)}return!0}function Se(i,x){const _=i.tag,T=i.anchor,C=[];let L=!1;if(i.firstTabInLine!==-1)return!1;i.anchor!==null&&_e(i,i.anchor,C);let m=i.input.charCodeAt(i.position);for(;m!==0&&(i.firstTabInLine!==-1&&(i.position=i.firstTabInLine,z(i,"tab characters must not be used in indentation")),!(m!==45||!N(i.input.charCodeAt(i.position+1))));){if(L=!0,i.position++,Y(i,!0,-1)&&i.lineIndent<=x){C.push(null),m=i.input.charCodeAt(i.position);continue}const v=i.line;if(De(i,x,d,!1,!0),C.push(i.result),Y(i,!0,-1),m=i.input.charCodeAt(i.position),(i.line===v||i.lineIndent>x)&&m!==0)z(i,"bad indentation of a sequence entry");else if(i.lineIndent<x)break}return L?(i.tag=_,i.anchor=T,i.kind="sequence",i.result=C,!0):!1}function Jn(i,x,_){let T,C,L,m;const v=i.tag,I=i.anchor,S={},D=Object.create(null);let M=null,F=null,P=null,O=!1,q=!1;if(i.firstTabInLine!==-1)return!1;i.anchor!==null&&_e(i,i.anchor,S);let H=i.input.charCodeAt(i.position);for(;H!==0;){!O&&i.firstTabInLine!==-1&&(i.position=i.firstTabInLine,z(i,"tab characters must not be used in indentation"));const $=i.input.charCodeAt(i.position+1),W=i.line;if((H===63||H===58)&&N($))H===63?(O&&(Ee(i,S,D,M,F,null,C,L,m),M=F=P=null),q=!0,O=!0,T=!0):O?(O=!1,T=!0):z(i,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),i.position+=1,H=$;else{if(C=i.line,L=i.lineStart,m=i.position,!De(i,_,s,!1,!0))break;if(i.line===W){for(H=i.input.charCodeAt(i.position);R(H);)H=i.input.charCodeAt(++i.position);if(H===58)H=i.input.charCodeAt(++i.position),N(H)||z(i,"a whitespace character is expected after the key-value separator within a block mapping"),O&&(Ee(i,S,D,M,F,null,C,L,m),M=F=P=null),q=!0,O=!1,T=!1,M=i.tag,F=i.result;else if(q)z(i,"can not read an implicit mapping pair; a colon is missed");else return i.tag=v,i.anchor=I,!0}else if(q)z(i,"can not read a block mapping entry; a multiline key may not be an implicit key");else return i.tag=v,i.anchor=I,!0}if((i.line===W||i.lineIndent>x)&&(O&&(C=i.line,L=i.lineStart,m=i.position),De(i,x,p,!0,T)&&(O?F=i.result:P=i.result),O||(Ee(i,S,D,M,F,P,C,L,m),M=F=P=null),Y(i,!0,-1),H=i.input.charCodeAt(i.position)),(i.line===W||i.lineIndent>x)&&H!==0)z(i,"bad indentation of a mapping entry");else if(i.lineIndent<x)break}return O&&Ee(i,S,D,M,F,null,C,L,m),q&&(i.tag=v,i.anchor=I,i.kind="mapping",i.result=S),q}function It(i){let x=!1,_=!1,T,C,L=i.input.charCodeAt(i.position);if(L!==33)return!1;i.tag!==null&&z(i,"duplication of a tag property"),L=i.input.charCodeAt(++i.position),L===60?(x=!0,L=i.input.charCodeAt(++i.position)):L===33?(_=!0,T="!!",L=i.input.charCodeAt(++i.position)):T="!";let m=i.position;if(x){do L=i.input.charCodeAt(++i.position);while(L!==0&&L!==62);i.position<i.length?(C=i.input.slice(m,i.position),L=i.input.charCodeAt(++i.position)):z(i,"unexpected end of the stream within a verbatim tag")}else{for(;L!==0&&!N(L);)L===33&&(_?z(i,"tag suffix cannot contain exclamation marks"):(T=i.input.slice(m-1,i.position+1),y.test(T)||z(i,"named tag handle cannot contain such characters"),_=!0,m=i.position+1)),L=i.input.charCodeAt(++i.position);C=i.input.slice(m,i.position),k.test(C)&&z(i,"tag suffix cannot contain flow indicator characters")}C&&!w.test(C)&&z(i,"tag name cannot contain such characters: "+C);try{C=decodeURIComponent(C)}catch{z(i,"tag name is malformed: "+C)}return x?i.tag=C:c.call(i.tagMap,T)?i.tag=i.tagMap[T]+C:T==="!"?i.tag="!"+C:T==="!!"?i.tag="tag:yaml.org,2002:"+C:z(i,'undeclared tag handle "'+T+'"'),!0}function Qn(i){let x=i.input.charCodeAt(i.position);if(x!==38)return!1;i.anchor!==null&&z(i,"duplication of an anchor property"),x=i.input.charCodeAt(++i.position);const _=i.position;for(;x!==0&&!N(x)&&!j(x);)x=i.input.charCodeAt(++i.position);return i.position===_&&z(i,"name of an anchor node must contain at least one character"),i.anchor=i.input.slice(_,i.position),!0}function Xn(i){let x=i.input.charCodeAt(i.position);if(x!==42)return!1;x=i.input.charCodeAt(++i.position);const _=i.position;for(;x!==0&&!N(x)&&!j(x);)x=i.input.charCodeAt(++i.position);i.position===_&&z(i,"name of an alias node must contain at least one character");const T=i.input.slice(_,i.position);return c.call(i.anchorMap,T)||z(i,'unidentified alias "'+T+'"'),i.result=i.anchorMap[T],Y(i,!0,-1),!0}function Rt(i,x,_,T){const C=yn(i);return Ft(i),Qe(i,x),i.tag=null,i.anchor=null,i.kind=null,i.result=null,Jn(i,_,T)&&i.kind==="mapping"?(He(i),!0):(Mt(i),Qe(i,C),!1)}function De(i,x,_,T,C){let L,m,v=1,I=!1,S=!1,D=null,M,F,P;i.depth>=i.maxDepth&&z(i,"nesting exceeded maxDepth ("+i.maxDepth+")"),i.depth+=1,i.listener!==null&&i.listener("open",i),i.tag=null,i.anchor=null,i.kind=null,i.result=null;const O=L=m=p===_||d===_;if(T&&Y(i,!0,-1)&&(I=!0,i.lineIndent>x?v=1:i.lineIndent===x?v=0:i.lineIndent<x&&(v=-1)),v===1)for(;;){const q=i.input.charCodeAt(i.position),H=yn(i);if(I&&(q===33&&i.tag!==null||q===38&&i.anchor!==null)||!It(i)&&!Qn(i))break;D===null&&(D=H),Y(i,!0,-1)?(I=!0,m=O,i.lineIndent>x?v=1:i.lineIndent===x?v=0:i.lineIndent<x&&(v=-1)):m=!1}if(m&&(m=I||C),v===1||p===_)if(a===_||s===_?F=x:F=x+1,P=i.position-i.lineStart,v===1)if(m&&(Se(i,P)||Jn(i,P,F))||Kn(i,F))S=!0;else{const q=i.input.charCodeAt(i.position);D!==null&&O&&!m&&q!==124&&q!==62&&Rt(i,D,D.position-D.lineStart,F)||L&&Yn(i,F)||Wn(i,F)||xn(i,F)?S=!0:Xn(i)?(S=!0,(i.tag!==null||i.anchor!==null)&&z(i,"alias node should not have any properties")):Zn(i,F,a===_)&&(S=!0,i.tag===null&&(i.tag="?")),i.anchor!==null&&_e(i,i.anchor,i.result)}else v===0&&(S=m&&Se(i,P));if(i.tag===null)i.anchor!==null&&_e(i,i.anchor,i.result);else if(i.tag==="?"){i.result!==null&&i.kind!=="scalar"&&z(i,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+i.kind+'"');for(let q=0,H=i.implicitTypes.length;q<H;q+=1)if(M=i.implicitTypes[q],M.resolve(i.result)){i.result=M.construct(i.result),i.tag=M.tag,i.anchor!==null&&_e(i,i.anchor,i.result);break}}else if(i.tag!=="!"){if(c.call(i.typeMap[i.kind||"fallback"],i.tag))M=i.typeMap[i.kind||"fallback"][i.tag];else{M=null;const q=i.typeMap.multi[i.kind||"fallback"];for(let H=0,$=q.length;H<$;H+=1)if(i.tag.slice(0,q[H].tag.length)===q[H].tag){M=q[H];break}}M||z(i,"unknown tag !<"+i.tag+">"),i.result!==null&&M.kind!==i.kind&&z(i,"unacceptable node kind for !<"+i.tag+'> tag; it should be "'+M.kind+'", not "'+i.kind+'"'),M.resolve(i.result,i.tag)?(i.result=M.construct(i.result,i.tag),i.anchor!==null&&_e(i,i.anchor,i.result)):z(i,"cannot resolve a node with !<"+i.tag+"> explicit tag")}return i.listener!==null&&i.listener("close",i),i.depth-=1,i.tag!==null||i.anchor!==null||S}function Lt(i){const x=i.position;let _=!1,T;for(i.version=null,i.checkLineBreaks=i.legacy,i.tagMap=Object.create(null),i.anchorMap=Object.create(null);(T=i.input.charCodeAt(i.position))!==0&&(Y(i,!0,-1),T=i.input.charCodeAt(i.position),!(i.lineIndent>0||T!==37));){_=!0,T=i.input.charCodeAt(++i.position);let C=i.position;for(;T!==0&&!N(T);)T=i.input.charCodeAt(++i.position);const L=i.input.slice(C,i.position),m=[];for(L.length<1&&z(i,"directive name must not be less than one character in length");T!==0;){for(;R(T);)T=i.input.charCodeAt(++i.position);if(T===35){do T=i.input.charCodeAt(++i.position);while(T!==0&&!A(T));break}if(A(T))break;for(C=i.position;T!==0&&!N(T);)T=i.input.charCodeAt(++i.position);m.push(i.input.slice(C,i.position))}T!==0&&Xe(i),c.call(Vn,L)?Vn[L](i,L,m):Je(i,'unknown document directive "'+L+'"')}if(Y(i,!0,-1),i.lineIndent===0&&i.input.charCodeAt(i.position)===45&&i.input.charCodeAt(i.position+1)===45&&i.input.charCodeAt(i.position+2)===45?(i.position+=3,Y(i,!0,-1)):_&&z(i,"directives end mark is expected"),De(i,i.lineIndent-1,p,!1,!0),Y(i,!0,-1),i.checkLineBreaks&&g.test(i.input.slice(x,i.position))&&Je(i,"non-ASCII line breaks are interpreted as content"),i.documents.push(i.result),i.position===i.lineStart&&en(i)){i.input.charCodeAt(i.position)===46&&(i.position+=3,Y(i,!0,-1));return}i.position<i.length-1&&z(i,"end of the stream or a document separator is expected")}function et(i,x){i=String(i),x=x||{},i.length!==0&&(i.charCodeAt(i.length-1)!==10&&i.charCodeAt(i.length-1)!==13&&(i+=`
`),i.charCodeAt(0)===65279&&(i=i.slice(1)));const _=new X(i,x),T=i.indexOf("\0");for(T!==-1&&(_.position=T,z(_,"null byte is not allowed in input")),_.input+="\0";_.input.charCodeAt(_.position)===32;)_.lineIndent+=1,_.position+=1;for(;_.position<_.length-1;)Lt(_);return _.documents}function nt(i,x,_){x!==null&&typeof x=="object"&&typeof _>"u"&&(_=x,x=null);const T=et(i,_);if(typeof x!="function")return T;for(let C=0,L=T.length;C<L;C+=1)x(T[C])}function Nt(i,x){const _=et(i,x);if(_.length!==0){if(_.length===1)return _[0];throw new r("expected a single document in the stream, but found more")}}n.exports.loadAll=nt,n.exports.load=Nt})),Ul=Z(((e,n)=>{var t=Hn(),r=jn(),u=Dr(),o=Object.prototype.toString,c=Object.prototype.hasOwnProperty,a=65279,s=9,d=10,p=13,l=32,f=33,h=34,b=35,g=37,k=38,y=39,w=42,E=44,A=45,R=58,N=61,j=62,U=63,Q=64,se=91,Ce=93,kn=96,ze=123,qe=124,de=125,X={};X[0]="\\0",X[7]="\\a",X[8]="\\b",X[9]="\\t",X[10]="\\n",X[11]="\\v",X[12]="\\f",X[13]="\\r",X[27]="\\e",X[34]='\\"',X[92]="\\\\",X[133]="\\N",X[160]="\\_",X[8232]="\\L",X[8233]="\\P";var Gn=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],z=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function Je(m,v){if(v===null)return{};const I={},S=Object.keys(v);for(let D=0,M=S.length;D<M;D+=1){let F=S[D],P=String(v[F]);F.slice(0,2)==="!!"&&(F="tag:yaml.org,2002:"+F.slice(2));const O=m.compiledTypeMap.fallback[F];O&&c.call(O.styleAliases,P)&&(P=O.styleAliases[P]),I[F]=P}return I}function _e(m){let v,I;const S=m.toString(16).toUpperCase();if(m<=255)v="x",I=2;else if(m<=65535)v="u",I=4;else if(m<=4294967295)v="U",I=8;else throw new r("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+v+t.repeat("0",I-S.length)+S}var Ft=1,He=2;function Mt(m){this.schema=m.schema||u,this.indent=Math.max(1,m.indent||2),this.noArrayIndent=m.noArrayIndent||!1,this.skipInvalid=m.skipInvalid||!1,this.flowLevel=t.isNothing(m.flowLevel)?-1:m.flowLevel,this.styleMap=Je(this.schema,m.styles||null),this.sortKeys=m.sortKeys||!1,this.lineWidth=m.lineWidth||80,this.noRefs=m.noRefs||!1,this.noCompatMode=m.noCompatMode||!1,this.condenseFlow=m.condenseFlow||!1,this.quotingType=m.quotingType==='"'?He:Ft,this.forceQuotes=m.forceQuotes||!1,this.replacer=typeof m.replacer=="function"?m.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function yn(m,v){const I=t.repeat(" ",v);let S=0,D="";const M=m.length;for(;S<M;){let F;const P=m.indexOf(`
`,S);P===-1?(F=m.slice(S),S=M):(F=m.slice(S,P+1),S=P+1),F.length&&F!==`
`&&(D+=I),D+=F}return D}function Qe(m,v){return`
`+t.repeat(" ",m.indent*v)}function Vn(m,v){for(let I=0,S=m.implicitTypes.length;I<S;I+=1)if(m.implicitTypes[I].resolve(v))return!0;return!1}function ae(m){return m===l||m===s}function Me(m){return m>=32&&m<=126||m>=161&&m<=55295&&m!==8232&&m!==8233||m>=57344&&m<=65533&&m!==a||m>=65536&&m<=1114111}function Ee(m){return Me(m)&&m!==a&&m!==p&&m!==d}function Xe(m,v,I){const S=Ee(m),D=S&&!ae(m);return(I?S:S&&m!==E&&m!==se&&m!==Ce&&m!==ze&&m!==de)&&m!==b&&!(v===R&&!D)||Ee(v)&&!ae(v)&&m===b||v===R&&D}function Y(m){return Me(m)&&m!==a&&!ae(m)&&m!==A&&m!==U&&m!==R&&m!==E&&m!==se&&m!==Ce&&m!==ze&&m!==de&&m!==b&&m!==k&&m!==w&&m!==f&&m!==qe&&m!==N&&m!==j&&m!==y&&m!==h&&m!==g&&m!==Q&&m!==kn}function en(m){return!ae(m)&&m!==R}function Ae(m,v){const I=m.charCodeAt(v);let S;return I>=55296&&I<=56319&&v+1<m.length&&(S=m.charCodeAt(v+1),S>=56320&&S<=57343)?(I-55296)*1024+S-56320+65536:I}function Zn(m){return/^\n* /.test(m)}var Wn=1,xn=2,Kn=3,Yn=4,Se=5;function Jn(m,v,I,S,D,M,F,P){let O,q=0,H=null,$=!1,W=!1;const Wr=S!==-1;let vn=-1,wn=Y(Ae(m,0))&&en(Ae(m,m.length-1));if(v||F)for(O=0;O<m.length;q>=65536?O+=2:O++){if(q=Ae(m,O),!Me(q))return Se;wn=wn&&Xe(q,H,P),H=q}else{for(O=0;O<m.length;q>=65536?O+=2:O++){if(q=Ae(m,O),q===d)$=!0,Wr&&(W=W||O-vn-1>S&&m[vn+1]!==" ",vn=O);else if(!Me(q))return Se;wn=wn&&Xe(q,H,P),H=q}W=W||Wr&&O-vn-1>S&&m[vn+1]!==" "}return!$&&!W?wn&&!F&&!D(m)?Wn:M===He?Se:xn:I>9&&Zn(m)?Se:F?M===He?Se:xn:W?Yn:Kn}function It(m,v,I,S,D){m.dump=(function(){if(v.length===0)return m.quotingType===He?'""':"''";if(!m.noCompatMode&&(Gn.indexOf(v)!==-1||z.test(v)))return m.quotingType===He?'"'+v+'"':"'"+v+"'";const M=m.indent*Math.max(1,I),F=m.lineWidth===-1?-1:Math.max(Math.min(m.lineWidth,40),m.lineWidth-M),P=S||m.flowLevel>-1&&I>=m.flowLevel;function O(q){return Vn(m,q)}switch(Jn(v,P,m.indent,F,O,m.quotingType,m.forceQuotes&&!S,D)){case Wn:return v;case xn:return"'"+v.replace(/'/g,"''")+"'";case Kn:return"|"+Qn(v,m.indent)+Xn(yn(v,M));case Yn:return">"+Qn(v,m.indent)+Xn(yn(Rt(v,F),M));case Se:return'"'+Lt(v)+'"';default:throw new r("impossible error: invalid scalar style")}})()}function Qn(m,v){const I=Zn(m)?String(v):"",S=m[m.length-1]===`
`;return I+(S&&(m[m.length-2]===`
`||m===`
`)?"+":S?"":"-")+`
`}function Xn(m){return m[m.length-1]===`
`?m.slice(0,-1):m}function Rt(m,v){const I=/(\n+)([^\n]*)/g;let S=(function(){let P=m.indexOf(`
`);return P=P!==-1?P:m.length,I.lastIndex=P,De(m.slice(0,P),v)})(),D=m[0]===`
`||m[0]===" ",M,F;for(;F=I.exec(m);){const P=F[1],O=F[2];M=O[0]===" ",S+=P+(!D&&!M&&O!==""?`
`:"")+De(O,v),D=M}return S}function De(m,v){if(m===""||m[0]===" ")return m;const I=/ [^ ]/g;let S,D=0,M,F=0,P=0,O="";for(;S=I.exec(m);)P=S.index,P-D>v&&(M=F>D?F:P,O+=`
`+m.slice(D,M),D=M+1),F=P;return O+=`
`,m.length-D>v&&F>D?O+=m.slice(D,F)+`
`+m.slice(F+1):O+=m.slice(D),O.slice(1)}function Lt(m){let v="",I=0;for(let S=0;S<m.length;I>=65536?S+=2:S++){I=Ae(m,S);const D=X[I];!D&&Me(I)?(v+=m[S],I>=65536&&(v+=m[S+1])):v+=D||_e(I)}return v}function et(m,v,I){let S="";const D=m.tag;for(let M=0,F=I.length;M<F;M+=1){let P=I[M];m.replacer&&(P=m.replacer.call(I,String(M),P)),(_(m,v,P,!1,!1)||typeof P>"u"&&_(m,v,null,!1,!1))&&(S!==""&&(S+=","+(m.condenseFlow?"":" ")),S+=m.dump)}m.tag=D,m.dump="["+S+"]"}function nt(m,v,I,S){let D="";const M=m.tag;for(let F=0,P=I.length;F<P;F+=1){let O=I[F];m.replacer&&(O=m.replacer.call(I,String(F),O)),(_(m,v+1,O,!0,!0,!1,!0)||typeof O>"u"&&_(m,v+1,null,!0,!0,!1,!0))&&((!S||D!=="")&&(D+=Qe(m,v)),m.dump&&d===m.dump.charCodeAt(0)?D+="-":D+="- ",D+=m.dump)}m.tag=M,m.dump=D||"[]"}function Nt(m,v,I){let S="";const D=m.tag,M=Object.keys(I);for(let F=0,P=M.length;F<P;F+=1){let O="";S!==""&&(O+=", "),m.condenseFlow&&(O+='"');const q=M[F];let H=I[q];m.replacer&&(H=m.replacer.call(I,q,H)),_(m,v,q,!1,!1)&&(m.dump.length>1024&&(O+="? "),O+=m.dump+(m.condenseFlow?'"':"")+":"+(m.condenseFlow?"":" "),_(m,v,H,!1,!1)&&(O+=m.dump,S+=O))}m.tag=D,m.dump="{"+S+"}"}function i(m,v,I,S){let D="";const M=m.tag,F=Object.keys(I);if(m.sortKeys===!0)F.sort();else if(typeof m.sortKeys=="function")F.sort(m.sortKeys);else if(m.sortKeys)throw new r("sortKeys must be a boolean or a function");for(let P=0,O=F.length;P<O;P+=1){let q="";(!S||D!=="")&&(q+=Qe(m,v));const H=F[P];let $=I[H];if(m.replacer&&($=m.replacer.call(I,H,$)),!_(m,v+1,H,!0,!0,!0))continue;const W=m.tag!==null&&m.tag!=="?"||m.dump&&m.dump.length>1024;W&&(m.dump&&d===m.dump.charCodeAt(0)?q+="?":q+="? "),q+=m.dump,W&&(q+=Qe(m,v)),_(m,v+1,$,!0,W)&&(m.dump&&d===m.dump.charCodeAt(0)?q+=":":q+=": ",q+=m.dump,D+=q)}m.tag=M,m.dump=D||"{}"}function x(m,v,I){const S=I?m.explicitTypes:m.implicitTypes;for(let D=0,M=S.length;D<M;D+=1){const F=S[D];if((F.instanceOf||F.predicate)&&(!F.instanceOf||typeof v=="object"&&v instanceof F.instanceOf)&&(!F.predicate||F.predicate(v))){if(I?F.multi&&F.representName?m.tag=F.representName(v):m.tag=F.tag:m.tag="?",F.represent){const P=m.styleMap[F.tag]||F.defaultStyle;let O;if(o.call(F.represent)==="[object Function]")O=F.represent(v,P);else if(c.call(F.represent,P))O=F.represent[P](v,P);else throw new r("!<"+F.tag+'> tag resolver accepts not "'+P+'" style');m.dump=O}return!0}}return!1}function _(m,v,I,S,D,M,F){m.tag=null,m.dump=I,x(m,I,!1)||x(m,I,!0);const P=o.call(m.dump),O=S;S&&(S=m.flowLevel<0||m.flowLevel>v);const q=P==="[object Object]"||P==="[object Array]";let H,$;if(q&&(H=m.duplicates.indexOf(I),$=H!==-1),(m.tag!==null&&m.tag!=="?"||$||m.indent!==2&&v>0)&&(D=!1),$&&m.usedDuplicates[H])m.dump="*ref_"+H;else{if(q&&$&&!m.usedDuplicates[H]&&(m.usedDuplicates[H]=!0),P==="[object Object]")S&&Object.keys(m.dump).length!==0?(i(m,v,m.dump,D),$&&(m.dump="&ref_"+H+m.dump)):(Nt(m,v,m.dump),$&&(m.dump="&ref_"+H+" "+m.dump));else if(P==="[object Array]")S&&m.dump.length!==0?(m.noArrayIndent&&!F&&v>0?nt(m,v-1,m.dump,D):nt(m,v,m.dump,D),$&&(m.dump="&ref_"+H+m.dump)):(et(m,v,m.dump),$&&(m.dump="&ref_"+H+" "+m.dump));else if(P==="[object String]")m.tag!=="?"&&It(m,m.dump,v,M,O);else{if(P==="[object Undefined]")return!1;if(m.skipInvalid)return!1;throw new r("unacceptable kind of an object to dump "+P)}if(m.tag!==null&&m.tag!=="?"){let W=encodeURI(m.tag[0]==="!"?m.tag.slice(1):m.tag).replace(/!/g,"%21");m.tag[0]==="!"?W="!"+W:W.slice(0,18)==="tag:yaml.org,2002:"?W="!!"+W.slice(18):W="!<"+W+">",m.dump=W+" "+m.dump}}return!0}function T(m,v){const I=[],S=[];C(m,I,S);const D=S.length;for(let M=0;M<D;M+=1)v.duplicates.push(I[S[M]]);v.usedDuplicates=new Array(D)}function C(m,v,I){if(m!==null&&typeof m=="object"){const S=v.indexOf(m);if(S!==-1)I.indexOf(S)===-1&&I.push(S);else if(v.push(m),Array.isArray(m))for(let D=0,M=m.length;D<M;D+=1)C(m[D],v,I);else{const D=Object.keys(m);for(let M=0,F=D.length;M<F;M+=1)C(m[D[M]],v,I)}}}function L(m,v){v=v||{};const I=new Mt(v);I.noRefs||T(m,I);let S=m;return I.replacer&&(S=I.replacer.call({"":S},"",S)),_(I,0,S,!0,!0)?I.dump+`
`:""}n.exports.dump=L})),Io=Hl(Z(((e,n)=>{var t=$l(),r=Ul();function u(o,c){return function(){throw new Error("Function yaml."+o+" is removed in js-yaml 4. Use yaml."+c+" instead, which is now safe by default.")}}n.exports.Type=oe(),n.exports.Schema=mo(),n.exports.FAILSAFE_SCHEMA=yo(),n.exports.JSON_SCHEMA=_o(),n.exports.CORE_SCHEMA=Eo(),n.exports.DEFAULT_SCHEMA=Dr(),n.exports.load=t.load,n.exports.loadAll=t.loadAll,n.exports.dump=r.dump,n.exports.YAMLException=jn(),n.exports.types={binary:Do(),float:Co(),map:ko(),null:xo(),pairs:Fo(),set:Mo(),timestamp:Ao(),bool:vo(),int:wo(),merge:So(),omap:To(),seq:go(),str:bo()},n.exports.safeLoad=u("safeLoad","load"),n.exports.safeLoadAll=u("safeLoadAll","loadAll"),n.exports.safeDump=u("safeDump","dump")}))()),{Type:cf,Schema:lf,FAILSAFE_SCHEMA:sf,JSON_SCHEMA:df,CORE_SCHEMA:Gl,DEFAULT_SCHEMA:ff,load:Vl,loadAll:hf,dump:pf,YAMLException:mf,types:bf,safeLoad:gf,safeLoadAll:kf,safeDump:yf}=Io.default;Io.default;var Vt,xu;function Zl(){return xu||(xu=1,Vt=function(n,t){var r=3,u="-",o=u.charCodeAt(0),c=u.length;function a(s,d,p,l){var f,h,b,g,k,y,w,E=!1,A=s.bMarks[d]+s.tShift[d],R=s.eMarks[d];if(d!==0||o!==s.src.charCodeAt(0))return!1;for(f=A+1;f<=R;f++)if(u[(f-A)%c]!==s.src[f]){w=f+1;break}if(b=Math.floor((f-A)/c),b<r)return!1;if(f-=(f-A)%c,l)return!0;for(h=d;h++,!(h>=p||s.src.slice(A,R)==="..."||(A=s.bMarks[h]+s.tShift[h],R=s.eMarks[h],A<R&&s.sCount[h]<s.blkIndent));)if(o===s.src.charCodeAt(A)&&!(s.sCount[h]-s.blkIndent>=4)){for(f=A+1;f<=R&&u[(f-A)%c]===s.src[f];f++);if(!(Math.floor((f-A)/c)<b)&&(f-=(f-A)%c,f=s.skipSpaces(f),!(f<R))){E=!0;break}}return k=s.parentType,y=s.lineMax,s.parentType="container",s.lineMax=h,g=s.push("front_matter",null,0),g.hidden=!0,g.markup=s.src.slice(d,f),g.block=!0,g.map=[d,h+(E?1:0)],g.meta=s.src.slice(w,A-1),s.parentType=k,s.lineMax=y,s.line=h+(E?1:0),t(g.meta),!0}n.block.ruler.before("table","front_matter",a,{alt:["paragraph","reference","blockquote","list"]})}),Vt}var Wl=Zl();const Kl=_t(Wl);function Yl(){return e=>{let n="";e.use(Kl,t=>{const r=Jl(t);r!==void 0?n=Ro(r,e.utils.escapeHtml):n=""}),e.renderer.rules.front_matter=(t,r,u,o,c)=>n===""?"":`<table class="markdown-frontMatter"${c.renderAttrs(t[r])}>
${n}
</table>
`}}function Jl(e){try{const n=Vl(e,{schema:Gl});if(n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.keys(n).length>0)return n}catch{}}function Ro(e,n){const t=Object.entries(e);return t.length===0?"":`<tbody>
${t.map(([u,o])=>`<tr><th scope="row">${n(u)}</th><td>${ir(o,n)}</td></tr>`).join(`
`)}
</tbody>`}function ir(e,n){if(e==null)return"";if(e instanceof Date)return n(Ql(e));if(Array.isArray(e))return e.every(Xl)?e.map(r=>ir(r,n)).join(", "):`<ul>${e.map(r=>`<li>${ir(r,n)}</li>`).join("")}</ul>`;if(typeof e=="object"){const t=Ro(e,n);return t===""?"":`<table>${t}</table>`}return n(String(e))}function Ql(e){if(Number.isNaN(e.getTime()))return"";const n=e.toISOString();return n.endsWith("T00:00:00.000Z")?n.slice(0,10):n}function Xl(e){if(e==null||e instanceof Date)return!0;const n=typeof e;return n==="string"||n==="number"||n==="boolean"||n==="bigint"}const Tr={rootValueKey:"extension.markeditPreview",defaultModes:["side-by-side","preview"],defaultPreset:"default"},es=gn(B.MarkEdit.userSettings),me=gn(es[Tr.rootValueKey]),Lo=gn(me.changeMode),No=gn(me.markdownIt),ns=["automatic","quiet","notify","never"],_n=(()=>{const e=me.updateBehavior;return e&&ns.includes(e)?e:$n(me.autoUpdate)?"quiet":"never"})(),ts=$n(me.syncScroll);$n(me.hidePreviewButtons);$n(me.syntaxAutoDetect,!1);const rs=$n(me.imageHoverPreview,!1),Et=me.themeName??"github",Oo=Et==="none",Zt=me.styledHtmlColorScheme??me.styledHtmlTheme??"auto";me.mathDelimiters;const us=Lo.modes??Tr.defaultModes,vu=gn(Lo.hotKey),os=No.preset??Tr.defaultPreset,is=gn(No.options);function gn(e,n={}){return e??n}function $n(e,n=!0){return e??n}const as=`.markdown-body {
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
`,cs=`.markdown-body {
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
`,ls=`.markdown-body {
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
`,ss=`.markdown-body {
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
`,ds=`.markdown-body {
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
`,fs=`.markdown-body {
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
`,hs=`.markdown-body {
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
`,ps=`.markdown-body {
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
`,ms=`.markdown-body {
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
`,bs=`.markdown-body {
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
`,gs=`.markdown-body {
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
`,ks=`.markdown-body {
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
`,ys=`.markdown-body {
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
`,xs=`.markdown-body {
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
`,vs=`.markdown-body {
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
`,ws=`.markdown-body {
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
`,Cs=`.markdown-body {
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
`,_s=`.markdown-alert {
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
`,Es=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,As=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,Ss=`.code-copy-wrapper {
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
`,ft={github:{light:cs,dark:ls},cobalt:{dark:ss},dracula:{dark:ds},minimal:{light:fs,dark:hs},"night-owl":{dark:ps},"rose-pine":{light:ms,dark:bs},solarized:{light:gs,dark:ks},synthwave84:{dark:ys},"winter-is-coming":{light:xs,dark:vs},xcode:{light:ws,dark:Cs}};function Ds(e="auto"){if(Oo)return"";const n=ft[Et]??ft.github,t=n.light??n.dark,r=n.dark??n.light,u=Kr(t)??"#ffffff",o=Kr(r)??"#0d1117";return[".markdown-body { padding: 25px; }",...Fr(e,`body { background: ${u}; }`,`body { background: ${o}; }`)].join(`
`)}function Po(e="auto"){if(Oo)return[`:root { color-scheme: ${e==="auto"?"light dark":e}; }`,"body, .markdown-body { background: Canvas; color: CanvasText; }"].join(`
`);const n=ft[Et]??ft.github,t=n.light??n.dark,r=n.dark??n.light;return[as,...Fr(e,t,r)].join(`
`)}function Bo(e="auto"){return[_s,...Fr(e,Es,As)].join(`
`)}function zo(){return Ss}function Fr(e,n,t){const r=[];switch(e){case"light":r.push(n);break;case"dark":r.push(t);break;case"auto":r.push(`
        ${n}
        @media (prefers-color-scheme: dark) {
          ${t}
        }`);break}return r}const Ts={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Edit Mode",sideBySideMode:"Side-by-Side Mode",previewMode:"Preview Mode",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",printRendered:"Print Rendered…",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",untitled:"Untitled",update:"Update",version:"Version",checkReleases:"Check Releases",updateAndRelaunch:"Update and Relaunch",newVersionAvailable:"is available!",viewReleasePage:"View Release Page",remindMeLater:"Remind Me Later",skipThisVersion:"Skip This Version",failedToUpdate:"Failed to update. Please try again later.",source:"Source",preview:"Preview"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"编辑模式",sideBySideMode:"并排模式",previewMode:"预览模式",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",printRendered:"打印渲染…",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",untitled:"未命名",update:"更新",version:"版本",checkReleases:"查看版本",updateAndRelaunch:"更新并重新启动",newVersionAvailable:"已发布！",viewReleasePage:"查看发布页面",remindMeLater:"稍后提醒我",skipThisVersion:"跳过这个版本",failedToUpdate:"更新失败，请稍后再试。",source:"源码",preview:"预览"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",printRendered:"列印渲染…",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",editMode:"編輯模式",sideBySideMode:"並排模式",previewMode:"預覽模式",untitled:"未命名",update:"更新",version:"版本",checkReleases:"檢視版本",updateAndRelaunch:"更新並重新啟動",newVersionAvailable:"已釋出！",viewReleasePage:"檢視釋出頁面",remindMeLater:"稍後提醒我",skipThisVersion:"跳過這個版本",failedToUpdate:"更新失敗，請稍後再試。",source:"原始碼",preview:"預覽"}};function G(e){return Ms[e]}const Fs=["default","zh-CN","zh-TW"],Ms=Ts[(()=>{const e=navigator.language;return Fs.includes(e)?e:"default"})()];function Mr(){return typeof B.MarkEdit.addExtension=="function"}async function Ir(e,n=!0){return await Ls,be.render(e,{lineInfo:n})}function qo(e){e()}async function Ho(e){const n=r=>`<style>
${r}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,n(Ds(Zt)),n(Po(Zt)),n(Bo(Zt)),n(zo()),"</body></html>"].join(`
`)}const be=pe(os,{html:!0,breaks:!0,linkify:!0,...is}),Is=[];be.use(Yl());be.use(un);be.use(yl,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});be.use(Dl);be.use(Ml,{enabled:Mr(),label:!0});be.use(Rl);const Rs=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),Ls=Promise.all(Is).then(()=>{for(const e of Rs){const n=be.renderer.rules[e];be.renderer.rules[e]=(t,r,u,o,c)=>{const a=t[r];return o.lineInfo&&a.map?.length===2&&(a.attrSet("data-line-from",String(a.map[0])),a.attrSet("data-line-to",String(a.map[1]-1))),n?n(t,r,u,o,c):c.renderToken(t,r,u)}}for(const e of["fence","code_block"]){const n=be.renderer.rules[e];be.renderer.rules[e]=(t,r,u,o,c)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${n===void 0?c.renderToken(t,r,u):n(t,r,u,o,c)}
        <button title="${G("copyCode")}" aria-label="${G("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),Ns=new DOMParser,Os="image-loader",Rr="cm-md-image-preview",wu=5;function jo(e){const n=Ns.parseFromString(e,"text/html");return n.querySelectorAll("img").forEach(r=>{const u=r.getAttribute("src");u!==null&&(u.includes("://")||u.startsWith("data:image/")||(r.src=`${Os}://${u}`))}),n.body.innerHTML}function Ps(e){typeof B.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",n=>{Ne.panelPresenter!==void 0&&(clearTimeout(Ne.panelPresenter),Ne.panelPresenter=void 0),Ne.panelPresenter=setTimeout(()=>{const t=n.target,r=t?.closest(".cm-md-link"),u=r?.dataset.linkUrl??r?.innerText??"";r!==null&&Ti(u)?Bs(r,u):t?.classList.contains(Rr)||En()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&En(!1)}),e.addEventListener("scroll",()=>En()))}async function Bs(e,n){if(e===Ne.focusedElement)return;const t=(await B.MarkEdit.getFileInfo())?.parentPath;if(t===void 0)return;const r=rn(t,n),u=await B.MarkEdit.getFileObject(r);if(u===void 0)return;const o=e.getBoundingClientRect(),c=document.createElement("img");c.className=Rr,c.style.position="fixed",c.style.left=`${o.left}px`,c.style.zIndex="10000",c.style.borderRadius="5px",c.style.opacity="0",c.style.transition="opacity 120ms",c.style.cursor="pointer",c.onclick=()=>{En(),window.open(n,"_blank")},c.onload=()=>{const s=Math.min(c.naturalHeight,240);c.style.height=`${s}px`;const d=o.top,p=window.innerHeight-o.bottom;d>p?c.style.top=`${o.top-s-wu}px`:c.style.top=`${o.bottom+wu}px`,requestAnimationFrame(()=>{c.style.opacity="1"})};const a=u.mimeType??"image/png";c.src=`data:${a};base64,${u.data}`,En(!1),Ne.focusedElement=e,document.body.appendChild(c)}function En(e=!0){Ne.focusedElement!==void 0&&(Ne.focusedElement=void 0,document.querySelectorAll(`.${Rr}`).forEach(n=>{e?(n.style.opacity="0",n.addEventListener("transitionend",()=>n.remove(),{once:!0})):n.remove()}))}const Ne={panelPresenter:void 0,focusedElement:void 0};let Ln=null,ar=null;function Lr(){Ln=null,ar=null}function $o(e){Ln===null&&(Ln=Array.from(e.querySelectorAll("[data-line-from]")).map(n=>({from:parseInt(n.dataset.lineFrom??"0",10),to:parseInt(n.dataset.lineTo??"0",10),el:n,top:ct(e,n)})))}function zs(e){return Ln===null&&$o(e),Ln??[]}function qs(e){return ar??=parseFloat(getComputedStyle(e).paddingTop)||0,ar}let ht=null,Wt;function Cu(e){ht=e,Wt!==void 0&&clearTimeout(Wt),Wt=setTimeout(()=>{ht=null},150)}function Hs(e,n){if(!ts)return;let t,r;e.addEventListener("scroll",()=>{ht!=="preview"&&(wd()||(t!==void 0&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{Cu("editor"),cr(e,n,!1)})))},{passive:!0}),n.addEventListener("scroll",()=>{ht!=="editor"&&(r!==void 0&&cancelAnimationFrame(r),r=requestAnimationFrame(()=>{Cu("preview"),js(n,e)}))},{passive:!0})}function cr(e,n,t=!0){const{line:r,progress:u}=$s(e);Us(n,r,u,t)}function js(e,n){const t=zs(e);if(t.length===0)return;const r=e.scrollTop,u=qs(e);let o=0,c=t.length-1,a,s=0;for(;o<=c;){const y=o+c>>>1,w=t[y].top-u;if(w+t[y].el.offsetHeight<=r)o=y+1;else if(y>0&&t[y-1].top-u+t[y-1].el.offsetHeight>r)c=y-1;else{a=t[y],s=At((r-w)/t[y].el.offsetHeight);break}}if(a===void 0)return;const{from:d,to:p}=a,l=d+Math.round(s*Math.max(0,p-d)),f=B.MarkEdit.editorView,h=Math.max(1,Math.min(f.state.doc.lines,l+1)),b=f.state.doc.line(h),g=f.lineBlockAt(b.from),k=g.top+g.height*(s%1);n.scrollTo({top:k,behavior:"instant"})}function $s(e,n=0){const t=B.MarkEdit.editorView,r=t.lineBlockAtHeight(e.scrollTop+n),u=t.state.doc.lineAt(r.from).number-1,o=r.height>0?At((e.scrollTop-r.top)/r.height):0;return{line:u,progress:o}}function Us(e,n,t,r=!0){if(n===0&&t===0)return it(e,0,r);const u=Array.from(document.querySelectorAll("[data-line-from]")),o=Gs(u,n);if(o!==void 0){const{from:s,to:d}=an(o);return Ot(e,o,Zs(n,t,s,d),r)}if(n===0)return it(e,0,r);const{beforeBlock:c,afterBlock:a}=Vs(u,n);if(c!==void 0&&a!==void 0){const s=an(c),d=an(a),p=ct(e,c)+c.offsetHeight,l=ct(e,a),f=d.from-s.to,h=n-s.to+t,b=f>0?At(h/f):0;return it(e,p+(l-p)*b,r)}if(c!==void 0)return Ot(e,c,1,r);if(a!==void 0)return Ot(e,a,0,r)}function Gs(e,n){let t=0,r=e.length-1;for(;t<=r;){const u=t+r>>>1,{from:o,to:c}=an(e[u]);if(n<o)r=u-1;else if(n>c)t=u+1;else return e[u]}}function Vs(e,n){let t,r;for(const u of e){const{from:o,to:c}=an(u);if(c<n)t=u;else if(o>n){r=u;break}}return{beforeBlock:t,afterBlock:r}}function Zs(e,n,t,r){const u=r-t;return u<1?e===t?n:0:At((e-t+n)/u)}function At(e){return Math.max(0,Math.min(1,e))}function Ws(e){const n=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return n===null?null:{offset:n[1].length,replacement:n[2]===" "?"x":" "}}function Ks(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}function lr(e,n){return Array(n+1).join(e)}function Uo(e){return e.replace(/^\n*/,"")}function Go(e){for(var n=e.length;n>0&&e[n-1]===`
`;)n--;return e.substring(0,n)}function Vo(e){return Go(Uo(e))}var Ys=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function Nr(e){return Or(e,Ys)}var Zo=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function Wo(e){return Or(e,Zo)}function Js(e){return Yo(e,Zo)}var Ko=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function Qs(e){return Or(e,Ko)}function Xs(e){return Yo(e,Ko)}function Or(e,n){return n.indexOf(e.nodeName)>=0}function Yo(e,n){return e.getElementsByTagName&&n.some(function(t){return e.getElementsByTagName(t).length})}var e0=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function Jo(e){return e0.reduce(function(n,t){return n.replace(t[0],t[1])},e)}var ue={};ue.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};ue.lineBreak={filter:"br",replacement:function(e,n,t){return t.br+`
`}};ue.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,n,t){var r=Number(n.nodeName.charAt(1));if(t.headingStyle==="setext"&&r<3){var u=lr(r===1?"=":"-",e.length);return`

`+e+`
`+u+`

`}else return`

`+lr("#",r)+" "+e+`

`}};ue.blockquote={filter:"blockquote",replacement:function(e){return e=Vo(e).replace(/^/gm,"> "),`

`+e+`

`}};ue.list={filter:["ul","ol"],replacement:function(e,n){var t=n.parentNode;return t.nodeName==="LI"&&t.lastElementChild===n?`
`+e:`

`+e+`

`}};ue.listItem={filter:"li",replacement:function(e,n,t){var r=t.bulletListMarker+"   ",u=n.parentNode;if(u.nodeName==="OL"){var o=u.getAttribute("start"),c=Array.prototype.indexOf.call(u.children,n);r=(o?Number(o)+c:c+1)+".  "}var a=/\n$/.test(e);return e=Vo(e)+(a?`
`:""),e=e.replace(/\n/gm,`
`+" ".repeat(r.length)),r+e+(n.nextSibling?`
`:"")}};ue.indentedCodeBlock={filter:function(e,n){return n.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,n,t){return`

    `+n.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};ue.fencedCodeBlock={filter:function(e,n){return n.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,n,t){for(var r=n.firstChild.getAttribute("class")||"",u=(r.match(/language-(\S+)/)||[null,""])[1],o=n.firstChild.textContent,c=t.fence.charAt(0),a=3,s=new RegExp("^"+c+"{3,}","gm"),d;d=s.exec(o);)d[0].length>=a&&(a=d[0].length+1);var p=lr(c,a);return`

`+p+u+`
`+o.replace(/\n$/,"")+`
`+p+`

`}};ue.horizontalRule={filter:"hr",replacement:function(e,n,t){return`

`+t.hr+`

`}};ue.inlineLink={filter:function(e,n){return n.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,n){var t=Pr(n.getAttribute("href")),r=Br(pt(n.getAttribute("title"))),u=r?' "'+r+'"':"";return"["+e+"]("+t+u+")"}};ue.referenceLink={filter:function(e,n){return n.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,n,t){var r=Pr(n.getAttribute("href")),u=pt(n.getAttribute("title"));u&&(u=' "'+Br(u)+'"');var o,c;switch(t.linkReferenceStyle){case"collapsed":o="["+e+"][]",c="["+e+"]: "+r+u;break;case"shortcut":o="["+e+"]",c="["+e+"]: "+r+u;break;default:var a=this.references.length+1;o="["+e+"]["+a+"]",c="["+a+"]: "+r+u}return this.references.push(c),o},references:[],append:function(e){var n="";return this.references.length&&(n=`

`+this.references.join(`
`)+`

`,this.references=[]),n}};ue.emphasis={filter:["em","i"],replacement:function(e,n,t){return e.trim()?t.emDelimiter+e+t.emDelimiter:""}};ue.strong={filter:["strong","b"],replacement:function(e,n,t){return e.trim()?t.strongDelimiter+e+t.strongDelimiter:""}};ue.code={filter:function(e){var n=e.previousSibling||e.nextSibling,t=e.parentNode.nodeName==="PRE"&&!n;return e.nodeName==="CODE"&&!t},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var n=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",t="`",r=e.match(/`+/gm)||[];r.indexOf(t)!==-1;)t=t+"`";return t+n+e+n+t}};ue.image={filter:"img",replacement:function(e,n){var t=Jo(pt(n.getAttribute("alt"))),r=Pr(n.getAttribute("src")||""),u=pt(n.getAttribute("title")),o=u?' "'+Br(u)+'"':"";return r?"!["+t+"]("+r+o+")":""}};function pt(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}function Pr(e){var n=e.replace(/([<>()])/g,"\\$1");return n.indexOf(" ")>=0?"<"+n+">":n}function Br(e){return e.replace(/"/g,'\\"')}function Qo(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var n in e.rules)this.array.push(e.rules[n])}Qo.prototype={add:function(e,n){this.array.unshift(n)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var n;return(n=Kt(this.array,e,this.options))||(n=Kt(this._keep,e,this.options))||(n=Kt(this._remove,e,this.options))?n:this.defaultRule},forEach:function(e){for(var n=0;n<this.array.length;n++)e(this.array[n],n)}};function Kt(e,n,t){for(var r=0;r<e.length;r++){var u=e[r];if(n0(u,n,t))return u}}function n0(e,n,t){var r=e.filter;if(typeof r=="string"){if(r===n.nodeName.toLowerCase())return!0}else if(Array.isArray(r)){if(r.indexOf(n.nodeName.toLowerCase())>-1)return!0}else if(typeof r=="function"){if(r.call(e,n,t))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function t0(e){var n=e.element,t=e.isBlock,r=e.isVoid,u=e.isPre||function(l){return l.nodeName==="PRE"};if(!(!n.firstChild||u(n))){for(var o=null,c=!1,a=null,s=_u(a,n,u);s!==n;){if(s.nodeType===3||s.nodeType===4){var d=s.data.replace(/[ \r\n\t]+/g," ");if((!o||/ $/.test(o.data))&&!c&&d[0]===" "&&(d=d.substr(1)),!d){s=Yt(s);continue}s.data=d,o=s}else if(s.nodeType===1)t(s)||s.nodeName==="BR"?(o&&(o.data=o.data.replace(/ $/,"")),o=null,c=!1):r(s)||u(s)?(o=null,c=!0):o&&(c=!1);else{s=Yt(s);continue}var p=_u(a,s,u);a=s,s=p}o&&(o.data=o.data.replace(/ $/,""),o.data||Yt(o))}}function Yt(e){var n=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),n}function _u(e,n,t){return e&&e.parentNode===n||t(n)?n.nextSibling||n.parentNode:n.firstChild||n.nextSibling||n.parentNode}var zr=typeof window<"u"?window:{};function r0(){var e=zr.DOMParser,n=!1;try{new e().parseFromString("","text/html")&&(n=!0)}catch{}return n}function u0(){var e=function(){};return o0()?e.prototype.parseFromString=function(n){var t=new window.ActiveXObject("htmlfile");return t.designMode="on",t.open(),t.write(n),t.close(),t}:e.prototype.parseFromString=function(n){var t=document.implementation.createHTMLDocument("");return t.open(),t.write(n),t.close(),t},e}function o0(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch{zr.ActiveXObject&&(e=!0)}return e}var i0=r0()?zr.DOMParser:u0();function a0(e,n){var t;if(typeof e=="string"){var r=c0().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");t=r.getElementById("turndown-root")}else t=e.cloneNode(!0);return t0({element:t,isBlock:Nr,isVoid:Wo,isPre:n.preformattedCode?l0:null}),t}var Jt;function c0(){return Jt=Jt||new i0,Jt}function l0(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}function s0(e,n){return e.isBlock=Nr(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=d0(e),e.flankingWhitespace=f0(e,n),e}function d0(e){return!Wo(e)&&!Qs(e)&&/^\s*$/i.test(e.textContent)&&!Js(e)&&!Xs(e)}function f0(e,n){if(e.isBlock||n.preformattedCode&&e.isCode)return{leading:"",trailing:""};var t=h0(e.textContent);return t.leadingAscii&&Eu("left",e,n)&&(t.leading=t.leadingNonAscii),t.trailingAscii&&Eu("right",e,n)&&(t.trailing=t.trailingNonAscii),{leading:t.leading,trailing:t.trailing}}function h0(e){var n=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:n[1],leadingAscii:n[2],leadingNonAscii:n[3],trailing:n[4],trailingNonAscii:n[5],trailingAscii:n[6]}}function Eu(e,n,t){var r,u,o;return e==="left"?(r=n.previousSibling,u=/ $/):(r=n.nextSibling,u=/^ /),r&&(r.nodeType===3?o=u.test(r.nodeValue):t.preformattedCode&&r.nodeName==="CODE"?o=!1:r.nodeType===1&&!Nr(r)&&(o=u.test(r.textContent))),o}var p0=Array.prototype.reduce;function mt(e){if(!(this instanceof mt))return new mt(e);var n={rules:ue,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(t,r){return r.isBlock?`

`:""},keepReplacement:function(t,r){return r.isBlock?`

`+r.outerHTML+`

`:r.outerHTML},defaultReplacement:function(t,r){return r.isBlock?`

`+t+`

`:t}};this.options=Ks({},n,e),this.rules=new Qo(this.options)}mt.prototype={turndown:function(e){if(!g0(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var n=Xo.call(this,new a0(e,this.options));return m0.call(this,n)},use:function(e){if(Array.isArray(e))for(var n=0;n<e.length;n++)this.use(e[n]);else if(typeof e=="function")e(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,n){return this.rules.add(e,n),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return Jo(e)}};function Xo(e){var n=this;return p0.call(e.childNodes,function(t,r){r=new s0(r,n.options);var u="";return r.nodeType===3?u=r.isCode?r.nodeValue:n.escape(r.nodeValue):r.nodeType===1&&(u=b0.call(n,r)),ei(t,u)},"")}function m0(e){var n=this;return this.rules.forEach(function(t){typeof t.append=="function"&&(e=ei(e,t.append(n.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function b0(e){var n=this.rules.forNode(e),t=Xo.call(this,e),r=e.flankingWhitespace;return(r.leading||r.trailing)&&(t=t.trim()),r.leading+n.replacement(t,e,this.options)+r.trailing}function ei(e,n){var t=Go(e),r=Uo(n),u=Math.max(e.length-t.length,n.length-r.length),o=`

`.substring(0,u);return t+o+r}function g0(e){return e!=null&&(typeof e=="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}var Au=/highlight-(?:text|source)-([a-z0-9]+)/;function k0(e){e.addRule("highlightedCodeBlock",{filter:function(n){var t=n.firstChild;return n.nodeName==="DIV"&&Au.test(n.className)&&t&&t.nodeName==="PRE"},replacement:function(n,t,r){var u=t.className||"",o=(u.match(Au)||[null,""])[1];return`

`+r.fence+o+`
`+t.firstChild.textContent+`
`+r.fence+`

`}})}function y0(e){e.addRule("strikethrough",{filter:["del","s","strike"],replacement:function(n){return"~"+n+"~"}})}var x0=Array.prototype.indexOf,v0=Array.prototype.every,hn={};hn.tableCell={filter:["th","td"],replacement:function(e,n){return ni(e,n)}};hn.tableRow={filter:"tr",replacement:function(e,n){var t="",r={left:":--",right:"--:",center:":-:"};if(qr(n))for(var u=0;u<n.childNodes.length;u++){var o="---",c=(n.childNodes[u].getAttribute("align")||"").toLowerCase();c&&(o=r[c]||o),t+=ni(o,n.childNodes[u])}return`
`+e+(t?`
`+t:"")}};hn.table={filter:function(e){return e.nodeName==="TABLE"&&qr(e.rows[0])},replacement:function(e){return e=e.replace(`

`,`
`),`

`+e+`

`}};hn.tableSection={filter:["thead","tbody","tfoot"],replacement:function(e){return e}};function qr(e){var n=e.parentNode;return n.nodeName==="THEAD"||n.firstChild===e&&(n.nodeName==="TABLE"||w0(n))&&v0.call(e.childNodes,function(t){return t.nodeName==="TH"})}function w0(e){var n=e.previousSibling;return e.nodeName==="TBODY"&&(!n||n.nodeName==="THEAD"&&/^\s*$/i.test(n.textContent))}function ni(e,n){var t=x0.call(n.parentNode.childNodes,n),r=" ";return t===0&&(r="| "),r+e+" |"}function C0(e){e.keep(function(t){return t.nodeName==="TABLE"&&!qr(t.rows[0])});for(var n in hn)e.addRule(n,hn[n])}function _0(e){e.addRule("taskListItems",{filter:function(n){return n.type==="checkbox"&&n.parentNode.nodeName==="LI"},replacement:function(n,t){return(t.checked?"[x]":"[ ]")+" "}})}function E0(e){e.use([k0,y0,C0,_0])}const St=[{id:"h1",label:"H1",title:"Heading 1",shortcut:{domKey:"1",cmKey:"Mod-1",display:"⌘1"}},{id:"h2",label:"H2",title:"Heading 2",shortcut:{domKey:"2",cmKey:"Mod-2",display:"⌘2"}},{id:"h3",label:"H3",title:"Heading 3",shortcut:{domKey:"3",cmKey:"Mod-3",display:"⌘3"}},{id:"sep1",label:"",title:"",isSep:!0},{id:"bold",label:"<b>B</b>",title:"Bold",shortcut:{domKey:"b",cmKey:"Mod-b",display:"⌘B"}},{id:"italic",label:"<i>I</i>",title:"Italic",shortcut:{domKey:"i",cmKey:"Mod-i",display:"⌘I"}},{id:"strike",label:"<s>S</s>",title:"Strikethrough",shortcut:{domKey:"x",cmKey:"Mod-Shift-x",shift:!0,display:"⇧⌘X"}},{id:"code",label:"&#x60;&#x60;",title:"Inline code",shortcut:{domKey:"e",cmKey:"Mod-e",display:"⌘E"}},{id:"codeblock",label:"&#x60;&#x60;&#x60;",title:"Code block",shortcut:{domKey:"c",cmKey:"Mod-Alt-c",alt:!0,display:"⌥⌘C"}},{id:"sep2",label:"",title:"",isSep:!0},{id:"blockquote",label:"&#8220;",title:"Blockquote",shortcut:{domKey:".",cmKey:"Mod-Shift-.",shift:!0,display:"⇧⌘."}},{id:"ul",label:"&bull;",title:"Unordered list",shortcut:{domKey:"8",cmKey:"Mod-Shift-8",shift:!0,display:"⇧⌘8"}},{id:"ol",label:"1.",title:"Ordered list",shortcut:{domKey:"7",cmKey:"Mod-Shift-7",shift:!0,display:"⇧⌘7"}},{id:"sep3",label:"",title:"",isSep:!0},{id:"link",label:"&#128279;",title:"Insert link",shortcut:{domKey:"k",cmKey:"Mod-k",display:"⌘K"}},{id:"image",label:"&#128247;",title:"Insert image",shortcut:{domKey:"k",cmKey:"Mod-Shift-k",shift:!0,display:"⇧⌘K"}},{id:"hr",label:"&#8212;",title:"Horizontal rule",shortcut:{domKey:"-",cmKey:"Mod-Shift--",shift:!0,display:"⇧⌘−"}},{id:"sep4",label:"",title:"",isSep:!0},{id:"alert",label:"&#9888;",title:"Alert / callout (always inserts a NOTE — edit the word to change type)",shortcut:{domKey:"a",cmKey:"Mod-Alt-a",alt:!0,display:"⌥⌘A"}},{id:"footnote",label:"[^]",title:"Insert footnote",shortcut:{domKey:"f",cmKey:"Mod-Alt-f",alt:!0,display:"⌥⌘F"}}];function A0(e,n){return(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===n.domKey&&e.shiftKey===(n.shift??!1)&&e.altKey===(n.alt??!1)}let Qt;function S0(e,n){return Qt?.finish(void 0),new Promise(t=>{let r=!1;const u=document.createElement("div");u.className="formatting-picker-popover",u.setAttribute("role","dialog");const o=e.getBoundingClientRect();u.style.position="fixed",u.style.top=`${o.bottom+6}px`,u.style.left=`${o.left}px`;function c(p){r||(r=!0,Qt=void 0,u.remove(),document.removeEventListener("keydown",a,!0),document.removeEventListener("mousedown",s,!0),t(p))}function a(p){p.key==="Escape"&&(p.preventDefault(),c(void 0))}function s(p){u.contains(p.target)||c(void 0)}Qt={finish:c},n(u,c,()=>c(void 0)),document.body.appendChild(u);const d=u.getBoundingClientRect();d.right>window.innerWidth&&(u.style.left=`${Math.max(0,window.innerWidth-d.width-8)}px`),d.bottom>window.innerHeight&&(u.style.top=`${Math.max(0,o.top-d.height-6)}px`),document.addEventListener("keydown",a,!0),requestAnimationFrame(()=>document.addEventListener("mousedown",s,!0))})}function D0(e,n){const t=document.createElement("div");t.className=e,t.setAttribute("role","toolbar"),t.setAttribute("aria-label","Formatting toolbar");for(const r of St){if(r.isSep===!0){const c=document.createElement("span");c.className="wysiwyg-sep",c.setAttribute("aria-hidden","true"),t.appendChild(c);continue}const u=n[r.id];if(u===void 0)continue;const o=document.createElement("button");o.className="wysiwyg-btn",o.dataset.id=r.id,o.title=r.shortcut!==void 0?`${r.title} (${r.shortcut.display})`:r.title,o.innerHTML=r.label,o.type="button",o.addEventListener("mousedown",c=>{c.preventDefault(),u()}),t.appendChild(o)}return t}function T0(e){return document.querySelector(`.unified-toolbar [data-id="${e}"]`)}const F0=["NOTE","TIP","IMPORTANT","WARNING","CAUTION"],M0={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'};function I0(e){return e.charAt(0)+e.slice(1).toLowerCase()}async function ti(){const e=T0("alert")??document.body;return S0(e,(n,t,r)=>{n.classList.add("alert-picker-popover");for(const o of F0){const c=o.toLowerCase(),a=document.createElement("button");a.type="button",a.className="alert-picker-option",a.innerHTML=`
        <div class="markdown-alert markdown-alert-${c} alert-picker-preview">
          <p class="markdown-alert-title">${M0[c]}${I0(o)}</p>
        </div>
      `,a.addEventListener("mousedown",s=>{s.preventDefault(),t(o)}),n.appendChild(a)}const u=document.createElement("button");u.type="button",u.className="alert-picker-cancel",u.textContent="Cancel",u.addEventListener("mousedown",o=>{o.preventDefault(),r()}),n.appendChild(u)})}function on(e,n,t=n){return e.changeByRange(r=>{const{from:u,to:o}=r,c=e.doc,a=c.sliceString(Math.max(0,u-n.length),u),s=c.sliceString(o,Math.min(c.length,o+t.length));return a===n&&s===t?{changes:[{from:u-n.length,to:u,insert:""},{from:o,to:o+t.length,insert:""}],range:he.EditorSelection.range(u-n.length,o-n.length)}:{changes:[{from:u,to:u,insert:n},{from:o,to:o,insert:t}],range:u===o?he.EditorSelection.cursor(u+n.length):he.EditorSelection.range(u+n.length,o+n.length)}})}function Xt(e,n){const t="#".repeat(n)+" ";return e.changeByRange(r=>{const u=e.doc.lineAt(r.head),o=u.text.startsWith(t),c=u.text.replace(/^#{1,6}\s+/,""),a=o?c:t+c;return{changes:{from:u.from,to:u.to,insert:a},range:he.EditorSelection.cursor(u.from+a.length)}})}function R0(e){return e.changeByRange(n=>{const{from:t,to:r}=n,u=e.doc.sliceString(t,r)||"code block",o="```\n";return{changes:{from:t,to:r,insert:o+u+"\n```"},range:he.EditorSelection.range(t+o.length,t+o.length+u.length)}})}function L0(e,n="NOTE"){return e.changeByRange(t=>{const r=e.doc,u=r.lineAt(t.from),o=r.lineAt(t.to),c=[];for(let p=u.number;p<=o.number;p++)c.push(r.line(p));const a=c.filter(p=>p.text.trim()!==""),s=a.length>0?a.map(p=>`> ${p.text}`).join(`
`):"> ",d=`> [!${n}]
${s}`;return{changes:{from:u.from,to:o.to,insert:d},range:he.EditorSelection.cursor(u.from+d.length)}})}function ri(e){const n=new Set;for(const r of e.matchAll(/\[\^(\d+)\]/g))n.add(Number(r[1]));let t=1;for(;n.has(t);)t++;return t}function N0(e){let n=ri(e.doc.toString());const t=e.doc.length,r=t>0?e.doc.sliceString(t-1,t):"",u=r!==""&&r!==`
`;return e.changeByRange(o=>{const c=n++,a=`[^${c}]`,s=`${u?`

`:""}[^${c}]: `;return{changes:[{from:o.from,to:o.to,insert:a},{from:t,to:t,insert:s}],range:he.EditorSelection.cursor(o.from+a.length)}})}function O0(e){return e.changeByRange(n=>{const{from:t,to:r}=n,c=(e.doc.lineAt(t).text.trim()!==""?`

`:"")+`---

`;return{changes:{from:t,to:r,insert:c},range:he.EditorSelection.cursor(t+c.length)}})}function P0(e){return Hr(e,()=>"> ",/^>\s?/)}function B0(e){return Hr(e,()=>"- ",/^[-*+]\s+/)}function z0(e){return Hr(e,n=>`${n+1}. `,/^\d+[.)]\s+/)}function Hr(e,n,t){return e.changeByRange(r=>{const u=e.doc,o=u.lineAt(r.from),c=u.lineAt(r.to),a=[];for(let f=o.number;f<=c.number;f++)a.push(u.line(f));const s=a.filter(f=>f.text.trim()!==""),d=s.length>0&&s.every(f=>t.test(f.text)),p=s.map((f,h)=>{const b=f.text.replace(t,""),g=d?b:n(h)+b;return{from:f.from,to:f.to,insert:g}}),l=p.reduce((f,h)=>f+(h.insert.length-(h.to-h.from)),0);return{changes:p,range:he.EditorSelection.range(o.from,c.to+l)}})}let ln;const ui={h1:()=>ut("h1"),h2:()=>ut("h2"),h3:()=>ut("h3"),bold:()=>Ge("bold"),italic:()=>Ge("italic"),strike:()=>Ge("strikeThrough"),code:j0,codeblock:$0,blockquote:()=>ut("blockquote"),ul:()=>Ge("insertUnorderedList"),ol:()=>Ge("insertOrderedList"),link:()=>{U0()},image:()=>{G0()},hr:()=>Ge("insertHorizontalRule"),alert:()=>{V0()},footnote:Z0};function q0(e){ln===void 0&&(ln=n=>{const t=St.find(u=>u.shortcut!==void 0&&A0(n,u.shortcut));if(t===void 0)return;const r=ui[t.id];r!==void 0&&(n.preventDefault(),r())},e.addEventListener("keydown",ln))}function H0(e){ln!==void 0&&(e.removeEventListener("keydown",ln),ln=void 0)}function Ge(e,n){document.execCommand(e,!1,n),Ke()}function ut(e){document.execCommand("formatBlock",!1,e),Ke()}function Ke(){document.querySelector(".markdown-body")?.dispatchEvent(new Event("input",{bubbles:!0}))}function sr(e){const n=document.createElement("span");return n.className="raw-markdown",n.textContent=e,n}function j0(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0),t=document.createElement("code");t.textContent=n.toString()||"code",n.deleteContents(),n.insertNode(t),n.setStartAfter(t),n.collapse(!0),e.removeAllRanges(),e.addRange(n),Ke()}function $0(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0),t=document.createElement("pre"),r=document.createElement("code");r.textContent=n.toString()||"code block",t.appendChild(r),n.deleteContents(),n.insertNode(t),n.setStartAfter(t),n.collapse(!0),e.removeAllRanges(),e.addRange(n),Ke()}async function U0(){const e=await B.MarkEdit.showTextBox({title:"Insert Link",placeholder:"https://example.com"});e===void 0||e.trim()===""||Ge("createLink",e.trim())}async function G0(){const e=await B.MarkEdit.showTextBox({title:"Insert Image",placeholder:"https://example.com/image.png"});if(e===void 0||e.trim()==="")return;const n=window.getSelection();if(n===null||n.rangeCount===0)return;const t=n.getRangeAt(0),r=document.createElement("img");r.src=e.trim(),r.alt=t.toString()||"image",t.deleteContents(),t.insertNode(r),t.setStartAfter(r),t.collapse(!0),n.removeAllRanges(),n.addRange(t),Ke()}async function V0(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0).cloneRange(),t=await ti();if(t===void 0)return;const r=n.toString()||"Useful information.",u=document.createElement("blockquote");u.appendChild(sr(`[!${t}]`)),u.appendChild(document.createElement("br")),u.appendChild(document.createTextNode(r)),n.deleteContents(),n.insertNode(u),n.setStartAfter(u),n.collapse(!0),e.removeAllRanges(),e.addRange(n),Ke()}function Z0(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=document.querySelector(".markdown-body");if(n===null)return;const t=ri(B.MarkEdit.editorAPI.getText()),r=e.getRangeAt(0);r.deleteContents();const u=sr(`[^${t}]`);r.insertNode(u);const o=document.createElement("p");o.appendChild(sr(`[^${t}]: `)),n.appendChild(o);const c=document.createRange();c.setStartAfter(u),c.collapse(!0),e.removeAllRanges(),e.addRange(c),Ke()}const jr=new he.Compartment;function re(e,n){e.dispatch(n),e.focus()}function oi(e){return{h1:()=>re(e,Xt(e.state,1)),h2:()=>re(e,Xt(e.state,2)),h3:()=>re(e,Xt(e.state,3)),bold:()=>re(e,on(e.state,"**")),italic:()=>re(e,on(e.state,"*")),strike:()=>re(e,on(e.state,"~~")),code:()=>re(e,on(e.state,"`")),codeblock:()=>re(e,R0(e.state)),blockquote:()=>re(e,P0(e.state)),ul:()=>re(e,B0(e.state)),ol:()=>re(e,z0(e.state)),link:()=>{W0(e)},image:()=>{K0(e)},hr:()=>re(e,O0(e.state)),alert:()=>{Y0(e)},footnote:()=>re(e,N0(e.state))}}async function W0(e){const n=await B.MarkEdit.showTextBox({title:"Insert Link",placeholder:"https://example.com"});n===void 0||n.trim()===""||re(e,on(e.state,"[",`](${n.trim()})`))}async function K0(e){const n=await B.MarkEdit.showTextBox({title:"Insert Image",placeholder:"https://example.com/image.png"});n===void 0||n.trim()===""||re(e,on(e.state,"![",`](${n.trim()})`))}async function Y0(e){const n=await ti();n!==void 0&&re(e,L0(e.state,n))}const J0=he.Prec.highest(gr.keymap.of((()=>{const e=[];for(const n of St){if(n.shortcut===void 0)continue;const t=n.shortcut.cmKey;e.push({key:t,run:r=>(oi(r)[n.id](),!0)})}return e})()));function Q0(e){return()=>{const n=document.createElement("div");return n.style.height=`${e}px`,{top:!0,dom:n}}}function X0(){return[jr.of([]),J0]}function ed(e,n){e.dispatch({effects:jr.reconfigure(gr.showPanel.of(Q0(n)))})}function nd(e){e.dispatch({effects:jr.reconfigure([])})}const ii="--markedit-toolbar-height",ai="markedit-unified-toolbar-active";let bt=null;function td(){return B.MarkEdit.editorView.hasFocus}function rd(){const e={};for(const n of St)n.isSep!==!0&&(e[n.id]=()=>{(td()?oi(B.MarkEdit.editorView):ui)[n.id]?.()});return e}function ci(){return bt??=D0("unified-toolbar",rd()),bt}function ud(){const e=ci();e.style.display="none",document.body.appendChild(e)}function od(){const e=ci();e.style.display="";const n=e.getBoundingClientRect().height;document.documentElement.style.setProperty(ii,`${n}px`),document.body.classList.add(ai),ed(B.MarkEdit.editorView,n)}function id(){bt!==null&&(bt.style.display="none"),document.body.classList.remove(ai),document.documentElement.style.removeProperty(ii),nd(B.MarkEdit.editorView)}const $r=new mt({headingStyle:"atx",bulletListMarker:"-",codeBlockStyle:"fenced",fence:"```",emDelimiter:"*",strongDelimiter:"**",linkStyle:"inlined"});$r.use(E0);$r.addRule("rawMarkdown",{filter:e=>e.nodeName==="SPAN"&&e.classList.contains("raw-markdown"),replacement:(e,n)=>n.textContent??""});let Nn=!1,Ve;function Ur(){return Nn}function li(){if(Nn)return;Nn=!0;const e=Be();e.contentEditable="true",e.spellcheck=!0,e.classList.add("wysiwyg-active"),e.addEventListener("input",si),q0(e),od(),Lr(),e.focus()}function ad(){if(!Nn)return;Nn=!1,Ve!==void 0&&(clearTimeout(Ve),Ve=void 0),dr(!1);const e=Be();e.contentEditable="false",e.classList.remove("wysiwyg-active"),e.removeEventListener("input",si),H0(e),id(),Lr(),On()}function si(){Ve!==void 0&&clearTimeout(Ve),dr(!0),Ve=setTimeout(()=>{dr(!1),Ve=void 0},600),B.MarkEdit.editorAPI.setText(cd())}function cd(){const n=Be().cloneNode(!0);return n.querySelectorAll("[data-line-from],[data-line-to]").forEach(t=>{t.removeAttribute("data-line-from"),t.removeAttribute("data-line-to")}),$r.turndown(n.innerHTML)}const Ze={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body",updatePillClass:"markdown-update-pill"},Dt={viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"};var er=function(e,n){return Number(e.slice(0,-1*n.length))},ld=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:er(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:er(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:er(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},di=function(e){return e.split(" ").map(ld)},sd=function(e,n,t,r){t===void 0&&(t=0),r===void 0&&(r=!1);var u=r?e+1:e,o=n.slice(0,u).reduce(function(a,s){return a+s.numeric},0),c=t?e*t:0;return o+c},fi=function(e,n,t){return n.concat(t).map(function(r){return r.style[e]}).filter(function(r){return r!==void 0&&r!==""})},dd=function(e,n){return n.endsWith(e)?Number(n.slice(0,-1*e.length)):null},Su=function(e){for(var n=0;n<e.length;n++)if(e[n].numeric>0)return n;return null},We=function(){return!1},fd=function(e,n,t){e.style[n]=t},J=function(e,n,t){var r=e[n];return r!==void 0?r:t};function hi(e){var n;return(n=[]).concat.apply(n,Array.from(e.ownerDocument.styleSheets).map(function(t){var r=[];try{r=Array.from(t.cssRules||[])}catch{}return r})).filter(function(t){var r=!1;try{r=e.matches(t.selectorText)}catch{}return r})}var hd="grid-template-columns",pd="grid-template-rows",te=function(n,t,r){this.direction=n,this.element=t.element,this.track=t.track,n==="column"?(this.gridTemplateProp=hd,this.gridGapProp="grid-column-gap",this.cursor=J(r,"columnCursor",J(r,"cursor","col-resize")),this.snapOffset=J(r,"columnSnapOffset",J(r,"snapOffset",30)),this.dragInterval=J(r,"columnDragInterval",J(r,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=J(r,"gridTemplateColumns")):n==="row"&&(this.gridTemplateProp=pd,this.gridGapProp="grid-row-gap",this.cursor=J(r,"rowCursor",J(r,"cursor","row-resize")),this.snapOffset=J(r,"rowSnapOffset",J(r,"snapOffset",30)),this.dragInterval=J(r,"rowDragInterval",J(r,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=J(r,"gridTemplateRows")),this.onDragStart=J(r,"onDragStart",We),this.onDragEnd=J(r,"onDragEnd",We),this.onDrag=J(r,"onDrag",We),this.writeStyle=J(r,"writeStyle",fd),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=t.minSizeStart,this.minSizeEnd=t.minSizeEnd,t.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};te.prototype.getDimensions=function(){var n=this.grid.getBoundingClientRect(),t=n.width,r=n.height,u=n.top,o=n.bottom,c=n.left,a=n.right;this.direction==="column"?(this.start=u,this.end=o,this.size=r):this.direction==="row"&&(this.start=c,this.end=a,this.size=t)};te.prototype.getSizeAtTrack=function(n,t){return sd(n,this.computedPixels,this.computedGapPixels,t)};te.prototype.getSizeOfTrack=function(n){return this.computedPixels[n].numeric};te.prototype.getRawTracks=function(){var n=fi(this.gridTemplateProp,[this.grid],hi(this.grid));if(!n.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return n[0]};te.prototype.getGap=function(){var n=fi(this.gridGapProp,[this.grid],hi(this.grid));return n.length?n[0]:null};te.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};te.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};te.prototype.setTracks=function(n){this.tracks=n.split(" "),this.trackValues=di(n)};te.prototype.setComputedTracks=function(n){this.computedTracks=n.split(" "),this.computedPixels=di(n)};te.prototype.setGap=function(n){this.gap=n};te.prototype.setComputedGap=function(n){this.computedGap=n,this.computedGapPixels=dd("px",this.computedGap)||0};te.prototype.getMousePosition=function(n){return"touches"in n?n.touches[0][this.clientAxis]:n[this.clientAxis]};te.prototype.startDragging=function(n){if(!("button"in n&&n.button!==0)){n.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=n.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var t=this.trackValues.filter(function(a){return a.type==="%"}),r=this.trackValues.filter(function(a){return a.type==="fr"});if(this.totalFrs=r.length,this.totalFrs){var u=Su(r);u!==null&&(this.frToPixels=this.computedPixels[u].numeric/r[u].numeric)}if(t.length){var o=Su(t);o!==null&&(this.percentageToPixels=this.computedPixels[o].numeric/t[o].numeric)}var c=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(n)-c,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",We),this.grid.addEventListener("dragstart",We),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};te.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};te.prototype.drag=function(n){var t=this.getMousePosition(n),r=this.getSizeOfTrack(this.track),u=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,o=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(r-this.dragStartOffset),c=u+this.snapOffset,a=o-this.snapOffset;t<c&&(t=u),t>a&&(t=o),t<u?t=u:t>o&&(t=o);var s=t-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,d=this.bTrackEnd-t+this.dragStartOffset-r-this.computedGapPixels;if(this.dragInterval>1){var p=Math.round(s/this.dragInterval)*this.dragInterval;d-=p-s,s=p}if(s<this.minSizeStart&&(s=this.minSizeStart),d<this.minSizeEnd&&(d=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=s+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var l=s/this.frToPixels;this.tracks[this.aTrack]=l+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var f=s/this.percentageToPixels;this.tracks[this.aTrack]=f+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=d+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var h=d/this.frToPixels;this.tracks[this.bTrack]=h+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var b=d/this.percentageToPixels;this.tracks[this.bTrack]=b+"%"}var g=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,g),this.onDrag(this.direction,this.track,g)};te.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",We),this.grid.removeEventListener("dragstart",We),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};te.prototype.destroy=function(n,t){n===void 0&&(n=!0),n||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),t&&t()):(this.needsDestroy=!0,t&&(this.destroyCb=t))};var Du=function(e,n,t){return n in e?e[n]:t},pn=function(e,n){return function(t){if(t.track<1)throw Error("Invalid track index: "+t.track+". Track must be between two other tracks.");var r=e==="column"?n.columnMinSizes||{}:n.rowMinSizes||{},u=e==="column"?"columnMinSize":"rowMinSize";return new te(e,Object.assign({},{minSizeStart:Du(r,t.track-1,J(n,u,J(n,"minSize",0))),minSizeEnd:Du(r,t.track+1,J(n,u,J(n,"minSize",0)))},t),n)}},Ye=function(n){var t=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:n.columnGutters||[],rowGutters:n.rowGutters||[],columnMinSizes:n.columnMinSizes||{},rowMinSizes:n.rowMinSizes||{}},n),this.options.columnGutters.forEach(function(r){t.columnGutters[r.track]=pn("column",t.options)(r)}),this.options.rowGutters.forEach(function(r){t.rowGutters[r.track]=pn("row",t.options)(r)})};Ye.prototype.addColumnGutter=function(n,t){this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=pn("column",this.options)({element:n,track:t})};Ye.prototype.addRowGutter=function(n,t){this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=pn("row",this.options)({element:n,track:t})};Ye.prototype.removeColumnGutter=function(n,t){var r=this;t===void 0&&(t=!0),this.columnGutters[n]&&this.columnGutters[n].destroy(t,function(){delete r.columnGutters[n]})};Ye.prototype.removeRowGutter=function(n,t){var r=this;t===void 0&&(t=!0),this.rowGutters[n]&&this.rowGutters[n].destroy(t,function(){delete r.rowGutters[n]})};Ye.prototype.handleDragStart=function(n,t,r){t==="column"?(this.columnGutters[r]&&this.columnGutters[r].destroy(),this.columnGutters[r]=pn("column",this.options)({track:r}),this.columnGutters[r].startDragging(n)):t==="row"&&(this.rowGutters[r]&&this.rowGutters[r].destroy(),this.rowGutters[r]=pn("row",this.options)({track:r}),this.rowGutters[r].startDragging(n))};Ye.prototype.destroy=function(n){var t=this;n===void 0&&(n=!0),Object.keys(this.columnGutters).forEach(function(r){return t.columnGutters[r].destroy(n,function(){delete t.columnGutters[r]})}),Object.keys(this.rowGutters).forEach(function(r){return t.rowGutters[r].destroy(n,function(){delete t.rowGutters[r]})})};function md(e){return new Ye(e)}const bd=`body .markdown-body details summary,
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
`,gd=`/* ── Unified Formatting Toolbar ──────────────────────────────────────────────
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
`,kd=`/* ── Picker popovers ──────────────────────────────────────────────────────────
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

/* Dark mode — reuses the toolbar's own variables where they overlap. */
@media (prefers-color-scheme: dark) {
  .formatting-picker-popover {
    --toolbar-bg: rgba(36, 36, 36, 0.97);
    --toolbar-border: rgba(255,255,255,0.12);
    --toolbar-fg: #ddd;
    --toolbar-hover: rgba(255,255,255,0.1);
  }
}
`,gt=document.body,An=document.createElement("div"),K=document.createElement("div"),Tu=Ie("* { cursor: col-resize }",!1),pi=he.Annotation.define();var fe=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e))(fe||{});function yd(){Ie(bd),Ie(Po()),Ie(Bo()),Ie(zo()),Ie(gd),Ie(kd);const e=document.createElement("div");e.className=Ze.dividerViewClass,An.appendChild(e),An.className=Ze.gutterViewClass,gt.appendChild(An),K.className=Ze.previewPaneClass,gt.appendChild(K),document.addEventListener("keydown",r=>{if(!r.metaKey||r.key!=="a")return;const u=B.MarkEdit.editorView?.contentDOM??document.querySelector(".cm-content");(K.classList.contains("overlay")||document.activeElement!==u)&&(Di(K),r.preventDefault())}),new MutationObserver(Fu).observe(K,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{Fu(),document.querySelector(".mermaid")!==null&&On()}),typeof B.MarkEdit.getFileInfo=="function"&&typeof B.MarkEdit.openFile=="function"&&K.addEventListener("click",Fd),K.addEventListener("click",Md)}function Un(e,n=!0){const t=le();Oe.viewMode=e,e!==t&&localStorage.setItem(Dt.viewModeCacheKey,String(e));const r=B.MarkEdit.editorView;e===0?r.focus():e===2&&r.contentDOM.blur(),e===1?(gt.classList.add(Ze.containerClass),Oe.splitter??=md({columnGutters:[{track:1,element:An}],minSize:150,onDragStart:()=>Tu.disabled=!1,onDragEnd:()=>Tu.disabled=!0})):(gt.classList.remove(Ze.containerClass),Oe.splitter?.destroy(),Oe.splitter=void 0),e===2?K.classList.add("overlay"):K.classList.remove("overlay"),n&&On()}function xd(){const e=[0,...us.map(r=>{switch(r){case"side-by-side":return 1;case"preview":return 2;default:return}}).filter(r=>r!==void 0)],n=e.indexOf(le()),t=n===-1?0:(n+1)%e.length;Un(e[t])}function vd(){const e=localStorage.getItem(Dt.viewModeCacheKey);if(e===null)return;const n=Number(e);le()!==n&&Un(n,!0)}function le(){return Oe.viewMode}function dr(e){Oe.wysiwygEditLock=e}function wd(){return Oe.wysiwygEditLock}async function On(){if(Oe.wysiwygEditLock||le()===0)return;const e=Ur()?K.scrollTop:void 0,n=jo(await Tt());K.innerHTML=n,Lr(),requestAnimationFrame(()=>{$o(K),e!==void 0?K.scrollTop=e:cr(fr(),K,!1)}),qo(()=>{e===void 0&&cr(fr(),Be(),!1);const t=localStorage.getItem(Dt.previewPageZoomKey);t!==null&&(K.style.zoom=t)})}function Cd(e){if(le()===0||le()===1&&B.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;const n=Number(K.style.zoom)||1,t=r=>String(Math.min(Math.max(r,.5),3));switch(e.key){case"-":K.style.zoom=t(n-.1);break;case"=":K.style.zoom=t(n+.1);break;case"0":K.style.zoom="1";break;default:return}localStorage.setItem(Dt.previewPageZoomKey,K.style.zoom),e.preventDefault(),e.stopPropagation()}function _d(){mi(!1)}async function Ed(){const n=(await Gr(!0)).replace("</body>",'<script>window.addEventListener("load",()=>{window.print();});window.addEventListener("afterprint",()=>{window.close();});<\/script></body>'),u=B.MarkEdit.getDirectoryPath("home").replace(/\/Library\/Containers\/[^/]+\/Data\/?$/,"")+"/.markedit-print.html";if(!await B.MarkEdit.createFile({path:u,string:n,overwrites:!0})){await B.MarkEdit.showSavePanel({string:n,fileName:"print-rendered.html"});return}await B.MarkEdit.runService("Open URL","file://"+u)}function Ad(){mi(!0)}async function Sd(){const e=await Tt(!1);await navigator.clipboard.writeText(e)}async function Dd(){const e=await Tt(!1),n=new ClipboardItem({"text/html":new Blob([e],{type:"text/html"}),"text/plain":new Blob([K.innerText],{type:"text/plain"})});await navigator.clipboard.write([n])}function fr(){return B.MarkEdit.editorView.scrollDOM}function Be(){return K}async function Gr(e){const n=await Tt(!1);return e?await Ho(n):`<meta charset="UTF-8">
${n}`}async function Td(e,n){const t=await Ir(e,!1);return n?await Ho(t):`<meta charset="UTF-8">
${t}`}async function Tt(e=!0){const n=B.MarkEdit.editorAPI.getText();return await Ir(n,e)}function Fu(){const e=getComputedStyle(K).backgroundColor;An.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}async function mi(e){const n=await(async()=>{const r=await B.MarkEdit.getFileInfo();return r===void 0?`${G("untitled")}.html`:`${Si(r.filePath)}.html`})(),t=await Gr(e);B.MarkEdit.showSavePanel({fileName:n,string:t})}async function Fd(e){if(!(e.target instanceof Element))return;const n=e.target.closest("a");if(n===null)return;const t=n.getAttribute("href");if(!t?.startsWith("../"))return;const r=(await B.MarkEdit.getFileInfo())?.parentPath;if(r!==void 0){e.preventDefault(),e.stopPropagation();try{const u=rn(r,decodeURIComponent(t));await B.MarkEdit.openFile(u)}catch(u){console.error("Failed to open file:",u)}}}function Md(e){const n=e.target;if(!(n instanceof HTMLInputElement)||!n.classList.contains("task-list-item-checkbox"))return;const t=n.closest("[data-line-from]");if(t===null){console.error("Failed to find task item block");return}const r=B.MarkEdit.editorAPI,u=r.getLineRange(an(t).from),o=Ws(r.getText(u));if(o===null){n.checked=!n.checked,console.error("Failed to resolve task toggle");return}const c=u.from+o.offset;B.MarkEdit.editorView.dispatch({changes:{from:c,to:c+1,insert:o.replacement},annotations:pi.of(!0)})}const Oe={viewMode:0,splitter:void 0,wysiwygEditLock:!1};async function hr(){if(_n==="never")return;const e=await bi();typeof e.tag_name=="string"&&e.name!=="1.9.0"&&(yi().has(e.name)||(_n==="automatic"&&kr()?await Vr(e.tag_name):_n==="quiet"?(pr.pendingRelease=e,gi(e)):Rd(e)))}async function Id(){const e=Date.now(),n=Number(localStorage.getItem(mn.lastCheckCacheKey)??"0");if(!(e-n<2592e5))try{await hr(),localStorage.setItem(mn.lastCheckCacheKey,String(e))}catch(t){console.error("Failed to check for updates:",t)}}async function bi(){return await(await fetch(mn.latestReleaseURL)).json()}async function Vr(e){if(typeof __FILE_PATH__!="string")return console.error("Cannot download the latest build: unknown file path"),!1;try{const n=__FILE_PATH__,t="lite/",r=e===void 0?"main":`refs/tags/${encodeURIComponent(e)}`,u=`${mn.rawBaseURL}${r}/dist/${t}markedit-preview.js`,o=await fetch(u);if(!o.ok)return console.error(`Failed to download the latest build from ${u}`),!1;const c=await o.text();return await B.MarkEdit.createFile({path:n,string:c,overwrites:!0})}catch(n){return console.error("Failed to download the latest build:",n),!1}}function gi(e=pr.pendingRelease){if(e===void 0)return;const n=document.querySelector(`.${Ze.updatePillClass}`);if(n!==null){if(n.dataset.releaseName===e.name)return n;n.remove()}const t=document.createElement("button");return t.dataset.releaseName=e.name,t.className=Ze.updatePillClass,t.textContent=G("update"),t.style.display=le()===fe.edit?"none":"",t.addEventListener("webkitmouseforcedown",r=>{r.preventDefault()}),t.addEventListener("click",()=>{const{title:r,actions:u}=ki(e,()=>{pr.pendingRelease=void 0,t.remove()}),[o,...c]=u,a=t.getBoundingClientRect(),s={x:a.left,y:a.bottom+10};B.MarkEdit.showContextMenu([{title:r},o,{separator:!0},...c],s)}),document.body.appendChild(t),t}async function Rd(e){const{title:n,actions:t}=ki(e),r=await B.MarkEdit.showAlert({title:n,message:e.body,buttons:t.map(u=>u.title)});t[r]?.action?.()}function ki(e,n=()=>{}){const t=`MarkEdit-preview ${e.name} ${G("newVersionAvailable")}`,r=[...kr()?[{title:G("updateAndRelaunch"),action:async()=>{await Vr(e.tag_name)?B.MarkEdit.relaunchApp():B.MarkEdit.showAlert(G("failedToUpdate")),n()}}]:[],{title:G("viewReleasePage"),action:()=>{open(e.html_url),n()}},{title:G("remindMeLater"),action:n},{title:G("skipThisVersion"),action:()=>{const u=yi();u.add(e.name),localStorage.setItem(mn.skippedCacheKey,JSON.stringify([...u])),n()}}];return{title:t,actions:r}}function yi(){const e=localStorage.getItem(mn.skippedCacheKey);return new Set(JSON.parse(e??"[]"))}const mn={latestReleaseURL:"https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest",rawBaseURL:"https://raw.githubusercontent.com/MarkEdit-app/MarkEdit-preview/",lastCheckCacheKey:"updater.last-check-time",skippedCacheKey:"updater.skipped-versions"},pr={pendingRelease:void 0},mr="markedit-preview",Mu=`${mr}.js`;function Ld(e){const{destExists:n,bundleInfo:t,currentVersion:r}=e,u=t?.version===r,o=t?.fullBuild===!1;return!(n&&u&&o)}async function Nd(){try{const e=B.MarkEdit.getDirectoryPath("documents"),n=B.MarkEdit.getDirectoryPath("sharedContainer");if(e===void 0||n===void 0){console.error("Required directories are not accessible");return}const t=typeof __FILE_PATH__=="string"?__FILE_PATH__:rn(e,`scripts/${Mu}`);if(await B.MarkEdit.getFileInfo(t)===void 0){console.error(`Source file not found at ${t}`);return}const u=t.split("/").pop()??Mu,o=rn(n,"Shared/scripts"),c=rn(o,u),a=await B.MarkEdit.getFileInfo(c)!==void 0,s=rn(n,"Shared/metadata.json"),d=await Fi(s),p=d[mr];if(!Ld({destExists:a,bundleInfo:p,currentVersion:"1.9.0"}))return;const l=await B.MarkEdit.getFileContent(t);if(l===void 0){console.error(`Failed to read content from ${t}`);return}await B.MarkEdit.createFile({path:o,isDirectory:!0}),await B.MarkEdit.createFile({path:c,string:l,overwrites:!0}),await B.MarkEdit.createFile({path:s,string:JSON.stringify({...d,[mr]:{version:"1.9.0",fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error("Failed to copy the current file to shared container:",e)}}const Od='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>',Pd='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>';function Bd(){const e=Iu(G("source"),Od),n=Iu(G("preview"),Pd),t=document.createElement("div");t.className="quicklook-segmented",t.setAttribute("role","tablist"),t.append(e,n);const r=document.createElement("div");return r.className="quicklook-toolbar",r.appendChild(t),{toolbar:r,sourceButton:e,previewButton:n}}function Iu(e,n){const t=document.createElement("button");t.title=e,t.type="button",t.className="quicklook-segment",t.setAttribute("role","tab"),t.setAttribute("aria-label",e);const r=document.createElement("span");r.textContent=e,r.className="quicklook-segment-label";const u=document.createElement("span");return u.innerHTML=n,u.className="quicklook-segment-icon",t.append(r,u),t}function nn(){if(tn!==void 0)return tn;try{tn=localStorage.getItem(xi)==="preview"?"preview":"source"}catch{console.error("Failed to read quick look mode from localStorage"),tn="source"}return tn}function Ru(e){tn=e;try{localStorage.setItem(xi,e)}catch{console.error("Failed to write quick look mode to localStorage")}}let tn;const xi="ui.quicklook-mode";function zd(){const e=window,n=e.editor?.state?.doc.toString();return typeof n=="string"?n:(console.error("Failed to get text from host editor state"),e.config?.text??"")}function qd(){document.addEventListener("webkitmouseforcewillbegin",e=>{const n=e.target;n instanceof Element&&n.closest("a")!==null&&e.preventDefault()})}function Hd(e,n){const t=window,r=t.pinchZoomTarget;t.pinchZoomTarget=()=>{if(e()!=="preview")return r?.()??null;const u=n.querySelector(".quicklook-content");return u!==null?{scroller:n,inner:u}:null};for(const u of["gesturechange","gestureend"])document.addEventListener(u,()=>{if(e()!=="preview")return;const o=n.querySelector(".quicklook-content");o?.style.zoom.length?o?.style.setProperty("--quicklook-zoom",o.style.zoom):o?.style.removeProperty("--quicklook-zoom")},{passive:!1})}function jd(e,n){let t;const r=window,u={start:r.startDragging,update:r.updateDragging,cancel:r.cancelDragging},o=()=>{const a=n.clientHeight,s=n.scrollHeight,d=s-a;if(d<=0||s<=0)return{clientHeight:a,scrollHeight:s,scrollbarHeight:a,scrollbarTop:0};const p=a*(a/s),f=n.scrollTop/d*(a-p);return{clientHeight:a,scrollHeight:s,scrollbarHeight:p,scrollbarTop:f}},c=(a,s,d="auto")=>{const{clientHeight:p,scrollHeight:l,scrollbarHeight:f}=o(),h=p-f;if(h>0){const b=(a-s)/h;n.scrollTo({top:b*(l-p),behavior:d})}};r.startDragging=a=>{if(e()!=="preview"){u.start?.(a);return}const{scrollbarTop:s,scrollbarHeight:d}=o(),p=Lu(n,a);t=p-s,(p<s||p>s+d)&&c(p,d*.5,"smooth")},r.updateDragging=a=>{if(e()!=="preview"){u.update?.(a);return}t!==void 0&&c(Lu(n,a),t)},r.cancelDragging=()=>{if(e()!=="preview"){u.cancel?.();return}t=void 0}}function $d(e,n,t){t.addEventListener("wheel",r=>{const u=e()==="preview"?n:document.querySelector(".cm-scroller");u!==null&&(u.scrollTop+=r.deltaY,u.scrollLeft+=r.deltaX,r.preventDefault())},{passive:!1})}function Ud(e,n,t){const r=document.querySelector(".cm-scroller"),u=()=>{const c=(e()==="preview"?n:r)?.scrollTop??0;t.classList.toggle("scrolled",c>0),t.classList.toggle("scrolled-far",c>20)};return n.addEventListener("scroll",u,{passive:!0}),r?.addEventListener("scroll",u,{passive:!0}),u}function Gd(e){document.addEventListener("copy",n=>{if(!e.classList.contains("overlay"))return;const t=getSelection(),r=t!==null&&t.rangeCount>0?t.getRangeAt(0):null,u=r!==null&&!r.collapsed&&e.contains(r.commonAncestorContainer)?r:null,o=u??(()=>{const a=document.createRange();return a.selectNodeContents(e),a})(),c=document.createElement("div");c.appendChild(o.cloneContents()),n.clipboardData?.setData("text/html",c.innerHTML),n.clipboardData?.setData("text/plain",u!==null?u.toString():e.innerText),n.preventDefault(),n.stopPropagation()},!0)}function Lu(e,n){return n-e.getBoundingClientRect().top}const Vd=`body {
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
`;function Zd(e){Ie(Vd),document.body.classList.add("quicklook");const{toolbar:n,sourceButton:t,previewButton:r}=Bd();document.body.appendChild(n);const u=Wd(e),o=Ud(nn,e,n),c={previewPane:e,sourceButton:t,previewButton:r,refreshSeparator:o,ensureRendered:u.ensureRendered};t.addEventListener("click",()=>{Ru("source"),nr(c)}),r.addEventListener("click",()=>{Ru("preview"),nr(c)}),nr(c),setTimeout(u.ensureRendered,0),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e.querySelector(".mermaid")!==null&&(u.invalidate(),nn()==="preview"&&u.ensureRendered())}),qd(),Hd(nn,e),jd(nn,e),$d(nn,e,n),Gd(e)}function nr(e){const n=nn()==="source",t=!n;e.sourceButton.classList.toggle("active",n),e.previewButton.classList.toggle("active",t),e.sourceButton.setAttribute("aria-selected",String(n)),e.previewButton.setAttribute("aria-selected",String(t)),e.previewPane.classList.toggle("overlay",t),e.refreshSeparator(),t&&e.ensureRendered()}function Wd(e){let n=!1,t;return{ensureRendered:()=>(n||t||(t=(async()=>{try{const o=jo(await Ir(zd(),!1));e.innerHTML=`<div class="quicklook-content">${o}</div>`,e.querySelectorAll("a[href]").forEach(c=>{c.removeAttribute("href"),c.removeAttribute("target")}),qo(()=>{}),n=!0}catch(o){throw t=void 0,o}})()),t),invalidate:()=>{n=!1,t=void 0}}}var at={exports:{}};var Kd=at.exports,Nu;function Yd(){return Nu||(Nu=1,(function(e,n){(function(t,r){e.exports=r()})(Kd,(function(){var t=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(d){return typeof d}:function(d){return d&&typeof Symbol=="function"&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d},r=function(d,p){if(!(d instanceof p))throw new TypeError("Cannot call a class as a function")},u=(function(){function d(p,l){for(var f=0;f<l.length;f++){var h=l[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(p,h.key,h)}}return function(p,l,f){return l&&d(p.prototype,l),f&&d(p,f),p}})(),o=Object.assign||function(d){for(var p=1;p<arguments.length;p++){var l=arguments[p];for(var f in l)Object.prototype.hasOwnProperty.call(l,f)&&(d[f]=l[f])}return d},c=(function(){function d(p){var l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],h=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;r(this,d),this.ctx=p,this.iframes=l,this.exclude=f,this.iframesTimeout=h}return u(d,[{key:"getContexts",value:function(){var l=void 0,f=[];return typeof this.ctx>"u"||!this.ctx?l=[]:NodeList.prototype.isPrototypeOf(this.ctx)?l=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?l=this.ctx:typeof this.ctx=="string"?l=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):l=[this.ctx],l.forEach(function(h){var b=f.filter(function(g){return g.contains(h)}).length>0;f.indexOf(h)===-1&&!b&&f.push(h)}),f}},{key:"getIframeContents",value:function(l,f){var h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},b=void 0;try{var g=l.contentWindow;if(b=g.document,!g||!b)throw new Error("iframe inaccessible")}catch{h()}b&&f(b)}},{key:"isIframeBlank",value:function(l){var f="about:blank",h=l.getAttribute("src").trim(),b=l.contentWindow.location.href;return b===f&&h!==f&&h}},{key:"observeIframeLoad",value:function(l,f,h){var b=this,g=!1,k=null,y=function w(){if(!g){g=!0,clearTimeout(k);try{b.isIframeBlank(l)||(l.removeEventListener("load",w),b.getIframeContents(l,f,h))}catch{h()}}};l.addEventListener("load",y),k=setTimeout(y,this.iframesTimeout)}},{key:"onIframeReady",value:function(l,f,h){try{l.contentWindow.document.readyState==="complete"?this.isIframeBlank(l)?this.observeIframeLoad(l,f,h):this.getIframeContents(l,f,h):this.observeIframeLoad(l,f,h)}catch{h()}}},{key:"waitForIframes",value:function(l,f){var h=this,b=0;this.forEachIframe(l,function(){return!0},function(g){b++,h.waitForIframes(g.querySelector("html"),function(){--b||f()})},function(g){g||f()})}},{key:"forEachIframe",value:function(l,f,h){var b=this,g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},k=l.querySelectorAll("iframe"),y=k.length,w=0;k=Array.prototype.slice.call(k);var E=function(){--y<=0&&g(w)};y||E(),k.forEach(function(A){d.matches(A,b.exclude)?E():b.onIframeReady(A,function(R){f(A)&&(w++,h(R)),E()},E)})}},{key:"createIterator",value:function(l,f,h){return document.createNodeIterator(l,f,h,!1)}},{key:"createInstanceOnIframe",value:function(l){return new d(l.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(l,f,h){var b=l.compareDocumentPosition(h),g=Node.DOCUMENT_POSITION_PRECEDING;if(b&g)if(f!==null){var k=f.compareDocumentPosition(h),y=Node.DOCUMENT_POSITION_FOLLOWING;if(k&y)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(l){var f=l.previousNode(),h=void 0;return f===null?h=l.nextNode():h=l.nextNode()&&l.nextNode(),{prevNode:f,node:h}}},{key:"checkIframeFilter",value:function(l,f,h,b){var g=!1,k=!1;return b.forEach(function(y,w){y.val===h&&(g=w,k=y.handled)}),this.compareNodeIframe(l,f,h)?(g===!1&&!k?b.push({val:h,handled:!0}):g!==!1&&!k&&(b[g].handled=!0),!0):(g===!1&&b.push({val:h,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(l,f,h,b){var g=this;l.forEach(function(k){k.handled||g.getIframeContents(k.val,function(y){g.createInstanceOnIframe(y).forEachNode(f,h,b)})})}},{key:"iterateThroughNodes",value:function(l,f,h,b,g){for(var k=this,y=this.createIterator(f,l,b),w=[],E=[],A=void 0,R=void 0,N=function(){var U=k.getIteratorNode(y);return R=U.prevNode,A=U.node,A};N();)this.iframes&&this.forEachIframe(f,function(j){return k.checkIframeFilter(A,R,j,w)},function(j){k.createInstanceOnIframe(j).forEachNode(l,function(U){return E.push(U)},b)}),E.push(A);E.forEach(function(j){h(j)}),this.iframes&&this.handleOpenIframes(w,l,h,b),g()}},{key:"forEachNode",value:function(l,f,h){var b=this,g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},k=this.getContexts(),y=k.length;y||g(),k.forEach(function(w){var E=function(){b.iterateThroughNodes(l,w,f,h,function(){--y<=0&&g()})};b.iframes?b.waitForIframes(w,E):E()})}}],[{key:"matches",value:function(l,f){var h=typeof f=="string"?[f]:f,b=l.matches||l.matchesSelector||l.msMatchesSelector||l.mozMatchesSelector||l.oMatchesSelector||l.webkitMatchesSelector;if(b){var g=!1;return h.every(function(k){return b.call(l,k)?(g=!0,!1):!0}),g}else return!1}}]),d})(),a=(function(){function d(p){r(this,d),this.ctx=p,this.ie=!1;var l=window.navigator.userAgent;(l.indexOf("MSIE")>-1||l.indexOf("Trident")>-1)&&(this.ie=!0)}return u(d,[{key:"log",value:function(l){var f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",h=this.opt.log;this.opt.debug&&(typeof h>"u"?"undefined":t(h))==="object"&&typeof h[f]=="function"&&h[f]("mark.js: "+l)}},{key:"escapeStr",value:function(l){return l.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(l){return this.opt.wildcards!=="disabled"&&(l=this.setupWildcardsRegExp(l)),l=this.escapeStr(l),Object.keys(this.opt.synonyms).length&&(l=this.createSynonymsRegExp(l)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.setupIgnoreJoinersRegExp(l)),this.opt.diacritics&&(l=this.createDiacriticsRegExp(l)),l=this.createMergedBlanksRegExp(l),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.createJoinersRegExp(l)),this.opt.wildcards!=="disabled"&&(l=this.createWildcardsRegExp(l)),l=this.createAccuracyRegExp(l),l}},{key:"createSynonymsRegExp",value:function(l){var f=this.opt.synonyms,h=this.opt.caseSensitive?"":"i",b=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var g in f)if(f.hasOwnProperty(g)){var k=f[g],y=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(g):this.escapeStr(g),w=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(k):this.escapeStr(k);y!==""&&w!==""&&(l=l.replace(new RegExp("("+this.escapeStr(y)+"|"+this.escapeStr(w)+")","gm"+h),b+("("+this.processSynomyms(y)+"|")+(this.processSynomyms(w)+")")+b))}return l}},{key:"processSynomyms",value:function(l){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(l=this.setupIgnoreJoinersRegExp(l)),l}},{key:"setupWildcardsRegExp",value:function(l){return l=l.replace(/(?:\\)*\?/g,function(f){return f.charAt(0)==="\\"?"?":""}),l.replace(/(?:\\)*\*/g,function(f){return f.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(l){var f=this.opt.wildcards==="withSpaces";return l.replace(/\u0001/g,f?"[\\S\\s]?":"\\S?").replace(/\u0002/g,f?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(l){return l.replace(/[^(|)\\]/g,function(f,h,b){var g=b.charAt(h+1);return/[(|)\\]/.test(g)||g===""?f:f+"\0"})}},{key:"createJoinersRegExp",value:function(l){var f=[],h=this.opt.ignorePunctuation;return Array.isArray(h)&&h.length&&f.push(this.escapeStr(h.join(""))),this.opt.ignoreJoiners&&f.push("\\u00ad\\u200b\\u200c\\u200d"),f.length?l.split(/\u0000+/).join("["+f.join("")+"]*"):l}},{key:"createDiacriticsRegExp",value:function(l){var f=this.opt.caseSensitive?"":"i",h=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],b=[];return l.split("").forEach(function(g){h.every(function(k){if(k.indexOf(g)!==-1){if(b.indexOf(k)>-1)return!1;l=l.replace(new RegExp("["+k+"]","gm"+f),"["+k+"]"),b.push(k)}return!0})}),l}},{key:"createMergedBlanksRegExp",value:function(l){return l.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(l){var f=this,h="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",b=this.opt.accuracy,g=typeof b=="string"?b:b.value,k=typeof b=="string"?[]:b.limiters,y="";switch(k.forEach(function(w){y+="|"+f.escapeStr(w)}),g){case"partially":default:return"()("+l+")";case"complementary":return y="\\s"+(y||this.escapeStr(h)),"()([^"+y+"]*"+l+"[^"+y+"]*)";case"exactly":return"(^|\\s"+y+")("+l+")(?=$|\\s"+y+")"}}},{key:"getSeparatedKeywords",value:function(l){var f=this,h=[];return l.forEach(function(b){f.opt.separateWordSearch?b.split(" ").forEach(function(g){g.trim()&&h.indexOf(g)===-1&&h.push(g)}):b.trim()&&h.indexOf(b)===-1&&h.push(b)}),{keywords:h.sort(function(b,g){return g.length-b.length}),length:h.length}}},{key:"isNumeric",value:function(l){return Number(parseFloat(l))==l}},{key:"checkRanges",value:function(l){var f=this;if(!Array.isArray(l)||Object.prototype.toString.call(l[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(l),[];var h=[],b=0;return l.sort(function(g,k){return g.start-k.start}).forEach(function(g){var k=f.callNoMatchOnInvalidRanges(g,b),y=k.start,w=k.end,E=k.valid;E&&(g.start=y,g.length=w-y,h.push(g),b=w)}),h}},{key:"callNoMatchOnInvalidRanges",value:function(l,f){var h=void 0,b=void 0,g=!1;return l&&typeof l.start<"u"?(h=parseInt(l.start,10),b=h+parseInt(l.length,10),this.isNumeric(l.start)&&this.isNumeric(l.length)&&b-f>0&&b-h>0?g=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(l))),this.opt.noMatch(l))):(this.log("Ignoring invalid range: "+JSON.stringify(l)),this.opt.noMatch(l)),{start:h,end:b,valid:g}}},{key:"checkWhitespaceRanges",value:function(l,f,h){var b=void 0,g=!0,k=h.length,y=f-k,w=parseInt(l.start,10)-y;return w=w>k?k:w,b=w+parseInt(l.length,10),b>k&&(b=k,this.log("End range automatically set to the max value of "+k)),w<0||b-w<0||w>k||b>k?(g=!1,this.log("Invalid range: "+JSON.stringify(l)),this.opt.noMatch(l)):h.substring(w,b).replace(/\s+/g,"")===""&&(g=!1,this.log("Skipping whitespace only range: "+JSON.stringify(l)),this.opt.noMatch(l)),{start:w,end:b,valid:g}}},{key:"getTextNodes",value:function(l){var f=this,h="",b=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(g){b.push({start:h.length,end:(h+=g.textContent).length,node:g})},function(g){return f.matchesExclude(g.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){l({value:h,nodes:b})})}},{key:"matchesExclude",value:function(l){return c.matches(l,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(l,f,h){var b=this.opt.element?this.opt.element:"mark",g=l.splitText(f),k=g.splitText(h-f),y=document.createElement(b);return y.setAttribute("data-markjs","true"),this.opt.className&&y.setAttribute("class",this.opt.className),y.textContent=g.textContent,g.parentNode.replaceChild(y,g),k}},{key:"wrapRangeInMappedTextNode",value:function(l,f,h,b,g){var k=this;l.nodes.every(function(y,w){var E=l.nodes[w+1];if(typeof E>"u"||E.start>f){if(!b(y.node))return!1;var A=f-y.start,R=(h>y.end?y.end:h)-y.start,N=l.value.substr(0,y.start),j=l.value.substr(R+y.start);if(y.node=k.wrapRangeInTextNode(y.node,A,R),l.value=N+j,l.nodes.forEach(function(U,Q){Q>=w&&(l.nodes[Q].start>0&&Q!==w&&(l.nodes[Q].start-=R),l.nodes[Q].end-=R)}),h-=R,g(y.node.previousSibling,y.start),h>y.end)f=y.end;else return!1}return!0})}},{key:"wrapMatches",value:function(l,f,h,b,g){var k=this,y=f===0?0:f+1;this.getTextNodes(function(w){w.nodes.forEach(function(E){E=E.node;for(var A=void 0;(A=l.exec(E.textContent))!==null&&A[y]!=="";)if(h(A[y],E)){var R=A.index;if(y!==0)for(var N=1;N<y;N++)R+=A[N].length;E=k.wrapRangeInTextNode(E,R,R+A[y].length),b(E.previousSibling),l.lastIndex=0}}),g()})}},{key:"wrapMatchesAcrossElements",value:function(l,f,h,b,g){var k=this,y=f===0?0:f+1;this.getTextNodes(function(w){for(var E=void 0;(E=l.exec(w.value))!==null&&E[y]!=="";){var A=E.index;if(y!==0)for(var R=1;R<y;R++)A+=E[R].length;var N=A+E[y].length;k.wrapRangeInMappedTextNode(w,A,N,function(j){return h(E[y],j)},function(j,U){l.lastIndex=U,b(j)})}g()})}},{key:"wrapRangeFromIndex",value:function(l,f,h,b){var g=this;this.getTextNodes(function(k){var y=k.value.length;l.forEach(function(w,E){var A=g.checkWhitespaceRanges(w,y,k.value),R=A.start,N=A.end,j=A.valid;j&&g.wrapRangeInMappedTextNode(k,R,N,function(U){return f(U,w,k.value.substring(R,N),E)},function(U){h(U,w)})}),b()})}},{key:"unwrapMatches",value:function(l){for(var f=l.parentNode,h=document.createDocumentFragment();l.firstChild;)h.appendChild(l.removeChild(l.firstChild));f.replaceChild(h,l),this.ie?this.normalizeTextNode(f):f.normalize()}},{key:"normalizeTextNode",value:function(l){if(l){if(l.nodeType===3)for(;l.nextSibling&&l.nextSibling.nodeType===3;)l.nodeValue+=l.nextSibling.nodeValue,l.parentNode.removeChild(l.nextSibling);else this.normalizeTextNode(l.firstChild);this.normalizeTextNode(l.nextSibling)}}},{key:"markRegExp",value:function(l,f){var h=this;this.opt=f,this.log('Searching with expression "'+l+'"');var b=0,g="wrapMatches",k=function(w){b++,h.opt.each(w)};this.opt.acrossElements&&(g="wrapMatchesAcrossElements"),this[g](l,this.opt.ignoreGroups,function(y,w){return h.opt.filter(w,y,b)},k,function(){b===0&&h.opt.noMatch(l),h.opt.done(b)})}},{key:"mark",value:function(l,f){var h=this;this.opt=f;var b=0,g="wrapMatches",k=this.getSeparatedKeywords(typeof l=="string"?[l]:l),y=k.keywords,w=k.length,E=this.opt.caseSensitive?"":"i",A=function R(N){var j=new RegExp(h.createRegExp(N),"gm"+E),U=0;h.log('Searching with expression "'+j+'"'),h[g](j,1,function(Q,se){return h.opt.filter(se,N,b,U)},function(Q){U++,b++,h.opt.each(Q)},function(){U===0&&h.opt.noMatch(N),y[w-1]===N?h.opt.done(b):R(y[y.indexOf(N)+1])})};this.opt.acrossElements&&(g="wrapMatchesAcrossElements"),w===0?this.opt.done(b):A(y[0])}},{key:"markRanges",value:function(l,f){var h=this;this.opt=f;var b=0,g=this.checkRanges(l);g&&g.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(g)),this.wrapRangeFromIndex(g,function(k,y,w,E){return h.opt.filter(k,y,w,E)},function(k,y){b++,h.opt.each(k,y)},function(){h.opt.done(b)})):this.opt.done(b)}},{key:"unmark",value:function(l){var f=this;this.opt=l;var h=this.opt.element?this.opt.element:"*";h+="[data-markjs]",this.opt.className&&(h+="."+this.opt.className),this.log('Removal selector "'+h+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(b){f.unwrapMatches(b)},function(b){var g=c.matches(b,h),k=f.matchesExclude(b);return!g||k?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(l){this._opt=o({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},l)},get:function(){return this._opt}},{key:"iterator",get:function(){return new c(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),d})();function s(d){var p=this,l=new a(d);return this.mark=function(f,h){return l.mark(f,h),p},this.markRegExp=function(f,h){return l.markRegExp(f,h),p},this.markRanges=function(f,h){return l.markRanges(f,h),p},this.unmark=function(f){return l.unmark(f),p},this}return s}))})(at)),at.exports}var Jd=Yd();const vi=_t(Jd),Sn="markedit-preview-mark",wi="markedit-preview-mark-highlighted";let Cn=!1,Zr,Fe=0,ge=[],Dn=null,ot=null;const Ou={github:{light:"#fae17d7f",dark:"#f2cc607f"},cobalt:{light:"#cad40f66",dark:"#cad40f66"},dracula:{light:"#ffffff40",dark:"#ffffff40"},minimal:{light:"#fae17d7f",dark:"#f2cc607f"},"night-owl":{light:"#5f7e9779",dark:"#5f7e9779"},"rose-pine":{light:"#6e6a864c",dark:"#6e6a8666"},solarized:{light:"#f4c09d",dark:"#584032"},synthwave84:{light:"#d18616bb",dark:"#d18616bb"},"winter-is-coming":{light:"#cee1f0",dark:"#103362"},xcode:{light:"#e4e4e4",dark:"#545558"}};function Qd(e){if(Zr=e,Fe=0,e.search.length===0){Ci();return}const n=Be();_i(n),nf(n)}function Xd(e){ge.length!==0&&(Fe=e%ge.length,Ei())}function Ci(){Dn?.disconnect(),Dn=null,Zr=void 0,Fe=0,ge=[],new vi(Be()).unmark()}function ef(){if(le()===fe.preview)return{numberOfItems:ge.length,currentIndex:Fe}}function _i(e){const n=Zr;if(n===void 0||n.search.length===0||Cn)return;tf(),Cn=!0;const{search:t,caseSensitive:r,wholeWord:u,diacriticInsensitive:o,regexp:c}=n,a=new vi(e),s=()=>{ge=Array.from(e.querySelectorAll(`.${Sn}`)),Fe=ge.length>0?Math.min(Fe,ge.length-1):0,Ei(),Cn=!1};a.unmark({done:()=>{if(c)try{const d=r?"":"i";a.markRegExp(new RegExp(t,d),{className:Sn,done:s})}catch{Cn=!1,Fe=0,ge=[]}else a.mark(t,{className:Sn,caseSensitive:r,diacritics:o,separateWordSearch:!1,accuracy:u?"exactly":"partially",done:s})}})}function Ei(){const e=le()!==fe.sideBySide;ge.forEach((n,t)=>{n.classList.toggle(wi,e&&t===Fe)}),e&&ge.length>0&&ge[Fe].scrollIntoView({behavior:"smooth",block:"center"})}function nf(e){Dn?.disconnect(),Dn=new MutationObserver(()=>{Cn||_i(e)}),Dn.observe(e,{childList:!0})}function tf(){ot===null&&(ot=document.createElement("style"),document.head.appendChild(ot));const{light:e,dark:n}=Ou[Et]??Ou.github;ot.textContent=[`.${Sn} { background: ${e} !important; color: inherit !important; }`,`.${wi} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,"@media (prefers-color-scheme: dark) {",`  .${Sn} { background: ${n} !important; }`,"}"].join(`
`)}window.__markeditPreviewInitialized__?console.error("MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior."):(yd(),Mr()?(typeof B.MarkEdit.onAppReady=="function"?B.MarkEdit.onAppReady(()=>{Nd(),setTimeout(()=>{hr()},2e3),af()}):setTimeout(()=>{Id()},4e3),(_n==="automatic"||_n==="quiet")&&setInterval(()=>{hr()},6048e5)):Zd(Be()),window.__markeditPreviewInitialized__=!0);window.MarkEditGetHtml??=Gr;window.MarkEditRenderHtml??=Td;window.__markeditPreviewSPI__={performSearch:Qd,setSearchMatchIndex:Xd,clearSearch:Ci,searchCounterInfo:ef};Mr()&&(B.MarkEdit.addMainMenuItem({title:G("viewMode"),icon:Ai()?"eye":void 0,children:[{title:G("changeMode"),action:()=>{xd(),br()},key:vu.key??"V",modifiers:vu.modifiers??["Command"]},{separator:!0},tr(G("editMode"),fe.edit),tr(G("sideBySideMode"),fe.sideBySide),tr(G("previewMode"),fe.preview),{separator:!0},...uf(),{separator:!0},{title:"WYSIWYG Editing",action:rf,state:()=>({isSelected:Ur()})},{separator:!0},{title:`${G("version")} 1.9.0`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.9.0")},{title:`${G("checkReleases")} (GitHub)`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/latest")},...kr()?[{title:G("updateAndRelaunch"),action:async()=>{const e=await bi();await Vr(e.tag_name)?B.MarkEdit.relaunchApp():B.MarkEdit.showAlert(G("failedToUpdate"))}}]:[]]}),B.MarkEdit.addExtension(X0()),ud(),B.MarkEdit.addExtension(gr.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(n=>n.annotation(pi))||($e.renderUpdater!==void 0&&clearTimeout($e.renderUpdater),$e.renderUpdater=setTimeout(On,500)))})),B.MarkEdit.onEditorReady(()=>{rs&&Ps(B.MarkEdit.editorView.scrollDOM),vd(),requestAnimationFrame(async()=>{document.visibilityState==="visible"&&le()===fe.preview&&typeof B.MarkEdit.getFileInfo=="function"&&(await B.MarkEdit.getFileInfo())?.filePath===void 0&&B.MarkEdit.editorAPI.getText().length===0&&Un(fe.edit,!1)}),On(),br(),Hs(fr(),Be()),li(),$e.keyDownListener!==void 0&&document.removeEventListener("keydown",$e.keyDownListener),$e.keyDownListener=e=>Cd(e),document.addEventListener("keydown",$e.keyDownListener)}));function rf(){Ur()?ad():(le()===fe.edit&&Un(fe.sideBySide,!0),li())}function tr(e,n){return{title:e,action:()=>{Un(n),br()},state:()=>({isSelected:le()===n})}}function uf(){const e=[{title:G("copyHtml"),action:Sd},{title:G("copyRichText"),action:Dd}];return typeof B.MarkEdit.showSavePanel>"u"?e:[{title:G("saveCleanHtml"),action:_d},{title:G("saveStyledHtml"),action:Ad},{title:G("printRendered"),action:Ed},...e]}function br(){const e=gi();e!==void 0&&(e.style.display=le()===fe.edit?"none":"")}const of="1.8.0";async function af(){try{const e=await fetch("https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest");if(!e.ok)return;const t=(await e.json()).tag_name.replace(/^v/,""),r=`fork-upstream-notified-${t}`;t>of&&localStorage.getItem(r)===null&&(localStorage.setItem(r,"1"),await B.MarkEdit.showAlert({title:`Upstream MarkEdit-preview ${t} Available`,message:`The upstream shipped v${t}. Say "update markedit" in Cowork or run:
  cd ~/Developer/markedit-preview && bash update.sh`,buttons:["Got it"]}))}catch{}}const $e={renderUpdater:void 0,keyDownListener:void 0};
