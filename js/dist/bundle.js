/*! For license information please see bundle.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.dnsspatialdiscovery=e():t.dnsspatialdiscovery=e()}(self,(()=>(()=>{var t={4:function(t,e){var i,r;void 0===(r="function"==typeof(i=function(){"use strict";function t(t,e,i){this.low=0|t,this.high=0|e,this.unsigned=!!i}function e(t){return!0===(t&&t.__isLong__)}t.prototype.__isLong__,Object.defineProperty(t.prototype,"__isLong__",{value:!0,enumerable:!1,configurable:!1}),t.isLong=e;var i={},r={};function n(t,e){var n,o,a;return e?(a=0<=(t>>>=0)&&t<256)&&(o=r[t])?o:(n=s(t,(0|t)<0?-1:0,!0),a&&(r[t]=n),n):(a=-128<=(t|=0)&&t<128)&&(o=i[t])?o:(n=s(t,t<0?-1:0,!1),a&&(i[t]=n),n)}function o(t,e){if(isNaN(t)||!isFinite(t))return e?v:d;if(e){if(t<0)return v;if(t>=g)return S}else{if(t<=-c)return L;if(t+1>=c)return y}return t<0?o(-t,e).neg():s(t%l|0,t/l|0,e)}function s(e,i,r){return new t(e,i,r)}t.fromInt=n,t.fromNumber=o,t.fromBits=s;var a=Math.pow;function h(t,e,i){if(0===t.length)throw Error("empty string");if("NaN"===t||"Infinity"===t||"+Infinity"===t||"-Infinity"===t)return d;if("number"==typeof e?(i=e,e=!1):e=!!e,(i=i||10)<2||36<i)throw RangeError("radix");var r;if((r=t.indexOf("-"))>0)throw Error("interior hyphen");if(0===r)return h(t.substring(1),e,i).neg();for(var n=o(a(i,8)),s=d,u=0;u<t.length;u+=8){var l=Math.min(8,t.length-u),g=parseInt(t.substring(u,u+l),i);if(l<8){var c=o(a(i,l));s=s.mul(c).add(o(g))}else s=(s=s.mul(n)).add(o(g))}return s.unsigned=e,s}function u(e){return e instanceof t?e:"number"==typeof e?o(e):"string"==typeof e?h(e):s(e.low,e.high,e.unsigned)}t.fromString=h,t.fromValue=u;var l=4294967296,g=l*l,c=g/2,f=n(1<<24),d=n(0);t.ZERO=d;var v=n(0,!0);t.UZERO=v;var p=n(1);t.ONE=p;var m=n(1,!0);t.UONE=m;var T=n(-1);t.NEG_ONE=T;var y=s(-1,2147483647,!1);t.MAX_VALUE=y;var S=s(-1,-1,!0);t.MAX_UNSIGNED_VALUE=S;var L=s(0,-2147483648,!1);t.MIN_VALUE=L;var b=t.prototype;return b.toInt=function(){return this.unsigned?this.low>>>0:this.low},b.toNumber=function(){return this.unsigned?(this.high>>>0)*l+(this.low>>>0):this.high*l+(this.low>>>0)},b.toString=function(t){if((t=t||10)<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative()){if(this.eq(L)){var e=o(t),i=this.div(e),r=i.mul(e).sub(this);return i.toString(t)+r.toInt().toString(t)}return"-"+this.neg().toString(t)}for(var n=o(a(t,6),this.unsigned),s=this,h="";;){var u=s.div(n),l=(s.sub(u.mul(n)).toInt()>>>0).toString(t);if((s=u).isZero())return l+h;for(;l.length<6;)l="0"+l;h=""+l+h}},b.getHighBits=function(){return this.high},b.getHighBitsUnsigned=function(){return this.high>>>0},b.getLowBits=function(){return this.low},b.getLowBitsUnsigned=function(){return this.low>>>0},b.getNumBitsAbs=function(){if(this.isNegative())return this.eq(L)?64:this.neg().getNumBitsAbs();for(var t=0!=this.high?this.high:this.low,e=31;e>0&&!(t&1<<e);e--);return 0!=this.high?e+33:e+1},b.isZero=function(){return 0===this.high&&0===this.low},b.isNegative=function(){return!this.unsigned&&this.high<0},b.isPositive=function(){return this.unsigned||this.high>=0},b.isOdd=function(){return!(1&~this.low)},b.isEven=function(){return!(1&this.low)},b.equals=function(t){return e(t)||(t=u(t)),(this.unsigned===t.unsigned||this.high>>>31!=1||t.high>>>31!=1)&&this.high===t.high&&this.low===t.low},b.eq=b.equals,b.notEquals=function(t){return!this.eq(t)},b.neq=b.notEquals,b.lessThan=function(t){return this.comp(t)<0},b.lt=b.lessThan,b.lessThanOrEqual=function(t){return this.comp(t)<=0},b.lte=b.lessThanOrEqual,b.greaterThan=function(t){return this.comp(t)>0},b.gt=b.greaterThan,b.greaterThanOrEqual=function(t){return this.comp(t)>=0},b.gte=b.greaterThanOrEqual,b.compare=function(t){if(e(t)||(t=u(t)),this.eq(t))return 0;var i=this.isNegative(),r=t.isNegative();return i&&!r?-1:!i&&r?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t).isNegative()?-1:1},b.comp=b.compare,b.negate=function(){return!this.unsigned&&this.eq(L)?L:this.not().add(p)},b.neg=b.negate,b.add=function(t){e(t)||(t=u(t));var i=this.high>>>16,r=65535&this.high,n=this.low>>>16,o=65535&this.low,a=t.high>>>16,h=65535&t.high,l=t.low>>>16,g=0,c=0,f=0,d=0;return f+=(d+=o+(65535&t.low))>>>16,c+=(f+=n+l)>>>16,g+=(c+=r+h)>>>16,g+=i+a,s((f&=65535)<<16|(d&=65535),(g&=65535)<<16|(c&=65535),this.unsigned)},b.subtract=function(t){return e(t)||(t=u(t)),this.add(t.neg())},b.sub=b.subtract,b.multiply=function(t){if(this.isZero())return d;if(e(t)||(t=u(t)),t.isZero())return d;if(this.eq(L))return t.isOdd()?L:d;if(t.eq(L))return this.isOdd()?L:d;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt(f)&&t.lt(f))return o(this.toNumber()*t.toNumber(),this.unsigned);var i=this.high>>>16,r=65535&this.high,n=this.low>>>16,a=65535&this.low,h=t.high>>>16,l=65535&t.high,g=t.low>>>16,c=65535&t.low,v=0,p=0,m=0,T=0;return m+=(T+=a*c)>>>16,p+=(m+=n*c)>>>16,m&=65535,p+=(m+=a*g)>>>16,v+=(p+=r*c)>>>16,p&=65535,v+=(p+=n*g)>>>16,p&=65535,v+=(p+=a*l)>>>16,v+=i*c+r*g+n*l+a*h,s((m&=65535)<<16|(T&=65535),(v&=65535)<<16|(p&=65535),this.unsigned)},b.mul=b.multiply,b.divide=function(t){if(e(t)||(t=u(t)),t.isZero())throw Error("division by zero");if(this.isZero())return this.unsigned?v:d;var i,r,n;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return v;if(t.gt(this.shru(1)))return m;n=v}else{if(this.eq(L))return t.eq(p)||t.eq(T)?L:t.eq(L)?p:(i=this.shr(1).div(t).shl(1)).eq(d)?t.isNegative()?p:T:(r=this.sub(t.mul(i)),n=i.add(r.div(t)));if(t.eq(L))return this.unsigned?v:d;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();n=d}for(r=this;r.gte(t);){i=Math.max(1,Math.floor(r.toNumber()/t.toNumber()));for(var s=Math.ceil(Math.log(i)/Math.LN2),h=s<=48?1:a(2,s-48),l=o(i),g=l.mul(t);g.isNegative()||g.gt(r);)g=(l=o(i-=h,this.unsigned)).mul(t);l.isZero()&&(l=p),n=n.add(l),r=r.sub(g)}return n},b.div=b.divide,b.modulo=function(t){return e(t)||(t=u(t)),this.sub(this.div(t).mul(t))},b.mod=b.modulo,b.not=function(){return s(~this.low,~this.high,this.unsigned)},b.and=function(t){return e(t)||(t=u(t)),s(this.low&t.low,this.high&t.high,this.unsigned)},b.or=function(t){return e(t)||(t=u(t)),s(this.low|t.low,this.high|t.high,this.unsigned)},b.xor=function(t){return e(t)||(t=u(t)),s(this.low^t.low,this.high^t.high,this.unsigned)},b.shiftLeft=function(t){return e(t)&&(t=t.toInt()),0==(t&=63)?this:t<32?s(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):s(0,this.low<<t-32,this.unsigned)},b.shl=b.shiftLeft,b.shiftRight=function(t){return e(t)&&(t=t.toInt()),0==(t&=63)?this:t<32?s(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):s(this.high>>t-32,this.high>=0?0:-1,this.unsigned)},b.shr=b.shiftRight,b.shiftRightUnsigned=function(t){if(e(t)&&(t=t.toInt()),0==(t&=63))return this;var i=this.high;return t<32?s(this.low>>>t|i<<32-t,i>>>t,this.unsigned):s(32===t?i:i>>>t-32,0,this.unsigned)},b.shru=b.shiftRightUnsigned,b.toSigned=function(){return this.unsigned?s(this.low,this.high,!1):this},b.toUnsigned=function(){return this.unsigned?this:s(this.low,this.high,!0)},b.toBytes=function(t){return t?this.toBytesLE():this.toBytesBE()},b.toBytesLE=function(){var t=this.high,e=this.low;return[255&e,e>>>8&255,e>>>16&255,e>>>24&255,255&t,t>>>8&255,t>>>16&255,t>>>24&255]},b.toBytesBE=function(){var t=this.high,e=this.low;return[t>>>24&255,t>>>16&255,t>>>8&255,255&t,e>>>24&255,e>>>16&255,e>>>8&255,255&e]},t})?i.apply(e,[]):i)||(t.exports=r)},309:(t,e,i)=>{!function(t){"use strict";var e=t.S2={L:{}};e.L.LatLng=function(t,e,i){var r=parseFloat(t,10),n=parseFloat(e,10);if(isNaN(r)||isNaN(n))throw new Error("Invalid LatLng object: ("+t+", "+e+")");return!0!==i&&(r=Math.max(Math.min(r,90),-90),n=(n+180)%360+(n<-180||180===n?180:-180)),{lat:r,lng:n}},e.L.LatLng.DEG_TO_RAD=Math.PI/180,e.L.LatLng.RAD_TO_DEG=180/Math.PI,e.LatLngToXYZ=function(t){var i=e.L.LatLng.DEG_TO_RAD,r=t.lat*i,n=t.lng*i,o=Math.cos(r);return[Math.cos(n)*o,Math.sin(n)*o,Math.sin(r)]},e.XYZToLatLng=function(t){var i=e.L.LatLng.RAD_TO_DEG,r=Math.atan2(t[2],Math.sqrt(t[0]*t[0]+t[1]*t[1])),n=Math.atan2(t[1],t[0]);return e.L.LatLng(r*i,n*i)},e.XYZToFaceUV=function(t){var e=function(t){var e=[Math.abs(t[0]),Math.abs(t[1]),Math.abs(t[2])];return e[0]>e[1]?e[0]>e[2]?0:2:e[1]>e[2]?1:2}(t);t[e]<0&&(e+=3);var i=function(t,e){var i,r;switch(t){case 0:i=e[1]/e[0],r=e[2]/e[0];break;case 1:i=-e[0]/e[1],r=e[2]/e[1];break;case 2:i=-e[0]/e[2],r=-e[1]/e[2];break;case 3:i=e[2]/e[0],r=e[1]/e[0];break;case 4:i=e[2]/e[1],r=-e[0]/e[1];break;case 5:i=-e[1]/e[2],r=-e[0]/e[2];break;default:throw{error:"Invalid face"}}return[i,r]}(e,t);return[e,i]},e.FaceUVToXYZ=function(t,e){var i=e[0],r=e[1];switch(t){case 0:return[1,i,r];case 1:return[-i,1,r];case 2:return[-i,-r,1];case 3:return[-1,-r,-i];case 4:return[r,-1,-i];case 5:return[r,i,-1];default:throw{error:"Invalid face"}}};var r=function(t){return t>=.5?1/3*(4*t*t-1):1/3*(1-4*(1-t)*(1-t))};e.STToUV=function(t){return[r(t[0]),r(t[1])]};var n=function(t){return t>=0?.5*Math.sqrt(1+3*t):1-.5*Math.sqrt(1-3*t)};e.UVToST=function(t){return[n(t[0]),n(t[1])]},e.STToIJ=function(t,e){var i=1<<e,r=function(t){var e=Math.floor(t*i);return Math.max(0,Math.min(i-1,e))};return[r(t[0]),r(t[1])]},e.IJToST=function(t,e,i){var r=1<<e;return[(t[0]+i[0])/r,(t[1]+i[1])/r]};var o=function(t,e,i,r){if(0==r){1==i&&(e.x=t-1-e.x,e.y=t-1-e.y);var n=e.x;e.x=e.y,e.y=n}},s=function(t,e,i,r){var n={a:[[0,"d"],[1,"a"],[3,"b"],[2,"a"]],b:[[2,"b"],[1,"b"],[3,"a"],[0,"c"]],c:[[2,"c"],[3,"d"],[1,"c"],[0,"b"]],d:[[0,"a"],[3,"c"],[1,"d"],[2,"d"]]};"number"!=typeof r&&console.warn(new Error("called pointToHilbertQuadList without face value, defaulting to '0'").stack);for(var o=r%2?"d":"a",s=[],a=i-1;a>=0;a--){var h=1<<a,u=n[o][2*(t&h?1:0)+(e&h?1:0)];s.push(u[0]),o=u[1]}return s};e.S2Cell=function(){},e.S2Cell.FromHilbertQuadKey=function(t){var i,r,n,s,a,h,u=t.split("/"),l=parseInt(u[0]),g=u[1],c=g.length,f={x:0,y:0};for(i=c-1;i>=0;i--)r=c-i,s=0,a=0,"1"===(n=g[i])?a=1:"2"===n?(s=1,a=1):"3"===n&&(s=1),h=Math.pow(2,r-1),o(h,f,s,a),f.x+=h*s,f.y+=h*a;if(l%2==1){var d=f.x;f.x=f.y,f.y=d}return e.S2Cell.FromFaceIJ(parseInt(l),[f.x,f.y],r)},e.S2Cell.FromLatLng=function(t,i){if(!t.lat&&0!==t.lat||!t.lng&&0!==t.lng)throw new Error("Pass { lat: lat, lng: lng } to S2.S2Cell.FromLatLng");var r=e.LatLngToXYZ(t),n=e.XYZToFaceUV(r),o=e.UVToST(n[1]),s=e.STToIJ(o,i);return e.S2Cell.FromFaceIJ(n[0],s,i)},e.S2Cell.FromFaceIJ=function(t,i,r){var n=new e.S2Cell;return n.face=t,n.ij=i,n.level=r,n},e.S2Cell.prototype.toString=function(){return"F"+this.face+"ij["+this.ij[0]+","+this.ij[1]+"]@"+this.level},e.S2Cell.prototype.getLatLng=function(){var t=e.IJToST(this.ij,this.level,[.5,.5]),i=e.STToUV(t),r=e.FaceUVToXYZ(this.face,i);return e.XYZToLatLng(r)},e.S2Cell.prototype.getCornerLatLngs=function(){for(var t=[],i=[[0,0],[0,1],[1,1],[1,0]],r=0;r<4;r++){var n=e.IJToST(this.ij,this.level,i[r]),o=e.STToUV(n),s=e.FaceUVToXYZ(this.face,o);t.push(e.XYZToLatLng(s))}return t},e.S2Cell.prototype.getFaceAndQuads=function(){var t=s(this.ij[0],this.ij[1],this.level,this.face);return[this.face,t]},e.S2Cell.prototype.toHilbertQuadkey=function(){var t=s(this.ij[0],this.ij[1],this.level,this.face);return this.face.toString(10)+"/"+t.join("")},e.latLngToNeighborKeys=e.S2Cell.latLngToNeighborKeys=function(t,i,r){return e.S2Cell.FromLatLng({lat:t,lng:i},r).getNeighbors().map((function(t){return t.toHilbertQuadkey()}))},e.S2Cell.prototype.getNeighbors=function(){var t=function(t,i,r){var n=1<<r;if(i[0]>=0&&i[1]>=0&&i[0]<n&&i[1]<n)return e.S2Cell.FromFaceIJ(t,i,r);var o=e.IJToST(i,r,[.5,.5]),s=e.STToUV(o),a=e.FaceUVToXYZ(t,s),h=e.XYZToFaceUV(a);return t=h[0],s=h[1],o=e.UVToST(s),i=e.STToIJ(o,r),e.S2Cell.FromFaceIJ(t,i,r)},i=this.face,r=this.ij[0],n=this.ij[1],o=this.level;return[t(i,[r-1,n],o),t(i,[r,n-1],o),t(i,[r+1,n],o),t(i,[r,n+1],o)]},e.FACE_BITS=3,e.MAX_LEVEL=30,e.POS_BITS=2*e.MAX_LEVEL+1,e.facePosLevelToId=e.S2Cell.facePosLevelToId=e.fromFacePosLevel=function(r,n,o){var s,a,h,u=t.dcodeIO&&t.dcodeIO.Long||i(4);for(o||(o=n.length),n.length>o&&(n=n.substr(0,o)),s=u.fromString(r.toString(10),!0,10).toString(2);s.length<e.FACE_BITS;)s="0"+s;for(a=u.fromString(n,!0,4).toString(2);a.length<2*o;)a="0"+a;for(h=s+a,h+="1";h.length<e.FACE_BITS+e.POS_BITS;)h+="0";return u.fromString(h,!0,2).toString(10)},e.keyToId=e.S2Cell.keyToId=e.toId=e.toCellId=e.fromKey=function(t){var i=t.split("/");return e.fromFacePosLevel(i[0],i[1],i[1].length)},e.idToKey=e.S2Cell.idToKey=e.S2Cell.toKey=e.toKey=e.fromId=e.fromCellId=e.S2Cell.toHilbertQuadkey=e.toHilbertQuadkey=function(r){for(var n=t.dcodeIO&&t.dcodeIO.Long||i(4),o=n.fromString(r,!0,10).toString(2);o.length<e.FACE_BITS+e.POS_BITS;)o="0"+o;for(var s=o.lastIndexOf("1"),a=o.substring(0,3),h=o.substring(3,s),u=h.length/2,l=n.fromString(a,!0,2).toString(10),g=n.fromString(h,!0,2).toString(4);g.length<u;)g="0"+g;return l+"/"+g},e.keyToLatLng=e.S2Cell.keyToLatLng=function(t){return e.S2Cell.FromHilbertQuadKey(t).getLatLng()},e.idToLatLng=e.S2Cell.idToLatLng=function(t){var i=e.idToKey(t);return e.keyToLatLng(i)},e.S2Cell.latLngToKey=e.latLngToKey=e.latLngToQuadkey=function(t,i,r){if(isNaN(r)||r<1||r>30)throw new Error("'level' is not a number between 1 and 30 (but it should be)");return e.S2Cell.FromLatLng({lat:t,lng:i},r).toHilbertQuadkey()},e.stepKey=function(e,r){var n,o=t.dcodeIO&&t.dcodeIO.Long||i(4),s=e.split("/"),a=s[0],h=s[1],u=s[1].length,l=o.fromString(h,!0,4);r>0?n=l.add(Math.abs(r)):r<0&&(n=l.subtract(Math.abs(r)));var g=n.toString(4);for("0"===g&&console.warning(new Error("face/position wrapping is not yet supported"));g.length<u;)g="0"+g;return a+"/"+g},e.S2Cell.prevKey=e.prevKey=function(t){return e.stepKey(t,-1)},e.S2Cell.nextKey=e.nextKey=function(t){return e.stepKey(t,1)}}(t.exports)}},e={};function i(r){var n=e[r];if(void 0!==n)return n.exports;var o=e[r]={exports:{}};return t[r].call(o.exports,o,o.exports,i),o.exports}i.d=(t,e)=>{for(var r in e)i.o(e,r)&&!i.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};return(()=>{"use strict";i.r(r),i.d(r,{DNS:()=>e,LocationToGeoDomain:()=>o,LocationToServerAddr:()=>s});var t="loc.arenaxr.org";class e{cache={};static DNS_TYPE_ID_TO_NAME={1:"A",5:"CNAME",12:"PTR",16:"TXT",29:"LOC"};constructor(t="https://dns.google/resolve",e=true){this.dohUrl=t,this.negativeCachingEnabled=e}addRecordToCache(t,e,i){t in this.cache||(this.cache[t]={}),e in this.cache[t]||(this.cache[t][e]=[]),i.timestamp=Date.now(),this.cache[t][e].push(i)}getRecordFromCache(t,e){if(t in this.cache&&e in this.cache[t]){var i=this.cache[t][e],r=[],n=[];for(let t=0;t<i.length;t++){let e=i[t];Date.now()-e.timestamp<1e3*e.TTL?r.push(e):n.push(t)}if(i=i.filter(((t,e)=>!n.includes(e))),this.cache[t][e]=i,r.length>0)return r}return null}async dnsLookup(t,i){if(!Object.values(e.DNS_TYPE_ID_TO_NAME).includes(i))throw new Error(`Unsupported DNS record type: ${i}. Supported types: ${Object.values(e.DNS_TYPE_ID_TO_NAME).join(", ")}`);const r=this.getRecordFromCache(t,i);if(r){for(let t of r)t.fromCache=!0;return r}const n=`${this.dohUrl}?name=${t}&type=${i}`;try{const r=await fetch(n,{headers:{accept:"application/dns-json"}});if(!r.ok)throw new Error("DoH request failed!");const h=await r.json();if("Answer"in h&&h.Answer.length>0){var o=[];for(let r of h.Answer)r.type in e.DNS_TYPE_ID_TO_NAME&&this.addRecordToCache(t,e.DNS_TYPE_ID_TO_NAME[r.type],r),e.DNS_TYPE_ID_TO_NAME[r.type]===i&&o.push(r);if(o.length>0)return o}if("Authority"in h&&h.Authority.length>0&&this.negativeCachingEnabled){var s=null;for(let t of h.Authority)if(6===t.type){s=t;break}if(s){const e=s.data.split(" "),r=Number(e[e.length-1]),n=Number(s.TTL);var a={error:"NO-ANSWER",TTL:Math.min(r,n)};return this.addRecordToCache(t,i,a),[a]}}if(this.negativeCachingEnabled)throw new Error("No answer or authority found in response!")}catch(t){return`ERROR: ${t.message}`}}}var n=i(309);class o{static area_m2_to_level={93e-6:30,371e-6:29,.001485:28,.005939:27,.023756:26,.095023:25,.38:24,1.52:23,6.08:22,24.33:21,97.3:20,389.21:19,1556.86:18,6227.43:17,24909.73:16,99638.93:15,4e5:14,159e4:13,638e4:12,2551e4:11,10203e4:10,40812e4:9,163245e4:8,652909e4:7,261133e5:6,10429791e4:5,41391815e4:4,16464555e5:3,602652116e4:2,2125275305e4:1};static errorToLevel(t){const e=Math.PI*Math.pow(t,2),i=Object.keys(o.area_m2_to_level).map(Number).sort(((t,e)=>t-e));let r=null;for(const t of i){if(!(t<=e))break;r=o.area_m2_to_level[t]}return null===r&&(r=30),r}static getS2CellKey(t,e,i){return n.S2.latLngToKey(t,e,i)}static getGeoDomainFromS2CellKey(t){var e=t.split("/"),i=e[0],r=e[1].split("");return(r=r.reverse()).push(i),r}static getBaseGeoDomain(t,e,i){var r=o.errorToLevel(i),n=o.getS2CellKey(t,e,r);return o.getGeoDomainFromS2CellKey(n)}static formAddressFromDigits(e,i=t){return e.join(".")+"."+i}static getGeoDomains(e,i,r,n=t){var s=o.getBaseGeoDomain(e,i,r),a=[];for(let t=0;t<4;t++){let e=s.slice(1);e.unshift(t),a.push(o.formAddressFromDigits(e,n))}for(let t=1;t<s.length;t++){let e=s.slice(t);a.push(o.formAddressFromDigits(e,n))}return a}}class s{dnsObj=null;constructor(){this.dnsObj=new e}async getServersAddrs(e,i,r,n=t){var s=o.getGeoDomains(e,i,r,n),a=[];for(let t of s)try{const e=await this.dnsObj.dnsLookup(t,"TXT");for(let t of e)"data"in t&&a.push(t.data)}catch(t){console.log(t)}return a}}})(),r})()));