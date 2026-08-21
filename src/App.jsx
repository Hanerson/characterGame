// src/App.jsx

import { Routes, Route, HashRouter, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PortalHome from './components/portal/PortalHome';
import Home from './components/official/Home';
import CourseResources from './components/official/CourseResources';
import FacultyPage from './components/official/FacultyPage';
import { TexiusiBBS } from './components/Texiusi/TexiusiBBS';
import SystemLogs from './components/system/SystemLogs';
import AdminConsole from './components/system/AdminConsole';
import ArchiveHub from './components/archive/ArchiveHub';
import DocumentViewer from './components/shared/DocumentViewer';
import BrowserShell from './components/shared/BrowserShell';
import SystemDialogContainer from './components/shared/SystemDialog';
import { GameProvider } from './state/GameContext.jsx';

const App = () => {
    return (
        <GameProvider>
            <HashRouter>
                <AppShell />
            </HashRouter>
        </GameProvider>
    );
};

// ============================================================
// 外壳：浏览器框架 + 路由
// ============================================================
const AppShell = () => {
    const location = useLocation();

    // 路由切换时回到顶部
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <BrowserShell>
            <Routes>
                {/* 门户首页 — 校园网入口 */}
                <Route path="/" element={<PortalHome />} />

                {/* 编译原理课程 */}
                <Route path="/course" element={<Home />} />
                <Route path="/course/resources" element={<CourseResources />} />
                <Route path="/course/faculty" element={<FacultyPage />} />

                {/* 忒修斯之船匿名论坛（内网站点） */}
                <Route path="/dep" element={<TexiusiBBS />} />

                {/* 档案检索 */}
                <Route path="/archives" element={<ArchiveHub />} />
                <Route path="/archives/:docId" element={<DocumentViewer />} />

                {/* 诊断系统 */}
                <Route path="/system/logs" element={<SystemLogs />} />
                <Route path="/system/console" element={<AdminConsole />} />

                {/* 404 — 未匹配路由 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* 全局系统对话框 */}
            <SystemDialogContainer />
        </BrowserShell>
    );
};

// 404 页面
const NotFoundPage = () => {
    return (
        <div style={{
            backgroundColor: '#f0f0f0',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
            padding: '20px',
        }}>
            <div style={{
                background: '#ffffff',
                border: '1px solid #c0c0c0',
                maxWidth: '520px',
                width: '100%',
                padding: '32px 36px',
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}>
                <div style={{
                    fontSize: '52px',
                    fontWeight: 'bold',
                    color: '#c0c0c0',
                    letterSpacing: '2px',
                }}>
                    404
                </div>
                <div style={{
                    fontSize: '13px',
                    color: '#333',
                    margin: '12px 0 20px',
                    lineHeight: 1.8,
                }}>
                    <p>您访问的页面不存在或已被移除。</p>
                    <p style={{ color: '#999', fontSize: '11px' }}>
                        可能原因：
                        <br />• 链接已失效
                        <br />• 页面正在维护中
                        <br />• 该页面从未存在于本服务器
                    </p>
                    <p style={{
                        color: '#888',
                        fontSize: '10px',
                        fontStyle: 'italic',
                        marginTop: '16px',
                        borderTop: '1px dashed #ddd',
                        paddingTop: '12px',
                    }}>
                        "本站的一些页面只有索引记录。"
                        <br />——网络中心备注，2001年
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <a href="#/" style={{
                        padding: '5px 18px',
                        background: '#c0c0c0',
                        borderTop: '2px solid #fff',
                        borderLeft: '2px solid #fff',
                        borderRight: '2px solid #808080',
                        borderBottom: '2px solid #808080',
                        color: '#000',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                    }}>
                        🏠 返回首页
                    </a>
                    <a href="#/course" style={{
                        padding: '5px 18px',
                        background: '#c0c0c0',
                        borderTop: '2px solid #fff',
                        borderLeft: '2px solid #fff',
                        borderRight: '2px solid #808080',
                        borderBottom: '2px solid #808080',
                        color: '#000',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                    }}>
                        📖 课程主页
                    </a>
                </div>
            </div>
        </div>
    );
};

export default App;
