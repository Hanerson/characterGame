// src/components/shared/BrowserShell.jsx
// 浏览器外壳 — ARG 世界观框架
//
// 不是"桌面"，而是一台真实存在的机器上的浏览器。
// 玩家通过这台浏览器访问校园网上的各个站点：
// 课程主页、匿名论坛、诊断控制台、档案库……
// 地址栏本身也承载叙事（比如以 IP 访问的诊断页面）。

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGame } from '../../state/GameContext.jsx';

// 路由 → 地址栏显示的"真实 URL"
const ROUTE_URLS = {
    '/': 'http://www.zhicheng.edu.cn/',
    '/course': 'http://www.zhicheng.edu.cn/course/',
    '/course/resources': 'http://www.zhicheng.edu.cn/course/resources/',
    '/course/faculty': 'http://www.zhicheng.edu.cn/course/faculty/',
    '/dep': 'http://texiusi.zhicheng.edu.cn/bbs/',
    '/archives': 'http://www.zhicheng.edu.cn/archives/',
    '/system/logs': 'http://210.28.128.4/diagnostics/',
    '/system/console': 'http://210.28.128.4/admin/',
};

const siteNameOf = (path) => {
    if (path.startsWith('/course')) return '至诚大学 · 计算机学院';
    if (path.startsWith('/dep')) return 'TexiusiShip BBS';
    if (path.startsWith('/archives')) return '至诚大学 · 档案检索';
    if (path.startsWith('/system')) return '诊断系统';
    return '至诚大学';
};

const BrowserShell = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { markVisited } = useGame();
    const [clock, setClock] = useState('');

    // 记录页面访问（幂等，内部状态，不向玩家展示）
    useEffect(() => {
        markVisited(location.pathname);
    }, [location.pathname, markVisited]);

    // 时钟
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setClock(
                `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
            );
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    // 收藏夹（浏览器书签栏）
    const bookmarks = [
        { label: '至诚大学首页', path: '/' },
        { label: '编译原理课程', path: '/course' },
        { label: '教学资源库', path: '/course/resources' },
        { label: '师资队伍', path: '/course/faculty' },
        { label: '课程论坛', path: '/dep' },
        { label: '档案检索', path: '/archives' },
        { label: '诊断系统', path: '/system/logs' },
    ];

    const currentUrl = ROUTE_URLS[location.pathname]
        || ROUTE_URLS[Object.keys(ROUTE_URLS).find(k => location.pathname.startsWith(k))]
        || 'about:blank';

    return (
        <div style={{
            minHeight: '100vh',
            background: '#d8e4f8',
            fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
            fontSize: '13px',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* ==================== 浏览器工具栏 ==================== */}
            <div style={{
                background: 'linear-gradient(180deg, #e8f0f8, #c8d8e8 100%)',
                borderBottom: '2px solid #8090b0',
                padding: '4px 8px',
                userSelect: 'none',
                flexShrink: 0,
            }}>
                {/* 第一行：导航按钮 + 地址栏 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                }}>
                    {/* 后退/前进/刷新/主页 */}
                    <button
                        onClick={() => navigate(-1)}
                        title="后退"
                        style={navBtnStyle}
                        disabled={window.history.length <= 1}
                    >‹</button>
                    <button
                        onClick={() => navigate(1)}
                        title="前进"
                        style={navBtnStyle}
                    >›</button>
                    <button
                        onClick={() => { window.location.reload(); }}
                        title="刷新"
                        style={navBtnStyle}
                    >⟳</button>
                    <button
                        onClick={() => navigate('/')}
                        title="主页"
                        style={navBtnStyle}
                    >⌂</button>

                    {/* 地址栏 */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#ffffff',
                        border: '2px inset #ffffff',
                        padding: '2px 8px',
                        fontSize: '11px',
                        color: '#333',
                        fontFamily: 'Tahoma, "SimSun", sans-serif',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}>
                        <span style={{ color: '#888', fontSize: '10px' }}>🔒</span>
                        <span
                            style={{
                                color: location.pathname.startsWith('/system')
                                    ? '#cc0000'
                                    : location.pathname.startsWith('/dep')
                                        ? '#0066cc'
                                        : '#000',
                            }}
                        >
                            {currentUrl}
                        </span>
                    </div>

                    {/* 右侧时钟 */}
                    <span style={{
                        fontSize: '11px',
                        color: '#445',
                        fontFamily: 'Tahoma, sans-serif',
                        padding: '0 4px',
                        whiteSpace: 'nowrap',
                    }}>
                        {clock}
                    </span>
                </div>

                {/* 第二行：收藏夹 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0',
                    marginTop: '2px',
                    paddingLeft: '2px',
                }}>
                    {bookmarks.map((b, i) => (
                        <button
                            key={b.path}
                            onClick={() => navigate(b.path)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: location.pathname === b.path ? '#cc0000' : '#003399',
                                fontSize: '10px',
                                padding: '2px 8px',
                                cursor: 'pointer',
                                minWidth: 'unset',
                                boxShadow: 'none',
                                borderRight: '1px solid #a0b0c8',
                                fontWeight: location.pathname === b.path ? 'bold' : 'normal',
                            }}
                        >
                            {b.label}
                        </button>
                    ))}
                    <span style={{ flex: 1 }} />
                    <span style={{
                        fontSize: '9px',
                        color: '#8899aa',
                        paddingRight: '6px',
                        fontFamily: 'Tahoma, sans-serif',
                    }}>
                        校园网 · 本地连接
                    </span>
                </div>
            </div>

            {/* ==================== 页面内容 ==================== */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                {children}
            </div>

            {/* ==================== 状态栏 ==================== */}
            <div style={{
                background: 'linear-gradient(180deg, #d8e8f8, #c0d0e0)',
                borderTop: '2px solid #8090b0',
                padding: '2px 8px',
                fontSize: '10px',
                color: '#556',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'Tahoma, "SimSun", sans-serif',
                flexShrink: 0,
            }}>
                <span>完成</span>
                <span style={{ display: 'flex', gap: '12px' }}>
                    <span>Internet</span>
                    <span>本地连接: 100 Mbps</span>
                    <span>受信任的站点</span>
                </span>
            </div>
        </div>
    );
};

const navBtnStyle = {
    width: '24px',
    height: '22px',
    minWidth: 'unset',
    padding: '0',
    fontSize: '13px',
    background: 'linear-gradient(180deg, #f8f8f8, #d8d8d8)',
    border: '1px solid #8090b0',
    cursor: 'pointer',
    boxShadow: 'none',
    lineHeight: 1,
    color: '#333',
};

export default BrowserShell;
