//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"e2f47b0110ed922f21a1522da67279133ce28f32",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "SmartMakerUno",
  "resources": {
    "hash": "sha256-6/aShuhf7ZRrXCaE//blaxiup8/SZcjthDdWxdsRALY=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.msmnrwe1pv.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.zbexyp8zrs.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.a4arrfg6z0.wasm",
        "hash": "sha256-Bn2vPJPEigCDINCXCezQQEtrZsgypWaJ9Ejg/636ngU=",
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
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.dno17wvfqv.wasm",
        "hash": "sha256-9zWoyij9I7uHpIlSgEX0bU6/eaaAAA/hTiIVw0FOI3g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.qmxpipd4fg.wasm",
        "hash": "sha256-fmPaZNCQmu7Fv3TDAcxSmoWsLJH7vLtW2DHYF/bxQIw=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "BOS04.wasm",
        "name": "BOS04.bb5k9pbni6.wasm",
        "hash": "sha256-53RGnm9fD+EWdLrp1oSRNLidVC2zpgd+dRR+prUgSaU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOS041.wasm",
        "name": "BOS041.0ssaqflmh7.wasm",
        "hash": "sha256-MHZkoxj93ZtYq0g7hz4gH1rLyHzQWhmfHuk+FPGxeyk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOS08.wasm",
        "name": "BOS08.ae35h3exmu.wasm",
        "hash": "sha256-jqLRMoxglAGKJ3Lb7E64St7mUj2kdrReEMRQbvHNYRU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOS09.wasm",
        "name": "BOS09.6mrb2vy0r0.wasm",
        "hash": "sha256-jp5goKLFXEwkCVyU9t2fMYQcupl1ZxLefRC9pMiL65Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOSd1.wasm",
        "name": "BOSd1.gw7fuh8wpg.wasm",
        "hash": "sha256-QOhVcLpk6yTPqFwXF9OpmB6Sj/kJBnwjshkrtAwESIE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BOSs1.wasm",
        "name": "BOSs1.8oy3nsk3oe.wasm",
        "hash": "sha256-SDmCc7LsB9AlkA04Hj/6UrVsiuhdpslLJUcxPHIoau4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Bos006.wasm",
        "name": "Bos006.f2jiegoepa.wasm",
        "hash": "sha256-+cAP9qF6VXLLhwLU0KzP2IoDuOpIqpMK3Qa4WwFkD9I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CodeBoxControl.wasm",
        "name": "CodeBoxControl.q6ppgr96pc.wasm",
        "hash": "sha256-wrch8w+fwvlAT/LfnLxGmNIUQxD0fXOv76IyNl+kFeE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommandCenter.wasm",
        "name": "CommandCenter.p777ixvjml.wasm",
        "hash": "sha256-RUa9MybaP4IWdOQvmy5M8sfojX+Lpme9K6KSE/n7EQo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Common.wasm",
        "name": "Common.v2yhgym1ng.wasm",
        "hash": "sha256-xz4hbh2bHbZLUY55mjbjS82UM8cF95cCtQf/on/ef08=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommonComponentResource.wasm",
        "name": "CommonComponentResource.6jocrazcc9.wasm",
        "hash": "sha256-MpoRQAivVt9jtwoaAyFwpmM36B6bRY8Uw4gOdcCsvU8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommonServiceLocator.wasm",
        "name": "CommonServiceLocator.1590zj4mfs.wasm",
        "hash": "sha256-RR3gy+47t8YBY4a4qrGCmYOTzcB5KYNJOZM50jNGP80=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommunityToolkit.Mvvm.wasm",
        "name": "CommunityToolkit.Mvvm.8k3h4arpzu.wasm",
        "hash": "sha256-SAhTbdJbKUBBmbr9UWnb/OB53y3YOr3hWvu9lw3JpT0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommunityToolkit.WinUI.Controls.Sizers.wasm",
        "name": "CommunityToolkit.WinUI.Controls.Sizers.ljrgxqgqiy.wasm",
        "hash": "sha256-jyd0KZDcdlqAvjoCA6fmcueh5cCEE32MmAn0dpDiYJk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommunityToolkit.WinUI.Extensions.wasm",
        "name": "CommunityToolkit.WinUI.Extensions.1eql1ki8sf.wasm",
        "hash": "sha256-J/ZoxyVlsojT8Trz6tKIfmxj7ObhWV+fmOQhRc8PEA4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommunityToolkit.WinUI.UI.Controls.DataGrid.wasm",
        "name": "CommunityToolkit.WinUI.UI.Controls.DataGrid.5z9jw5j2da.wasm",
        "hash": "sha256-Qb2m/nKTagdVrJhMCIuh6hisIUOjM7XhisoLDqM1YVc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Define.wasm",
        "name": "Define.dznbyhgqii.wasm",
        "hash": "sha256-KRSCVEDTundzAxxRov5Gl3A2GlVzuw4Q88HycmnB6H0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DelegateEventResource.wasm",
        "name": "DelegateEventResource.kal64lgk9b.wasm",
        "hash": "sha256-tFZSZw7unsr0jqi5dywjy8RdoWHyQm4tL5fcL48yRak=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DicInfo.wasm",
        "name": "DicInfo.j9xbjmj1iu.wasm",
        "hash": "sha256-2QcwNOykedmcU7TFxfFXmJ7otkjmD9ISRVyUqqHnU/E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DocumentFormat.OpenXml.Framework.wasm",
        "name": "DocumentFormat.OpenXml.Framework.pkno35114q.wasm",
        "hash": "sha256-WfQsorFX6Bd6XUy449fZfNUzJevr9lIDjwX31r6v664=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DocumentFormat.OpenXml.wasm",
        "name": "DocumentFormat.OpenXml.limivqqnfw.wasm",
        "hash": "sha256-fckaON5Jc8tiRxdrr7DszaF8CpRO+wzheBBCmddeQLg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "HarfBuzzSharp.wasm",
        "name": "HarfBuzzSharp.w7paia9y87.wasm",
        "hash": "sha256-LGjPtWJ7Uw8sPM/5oTLKonLEA/0s6R++f3Ky/coAieg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ICSharpCode.SharpZipLib.wasm",
        "name": "ICSharpCode.SharpZipLib.rhtu8kctbq.wasm",
        "hash": "sha256-MTcDN7DS9Nyl5CHX29aDPAibDeei8vaZ9sKMTJx9Q1g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LicenseSolution.wasm",
        "name": "LicenseSolution.vhvpw6cj80.wasm",
        "hash": "sha256-s+PRY+s3YlJTo7T6kPPai9hqzqMkXwQefOEEwCl++gk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LiveChartsCore.wasm",
        "name": "LiveChartsCore.txk6aea2cy.wasm",
        "hash": "sha256-gRHxwViZhQgAhfe2p8tmqVME+MPB5aria9pVXxWMyNM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LiveChartsCore.SkiaSharpView.wasm",
        "name": "LiveChartsCore.SkiaSharpView.e3pi68rhn1.wasm",
        "hash": "sha256-dtqPiU7lEgj9uqn8hL05WLBosEezG8P2khMJ94z6rwg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LiveChartsCore.SkiaSharpView.Uno.WinUI.wasm",
        "name": "LiveChartsCore.SkiaSharpView.Uno.WinUI.yknnax89mf.wasm",
        "hash": "sha256-3vrk9cRgX7as+k2PNg2kcEqAOCJeOYfmaf97mC1nBwY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LocalDataStore.wasm",
        "name": "LocalDataStore.s95c6f1cvk.wasm",
        "hash": "sha256-sBe7nfB4jRZ+sz4D80qcziMWCdfUZZZsO0zV3NLz9VQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.moeypjettn.wasm",
        "hash": "sha256-1oMs9EedrtRN59PRguRmLbUKmriWz6OPBzBSWZhnbDI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.f27m649cag.wasm",
        "hash": "sha256-R7PgCtNWObREl1VdPFLKQpfjZZ8vI8nr6TXozXLK4B0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.e6xgxdx9pp.wasm",
        "hash": "sha256-9nBiFug9XYwGNp/PpIpNUirPZN2o0/QiN+rfNl7NtS0=",
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
        "name": "Microsoft.Extensions.Configuration.EnvironmentVariables.60hni257ej.wasm",
        "hash": "sha256-1l8MHGR2Pogqf0c5Cx1nZA0ikWfZ8QQVfINKcULW148=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.1nxttmnydv.wasm",
        "hash": "sha256-c2thkAiDSPD3t4PBAWiaCIc7beMjS3UXEP5nNKDe2RE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.rn9gy2686g.wasm",
        "hash": "sha256-GWE1pCYDUUHnbcO2n69vmhysM7DVxW433wJ5fbSjvRY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.ddaju50mie.wasm",
        "hash": "sha256-v7LoDCBpQr3JtPDrAR20vlohV13tzz10k+MS06LN9wI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.ultnjxupwf.wasm",
        "hash": "sha256-XtN0ph1XYXW29gYkPoQ6xw9nu+KHdBq4FbnVklhQKMs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.flmv6ejrbo.wasm",
        "hash": "sha256-3c0gi1VGoXegStxRe2PTXuMCfeVGGOGCgbe2VUCSUwk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyModel.wasm",
        "name": "Microsoft.Extensions.DependencyModel.r8lgrlq1pj.wasm",
        "hash": "sha256-ix4abr6cdroRPprYYWFdaIfo/OtPP9HUk+pR34wYpts=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.qdx6ubq6t5.wasm",
        "hash": "sha256-ggcHFUIB3qTyHqB3cIxva8zOm6F3h6Zt3QT18cfzyPk=",
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
        "name": "Microsoft.Extensions.FileProviders.Physical.lxn34tjhi0.wasm",
        "hash": "sha256-6SNwmniHQ6BJo0z1n7qROai02TqcxD4sX0QpzWR8UJg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "name": "Microsoft.Extensions.FileSystemGlobbing.z64m322jn4.wasm",
        "hash": "sha256-RTaKKA0C0xO2P/uURcd++qXmOuoQ7RYNuhMPih1kGEM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "name": "Microsoft.Extensions.Hosting.Abstractions.yalqe5xdil.wasm",
        "hash": "sha256-pr/wcaaGhDfDesaKDNg92Ir4moWClzkm+bkJ8Hh6qyA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Hosting.wasm",
        "name": "Microsoft.Extensions.Hosting.c9bavkwssp.wasm",
        "hash": "sha256-gFmoxwuF/XHjBROR32J1HF8Q5NczdkIs3UOpUsmWjXM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Http.wasm",
        "name": "Microsoft.Extensions.Http.4q15ax2p3o.wasm",
        "hash": "sha256-BJo3EDZbZ97SOlKt4EEckA4JInCjHrCX5GHhLhTsRVA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.58yi5bazn9.wasm",
        "hash": "sha256-xQ7XigYr06V+uU9UHE6Vil+wiPgpT0np917IpaV8l3U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.gcvqaerrt6.wasm",
        "hash": "sha256-0Cwbly24Paqy8mw//oIQ+iezO9Vc7AoVVZqMvkBnvpI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Configuration.wasm",
        "name": "Microsoft.Extensions.Logging.Configuration.yc46wfh9xm.wasm",
        "hash": "sha256-kmcBIEDEryIS5LjSKAVh6Wr3jtunzxRahb6iMSVpv9Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Debug.wasm",
        "name": "Microsoft.Extensions.Logging.Debug.55faivhchm.wasm",
        "hash": "sha256-KalieOItSK4CsbTpUTB+uG/1GOyYC1qIFAizZ88ddtE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.lz6s6osdbl.wasm",
        "hash": "sha256-n8dUvq17XReUvY6uH1ZSreATteLKAXnnsnUnZBvi4sY=",
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
        "name": "Microsoft.Extensions.Options.zhpfe41108.wasm",
        "hash": "sha256-KSP2sJavSR6HJ/VjzLG5z0JJdiATO7mNXN/+HwdQJ9U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.4xwg9yq0ig.wasm",
        "hash": "sha256-WOS5w7TWstmKv3Jk0ddITfAy+X7IGv+ybSPfOC19Rks=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Kiota.Abstractions.wasm",
        "name": "Microsoft.Kiota.Abstractions.mda395a81v.wasm",
        "hash": "sha256-StTzJaQJ2hcC5yZ7j9J/6Fo8oktAC9MvnDh3VZuPVmg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Kiota.Http.HttpClientLibrary.wasm",
        "name": "Microsoft.Kiota.Http.HttpClientLibrary.v79noziin8.wasm",
        "hash": "sha256-lU0NRHb90cj4MdGNaT49jtt8oRUzSQ6/hQ/AuvUMCEg=",
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
        "name": "Microsoft.Kiota.Serialization.Json.beswj5yaa7.wasm",
        "hash": "sha256-wx64vcec7MJo3v1Q2g8QS0DZlCc3PtSnavybhSEDgy8=",
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
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.y8vyhq6mfo.wasm",
        "hash": "sha256-TvQ7cVzUqV/zbKCuauM92Pdc0cX+l433uaoNagstIqU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.SystemEvents.wasm",
        "name": "Microsoft.Win32.SystemEvents.zymvjt7dkg.wasm",
        "hash": "sha256-9UL3z+tL53qDu0J+wJjIYofzs0O7Ax0loYa4oR4TVf0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Newtonsoft.Json.wasm",
        "name": "Newtonsoft.Json.5uy72vra5v.wasm",
        "hash": "sha256-4wXnUtkCBpWp/sV1hKyqkt05rU+5XOYemU1i1+UP6B4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBc01.wasm",
        "name": "PBc01.u3cgbcu93d.wasm",
        "hash": "sha256-tqNfwEL80CrHIig5Z4yQFN71X2KkaIFhr3HhRTLmvXw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "PBt01.wasm",
        "name": "PBt01.ynjmub452v.wasm",
        "hash": "sha256-Dnd3IRMG3x8HOD2eEK/neH6GohVnSlBwUY3k3Hp4DI8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "QueryManager.wasm",
        "name": "QueryManager.7szywrgwwu.wasm",
        "hash": "sha256-p1U92+auneQD2vmZYzqN4ZSFO6Bqyj4SFIg2H7ABRX4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Refit.wasm",
        "name": "Refit.q7ryae6o7l.wasm",
        "hash": "sha256-RmAZjYhoZ+xgjo5D8oHyLh0i+hIHJXUTq/WrPaDGPsg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SPBds01.wasm",
        "name": "SPBds01.ez0tftu8ep.wasm",
        "hash": "sha256-xnIeat3aVQDRV0BN+9xas0yXkB99N8wvzM2FuoWxLb0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Extensions.Logging.wasm",
        "name": "Serilog.Extensions.Logging.pebbtkbvpv.wasm",
        "hash": "sha256-gYuoT70RrPMOeAvTWwLvO0Hsl0No5PUpkeqIaKbnUWk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Settings.Configuration.wasm",
        "name": "Serilog.Settings.Configuration.o7vwr3bn5a.wasm",
        "hash": "sha256-/ELakI+5ftiU1RiYoSsJRaxFcfeyXfOSSqhHyxIzjck=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Sinks.Console.wasm",
        "name": "Serilog.Sinks.Console.x4xiqn21ka.wasm",
        "hash": "sha256-Qe7EbIe6WpIh7U0r4p0xurASvha4H1PKpTg9CLROlJY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Sinks.Debug.wasm",
        "name": "Serilog.Sinks.Debug.nl0wd65eli.wasm",
        "hash": "sha256-9V/sEBo8+gGBZbeFEEwscV9wMdGKjMSmTFJzZRX9J8E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.wasm",
        "name": "Serilog.r17u0gjne2.wasm",
        "hash": "sha256-0VCkrsnfXmS1ir1LKZdBuohKUN7SIvPNQw6SmmCuVWw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.HarfBuzz.wasm",
        "name": "SkiaSharp.HarfBuzz.1v8lzhz1tc.wasm",
        "hash": "sha256-44hwjBNoWYv5jo2pIxUFSTg2n8OiHr22gTdfey/m1fw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.SceneGraph.wasm",
        "name": "SkiaSharp.SceneGraph.4kx2f2189q.wasm",
        "hash": "sha256-nCJ2/ddV0pCuI5cg05XnV7OWAM9f4UHnYt38hVi7T+k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.Skottie.wasm",
        "name": "SkiaSharp.Skottie.a101f54cec.wasm",
        "hash": "sha256-kmZk+iyIY5yGkQ2dupBzOo7UNbR1RtGHB0ZVVy2OJzY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.Views.Windows.wasm",
        "name": "SkiaSharp.Views.Windows.9rrc2regx0.wasm",
        "hash": "sha256-hYUjfOedeDkYwiJiWhZ75Wh4e/8q8gt1/A1SNKvXOjE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.wasm",
        "name": "SkiaSharp.vjqvretdx8.wasm",
        "hash": "sha256-1WQBeayKa1uzoWxcx5UUoEFVCYckiC94UlXysZjfvHc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SmartMakerUno.DataContracts.wasm",
        "name": "SmartMakerUno.DataContracts.tkhzmg5gzz.wasm",
        "hash": "sha256-Q1Z6S5wcjkLQum1SWPsykeGqzMucxdAxQXbuToc17S8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SmartMakerUno.wasm",
        "name": "SmartMakerUno.yshj32u7fo.wasm",
        "hash": "sha256-4qumJ8xhUFhnRMoGJ75MUe21YvCtk1KMSVsItHKHVHw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Std.UriTemplate.wasm",
        "name": "Std.UriTemplate.y0xzjh75u9.wasm",
        "hash": "sha256-8hhoHFwIB7hlfRh2fGviAwAVnFi58MmVLHaVSjyzsHY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "StyleResourceDictionary.wasm",
        "name": "StyleResourceDictionary.90nrpb3tac.wasm",
        "hash": "sha256-xx1C5mjz0hjYHPMcxudJxesk73HacHHDauSUT/Br0Xw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.swak57am9d.wasm",
        "hash": "sha256-PDVGGnNQXfAacM15L8mcD+cmVoYEL6j52YM75fDtuLs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.s2adauywbi.wasm",
        "hash": "sha256-RBZE+bg+89NGsNCwgUjX6UGyX+BU3TIA/YhXZzBYsEA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.gb59or7jgc.wasm",
        "hash": "sha256-1OhKBPVeg7HNIMGkqL4LBUWD3UwhfpbdT6D7zMw6DIs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.qwcn1f5w9n.wasm",
        "hash": "sha256-5tGNJlwxys6wzWoxmNeINjt5o7Sc8U+ykbhgRuJ/jjY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.m4apm5q7n2.wasm",
        "hash": "sha256-epbKsQHX1XOhpvfbv13iRfHSM5FkHYAknwprTDa/PEI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.2c0drvxr5q.wasm",
        "hash": "sha256-DhaKxEG82dquj1/u0Mm/7Tt9RFokfXGIRwXuu/vclvc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.kdnekg7wle.wasm",
        "hash": "sha256-2LHTeusvlmA49/w9OA2ynbbkmyXAXEknLj4auszwHs8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.7dmgujyilu.wasm",
        "hash": "sha256-xYD7b3zdWn6rr8eZnbHlZ9PWZFFl0T4uv7wurLXUQ+s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.3m9lj0xbbu.wasm",
        "hash": "sha256-6+bGXr+/HGtzR5NDC3ato+Lf5iLQVs7G7KJ1cxDOTMc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.i8skpi23u7.wasm",
        "hash": "sha256-8uwRr7llgLdH/4Dn8XOnM9w+sED2XTM3pbwVBzqlR5M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.3k4chcw4ec.wasm",
        "hash": "sha256-EwPV4aDLCCYZi8pHvSLAyIymVSok1kH82qKoseiOZ7Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.ob4s1g6v34.wasm",
        "hash": "sha256-5AVf7IG7Xk8PAKuPhPo6VLKk+drsCUP+UNfrTISMHT0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.xavr11t6eh.wasm",
        "hash": "sha256-x5MbaMozBCGe0pe1pKN+c94rq+gp5FOJt1n951BnyCk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.8sac76fmr4.wasm",
        "hash": "sha256-aI9dUPdfmyf5uhe5dsWiHnfV0JqjyVIPDwdB0nW9eFo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.n3azjgbx6j.wasm",
        "hash": "sha256-Hb/3wj7cbh20u+Lkw2rw0wW8Qw6vLYge3JrzUHITtVU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Common.wasm",
        "name": "System.Drawing.Common.d1dbk5ia2a.wasm",
        "hash": "sha256-wX71Gt5xqvkHI1bNPj7Y78+6UUeXYwdh6iclRY31zcQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.pvo3f0ifur.wasm",
        "hash": "sha256-te9BDrMO7T51p081IdpzdMgjUr080sbHfpDCKbFww+A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.e50j3te5oy.wasm",
        "hash": "sha256-fuFG0ksileDCE3MOsGjhBLpUBviTr3dDPuDfsktoW5c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.gkb1ady7pi.wasm",
        "hash": "sha256-0G4QYXT2I8EAK5vC3ir4sjfEoERqNjPS5bhEJn2Gsks=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.adl4rm97cu.wasm",
        "hash": "sha256-0leP05coQ/DzayZi4wzXOeH2hROQ8AdyTIhXl1ctikw=",
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
        "name": "System.IO.Packaging.d0xk6raz0w.wasm",
        "hash": "sha256-46lumFU24lajiM/czJLHcThwf+zPaK//BSIEp3YV2is=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.9azjszgsci.wasm",
        "hash": "sha256-YUHUP3fb8mUiEFOdfQqM/stc3OxmfyDdEIl8P1n6F5o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.tns9lxuedr.wasm",
        "hash": "sha256-p00bHQrWkBnvjvdys0ZPRJ4RFATiMXfffCxrYBuFLp0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.4llh3aymx8.wasm",
        "hash": "sha256-eI1R6C+XKKvTFs7hovzLfFz7gcqZhbZw3oxCyYSOSFE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.skycqlxqmr.wasm",
        "hash": "sha256-DJiYleK1OeUN0rT2jaA4rUz16yMv/JOacij283Li4Jk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.kuk1rs9jx6.wasm",
        "hash": "sha256-NKVRcHsS+KOxkVdf1mGQxDVUcE7j6X+fvMxWhPR28q0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.qghk1yvwgq.wasm",
        "hash": "sha256-lhE7afT9pPO02pQ8CB/v0J6UGJNPgv4q4lk877mGM2I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.v01rko7bf8.wasm",
        "hash": "sha256-72HIkQMt2x9Oj9SwoDa4jFMtLSMUWJxK5tb15XcRfBU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.372pue3ynm.wasm",
        "hash": "sha256-oaLH6Ytfojq13O5exRhRabRViBHPC5l0JKy7VXqDQuM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.lrgqakw841.wasm",
        "hash": "sha256-YfHjTe+JxLcQlstq4RS5RIKXW3n9A6VetS3HHXhx42U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.bp8lw7l1ks.wasm",
        "hash": "sha256-T0tsAOTFnWxVbYb4+nzWFtWzVuhNXfyEZYqg1tFPHjw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.k1eyosw4ys.wasm",
        "hash": "sha256-mIPm3LD9w7J1vTwuvICujGmrfmUul9jhoz7yfUmUnxc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.a570xprlfj.wasm",
        "hash": "sha256-Ltm0DRksX9czzi79byzxUxd+LGhjSJbzHiJ3YIXiUhU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.12arlrmpc1.wasm",
        "hash": "sha256-V3MzLYcf+5n+cgtHX6NrbfunZpoGYiTXLbgtWrLnGCg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Windows.Core.wasm",
        "name": "System.Private.Windows.Core.hu7ho6vxk5.wasm",
        "hash": "sha256-+WFEAf5AlIEGoFwD0M7QKkAFsjSsjKeJFDSLZz9GPdY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Windows.GdiPlus.wasm",
        "name": "System.Private.Windows.GdiPlus.qjqod6t7k6.wasm",
        "hash": "sha256-ZjHTVcuQjrd6W2a9yGJjbYJt1j3iy2TVuY9h/BJ++TQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.gvx7flrazu.wasm",
        "hash": "sha256-PLp1fW1IayYMzGFvXWHcoTBXmtqw/Xj3dPzEWlom9Rg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.rloh92oxpm.wasm",
        "hash": "sha256-z0dZbhnzYSUzicy3SLlShpcqPZzrY2hP+hbNibHW1rw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.h7q8gcbmz9.wasm",
        "hash": "sha256-U9lpfug9B0ik4UoPBUomtZK+t0CCInwdJI3cROs0lW4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.wlis9pjx9t.wasm",
        "hash": "sha256-NGp2qKIFTixebwQ5ZvgT68xHRI122swiSKWMf0rdvo4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.euspsn9y2q.wasm",
        "hash": "sha256-ujnl7uJS/wDEAAAFQ1rJh0/Spkqz49qz2TYELdV+yGQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.5jnbx73tok.wasm",
        "hash": "sha256-4fjCz4KKlh9fJPSnunVuu0WS9pfB8raKhfYfr2Xgwh8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.vycql9oqgt.wasm",
        "hash": "sha256-J73cku4b8ER5H76mlw3PaeJutzKKOBDe8MKoRimqMM0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.dtzfxji2df.wasm",
        "hash": "sha256-7w84uVKiDgrdkGkO7rxVIfbz35vQVgnzS47WxeqVyiI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.ob0op5pn2e.wasm",
        "hash": "sha256-pFQhxQIgcB8UbP1yhuEnfIWo5DrNZNuLWey7xcnSR2M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Speech.wasm",
        "name": "System.Speech.ye6u7kf449.wasm",
        "hash": "sha256-Bl3/pMjjwQTuKC7UQrfdWRwNODV7F97DBnkgLcI9+aA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.uzfe8vi7di.wasm",
        "hash": "sha256-egw5iX5LbVY+YfKv9bZ84NLuh1MX9Ntq9yfujWCfJvQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.okrxdyjhnq.wasm",
        "hash": "sha256-KJFRuzNCxhSw/7ZFmSAI0MeJwJNWz8/H4K7pcR/XO1U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.fvr64n2uj3.wasm",
        "hash": "sha256-ZU33jCdKWqDbxpLc4qr6fIyY2KjyvGjVitkCWHhoPKU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.a5jgbxty6s.wasm",
        "hash": "sha256-7iN0LBhu3tYkK5qeSg2Jv4AUCCnINSCdb5OFyC1+3Ms=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.h2gewf1hwq.wasm",
        "hash": "sha256-J6tIo24tre+OB6xtW2KMMX40mWhDD6K6wAztwHcCQLE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.224i7l5jfb.wasm",
        "hash": "sha256-CtCEVMVCGg9HoHtIFvGwAiLGJrg+KgImS+oc8purBE8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.1h5i8a3bq8.wasm",
        "hash": "sha256-y7NnWh8z8gPuKAQI4hhBL69y2e7NlYbHZDvyDbFBTHI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopApp.wasm",
        "name": "TopApp.r0vyrttl0e.wasm",
        "hash": "sha256-i3CZZCwkAO9xzouy04DRsgRfrmHncFSdPPerd6xfyJQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopDBManagerLibrary.wasm",
        "name": "TopDBManagerLibrary.2dqwyn4tk1.wasm",
        "hash": "sha256-dut0WyDDPsFbTKqmZ7xATs1SmZ0CFMPaeiREI7UVSNU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopDefine.wasm",
        "name": "TopDefine.wojsuw6v8e.wasm",
        "hash": "sha256-sNAdLqnuE/sSPEAd979R4g785mc6jsPhF5/JaSAzKBo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopImport.wasm",
        "name": "TopImport.zzs1c6pnve.wasm",
        "hash": "sha256-8QIUTME19IbCyJKEhldtjZXP1H35rRYI2GJ76lVYpDs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopResource.wasm",
        "name": "TopResource.nlluhyn3ui.wasm",
        "hash": "sha256-JY6BOoLv+zmWZD2uN5+lGONLPJW/jzz5EZa/aTuvZuY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopSmartResourceManager.wasm",
        "name": "TopSmartResourceManager.lc7zqer4w8.wasm",
        "hash": "sha256-C+43/Q5YY/vnSIJH+d4mP9vAL/QLHljbuIwpZVMTEaY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TopStructDataLibrary.wasm",
        "name": "TopStructDataLibrary.p4xbghlza9.wasm",
        "hash": "sha256-eYA0UsUxJusmbM7ncoME8SGB9eXvOBHRQMh7HEf0j/8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.wasm",
        "name": "Uno.jmztrl6lhf.wasm",
        "hash": "sha256-m2i7943LSNBJ0cOmsWqBASuHb5fzrWY9QLBBrC1D1o0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Collections.wasm",
        "name": "Uno.Core.Extensions.Collections.vietqftizl.wasm",
        "hash": "sha256-xzRbrtTFCyYC97rVZgtHOA6l2AFs4Be2djNorA7KHTA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Disposables.wasm",
        "name": "Uno.Core.Extensions.Disposables.hfg50fl01m.wasm",
        "hash": "sha256-bc6YumWwat0mRXc9CzZDU0VXLsvTCh5Cxn2zpAGQD0c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Logging.Singleton.wasm",
        "name": "Uno.Core.Extensions.Logging.Singleton.81pp0sww8x.wasm",
        "hash": "sha256-/DqyzVTxin9di1K5POS7QYcf+qumrX1FgZ80gf6+TpA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Logging.wasm",
        "name": "Uno.Core.Extensions.Logging.l5llgbj3rl.wasm",
        "hash": "sha256-WWq2yWnqpZBhj7ooR9VWGyXsUJmnGwPc+zD6F3wtZ8A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.wasm",
        "name": "Uno.Core.Extensions.st6mennq8i.wasm",
        "hash": "sha256-EEYIz0Z+6HF6RScCMSca2b+uAjdaJu3JdaGWyTzmKio=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Diagnostics.Eventing.wasm",
        "name": "Uno.Diagnostics.Eventing.vqjfu0vn7y.wasm",
        "hash": "sha256-t5/FrWSsA8FpcUUm6WERxgLojzNplEjYeaebVx7w+kA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Authentication.UI.wasm",
        "name": "Uno.Extensions.Authentication.UI.2bqrv5zs8w.wasm",
        "hash": "sha256-El9GMUyli3z3/sqM8Tb8URMmP/gX2Fa5Bm73rYuerBY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Authentication.wasm",
        "name": "Uno.Extensions.Authentication.uby22gi6wy.wasm",
        "hash": "sha256-Sjyc1vGMkrJRbk2B7+mt/eYG79bg1HRFk4SewIoi3Gw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Configuration.wasm",
        "name": "Uno.Extensions.Configuration.72i2d58rqe.wasm",
        "hash": "sha256-EZdwsILCHdvNPmN38SsQ+cO/ldDHAWmt6dpoLX3uJt4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Core.UI.wasm",
        "name": "Uno.Extensions.Core.UI.y7v1mkzzvv.wasm",
        "hash": "sha256-TuqmBZ4StVh1IL2NZIty8tzuE8YQhcseHCYJQWDLEYc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Core.wasm",
        "name": "Uno.Extensions.Core.z4v8lnu30n.wasm",
        "hash": "sha256-XR8A9zp3gt/ipvtzeVfeEcyEeUDClQPahT871JG8MCQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Hosting.wasm",
        "name": "Uno.Extensions.Hosting.rxmxb965s3.wasm",
        "hash": "sha256-X0Fbne4+39QwOuZI0AVE0BmRnyV/MqquygShrf5y+eM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Hosting.WinUI.wasm",
        "name": "Uno.Extensions.Hosting.WinUI.mp2hr2ntfo.wasm",
        "hash": "sha256-+hosEiLIEWp0y05yB4MS5MnujoxiUUUzVPlwsihYvbI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Http.wasm",
        "name": "Uno.Extensions.Http.bn5bxoowy2.wasm",
        "hash": "sha256-V5KQlGhYh+UTyZ9GpJeNNnVglbII/CtxfURGA69DPNI=",
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
        "name": "Uno.Extensions.Http.WinUI.11hrhz8gih.wasm",
        "hash": "sha256-9Su+TJHYDUlrUofnNhKn8kCLac7S+ati/pQH32QZeuQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Localization.WinUI.wasm",
        "name": "Uno.Extensions.Localization.WinUI.9csgwbua9h.wasm",
        "hash": "sha256-eX/U/wLgeHZRykjY1zIrIsPzBUvimQEWuX3aenWzaRA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Localization.wasm",
        "name": "Uno.Extensions.Localization.qsjv7gwq9p.wasm",
        "hash": "sha256-BmOqHBt0NoXmb99UqDMxdJaLG1AU5fDuz/zyWe7xpcs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Logging.Serilog.wasm",
        "name": "Uno.Extensions.Logging.Serilog.yepj3t4zvv.wasm",
        "hash": "sha256-loHmUWzaTZDkgu/yfR5P1gCctMSJgu/RT12dwb2s3f0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Logging.WebAssembly.Console.wasm",
        "name": "Uno.Extensions.Logging.WebAssembly.Console.yc9zd2e3jm.wasm",
        "hash": "sha256-Ii/00rjtBJdv3mw1qycdyl4hguR7LP5T5LdRqeCC3Xw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Logging.WinUI.wasm",
        "name": "Uno.Extensions.Logging.WinUI.wljst6u4xj.wasm",
        "hash": "sha256-vLiKX/HQZTn+I87Ei/5k+prYM/rbCshWC7UDmxsMKHU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Navigation.Toolkit.UI.wasm",
        "name": "Uno.Extensions.Navigation.Toolkit.UI.urruivnt6a.wasm",
        "hash": "sha256-5jm9gywKZDmJAV/Q8ubAOVdI0qnotS4XvdSaU12IMEk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Navigation.UI.wasm",
        "name": "Uno.Extensions.Navigation.UI.1a0zc28m4w.wasm",
        "hash": "sha256-KcA3XNtATNV+VUerHFo8BXtThiSA17GqQb244bYef8Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Navigation.wasm",
        "name": "Uno.Extensions.Navigation.j0dqyn138e.wasm",
        "hash": "sha256-nU0n9eg+zrXlrlSS8ywIlxk6cnh5jjxXkRgfk2LMfC8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Serialization.Refit.wasm",
        "name": "Uno.Extensions.Serialization.Refit.q5zjoa8wzi.wasm",
        "hash": "sha256-vjhrLGj7lNdCsJCbMSx2/SJbrRr/bgHIQv3jRQGeh7A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Serialization.wasm",
        "name": "Uno.Extensions.Serialization.9iofv3d8lw.wasm",
        "hash": "sha256-L5sPzIg2mQyMJDPEx58WyfyUk5liYEfoFye24+hBgB4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Storage.wasm",
        "name": "Uno.Extensions.Storage.8z1lx7f1so.wasm",
        "hash": "sha256-RGojUPnsGB5W7qipwj2F/N+Xn3kapR+aUMlRo4U3v1k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Storage.UI.wasm",
        "name": "Uno.Extensions.Storage.UI.m1sarnonmg.wasm",
        "hash": "sha256-hlzY/qtYOBHx+Nxq8xNQT8x6XipQjIxUZw6E3q9xUKo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Foundation.Logging.wasm",
        "name": "Uno.Foundation.Logging.bq9fd1a2az.wasm",
        "hash": "sha256-/S+0PJY28Du6gpQ69tkl8jvshC0RqzTPE0+y2mmUD+E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Foundation.Runtime.WebAssembly.wasm",
        "name": "Uno.Foundation.Runtime.WebAssembly.jrtz68rm0y.wasm",
        "hash": "sha256-kWifCXUpr6H3tc7i9bi6IXiaWTNkvf0yueS9WxRuKWo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Foundation.wasm",
        "name": "Uno.Foundation.3lkndncom2.wasm",
        "hash": "sha256-CY8ED9H51uLV4cBt5gi99Sl+GzF3efD1Eior5IB1fKw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Material.WinUI.wasm",
        "name": "Uno.Material.WinUI.g6glh7tutb.wasm",
        "hash": "sha256-2D05d/hmIWyO0a+qI37eLa7ZQEWjekZrsJq04raeBkY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Themes.WinUI.wasm",
        "name": "Uno.Themes.WinUI.dyezmgcs25.wasm",
        "hash": "sha256-i/OeVrVC7HONuDHG+VM/rpMLsN7x1N4Q7cYw2jLh5bk=",
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
        "name": "Uno.Toolkit.WinUI.09246tgfy9.wasm",
        "hash": "sha256-nAFi82I8Z2GuM5VE1jqc27Ueu/HJcS7GqDSa045AaUo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Adapter.Microsoft.Extensions.Logging.wasm",
        "name": "Uno.UI.Adapter.Microsoft.Extensions.Logging.ylifovcukp.wasm",
        "hash": "sha256-CsArRQu9NRLGieA54aScOZ/nQBp8nl6xHfn9N66job8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Composition.wasm",
        "name": "Uno.UI.Composition.odr4jdmh01.wasm",
        "hash": "sha256-ZLWpKczyTDDpQq88GtItYP/jsFLcTeTwS6AtEYlVkDs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Dispatching.wasm",
        "name": "Uno.UI.Dispatching.2runy9ny7l.wasm",
        "hash": "sha256-bhFiL9lUTzkxTDlxlbgFLESqPLH/6dqHinDjA7IIBCo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.FluentTheme.wasm",
        "name": "Uno.UI.FluentTheme.e19kftjqvp.wasm",
        "hash": "sha256-PuLYWqUKzrqJy1AWy8KdGngNuFTnNGYr+yhng6nclfg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.FluentTheme.v2.wasm",
        "name": "Uno.UI.FluentTheme.v2.gllctowa0n.wasm",
        "hash": "sha256-VBXcq8nY/aAHQC10B4BE/F6sxJ5abmg50F2lYe3NPzw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Lottie.wasm",
        "name": "Uno.UI.Lottie.z65isobeio.wasm",
        "hash": "sha256-yxbJjAj7y4JuYRUk78cNfrQEfx9BQXJMfHumz6ljm3k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Runtime.Skia.WebAssembly.Browser.wasm",
        "name": "Uno.UI.Runtime.Skia.WebAssembly.Browser.x4pewugqr0.wasm",
        "hash": "sha256-P7HjxWgIf96CGQrljixtIcQRBaUuRJzQE7our7Zlc1M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Runtime.Skia.wasm",
        "name": "Uno.UI.Runtime.Skia.8tlh1ko3fj.wasm",
        "hash": "sha256-rDlqDw2HhHk6ZRUZxLA40amditK1721/Rhy6BhrGbxA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Toolkit.wasm",
        "name": "Uno.UI.Toolkit.5u22jj3jwg.wasm",
        "hash": "sha256-3Yn+uexDNccqjzJBPid3n2aqftpQkFjQSKXHvzBbzIo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.wasm",
        "name": "Uno.UI.bawwhcx5wu.wasm",
        "hash": "sha256-cxxb0Bb8mDVovP1lphLy3ncHTGDt9C61McA6tlpT6ws=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.WinUI.Graphics2DSK.wasm",
        "name": "Uno.WinUI.Graphics2DSK.ood7gh4m8j.wasm",
        "hash": "sha256-CPUtmN7Mi4o7B9V8lNxTzenGsqs5D2BpBhuTv8nIONk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Xaml.wasm",
        "name": "Uno.Xaml.ebfn1fvgl0.wasm",
        "hash": "sha256-tiXaj9KKHB2ItOr55FNQYcntbk2ohT+bhD1ltTGUHWk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "zxing.wasm",
        "name": "zxing.p0bful7btl.wasm",
        "hash": "sha256-iWfSQxkYrssqQEByaWwPDjn/YKhew8tfuZ3e6mzOmlw=",
        "cache": "force-cache"
      }
    ]
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
