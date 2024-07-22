/*! For license information please see bundle.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.dnsspatialdiscovery=e():t.dnsspatialdiscovery=e()}(self,(()=>(()=>{var t={4:function(t,e){var n,r;void 0===(r="function"==typeof(n=function(){"use strict";function t(t,e,n){this.low=0|t,this.high=0|e,this.unsigned=!!n}function e(t){return!0===(t&&t.__isLong__)}t.prototype.__isLong__,Object.defineProperty(t.prototype,"__isLong__",{value:!0,enumerable:!1,configurable:!1}),t.isLong=e;var n={},r={};function i(t,e){var i,o,a;return e?(a=0<=(t>>>=0)&&t<256)&&(o=r[t])?o:(i=s(t,(0|t)<0?-1:0,!0),a&&(r[t]=i),i):(a=-128<=(t|=0)&&t<128)&&(o=n[t])?o:(i=s(t,t<0?-1:0,!1),a&&(n[t]=i),i)}function o(t,e){if(isNaN(t)||!isFinite(t))return e?v:d;if(e){if(t<0)return v;if(t>=c)return b}else{if(t<=-f)return S;if(t+1>=f)return m}return t<0?o(-t,e).neg():s(t%l|0,t/l|0,e)}function s(e,n,r){return new t(e,n,r)}t.fromInt=i,t.fromNumber=o,t.fromBits=s;var a=Math.pow;function h(t,e,n){if(0===t.length)throw Error("empty string");if("NaN"===t||"Infinity"===t||"+Infinity"===t||"-Infinity"===t)return d;if("number"==typeof e?(n=e,e=!1):e=!!e,(n=n||10)<2||36<n)throw RangeError("radix");var r;if((r=t.indexOf("-"))>0)throw Error("interior hyphen");if(0===r)return h(t.substring(1),e,n).neg();for(var i=o(a(n,8)),s=d,u=0;u<t.length;u+=8){var l=Math.min(8,t.length-u),c=parseInt(t.substring(u,u+l),n);if(l<8){var f=o(a(n,l));s=s.mul(f).add(o(c))}else s=(s=s.mul(i)).add(o(c))}return s.unsigned=e,s}function u(e){return e instanceof t?e:"number"==typeof e?o(e):"string"==typeof e?h(e):s(e.low,e.high,e.unsigned)}t.fromString=h,t.fromValue=u;var l=4294967296,c=l*l,f=c/2,g=i(1<<24),d=i(0);t.ZERO=d;var v=i(0,!0);t.UZERO=v;var p=i(1);t.ONE=p;var y=i(1,!0);t.UONE=y;var T=i(-1);t.NEG_ONE=T;var m=s(-1,2147483647,!1);t.MAX_VALUE=m;var b=s(-1,-1,!0);t.MAX_UNSIGNED_VALUE=b;var S=s(0,-2147483648,!1);t.MIN_VALUE=S;var L=t.prototype;return L.toInt=function(){return this.unsigned?this.low>>>0:this.low},L.toNumber=function(){return this.unsigned?(this.high>>>0)*l+(this.low>>>0):this.high*l+(this.low>>>0)},L.toString=function(t){if((t=t||10)<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative()){if(this.eq(S)){var e=o(t),n=this.div(e),r=n.mul(e).sub(this);return n.toString(t)+r.toInt().toString(t)}return"-"+this.neg().toString(t)}for(var i=o(a(t,6),this.unsigned),s=this,h="";;){var u=s.div(i),l=(s.sub(u.mul(i)).toInt()>>>0).toString(t);if((s=u).isZero())return l+h;for(;l.length<6;)l="0"+l;h=""+l+h}},L.getHighBits=function(){return this.high},L.getHighBitsUnsigned=function(){return this.high>>>0},L.getLowBits=function(){return this.low},L.getLowBitsUnsigned=function(){return this.low>>>0},L.getNumBitsAbs=function(){if(this.isNegative())return this.eq(S)?64:this.neg().getNumBitsAbs();for(var t=0!=this.high?this.high:this.low,e=31;e>0&&!(t&1<<e);e--);return 0!=this.high?e+33:e+1},L.isZero=function(){return 0===this.high&&0===this.low},L.isNegative=function(){return!this.unsigned&&this.high<0},L.isPositive=function(){return this.unsigned||this.high>=0},L.isOdd=function(){return!(1&~this.low)},L.isEven=function(){return!(1&this.low)},L.equals=function(t){return e(t)||(t=u(t)),(this.unsigned===t.unsigned||this.high>>>31!=1||t.high>>>31!=1)&&this.high===t.high&&this.low===t.low},L.eq=L.equals,L.notEquals=function(t){return!this.eq(t)},L.neq=L.notEquals,L.lessThan=function(t){return this.comp(t)<0},L.lt=L.lessThan,L.lessThanOrEqual=function(t){return this.comp(t)<=0},L.lte=L.lessThanOrEqual,L.greaterThan=function(t){return this.comp(t)>0},L.gt=L.greaterThan,L.greaterThanOrEqual=function(t){return this.comp(t)>=0},L.gte=L.greaterThanOrEqual,L.compare=function(t){if(e(t)||(t=u(t)),this.eq(t))return 0;var n=this.isNegative(),r=t.isNegative();return n&&!r?-1:!n&&r?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t).isNegative()?-1:1},L.comp=L.compare,L.negate=function(){return!this.unsigned&&this.eq(S)?S:this.not().add(p)},L.neg=L.negate,L.add=function(t){e(t)||(t=u(t));var n=this.high>>>16,r=65535&this.high,i=this.low>>>16,o=65535&this.low,a=t.high>>>16,h=65535&t.high,l=t.low>>>16,c=0,f=0,g=0,d=0;return g+=(d+=o+(65535&t.low))>>>16,f+=(g+=i+l)>>>16,c+=(f+=r+h)>>>16,c+=n+a,s((g&=65535)<<16|(d&=65535),(c&=65535)<<16|(f&=65535),this.unsigned)},L.subtract=function(t){return e(t)||(t=u(t)),this.add(t.neg())},L.sub=L.subtract,L.multiply=function(t){if(this.isZero())return d;if(e(t)||(t=u(t)),t.isZero())return d;if(this.eq(S))return t.isOdd()?S:d;if(t.eq(S))return this.isOdd()?S:d;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt(g)&&t.lt(g))return o(this.toNumber()*t.toNumber(),this.unsigned);var n=this.high>>>16,r=65535&this.high,i=this.low>>>16,a=65535&this.low,h=t.high>>>16,l=65535&t.high,c=t.low>>>16,f=65535&t.low,v=0,p=0,y=0,T=0;return y+=(T+=a*f)>>>16,p+=(y+=i*f)>>>16,y&=65535,p+=(y+=a*c)>>>16,v+=(p+=r*f)>>>16,p&=65535,v+=(p+=i*c)>>>16,p&=65535,v+=(p+=a*l)>>>16,v+=n*f+r*c+i*l+a*h,s((y&=65535)<<16|(T&=65535),(v&=65535)<<16|(p&=65535),this.unsigned)},L.mul=L.multiply,L.divide=function(t){if(e(t)||(t=u(t)),t.isZero())throw Error("division by zero");if(this.isZero())return this.unsigned?v:d;var n,r,i;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return v;if(t.gt(this.shru(1)))return y;i=v}else{if(this.eq(S))return t.eq(p)||t.eq(T)?S:t.eq(S)?p:(n=this.shr(1).div(t).shl(1)).eq(d)?t.isNegative()?p:T:(r=this.sub(t.mul(n)),i=n.add(r.div(t)));if(t.eq(S))return this.unsigned?v:d;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();i=d}for(r=this;r.gte(t);){n=Math.max(1,Math.floor(r.toNumber()/t.toNumber()));for(var s=Math.ceil(Math.log(n)/Math.LN2),h=s<=48?1:a(2,s-48),l=o(n),c=l.mul(t);c.isNegative()||c.gt(r);)c=(l=o(n-=h,this.unsigned)).mul(t);l.isZero()&&(l=p),i=i.add(l),r=r.sub(c)}return i},L.div=L.divide,L.modulo=function(t){return e(t)||(t=u(t)),this.sub(this.div(t).mul(t))},L.mod=L.modulo,L.not=function(){return s(~this.low,~this.high,this.unsigned)},L.and=function(t){return e(t)||(t=u(t)),s(this.low&t.low,this.high&t.high,this.unsigned)},L.or=function(t){return e(t)||(t=u(t)),s(this.low|t.low,this.high|t.high,this.unsigned)},L.xor=function(t){return e(t)||(t=u(t)),s(this.low^t.low,this.high^t.high,this.unsigned)},L.shiftLeft=function(t){return e(t)&&(t=t.toInt()),0==(t&=63)?this:t<32?s(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):s(0,this.low<<t-32,this.unsigned)},L.shl=L.shiftLeft,L.shiftRight=function(t){return e(t)&&(t=t.toInt()),0==(t&=63)?this:t<32?s(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):s(this.high>>t-32,this.high>=0?0:-1,this.unsigned)},L.shr=L.shiftRight,L.shiftRightUnsigned=function(t){if(e(t)&&(t=t.toInt()),0==(t&=63))return this;var n=this.high;return t<32?s(this.low>>>t|n<<32-t,n>>>t,this.unsigned):s(32===t?n:n>>>t-32,0,this.unsigned)},L.shru=L.shiftRightUnsigned,L.toSigned=function(){return this.unsigned?s(this.low,this.high,!1):this},L.toUnsigned=function(){return this.unsigned?this:s(this.low,this.high,!0)},L.toBytes=function(t){return t?this.toBytesLE():this.toBytesBE()},L.toBytesLE=function(){var t=this.high,e=this.low;return[255&e,e>>>8&255,e>>>16&255,e>>>24&255,255&t,t>>>8&255,t>>>16&255,t>>>24&255]},L.toBytesBE=function(){var t=this.high,e=this.low;return[t>>>24&255,t>>>16&255,t>>>8&255,255&t,e>>>24&255,e>>>16&255,e>>>8&255,255&e]},t})?n.apply(e,[]):n)||(t.exports=r)},309:(t,e,n)=>{!function(t){"use strict";var e=t.S2={L:{}};e.L.LatLng=function(t,e,n){var r=parseFloat(t,10),i=parseFloat(e,10);if(isNaN(r)||isNaN(i))throw new Error("Invalid LatLng object: ("+t+", "+e+")");return!0!==n&&(r=Math.max(Math.min(r,90),-90),i=(i+180)%360+(i<-180||180===i?180:-180)),{lat:r,lng:i}},e.L.LatLng.DEG_TO_RAD=Math.PI/180,e.L.LatLng.RAD_TO_DEG=180/Math.PI,e.LatLngToXYZ=function(t){var n=e.L.LatLng.DEG_TO_RAD,r=t.lat*n,i=t.lng*n,o=Math.cos(r);return[Math.cos(i)*o,Math.sin(i)*o,Math.sin(r)]},e.XYZToLatLng=function(t){var n=e.L.LatLng.RAD_TO_DEG,r=Math.atan2(t[2],Math.sqrt(t[0]*t[0]+t[1]*t[1])),i=Math.atan2(t[1],t[0]);return e.L.LatLng(r*n,i*n)},e.XYZToFaceUV=function(t){var e=function(t){var e=[Math.abs(t[0]),Math.abs(t[1]),Math.abs(t[2])];return e[0]>e[1]?e[0]>e[2]?0:2:e[1]>e[2]?1:2}(t);t[e]<0&&(e+=3);var n=function(t,e){var n,r;switch(t){case 0:n=e[1]/e[0],r=e[2]/e[0];break;case 1:n=-e[0]/e[1],r=e[2]/e[1];break;case 2:n=-e[0]/e[2],r=-e[1]/e[2];break;case 3:n=e[2]/e[0],r=e[1]/e[0];break;case 4:n=e[2]/e[1],r=-e[0]/e[1];break;case 5:n=-e[1]/e[2],r=-e[0]/e[2];break;default:throw{error:"Invalid face"}}return[n,r]}(e,t);return[e,n]},e.FaceUVToXYZ=function(t,e){var n=e[0],r=e[1];switch(t){case 0:return[1,n,r];case 1:return[-n,1,r];case 2:return[-n,-r,1];case 3:return[-1,-r,-n];case 4:return[r,-1,-n];case 5:return[r,n,-1];default:throw{error:"Invalid face"}}};var r=function(t){return t>=.5?1/3*(4*t*t-1):1/3*(1-4*(1-t)*(1-t))};e.STToUV=function(t){return[r(t[0]),r(t[1])]};var i=function(t){return t>=0?.5*Math.sqrt(1+3*t):1-.5*Math.sqrt(1-3*t)};e.UVToST=function(t){return[i(t[0]),i(t[1])]},e.STToIJ=function(t,e){var n=1<<e,r=function(t){var e=Math.floor(t*n);return Math.max(0,Math.min(n-1,e))};return[r(t[0]),r(t[1])]},e.IJToST=function(t,e,n){var r=1<<e;return[(t[0]+n[0])/r,(t[1]+n[1])/r]};var o=function(t,e,n,r){if(0==r){1==n&&(e.x=t-1-e.x,e.y=t-1-e.y);var i=e.x;e.x=e.y,e.y=i}},s=function(t,e,n,r){var i={a:[[0,"d"],[1,"a"],[3,"b"],[2,"a"]],b:[[2,"b"],[1,"b"],[3,"a"],[0,"c"]],c:[[2,"c"],[3,"d"],[1,"c"],[0,"b"]],d:[[0,"a"],[3,"c"],[1,"d"],[2,"d"]]};"number"!=typeof r&&console.warn(new Error("called pointToHilbertQuadList without face value, defaulting to '0'").stack);for(var o=r%2?"d":"a",s=[],a=n-1;a>=0;a--){var h=1<<a,u=i[o][2*(t&h?1:0)+(e&h?1:0)];s.push(u[0]),o=u[1]}return s};e.S2Cell=function(){},e.S2Cell.FromHilbertQuadKey=function(t){var n,r,i,s,a,h,u=t.split("/"),l=parseInt(u[0]),c=u[1],f=c.length,g={x:0,y:0};for(n=f-1;n>=0;n--)r=f-n,s=0,a=0,"1"===(i=c[n])?a=1:"2"===i?(s=1,a=1):"3"===i&&(s=1),h=Math.pow(2,r-1),o(h,g,s,a),g.x+=h*s,g.y+=h*a;if(l%2==1){var d=g.x;g.x=g.y,g.y=d}return e.S2Cell.FromFaceIJ(parseInt(l),[g.x,g.y],r)},e.S2Cell.FromLatLng=function(t,n){if(!t.lat&&0!==t.lat||!t.lng&&0!==t.lng)throw new Error("Pass { lat: lat, lng: lng } to S2.S2Cell.FromLatLng");var r=e.LatLngToXYZ(t),i=e.XYZToFaceUV(r),o=e.UVToST(i[1]),s=e.STToIJ(o,n);return e.S2Cell.FromFaceIJ(i[0],s,n)},e.S2Cell.FromFaceIJ=function(t,n,r){var i=new e.S2Cell;return i.face=t,i.ij=n,i.level=r,i},e.S2Cell.prototype.toString=function(){return"F"+this.face+"ij["+this.ij[0]+","+this.ij[1]+"]@"+this.level},e.S2Cell.prototype.getLatLng=function(){var t=e.IJToST(this.ij,this.level,[.5,.5]),n=e.STToUV(t),r=e.FaceUVToXYZ(this.face,n);return e.XYZToLatLng(r)},e.S2Cell.prototype.getCornerLatLngs=function(){for(var t=[],n=[[0,0],[0,1],[1,1],[1,0]],r=0;r<4;r++){var i=e.IJToST(this.ij,this.level,n[r]),o=e.STToUV(i),s=e.FaceUVToXYZ(this.face,o);t.push(e.XYZToLatLng(s))}return t},e.S2Cell.prototype.getFaceAndQuads=function(){var t=s(this.ij[0],this.ij[1],this.level,this.face);return[this.face,t]},e.S2Cell.prototype.toHilbertQuadkey=function(){var t=s(this.ij[0],this.ij[1],this.level,this.face);return this.face.toString(10)+"/"+t.join("")},e.latLngToNeighborKeys=e.S2Cell.latLngToNeighborKeys=function(t,n,r){return e.S2Cell.FromLatLng({lat:t,lng:n},r).getNeighbors().map((function(t){return t.toHilbertQuadkey()}))},e.S2Cell.prototype.getNeighbors=function(){var t=function(t,n,r){var i=1<<r;if(n[0]>=0&&n[1]>=0&&n[0]<i&&n[1]<i)return e.S2Cell.FromFaceIJ(t,n,r);var o=e.IJToST(n,r,[.5,.5]),s=e.STToUV(o),a=e.FaceUVToXYZ(t,s),h=e.XYZToFaceUV(a);return t=h[0],s=h[1],o=e.UVToST(s),n=e.STToIJ(o,r),e.S2Cell.FromFaceIJ(t,n,r)},n=this.face,r=this.ij[0],i=this.ij[1],o=this.level;return[t(n,[r-1,i],o),t(n,[r,i-1],o),t(n,[r+1,i],o),t(n,[r,i+1],o)]},e.FACE_BITS=3,e.MAX_LEVEL=30,e.POS_BITS=2*e.MAX_LEVEL+1,e.facePosLevelToId=e.S2Cell.facePosLevelToId=e.fromFacePosLevel=function(r,i,o){var s,a,h,u=t.dcodeIO&&t.dcodeIO.Long||n(4);for(o||(o=i.length),i.length>o&&(i=i.substr(0,o)),s=u.fromString(r.toString(10),!0,10).toString(2);s.length<e.FACE_BITS;)s="0"+s;for(a=u.fromString(i,!0,4).toString(2);a.length<2*o;)a="0"+a;for(h=s+a,h+="1";h.length<e.FACE_BITS+e.POS_BITS;)h+="0";return u.fromString(h,!0,2).toString(10)},e.keyToId=e.S2Cell.keyToId=e.toId=e.toCellId=e.fromKey=function(t){var n=t.split("/");return e.fromFacePosLevel(n[0],n[1],n[1].length)},e.idToKey=e.S2Cell.idToKey=e.S2Cell.toKey=e.toKey=e.fromId=e.fromCellId=e.S2Cell.toHilbertQuadkey=e.toHilbertQuadkey=function(r){for(var i=t.dcodeIO&&t.dcodeIO.Long||n(4),o=i.fromString(r,!0,10).toString(2);o.length<e.FACE_BITS+e.POS_BITS;)o="0"+o;for(var s=o.lastIndexOf("1"),a=o.substring(0,3),h=o.substring(3,s),u=h.length/2,l=i.fromString(a,!0,2).toString(10),c=i.fromString(h,!0,2).toString(4);c.length<u;)c="0"+c;return l+"/"+c},e.keyToLatLng=e.S2Cell.keyToLatLng=function(t){return e.S2Cell.FromHilbertQuadKey(t).getLatLng()},e.idToLatLng=e.S2Cell.idToLatLng=function(t){var n=e.idToKey(t);return e.keyToLatLng(n)},e.S2Cell.latLngToKey=e.latLngToKey=e.latLngToQuadkey=function(t,n,r){if(isNaN(r)||r<1||r>30)throw new Error("'level' is not a number between 1 and 30 (but it should be)");return e.S2Cell.FromLatLng({lat:t,lng:n},r).toHilbertQuadkey()},e.stepKey=function(e,r){var i,o=t.dcodeIO&&t.dcodeIO.Long||n(4),s=e.split("/"),a=s[0],h=s[1],u=s[1].length,l=o.fromString(h,!0,4);r>0?i=l.add(Math.abs(r)):r<0&&(i=l.subtract(Math.abs(r)));var c=i.toString(4);for("0"===c&&console.warning(new Error("face/position wrapping is not yet supported"));c.length<u;)c="0"+c;return a+"/"+c},e.S2Cell.prevKey=e.prevKey=function(t){return e.stepKey(t,-1)},e.S2Cell.nextKey=e.nextKey=function(t){return e.stepKey(t,1)}}(t.exports)}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r].call(o.exports,o,o.exports,n),o.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};return(()=>{"use strict";n.r(r),n.d(r,{DNS:()=>e,LocationToGeoDomain:()=>s,LocationToServerAddr:()=>a});var t="loc.arenaxr.org",e=function(){function t(t,e){void 0===t&&(t="https://dns.google/resolve"),void 0===e&&(e=true),this.cache={},this.dohUrl=t,this.negativeCachingEnabled=e}return t.prototype.addRecordToCache=function(t,e,n){t in this.cache||(this.cache[t]={}),e in this.cache[t]||(this.cache[t][e]=[]),n.timestamp=Date.now(),this.cache[t][e].push(n)},t.prototype.getRecordFromCache=function(t,e){if(t in this.cache&&e in this.cache[t]){for(var n=this.cache[t][e],r=[],i=[],o=0;o<n.length;o++){var s=n[o];Date.now()-s.timestamp<1e3*s.TTL?r.push(s):i.push(o)}if(n=n.filter((function(t,e){return!i.includes(e)})),this.cache[t][e]=n,r.length>0)return r}return null},t.prototype.dnsLookup=function(e,n){return r=this,i=void 0,s=function(){var r,i,o,s,a,h,u,l,c,f,g,d,v,p,y,T,m,b,S;return function(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(a){return function(h){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(s=0)),s;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,r=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){s.label=a[1];break}if(6===a[0]&&s.label<i[1]){s.label=i[1],i=a;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(a);break}i[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,h])}}}(this,(function(L){switch(L.label){case 0:if(!Object.values(t.DNS_TYPE_ID_TO_NAME).includes(n))throw new Error("Unsupported DNS record type: ".concat(n,". Supported types: ").concat(Object.values(t.DNS_TYPE_ID_TO_NAME).join(", ")));if(r=this.getRecordFromCache(e,n)){for(i=0,o=r;i<o.length;i++)(v=o[i]).fromCache=!0;return[2,r]}s="".concat(this.dohUrl,"?name=").concat(e,"&type=").concat(n),L.label=1;case 1:return L.trys.push([1,4,,5]),[4,fetch(s,{headers:{accept:"application/dns-json"}})];case 2:if(!(a=L.sent()).ok)throw new Error("DoH request failed!");return[4,a.json()];case 3:if("Answer"in(h=L.sent())&&h.Answer.length>0){for(u=[],l=0,c=h.Answer;l<c.length;l++)(v=c[l]).type in t.DNS_TYPE_ID_TO_NAME&&this.addRecordToCache(e,t.DNS_TYPE_ID_TO_NAME[v.type],v),t.DNS_TYPE_ID_TO_NAME[v.type]===n&&u.push(v);if(u.length>0)return[2,u]}if("Authority"in h&&h.Authority.length>0&&this.negativeCachingEnabled){for(f=null,g=0,d=h.Authority;g<d.length;g++)if(6===(v=d[g]).type){f=v;break}if(f)return p=f.data.split(" "),y=Number(p[p.length-1]),T=Number(f.TTL),m=Math.min(y,T),b={error:"NO-ANSWER",TTL:m},this.addRecordToCache(e,n,b),[2,[b]]}else if(this.negativeCachingEnabled)return S={error:"NO-AUTHORITY",TTL:720},this.addRecordToCache(e,n,S),[2,[S]];return[3,5];case 4:return L.sent(),S={error:"UNKNOWN-ERROR-OCCURED",TTL:720},this.negativeCachingEnabled&&this.addRecordToCache(e,n,S),[2,[S]];case 5:return[2]}}))},new((o=void 0)||(o=Promise))((function(t,e){function n(t){try{h(s.next(t))}catch(t){e(t)}}function a(t){try{h(s.throw(t))}catch(t){e(t)}}function h(e){var r;e.done?t(e.value):(r=e.value,r instanceof o?r:new o((function(t){t(r)}))).then(n,a)}h((s=s.apply(r,i||[])).next())}));var r,i,o,s},t.DNS_TYPE_ID_TO_NAME={1:"A",5:"CNAME",12:"PTR",16:"TXT",29:"LOC"},t}(),i=n(309),o=n.n(i),s=function(){function e(){}return e.errorToLevel=function(t){for(var n=Math.PI*Math.pow(t,2),r=null,i=0,o=Object.keys(e.area_m2_to_level).map(Number).sort((function(t,e){return t-e}));i<o.length;i++){var s=o[i];if(!(s<=n))break;r=e.area_m2_to_level[s]}return null===r&&(r=30),r},e.getS2CellKey=function(t,e,n){return o().latLngToKey(t,e,n)},e.getGeoDomainFromS2CellKey=function(t){var e=t.split("/"),n=e[0],r=e[1].split("");return(r=r.reverse()).push(n),r},e.getBaseGeoDomain=function(t,n,r){var i=e.errorToLevel(r),o=e.getS2CellKey(t,n,i);return e.getGeoDomainFromS2CellKey(o)},e.formAddressFromDigits=function(e,n){return void 0===n&&(n=t),e.join(".")+"."+n},e.getGeoDomains=function(n,r,i,o){void 0===o&&(o=t);for(var s=e.getBaseGeoDomain(n,r,i),a=[],h=0;h<4;h++){var u=s.slice(1);u.unshift(h.toString()),a.push(e.formAddressFromDigits(u,o))}for(h=1;h<s.length;h++){var l=s.slice(h);a.push(e.formAddressFromDigits(l,o))}return a},e.area_m2_to_level={93e-6:30,371e-6:29,.001485:28,.005939:27,.023756:26,.095023:25,.38:24,1.52:23,6.08:22,24.33:21,97.3:20,389.21:19,1556.86:18,6227.43:17,24909.73:16,99638.93:15,4e5:14,159e4:13,638e4:12,2551e4:11,10203e4:10,40812e4:9,163245e4:8,652909e4:7,261133e5:6,10429791e4:5,41391815e4:4,16464555e5:3,602652116e4:2,2125275305e4:1},e}();class a{dnsObj=null;constructor(){this.dnsObj=new e}async getServersAddrs(e,n,r,i=t){var o=s.getGeoDomains(e,n,r,i),a=[];for(let t of o)try{const e=await this.dnsObj.dnsLookup(t,"TXT");for(let t of e)"data"in t&&a.push(t.data)}catch(t){console.log(t);continue}return a}}})(),r})()));