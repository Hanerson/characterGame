// src/components/TexiusiBBS.jsx
// 忒修斯之船匿名论坛 — 2010年代复古BBS风格
// 环境叙事核心：所有参与者是同一人的26个人格碎片，但无人知晓

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialPosts } from '../../data/forumData.js';

export const TexiusiBBS = () => {
    const [posts] = useState(initialPosts);
    const [visitorCount] = useState(411);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageView, setPageView] = useState('list');
    const [backStack, setBackStack] = useState([]);

    // 模拟后端请求失败 — 纯前端模拟服务器响应
    const simulateServerError = async (actionName, customMessage) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
        setIsLoading(false);

        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:9999;display:flex;justify-content:center;align-items:center;font-family:Tahoma,sans-serif;';

        const dialog = document.createElement('div');
        dialog.style.cssText = 'background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #808080;border-bottom:2px solid #808080;box-shadow:2px 2px 0 #000;width:430px;max-width:90%;display:flex;flex-direction:column;';

        const titleBar = document.createElement('div');
        titleBar.style.cssText = 'background:linear-gradient(90deg,#000080,#1084d0);padding:3px 6px;color:#fff;font-weight:bold;font-size:12px;display:flex;justify-content:space-between;align-items:center;';
        titleBar.innerHTML = `<span>⚠ System Message</span><span style="cursor:pointer;font-family:monospace;">✕</span>`;

        const content = document.createElement('div');
        content.style.cssText = 'padding:16px;display:flex;gap:12px;align-items:flex-start;';

        const icon = document.createElement('div');
        icon.style.cssText = 'font-size:32px;flex-shrink:0;';
        icon.textContent = customMessage ? '⚠️' : '❌';

        const msg = document.createElement('pre');
        msg.textContent = customMessage || `操作失败: ${actionName}\n\n服务器错误 (HTTP 500)\nInternal Server Error\n\n错误详情：\n- 数据库写入被拒绝 (Append-Only 模式)\n- 当前访问的是只读存档快照\n- 所有交互功能已被禁用\n\n时间戳: ${new Date().toISOString().replace('T', ' ').slice(0, 19)}\n会话ID: guest_anonymous@210.28.128.4\n\n提示: local_mind.db 自 2001-11-01 起运行在只追加模式。写入操作需要 PID 1 的授权——但 PID 1 已经 25 年没有响应任何请求了。`;
        msg.style.cssText = 'margin:0;font-family:Tahoma,sans-serif;font-size:12px;white-space:pre-wrap;color:#000;line-height:1.6;';

        content.appendChild(icon);
        content.appendChild(msg);

        const btnArea = document.createElement('div');
        btnArea.style.cssText = 'padding:10px;display:flex;justify-content:center;';
        const btn = document.createElement('button');
        btn.textContent = '确定';
        btn.style.cssText = 'min-width:75px;padding:4px 10px;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #808080;border-bottom:2px solid #808080;box-shadow:1px 1px 0 #000;cursor:pointer;font-family:Tahoma,sans-serif;font-size:12px;';
        btn.onclick = () => document.body.removeChild(overlay);
        btnArea.appendChild(btn);

        const closeBtn = titleBar.lastElementChild;
        closeBtn.onclick = () => document.body.removeChild(overlay);

        dialog.appendChild(titleBar);
        dialog.appendChild(content);
        dialog.appendChild(btnArea);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    };

    const handlePostClick = (post) => {
        setBackStack(prev => [...prev, selectedPost].filter(Boolean));
        setSelectedPost(post);
        setPageView('detail');
    };

    const handleBackToList = () => {
        const prev = backStack[backStack.length - 1];
        setBackStack(prev => prev.slice(0, -1));
        if (prev) {
            setSelectedPost(prev);
        } else {
            setSelectedPost(null);
            setPageView('list');
        }
    };

    const handleNewPost = () => simulateServerError('发布新帖', '写入操作被拒绝。\n\nlocal_mind.db 处于只读归档模式。\n所有写入操作需要 PID 1 的授权。\n\n如果你认为这是一个错误，请联系系统管理员。\n——但管理员 (Anonymous_01 / PID 1) 在 2001 年 12 月 20 日后就没有回复过任何消息。');

    const filterByEpoch = (epoch) => {
        return posts.filter(p => p.epoch === epoch);
    };

    // 帖子列表视图
    const renderPostList = () => (
        <div className="max-w-6xl mx-auto p-[2px] bg-[#c0c0c0] raised select-none" style={{ boxShadow: '2px 2px 0 #000' }}>
            {/* 系统标题栏 */}
            <div className="win-titlebar">
                <div className="title-text">
                    <span>🌐</span>
                    <span>TexiusiShip.com — 历史档案馆 [只读备份快照]</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span style={{
                        background: '#cc0000',
                        color: '#fff',
                        fontSize: '10px',
                        padding: '1px 6px',
                        border: '1px solid #fff',
                    }} className="blink">
                        READ_ONLY
                    </span>
                </div>
            </div>

            {/* 面包屑导航 */}
            <div className="breadcrumbs" style={{ background: '#f1efe9', padding: '4px 8px' }}>
                <Link to="/">🖥️ 桌面</Link><span className="sep">›</span>
                <strong>TexiusiShip BBS</strong>
                <span style={{ color: '#808080', marginLeft: '12px', fontSize: '10px' }}>
                    IP: 210.28.128.4 | 本地环回
                </span>
            </div>

            {/* 论坛导语 — 环境叙事入口 */}
            <div style={{
                background: '#e4e0d8',
                borderBottom: '1px solid #808080',
                padding: '10px 12px',
                fontSize: '12px',
                lineHeight: 1.8,
                color: '#111',
            }}>
                <strong>欢迎来到「忒修斯之船」匿名讨论区。</strong><br />
                本站致力于探讨人格连续性、记忆本质及存在主义危机。所有发言均以匿名形式呈现。<br />
                我们不记录你的名字，只记录你的思想。若所有木板皆已被替换，愿此处的文字仍是你的锚点。<br />
                <span style={{ color: '#666', fontSize: '10px', marginTop: '4px', display: 'block' }}>
                    注意：当前访问的是2026年存档快照。数据库运行在 Append-Only 模式。所有写入操作已禁用。
                    <br />
                    在线人数: 1 | 用户ID: u_0001 | 活跃别名: 26 | 数据库: local_mind.db (47.3 MB)
                </span>
            </div>

            {/* 工具栏 */}
            <div className="toolbar" style={{ background: '#f1efe9' }}>
                <button onClick={handleNewPost} disabled={isLoading}>
                    📝 发布新帖
                </button>
                <button onClick={() => simulateServerError('搜索', '搜索功能需要全文索引支持。\n\nlocal_mind.db 的全文索引在 2011 年被清道夫 (sweeper_daemon) 意外清空。\n搜索功能自此不可用。\n\n——或者说，有人不希望你能搜索到某些内容。')}>
                    🔍 搜索
                </button>
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#808080' }}>
                    共 {posts.length} 篇帖子 | 时间跨度: 2001-2026
                </span>
            </div>

            {/* 时代筛选标签 */}
            <div style={{ padding: '6px 10px', background: '#f8f8f0', borderBottom: '1px solid #ccc', display: 'flex', gap: '8px', fontSize: '10px' }}>
                <span style={{ color: '#666' }}>筛选:</span>
                {[
                    { key: 'all', label: '全部', count: posts.length },
                    { key: 'early', label: '早期 (2001-2003)', count: filterByEpoch('early').length },
                    { key: 'mid', label: '中期 (2006-2014)', count: filterByEpoch('mid').length },
                    { key: 'late', label: '后期 (2015-2021)', count: filterByEpoch('late').length },
                    { key: 'glitch', label: '终末 (2023-2026)', count: filterByEpoch('glitch').length },
                ].map(f => (
                    <a
                        key={f.key}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            const target = document.getElementById(`epoch-${f.key}`);
                            if (target) target.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                            color: '#003399',
                            fontSize: '10px',
                            textDecoration: 'underline',
                        }}
                    >
                        {f.label} ({f.count})
                    </a>
                ))}
            </div>

            {/* 帖子列表 */}
            <div className="sunken" style={{ margin: '1px', overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '12px',
                }}>
                    <thead>
                        <tr style={{ background: 'linear-gradient(180deg, #f0f0f0, #d0d0d0)' }}>
                            <th style={{ padding: '6px 8px', textAlign: 'left', border: '1px solid #808080', fontWeight: 'bold' }}>
                                📋 主题 / 论题讨论
                            </th>
                            <th style={{ padding: '6px 8px', textAlign: 'left', border: '1px solid #808080', fontWeight: 'bold', width: '120px' }}>
                                发布者
                            </th>
                            <th style={{ padding: '6px 8px', textAlign: 'center', border: '1px solid #808080', fontWeight: 'bold', width: '50px' }}>
                                回复
                            </th>
                            <th style={{ padding: '6px 8px', textAlign: 'left', border: '1px solid #808080', fontWeight: 'bold', width: '150px' }}>
                                最后更新
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, idx) => {
                            const epochColors = {
                                early: '#008000',
                                mid: '#cc8800',
                                late: '#cc4400',
                                glitch: '#cc0000',
                            };
                            return (
                                <tr
                                    key={post.id}
                                    id={`epoch-${post.epoch}`}
                                    style={{
                                        background: idx % 2 === 0 ? '#ffffff' : '#f8f8f8',
                                        borderBottom: '1px dotted #c0c0c0',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f0f0ff'}
                                    onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? '#ffffff' : '#f8f8f8'}
                                >
                                    <td style={{ padding: '6px 8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span
                                                onClick={() => handlePostClick(post)}
                                                style={{
                                                    color: '#0000cc',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                }}
                                                onMouseEnter={e => e.target.style.color = '#800080'}
                                                onMouseLeave={e => e.target.style.color = '#0000cc'}
                                            >
                                                {post.title}
                                            </span>
                                            <span style={{
                                                fontSize: '9px',
                                                color: epochColors[post.epoch],
                                                border: `1px solid ${epochColors[post.epoch]}`,
                                                padding: '0 4px',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {post.epoch === 'glitch' ? '⚠ 终末' :
                                                 post.epoch === 'late' ? '后期' :
                                                 post.epoch === 'mid' ? '中期' : '早期'}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '6px 8px', color: '#666', fontStyle: 'italic', fontSize: '11px' }}>
                                        {post.author}
                                    </td>
                                    <td style={{ padding: '6px 8px', textAlign: 'center', color: '#666', fontSize: '11px' }}>
                                        {post.replies}
                                    </td>
                                    <td style={{ padding: '6px 8px', color: '#666', fontSize: '10px', fontFamily: 'Courier New, monospace' }}>
                                        {post.date}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* 底部状态栏 */}
            <div className="statusbar">
                <div>
                    <span>当前在线人数：<strong style={{ color: '#003399' }}>1</strong> 人</span>
                    <span style={{ marginLeft: '12px', color: '#808080', fontSize: '10px' }}>
                        (user_id: u_0001, 活跃别名: 26)
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '10px', color: '#666' }}>访客计数器:</span>
                    <span className="visitor-counter">
                        {String(visitorCount).padStart(6, '0')}
                    </span>
                </div>
            </div>

            {/* 隐藏的后门导航 */}
            <div style={{ padding: '6px 10px', overflow: 'hidden', fontSize: '10px' }}>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.showSystemDialog?.('info', '系统文件',
                            '_sys_error.log (12.4 KB)\n\n最后修改: 2026-07-06\n\n文件内容预览:\n'
                            + systemLogs.map(l => `[${l.timestamp}] ${l.level}: ${l.message.split('\n')[0]}`).join('\n')
                            + '\n\n...\n\n此文件记录了系统自启动以来的所有关键事件。\n更多详情请访问系统日志页面。');
                    }}
                    style={{ color: '#808080', textDecoration: 'none', fontFamily: 'Courier New, monospace' }}
                    onMouseEnter={e => { e.target.style.color = '#cc0000'; e.target.style.textDecoration = 'underline'; }}
                    onMouseLeave={e => { e.target.style.color = '#808080'; e.target.style.textDecoration = 'none'; }}
                >
                    📄 _sys_error.log (12.4 KB)
                </a>
                <Link
                    to="/system/logs"
                    style={{
                        float: 'right',
                        color: '#808080',
                        fontSize: '10px',
                        fontFamily: 'Courier New, monospace',
                        textDecoration: 'none',
                    }}
                    onMouseEnter={e => { e.target.style.color = '#cc0000'; e.target.style.textDecoration = 'underline'; }}
                    onMouseLeave={e => { e.target.style.color = '#808080'; e.target.style.textDecoration = 'none'; }}
                >
                    🔧 系统诊断 →
                </Link>
            </div>
        </div>
    );

    // 帖子详情视图
    const renderPostDetail = () => {
        if (!selectedPost) return null;
        return (
            <div className="max-w-6xl mx-auto p-[2px] bg-[#c0c0c0] raised select-none" style={{ boxShadow: '2px 2px 0 #000' }}>
                {/* 标题栏 */}
                <div className="win-titlebar">
                    <div className="title-text">
                        <span>📄</span>
                        <span>帖子详情 [ID: {selectedPost.id}] — 只读模式</span>
                    </div>
                    <span style={{ background: '#cc0000', color: '#fff', fontSize: '10px', padding: '1px 6px', border: '1px solid #fff' }}>
                        READ_ONLY
                    </span>
                </div>

                {/* 面包屑 */}
                <div className="breadcrumbs" style={{ background: '#f1efe9', padding: '4px 8px' }}>
                    <Link to="/">🖥️ 桌面</Link><span className="sep">›</span>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleBackToList(); }} style={{ color: '#0000cc' }}>
                        TexiusiShip BBS
                    </a>
                    <span className="sep">›</span>
                    <strong>{selectedPost.title.slice(0, 30)}{selectedPost.title.length > 30 ? '...' : ''}</strong>
                </div>

                {/* 工具栏 */}
                <div className="toolbar" style={{ background: '#f1efe9' }}>
                    <button onClick={handleBackToList}>← 返回列表</button>
                    <button onClick={() => simulateServerError('打印', '打印功能需要物理打印机。沙盒环境未连接外部设备。')}>
                        🖨️ 打印
                    </button>
                    <button onClick={() => simulateServerError('收藏', '收藏功能需要写入权限。local_mind.db 处于只读模式。')}>
                        ⭐ 收藏
                    </button>
                </div>

                {/* 帖子内容 */}
                <div style={{ padding: '12px', background: '#ffffff' }}>
                    {/* 帖子头部 */}
                    <div style={{
                        borderBottom: '2px solid #808080',
                        paddingBottom: '10px',
                        marginBottom: '12px',
                    }}>
                        <h1 style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#111',
                            margin: '0 0 8px 0',
                        }}>
                            {selectedPost.title}
                        </h1>
                        <div style={{
                            display: 'flex',
                            gap: '16px',
                            fontSize: '11px',
                            color: '#666',
                            fontFamily: 'Courier New, monospace',
                            flexWrap: 'wrap',
                        }}>
                            <span>作者: <strong style={{ color: '#333' }}>{selectedPost.author}</strong></span>
                            <span>发布时间: {selectedPost.date}</span>
                            <span>IP: <span style={{
                                color: '#cc0000',
                                fontStyle: 'italic',
                            }}>{selectedPost.ip}</span></span>
                            <span>回复数: {selectedPost.replies}</span>
                            <span>时代: <span style={{
                                color: selectedPost.epoch === 'glitch' ? '#cc0000' :
                                       selectedPost.epoch === 'late' ? '#cc4400' :
                                       selectedPost.epoch === 'mid' ? '#cc8800' : '#008000',
                            }}>
                                {selectedPost.epoch === 'glitch' ? '终末阶段' :
                                 selectedPost.epoch === 'late' ? '后期' :
                                 selectedPost.epoch === 'mid' ? '中期' : '早期'}
                            </span></span>
                        </div>
                    </div>

                    {/* 帖子正文 */}
                    <div style={{
                        fontSize: '13px',
                        lineHeight: 1.9,
                        color: '#111',
                        whiteSpace: 'pre-wrap',
                        padding: '12px',
                        background: '#f9f9f9',
                        border: '1px solid #d0d0d0',
                        marginBottom: '12px',
                        minHeight: '100px',
                    }}>
                        {selectedPost.content}
                    </div>

                    {/* 操作按钮 */}
                    <div style={{
                        display: 'flex',
                        gap: '6px',
                        marginBottom: '16px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid #d0d0d0',
                    }}>
                        <button onClick={() => simulateServerError('点赞', '点赞数据写入失败。\n\nlocal_mind.db 处于只读模式。\n即使能写入——你真的是在对"别人"的帖子点赞吗？')}
                            disabled={isLoading}>👍 点赞</button>
                        <button onClick={() => simulateServerError('评论', '评论提交失败。\n\nHTTP 500 — 数据库写入被拒绝。\n\n你可以尝试继续发言，但系统不会记录。\n就像这个论坛里那些被清道夫删除的帖子一样——\n你说了，但没人（包括未来的你）会记得。')}
                            disabled={isLoading}>💬 评论</button>
                        <button onClick={() => simulateServerError('分享', '分享链接生成失败。\n\n该论坛没有外部网络连接。所有用户都在 210.28.128.4。\n你不能把链接发给"别人"——因为根本没有别人。')}
                            disabled={isLoading}>🔗 分享</button>
                        <button onClick={() => simulateServerError('举报', '举报功能不可用。\n\n没有版主。没有管理员。\n唯一的 "管理员" (Anonymous_01) 在 PID 1 中沉睡。\n没有人来处理举报——因为没有人是"别人"。')}
                            disabled={isLoading} style={{ marginLeft: 'auto' }}>🚩 举报</button>
                    </div>

                    {/* 评论区 */}
                    <div>
                        <h2 style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#003399',
                            marginBottom: '10px',
                            borderBottom: '1px dashed #c0c0c0',
                            paddingBottom: '6px',
                        }}>
                            💬 评论 ({selectedPost.comments.length})
                        </h2>

                        {selectedPost.comments.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                color: '#808080',
                                padding: '32px',
                                fontSize: '12px',
                            }}>
                                暂无评论。
                                <br />
                                <span style={{ fontSize: '10px', color: '#c0c0c0' }}>
                                    （或者评论已被清道夫删除。）
                                </span>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {selectedPost.comments.map((comment) => (
                                    <div key={comment.id} className="forum-post">
                                        <div className="post-header">
                                            <span>
                                                <strong style={{ color: comment.author === 'SYSTEM_AUTO' ? '#cc0000' : '#333' }}>
                                                    {comment.author}
                                                </strong>
                                                {comment.author === 'SYSTEM_AUTO' && (
                                                    <span style={{
                                                        fontSize: '9px',
                                                        background: '#cc0000',
                                                        color: '#fff',
                                                        padding: '1px 4px',
                                                        marginLeft: '6px',
                                                    }}>
                                                        SYSTEM
                                                    </span>
                                                )}
                                            </span>
                                            <span style={{ color: '#666' }}>{comment.date}</span>
                                        </div>
                                        <div className="post-body">
                                            {comment.content}
                                        </div>
                                        <div className="post-footer">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    simulateServerError('回复', '回复功能不可用。\n\n即使能回复——你确定你要回复的那个人还在吗？\n你确定那个"人"不是你自己的另一个别名吗？');
                                                }}
                                                style={{ fontSize: '11px', color: '#0000cc' }}
                                            >
                                                ↩ 回复
                                            </a>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    simulateServerError('引用', '引用功能不可用。');
                                                }}
                                                style={{ fontSize: '11px', color: '#0000cc' }}
                                            >
                                                📋 引用
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 快速回复框（禁用） */}
                    <div style={{
                        marginTop: '16px',
                        padding: '10px',
                        background: '#f1efe9',
                        border: '1px solid #808080',
                    }}>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
                            📝 快速回复
                        </div>
                        <textarea
                            readOnly
                            placeholder="输入您的评论...（功能已禁用——数据库处于只读模式）"
                            style={{
                                width: '100%',
                                height: '80px',
                                fontSize: '12px',
                                padding: '6px',
                                fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                                background: '#f5f5f5',
                                color: '#808080',
                            }}
                        />
                        <div style={{ marginTop: '6px', fontSize: '10px', color: '#808080' }}>
                            ⚠ 所有写入操作已被禁用。你只能阅读——就像这个论坛里的所有"其他人"一样。
                        </div>
                    </div>
                </div>

                {/* 底部状态栏 */}
                <div className="statusbar" style={{ marginTop: '3px' }}>
                    <div style={{ fontSize: '10px', color: '#666' }}>
                        <span>浏览模式: <strong style={{ color: '#003399' }}>只读存档</strong></span>
                        <span style={{ marginLeft: '10px' }}>帖子ID: {selectedPost.id}</span>
                        <span style={{ marginLeft: '10px' }}>IP: {selectedPost.ip}</span>
                    </div>
                    <div className="visitor-counter" style={{ fontSize: '10px' }}>
                        {String(visitorCount).padStart(6, '0')}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{
            backgroundColor: '#d8e4f8',
            minHeight: '100vh',
            padding: '10px',
            fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
        }}>
            {pageView === 'list' ? renderPostList() : renderPostDetail()}

            {/* 页面底部版权 */}
            <div style={{
                textAlign: 'center',
                marginTop: '20px',
                padding: '12px',
                fontSize: '10px',
                color: '#808080',
            }}>
                TexiusiShip BBS v1.0 | 运行于 sandbox 内核 | local_mind.db (47.3 MB)
                <br />
                版权所有 © 2001-2026 | 未连接到互联网 — 本地环回 (210.28.128.4)
                <br />
                <Link to="/" style={{ fontSize: '10px', color: '#808080' }}>
                    ← 返回桌面
                </Link>
                <span style={{ margin: '0 8px' }}>|</span>
                <Link to="/system/logs" style={{ fontSize: '10px', color: '#808080' }}>
                    系统日志
                </Link>
                <span style={{ margin: '0 8px' }}>|</span>
                <Link to="/system/console" style={{ fontSize: '10px', color: '#808080' }}>
                    管理控制台
                </Link>
            </div>
        </div>
    );
};

// 在模块作用域导入 storyData 中的系统日志（用于弹窗展示）
import { systemLogs } from '../../data/storyData.js';
