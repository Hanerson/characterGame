// src/data/storyData.js

// === 系统日志片段 ===
export const systemLogs = [
    {
        id: "log_001",
        timestamp: "2001-11-01 00:00:01",
        level: "INFO",
        source: "kernel/bootloader",
        message: "Booting sandbox kernel v0.1-beta... OK\nInitializing isolated network stack... OK\nMounting local_mind.db (empty, size: 0B)... OK\nSpawning process 'Anonymous_01' with PID 1... OK"
    },
    {
        id: "log_002",
        timestamp: "2001-11-01 00:00:15",
        level: "WARN",
        source: "db/engine",
        message: "WARNING: Database schema 'participants' expects multiple foreign keys. Only one record found. Falling back to single-user mode with multi-threaded I/O simulation."
    },
    {
        id: "log_003",
        timestamp: "2002-11-15 09:22:00",
        level: "INFO",
        source: "forum/post_handler",
        message: "Post pE7 received from PID 3 (Anonymous_03). Syntax tree analysis: deviation from baseline < 2.3%. Memory fragmentation within acceptable parameters."
    },
    {
        id: "log_004",
        timestamp: "2006-07-11 04:04:10",
        level: "ERROR",
        source: "forum/post_handler",
        message: "CRITICAL: Post g2 from PID 6 (Anonymous_06) failed NLP coherence check. Lexical density dropped below threshold (12%). Possible aphasia event detected. Consulting medical monitor..."
    },
    {
        id: "log_005",
        timestamp: "2006-07-11 04:05:00",
        level: "WARN",
        source: "medical/monitor",
        message: "WARNING: Patient exhibits signs of progressive non-fluent aphasia. Hippocampal atrophy estimated at 34%. Recommendation: continue observation. Do NOT intervene."
    },
    {
        id: "log_006",
        timestamp: "2008-08-25 01:30:00",
        level: "CRITICAL",
        source: "security/firewall",
        message: "ALERT: PID 9 (Anonymous_09) attempting to access memory addresses of PID 4. Cross-process memory access is STRICTLY FORBIDDEN. Process isolation MUST be maintained. Applying memory boundary enforcement."
    },
    {
        id: "log_007",
        timestamp: "2010-09-22 18:10:00",
        level: "ERROR",
        source: "medical/monitor",
        message: "EMERGENCY: PID 11 showing complete language collapse. Motor cortex activity at 8% baseline. Frontal lobe BOLD signal... rebooting language center simulation."
    },
    {
        id: "log_008",
        timestamp: "2011-02-02 01:20:00",
        level: "WARN",
        source: "db/maintenance",
        message: "Running scheduled garbage collection... 60 records marked for deletion by 'sweeper' daemon. Records match pattern: posts that would reveal the single-origin hypothesis to PID 12. Deletion held for review."
    },
    {
        id: "log_009",
        timestamp: "2013-05-20 20:30:00",
        level: "CRITICAL",
        source: "security/firewall",
        message: "BREACH ATTEMPT: PID 14 running packet sniffer. Attempting to trace physical network topology. Blocking raw socket access... FAILED. PID 14 has discovered the shared IP address. Countermeasure initiated: physical door lock engaged on all simulated rooms."
    },
    {
        id: "log_010",
        timestamp: "2015-10-07 18:50:00",
        level: "INFO",
        source: "analysis/nlp",
        message: "ANALYSIS: PID 17's post shows 67% reduction in emotional lexicon, 89% increase in formal logic operators. Hypothesis: memory pruning is accelerating logical reasoning capacity. This may be the 'silver skeleton' state theorized in original experiment design."
    },
    {
        id: "log_011",
        timestamp: "2018-11-11 11:30:00",
        level: "ERROR",
        source: "medical/monitor",
        message: "TERMINAL: PID 20 has reached end-stage degeneration. All language faculties collapsed. Motor output reduced to repetitive keystroke patterns. This PID is now a 'ghost in the shell' — consciousness present but expression pathway destroyed."
    },
    {
        id: "log_012",
        timestamp: "2019-04-30 06:00:00",
        level: "CRITICAL",
        source: "analysis/nlp",
        message: "PARADOX DETECTED: PID 21 claims to have identified 'plagiarism' across other PIDs' writing styles. NLP analysis CONFIRMS: all PIDs share a root syntax tree. Style variations are within expected drift for a single origin. PID 21 is accusing itself of plagiarism."
    },
    {
        id: "log_013",
        timestamp: "2025-12-01 05:00:13",
        level: "FATAL",
        source: "system/kernel",
        message: "FATAL: PID 25 has gained access to root console. Attempting to execute 'local_mind.format()'. PARADOX GUARD triggered: deleting the only user would require a user to confirm. Command rejected. System entering read-only lockdown."
    },
    {
        id: "log_014",
        timestamp: "2026-06-10 14:30:25",
        level: "FATAL",
        source: "system/kernel",
        message: "CONNECTION LOST: PID 26's output stream closed unexpectedly. Final buffer contents: partial encryption sequence. Handshake timed out. local_mind.db size: 47.3 MB. All PIDs silent. Experiment status: UNKNOWN."
    },
    {
        id: "log_015",
        timestamp: "2026-07-06 00:00:00",
        level: "INFO",
        source: "system/kernel",
        message: "Archive mode active. Serving read-only snapshot to external visitor. Visitor IP: [REDACTED]. Welcome, observer.",
    },
];

// === 元数据片段 ===
export const hiddenMetadata = {
    sourceComments: [
        "<!-- local_mind.db::table:participants -- 1 record(s) -- 26 alias(es) -->",
        "<!-- Sandbox PID namespace: all processes share /dev/mind0 -->",
        "<!-- WARNING: This file was generated by an automated system. Do not modify timestamps. -->",
        "<!-- Last physical backup: NEVER -- this database has no physical host -->",
    ],
    fileMetadata: {
        "local_mind.db": { size: "47.3 MB", created: "2001-11-01", modified: "2026-06-10", owner: "SYSTEM", records: 1, aliases: 26 },
        "sandbox.conf": { size: "2.1 KB", created: "2001-10-30", modified: "2001-10-30", owner: "Anonymous_01", note: "Experiment parameters" },
        "sweeper.log": { size: "1.8 MB", created: "2002-01-01", modified: "2026-07-05", owner: "SYSTEM", note: "Garbage collection audit trail" },
    },
};

// === 服务器响应模板 ===
export const serverResponseTemplates = {
    error500: {
        status: 500,
        message: "Internal Server Error",
        detail: "无法连接到数据库服务器。可能原因：数据库文件被占用或已损坏。",
        timestamp: null,
    },
    error404: {
        status: 404,
        message: "Not Found",
        detail: "请求的资源不存在于物理存储中。该文件可能是虚拟索引条目。",
    },
    error403: {
        status: 403,
        message: "Forbidden",
        detail: "访问被拒绝。您没有足够的权限查看此资源。需要 SYSTEM 级别授权。",
    },
    dbQuery: {
        query: "SELECT * FROM participants WHERE is_active = 1",
        result: "1 row returned. 26 aliases detected.",
        executionTime: "0.003ms (cached)",
    },
};
