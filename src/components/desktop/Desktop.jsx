// src/components/desktop/Desktop.jsx
// 2010年代 Windows XP/7 风格桌面主入口
// 这是整个项目的"操作系统层"——所有内容都是桌面上的一个窗口

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Desktop = () => {
    const navigate = useNavigate();
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [clock, setClock] = useState('');
    const [activeWindows, setActiveWindows] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [showWelcome, setShowWelcome] = useState(true);
    const [visitorCount] = useState(() => Math.floor(Math.random() * 1000) + 400);

    // 时钟更新
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            setClock(`${h}:${m}:${s}`);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    // 点击桌面空白处关闭开始菜单和取消选中图标
    const handleDesktopClick = useCallback((e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('desktop-area')) {
            setStartMenuOpen(false);
            setSelectedIcon(null);
        }
    }, []);

    // 打开应用
    const openApp = useCallback((path) => {
        setStartMenuOpen(false);
        setActiveWindows(prev => {
            if (!prev.includes(path)) {
                return [...prev, path];
            }
            return prev;
        });
        navigate(path);
    }, [navigate]);

    // 桌面图标数据
    const desktopIcons = [
        { id: 'course', label: '编译原理课程', icon: '📘', path: '/course' },
        { id: 'resources', label: '教学资源库', icon: '📁', path: '/course/resources' },
        { id: 'faculty', label: '师资队伍', icon: '👥', path: '/course/faculty' },
        { id: 'ie', label: 'Internet Explorer', icon: '🌐', path: '/dep', hidden: true },
        { id: 'sysinfo', label: '系统信息', icon: '🖥️', path: '/system/logs', hidden: true },
        { id: 'recycle', label: '回收站', icon: '🗑️', path: null },
        { id: 'unknown', label: '?????.exe', icon: '⚠️', path: null },
    ];

    // 双击图标
    const handleIconDoubleClick = (icon) => {
        if (icon.path) {
            openApp(icon.path);
        } else {
            // 打开回收站或未知程序——显示错误
            window.showSystemDialog('error', '无法访问', icon.id === 'recycle'
                ? '回收站已损坏。\n\n文件系统扇区错误。\n可能原因：磁盘写保护或物理介质损坏。'
                : '无法执行 "?????.exe"。\n\n该文件可能是一个损坏的可执行文件，或根本不是为此操作系统设计的。\n\n文件头签名: 0x4C4F43414C5F4D494E44 ("LOCAL_MIND")');
        }
    };

    // 开始菜单项
    const startMenuItems = [
        { label: '📘  编译原理课程', path: '/course' },
        { label: '📁  教学资源', path: '/course/resources' },
        { label: '👥  师资队伍', path: '/course/faculty' },
        { type: 'divider' },
        { label: '🖥️  我的电脑', path: null, action: 'error' },
        { label: '📄  我的文档', path: null, action: 'error' },
        { label: '⚙️  控制面板', path: null, action: 'error' },
        { type: 'divider' },
        { label: '🔍  搜索...', path: null, action: 'error' },
        { label: '❓  帮助和支持', path: null, action: 'error' },
        { type: 'divider' },
        { label: '🔌  关机', path: null, action: 'shutdown' },
    ];

    return (
        <div
            className="desktop-area"
            onClick={handleDesktopClick}
            style={{
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(135deg, #245edc 0%, #3a8fd4 25%, #5ba5e3 50%, #8bc5ed 75%, #a3d4c4 100%)',
                backgroundSize: 'cover',
                position: 'relative',
                overflow: 'hidden',
                userSelect: 'none',
                fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
            }}
        >
            {/* === 桌面壁纸层 — 模拟XP的Bliss风格 === */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: '36px',
                background: `
                    radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.15) 0%, transparent 50%),
                    linear-gradient(180deg,
                        #1a3a7a 0%,
                        #245edc 5%,
                        #3a8fd4 30%,
                        #5ba5e3 50%,
                        #8bc5ed 70%,
                        #a3d4c4 85%,
                        #7ab89a 100%
                    )
                `,
            }} />

            {/* === 桌面图标区域 === */}
            <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 2,
            }}>
                {desktopIcons.map(icon => (
                    <div
                        key={icon.id}
                        className={`desktop-icon ${selectedIcon === icon.id ? 'selected' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIcon(icon.id);
                            setStartMenuOpen(false);
                        }}
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            handleIconDoubleClick(icon);
                        }}
                        style={{
                            opacity: icon.hidden ? 0.4 : 1,
                        }}
                        title={icon.hidden ? undefined : icon.label}
                    >
                        <div className="icon-img" style={{
                            filter: icon.hidden ? 'blur(1px)' : 'none',
                        }}>
                            {icon.icon}
                        </div>
                        <div className="icon-label" style={{
                            color: icon.hidden ? '#c0c0c0' : '#ffffff',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                            fontSize: '11px',
                        }}>
                            {icon.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* === 欢迎弹窗（首次加载） === */}
            {showWelcome && (
                <div className="modal-overlay" onClick={() => setShowWelcome(false)} style={{ zIndex: 9999 }}>
                    <div className="dialog" onClick={e => e.stopPropagation()} style={{ width: '420px' }}>
                        <div className="win-titlebar">
                            <span className="title-text">🖥️ 欢迎使用至诚大学数字化校园平台</span>
                            <span
                                className="title-btn"
                                onClick={() => setShowWelcome(false)}
                            >✕</span>
                        </div>
                        <div className="dialog-content" style={{ flexDirection: 'column', fontSize: '12px', lineHeight: 1.8 }}>
                            <p><strong>欢迎访问至诚大学计算机学院在线教学系统。</strong></p>
                            <p>本系统始建于2001年，由林远老师主持开发。经过多年的迭代升级，目前运行的是v3.0.4版本。</p>
                            <p style={{ color: '#666', fontSize: '11px' }}>
                                系统状态：正常运行<br />
                                数据库状态：<span style={{ color: '#cc8800' }}>单用户模式（1条记录，26个活跃会话）</span><br />
                                网络状态：<span style={{ color: '#cc0000' }}>本地环回（127.0.0.1 → 210.28.128.4）</span>
                            </p>
                            <p style={{ color: '#666', fontSize: '10px', borderTop: '1px dashed #ccc', paddingTop: '8px' }}>
                                <em>注意：本系统不支持用户登出。一旦登录，你的会话将永久保持。林远老师曾说："真正的实验对象从不离开实验室——因为他们不知道自己在实验里。"</em>
                            </p>
                        </div>
                        <div className="dialog-buttons">
                            <button onClick={() => setShowWelcome(false)}>确定</button>
                        </div>
                    </div>
                </div>
            )}

            {/* === 开始菜单 === */}
            {startMenuOpen && (
                <div className="start-menu" onClick={e => e.stopPropagation()}>
                    <div className="side-banner">
                        至诚大学
                    </div>
                    <div className="menu-items">
                        {startMenuItems.map((item, idx) => {
                            if (item.type === 'divider') {
                                return <div key={`div-${idx}`} className="menu-divider" />;
                            }
                            return (
                                <div
                                    key={item.label}
                                    className="menu-item"
                                    onClick={() => {
                                        if (item.path) {
                                            openApp(item.path);
                                        } else if (item.action === 'error') {
                                            setStartMenuOpen(false);
                                            window.showSystemDialog('info', '功能不可用',
                                                `"${item.label.replace(/[^一-龥a-zA-Z]/g, '').trim()}" 功能在当前沙盒环境中不可用。\n\n该系统仅提供编译原理课程及其相关子系统的访问权限。\n\n如需完整桌面体验，请退出沙盒模式。\n\n（沙盒模式无法退出。此提示仅为信息性告知。）`);
                                        } else if (item.action === 'shutdown') {
                                            setStartMenuOpen(false);
                                            window.showSystemDialog('error', '关机失败',
                                                '无法关闭计算机。\n\n原因：关键进程 "local_mind.exe" 拒绝终止。\n该进程自 2001-11-01 起持续运行，已绑定至系统内核。\n\n如需强制关机，请手动格式化数据库。\n警告：格式化操作将清除唯一用户记录。');
                                        }
                                    }}
                                >
                                    {item.label}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* === 底部任务栏 === */}
            <div className="taskbar" onClick={e => e.stopPropagation()}>
                {/* 开始按钮 */}
                <button
                    className={`start-btn ${startMenuOpen ? 'active' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setStartMenuOpen(prev => !prev);
                        setSelectedIcon(null);
                    }}
                    style={startMenuOpen ? {
                        borderTop: '2px solid #1b5e20',
                        borderLeft: '2px solid #1b5e20',
                        borderRight: '2px solid #81c784',
                        borderBottom: '2px solid #81c784',
                        boxShadow: 'none',
                    } : {}}
                >
                    <span style={{ fontSize: '14px' }}>⊞</span> 开始
                </button>

                {/* 快速启动栏分隔 */}
                <div style={{
                    width: '2px',
                    height: '24px',
                    background: '#808080',
                    borderRight: '1px solid #ffffff',
                    margin: '0 2px',
                }} />

                {/* 打开的任务窗口按钮 */}
                <div style={{
                    display: 'flex',
                    gap: '2px',
                    flex: 1,
                    overflow: 'hidden',
                }}>
                    {activeWindows.slice(-6).map(win => (
                        <button
                            key={win}
                            className={`task-item ${window.location.hash === `#${win}` ? 'active' : ''}`}
                            onClick={() => navigate(win)}
                            title={win}
                        >
                            {win === '/course' && '📘 编译原理'}
                            {win === '/course/resources' && '📁 教学资源'}
                            {win === '/course/faculty' && '👥 师资队伍'}
                            {win === '/dep' && '🌐 TexiusiShip BBS'}
                            {win === '/system/logs' && '📋 系统日志'}
                        </button>
                    ))}
                </div>

                {/* 系统托盘 */}
                <div className="tray">
                    {/* 网络图标 */}
                    <span title="网络连接：本地环回 (210.28.128.4)" style={{ fontSize: '12px' }}>
                        🖧
                    </span>
                    {/* 音量 */}
                    <span title="音量" style={{ fontSize: '12px' }}>🔊</span>
                    {/* 访客计数器 */}
                    <span className="visitor-counter" style={{ fontSize: '10px', padding: '0 4px' }}>
                        {String(visitorCount).padStart(6, '0')}
                    </span>
                    {/* 时钟 */}
                    <span className="clock">{clock}</span>
                </div>
            </div>

            {/* === 全局系统对话框容器 === */}
            <SystemDialogContainer />
        </div>
    );
};

// === 系统对话框全局管理 ===
// 将 showSystemDialog 挂载到 window 上，供所有组件使用
let dialogResolver = null;

const SystemDialogContainer = () => {
    const [dialog, setDialog] = useState(null);

    useEffect(() => {
        window.showSystemDialog = (type, title, message) => {
            return new Promise((resolve) => {
                dialogResolver = resolve;
                setDialog({ type, title, message });
            });
        };
        return () => {
            delete window.showSystemDialog;
        };
    }, []);

    if (!dialog) return null;

    const iconMap = {
        error: '❌',
        warn: '⚠️',
        info: 'ℹ️',
    };

    return (
        <div className="modal-overlay" onClick={() => { setDialog(null); if (dialogResolver) dialogResolver('dismiss'); }}>
            <div className="dialog" onClick={e => e.stopPropagation()}>
                <div className="win-titlebar">
                    <span className="title-text">
                        {dialog.type === 'error' ? '❌ 错误' : dialog.type === 'warn' ? '⚠️ 警告' : 'ℹ️ 信息'}
                    </span>
                    <span
                        className="title-btn"
                        onClick={() => { setDialog(null); if (dialogResolver) dialogResolver('close'); }}
                    >✕</span>
                </div>
                <div className="dialog-content">
                    <div style={{ fontSize: '28px' }}>{iconMap[dialog.type] || 'ℹ️'}</div>
                    <pre style={{
                        margin: 0,
                        fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                        fontSize: '12px',
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.6,
                        color: '#000',
                    }}>
                        {dialog.message}
                    </pre>
                </div>
                <div className="dialog-buttons">
                    <button
                        onClick={() => { setDialog(null); if (dialogResolver) dialogResolver('ok'); }}
                    >确定</button>
                </div>
            </div>
        </div>
    );
};

export default Desktop;
