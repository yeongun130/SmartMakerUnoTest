// .Net10 Uno - PGlite(@electric-sql/pglite v0.5.8) ESM 번들을 동적 import()로 로드하고,
// [JSImport]가 호출할 globalThis.pglite_* 함수 3개를 노출한다.
// index.js는 ES 모듈이라 정적 import를 쓰려면 <script type="module">이 필요한데,
// 이 파일 자체는 Uno.Wasm.Bootstrap의 WasmScripts(EmbeddedResource, 일반 스크립트)로 로드되므로
// 정적 import 대신 동적 import()(일반 스크립트에서도 허용됨)를 사용해 이 제약을 피한다.

let pgliteDbPromise = null;

async function getDb() {
    if (null === pgliteDbPromise) {
        pgliteDbPromise = (async () => {
            const { PGlite } = await import("/pglite/index.js");
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
    await db.query(sql, params);
};

globalThis.pglite_query = async function (sql, paramsJson) {
    const db = await getDb();
    const params = paramsJson ? JSON.parse(paramsJson) : [];
    const result = await db.query(sql, params);
    return JSON.stringify(result.rows);
};
