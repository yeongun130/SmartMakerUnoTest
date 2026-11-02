// TopApp/WasmScripts/ScreenInfoInterop.js
// 261015 : ljw - GlobalDeviceManager.GetPrimaryScreenWidth/Height()가 쓰는 "현재 화면의 실제 픽셀 크기"
// (GetRelativeDpiAboutCurrentMonitor/Script.FuncServer.raw_GetResolution 둘 다 재사용).
// Microsoft.UI.Windowing.DisplayArea.Primary가 이 Uno 버전(6.6.184)에서 skia/wasm 양쪽 다 미구현
// (NotImplementedException, aka.platform.uno/notimplemented#m=DisplayArea%20DisplayArea.Primary)이라
// desktop은 Win32 GetSystemMetrics(SM_CXSCREEN/SM_CYSCREEN) P/Invoke로, WASM은 이 스크립트로 각각 대체한다.
// Uno.Wasm.Bootstrap이 EmbeddedResource로 등록된 WasmScripts\*.js를 빌드시 자동으로 페이지에 로드함
// (TopControl/WasmScripts/TaskNotification.js와 동일 컨벤션).
globalThis.smScreenInfo_getScreenWidth = function () {
    return window.screen.width;
};

globalThis.smScreenInfo_getScreenHeight = function () {
    return window.screen.height;
};
