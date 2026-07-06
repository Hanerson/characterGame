// src/App.jsx

import { Routes, Route, HashRouter } from 'react-router-dom';
import Desktop from './components/desktop/Desktop';
import Home from './components/official/Home';
import CourseResources from './components/official/CourseResources';
import FacultyPage from './components/official/FacultyPage';
import { TexiusiBBS } from './components/Texiusi/TexiusiBBS';
import SystemLogs from './components/system/SystemLogs';
import AdminConsole from './components/system/AdminConsole';

const App = () => {
    return (
        <HashRouter>
            <Routes>
                {/* 桌面主入口 — Windows XP 风格 */}
                <Route path="/" element={<Desktop />} />

                {/* 编译原理课程 */}
                <Route path="/course" element={<Home />} />
                <Route path="/course/resources" element={<CourseResources />} />
                <Route path="/course/faculty" element={<FacultyPage />} />

                {/* 忒修斯之船匿名论坛（隐藏入口） */}
                <Route path="/dep" element={<TexiusiBBS />} />

                {/* 系统页面 */}
                <Route path="/system/logs" element={<SystemLogs />} />
                <Route path="/system/console" element={<AdminConsole />} />

                {/* 404 — 未匹配路由 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </HashRouter>
    );
};

// 404 页面
const NotFoundPage = () => {
    return (
        <div style={{
            backgroundColor: '#c0c0c0',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Courier New", "SimSun", monospace',
            padding: '20px',
        }}>
            <div className="win-window" style={{ width: '480px', maxWidth: '95%' }}>
                <div className="win-titlebar">
                    <span className="title-text">⚠ 页面未找到</span>
                    <span>✕</span>
                </div>
                <div style={{ padding: '24px', textAlign: 'center', background: '#ffffff' }}>
                    <div style={{ fontSize: '56px', marginBottom: '12px' }}>🔍</div>
                    <h1 style={{ fontSize: '20px', color: '#cc0000', marginBottom: '12px' }}>
                        HTTP 404 — Page Not Found
                    </h1>
                    <div style={{
                        fontSize: '12px',
                        lineHeight: 1.8,
                        color: '#333',
                        marginBottom: '16px',
                    }}>
                        <p>请求的页面不存在于当前沙盒中。</p>
                        <p style={{ color: '#808080', fontSize: '11px' }}>
                            可能原因：
                            <br />• 页面已被清道夫 (sweeper_daemon) 自动清理
                            <br />• 该 URL 映射到 local_mind.db 中一个已损坏的索引条目
                            <br />• 页面从未真正存在——它只是一个数据库占位符
                        </p>
                        <p style={{
                            color: '#666',
                            fontSize: '10px',
                            fontStyle: 'italic',
                            marginTop: '12px',
                            borderTop: '1px dashed #ccc',
                            paddingTop: '12px',
                        }}>
                            "这个网站中的许多页面只存在于索引中。"
                            <br />——管理员备注，2001年
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <a href="#/" style={{
                            padding: '6px 16px',
                            background: '#c0c0c0',
                            borderTop: '2px solid #fff',
                            borderLeft: '2px solid #fff',
                            borderRight: '2px solid #808080',
                            borderBottom: '2px solid #808080',
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '12px',
                            fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                            boxShadow: '1px 1px 0 #000',
                        }}>
                            🖥️ 返回桌面
                        </a>
                        <a href="#/course" style={{
                            padding: '6px 16px',
                            background: '#c0c0c0',
                            borderTop: '2px solid #fff',
                            borderLeft: '2px solid #fff',
                            borderRight: '2px solid #808080',
                            borderBottom: '2px solid #808080',
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '12px',
                            fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                            boxShadow: '1px 1px 0 #000',
                        }}>
                            📖 课程主页
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
