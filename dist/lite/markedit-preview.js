"use strict";(()=>{const e=globalThis;if(typeof e.require>"u"){const n={"markedit-api":{MarkEdit:e.MarkEdit??Object.freeze({})},"@codemirror/view":{EditorView:{updateListener:{of:()=>({})}}},"@codemirror/state":{Annotation:{define:()=>({of:()=>({})})}}};e.require=t=>n[t]??{}}})();const si=require("@codemirror/view"),q=require("markedit-api"),di=require("@codemirror/state");function fi(){const e=navigator.userAgent.match(/macOS\/(\d+)/);return e===null?!1:parseInt(e[1])>=26}function cr(){return typeof __FILE_PATH__=="string"}function en(e,n=!0){const t=document.createElement("style");return t.textContent=e,document.head.appendChild(t),t.disabled=!n,t}function Pr(e){return e?.match(/--bgColor-default:\s*([^;]+);/)?.[1]?.trim()}function pi(e){return(e.split("/").pop()??e).split(".").slice(0,-1).join(".")}function rn(e){const n=parseInt(e.dataset.lineFrom??"0"),t=parseInt(e.dataset.lineTo??"0");return{from:n,to:t}}function ut(e,n){let t=0,r=n;for(;r!==null&&r!==e;)t+=r.offsetTop,r=r.offsetParent;return t}function Mt(e,n,t,r=!0){const u=ut(e,n)+n.offsetHeight*t;tt(e,u,r)}function tt(e,n,t=!0){const r=parseFloat(getComputedStyle(e).paddingTop);e.scrollTo({top:n<=r?0:n,behavior:t?"smooth":"instant"})}function hi(e){const n=document.createRange();n.selectNodeContents(e);const t=getSelection();t?.removeAllRanges(),t?.addRange(n)}function bi(e){return/^(https?:)?\/\//.test(e)?!1:/\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/i.test(e)}function nn(e,n){return e.endsWith("/")?e+n:e+"/"+n}async function mi(e){const n=await q.MarkEdit.getFileContent(e);if(n===void 0)return{};try{const t=JSON.parse(n);return typeof t=="object"&&t!==null?t:{}}catch(t){return console.error(`Failed to parse JSON from ${e}:`,t),{}}}const Br={};function gi(e){let n=Br[e];if(n)return n;n=Br[e]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);n.push(r)}for(let t=0;t<e.length;t++){const r=e.charCodeAt(t);n[r]="%"+("0"+r.toString(16).toUpperCase()).slice(-2)}return n}function on(e,n){typeof n!="string"&&(n=on.defaultChars);const t=gi(n);return e.replace(/(%[a-f0-9]{2})+/gi,function(r){let u="";for(let i=0,l=r.length;i<l;i+=3){const a=parseInt(r.slice(i+1,i+3),16);if(a<128){u+=t[a];continue}if((a&224)===192&&i+3<l){const s=parseInt(r.slice(i+4,i+6),16);if((s&192)===128){const d=a<<6&1984|s&63;d<128?u+="��":u+=String.fromCharCode(d),i+=3;continue}}if((a&240)===224&&i+6<l){const s=parseInt(r.slice(i+4,i+6),16),d=parseInt(r.slice(i+7,i+9),16);if((s&192)===128&&(d&192)===128){const b=a<<12&61440|s<<6&4032|d&63;b<2048||b>=55296&&b<=57343?u+="���":u+=String.fromCharCode(b),i+=6;continue}}if((a&248)===240&&i+9<l){const s=parseInt(r.slice(i+4,i+6),16),d=parseInt(r.slice(i+7,i+9),16),b=parseInt(r.slice(i+10,i+12),16);if((s&192)===128&&(d&192)===128&&(b&192)===128){let c=a<<18&1835008|s<<12&258048|d<<6&4032|b&63;c<65536||c>1114111?u+="����":(c-=65536,u+=String.fromCharCode(55296+(c>>10),56320+(c&1023))),i+=9;continue}}u+="�"}return u})}on.defaultChars=";/?:@&=+$,#";on.componentChars="";const zr={};function ki(e){let n=zr[e];if(n)return n;n=zr[e]=[];for(let t=0;t<128;t++){const r=String.fromCharCode(t);/^[0-9a-z]$/i.test(r)?n.push(r):n.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<e.length;t++)n[e.charCodeAt(t)]=e[t];return n}function Rn(e,n,t){typeof n!="string"&&(t=n,n=Rn.defaultChars),typeof t>"u"&&(t=!0);const r=ki(n);let u="";for(let i=0,l=e.length;i<l;i++){const a=e.charCodeAt(i);if(t&&a===37&&i+2<l&&/^[0-9a-f]{2}$/i.test(e.slice(i+1,i+3))){u+=e.slice(i,i+3),i+=2;continue}if(a<128){u+=r[a];continue}if(a>=55296&&a<=57343){if(a>=55296&&a<=56319&&i+1<l){const s=e.charCodeAt(i+1);if(s>=56320&&s<=57343){u+=encodeURIComponent(e[i]+e[i+1]),i++;continue}}u+="%EF%BF%BD";continue}u+=encodeURIComponent(e[i])}return u}Rn.defaultChars=";/?:@&=+$,-_.!~*'()#";Rn.componentChars="-_.!~*'()";function sr(e){let n="";return n+=e.protocol||"",n+=e.slashes?"//":"",n+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?n+="["+e.hostname+"]":n+=e.hostname||"",n+=e.port?":"+e.port:"",n+=e.pathname||"",n+=e.search||"",n+=e.hash||"",n}function ot(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const yi=/^([a-z0-9.+-]+:)/i,xi=/:[0-9]*$/,wi=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,vi=["<",">",'"',"`"," ","\r",`
`,"	"],Ci=["{","}","|","\\","^","`"].concat(vi),_i=["'"].concat(Ci),qr=["%","/","?",";","#"].concat(_i),Hr=["/","?","#"],Ei=255,jr=/^[+a-z0-9A-Z_-]{0,63}$/,Ai=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,$r={javascript:!0,"javascript:":!0},Ur={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function dr(e,n){if(e&&e instanceof ot)return e;const t=new ot;return t.parse(e,n),t}ot.prototype.parse=function(e,n){let t,r,u,i=e;if(i=i.trim(),!n&&e.split("#").length===1){const d=wi.exec(i);if(d)return this.pathname=d[1],d[2]&&(this.search=d[2]),this}let l=yi.exec(i);if(l&&(l=l[0],t=l.toLowerCase(),this.protocol=l,i=i.substr(l.length)),(n||l||i.match(/^\/\/[^@\/]+@[^@\/]+/))&&(u=i.substr(0,2)==="//",u&&!(l&&$r[l])&&(i=i.substr(2),this.slashes=!0)),!$r[l]&&(u||l&&!Ur[l])){let d=-1;for(let m=0;m<Hr.length;m++)r=i.indexOf(Hr[m]),r!==-1&&(d===-1||r<d)&&(d=r);let b,c;d===-1?c=i.lastIndexOf("@"):c=i.lastIndexOf("@",d),c!==-1&&(b=i.slice(0,c),i=i.slice(c+1),this.auth=b),d=-1;for(let m=0;m<qr.length;m++)r=i.indexOf(qr[m]),r!==-1&&(d===-1||r<d)&&(d=r);d===-1&&(d=i.length),i[d-1]===":"&&d--;const f=i.slice(0,d);i=i.slice(d),this.parseHost(f),this.hostname=this.hostname||"";const p=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!p){const m=this.hostname.split(/\./);for(let g=0,k=m.length;g<k;g++){const y=m[g];if(y&&!y.match(jr)){let v="";for(let E=0,A=y.length;E<A;E++)y.charCodeAt(E)>127?v+="x":v+=y[E];if(!v.match(jr)){const E=m.slice(0,g),A=m.slice(g+1),R=y.match(Ai);R&&(E.push(R[1]),A.unshift(R[2])),A.length&&(i=A.join(".")+i),this.hostname=E.join(".");break}}}}this.hostname.length>Ei&&(this.hostname=""),p&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const a=i.indexOf("#");a!==-1&&(this.hash=i.substr(a),i=i.slice(0,a));const s=i.indexOf("?");return s!==-1&&(this.search=i.substr(s),i=i.slice(0,s)),i&&(this.pathname=i),Ur[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};ot.prototype.parseHost=function(e){let n=xi.exec(e);n&&(n=n[0],n!==":"&&(this.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(this.hostname=e)};const Si=Object.freeze(Object.defineProperty({__proto__:null,decode:on,encode:Rn,format:sr,parse:dr},Symbol.toStringTag,{value:"Module"})),Au=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Su=/[\0-\x1F\x7F-\x9F]/,Di=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,fr=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Du=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Tu=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,Ti=Object.freeze(Object.defineProperty({__proto__:null,Any:Au,Cc:Su,Cf:Di,P:fr,S:Du,Z:Tu},Symbol.toStringTag,{value:"Module"})),Fi=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),Mi=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var It;const Ii=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),Ri=(It=String.fromCodePoint)!==null&&It!==void 0?It:function(e){let n="";return e>65535&&(e-=65536,n+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),n+=String.fromCharCode(e),n};function Li(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=Ii.get(e))!==null&&n!==void 0?n:e}var ne;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(ne||(ne={}));const Ni=32;var Re;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(Re||(Re={}));function Kt(e){return e>=ne.ZERO&&e<=ne.NINE}function Oi(e){return e>=ne.UPPER_A&&e<=ne.UPPER_F||e>=ne.LOWER_A&&e<=ne.LOWER_F}function Pi(e){return e>=ne.UPPER_A&&e<=ne.UPPER_Z||e>=ne.LOWER_A&&e<=ne.LOWER_Z||Kt(e)}function Bi(e){return e===ne.EQUALS||Pi(e)}var ee;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(ee||(ee={}));var De;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(De||(De={}));class zi{constructor(n,t,r){this.decodeTree=n,this.emitCodePoint=t,this.errors=r,this.state=ee.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=De.Strict}startEntity(n){this.decodeMode=n,this.state=ee.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,t){switch(this.state){case ee.EntityStart:return n.charCodeAt(t)===ne.NUM?(this.state=ee.NumericStart,this.consumed+=1,this.stateNumericStart(n,t+1)):(this.state=ee.NamedEntity,this.stateNamedEntity(n,t));case ee.NumericStart:return this.stateNumericStart(n,t);case ee.NumericDecimal:return this.stateNumericDecimal(n,t);case ee.NumericHex:return this.stateNumericHex(n,t);case ee.NamedEntity:return this.stateNamedEntity(n,t)}}stateNumericStart(n,t){return t>=n.length?-1:(n.charCodeAt(t)|Ni)===ne.LOWER_X?(this.state=ee.NumericHex,this.consumed+=1,this.stateNumericHex(n,t+1)):(this.state=ee.NumericDecimal,this.stateNumericDecimal(n,t))}addToNumericResult(n,t,r,u){if(t!==r){const i=r-t;this.result=this.result*Math.pow(u,i)+parseInt(n.substr(t,i),u),this.consumed+=i}}stateNumericHex(n,t){const r=t;for(;t<n.length;){const u=n.charCodeAt(t);if(Kt(u)||Oi(u))t+=1;else return this.addToNumericResult(n,r,t,16),this.emitNumericEntity(u,3)}return this.addToNumericResult(n,r,t,16),-1}stateNumericDecimal(n,t){const r=t;for(;t<n.length;){const u=n.charCodeAt(t);if(Kt(u))t+=1;else return this.addToNumericResult(n,r,t,10),this.emitNumericEntity(u,2)}return this.addToNumericResult(n,r,t,10),-1}emitNumericEntity(n,t){var r;if(this.consumed<=t)return(r=this.errors)===null||r===void 0||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===ne.SEMI)this.consumed+=1;else if(this.decodeMode===De.Strict)return 0;return this.emitCodePoint(Li(this.result),this.consumed),this.errors&&(n!==ne.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,t){const{decodeTree:r}=this;let u=r[this.treeIndex],i=(u&Re.VALUE_LENGTH)>>14;for(;t<n.length;t++,this.excess++){const l=n.charCodeAt(t);if(this.treeIndex=qi(r,u,this.treeIndex+Math.max(1,i),l),this.treeIndex<0)return this.result===0||this.decodeMode===De.Attribute&&(i===0||Bi(l))?0:this.emitNotTerminatedNamedEntity();if(u=r[this.treeIndex],i=(u&Re.VALUE_LENGTH)>>14,i!==0){if(l===ne.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess);this.decodeMode!==De.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;const{result:t,decodeTree:r}=this,u=(r[t]&Re.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,u,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,t,r){const{decodeTree:u}=this;return this.emitCodePoint(t===1?u[n]&~Re.VALUE_LENGTH:u[n+1],r),t===3&&this.emitCodePoint(u[n+2],r),r}end(){var n;switch(this.state){case ee.NamedEntity:return this.result!==0&&(this.decodeMode!==De.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case ee.NumericDecimal:return this.emitNumericEntity(0,2);case ee.NumericHex:return this.emitNumericEntity(0,3);case ee.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case ee.EntityStart:return 0}}}function Fu(e){let n="";const t=new zi(e,r=>n+=Ri(r));return function(u,i){let l=0,a=0;for(;(a=u.indexOf("&",a))>=0;){n+=u.slice(l,a),t.startEntity(i);const d=t.write(u,a+1);if(d<0){l=a+t.end();break}l=a+d,a=d===0?l+1:l}const s=n+u.slice(l);return n="",s}}function qi(e,n,t,r){const u=(n&Re.BRANCH_LENGTH)>>7,i=n&Re.JUMP_TABLE;if(u===0)return i!==0&&r===i?t:-1;if(i){const s=r-i;return s<0||s>=u?-1:e[t+s]-1}let l=t,a=l+u-1;for(;l<=a;){const s=l+a>>>1,d=e[s];if(d<r)l=s+1;else if(d>r)a=s-1;else return e[s+u]}return-1}const Mu=Fu(Fi);Fu(Mi);function Hi(e,n=De.Legacy){return Mu(e,n)}function ji(e){return Mu(e,De.Strict)}function $i(e){return Object.prototype.toString.call(e)}function pr(e){return $i(e)==="[object String]"}const Ui=Object.prototype.hasOwnProperty;function Gi(e,n){return Ui.call(e,n)}function pt(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!="object")throw new TypeError(t+"must be object");Object.keys(t).forEach(function(r){e[r]=t[r]})}}),e}function Iu(e,n,t){return[].concat(e.slice(0,n),t,e.slice(n+1))}function hr(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function En(e){if(e>65535){e-=65536;const n=55296+(e>>10),t=56320+(e&1023);return String.fromCharCode(n,t)}return String.fromCharCode(e)}const Ru=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Vi=/&([a-z#][a-z0-9]{1,31});/gi,Wi=new RegExp(Ru.source+"|"+Vi.source,"gi"),Zi=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function Yi(e,n){if(n.charCodeAt(0)===35&&Zi.test(n)){const r=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);return hr(r)?En(r):e}const t=Hi(e);return t!==e?t:e}function Ki(e){return e.indexOf("\\")<0?e:e.replace(Ru,"$1")}function an(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(Wi,function(n,t,r){return t||Yi(n,r)})}const Ji=/[&<>"]/,Qi=/[&<>"]/g,Xi={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function ea(e){return Xi[e]}function Oe(e){return Ji.test(e)?e.replace(Qi,ea):e}const na=/[.?*+^$[\]\\(){}|-]/g;function ta(e){return e.replace(na,"\\$&")}function V(e){switch(e){case 9:case 32:return!0}return!1}function An(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Lu(e){return fr.test(e)||Du.test(e)}function Sn(e){return Lu(En(e))}function Dn(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function ht(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}function Gr(e){return e===32||e===9||e===10||e===13}function bt(e){let n=0;for(;n<e.length&&Gr(e.charCodeAt(n));n++);let t=e.length-1;for(;t>=n&&Gr(e.charCodeAt(t));t--);return e.slice(n,t+1)}const ra={mdurl:Si,ucmicro:Ti},ua=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:Iu,asciiTrim:bt,assign:pt,escapeHtml:Oe,escapeRE:ta,fromCodePoint:En,has:Gi,isMdAsciiPunct:Dn,isPunctChar:Lu,isPunctCharCode:Sn,isSpace:V,isString:pr,isValidEntityCode:hr,isWhiteSpace:An,lib:ra,normalizeReference:ht,unescapeAll:an,unescapeMd:Ki},Symbol.toStringTag,{value:"Module"}));function oa(e,n,t){let r,u,i,l;const a=e.posMax,s=e.pos;for(e.pos=n+1,r=1;e.pos<a;){if(i=e.src.charCodeAt(e.pos),i===93&&(r--,r===0)){u=!0;break}if(l=e.pos,e.md.inline.skipToken(e),i===91){if(l===e.pos-1)r++;else if(t)return e.pos=s,-1}}let d=-1;return u&&(d=e.pos),e.pos=s,d}function ia(e,n,t){let r,u=n;const i={ok:!1,pos:0,str:""};if(e.charCodeAt(u)===60){for(u++;u<t;){if(r=e.charCodeAt(u),r===10||r===60)return i;if(r===62)return i.pos=u+1,i.str=an(e.slice(n+1,u)),i.ok=!0,i;if(r===92&&u+1<t){u+=2;continue}u++}return i}let l=0;for(;u<t&&(r=e.charCodeAt(u),!(r===32||r<32||r===127));){if(r===92&&u+1<t){if(e.charCodeAt(u+1)===32)break;u+=2;continue}if(r===40&&(l++,l>32))return i;if(r===41){if(l===0)break;l--}u++}return n===u||l!==0||(i.str=an(e.slice(n,u)),i.pos=u,i.ok=!0),i}function aa(e,n,t,r){let u,i=n;const l={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(r)l.str=r.str,l.marker=r.marker;else{if(i>=t)return l;let a=e.charCodeAt(i);if(a!==34&&a!==39&&a!==40)return l;n++,i++,a===40&&(a=41),l.marker=a}for(;i<t;){if(u=e.charCodeAt(i),u===l.marker)return l.pos=i+1,l.str+=an(e.slice(n,i)),l.ok=!0,l;if(u===40&&l.marker===41)return l;u===92&&i+1<t&&i++,i++}return l.can_continue=!0,l.str+=an(e.slice(n,i)),l}const la=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:ia,parseLinkLabel:oa,parseLinkTitle:aa},Symbol.toStringTag,{value:"Module"})),xe={};xe.code_inline=function(e,n,t,r,u){const i=e[n];return"<code"+u.renderAttrs(i)+">"+Oe(i.content)+"</code>"};xe.code_block=function(e,n,t,r,u){const i=e[n];return"<pre"+u.renderAttrs(i)+"><code>"+Oe(e[n].content)+`</code></pre>
`};xe.fence=function(e,n,t,r,u){const i=e[n],l=i.info?an(i.info).trim():"";let a="",s="";if(l){const b=l.split(/(\s+)/g);a=b[0],s=b.slice(2).join("")}let d;if(t.highlight?d=t.highlight(i.content,a,s)||Oe(i.content):d=Oe(i.content),d.indexOf("<pre")===0)return d+`
`;if(l){const b=i.attrIndex("class"),c=i.attrs?i.attrs.slice():[];b<0?c.push(["class",t.langPrefix+a]):(c[b]=c[b].slice(),c[b][1]+=" "+t.langPrefix+a);const f={attrs:c};return`<pre><code${u.renderAttrs(f)}>${d}</code></pre>
`}return`<pre><code${u.renderAttrs(i)}>${d}</code></pre>
`};xe.image=function(e,n,t,r,u){const i=e[n];return i.attrs[i.attrIndex("alt")][1]=u.renderInlineAsText(i.children,t,r),u.renderToken(e,n,t)};xe.hardbreak=function(e,n,t){return t.xhtmlOut?`<br />
`:`<br>
`};xe.softbreak=function(e,n,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};xe.text=function(e,n){return Oe(e[n].content)};xe.html_block=function(e,n){return e[n].content};xe.html_inline=function(e,n){return e[n].content};function fn(){this.rules=pt({},xe)}fn.prototype.renderAttrs=function(n){let t,r,u;if(!n.attrs)return"";for(u="",t=0,r=n.attrs.length;t<r;t++)u+=" "+Oe(n.attrs[t][0])+'="'+Oe(n.attrs[t][1])+'"';return u};fn.prototype.renderToken=function(n,t,r){const u=n[t];let i="";if(u.hidden)return"";u.block&&u.nesting!==-1&&t&&n[t-1].hidden&&(i+=`
`),i+=(u.nesting===-1?"</":"<")+u.tag,i+=this.renderAttrs(u),u.nesting===0&&r.xhtmlOut&&(i+=" /");let l=!1;if(u.block&&(l=!0,u.nesting===1&&t+1<n.length)){const a=n[t+1];(a.type==="inline"||a.hidden||a.nesting===-1&&a.tag===u.tag)&&(l=!1)}return i+=l?`>
`:">",i};fn.prototype.renderInline=function(e,n,t){let r="";const u=this.rules;for(let i=0,l=e.length;i<l;i++){const a=e[i].type;typeof u[a]<"u"?r+=u[a](e,i,n,t,this):r+=this.renderToken(e,i,n)}return r};fn.prototype.renderInlineAsText=function(e,n,t){let r="";for(let u=0,i=e.length;u<i;u++)switch(e[u].type){case"text":r+=e[u].content;break;case"image":r+=this.renderInlineAsText(e[u].children,n,t);break;case"html_inline":case"html_block":r+=e[u].content;break;case"softbreak":case"hardbreak":r+=`
`;break}return r};fn.prototype.render=function(e,n,t){let r="";const u=this.rules;for(let i=0,l=e.length;i<l;i++){const a=e[i].type;a==="inline"?r+=this.renderInline(e[i].children,n,t):typeof u[a]<"u"?r+=u[a](e,i,n,t,this):r+=this.renderToken(e,i,n,t)}return r};function oe(){this.__rules__=[],this.__cache__=null}oe.prototype.__find__=function(e){for(let n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===e)return n;return-1};oe.prototype.__compile__=function(){const e=this,n=[""];e.__rules__.forEach(function(t){t.enabled&&t.alt.forEach(function(r){n.indexOf(r)<0&&n.push(r)})}),e.__cache__={},n.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(r){r.enabled&&(t&&r.alt.indexOf(t)<0||e.__cache__[t].push(r.fn))})})};oe.prototype.at=function(e,n,t){const r=this.__find__(e),u=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__[r].fn=n,this.__rules__[r].alt=u.alt||[],this.__cache__=null};oe.prototype.before=function(e,n,t,r){const u=this.__find__(e),i=r||{};if(u===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(u,0,{name:n,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null};oe.prototype.after=function(e,n,t,r){const u=this.__find__(e),i=r||{};if(u===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(u+1,0,{name:n,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null};oe.prototype.push=function(e,n,t){const r=t||{};this.__rules__.push({name:e,enabled:!0,fn:n,alt:r.alt||[]}),this.__cache__=null};oe.prototype.enable=function(e,n){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(r){const u=this.__find__(r);if(u<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[u].enabled=!0,t.push(r)},this),this.__cache__=null,t};oe.prototype.enableOnly=function(e,n){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(t){t.enabled=!1}),this.enable(e,n)};oe.prototype.disable=function(e,n){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(r){const u=this.__find__(r);if(u<0){if(n)return;throw new Error("Rules manager: invalid rule name "+r)}this.__rules__[u].enabled=!1,t.push(r)},this),this.__cache__=null,t};oe.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function ge(e,n,t){this.type=e,this.tag=n,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}ge.prototype.attrIndex=function(n){if(!this.attrs)return-1;const t=this.attrs;for(let r=0,u=t.length;r<u;r++)if(t[r][0]===n)return r;return-1};ge.prototype.attrPush=function(n){this.attrs?this.attrs.push(n):this.attrs=[n]};ge.prototype.attrSet=function(n,t){const r=this.attrIndex(n),u=[n,t];r<0?this.attrPush(u):this.attrs[r]=u};ge.prototype.attrGet=function(n){const t=this.attrIndex(n);let r=null;return t>=0&&(r=this.attrs[t][1]),r};ge.prototype.attrJoin=function(n,t){const r=this.attrIndex(n);r<0?this.attrPush([n,t]):this.attrs[r][1]=this.attrs[r][1]+" "+t};function Nu(e,n,t){this.src=e,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=n}Nu.prototype.Token=ge;const ca=/\r\n?|\n/g,sa=/\0/g;function da(e){let n;n=e.src.replace(ca,`
`),n=n.replace(sa,"�"),e.src=n}function fa(e){let n;e.inlineMode?(n=new e.Token("inline","",0),n.content=e.src,n.map=[0,1],n.children=[],e.tokens.push(n)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function pa(e){const n=e.tokens;for(let t=0,r=n.length;t<r;t++){const u=n[t];u.type==="inline"&&e.md.inline.parse(u.content,e.md,e.env,u.children)}}function ha(e){return/^<a[>\s]/i.test(e)}function ba(e){return/^<\/a\s*>/i.test(e)}function ma(e){const n=e.tokens;if(e.md.options.linkify)for(let t=0,r=n.length;t<r;t++){if(n[t].type!=="inline"||!e.md.linkify.pretest(n[t].content))continue;let u=n[t].children,i=0;for(let l=u.length-1;l>=0;l--){const a=u[l];if(a.type==="link_close"){for(l--;u[l].level!==a.level&&u[l].type!=="link_open";)l--;continue}if(a.type==="html_inline"&&(ha(a.content)&&i>0&&i--,ba(a.content)&&i++),!(i>0)&&a.type==="text"&&e.md.linkify.test(a.content)){const s=a.content;let d=e.md.linkify.match(s);const b=[];let c=a.level,f=0;d.length>0&&d[0].index===0&&l>0&&u[l-1].type==="text_special"&&(d=d.slice(1));for(let p=0;p<d.length;p++){const m=d[p].url,g=e.md.normalizeLink(m);if(!e.md.validateLink(g))continue;let k=d[p].text;d[p].schema?d[p].schema==="mailto:"&&!/^mailto:/i.test(k)?k=e.md.normalizeLinkText("mailto:"+k).replace(/^mailto:/,""):k=e.md.normalizeLinkText(k):k=e.md.normalizeLinkText("http://"+k).replace(/^http:\/\//,"");const y=d[p].index;if(y>f){const R=new e.Token("text","",0);R.content=s.slice(f,y),R.level=c,b.push(R)}const v=new e.Token("link_open","a",1);v.attrs=[["href",g]],v.level=c++,v.markup="linkify",v.info="auto",b.push(v);const E=new e.Token("text","",0);E.content=k,E.level=c,b.push(E);const A=new e.Token("link_close","a",-1);A.level=--c,A.markup="linkify",A.info="auto",b.push(A),f=d[p].lastIndex}if(f<s.length){const p=new e.Token("text","",0);p.content=s.slice(f),p.level=c,b.push(p)}n[t].children=u=Iu(u,l,b)}}}}const Ou=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,ga=/\((c|tm|r)\)/i,ka=/\((c|tm|r)\)/ig,ya={c:"©",r:"®",tm:"™"};function xa(e,n){return ya[n.toLowerCase()]}function wa(e){let n=0;for(let t=e.length-1;t>=0;t--){const r=e[t];r.type==="text"&&!n&&(r.content=r.content.replace(ka,xa)),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function va(e){let n=0;for(let t=e.length-1;t>=0;t--){const r=e[t];r.type==="text"&&!n&&Ou.test(r.content)&&(r.content=r.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),r.type==="link_open"&&r.info==="auto"&&n--,r.type==="link_close"&&r.info==="auto"&&n++}}function Ca(e){let n;if(e.md.options.typographer)for(n=e.tokens.length-1;n>=0;n--)e.tokens[n].type==="inline"&&(ga.test(e.tokens[n].content)&&wa(e.tokens[n].children),Ou.test(e.tokens[n].content)&&va(e.tokens[n].children))}const _a=/['"]/,Vr=/['"]/g,Wr="’";function Qn(e,n,t,r){e[n]||(e[n]=[]),e[n].push({pos:t,ch:r})}function Ea(e,n){let t="",r=0;n.sort((u,i)=>u.pos-i.pos);for(let u=0;u<n.length;u++){const i=n[u];t+=e.slice(r,i.pos)+i.ch,r=i.pos+1}return t+e.slice(r)}function Aa(e,n){let t;const r=[],u={};for(let i=0;i<e.length;i++){const l=e[i],a=e[i].level;for(t=r.length-1;t>=0&&!(r[t].level<=a);t--);if(r.length=t+1,l.type!=="text")continue;const s=l.content;let d=0;const b=s.length;e:for(;d<b;){Vr.lastIndex=d;const c=Vr.exec(s);if(!c)break;let f=!0,p=!0;d=c.index+1;const m=c[0]==="'";let g=32;if(c.index-1>=0)g=s.charCodeAt(c.index-1);else for(t=i-1;t>=0&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t--)if(e[t].content){g=e[t].content.charCodeAt(e[t].content.length-1);break}let k=32;if(d<b)k=s.charCodeAt(d);else for(t=i+1;t<e.length&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t++)if(e[t].content){k=e[t].content.charCodeAt(0);break}const y=Dn(g)||Sn(g),v=Dn(k)||Sn(k),E=An(g),A=An(k);if(A?f=!1:v&&(E||y||(f=!1)),E?p=!1:y&&(A||v||(p=!1)),k===34&&c[0]==='"'&&g>=48&&g<=57&&(p=f=!1),f&&p&&(f=y,p=v),!f&&!p){m&&Qn(u,i,c.index,Wr);continue}if(p)for(t=r.length-1;t>=0;t--){let R=r[t];if(r[t].level<a)break;if(R.single===m&&r[t].level===a){R=r[t];let N,j;m?(N=n.md.options.quotes[2],j=n.md.options.quotes[3]):(N=n.md.options.quotes[0],j=n.md.options.quotes[1]),Qn(u,i,c.index,j),Qn(u,R.token,R.pos,N),r.length=t;continue e}}f?r.push({token:i,pos:c.index,single:m,level:a}):p&&m&&Qn(u,i,c.index,Wr)}}Object.keys(u).forEach(function(i){e[i].content=Ea(e[i].content,u[i])})}function Sa(e){if(e.md.options.typographer)for(let n=e.tokens.length-1;n>=0;n--)e.tokens[n].type!=="inline"||!_a.test(e.tokens[n].content)||Aa(e.tokens[n].children,e)}function Da(e){let n,t;const r=e.tokens,u=r.length;for(let i=0;i<u;i++){if(r[i].type!=="inline")continue;const l=r[i].children,a=l.length;for(n=0;n<a;n++)l[n].type==="text_special"&&(l[n].type="text");for(n=t=0;n<a;n++)l[n].type==="text"&&n+1<a&&l[n+1].type==="text"?l[n+1].content=l[n].content+l[n+1].content:(n!==t&&(l[t]=l[n]),t++);n!==t&&(l.length=t)}}const Rt=[["normalize",da],["block",fa],["inline",pa],["linkify",ma],["replacements",Ca],["smartquotes",Sa],["text_join",Da]];function br(){this.ruler=new oe;for(let e=0;e<Rt.length;e++)this.ruler.push(Rt[e][0],Rt[e][1])}br.prototype.process=function(e){const n=this.ruler.getRules("");for(let t=0,r=n.length;t<r;t++)n[t](e)};br.prototype.State=Nu;function we(e,n,t,r){this.src=e,this.md=n,this.env=t,this.tokens=r,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const u=this.src;for(let i=0,l=0,a=0,s=0,d=u.length,b=!1;l<d;l++){const c=u.charCodeAt(l);if(!b)if(V(c)){a++,c===9?s+=4-s%4:s++;continue}else b=!0;(c===10||l===d-1)&&(c!==10&&l++,this.bMarks.push(i),this.eMarks.push(l),this.tShift.push(a),this.sCount.push(s),this.bsCount.push(0),b=!1,a=0,s=0,i=l+1)}this.bMarks.push(u.length),this.eMarks.push(u.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}we.prototype.push=function(e,n,t){const r=new ge(e,n,t);return r.block=!0,t<0&&this.level--,r.level=this.level,t>0&&this.level++,this.tokens.push(r),r};we.prototype.isEmpty=function(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]};we.prototype.skipEmptyLines=function(n){for(let t=this.lineMax;n<t&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n};we.prototype.skipSpaces=function(n){for(let t=this.src.length;n<t;n++){const r=this.src.charCodeAt(n);if(!V(r))break}return n};we.prototype.skipSpacesBack=function(n,t){if(n<=t)return n;for(;n>t;)if(!V(this.src.charCodeAt(--n)))return n+1;return n};we.prototype.skipChars=function(n,t){for(let r=this.src.length;n<r&&this.src.charCodeAt(n)===t;n++);return n};we.prototype.skipCharsBack=function(n,t,r){if(n<=r)return n;for(;n>r;)if(t!==this.src.charCodeAt(--n))return n+1;return n};we.prototype.getLines=function(n,t,r,u){if(n>=t)return"";const i=new Array(t-n);for(let l=0,a=n;a<t;a++,l++){let s=0;const d=this.bMarks[a];let b=d,c;for(a+1<t||u?c=this.eMarks[a]+1:c=this.eMarks[a];b<c&&s<r;){const f=this.src.charCodeAt(b);if(V(f))f===9?s+=4-(s+this.bsCount[a])%4:s++;else if(b-d<this.tShift[a])s++;else break;b++}s>r?i[l]=new Array(s-r+1).join(" ")+this.src.slice(b,c):i[l]=this.src.slice(b,c)}return i.join("")};we.prototype.Token=ge;const Ta=65536;function Lt(e,n){const t=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];return e.src.slice(t,r)}function Zr(e){const n=[],t=e.length;let r=0,u=e.charCodeAt(r),i=!1,l=0,a="";for(;r<t;)u===124&&(i?(a+=e.substring(l,r-1),l=r):(n.push(a+e.substring(l,r)),a="",l=r+1)),i=u===92,r++,u=e.charCodeAt(r);return n.push(a+e.substring(l)),n}function Fa(e,n,t,r){if(n+2>t)return!1;let u=n+1;if(e.sCount[u]<e.blkIndent||e.sCount[u]-e.blkIndent>=4)return!1;let i=e.bMarks[u]+e.tShift[u];if(i>=e.eMarks[u])return!1;const l=e.src.charCodeAt(i++);if(l!==124&&l!==45&&l!==58||i>=e.eMarks[u])return!1;const a=e.src.charCodeAt(i++);if(a!==124&&a!==45&&a!==58&&!V(a)||l===45&&V(a))return!1;for(;i<e.eMarks[u];){const A=e.src.charCodeAt(i);if(A!==124&&A!==45&&A!==58&&!V(A))return!1;i++}let s=Lt(e,n+1),d=s.split("|");const b=[];for(let A=0;A<d.length;A++){const R=d[A].trim();if(!R){if(A===0||A===d.length-1)continue;return!1}if(!/^:?-+:?$/.test(R))return!1;R.charCodeAt(R.length-1)===58?b.push(R.charCodeAt(0)===58?"center":"right"):R.charCodeAt(0)===58?b.push("left"):b.push("")}if(s=Lt(e,n).trim(),s.indexOf("|")===-1||e.sCount[n]-e.blkIndent>=4)return!1;d=Zr(s),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop();const c=d.length;if(c===0||c!==b.length)return!1;if(r)return!0;const f=e.parentType;e.parentType="table";const p=e.md.block.ruler.getRules("blockquote"),m=e.push("table_open","table",1),g=[n,0];m.map=g;const k=e.push("thead_open","thead",1);k.map=[n,n+1];const y=e.push("tr_open","tr",1);y.map=[n,n+1];for(let A=0;A<d.length;A++){const R=e.push("th_open","th",1);b[A]&&(R.attrs=[["style","text-align:"+b[A]]]);const N=e.push("inline","",0);N.content=d[A].trim(),N.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let v,E=0;for(u=n+2;u<t&&!(e.sCount[u]<e.blkIndent);u++){let A=!1;for(let N=0,j=p.length;N<j;N++)if(p[N](e,u,t,!0)){A=!0;break}if(A||(s=Lt(e,u).trim(),!s)||e.sCount[u]-e.blkIndent>=4||(d=Zr(s),d.length&&d[0]===""&&d.shift(),d.length&&d[d.length-1]===""&&d.pop(),E+=c-d.length,E>Ta))break;if(u===n+2){const N=e.push("tbody_open","tbody",1);N.map=v=[n+2,0]}const R=e.push("tr_open","tr",1);R.map=[u,u+1];for(let N=0;N<c;N++){const j=e.push("td_open","td",1);b[N]&&(j.attrs=[["style","text-align:"+b[N]]]);const U=e.push("inline","",0);U.content=d[N]?d[N].trim():"",U.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return v&&(e.push("tbody_close","tbody",-1),v[1]=u),e.push("table_close","table",-1),g[1]=u,e.parentType=f,e.line=u,!0}function Ma(e,n,t){if(e.sCount[n]-e.blkIndent<4)return!1;let r=n+1,u=r;for(;r<t;){if(e.isEmpty(r)){r++;continue}if(e.sCount[r]-e.blkIndent>=4){r++,u=r;continue}break}e.line=u;const i=e.push("code_block","code",0);return i.content=e.getLines(n,u,4+e.blkIndent,!1)+`
`,i.map=[n,e.line],!0}function Ia(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],i=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||u+3>i)return!1;const l=e.src.charCodeAt(u);if(l!==126&&l!==96)return!1;let a=u;u=e.skipChars(u,l);let s=u-a;if(s<3)return!1;const d=e.src.slice(a,u),b=e.src.slice(u,i);if(l===96&&b.indexOf(String.fromCharCode(l))>=0)return!1;if(r)return!0;let c=n,f=!1;for(;c++,!(c>=t||(u=a=e.bMarks[c]+e.tShift[c],i=e.eMarks[c],u<i&&e.sCount[c]<e.blkIndent));)if(e.src.charCodeAt(u)===l&&!(e.sCount[c]-e.blkIndent>=4)&&(u=e.skipChars(u,l),!(u-a<s)&&(u=e.skipSpaces(u),!(u<i)))){f=!0;break}s=e.sCount[n],e.line=c+(f?1:0);const p=e.push("fence","code",0);return p.info=b,p.content=e.getLines(n+1,c,s,!0),p.markup=d,p.map=[n,e.line],!0}function Ra(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],i=e.eMarks[n];const l=e.lineMax;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(u)!==62)return!1;if(r)return!0;const a=[],s=[],d=[],b=[],c=e.md.block.ruler.getRules("blockquote"),f=e.parentType;e.parentType="blockquote";let p=!1,m;for(m=n;m<t;m++){const E=e.sCount[m]<e.blkIndent;if(u=e.bMarks[m]+e.tShift[m],i=e.eMarks[m],u>=i)break;if(e.src.charCodeAt(u++)===62&&!E){let R=e.sCount[m]+1,N,j;e.src.charCodeAt(u)===32?(u++,R++,j=!1,N=!0):e.src.charCodeAt(u)===9?(N=!0,(e.bsCount[m]+R)%4===3?(u++,R++,j=!1):j=!0):N=!1;let U=R;for(a.push(e.bMarks[m]),e.bMarks[m]=u;u<i;){const Q=e.src.charCodeAt(u);if(V(Q))Q===9?U+=4-(U+e.bsCount[m]+(j?1:0))%4:U++;else break;u++}p=u>=i,s.push(e.bsCount[m]),e.bsCount[m]=e.sCount[m]+1+(N?1:0),d.push(e.sCount[m]),e.sCount[m]=U-R,b.push(e.tShift[m]),e.tShift[m]=u-e.bMarks[m];continue}if(p)break;let A=!1;for(let R=0,N=c.length;R<N;R++)if(c[R](e,m,t,!0)){A=!0;break}if(A){e.lineMax=m,e.blkIndent!==0&&(a.push(e.bMarks[m]),s.push(e.bsCount[m]),b.push(e.tShift[m]),d.push(e.sCount[m]),e.sCount[m]-=e.blkIndent);break}a.push(e.bMarks[m]),s.push(e.bsCount[m]),b.push(e.tShift[m]),d.push(e.sCount[m]),e.sCount[m]=-1}const g=e.blkIndent;e.blkIndent=0;const k=e.push("blockquote_open","blockquote",1);k.markup=">";const y=[n,0];k.map=y,e.md.block.tokenize(e,n,m);const v=e.push("blockquote_close","blockquote",-1);v.markup=">",e.lineMax=l,e.parentType=f,y[1]=e.line;for(let E=0;E<b.length;E++)e.bMarks[E+n]=a[E],e.tShift[E+n]=b[E],e.sCount[E+n]=d[E],e.bsCount[E+n]=s[E];return e.blkIndent=g,!0}function La(e,n,t,r){const u=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let i=e.bMarks[n]+e.tShift[n];const l=e.src.charCodeAt(i++);if(l!==42&&l!==45&&l!==95)return!1;let a=1;for(;i<u;){const d=e.src.charCodeAt(i++);if(d!==l&&!V(d))return!1;d===l&&a++}if(a<3)return!1;if(r)return!0;e.line=n+1;const s=e.push("hr","hr",0);return s.map=[n,e.line],s.markup=Array(a+1).join(String.fromCharCode(l)),!0}function Yr(e,n){const t=e.eMarks[n];let r=e.bMarks[n]+e.tShift[n];const u=e.src.charCodeAt(r++);if(u!==42&&u!==45&&u!==43)return-1;if(r<t){const i=e.src.charCodeAt(r);if(!V(i))return-1}return r}function Kr(e,n){const t=e.bMarks[n]+e.tShift[n],r=e.eMarks[n];let u=t;if(u+1>=r)return-1;let i=e.src.charCodeAt(u++);if(i<48||i>57)return-1;for(;;){if(u>=r)return-1;if(i=e.src.charCodeAt(u++),i>=48&&i<=57){if(u-t>=10)return-1;continue}if(i===41||i===46)break;return-1}return u<r&&(i=e.src.charCodeAt(u),!V(i))?-1:u}function Na(e,n){const t=e.level+2;for(let r=n+2,u=e.tokens.length-2;r<u;r++)e.tokens[r].level===t&&e.tokens[r].type==="paragraph_open"&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function Oa(e,n,t,r){let u,i,l,a,s=n,d=!0;if(e.sCount[s]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[s]-e.listIndent>=4&&e.sCount[s]<e.blkIndent)return!1;let b=!1;r&&e.parentType==="paragraph"&&e.sCount[s]>=e.blkIndent&&(b=!0);let c,f,p;if((p=Kr(e,s))>=0){if(c=!0,l=e.bMarks[s]+e.tShift[s],f=Number(e.src.slice(l,p-1)),b&&f!==1)return!1}else if((p=Yr(e,s))>=0)c=!1;else return!1;if(b&&e.skipSpaces(p)>=e.eMarks[s])return!1;if(r)return!0;const m=e.src.charCodeAt(p-1),g=e.tokens.length;c?(a=e.push("ordered_list_open","ol",1),f!==1&&(a.attrs=[["start",f]])):a=e.push("bullet_list_open","ul",1);const k=[s,0];a.map=k,a.markup=String.fromCharCode(m);let y=!1;const v=e.md.block.ruler.getRules("list"),E=e.parentType;for(e.parentType="list";s<t;){i=p,u=e.eMarks[s];const A=e.sCount[s]+p-(e.bMarks[s]+e.tShift[s]);let R=A;for(;i<u;){const se=e.src.charCodeAt(i);if(se===9)R+=4-(R+e.bsCount[s])%4;else if(se===32)R++;else break;i++}const N=i;let j;N>=u?j=1:j=R-A,j>4&&(j=1);const U=A+j;a=e.push("list_item_open","li",1),a.markup=String.fromCharCode(m);const Q=[s,0];a.map=Q,c&&(a.info=e.src.slice(l,p-1));const ce=e.tight,ve=e.tShift[s],hn=e.sCount[s],Pe=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=U,e.tight=!0,e.tShift[s]=N-e.bMarks[s],e.sCount[s]=R,N>=u&&e.isEmpty(s+1)?e.line=Math.min(e.line+2,t):e.md.block.tokenize(e,s,t,!0),(!e.tight||y)&&(d=!1),y=e.line-s>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=Pe,e.tShift[s]=ve,e.sCount[s]=hn,e.tight=ce,a=e.push("list_item_close","li",-1),a.markup=String.fromCharCode(m),s=e.line,Q[1]=s,s>=t||e.sCount[s]<e.blkIndent||e.sCount[s]-e.blkIndent>=4)break;let Be=!1;for(let se=0,X=v.length;se<X;se++)if(v[se](e,s,t,!0)){Be=!0;break}if(Be)break;if(c){if(p=Kr(e,s),p<0)break;l=e.bMarks[s]+e.tShift[s]}else if(p=Yr(e,s),p<0)break;if(m!==e.src.charCodeAt(p-1))break}return c?a=e.push("ordered_list_close","ol",-1):a=e.push("bullet_list_close","ul",-1),a.markup=String.fromCharCode(m),k[1]=s,e.line=s,e.parentType=E,d&&Na(e,g),!0}function Pa(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],i=e.eMarks[n],l=n+1;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(u)!==91)return!1;function a(v){const E=e.lineMax;if(v>=E||e.isEmpty(v))return null;let A=!1;if(e.sCount[v]-e.blkIndent>3&&(A=!0),e.sCount[v]<0&&(A=!0),!A){const j=e.md.block.ruler.getRules("reference"),U=e.parentType;e.parentType="reference";let Q=!1;for(let ce=0,ve=j.length;ce<ve;ce++)if(j[ce](e,v,E,!0)){Q=!0;break}if(e.parentType=U,Q)return null}const R=e.bMarks[v]+e.tShift[v],N=e.eMarks[v];return e.src.slice(R,N+1)}let s=e.src.slice(u,i+1);i=s.length;let d=-1;for(u=1;u<i;u++){const v=s.charCodeAt(u);if(v===91)return!1;if(v===93){d=u;break}else if(v===10){const E=a(l);E!==null&&(s+=E,i=s.length,l++)}else if(v===92&&(u++,u<i&&s.charCodeAt(u)===10)){const E=a(l);E!==null&&(s+=E,i=s.length,l++)}}if(d<0||s.charCodeAt(d+1)!==58)return!1;for(u=d+2;u<i;u++){const v=s.charCodeAt(u);if(v===10){const E=a(l);E!==null&&(s+=E,i=s.length,l++)}else if(!V(v))break}const b=e.md.helpers.parseLinkDestination(s,u,i);if(!b.ok)return!1;const c=e.md.normalizeLink(b.str);if(!e.md.validateLink(c))return!1;u=b.pos;const f=u,p=l,m=u;for(;u<i;u++){const v=s.charCodeAt(u);if(v===10){const E=a(l);E!==null&&(s+=E,i=s.length,l++)}else if(!V(v))break}let g=e.md.helpers.parseLinkTitle(s,u,i);for(;g.can_continue;){const v=a(l);if(v===null)break;s+=v,u=i,i=s.length,l++,g=e.md.helpers.parseLinkTitle(s,u,i,g)}let k;for(u<i&&m!==u&&g.ok?(k=g.str,u=g.pos):(k="",u=f,l=p);u<i;){const v=s.charCodeAt(u);if(!V(v))break;u++}if(u<i&&s.charCodeAt(u)!==10&&k)for(k="",u=f,l=p;u<i;){const v=s.charCodeAt(u);if(!V(v))break;u++}if(u<i&&s.charCodeAt(u)!==10)return!1;const y=ht(s.slice(1,d));return y?(r||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[y]>"u"&&(e.env.references[y]={title:k,href:c}),e.line=l),!0):!1}const Ba=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],za="[a-zA-Z_:][a-zA-Z0-9:._-]*",qa="[^\"'=<>`\\x00-\\x20]+",Ha="'[^']*'",ja='"[^"]*"',$a="(?:"+qa+"|"+Ha+"|"+ja+")",Ua="(?:\\s+"+za+"(?:\\s*=\\s*"+$a+")?)",Pu="<[A-Za-z][A-Za-z0-9\\-]*"+Ua+"*\\s*\\/?>",Bu="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Ga="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Va="<[?][\\s\\S]*?[?]>",Wa="<![A-Za-z][^>]*>",Za="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",Ya=new RegExp("^(?:"+Pu+"|"+Bu+"|"+Ga+"|"+Va+"|"+Wa+"|"+Za+")"),Ka=new RegExp("^(?:"+Pu+"|"+Bu+")"),qe=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+Ba.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(Ka.source+"\\s*$"),/^$/,!1]];function Ja(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],i=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(u)!==60)return!1;let l=e.src.slice(u,i),a=0;for(;a<qe.length&&!qe[a][0].test(l);a++);if(a===qe.length)return!1;if(r)return qe[a][2];let s=n+1;const d=qe[a][1].test("");if(!qe[a][1].test(l)){for(;s<t&&!(e.sCount[s]<e.blkIndent&&(d||!e.isEmpty(s)));s++)if(u=e.bMarks[s]+e.tShift[s],i=e.eMarks[s],l=e.src.slice(u,i),qe[a][1].test(l)){l.length!==0&&s++;break}}e.line=s;const b=e.push("html_block","",0);return b.map=[n,s],b.content=e.getLines(n,s,e.blkIndent,!0),!0}function Qa(e,n,t,r){let u=e.bMarks[n]+e.tShift[n],i=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let l=e.src.charCodeAt(u);if(l!==35||u>=i)return!1;let a=1;for(l=e.src.charCodeAt(++u);l===35&&u<i&&a<=6;)a++,l=e.src.charCodeAt(++u);if(a>6||u<i&&!V(l))return!1;if(r)return!0;i=e.skipSpacesBack(i,u);const s=e.skipCharsBack(i,35,u);s>u&&V(e.src.charCodeAt(s-1))&&(i=s),e.line=n+1;const d=e.push("heading_open","h"+String(a),1);d.markup="########".slice(0,a),d.map=[n,e.line];const b=e.push("inline","",0);b.content=bt(e.src.slice(u,i)),b.map=[n,e.line],b.children=[];const c=e.push("heading_close","h"+String(a),-1);return c.markup="########".slice(0,a),!0}function Xa(e,n,t){const r=e.md.block.ruler.getRules("paragraph");if(e.sCount[n]-e.blkIndent>=4)return!1;const u=e.parentType;e.parentType="paragraph";let i=0,l,a=n+1;for(;a<t&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3)continue;if(e.sCount[a]>=e.blkIndent){let p=e.bMarks[a]+e.tShift[a];const m=e.eMarks[a];if(p<m&&(l=e.src.charCodeAt(p),(l===45||l===61)&&(p=e.skipChars(p,l),p=e.skipSpaces(p),p>=m))){i=l===61?1:2;break}}if(e.sCount[a]<0)continue;let f=!1;for(let p=0,m=r.length;p<m;p++)if(r[p](e,a,t,!0)){f=!0;break}if(f)break}if(!i)return e.parentType=u,!1;const s=bt(e.getLines(n,a,e.blkIndent,!1));e.line=a+1;const d=e.push("heading_open","h"+String(i),1);d.markup=String.fromCharCode(l),d.map=[n,e.line];const b=e.push("inline","",0);b.content=s,b.map=[n,e.line-1],b.children=[];const c=e.push("heading_close","h"+String(i),-1);return c.markup=String.fromCharCode(l),e.parentType=u,!0}function el(e,n,t){const r=e.md.block.ruler.getRules("paragraph"),u=e.parentType;let i=n+1;for(e.parentType="paragraph";i<t&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3||e.sCount[i]<0)continue;let d=!1;for(let b=0,c=r.length;b<c;b++)if(r[b](e,i,t,!0)){d=!0;break}if(d)break}const l=bt(e.getLines(n,i,e.blkIndent,!1));e.line=i;const a=e.push("paragraph_open","p",1);a.map=[n,e.line];const s=e.push("inline","",0);return s.content=l,s.map=[n,e.line],s.children=[],e.push("paragraph_close","p",-1),e.parentType=u,!0}const Xn=[["table",Fa,["paragraph","reference"]],["code",Ma],["fence",Ia,["paragraph","reference","blockquote","list"]],["blockquote",Ra,["paragraph","reference","blockquote","list"]],["hr",La,["paragraph","reference","blockquote","list"]],["list",Oa,["paragraph","reference","blockquote"]],["reference",Pa],["html_block",Ja,["paragraph","reference","blockquote"]],["heading",Qa,["paragraph","reference","blockquote"]],["lheading",Xa],["paragraph",el]];function mt(){this.ruler=new oe;for(let e=0;e<Xn.length;e++)this.ruler.push(Xn[e][0],Xn[e][1],{alt:(Xn[e][2]||[]).slice()})}mt.prototype.tokenize=function(e,n,t){const r=this.ruler.getRules(""),u=r.length,i=e.md.options.maxNesting;let l=n,a=!1;for(;l<t&&(e.line=l=e.skipEmptyLines(l),!(l>=t||e.sCount[l]<e.blkIndent));){if(e.level>=i){e.line=t;break}const s=e.line;let d=!1;for(let b=0;b<u;b++)if(d=r[b](e,l,t,!1),d){if(s>=e.line)throw new Error("block rule didn't increment state.line");break}if(!d)throw new Error("none of the block rules matched");e.tight=!a,e.isEmpty(e.line-1)&&(a=!0),l=e.line,l<t&&e.isEmpty(l)&&(a=!0,l++,e.line=l)}};mt.prototype.parse=function(e,n,t,r){if(!e)return;const u=new this.State(e,n,t,r);this.tokenize(u,u.line,u.lineMax)};mt.prototype.State=we;function Ln(e,n,t,r){this.src=e,this.env=t,this.md=n,this.tokens=r,this.tokens_meta=Array(r.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}Ln.prototype.pushPending=function(){const e=new ge("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};Ln.prototype.push=function(e,n,t){this.pending&&this.pushPending();const r=new ge(e,n,t);let u=null;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],u={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(u),r};Ln.prototype.scanDelims=function(e,n){const t=this.posMax,r=this.src.charCodeAt(e);let u;if(e===0)u=32;else if(e===1)u=this.src.charCodeAt(0),(u&63488)===55296&&(u=65533);else if(u=this.src.charCodeAt(e-1),(u&64512)===56320){const k=this.src.charCodeAt(e-2);u=(k&64512)===55296?65536+(k-55296<<10)+(u-56320):65533}else(u&64512)===55296&&(u=65533);let i=e;for(;i<t&&this.src.charCodeAt(i)===r;)i++;const l=i-e;let a=i<t?this.src.charCodeAt(i):32;if((a&64512)===55296){const k=this.src.charCodeAt(i+1);a=(k&64512)===56320?65536+(a-55296<<10)+(k-56320):65533}else(a&64512)===56320&&(a=65533);const s=Dn(u)||Sn(u),d=Dn(a)||Sn(a),b=An(u),c=An(a),f=!c&&(!d||b||s),p=!b&&(!s||c||d);return{can_open:f&&(n||!p||s),can_close:p&&(n||!f||d),length:l}};Ln.prototype.Token=ge;function nl(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function tl(e,n){let t=e.pos;for(;t<e.posMax&&!nl(e.src.charCodeAt(t));)t++;return t===e.pos?!1:(n||(e.pending+=e.src.slice(e.pos,t)),e.pos=t,!0)}const rl=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function ul(e,n){if(!e.md.options.linkify||e.linkLevel>0)return!1;const t=e.pos,r=e.posMax;if(t+3>r||e.src.charCodeAt(t)!==58||e.src.charCodeAt(t+1)!==47||e.src.charCodeAt(t+2)!==47)return!1;const u=e.pending.match(rl);if(!u)return!1;const i=u[1],l=e.md.linkify.matchAtStart(e.src.slice(t-i.length));if(!l)return!1;let a=l.url;if(a.length<=i.length)return!1;let s=a.length;for(;s>0&&a.charCodeAt(s-1)===42;)s--;s!==a.length&&(a=a.slice(0,s));const d=e.md.normalizeLink(a);if(!e.md.validateLink(d))return!1;if(!n){e.pending=e.pending.slice(0,-i.length);const b=e.push("link_open","a",1);b.attrs=[["href",d]],b.markup="linkify",b.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(a);const f=e.push("link_close","a",-1);f.markup="linkify",f.info="auto"}return e.pos+=a.length-i.length,!0}function ol(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==10)return!1;const r=e.pending.length-1,u=e.posMax;if(!n)if(r>=0&&e.pending.charCodeAt(r)===32)if(r>=1&&e.pending.charCodeAt(r-1)===32){let i=r-1;for(;i>=1&&e.pending.charCodeAt(i-1)===32;)i--;e.pending=e.pending.slice(0,i),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(t++;t<u&&V(e.src.charCodeAt(t));)t++;return e.pos=t,!0}const mr=[];for(let e=0;e<256;e++)mr.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){mr[e.charCodeAt(0)]=1});function il(e,n){let t=e.pos;const r=e.posMax;if(e.src.charCodeAt(t)!==92||(t++,t>=r))return!1;let u=e.src.charCodeAt(t);if(u===10){for(n||e.push("hardbreak","br",0),t++;t<r&&(u=e.src.charCodeAt(t),!!V(u));)t++;return e.pos=t,!0}let i=e.src[t];if(u>=55296&&u<=56319&&t+1<r){const a=e.src.charCodeAt(t+1);a>=56320&&a<=57343&&(i+=e.src[t+1],t++)}const l="\\"+i;if(!n){const a=e.push("text_special","",0);u<256&&mr[u]!==0?a.content=i:a.content=l,a.markup=l,a.info="escape"}return e.pos=t+1,!0}function al(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==96)return!1;const u=t;t++;const i=e.posMax;for(;t<i&&e.src.charCodeAt(t)===96;)t++;const l=e.src.slice(u,t),a=l.length;if(e.backticksScanned&&(e.backticks[a]||0)<=u)return n||(e.pending+=l),e.pos+=a,!0;let s=t,d;for(;(d=e.src.indexOf("`",s))!==-1;){for(s=d+1;s<i&&e.src.charCodeAt(s)===96;)s++;const b=s-d;if(b===a){if(!n){const c=e.push("code_inline","code",0);c.markup=l,c.content=e.src.slice(t,d).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=s,!0}e.backticks[b]=d}return e.backticksScanned=!0,n||(e.pending+=l),e.pos+=a,!0}function ll(e,n){const t=e.pos,r=e.src.charCodeAt(t);if(n||r!==126)return!1;const u=e.scanDelims(e.pos,!0);let i=u.length;const l=String.fromCharCode(r);if(i<2)return!1;let a;i%2&&(a=e.push("text","",0),a.content=l,i--);for(let s=0;s<i;s+=2)a=e.push("text","",0),a.content=l+l,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:u.can_open,close:u.can_close});return e.pos+=u.length,!0}function Jr(e,n){let t;const r=[],u=n.length;for(let i=0;i<u;i++){const l=n[i];if(l.marker!==126||l.end===-1)continue;const a=n[l.end];t=e.tokens[l.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=e.tokens[a.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",e.tokens[a.token-1].type==="text"&&e.tokens[a.token-1].content==="~"&&r.push(a.token-1)}for(;r.length;){const i=r.pop();let l=i+1;for(;l<e.tokens.length&&e.tokens[l].type==="s_close";)l++;l--,i!==l&&(t=e.tokens[l],e.tokens[l]=e.tokens[i],e.tokens[i]=t)}}function cl(e){const n=e.tokens_meta,t=e.tokens_meta.length;Jr(e,e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&Jr(e,n[r].delimiters)}const zu={tokenize:ll,postProcess:cl};function sl(e,n){const t=e.pos,r=e.src.charCodeAt(t);if(n||r!==95&&r!==42)return!1;const u=e.scanDelims(e.pos,r===42);for(let i=0;i<u.length;i++){const l=e.push("text","",0);l.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:u.length,token:e.tokens.length-1,end:-1,open:u.can_open,close:u.can_close})}return e.pos+=u.length,!0}function Qr(e,n){const t=n.length;for(let r=t-1;r>=0;r--){const u=n[r];if(u.marker!==95&&u.marker!==42||u.end===-1)continue;const i=n[u.end],l=r>0&&n[r-1].end===u.end+1&&n[r-1].marker===u.marker&&n[r-1].token===u.token-1&&n[u.end+1].token===i.token+1,a=String.fromCharCode(u.marker),s=e.tokens[u.token];s.type=l?"strong_open":"em_open",s.tag=l?"strong":"em",s.nesting=1,s.markup=l?a+a:a,s.content="";const d=e.tokens[i.token];d.type=l?"strong_close":"em_close",d.tag=l?"strong":"em",d.nesting=-1,d.markup=l?a+a:a,d.content="",l&&(e.tokens[n[r-1].token].content="",e.tokens[n[u.end+1].token].content="",r--)}}function dl(e){const n=e.tokens_meta,t=e.tokens_meta.length;Qr(e,e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&Qr(e,n[r].delimiters)}const qu={tokenize:sl,postProcess:dl};function fl(e,n){let t,r,u,i,l="",a="",s=e.pos,d=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const b=e.pos,c=e.posMax,f=e.pos+1,p=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(p<0)return!1;let m=p+1;if(m<c&&e.src.charCodeAt(m)===40){for(d=!1,m++;m<c&&(t=e.src.charCodeAt(m),!(!V(t)&&t!==10));m++);if(m>=c)return!1;if(s=m,u=e.md.helpers.parseLinkDestination(e.src,m,e.posMax),u.ok){for(l=e.md.normalizeLink(u.str),e.md.validateLink(l)?m=u.pos:l="",s=m;m<c&&(t=e.src.charCodeAt(m),!(!V(t)&&t!==10));m++);if(u=e.md.helpers.parseLinkTitle(e.src,m,e.posMax),m<c&&s!==m&&u.ok)for(a=u.str,m=u.pos;m<c&&(t=e.src.charCodeAt(m),!(!V(t)&&t!==10));m++);}(m>=c||e.src.charCodeAt(m)!==41)&&(d=!0),m++}if(d){if(typeof e.env.references>"u")return!1;if(m<c&&e.src.charCodeAt(m)===91?(s=m+1,m=e.md.helpers.parseLinkLabel(e,m),m>=0?r=e.src.slice(s,m++):m=p+1):m=p+1,r||(r=e.src.slice(f,p)),i=e.env.references[ht(r)],!i)return e.pos=b,!1;l=i.href,a=i.title}if(!n){e.pos=f,e.posMax=p;const g=e.push("link_open","a",1),k=[["href",l]];g.attrs=k,a&&k.push(["title",a]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=m,e.posMax=c,!0}function pl(e,n){let t,r,u,i,l,a,s,d,b="";const c=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const p=e.pos+2,m=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(m<0)return!1;if(i=m+1,i<f&&e.src.charCodeAt(i)===40){for(i++;i<f&&(t=e.src.charCodeAt(i),!(!V(t)&&t!==10));i++);if(i>=f)return!1;for(d=i,a=e.md.helpers.parseLinkDestination(e.src,i,e.posMax),a.ok&&(b=e.md.normalizeLink(a.str),e.md.validateLink(b)?i=a.pos:b=""),d=i;i<f&&(t=e.src.charCodeAt(i),!(!V(t)&&t!==10));i++);if(a=e.md.helpers.parseLinkTitle(e.src,i,e.posMax),i<f&&d!==i&&a.ok)for(s=a.str,i=a.pos;i<f&&(t=e.src.charCodeAt(i),!(!V(t)&&t!==10));i++);else s="";if(i>=f||e.src.charCodeAt(i)!==41)return e.pos=c,!1;i++}else{if(typeof e.env.references>"u")return!1;if(i<f&&e.src.charCodeAt(i)===91?(d=i+1,i=e.md.helpers.parseLinkLabel(e,i),i>=0?u=e.src.slice(d,i++):i=m+1):i=m+1,u||(u=e.src.slice(p,m)),l=e.env.references[ht(u)],!l)return e.pos=c,!1;b=l.href,s=l.title}if(!n){r=e.src.slice(p,m);const g=[];e.md.inline.parse(r,e.md,e.env,g);const k=e.push("image","img",0),y=[["src",b],["alt",""]];k.attrs=y,k.children=g,k.content=r,s&&y.push(["title",s])}return e.pos=i,e.posMax=f,!0}const hl=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,bl=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function ml(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==60)return!1;const r=e.pos,u=e.posMax;for(;;){if(++t>=u)return!1;const l=e.src.charCodeAt(t);if(l===60)return!1;if(l===62)break}const i=e.src.slice(r+1,t);if(bl.test(i)){const l=e.md.normalizeLink(i);if(!e.md.validateLink(l))return!1;if(!n){const a=e.push("link_open","a",1);a.attrs=[["href",l]],a.markup="autolink",a.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(i);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=i.length+2,!0}if(hl.test(i)){const l=e.md.normalizeLink("mailto:"+i);if(!e.md.validateLink(l))return!1;if(!n){const a=e.push("link_open","a",1);a.attrs=[["href",l]],a.markup="autolink",a.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(i);const d=e.push("link_close","a",-1);d.markup="autolink",d.info="auto"}return e.pos+=i.length+2,!0}return!1}function gl(e){return/^<a[>\s]/i.test(e)}function kl(e){return/^<\/a\s*>/i.test(e)}function yl(e){const n=e|32;return n>=97&&n<=122}function xl(e,n){if(!e.md.options.html)return!1;const t=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=t)return!1;const u=e.src.charCodeAt(r+1);if(u!==33&&u!==63&&u!==47&&!yl(u))return!1;const i=e.src.slice(r).match(Ya);if(!i)return!1;if(!n){const l=e.push("html_inline","",0);l.content=i[0],gl(l.content)&&e.linkLevel++,kl(l.content)&&e.linkLevel--}return e.pos+=i[0].length,!0}const wl=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,vl=/^&([a-z][a-z0-9]{1,31});/i;function Cl(e,n){const t=e.pos,r=e.posMax;if(e.src.charCodeAt(t)!==38||t+1>=r)return!1;if(e.src.charCodeAt(t+1)===35){const i=e.src.slice(t).match(wl);if(i){if(!n){const l=i[1][0].toLowerCase()==="x"?parseInt(i[1].slice(1),16):parseInt(i[1],10),a=e.push("text_special","",0);a.content=hr(l)?En(l):En(65533),a.markup=i[0],a.info="entity"}return e.pos+=i[0].length,!0}}else{const i=e.src.slice(t).match(vl);if(i){const l=ji(i[0]);if(l!==i[0]){if(!n){const a=e.push("text_special","",0);a.content=l,a.markup=i[0],a.info="entity"}return e.pos+=i[0].length,!0}}}return!1}function Xr(e){const n={},t=e.length;if(!t)return;let r=0,u=-2;const i=[];for(let l=0;l<t;l++){const a=e[l];if(i.push(0),(e[r].marker!==a.marker||u!==a.token-1)&&(r=l),u=a.token,a.length=a.length||0,!a.close)continue;n.hasOwnProperty(a.marker)||(n[a.marker]=[-1,-1,-1,-1,-1,-1]);const s=n[a.marker][(a.open?3:0)+a.length%3];let d=r-i[r]-1,b=d;for(;d>s;d-=i[d]+1){const c=e[d];if(c.marker===a.marker&&c.open&&c.end<0){let f=!1;if((c.close||a.open)&&(c.length+a.length)%3===0&&(c.length%3!==0||a.length%3!==0)&&(f=!0),!f){const p=d>0&&!e[d-1].open?i[d-1]+1:0;i[l]=l-d+p,i[d]=p,a.open=!1,c.end=l,c.close=!1,b=-1,u=-2;break}}}b!==-1&&(n[a.marker][(a.open?3:0)+(a.length||0)%3]=b)}}function _l(e){const n=e.tokens_meta,t=e.tokens_meta.length;Xr(e.delimiters);for(let r=0;r<t;r++)n[r]&&n[r].delimiters&&Xr(n[r].delimiters)}function El(e){let n,t,r=0;const u=e.tokens,i=e.tokens.length;for(n=t=0;n<i;n++)u[n].nesting<0&&r--,u[n].level=r,u[n].nesting>0&&r++,u[n].type==="text"&&n+1<i&&u[n+1].type==="text"?u[n+1].content=u[n].content+u[n+1].content:(n!==t&&(u[t]=u[n]),t++);n!==t&&(u.length=t)}const Nt=[["text",tl],["linkify",ul],["newline",ol],["escape",il],["backticks",al],["strikethrough",zu.tokenize],["emphasis",qu.tokenize],["link",fl],["image",pl],["autolink",ml],["html_inline",xl],["entity",Cl]],Ot=[["balance_pairs",_l],["strikethrough",zu.postProcess],["emphasis",qu.postProcess],["fragments_join",El]];function Nn(){this.ruler=new oe;for(let e=0;e<Nt.length;e++)this.ruler.push(Nt[e][0],Nt[e][1]);this.ruler2=new oe;for(let e=0;e<Ot.length;e++)this.ruler2.push(Ot[e][0],Ot[e][1])}Nn.prototype.skipToken=function(e){const n=e.pos,t=this.ruler.getRules(""),r=t.length,u=e.md.options.maxNesting,i=e.cache;if(typeof i[n]<"u"){e.pos=i[n];return}let l=!1;if(e.level<u){for(let a=0;a<r;a++)if(e.level++,l=t[a](e,!0),e.level--,l){if(n>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;l||e.pos++,i[n]=e.pos};Nn.prototype.tokenize=function(e){const n=this.ruler.getRules(""),t=n.length,r=e.posMax,u=e.md.options.maxNesting;for(;e.pos<r;){const i=e.pos;let l=!1;if(e.level<u){for(let a=0;a<t;a++)if(l=n[a](e,!1),l){if(i>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(l){if(e.pos>=r)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};Nn.prototype.parse=function(e,n,t,r){const u=new this.State(e,n,t,r);this.tokenize(u);const i=this.ruler2.getRules(""),l=i.length;for(let a=0;a<l;a++)i[a](u)};Nn.prototype.State=Ln;function Al(e){const n={};e=e||{},n.src_Any=Au.source,n.src_Cc=Su.source,n.src_Z=Tu.source,n.src_P=fr.source,n.src_ZPCc=[n.src_Z,n.src_P,n.src_Cc].join("|"),n.src_ZCc=[n.src_Z,n.src_Cc].join("|");const t="[><｜]";return n.src_pseudo_letter="(?:(?!"+t+"|"+n.src_ZPCc+")"+n.src_Any+")",n.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",n.src_auth="(?:(?:(?!"+n.src_ZCc+"|[@/\\[\\]()]).)+@)?",n.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",n.src_host_terminator="(?=$|"+t+"|"+n.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+n.src_ZPCc+"))",n.src_path="(?:[/?#](?:(?!"+n.src_ZCc+"|"+t+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+n.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+n.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+n.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+n.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+n.src_ZCc+"|[']).)+\\'|\\'(?="+n.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+n.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+n.src_ZCc+"|$)|;(?!"+n.src_ZCc+"|$)|\\!+(?!"+n.src_ZCc+"|[!]|$)|\\?(?!"+n.src_ZCc+"|[?]|$))+|\\/)?",n.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',n.src_xn="xn--[a-z0-9\\-]{1,59}",n.src_domain_root="(?:"+n.src_xn+"|"+n.src_pseudo_letter+"{1,63})",n.src_domain="(?:"+n.src_xn+"|(?:"+n.src_pseudo_letter+")|(?:"+n.src_pseudo_letter+"(?:-|"+n.src_pseudo_letter+"){0,61}"+n.src_pseudo_letter+"))",n.src_host="(?:(?:(?:(?:"+n.src_domain+")\\.)*"+n.src_domain+"))",n.tpl_host_fuzzy="(?:"+n.src_ip4+"|(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%)))",n.tpl_host_no_ip_fuzzy="(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%))",n.src_host_strict=n.src_host+n.src_host_terminator,n.tpl_host_fuzzy_strict=n.tpl_host_fuzzy+n.src_host_terminator,n.src_host_port_strict=n.src_host+n.src_port+n.src_host_terminator,n.tpl_host_port_fuzzy_strict=n.tpl_host_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_port_no_ip_fuzzy_strict=n.tpl_host_no_ip_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+n.src_ZPCc+"|>|$))",n.tpl_email_fuzzy="(^|"+t+'|"|\\(|'+n.src_ZCc+")("+n.src_email_name+"@"+n.tpl_host_fuzzy_strict+")",n.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_fuzzy_strict+n.src_path+")",n.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_no_ip_fuzzy_strict+n.src_path+")",n}function Jt(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(r){e[r]=t[r]})}),e}function gt(e){return Object.prototype.toString.call(e)}function Sl(e){return gt(e)==="[object String]"}function Dl(e){return gt(e)==="[object Object]"}function Tl(e){return gt(e)==="[object RegExp]"}function eu(e){return gt(e)==="[object Function]"}function Fl(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const Hu={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function Ml(e){return Object.keys(e||{}).reduce(function(n,t){return n||Hu.hasOwnProperty(t)},!1)}const Il={"http:":{validate:function(e,n,t){const r=e.slice(n);return t.re.http||(t.re.http=new RegExp("^\\/\\/"+t.re.src_auth+t.re.src_host_port_strict+t.re.src_path,"i")),t.re.http.test(r)?r.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,n,t){const r=e.slice(n);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+"(?:localhost|(?:(?:"+t.re.src_domain+")\\.)+"+t.re.src_domain_root+")"+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(r)?n>=3&&e[n-3]===":"||n>=3&&e[n-3]==="/"?0:r.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(e,n,t){const r=e.slice(n);return t.re.mailto||(t.re.mailto=new RegExp("^"+t.re.src_email_name+"@"+t.re.src_host_strict,"i")),t.re.mailto.test(r)?r.match(t.re.mailto)[0].length:0}}},Rl="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",Ll="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function Nl(e){return function(n,t){const r=n.slice(t);return e.test(r)?r.match(e)[0].length:0}}function nu(){return function(e,n){n.normalize(e)}}function it(e){const n=e.re=Al(e.__opts__),t=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||t.push(Rl),t.push(n.src_xn),n.src_tlds=t.join("|");function r(a){return a.replace("%TLDS%",n.src_tlds)}n.email_fuzzy=RegExp(r(n.tpl_email_fuzzy),"i"),n.email_fuzzy_global=RegExp(r(n.tpl_email_fuzzy),"ig"),n.link_fuzzy=RegExp(r(n.tpl_link_fuzzy),"i"),n.link_fuzzy_global=RegExp(r(n.tpl_link_fuzzy),"ig"),n.link_no_ip_fuzzy=RegExp(r(n.tpl_link_no_ip_fuzzy),"i"),n.link_no_ip_fuzzy_global=RegExp(r(n.tpl_link_no_ip_fuzzy),"ig"),n.host_fuzzy_test=RegExp(r(n.tpl_host_fuzzy_test),"i");const u=[];e.__compiled__={};function i(a,s){throw new Error('(LinkifyIt) Invalid schema "'+a+'": '+s)}Object.keys(e.__schemas__).forEach(function(a){const s=e.__schemas__[a];if(s===null)return;const d={validate:null,link:null};if(e.__compiled__[a]=d,Dl(s)){Tl(s.validate)?d.validate=Nl(s.validate):eu(s.validate)?d.validate=s.validate:i(a,s),eu(s.normalize)?d.normalize=s.normalize:s.normalize?i(a,s):d.normalize=nu();return}if(Sl(s)){u.push(a);return}i(a,s)}),u.forEach(function(a){e.__compiled__[e.__schemas__[a]]&&(e.__compiled__[a].validate=e.__compiled__[e.__schemas__[a]].validate,e.__compiled__[a].normalize=e.__compiled__[e.__schemas__[a]].normalize)}),e.__compiled__[""]={validate:null,normalize:nu()};const l=Object.keys(e.__compiled__).filter(function(a){return a.length>0&&e.__compiled__[a]}).map(Fl).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+l+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+l+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i")}function ju(e,n,t,r){const u=e.slice(t,r);this.schema=n.toLowerCase(),this.index=t,this.lastIndex=r,this.raw=u,this.text=u,this.url=u}function ae(e,n){if(!(this instanceof ae))return new ae(e,n);n||Ml(e)&&(n=e,e={}),this.__opts__=Jt({},Hu,n),this.__schemas__=Jt({},Il,e),this.__compiled__={},this.__tlds__=Ll,this.__tlds_replaced__=!1,this.re={},it(this)}ae.prototype.add=function(n,t){return this.__schemas__[n]=t,it(this),this};ae.prototype.set=function(n){return this.__opts__=Jt(this.__opts__,n),this};ae.prototype.test=function(n){if(!n.length)return!1;let t,r;if(this.re.schema_test.test(n)){for(r=this.re.schema_search,r.lastIndex=0;(t=r.exec(n))!==null;)if(this.testSchemaAt(n,t[2],r.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&n.search(this.re.host_fuzzy_test)>=0&&n.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&n.indexOf("@")>=0&&n.match(this.re.email_fuzzy)!==null)};ae.prototype.pretest=function(n){return this.re.pretest.test(n)};ae.prototype.testSchemaAt=function(n,t,r){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(n,r,this):0};ae.prototype.match=function(n){const t=[],r=[],u=[],i=[];let l,a,s;function d(f,p){return f?p?f.index!==p.index?f.index<p.index?f:p:f.lastIndex>=p.lastIndex?f:p:f:p}if(!n.length)return null;if(this.re.schema_test.test(n))for(s=this.re.schema_search,s.lastIndex=0;(l=s.exec(n))!==null;)a=this.testSchemaAt(n,l[2],s.lastIndex),a&&r.push({schema:l[2],index:l.index+l[1].length,lastIndex:l.index+l[0].length+a});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(s=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,s.lastIndex=0;(l=s.exec(n))!==null;)u.push({schema:"",index:l.index+l[1].length,lastIndex:l.index+l[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(s=this.re.email_fuzzy_global,s.lastIndex=0;(l=s.exec(n))!==null;)i.push({schema:"mailto:",index:l.index+l[1].length,lastIndex:l.index+l[0].length});const b=[0,0,0];let c=0;for(;;){const f=[r[b[0]],i[b[1]],u[b[2]]],p=d(d(f[0],f[1]),f[2]);if(!p)break;if(p===f[0]?b[0]++:p===f[1]?b[1]++:b[2]++,p.index<c)continue;const m=new ju(n,p.schema,p.index,p.lastIndex);this.__compiled__[m.schema].normalize(m,this),t.push(m),c=p.lastIndex}return t.length?t:null};ae.prototype.matchAtStart=function(n){if(!n.length)return null;const t=this.re.schema_at_start.exec(n);if(!t)return null;const r=this.testSchemaAt(n,t[2],t[0].length);if(!r)return null;const u=new ju(n,t[2],t.index+t[1].length,t.index+t[0].length+r);return this.__compiled__[u.schema].normalize(u,this),u};ae.prototype.tlds=function(n,t){return n=Array.isArray(n)?n:[n],t?(this.__tlds__=this.__tlds__.concat(n).sort().filter(function(r,u,i){return r!==i[u-1]}).reverse(),it(this),this):(this.__tlds__=n.slice(),this.__tlds_replaced__=!0,it(this),this)};ae.prototype.normalize=function(n){n.schema||(n.url="http://"+n.url),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url="mailto:"+n.url)};ae.prototype.onCompile=function(){};const un=2147483647,ke=36,gr=1,Tn=26,Ol=38,Pl=700,$u=72,Uu=128,Gu="-",Bl=/^xn--/,zl=/[^\0-\x7F]/,ql=/[\x2E\u3002\uFF0E\uFF61]/g,Hl={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Pt=ke-gr,ye=Math.floor,Bt=String.fromCharCode;function Ie(e){throw new RangeError(Hl[e])}function jl(e,n){const t=[];let r=e.length;for(;r--;)t[r]=n(e[r]);return t}function Vu(e,n){const t=e.split("@");let r="";t.length>1&&(r=t[0]+"@",e=t[1]),e=e.replace(ql,".");const u=e.split("."),i=jl(u,n).join(".");return r+i}function Wu(e){const n=[];let t=0;const r=e.length;for(;t<r;){const u=e.charCodeAt(t++);if(u>=55296&&u<=56319&&t<r){const i=e.charCodeAt(t++);(i&64512)==56320?n.push(((u&1023)<<10)+(i&1023)+65536):(n.push(u),t--)}else n.push(u)}return n}const $l=e=>String.fromCodePoint(...e),Ul=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:ke},tu=function(e,n){return e+22+75*(e<26)-((n!=0)<<5)},Zu=function(e,n,t){let r=0;for(e=t?ye(e/Pl):e>>1,e+=ye(e/n);e>Pt*Tn>>1;r+=ke)e=ye(e/Pt);return ye(r+(Pt+1)*e/(e+Ol))},Yu=function(e){const n=[],t=e.length;let r=0,u=Uu,i=$u,l=e.lastIndexOf(Gu);l<0&&(l=0);for(let a=0;a<l;++a)e.charCodeAt(a)>=128&&Ie("not-basic"),n.push(e.charCodeAt(a));for(let a=l>0?l+1:0;a<t;){const s=r;for(let b=1,c=ke;;c+=ke){a>=t&&Ie("invalid-input");const f=Ul(e.charCodeAt(a++));f>=ke&&Ie("invalid-input"),f>ye((un-r)/b)&&Ie("overflow"),r+=f*b;const p=c<=i?gr:c>=i+Tn?Tn:c-i;if(f<p)break;const m=ke-p;b>ye(un/m)&&Ie("overflow"),b*=m}const d=n.length+1;i=Zu(r-s,d,s==0),ye(r/d)>un-u&&Ie("overflow"),u+=ye(r/d),r%=d,n.splice(r++,0,u)}return String.fromCodePoint(...n)},Ku=function(e){const n=[];e=Wu(e);const t=e.length;let r=Uu,u=0,i=$u;for(const s of e)s<128&&n.push(Bt(s));const l=n.length;let a=l;for(l&&n.push(Gu);a<t;){let s=un;for(const b of e)b>=r&&b<s&&(s=b);const d=a+1;s-r>ye((un-u)/d)&&Ie("overflow"),u+=(s-r)*d,r=s;for(const b of e)if(b<r&&++u>un&&Ie("overflow"),b===r){let c=u;for(let f=ke;;f+=ke){const p=f<=i?gr:f>=i+Tn?Tn:f-i;if(c<p)break;const m=c-p,g=ke-p;n.push(Bt(tu(p+m%g,0))),c=ye(m/g)}n.push(Bt(tu(c,0))),i=Zu(u,d,a===l),u=0,++a}++u,++r}return n.join("")},Gl=function(e){return Vu(e,function(n){return Bl.test(n)?Yu(n.slice(4).toLowerCase()):n})},Vl=function(e){return Vu(e,function(n){return zl.test(n)?"xn--"+Ku(n):n})},Ju={version:"2.3.1",ucs2:{decode:Wu,encode:$l},decode:Yu,encode:Ku,toASCII:Vl,toUnicode:Gl},Wl={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},Zl={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},Yl={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},Kl={default:Wl,zero:Zl,commonmark:Yl},Jl=/^(vbscript|javascript|file|data):/,Ql=/^data:image\/(gif|png|jpeg|webp);/;function Xl(e){const n=e.trim().toLowerCase();return Jl.test(n)?Ql.test(n):!0}const Qu=["http:","https:","mailto:"];function ec(e){const n=dr(e,!0);if(n.hostname&&(!n.protocol||Qu.indexOf(n.protocol)>=0))try{n.hostname=Ju.toASCII(n.hostname)}catch{}return Rn(sr(n))}function nc(e){const n=dr(e,!0);if(n.hostname&&(!n.protocol||Qu.indexOf(n.protocol)>=0))try{n.hostname=Ju.toUnicode(n.hostname)}catch{}return on(sr(n),on.defaultChars+"%")}function fe(e,n){if(!(this instanceof fe))return new fe(e,n);n||pr(e)||(n=e||{},e="default"),this.inline=new Nn,this.block=new mt,this.core=new br,this.renderer=new fn,this.linkify=new ae,this.validateLink=Xl,this.normalizeLink=ec,this.normalizeLinkText=nc,this.utils=ua,this.helpers=pt({},la),this.options={},this.configure(e),n&&this.set(n)}fe.prototype.set=function(e){return pt(this.options,e),this};fe.prototype.configure=function(e){const n=this;if(pr(e)){const t=e;if(e=Kl[t],!e)throw new Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(t){e.components[t].rules&&n[t].ruler.enableOnly(e.components[t].rules),e.components[t].rules2&&n[t].ruler2.enableOnly(e.components[t].rules2)}),this};fe.prototype.enable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(u){t=t.concat(this[u].ruler.enable(e,!0))},this),t=t.concat(this.inline.ruler2.enable(e,!0));const r=e.filter(function(u){return t.indexOf(u)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+r);return this};fe.prototype.disable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(u){t=t.concat(this[u].ruler.disable(e,!0))},this),t=t.concat(this.inline.ruler2.disable(e,!0));const r=e.filter(function(u){return t.indexOf(u)<0});if(r.length&&!n)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+r);return this};fe.prototype.use=function(e){const n=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,n),this};fe.prototype.parse=function(e,n){if(typeof e!="string")throw new Error("Input data should be a String");const t=new this.core.State(e,this,n);return this.core.process(t),t.tokens};fe.prototype.render=function(e,n){return n=n||{},this.renderer.render(this.parse(e,n),this.options,n)};fe.prototype.parseInline=function(e,n){const t=new this.core.State(e,this,n);return t.inlineMode=!0,this.core.process(t),t.tokens};fe.prototype.renderInline=function(e,n){return n=n||{},this.renderer.render(this.parseInline(e,n),this.options,n)};var ru=!1,ln={false:"push",true:"unshift",after:"push",before:"unshift"},at={isPermalinkSymbol:!0};function Qt(e,n,t,r){var u;if(!ru){var i="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(i):console.warn(i),ru=!0}var l=[Object.assign(new t.Token("link_open","a",1),{attrs:[].concat(n.permalinkClass?[["class",n.permalinkClass]]:[],[["href",n.permalinkHref(e,t)]],Object.entries(n.permalinkAttrs(e,t)))}),Object.assign(new t.Token("html_block","",0),{content:n.permalinkSymbol,meta:at}),new t.Token("link_close","a",-1)];n.permalinkSpace&&t.tokens[r+1].children[ln[n.permalinkBefore]](Object.assign(new t.Token("text","",0),{content:" "})),(u=t.tokens[r+1].children)[ln[n.permalinkBefore]].apply(u,l)}function Xu(e){return"#"+e}function eo(e){return{}}var tc={class:"header-anchor",symbol:"#",renderHref:Xu,renderAttrs:eo};function On(e){function n(t){return t=Object.assign({},n.defaults,t),function(r,u,i,l){return e(r,t,u,i,l)}}return n.defaults=Object.assign({},tc),n.renderPermalinkImpl=e,n}function kr(e){var n=[],t=e.filter(function(r){if(r[0]!=="class")return!0;n.push(r[1])});return n.length>0&&t.unshift(["class",n.join(" ")]),t}var kt=On(function(e,n,t,r,u){var i,l=[Object.assign(new r.Token("link_open","a",1),{attrs:kr([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],n.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(n.renderAttrs(e,r))))}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:at}),new r.Token("link_close","a",-1)];if(n.space){var a=typeof n.space=="string"?n.space:" ";r.tokens[u+1].children[ln[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:a}))}(i=r.tokens[u+1].children)[ln[n.placement]].apply(i,l)});Object.assign(kt.defaults,{space:!0,placement:"after",ariaHidden:!1});var je=On(kt.renderPermalinkImpl);je.defaults=Object.assign({},kt.defaults,{ariaHidden:!0});var no=On(function(e,n,t,r,u){var i=[Object.assign(new r.Token("link_open","a",1),{attrs:kr([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],Object.entries(n.renderAttrs(e,r))))})].concat(n.safariReaderFix?[new r.Token("span_open","span",1)]:[],r.tokens[u+1].children,n.safariReaderFix?[new r.Token("span_close","span",-1)]:[],[new r.Token("link_close","a",-1)]);r.tokens[u+1]=Object.assign(new r.Token("inline","",0),{children:i})});Object.assign(no.defaults,{safariReaderFix:!1});var uu=On(function(e,n,t,r,u){var i;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(n.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+n.style+"`");if(!["aria-describedby","aria-labelledby"].includes(n.style)&&!n.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+n.style+"` style");if(n.style==="visually-hidden"&&!n.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var l=r.tokens[u+1].children.filter(function(c){return c.type==="text"||c.type==="code_inline"}).reduce(function(c,f){return c+f.content},""),a=[],s=[];if(n.class&&s.push(["class",n.class]),s.push(["href",n.renderHref(e,r)]),s.push.apply(s,Object.entries(n.renderAttrs(e,r))),n.style==="visually-hidden"){if(a.push(Object.assign(new r.Token("span_open","span",1),{attrs:[["class",n.visuallyHiddenClass]]}),Object.assign(new r.Token("text","",0),{content:n.assistiveText(l)}),new r.Token("span_close","span",-1)),n.space){var d=typeof n.space=="string"?n.space:" ";a[ln[n.placement]](Object.assign(new r.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:d}))}a[ln[n.placement]](Object.assign(new r.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:at}),new r.Token("span_close","span",-1))}else a.push(Object.assign(new r.Token("html_inline","",0),{content:n.symbol,meta:at}));n.style==="aria-label"?s.push(["aria-label",n.assistiveText(l)]):["aria-describedby","aria-labelledby"].includes(n.style)&&s.push([n.style,e]);var b=[Object.assign(new r.Token("link_open","a",1),{attrs:kr(s)})].concat(a,[new r.Token("link_close","a",-1)]);(i=r.tokens).splice.apply(i,[u+3,0].concat(b)),n.wrapper&&(r.tokens.splice(u,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[0]+`
`})),r.tokens.splice(u+3+b.length+1,0,Object.assign(new r.Token("html_block","",0),{content:n.wrapper[1]+`
`})))});function ou(e,n,t,r){var u=e,i=r;if(t&&Object.prototype.hasOwnProperty.call(n,u))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(n,u);)u=e+"-"+i,i+=1;return n[u]=!0,u}function tn(e,n){n=Object.assign({},tn.defaults,n),e.core.ruler.push("anchor",function(t){for(var r,u={},i=t.tokens,l=Array.isArray(n.level)?(r=n.level,function(c){return r.includes(c)}):(function(c){return function(f){return f>=c}})(n.level),a=0;a<i.length;a++){var s=i[a];if(s.type==="heading_open"&&l(Number(s.tag.substr(1)))){var d=n.getTokensText(i[a+1].children),b=s.attrGet("id");b=b==null?ou(b=n.slugifyWithState?n.slugifyWithState(d,t):n.slugify(d),u,!1,n.uniqueSlugStartIndex):ou(b,u,!0,n.uniqueSlugStartIndex),s.attrSet("id",b),n.tabIndex!==!1&&s.attrSet("tabindex",""+n.tabIndex),typeof n.permalink=="function"?n.permalink(b,n,t,a):(n.permalink||n.renderPermalink&&n.renderPermalink!==Qt)&&n.renderPermalink(b,n,t,a),a=i.indexOf(s),n.callback&&n.callback(s,{slug:b,title:d})}}})}Object.assign(uu.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),tn.permalink={__proto__:null,legacy:Qt,renderHref:Xu,renderAttrs:eo,makePermalink:On,linkInsideHeader:kt,ariaHidden:je,headerLink:no,linkAfterHeader:uu},tn.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(n){return["text","code_inline"].includes(n.type)}).map(function(n){return n.content}).join("")},permalink:!1,renderPermalink:Qt,permalinkClass:je.defaults.class,permalinkSpace:je.defaults.space,permalinkSymbol:"¶",permalinkBefore:je.defaults.placement==="before",permalinkHref:je.defaults.renderHref,permalinkAttrs:je.defaults.renderAttrs},tn.default=tn;function yt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var zt,iu;function rc(){if(iu)return zt;iu=1;function e(r,u){var i,l,a=r.attrs[r.attrIndex("href")][1];for(i=0;i<u.length;++i){if(l=u[i],typeof l.matcher=="function"){if(l.matcher(a,l))return l;continue}return l}}function n(r,u,i){Object.keys(i).forEach(function(l){var a,s=i[l];l==="className"&&(l="class"),a=u[r].attrIndex(l),a<0?u[r].attrPush([l,s]):u[r].attrs[a][1]=s})}function t(r,u){u?u=Array.isArray(u)?u:[u]:u=[],Object.freeze(u);var i=r.renderer.rules.link_open||this.defaultRender;r.renderer.rules.link_open=function(l,a,s,d,b){var c=e(l[a],u),f=c&&c.attrs;return f&&n(a,l,f),i(l,a,s,d,b)}}return t.defaultRender=function(r,u,i,l,a){return a.renderToken(r,u,i)},zt=t,zt}var uc=rc();const oc=yt(uc);function ic(e,n,t,r){const u=Number(e[n].meta.id+1).toString();let i="";return typeof r.docId=="string"&&(i=`-${r.docId}-`),i+u}function ac(e,n){let t=Number(e[n].meta.id+1).toString();return e[n].meta.subId>0&&(t+=`:${e[n].meta.subId}`),`[${t}]`}function lc(e,n,t,r,u){const i=u.rules.footnote_anchor_name(e,n,t,r,u),l=u.rules.footnote_caption(e,n,t,r,u);let a=i;return e[n].meta.subId>0&&(a+=`:${e[n].meta.subId}`),`<sup class="footnote-ref"><a href="#fn${i}" id="fnref${a}">${l}</a></sup>`}function cc(e,n,t){return(t.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function sc(){return`</ol>
</section>
`}function dc(e,n,t,r,u){let i=u.rules.footnote_anchor_name(e,n,t,r,u);return e[n].meta.subId>0&&(i+=`:${e[n].meta.subId}`),`<li id="fn${i}" class="footnote-item">`}function fc(){return`</li>
`}function pc(e,n,t,r,u){let i=u.rules.footnote_anchor_name(e,n,t,r,u);return e[n].meta.subId>0&&(i+=`:${e[n].meta.subId}`),` <a href="#fnref${i}" class="footnote-backref">↩︎</a>`}function hc(e){const n=e.helpers.parseLinkLabel,t=e.utils.isSpace;e.renderer.rules.footnote_ref=lc,e.renderer.rules.footnote_block_open=cc,e.renderer.rules.footnote_block_close=sc,e.renderer.rules.footnote_open=dc,e.renderer.rules.footnote_close=fc,e.renderer.rules.footnote_anchor=pc,e.renderer.rules.footnote_caption=ac,e.renderer.rules.footnote_anchor_name=ic;function r(a,s,d,b){const c=a.bMarks[s]+a.tShift[s],f=a.eMarks[s];if(c+4>f||a.src.charCodeAt(c)!==91||a.src.charCodeAt(c+1)!==94)return!1;let p;for(p=c+2;p<f;p++){if(a.src.charCodeAt(p)===32)return!1;if(a.src.charCodeAt(p)===93)break}if(p===c+2||p+1>=f||a.src.charCodeAt(++p)!==58)return!1;if(b)return!0;p++,a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.refs||(a.env.footnotes.refs={});const m=a.src.slice(c+2,p-2);a.env.footnotes.refs[`:${m}`]=-1;const g=new a.Token("footnote_reference_open","",1);g.meta={label:m},g.level=a.level++,a.tokens.push(g);const k=a.bMarks[s],y=a.tShift[s],v=a.sCount[s],E=a.parentType,A=p,R=a.sCount[s]+p-(a.bMarks[s]+a.tShift[s]);let N=R;for(;p<f;){const U=a.src.charCodeAt(p);if(t(U))U===9?N+=4-N%4:N++;else break;p++}a.tShift[s]=p-A,a.sCount[s]=N-R,a.bMarks[s]=A,a.blkIndent+=4,a.parentType="footnote",a.sCount[s]<a.blkIndent&&(a.sCount[s]+=a.blkIndent),a.md.block.tokenize(a,s,d,!0),a.parentType=E,a.blkIndent-=4,a.tShift[s]=y,a.sCount[s]=v,a.bMarks[s]=k;const j=new a.Token("footnote_reference_close","",-1);return j.level=--a.level,a.tokens.push(j),!0}function u(a,s){const d=a.posMax,b=a.pos;if(b+2>=d||a.src.charCodeAt(b)!==94||a.src.charCodeAt(b+1)!==91)return!1;const c=b+2,f=n(a,b+1);if(f<0)return!1;if(!s){a.env.footnotes||(a.env.footnotes={}),a.env.footnotes.list||(a.env.footnotes.list=[]);const p=a.env.footnotes.list.length,m=[];a.md.inline.parse(a.src.slice(c,f),a.md,a.env,m);const g=a.push("footnote_ref","",0);g.meta={id:p},a.env.footnotes.list[p]={content:a.src.slice(c,f),tokens:m}}return a.pos=f+1,a.posMax=d,!0}function i(a,s){const d=a.posMax,b=a.pos;if(b+3>d||!a.env.footnotes||!a.env.footnotes.refs||a.src.charCodeAt(b)!==91||a.src.charCodeAt(b+1)!==94)return!1;let c;for(c=b+2;c<d;c++){if(a.src.charCodeAt(c)===32||a.src.charCodeAt(c)===10)return!1;if(a.src.charCodeAt(c)===93)break}if(c===b+2||c>=d)return!1;c++;const f=a.src.slice(b+2,c-1);if(typeof a.env.footnotes.refs[`:${f}`]>"u")return!1;if(!s){a.env.footnotes.list||(a.env.footnotes.list=[]);let p;a.env.footnotes.refs[`:${f}`]<0?(p=a.env.footnotes.list.length,a.env.footnotes.list[p]={label:f,count:0},a.env.footnotes.refs[`:${f}`]=p):p=a.env.footnotes.refs[`:${f}`];const m=a.env.footnotes.list[p].count;a.env.footnotes.list[p].count++;const g=a.push("footnote_ref","",0);g.meta={id:p,subId:m,label:f}}return a.pos=c,a.posMax=d,!0}function l(a){let s,d,b,c=!1;const f={};if(!a.env.footnotes||(a.tokens=a.tokens.filter(function(m){return m.type==="footnote_reference_open"?(c=!0,d=[],b=m.meta.label,!1):m.type==="footnote_reference_close"?(c=!1,f[":"+b]=d,!1):(c&&d.push(m),!c)}),!a.env.footnotes.list))return;const p=a.env.footnotes.list;a.tokens.push(new a.Token("footnote_block_open","",1));for(let m=0,g=p.length;m<g;m++){const k=new a.Token("footnote_open","",1);if(k.meta={id:m,label:p[m].label},a.tokens.push(k),p[m].tokens){s=[];const E=new a.Token("paragraph_open","p",1);E.block=!0,s.push(E);const A=new a.Token("inline","",0);A.children=p[m].tokens,A.content=p[m].content,s.push(A);const R=new a.Token("paragraph_close","p",-1);R.block=!0,s.push(R)}else p[m].label&&(s=f[`:${p[m].label}`]);s&&(a.tokens=a.tokens.concat(s));let y;a.tokens[a.tokens.length-1].type==="paragraph_close"?y=a.tokens.pop():y=null;const v=p[m].count>0?p[m].count:1;for(let E=0;E<v;E++){const A=new a.Token("footnote_anchor","",0);A.meta={id:m,subId:E,label:p[m].label},a.tokens.push(A)}y&&a.tokens.push(y),a.tokens.push(new a.Token("footnote_close","",-1))}a.tokens.push(new a.Token("footnote_block_close","",-1))}e.block.ruler.before("reference","footnote_def",r,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",u),e.inline.ruler.after("footnote_inline","footnote_ref",i),e.core.ruler.after("inline","footnote_tail",l)}var qt,au;function bc(){if(au)return qt;au=1;var e=!0,n=!1,t=!1;qt=function(g,k){k&&(e=!k.enabled,n=!!k.label,t=!!k.labelAfter),g.core.ruler.after("inline","github-task-lists",function(y){for(var v=y.tokens,E=2;E<v.length;E++)i(v,E)&&(l(v[E],y.Token),r(v[E-2],"class","task-list-item"+(e?"":" enabled")),r(v[u(v,E-2)],"class","contains-task-list"))})};function r(g,k,y){var v=g.attrIndex(k),E=[k,y];v<0?g.attrPush(E):g.attrs[v]=E}function u(g,k){for(var y=g[k].level-1,v=k-1;v>=0;v--)if(g[v].level===y)return v;return-1}function i(g,k){return c(g[k])&&f(g[k-1])&&p(g[k-2])&&m(g[k])}function l(g,k){if(g.children.unshift(a(g,k)),g.children[1].content=g.children[1].content.slice(3),g.content=g.content.slice(3),n)if(t){g.children.pop();var y="task-item-"+Math.ceil(Math.random()*(1e4*1e3)-1e3);g.children[0].content=g.children[0].content.slice(0,-1)+' id="'+y+'">',g.children.push(b(g.content,y,k))}else g.children.unshift(s(k)),g.children.push(d(k))}function a(g,k){var y=new k("html_inline","",0),v=e?' disabled="" ':"";return g.content.indexOf("[ ] ")===0?y.content='<input class="task-list-item-checkbox"'+v+'type="checkbox">':(g.content.indexOf("[x] ")===0||g.content.indexOf("[X] ")===0)&&(y.content='<input class="task-list-item-checkbox" checked=""'+v+'type="checkbox">'),y}function s(g){var k=new g("html_inline","",0);return k.content="<label>",k}function d(g){var k=new g("html_inline","",0);return k.content="</label>",k}function b(g,k,y){var v=new y("html_inline","",0);return v.content='<label class="task-list-item-label" for="'+k+'">'+g+"</label>",v.attrs=[{for:k}],v}function c(g){return g.type==="inline"}function f(g){return g.type==="paragraph_open"}function p(g){return g.type==="list_item_open"}function m(g){return g.content.indexOf("[ ] ")===0||g.content.indexOf("[x] ")===0||g.content.indexOf("[X] ")===0}return qt}var mc=bc();const gc=yt(mc),kc={note:'<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',tip:'<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',important:'<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',warning:'<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',caution:'<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>'},yc=(e,n={})=>{const{markers:t=["TIP","NOTE","IMPORTANT","WARNING","CAUTION"],icons:r=kc,matchCaseSensitive:u=!1,titles:i={},classPrefix:l="markdown-alert"}=n,a=t==="*"?"\\w+":t.join("|"),s=new RegExp(`^\\\\?\\[\\!(${a})\\]([^\\n\\r]*)`,u?"":"i");e.core.ruler.after("block","github-alerts",d=>{const b=d.tokens;for(let c=0;c<b.length;c++)if(b[c].type==="blockquote_open"){const f=b[c],p=c;for(;b[c]?.type!=="blockquote_close"&&c<=b.length;)c+=1;const m=b[c],g=c,k=b.slice(p,g+1).find(R=>R.type==="inline");if(!k)continue;const y=k.content.match(s);if(!y)continue;const v=y[1].toLowerCase(),E=y[2].trim()||(i[v]??xc(v)),A=r[v]??"";k.content=k.content.slice(y[0].length).trimStart(),f.type="alert_open",f.tag="div",f.meta={title:E,type:v,icon:A},m.type="alert_close",m.tag="div"}}),e.renderer.rules.alert_open=function(d,b){const{title:c,type:f,icon:p}=d[b].meta;return`<div class="${l} ${l}-${f}"><p class="${l}-title">${p}${c}</p>`}};function xc(e){return e.charAt(0).toUpperCase()+e.slice(1)}var wc=Object.create,to=Object.defineProperty,vc=Object.getOwnPropertyDescriptor,Cc=Object.getOwnPropertyNames,_c=Object.getPrototypeOf,Ec=Object.prototype.hasOwnProperty,W=(e,n)=>()=>(n||(e((n={exports:{}}).exports,n),e=null),n.exports),Ac=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(var u=Cc(n),i=0,l=u.length,a;i<l;i++)a=u[i],!Ec.call(e,a)&&a!==t&&to(e,a,{get:(s=>n[s]).bind(null,a),enumerable:!(r=vc(n,a))||r.enumerable});return e},Sc=(e,n,t)=>(t=e!=null?wc(_c(e)):{},Ac(to(t,"default",{value:e,enumerable:!0}),e)),Pn=W(((e,n)=>{function t(s){return typeof s>"u"||s===null}function r(s){return typeof s=="object"&&s!==null}function u(s){return Array.isArray(s)?s:t(s)?[]:[s]}function i(s,d){if(d){const b=Object.keys(d);for(let c=0,f=b.length;c<f;c+=1){const p=b[c];s[p]=d[p]}}return s}function l(s,d){let b="";for(let c=0;c<d;c+=1)b+=s;return b}function a(s){return s===0&&Number.NEGATIVE_INFINITY===1/s}n.exports.isNothing=t,n.exports.isObject=r,n.exports.toArray=u,n.exports.repeat=l,n.exports.isNegativeZero=a,n.exports.extend=i})),Bn=W(((e,n)=>{function t(u,i){let l="";const a=u.reason||"(unknown reason)";return u.mark?(u.mark.name&&(l+='in "'+u.mark.name+'" '),l+="("+(u.mark.line+1)+":"+(u.mark.column+1)+")",!i&&u.mark.snippet&&(l+=`

`+u.mark.snippet),a+" "+l):a}function r(u,i){Error.call(this),this.name="YAMLException",this.reason=u,this.mark=i,this.message=t(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r.prototype.toString=function(i){return this.name+": "+t(this,i)},n.exports=r})),Dc=W(((e,n)=>{var t=Pn();function r(l,a,s,d,b){let c="",f="";const p=Math.floor(b/2)-1;return d-a>p&&(c=" ... ",a=d-p+c.length),s-d>p&&(f=" ...",s=d+p-f.length),{str:c+l.slice(a,s).replace(/\t/g,"→")+f,pos:d-a+c.length}}function u(l,a){return t.repeat(" ",a-l.length)+l}function i(l,a){if(a=Object.create(a||null),!l.buffer)return null;a.maxLength||(a.maxLength=79),typeof a.indent!="number"&&(a.indent=1),typeof a.linesBefore!="number"&&(a.linesBefore=3),typeof a.linesAfter!="number"&&(a.linesAfter=2);const s=/\r?\n|\r|\0/g,d=[0],b=[];let c,f=-1;for(;c=s.exec(l.buffer);)b.push(c.index),d.push(c.index+c[0].length),l.position<=c.index&&f<0&&(f=d.length-2);f<0&&(f=d.length-1);let p="";const m=Math.min(l.line+a.linesAfter,b.length).toString().length,g=a.maxLength-(a.indent+m+3);for(let y=1;y<=a.linesBefore&&!(f-y<0);y++){const v=r(l.buffer,d[f-y],b[f-y],l.position-(d[f]-d[f-y]),g);p=t.repeat(" ",a.indent)+u((l.line-y+1).toString(),m)+" | "+v.str+`
`+p}const k=r(l.buffer,d[f],b[f],l.position,g);p+=t.repeat(" ",a.indent)+u((l.line+1).toString(),m)+" | "+k.str+`
`,p+=t.repeat("-",a.indent+m+3+k.pos)+`^
`;for(let y=1;y<=a.linesAfter&&!(f+y>=b.length);y++){const v=r(l.buffer,d[f+y],b[f+y],l.position-(d[f]-d[f+y]),g);p+=t.repeat(" ",a.indent)+u((l.line+y+1).toString(),m)+" | "+v.str+`
`}return p.replace(/\n$/,"")}n.exports=i})),ue=W(((e,n)=>{var t=Bn(),r=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],u=["scalar","sequence","mapping"];function i(a){const s={};return a!==null&&Object.keys(a).forEach(function(d){a[d].forEach(function(b){s[String(b)]=d})}),s}function l(a,s){if(s=s||{},Object.keys(s).forEach(function(d){if(r.indexOf(d)===-1)throw new t('Unknown option "'+d+'" is met in definition of "'+a+'" YAML type.')}),this.options=s,this.tag=a,this.kind=s.kind||null,this.resolve=s.resolve||function(){return!0},this.construct=s.construct||function(d){return d},this.instanceOf=s.instanceOf||null,this.predicate=s.predicate||null,this.represent=s.represent||null,this.representName=s.representName||null,this.defaultStyle=s.defaultStyle||null,this.multi=s.multi||!1,this.styleAliases=i(s.styleAliases||null),u.indexOf(this.kind)===-1)throw new t('Unknown kind "'+this.kind+'" is specified for "'+a+'" YAML type.')}n.exports=l})),ro=W(((e,n)=>{var t=Bn(),r=ue();function u(a,s){const d=[];return a[s].forEach(function(b){let c=d.length;d.forEach(function(f,p){f.tag===b.tag&&f.kind===b.kind&&f.multi===b.multi&&(c=p)}),d[c]=b}),d}function i(){const a={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function s(d){d.multi?(a.multi[d.kind].push(d),a.multi.fallback.push(d)):a[d.kind][d.tag]=a.fallback[d.tag]=d}for(let d=0,b=arguments.length;d<b;d+=1)arguments[d].forEach(s);return a}function l(a){return this.extend(a)}l.prototype.extend=function(s){let d=[],b=[];if(s instanceof r)b.push(s);else if(Array.isArray(s))b=b.concat(s);else if(s&&(Array.isArray(s.implicit)||Array.isArray(s.explicit)))s.implicit&&(d=d.concat(s.implicit)),s.explicit&&(b=b.concat(s.explicit));else throw new t("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");d.forEach(function(f){if(!(f instanceof r))throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(f.loadKind&&f.loadKind!=="scalar")throw new t("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(f.multi)throw new t("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),b.forEach(function(f){if(!(f instanceof r))throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const c=Object.create(l.prototype);return c.implicit=(this.implicit||[]).concat(d),c.explicit=(this.explicit||[]).concat(b),c.compiledImplicit=u(c,"implicit"),c.compiledExplicit=u(c,"explicit"),c.compiledTypeMap=i(c.compiledImplicit,c.compiledExplicit),c},n.exports=l})),uo=W(((e,n)=>{n.exports=new(ue())("tag:yaml.org,2002:str",{kind:"scalar",construct:function(t){return t!==null?t:""}})})),oo=W(((e,n)=>{n.exports=new(ue())("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(t){return t!==null?t:[]}})})),io=W(((e,n)=>{n.exports=new(ue())("tag:yaml.org,2002:map",{kind:"mapping",construct:function(t){return t!==null?t:{}}})})),ao=W(((e,n)=>{n.exports=new(ro())({explicit:[uo(),oo(),io()]})})),lo=W(((e,n)=>{var t=ue();function r(l){if(l===null)return!0;const a=l.length;return a===1&&l==="~"||a===4&&(l==="null"||l==="Null"||l==="NULL")}function u(){return null}function i(l){return l===null}n.exports=new t("tag:yaml.org,2002:null",{kind:"scalar",resolve:r,construct:u,predicate:i,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"})})),co=W(((e,n)=>{var t=ue();function r(l){if(l===null)return!1;const a=l.length;return a===4&&(l==="true"||l==="True"||l==="TRUE")||a===5&&(l==="false"||l==="False"||l==="FALSE")}function u(l){return l==="true"||l==="True"||l==="TRUE"}function i(l){return Object.prototype.toString.call(l)==="[object Boolean]"}n.exports=new t("tag:yaml.org,2002:bool",{kind:"scalar",resolve:r,construct:u,predicate:i,represent:{lowercase:function(l){return l?"true":"false"},uppercase:function(l){return l?"TRUE":"FALSE"},camelcase:function(l){return l?"True":"False"}},defaultStyle:"lowercase"})})),so=W(((e,n)=>{var t=Pn(),r=ue();function u(c){return c>=48&&c<=57||c>=65&&c<=70||c>=97&&c<=102}function i(c){return c>=48&&c<=55}function l(c){return c>=48&&c<=57}function a(c){if(c===null)return!1;const f=c.length;let p=0,m=!1;if(!f)return!1;let g=c[p];if((g==="-"||g==="+")&&(g=c[++p]),g==="0"){if(p+1===f)return!0;if(g=c[++p],g==="b"){for(p++;p<f;p++){if(g=c[p],g!=="0"&&g!=="1")return!1;m=!0}return m&&Number.isFinite(s(c))}if(g==="x"){for(p++;p<f;p++){if(!u(c.charCodeAt(p)))return!1;m=!0}return m&&Number.isFinite(s(c))}if(g==="o"){for(p++;p<f;p++){if(!i(c.charCodeAt(p)))return!1;m=!0}return m&&Number.isFinite(s(c))}}for(;p<f;p++){if(!l(c.charCodeAt(p)))return!1;m=!0}return m?Number.isFinite(s(c)):!1}function s(c){let f=c,p=1,m=f[0];if((m==="-"||m==="+")&&(m==="-"&&(p=-1),f=f.slice(1),m=f[0]),f==="0")return 0;if(m==="0"){if(f[1]==="b")return p*parseInt(f.slice(2),2);if(f[1]==="x")return p*parseInt(f.slice(2),16);if(f[1]==="o")return p*parseInt(f.slice(2),8)}return p*parseInt(f,10)}function d(c){return s(c)}function b(c){return Object.prototype.toString.call(c)==="[object Number]"&&c%1===0&&!t.isNegativeZero(c)}n.exports=new r("tag:yaml.org,2002:int",{kind:"scalar",resolve:a,construct:d,predicate:b,represent:{binary:function(c){return c>=0?"0b"+c.toString(2):"-0b"+c.toString(2).slice(1)},octal:function(c){return c>=0?"0o"+c.toString(8):"-0o"+c.toString(8).slice(1)},decimal:function(c){return c.toString(10)},hexadecimal:function(c){return c>=0?"0x"+c.toString(16).toUpperCase():"-0x"+c.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}})})),fo=W(((e,n)=>{var t=Pn(),r=ue(),u=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),i=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function l(c){return c===null||!u.test(c)?!1:Number.isFinite(parseFloat(c,10))?!0:i.test(c)}function a(c){let f=c.toLowerCase();const p=f[0]==="-"?-1:1;return"+-".indexOf(f[0])>=0&&(f=f.slice(1)),f===".inf"?p===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:f===".nan"?NaN:p*parseFloat(f,10)}var s=/^[-+]?[0-9]+e/;function d(c,f){if(isNaN(c))switch(f){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===c)switch(f){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===c)switch(f){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(t.isNegativeZero(c))return"-0.0";const p=c.toString(10);return s.test(p)?p.replace("e",".e"):p}function b(c){return Object.prototype.toString.call(c)==="[object Number]"&&(c%1!==0||t.isNegativeZero(c))}n.exports=new r("tag:yaml.org,2002:float",{kind:"scalar",resolve:l,construct:a,predicate:b,represent:d,defaultStyle:"lowercase"})})),po=W(((e,n)=>{n.exports=ao().extend({implicit:[lo(),co(),so(),fo()]})})),ho=W(((e,n)=>{n.exports=po()})),bo=W(((e,n)=>{var t=ue(),r=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),u=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function i(s){return s===null?!1:r.exec(s)!==null||u.exec(s)!==null}function l(s){let d=0,b=null,c=r.exec(s);if(c===null&&(c=u.exec(s)),c===null)throw new Error("Date resolve error");const f=+c[1],p=+c[2]-1,m=+c[3];if(!c[4])return new Date(Date.UTC(f,p,m));const g=+c[4],k=+c[5],y=+c[6];if(c[7]){for(d=c[7].slice(0,3);d.length<3;)d+="0";d=+d}if(c[9]){const E=+c[10],A=+(c[11]||0);b=(E*60+A)*6e4,c[9]==="-"&&(b=-b)}const v=new Date(Date.UTC(f,p,m,g,k,y,d));return b&&v.setTime(v.getTime()-b),v}function a(s){return s.toISOString()}n.exports=new t("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:i,construct:l,instanceOf:Date,represent:a})})),mo=W(((e,n)=>{var t=ue();function r(u){return u==="<<"||u===null}n.exports=new t("tag:yaml.org,2002:merge",{kind:"scalar",resolve:r})})),go=W(((e,n)=>{var t=ue(),r=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function u(s){if(s===null)return!1;let d=0;const b=s.length,c=r;for(let f=0;f<b;f++){const p=c.indexOf(s.charAt(f));if(!(p>64)){if(p<0)return!1;d+=6}}return d%8===0}function i(s){const d=s.replace(/[\r\n=]/g,""),b=d.length,c=r;let f=0;const p=[];for(let g=0;g<b;g++)g%4===0&&g&&(p.push(f>>16&255),p.push(f>>8&255),p.push(f&255)),f=f<<6|c.indexOf(d.charAt(g));const m=b%4*6;return m===0?(p.push(f>>16&255),p.push(f>>8&255),p.push(f&255)):m===18?(p.push(f>>10&255),p.push(f>>2&255)):m===12&&p.push(f>>4&255),new Uint8Array(p)}function l(s){let d="",b=0;const c=s.length,f=r;for(let m=0;m<c;m++)m%3===0&&m&&(d+=f[b>>18&63],d+=f[b>>12&63],d+=f[b>>6&63],d+=f[b&63]),b=(b<<8)+s[m];const p=c%3;return p===0?(d+=f[b>>18&63],d+=f[b>>12&63],d+=f[b>>6&63],d+=f[b&63]):p===2?(d+=f[b>>10&63],d+=f[b>>4&63],d+=f[b<<2&63],d+=f[64]):p===1&&(d+=f[b>>2&63],d+=f[b<<4&63],d+=f[64],d+=f[64]),d}function a(s){return Object.prototype.toString.call(s)==="[object Uint8Array]"}n.exports=new t("tag:yaml.org,2002:binary",{kind:"scalar",resolve:u,construct:i,predicate:a,represent:l})})),ko=W(((e,n)=>{var t=ue(),r=Object.prototype.hasOwnProperty,u=Object.prototype.toString;function i(a){if(a===null)return!0;const s=[],d=a;for(let b=0,c=d.length;b<c;b+=1){const f=d[b];let p=!1;if(u.call(f)!=="[object Object]")return!1;let m;for(m in f)if(r.call(f,m))if(!p)p=!0;else return!1;if(!p)return!1;if(s.indexOf(m)===-1)s.push(m);else return!1}return!0}function l(a){return a!==null?a:[]}n.exports=new t("tag:yaml.org,2002:omap",{kind:"sequence",resolve:i,construct:l})})),yo=W(((e,n)=>{var t=ue(),r=Object.prototype.toString;function u(l){if(l===null)return!0;const a=l,s=new Array(a.length);for(let d=0,b=a.length;d<b;d+=1){const c=a[d];if(r.call(c)!=="[object Object]")return!1;const f=Object.keys(c);if(f.length!==1)return!1;s[d]=[f[0],c[f[0]]]}return!0}function i(l){if(l===null)return[];const a=l,s=new Array(a.length);for(let d=0,b=a.length;d<b;d+=1){const c=a[d],f=Object.keys(c);s[d]=[f[0],c[f[0]]]}return s}n.exports=new t("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:u,construct:i})})),xo=W(((e,n)=>{var t=ue(),r=Object.prototype.hasOwnProperty;function u(l){if(l===null)return!0;const a=l;for(const s in a)if(r.call(a,s)&&a[s]!==null)return!1;return!0}function i(l){return l!==null?l:{}}n.exports=new t("tag:yaml.org,2002:set",{kind:"mapping",resolve:u,construct:i})})),yr=W(((e,n)=>{n.exports=ho().extend({implicit:[bo(),mo()],explicit:[go(),ko(),yo(),xo()]})})),Tc=W(((e,n)=>{var t=Pn(),r=Bn(),u=Dc(),i=yr(),l=Object.prototype.hasOwnProperty,a=1,s=2,d=3,b=4,c=1,f=2,p=3,m=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,g=/[\x85\u2028\u2029]/,k=/[,\[\]{}]/,y=/^(?:!|!!|![0-9A-Za-z-]+!)$/,v=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function E(o){return Object.prototype.toString.call(o)}function A(o){return o===10||o===13}function R(o){return o===9||o===32}function N(o){return o===9||o===32||o===10||o===13}function j(o){return o===44||o===91||o===93||o===123||o===125}function U(o){if(o>=48&&o<=57)return o-48;const x=o|32;return x>=97&&x<=102?x-97+10:-1}function Q(o){return o===120?2:o===117?4:o===85?8:0}function ce(o){return o>=48&&o<=57?o-48:-1}function ve(o){switch(o){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function hn(o){return o<=65535?String.fromCharCode(o):String.fromCharCode((o-65536>>10)+55296,(o-65536&1023)+56320)}function Pe(o,x,_){x==="__proto__"?Object.defineProperty(o,x,{configurable:!0,enumerable:!0,writable:!0,value:_}):o[x]=_}var Be=new Array(256),se=new Array(256);for(let o=0;o<256;o++)Be[o]=ve(o)?1:0,se[o]=ve(o);function X(o,x){this.input=o,this.filename=x.filename||null,this.schema=x.schema||i,this.onWarning=x.onWarning||null,this.legacy=x.legacy||!1,this.json=x.json||!1,this.listener=x.listener||null,this.maxDepth=typeof x.maxDepth=="number"?x.maxDepth:100,this.maxMergeSeqLength=typeof x.maxMergeSeqLength=="number"?x.maxMergeSeqLength:20,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=o.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function Hn(o,x){const _={name:o.filename,buffer:o.input.slice(0,-1),position:o.position,line:o.line,column:o.position-o.lineStart};return _.snippet=u(_),new r(x,_)}function B(o,x){throw Hn(o,x)}function Ze(o,x){o.onWarning&&o.onWarning.call(null,Hn(o,x))}function Ce(o,x,_){const T=o.anchorMapTransactions;if(T.length!==0){const C=T[T.length-1];l.call(C,x)||(C[x]={existed:l.call(o.anchorMap,x),value:o.anchorMap[x]})}o.anchorMap[x]=_}function Et(o){o.anchorMapTransactions.push(Object.create(null))}function ze(o){const x=o.anchorMapTransactions.pop(),_=o.anchorMapTransactions;if(_.length===0)return;const T=_[_.length-1],C=Object.keys(x);for(let L=0,h=C.length;L<h;L+=1){const w=C[L];l.call(T,w)||(T[w]=x[w])}}function At(o){const x=o.anchorMapTransactions.pop(),_=Object.keys(x);for(let T=_.length-1;T>=0;T-=1){const C=x[_[T]];C.existed?o.anchorMap[_[T]]=C.value:delete o.anchorMap[_[T]]}}function bn(o){return{position:o.position,line:o.line,lineStart:o.lineStart,lineIndent:o.lineIndent,firstTabInLine:o.firstTabInLine,tag:o.tag,anchor:o.anchor,kind:o.kind,result:o.result}}function Ye(o,x){o.position=x.position,o.line=x.line,o.lineStart=x.lineStart,o.lineIndent=x.lineIndent,o.firstTabInLine=x.firstTabInLine,o.tag=x.tag,o.anchor=x.anchor,o.kind=x.kind,o.result=x.result}var jn={YAML:function(x,_,T){x.version!==null&&B(x,"duplication of %YAML directive"),T.length!==1&&B(x,"YAML directive accepts exactly one argument");const C=/^([0-9]+)\.([0-9]+)$/.exec(T[0]);C===null&&B(x,"ill-formed argument of the YAML directive");const L=parseInt(C[1],10),h=parseInt(C[2],10);L!==1&&B(x,"unacceptable YAML version of the document"),x.version=T[0],x.checkLineBreaks=h<2,h!==1&&h!==2&&Ze(x,"unsupported YAML version of the document")},TAG:function(x,_,T){let C;T.length!==2&&B(x,"TAG directive accepts exactly two arguments");const L=T[0];C=T[1],y.test(L)||B(x,"ill-formed tag handle (first argument) of the TAG directive"),l.call(x.tagMap,L)&&B(x,'there is a previously declared suffix for "'+L+'" tag handle'),v.test(C)||B(x,"ill-formed tag prefix (second argument) of the TAG directive");try{C=decodeURIComponent(C)}catch{B(x,"tag prefix is malformed: "+C)}x.tagMap[L]=C}};function ie(o,x,_,T){if(x<_){const C=o.input.slice(x,_);if(T)for(let L=0,h=C.length;L<h;L+=1){const w=C.charCodeAt(L);w===9||w>=32&&w<=1114111||B(o,"expected valid JSON character")}else m.test(C)&&B(o,"the stream contains non-printable characters");o.result+=C}}function Me(o,x,_,T){t.isObject(_)||B(o,"cannot merge mappings; the provided source object is unacceptable");const C=Object.keys(_);for(let L=0,h=C.length;L<h;L+=1){const w=C[L];l.call(x,w)||(Pe(x,w,_[w]),T[w]=!0)}}function _e(o,x,_,T,C,L,h,w,I){if(Array.isArray(C)){C=Array.prototype.slice.call(C);for(let S=0,D=C.length;S<D;S+=1)Array.isArray(C[S])&&B(o,"nested arrays are not supported inside keys"),typeof C=="object"&&E(C[S])==="[object Object]"&&(C[S]="[object Object]")}if(typeof C=="object"&&E(C)==="[object Object]"&&(C="[object Object]"),C=String(C),x===null&&(x={}),T==="tag:yaml.org,2002:merge")if(Array.isArray(L)){L.length>o.maxMergeSeqLength&&B(o,"merge sequence length exceeded maxMergeSeqLength ("+o.maxMergeSeqLength+")");const S=new Set;for(let D=0,M=L.length;D<M;D+=1){const F=L[D];S.has(F)||(S.add(F),Me(o,x,F,_))}}else Me(o,x,L,_);else!o.json&&!l.call(_,C)&&l.call(x,C)&&(o.line=h||o.line,o.lineStart=w||o.lineStart,o.position=I||o.position,B(o,"duplicated mapping key")),Pe(x,C,L),delete _[C];return x}function Ke(o){const x=o.input.charCodeAt(o.position);x===10?o.position++:x===13?(o.position++,o.input.charCodeAt(o.position)===10&&o.position++):B(o,"a line break is expected"),o.line+=1,o.lineStart=o.position,o.firstTabInLine=-1}function K(o,x,_){let T=0,C=o.input.charCodeAt(o.position);for(;C!==0;){for(;R(C);)C===9&&o.firstTabInLine===-1&&(o.firstTabInLine=o.position),C=o.input.charCodeAt(++o.position);if(x&&C===35)do C=o.input.charCodeAt(++o.position);while(C!==10&&C!==13&&C!==0);if(A(C))for(Ke(o),C=o.input.charCodeAt(o.position),T++,o.lineIndent=0;C===32;)o.lineIndent++,C=o.input.charCodeAt(++o.position);else break}return _!==-1&&T!==0&&o.lineIndent<_&&Ze(o,"deficient indentation"),T}function Je(o){let x=o.position,_=o.input.charCodeAt(x);return!!((_===45||_===46)&&_===o.input.charCodeAt(x+1)&&_===o.input.charCodeAt(x+2)&&(x+=3,_=o.input.charCodeAt(x),_===0||N(_)))}function Ee(o,x){x===1?o.result+=" ":x>1&&(o.result+=t.repeat(`
`,x-1))}function $n(o,x,_){let T,C,L,h,w,I;const S=o.kind,D=o.result;let M=o.input.charCodeAt(o.position);if(N(M)||j(M)||M===35||M===38||M===42||M===33||M===124||M===62||M===39||M===34||M===37||M===64||M===96)return!1;if(M===63||M===45){const F=o.input.charCodeAt(o.position+1);if(N(F)||_&&j(F))return!1}for(o.kind="scalar",o.result="",T=C=o.position,L=!1;M!==0;){if(M===58){const F=o.input.charCodeAt(o.position+1);if(N(F)||_&&j(F))break}else if(M===35){if(N(o.input.charCodeAt(o.position-1)))break}else{if(o.position===o.lineStart&&Je(o)||_&&j(M))break;if(A(M))if(h=o.line,w=o.lineStart,I=o.lineIndent,K(o,!1,-1),o.lineIndent>=x){L=!0,M=o.input.charCodeAt(o.position);continue}else{o.position=C,o.line=h,o.lineStart=w,o.lineIndent=I;break}}L&&(ie(o,T,C,!1),Ee(o,o.line-h),T=C=o.position,L=!1),R(M)||(C=o.position+1),M=o.input.charCodeAt(++o.position)}return ie(o,T,C,!1),o.result?!0:(o.kind=S,o.result=D,!1)}function Un(o,x){let _,T,C=o.input.charCodeAt(o.position);if(C!==39)return!1;for(o.kind="scalar",o.result="",o.position++,_=T=o.position;(C=o.input.charCodeAt(o.position))!==0;)if(C===39)if(ie(o,_,o.position,!0),C=o.input.charCodeAt(++o.position),C===39)_=o.position,o.position++,T=o.position;else return!0;else A(C)?(ie(o,_,T,!0),Ee(o,K(o,!1,x)),_=T=o.position):o.position===o.lineStart&&Je(o)?B(o,"unexpected end of the document within a single quoted scalar"):(o.position++,R(C)||(T=o.position));B(o,"unexpected end of the stream within a single quoted scalar")}function mn(o,x){let _,T,C,L=o.input.charCodeAt(o.position);if(L!==34)return!1;for(o.kind="scalar",o.result="",o.position++,_=T=o.position;(L=o.input.charCodeAt(o.position))!==0;){if(L===34)return ie(o,_,o.position,!0),o.position++,!0;if(L===92){if(ie(o,_,o.position,!0),L=o.input.charCodeAt(++o.position),A(L))K(o,!1,x);else if(L<256&&Be[L])o.result+=se[L],o.position++;else if((C=Q(L))>0){let h=C,w=0;for(;h>0;h--)L=o.input.charCodeAt(++o.position),(C=U(L))>=0?w=(w<<4)+C:B(o,"expected hexadecimal character");o.result+=hn(w),o.position++}else B(o,"unknown escape sequence");_=T=o.position}else A(L)?(ie(o,_,T,!0),Ee(o,K(o,!1,x)),_=T=o.position):o.position===o.lineStart&&Je(o)?B(o,"unexpected end of the document within a double quoted scalar"):(o.position++,R(L)||(T=o.position))}B(o,"unexpected end of the stream within a double quoted scalar")}function Gn(o,x){let _=!0,T,C,L;const h=o.tag;let w;const I=o.anchor;let S,D,M,F;const P=Object.create(null);let O,z,H,$=o.input.charCodeAt(o.position);if($===91)S=93,F=!1,w=[];else if($===123)S=125,F=!0,w={};else return!1;for(o.anchor!==null&&Ce(o,o.anchor,w),$=o.input.charCodeAt(++o.position);$!==0;){if(K(o,!0,x),$=o.input.charCodeAt(o.position),$===S)return o.position++,o.tag=h,o.anchor=I,o.kind=F?"mapping":"sequence",o.result=w,!0;_?$===44&&B(o,"expected the node content, but found ','"):B(o,"missed comma between flow collection entries"),z=O=H=null,D=M=!1,$===63&&N(o.input.charCodeAt(o.position+1))&&(D=M=!0,o.position++,K(o,!0,x)),T=o.line,C=o.lineStart,L=o.position,Se(o,x,a,!1,!0),z=o.tag,O=o.result,K(o,!0,x),$=o.input.charCodeAt(o.position),(M||o.line===T)&&$===58&&(D=!0,$=o.input.charCodeAt(++o.position),K(o,!0,x),Se(o,x,a,!1,!0),H=o.result),F?_e(o,w,P,z,O,H,T,C,L):D?w.push(_e(o,null,P,z,O,H,T,C,L)):w.push(O),K(o,!0,x),$=o.input.charCodeAt(o.position),$===44?(_=!0,$=o.input.charCodeAt(++o.position)):_=!1}B(o,"unexpected end of the stream within a flow collection")}function Vn(o,x){let _,T=c,C=!1,L=!1,h=x,w=0,I=!1,S,D=o.input.charCodeAt(o.position);if(D===124)_=!1;else if(D===62)_=!0;else return!1;for(o.kind="scalar",o.result="";D!==0;)if(D=o.input.charCodeAt(++o.position),D===43||D===45)c===T?T=D===43?p:f:B(o,"repeat of a chomping mode identifier");else if((S=ce(D))>=0)S===0?B(o,"bad explicit indentation width of a block scalar; it cannot be less than one"):L?B(o,"repeat of an indentation width identifier"):(h=x+S-1,L=!0);else break;if(R(D)){do D=o.input.charCodeAt(++o.position);while(R(D));if(D===35)do D=o.input.charCodeAt(++o.position);while(!A(D)&&D!==0)}for(;D!==0;){for(Ke(o),o.lineIndent=0,D=o.input.charCodeAt(o.position);(!L||o.lineIndent<h)&&D===32;)o.lineIndent++,D=o.input.charCodeAt(++o.position);if(!L&&o.lineIndent>h&&(h=o.lineIndent),A(D)){w++;continue}if(!L&&h===0&&B(o,"missing indentation for block scalar"),o.lineIndent<h){T===p?o.result+=t.repeat(`
`,C?1+w:w):T===c&&C&&(o.result+=`
`);break}_?R(D)?(I=!0,o.result+=t.repeat(`
`,C?1+w:w)):I?(I=!1,o.result+=t.repeat(`
`,w+1)):w===0?C&&(o.result+=" "):o.result+=t.repeat(`
`,w):o.result+=t.repeat(`
`,C?1+w:w),C=!0,L=!0,w=0;const M=o.position;for(;!A(D)&&D!==0;)D=o.input.charCodeAt(++o.position);ie(o,M,o.position,!1)}return!0}function Ae(o,x){const _=o.tag,T=o.anchor,C=[];let L=!1;if(o.firstTabInLine!==-1)return!1;o.anchor!==null&&Ce(o,o.anchor,C);let h=o.input.charCodeAt(o.position);for(;h!==0&&(o.firstTabInLine!==-1&&(o.position=o.firstTabInLine,B(o,"tab characters must not be used in indentation")),!(h!==45||!N(o.input.charCodeAt(o.position+1))));){if(L=!0,o.position++,K(o,!0,-1)&&o.lineIndent<=x){C.push(null),h=o.input.charCodeAt(o.position);continue}const w=o.line;if(Se(o,x,d,!1,!0),C.push(o.result),K(o,!0,-1),h=o.input.charCodeAt(o.position),(o.line===w||o.lineIndent>x)&&h!==0)B(o,"bad indentation of a sequence entry");else if(o.lineIndent<x)break}return L?(o.tag=_,o.anchor=T,o.kind="sequence",o.result=C,!0):!1}function Wn(o,x,_){let T,C,L,h;const w=o.tag,I=o.anchor,S={},D=Object.create(null);let M=null,F=null,P=null,O=!1,z=!1;if(o.firstTabInLine!==-1)return!1;o.anchor!==null&&Ce(o,o.anchor,S);let H=o.input.charCodeAt(o.position);for(;H!==0;){!O&&o.firstTabInLine!==-1&&(o.position=o.firstTabInLine,B(o,"tab characters must not be used in indentation"));const $=o.input.charCodeAt(o.position+1),Z=o.line;if((H===63||H===58)&&N($))H===63?(O&&(_e(o,S,D,M,F,null,C,L,h),M=F=P=null),z=!0,O=!0,T=!0):O?(O=!1,T=!0):B(o,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),o.position+=1,H=$;else{if(C=o.line,L=o.lineStart,h=o.position,!Se(o,_,s,!1,!0))break;if(o.line===Z){for(H=o.input.charCodeAt(o.position);R(H);)H=o.input.charCodeAt(++o.position);if(H===58)H=o.input.charCodeAt(++o.position),N(H)||B(o,"a whitespace character is expected after the key-value separator within a block mapping"),O&&(_e(o,S,D,M,F,null,C,L,h),M=F=P=null),z=!0,O=!1,T=!1,M=o.tag,F=o.result;else if(z)B(o,"can not read an implicit mapping pair; a colon is missed");else return o.tag=w,o.anchor=I,!0}else if(z)B(o,"can not read a block mapping entry; a multiline key may not be an implicit key");else return o.tag=w,o.anchor=I,!0}if((o.line===Z||o.lineIndent>x)&&(O&&(C=o.line,L=o.lineStart,h=o.position),Se(o,x,b,!0,T)&&(O?F=o.result:P=o.result),O||(_e(o,S,D,M,F,P,C,L,h),M=F=P=null),K(o,!0,-1),H=o.input.charCodeAt(o.position)),(o.line===Z||o.lineIndent>x)&&H!==0)B(o,"bad indentation of a mapping entry");else if(o.lineIndent<x)break}return O&&_e(o,S,D,M,F,null,C,L,h),z&&(o.tag=w,o.anchor=I,o.kind="mapping",o.result=S),z}function St(o){let x=!1,_=!1,T,C,L=o.input.charCodeAt(o.position);if(L!==33)return!1;o.tag!==null&&B(o,"duplication of a tag property"),L=o.input.charCodeAt(++o.position),L===60?(x=!0,L=o.input.charCodeAt(++o.position)):L===33?(_=!0,T="!!",L=o.input.charCodeAt(++o.position)):T="!";let h=o.position;if(x){do L=o.input.charCodeAt(++o.position);while(L!==0&&L!==62);o.position<o.length?(C=o.input.slice(h,o.position),L=o.input.charCodeAt(++o.position)):B(o,"unexpected end of the stream within a verbatim tag")}else{for(;L!==0&&!N(L);)L===33&&(_?B(o,"tag suffix cannot contain exclamation marks"):(T=o.input.slice(h-1,o.position+1),y.test(T)||B(o,"named tag handle cannot contain such characters"),_=!0,h=o.position+1)),L=o.input.charCodeAt(++o.position);C=o.input.slice(h,o.position),k.test(C)&&B(o,"tag suffix cannot contain flow indicator characters")}C&&!v.test(C)&&B(o,"tag name cannot contain such characters: "+C);try{C=decodeURIComponent(C)}catch{B(o,"tag name is malformed: "+C)}return x?o.tag=C:l.call(o.tagMap,T)?o.tag=o.tagMap[T]+C:T==="!"?o.tag="!"+C:T==="!!"?o.tag="tag:yaml.org,2002:"+C:B(o,'undeclared tag handle "'+T+'"'),!0}function Zn(o){let x=o.input.charCodeAt(o.position);if(x!==38)return!1;o.anchor!==null&&B(o,"duplication of an anchor property"),x=o.input.charCodeAt(++o.position);const _=o.position;for(;x!==0&&!N(x)&&!j(x);)x=o.input.charCodeAt(++o.position);return o.position===_&&B(o,"name of an anchor node must contain at least one character"),o.anchor=o.input.slice(_,o.position),!0}function Yn(o){let x=o.input.charCodeAt(o.position);if(x!==42)return!1;x=o.input.charCodeAt(++o.position);const _=o.position;for(;x!==0&&!N(x)&&!j(x);)x=o.input.charCodeAt(++o.position);o.position===_&&B(o,"name of an alias node must contain at least one character");const T=o.input.slice(_,o.position);return l.call(o.anchorMap,T)||B(o,'unidentified alias "'+T+'"'),o.result=o.anchorMap[T],K(o,!0,-1),!0}function Dt(o,x,_,T){const C=bn(o);return Et(o),Ye(o,x),o.tag=null,o.anchor=null,o.kind=null,o.result=null,Wn(o,_,T)&&o.kind==="mapping"?(ze(o),!0):(At(o),Ye(o,C),!1)}function Se(o,x,_,T,C){let L,h,w=1,I=!1,S=!1,D=null,M,F,P;o.depth>=o.maxDepth&&B(o,"nesting exceeded maxDepth ("+o.maxDepth+")"),o.depth+=1,o.listener!==null&&o.listener("open",o),o.tag=null,o.anchor=null,o.kind=null,o.result=null;const O=L=h=b===_||d===_;if(T&&K(o,!0,-1)&&(I=!0,o.lineIndent>x?w=1:o.lineIndent===x?w=0:o.lineIndent<x&&(w=-1)),w===1)for(;;){const z=o.input.charCodeAt(o.position),H=bn(o);if(I&&(z===33&&o.tag!==null||z===38&&o.anchor!==null)||!St(o)&&!Zn(o))break;D===null&&(D=H),K(o,!0,-1)?(I=!0,h=O,o.lineIndent>x?w=1:o.lineIndent===x?w=0:o.lineIndent<x&&(w=-1)):h=!1}if(h&&(h=I||C),w===1||b===_)if(a===_||s===_?F=x:F=x+1,P=o.position-o.lineStart,w===1)if(h&&(Ae(o,P)||Wn(o,P,F))||Gn(o,F))S=!0;else{const z=o.input.charCodeAt(o.position);D!==null&&O&&!h&&z!==124&&z!==62&&Dt(o,D,D.position-D.lineStart,F)||L&&Vn(o,F)||Un(o,F)||mn(o,F)?S=!0:Yn(o)?(S=!0,(o.tag!==null||o.anchor!==null)&&B(o,"alias node should not have any properties")):$n(o,F,a===_)&&(S=!0,o.tag===null&&(o.tag="?")),o.anchor!==null&&Ce(o,o.anchor,o.result)}else w===0&&(S=h&&Ae(o,P));if(o.tag===null)o.anchor!==null&&Ce(o,o.anchor,o.result);else if(o.tag==="?"){o.result!==null&&o.kind!=="scalar"&&B(o,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+o.kind+'"');for(let z=0,H=o.implicitTypes.length;z<H;z+=1)if(M=o.implicitTypes[z],M.resolve(o.result)){o.result=M.construct(o.result),o.tag=M.tag,o.anchor!==null&&Ce(o,o.anchor,o.result);break}}else if(o.tag!=="!"){if(l.call(o.typeMap[o.kind||"fallback"],o.tag))M=o.typeMap[o.kind||"fallback"][o.tag];else{M=null;const z=o.typeMap.multi[o.kind||"fallback"];for(let H=0,$=z.length;H<$;H+=1)if(o.tag.slice(0,z[H].tag.length)===z[H].tag){M=z[H];break}}M||B(o,"unknown tag !<"+o.tag+">"),o.result!==null&&M.kind!==o.kind&&B(o,"unacceptable node kind for !<"+o.tag+'> tag; it should be "'+M.kind+'", not "'+o.kind+'"'),M.resolve(o.result,o.tag)?(o.result=M.construct(o.result,o.tag),o.anchor!==null&&Ce(o,o.anchor,o.result)):B(o,"cannot resolve a node with !<"+o.tag+"> explicit tag")}return o.listener!==null&&o.listener("close",o),o.depth-=1,o.tag!==null||o.anchor!==null||S}function Tt(o){const x=o.position;let _=!1,T;for(o.version=null,o.checkLineBreaks=o.legacy,o.tagMap=Object.create(null),o.anchorMap=Object.create(null);(T=o.input.charCodeAt(o.position))!==0&&(K(o,!0,-1),T=o.input.charCodeAt(o.position),!(o.lineIndent>0||T!==37));){_=!0,T=o.input.charCodeAt(++o.position);let C=o.position;for(;T!==0&&!N(T);)T=o.input.charCodeAt(++o.position);const L=o.input.slice(C,o.position),h=[];for(L.length<1&&B(o,"directive name must not be less than one character in length");T!==0;){for(;R(T);)T=o.input.charCodeAt(++o.position);if(T===35){do T=o.input.charCodeAt(++o.position);while(T!==0&&!A(T));break}if(A(T))break;for(C=o.position;T!==0&&!N(T);)T=o.input.charCodeAt(++o.position);h.push(o.input.slice(C,o.position))}T!==0&&Ke(o),l.call(jn,L)?jn[L](o,L,h):Ze(o,'unknown document directive "'+L+'"')}if(K(o,!0,-1),o.lineIndent===0&&o.input.charCodeAt(o.position)===45&&o.input.charCodeAt(o.position+1)===45&&o.input.charCodeAt(o.position+2)===45?(o.position+=3,K(o,!0,-1)):_&&B(o,"directives end mark is expected"),Se(o,o.lineIndent-1,b,!1,!0),K(o,!0,-1),o.checkLineBreaks&&g.test(o.input.slice(x,o.position))&&Ze(o,"non-ASCII line breaks are interpreted as content"),o.documents.push(o.result),o.position===o.lineStart&&Je(o)){o.input.charCodeAt(o.position)===46&&(o.position+=3,K(o,!0,-1));return}o.position<o.length-1&&B(o,"end of the stream or a document separator is expected")}function Kn(o,x){o=String(o),x=x||{},o.length!==0&&(o.charCodeAt(o.length-1)!==10&&o.charCodeAt(o.length-1)!==13&&(o+=`
`),o.charCodeAt(0)===65279&&(o=o.slice(1)));const _=new X(o,x),T=o.indexOf("\0");for(T!==-1&&(_.position=T,B(_,"null byte is not allowed in input")),_.input+="\0";_.input.charCodeAt(_.position)===32;)_.lineIndent+=1,_.position+=1;for(;_.position<_.length-1;)Tt(_);return _.documents}function Jn(o,x,_){x!==null&&typeof x=="object"&&typeof _>"u"&&(_=x,x=null);const T=Kn(o,_);if(typeof x!="function")return T;for(let C=0,L=T.length;C<L;C+=1)x(T[C])}function Ft(o,x){const _=Kn(o,x);if(_.length!==0){if(_.length===1)return _[0];throw new r("expected a single document in the stream, but found more")}}n.exports.loadAll=Jn,n.exports.load=Ft})),Fc=W(((e,n)=>{var t=Pn(),r=Bn(),u=yr(),i=Object.prototype.toString,l=Object.prototype.hasOwnProperty,a=65279,s=9,d=10,b=13,c=32,f=33,p=34,m=35,g=37,k=38,y=39,v=42,E=44,A=45,R=58,N=61,j=62,U=63,Q=64,ce=91,ve=93,hn=96,Pe=123,Be=124,se=125,X={};X[0]="\\0",X[7]="\\a",X[8]="\\b",X[9]="\\t",X[10]="\\n",X[11]="\\v",X[12]="\\f",X[13]="\\r",X[27]="\\e",X[34]='\\"',X[92]="\\\\",X[133]="\\N",X[160]="\\_",X[8232]="\\L",X[8233]="\\P";var Hn=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],B=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function Ze(h,w){if(w===null)return{};const I={},S=Object.keys(w);for(let D=0,M=S.length;D<M;D+=1){let F=S[D],P=String(w[F]);F.slice(0,2)==="!!"&&(F="tag:yaml.org,2002:"+F.slice(2));const O=h.compiledTypeMap.fallback[F];O&&l.call(O.styleAliases,P)&&(P=O.styleAliases[P]),I[F]=P}return I}function Ce(h){let w,I;const S=h.toString(16).toUpperCase();if(h<=255)w="x",I=2;else if(h<=65535)w="u",I=4;else if(h<=4294967295)w="U",I=8;else throw new r("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+w+t.repeat("0",I-S.length)+S}var Et=1,ze=2;function At(h){this.schema=h.schema||u,this.indent=Math.max(1,h.indent||2),this.noArrayIndent=h.noArrayIndent||!1,this.skipInvalid=h.skipInvalid||!1,this.flowLevel=t.isNothing(h.flowLevel)?-1:h.flowLevel,this.styleMap=Ze(this.schema,h.styles||null),this.sortKeys=h.sortKeys||!1,this.lineWidth=h.lineWidth||80,this.noRefs=h.noRefs||!1,this.noCompatMode=h.noCompatMode||!1,this.condenseFlow=h.condenseFlow||!1,this.quotingType=h.quotingType==='"'?ze:Et,this.forceQuotes=h.forceQuotes||!1,this.replacer=typeof h.replacer=="function"?h.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function bn(h,w){const I=t.repeat(" ",w);let S=0,D="";const M=h.length;for(;S<M;){let F;const P=h.indexOf(`
`,S);P===-1?(F=h.slice(S),S=M):(F=h.slice(S,P+1),S=P+1),F.length&&F!==`
`&&(D+=I),D+=F}return D}function Ye(h,w){return`
`+t.repeat(" ",h.indent*w)}function jn(h,w){for(let I=0,S=h.implicitTypes.length;I<S;I+=1)if(h.implicitTypes[I].resolve(w))return!0;return!1}function ie(h){return h===c||h===s}function Me(h){return h>=32&&h<=126||h>=161&&h<=55295&&h!==8232&&h!==8233||h>=57344&&h<=65533&&h!==a||h>=65536&&h<=1114111}function _e(h){return Me(h)&&h!==a&&h!==b&&h!==d}function Ke(h,w,I){const S=_e(h),D=S&&!ie(h);return(I?S:S&&h!==E&&h!==ce&&h!==ve&&h!==Pe&&h!==se)&&h!==m&&!(w===R&&!D)||_e(w)&&!ie(w)&&h===m||w===R&&D}function K(h){return Me(h)&&h!==a&&!ie(h)&&h!==A&&h!==U&&h!==R&&h!==E&&h!==ce&&h!==ve&&h!==Pe&&h!==se&&h!==m&&h!==k&&h!==v&&h!==f&&h!==Be&&h!==N&&h!==j&&h!==y&&h!==p&&h!==g&&h!==Q&&h!==hn}function Je(h){return!ie(h)&&h!==R}function Ee(h,w){const I=h.charCodeAt(w);let S;return I>=55296&&I<=56319&&w+1<h.length&&(S=h.charCodeAt(w+1),S>=56320&&S<=57343)?(I-55296)*1024+S-56320+65536:I}function $n(h){return/^\n* /.test(h)}var Un=1,mn=2,Gn=3,Vn=4,Ae=5;function Wn(h,w,I,S,D,M,F,P){let O,z=0,H=null,$=!1,Z=!1;const Or=S!==-1;let gn=-1,kn=K(Ee(h,0))&&Je(Ee(h,h.length-1));if(w||F)for(O=0;O<h.length;z>=65536?O+=2:O++){if(z=Ee(h,O),!Me(z))return Ae;kn=kn&&Ke(z,H,P),H=z}else{for(O=0;O<h.length;z>=65536?O+=2:O++){if(z=Ee(h,O),z===d)$=!0,Or&&(Z=Z||O-gn-1>S&&h[gn+1]!==" ",gn=O);else if(!Me(z))return Ae;kn=kn&&Ke(z,H,P),H=z}Z=Z||Or&&O-gn-1>S&&h[gn+1]!==" "}return!$&&!Z?kn&&!F&&!D(h)?Un:M===ze?Ae:mn:I>9&&$n(h)?Ae:F?M===ze?Ae:mn:Z?Vn:Gn}function St(h,w,I,S,D){h.dump=(function(){if(w.length===0)return h.quotingType===ze?'""':"''";if(!h.noCompatMode&&(Hn.indexOf(w)!==-1||B.test(w)))return h.quotingType===ze?'"'+w+'"':"'"+w+"'";const M=h.indent*Math.max(1,I),F=h.lineWidth===-1?-1:Math.max(Math.min(h.lineWidth,40),h.lineWidth-M),P=S||h.flowLevel>-1&&I>=h.flowLevel;function O(z){return jn(h,z)}switch(Wn(w,P,h.indent,F,O,h.quotingType,h.forceQuotes&&!S,D)){case Un:return w;case mn:return"'"+w.replace(/'/g,"''")+"'";case Gn:return"|"+Zn(w,h.indent)+Yn(bn(w,M));case Vn:return">"+Zn(w,h.indent)+Yn(bn(Dt(w,F),M));case Ae:return'"'+Tt(w)+'"';default:throw new r("impossible error: invalid scalar style")}})()}function Zn(h,w){const I=$n(h)?String(w):"",S=h[h.length-1]===`
`;return I+(S&&(h[h.length-2]===`
`||h===`
`)?"+":S?"":"-")+`
`}function Yn(h){return h[h.length-1]===`
`?h.slice(0,-1):h}function Dt(h,w){const I=/(\n+)([^\n]*)/g;let S=(function(){let P=h.indexOf(`
`);return P=P!==-1?P:h.length,I.lastIndex=P,Se(h.slice(0,P),w)})(),D=h[0]===`
`||h[0]===" ",M,F;for(;F=I.exec(h);){const P=F[1],O=F[2];M=O[0]===" ",S+=P+(!D&&!M&&O!==""?`
`:"")+Se(O,w),D=M}return S}function Se(h,w){if(h===""||h[0]===" ")return h;const I=/ [^ ]/g;let S,D=0,M,F=0,P=0,O="";for(;S=I.exec(h);)P=S.index,P-D>w&&(M=F>D?F:P,O+=`
`+h.slice(D,M),D=M+1),F=P;return O+=`
`,h.length-D>w&&F>D?O+=h.slice(D,F)+`
`+h.slice(F+1):O+=h.slice(D),O.slice(1)}function Tt(h){let w="",I=0;for(let S=0;S<h.length;I>=65536?S+=2:S++){I=Ee(h,S);const D=X[I];!D&&Me(I)?(w+=h[S],I>=65536&&(w+=h[S+1])):w+=D||Ce(I)}return w}function Kn(h,w,I){let S="";const D=h.tag;for(let M=0,F=I.length;M<F;M+=1){let P=I[M];h.replacer&&(P=h.replacer.call(I,String(M),P)),(_(h,w,P,!1,!1)||typeof P>"u"&&_(h,w,null,!1,!1))&&(S!==""&&(S+=","+(h.condenseFlow?"":" ")),S+=h.dump)}h.tag=D,h.dump="["+S+"]"}function Jn(h,w,I,S){let D="";const M=h.tag;for(let F=0,P=I.length;F<P;F+=1){let O=I[F];h.replacer&&(O=h.replacer.call(I,String(F),O)),(_(h,w+1,O,!0,!0,!1,!0)||typeof O>"u"&&_(h,w+1,null,!0,!0,!1,!0))&&((!S||D!=="")&&(D+=Ye(h,w)),h.dump&&d===h.dump.charCodeAt(0)?D+="-":D+="- ",D+=h.dump)}h.tag=M,h.dump=D||"[]"}function Ft(h,w,I){let S="";const D=h.tag,M=Object.keys(I);for(let F=0,P=M.length;F<P;F+=1){let O="";S!==""&&(O+=", "),h.condenseFlow&&(O+='"');const z=M[F];let H=I[z];h.replacer&&(H=h.replacer.call(I,z,H)),_(h,w,z,!1,!1)&&(h.dump.length>1024&&(O+="? "),O+=h.dump+(h.condenseFlow?'"':"")+":"+(h.condenseFlow?"":" "),_(h,w,H,!1,!1)&&(O+=h.dump,S+=O))}h.tag=D,h.dump="{"+S+"}"}function o(h,w,I,S){let D="";const M=h.tag,F=Object.keys(I);if(h.sortKeys===!0)F.sort();else if(typeof h.sortKeys=="function")F.sort(h.sortKeys);else if(h.sortKeys)throw new r("sortKeys must be a boolean or a function");for(let P=0,O=F.length;P<O;P+=1){let z="";(!S||D!=="")&&(z+=Ye(h,w));const H=F[P];let $=I[H];if(h.replacer&&($=h.replacer.call(I,H,$)),!_(h,w+1,H,!0,!0,!0))continue;const Z=h.tag!==null&&h.tag!=="?"||h.dump&&h.dump.length>1024;Z&&(h.dump&&d===h.dump.charCodeAt(0)?z+="?":z+="? "),z+=h.dump,Z&&(z+=Ye(h,w)),_(h,w+1,$,!0,Z)&&(h.dump&&d===h.dump.charCodeAt(0)?z+=":":z+=": ",z+=h.dump,D+=z)}h.tag=M,h.dump=D||"{}"}function x(h,w,I){const S=I?h.explicitTypes:h.implicitTypes;for(let D=0,M=S.length;D<M;D+=1){const F=S[D];if((F.instanceOf||F.predicate)&&(!F.instanceOf||typeof w=="object"&&w instanceof F.instanceOf)&&(!F.predicate||F.predicate(w))){if(I?F.multi&&F.representName?h.tag=F.representName(w):h.tag=F.tag:h.tag="?",F.represent){const P=h.styleMap[F.tag]||F.defaultStyle;let O;if(i.call(F.represent)==="[object Function]")O=F.represent(w,P);else if(l.call(F.represent,P))O=F.represent[P](w,P);else throw new r("!<"+F.tag+'> tag resolver accepts not "'+P+'" style');h.dump=O}return!0}}return!1}function _(h,w,I,S,D,M,F){h.tag=null,h.dump=I,x(h,I,!1)||x(h,I,!0);const P=i.call(h.dump),O=S;S&&(S=h.flowLevel<0||h.flowLevel>w);const z=P==="[object Object]"||P==="[object Array]";let H,$;if(z&&(H=h.duplicates.indexOf(I),$=H!==-1),(h.tag!==null&&h.tag!=="?"||$||h.indent!==2&&w>0)&&(D=!1),$&&h.usedDuplicates[H])h.dump="*ref_"+H;else{if(z&&$&&!h.usedDuplicates[H]&&(h.usedDuplicates[H]=!0),P==="[object Object]")S&&Object.keys(h.dump).length!==0?(o(h,w,h.dump,D),$&&(h.dump="&ref_"+H+h.dump)):(Ft(h,w,h.dump),$&&(h.dump="&ref_"+H+" "+h.dump));else if(P==="[object Array]")S&&h.dump.length!==0?(h.noArrayIndent&&!F&&w>0?Jn(h,w-1,h.dump,D):Jn(h,w,h.dump,D),$&&(h.dump="&ref_"+H+h.dump)):(Kn(h,w,h.dump),$&&(h.dump="&ref_"+H+" "+h.dump));else if(P==="[object String]")h.tag!=="?"&&St(h,h.dump,w,M,O);else{if(P==="[object Undefined]")return!1;if(h.skipInvalid)return!1;throw new r("unacceptable kind of an object to dump "+P)}if(h.tag!==null&&h.tag!=="?"){let Z=encodeURI(h.tag[0]==="!"?h.tag.slice(1):h.tag).replace(/!/g,"%21");h.tag[0]==="!"?Z="!"+Z:Z.slice(0,18)==="tag:yaml.org,2002:"?Z="!!"+Z.slice(18):Z="!<"+Z+">",h.dump=Z+" "+h.dump}}return!0}function T(h,w){const I=[],S=[];C(h,I,S);const D=S.length;for(let M=0;M<D;M+=1)w.duplicates.push(I[S[M]]);w.usedDuplicates=new Array(D)}function C(h,w,I){if(h!==null&&typeof h=="object"){const S=w.indexOf(h);if(S!==-1)I.indexOf(S)===-1&&I.push(S);else if(w.push(h),Array.isArray(h))for(let D=0,M=h.length;D<M;D+=1)C(h[D],w,I);else{const D=Object.keys(h);for(let M=0,F=D.length;M<F;M+=1)C(h[D[M]],w,I)}}}function L(h,w){w=w||{};const I=new At(w);I.noRefs||T(h,I);let S=h;return I.replacer&&(S=I.replacer.call({"":S},"",S)),_(I,0,S,!0,!0)?I.dump+`
`:""}n.exports.dump=L})),wo=Sc(W(((e,n)=>{var t=Tc(),r=Fc();function u(i,l){return function(){throw new Error("Function yaml."+i+" is removed in js-yaml 4. Use yaml."+l+" instead, which is now safe by default.")}}n.exports.Type=ue(),n.exports.Schema=ro(),n.exports.FAILSAFE_SCHEMA=ao(),n.exports.JSON_SCHEMA=po(),n.exports.CORE_SCHEMA=ho(),n.exports.DEFAULT_SCHEMA=yr(),n.exports.load=t.load,n.exports.loadAll=t.loadAll,n.exports.dump=r.dump,n.exports.YAMLException=Bn(),n.exports.types={binary:go(),float:fo(),map:io(),null:lo(),pairs:yo(),set:xo(),timestamp:bo(),bool:co(),int:so(),merge:mo(),omap:ko(),seq:oo(),str:uo()},n.exports.safeLoad=u("safeLoad","load"),n.exports.safeLoadAll=u("safeLoadAll","loadAll"),n.exports.safeDump=u("safeDump","dump")}))()),{Type:gd,Schema:kd,FAILSAFE_SCHEMA:yd,JSON_SCHEMA:xd,CORE_SCHEMA:Mc,DEFAULT_SCHEMA:wd,load:Ic,loadAll:vd,dump:Cd,YAMLException:_d,types:Ed,safeLoad:Ad,safeLoadAll:Sd,safeDump:Dd}=wo.default;wo.default;var Ht,lu;function Rc(){return lu||(lu=1,Ht=function(n,t){var r=3,u="-",i=u.charCodeAt(0),l=u.length;function a(s,d,b,c){var f,p,m,g,k,y,v,E=!1,A=s.bMarks[d]+s.tShift[d],R=s.eMarks[d];if(d!==0||i!==s.src.charCodeAt(0))return!1;for(f=A+1;f<=R;f++)if(u[(f-A)%l]!==s.src[f]){v=f+1;break}if(m=Math.floor((f-A)/l),m<r)return!1;if(f-=(f-A)%l,c)return!0;for(p=d;p++,!(p>=b||s.src.slice(A,R)==="..."||(A=s.bMarks[p]+s.tShift[p],R=s.eMarks[p],A<R&&s.sCount[p]<s.blkIndent));)if(i===s.src.charCodeAt(A)&&!(s.sCount[p]-s.blkIndent>=4)){for(f=A+1;f<=R&&u[(f-A)%l]===s.src[f];f++);if(!(Math.floor((f-A)/l)<m)&&(f-=(f-A)%l,f=s.skipSpaces(f),!(f<R))){E=!0;break}}return k=s.parentType,y=s.lineMax,s.parentType="container",s.lineMax=p,g=s.push("front_matter",null,0),g.hidden=!0,g.markup=s.src.slice(d,f),g.block=!0,g.map=[d,p+(E?1:0)],g.meta=s.src.slice(v,A-1),s.parentType=k,s.lineMax=y,s.line=p+(E?1:0),t(g.meta),!0}n.block.ruler.before("table","front_matter",a,{alt:["paragraph","reference","blockquote","list"]})}),Ht}var Lc=Rc();const Nc=yt(Lc);function Oc(){return e=>{let n="";e.use(Nc,t=>{const r=Pc(t);r!==void 0?n=vo(r,e.utils.escapeHtml):n=""}),e.renderer.rules.front_matter=(t,r,u,i,l)=>n===""?"":`<table class="markdown-frontMatter"${l.renderAttrs(t[r])}>
${n}
</table>
`}}function Pc(e){try{const n=Ic(e,{schema:Mc});if(n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.keys(n).length>0)return n}catch{}}function vo(e,n){const t=Object.entries(e);return t.length===0?"":`<tbody>
${t.map(([u,i])=>`<tr><th scope="row">${n(u)}</th><td>${Xt(i,n)}</td></tr>`).join(`
`)}
</tbody>`}function Xt(e,n){if(e==null)return"";if(e instanceof Date)return n(Bc(e));if(Array.isArray(e))return e.every(zc)?e.map(r=>Xt(r,n)).join(", "):`<ul>${e.map(r=>`<li>${Xt(r,n)}</li>`).join("")}</ul>`;if(typeof e=="object"){const t=vo(e,n);return t===""?"":`<table>${t}</table>`}return n(String(e))}function Bc(e){if(Number.isNaN(e.getTime()))return"";const n=e.toISOString();return n.endsWith("T00:00:00.000Z")?n.slice(0,10):n}function zc(e){if(e==null||e instanceof Date)return!0;const n=typeof e;return n==="string"||n==="number"||n==="boolean"||n==="bigint"}const xr={rootValueKey:"extension.markeditPreview",defaultModes:["side-by-side","preview"],defaultPreset:"default"},qc=pn(q.MarkEdit.userSettings),pe=pn(qc[xr.rootValueKey]),Co=pn(pe.changeMode),_o=pn(pe.markdownIt),Hc=["automatic","quiet","notify","never"],xn=(()=>{const e=pe.updateBehavior;return e&&Hc.includes(e)?e:zn(pe.autoUpdate)?"quiet":"never"})(),jc=zn(pe.syncScroll);zn(pe.hidePreviewButtons);zn(pe.syntaxAutoDetect,!1);const $c=zn(pe.imageHoverPreview,!1),xt=pe.themeName??"github",Eo=xt==="none",jt=pe.styledHtmlColorScheme??pe.styledHtmlTheme??"auto";pe.mathDelimiters;const Uc=Co.modes??xr.defaultModes,cu=pn(Co.hotKey),Gc=_o.preset??xr.defaultPreset,Vc=pn(_o.options);function pn(e,n={}){return e??n}function zn(e,n=!0){return e??n}const Wc=`.markdown-body {
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
`,Zc=`.markdown-body {
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
`,Yc=`.markdown-body {
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
`,Kc=`.markdown-body {
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
`,Jc=`.markdown-body {
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
`,Qc=`.markdown-body {
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
`,Xc=`.markdown-body {
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
`,es=`.markdown-body {
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
`,ns=`.markdown-body {
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
`,ts=`.markdown-body {
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
`,rs=`.markdown-body {
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
`,us=`.markdown-body {
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
`,os=`.markdown-body {
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
`,is=`.markdown-body {
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
`,as=`.markdown-body {
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
`,ls=`.markdown-body {
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
`,cs=`.markdown-body {
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
`,ss=`.markdown-alert {
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
`,ds=`:root {
  --color-note: #0969da;
  --color-tip: #1a7f37;
  --color-warning: #9a6700;
  --color-severe: #bc4c00;
  --color-caution: #d1242f;
  --color-important: #8250df;
}
`,fs=`:root {
  --color-note: #2f81f7;
  --color-tip: #3fb950;
  --color-warning: #d29922;
  --color-severe: #db6d28;
  --color-caution: #f85149;
  --color-important: #a371f7;
}
`,ps=`.code-copy-wrapper {
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
`,lt={github:{light:Zc,dark:Yc},cobalt:{dark:Kc},dracula:{dark:Jc},minimal:{light:Qc,dark:Xc},"night-owl":{dark:es},"rose-pine":{light:ns,dark:ts},solarized:{light:rs,dark:us},synthwave84:{dark:os},"winter-is-coming":{light:is,dark:as},xcode:{light:ls,dark:cs}};function hs(e="auto"){if(Eo)return"";const n=lt[xt]??lt.github,t=n.light??n.dark,r=n.dark??n.light,u=Pr(t)??"#ffffff",i=Pr(r)??"#0d1117";return[".markdown-body { padding: 25px; }",...wr(e,`body { background: ${u}; }`,`body { background: ${i}; }`)].join(`
`)}function Ao(e="auto"){if(Eo)return[`:root { color-scheme: ${e==="auto"?"light dark":e}; }`,"body, .markdown-body { background: Canvas; color: CanvasText; }"].join(`
`);const n=lt[xt]??lt.github,t=n.light??n.dark,r=n.dark??n.light;return[Wc,...wr(e,t,r)].join(`
`)}function bs(e="auto"){return[ss,...wr(e,ds,fs)].join(`
`)}function So(){return ps}function wr(e,n,t){const r=[];switch(e){case"light":r.push(n);break;case"dark":r.push(t);break;case"auto":r.push(`
        ${n}
        @media (prefers-color-scheme: dark) {
          ${t}
        }`);break}return r}const ms={default:{viewMode:"View Mode",changeMode:"Change Mode",editMode:"Edit Mode",sideBySideMode:"Side-by-Side Mode",previewMode:"Preview Mode",saveCleanHtml:"Save Clean HTML",saveStyledHtml:"Save Styled HTML",printRendered:"Print Rendered…",copyHtml:"Copy HTML",copyRichText:"Copy Rich Text",copyCode:"Copy Code",untitled:"Untitled",update:"Update",version:"Version",checkReleases:"Check Releases",updateAndRelaunch:"Update and Relaunch",newVersionAvailable:"is available!",viewReleasePage:"View Release Page",remindMeLater:"Remind Me Later",skipThisVersion:"Skip This Version",failedToUpdate:"Failed to update. Please try again later.",source:"Source",preview:"Preview"},"zh-CN":{viewMode:"视图模式",changeMode:"切换模式",editMode:"编辑模式",sideBySideMode:"并排模式",previewMode:"预览模式",saveCleanHtml:"保存无样式 HTML",saveStyledHtml:"保存带样式 HTML",printRendered:"打印渲染…",copyHtml:"复制 HTML",copyRichText:"复制富文本",copyCode:"复制代码",untitled:"未命名",update:"更新",version:"版本",checkReleases:"查看版本",updateAndRelaunch:"更新并重新启动",newVersionAvailable:"已发布！",viewReleasePage:"查看发布页面",remindMeLater:"稍后提醒我",skipThisVersion:"跳过这个版本",failedToUpdate:"更新失败，请稍后再试。",source:"源码",preview:"预览"},"zh-TW":{viewMode:"視圖模式",changeMode:"切換模式",saveCleanHtml:"儲存無樣式 HTML",saveStyledHtml:"儲存帶樣式 HTML",printRendered:"列印渲染…",copyHtml:"拷貝 HTML",copyRichText:"複製富文字",copyCode:"拷貝程式碼",editMode:"編輯模式",sideBySideMode:"並排模式",previewMode:"預覽模式",untitled:"未命名",update:"更新",version:"版本",checkReleases:"檢視版本",updateAndRelaunch:"更新並重新啟動",newVersionAvailable:"已釋出！",viewReleasePage:"檢視釋出頁面",remindMeLater:"稍後提醒我",skipThisVersion:"跳過這個版本",failedToUpdate:"更新失敗，請稍後再試。",source:"原始碼",preview:"預覽"}};function G(e){return ks[e]}const gs=["default","zh-CN","zh-TW"],ks=ms[(()=>{const e=navigator.language;return gs.includes(e)?e:"default"})()];function vr(){return typeof q.MarkEdit.addExtension=="function"}async function Cr(e,n=!0){return await ws,be.render(e,{lineInfo:n})}function Do(e){e()}async function To(e){const n=r=>`<style>
${r}
</style>`;return['<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',`<div class="markdown-body">
${e}
</div>`,n(hs(jt)),n(Ao(jt)),n(bs(jt)),n(So()),"</body></html>"].join(`
`)}const be=fe(Gc,{html:!0,breaks:!0,linkify:!0,...Vc}),ys=[];be.use(Oc());be.use(tn);be.use(oc,{matcher:e=>!e.startsWith("#"),attrs:{target:"_blank",rel:"noopener"}});be.use(hc);be.use(gc,{enabled:vr(),label:!0});be.use(yc);const xs=new Set(["paragraph_open","heading_open","blockquote_open","list_item_open","bullet_list_open","ordered_list_open","fence","code_block","table_open","html_block","front_matter"]),ws=Promise.all(ys).then(()=>{for(const e of xs){const n=be.renderer.rules[e];be.renderer.rules[e]=(t,r,u,i,l)=>{const a=t[r];return i.lineInfo&&a.map?.length===2&&(a.attrSet("data-line-from",String(a.map[0])),a.attrSet("data-line-to",String(a.map[1]-1))),n?n(t,r,u,i,l):l.renderToken(t,r,u)}}for(const e of["fence","code_block"]){const n=be.renderer.rules[e];be.renderer.rules[e]=(t,r,u,i,l)=>`
      <div class="code-copy-wrapper" onmouseenter="this.querySelector('.code-copy-button').style.opacity='1'" onmouseleave="this.querySelector('.code-copy-button').style.opacity='0'">
        ${n===void 0?l.renderToken(t,r,u):n(t,r,u,i,l)}
        <button title="${G("copyCode")}" aria-label="${G("copyCode")}" class="code-copy-button" onclick="navigator.clipboard.writeText(this.previousElementSibling.dataset.code ?? this.previousElementSibling.innerText); this.style.opacity='0'">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        </button>
      </div>`}}),vs=new DOMParser,Cs="image-loader",_r="cm-md-image-preview",su=5;function Fo(e){const n=vs.parseFromString(e,"text/html");return n.querySelectorAll("img").forEach(r=>{const u=r.getAttribute("src");u!==null&&(u.includes("://")||u.startsWith("data:image/")||(r.src=`${Cs}://${u}`))}),n.body.innerHTML}function _s(e){typeof q.MarkEdit.getFileInfo=="function"&&(document.addEventListener("mousemove",n=>{Le.panelPresenter!==void 0&&(clearTimeout(Le.panelPresenter),Le.panelPresenter=void 0),Le.panelPresenter=setTimeout(()=>{const t=n.target,r=t?.closest(".cm-md-link"),u=r?.dataset.linkUrl??r?.innerText??"";r!==null&&bi(u)?Es(r,u):t?.classList.contains(_r)||wn()},600)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&wn(!1)}),e.addEventListener("scroll",()=>wn()))}async function Es(e,n){if(e===Le.focusedElement)return;const t=(await q.MarkEdit.getFileInfo())?.parentPath;if(t===void 0)return;const r=nn(t,n),u=await q.MarkEdit.getFileObject(r);if(u===void 0)return;const i=e.getBoundingClientRect(),l=document.createElement("img");l.className=_r,l.style.position="fixed",l.style.left=`${i.left}px`,l.style.zIndex="10000",l.style.borderRadius="5px",l.style.opacity="0",l.style.transition="opacity 120ms",l.style.cursor="pointer",l.onclick=()=>{wn(),window.open(n,"_blank")},l.onload=()=>{const s=Math.min(l.naturalHeight,240);l.style.height=`${s}px`;const d=i.top,b=window.innerHeight-i.bottom;d>b?l.style.top=`${i.top-s-su}px`:l.style.top=`${i.bottom+su}px`,requestAnimationFrame(()=>{l.style.opacity="1"})};const a=u.mimeType??"image/png";l.src=`data:${a};base64,${u.data}`,wn(!1),Le.focusedElement=e,document.body.appendChild(l)}function wn(e=!0){Le.focusedElement!==void 0&&(Le.focusedElement=void 0,document.querySelectorAll(`.${_r}`).forEach(n=>{e?(n.style.opacity="0",n.addEventListener("transitionend",()=>n.remove(),{once:!0})):n.remove()}))}const Le={panelPresenter:void 0,focusedElement:void 0};let Fn=null,er=null;function Er(){Fn=null,er=null}function Mo(e){Fn===null&&(Fn=Array.from(e.querySelectorAll("[data-line-from]")).map(n=>({from:parseInt(n.dataset.lineFrom??"0",10),to:parseInt(n.dataset.lineTo??"0",10),el:n,top:ut(e,n)})))}function As(e){return Fn===null&&Mo(e),Fn??[]}function Ss(e){return er??=parseFloat(getComputedStyle(e).paddingTop)||0,er}let ct=null,$t;function du(e){ct=e,$t!==void 0&&clearTimeout($t),$t=setTimeout(()=>{ct=null},150)}function Ds(e,n){if(!jc)return;let t,r;e.addEventListener("scroll",()=>{ct!=="preview"&&(I0()||(t!==void 0&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{du("editor"),nr(e,n,!1)})))},{passive:!0}),n.addEventListener("scroll",()=>{ct!=="editor"&&(r!==void 0&&cancelAnimationFrame(r),r=requestAnimationFrame(()=>{du("preview"),Ts(n,e)}))},{passive:!0})}function nr(e,n,t=!0){const{line:r,progress:u}=Fs(e);Ms(n,r,u,t)}function Ts(e,n){const t=As(e);if(t.length===0)return;const r=e.scrollTop,u=Ss(e);let i=0,l=t.length-1,a,s=0;for(;i<=l;){const y=i+l>>>1,v=t[y].top-u;if(v+t[y].el.offsetHeight<=r)i=y+1;else if(y>0&&t[y-1].top-u+t[y-1].el.offsetHeight>r)l=y-1;else{a=t[y],s=wt((r-v)/t[y].el.offsetHeight);break}}if(a===void 0)return;const{from:d,to:b}=a,c=d+Math.round(s*Math.max(0,b-d)),f=q.MarkEdit.editorView,p=Math.max(1,Math.min(f.state.doc.lines,c+1)),m=f.state.doc.line(p),g=f.lineBlockAt(m.from),k=g.top+g.height*(s%1);n.scrollTo({top:k,behavior:"instant"})}function Fs(e,n=0){const t=q.MarkEdit.editorView,r=t.lineBlockAtHeight(e.scrollTop+n),u=t.state.doc.lineAt(r.from).number-1,i=r.height>0?wt((e.scrollTop-r.top)/r.height):0;return{line:u,progress:i}}function Ms(e,n,t,r=!0){if(n===0&&t===0)return tt(e,0,r);const u=Array.from(document.querySelectorAll("[data-line-from]")),i=Is(u,n);if(i!==void 0){const{from:s,to:d}=rn(i);return Mt(e,i,Ls(n,t,s,d),r)}if(n===0)return tt(e,0,r);const{beforeBlock:l,afterBlock:a}=Rs(u,n);if(l!==void 0&&a!==void 0){const s=rn(l),d=rn(a),b=ut(e,l)+l.offsetHeight,c=ut(e,a),f=d.from-s.to,p=n-s.to+t,m=f>0?wt(p/f):0;return tt(e,b+(c-b)*m,r)}if(l!==void 0)return Mt(e,l,1,r);if(a!==void 0)return Mt(e,a,0,r)}function Is(e,n){let t=0,r=e.length-1;for(;t<=r;){const u=t+r>>>1,{from:i,to:l}=rn(e[u]);if(n<i)r=u-1;else if(n>l)t=u+1;else return e[u]}}function Rs(e,n){let t,r;for(const u of e){const{from:i,to:l}=rn(u);if(l<n)t=u;else if(i>n){r=u;break}}return{beforeBlock:t,afterBlock:r}}function Ls(e,n,t,r){const u=r-t;return u<1?e===t?n:0:wt((e-t+n)/u)}function wt(e){return Math.max(0,Math.min(1,e))}function Ns(e){const n=e.match(/^((?:\s{0,3}>\s*)*\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])\](?= )/);return n===null?null:{offset:n[1].length,replacement:n[2]===" "?"x":" "}}function Os(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}function tr(e,n){return Array(n+1).join(e)}function Io(e){return e.replace(/^\n*/,"")}function Ro(e){for(var n=e.length;n>0&&e[n-1]===`
`;)n--;return e.substring(0,n)}function Lo(e){return Ro(Io(e))}var Ps=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function Ar(e){return Sr(e,Ps)}var No=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function Oo(e){return Sr(e,No)}function Bs(e){return Bo(e,No)}var Po=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function zs(e){return Sr(e,Po)}function qs(e){return Bo(e,Po)}function Sr(e,n){return n.indexOf(e.nodeName)>=0}function Bo(e,n){return e.getElementsByTagName&&n.some(function(t){return e.getElementsByTagName(t).length})}var Hs=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function zo(e){return Hs.reduce(function(n,t){return n.replace(t[0],t[1])},e)}var re={};re.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};re.lineBreak={filter:"br",replacement:function(e,n,t){return t.br+`
`}};re.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,n,t){var r=Number(n.nodeName.charAt(1));if(t.headingStyle==="setext"&&r<3){var u=tr(r===1?"=":"-",e.length);return`

`+e+`
`+u+`

`}else return`

`+tr("#",r)+" "+e+`

`}};re.blockquote={filter:"blockquote",replacement:function(e){return e=Lo(e).replace(/^/gm,"> "),`

`+e+`

`}};re.list={filter:["ul","ol"],replacement:function(e,n){var t=n.parentNode;return t.nodeName==="LI"&&t.lastElementChild===n?`
`+e:`

`+e+`

`}};re.listItem={filter:"li",replacement:function(e,n,t){var r=t.bulletListMarker+"   ",u=n.parentNode;if(u.nodeName==="OL"){var i=u.getAttribute("start"),l=Array.prototype.indexOf.call(u.children,n);r=(i?Number(i)+l:l+1)+".  "}var a=/\n$/.test(e);return e=Lo(e)+(a?`
`:""),e=e.replace(/\n/gm,`
`+" ".repeat(r.length)),r+e+(n.nextSibling?`
`:"")}};re.indentedCodeBlock={filter:function(e,n){return n.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,n,t){return`

    `+n.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};re.fencedCodeBlock={filter:function(e,n){return n.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,n,t){for(var r=n.firstChild.getAttribute("class")||"",u=(r.match(/language-(\S+)/)||[null,""])[1],i=n.firstChild.textContent,l=t.fence.charAt(0),a=3,s=new RegExp("^"+l+"{3,}","gm"),d;d=s.exec(i);)d[0].length>=a&&(a=d[0].length+1);var b=tr(l,a);return`

`+b+u+`
`+i.replace(/\n$/,"")+`
`+b+`

`}};re.horizontalRule={filter:"hr",replacement:function(e,n,t){return`

`+t.hr+`

`}};re.inlineLink={filter:function(e,n){return n.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,n){var t=Dr(n.getAttribute("href")),r=Tr(st(n.getAttribute("title"))),u=r?' "'+r+'"':"";return"["+e+"]("+t+u+")"}};re.referenceLink={filter:function(e,n){return n.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,n,t){var r=Dr(n.getAttribute("href")),u=st(n.getAttribute("title"));u&&(u=' "'+Tr(u)+'"');var i,l;switch(t.linkReferenceStyle){case"collapsed":i="["+e+"][]",l="["+e+"]: "+r+u;break;case"shortcut":i="["+e+"]",l="["+e+"]: "+r+u;break;default:var a=this.references.length+1;i="["+e+"]["+a+"]",l="["+a+"]: "+r+u}return this.references.push(l),i},references:[],append:function(e){var n="";return this.references.length&&(n=`

`+this.references.join(`
`)+`

`,this.references=[]),n}};re.emphasis={filter:["em","i"],replacement:function(e,n,t){return e.trim()?t.emDelimiter+e+t.emDelimiter:""}};re.strong={filter:["strong","b"],replacement:function(e,n,t){return e.trim()?t.strongDelimiter+e+t.strongDelimiter:""}};re.code={filter:function(e){var n=e.previousSibling||e.nextSibling,t=e.parentNode.nodeName==="PRE"&&!n;return e.nodeName==="CODE"&&!t},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var n=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",t="`",r=e.match(/`+/gm)||[];r.indexOf(t)!==-1;)t=t+"`";return t+n+e+n+t}};re.image={filter:"img",replacement:function(e,n){var t=zo(st(n.getAttribute("alt"))),r=Dr(n.getAttribute("src")||""),u=st(n.getAttribute("title")),i=u?' "'+Tr(u)+'"':"";return r?"!["+t+"]("+r+i+")":""}};function st(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}function Dr(e){var n=e.replace(/([<>()])/g,"\\$1");return n.indexOf(" ")>=0?"<"+n+">":n}function Tr(e){return e.replace(/"/g,'\\"')}function qo(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var n in e.rules)this.array.push(e.rules[n])}qo.prototype={add:function(e,n){this.array.unshift(n)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var n;return(n=Ut(this.array,e,this.options))||(n=Ut(this._keep,e,this.options))||(n=Ut(this._remove,e,this.options))?n:this.defaultRule},forEach:function(e){for(var n=0;n<this.array.length;n++)e(this.array[n],n)}};function Ut(e,n,t){for(var r=0;r<e.length;r++){var u=e[r];if(js(u,n,t))return u}}function js(e,n,t){var r=e.filter;if(typeof r=="string"){if(r===n.nodeName.toLowerCase())return!0}else if(Array.isArray(r)){if(r.indexOf(n.nodeName.toLowerCase())>-1)return!0}else if(typeof r=="function"){if(r.call(e,n,t))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function $s(e){var n=e.element,t=e.isBlock,r=e.isVoid,u=e.isPre||function(c){return c.nodeName==="PRE"};if(!(!n.firstChild||u(n))){for(var i=null,l=!1,a=null,s=fu(a,n,u);s!==n;){if(s.nodeType===3||s.nodeType===4){var d=s.data.replace(/[ \r\n\t]+/g," ");if((!i||/ $/.test(i.data))&&!l&&d[0]===" "&&(d=d.substr(1)),!d){s=Gt(s);continue}s.data=d,i=s}else if(s.nodeType===1)t(s)||s.nodeName==="BR"?(i&&(i.data=i.data.replace(/ $/,"")),i=null,l=!1):r(s)||u(s)?(i=null,l=!0):i&&(l=!1);else{s=Gt(s);continue}var b=fu(a,s,u);a=s,s=b}i&&(i.data=i.data.replace(/ $/,""),i.data||Gt(i))}}function Gt(e){var n=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),n}function fu(e,n,t){return e&&e.parentNode===n||t(n)?n.nextSibling||n.parentNode:n.firstChild||n.nextSibling||n.parentNode}var Fr=typeof window<"u"?window:{};function Us(){var e=Fr.DOMParser,n=!1;try{new e().parseFromString("","text/html")&&(n=!0)}catch{}return n}function Gs(){var e=function(){};return Vs()?e.prototype.parseFromString=function(n){var t=new window.ActiveXObject("htmlfile");return t.designMode="on",t.open(),t.write(n),t.close(),t}:e.prototype.parseFromString=function(n){var t=document.implementation.createHTMLDocument("");return t.open(),t.write(n),t.close(),t},e}function Vs(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch{Fr.ActiveXObject&&(e=!0)}return e}var Ws=Us()?Fr.DOMParser:Gs();function Zs(e,n){var t;if(typeof e=="string"){var r=Ys().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");t=r.getElementById("turndown-root")}else t=e.cloneNode(!0);return $s({element:t,isBlock:Ar,isVoid:Oo,isPre:n.preformattedCode?Ks:null}),t}var Vt;function Ys(){return Vt=Vt||new Ws,Vt}function Ks(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}function Js(e,n){return e.isBlock=Ar(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=Qs(e),e.flankingWhitespace=Xs(e,n),e}function Qs(e){return!Oo(e)&&!zs(e)&&/^\s*$/i.test(e.textContent)&&!Bs(e)&&!qs(e)}function Xs(e,n){if(e.isBlock||n.preformattedCode&&e.isCode)return{leading:"",trailing:""};var t=e0(e.textContent);return t.leadingAscii&&pu("left",e,n)&&(t.leading=t.leadingNonAscii),t.trailingAscii&&pu("right",e,n)&&(t.trailing=t.trailingNonAscii),{leading:t.leading,trailing:t.trailing}}function e0(e){var n=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:n[1],leadingAscii:n[2],leadingNonAscii:n[3],trailing:n[4],trailingNonAscii:n[5],trailingAscii:n[6]}}function pu(e,n,t){var r,u,i;return e==="left"?(r=n.previousSibling,u=/ $/):(r=n.nextSibling,u=/^ /),r&&(r.nodeType===3?i=u.test(r.nodeValue):t.preformattedCode&&r.nodeName==="CODE"?i=!1:r.nodeType===1&&!Ar(r)&&(i=u.test(r.textContent))),i}var n0=Array.prototype.reduce;function dt(e){if(!(this instanceof dt))return new dt(e);var n={rules:re,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(t,r){return r.isBlock?`

`:""},keepReplacement:function(t,r){return r.isBlock?`

`+r.outerHTML+`

`:r.outerHTML},defaultReplacement:function(t,r){return r.isBlock?`

`+t+`

`:t}};this.options=Os({},n,e),this.rules=new qo(this.options)}dt.prototype={turndown:function(e){if(!u0(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var n=Ho.call(this,new Zs(e,this.options));return t0.call(this,n)},use:function(e){if(Array.isArray(e))for(var n=0;n<e.length;n++)this.use(e[n]);else if(typeof e=="function")e(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,n){return this.rules.add(e,n),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return zo(e)}};function Ho(e){var n=this;return n0.call(e.childNodes,function(t,r){r=new Js(r,n.options);var u="";return r.nodeType===3?u=r.isCode?r.nodeValue:n.escape(r.nodeValue):r.nodeType===1&&(u=r0.call(n,r)),jo(t,u)},"")}function t0(e){var n=this;return this.rules.forEach(function(t){typeof t.append=="function"&&(e=jo(e,t.append(n.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function r0(e){var n=this.rules.forNode(e),t=Ho.call(this,e),r=e.flankingWhitespace;return(r.leading||r.trailing)&&(t=t.trim()),r.leading+n.replacement(t,e,this.options)+r.trailing}function jo(e,n){var t=Ro(e),r=Io(n),u=Math.max(e.length-t.length,n.length-r.length),i=`

`.substring(0,u);return t+i+r}function u0(e){return e!=null&&(typeof e=="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}var hu=/highlight-(?:text|source)-([a-z0-9]+)/;function o0(e){e.addRule("highlightedCodeBlock",{filter:function(n){var t=n.firstChild;return n.nodeName==="DIV"&&hu.test(n.className)&&t&&t.nodeName==="PRE"},replacement:function(n,t,r){var u=t.className||"",i=(u.match(hu)||[null,""])[1];return`

`+r.fence+i+`
`+t.firstChild.textContent+`
`+r.fence+`

`}})}function i0(e){e.addRule("strikethrough",{filter:["del","s","strike"],replacement:function(n){return"~"+n+"~"}})}var a0=Array.prototype.indexOf,l0=Array.prototype.every,cn={};cn.tableCell={filter:["th","td"],replacement:function(e,n){return $o(e,n)}};cn.tableRow={filter:"tr",replacement:function(e,n){var t="",r={left:":--",right:"--:",center:":-:"};if(Mr(n))for(var u=0;u<n.childNodes.length;u++){var i="---",l=(n.childNodes[u].getAttribute("align")||"").toLowerCase();l&&(i=r[l]||i),t+=$o(i,n.childNodes[u])}return`
`+e+(t?`
`+t:"")}};cn.table={filter:function(e){return e.nodeName==="TABLE"&&Mr(e.rows[0])},replacement:function(e){return e=e.replace(`

`,`
`),`

`+e+`

`}};cn.tableSection={filter:["thead","tbody","tfoot"],replacement:function(e){return e}};function Mr(e){var n=e.parentNode;return n.nodeName==="THEAD"||n.firstChild===e&&(n.nodeName==="TABLE"||c0(n))&&l0.call(e.childNodes,function(t){return t.nodeName==="TH"})}function c0(e){var n=e.previousSibling;return e.nodeName==="TBODY"&&(!n||n.nodeName==="THEAD"&&/^\s*$/i.test(n.textContent))}function $o(e,n){var t=a0.call(n.parentNode.childNodes,n),r=" ";return t===0&&(r="| "),r+e+" |"}function s0(e){e.keep(function(t){return t.nodeName==="TABLE"&&!Mr(t.rows[0])});for(var n in cn)e.addRule(n,cn[n])}function d0(e){e.addRule("taskListItems",{filter:function(n){return n.type==="checkbox"&&n.parentNode.nodeName==="LI"},replacement:function(n,t){return(t.checked?"[x]":"[ ]")+" "}})}function f0(e){e.use([o0,i0,s0,d0])}let he=null;function p0(){if(he!==null)return he;he=document.createElement("div"),he.className="wysiwyg-toolbar",he.setAttribute("role","toolbar"),he.setAttribute("aria-label","Formatting toolbar");const e=document.createElement("div");e.className="wysiwyg-toolbar-backdrop",e.setAttribute("aria-hidden","true"),he.appendChild(e);const n=[{label:"H1",title:"Heading 1",action:()=>et("h1")},{label:"H2",title:"Heading 2",action:()=>et("h2")},{label:"H3",title:"Heading 3",action:()=>et("h3")},{label:"",title:"",action:()=>{},isSep:!0},{label:"<b>B</b>",title:"Bold",action:()=>$e("bold")},{label:"<i>I</i>",title:"Italic",action:()=>$e("italic")},{label:"<s>S</s>",title:"Strikethrough",action:()=>$e("strikeThrough")},{label:"&#x60;&#x60;",title:"Inline code",action:b0},{label:"&#x60;&#x60;&#x60;",title:"Code block",action:m0},{label:"",title:"",action:()=>{},isSep:!0},{label:"&#8220;",title:"Blockquote",action:()=>et("blockquote")},{label:"&bull;",title:"Unordered list",action:()=>$e("insertUnorderedList")},{label:"1.",title:"Ordered list",action:()=>$e("insertOrderedList")},{label:"",title:"",action:()=>{},isSep:!0},{label:"&#128279;",title:"Insert link",action:g0},{label:"&#8212;",title:"Horizontal rule",action:()=>$e("insertHorizontalRule")}];for(const t of n){if(t.isSep===!0){const u=document.createElement("span");u.className="wysiwyg-sep",u.setAttribute("aria-hidden","true"),he.appendChild(u);continue}const r=document.createElement("button");r.className="wysiwyg-btn",r.title=t.title,r.innerHTML=t.label,r.type="button",r.addEventListener("mousedown",u=>{u.preventDefault(),t.action()}),he.appendChild(r)}return he}function h0(e){e.querySelector(".wysiwyg-toolbar")?.remove(),he=null}function $e(e,n){document.execCommand(e,!1,n),vt()}function et(e){document.execCommand("formatBlock",!1,e),vt()}function vt(){document.querySelector(".markdown-body")?.dispatchEvent(new Event("input",{bubbles:!0}))}function b0(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0),t=document.createElement("code");t.textContent=n.toString()||"code",n.deleteContents(),n.insertNode(t),n.setStartAfter(t),n.collapse(!0),e.removeAllRanges(),e.addRange(n),vt()}function m0(){const e=window.getSelection();if(e===null||e.rangeCount===0)return;const n=e.getRangeAt(0),t=document.createElement("pre"),r=document.createElement("code");r.textContent=n.toString()||"code block",t.appendChild(r),n.deleteContents(),n.insertNode(t),n.setStartAfter(t),n.collapse(!0),e.removeAllRanges(),e.addRange(n),vt()}async function g0(){const e=await q.MarkEdit.showTextBox({title:"Insert Link",placeholder:"https://example.com"});e===void 0||e.trim()===""||$e("createLink",e.trim())}const Uo=new dt({headingStyle:"atx",bulletListMarker:"-",codeBlockStyle:"fenced",fence:"```",emDelimiter:"*",strongDelimiter:"**",linkStyle:"inlined"});Uo.use(f0);let Mn=!1,Ue;function Ir(){return Mn}function Go(){if(Mn)return;Mn=!0;const e=Fe();e.contentEditable="true",e.spellcheck=!0,e.classList.add("wysiwyg-active"),e.addEventListener("input",Vo),bu(e),Qo(()=>bu(Fe()));const n=getComputedStyle(e),t=parseFloat(n.paddingLeft)||0,r=parseFloat(n.paddingRight)||0;e.style.paddingTop="0px";const u=e.querySelector(".wysiwyg-toolbar");u!==null&&(u.style.top="0px",u.style.marginTop="0px",u.style.marginLeft=`-${t}px`,u.style.marginRight=`-${r}px`),Er(),e.focus()}function k0(){if(!Mn)return;Mn=!1,Ue!==void 0&&(clearTimeout(Ue),Ue=void 0),rr(!1);const e=Fe();e.contentEditable="false",e.classList.remove("wysiwyg-active"),e.style.paddingTop="",e.removeEventListener("input",Vo),h0(e),Qo(void 0),Er(),In()}function bu(e){if(e.querySelector(".wysiwyg-toolbar")!==null)return;const n=p0();e.insertBefore(n,e.firstChild)}function Vo(){Ue!==void 0&&clearTimeout(Ue),rr(!0),Ue=setTimeout(()=>{rr(!1),Ue=void 0},600),q.MarkEdit.editorAPI.setText(y0())}function y0(){const n=Fe().cloneNode(!0);return n.querySelector(".wysiwyg-toolbar")?.remove(),n.querySelectorAll("[data-line-from],[data-line-to]").forEach(t=>{t.removeAttribute("data-line-from"),t.removeAttribute("data-line-to")}),Uo.turndown(n.innerHTML)}const Ge={containerClass:"markdown-container",gutterViewClass:"markdown-gutter",dividerViewClass:"markdown-divider",previewPaneClass:"markdown-body",updatePillClass:"markdown-update-pill"},Ct={viewModeCacheKey:"ui.view-mode",previewPageZoomKey:"ui.preview-page-zoom"};var Wt=function(e,n){return Number(e.slice(0,-1*n.length))},x0=function(e){return e.endsWith("px")?{value:e,type:"px",numeric:Wt(e,"px")}:e.endsWith("fr")?{value:e,type:"fr",numeric:Wt(e,"fr")}:e.endsWith("%")?{value:e,type:"%",numeric:Wt(e,"%")}:e==="auto"?{value:e,type:"auto"}:null},Wo=function(e){return e.split(" ").map(x0)},w0=function(e,n,t,r){t===void 0&&(t=0),r===void 0&&(r=!1);var u=r?e+1:e,i=n.slice(0,u).reduce(function(a,s){return a+s.numeric},0),l=t?e*t:0;return i+l},Zo=function(e,n,t){return n.concat(t).map(function(r){return r.style[e]}).filter(function(r){return r!==void 0&&r!==""})},v0=function(e,n){return n.endsWith(e)?Number(n.slice(0,-1*e.length)):null},mu=function(e){for(var n=0;n<e.length;n++)if(e[n].numeric>0)return n;return null},Ve=function(){return!1},C0=function(e,n,t){e.style[n]=t},J=function(e,n,t){var r=e[n];return r!==void 0?r:t};function Yo(e){var n;return(n=[]).concat.apply(n,Array.from(e.ownerDocument.styleSheets).map(function(t){var r=[];try{r=Array.from(t.cssRules||[])}catch{}return r})).filter(function(t){var r=!1;try{r=e.matches(t.selectorText)}catch{}return r})}var _0="grid-template-columns",E0="grid-template-rows",te=function(n,t,r){this.direction=n,this.element=t.element,this.track=t.track,n==="column"?(this.gridTemplateProp=_0,this.gridGapProp="grid-column-gap",this.cursor=J(r,"columnCursor",J(r,"cursor","col-resize")),this.snapOffset=J(r,"columnSnapOffset",J(r,"snapOffset",30)),this.dragInterval=J(r,"columnDragInterval",J(r,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=J(r,"gridTemplateColumns")):n==="row"&&(this.gridTemplateProp=E0,this.gridGapProp="grid-row-gap",this.cursor=J(r,"rowCursor",J(r,"cursor","row-resize")),this.snapOffset=J(r,"rowSnapOffset",J(r,"snapOffset",30)),this.dragInterval=J(r,"rowDragInterval",J(r,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=J(r,"gridTemplateRows")),this.onDragStart=J(r,"onDragStart",Ve),this.onDragEnd=J(r,"onDragEnd",Ve),this.onDrag=J(r,"onDrag",Ve),this.writeStyle=J(r,"writeStyle",C0),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=t.minSizeStart,this.minSizeEnd=t.minSizeEnd,t.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};te.prototype.getDimensions=function(){var n=this.grid.getBoundingClientRect(),t=n.width,r=n.height,u=n.top,i=n.bottom,l=n.left,a=n.right;this.direction==="column"?(this.start=u,this.end=i,this.size=r):this.direction==="row"&&(this.start=l,this.end=a,this.size=t)};te.prototype.getSizeAtTrack=function(n,t){return w0(n,this.computedPixels,this.computedGapPixels,t)};te.prototype.getSizeOfTrack=function(n){return this.computedPixels[n].numeric};te.prototype.getRawTracks=function(){var n=Zo(this.gridTemplateProp,[this.grid],Yo(this.grid));if(!n.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return n[0]};te.prototype.getGap=function(){var n=Zo(this.gridGapProp,[this.grid],Yo(this.grid));return n.length?n[0]:null};te.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};te.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};te.prototype.setTracks=function(n){this.tracks=n.split(" "),this.trackValues=Wo(n)};te.prototype.setComputedTracks=function(n){this.computedTracks=n.split(" "),this.computedPixels=Wo(n)};te.prototype.setGap=function(n){this.gap=n};te.prototype.setComputedGap=function(n){this.computedGap=n,this.computedGapPixels=v0("px",this.computedGap)||0};te.prototype.getMousePosition=function(n){return"touches"in n?n.touches[0][this.clientAxis]:n[this.clientAxis]};te.prototype.startDragging=function(n){if(!("button"in n&&n.button!==0)){n.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=n.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var t=this.trackValues.filter(function(a){return a.type==="%"}),r=this.trackValues.filter(function(a){return a.type==="fr"});if(this.totalFrs=r.length,this.totalFrs){var u=mu(r);u!==null&&(this.frToPixels=this.computedPixels[u].numeric/r[u].numeric)}if(t.length){var i=mu(t);i!==null&&(this.percentageToPixels=this.computedPixels[i].numeric/t[i].numeric)}var l=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(n)-l,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",Ve),this.grid.addEventListener("dragstart",Ve),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};te.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};te.prototype.drag=function(n){var t=this.getMousePosition(n),r=this.getSizeOfTrack(this.track),u=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,i=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(r-this.dragStartOffset),l=u+this.snapOffset,a=i-this.snapOffset;t<l&&(t=u),t>a&&(t=i),t<u?t=u:t>i&&(t=i);var s=t-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,d=this.bTrackEnd-t+this.dragStartOffset-r-this.computedGapPixels;if(this.dragInterval>1){var b=Math.round(s/this.dragInterval)*this.dragInterval;d-=b-s,s=b}if(s<this.minSizeStart&&(s=this.minSizeStart),d<this.minSizeEnd&&(d=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=s+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var c=s/this.frToPixels;this.tracks[this.aTrack]=c+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var f=s/this.percentageToPixels;this.tracks[this.aTrack]=f+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=d+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var p=d/this.frToPixels;this.tracks[this.bTrack]=p+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var m=d/this.percentageToPixels;this.tracks[this.bTrack]=m+"%"}var g=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,g),this.onDrag(this.direction,this.track,g)};te.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",Ve),this.grid.removeEventListener("dragstart",Ve),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};te.prototype.destroy=function(n,t){n===void 0&&(n=!0),n||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),t&&t()):(this.needsDestroy=!0,t&&(this.destroyCb=t))};var gu=function(e,n,t){return n in e?e[n]:t},sn=function(e,n){return function(t){if(t.track<1)throw Error("Invalid track index: "+t.track+". Track must be between two other tracks.");var r=e==="column"?n.columnMinSizes||{}:n.rowMinSizes||{},u=e==="column"?"columnMinSize":"rowMinSize";return new te(e,Object.assign({},{minSizeStart:gu(r,t.track-1,J(n,u,J(n,"minSize",0))),minSizeEnd:gu(r,t.track+1,J(n,u,J(n,"minSize",0)))},t),n)}},We=function(n){var t=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:n.columnGutters||[],rowGutters:n.rowGutters||[],columnMinSizes:n.columnMinSizes||{},rowMinSizes:n.rowMinSizes||{}},n),this.options.columnGutters.forEach(function(r){t.columnGutters[r.track]=sn("column",t.options)(r)}),this.options.rowGutters.forEach(function(r){t.rowGutters[r.track]=sn("row",t.options)(r)})};We.prototype.addColumnGutter=function(n,t){this.columnGutters[t]&&this.columnGutters[t].destroy(),this.columnGutters[t]=sn("column",this.options)({element:n,track:t})};We.prototype.addRowGutter=function(n,t){this.rowGutters[t]&&this.rowGutters[t].destroy(),this.rowGutters[t]=sn("row",this.options)({element:n,track:t})};We.prototype.removeColumnGutter=function(n,t){var r=this;t===void 0&&(t=!0),this.columnGutters[n]&&this.columnGutters[n].destroy(t,function(){delete r.columnGutters[n]})};We.prototype.removeRowGutter=function(n,t){var r=this;t===void 0&&(t=!0),this.rowGutters[n]&&this.rowGutters[n].destroy(t,function(){delete r.rowGutters[n]})};We.prototype.handleDragStart=function(n,t,r){t==="column"?(this.columnGutters[r]&&this.columnGutters[r].destroy(),this.columnGutters[r]=sn("column",this.options)({track:r}),this.columnGutters[r].startDragging(n)):t==="row"&&(this.rowGutters[r]&&this.rowGutters[r].destroy(),this.rowGutters[r]=sn("row",this.options)({track:r}),this.rowGutters[r].startDragging(n))};We.prototype.destroy=function(n){var t=this;n===void 0&&(n=!0),Object.keys(this.columnGutters).forEach(function(r){return t.columnGutters[r].destroy(n,function(){delete t.columnGutters[r]})}),Object.keys(this.rowGutters).forEach(function(r){return t.rowGutters[r].destroy(n,function(){delete t.rowGutters[r]})})};function A0(e){return new We(e)}const S0=`body .markdown-body details summary,
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
`,D0=`/* ── WYSIWYG Formatting Toolbar ─────────────────────────────────────────────
   Positioned sticky at the top of .markdown-body so it stays in view as
   the user scrolls. Only rendered when WYSIWYG mode is active.           */

.wysiwyg-toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px 10px;
  margin: -25px -25px 20px -25px; /* bleed to edges of markdown-body padding */
  position: sticky;
  top: -25px; /* compensate for parent padding */
  z-index: 999;
  user-select: none;
  flex-wrap: wrap;
}

/* The blur/background live on a real first-child element instead of directly
 * on the sticky toolbar: WebKit has a long-standing bug where position: sticky
 * silently stops sticking on an element that also has backdrop-filter/filter
 * applied to it directly, and WKWebView has also been unreliable about
 * compositing backdrop-filter on a ::before behind a sticky ancestor. z-index
 * -1 is required, not just DOM order: a positioned descendant (this one) always
 * paints above non-positioned in-flow siblings (the buttons) regardless of
 * source order, unless it's placed at a lower stacking level explicitly. */
.wysiwyg-toolbar-backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
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

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .wysiwyg-toolbar {
    --toolbar-bg: rgba(36, 36, 36, 0.94);
    --toolbar-border: rgba(255,255,255,0.1);
    --toolbar-fg: #ddd;
    --toolbar-hover: rgba(255,255,255,0.1);
    --toolbar-active: rgba(255,255,255,0.18);
  }
}
`,ft=document.body,vn=document.createElement("div"),Y=document.createElement("div"),ku=en("* { cursor: col-resize }",!1),Ko=di.Annotation.define();var de=(e=>(e[e.edit=0]="edit",e[e.sideBySide=1]="sideBySide",e[e.preview=2]="preview",e))(de||{});function T0(){en(S0),en(Ao()),en(So()),en(D0);const e=document.createElement("div");e.className=Ge.dividerViewClass,vn.appendChild(e),vn.className=Ge.gutterViewClass,ft.appendChild(vn),Y.className=Ge.previewPaneClass,ft.appendChild(Y),document.addEventListener("keydown",r=>{if(!r.metaKey||r.key!=="a")return;const u=q.MarkEdit.editorView?.contentDOM??document.querySelector(".cm-content");(Y.classList.contains("overlay")||document.activeElement!==u)&&(hi(Y),r.preventDefault())}),new MutationObserver(yu).observe(Y,{attributes:!0,attributeFilter:["style","class"]}),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{yu(),document.querySelector(".mermaid")!==null&&In()}),typeof q.MarkEdit.getFileInfo=="function"&&typeof q.MarkEdit.openFile=="function"&&Y.addEventListener("click",q0),Y.addEventListener("click",H0)}function qn(e,n=!0){const t=le();Ne.viewMode=e,e!==t&&localStorage.setItem(Ct.viewModeCacheKey,String(e));const r=q.MarkEdit.editorView;e===0?r.focus():e===2&&r.contentDOM.blur(),e===1?(ft.classList.add(Ge.containerClass),Ne.splitter??=A0({columnGutters:[{track:1,element:vn}],minSize:150,onDragStart:()=>ku.disabled=!1,onDragEnd:()=>ku.disabled=!0})):(ft.classList.remove(Ge.containerClass),Ne.splitter?.destroy(),Ne.splitter=void 0),e===2?Y.classList.add("overlay"):Y.classList.remove("overlay"),n&&In()}function F0(){const e=[0,...Uc.map(r=>{switch(r){case"side-by-side":return 1;case"preview":return 2;default:return}}).filter(r=>r!==void 0)],n=e.indexOf(le()),t=n===-1?0:(n+1)%e.length;qn(e[t])}function M0(){const e=localStorage.getItem(Ct.viewModeCacheKey);if(e===null)return;const n=Number(e);le()!==n&&qn(n,!0)}function le(){return Ne.viewMode}function rr(e){Ne.wysiwygEditLock=e}function I0(){return Ne.wysiwygEditLock}let Jo;function Qo(e){Jo=e}async function In(){if(Ne.wysiwygEditLock||le()===0)return;const e=Ir()?Y.scrollTop:void 0,n=Fo(await _t());Y.innerHTML=n,Jo?.(),Er(),requestAnimationFrame(()=>{Mo(Y),e!==void 0?Y.scrollTop=e:nr(ur(),Y,!1)}),Do(()=>{e===void 0&&nr(ur(),Fe(),!1);const t=localStorage.getItem(Ct.previewPageZoomKey);t!==null&&(Y.style.zoom=t)})}function R0(e){if(le()===0||le()===1&&q.MarkEdit.editorView.hasFocus||!e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;const n=Number(Y.style.zoom)||1,t=r=>String(Math.min(Math.max(r,.5),3));switch(e.key){case"-":Y.style.zoom=t(n-.1);break;case"=":Y.style.zoom=t(n+.1);break;case"0":Y.style.zoom="1";break;default:return}localStorage.setItem(Ct.previewPageZoomKey,Y.style.zoom),e.preventDefault(),e.stopPropagation()}function L0(){Xo(!1)}async function N0(){const n=(await Rr(!0)).replace("</body>",'<script>window.addEventListener("load",()=>{window.print();});window.addEventListener("afterprint",()=>{window.close();});<\/script></body>'),u=q.MarkEdit.getDirectoryPath("home").replace(/\/Library\/Containers\/[^/]+\/Data\/?$/,"")+"/.markedit-print.html";if(!await q.MarkEdit.createFile({path:u,string:n,overwrites:!0})){await q.MarkEdit.showSavePanel({string:n,fileName:"print-rendered.html"});return}await q.MarkEdit.runService("Open URL","file://"+u)}function O0(){Xo(!0)}async function P0(){const e=await _t(!1);await navigator.clipboard.writeText(e)}async function B0(){const e=await _t(!1),n=new ClipboardItem({"text/html":new Blob([e],{type:"text/html"}),"text/plain":new Blob([Y.innerText],{type:"text/plain"})});await navigator.clipboard.write([n])}function ur(){return q.MarkEdit.editorView.scrollDOM}function Fe(){return Y}async function Rr(e){const n=await _t(!1);return e?await To(n):`<meta charset="UTF-8">
${n}`}async function z0(e,n){const t=await Cr(e,!1);return n?await To(t):`<meta charset="UTF-8">
${t}`}async function _t(e=!0){const n=q.MarkEdit.editorAPI.getText();return await Cr(n,e)}function yu(){const e=getComputedStyle(Y).backgroundColor;vn.style.background=`linear-gradient(to right, transparent 50%, ${e} 50%)`}async function Xo(e){const n=await(async()=>{const r=await q.MarkEdit.getFileInfo();return r===void 0?`${G("untitled")}.html`:`${pi(r.filePath)}.html`})(),t=await Rr(e);q.MarkEdit.showSavePanel({fileName:n,string:t})}async function q0(e){if(!(e.target instanceof Element))return;const n=e.target.closest("a");if(n===null)return;const t=n.getAttribute("href");if(!t?.startsWith("../"))return;const r=(await q.MarkEdit.getFileInfo())?.parentPath;if(r!==void 0){e.preventDefault(),e.stopPropagation();try{const u=nn(r,decodeURIComponent(t));await q.MarkEdit.openFile(u)}catch(u){console.error("Failed to open file:",u)}}}function H0(e){const n=e.target;if(!(n instanceof HTMLInputElement)||!n.classList.contains("task-list-item-checkbox"))return;const t=n.closest("[data-line-from]");if(t===null){console.error("Failed to find task item block");return}const r=q.MarkEdit.editorAPI,u=r.getLineRange(rn(t).from),i=Ns(r.getText(u));if(i===null){n.checked=!n.checked,console.error("Failed to resolve task toggle");return}const l=u.from+i.offset;q.MarkEdit.editorView.dispatch({changes:{from:l,to:l+1,insert:i.replacement},annotations:Ko.of(!0)})}const Ne={viewMode:0,splitter:void 0,wysiwygEditLock:!1};async function or(){if(xn==="never")return;const e=await ei();typeof e.tag_name=="string"&&e.name!=="1.8.2"&&(ri().has(e.name)||(xn==="automatic"&&cr()?await Lr(e.tag_name):xn==="quiet"?(ir.pendingRelease=e,ni(e)):$0(e)))}async function j0(){const e=Date.now(),n=Number(localStorage.getItem(dn.lastCheckCacheKey)??"0");if(!(e-n<2592e5))try{await or(),localStorage.setItem(dn.lastCheckCacheKey,String(e))}catch(t){console.error("Failed to check for updates:",t)}}async function ei(){return await(await fetch(dn.latestReleaseURL)).json()}async function Lr(e){if(typeof __FILE_PATH__!="string")return console.error("Cannot download the latest build: unknown file path"),!1;try{const n=__FILE_PATH__,t="lite/",r=e===void 0?"main":`refs/tags/${encodeURIComponent(e)}`,u=`${dn.rawBaseURL}${r}/dist/${t}markedit-preview.js`,i=await fetch(u);if(!i.ok)return console.error(`Failed to download the latest build from ${u}`),!1;const l=await i.text();return await q.MarkEdit.createFile({path:n,string:l,overwrites:!0})}catch(n){return console.error("Failed to download the latest build:",n),!1}}function ni(e=ir.pendingRelease){if(e===void 0)return;const n=document.querySelector(`.${Ge.updatePillClass}`);if(n!==null){if(n.dataset.releaseName===e.name)return n;n.remove()}const t=document.createElement("button");return t.dataset.releaseName=e.name,t.className=Ge.updatePillClass,t.textContent=G("update"),t.style.display=le()===de.edit?"none":"",t.addEventListener("webkitmouseforcedown",r=>{r.preventDefault()}),t.addEventListener("click",()=>{const{title:r,actions:u}=ti(e,()=>{ir.pendingRelease=void 0,t.remove()}),[i,...l]=u,a=t.getBoundingClientRect(),s={x:a.left,y:a.bottom+10};q.MarkEdit.showContextMenu([{title:r},i,{separator:!0},...l],s)}),document.body.appendChild(t),t}async function $0(e){const{title:n,actions:t}=ti(e),r=await q.MarkEdit.showAlert({title:n,message:e.body,buttons:t.map(u=>u.title)});t[r]?.action?.()}function ti(e,n=()=>{}){const t=`MarkEdit-preview ${e.name} ${G("newVersionAvailable")}`,r=[...cr()?[{title:G("updateAndRelaunch"),action:async()=>{await Lr(e.tag_name)?q.MarkEdit.relaunchApp():q.MarkEdit.showAlert(G("failedToUpdate")),n()}}]:[],{title:G("viewReleasePage"),action:()=>{open(e.html_url),n()}},{title:G("remindMeLater"),action:n},{title:G("skipThisVersion"),action:()=>{const u=ri();u.add(e.name),localStorage.setItem(dn.skippedCacheKey,JSON.stringify([...u])),n()}}];return{title:t,actions:r}}function ri(){const e=localStorage.getItem(dn.skippedCacheKey);return new Set(JSON.parse(e??"[]"))}const dn={latestReleaseURL:"https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest",rawBaseURL:"https://raw.githubusercontent.com/MarkEdit-app/MarkEdit-preview/",lastCheckCacheKey:"updater.last-check-time",skippedCacheKey:"updater.skipped-versions"},ir={pendingRelease:void 0},ar="markedit-preview",xu=`${ar}.js`;function U0(e){const{destExists:n,bundleInfo:t,currentVersion:r}=e,u=t?.version===r,i=t?.fullBuild===!1;return!(n&&u&&i)}async function G0(){try{const e=q.MarkEdit.getDirectoryPath("documents"),n=q.MarkEdit.getDirectoryPath("sharedContainer");if(e===void 0||n===void 0){console.error("Required directories are not accessible");return}const t=typeof __FILE_PATH__=="string"?__FILE_PATH__:nn(e,`scripts/${xu}`);if(await q.MarkEdit.getFileInfo(t)===void 0){console.error(`Source file not found at ${t}`);return}const u=t.split("/").pop()??xu,i=nn(n,"Shared/scripts"),l=nn(i,u),a=await q.MarkEdit.getFileInfo(l)!==void 0,s=nn(n,"Shared/metadata.json"),d=await mi(s),b=d[ar];if(!U0({destExists:a,bundleInfo:b,currentVersion:"1.8.2"}))return;const c=await q.MarkEdit.getFileContent(t);if(c===void 0){console.error(`Failed to read content from ${t}`);return}await q.MarkEdit.createFile({path:i,isDirectory:!0}),await q.MarkEdit.createFile({path:l,string:c,overwrites:!0}),await q.MarkEdit.createFile({path:s,string:JSON.stringify({...d,[ar]:{version:"1.8.2",fullBuild:!1}},null,2),overwrites:!0})}catch(e){console.error("Failed to copy the current file to shared container:",e)}}const V0='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M6.2 2.5 4.4 13.5M11.6 2.5 9.8 13.5M2.5 5.7h11M2.5 10.3h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>',W0='<svg viewBox="0 0 16 16" aria-hidden="true"><g transform="translate(0 -0.5)"><path d="M1 8c2-3.5 4.5-5 7-5s5 1.5 7 5c-2 3.5-4.5 5-7 5s-5-1.5-7-5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></g></svg>';function Z0(){const e=wu(G("source"),V0),n=wu(G("preview"),W0),t=document.createElement("div");t.className="quicklook-segmented",t.setAttribute("role","tablist"),t.append(e,n);const r=document.createElement("div");return r.className="quicklook-toolbar",r.appendChild(t),{toolbar:r,sourceButton:e,previewButton:n}}function wu(e,n){const t=document.createElement("button");t.title=e,t.type="button",t.className="quicklook-segment",t.setAttribute("role","tab"),t.setAttribute("aria-label",e);const r=document.createElement("span");r.textContent=e,r.className="quicklook-segment-label";const u=document.createElement("span");return u.innerHTML=n,u.className="quicklook-segment-icon",t.append(r,u),t}function Qe(){if(Xe!==void 0)return Xe;try{Xe=localStorage.getItem(ui)==="preview"?"preview":"source"}catch{console.error("Failed to read quick look mode from localStorage"),Xe="source"}return Xe}function vu(e){Xe=e;try{localStorage.setItem(ui,e)}catch{console.error("Failed to write quick look mode to localStorage")}}let Xe;const ui="ui.quicklook-mode";function Y0(){const e=window,n=e.editor?.state?.doc.toString();return typeof n=="string"?n:(console.error("Failed to get text from host editor state"),e.config?.text??"")}function K0(){document.addEventListener("webkitmouseforcewillbegin",e=>{const n=e.target;n instanceof Element&&n.closest("a")!==null&&e.preventDefault()})}function J0(e,n){const t=window,r=t.pinchZoomTarget;t.pinchZoomTarget=()=>{if(e()!=="preview")return r?.()??null;const u=n.querySelector(".quicklook-content");return u!==null?{scroller:n,inner:u}:null};for(const u of["gesturechange","gestureend"])document.addEventListener(u,()=>{if(e()!=="preview")return;const i=n.querySelector(".quicklook-content");i?.style.zoom.length?i?.style.setProperty("--quicklook-zoom",i.style.zoom):i?.style.removeProperty("--quicklook-zoom")},{passive:!1})}function Q0(e,n){let t;const r=window,u={start:r.startDragging,update:r.updateDragging,cancel:r.cancelDragging},i=()=>{const a=n.clientHeight,s=n.scrollHeight,d=s-a;if(d<=0||s<=0)return{clientHeight:a,scrollHeight:s,scrollbarHeight:a,scrollbarTop:0};const b=a*(a/s),f=n.scrollTop/d*(a-b);return{clientHeight:a,scrollHeight:s,scrollbarHeight:b,scrollbarTop:f}},l=(a,s,d="auto")=>{const{clientHeight:b,scrollHeight:c,scrollbarHeight:f}=i(),p=b-f;if(p>0){const m=(a-s)/p;n.scrollTo({top:m*(c-b),behavior:d})}};r.startDragging=a=>{if(e()!=="preview"){u.start?.(a);return}const{scrollbarTop:s,scrollbarHeight:d}=i(),b=Cu(n,a);t=b-s,(b<s||b>s+d)&&l(b,d*.5,"smooth")},r.updateDragging=a=>{if(e()!=="preview"){u.update?.(a);return}t!==void 0&&l(Cu(n,a),t)},r.cancelDragging=()=>{if(e()!=="preview"){u.cancel?.();return}t=void 0}}function X0(e,n,t){t.addEventListener("wheel",r=>{const u=e()==="preview"?n:document.querySelector(".cm-scroller");u!==null&&(u.scrollTop+=r.deltaY,u.scrollLeft+=r.deltaX,r.preventDefault())},{passive:!1})}function ed(e,n,t){const r=document.querySelector(".cm-scroller"),u=()=>{const l=(e()==="preview"?n:r)?.scrollTop??0;t.classList.toggle("scrolled",l>0),t.classList.toggle("scrolled-far",l>20)};return n.addEventListener("scroll",u,{passive:!0}),r?.addEventListener("scroll",u,{passive:!0}),u}function nd(e){document.addEventListener("copy",n=>{if(!e.classList.contains("overlay"))return;const t=getSelection(),r=t!==null&&t.rangeCount>0?t.getRangeAt(0):null,u=r!==null&&!r.collapsed&&e.contains(r.commonAncestorContainer)?r:null,i=u??(()=>{const a=document.createRange();return a.selectNodeContents(e),a})(),l=document.createElement("div");l.appendChild(i.cloneContents()),n.clipboardData?.setData("text/html",l.innerHTML),n.clipboardData?.setData("text/plain",u!==null?u.toString():e.innerText),n.preventDefault(),n.stopPropagation()},!0)}function Cu(e,n){return n-e.getBoundingClientRect().top}const td=`body {
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
`;function rd(e){en(td),document.body.classList.add("quicklook");const{toolbar:n,sourceButton:t,previewButton:r}=Z0();document.body.appendChild(n);const u=ud(e),i=ed(Qe,e,n),l={previewPane:e,sourceButton:t,previewButton:r,refreshSeparator:i,ensureRendered:u.ensureRendered};t.addEventListener("click",()=>{vu("source"),Zt(l)}),r.addEventListener("click",()=>{vu("preview"),Zt(l)}),Zt(l),setTimeout(u.ensureRendered,0),matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e.querySelector(".mermaid")!==null&&(u.invalidate(),Qe()==="preview"&&u.ensureRendered())}),K0(),J0(Qe,e),Q0(Qe,e),X0(Qe,e,n),nd(e)}function Zt(e){const n=Qe()==="source",t=!n;e.sourceButton.classList.toggle("active",n),e.previewButton.classList.toggle("active",t),e.sourceButton.setAttribute("aria-selected",String(n)),e.previewButton.setAttribute("aria-selected",String(t)),e.previewPane.classList.toggle("overlay",t),e.refreshSeparator(),t&&e.ensureRendered()}function ud(e){let n=!1,t;return{ensureRendered:()=>(n||t||(t=(async()=>{try{const i=Fo(await Cr(Y0(),!1));e.innerHTML=`<div class="quicklook-content">${i}</div>`,e.querySelectorAll("a[href]").forEach(l=>{l.removeAttribute("href"),l.removeAttribute("target")}),Do(()=>{}),n=!0}catch(i){throw t=void 0,i}})()),t),invalidate:()=>{n=!1,t=void 0}}}var rt={exports:{}};var od=rt.exports,_u;function id(){return _u||(_u=1,(function(e,n){(function(t,r){e.exports=r()})(od,(function(){var t=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(d){return typeof d}:function(d){return d&&typeof Symbol=="function"&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d},r=function(d,b){if(!(d instanceof b))throw new TypeError("Cannot call a class as a function")},u=(function(){function d(b,c){for(var f=0;f<c.length;f++){var p=c[f];p.enumerable=p.enumerable||!1,p.configurable=!0,"value"in p&&(p.writable=!0),Object.defineProperty(b,p.key,p)}}return function(b,c,f){return c&&d(b.prototype,c),f&&d(b,f),b}})(),i=Object.assign||function(d){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var f in c)Object.prototype.hasOwnProperty.call(c,f)&&(d[f]=c[f])}return d},l=(function(){function d(b){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],p=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;r(this,d),this.ctx=b,this.iframes=c,this.exclude=f,this.iframesTimeout=p}return u(d,[{key:"getContexts",value:function(){var c=void 0,f=[];return typeof this.ctx>"u"||!this.ctx?c=[]:NodeList.prototype.isPrototypeOf(this.ctx)?c=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?c=this.ctx:typeof this.ctx=="string"?c=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):c=[this.ctx],c.forEach(function(p){var m=f.filter(function(g){return g.contains(p)}).length>0;f.indexOf(p)===-1&&!m&&f.push(p)}),f}},{key:"getIframeContents",value:function(c,f){var p=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},m=void 0;try{var g=c.contentWindow;if(m=g.document,!g||!m)throw new Error("iframe inaccessible")}catch{p()}m&&f(m)}},{key:"isIframeBlank",value:function(c){var f="about:blank",p=c.getAttribute("src").trim(),m=c.contentWindow.location.href;return m===f&&p!==f&&p}},{key:"observeIframeLoad",value:function(c,f,p){var m=this,g=!1,k=null,y=function v(){if(!g){g=!0,clearTimeout(k);try{m.isIframeBlank(c)||(c.removeEventListener("load",v),m.getIframeContents(c,f,p))}catch{p()}}};c.addEventListener("load",y),k=setTimeout(y,this.iframesTimeout)}},{key:"onIframeReady",value:function(c,f,p){try{c.contentWindow.document.readyState==="complete"?this.isIframeBlank(c)?this.observeIframeLoad(c,f,p):this.getIframeContents(c,f,p):this.observeIframeLoad(c,f,p)}catch{p()}}},{key:"waitForIframes",value:function(c,f){var p=this,m=0;this.forEachIframe(c,function(){return!0},function(g){m++,p.waitForIframes(g.querySelector("html"),function(){--m||f()})},function(g){g||f()})}},{key:"forEachIframe",value:function(c,f,p){var m=this,g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},k=c.querySelectorAll("iframe"),y=k.length,v=0;k=Array.prototype.slice.call(k);var E=function(){--y<=0&&g(v)};y||E(),k.forEach(function(A){d.matches(A,m.exclude)?E():m.onIframeReady(A,function(R){f(A)&&(v++,p(R)),E()},E)})}},{key:"createIterator",value:function(c,f,p){return document.createNodeIterator(c,f,p,!1)}},{key:"createInstanceOnIframe",value:function(c){return new d(c.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(c,f,p){var m=c.compareDocumentPosition(p),g=Node.DOCUMENT_POSITION_PRECEDING;if(m&g)if(f!==null){var k=f.compareDocumentPosition(p),y=Node.DOCUMENT_POSITION_FOLLOWING;if(k&y)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(c){var f=c.previousNode(),p=void 0;return f===null?p=c.nextNode():p=c.nextNode()&&c.nextNode(),{prevNode:f,node:p}}},{key:"checkIframeFilter",value:function(c,f,p,m){var g=!1,k=!1;return m.forEach(function(y,v){y.val===p&&(g=v,k=y.handled)}),this.compareNodeIframe(c,f,p)?(g===!1&&!k?m.push({val:p,handled:!0}):g!==!1&&!k&&(m[g].handled=!0),!0):(g===!1&&m.push({val:p,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(c,f,p,m){var g=this;c.forEach(function(k){k.handled||g.getIframeContents(k.val,function(y){g.createInstanceOnIframe(y).forEachNode(f,p,m)})})}},{key:"iterateThroughNodes",value:function(c,f,p,m,g){for(var k=this,y=this.createIterator(f,c,m),v=[],E=[],A=void 0,R=void 0,N=function(){var U=k.getIteratorNode(y);return R=U.prevNode,A=U.node,A};N();)this.iframes&&this.forEachIframe(f,function(j){return k.checkIframeFilter(A,R,j,v)},function(j){k.createInstanceOnIframe(j).forEachNode(c,function(U){return E.push(U)},m)}),E.push(A);E.forEach(function(j){p(j)}),this.iframes&&this.handleOpenIframes(v,c,p,m),g()}},{key:"forEachNode",value:function(c,f,p){var m=this,g=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},k=this.getContexts(),y=k.length;y||g(),k.forEach(function(v){var E=function(){m.iterateThroughNodes(c,v,f,p,function(){--y<=0&&g()})};m.iframes?m.waitForIframes(v,E):E()})}}],[{key:"matches",value:function(c,f){var p=typeof f=="string"?[f]:f,m=c.matches||c.matchesSelector||c.msMatchesSelector||c.mozMatchesSelector||c.oMatchesSelector||c.webkitMatchesSelector;if(m){var g=!1;return p.every(function(k){return m.call(c,k)?(g=!0,!1):!0}),g}else return!1}}]),d})(),a=(function(){function d(b){r(this,d),this.ctx=b,this.ie=!1;var c=window.navigator.userAgent;(c.indexOf("MSIE")>-1||c.indexOf("Trident")>-1)&&(this.ie=!0)}return u(d,[{key:"log",value:function(c){var f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",p=this.opt.log;this.opt.debug&&(typeof p>"u"?"undefined":t(p))==="object"&&typeof p[f]=="function"&&p[f]("mark.js: "+c)}},{key:"escapeStr",value:function(c){return c.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(c){return this.opt.wildcards!=="disabled"&&(c=this.setupWildcardsRegExp(c)),c=this.escapeStr(c),Object.keys(this.opt.synonyms).length&&(c=this.createSynonymsRegExp(c)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.setupIgnoreJoinersRegExp(c)),this.opt.diacritics&&(c=this.createDiacriticsRegExp(c)),c=this.createMergedBlanksRegExp(c),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.createJoinersRegExp(c)),this.opt.wildcards!=="disabled"&&(c=this.createWildcardsRegExp(c)),c=this.createAccuracyRegExp(c),c}},{key:"createSynonymsRegExp",value:function(c){var f=this.opt.synonyms,p=this.opt.caseSensitive?"":"i",m=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var g in f)if(f.hasOwnProperty(g)){var k=f[g],y=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(g):this.escapeStr(g),v=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(k):this.escapeStr(k);y!==""&&v!==""&&(c=c.replace(new RegExp("("+this.escapeStr(y)+"|"+this.escapeStr(v)+")","gm"+p),m+("("+this.processSynomyms(y)+"|")+(this.processSynomyms(v)+")")+m))}return c}},{key:"processSynomyms",value:function(c){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(c=this.setupIgnoreJoinersRegExp(c)),c}},{key:"setupWildcardsRegExp",value:function(c){return c=c.replace(/(?:\\)*\?/g,function(f){return f.charAt(0)==="\\"?"?":""}),c.replace(/(?:\\)*\*/g,function(f){return f.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(c){var f=this.opt.wildcards==="withSpaces";return c.replace(/\u0001/g,f?"[\\S\\s]?":"\\S?").replace(/\u0002/g,f?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(c){return c.replace(/[^(|)\\]/g,function(f,p,m){var g=m.charAt(p+1);return/[(|)\\]/.test(g)||g===""?f:f+"\0"})}},{key:"createJoinersRegExp",value:function(c){var f=[],p=this.opt.ignorePunctuation;return Array.isArray(p)&&p.length&&f.push(this.escapeStr(p.join(""))),this.opt.ignoreJoiners&&f.push("\\u00ad\\u200b\\u200c\\u200d"),f.length?c.split(/\u0000+/).join("["+f.join("")+"]*"):c}},{key:"createDiacriticsRegExp",value:function(c){var f=this.opt.caseSensitive?"":"i",p=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],m=[];return c.split("").forEach(function(g){p.every(function(k){if(k.indexOf(g)!==-1){if(m.indexOf(k)>-1)return!1;c=c.replace(new RegExp("["+k+"]","gm"+f),"["+k+"]"),m.push(k)}return!0})}),c}},{key:"createMergedBlanksRegExp",value:function(c){return c.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(c){var f=this,p="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",m=this.opt.accuracy,g=typeof m=="string"?m:m.value,k=typeof m=="string"?[]:m.limiters,y="";switch(k.forEach(function(v){y+="|"+f.escapeStr(v)}),g){case"partially":default:return"()("+c+")";case"complementary":return y="\\s"+(y||this.escapeStr(p)),"()([^"+y+"]*"+c+"[^"+y+"]*)";case"exactly":return"(^|\\s"+y+")("+c+")(?=$|\\s"+y+")"}}},{key:"getSeparatedKeywords",value:function(c){var f=this,p=[];return c.forEach(function(m){f.opt.separateWordSearch?m.split(" ").forEach(function(g){g.trim()&&p.indexOf(g)===-1&&p.push(g)}):m.trim()&&p.indexOf(m)===-1&&p.push(m)}),{keywords:p.sort(function(m,g){return g.length-m.length}),length:p.length}}},{key:"isNumeric",value:function(c){return Number(parseFloat(c))==c}},{key:"checkRanges",value:function(c){var f=this;if(!Array.isArray(c)||Object.prototype.toString.call(c[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(c),[];var p=[],m=0;return c.sort(function(g,k){return g.start-k.start}).forEach(function(g){var k=f.callNoMatchOnInvalidRanges(g,m),y=k.start,v=k.end,E=k.valid;E&&(g.start=y,g.length=v-y,p.push(g),m=v)}),p}},{key:"callNoMatchOnInvalidRanges",value:function(c,f){var p=void 0,m=void 0,g=!1;return c&&typeof c.start<"u"?(p=parseInt(c.start,10),m=p+parseInt(c.length,10),this.isNumeric(c.start)&&this.isNumeric(c.length)&&m-f>0&&m-p>0?g=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(c))),this.opt.noMatch(c))):(this.log("Ignoring invalid range: "+JSON.stringify(c)),this.opt.noMatch(c)),{start:p,end:m,valid:g}}},{key:"checkWhitespaceRanges",value:function(c,f,p){var m=void 0,g=!0,k=p.length,y=f-k,v=parseInt(c.start,10)-y;return v=v>k?k:v,m=v+parseInt(c.length,10),m>k&&(m=k,this.log("End range automatically set to the max value of "+k)),v<0||m-v<0||v>k||m>k?(g=!1,this.log("Invalid range: "+JSON.stringify(c)),this.opt.noMatch(c)):p.substring(v,m).replace(/\s+/g,"")===""&&(g=!1,this.log("Skipping whitespace only range: "+JSON.stringify(c)),this.opt.noMatch(c)),{start:v,end:m,valid:g}}},{key:"getTextNodes",value:function(c){var f=this,p="",m=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(g){m.push({start:p.length,end:(p+=g.textContent).length,node:g})},function(g){return f.matchesExclude(g.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){c({value:p,nodes:m})})}},{key:"matchesExclude",value:function(c){return l.matches(c,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(c,f,p){var m=this.opt.element?this.opt.element:"mark",g=c.splitText(f),k=g.splitText(p-f),y=document.createElement(m);return y.setAttribute("data-markjs","true"),this.opt.className&&y.setAttribute("class",this.opt.className),y.textContent=g.textContent,g.parentNode.replaceChild(y,g),k}},{key:"wrapRangeInMappedTextNode",value:function(c,f,p,m,g){var k=this;c.nodes.every(function(y,v){var E=c.nodes[v+1];if(typeof E>"u"||E.start>f){if(!m(y.node))return!1;var A=f-y.start,R=(p>y.end?y.end:p)-y.start,N=c.value.substr(0,y.start),j=c.value.substr(R+y.start);if(y.node=k.wrapRangeInTextNode(y.node,A,R),c.value=N+j,c.nodes.forEach(function(U,Q){Q>=v&&(c.nodes[Q].start>0&&Q!==v&&(c.nodes[Q].start-=R),c.nodes[Q].end-=R)}),p-=R,g(y.node.previousSibling,y.start),p>y.end)f=y.end;else return!1}return!0})}},{key:"wrapMatches",value:function(c,f,p,m,g){var k=this,y=f===0?0:f+1;this.getTextNodes(function(v){v.nodes.forEach(function(E){E=E.node;for(var A=void 0;(A=c.exec(E.textContent))!==null&&A[y]!=="";)if(p(A[y],E)){var R=A.index;if(y!==0)for(var N=1;N<y;N++)R+=A[N].length;E=k.wrapRangeInTextNode(E,R,R+A[y].length),m(E.previousSibling),c.lastIndex=0}}),g()})}},{key:"wrapMatchesAcrossElements",value:function(c,f,p,m,g){var k=this,y=f===0?0:f+1;this.getTextNodes(function(v){for(var E=void 0;(E=c.exec(v.value))!==null&&E[y]!=="";){var A=E.index;if(y!==0)for(var R=1;R<y;R++)A+=E[R].length;var N=A+E[y].length;k.wrapRangeInMappedTextNode(v,A,N,function(j){return p(E[y],j)},function(j,U){c.lastIndex=U,m(j)})}g()})}},{key:"wrapRangeFromIndex",value:function(c,f,p,m){var g=this;this.getTextNodes(function(k){var y=k.value.length;c.forEach(function(v,E){var A=g.checkWhitespaceRanges(v,y,k.value),R=A.start,N=A.end,j=A.valid;j&&g.wrapRangeInMappedTextNode(k,R,N,function(U){return f(U,v,k.value.substring(R,N),E)},function(U){p(U,v)})}),m()})}},{key:"unwrapMatches",value:function(c){for(var f=c.parentNode,p=document.createDocumentFragment();c.firstChild;)p.appendChild(c.removeChild(c.firstChild));f.replaceChild(p,c),this.ie?this.normalizeTextNode(f):f.normalize()}},{key:"normalizeTextNode",value:function(c){if(c){if(c.nodeType===3)for(;c.nextSibling&&c.nextSibling.nodeType===3;)c.nodeValue+=c.nextSibling.nodeValue,c.parentNode.removeChild(c.nextSibling);else this.normalizeTextNode(c.firstChild);this.normalizeTextNode(c.nextSibling)}}},{key:"markRegExp",value:function(c,f){var p=this;this.opt=f,this.log('Searching with expression "'+c+'"');var m=0,g="wrapMatches",k=function(v){m++,p.opt.each(v)};this.opt.acrossElements&&(g="wrapMatchesAcrossElements"),this[g](c,this.opt.ignoreGroups,function(y,v){return p.opt.filter(v,y,m)},k,function(){m===0&&p.opt.noMatch(c),p.opt.done(m)})}},{key:"mark",value:function(c,f){var p=this;this.opt=f;var m=0,g="wrapMatches",k=this.getSeparatedKeywords(typeof c=="string"?[c]:c),y=k.keywords,v=k.length,E=this.opt.caseSensitive?"":"i",A=function R(N){var j=new RegExp(p.createRegExp(N),"gm"+E),U=0;p.log('Searching with expression "'+j+'"'),p[g](j,1,function(Q,ce){return p.opt.filter(ce,N,m,U)},function(Q){U++,m++,p.opt.each(Q)},function(){U===0&&p.opt.noMatch(N),y[v-1]===N?p.opt.done(m):R(y[y.indexOf(N)+1])})};this.opt.acrossElements&&(g="wrapMatchesAcrossElements"),v===0?this.opt.done(m):A(y[0])}},{key:"markRanges",value:function(c,f){var p=this;this.opt=f;var m=0,g=this.checkRanges(c);g&&g.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(g)),this.wrapRangeFromIndex(g,function(k,y,v,E){return p.opt.filter(k,y,v,E)},function(k,y){m++,p.opt.each(k,y)},function(){p.opt.done(m)})):this.opt.done(m)}},{key:"unmark",value:function(c){var f=this;this.opt=c;var p=this.opt.element?this.opt.element:"*";p+="[data-markjs]",this.opt.className&&(p+="."+this.opt.className),this.log('Removal selector "'+p+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(m){f.unwrapMatches(m)},function(m){var g=l.matches(m,p),k=f.matchesExclude(m);return!g||k?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(c){this._opt=i({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},c)},get:function(){return this._opt}},{key:"iterator",get:function(){return new l(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),d})();function s(d){var b=this,c=new a(d);return this.mark=function(f,p){return c.mark(f,p),b},this.markRegExp=function(f,p){return c.markRegExp(f,p),b},this.markRanges=function(f,p){return c.markRanges(f,p),b},this.unmark=function(f){return c.unmark(f),b},this}return s}))})(rt)),rt.exports}var ad=id();const oi=yt(ad),Cn="markedit-preview-mark",ii="markedit-preview-mark-highlighted";let yn=!1,Nr,Te=0,me=[],_n=null,nt=null;const Eu={github:{light:"#fae17d7f",dark:"#f2cc607f"},cobalt:{light:"#cad40f66",dark:"#cad40f66"},dracula:{light:"#ffffff40",dark:"#ffffff40"},minimal:{light:"#fae17d7f",dark:"#f2cc607f"},"night-owl":{light:"#5f7e9779",dark:"#5f7e9779"},"rose-pine":{light:"#6e6a864c",dark:"#6e6a8666"},solarized:{light:"#f4c09d",dark:"#584032"},synthwave84:{light:"#d18616bb",dark:"#d18616bb"},"winter-is-coming":{light:"#cee1f0",dark:"#103362"},xcode:{light:"#e4e4e4",dark:"#545558"}};function ld(e){if(Nr=e,Te=0,e.search.length===0){ai();return}const n=Fe();li(n),dd(n)}function cd(e){me.length!==0&&(Te=e%me.length,ci())}function ai(){_n?.disconnect(),_n=null,Nr=void 0,Te=0,me=[],new oi(Fe()).unmark()}function sd(){if(le()===de.preview)return{numberOfItems:me.length,currentIndex:Te}}function li(e){const n=Nr;if(n===void 0||n.search.length===0||yn)return;fd(),yn=!0;const{search:t,caseSensitive:r,wholeWord:u,diacriticInsensitive:i,regexp:l}=n,a=new oi(e),s=()=>{me=Array.from(e.querySelectorAll(`.${Cn}`)),Te=me.length>0?Math.min(Te,me.length-1):0,ci(),yn=!1};a.unmark({done:()=>{if(l)try{const d=r?"":"i";a.markRegExp(new RegExp(t,d),{className:Cn,done:s})}catch{yn=!1,Te=0,me=[]}else a.mark(t,{className:Cn,caseSensitive:r,diacritics:i,separateWordSearch:!1,accuracy:u?"exactly":"partially",done:s})}})}function ci(){const e=le()!==de.sideBySide;me.forEach((n,t)=>{n.classList.toggle(ii,e&&t===Te)}),e&&me.length>0&&me[Te].scrollIntoView({behavior:"smooth",block:"center"})}function dd(e){_n?.disconnect(),_n=new MutationObserver(()=>{yn||li(e)}),_n.observe(e,{childList:!0})}function fd(){nt===null&&(nt=document.createElement("style"),document.head.appendChild(nt));const{light:e,dark:n}=Eu[xt]??Eu.github;nt.textContent=[`.${Cn} { background: ${e} !important; color: inherit !important; }`,`.${ii} { background: #ffff00 !important; color: #000000 !important; border-radius: 2px; box-shadow: 0px 0px 0px 2px #ffff00, 0px 0px 3px 2px rgba(0, 0, 0, 0.4); }`,"@media (prefers-color-scheme: dark) {",`  .${Cn} { background: ${n} !important; }`,"}"].join(`
`)}window.__markeditPreviewInitialized__?console.error("MarkEdit Preview has already been initialized. Multiple initializations may cause unexpected behavior."):(T0(),vr()?(typeof q.MarkEdit.onAppReady=="function"?q.MarkEdit.onAppReady(()=>{G0(),setTimeout(()=>{or()},2e3),md()}):setTimeout(()=>{j0()},4e3),(xn==="automatic"||xn==="quiet")&&setInterval(()=>{or()},6048e5)):rd(Fe()),window.__markeditPreviewInitialized__=!0);window.MarkEditGetHtml??=Rr;window.MarkEditRenderHtml??=z0;window.__markeditPreviewSPI__={performSearch:ld,setSearchMatchIndex:cd,clearSearch:ai,searchCounterInfo:sd};vr()&&(q.MarkEdit.addMainMenuItem({title:G("viewMode"),icon:fi()?"eye":void 0,children:[{title:G("changeMode"),action:()=>{F0(),lr()},key:cu.key??"V",modifiers:cu.modifiers??["Command"]},{separator:!0},Yt(G("editMode"),de.edit),Yt(G("sideBySideMode"),de.sideBySide),Yt(G("previewMode"),de.preview),{separator:!0},...hd(),{separator:!0},{title:"WYSIWYG Editing",action:pd,state:()=>({isSelected:Ir()})},{separator:!0},{title:`${G("version")} 1.8.2`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/tag/v1.8.2")},{title:`${G("checkReleases")} (GitHub)`,action:()=>open("https://github.com/MarkEdit-app/MarkEdit-preview/releases/latest")},...cr()?[{title:G("updateAndRelaunch"),action:async()=>{const e=await ei();await Lr(e.tag_name)?q.MarkEdit.relaunchApp():q.MarkEdit.showAlert(G("failedToUpdate"))}}]:[]]}),q.MarkEdit.addExtension(si.EditorView.updateListener.of(e=>{e.docChanged&&(e.transactions.every(n=>n.annotation(Ko))||(He.renderUpdater!==void 0&&clearTimeout(He.renderUpdater),He.renderUpdater=setTimeout(In,500)))})),q.MarkEdit.onEditorReady(()=>{$c&&_s(q.MarkEdit.editorView.scrollDOM),M0(),requestAnimationFrame(async()=>{document.visibilityState==="visible"&&le()===de.preview&&typeof q.MarkEdit.getFileInfo=="function"&&(await q.MarkEdit.getFileInfo())?.filePath===void 0&&q.MarkEdit.editorAPI.getText().length===0&&qn(de.edit,!1)}),In(),lr(),Ds(ur(),Fe()),Go(),He.keyDownListener!==void 0&&document.removeEventListener("keydown",He.keyDownListener),He.keyDownListener=e=>R0(e),document.addEventListener("keydown",He.keyDownListener)}));function pd(){Ir()?k0():(le()===de.edit&&qn(de.sideBySide,!0),Go())}function Yt(e,n){return{title:e,action:()=>{qn(n),lr()},state:()=>({isSelected:le()===n})}}function hd(){const e=[{title:G("copyHtml"),action:P0},{title:G("copyRichText"),action:B0}];return typeof q.MarkEdit.showSavePanel>"u"?e:[{title:G("saveCleanHtml"),action:L0},{title:G("saveStyledHtml"),action:O0},{title:G("printRendered"),action:N0},...e]}function lr(){const e=ni();e!==void 0&&(e.style.display=le()===de.edit?"none":"")}const bd="1.8.0";async function md(){try{const e=await fetch("https://api.github.com/repos/MarkEdit-app/MarkEdit-preview/releases/latest");if(!e.ok)return;const t=(await e.json()).tag_name.replace(/^v/,""),r=`fork-upstream-notified-${t}`;t>bd&&localStorage.getItem(r)===null&&(localStorage.setItem(r,"1"),await q.MarkEdit.showAlert({title:`Upstream MarkEdit-preview ${t} Available`,message:`The upstream shipped v${t}. Say "update markedit" in Cowork or run:
  cd ~/Developer/markedit-preview && bash update.sh`,buttons:["Got it"]}))}catch{}}const He={renderUpdater:void 0,keyDownListener:void 0};
