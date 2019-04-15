!function(){return function e(r,o,t){function n(i,a){if(!o[i]){if(!r[i]){var c="function"==typeof require&&require;if(!a&&c)return c(i,!0);if(s)return s(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var l=o[i]={exports:{}};r[i][0].call(l.exports,function(e){return n(r[i][1][e]||e)},l,l.exports,e,r,o,t)}return o[i].exports}for(var s="function"==typeof require&&require,i=0;i<t.length;i++)n(t[i]);return n}}()({1:[function(e,r,o){const t=e("./tools");r.exports=class{constructor(){this.showDate=!1,this.name=null,this.customPrefix=null}trace(){return console.error(t.generatePrefix("trace",this.name,this.customPrefix),"background: #339933; color: #FFFFFF",...arguments)}debug(){return console.error(t.generatePrefix("debug",this.name,this.customPrefix),"background: #00cc66; color: #FFFFFF",...arguments)}info(){return console.error(t.generatePrefix("info",this.name,this.customPrefix),"background: #00ff99; color: #000000",...arguments)}warn(){return console.error(t.generatePrefix("warn",this.name,this.customPrefix),"background: #ffff00; color: #000000",...arguments)}error(){return console.error(t.generatePrefix("error",this.name,this.customPrefix),"background: #ff0000; color: #FFFFFF",...arguments)}}},{"./tools":7}],2:[function(e,r,o){const t=e("uuid-random");function n(e,r,o,n,s,i){s.logArray.length>=i&&s.logArray.splice(0,1);const a={uuid:t(),level:e,name:r,customPrefix:o,date:Date.now(),values:n};s.logArray.push(a)}r.exports=class{constructor(e,r=1e3,o=1e5){this.url=e,this.logCache={logArray:[]},this.showDate=!1,this.name=null,this.customPrefix=null,this.maxCacheSize=o,this.sendInterval=r,setInterval(async()=>{console.log(this.logCache.logArray.length),await async function(e,r){if(0===r.logArray.length)return;const o=r.logArray;r.logArray=[];try{const t=await fetch(e,{body:JSON.stringify(o),method:"POST"});"ok"!==(await t.json()).result&&(console.log('Send logs fail, revert cache: result is not "ok"'),r.logArray=[...o,...r.logArray])}catch(e){console.log("Send logs fail, revert cache:",e.message),r.logArray=[...o,...r.logArray]}}(this.url,this.logCache)},this.sendInterval)}trace(){return n("trace",this.name,this.customPrefix,[...arguments],this.logCache,this.maxCacheSize)}debug(){return n("debug",this.name,this.customPrefix,[...arguments],this.logCache,this.maxCacheSize)}info(){return n("info",this.name,this.customPrefix,[...arguments],this.logCache,this.maxCacheSize)}warn(){return n("warn",this.name,this.customPrefix,[...arguments],this.logCache,this.maxCacheSize)}error(){return n("error",this.name,this.customPrefix,[...arguments],this.logCache,this.maxCacheSize)}}},{"uuid-random":5}],3:[function(e,r,o){const t=e("./ConsoleAppender"),n=e("./ServerAppender"),s={TRACE:1,DEBUG:2,INFO:3,WARN:4,ERROR:5};r.exports={UXLogger:class{constructor(e){if(!e||!e.appenders)throw Error("Wrong config");this.appenders=e.appenders,this.showLevels=e.showLevels||[s.TRACE,s.DEBUG,s.INFO,s.WARN,s.ERROR],this.appenders.forEach(r=>{r.name=e.name,r.showDate=e.showDate,r.customPrefix=e.customPrefix}),["trace","debug","log","info","warn"].forEach(function(e){console[e]=function(...r){console.error("Console output is deprecated, please use Logger instead. [console."+e+"]:",[...r])}})}trace(){this.showLevels.includes(s.TRACE)&&this.appenders.forEach(e=>e.trace(...arguments))}debug(){this.showLevels.includes(s.DEBUG)&&this.appenders.forEach(e=>e.debug(...arguments))}info(){this.showLevels.includes(s.INFO)&&this.appenders.forEach(e=>e.info(...arguments))}warn(){this.showLevels.includes(s.WARN)&&this.appenders.forEach(e=>e.warn(...arguments))}error(){this.showLevels.includes(s.ERROR)&&this.appenders.forEach(e=>e.error(...arguments))}},LEVELS:s,ConsoleAppender:t,ServerAppender:n}},{"./ConsoleAppender":1,"./ServerAppender":2}],4:[function(e,r,o){},{}],5:[function(e,r,o){"use strict";!function(){var o,t,n,s=0,i=[];for(c.BUFFER_SIZE=512,c.bin=a,c.test=function(e){if("string"==typeof e)return/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(e)},t=0;t<256;t++)i[t]=(t+256).toString(16).substr(1);function a(){var e=function(e){var r,i,a;if(void 0!==n){if(void 0===o||s+e>c.BUFFER_SIZE)if(s=0,n.getRandomValues)o=new Uint8Array(c.BUFFER_SIZE),n.getRandomValues(o);else{if(!n.randomBytes)throw new Error("Non-standard crypto library");o=n.randomBytes(c.BUFFER_SIZE)}return o.slice(s,s+=e)}for(r=[],t=0;t<e;t++)r.push((i=0,a=255,Math.floor(Math.random()*(a-i))+i));return r}(16);return e[6]=15&e[6]|64,e[8]=63&e[8]|128,e}function c(){var e=a();return i[e[0]]+i[e[1]]+i[e[2]]+i[e[3]]+"-"+i[e[4]]+i[e[5]]+"-"+i[e[6]]+i[e[7]]+"-"+i[e[8]]+i[e[9]]+"-"+i[e[10]]+i[e[11]]+i[e[12]]+i[e[13]]+i[e[14]]+i[e[15]]}"undefined"!=typeof crypto?n=crypto:"undefined"!=typeof window&&void 0!==window.msCrypto&&(n=window.msCrypto),void 0!==r&&"function"==typeof e?(n=n||e("crypto"),r.exports=c):"undefined"!=typeof window&&(window.uuid=c)}()},{crypto:4}],6:[function(e,r,o){const{UXLogger:t,ConsoleAppender:n,ServerAppender:s,LEVELS:i}=e("./index"),a=new t({appenders:[new n,new s("http://localhost:5111/log",500,10)],name:"App",customPrefix:"Console prefix",showDate:!1,showLevels:[i.TRACE,i.DEBUG,i.INFO,i.WARN,i.ERROR]});a.trace("asd",{kek:"lol"}),a.debug("asd",{kek:"lol"}),a.info("asd",{kek:"lol"}),a.warn("asd",{kek:"lol"}),a.error("asd",{kek:"lol"}),console.log("suka"),setInterval(()=>{a.warn("FUCK")},20)},{"./index":3}],7:[function(e,r,o){function t(e){return e.toISOString().replace("Z","").replace("T"," ")}r.exports={formatDate:t,generatePrefix:function(e,r,o){return`%c${this.showDate?"["+t(new Date)+"] ":""}[${e.toUpperCase()}]${r?" ["+r+"]":""}${o?" ["+o+"]":""}`}}},{}]},{},[6]);