// TopApp/WasmScripts/FileDownloadInterop.js
// 261016 : ljw - WasmDownloadHelper.DownloadBytes()가 쓰는 범용 브라우저 다운로드 트리거.
// Uno.Wasm.Bootstrap이 EmbeddedResource로 등록된 WasmScripts\*.js를 빌드시 자동으로 페이지에 로드함
// (TopControl/WasmScripts/TaskNotification.js와 동일 컨벤션).
globalThis.smFileDownload_downloadBytes = function (base64Data, fileName) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
