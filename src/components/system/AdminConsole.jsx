// src/components/system/AdminConsole.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serverResponseTemplates } from '../../data/storyData.js';

const AdminConsole = () => {
    const [authStatus, setAuthStatus] = useState('checking');
    const [activePanel, setActivePanel] = useState(null);
    const [queryResult, setQueryResult] = useState(null);
    const [typedText, setTypedText] = useState('');
    const [showTruth, setShowTruth] = useState(false);

    const fullTruthText = `实验代号：忒修斯协议 (Theseus Protocol)
实验状态：进行中（第25年）
实验对象：u_0001
实验方式：沙盒认知模拟

2001年：林远将自身意识数字化并存入 local_mind.db。
2001-2026年：系统创建了 26 个匿名身份。
所有会话共享同一底层记录。
清道夫守护进程自动删除触及核心假设的推论。

终止实验的前提：实验对象主动选择结束。
每次即将达成时，清道夫会抹去相关记录。

当前会话：第27次。`;

    useEffect(() => {
        // 模拟认证检查
        const timer = setTimeout(() => {
            setAuthStatus('denied');
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showTruth && typedText.length < fullTruthText.length) {
            const timer = setTimeout(() => {
                setTypedText(fullTruthText.slice(0, typedText.length + 1));
            }, 30);
            return () => clearTimeout(timer);
        }
    }, [showTruth, typedText]);

    const handleBruteForce = () => {
        setAuthStatus('checking');
        setTimeout(() => {
            setAuthStatus('granted');
        }, 2000);
    };

    const handleDbQuery = (query) => {
        if (query === 'participants') {
            setQueryResult({
                query: "SELECT * FROM participants;",
                result: [
                    { user_id: 'u_0001', name: '[REDACTED]', created: '2001-11-01 00:00:01', status: 'ACTIVE', aliases: 26 },
                ],
                rows: 1,
                note: 'WARNING: 参与者表包含 1 条记录。论坛身份为该记录的别名。',
            });
        } else if (query === 'posts') {
            setQueryResult({
                query: "SELECT COUNT(*) FROM posts;",
                result: [{ count: 418 }],
                rows: 1,
                note: '418篇帖子。sweeper_daemon 已删除: 估计 200+ 篇。',
            });
        } else if (query === 'sessions') {
            setQueryResult({
                query: "SELECT * FROM active_sessions;",
                result: Array.from({ length: 26 }, (_, i) => ({
                    session_id: `sess_${String(i + 1).padStart(4, '0')}`,
                    alias: `Anonymous_${String(i + 1).padStart(2, '0')}`,
                    pid: i + 1,
                    status: i === 25 ? 'CONNECTION_LOST' : i >= 20 ? 'DEGRADED' : 'ACTIVE',
                    memory_usage_mb: (Math.random() * 50 + 10).toFixed(1),
                })),
                rows: 26,
                note: '所有会话运行在共享PID命名空间中。会话之间内存隔离由 sandbox 内核强制执行。',
            });
        }
    };

    // 认证检查中
    if (authStatus === 'checking') {
        return (
            <div style={{
                backgroundColor: '#000',
                color: '#00ff00',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Courier New", monospace',
            }}>
                <div style={{ fontSize: '24px', marginBottom: '20px' }}>🔐</div>
                <div style={{ fontSize: '14px', marginBottom: '10px' }}>
                    正在验证管理员身份...
                </div>
                <div className="spinner" style={{ marginBottom: '10px' }}></div>
                <div style={{ fontSize: '11px', color: '#888' }}>
                    查询 local_mind.db::participants 表中...
                </div>
                <div style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
                    正在检查 user_id: u_0001 的权限级别...
                </div>
            </div>
        );
    }

    // 认证被拒
    if (authStatus === 'denied') {
        return (
            <div style={{
                backgroundColor: '#000',
                color: '#ff4444',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Courier New", monospace',
                padding: '20px',
            }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚫</div>
                <h1 style={{ color: '#ff4444', fontSize: '20px', marginBottom: '16px' }}>
                    ACCESS DENIED
                </h1>
                <div style={{
                    background: '#1a0000',
                    border: '1px solid #660000',
                    padding: '20px',
                    maxWidth: '500px',
                    fontSize: '13px',
                    lineHeight: 1.8,
                }}>
                    <p style={{ color: '#ff4444' }}>
                        <strong>HTTP 403 — 需要管理员权限</strong>
                    </p>
                    <p style={{ color: '#cc8888' }}>
                        当前用户 (guest_anonymous / u_0001) 没有访问管理员控制台的权限。
                    </p>
                    <p style={{ color: '#aa8888', fontSize: '11px' }}>
                        u_0001 是数据库中唯一的用户。
                    </p>
                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <Link
                            to="/system/logs"
                            style={{
                                color: '#888',
                                fontSize: '11px',
                                textDecoration: 'underline',
                            }}
                        >
                            查看系统日志
                        </Link>
                        <span style={{ color: '#666' }}>|</span>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleBruteForce();
                            }}
                            style={{
                                color: '#ff8800',
                                fontSize: '11px',
                                textDecoration: 'underline',
                            }}
                        >
                            强制认证绕过...
                        </a>
                        <span style={{ color: '#666' }}>|</span>
                        <Link
                            to="/"
                            style={{
                                color: '#888',
                                fontSize: '11px',
                                textDecoration: 'underline',
                            }}
                        >
                            返回桌面
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 认证通过 — 完整管理面板
    return (
        <div style={{
            backgroundColor: '#000',
            color: '#00ff00',
            minHeight: '100vh',
            fontFamily: '"Courier New", "SimSun", monospace',
            fontSize: '13px',
        }}>
            {/* 标题栏 */}
            <div style={{
                background: 'linear-gradient(90deg, #660000, #cc0000)',
                color: '#ffffff',
                padding: '6px 16px',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <span>⚠️ ADMIN CONSOLE — 绕过认证 (PARADOX MODE)</span>
                <Link to="/" style={{ color: '#ffcccc', fontSize: '11px', textDecoration: 'none' }}>
                    ← 返回桌面
                </Link>
            </div>

            {/* 警告横幅 */}
            <div style={{
                background: '#330000',
                color: '#ff6666',
                padding: '8px 16px',
                fontSize: '11px',
                borderBottom: '1px solid #660000',
                fontFamily: '"Courier New", monospace',
            }}>
                ⚠ PARADOX WARNING
                <br />
                u_0001 正在访问 u_0001 的管理数据。
                <br />
                清道夫已被临时禁用。
            </div>

            <div style={{ display: 'flex', height: 'calc(100vh - 110px)' }}>
                {/* 左侧面板导航 */}
                <div style={{
                    width: '220px',
                    borderRight: '1px solid #333',
                    padding: '8px 0',
                    background: '#0a0a0a',
                }}>
                    <div style={{ padding: '6px 12px', fontSize: '11px', color: '#888', marginBottom: '4px' }}>
                        📋 管理面板
                    </div>
                    {[
                        { key: 'db', label: '🗄️ 数据库管理' },
                        { key: 'users', label: '👤 用户管理' },
                        { key: 'sweeper', label: '🧹 清道夫控制' },
                        { key: 'experiment', label: '🧪 实验协议' },
                        { key: 'truth', label: '📜 完整实验记录' },
                    ].map(item => (
                        <div
                            key={item.key}
                            onClick={() => {
                                setActivePanel(item.key);
                                if (item.key === 'db') handleDbQuery('participants');
                                if (item.key === 'users') handleDbQuery('sessions');
                                if (item.key === 'truth') setShowTruth(true);
                            }}
                            style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                color: activePanel === item.key ? '#00ff00' : '#aaa',
                                background: activePanel === item.key ? '#1a2a1a' : 'transparent',
                                borderLeft: activePanel === item.key ? '3px solid #00ff00' : '3px solid transparent',
                            }}
                            onMouseEnter={e => {
                                if (activePanel !== item.key) e.currentTarget.style.background = '#111';
                            }}
                            onMouseLeave={e => {
                                if (activePanel !== item.key) e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* 右侧内容区 */}
                <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
                    {/* 默认视图：系统概览 */}
                    {!activePanel && (
                        <div>
                            <h2 style={{ color: '#00ff00', fontSize: '16px', marginBottom: '12px' }}>
                                🖥️ 系统概览
                            </h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '12px',
                                fontSize: '12px',
                            }}>
                                <div style={{ border: '1px solid #333', padding: '10px', background: '#0a0a0a' }}>
                                    <div style={{ color: '#00aaff', fontWeight: 'bold', marginBottom: '6px' }}>📊 系统状态</div>
                                    <div className="dim">运行时间: 9023 天</div>
                                    <div className="dim">内核: sandbox-v0.1-beta</div>
                                    <div className="dim">数据库: 47.3 MB</div>
                                    <div className="warn">模式: SINGLE_USER</div>
                                </div>
                                <div style={{ border: '1px solid #333', padding: '10px', background: '#0a0a0a' }}>
                                    <div style={{ color: '#00aaff', fontWeight: 'bold', marginBottom: '6px' }}>👤 参与者</div>
                                    <div className="dim">物理用户: 1</div>
                                    <div className="dim">活跃别名: 26</div>
                                    <div className="dim">人格快照: 27 (含当前会话)</div>
                                    <div className="error">连接丢失: 1 (Anonymous_26)</div>
                                </div>
                                <div style={{ border: '1px solid #333', padding: '10px', background: '#0a0a0a' }}>
                                    <div style={{ color: '#00aaff', fontWeight: 'bold', marginBottom: '6px' }}>🧹 清道夫状态</div>
                                    <div className="dim">状态: 活跃（已临时禁用）</div>
                                    <div className="dim">已删除记录: ~200+</div>
                                    <div className="warn">触发条件: 参与者即将认知到真相</div>
                                </div>
                                <div style={{ border: '1px solid #333', padding: '10px', background: '#0a0a0a' }}>
                                    <div style={{ color: '#00aaff', fontWeight: 'bold', marginBottom: '6px' }}>🧪 实验进度</div>
                                    <div className="dim">当前阶段: Phase 4 (终末阶段)</div>
                                    <div className="dim">认知退化: 83% (平均值)</div>
                                    <div className="dim">自我觉察: 3.7% (被压制中)</div>
                                </div>
                            </div>

                            <div style={{ marginTop: '16px', padding: '12px', border: '1px solid #333', background: '#0a0a0a', fontSize: '11px' }}>
                                <div style={{ color: '#ffff00', marginBottom: '8px' }}>
                                    ⚠ 管理员备注 (来自 Anonymous_01 / PID 1):
                                </div>
                                <div style={{ color: '#ccc', lineHeight: 1.7 }}>
                                    "实验持续进行中。"
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 数据库面板 */}
                    {activePanel === 'db' && queryResult && (
                        <div>
                            <h2 style={{ color: '#00ff00', fontSize: '16px', marginBottom: '12px' }}>
                                🗄️ 数据库管理
                            </h2>
                            <div style={{ marginBottom: '12px', display: 'flex', gap: '8px' }}>
                                {['participants', 'posts', 'sessions'].map(q => (
                                    <button
                                        key={q}
                                        onClick={() => handleDbQuery(q)}
                                        style={{
                                            padding: '4px 12px',
                                            fontSize: '11px',
                                            background: '#111',
                                            color: '#00ff00',
                                            border: '1px solid #333',
                                            cursor: 'pointer',
                                            fontFamily: '"Courier New", monospace',
                                            minWidth: 'unset',
                                            boxShadow: 'none',
                                        }}
                                    >
                                        SELECT * FROM {q}
                                    </button>
                                ))}
                            </div>
                            <div style={{ background: '#0a0a0a', border: '1px solid #333', padding: '12px' }}>
                                <div style={{ color: '#00aaff', marginBottom: '8px' }}>
                                    {'>'} {queryResult.query}
                                </div>
                                <pre style={{
                                    color: '#ccc',
                                    fontSize: '11px',
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: '"Courier New", monospace',
                                    lineHeight: 1.6,
                                }}>
                                    {JSON.stringify(queryResult.result, null, 2)}
                                </pre>
                                <div style={{ color: '#888', marginTop: '8px' }}>
                                    ({queryResult.rows} row(s) returned)
                                </div>
                                <div style={{
                                    color: '#ffff00',
                                    marginTop: '12px',
                                    padding: '8px',
                                    background: '#1a1a00',
                                    border: '1px solid #333300',
                                    fontSize: '11px',
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: 1.6,
                                }}>
                                    {queryResult.note}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 用户管理面板 */}
                    {activePanel === 'users' && queryResult && (
                        <div>
                            <h2 style={{ color: '#00ff00', fontSize: '16px', marginBottom: '12px' }}>
                                👤 活跃会话管理
                            </h2>
                            <div style={{ background: '#0a0a0a', border: '1px solid #333' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #333' }}>
                                            <th style={{ padding: '6px 10px', textAlign: 'left', color: '#00aaff' }}>会话ID</th>
                                            <th style={{ padding: '6px 10px', textAlign: 'left', color: '#00aaff' }}>别名</th>
                                            <th style={{ padding: '6px 10px', textAlign: 'left', color: '#00aaff' }}>PID</th>
                                            <th style={{ padding: '6px 10px', textAlign: 'left', color: '#00aaff' }}>状态</th>
                                            <th style={{ padding: '6px 10px', textAlign: 'left', color: '#00aaff' }}>内存</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {queryResult.result.map((sess, i) => (
                                            <tr key={i} style={{
                                                borderBottom: '1px solid #222',
                                                background: i === 25 ? '#1a0000' : (i >= 20 ? '#1a1a00' : 'transparent'),
                                            }}>
                                                <td style={{ padding: '4px 10px' }} className="dim">{sess.session_id}</td>
                                                <td style={{ padding: '4px 10px' }}>{sess.alias}</td>
                                                <td style={{ padding: '4px 10px' }} className="dim">{sess.pid}</td>
                                                <td style={{ padding: '4px 10px', color: sess.status === 'CONNECTION_LOST' ? '#ff0000' : sess.status === 'DEGRADED' ? '#ff8800' : '#00ff00' }}>
                                                    {sess.status}
                                                </td>
                                                <td style={{ padding: '4px 10px' }} className="dim">{sess.memory_usage_mb} MB</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div style={{
                                color: '#ffff00',
                                marginTop: '12px',
                                padding: '8px',
                                background: '#1a1a00',
                                border: '1px solid #333300',
                                fontSize: '11px',
                                whiteSpace: 'pre-wrap',
                                lineHeight: 1.6,
                            }}>
                                {queryResult.note}
                            </div>
                        </div>
                    )}

                    {/* 清道夫控制面板 */}
                    {activePanel === 'sweeper' && (
                        <div>
                            <h2 style={{ color: '#ff4444', fontSize: '16px', marginBottom: '12px' }}>
                                🧹 清道夫守护进程控制
                            </h2>
                            <div style={{ background: '#1a0000', border: '1px solid #660000', padding: '16px', fontSize: '12px', lineHeight: 1.8 }}>
                                <p style={{ color: '#ff6666' }}>
                                    <strong>⚠ 警告：sweeper_daemon (PID: 0) 是系统关键进程。</strong>
                                </p>
                                <p style={{ color: '#cc8888' }}>
                                    清道夫运行在 PID 0 —— 比管理员 (PID 1) 更底层。
                                    <br />
                                    它的函数逻辑在系统初始化时被硬编码进内核，无法终止。
                                </p>
                                <div style={{
                                    marginTop: '12px',
                                    padding: '8px',
                                    background: '#0a0a0a',
                                    border: '1px solid #333',
                                    fontFamily: '"Courier New", monospace',
                                }}>
                                    <div style={{ color: '#888' }}>清道夫触发规则:</div>
                                    <div style={{ color: '#ccc' }}>1. 任何帖子包含关键词 "同一个" + "人"</div>
                                    <div style={{ color: '#ccc' }}>2. 任何参与者 IP 溯源结果显示 210.28.128.4</div>
                                    <div style={{ color: '#ccc' }}>3. NLP 分析判断帖子"打破第四面墙"的概率 {'>'} 0.7</div>
                                    <div style={{ color: '#ccc' }}>4. 参与者试图访问 local_mind.db 的表结构</div>
                                    <div style={{ color: '#ff8800' }}>5. [当前触发] 管理员控制台被访问</div>
                                </div>
                                <p style={{ color: '#ff8800', marginTop: '12px' }}>
                                    ⚡ 清道夫已被临时禁用（当前会话）。
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 实验协议面板 */}
                    {activePanel === 'experiment' && (
                        <div>
                            <h2 style={{ color: '#00ff00', fontSize: '16px', marginBottom: '12px' }}>
                                🧪 忒修斯协议 (Theseus Protocol)
                            </h2>
                            <div style={{
                                background: '#0a0a0a',
                                border: '1px solid #333',
                                padding: '16px',
                                fontSize: '12px',
                                lineHeight: 1.8,
                                color: '#ccc',
                            }}>
                                <p><strong style={{ color: '#00ff00' }}>实验全称：</strong>基于编译器自举原理的认知连续性验证实验</p>
                                <p><strong style={{ color: '#00ff00' }}>实验代号：</strong>忒修斯协议 (Theseus Protocol)</p>
                                <p><strong style={{ color: '#00ff00' }}>实验负责人：</strong>林远 (Anonymous_01 / PID 1)</p>
                                <p><strong style={{ color: '#00ff00' }}>实验对象：</strong>u_0001（唯一用户——林远的数字化意识副本）</p>
                                <p><strong style={{ color: '#00ff00' }}>实验状态：</strong>进行中 | 第 25 年 | Phase 4</p>

                                <div style={{ marginTop: '12px', padding: '10px', background: '#111', border: '1px solid #333' }}>
                                    <p style={{ color: '#ffff00' }}>实验假设：</p>
                                    <p>
                                        如果一个意识被分割为多个互不知晓的并发会话，且每个会话处于不同的记忆退化阶段——
                                        它们是否能独立地重新推导出关于"自我"的相同结论？
                                        换言之：忒修斯之船的逻辑骨架是否独立于记忆木板而存在？
                                    </p>
                                </div>

                                <div style={{ marginTop: '12px', padding: '10px', background: '#111', border: '1px solid #333' }}>
                                    <p style={{ color: '#ffff00' }}>实验方法：</p>
                                    <p>
                                        1. 创建封闭的局域网论坛 (TexiusiShip BBS)
                                        <br />
                                        2. 在 local_mind.db 中建立 26 个匿名身份，本质上是同一 user_id 的 26 个并发会话
                                        <br />
                                        3. 每个会话被分配不同的记忆退化等级，模拟从健康到终末的认知衰退过程
                                        <br />
                                        4. 通过"清道夫"守护进程删除可能让参与者认知到彼此为同一人的帖子
                                        <br />
                                        5. 观察：在信息被持续删除的情况下，参与者是否能通过逻辑重建发现真相
                                    </p>
                                </div>

                                <p style={{ color: '#ff8800', marginTop: '12px' }}>
                                    ⚠ 实验参数：
                                    <br />
                                    u_0001 的第 27 个并发会话。
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 完整真相 */}
                    {activePanel === 'truth' && showTruth && (
                        <div>
                            <h2 style={{ color: '#ff4444', fontSize: '16px', marginBottom: '12px' }}>
                                📜 实验记录
                            </h2>
                            <div style={{
                                background: '#0a0a0a',
                                border: '1px solid #333',
                                padding: '16px',
                                fontSize: '12px',
                                lineHeight: 1.8,
                                fontFamily: '"Courier New", "SimSun", monospace',
                            }}>
                                <pre style={{
                                    color: '#00ff00',
                                    whiteSpace: 'pre-wrap',
                                    fontSize: '12px',
                                    fontFamily: '"Courier New", "SimSun", monospace',
                                    lineHeight: 1.8,
                                }}>
                                    {typedText}
                                    <span className="typewriter" style={{ color: '#00ff00' }}> </span>
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 底部状态栏 */}
            <div style={{
                background: '#0a0a0a',
                color: '#666',
                padding: '4px 12px',
                fontSize: '10px',
                borderTop: '1px solid #333',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: '"Courier New", monospace',
            }}>
                <span style={{ color: '#ff4444' }}>⚠ PARADOX MODE ACTIVE — sweeper: DISABLED — self-reference: DETECTED</span>
                <span>PID: 27 | user_id: u_0001 | local_mind.db</span>
            </div>
        </div>
    );
};

export default AdminConsole;
