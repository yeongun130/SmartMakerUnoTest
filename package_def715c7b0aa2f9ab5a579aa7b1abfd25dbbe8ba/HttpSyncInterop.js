// 261026 : yujeong - 3계층(신스마트서버) 통신용 동기 HTTP. WHttpManager가 동기 호출을 전제로 해서
// 브라우저에서도 동기로 쓸 수 있는 XMLHttpRequest(동기 모드)를 쓴다.
// 본문은 base64 문자열로 주고받는다(바이너리/인코딩 손실 방지).
globalThis.smhttp_sendSync = function (method, url, contentType, bodyBase64, headersJson) {
    const result = { ok: false, status: 0, body: "", charset: "", jsessionid: "", secureToken: "", error: "" };
    try {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, false);              // false = 동기
        xhr.withCredentials = true;                // 세션 쿠키(JSESSIONID)를 브라우저가 주고받게 함
        xhr.overrideMimeType("text/plain; charset=x-user-defined"); // 응답을 바이트 그대로 받기

        if (contentType) xhr.setRequestHeader("Content-Type", contentType);
        const headers = headersJson ? JSON.parse(headersJson) : {};
        for (const key in headers) xhr.setRequestHeader(key, headers[key]);

        let body = null;
        if (bodyBase64) {
            const bin = atob(bodyBase64);
            body = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) body[i] = bin.charCodeAt(i);
        }
        xhr.send(body);

        result.status = xhr.status;
        result.ok = 200 <= xhr.status && xhr.status < 300;

        const raw = xhr.responseText || "";
        let bin = "";
        for (let i = 0; i < raw.length; i++) bin += String.fromCharCode(raw.charCodeAt(i) & 0xff);
        result.body = btoa(bin);

        const contentTypeHeader = xhr.getResponseHeader("Content-Type") || "";
        const match = /charset=([^;]+)/i.exec(contentTypeHeader);
        result.charset = match ? match[1].trim() : "";

        // 서버가 Access-Control-Expose-Headers로 공개해야 읽힌다(안 읽혀도 쿠키 세션은 유지됨)
        result.jsessionid = xhr.getResponseHeader("JSESSIONID") || "";
        result.secureToken = xhr.getResponseHeader("Secure-Token") || "";
    } catch (e) {
        // CORS 거부/네트워크 오류는 여기로 온다(브라우저 콘솔에도 원인이 찍힘)
        result.error = String(e);
    }
    return JSON.stringify(result);
};
