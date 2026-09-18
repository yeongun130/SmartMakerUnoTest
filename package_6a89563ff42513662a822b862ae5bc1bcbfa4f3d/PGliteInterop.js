// .Net10 Uno - PGlite(@electric-sql/pglite v0.5.8) ESM 번들을 동적 import()로 로드하고,
// [JSImport]가 호출할 globalThis.pglite_* 함수 3개를 노출한다.
// index.js는 ES 모듈이라 정적 import를 쓰려면 <script type="module">이 필요한데,
// 이 파일 자체는 Uno.Wasm.Bootstrap의 WasmScripts(EmbeddedResource, 일반 스크립트)로 로드되므로
// 정적 import 대신 동적 import()(일반 스크립트에서도 허용됨)를 사용해 이 제약을 피한다.
//
// .Net10 Uno(260917) - 원래는 wwwroot에 vendoring한 로컬 자산(/pglite/index.js)을 썼는데, Uno.Wasm.Bootstrap이
// 참조 프로젝트(LocalDataStore)의 wwwroot 자산을 빌드마다 해시가 바뀌는 package_<hash>/LocalDataStore/...
// 폴더 밑에 배치해서(로컬 빌드·publish 양쪽에서 실측 확인) 절대경로로 고정 참조가 불가능했다. jsdelivr CDN에서
// 직접 로드하는 방식으로 전환 - 해시 경로 문제 자체가 없어지고, index.js 내부의 상대경로(new URL("./pglite.wasm",
// import.meta.url) 등)도 CDN URL 기준으로 그대로 잘 풀린다. 오프라인 지원이 실제로 필요해지면 로컬 vendoring을
// 다시 붙이되, 이번에 겪은 해시 경로 문제부터 먼저 풀어야 한다.
let pgliteDbPromise = null;

async function getDb() {
    if (null === pgliteDbPromise) {
        pgliteDbPromise = (async () => {
            const { PGlite } = await import("https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.5.8/dist/index.js");
            return await PGlite.create({ dataDir: "idb://smartmaker-localdatastore" });
        })();
        // 실패한 promise를 캐시에 그대로 두면 이후 모든 호출(초기화 재시도 포함)이 영구히 같은 에러로
        // 즉시 실패해 페이지 새로고침 없이는 복구가 안 된다 - 거부되면 캐시를 비워 재시도를 허용한다.
        pgliteDbPromise.catch (function () { pgliteDbPromise = null; });
    }
    return await pgliteDbPromise;
}

globalThis.pglite_init = async function () {
    try {
        await getDb();
        return true;
    } catch (e) {
        console.error("pglite_init failed:", e);
        throw e;
    }
};

globalThis.pglite_execute = async function (sql, paramsJson) {
    const db = await getDb();
    const params = paramsJson ? JSON.parse(paramsJson) : [];
    // .Net10 Uno(260917) - PGlite는 서버로 나가는 네트워크 요청이 아니라 브라우저 안에서 도는 임베디드 DB라
    // devtools Network 탭으로는 쿼리 실행 여부를 확인할 수 없다 - 대신 Console에 직접 로그를 남긴다.
    console.log("[PGlite] execute:", sql, params);
    await db.query(sql, params);
    console.log("[PGlite] execute 완료");
};

globalThis.pglite_query = async function (sql, paramsJson) {
    const db = await getDb();
    const params = paramsJson ? JSON.parse(paramsJson) : [];
    console.log("[PGlite] query:", sql, params);
    const result = await db.query(sql, params);
    console.log("[PGlite] query 결과:", result.rows);
    return JSON.stringify(result.rows);
};
