// src/components/TexiusiBBS.jsx
import { useState } from 'react';
import { initialPosts } from '../../data/forumData.js';

export const TexiusiBBS = () => {
    const [posts] = useState(initialPosts);
    const [visitorCount] = useState(411);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // 模拟后端请求失败
    const simulateServerError = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        // 模拟 JavaFX/Windows 98 风格的复古模态弹窗
        const message = `服务器错误 (HTTP 500)\n\n操作失败\n\n错误信息：Internal Server Error - 无法连接到数据库\n时间戳：${new Date().toISOString()}\n\n该存档快照为只读状态，所有写入操作已被禁用`;
        
        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.fontFamily = 'Tahoma, sans-serif';

        // 创建弹窗容器 (Windows 98 风格边框)
        const dialog = document.createElement('div');
        dialog.style.backgroundColor = '#c0c0c0';
        dialog.style.borderTop = '2px solid #ffffff';
        dialog.style.borderLeft = '2px solid #ffffff';
        dialog.style.borderRight = '2px solid #808080';
        dialog.style.borderBottom = '2px solid #808080';
        dialog.style.boxShadow = '2px 2px 0px #000000';
        dialog.style.width = '400px';
        dialog.style.maxWidth = '90%';
        dialog.style.display = 'flex';
        dialog.style.flexDirection = 'column';

        // 标题栏
        const titleBar = document.createElement('div');
        titleBar.style.background = 'linear-gradient(90deg, #000080, #1084d0)';
        titleBar.style.padding = '2px 4px';
        titleBar.style.color = 'white';
        titleBar.style.fontWeight = 'bold';
        titleBar.style.fontSize = '12px';
        titleBar.style.display = 'flex';
        titleBar.style.justifyContent = 'space-between';
        titleBar.style.alignItems = 'center';
        titleBar.innerHTML = '<span>System Error</span><span style="cursor: pointer; font-family: monospace;">✕</span>';
        
        // 内容区域
        const contentArea = document.createElement('div');
        contentArea.style.padding = '15px';
        contentArea.style.display = 'flex';
        contentArea.style.gap = '15px';
        contentArea.style.alignItems = 'flex-start';

        // 错误图标 (使用 CSS 绘制简单的红色圆圈叉号或 emoji)
        const icon = document.createElement('div');
        icon.style.fontSize = '32px';
        
        // 文本内容
        const text = document.createElement('pre');
        text.textContent = message;
        text.style.margin = '0';
        text.style.fontFamily = 'Tahoma, sans-serif';
        text.style.fontSize = '12px';
        text.style.whiteSpace = 'pre-wrap';
        text.style.color = '#000';

        contentArea.appendChild(icon);
        contentArea.appendChild(text);

        // 按钮区域
        const buttonArea = document.createElement('div');
        buttonArea.style.padding = '10px';
        buttonArea.style.display = 'flex';
        buttonArea.style.justifyContent = 'center';

        const okButton = document.createElement('button');
        okButton.textContent = '确定';
        okButton.style.minWidth = '75px';
        okButton.style.padding = '4px 10px';
        okButton.style.backgroundColor = '#c0c0c0';
        okButton.style.borderTop = '2px solid #ffffff';
        okButton.style.borderLeft = '2px solid #ffffff';
        okButton.style.borderRight = '2px solid #808080';
        okButton.style.borderBottom = '2px solid #808080';
        okButton.style.boxShadow = '1px 1px 0px #000000';
        okButton.style.cursor = 'pointer';
        okButton.style.fontFamily = 'Tahoma, sans-serif';
        okButton.style.fontSize = '12px';
        
        // 按钮点击效果
        okButton.onmousedown = () => {
            okButton.style.borderTop = '2px solid #808080';
            okButton.style.borderLeft = '2px solid #808080';
            okButton.style.borderRight = '2px solid #ffffff';
            okButton.style.borderBottom = '2px solid #ffffff';
            okButton.style.boxShadow = 'none';
        };
        okButton.onmouseup = () => {
            okButton.style.borderTop = '2px solid #ffffff';
            okButton.style.borderLeft = '2px solid #ffffff';
            okButton.style.borderRight = '2px solid #808080';
            okButton.style.borderBottom = '2px solid #808080';
            okButton.style.boxShadow = '1px 1px 0px #000000';
        };

        const closeDialog = () => {
            document.body.removeChild(overlay);
        };

        okButton.onclick = closeDialog;
        titleBar.lastElementChild.onclick = closeDialog; // 关闭按钮

        buttonArea.appendChild(okButton);
        dialog.appendChild(titleBar);
        dialog.appendChild(contentArea);
        dialog.appendChild(buttonArea);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const handleBackToList = () => {
        setSelectedPost(null);
    };

    const handleLike = () => {
        simulateServerError();
    };

    const handleComment = () => {
        simulateServerError();
    };

    const handleReply = () => {
        simulateServerError();
    };

    const handleNewPost = () => {
        simulateServerError();
    };

    // 帖子列表视图
    if (!selectedPost) {
        return (
            <div className="max-w-6xl mx-auto p-[2px] bg-win2k-gray retro-outset select-none">
                {/* 系统标题栏 */}
                <div className="bg-gradient-to-r from-win2k-blue to-win2k-light-blue px-2 py-1 flex justify-between items-center text-white font-bold text-[13px] tracking-wide">
                    <div className="flex items-center gap-1">
                        <span>🌐</span>
                        <span>TexiusiShip.com - 历史档案馆 (只读备份快照)</span>
                    </div>
                    <span className="bg-red-600 text-white text-[11px] px-1 border border-white blink">
                        STABLE_BACKUP
                    </span>
                </div>

                {/* 论坛导语 */}
                <div className="p-3 bg-[#e4e0d8] border-b border-[#808080] text-[#111111] leading-relaxed text-xs">
                    <strong>欢迎来到「忒修斯之船」匿名讨论区。</strong><br />
                    本站致力于探讨人格连续性、记忆本质及存在主义危机。所有发言均以匿名形式呈现。<br />
                    我们不记录你的名字，只记录你的思想。若所有木板皆已被替换，愿此处的文字仍是你的锚点。<br />
                    <span className="text-gray-600 mt-1 block">注意：当前访问的是2026年存档快照，所有交互功能已禁用</span>
                </div>

                {/* 工具栏 */}
                <div className="p-2 bg-[#f1efe9] border-b border-[#808080] flex gap-2">
                    <button 
                        onClick={handleNewPost}
                        className="px-3 py-1 bg-win2k-gray retro-outset text-xs hover:bg-[#d4d0c8] active:retro-inset"
                    >
                        发布新帖
                    </button>
                    <button className="px-3 py-1 bg-win2k-gray retro-outset text-xs hover:bg-[#d4d0c8] active:retro-inset">
                        搜索
                    </button>
                </div>

                {/* 列表区域 */}
                <div className="p-1 bg-white retro-inset overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                        <tr className="bg-[#c0c0c0] text-black">
                            <th className="p-1 font-normal retro-outset border-t border-l">主题 / 论题讨论</th>
                            <th className="p-1 font-normal retro-outset border-t border-l w-32">发布者</th>
                            <th className="p-1 font-normal retro-outset border-t border-l w-16 text-center">回复</th>
                            <th className="p-1 font-normal retro-outset border-t border-l w-44">最后更新时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-[#f1efe9] border-b border-dotted border-[#808080] transition-none">
                                <td className="p-2">
                                    <span
                                        onClick={() => handlePostClick(post)}
                                        className="text-blue-800 font-bold underline cursor-pointer hover:text-purple-800 break-all"
                                    >
                                        {post.title}
                                    </span>
                                    {post.epoch === 'glitch' && (
                                        <span className="ml-2 text-[10px] text-red-600 animate-pulse">[error]</span>
                                    )}
                                </td>
                                <td className="p-2 text-gray-700 italic">{post.author}</td>
                                <td className="p-2 text-center text-gray-600">{post.replies}</td>
                                <td className="p-2 text-gray-600 font-mono text-[11px]">{post.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* 底部状态栏 */}
                <div className="mt-3 p-2 bg-[#f1efe9] flex justify-between items-center retro-inset">
                    <div>
                        <span>当前在线人数：<strong className="text-blue-900">1</strong> 人</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700">访客计数器:</span>
                        <span className="bg-black text-[#00ff00] font-mono px-2 py-[2px] font-bold tracking-widest border border-[#808080] text-sm">
                            {String(visitorCount).padStart(6, '0')}
                        </span>
                    </div>
                </div>

                {/* 后门入口 */}
                <div className="p-2 overflow-hidden">
                    <a
                        href="#/system/logs"
                        className="float-right text-[10px] text-gray-500 no-underline hover:underline hover:text-red-600 transition-none font-mono"
                    >
                        _sys_error.log (12.4KB)
                    </a>
                </div>
            </div>
        );
    }

    // 帖子详情视图
    return (
        <div className="max-w-6xl mx-auto p-[2px] bg-win2k-gray retro-outset select-none">
            {/* 系统标题栏 */}
            <div className="bg-gradient-to-r from-win2k-blue to-win2k-light-blue px-2 py-1 flex justify-between items-center text-white font-bold text-[13px] tracking-wide">
                <div className="flex items-center gap-1">
                    <span>🌐</span>
                    <span>TexiusiShip.com - 帖子详情 [ID: {selectedPost.id}]</span>
                </div>
                <span className="bg-red-600 text-white text-[11px] px-1 border border-white">
                    READ_ONLY
                </span>
            </div>

            {/* 导航栏 */}
            <div className="p-2 bg-[#f1efe9] border-b border-[#808080]">
                <button 
                    onClick={handleBackToList}
                    className="px-3 py-1 bg-win2k-gray retro-outset text-xs hover:bg-[#d4d0c8] active:retro-inset"
                >
                    ← 返回列表
                </button>
            </div>

            {/* 帖子内容 */}
            <div className="p-4 bg-white">
                {/* 帖子头部信息 */}
                <div className="border-b-2 border-[#808080] pb-3 mb-4">
                    <h1 className="text-xl font-bold text-[#111111] mb-2">{selectedPost.title}</h1>
                    <div className="flex gap-4 text-xs text-gray-600 font-mono">
                        <span>作者: <strong>{selectedPost.author}</strong></span>
                        <span>发布时间: {selectedPost.date}</span>
                        <span>IP: {selectedPost.ip}</span>
                        <span>回复数: {selectedPost.replies}</span>
                    </div>
                </div>

                {/* 帖子正文 */}
                <div className="text-sm leading-relaxed text-[#111111] whitespace-pre-wrap mb-6 p-4 bg-[#f9f9f9] border border-[#d0d0d0]">
                    {selectedPost.content}
                </div>

                {/* 帖子操作按钮 */}
                <div className="flex gap-2 mb-6 pb-4 border-b border-[#d0d0d0]">
                    <button 
                        onClick={handleLike}
                        disabled={isLoading}
                        className="px-3 py-1 bg-win2k-gray retro-outset text-xs hover:bg-[#d4d0c8] active:retro-inset disabled:opacity-50"
                    >
                        👍 点赞
                    </button>
                    <button 
                        onClick={handleComment}
                        disabled={isLoading}
                        className="px-3 py-1 bg-win2k-gray retro-outset text-xs hover:bg-[#d4d0c8] active:retro-inset disabled:opacity-50"
                    >
                        💬 发表评论
                    </button>
                    <button 
                        onClick={() => simulateServerError()}
                        disabled={isLoading}
                        className="px-3 py-1 bg-win2k-gray retro-outset text-xs hover:bg-[#d4d0c8] active:retro-inset disabled:opacity-50"
                    >
                        🔗 分享
                    </button>
                </div>

                {/* 评论区 */}
                <div className="mb-4">
                    <h2 className="text-base font-bold mb-3 text-[#111111]">
                        评论 ({selectedPost.comments.length})
                    </h2>

                    {selectedPost.comments.length === 0 ? (
                        <div className="text-center text-gray-500 py-8 text-sm">
                            暂无评论
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {selectedPost.comments.map((comment) => (
                                <div key={comment.id} className="p-3 bg-[#f5f5f5] border border-[#d0d0d0]">
                                    <div className="flex justify-between items-start mb-2 text-xs text-gray-600 font-mono">
                                        <span><strong>{comment.author}</strong></span>
                                        <span>{comment.date}</span>
                                    </div>
                                    <div className="text-sm text-[#111111] mb-2">
                                        {comment.content}
                                    </div>
                                    <button 
                                        onClick={() => handleReply()}
                                        disabled={isLoading}
                                        className="text-xs text-blue-800 hover:text-purple-800 underline disabled:opacity-50"
                                    >
                                        回复
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 快速回复框 */}
                <div className="mt-6 p-3 bg-[#f1efe9] border border-[#808080]">
                    <h3 className="text-sm font-bold mb-2">快速回复</h3>
                    <textarea 
                        className="w-full h-24 p-2 text-sm border border-[#808080] retro-inset mb-2"
                        placeholder="输入您的评论..."
                        readOnly
                    />
                    <button 
                        onClick={handleComment}
                        disabled={isLoading}
                        className="px-4 py-1 bg-win2k-gray retro-outset text-sm hover:bg-[#d4d0c8] active:retro-inset disabled:opacity-50"
                    >
                        提交评论
                    </button>
                </div>
            </div>

            {/* 底部状态栏 */}
            <div className="mt-3 p-2 bg-[#f1efe9] flex justify-between items-center retro-inset">
                <div className="text-xs text-gray-600">
                    <span>当前浏览模式：<strong className="text-blue-900">只读存档</strong></span>
                    <span className="ml-4">所有修改操作已被禁用</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-700">访客计数器:</span>
                    <span className="bg-black text-[#00ff00] font-mono px-2 py-[2px] font-bold tracking-widest border border-[#808080] text-sm">
                        {String(visitorCount).padStart(6, '0')}
                    </span>
                </div>
            </div>
        </div>
    );
};