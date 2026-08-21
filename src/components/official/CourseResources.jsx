// src/components/official/CourseResources.jsx
// 教学资源库

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { courseData, archiveData } from '../../data/mockData.js';

const CourseResources = () => {
    const [currentPath, setCurrentPath] = useState(['root']);
    const [selectedFile, setSelectedFile] = useState(null);

    const allResources = courseData.resources;
    const archives = archiveData;

    const handleDownload = (resource) => {
        if (resource.status === 'locked') {
            window.showSystemDialog?.('error', '访问受限',
                `无法下载 "${resource.title}"。\n\nHTTP 403 - Forbidden\n\n该资源需要 SYSTEM 级别访问权限。当前用户权限不足。`);
        } else if (resource.status === 'forbidden') {
            window.showSystemDialog?.('error', '禁止访问',
                `无法下载 "${resource.title}"。\n\nHTTP 403 - Forbidden\n\n该文档仅限系统管理人员访问。\n如需查阅，请联系网络与信息化办公室。`);
        } else if (resource.status === 'corrupted') {
            window.showSystemDialog?.('error', '文件已损坏',
                `"${resource.title}" 无法读取。\n\n磁盘扇区错误。文件可能已被 sweeper_daemon 清理。`);
        } else {
            window.showSystemDialog?.('info', '下载失败',
                `准备下载 "${resource.title}"...\n\n文件大小: ${resource.size}\n格式: ${resource.format}\n\n正在从服务器检索文件数据...\n\n错误: 服务器上未找到该文件对应的数据。\n\n(该文件可能已被移出资源目录。)`);
        }
    };

    return (
        <div className="page-enter" style={{
            backgroundColor: '#d8e4f8',
            minHeight: '100vh',
            fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
            fontSize: '13px',
        }}>
            {/* 顶部 */}
            <header style={{
                background: 'linear-gradient(180deg, #003399, #0044cc)',
                color: '#ffffff',
                padding: '8px 20px',
            }}>
                <h1 style={{ color: '#ffffff', fontSize: '18px', margin: 0 }}>📁 教学资源库</h1>
            </header>

            {/* 导航 + 面包屑 */}
            <div style={{ padding: '6px 20px', background: '#f0f0f0', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="breadcrumbs" style={{ padding: 0 }}>
                    <Link to="/">🏠 门户首页</Link><span className="sep">›</span>
                    <Link to="/course">编译原理</Link><span className="sep">›</span>
                    <strong>教学资源库</strong>
                </div>
                <Link to="/course" style={{ fontSize: '11px' }}>← 返回课程主页</Link>
            </div>

            {/* 工具栏 */}
            <div style={{
                padding: '6px 20px',
                background: '#e8ecf4',
                borderBottom: '1px solid #999',
                display: 'flex',
                gap: '6px',
            }}>
                <button onClick={() => setCurrentPath(['root'])}>⬆ 上级目录</button>
                <button onClick={() => window.showSystemDialog?.('info', '功能不可用', '搜索功能需要索引服务支持。索引服务 (searchd) 在上次数据库压缩时被意外终止。')}>🔍 搜索</button>
                <button onClick={() => window.showSystemDialog?.('info', '视图模式', '当前视图：列表。\n\n其他视图模式（图标、详细信息、缩略图）需要显卡驱动支持。\n当前系统环境未安装相关显示组件。')}>📋 查看</button>
            </div>

            {/* 地址栏 */}
            <div style={{
                padding: '4px 20px',
                background: '#f0f0f0',
                borderBottom: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
            }}>
                <span style={{ color: '#666' }}>地址:</span>
                <input
                    type="text"
                    readOnly
                    value={`D:\\campus_web\\resources\\${currentPath.join('\\')}`}
                    style={{ flex: 1, fontSize: '11px' }}
                />
                <span style={{ color: '#808080', fontFamily: 'Courier New, monospace', fontSize: '10px' }}>
                    [只读]
                </span>
            </div>

            {/* 文件列表 */}
            <main style={{ maxWidth: '900px', margin: '16px auto', padding: '0 10px' }}>
                <div className="raised" style={{ background: '#ffffff' }}>
                    {/* 列标题 */}
                    <div style={{
                        background: 'linear-gradient(180deg, #f0f0f0, #d0d0d0)',
                        padding: '4px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #808080',
                    }}>
                        <span style={{ width: '30px' }}></span>
                        <span style={{ flex: 1 }}>名称</span>
                        <span style={{ width: '100px' }}>类型</span>
                        <span style={{ width: '90px' }}>大小</span>
                        <span style={{ width: '140px' }}>修改日期</span>
                        <span style={{ width: '60px', textAlign: 'center' }}>状态</span>
                    </div>

                    {/* 文件夹（按年份归档） */}
                    {Object.entries(archives).sort((a, b) => b[0] - a[0]).map(([year, files]) => (
                        <div
                            key={year}
                            style={{
                                padding: '6px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '12px',
                                borderBottom: '1px dotted #d0d0d0',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f0f0ff'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            onClick={() => {
                                setSelectedFile({ type: 'folder', year, files });
                            }}
                        >
                            <span style={{ width: '30px', fontSize: '16px' }}>📁</span>
                            <span style={{ flex: 1, fontWeight: 'bold' }}>📂 {year}年存档</span>
                            <span style={{ width: '100px', color: '#666', fontSize: '11px' }}>文件夹</span>
                            <span style={{ width: '90px', color: '#666', fontSize: '11px' }}>{files.length} 项</span>
                            <span style={{ width: '140px', color: '#666', fontSize: '11px' }}>{year}-12-31</span>
                            <span style={{ width: '60px', textAlign: 'center', fontSize: '10px', color: '#008000' }}>正常</span>
                        </div>
                    ))}

                    {/* === 历史档案 (特殊分类) === */}
                    <div
                        style={{
                            padding: '6px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '12px',
                            borderBottom: '1px dotted #d0d0d0',
                            cursor: 'pointer',
                            background: '#fff8e8',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fff0d0'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff8e8'}
                        onClick={() => window.location.hash = '#/archives/2002-course-syllabus'}
                    >
                        <span style={{ width: '30px', fontSize: '16px' }}>📜</span>
                        <span style={{ flex: 1 }}>2002_计算思维导论_课程大纲.txt</span>
                        <span style={{ width: '100px', fontSize: '11px' }}>
                            <span style={{ background: '#ffe0e0', padding: '1px 6px', border: '1px solid #cc0000', fontSize: '10px' }}>档案</span>
                        </span>
                        <span style={{ width: '90px', color: '#666', fontSize: '11px' }}>56KB</span>
                        <span style={{ width: '140px', color: '#666', fontSize: '11px' }}>2002-12-??</span>
                        <span style={{ width: '60px', textAlign: 'center', fontSize: '10px', color: '#cc8800' }}>⚠ 学生笔记</span>
                    </div>
                    <div
                        style={{
                            padding: '6px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '12px',
                            borderBottom: '1px dotted #d0d0d0',
                            cursor: 'pointer',
                            background: '#fff8e8',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fff0d0'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff8e8'}
                        onClick={() => window.location.hash = '#/archives/1987-masters-thesis'}
                    >
                        <span style={{ width: '30px', fontSize: '16px' }}>📜</span>
                        <span style={{ flex: 1 }}>1987_硕士论文_海马体CA1区研究_摘要.pdf</span>
                        <span style={{ width: '100px', fontSize: '11px' }}>
                            <span style={{ background: '#ffe0e0', padding: '1px 6px', border: '1px solid #cc0000', fontSize: '10px' }}>档案</span>
                        </span>
                        <span style={{ width: '90px', color: '#666', fontSize: '11px' }}>18KB</span>
                        <span style={{ width: '140px', color: '#666', fontSize: '11px' }}>1987-05-??</span>
                        <span style={{ width: '60px', textAlign: 'center', fontSize: '10px', color: '#cc0000' }}>💀 残缺</span>
                    </div>
                    <div
                        style={{
                            padding: '6px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '12px',
                            borderBottom: '1px dotted #d0d0d0',
                            cursor: 'pointer',
                            background: '#fff8e8',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fff0d0'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff8e8'}
                        onClick={() => window.location.hash = '#/archives/2001-provincial-policy'}
                    >
                        <span style={{ width: '30px', fontSize: '16px' }}>📜</span>
                        <span style={{ flex: 1 }}>2001_省政府_学科交叉融合政策文件.txt</span>
                        <span style={{ width: '100px', fontSize: '11px' }}>
                            <span style={{ background: '#e8ffe8', padding: '1px 6px', border: '1px solid #008000', fontSize: '10px' }}>公开</span>
                        </span>
                        <span style={{ width: '90px', color: '#666', fontSize: '11px' }}>32KB</span>
                        <span style={{ width: '140px', color: '#666', fontSize: '11px' }}>2001-09-10</span>
                        <span style={{ width: '60px', textAlign: 'center', fontSize: '10px', color: '#008000' }}>完整</span>
                    </div>

                    <div
                        style={{
                            padding: '6px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '12px',
                            borderBottom: '1px dotted #d0d0d0',
                            cursor: 'pointer',
                            background: '#fff8e8',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fff0d0'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff8e8'}
                        onClick={() => window.location.hash = '#/archives/1992-sliding-window-paper'}
                    >
                        <span style={{ width: '30px', fontSize: '16px' }}>📜</span>
                        <span style={{ flex: 1 }}>1992_滑动窗式远期记忆渐进性缺失综合征_病例报告.pdf</span>
                        <span style={{ width: '100px', fontSize: '11px' }}>
                            <span style={{ background: '#ffe0e0', padding: '1px 6px', border: '1px solid #cc0000', fontSize: '10px' }}>档案</span>
                        </span>
                        <span style={{ width: '90px', color: '#666', fontSize: '11px' }}>2.4MB</span>
                        <span style={{ width: '140px', color: '#666', fontSize: '11px' }}>1992-03-??</span>
                        <span style={{ width: '60px', textAlign: 'center', fontSize: '10px', color: '#cc8800' }}>⚠ 残缺</span>
                    </div>

                    {/* 文件 */}
                    {allResources.map((r, idx) => (
                        <div
                            key={r.id}
                            style={{
                                padding: '6px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '12px',
                                borderBottom: '1px dotted #d0d0d0',
                                cursor: 'pointer',
                                background: idx % 2 === 0 ? '#ffffff' : '#f8f8f8',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f0f0ff'}
                            onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? '#ffffff' : '#f8f8f8'}
                            onClick={() => handleDownload(r)}
                        >
                            <span style={{ width: '30px', fontSize: '16px' }}>
                                {r.status === 'locked' ? '🔒' : r.status === 'forbidden' ? '🚫' : r.status === 'corrupted' ? '⚠️' : '📄'}
                            </span>
                            <span style={{ flex: 1 }}>{r.title}</span>
                            <span style={{ width: '100px', fontSize: '11px' }}>
                                <span style={{
                                    background: '#e8f0ff',
                                    padding: '1px 6px',
                                    border: '1px solid #003399',
                                    fontSize: '10px',
                                }}>
                                    {r.type}
                                </span>
                            </span>
                            <span style={{ width: '90px', color: '#666', fontSize: '11px' }}>{r.size}</span>
                            <span style={{ width: '140px', color: '#666', fontSize: '11px' }}>
                                {r.author === '林远' ? '2001-12-??' : '2026-0?-??'}
                            </span>
                            <span style={{ width: '60px', textAlign: 'center', fontSize: '10px' }}>
                                {r.status === 'normal' && <span style={{ color: '#008000' }}>✅</span>}
                                {r.status === 'locked' && <span style={{ color: '#cc8800' }}>🔒</span>}
                                {r.status === 'forbidden' && <span style={{ color: '#cc0000' }}>🚫</span>}
                                {r.status === 'corrupted' && <span style={{ color: '#808080' }}>💀</span>}
                            </span>
                        </div>
                    ))}
                </div>

                {/* 选中文件夹时显示内容 */}
                {selectedFile && selectedFile.type === 'folder' && (
                    <div className="raised" style={{ background: '#ffffff', marginTop: '12px', padding: '12px' }}>
                        <h3 style={{ fontSize: '14px', color: '#003399', marginBottom: '8px' }}>
                            📂 {selectedFile.year}年存档内容
                            <button
                                onClick={() => setSelectedFile(null)}
                                style={{ float: 'right', fontSize: '11px', minWidth: 'unset', padding: '2px 8px' }}
                            >
                                ✕ 关闭
                            </button>
                        </h3>
                        <table className="classic">
                            <thead>
                                <tr>
                                    <th>文件名</th>
                                    <th style={{ width: '80px' }}>类型</th>
                                    <th style={{ width: '80px' }}>大小</th>
                                    <th style={{ width: '80px' }}>状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedFile.files.map(f => (
                                    <tr key={f.id}>
                                        <td>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (f.id === '1992_01') {
                                                        window.location.hash = '#/archives/1992-sliding-window-paper';
                                                        return;
                                                    }
                                                    if (f.status === 'corrupted') {
                                                        window.showSystemDialog?.('error', '文件损坏', `"${f.name}" 无法打开。文件头校验失败。`);
                                                    } else if (f.status === 'locked') {
                                                        window.showSystemDialog?.('error', '访问受限', `"${f.name}" 需要 SYSTEM 权限。`);
                                                    } else if (f.status === 'hidden') {
                                                        window.showSystemDialog?.('warn', '隐藏文件', `"${f.name}" 是一个隐藏的配置文件。\n\n内容预览：\n[boot]\nsandbox_mode=true\nmax_participants=26\nsingle_user_mode=enforced\n\n[network]\nbind_address=210.28.128.4\nallow_external=false\n\n[experiment]\nname=Theseus_Protocol\nduration=indefinite\n termination_condition=none`);
                                                    } else {
                                                        window.showSystemDialog?.('info', '存档文件', `"${f.name}"\n\n${f.size} | ${f.type}\n\n这是一个历史存档文件。文件内容自${selectedFile.year}年以来未被修改。\n\n注意：所有存档文件存储于校园网档案目录中，与课程文件共用同一存储分区。`);
                                                    }
                                                }}
                                            >
                                                {f.name}
                                            </a>
                                        </td>
                                        <td style={{ fontSize: '11px' }}>{f.type}</td>
                                        <td style={{ fontSize: '11px' }}>{f.size}</td>
                                        <td style={{ fontSize: '10px' }}>
                                            {f.status === 'normal' && <span style={{ color: '#008000' }}>正常</span>}
                                            {f.status === 'corrupted' && <span style={{ color: '#808080' }}>损坏</span>}
                                            {f.status === 'locked' && <span style={{ color: '#cc8800' }}>锁定</span>}
                                            {f.status === 'hidden' && <span style={{ color: '#000080' }}>隐藏</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* 底部信息 */}
                <div style={{
                    marginTop: '16px',
                    padding: '10px',
                    background: '#f0f0f0',
                    border: '1px solid #ccc',
                    fontSize: '11px',
                    color: '#666',
                }}>
                    <strong>📌 资源库说明：</strong>
                    本资源库的文件索引存储于校园网档案服务器中。
                    部分历史文件仅有索引记录，实际数据可能尚未上传，或已随服务器迁移而丢失。
                </div>
            </main>

            {/* 底部 */}
            <footer className="copyright-bar">
                <span style={{ color: '#808080' }}>资源库最后索引时间: 2026-07-06 00:00:00 (自动索引) | 物理文件数量: ? | 虚拟条目数量: {allResources.length + Object.values(archives).flat().length}</span>
            </footer>
        </div>
    );
};

export default CourseResources;
