//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"e2f47b0110ed922f21a1522da67279133ce28f32",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "SmartMakerUno",
  "resources": {
    "hash": "sha256-0ybVdxAmFkgofD9ppxA4vwfp+nT6/KpecimrvMi0qsI=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.zii7xy1mfv.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.zbexyp8zrs.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.irhkb4p53z.wasm",
        "hash": "sha256-Eh4eVZPMeijDk9wQRMSunZ3NmDkM8Hc7aPBNRO2jwv8=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "hash": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "hash": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "hash": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "AS021.wasm",
        "name": "AS021.4rxbje3k9g.wasm",
        "hash": "sha256-YGUI0hK1/zSKY2+jd513EXGM+kQZhyC3f1ffKgXmwQo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "AWSSDK.Core.wasm",
        "name": "AWSSDK.Core.0adgnf1hyh.wasm",
        "hash": "sha256-OAoAm6AkGL9qXCSECVA0E+iWulZCHWuHGtuNmuYK3sA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "AWSSDK.S3.wasm",
        "name": "AWSSDK.S3.yjcoc2o00v.wasm",
        "hash": "sha256-clbAHhZoriiiGjkaSMpjGvsZIJHnYwrCUXsM2rHutNc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ActionManager.wasm",
        "name": "ActionManager.9pilb5swbn.wasm",
        "hash": "sha256-E8+MaPtcMovugf8LyNUF3bhpHAJb+zerSFwu6hl0BFo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "AnimationLib.wasm",
        "name": "AnimationLib.i6vdx3ltpy.wasm",
        "hash": "sha256-Ghyyf6PaoutpFFsWvbnDuzG7YVallxwy7OSi9ftfQbU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ApplicationPreferences.wasm",
        "name": "ApplicationPreferences.xh8leqfnku.wasm",
        "hash": "sha256-RURwY8JV1tgdXSK1Mx641OVLAncKVfzqaFAXzn64b3w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Azure.Core.wasm",
        "name": "Azure.Core.92q6rqqhly.wasm",
        "hash": "sha256-cUx0yT4TBboCr8yulFrimAvC9ecu4FtrhfEZ7T8ragU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Azure.Identity.wasm",
        "name": "Azure.Identity.b6ekoqlu3w.wasm",
        "hash": "sha256-wxR1E0zJLWYxnckYUOXZsbZoUjCYCwgg3aYbYbCLaGo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOS04.wasm",
        "name": "BOS04.njs82s7kai.wasm",
        "hash": "sha256-fRsE4QmMj/GEWkOYORhGWjNzaLx7+TG3d00K8acnAOI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOS041.wasm",
        "name": "BOS041.8yvkatsst1.wasm",
        "hash": "sha256-QINGCOJZox2wS9RjVJjJof/Nr4QOafDGHdn4tAIybNA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOS08.wasm",
        "name": "BOS08.wchatquz3f.wasm",
        "hash": "sha256-oATXBRlo5DqCAaRJzRDPI2r4m7/z39jD6csxWTXFZbg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOS09.wasm",
        "name": "BOS09.l1tl7t7j0l.wasm",
        "hash": "sha256-t07cv/vAqCDeLUbuT4id/SY2V/NBZEMBt1z7Yh88YqY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOSd1.wasm",
        "name": "BOSd1.ctzwdoqvu3.wasm",
        "hash": "sha256-sJWAtbFCQy/Y9mpotWJhhjNml3EASa1YFBXcjPwr5oc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOSs1.wasm",
        "name": "BOSs1.wsoa9d4uxb.wasm",
        "hash": "sha256-8KYiIqZFTHflyI+4auNH393713sde6zEZUKhXxoZhjg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOSw12.wasm",
        "name": "BOSw12.q659zhv7f9.wasm",
        "hash": "sha256-fuYZGkBWo/KWetrl59mKYY8DBwsIDu5dqM4KWRrJVks=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Bos006.wasm",
        "name": "Bos006.0owjo08ecj.wasm",
        "hash": "sha256-IET90KBexPAqTyVDzjTftX3NJTYNcnmI3YimzvyLVuc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BouncyCastle.Cryptography.wasm",
        "name": "BouncyCastle.Cryptography.fwbyvi9uhs.wasm",
        "hash": "sha256-QXhJuJXHtZLwQO+gx/KU21zos/wR81/ZHk1+ElFdf+w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CodeBoxControl.wasm",
        "name": "CodeBoxControl.30kv05soyj.wasm",
        "hash": "sha256-A2v17g+57HE0bdCrujrbQf7zsuk+2eLvSIHm0QgjTdw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommandCenter.wasm",
        "name": "CommandCenter.stjsfgoyle.wasm",
        "hash": "sha256-oP0F/mZYI0zXIaeWWY5xLX3Woa0yAHogFfRUtSjRX2w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Common.wasm",
        "name": "Common.ktycijvqt8.wasm",
        "hash": "sha256-uNa8syAGpc2MF6Ad0+YLpYy5gAnJn8VtLGsEE25Mqw4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommonComponentResource.wasm",
        "name": "CommonComponentResource.q4pqa0uc5q.wasm",
        "hash": "sha256-RtQwWdw1Aljem2vb137v5PMdqz2y5QFR/0w2r4rW1DI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommonServiceLocator.wasm",
        "name": "CommonServiceLocator.gr345ileel.wasm",
        "hash": "sha256-DGmYemxeP+4fCpx1xDRBzxuSMbCwDVhdLCWYulvdsu4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommunityToolkit.Common.wasm",
        "name": "CommunityToolkit.Common.0z1twdvjr5.wasm",
        "hash": "sha256-PNNj4Lkxs/pLr26lisgReFw12U1P2ob/RO5ZD/7Sdcc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommunityToolkit.Mvvm.wasm",
        "name": "CommunityToolkit.Mvvm.14v1bvs3hb.wasm",
        "hash": "sha256-P2Xth6VA5CPi9IJNnX5KO6Fz/x3l6dt682JyoMg8Z3E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommunityToolkit.WinUI.Controls.Sizers.wasm",
        "name": "CommunityToolkit.WinUI.Controls.Sizers.m8azwy9sn5.wasm",
        "hash": "sha256-lpboMi6n9LgF0UjE/mx8dNcyfBAzZ/yumN1pGI6GNZY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommunityToolkit.WinUI.Extensions.wasm",
        "name": "CommunityToolkit.WinUI.Extensions.c3fr924xbl.wasm",
        "hash": "sha256-KPZQ/ZSukQkAQeZ8m2tqX5DTKcNvLnmlzGiExfbi1pg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommunityToolkit.WinUI.UI.Controls.DataGrid.wasm",
        "name": "CommunityToolkit.WinUI.UI.Controls.DataGrid.ft59db7em2.wasm",
        "hash": "sha256-TVEYsY1l0en1cfseV9mjlHw1e78FYaFTSM4wVyzNMJE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Compiler.wasm",
        "name": "Compiler.asgcimx9ng.wasm",
        "hash": "sha256-BmbnUpPd9sfgdAlfuSY3OfBwkaJE7uaffOAA/6f04vA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Define.wasm",
        "name": "Define.jyd65h4xx6.wasm",
        "hash": "sha256-KxVF6DwQGZos9dQhgyIoz4LsOngsUNGm9GxPTZJApSs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DelegateEventResource.wasm",
        "name": "DelegateEventResource.dat9r95kus.wasm",
        "hash": "sha256-e/Te4D/2khT19eLx33UrTRzdJ/p7qE6jnTXYCgtvoA0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DicInfo.wasm",
        "name": "DicInfo.96i3tmxa9w.wasm",
        "hash": "sha256-wWOcPX62HRMsFrjtSK8S+XvMzBEP9aHSP1QrP+rnrZo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DocumentFormat.OpenXml.Framework.wasm",
        "name": "DocumentFormat.OpenXml.Framework.hr3um0j7uq.wasm",
        "hash": "sha256-jTTRyAMs/b0Guv92NzmXdUw0Jx0OMoKCQ7j1g3y8Crw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DocumentFormat.OpenXml.wasm",
        "name": "DocumentFormat.OpenXml.limivqqnfw.wasm",
        "hash": "sha256-fckaON5Jc8tiRxdrr7DszaF8CpRO+wzheBBCmddeQLg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "FontAwesome.WPF.wasm",
        "name": "FontAwesome.WPF.hle6hrh5ki.wasm",
        "hash": "sha256-ZdzKujtmCAE+ki0wo+LgwYXsQ3ysVMJWbg/UVXiStDM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Google.Api.CommonProtos.wasm",
        "name": "Google.Api.CommonProtos.bdi6j4y00k.wasm",
        "hash": "sha256-gbo5/6YTf/+hI7gS9ub+AiIODeY9TPbS8m8xvfVjs9E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Google.Api.Gax.Grpc.wasm",
        "name": "Google.Api.Gax.Grpc.9o9e59edxl.wasm",
        "hash": "sha256-h840amlYtCbbDFcuVbXXfDFSu4h7ONDIF7PUBWOKiG0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Google.Api.Gax.wasm",
        "name": "Google.Api.Gax.rf4s9u1gm2.wasm",
        "hash": "sha256-iQmFAhfj++OWcIW5EkRUpjPscQWdF6b5OJmLGXaECjU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Google.Apis.wasm",
        "name": "Google.Apis.1ny3q631hh.wasm",
        "hash": "sha256-HXRtaLlOtgRMjPSqvc/M1DwYuGNyXIW2QrZs0SzmEAw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Google.Apis.Auth.wasm",
        "name": "Google.Apis.Auth.kl7ednw7mb.wasm",
        "hash": "sha256-+MaDr4rMRkQejCQoQeRXcLmVvdOnCFSPb2GM9j+tzf8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Google.Apis.Core.wasm",
        "name": "Google.Apis.Core.3jik6zkfz1.wasm",
        "hash": "sha256-z8ymTnn40MNhH4aF+eDr7lHLbw41KsYunUWg1XkL2hk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Google.Cloud.Speech.V1.wasm",
        "name": "Google.Cloud.Speech.V1.l8wi5ciyax.wasm",
        "hash": "sha256-Sxdxu1dfXGPrsEflV0m/35NGUAav0aHYGwN544CZC/w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Google.LongRunning.wasm",
        "name": "Google.LongRunning.2z6zkawxao.wasm",
        "hash": "sha256-8rUpq6XO6XzT9AQlYRhnWsoE/rc4xa5/x0L8VGngpUA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Google.Protobuf.wasm",
        "name": "Google.Protobuf.ivy647xs1f.wasm",
        "hash": "sha256-8vnsKYWOphzhP+wCIX1aPeZA+vaBqxCHzkKnkmc8RaE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Grpc.Auth.wasm",
        "name": "Grpc.Auth.i23t5sh7bo.wasm",
        "hash": "sha256-ypk9C7w8fkZlbvfInXFBxT4HgmwCH332AxKGuRX/9jY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Grpc.Core.Api.wasm",
        "name": "Grpc.Core.Api.0whq9namiv.wasm",
        "hash": "sha256-8J0TWwgT1530e1ykknW/xspOW2HKcpfxJ+3f08Us3ak=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Grpc.Net.Client.wasm",
        "name": "Grpc.Net.Client.o4ncpai5im.wasm",
        "hash": "sha256-6H47VAbxoleNo/3qYC0XYzbY1bDVKS/jnJi0Bayz3zQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Grpc.Net.Common.wasm",
        "name": "Grpc.Net.Common.7pyq3rkcho.wasm",
        "hash": "sha256-K6EIaGdtWYtqD0e+1uwyerMcayo89MuQhi+oeC+Wy3Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "HarfBuzzSharp.wasm",
        "name": "HarfBuzzSharp.mb3ut3nggm.wasm",
        "hash": "sha256-UgXzWLsg5ZVgs0y2dsSqb1jujCbsQ5wOat4/xwRjJBM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "HtmlAgilityPack.wasm",
        "name": "HtmlAgilityPack.st8ng737vz.wasm",
        "hash": "sha256-cAgxQhMHBpYiWAE4lE7AzfHjP8poxbxtLgsy1oRF+cU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ICSharpCode.SharpZipLib.wasm",
        "name": "ICSharpCode.SharpZipLib.62oul2ilav.wasm",
        "hash": "sha256-TrKF0FMSofhmtXOYcmoIUzuYyFDfoqDxgc8JDmTmcGI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LicenseSolution.wasm",
        "name": "LicenseSolution.eflzjb7gmq.wasm",
        "hash": "sha256-xjmPH/6Gl8PqSt7dfDgwWvYoBsZgiC4OvLHiGqDj8B4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LiveChartsCore.wasm",
        "name": "LiveChartsCore.8o9fx5usd4.wasm",
        "hash": "sha256-uLNd5pW6Gi94UVCJzHJZebh3sXVjiM+p8feHvxasG0s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LiveChartsCore.SkiaSharpView.wasm",
        "name": "LiveChartsCore.SkiaSharpView.8h4rop8d0w.wasm",
        "hash": "sha256-lNT5mtlX5SWI2GsbaQDsKc/l2Qodym7ftQE14r4jzZk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LiveChartsCore.SkiaSharpView.Uno.WinUI.wasm",
        "name": "LiveChartsCore.SkiaSharpView.Uno.WinUI.ada5ghzo1d.wasm",
        "hash": "sha256-QhjDBhAC2BurEnfukeyrhwEcFx4HbKWXZqWho1OCDs8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LocalDataStore.wasm",
        "name": "LocalDataStore.m8p6mjcxed.wasm",
        "hash": "sha256-ujgQocItV9jmBnog+9DOjjUASsS4ZdDzAvARqogeDFE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Magick.NET-Q8-x64.wasm",
        "name": "Magick.NET-Q8-x64.9twq8mdo4z.wasm",
        "hash": "sha256-nRjU0r3gC5xocTTNMqYGFUYVENxrxLpvHK12886waAA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Magick.NET.Core.wasm",
        "name": "Magick.NET.Core.u00cj7fpzo.wasm",
        "hash": "sha256-4tXcY7BMohzctG+Ac3yNCK2WzQGdak/u/X16sfPvhh8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Bcl.AsyncInterfaces.wasm",
        "name": "Microsoft.Bcl.AsyncInterfaces.87jxiifj03.wasm",
        "hash": "sha256-dGnRrD8Zb40RX/Venur8hn5Vi33u1c89ZikyWHbNc4M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.3bwtn2qarv.wasm",
        "hash": "sha256-zyfljmkil9MZTPQPwQEAc98zpxU/mT3baSs0dfaKP90=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Data.SqlClient.wasm",
        "name": "Microsoft.Data.SqlClient.q28jmtiwtc.wasm",
        "hash": "sha256-ojkqlARv5IEq/tYcsnhn3PWb3K6Qo/AX/LTeaOPQquE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.7sfysx51mz.wasm",
        "hash": "sha256-Z9RAwB2Y1nlUJTgal6NxPOjf6xyxToXi0Yco4yiOwtc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.5tuldtude4.wasm",
        "hash": "sha256-OXAsC1GgxSZ2fGMHQ0pJtxQs80xdonAYmH5kiMEF1Zw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.CommandLine.wasm",
        "name": "Microsoft.Extensions.Configuration.CommandLine.t472p5cojy.wasm",
        "hash": "sha256-nT19/ZgXsIQziHgccJ92B5LF3ZqsB4+NyAps11MUT6s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.EnvironmentVariables.wasm",
        "name": "Microsoft.Extensions.Configuration.EnvironmentVariables.uv7gfq1i8o.wasm",
        "hash": "sha256-Fs0HfuIgVZ3gdZSKjM7eIOJO/lZQTJQyeZtPp7lgcy8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.cmkqhbxykv.wasm",
        "hash": "sha256-5Dfh0lVA9O0sydbwd5GQy5av44ah4mIoa7P4mA/ZHks=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.j75nbossmk.wasm",
        "hash": "sha256-H4UkVOGMYcgY5RZ76PdqsT34uQriCx2T45Y12LhZfVU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.h1shn5wexm.wasm",
        "hash": "sha256-NdORak0qwkQJ3/EoRmNas3u7bG0OPlbJq5DH7HB9W8A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.taao2894vc.wasm",
        "hash": "sha256-JTxJTXCWxahDVjRNgErAhzlMywlvavm9GZldNJwcmjs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.d5cnyx8fhq.wasm",
        "hash": "sha256-QWNe49UWB5h/j25YQlQnRnBzysf2t1lnEdQc+KZTFsc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyModel.wasm",
        "name": "Microsoft.Extensions.DependencyModel.a5y25p7bzq.wasm",
        "hash": "sha256-XnIN8BOqopcQUqVoMROd437x7Kky1wvdz6cS0d9tVmk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.k860m8t67d.wasm",
        "hash": "sha256-bJqxJmKi5e//NXLC/kE1O82Gx10qGCZAslKJGJ8VrAM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.r8rnlv8e34.wasm",
        "hash": "sha256-VQXYHr8nXGrR5Jn4dWMBMxscPP/HrazMp+e8EWevUvg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.n0ptp1p8gv.wasm",
        "hash": "sha256-5xD3dSHfcUQuMyb04Vmm3o1mhACPjrgZjfgT+WGHjDY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "name": "Microsoft.Extensions.FileProviders.Physical.rolj732by9.wasm",
        "hash": "sha256-ddgdcMNFACeFdr+Dxv1uJLCvyptKusNEUMpSx4iNW48=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "name": "Microsoft.Extensions.FileSystemGlobbing.vfg5xemezr.wasm",
        "hash": "sha256-hYR3fs1kTDXH6QO68J8fZBx+S0QgYwAAoKnEybA7T2w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "name": "Microsoft.Extensions.Hosting.Abstractions.cubkqjhrf3.wasm",
        "hash": "sha256-DDGhBINCq9OxhNEVO3zLbPCbbry4yZHnm5sIP8DZeW0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Hosting.wasm",
        "name": "Microsoft.Extensions.Hosting.53f5bu9ip6.wasm",
        "hash": "sha256-oQ7mdstQpI1eFWw9THncE4QfBViItFUDYpU7yz/GGqs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Http.wasm",
        "name": "Microsoft.Extensions.Http.0xm0ok7166.wasm",
        "hash": "sha256-BAwit5WsCxkEdFg4tR1iJ5MCxstn9MJgx9ZUFFFJVKI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.boynqrvn2h.wasm",
        "hash": "sha256-S2X70aXuj2B3O+INrdqgvIVWXoB8mgzgHnjR06hHtgk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.ktqk6rjlwl.wasm",
        "hash": "sha256-yEb1TtBOuFllaegjyG8yRCOQYAZ9pIajEh0m1ts6+38=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Configuration.wasm",
        "name": "Microsoft.Extensions.Logging.Configuration.mlj9opcsod.wasm",
        "hash": "sha256-hli4+XwhK1mIAQMI9/s28lPxr8bHGzipNAwElCh1c4k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Console.wasm",
        "name": "Microsoft.Extensions.Logging.Console.6mxtdf0if2.wasm",
        "hash": "sha256-kmd23YPMIj2cJ3aHsaa+ubb0BUcpFJKczcPHmY2GoMA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Debug.wasm",
        "name": "Microsoft.Extensions.Logging.Debug.x6lp8jizcu.wasm",
        "hash": "sha256-d7SAubDRXdnIeKGll7tVAMeOnKatC5wlzx/XCWzbJWc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.5wwhs7itzy.wasm",
        "hash": "sha256-O8fT3TT7ZGTGiE911lhI4cc+atpR4EE1CDKxBYDtjAU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.ObjectPool.wasm",
        "name": "Microsoft.Extensions.ObjectPool.ojtr8l9akz.wasm",
        "hash": "sha256-rKV5OsgPdT/dziClKx+rXomN3MiipX217V7XqBJvlts=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.ld5hhsuy7c.wasm",
        "hash": "sha256-h8mG7Dsm31CMgTtzk418dPIBkKnAQ9kxgw/fAxE+PyQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.cs7l30gytu.wasm",
        "hash": "sha256-VIJpgGJJmaOHjfr7JelT9Y6Od4hDRR2x3EPBMbaUf2I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.dcq43uy0g7.wasm",
        "hash": "sha256-o2YERexOErbq0K+M064BqjtQTXnOa37uvPZWAflvp5w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IO.RecyclableMemoryStream.wasm",
        "name": "Microsoft.IO.RecyclableMemoryStream.k69j9tcsp2.wasm",
        "hash": "sha256-PLLNYyORp9p97V0x5KgrbBal9u/7enJGj68o7bI3pgU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Identity.Client.wasm",
        "name": "Microsoft.Identity.Client.pml60e96i2.wasm",
        "hash": "sha256-/0RPO5RPONz12mTLLnc5bmbDP/nc8AX/aoiUzbb2/Is=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Identity.Client.Extensions.Msal.wasm",
        "name": "Microsoft.Identity.Client.Extensions.Msal.z7cdsa1cr0.wasm",
        "hash": "sha256-4WyJjsOVdSuGyNEo32OkpX4Mx1kOu0iPXbftEFdTa9Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Abstractions.wasm",
        "name": "Microsoft.IdentityModel.Abstractions.496d124ioa.wasm",
        "hash": "sha256-6An1u3CL7gg07vkl9l9BYs7xJmNrP/z3QKVnsVP1GU0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.JsonWebTokens.wasm",
        "name": "Microsoft.IdentityModel.JsonWebTokens.5soqkaok2y.wasm",
        "hash": "sha256-C4QBkYopr4rHaurOhEMnDA462xpa0HZOqUe6qm9pM2U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Logging.wasm",
        "name": "Microsoft.IdentityModel.Logging.vfl4xe1nmd.wasm",
        "hash": "sha256-dTHpg2F8+BqFG0KODFcU2GzKP5rY0lDILOvFTN8JUMg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Protocols.OpenIdConnect.wasm",
        "name": "Microsoft.IdentityModel.Protocols.OpenIdConnect.6y3327r6jr.wasm",
        "hash": "sha256-QttkpmYY2pvEMsSwlDheJ5cbpV0Rn3hi8YTwAkISwIo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Protocols.wasm",
        "name": "Microsoft.IdentityModel.Protocols.jdke4l5q1g.wasm",
        "hash": "sha256-WdmQqH/etKTqaDoHaidn45QGAnG4ty/nG4RXQU5nLzk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IdentityModel.Tokens.wasm",
        "name": "Microsoft.IdentityModel.Tokens.kz365q7i1a.wasm",
        "hash": "sha256-sBbM4MY3WSRX2k9gaSds9ZyRn7XFCrzpKL9I0oqZ+/Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Kiota.Abstractions.wasm",
        "name": "Microsoft.Kiota.Abstractions.oisv9jhq9f.wasm",
        "hash": "sha256-4Piwt6ROoQOcZlzKSzc/bO3lHw+9qcznh26J4AC8SNs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Kiota.Http.HttpClientLibrary.wasm",
        "name": "Microsoft.Kiota.Http.HttpClientLibrary.ogo1q2bov7.wasm",
        "hash": "sha256-6Hu4wYGU+3T+iFaOKE/xrZLl4mwp0lRLhYjjr1CnfL4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Kiota.Serialization.Form.wasm",
        "name": "Microsoft.Kiota.Serialization.Form.gbrav0t1lz.wasm",
        "hash": "sha256-NMgJDNL4hoePb+WhjWBd5Hvk0CUeMFSntgfCoV3Cth8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Kiota.Serialization.Json.wasm",
        "name": "Microsoft.Kiota.Serialization.Json.knwposl0d0.wasm",
        "hash": "sha256-kMmMAzRVjvMz5ZfERA9nea2VSHuTZu9JeIsRa2/jC50=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Kiota.Serialization.Multipart.wasm",
        "name": "Microsoft.Kiota.Serialization.Multipart.kpq3povrb2.wasm",
        "hash": "sha256-CI2Gk6Nef6m0E453GRi0W107CwmaZpdHvQCyzqSBSHw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Kiota.Serialization.Text.wasm",
        "name": "Microsoft.Kiota.Serialization.Text.uk5nw10iso.wasm",
        "hash": "sha256-AkB0Z0hEjK/OJMzXpDPeFh4uLZUsfDyZfLx6LBMEYvg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.SqlServer.Server.wasm",
        "name": "Microsoft.SqlServer.Server.yamodpu5qp.wasm",
        "hash": "sha256-Fig+5hq00gGQlXAgSnyFlUlWyhlx9f+yPJb4INt3gNc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.vnyyaw4u4h.wasm",
        "hash": "sha256-+23NSdEiFOh6hycd1m3TuwjAggEs4OPZu6Jf0QeNsOE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.w0z8eghzta.wasm",
        "hash": "sha256-sL4g7Vwg/yC0vWOg7ViiHzBaiG4i1XAdqim18gU6RqQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.SystemEvents.wasm",
        "name": "Microsoft.Win32.SystemEvents.zymvjt7dkg.wasm",
        "hash": "sha256-9UL3z+tL53qDu0J+wJjIYofzs0O7Ax0loYa4oR4TVf0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ModelGenerator.wasm",
        "name": "ModelGenerator.jbrfa02h2k.wasm",
        "hash": "sha256-D+INFnadVj1HrACARSF87CQJHoUXGGeBTifO7idvyNw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "MySqlConnector.wasm",
        "name": "MySqlConnector.2eqxlxenic.wasm",
        "hash": "sha256-JgNif2vo/17Ldx3my8UWAlrluRPnRcD0mdyF7Udw5n0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NAudio.Core.wasm",
        "name": "NAudio.Core.vw1mjdlvns.wasm",
        "hash": "sha256-LwquXBmCmk8u9FficE3Vu/RWyktOe2E0flUBQCISu7g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NAudio.wasm",
        "name": "NAudio.jpyxknam9t.wasm",
        "hash": "sha256-CWIV8ZBIXj+DDww5IBqqEYz9SZ5ScX/BrnJw7yvyQZQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Newtonsoft.Json.wasm",
        "name": "Newtonsoft.Json.s3s7sh2o39.wasm",
        "hash": "sha256-CCrTCHOHjXZmtUMWMDapcfE7ecbSPRsqrUUZ176t7hQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Oracle.ManagedDataAccess.wasm",
        "name": "Oracle.ManagedDataAccess.6aaisboecl.wasm",
        "hash": "sha256-clOPC/apRj2RUIMCf/VAx8h6TBHKMWe5hLd/OCoyv80=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBc01.wasm",
        "name": "PBc01.6yewgvu8tk.wasm",
        "hash": "sha256-rt8d5X3owRhwbRR1LNu2Sf9I8UHNZGJ9w4If4hYeJhg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBe02_80.wasm",
        "name": "PBe02_80.nq5lqilr0p.wasm",
        "hash": "sha256-TwJq4H06OANdTKBxVYQhpKU7EKLf8Qd7am0klhSZg60=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBm01.wasm",
        "name": "PBm01.eg1pir3qw1.wasm",
        "hash": "sha256-Yt59UlzUrjXzmZG2TVa3JAZcG0zks+egeKGJ3Pb+SG4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBp01.wasm",
        "name": "PBp01.8nbxmazn45.wasm",
        "hash": "sha256-NOdUKuhFJgU1FSrZWEI9mM6cm3Kg+EDSb0JLBchEbkM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBp02.wasm",
        "name": "PBp02.y107rcr8f8.wasm",
        "hash": "sha256-+qjvoQfcHu+u6shSnBL4IHH3FOT07gY5qtOkqrdF8jc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBs01_80.wasm",
        "name": "PBs01_80.0j0sj5x4cb.wasm",
        "hash": "sha256-rChyCc/yp9s5sgkzFnblTIF1UlbJ5NOOU5FqG8H8/6Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBs02_80.wasm",
        "name": "PBs02_80.eg0qkt92zw.wasm",
        "hash": "sha256-zrxu69QbUdtEHl3ZDcBDuU4vHWDfYYZAxPzBFXqYZTs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBs03_80.wasm",
        "name": "PBs03_80.wj1jai8i0b.wasm",
        "hash": "sha256-ZJ9NvQzXIC2+nwF/sNWx/k50cuikCBP5AY660onQi88=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBs04_80.wasm",
        "name": "PBs04_80.640hio3tmn.wasm",
        "hash": "sha256-KsOaN5VnJBSiwpPAncnrSv7ylOhastOaUY2Ls598ByA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBt01.wasm",
        "name": "PBt01.tb7m9mxhub.wasm",
        "hash": "sha256-ZyAinYtgeKSfS/Aph63L0JMQ5zU057jdC10CelOPoEs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "QueryManager.wasm",
        "name": "QueryManager.ujmn52qx6v.wasm",
        "hash": "sha256-6h7WuMH6A6MN8Zzb5/N5rWt99hU16Lo7RJXW4VwK4EE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Refit.wasm",
        "name": "Refit.yhpsrezx12.wasm",
        "hash": "sha256-6iykEYbyNfu4QWeDzz6zWFcoOffqDM3GIr6G024wcDM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SBOS08.wasm",
        "name": "SBOS08.zegai1f51x.wasm",
        "hash": "sha256-m5ftka26UukOqFB6etkGwx+TYhMVVenUr3w8xWvz80w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SPBds01.wasm",
        "name": "SPBds01.uu2458ru37.wasm",
        "hash": "sha256-dlxJA+lNvYQxOtwRDTOgtZyAoEmlKV7wFjnhiXN8o1M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SPBp03.wasm",
        "name": "SPBp03.feo7y2bxpi.wasm",
        "hash": "sha256-ue5w+cAGMHSglX/JX+auJ3wNdgE7sGwFysuWGUbM/go=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SPBp04.wasm",
        "name": "SPBp04.oaa4qtumh8.wasm",
        "hash": "sha256-4KQP6PiXaXmCS+HDhY4BSGT/JkA5FUuisZlYvqlE3mQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SPBw04.wasm",
        "name": "SPBw04.rziyrt8h5v.wasm",
        "hash": "sha256-p+Oc3x0iXMpwy+joNUDcQaiQED4uBM+gKetGrhh6cuk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Extensions.Hosting.wasm",
        "name": "Serilog.Extensions.Hosting.ga0d2eif33.wasm",
        "hash": "sha256-SKP6cDd2XmnVLK7nHMghK2jaAqlYWou8W4urmcXf0Jg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Extensions.Logging.wasm",
        "name": "Serilog.Extensions.Logging.c5cc0ibnpj.wasm",
        "hash": "sha256-gMBqZRCVC4UlkJjlOEQH442qlbdHqxsxjv25ttf/H8Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Settings.Configuration.wasm",
        "name": "Serilog.Settings.Configuration.frmp3wlrnt.wasm",
        "hash": "sha256-hU0k9WtnQPnHdpUk7vh+2Hpu3AXuuDi+qvxj7TC4pYs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Sinks.Console.wasm",
        "name": "Serilog.Sinks.Console.0356py4lqn.wasm",
        "hash": "sha256-xJ9THgPB/qXrs/NXQcZGTL0bBNJ26l8ObG6bVVhzU40=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Sinks.Debug.wasm",
        "name": "Serilog.Sinks.Debug.6ckhhpkrnk.wasm",
        "hash": "sha256-NjYPtCYGdjl+cVcCkss8+oH4AoYeMOZwcKmfx2bZyfY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Sinks.File.wasm",
        "name": "Serilog.Sinks.File.q7nxmkew4b.wasm",
        "hash": "sha256-OobkpyMmgQfHKLOJZcDwNH9ovaynE1/wVp5bp0kRKIA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.wasm",
        "name": "Serilog.q6ud3ue4jq.wasm",
        "hash": "sha256-7iqT+AfVUHe69JVJJSGXyqtU05V90mylu2H+U7DU+lo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.HarfBuzz.wasm",
        "name": "SkiaSharp.HarfBuzz.wo40foal5z.wasm",
        "hash": "sha256-QDnNy/ugr6b4YeyF+FuAd0LpvF3aoxNGX+s4gMXwnSU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.SceneGraph.wasm",
        "name": "SkiaSharp.SceneGraph.wokvok8h27.wasm",
        "hash": "sha256-gN1Udz936wqgMxEcdpmO7kmhRhUwKRODgeqrtwedCBM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.Skottie.wasm",
        "name": "SkiaSharp.Skottie.umy6gc9img.wasm",
        "hash": "sha256-KjtTA3gtkDijJyfYk8Oy2dz7qX5yLAOIHmxtobxGEn4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.Views.Windows.wasm",
        "name": "SkiaSharp.Views.Windows.iflcqmtalc.wasm",
        "hash": "sha256-gka6fRAZe7/CLUsYBT7vDMNhKM5r5cgHEoQrByY8Fh4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.wasm",
        "name": "SkiaSharp.4whaq4sj2y.wasm",
        "hash": "sha256-FOPKIylOq29DfLGhmSUWGfmOyz/udjgMNrjJInNiWaA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SmartMaker.wasm",
        "name": "SmartMaker.n61ay6uf6c.wasm",
        "hash": "sha256-f/4Nv+cGgmtWQ7GPNyOaLKVH/WY3d5g56ZNOVc60oGs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SmartMakerUno.DataContracts.wasm",
        "name": "SmartMakerUno.DataContracts.hb1w99216l.wasm",
        "hash": "sha256-rZtzsiSn0F85iJUIWCUwfjYYgcbk3KaMUCKW+eSxA7E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SmartMakerUno.wasm",
        "name": "SmartMakerUno.rm6oqbbnm6.wasm",
        "hash": "sha256-kw0MgvcuV2wF5CR4RmXJAOwf0BqFp54LNenDKY1z9ig=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Std.UriTemplate.wasm",
        "name": "Std.UriTemplate.a2dbrj5s4i.wasm",
        "hash": "sha256-HnIziF1Kt3L/S0hdGtlAdd/rBtmfT1RUBDvL55H3Los=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "StyleResourceDictionary.wasm",
        "name": "StyleResourceDictionary.620bxvpcp0.wasm",
        "hash": "sha256-DgK8k+2w4b0HjZtTqAAhqrySooS8ChdozTb4esy17qo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.btmwue87xb.wasm",
        "hash": "sha256-ga5ZjqahvbTg3fgvXaJf0niy9awi+WePtQm5p/VIRrY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ClientModel.wasm",
        "name": "System.ClientModel.8j5eiu0uyl.wasm",
        "hash": "sha256-hB3YvRqtJh9HC69ryOu2jplvTqYa8opx1wPk+N/txKs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.CodeDom.wasm",
        "name": "System.CodeDom.zwd5olb9kt.wasm",
        "hash": "sha256-Ta73povSa4qpNQaS0HE97lRH+um/r6oP5yWDvZ38uOY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.w97y58um6d.wasm",
        "hash": "sha256-rAGrR0qQq0/B4dFzkyMjI5Lidx4ZsG2afpY8eOJKPbM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.qu4jo5ixaw.wasm",
        "hash": "sha256-Uks5lLFLytJouNSVPmmTG3O/4d0AlkzJkcIJqfevJnM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.83u8irwov7.wasm",
        "hash": "sha256-rBcKUqDJJ/T9aNNjMlGgJxgehVUiVt4ojoFcnrGgypI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.k9yhk5er5q.wasm",
        "hash": "sha256-SNAsGxbPLNT/YuRGaGTuJN7iPzhwH3dcKGzrl1UTmHQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.0a8i8yqg6g.wasm",
        "hash": "sha256-aGqljtwBw3UtFi/JMsz4cDsPHn95wksYINfFwSWRDLU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.nsh5yif36e.wasm",
        "hash": "sha256-qXzaGM/cpACUSE8Pz68XwUQXKHfRi+zReiGIfGtQqIQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Composition.Registration.wasm",
        "name": "System.ComponentModel.Composition.Registration.byo2mx79yu.wasm",
        "hash": "sha256-05QYrWjyVD4BuhvbugElwlP1FgDrSn+N/SaUgICcXlc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Composition.wasm",
        "name": "System.ComponentModel.Composition.k5iydgc1jo.wasm",
        "hash": "sha256-mAIqlduwpri7cNtu3EaZX4haM13WMKocw7mileTUvh8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.mkgf9rubvy.wasm",
        "hash": "sha256-ppaIUOrQ5wIwAZcTROxoHaQBtZoW5S7GADQ5LaF5p18=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.6d41py7e2r.wasm",
        "hash": "sha256-psIVX6Njmez++Y8bYDrZZW6/TGTHWxg+88w8MfYhRQI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.kfuunsvjm2.wasm",
        "hash": "sha256-kAytm8tWMk0jHAlY2nGYmQljubRYtpWmhsaJ0zIP80w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.445m53s9qa.wasm",
        "hash": "sha256-ZNR3MDsqRkIadKKZEvpMk2cLA5/gdMAcAzvCTCJSB6c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Configuration.ConfigurationManager.wasm",
        "name": "System.Configuration.ConfigurationManager.cj2anrp4d6.wasm",
        "hash": "sha256-WH5K/rYO2JIxmr/pJQA0tYu0PiSIiGVMRPVftayVNbI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.avzfu04mkg.wasm",
        "hash": "sha256-qv7pQhhYIkHCSy7cCd11Ukv/8If/nVxOHmyqaC3WUBU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.4vgmkfqlfe.wasm",
        "hash": "sha256-IPGloPR10t6ph5tl1FKdfjxBbMJKTgfEN09uDv6peb4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.iyyz6drmly.wasm",
        "hash": "sha256-uuVKWostj102k5CIw3no+UNliRY+zKHoB6ASmxZQld4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Odbc.wasm",
        "name": "System.Data.Odbc.samnievy32.wasm",
        "hash": "sha256-pIplw6aRlVAht4NLFlj8HjTCdH0TTOwkzhyLz8CyNKo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.OleDb.wasm",
        "name": "System.Data.OleDb.4t9jqw2nnb.wasm",
        "hash": "sha256-aHJl9uLgF+IY79pQOslZG0RVydCXQr34otFJpWeBAM8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.SqlClient.wasm",
        "name": "System.Data.SqlClient.vaz7zm3idp.wasm",
        "hash": "sha256-iYbwVX+Ox6mN+QDwYtChHi2bCsyVs/ik5uUk+TSew5g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.47b8g8pl0e.wasm",
        "hash": "sha256-UBVPLBu+mBKpv/EHYDue1Y/yJXfg2yA2Nk2BBJ3W5RA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.wm7nawfsyh.wasm",
        "hash": "sha256-aECsrg3scwkng3874J1IKCvc798UKONSkizYlhS3qaM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.EventLog.wasm",
        "name": "System.Diagnostics.EventLog.0prq9jxqc3.wasm",
        "hash": "sha256-TIxgIocnr5i6dKQd+3vmJkpmJSLNl5NAFd3PLSD5BlQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.0essyh86mx.wasm",
        "hash": "sha256-SDuX895E7aym5/KZfk3DnUhAX0CJK4xBJFzP6LphNVs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.PerformanceCounter.wasm",
        "name": "System.Diagnostics.PerformanceCounter.4yntq8p9ug.wasm",
        "hash": "sha256-fGi7M3zcOUVV3vWi/qNwYGMrMa2wra5JtwpOcjzcseo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.3e9qnw942q.wasm",
        "hash": "sha256-CzmP6X0GP/pUZ/9MqGRbjdmpDHvevWxHnwzqmR1E0Rw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.bj9yel8vbs.wasm",
        "hash": "sha256-ORkEeVx9W77yrQvYgXrlDot9DvTQBC7gJ1y5wuK1Y5I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.rxagaiqsy9.wasm",
        "hash": "sha256-Xw3om67ehZ0HC0aX0/Ao0YPmJ3NusspkBnhwmgx0i3U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.uhzeoohchp.wasm",
        "hash": "sha256-MjPxtr6kg5B6Ep4Hus8PLGmdur80sczdCEMudWVbNkQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.oc74tua7q1.wasm",
        "hash": "sha256-yCzerTM/DMzTSVjqiLIkJkWC+nx8g40GHnJKoGDu91k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.DirectoryServices.Protocols.wasm",
        "name": "System.DirectoryServices.Protocols.js50f0m31e.wasm",
        "hash": "sha256-U6y/2e1A9aMSkjC290Dk6PllcubPBFQUTGWHyofxQ14=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Common.wasm",
        "name": "System.Drawing.Common.n8o07ay9o1.wasm",
        "hash": "sha256-t6lqKmbdhV0PKPBEGGqL3eA+SmpPQXr12tNmD586k+I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.oexlbkzsmy.wasm",
        "hash": "sha256-YIeKz0x1tdc1IP3ge1RYHkdAqPc+cwg52JEgdCkTh2o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.e50j3te5oy.wasm",
        "hash": "sha256-fuFG0ksileDCE3MOsGjhBLpUBviTr3dDPuDfsktoW5c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.62mi0qiu01.wasm",
        "hash": "sha256-0nfvbPSYAfby2r9GOB2K0+GXzY/hJ1Cez8BINMTWzTo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Nrbf.wasm",
        "name": "System.Formats.Nrbf.2fp6fp5bbr.wasm",
        "hash": "sha256-0rZhwXSm4pzn2b5A+RZwPYC0sMqoZFWvFHvZW287hXI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.2k9b3bet22.wasm",
        "hash": "sha256-IhQ0zjv6xuRiiMiCasFfntoQ5nAfhXDSN5tSWzUH5t8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.mluphoagol.wasm",
        "hash": "sha256-Khg8Z7bldEtbAIp4E4tyjGj66bojLG1Nnk/fdNI8KWM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.xrq31knrv6.wasm",
        "hash": "sha256-s7Qc5RNQBZWwU06xq9EKqUuYIOzXP7fj5+dlDE2iuNU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.wb5qe4gqlv.wasm",
        "hash": "sha256-hIRn2Xc6s+S1UNrYsOmbu2uFolnCBpl3umo7BgUGbVk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.j0qtxb92be.wasm",
        "hash": "sha256-8wXPvcGbIMNC4HYEyWShBDP6CAtPWpmswuO2K/EDKR4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.9gghxwlw2n.wasm",
        "hash": "sha256-if5QryK6FsVqRnl5ztMG+CJjyP8vkfHINuHnTF1N2V8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Packaging.wasm",
        "name": "System.IO.Packaging.xd892c05im.wasm",
        "hash": "sha256-tcRq9rmDtVVyIp90t1LpxpTWuEYmKgPa0zFFNYEHFQM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.ip1uqcwr8w.wasm",
        "hash": "sha256-2tGVbRVrKmikS//nUu4PJO6t5+BzQAVvfsF8k70HBto=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.0zslkthbqq.wasm",
        "hash": "sha256-7H2TbCiLuIEaYrSHiIhUCT9rtN7W9EcE4Q/BnPZOz7c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IdentityModel.Tokens.Jwt.wasm",
        "name": "System.IdentityModel.Tokens.Jwt.4vfh376ef5.wasm",
        "hash": "sha256-kKnYmK9eI7RFA2v2weGspPIqZigRO1xNO+XRdhYQ+A4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Json.wasm",
        "name": "System.Json.jh0shol1ss.wasm",
        "hash": "sha256-d5IdPGK0bxQkzshQDJqETxcP3RFwrjnnj/mpzoG2XhU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.5zqdc5pe3j.wasm",
        "hash": "sha256-0ZmBZbHd/Zs+cA4XnX635q+Sfa3VCcCqGiuzW+MuhcM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.ua1gsrpb3i.wasm",
        "hash": "sha256-al332L/HrE6m4IyWmA0gtlbscvxcgHUoWyHfxHy9QZ4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.29210pjf8u.wasm",
        "hash": "sha256-WkqBkdemoOnjHmhF8Hw6YGsL899xNG9eET8I3IoWHhk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Management.wasm",
        "name": "System.Management.cuckkxdlfb.wasm",
        "hash": "sha256-/LmnHTEU8rbkaiPBTLd9+SJCZi4nkBy7wp6hi2ixtrI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.Data.wasm",
        "name": "System.Memory.Data.9qfc8r8gag.wasm",
        "hash": "sha256-oa47oEq24c04+SqrF0aDKfadFgOh7up7I5vdcwdrLOw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.2jwi5rc3e8.wasm",
        "hash": "sha256-0pn1T1RHU4LVbkU+YjARkX86YibiMek9r5+KL7nQn5Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.pi2jdbrqpf.wasm",
        "hash": "sha256-fwOCTdx3KS+FLR/wgJZBnVKwCFLEOoroU4nnClvbi5I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.h6f0f20ei7.wasm",
        "hash": "sha256-J3wkrpsZadfdRVRnhf97fIBVNZ42KVv517Sx2Di8hHA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.a959rh30z3.wasm",
        "hash": "sha256-Im4UsMrUAfr/BWzLYnJJO8Qnk73sKhNK2KGBlkEpfY0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.1lrqxqbc95.wasm",
        "hash": "sha256-29i8tVXgDeHd3TRfIAYMR+AfZw5Uds/F/lUCckwPuoY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.zaa4gey7y4.wasm",
        "hash": "sha256-K/X32YSQtmwE+YONEkyT/dze/nvAIlOWn7H6d6TZyFQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.jrwjug113u.wasm",
        "hash": "sha256-YWUeWipN+fK8MzyL2ZTByvlRefbugYilurEC2HPooas=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.1438bg9tme.wasm",
        "hash": "sha256-P0MzChAd9de0qCVjPHrpjFG5Es4ZwdN5ycqrBxDwKvQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.dqpmdnpn32.wasm",
        "hash": "sha256-O5sCc4OX9YWMDQq8MKOZgu3w7Lu2AXJVkjvuAEx0xpk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.1l711hzt4t.wasm",
        "hash": "sha256-Wy7M4Wm+5NH38Uv3MDOlMzeLQMCbu59Mamrn46m1FSg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.vdrnqg37zl.wasm",
        "hash": "sha256-nYuSI4q3NKqrl2ZaN8ekFQKGTpl2XU/yKK7rYG4Uwaw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.opqy1ganvh.wasm",
        "hash": "sha256-vPzNLLD1QRkwf2IfIfjpoLjwrsDq0ig3htEzOgu/TvQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.mehvxjod87.wasm",
        "hash": "sha256-IukK/eVfNeOHFtB1PnLjBAOBr3DdcoB0eeGLBI8fCTU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.wo3po54v5z.wasm",
        "hash": "sha256-8CoF0ZdotJIjO994tJWnfUfBsoQc0WRioS6t5RxbPrk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.ctyb9axnul.wasm",
        "hash": "sha256-AGYEx8Kdw9ZpsoqravytF4XqRSMkvLWmXxxZobMsA04=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.phk9rxd3fs.wasm",
        "hash": "sha256-/X7HSPKwsvdfFnFDCQ3lLfb3EGRTWuXB4gcm/rn9v6w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.blft3cuf5b.wasm",
        "hash": "sha256-LyesHZXhJ/QYJj0wYMQQC3YPCRM6hbzWLTyxKN+i5qc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.Tensors.wasm",
        "name": "System.Numerics.Tensors.czqizmpw6m.wasm",
        "hash": "sha256-6PuY+6WAkvvnEhJkwTOjIbuMTVk08/kXc9Qn4uQAALY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.82jvx54xkf.wasm",
        "hash": "sha256-QOerzKtBP2tmB0GSdOE9TkBjHRd+jzQC3y3Izj8uAMU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.4f1fa3tsow.wasm",
        "hash": "sha256-EEXp2CktT9XSqYYdFz8puBaTt+HxKq5ywQVCI7AwgVo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.alm7bapzb2.wasm",
        "hash": "sha256-4u4nXEIjaaPL+QZJY5yiZ7K7Ej1Pm+FYIjIQpC/HQFk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.zn1x1c09e4.wasm",
        "hash": "sha256-rxevlzgI2TZ5myxz1SuWtD/QYM6CErCE+CNaYq4kP10=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.3ewoe4rfui.wasm",
        "hash": "sha256-+4cVVX43Wa4qBl0YpaQRQ1H4H6YdqsqH6DoDnQ3cDyE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Windows.Core.wasm",
        "name": "System.Private.Windows.Core.e8re9x14uz.wasm",
        "hash": "sha256-oqG9gP9TrU/Rjr6n6ozKD3cgCp+KYlm0cukoJXnI3/s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Windows.GdiPlus.wasm",
        "name": "System.Private.Windows.GdiPlus.tdvv0ip8sg.wasm",
        "hash": "sha256-ocgstLKwOB4PFUpdYZjN9j6kPD6Ba0DzDdHx4RJGYvo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.au85kp4km3.wasm",
        "hash": "sha256-ApTJo58jKDAA7fYClnwnTE6VsYWHMydNV5rpmFR+L8g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.5s4akd76sl.wasm",
        "hash": "sha256-tQ6xNMG6M+wTYhPSiB698wQvQROaXnLvz/I7YDq+G+Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Context.wasm",
        "name": "System.Reflection.Context.39myiquz2c.wasm",
        "hash": "sha256-Jz9jPa15WlwVGDfcJ8/1Qsm6GfIlZLbzStjvaUUkpls=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.nyc8pcnmjj.wasm",
        "hash": "sha256-n0yp8odVWFgB8Dmd8giDdqG71lgGuRjIgJwfWSTd9KI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.yhkvudv94c.wasm",
        "hash": "sha256-httoMDFT4QVJJdaOppE3ski6/G46/aIAQElK5+L8of4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.58a52741nd.wasm",
        "hash": "sha256-BQE3T2HSFkpiLmt9Sq1b3ai9k1CWbsmRAk9D3IDp0lI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.kfdyypzq66.wasm",
        "hash": "sha256-gHFWE0t7Jnv1u2My51AKV7YMw9x36Nj7kYEyQ3Jdorw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.expd1u6mil.wasm",
        "hash": "sha256-gn2c6YvlNYcUZQFP3Iv318DRirDOzQr/ocRTXnP2XEc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.vjaepo5b5z.wasm",
        "hash": "sha256-61WD7O+lDGJR/LMFu1GV0BaKpsZeqFt3ZJ6ZdbbTYBM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.qcdw6vqpki.wasm",
        "hash": "sha256-mo2y/v+zey8ez/bm9LFCX3trJwiFNnnfzdR0LIXvhuw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.iac7o7u9ck.wasm",
        "hash": "sha256-+u1mXp9uVRh21pBfoBYTyawU7qfmVh8K9uWm9W+jtXo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.xrg95n45x4.wasm",
        "hash": "sha256-0+Ff5E+8GGHDwyfHgS2z5kr8JRd/q+z6yxgJM2tWYJ4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.4zdmvd4wz0.wasm",
        "hash": "sha256-QAOc7NtrKoxREv1eWBMEeBt7hKPoKGgdELblcNk/J50=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.qxdirhd5jk.wasm",
        "hash": "sha256-8vmbhmzvRsjnKJSbj2PFP91g8r7XITzSg/v6m+vWFs4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.1dz419mfe2.wasm",
        "hash": "sha256-BRFEqB8DUEFcTQYotm4Q6UYfRX7evxdEjra/geEN8dU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.jfkfaigzvc.wasm",
        "hash": "sha256-L6ct27bnOPIJdnD5N+YT8xXY9997DG9+4xaeVGqzSnA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.x4rlo4bhpz.wasm",
        "hash": "sha256-oRTOJsfxM0gppNatM4vAeBb2qQVgYDSt/oMfTxTr6PU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.3xokes7zqw.wasm",
        "hash": "sha256-2Vbq4muEB3LM759p7roE3gaRaLOW1oC5SX0azu9xaVE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.ahnuvkd9yd.wasm",
        "hash": "sha256-os7w5rgvyyiJ7VyPqs3nrtp6JhmsxzX2t5Wy3N/LEtc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.6lfibixsz1.wasm",
        "hash": "sha256-ll0S7xemqdS/8YaVk7is1Ygy0c1yH0yopILzq8urEgQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.xdjsufdcm3.wasm",
        "hash": "sha256-JZtl48pgPd1P+1+uXFvpELjVM7MqU6vJHqaLoZI4y6A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.dc48l4b8d0.wasm",
        "hash": "sha256-A8PQ+gmf74bt/WrfKak0jTgeEWlISgkGxIfrOfsa5ww=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.v876vn9ldp.wasm",
        "hash": "sha256-0Yoo/pE3KaOJeu8EsMJxkmTSk+vlcYOqG5iHze5D9bs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.q3zgc6fzy6.wasm",
        "hash": "sha256-tilOxbYZaGh/0kg0hqgDcFYozS+sq6qDCVN7qc9GE+k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.k47o3ldodr.wasm",
        "hash": "sha256-FGGgSC2z1kkJ+yn2QK6bE9bNS+uBmnKk5/O/Tvr4JtI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.ef92vletvv.wasm",
        "hash": "sha256-Oq8mNpLHpcsLtuMox3koj5NfdiYKUwmQ71BOHPTFcrQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.zzwxc14fmr.wasm",
        "hash": "sha256-sarlXuz6tle8UPTEO/NwmGVJ7GCph7t3r7TJzKk36xE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.qoxm7qc71f.wasm",
        "hash": "sha256-9hxCkLsSk2//40VCKNYLG4WLhceEBgKm/31eJ1sGVbk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.p0c5ea4mdp.wasm",
        "hash": "sha256-5z2kalfeNRCesf/GUPzyCQ8XysTCo6DVjN7hdyNrweU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.ProtectedData.wasm",
        "name": "System.Security.Cryptography.ProtectedData.9p6gofcbbg.wasm",
        "hash": "sha256-7bmuuZXd4Awji5EXaNyPRWYOnfrnJla9iPVQBR/GwdE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.vuq5otmr4h.wasm",
        "hash": "sha256-N+OTVgHPE+AQriNLn3hkzYK2dX2rSH9VW/IDdl9TloA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Xml.wasm",
        "name": "System.Security.Cryptography.Xml.8u4kkgrhr9.wasm",
        "hash": "sha256-gOauVI9uCfWL+hoHbO9CImYoyqn8f/3I428C24IyL1U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.2b6r0fy2ii.wasm",
        "hash": "sha256-rpS58gK54eYDNFF2j/Qp/KMX+B+ZfeImd0/8rmeoVjA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Duplex.wasm",
        "name": "System.ServiceModel.Duplex.c4uwjesfm7.wasm",
        "hash": "sha256-hDRPWDnJFeriE3VXX+yvKgztqrf4gm/HxS8vPTN7K6s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Http.wasm",
        "name": "System.ServiceModel.Http.at90t0g2u8.wasm",
        "hash": "sha256-UhF9cNlE/TazZzwyoEX2z5nRVArUpbhrhASEgIM8QCE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.NetFramingBase.wasm",
        "name": "System.ServiceModel.NetFramingBase.v3krij1lir.wasm",
        "hash": "sha256-dZOsgy1g4w6elKE87wBSakrdkxFbrNAuZoVdXWdgfFo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.NetTcp.wasm",
        "name": "System.ServiceModel.NetTcp.eue8twjesa.wasm",
        "hash": "sha256-JmobzTKkZl4UlEJiyElVzl0sBJUEuYNHo03jyz7y6YY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Primitives.wasm",
        "name": "System.ServiceModel.Primitives.kw3e401vs2.wasm",
        "hash": "sha256-vKAyS7fB8F/Sn2Zveg+BrABsoVOzM129Sk0GapJIBME=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Security.wasm",
        "name": "System.ServiceModel.Security.diubfhz3ez.wasm",
        "hash": "sha256-y01Oy9ZlPVz2kUtL/h+fD++T1jWKmhsdg3qOJWj/Be0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.wasm",
        "name": "System.ServiceModel.np7p6p03h6.wasm",
        "hash": "sha256-S305rbad4vI09YUyaso0p7GAlE9yXFXQ0Pcmd2G6XGg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceProcess.ServiceController.wasm",
        "name": "System.ServiceProcess.ServiceController.az0dxupmw7.wasm",
        "hash": "sha256-Nk9UCxrjwVUNEHrzvLMDY0vZ6Hy0PV3ejm+n7BOkRqc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Speech.wasm",
        "name": "System.Speech.dke4vgdh8q.wasm",
        "hash": "sha256-Qw7CSoXe1xeQ80cQq+2hj8njDD+Td/IbiWCM7gMahhs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.m53gmbeaph.wasm",
        "hash": "sha256-BkrdSjyccyDzI0YVzscSY5TUDsD6XP7jro9jh5MRr5A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.wgbbdye3r0.wasm",
        "hash": "sha256-MFw4smvDRBncprZq4DH5NH/uNZxvOCRLOUu7hZ2SNRw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.err344jf3w.wasm",
        "hash": "sha256-tkxFycMxhiviYBjUkk9LYqUdIhHVsC93hoIHFcruawI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.b1jvk0b9t1.wasm",
        "hash": "sha256-H/aNLKLUV9Uq+FQlh6r65iOXuOXEciMvBA1bF6LOTBo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.5ef9l8uwm9.wasm",
        "hash": "sha256-LetLFNenSyIYlm/KgcNpSY1aAonlVm/cMn1E7Ini338=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.zkrq10qgbo.wasm",
        "hash": "sha256-I09Tq8zEWUIACYWMCXD635OTXWORDoIdtaJpUFaeDzA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.h4abgd07pa.wasm",
        "hash": "sha256-/9NOYJA7aYiIpyQuQ0ODMx08voo3T+fUjz1fhYVWHiQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.o4gwdx5szv.wasm",
        "hash": "sha256-WEVTHJT6T+CInEcAX+16C3KpIxb8QCjSr1uPNS0EiSc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.foghjsqkkr.wasm",
        "hash": "sha256-r/EhRleozEFSRkyM3eGNQghZZXYovLhe/JQdoHqoXNY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.a5xg1clc42.wasm",
        "hash": "sha256-MlN3jcvARR3XEwIMpXowqheJLxBPR0eePi5xlPOkLZc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.sc0dfi9jsu.wasm",
        "hash": "sha256-9HVsTCx1qT2r9fsG98meTtmIHG+9+qr842/iz/vWCqI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.o4tgypnu1g.wasm",
        "hash": "sha256-eE1UuehIJgBEOGMPkoK4PdGCLo/DU0vPwhSeed4uVL4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.Services.Description.wasm",
        "name": "System.Web.Services.Description.dqpfzo3jzz.wasm",
        "hash": "sha256-BYPGbxaNUssmIKdINafLhcsKmNq5ifemKeq0K3KrtSM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.224i7l5jfb.wasm",
        "hash": "sha256-CtCEVMVCGg9HoHtIFvGwAiLGJrg+KgImS+oc8purBE8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.dr7cz34ogl.wasm",
        "hash": "sha256-tx6g6zOrUsfpmi1cUDW1MpwzoUxku+4jVmRNYTDadA4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.y01e70rf75.wasm",
        "hash": "sha256-Tiw79tMn8+WrP5KYRaELaFMWiXfJhVTHS+3fDRBR2Mc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.je52anz03g.wasm",
        "hash": "sha256-JUL3STlSWyHfncat4FfzpTdCNFwqOFCVL5bZsgOLZ0w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.0njijy3m73.wasm",
        "hash": "sha256-FGH4gklnnRv6g04eTi+Qs6WSZ4EhWbKT/fUzMNHqXhs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.3jsszphcza.wasm",
        "hash": "sha256-kWl6CkqkzyX3t1tDwdTJW4PZeIG+FM4A+w8Fjrt7Y9U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopAIAdaptorLibrary.wasm",
        "name": "TopAIAdaptorLibrary.dbjtqtjawa.wasm",
        "hash": "sha256-CaVIbf0quRB9bHu+gUicA2ytxXBwo6JcGxg1TRjQex4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopAIAdaptorManager.wasm",
        "name": "TopAIAdaptorManager.izbt94v6nz.wasm",
        "hash": "sha256-7oqxTooIIbNMPdgTSyF/eog5KLcBaLNAnIQTdFaBz30=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopAnimation.wasm",
        "name": "TopAnimation.z426w9sba3.wasm",
        "hash": "sha256-U7TgorhOrjMtIXrAb9BYkCLipI3ofYupfHNmNm5PBsI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopApp.wasm",
        "name": "TopApp.tcpu8t6hzz.wasm",
        "hash": "sha256-I+ico8KKbuuhpTzkhff+E0L5jZSGePfUkGJnndcIEQg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopBuild.wasm",
        "name": "TopBuild.7z0byan4rr.wasm",
        "hash": "sha256-TezLGCGszk2jGcGDcmtwm4LY4MkyEWGYwyMLgIW/HgU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopDBManager80.wasm",
        "name": "TopDBManager80.elxt02z4x1.wasm",
        "hash": "sha256-rjioe8/KWYi/rUJJk9trYXhAl2VQYWU/IioCxD8cXnM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopDBManagerLibrary.wasm",
        "name": "TopDBManagerLibrary.fjp01pfqv7.wasm",
        "hash": "sha256-tWks7QnKuzGyrfBZlt7jTtFXMIxqkTBakiK0LqF0Pas=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopDefine.wasm",
        "name": "TopDefine.76hxg8fafk.wasm",
        "hash": "sha256-0Yp5StAbY5eeo6gOSQSWk4wLoVRo6eJWNfF0H2Pv8mc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopImport.wasm",
        "name": "TopImport.l9jjkzpvcx.wasm",
        "hash": "sha256-t8eaqZMgB3S5Io35IWzIMnq4lstXuOyd+6kz3oxK8nw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopLight.wasm",
        "name": "TopLight.vaj3b61plp.wasm",
        "hash": "sha256-d5f4kffxaAlvcIFIEjzdafJsTOchLYIp+WdTo9Aybls=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopResource.wasm",
        "name": "TopResource.38rhu4ouum.wasm",
        "hash": "sha256-ExLDXIM2M7wyA4ewiaqkSP7wb8kzx2E7J0IXmuzGQPA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopSmartResourceManager.wasm",
        "name": "TopSmartResourceManager.lls6zjquzt.wasm",
        "hash": "sha256-SSWqLEsAAIggMWtmhAmUAOuI2rv9Q4gs8jtocOPsZX0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopStructDataLibrary.wasm",
        "name": "TopStructDataLibrary.s1z7x6u10t.wasm",
        "hash": "sha256-0JkGBqN7Dn2B9Dre1/jD7b6FD73idRCdO/z7haes/xU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopStructDataManager80.wasm",
        "name": "TopStructDataManager80.299ie9snlk.wasm",
        "hash": "sha256-qu7JujIxVzrEo2LXNUUm0yHUF8+0bw/2znG0Sw6FPgU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.wasm",
        "name": "Uno.usdcdbm4d9.wasm",
        "hash": "sha256-3mkwsUSL+SMiRU+4SZqtId9/5oo2soW74PRN9DbzF+g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Collections.wasm",
        "name": "Uno.Core.Extensions.Collections.bcv36uuaix.wasm",
        "hash": "sha256-leDrpUqxLtjqvudNMevCUABXPLFKcdmo2OBTRAcfrVo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Disposables.wasm",
        "name": "Uno.Core.Extensions.Disposables.yp3zvzvhmx.wasm",
        "hash": "sha256-audIWoXVtNDwziUihGzKOjBxB5ddVV2tSANIq5s5HCk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Equality.wasm",
        "name": "Uno.Core.Extensions.Equality.0uv6ultrww.wasm",
        "hash": "sha256-qMiqBUcKGtRrgQmLcBvEGbhaVajZMh4PALb8ScNNLJE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Logging.Singleton.wasm",
        "name": "Uno.Core.Extensions.Logging.Singleton.fdukozckcj.wasm",
        "hash": "sha256-wxrUaOEvr5I6Ii/cg88VGTUq68GnKp8fCQzg1PASo+k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Logging.wasm",
        "name": "Uno.Core.Extensions.Logging.zd0l1ueaug.wasm",
        "hash": "sha256-Ny5nr1IVEttXbkZ3LUVUJN4eXH//W2N719/QbXTJCd8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.wasm",
        "name": "Uno.Core.Extensions.kpa7l4r78n.wasm",
        "hash": "sha256-CJkHWXUHB2LvZitWTS07kvh/+iT8e0coCW41dsA4OFQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Diagnostics.Eventing.wasm",
        "name": "Uno.Diagnostics.Eventing.4hsr3dw7v4.wasm",
        "hash": "sha256-6L+/1UlcznYjJSNbQU8GZlXmhRyTotS7QyVzAjf5NGU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Authentication.UI.wasm",
        "name": "Uno.Extensions.Authentication.UI.5a6pt60n56.wasm",
        "hash": "sha256-8z6y5W9wL2iqYwiQeRqBx400jsNguHUp+sfXEf3fblY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Authentication.wasm",
        "name": "Uno.Extensions.Authentication.5am58dhxrj.wasm",
        "hash": "sha256-81MnQoxBqcOa0homFzlZuC8UJX+RoBN1KVrIOUBTCFQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Configuration.wasm",
        "name": "Uno.Extensions.Configuration.oaxwi79rhr.wasm",
        "hash": "sha256-kI4kBeKGG3ALzNcSG7W42hMcJNrgNAy1kO2aM4l5gn8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Core.UI.wasm",
        "name": "Uno.Extensions.Core.UI.s0w2gkq0d0.wasm",
        "hash": "sha256-nI4FJWhv0VJP9LxBN2pbbgH4I5XCmj7ItOJ+Dk5QXy0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Core.wasm",
        "name": "Uno.Extensions.Core.m3ltp6kpm8.wasm",
        "hash": "sha256-7t6yg2t/TEb5PB0ubKjaVMM1fIi0vQawFNEBSM51Eyg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Hosting.wasm",
        "name": "Uno.Extensions.Hosting.l2g8d5jgol.wasm",
        "hash": "sha256-o2sJFT5Arka0xwyU4tbezDnZVB6LGR7qbdUlef9Z8Ec=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Hosting.WinUI.wasm",
        "name": "Uno.Extensions.Hosting.WinUI.1kezybayuq.wasm",
        "hash": "sha256-ccJGnMVnVeNBTEfJK0m19qo2vAQ/CmihWXtEJrsZp1o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Http.wasm",
        "name": "Uno.Extensions.Http.tp9xhgs1bi.wasm",
        "hash": "sha256-caD8D3jev8JGl/N4bH1wY5/gFnsGWzby7OWHmOXcL4k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Http.Kiota.wasm",
        "name": "Uno.Extensions.Http.Kiota.yygbchqwrr.wasm",
        "hash": "sha256-qjrXofFGIcURwhJEfomyJj45ouOUyoumJdE1HPaoq/o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Http.WinUI.wasm",
        "name": "Uno.Extensions.Http.WinUI.qa60pxx8k7.wasm",
        "hash": "sha256-4gzjpcTMy6B5lm98XAwYce6+3AUgL9TuT/fqcomvDRg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Localization.WinUI.wasm",
        "name": "Uno.Extensions.Localization.WinUI.yv6n2z6x69.wasm",
        "hash": "sha256-ntBS8wGrZ2V9ooudTkHGv4W+ATUJMnGhXX69ygXi7OM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Localization.wasm",
        "name": "Uno.Extensions.Localization.odesn0h5vv.wasm",
        "hash": "sha256-zP6zXNydVBoFwY0ML+PNeJzZ5/c/9IsdZw1nN1yptpk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Logging.Serilog.wasm",
        "name": "Uno.Extensions.Logging.Serilog.gemg9y8vcr.wasm",
        "hash": "sha256-aIaGSi/EGF4iJhqwCwF+AsPhOp5ocxPJw3jQ8xOj47Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Logging.WebAssembly.Console.wasm",
        "name": "Uno.Extensions.Logging.WebAssembly.Console.bwozftfqze.wasm",
        "hash": "sha256-y9v9CqHAgKV1SR0bPpBkVB1xQGRPYEFhaBuxIzICfbM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Logging.WinUI.wasm",
        "name": "Uno.Extensions.Logging.WinUI.ictvc7zodq.wasm",
        "hash": "sha256-riFxCUPVHFa7wF6zOLfaqHr5/e2oJEJUHqL1ZV2lRKk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Navigation.Toolkit.UI.wasm",
        "name": "Uno.Extensions.Navigation.Toolkit.UI.r4wqnrlvpj.wasm",
        "hash": "sha256-1Qd1KBRQhaG728GbOtf5PEeyqxE0NuOfqBvVZYGESNY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Navigation.UI.wasm",
        "name": "Uno.Extensions.Navigation.UI.e5m8d48lyc.wasm",
        "hash": "sha256-Ip8Dd/sfKgM7pS13qUUCL3fcAioR1TbnV54DFt3VOdg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Navigation.wasm",
        "name": "Uno.Extensions.Navigation.24nfa5uh8b.wasm",
        "hash": "sha256-Pj+FkPk4xSqRlhkbS4eXCR6Ma/cU09Ol30gAP2CReCM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Serialization.Http.wasm",
        "name": "Uno.Extensions.Serialization.Http.hufcf5wfng.wasm",
        "hash": "sha256-OT5dPIAd8nErGw89J3NoelMdckuIwinV4ZmT6PrXygE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Serialization.Refit.wasm",
        "name": "Uno.Extensions.Serialization.Refit.ws8blfjjun.wasm",
        "hash": "sha256-UMLIdzGaqL5IL1kNQHVKIllfb5dYDOuUYUeAjYtVSeo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Serialization.wasm",
        "name": "Uno.Extensions.Serialization.6ti34sm06p.wasm",
        "hash": "sha256-+lU4fpP+RjpnLGdEyJaIiinbcXAzS523S4V7LC86HXI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Storage.wasm",
        "name": "Uno.Extensions.Storage.upk40kvknb.wasm",
        "hash": "sha256-4gG79g0mvb0PfQ1tj1ZUau1AoDUYhZFCZO3gZYCvSp4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Storage.UI.wasm",
        "name": "Uno.Extensions.Storage.UI.yk9bo182tg.wasm",
        "hash": "sha256-QsFLHWi1XOQClWcnNQ2hiKW8ionxTNggC+0ke1itq04=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Fonts.Fluent.wasm",
        "name": "Uno.Fonts.Fluent.aj4vxe01pi.wasm",
        "hash": "sha256-St5XcM2YuaW+Zb3IWu195/+3NRTryJA1ksaS8P4mAXY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Fonts.OpenSans.wasm",
        "name": "Uno.Fonts.OpenSans.fqahigjn86.wasm",
        "hash": "sha256-l9I5oc1CC3AF8blY0LsbxI7RIfG/VUBNFFntjhwKtQk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Fonts.Roboto.wasm",
        "name": "Uno.Fonts.Roboto.e290i8pj3r.wasm",
        "hash": "sha256-GhAXmONTn3yAHIPYSBnZ70gIWI/1zQQobvH14SQrqno=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Foundation.Logging.wasm",
        "name": "Uno.Foundation.Logging.q6e1xz3h8m.wasm",
        "hash": "sha256-EpsiBNX61r9UQxMtw7G1SSE4dJgmNvE/b6VL3mpQlGM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Foundation.Runtime.WebAssembly.wasm",
        "name": "Uno.Foundation.Runtime.WebAssembly.4fbbo3ea9b.wasm",
        "hash": "sha256-kHLliTirV2gzMLmqzK27SAVZvkYaNprJzWJfnROBudE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Foundation.wasm",
        "name": "Uno.Foundation.oey9tcftxh.wasm",
        "hash": "sha256-kMzdSw1lIDfpgT71FL2ygUjSNKOrkZTRueMBWCrRkCY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Material.WinUI.wasm",
        "name": "Uno.Material.WinUI.donmuk54s6.wasm",
        "hash": "sha256-XR9ux9ROPSxYWHb0Y9IF1pyhsjpTMOmJalYIg8cytpo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Themes.WinUI.wasm",
        "name": "Uno.Themes.WinUI.rnxphfproz.wasm",
        "hash": "sha256-WewcYx4/za2JrnqI/fIajVuVxiLhJF89RAnyGOwsua0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Toolkit.wasm",
        "name": "Uno.Toolkit.kk95kgtwgs.wasm",
        "hash": "sha256-tGOLiUvXq1Q2rF+70z0NyK5zFXtocRSX1EkzgGyQE4g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Toolkit.WinUI.wasm",
        "name": "Uno.Toolkit.WinUI.n4nem0j7ob.wasm",
        "hash": "sha256-ac27IA5C7rCJWNlaDb/dxgcoZvzzLrbjl/U62JxR5Js=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Adapter.Microsoft.Extensions.Logging.wasm",
        "name": "Uno.UI.Adapter.Microsoft.Extensions.Logging.tnnjn556s8.wasm",
        "hash": "sha256-d4bCgMbrnw6T70AMrRoBKvXdsBb8zezvZa/DXWEqAtE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Composition.wasm",
        "name": "Uno.UI.Composition.cz6sqm63xq.wasm",
        "hash": "sha256-qFtJsmuiLI/3p9dyC80rRa0TWjO4vUwWLc698B4DFKM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Dispatching.wasm",
        "name": "Uno.UI.Dispatching.yva3695bmt.wasm",
        "hash": "sha256-IgxiZgn/uNft6B/GVY+zO84wj6MuZMJAxdEisGk1kSw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.FluentTheme.wasm",
        "name": "Uno.UI.FluentTheme.x0a0c2sken.wasm",
        "hash": "sha256-wcbFEyCe5YBGKvBNPJt5W/aoM9V9W3crRVDqAPnBQ60=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.FluentTheme.v2.wasm",
        "name": "Uno.UI.FluentTheme.v2.qkh5q1i350.wasm",
        "hash": "sha256-OsYXzusbeTYlPo8T/oYC0XBJb06lwVOwCvosGg8mLtw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Lottie.wasm",
        "name": "Uno.UI.Lottie.vpu67215jj.wasm",
        "hash": "sha256-A+ASXiOo3vJ7lmji/jaKsbtUIdueTZ7xlBpsmWSpgqw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Runtime.Skia.WebAssembly.Browser.wasm",
        "name": "Uno.UI.Runtime.Skia.WebAssembly.Browser.78ok9scxba.wasm",
        "hash": "sha256-p1AtgBOG9khYSyjUsW3Co4GX8fe1s3BAV+9QmAEDO3k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Runtime.Skia.wasm",
        "name": "Uno.UI.Runtime.Skia.lzug7tmorw.wasm",
        "hash": "sha256-H6QPGwwDczy6XH1ypYZgYYlLyYX11qyvRiTFqxnWGEI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Toolkit.wasm",
        "name": "Uno.UI.Toolkit.av3yokwmy8.wasm",
        "hash": "sha256-FrAhP5d2lCNfo9PqF4Df5vKp1U+5uHYZZfl08YPhCKs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.wasm",
        "name": "Uno.UI.cvs7uirzyv.wasm",
        "hash": "sha256-6GM9UbyXojZDj5ZGez1pJgLfO3smqHr0JCAWs7hupiU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.WinUI.Graphics2DSK.wasm",
        "name": "Uno.WinUI.Graphics2DSK.9m6q5ehno0.wasm",
        "hash": "sha256-/26oAiNV+7jnaooXZI/5XPu46vsyYcg7F5PsIyzHouI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Xaml.wasm",
        "name": "Uno.Xaml.s5mr47ktp7.wasm",
        "hash": "sha256-ENdbJI5uJCSYMgQoP5cr9ibL1SZ/d5RryC46nr4Wbv8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.caruyspa0i.wasm",
        "hash": "sha256-pEdm//hcFZlJzUmFg5ZLo6AA4SYlgZDFe1UY/D9RUJI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.f4vphj8e3w.wasm",
        "hash": "sha256-MbkcdmvAHJHxvjio1jhfA63hYcoRShHg7wj6yKpEy3A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "zxing.wasm",
        "name": "zxing.hfkt0fwhm0.wasm",
        "hash": "sha256-rej+eTXC4W5rfRfJtgmOOtiRU7CFKA0O50IoNI34f/E=",
        "cache": "force-cache"
      }
    ],
    "assembly": [],
    "satelliteResources": {
      "cs": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.zoor4ofe23.wasm",
          "hash": "sha256-wwkhJR+etMtTJLVlvrJ9U+vXZMSY2hPN5uOB0FhhQG4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.1cv24ry2wv.wasm",
          "hash": "sha256-34SvwD/2t8GfdPXQ3JwNXlEuC5oskFDEilS6yxdZ7FA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.3qbbp0kiwe.wasm",
          "hash": "sha256-5XbBIwq2UXT2ad9ONFXru6RC6P02p6UkgZDxYF8vk8I=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.io0sizosi6.wasm",
          "hash": "sha256-js+3OnFqowCIC69QWuG8/aedwOdAsVZLIEL+t6HpeO8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.hjkjftutdo.wasm",
          "hash": "sha256-Q+4uMi54asuDdmrLmQd70AoWPAVBTq3DaEijpboSFDY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.ph1t9cx6cm.wasm",
          "hash": "sha256-zZU1t+SaYE0RL46lE3xPn0RVf9FIJ8N81T2OyA7/w0k=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.j50zerzml3.wasm",
          "hash": "sha256-eUrnr72gXuboxs9lqCHyCJVH3tQ+lZzNi3HSUrtCYXQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.xqhl1yk82i.wasm",
          "hash": "sha256-5wm0WR5mP/eyJz68rHVNDgqmgYAPdwPeMxRCdFUzB3o=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.5ohs2r80mc.wasm",
          "hash": "sha256-dVblk2sww/UH37Z2VzYs7vIXI/FWtp1YUqXZ6xGb1jc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.ojwo5pzeqb.wasm",
          "hash": "sha256-xJNoCV9Not1dfDYtKYWQjNo6hWWjcad0yzg777e//KM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.uy3m6ojqxv.wasm",
          "hash": "sha256-amyZPNAZEfWf4EvYS57aIUq/4KABHkM8ehkeQ/8+iEg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.bns5vifzxb.wasm",
          "hash": "sha256-uSjQdir/TTrJunSHTG8XwCr1LPrxeNsCU6zDKcjqzuY=",
          "cache": "force-cache"
        }
      ],
      "es": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.lsn4tr1ei6.wasm",
          "hash": "sha256-dWqK/l8bN102bN0XUh37hAdqbwecG4ze51EGlm8GEU8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.kxqfu5153g.wasm",
          "hash": "sha256-6GfF6aSe/GuDOwY43vCuLoWHwUTrKCdIlhbHKJuvOxM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.60kc1717bq.wasm",
          "hash": "sha256-Rt0SjN00wjVLRb0vrUKl+V8WnLnlp8R2DuH3cKP1QwE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.t4sk73wtay.wasm",
          "hash": "sha256-k6Gs2SXY2veNoPppgcNVb7C8/xNTJcHZShcFNdAzImY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.6ha5og6a4k.wasm",
          "hash": "sha256-tgPu3F5Vlx+wCJaK6d81ntC68fjaSTUAnXT9OQFLLgU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.bxg1vp865p.wasm",
          "hash": "sha256-EXED+w8sN1Ci10ypWZef7ErANGdICmCsBPN2jMNqnj0=",
          "cache": "force-cache"
        }
      ],
      "fr": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.162pikjfxo.wasm",
          "hash": "sha256-OemIrDy7y6sPCcXRgAMbsA2f5R/KcjuKLYkXnqak3Fs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.6xue6lh2ws.wasm",
          "hash": "sha256-9qHPTTk6D4j6HINRSzrzHACWm09Px2Das2Ln767JeAU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.y2a5qx2fqx.wasm",
          "hash": "sha256-SiA/TdCtPvlZoKjIV2D7brfgUEcIaX3K77Ly7BkACh0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.b67nawy4ww.wasm",
          "hash": "sha256-7ZHRW7HnCC3OkjygzJCBHc5lgDiS0t1xQOBVQ6kTxks=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.kkh5qu30uo.wasm",
          "hash": "sha256-NKqoW7PdRMYxiI71az965UOeNA3yP1aE+9nPpTfzh2E=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.uev4e67ubz.wasm",
          "hash": "sha256-+vFpxXxqO1H7AgqkJGqv8aW48eQVCYYnWn6yvLm6kRE=",
          "cache": "force-cache"
        }
      ],
      "it": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.4e9rukbwg7.wasm",
          "hash": "sha256-tDk9daMzFGz1vEYnQz7B5IkHpGP5KfNCiXaZEdm+dRU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.u06y04l388.wasm",
          "hash": "sha256-/vIBnn7DWQdlgp8iZIgH+a7tmmpoMSBi3CKaQlYeMy0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.3ldrgbnbyy.wasm",
          "hash": "sha256-h8ljwy6B7CE8w6lpxKyqAZcJEb8fMilGHXyj6rKc5TQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.t27er1f5ij.wasm",
          "hash": "sha256-qxVgPABzEFv1XmCLNQdly8zBm9IWiHgReP8xgDBM2tc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.17y8viaxvx.wasm",
          "hash": "sha256-47k/a9Ie70WjYBWyobgFbQ58QtP70CNl8Kn85sPSzzw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.mvu2xlrl3p.wasm",
          "hash": "sha256-0i1oDiSln0YmU30DizxCQVVeCgNmZYhV87cmGIkgRHA=",
          "cache": "force-cache"
        }
      ],
      "ja": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.e5mo19a8k4.wasm",
          "hash": "sha256-3nS46CxgPknLYWtHO4Yim6uk1U73W3Ow9mZeYGml+Ws=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.g0bhiasu77.wasm",
          "hash": "sha256-ALRHKMKgwRftVTkOXZzQ4ejamG2zklC7cjECmTSOz9Y=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.toacmuh3ny.wasm",
          "hash": "sha256-42DqW5m6p0+kr+DPyoQWGAfvxxPkyC9rR401ckRD4Tk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.81i8q6wiu9.wasm",
          "hash": "sha256-tECbEieJZSjJnCC8xfjiZTGqsB6XUVm7hf2OeDz9So4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.lar4bvpy0h.wasm",
          "hash": "sha256-LTqIHgVTifdFeMe0iMY1UQdjPVBC1G7U/MnCdzcUBJE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.ig4afb2hdc.wasm",
          "hash": "sha256-EhC6GQzr3Qwrhy33XctAAsxPtNrKUJhNTHgs6KNCvaw=",
          "cache": "force-cache"
        }
      ],
      "ko": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.xt4111vkvr.wasm",
          "hash": "sha256-tQNwisY3uFo4KVoMfn170QamW78pYFzxB7pXIY6s3LM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.bqi83fnthp.wasm",
          "hash": "sha256-LcDQqGxMWG63Q3WJ7CAC0Uek3oF87+zmuK/UGK1+mso=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.qpd1frohe9.wasm",
          "hash": "sha256-UolR4VcdLXatGBs8ScDOLeI0UUxamhpnw1/9lunSeHg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.9lb296hkt1.wasm",
          "hash": "sha256-LTgGu+e3Q0B/mcVvJmoNQBsa/zu0RE4QxjLK2kFAF8w=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.lj8ye1gbhv.wasm",
          "hash": "sha256-wZE0WIRcijA5Jv4e0c8D+zDECq3PvFghtJTfa4UPXTI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.mjgqw0vlqu.wasm",
          "hash": "sha256-vtlYl6fXA+PFyQPiIaTW/NQRurYKxQwpYqSpfof4vlU=",
          "cache": "force-cache"
        }
      ],
      "pl": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.uu6264vhj1.wasm",
          "hash": "sha256-yurtK9JhOkS+VlcocE9MbF5UDCfIy7+6INQPwzCEmfw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.59od22gne5.wasm",
          "hash": "sha256-9/nyksnE29XFHqu/aaXKfk0/wrN0C6CnYXxWRciE6ng=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.2hyuh0kcec.wasm",
          "hash": "sha256-Bvs/1H4hBVlFWhSDaQW+URKu9GXEH6vqirLfS9uWclg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.6zkwbc5j6u.wasm",
          "hash": "sha256-ziInK0qD0SfGD4fq3Qn67NYNro1EXXIxvmFrK2edytE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.mk9c0l3h8j.wasm",
          "hash": "sha256-imDUd60TjT+Phn4cxST1kUIXjyIqtNUIpd9pZnpFp7Q=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.9jle3u5i22.wasm",
          "hash": "sha256-hU+sS2cMnMkR7P8rkwWtH9IR6CtBd7LX6CMYGLcxRs0=",
          "cache": "force-cache"
        }
      ],
      "pt-BR": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.3dldq50bir.wasm",
          "hash": "sha256-Z/uD+WK2xosp/ssZCc1Iy2e5+rVvOtIGfKsP9A9vu9E=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.4lz192yc43.wasm",
          "hash": "sha256-aHvo1hBv4Ss0rJCAxqS0qvk5VinpRK4PUs7neYb5IFI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.g3gx17zd9z.wasm",
          "hash": "sha256-vFwJ4nYUn2g2MYedAYRf2wiGrqplNf2c+rw5e88zIrE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.s7l83o59i9.wasm",
          "hash": "sha256-aPCDLesCr3A3OiSb6k+yrumH6bPirFmFU4V6IO/TjXE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.rnmw4cthyn.wasm",
          "hash": "sha256-t34i75b2ZLVwR92uwG8r5UokYZCuQdbIdWuiV5Pef+c=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.ohqajzwtxl.wasm",
          "hash": "sha256-ZLxYGEG9CaD5C/OWJ9ZHGAtgqyEsjJ3YsvxY35sevB4=",
          "cache": "force-cache"
        }
      ],
      "ru": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.7aetltpb69.wasm",
          "hash": "sha256-jwZTlUZF+84FVx0/oHysdQZ1T4C+E5NHu4Lt6Z3KyCs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.njyjrdvwt0.wasm",
          "hash": "sha256-XYs7g7QDoQ2iFmc8rOscSCyxTB1LOyO5KTImSfUcjEI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.eldhfvjvbg.wasm",
          "hash": "sha256-Epq5y57PnTlpQQ9oyX/vhudJP0fZ5fRiwzGau1p3L7s=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.fo0h2lathh.wasm",
          "hash": "sha256-UUzI61l8v7jGDre1TZDPPVjAXCvIjiTwOTLSd3F4jRw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.wrsgpfwn1w.wasm",
          "hash": "sha256-VPVIkL5SIlHS5D3SVrPQ/yyejE7mLWxIEla1374VSUc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.w7mwyyv7v1.wasm",
          "hash": "sha256-fBLy/EY7P74EvztShOI7ksl6Tm7TaFthzuOaXurWHBk=",
          "cache": "force-cache"
        }
      ],
      "tr": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.9flbse11v9.wasm",
          "hash": "sha256-NSWbZf7Qe3dyG13q5u2wZHZSVOabDuwxPVhVJfV1QE4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.7jnee19pe3.wasm",
          "hash": "sha256-XU++VdrsiQv3nWqPkmIU0troHrC0ZDgLRZ4WVKMuj7w=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.n4vs52qez3.wasm",
          "hash": "sha256-lxnYrZXNIk8OWvncxWsa4v7070iOl00vhNveGLD7GYg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.krk0d49thx.wasm",
          "hash": "sha256-4AkerkP8fUDXU+/Vk7rjEdhyrfI3p5yfYdcQWr2jM54=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.vexrskdxzo.wasm",
          "hash": "sha256-GaL8D59esi6hwtBgUid8dE3FWAh11RfUywbdZLG0iSI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.be4f0vfn76.wasm",
          "hash": "sha256-A1BtNU/IkJQ+ZFM0G9vtIjqJNUEMOjEUftPu0ym1NWg=",
          "cache": "force-cache"
        }
      ],
      "zh-Hans": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.wiqavfanqw.wasm",
          "hash": "sha256-OOCVxJiBMynS+F6+5DtLd7+G+RkpBroK3td8KNVOV2Y=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.ti0brpfx2e.wasm",
          "hash": "sha256-ZQa4xYNsB6wF0RzahIKW/noEAvz5ARv/whlj7o+npBc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.uzbwcs7khb.wasm",
          "hash": "sha256-uvAn04/TB+93qSSe4VGCPo1ZHXWLUpWDX4CXZSKkxU0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.3aqjt1zqrj.wasm",
          "hash": "sha256-NWMXVr41Sv7wIpJ6l+ZkUPzAhcj8lQZOFyzYB3tNtOE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.pfobbq0djk.wasm",
          "hash": "sha256-i9y8X6WMRgGDIGi5SHOaa5FM2PUj+DtiW9yzDLIz6Lc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.78hkzh4can.wasm",
          "hash": "sha256-N7uB/YsPMqteEIgRisE/jYmLiYlXoOF3COhSLGW5qBA=",
          "cache": "force-cache"
        }
      ],
      "zh-Hant": [
        {
          "virtualPath": "Microsoft.Data.SqlClient.resources.wasm",
          "name": "Microsoft.Data.SqlClient.resources.g47qe8isu4.wasm",
          "hash": "sha256-kLSKZTkHMZ0InizFWHjOtoTHJCWg+v298oiiF0V5QsY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.7ohut92yxa.wasm",
          "hash": "sha256-CaoXuv3mfGKbULJhWMz451H2CFeBvEm8FDAr88XgVjI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.9kt49gjytu.wasm",
          "hash": "sha256-qQf8YftGHJRzzPHTd9NYmzWEavfxOPSqfcH5usv7JUI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.27r4tq4enk.wasm",
          "hash": "sha256-rgea1lu8lnFXHNNrdwGl4NGFRulqkcNRF0+EhU4ujkU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.33fbwhuzx7.wasm",
          "hash": "sha256-H8X0vvEQA4QOFZsof6WcWcXb8GrtRDuC3RzDaAyeRro=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.g6sq3y3er2.wasm",
          "hash": "sha256-KGzRIwQ4LRE/gFjRsIkDBWX86ovf1ChLRRe+cS26fx4=",
          "cache": "force-cache"
        }
      ]
    }
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "globalizationMode": "sharded",
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Is_System_Dynamic_DynamicObject_Available": false,
        "Is_System_Dynamic_ExpandoObject_Available": false,
        "Windows.ApplicationModel.DataTransfer.DragDrop.ExternalSupport": true,
        "Uno.UI.EnableDynamicDataTemplateUpdate": false,
        "MVVMTOOLKIT_ENABLE_INOTIFYPROPERTYCHANGING_SUPPORT": true,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": false,
        "System.Threading.Thread.EnableAutoreleasePool": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
