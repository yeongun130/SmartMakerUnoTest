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

// ── DB관리자 (SaaS manager/PGlite.js + modal/db-manager.js 이식) ──────────────────────
// SaaS PGliteManager의 SQL을 그대로 옮기되, 위 getDb()를 공유해 DB 인스턴스를 하나로 유지한다
// (LocalDataStore와 DB관리자가 각자 PGlite를 만들면 같은 IndexedDB를 두 인스턴스가 열게 됨).
// 결과는 C#에서 다루기 쉽게 JSON 문자열로 돌려주고, 그리드 데이터는 표시 문자열 2차원 배열로 통일한다.

const DBM_ROW_ID = "__dbm_ctid";       // SaaS PGliteManager.ROW_ID - 편집용 행 식별자(ctid) 별칭
const DBM_MAX_CELL_TEXT = 500;         // SaaS ModalDbManager.MAX_CELL_TEXT - 셀 표시 최대 글자 수
const DBM_MAX_RENDER_ROWS = 1000;      // SaaS ModalDbManager.MAX_RENDER_ROWS - 화면에 넘길 최대 행 수

// SaaS quoteIdent/qualify 그대로 - 테이블·컬럼명은 바인딩이 안 되므로 큰따옴표로 인용해 SQL에 직접 넣는다
function dbmQuoteIdent(name) { return `"${String(name).replace(/"/g, '""')}"`; }
function dbmQualify(table, schema) { return `${dbmQuoteIdent(schema || "public")}.${dbmQuoteIdent(table)}`; }

// SaaS ModalDbManager.formatCell 이식 - C#로 넘기기 전에 표시 문자열로 바꿔서
// Date(UTC 밀림)/Uint8Array(인덱스 객체화)/bigint(JSON.stringify 예외) 직렬화 문제를 없앤다. NULL은 null 유지.
function dbmFormatCell(value) {
    if (value === null || value === undefined) return null;

    if (value instanceof Date) {
        const pad = (n) => String(n).padStart(2, "0");
        // toISOString은 UTC로 밀려 값이 달라 보이므로 로컬 표기로 조립(SaaS 원본 주석)
        return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())} ` +
               `${pad(value.getHours())}:${pad(value.getMinutes())}:${pad(value.getSeconds())}`;
    }

    if (value instanceof Uint8Array) return `\\x… (${value.length} bytes)`;
    if (typeof value === "bigint") return value.toString();

    // jsonb 등 객체 - 안쪽 bigint도 문자열로 바꿔 stringify 예외를 막는다
    const text = typeof value === "object"
        ? JSON.stringify(value, (k, v) => (typeof v === "bigint" ? v.toString() : v))
        : String(value);

    // 셀에는 잘린 값이 들어감. 전체 값이 필요하면 SQL 탭에서 조회(SaaS 원본 주석)
    return text.length > DBM_MAX_CELL_TEXT
        ? `${text.slice(0, DBM_MAX_CELL_TEXT)}… (${text.length}자)`
        : text;
}

// PGlite 결과(rowMode:'array') → { fields, rows, totalRows, affectedRows }
// totalRows는 잘리기 전 행 수 - C#에서 "1000행까지만 표시" 안내에 사용
function dbmToGrid(result) {
    const rows = result?.rows ?? [];
    return {
        fields: (result?.fields ?? []).map((f) => f.name),
        rows: rows.slice(0, DBM_MAX_RENDER_ROWS).map((row) => row.map(dbmFormatCell)),
        totalRows: rows.length,
        affectedRows: result?.affectedRows ?? 0,
    };
}

// SaaS listTables - 뷰·시퀀스 제외, 실체 테이블만
globalThis.dbm_listTables = async function (schema) {
    const db = await getDb();
    const result = await db.query(
        `select table_name
           from information_schema.tables
          where table_schema = $1
            and table_type = 'BASE TABLE'
          order by table_name`,
        [schema || "public"]);
    return JSON.stringify(result.rows.map((row) => row.table_name));
};

// SaaS describeTable - pg_catalog 사용(format_type이 varchar(50)/numeric(10,2) 표기를 만들어 줌)
// castType 보정(toCastType)도 그대로 - character(수식자 없음)는 char(1) 절단이 생겨 bpchar로 바꾼다
globalThis.dbm_describeTable = async function (table, schema) {
    const db = await getDb();
    const result = await db.query(
        `select a.attnum                              as ordinal_position,
                a.attname                             as column_name,
                format_type(a.atttypid, a.atttypmod)  as data_type,
                format_type(a.atttypid, null)         as base_type,
                a.attnotnull                          as not_null,
                pg_get_expr(ad.adbin, ad.adrelid)     as column_default,
                (ct.contype is not null)              as is_pk
           from pg_attribute a
           join pg_class c            on c.oid = a.attrelid
           join pg_namespace n        on n.oid = c.relnamespace
           left join pg_attrdef ad    on ad.adrelid = a.attrelid
                                     and ad.adnum = a.attnum
           left join pg_constraint ct on ct.conrelid = a.attrelid
                                     and ct.contype = 'p'
                                     and a.attnum = any(ct.conkey)
          where n.nspname = $1
            and c.relname = $2
            and a.attnum > 0
            and not a.attisdropped
          order by a.attnum`,
        [schema || "public", table]);

    return JSON.stringify(result.rows.map((row) => ({
        ordinalPosition: row.ordinal_position,
        name: row.column_name,
        type: row.data_type,
        castType: String(row.base_type ?? "text").replace(/^character(?=\[|$)/, "bpchar"),
        notNull: row.not_null === true,
        defaultValue: row.column_default,
        pk: row.is_pk === true,
    })));
};

// SaaS listIndexes
globalThis.dbm_listIndexes = async function (table, schema) {
    const db = await getDb();
    const result = await db.query(
        `select indexname, indexdef
           from pg_indexes
          where schemaname = $1
            and tablename = $2
          order by indexname`,
        [schema || "public", table]);
    return JSON.stringify(result.rows.map((row) => ({ name: row.indexname, definition: row.indexdef })));
};

// SaaS countRows - count(*)는 bigint라 ::int로 캐스팅해 number로 받는다
globalThis.dbm_countRows = async function (table, schema) {
    const db = await getDb();
    const result = await db.query(`select count(*)::int as cnt from ${dbmQualify(table, schema)}`);
    return result.rows[0]?.cnt ?? 0;
};

// SaaS selectRows 이식 - 페이징·정렬
// orderColumn이 비면 defaultOrder(보통 PK) 순, 그것도 없으면 물리 순서(UPDATE한 행이 맨 뒤로 밀림)
// withRowId면 ctid를 맨 앞 컬럼으로 받아서, 그리드 컬럼에서는 떼어 rowIds로 따로 돌려준다
globalThis.dbm_selectRows = async function (table, schema, limit, offset, orderColumn, orderDesc, defaultOrderJson, withRowId) {
    const db = await getDb();

    const defaultOrder = (defaultOrderJson ? JSON.parse(defaultOrderJson) : [])
        .map((name) => dbmQuoteIdent(name)).join(", ");

    const order = orderColumn
        ? ` order by ${dbmQuoteIdent(orderColumn)} ${orderDesc ? "desc" : "asc"}`
        : defaultOrder ? ` order by ${defaultOrder}` : "";

    const rowId = withRowId ? `ctid::text as ${dbmQuoteIdent(DBM_ROW_ID)}, ` : "";

    const result = await db.query(
        `select ${rowId}* from ${dbmQualify(table, schema)}${order} limit $1 offset $2`,
        [limit, offset],
        { rowMode: "array" });

    const grid = dbmToGrid(result);

    if (withRowId) {
        grid.rowIds = grid.rows.map((row) => row[0]);
        grid.rows = grid.rows.map((row) => row.slice(1));
        grid.fields = grid.fields.slice(1);
    }

    return JSON.stringify(grid);
};

// SaaS runSql의 exec 부분 - 여러 문장(; 구분)을 하나의 트랜잭션으로 실행
// rowMode:'array' - 조인 결과의 같은 이름 컬럼 값이 덮어써지지 않게 행을 배열로 받는다
globalThis.dbm_exec = async function (sql) {
    const db = await getDb();
    const startedAt = performance.now();
    const results = await db.exec(sql, { rowMode: "array" });
    return JSON.stringify({
        elapsedMs: Math.round(performance.now() - startedAt),
        results: (Array.isArray(results) ? results : [results]).map(dbmToGrid),
    });
};

// SaaS config/app-config.js detectDevMode - 개발 도구(비우기/삭제/초기화/셀 편집) 표시 여부
globalThis.dbm_isDevHost = function () {
    const hostname = globalThis.location ? globalThis.location.hostname : "";
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
};

// ── DB관리자 개발 도구 (SaaS PGliteManager 개발 도구 영역 이식) ─────────────────────────

// SaaS 확인창(confirm) 그대로 - 되돌릴 수 없는 작업 전에 대상과 행 수를 보여 준다
globalThis.dbm_confirm = function (message) {
    return true === globalThis.confirm(message);
};

// SaaS dropTables - 여러 개를 한 문장으로(전부 성공하거나 전부 실패)
// CASCADE - 참조하는 FK 제약·뷰도 함께 삭제(참조하는 테이블의 데이터는 유지)(SaaS 원본 주석)
globalThis.dbm_dropTables = async function (tablesJson, schema) {
    const db = await getDb();
    const targets = JSON.parse(tablesJson).map((name) => dbmQualify(name, schema)).join(", ");
    await db.exec(`drop table if exists ${targets} cascade`);
};

// SaaS truncateTables - 구조는 두고 데이터만 삭제, serial 번호도 1부터
// CASCADE 미사용 - 참조하는 다른 테이블까지 조용히 비우지 않도록, FK로 묶인 테이블은 함께 선택해야 성공(SaaS 원본 주석)
globalThis.dbm_truncateTables = async function (tablesJson, schema) {
    const db = await getDb();
    const targets = JSON.parse(tablesJson).map((name) => dbmQualify(name, schema)).join(", ");
    await db.exec(`truncate table ${targets} restart identity`);
};

// SaaS resetSchema - 테이블·뷰·시퀀스·함수 전부 삭제 후 빈 스키마로 재생성
// 다중 문장은 하나의 암묵적 트랜잭션 → 재생성 실패 시 삭제도 롤백(SaaS 원본 주석)
globalThis.dbm_resetSchema = async function (schema) {
    const db = await getDb();
    const target = dbmQuoteIdent(schema || "public");
    await db.exec(`drop schema ${target} cascade; create schema ${target};`);
};

// SaaS fetchCellText - 편집 시작 값. 화면 값은 표시용(잘림·변환)이라 DB의 text 표현을 다시 읽는다
// 반환 { found, value } - value는 NULL이면 null
globalThis.dbm_fetchCellText = async function (table, rowId, column, schema) {
    const db = await getDb();
    const result = await db.query(
        `select ${dbmQuoteIdent(column)}::text as v
           from ${dbmQualify(table, schema)}
          where ctid = $1::tid`,
        [rowId]);
    const row = result.rows[0];
    return JSON.stringify({ found: !!row, value: row?.v ?? null });
};

// SaaS updateCell + castParam - $1::text::타입으로 받아 서버에서 변환(입력 문자열을 모든 타입에 그대로 사용)
// value가 null이면 NULL로 저장. 반환 = 영향받은 행 수(0이면 그 사이 행이 바뀐 것)
globalThis.dbm_updateCell = async function (table, rowId, column, castType, value, schema) {
    const db = await getDb();
    const result = await db.query(
        `update ${dbmQualify(table, schema)}
            set ${dbmQuoteIdent(column)} = $1::text::${castType}
          where ctid = $2::tid`,
        [value, rowId]);
    return result.affectedRows ?? 0;
};

// SaaS deleteRows - ctid 목록으로 삭제. 반환 = 삭제된 행 수
globalThis.dbm_deleteRows = async function (table, rowIdsJson, schema) {
    const db = await getDb();
    const result = await db.query(
        `delete from ${dbmQualify(table, schema)} where ctid = any($1::tid[])`,
        [JSON.parse(rowIdsJson)]);
    return result.affectedRows ?? 0;
};

// SaaS insertRow - entries [{ name, castType, value }], 빠진 컬럼은 DB 기본값. 반환 = 추가된 행 수
globalThis.dbm_insertRow = async function (table, entriesJson, schema) {
    const db = await getDb();
    const target = dbmQualify(table, schema);
    const entries = JSON.parse(entriesJson);

    if (entries.length === 0) {
        const result = await db.query(`insert into ${target} default values`);
        return result.affectedRows ?? 0;
    }

    const names = entries.map((entry) => dbmQuoteIdent(entry.name)).join(", ");
    const values = entries.map((entry, i) => `$${i + 1}::text::${entry.castType}`).join(", ");

    const result = await db.query(
        `insert into ${target} (${names}) values (${values})`,
        entries.map((entry) => entry.value));
    return result.affectedRows ?? 0;
};

// ── 1계층(_Alone) PGlite 동기 브리지 ──────────────────────────────────────────────────
// 261019 : yujeong - AsCoreEx(UserLoginMgr/RowsetMgrX/CursorMgrX/TransactionMgrX)는 ADO.NET 동기 ExecuteReader
// 전제라 Promise 기반 db.query()를 쓸 수 없다. 앱 시작 시 dbm_initSync()를 한 번 await 해서 DB를 미리 띄워두고,
// 이후엔 PGlite 0.5.8의 execProtocolRawSync(동기 wire protocol 실행)로 [JSImport] 동기 호출에 응답한다.
// 주의: execProtocolRawSync는 PGlite 내부 mutex를 우회한다 - 위 async 함수(pglite_*/dbm_*)가 진행 중일 때
//       동시에 호출하지 않도록 호출부에서 순서를 보장해야 한다.
let g_syncDb = null;
let g_pgModule = null;

globalThis.dbm_initSync = async function () {
    g_syncDb = await getDb();
    g_pgModule = await import("https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.5.8/dist/index.js");
    return true;
};

globalThis.dbm_isSyncReady = function () {
    return null !== g_syncDb && null !== g_pgModule;
};

// 반환 JSON: { ok, error, code, results:[{ fields:[{name,dataTypeID}], rows:[[...]], affectedRows }] }
// 값 변환은 C#(PGliteSyncBridge)에서 OID 기준으로 한다 - parsers를 비워 모든 값을 Postgres 텍스트 그대로 받는다
// (기본 parser를 쓰면 int8이 BigInt로 와서 JSON.stringify가 실패하고, 날짜가 Date 객체로 바뀌어 형식이 흔들린다).
globalThis.dbm_querySync = function (sql) {
    if (null === g_syncDb || null === g_pgModule)
        return JSON.stringify({ ok: false, error: "PGlite 동기 브리지가 초기화되지 않았습니다(dbm_initSync 선행 필요).", code: "" });

    try {
        const { protocol, parse } = g_pgModule;
        const raw = g_syncDb.execProtocolRawSync(protocol.serialize.query(sql));   // 'Q' 단순 쿼리 메시지

        const messages = [];
        new protocol.Parser().parse(raw, (msg) => messages.push(msg));

        // raw 경로는 ErrorResponse를 throw 해주지 않으므로 직접 검사
        const err = messages.find((msg) => msg.name === "error");
        if (err) {
            // 261019 : yujeong - Postgres 오류(테이블 없음 등)는 C#으로 결과만 넘겨 콘솔에 안 남았다 - 원인 확인용으로 SQL과 함께 기록
            console.error("[PGlite] querySync SQL 오류:", err.code ?? "", err.message, "\nSQL:", sql);
            return JSON.stringify({ ok: false, error: err.message, code: err.code ?? "" });
        }

        const results = parse.parseResults(messages, {}, { rowMode: "array" }).map((result) => ({
            fields: (result.fields ?? []).map((field) => ({ name: field.name, dataTypeID: field.dataTypeID })),
            rows: result.rows ?? [],
            affectedRows: result.affectedRows ?? 0,
        }));

        // IndexedDB 반영은 비동기 fire-and-forget(relaxed durability) - 탭을 바로 닫으면 마지막 변경이 유실될 수 있음
        g_syncDb.syncToFs(true).catch((e) => console.error("[PGlite] syncToFs 실패:", e));

        return JSON.stringify({ ok: true, results: results });
    } catch (e) {
        console.error("[PGlite] querySync 실패:", sql, e);
        return JSON.stringify({ ok: false, error: String(e?.message ?? e), code: "" });
    }
};
