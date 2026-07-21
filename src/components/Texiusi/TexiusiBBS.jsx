// src/components/Texiusi/TexiusiBBS.jsx
// 忒修斯之船匿名论坛 — 全屏 2010s Discuz! 风格重构
//
// 设计参考：Discuz! X2/X3 (2010-2013)
// - 蓝色顶部导航条
// - 左侧主内容区 + 右侧用户面板
// - 帖子列表表格 + 分页器
// - 帖子详情页带作者信息侧边栏

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    initialPosts,
    forumCategories,
    userProfiles,
    getPostsByCategory,
    getPostsByEpoch,
    getHotPosts,
    getRecentPosts,
} from '../../data/forumData.js';

const POSTS_PER_PAGE = 20;

// ============================================================
// 模拟服务器错误弹窗
// ============================================================
const showErrorDialog = (title, message) => {
    const overlay = document.createElement('div');
    overlay.style.cssText =
        'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.45);z-index:99999;display:flex;justify-content:center;align-items:center;font-family:Tahoma,SimSun,sans-serif;';

    const dialog = document.createElement('div');
    dialog.style.cssText =
        'background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #808080;border-bottom:2px solid #808080;box-shadow:2px 2px 0 #000;width:440px;max-width:92%;display:flex;flex-direction:column;';

    const titleBar = document.createElement('div');
    titleBar.style.cssText =
        'background:linear-gradient(90deg,#000080,#1084d0);padding:4px 8px;color:#fff;font-weight:bold;font-size:12px;display:flex;justify-content:space-between;align-items:center;';
    titleBar.innerHTML = `<span>⚠ ${title}</span><span style="cursor:pointer;font-family:monospace;font-size:14px;">✕</span>`;

    const content = document.createElement('div');
    content.style.cssText = 'padding:16px;display:flex;gap:10px;align-items:flex-start;background:#f0f0f0;';

    const icon = document.createElement('div');
    icon.style.cssText = 'font-size:32px;flex-shrink:0;';
    icon.textContent = '💾';

    const msg = document.createElement('pre');
    msg.textContent = message;
    msg.style.cssText =
        'margin:0;font-family:Tahoma,SimSun,sans-serif;font-size:12px;white-space:pre-wrap;color:#000;line-height:1.7;';

    content.appendChild(icon);
    content.appendChild(msg);

    const btnArea = document.createElement('div');
    btnArea.style.cssText = 'padding:8px 16px;display:flex;justify-content:center;background:#c0c0c0;';
    const btn = document.createElement('button');
    btn.textContent = '确定';
    btn.style.cssText =
        'min-width:75px;padding:4px 16px;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #808080;border-bottom:2px solid #808080;box-shadow:1px 1px 0 #000;cursor:pointer;font-family:Tahoma,SimSun,sans-serif;font-size:12px;';
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

// ============================================================
// 工具函数
// ============================================================
const formatDate = (dateStr) => {
    const d = dateStr.split(' ')[0];
    const parts = d.split('-');
    return `${parts[0]}年${parseInt(parts[1])}月${parseInt(parts[2])}日`;
};

const timeAgo = (dateStr) => {
    const postDate = new Date(dateStr.replace(' ', 'T'));
    const now = new Date('2026-07-21');
    const diff = now - postDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 365) return `${Math.floor(days / 365)}年前`;
    if (days > 30) return `${Math.floor(days / 30)}个月前`;
    if (days > 0) return `${days}天前`;
    return '今天';
};

// ============================================================
// 主组件
// ============================================================
export const TexiusiBBS = () => {
    const [view, setView] = useState('categories'); // 'categories' | 'list' | 'detail'
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedEpoch, setSelectedEpoch] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [backStack, setBackStack] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // 模拟时钟
    const [clock, setClock] = useState('');
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setClock(
                `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
            );
        };
        tick();
        const id = setInterval(tick, 30000);
        return () => clearInterval(id);
    }, []);

    // 构建导航栈
    const pushView = useCallback((newView, data) => {
        setBackStack(prev => [...prev, { view, category: selectedCategory, post: selectedPost }]);
        setView(newView);
        if (data?.category) setSelectedCategory(data.category);
        if (data?.post) setSelectedPost(data.post);
        setCurrentPage(1);
    }, [view, selectedCategory, selectedPost]);

    const goBack = useCallback(() => {
        const prev = backStack[backStack.length - 1];
        if (prev) {
            setBackStack(prev => prev.slice(0, -1));
            setView(prev.view);
            setSelectedCategory(prev.category);
            setSelectedPost(prev.post);
            setCurrentPage(1);
        }
    }, [backStack]);

    const canGoBack = backStack.length > 0;

    // 帖子列表（带筛选和搜索）
    const filteredPosts = useMemo(() => {
        let posts = initialPosts;

        if (selectedCategory) {
            posts = getPostsByCategory(selectedCategory);
        }

        if (selectedEpoch !== 'all') {
            posts = posts.filter(p => p.epoch === selectedEpoch);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            posts = posts.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.content.toLowerCase().includes(q) ||
                p.author.toLowerCase().includes(q)
            );
        }

        return posts.sort((a, b) => b.date.localeCompare(a.date));
    }, [selectedCategory, selectedEpoch, searchQuery]);

    // 分页
    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(start, start + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    // 统计
    const stats = useMemo(() => ({
        totalPosts: initialPosts.length,
        totalComments: initialPosts.reduce((sum, p) => sum + p.comments.length, 0),
        totalUsers: Object.keys(userProfiles).length,
        lastPost: initialPosts[initialPosts.length - 1]?.date || '---',
    }), []);

    const hotPosts = useMemo(() => getHotPosts(8), []);
    const recentPosts = useMemo(() => getRecentPosts(5), []);

    // 视图切换处理
    const enterCategory = (catId) => {
        setSelectedCategory(catId);
        setSelectedEpoch('all');
        setSearchQuery('');
        setIsSearching(false);
        pushView('list', { category: catId });
    };

    const enterPost = (post) => {
        pushView('detail', { post });
        setSelectedPost(post);
    };

    const backToList = () => goBack();

    const backToCategories = () => {
        setSelectedCategory(null);
        setSelectedEpoch('all');
        setSearchQuery('');
        setIsSearching(false);
        setView('categories');
        setBackStack([]);
    };

    // 模拟写入操作
    const handleWriteAction = (action) => {
        const messages = {
            '发帖': `写入操作被拒绝。\n\nlocal_mind.db 处于只读归档模式。\n数据库文件大小: 47.3 MB\n操作: INSERT INTO posts\n状态: FAILED — 文件系统权限不足\n\n时间戳: ${new Date().toISOString().replace('T', ' ').slice(0, 19)}\n用户: guest_anonymous@210.28.128.4`,
            '回复': `回复提交失败。\n\nHTTP 500 — Internal Server Error\n数据库写入操作被系统策略阻止。\n\n详情: 所有写入请求在到达磁盘前被 sweeper 守护进程拦截。`,
            '搜索': `搜索功能需要全文索引。\n\nlocal_mind.db 的全文索引 (FTS) 模块未安装。\n当前仅支持标题和作者的基本字符串匹配。\n\n建议: 手动浏览版块。`,
            '登录': `登录服务不可用。\n\n用户认证模块 (auth.dll) 未加载。\n数据库用户表仅包含1条记录 (user_id: u_0001)。\n密码验证已被跳过——所有会话共享同一安全上下文。`,
            '注册': `注册功能已关闭。\n\n新用户注册在 2003 年后被管理员禁用。\n自那以后，论坛未接受任何新成员。\n\n原因: 未记录。`,
            '私信': `短消息系统未初始化。\n\npm_table 在数据库中不存在。\n内部通信目前通过...其他方式实现。`,
        };
        showErrorDialog(
            action,
            messages[action] || `操作失败: ${action}\n\n服务器拒绝处理此请求。\n\nlocal_mind.db 处于只读模式。`
        );
    };

    // 渲染分页器
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];
        const maxVisible = 7;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px',
                padding: '12px 0',
                fontSize: '12px',
                fontFamily: 'Tahoma, SimSun, sans-serif',
            }}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    style={{
                        padding: '3px 10px',
                        fontSize: '11px',
                        minWidth: 'unset',
                        background: '#fff',
                        border: '1px solid #c0c0c0',
                    }}
                >
                    ‹‹ 首页
                </button>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    style={{
                        padding: '3px 8px',
                        fontSize: '11px',
                        minWidth: 'unset',
                        background: '#fff',
                        border: '1px solid #c0c0c0',
                    }}
                >
                    ‹ 上一页
                </button>

                {start > 1 && (
                    <span style={{ color: '#999', padding: '0 4px' }}>...</span>
                )}

                {pages.map(p => (
                    <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        style={{
                            padding: '3px 8px',
                            fontSize: '11px',
                            minWidth: 'unset',
                            background: p === currentPage ? '#2B7ACD' : '#fff',
                            color: p === currentPage ? '#fff' : '#333',
                            border: `1px solid ${p === currentPage ? '#1a5fa0' : '#c0c0c0'}`,
                            fontWeight: p === currentPage ? 'bold' : 'normal',
                            cursor: p === currentPage ? 'default' : 'pointer',
                        }}
                    >
                        {p}
                    </button>
                ))}

                {end < totalPages && (
                    <span style={{ color: '#999', padding: '0 4px' }}>...</span>
                )}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    style={{
                        padding: '3px 8px',
                        fontSize: '11px',
                        minWidth: 'unset',
                        background: '#fff',
                        border: '1px solid #c0c0c0',
                    }}
                >
                    下一页 ›
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    style={{
                        padding: '3px 10px',
                        fontSize: '11px',
                        minWidth: 'unset',
                        background: '#fff',
                        border: '1px solid #c0c0c0',
                    }}
                >
                    末页 ››
                </button>
                <span style={{ color: '#666', marginLeft: '8px', fontSize: '11px' }}>
                    共 {filteredPosts.length} 篇 / {totalPages} 页
                </span>
            </div>
        );
    };

    // ============================================================
    // 侧边栏组件
    // ============================================================
    const Sidebar = () => (
        <div style={{
            width: '240px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        }}>
            {/* 用户面板 */}
            <div style={{
                background: '#fff',
                border: '1px solid #c0c0c0',
                borderRadius: '3px',
            }}>
                <div style={{
                    background: 'linear-gradient(180deg, #f8f8f8, #e8e8e8)',
                    padding: '8px 10px',
                    borderBottom: '1px solid #ddd',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#333',
                }}>
                    👤 用户面板
                </div>
                <div style={{ padding: '10px', fontSize: '12px', lineHeight: 2 }}>
                    <div style={{ color: '#666' }}>
                        当前身份：<span style={{ color: '#999', fontStyle: 'italic' }}>游客 (Guest)</span>
                    </div>
                    <div style={{ color: '#666' }}>
                        IP地址：<span style={{ fontFamily: 'Courier New, monospace', color: '#cc0000' }}>210.28.128.4</span>
                    </div>
                    <div style={{ color: '#666' }}>
                        用户ID：<span style={{ fontFamily: 'Courier New, monospace' }}>u_0001</span>
                    </div>
                    <div style={{ color: '#666' }}>
                        活跃别名：<span style={{ fontWeight: 'bold', color: '#003399' }}>27</span>
                    </div>
                    <div style={{ marginTop: '6px', display: 'flex', gap: '4px' }}>
                        <button
                            onClick={() => handleWriteAction('登录')}
                            style={{
                                padding: '2px 10px',
                                fontSize: '11px',
                                minWidth: 'unset',
                                background: '#2B7ACD',
                                color: '#fff',
                                border: '1px solid #1a5fa0',
                                cursor: 'pointer',
                            }}
                        >
                            登录
                        </button>
                        <button
                            onClick={() => handleWriteAction('注册')}
                            style={{
                                padding: '2px 10px',
                                fontSize: '11px',
                                minWidth: 'unset',
                                cursor: 'pointer',
                            }}
                        >
                            注册
                        </button>
                    </div>
                </div>
            </div>

            {/* 论坛统计 */}
            <div style={{
                background: '#fff',
                border: '1px solid #c0c0c0',
                borderRadius: '3px',
            }}>
                <div style={{
                    background: 'linear-gradient(180deg, #f8f8f8, #e8e8e8)',
                    padding: '8px 10px',
                    borderBottom: '1px solid #ddd',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#333',
                }}>
                    📊 论坛统计
                </div>
                <div style={{ padding: '10px', fontSize: '12px', lineHeight: 2, color: '#666' }}>
                    <div>帖子总数：<strong style={{ color: '#333' }}>{stats.totalPosts}</strong></div>
                    <div>评论总数：<strong style={{ color: '#333' }}>{stats.totalComments}</strong></div>
                    <div>注册用户：<strong style={{ color: '#333' }}>{stats.totalUsers}</strong></div>
                    <div>最新帖子：<span style={{ fontSize: '10px', color: '#999' }}>{stats.lastPost.slice(0, 10)}</span></div>
                    <div style={{ marginTop: '4px', fontSize: '10px', color: '#999' }}>
                        数据库: local_mind.db (47.3 MB)
                    </div>
                </div>
            </div>

            {/* 热门帖子 */}
            <div style={{
                background: '#fff',
                border: '1px solid #c0c0c0',
                borderRadius: '3px',
            }}>
                <div style={{
                    background: 'linear-gradient(180deg, #f8f8f8, #e8e8e8)',
                    padding: '8px 10px',
                    borderBottom: '1px solid #ddd',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#333',
                }}>
                    🔥 热门讨论
                </div>
                <div style={{ padding: '6px 0' }}>
                    {hotPosts.slice(0, 8).map((post, idx) => (
                        <div
                            key={post.id}
                            onClick={() => enterPost(post)}
                            style={{
                                padding: '5px 10px',
                                cursor: 'pointer',
                                fontSize: '11px',
                                borderBottom: '1px dotted #eee',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <span style={{
                                color: idx < 3 ? '#cc0000' : '#999',
                                fontWeight: 'bold',
                                fontSize: '10px',
                                minWidth: '16px',
                            }}>
                                {idx + 1}
                            </span>
                            <span style={{
                                color: '#003399',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                flex: 1,
                            }}>
                                {post.title.slice(0, 20)}{post.title.length > 20 ? '...' : ''}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 在线用户 */}
            <div style={{
                background: '#fff',
                border: '1px solid #c0c0c0',
                borderRadius: '3px',
            }}>
                <div style={{
                    background: 'linear-gradient(180deg, #f8f8f8, #e8e8e8)',
                    padding: '8px 10px',
                    borderBottom: '1px solid #ddd',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#333',
                }}>
                    🟢 当前在线
                </div>
                <div style={{ padding: '10px', fontSize: '12px', lineHeight: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#4caf50',
                            display: 'inline-block',
                        }}></span>
                        <span style={{ color: '#666' }}>在线人数：<strong style={{ color: '#333' }}>1</strong></span>
                    </div>
                    <div style={{ color: '#999', fontSize: '10px', marginTop: '4px' }}>
                        所有用户共享同一会话。
                        <br />
                        未连接到外部网络。
                    </div>
                </div>
            </div>

            {/* 时间 */}
            <div style={{
                background: '#fff',
                border: '1px solid #c0c0c0',
                borderRadius: '3px',
                padding: '8px 10px',
                textAlign: 'center',
                fontSize: '11px',
                color: '#666',
                fontFamily: 'Courier New, monospace',
            }}>
                🕐 服务器时间
                <br />
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                    {clock || '--:--:--'}
                </span>
                <br />
                <span style={{ fontSize: '10px', color: '#999' }}>
                    时区: UTC+8 (北京时间)
                </span>
            </div>
        </div>
    );

    // ============================================================
    // 版块列表视图
    // ============================================================
    const CategoryListView = () => (
        <div>
            {/* 版块列表 */}
            {forumCategories.map((cat) => {
                const catPosts = initialPosts.filter(p => p.category === cat.id);
                const lastPost = catPosts.length > 0
                    ? catPosts.reduce((latest, p) => p.date > latest.date ? p : latest, catPosts[0])
                    : null;

                return (
                    <div
                        key={cat.id}
                        style={{
                            background: '#fff',
                            border: '1px solid #c0c0c0',
                            borderRadius: '3px',
                            marginBottom: '8px',
                            cursor: 'pointer',
                            transition: 'box-shadow 0.15s',
                        }}
                        onClick={() => enterCategory(cat.id)}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px 16px',
                            gap: '12px',
                        }}>
                            {/* 图标 */}
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: cat.id === 'fragments'
                                    ? '#f5f5f5'
                                    : 'linear-gradient(135deg, #e8f0ff, #d0dfff)',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                flexShrink: 0,
                                border: cat.id === 'fragments' ? '1px dashed #ccc' : '1px solid #d0d0f0',
                            }}>
                                {cat.icon}
                            </div>

                            {/* 版块信息 */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#003399',
                                    marginBottom: '4px',
                                }}>
                                    {cat.name}
                                </div>
                                <div style={{
                                    fontSize: '11px',
                                    color: '#888',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {cat.description}
                                </div>
                            </div>

                            {/* 统计 */}
                            <div style={{
                                textAlign: 'right',
                                fontSize: '11px',
                                color: '#999',
                                flexShrink: 0,
                                minWidth: '80px',
                            }}>
                                <div>主题: <strong style={{ color: '#333' }}>{catPosts.length}</strong></div>
                                {lastPost && (
                                    <div style={{
                                        fontSize: '10px',
                                        marginTop: '2px',
                                    }}>
                                        最后: {lastPost.date.slice(0, 10)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* 论坛导语 */}
            <div style={{
                background: '#fffbe6',
                border: '1px solid #ffe58f',
                borderRadius: '3px',
                padding: '12px 16px',
                marginTop: '8px',
                fontSize: '12px',
                lineHeight: 1.8,
                color: '#666',
            }}>
                <strong style={{ color: '#333' }}>📌 关于本论坛</strong><br />
                欢迎来到「忒修斯之船」匿名讨论区。这是一个以哲学、计算机科学和日常思考为主题的私密论坛。
                所有用户以匿名身份参与讨论。系统不记录真实姓名、邮箱或密码。
                <br />
                <span style={{ fontSize: '10px', color: '#999' }}>
                    注意：当前浏览的是只读存档快照。数据库运行在 Append-Only 模式。
                    <br />
                    在线人数: 1 | 用户ID: u_0001 | 活跃别名: 27 | 运行时间: 25年
                </span>
            </div>
        </div>
    );

    // ============================================================
    // 帖子列表视图
    // ============================================================
    const PostListView = () => {
        const categoryInfo = forumCategories.find(c => c.id === selectedCategory);

        return (
            <div>
                {/* 版块头部 */}
                <div style={{
                    background: '#fff',
                    border: '1px solid #c0c0c0',
                    borderRadius: '3px 3px 0 0',
                    padding: '10px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div>
                        <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#333' }}>
                            {categoryInfo?.icon} {categoryInfo?.name || '全部帖子'}
                        </span>
                        <span style={{ fontSize: '11px', color: '#999', marginLeft: '10px' }}>
                            共 {filteredPosts.length} 篇主题
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                            onClick={() => handleWriteAction('发帖')}
                            style={{
                                padding: '4px 14px',
                                fontSize: '12px',
                                minWidth: 'unset',
                                background: '#2B7ACD',
                                color: '#fff',
                                border: '1px solid #1a5fa0',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            ✏️ 发帖
                        </button>
                    </div>
                </div>

                {/* 筛选标签 */}
                <div style={{
                    background: '#f8f8f8',
                    border: '1px solid #c0c0c0',
                    borderTop: 'none',
                    padding: '8px 14px',
                    display: 'flex',
                    gap: '6px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    fontSize: '11px',
                }}>
                    <span style={{ color: '#999', fontSize: '10px' }}>时段:</span>
                    {[
                        { key: 'all', label: '全部' },
                        { key: 'early', label: '早期 (01-03)' },
                        { key: 'mid', label: '中期 (06-14)' },
                        { key: 'late', label: '后期 (15-21)' },
                        { key: 'glitch', label: '终末 (23-26)' },
                    ].map(f => (
                        <button
                            key={f.key}
                            onClick={() => {
                                setSelectedEpoch(f.key);
                                setCurrentPage(1);
                            }}
                            style={{
                                padding: '2px 10px',
                                fontSize: '10px',
                                minWidth: 'unset',
                                background: selectedEpoch === f.key ? '#2B7ACD' : '#fff',
                                color: selectedEpoch === f.key ? '#fff' : '#666',
                                border: `1px solid ${selectedEpoch === f.key ? '#1a5fa0' : '#d0d0d0'}`,
                                cursor: 'pointer',
                                boxShadow: 'none',
                            }}
                        >
                            {f.label}
                        </button>
                    ))}
                    <span style={{ flex: 1 }} />
                    <span style={{ fontSize: '10px', color: '#aaa' }}>
                        {filteredPosts.length} 篇帖
                    </span>
                </div>

                {/* 帖子表格 */}
                <div style={{
                    background: '#fff',
                    border: '1px solid #c0c0c0',
                    borderTop: 'none',
                    borderRadius: '0 0 3px 3px',
                    overflow: 'hidden',
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '12px',
                    }}>
                        <thead>
                            <tr style={{
                                background: 'linear-gradient(180deg, #f5f5f5, #e8e8e8)',
                                borderBottom: '2px solid #2B7ACD',
                            }}>
                                <th style={{
                                    padding: '8px 10px',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    width: '48%',
                                }}>
                                    📋 主题
                                </th>
                                <th style={{
                                    padding: '8px 10px',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    width: '14%',
                                }}>
                                    作者
                                </th>
                                <th style={{
                                    padding: '8px 10px',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    width: '8%',
                                }}>
                                    回复/查看
                                </th>
                                <th style={{
                                    padding: '8px 10px',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    width: '30%',
                                }}>
                                    最后发表
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPosts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{
                                        textAlign: 'center',
                                        padding: '40px',
                                        color: '#999',
                                    }}>
                                        该版块暂无主题。
                                    </td>
                                </tr>
                            ) : (
                                paginatedPosts.map((post, idx) => {
                                    const epochColors = {
                                        early: { bg: '#e8f5e9', text: '#2e7d32', label: '早期' },
                                        mid: { bg: '#fff3e0', text: '#e65100', label: '中期' },
                                        late: { bg: '#fce4ec', text: '#c62828', label: '后期' },
                                        glitch: { bg: '#f3e5f5', text: '#6a1b9a', label: '终末' },
                                    };
                                    const ec = epochColors[post.epoch] || epochColors.early;
                                    const lastComment = post.comments.length > 0
                                        ? post.comments[post.comments.length - 1]
                                        : null;

                                    return (
                                        <tr
                                            key={post.id}
                                            style={{
                                                background: idx % 2 === 0 ? '#fff' : '#fafafa',
                                                borderBottom: '1px solid #eee',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
                                            onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#fafafa'}
                                        >
                                            {/* 主题 */}
                                            <td style={{ padding: '8px 10px' }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                                    {/* 帖子图标 */}
                                                    <span style={{
                                                        fontSize: '16px',
                                                        flexShrink: 0,
                                                        marginTop: '2px',
                                                    }}>
                                                        {post.pinned ? '📌' : post.replies > 20 ? '🔥' : '📄'}
                                                    </span>
                                                    <div style={{ minWidth: 0 }}>
                                                        {/* 标题 */}
                                                        <div
                                                            onClick={() => enterPost(post)}
                                                            style={{
                                                                color: '#003399',
                                                                fontWeight: post.pinned ? 'bold' : 'normal',
                                                                cursor: 'pointer',
                                                                fontSize: '13px',
                                                                lineHeight: 1.4,
                                                                marginBottom: '4px',
                                                                wordBreak: 'break-word',
                                                            }}
                                                            onMouseEnter={e => e.target.style.color = '#cc0000'}
                                                            onMouseLeave={e => e.target.style.color = '#003399'}
                                                        >
                                                            {post.pinned && (
                                                                <span style={{
                                                                    background: '#cc0000',
                                                                    color: '#fff',
                                                                    fontSize: '9px',
                                                                    padding: '1px 5px',
                                                                    marginRight: '4px',
                                                                    borderRadius: '2px',
                                                                }}>
                                                                    置顶
                                                                </span>
                                                            )}
                                                            {post.title}
                                                        </div>
                                                        {/* 元信息 */}
                                                        <div style={{
                                                            fontSize: '10px',
                                                            color: '#999',
                                                            display: 'flex',
                                                            gap: '8px',
                                                            flexWrap: 'wrap',
                                                        }}>
                                                            <span style={{
                                                                display: 'inline-block',
                                                                padding: '0 4px',
                                                                fontSize: '9px',
                                                                borderRadius: '2px',
                                                                background: ec.bg,
                                                                color: ec.text,
                                                                border: `1px solid ${ec.text}22`,
                                                            }}>
                                                                {ec.label}
                                                            </span>
                                                            <span>{formatDate(post.date)}</span>
                                                            <span style={{ fontFamily: 'Courier New, monospace' }}>
                                                                IP: {post.ip}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* 作者 */}
                                            <td style={{
                                                padding: '8px 10px',
                                                fontSize: '11px',
                                                color: '#555',
                                            }}>
                                                <div style={{ fontWeight: 'bold' }}>
                                                    {post.author}
                                                </div>
                                                {userProfiles[post.author] && (
                                                    <div style={{
                                                        fontSize: '10px',
                                                        color: '#aaa',
                                                    }}>
                                                        {userProfiles[post.author].postCount} 帖
                                                    </div>
                                                )}
                                            </td>

                                            {/* 回复/查看 */}
                                            <td style={{
                                                padding: '8px 10px',
                                                textAlign: 'center',
                                                fontSize: '11px',
                                                color: '#666',
                                            }}>
                                                <div>{post.replies}</div>
                                                <div style={{ fontSize: '10px', color: '#aaa' }}>
                                                    {post.views || 0}
                                                </div>
                                            </td>

                                            {/* 最后发表 */}
                                            <td style={{
                                                padding: '8px 10px',
                                                fontSize: '10px',
                                                color: '#999',
                                            }}>
                                                {lastComment ? (
                                                    <>
                                                        <div style={{ color: '#666' }}>
                                                            {lastComment.author}
                                                        </div>
                                                        <div style={{ fontFamily: 'Courier New, monospace' }}>
                                                            {lastComment.date.slice(0, 16)}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div style={{ fontFamily: 'Courier New, monospace' }}>
                                                        {post.date.slice(0, 16)}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 分页器 */}
                {renderPagination()}
            </div>
        );
    };

    // ============================================================
    // 帖子详情视图
    // ============================================================
    const PostDetailView = () => {
        if (!selectedPost) return null;
        const post = selectedPost;
        const authorProfile = userProfiles[post.author];

        const epochLabels = {
            early: { text: '早期 (2001-2003)', color: '#2e7d32' },
            mid: { text: '中期 (2006-2014)', color: '#e65100' },
            late: { text: '后期 (2015-2021)', color: '#c62828' },
            glitch: { text: '终末 (2023-2026)', color: '#6a1b9a' },
        };
        const epochInfo = epochLabels[post.epoch] || epochLabels.early;

        return (
            <div>
                {/* 帖子头部 */}
                <div style={{
                    background: '#fff',
                    border: '1px solid #c0c0c0',
                    borderRadius: '3px 3px 0 0',
                    padding: '12px 16px',
                }}>
                    {/* 标题 */}
                    <h1 style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#111',
                        margin: '0 0 8px 0',
                        lineHeight: 1.4,
                    }}>
                        {post.pinned && (
                            <span style={{
                                background: '#cc0000',
                                color: '#fff',
                                fontSize: '10px',
                                padding: '2px 6px',
                                marginRight: '6px',
                                borderRadius: '2px',
                                verticalAlign: 'middle',
                            }}>
                                置顶
                            </span>
                        )}
                        {post.title}
                    </h1>

                    {/* 元信息 */}
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '11px',
                        color: '#666',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}>
                        <span>
                            作者: <strong style={{ color: '#333' }}>{post.author}</strong>
                        </span>
                        <span>发表于: <span style={{ fontFamily: 'Courier New, monospace' }}>{post.date}</span></span>
                        <span>
                            IP: <span style={{
                                fontFamily: 'Courier New, monospace',
                                color: '#cc0000',
                            }}>{post.ip}</span>
                        </span>
                        <span style={{
                            display: 'inline-block',
                            padding: '1px 8px',
                            fontSize: '10px',
                            borderRadius: '2px',
                            background: '#f5f5f5',
                            color: epochInfo.color,
                            border: `1px solid ${epochInfo.color}44`,
                        }}>
                            {epochInfo.text}
                        </span>
                        <span>回复: {post.replies}</span>
                        <span>查看: {post.views || '---'}</span>
                    </div>
                </div>

                {/* 帖子内容 + 作者侧边栏 */}
                <div style={{
                    background: '#fff',
                    border: '1px solid #c0c0c0',
                    borderTop: 'none',
                    display: 'flex',
                }}>
                    {/* 作者侧边栏 */}
                    <div style={{
                        width: '160px',
                        flexShrink: 0,
                        background: '#f8f8f8',
                        borderRight: '1px solid #e0e0e0',
                        padding: '14px 10px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        {/* 头像占位 */}
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'linear-gradient(135deg, #c0c0c0, #e0e0e0)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                            border: '1px solid #c0c0c0',
                        }}>
                            👤
                        </div>

                        <div style={{
                            fontWeight: 'bold',
                            fontSize: '12px',
                            color: '#333',
                        }}>
                            {post.author}
                        </div>

                        {authorProfile && (
                            <div style={{
                                fontSize: '10px',
                                color: '#999',
                                lineHeight: 1.8,
                                textAlign: 'center',
                            }}>
                                <div>注册: {authorProfile.joinDate}</div>
                                <div>发帖: {authorProfile.postCount}</div>
                                <div>最后活跃: {authorProfile.lastActive}</div>
                                {authorProfile.signature && (
                                    <div style={{
                                        marginTop: '8px',
                                        paddingTop: '8px',
                                        borderTop: '1px dashed #ddd',
                                        color: '#aaa',
                                        fontStyle: 'italic',
                                        fontSize: '10px',
                                    }}>
                                        "{authorProfile.signature}"
                                        {(authorId === 'Anonymous_03') && (
                                            <div style={{ marginTop: '4px' }}>
                                                <Link
                                                    to="/archives/2001-blog-information-complexity"
                                                    style={{ fontSize: '9px', color: '#999', fontStyle: 'normal' }}
                                                >
                                                    📝 [博客: 信息复杂性，以及我为什么开始学编译原理]
                                                </Link>
                                            </div>
                                        )}
                                        {(authorId === 'Anonymous_14') && (
                                            <div style={{ marginTop: '4px' }}>
                                                <Link
                                                    to="/archives/1997-self-study-notes"
                                                    style={{ fontSize: '9px', color: '#999', fontStyle: 'normal' }}
                                                >
                                                    📝 [个人笔记: 学习片段 (损坏)]
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 帖子正文 */}
                    <div style={{ flex: 1, padding: '14px 16px', minWidth: 0 }}>
                        <div style={{
                            fontSize: '13px',
                            lineHeight: 2,
                            color: '#222',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            minHeight: '120px',
                        }}>
                            {post.content}
                        </div>

                        {/* 操作按钮 */}
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            marginTop: '16px',
                            paddingTop: '10px',
                            borderTop: '1px solid #eee',
                        }}>
                            <button
                                onClick={() => handleWriteAction('回复')}
                                style={{
                                    padding: '3px 12px',
                                    fontSize: '11px',
                                    minWidth: 'unset',
                                    background: '#2B7ACD',
                                    color: '#fff',
                                    border: '1px solid #1a5fa0',
                                    cursor: 'pointer',
                                }}
                            >
                                💬 回复
                            </button>
                            <button
                                onClick={() => handleWriteAction('回复')}
                                style={{
                                    padding: '3px 12px',
                                    fontSize: '11px',
                                    minWidth: 'unset',
                                    cursor: 'pointer',
                                }}
                            >
                                📋 引用
                            </button>
                            <button
                                onClick={() => handleWriteAction('私信')}
                                style={{
                                    padding: '3px 12px',
                                    fontSize: '11px',
                                    minWidth: 'unset',
                                    cursor: 'pointer',
                                }}
                            >
                                ✉️ 私信
                            </button>
                        </div>
                    </div>
                </div>

                {/* 评论区 */}
                <div style={{
                    background: '#fff',
                    border: '1px solid #c0c0c0',
                    borderTop: 'none',
                    borderRadius: '0 0 3px 3px',
                }}>
                    <div style={{
                        background: 'linear-gradient(180deg, #f5f5f5, #e8e8e8)',
                        padding: '8px 14px',
                        borderBottom: '2px solid #2B7ACD',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#333',
                    }}>
                        💬 回复 ({post.comments.length})
                    </div>

                    {post.comments.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '32px',
                            color: '#999',
                            fontSize: '12px',
                        }}>
                            暂无回复。
                        </div>
                    ) : (
                        <div>
                            {post.comments.map((comment, idx) => (
                                <div
                                    key={comment.id}
                                    style={{
                                        display: 'flex',
                                        borderBottom: idx < post.comments.length - 1 ? '1px dotted #e0e0e0' : 'none',
                                    }}
                                >
                                    {/* 评论者侧边栏 */}
                                    <div style={{
                                        width: '160px',
                                        flexShrink: 0,
                                        background: idx % 2 === 0 ? '#fafafa' : '#f5f5f5',
                                        borderRight: '1px solid #eee',
                                        padding: '10px',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{
                                            fontWeight: 'bold',
                                            fontSize: '11px',
                                            color: comment.author === 'SYSTEM_AUTO' ? '#cc0000' : '#333',
                                        }}>
                                            {comment.author}
                                        </div>
                                        {comment.author === 'SYSTEM_AUTO' && (
                                            <span style={{
                                                display: 'inline-block',
                                                background: '#cc0000',
                                                color: '#fff',
                                                fontSize: '8px',
                                                padding: '1px 4px',
                                                marginTop: '4px',
                                                borderRadius: '2px',
                                            }}>
                                                SYSTEM
                                            </span>
                                        )}
                                        <div style={{
                                            fontSize: '10px',
                                            color: '#999',
                                            marginTop: '6px',
                                            fontFamily: 'Courier New, monospace',
                                        }}>
                                            {comment.date.slice(0, 16)}
                                        </div>
                                    </div>

                                    {/* 评论内容 */}
                                    <div style={{
                                        flex: 1,
                                        padding: '10px 14px',
                                        fontSize: '12px',
                                        lineHeight: 1.9,
                                        color: '#333',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                    }}>
                                        {comment.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 快速回复 */}
                    <div style={{
                        padding: '12px 16px',
                        background: '#fafafa',
                        borderTop: '1px solid #e0e0e0',
                    }}>
                        <div style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginBottom: '8px',
                            color: '#666',
                        }}>
                            📝 快速回复
                        </div>
                        <textarea
                            readOnly
                            placeholder="输入回复内容...（功能已禁用——数据库处于只读归档模式）"
                            style={{
                                width: '100%',
                                height: '80px',
                                fontSize: '12px',
                                padding: '8px',
                                fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                                background: '#f0f0f0',
                                color: '#999',
                                border: '1px solid #d0d0d0',
                                resize: 'vertical',
                                cursor: 'not-allowed',
                            }}
                        />
                        <div style={{
                            marginTop: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <span style={{ fontSize: '10px', color: '#aaa' }}>
                                ⚠ 写入操作已被系统策略禁止。当前为只读存档模式。
                            </span>
                            <button
                                onClick={() => handleWriteAction('回复')}
                                disabled
                                style={{
                                    padding: '4px 16px',
                                    fontSize: '11px',
                                    minWidth: 'unset',
                                    opacity: 0.6,
                                    cursor: 'not-allowed',
                                }}
                            >
                                发表回复
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // ============================================================
    // 主渲染
    // ============================================================
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"SimSun", "宋体", Tahoma, "Microsoft YaHei", sans-serif',
            background: '#e8ecf1',
            overflow: 'hidden',
        }}>
            {/* ================================================ */}
            {/* 顶部导航条 (Discuz! 风格蓝色条)                     */}
            {/* ================================================ */}
            <div style={{
                background: 'linear-gradient(180deg, #2B7ACD 0%, #1a6bbf 40%, #155ea8 100%)',
                borderBottom: '2px solid #0d4a8a',
                padding: '0',
                flexShrink: 0,
            }}>
                {/* 第一行：站点名称 + 用户快捷操作 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 16px',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    width: '100%',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#fff',
                            letterSpacing: '2px',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                            cursor: 'pointer',
                        }}
                            onClick={backToCategories}
                        >
                            ⛵ TexiusiShip BBS
                        </span>
                        <span style={{
                            fontSize: '10px',
                            color: 'rgba(255,255,255,0.6)',
                            background: 'rgba(0,0,0,0.2)',
                            padding: '2px 8px',
                            borderRadius: '2px',
                        }}>
                            自 2001 年运行至今
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
                        <span>🖧 在线: 1人</span>
                        <span>📊 帖子: {stats.totalPosts}</span>
                        <span>👥 用户: {stats.totalUsers}</span>
                        <span style={{ fontFamily: 'Courier New, monospace', fontSize: '12px' }}>
                            {clock || '--:--:--'}
                        </span>
                        <Link
                            to="/"
                            style={{
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '10px',
                                textDecoration: 'none',
                                padding: '2px 8px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '2px',
                            }}
                            onMouseEnter={e => {
                                e.target.style.color = '#fff';
                                e.target.style.borderColor = 'rgba(255,255,255,0.5)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.color = 'rgba(255,255,255,0.7)';
                                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                            }}
                        >
                            🖥️ 桌面
                        </Link>
                    </div>
                </div>

                {/* 第二行：主导航 */}
                <div style={{
                    background: 'rgba(0,0,0,0.12)',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    padding: '0 16px',
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '0',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        width: '100%',
                    }}>
                        {/* 首页 */}
                        <div
                            onClick={backToCategories}
                            style={{
                                padding: '7px 16px',
                                fontSize: '12px',
                                color: view === 'categories' ? '#fff' : 'rgba(255,255,255,0.8)',
                                cursor: 'pointer',
                                background: view === 'categories' ? 'rgba(0,0,0,0.2)' : 'transparent',
                                borderBottom: view === 'categories' ? '2px solid #fff' : '2px solid transparent',
                                fontWeight: view === 'categories' ? 'bold' : 'normal',
                                transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => {
                                if (view !== 'categories') e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                            }}
                            onMouseLeave={e => {
                                if (view !== 'categories') e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            🏠 首页
                        </div>

                        {/* 版块导航 */}
                        {forumCategories.map(cat => (
                            <div
                                key={cat.id}
                                onClick={() => enterCategory(cat.id)}
                                style={{
                                    padding: '7px 14px',
                                    fontSize: '12px',
                                    color: selectedCategory === cat.id && view === 'list'
                                        ? '#fff'
                                        : 'rgba(255,255,255,0.8)',
                                    cursor: 'pointer',
                                    background: selectedCategory === cat.id && view === 'list'
                                        ? 'rgba(0,0,0,0.2)'
                                        : 'transparent',
                                    borderBottom: selectedCategory === cat.id && view === 'list'
                                        ? '2px solid #fff'
                                        : '2px solid transparent',
                                    fontWeight: selectedCategory === cat.id && view === 'list' ? 'bold' : 'normal',
                                    transition: 'all 0.15s',
                                }}
                                onMouseEnter={e => {
                                    if (!(selectedCategory === cat.id && view === 'list'))
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                }}
                                onMouseLeave={e => {
                                    if (!(selectedCategory === cat.id && view === 'list'))
                                        e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                {cat.icon} {cat.name.split('·')[0].trim()}
                            </div>
                        ))}

                        <div style={{ flex: 1 }} />

                        {/* 搜索框 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 0',
                        }}>
                            <input
                                type="text"
                                placeholder="搜索帖子..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        if (searchQuery.trim()) {
                                            setIsSearching(true);
                                            if (view !== 'list') {
                                                setSelectedCategory(null);
                                                pushView('list', { category: null });
                                            }
                                        }
                                    }
                                }}
                                style={{
                                    width: '160px',
                                    height: '24px',
                                    fontSize: '11px',
                                    padding: '2px 8px',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    background: 'rgba(255,255,255,0.15)',
                                    color: '#fff',
                                    outline: 'none',
                                    borderRadius: '2px',
                                }}
                                onFocus={e => {
                                    e.target.style.background = 'rgba(255,255,255,0.9)';
                                    e.target.style.color = '#333';
                                }}
                                onBlur={e => {
                                    if (!e.target.value) {
                                        e.target.style.background = 'rgba(255,255,255,0.15)';
                                        e.target.style.color = '#fff';
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    if (searchQuery.trim()) {
                                        setIsSearching(true);
                                        if (view !== 'list') {
                                            setSelectedCategory(null);
                                            pushView('list', { category: null });
                                        }
                                    }
                                }}
                                style={{
                                    padding: '3px 10px',
                                    fontSize: '11px',
                                    minWidth: 'unset',
                                    height: '24px',
                                    background: 'rgba(255,255,255,0.2)',
                                    color: '#fff',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    cursor: 'pointer',
                                    boxShadow: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                🔍
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================================================ */}
            {/* 面包屑导航                                         */}
            {/* ================================================ */}
            <div style={{
                background: '#f5f5f5',
                borderBottom: '1px solid #ddd',
                padding: '6px 16px',
                fontSize: '11px',
                color: '#666',
                flexShrink: 0,
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    width: '100%',
                }}>
                    <span
                        onClick={backToCategories}
                        style={{ color: '#003399', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        🏠 TexiusiShip BBS
                    </span>

                    {view !== 'categories' && (
                        <>
                            <span style={{ color: '#999' }}>›</span>
                            {view === 'list' && selectedCategory && (
                                <>
                                    <span
                                        onClick={() => enterCategory(selectedCategory)}
                                        style={{ color: '#003399', cursor: 'pointer', textDecoration: 'underline' }}
                                    >
                                        {forumCategories.find(c => c.id === selectedCategory)?.name || '版块'}
                                    </span>
                                    {searchQuery && (
                                        <>
                                            <span style={{ color: '#999' }}>›</span>
                                            <span style={{ color: '#666' }}>
                                                搜索: "{searchQuery}"
                                                <span
                                                    onClick={() => {
                                                        setSearchQuery('');
                                                        setIsSearching(false);
                                                    }}
                                                    style={{
                                                        marginLeft: '6px',
                                                        color: '#cc0000',
                                                        cursor: 'pointer',
                                                        fontSize: '10px',
                                                    }}
                                                >
                                                    ✕ 清除
                                                </span>
                                            </span>
                                        </>
                                    )}
                                </>
                            )}
                            {view === 'list' && !selectedCategory && (
                                <span style={{ color: '#666' }}>
                                    {searchQuery ? `搜索: "${searchQuery}"` : '全部帖子'}
                                    {searchQuery && (
                                        <span
                                            onClick={() => {
                                                setSearchQuery('');
                                                setIsSearching(false);
                                            }}
                                            style={{
                                                marginLeft: '6px',
                                                color: '#cc0000',
                                                cursor: 'pointer',
                                                fontSize: '10px',
                                            }}
                                        >
                                            ✕ 清除
                                        </span>
                                    )}
                                </span>
                            )}
                            {view === 'detail' && selectedPost && (
                                <>
                                    <span
                                        onClick={backToList}
                                        style={{ color: '#003399', cursor: 'pointer', textDecoration: 'underline' }}
                                    >
                                        {forumCategories.find(c => c.id === selectedPost.category)?.name || '版块'}
                                    </span>
                                    <span style={{ color: '#999' }}>›</span>
                                    <span style={{ color: '#666' }}>
                                        {selectedPost.title.slice(0, 40)}
                                        {selectedPost.title.length > 40 ? '...' : ''}
                                    </span>
                                </>
                            )}
                        </>
                    )}

                    {/* 返回按钮 */}
                    {canGoBack && (
                        <span style={{ marginLeft: 'auto' }}>
                            <button
                                onClick={goBack}
                                style={{
                                    padding: '2px 10px',
                                    fontSize: '10px',
                                    minWidth: 'unset',
                                    cursor: 'pointer',
                                }}
                            >
                                ← 返回
                            </button>
                        </span>
                    )}
                </div>
            </div>

            {/* ================================================ */}
            {/* 主内容区域 (可滚动)                                  */}
            {/* ================================================ */}
            <div style={{
                flex: 1,
                overflow: 'auto',
                padding: '12px 16px',
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                }}>
                    {/* 左侧主内容 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {view === 'categories' && <CategoryListView />}
                        {view === 'list' && <PostListView />}
                        {view === 'detail' && <PostDetailView />}
                    </div>

                    {/* 右侧边栏 */}
                    <Sidebar />
                </div>
            </div>

            {/* ================================================ */}
            {/* 底部版权 (Discuz! 风格)                              */}
            {/* ================================================ */}
            <div style={{
                background: '#f5f5f5',
                borderTop: '2px solid #2B7ACD',
                padding: '10px 16px',
                textAlign: 'center',
                fontSize: '10px',
                color: '#999',
                lineHeight: 1.8,
                flexShrink: 0,
            }}>
                <div>
                    TexiusiShip BBS v1.0 | Powered by sandbox kernel | local_mind.db (47.3 MB)
                </div>
                <div>
                    运行环境：独立节点 (IP: 210.28.128.4) | 未连接到互联网 — 本地环回
                </div>
                <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    <Link to="/" style={{ fontSize: '10px', color: '#999' }}>
                        🖥️ 返回桌面
                    </Link>
                    <Link to="/system/logs" style={{ fontSize: '10px', color: '#999' }}>
                        📋 系统日志
                    </Link>
                    <Link to="/system/console" style={{ fontSize: '10px', color: '#999' }}>
                        ⚙️ 管理控制台
                    </Link>
                    <span
                        onClick={() => handleWriteAction('私信')}
                        style={{ fontSize: '10px', color: '#999', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        📧 联系我们
                    </span>
                </div>
                <div style={{ marginTop: '6px', color: '#bbb' }}>
                    Copyright © 2001-2026 TexiusiShip. All data stored in local_mind.db.
                    <br />
                    <span style={{ fontStyle: 'italic' }}>
                        "船还在航行。"
                    </span>
                </div>
            </div>
        </div>
    );
};
