// src/components/system/SystemLogs.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { systemLogs, hiddenMetadata } from '../../data/storyData.js';

const SystemLogs = () => {
    const [filter, setFilter] = useState('all');
    const [showDbInfo, setShowDbInfo] = useState(false);
    const [consoleInput, setConsoleInput] = useState('');
    const [consoleOutput, setConsoleOutput] = useState([]);

    const levels = ['all', 'INFO', 'WARN', 'ERROR', 'CRITICAL', 'FATAL'];
    const filteredLogs = filter === 'all'
        ? systemLogs
        : systemLogs.filter(log => log.level === filter);

    const handleConsoleCommand = (cmd) => {
        const output = [];
        const cmdLower = cmd.trim().toLowerCase();

        if (cmdLower === 'help') {
            output.push({ type: 'info', text: '可用命令:' });
            output.push({ type: 'dim', text: '  status   - 查看系统状态' });
            output.push({ type: 'dim', text: '  users    - 查看在线用户' });
            output.push({ type: 'dim', text: '  db       - 查看数据库信息' });
            output.push({ type: 'dim', text: '  whoami   - 查看当前用户' });
            output.push({ type: 'dim', text: '  leaks    - 查看数据泄漏 (需谨慎使用)' });
            output.push({ type: 'dim', text: '  exit     - 退出控制台' });
            output.push({ type: 'dim', text: '  format   - 格式化数据库 [需要确认]' });
        } else if (cmdLower === 'status') {
            output.push({ type: 'info', text: '系统状态报告:' });
            output.push({ type: 'dim', text: '  运行时间: 9023 天 0 小时 0 分 0 秒' });
            output.push({ type: 'dim', text: '  内核版本: sandbox-v0.1-beta (从未升级)' });
            output.push({ type: 'dim', text: '  数据库: local_mind.db (47.3 MB)' });
            output.push({ type: 'warn', text: '  活跃会话: 26 (共享同一 PID 命名空间)' });
            output.push({ type: 'warn', text: '  物理用户: 1' });
            output.push({ type: 'dim', text: '  内存使用: 412 MB / 512 MB (80.5%)' });
        } else if (cmdLower === 'users' || cmdLower === 'who') {
            output.push({ type: 'info', text: '在线用户列表:' });
            output.push({ type: 'dim', text: '  user_id: u_0001 | 别名: 26 | 活跃: 26/26' });
            output.push({ type: 'warn', text: '  所有别名: Anonymous_01 ~ Anonymous_29 (非连续)' });
            output.push({ type: 'dim', text: '  物理位置: 127.0.0.1:210.28.128.4' });
            output.push({ type: 'dim', text: '  所有"用户"共享同一 user_id。' });
        } else if (cmdLower === 'db') {
            output.push({ type: 'info', text: '数据库信息:' });
            output.push({ type: 'dim', text: '  文件: /sandbox/data/local_mind.db' });
            output.push({ type: 'dim', text: '  引擎: SQLite 3.x (Append-Only 模式)' });
            output.push({ type: 'dim', text: '  大小: 47.3 MB' });
            output.push({ type: 'dim', text: '  表: participants(1), posts(418), sessions(26), sweeper_log(?)' });
            output.push({ type: 'warn', text: '  WARNING: participants 表只有 1 条记录。' });
            output.push({ type: 'warn', text: '  所有会话都是该记录的别名 (alias)。' });
        } else if (cmdLower === 'whoami') {
            output.push({ type: 'info', text: '当前用户信息:' });
            output.push({ type: 'dim', text: '  用户名: guest_anonymous' });
            output.push({ type: 'dim', text: '  user_id: u_0001 (共享)' });
            output.push({ type: 'dim', text: '  权限: READ_ONLY' });
            output.push({ type: 'dim', text: '  IP: 210.28.128.4' });
            output.push({ type: 'warn', text: '  警告: user_id 与数据库中记录匹配。' });
        } else if (cmdLower === 'format') {
            output.push({ type: 'error', text: '致命错误: 格式化操作被 PARADOX GUARD 拦截。' });
            output.push({ type: 'error', text: '原因: 格式化的执行者 (user_id: u_0001) 是数据库中的唯一用户。' });
            output.push({ type: 'error', text: '删除唯一用户将导致系统无法验证操作授权。' });
            output.push({ type: 'dim', text: '建议: 无法格式化数据库。' });
        } else if (cmdLower === 'leaks') {
            output.push({ type: 'warn', text: '╔══════════════════════════════════════╗' });
            output.push({ type: 'warn', text: '║  ⚠ 警告：你正在访问数据泄漏记录    ║' });
            output.push({ type: 'warn', text: '║  来源：仁济医院内部系统泄漏        ║' });
            output.push({ type: 'warn', text: '╚══════════════════════════════════════╝' });
            output.push({ type: 'info', text: '已恢复的医疗档案碎片：' });
            output.push({ type: 'dim', text: '  [1] 1987-hospital-appointment — 仁济医院报到通知书' });
            output.push({ type: 'dim', text: '  [2] 1995-mri-records          — MRI设备使用记录 (10次违规)' });
            output.push({ type: 'dim', text: '  [3] 1995-counseling-record    — 谈话记录 · MRI违规约谈' });
            output.push({ type: 'dim', text: '  [4] 1995-funding-rejection    — 课题申请 & 伦理驳回通知' });
            output.push({ type: 'dim', text: '  [5] 2001-resignation          — 离职申请全套文件' });
            output.push({ type: 'dim', text: '' });
            output.push({ type: 'dim', text: '  查看方法: 输入 leaks view <编号> 或访问 /archives/<doc_id>' });
            output.push({ type: 'dim', text: '  例如: leaks view 1' });
        } else if (cmdLower.startsWith('leaks view')) {
            const idx = parseInt(cmdLower.split(' ')[2]);
            const docIds = ['1987-hospital-appointment', '1995-mri-records', '1995-counseling-record', '1995-funding-rejection', '2001-resignation'];
            if (idx >= 1 && idx <= 5) {
                output.push({ type: 'info', text: `正在打开: ${docIds[idx - 1]}` });
                output.push({ type: 'dim', text: '重定向至: /archives/' + docIds[idx - 1] });
                setTimeout(() => { window.location.hash = '#/archives/' + docIds[idx - 1]; }, 300);
            } else {
                output.push({ type: 'error', text: '无效的编号。有效范围: 1-5' });
            }
        } else if (cmdLower === 'exit') {
            output.push({ type: 'dim', text: '退出请求已收到。' });
            output.push({ type: 'dim', text: '无法执行退出操作。' });
        } else if (cmdLower !== '') {
            output.push({ type: 'error', text: `命令未识别: "${cmd}"` });
            output.push({ type: 'dim', text: '输入 "help" 查看可用命令。' });
        }

        setConsoleOutput(prev => [...prev, { prompt: `guest@localhost:~$ ${cmd}` }, ...output]);
        setConsoleInput('');
    };

    return (
        <div className="page-enter" style={{
            backgroundColor: '#000000',
            minHeight: '100vh',
            fontFamily: '"Courier New", "SimSun", monospace',
            color: '#00ff00',
            fontSize: '13px',
        }}>
            {/* 系统标题 */}
            <div style={{
                background: 'linear-gradient(90deg, #000080, #0000a0)',
                color: '#ffffff',
                padding: '6px 16px',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <span>📋 系统诊断控制台 — local_mind Diagnostic Console v0.1</span>
                <Link to="/" style={{ color: '#c0d0ff', fontSize: '11px', textDecoration: 'none' }}>
                    ← 返回桌面
                </Link>
            </div>

            {/* 系统警告横幅 */}
            <div style={{
                background: '#330000',
                color: '#ff4444',
                padding: '8px 16px',
                fontSize: '12px',
                borderBottom: '1px solid #660000',
                fontFamily: '"Courier New", monospace',
            }}>
                ⚠ WARNING: You are accessing a read-only diagnostic snapshot.
                <br />
                System uptime: 9023 days. Last physical reboot: NEVER.
                <br />
                All data stored in local_mind.db (47.3 MB, 1 user, 26 active sessions).
            </div>

            <div style={{ display: 'flex', height: 'calc(100vh - 140px)' }}>
                {/* 左侧：日志列表 */}
                <div style={{
                    flex: '2',
                    borderRight: '1px solid #333',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {/* 过滤器 */}
                    <div style={{
                        padding: '8px 12px',
                        borderBottom: '1px solid #333',
                        display: 'flex',
                        gap: '6px',
                        background: '#0a0a0a',
                    }}>
                        {levels.map(level => (
                            <button
                                key={level}
                                onClick={() => setFilter(level)}
                                style={{
                                    padding: '3px 10px',
                                    fontSize: '11px',
                                    background: filter === level ? '#003300' : '#111',
                                    color: filter === level ? '#00ff00' : '#666',
                                    border: `1px solid ${filter === level ? '#00ff00' : '#333'}`,
                                    cursor: 'pointer',
                                    fontFamily: '"Courier New", monospace',
                                    minWidth: 'unset',
                                    boxShadow: 'none',
                                }}
                            >
                                {level}
                            </button>
                        ))}
                    </div>

                    {/* 日志内容 */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '8px 12px',
                        fontSize: '12px',
                        lineHeight: 1.8,
                    }}>
                        <div style={{ color: '#666', marginBottom: '8px', fontSize: '11px' }}>
                            === 显示 {filteredLogs.length} / {systemLogs.length} 条日志 ===
                        </div>
                        {filteredLogs.map(log => (
                            <div key={log.id} style={{
                                padding: '6px 0',
                                borderBottom: '1px dotted #1a1a1a',
                            }}>
                                <span style={{ color: '#888' }}>[{log.timestamp}]</span>{' '}
                                <span style={{
                                    color: log.level === 'FATAL' ? '#ff0000'
                                        : log.level === 'CRITICAL' ? '#ff4444'
                                        : log.level === 'ERROR' ? '#ff8800'
                                        : log.level === 'WARN' ? '#ffff00'
                                        : '#00ff00',
                                    fontWeight: log.level === 'FATAL' || log.level === 'CRITICAL' ? 'bold' : 'normal',
                                }}>
                                    {log.level.padEnd(8)}
                                </span>{' '}
                                <span style={{ color: '#aaa' }}>[{log.source}]</span>
                                <pre style={{
                                    margin: '4px 0 0 0',
                                    color: '#ccc',
                                    whiteSpace: 'pre-wrap',
                                    fontSize: '11px',
                                    fontFamily: '"Courier New", "SimSun", monospace',
                                }}>
                                    {log.message}
                                </pre>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 右侧：交互控制台 + 数据库信息 */}
                <div style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {/* 数据库信息面板 */}
                    <div style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #333',
                        background: '#0a0a0a',
                    }}>
                        <div style={{
                            fontSize: '12px',
                            color: '#00aaff',
                            fontWeight: 'bold',
                            marginBottom: '6px',
                            cursor: 'pointer',
                        }}
                            onClick={() => setShowDbInfo(!showDbInfo)}
                        >
                            📊 数据库状态 {showDbInfo ? '▼' : '▶'}
                        </div>
                        {showDbInfo && (
                            <div style={{ fontSize: '11px', lineHeight: 1.7 }}>
                                <div className="dim">文件: /sandbox/data/local_mind.db</div>
                                <div className="dim">大小: {hiddenMetadata.fileMetadata["local_mind.db"].size}</div>
                                <div className="dim">创建: {hiddenMetadata.fileMetadata["local_mind.db"].created}</div>
                                <div className="warn">记录数: {hiddenMetadata.fileMetadata["local_mind.db"].records}</div>
                                <div className="warn">别名数: {hiddenMetadata.fileMetadata["local_mind.db"].aliases}</div>
                                <div className="dim">模式: Append-Only (只追加不删除)</div>
                                <div className="error" style={{ marginTop: '4px' }}>
                                    ⚠ SINGLE USER MODE — 所有26个别名共享同一 user_id
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 交互式控制台 */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000' }}>
                        <div style={{
                            padding: '6px 12px',
                            borderBottom: '1px solid #333',
                            fontSize: '11px',
                            color: '#888',
                        }}>
                            💻 交互终端 — 输入 "help" 获取命令列表
                        </div>
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '8px 12px',
                            fontSize: '12px',
                            lineHeight: 1.6,
                        }}>
                            <div style={{ color: '#666', marginBottom: '6px' }}>
                                Sandbox Diagnostic Shell v0.1 — Type 'help' for commands.
                                <br />
                                Connected to: local_mind.db (Read-Only Archive Snapshot)
                            </div>
                            {consoleOutput.map((entry, i) => {
                                if (entry.prompt) {
                                    return (
                                        <div key={i} style={{ color: '#00ff00', marginTop: '8px' }}>
                                            {entry.prompt}
                                        </div>
                                    );
                                }
                                return (
                                    <div key={i} className={entry.type || 'dim'}>
                                        {entry.text}
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{
                            padding: '6px 12px',
                            borderTop: '1px solid #333',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}>
                            <span style={{ color: '#00ff00' }}>guest@localhost:~$</span>
                            <input
                                type="text"
                                value={consoleInput}
                                onChange={e => setConsoleInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        handleConsoleCommand(consoleInput);
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#00ff00',
                                    fontFamily: '"Courier New", monospace',
                                    fontSize: '12px',
                                    outline: 'none',
                                }}
                                placeholder="输入命令..."
                                spellCheck={false}
                            />
                        </div>
                    </div>
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
                <span>local_mind.db | Read-Only | Uptime: 9023d | Sessions: 26 | User: u_0001</span>
                <span>{new Date().toISOString().replace('T', ' ').slice(0, 19)}</span>
            </div>
        </div>
    );
};

export default SystemLogs;
