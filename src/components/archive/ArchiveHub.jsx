// src/components/archive/ArchiveHub.jsx
// 档案检索 — 档案索引页
//
// 模拟 2021 年考古计划发起人在知识分享平台发布的文章页面。
// 访问者从这里可以浏览所有已"恢复"的档案碎片。

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { archiveRegistry, archiveContents } from '../../data/archiveDocuments.js';
import { useGame } from '../../state/GameContext.jsx';

const ArchiveHub = () => {
    const [filter, setFilter] = useState('all');
    const [showAllDocs, setShowAllDocs] = useState(false);
    const { checkGate } = useGame();

    // 需要访问权限的档案（世界内自然规则：医疗记录需先在诊断系统确认存在）
    const gateMap = {
        '1995-mri-records': { rule: 'docMRI', label: '该档案需要先在诊断控制台中确认其恢复记录。' },
        '1995-funding-rejection': { rule: 'docFunding', label: '该档案需要先在诊断控制台中确认其恢复记录。' },
        '1992-sliding-window-paper': { rule: 'doc1992', label: '该档案需要先阅读相关医疗记录。' },
    };

    const categories = [
        { key: 'all', label: '全部档案' },
        { key: 'personal', label: '个人文书' },
        { key: 'academic', label: '学术档案' },
        { key: 'medical', label: '医疗记录' },
        { key: 'frame', label: '框架叙事' },
    ];

    const filtered = filter === 'all'
        ? archiveRegistry
        : archiveRegistry.filter(d => d.category === filter);

    // 框架叙事文档
    const frameDoc = archiveContents['2021-archaeology-project'];

    return (
        <div style={{
            backgroundColor: '#d8e4f8',
            minHeight: '100vh',
            fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
            fontSize: '13px',
        }}>
            {/* === 顶部横幅 === */}
            <header style={{
                background: 'linear-gradient(180deg, #003399, #0044cc)',
                color: '#ffffff',
                padding: '10px 20px',
                borderBottom: '3px solid #002266',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ color: '#fff', fontSize: '18px', margin: 0 }}>
                            📂 忒修斯之船 · 档案检索
                        </h1>
                        <div style={{ fontSize: '10px', color: '#aabbdd', marginTop: '2px' }}>
                            校园网档案目录 | 最后更新：2023年2月
                        </div>
                    </div>
                    <div style={{ fontSize: '10px', color: '#aabbdd', textAlign: 'right' }}>
                        <div>校园网内网服务</div>
                        <div>归档状态</div>
                    </div>
                </div>
            </header>

            {/* === 导航 === */}
            <nav style={{
                background: '#e8ecf4',
                borderBottom: '1px solid #999',
                padding: '4px 20px',
                display: 'flex',
                gap: '16px',
                fontSize: '12px',
            }}>
                <Link to="/" style={{ color: '#003399' }}>🏠 门户首页</Link>
                <span style={{ color: '#666' }}>›</span>
                <strong>档案检索</strong>
            </nav>

            {/* === 主内容区 === */}
            <main style={{
                maxWidth: '960px',
                margin: '16px auto',
                padding: '0 10px',
            }}>
                {/* === 框架叙事文章 === */}
                <div className="raised" style={{
                    background: '#fafafa',
                    padding: '28px 36px',
                    marginBottom: '20px',
                    fontFamily: '"Microsoft YaHei", "微软雅黑", "SimSun", sans-serif',
                    fontSize: '14px',
                    lineHeight: 2.0,
                    color: '#222',
                    maxWidth: '720px',
                    margin: '0 auto 20px auto',
                }}>
                    {frameDoc.sections.map((s, i) => (
                        <ArchiveSection key={i} section={s} />
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <button
                        onClick={() => setShowAllDocs(!showAllDocs)}
                        style={{
                            padding: '6px 20px',
                            background: '#c0c0c0',
                            borderTop: '2px solid #fff',
                            borderLeft: '2px solid #fff',
                            borderRight: '2px solid #808080',
                            borderBottom: '2px solid #808080',
                            boxShadow: '1px 1px 0 #000',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                        }}
                    >
                        {showAllDocs ? '▲ 收起档案索引' : '▼ 查看已恢复的档案碎片'}
                    </button>
                </div>

                {/* === 档案索引 === */}
                {showAllDocs && (
                    <>
                        {/* 分类标签 */}
                        <div style={{
                            display: 'flex',
                            gap: '4px',
                            marginBottom: '12px',
                            flexWrap: 'wrap',
                        }}>
                            {categories.map(cat => (
                                <button
                                    key={cat.key}
                                    onClick={() => setFilter(cat.key)}
                                    style={{
                                        padding: '3px 12px',
                                        background: filter === cat.key ? '#003399' : '#c0c0c0',
                                        color: filter === cat.key ? '#fff' : '#000',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '11px',
                                        fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                                        boxShadow: '1px 1px 0 #000',
                                    }}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* 文档列表 */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                        }}>
                            {filtered.map(doc => {
                                const gate = gateMap[doc.id];
                                const gated = gate && !checkGate(gate.rule);
                                const canOpen = !gated;
                                return (
                                <div
                                    key={doc.id}
                                    className="raised"
                                    style={{
                                        background: '#ffffff',
                                        padding: '12px 16px',
                                        display: 'flex',
                                        gap: '12px',
                                        alignItems: 'flex-start',
                                        opacity: doc.accessLevel === 'locked' || gated ? 0.6 : 1,
                                    }}
                                >
                                    {/* 图标 */}
                                    <div style={{
                                        fontSize: '24px',
                                        flexShrink: 0,
                                        width: '36px',
                                        textAlign: 'center',
                                        filter: doc.corruptionLevel > 0 ? 'grayscale(0.5)' : 'none',
                                    }}>
                                        {doc.category === 'personal' ? '📝'
                                            : doc.category === 'academic' ? '📋'
                                                : doc.category === 'medical' ? '🏥'
                                                    : '🔍'}
                                    </div>

                                    {/* 信息 */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <Link
                                                to={canOpen ? `/archives/${doc.id}` : '#'}
                                                onClick={(e) => {
                                                    if (!canOpen) {
                                                        e.preventDefault();
                                                        window.showSystemDialog?.('error', '无法读取',
                                                            `"${doc.title}"\n\n${gate.label}`);
                                                        return;
                                                    }
                                                }}
                                                style={{
                                                    fontSize: '13px',
                                                    fontWeight: 'bold',
                                                    color: gated ? '#999' : '#003399',
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                {gated ? '🔒 ' : ''}{doc.title}
                                            </Link>
                                            <span style={{
                                                fontSize: '10px',
                                                background: '#e8f0ff',
                                                color: '#003399',
                                                padding: '1px 6px',
                                                border: '1px solid #003399',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {doc.year}
                                            </span>
                                            {doc.corruptionLevel > 0 && (
                                                <span style={{
                                                    fontSize: '10px',
                                                    color: '#cc8800',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    ⚠ 部分损坏
                                                </span>
                                            )}
                                            {doc.accessLevel === 'locked' && (
                                                <span style={{
                                                    fontSize: '10px',
                                                    color: '#cc0000',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    🔒 受限访问
                                                </span>
                                            )}
                                            {gated && (
                                                <span style={{
                                                    fontSize: '10px',
                                                    color: '#6a1b9a',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    🔒 需先访问相关记录
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.5 }}>
                                            {doc.summary}
                                        </div>
                                        <div style={{ fontSize: '10px', color: '#999', marginTop: '4px' }}>
                                            发现位置：{doc.foundAt} | 来源：{doc.source}
                                        </div>
                                    </div>

                                    {/* 操作 */}
                                    <div style={{ flexShrink: 0 }}>
                                        {canOpen ? (
                                        <Link
                                            to={`/archives/${doc.id}`}
                                            style={{
                                                padding: '3px 10px',
                                                background: '#c0c0c0',
                                                borderTop: '2px solid #fff',
                                                borderLeft: '2px solid #fff',
                                                borderRight: '2px solid #808080',
                                                borderBottom: '2px solid #808080',
                                                boxShadow: '1px 1px 0 #000',
                                                color: '#000',
                                                textDecoration: 'none',
                                                fontSize: '11px',
                                                fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                                            }}
                                        >
                                            查看 →
                                        </Link>
                                        ) : (
                                        <button
                                            onClick={() => {
                                                window.showSystemDialog?.('error', '无法读取',
                                                    `"${doc.title}"\n\n${gate.label}`);
                                            }}
                                            style={{
                                                padding: '3px 10px',
                                                background: '#e0e0e0',
                                                color: '#999',
                                                borderTop: '2px solid #fff',
                                                borderLeft: '2px solid #fff',
                                                borderRight: '2px solid #808080',
                                                borderBottom: '2px solid #808080',
                                                fontSize: '11px',
                                                cursor: 'not-allowed',
                                                fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                                            }}
                                        >
                                            🔒 锁定
                                        </button>
                                        )}
                                    </div>
                                </div>
                                );
                            })}
                        </div>

                        <div style={{
                            textAlign: 'center',
                            marginTop: '12px',
                            fontSize: '10px',
                            color: '#999',
                            padding: '10px',
                        }}>
                            共 {filtered.length} 份档案 | 来源：互联网档案馆 · 医院数据泄漏 · BBS备份 · 匿名上传
                        </div>
                    </>
                )}
            </main>

            {/* === 底部 === */}
            <footer style={{
                background: '#f5f5f5',
                borderTop: '2px solid #2B7ACD',
                padding: '10px 16px',
                textAlign: 'center',
                fontSize: '10px',
                color: '#999',
                lineHeight: 1.8,
            }}>
                <div>
                    忒修斯之船考古计划 · 2021-2023
                </div>
                <div>
                    ⚠ 本页所引用的档案文件来自多种来源，部分文件的真实性尚未得到独立验证。
                </div>
                <div style={{ marginTop: '4px' }}>
                    <Link to="/" style={{ fontSize: '10px', color: '#999' }}>
                        🏠 返回门户首页
                    </Link>
                    <span style={{ margin: '0 8px' }}>|</span>
                    <Link to="/dep" style={{ fontSize: '10px', color: '#999' }}>
                        🌐 TexiusiShip BBS
                    </Link>
                </div>
            </footer>
        </div>
    );
};

// ============================================================
// 框架叙事文章段落渲染
// ============================================================
const ArchiveSection = ({ section }) => {
    const { type, content, level, attribution } = section;

    switch (type) {
        case 'heading':
            return (
                <h3 style={{
                    fontSize: level === 1 ? '22px' : level === 2 ? '17px' : '14px',
                    fontWeight: 'bold',
                    color: '#111',
                    margin: level === 1 ? '28px 0 12px' : '16px 0 8px',
                    paddingBottom: level === 2 ? '6px' : 0,
                    borderBottom: level === 2 ? '2px solid #eee' : 'none',
                }}>
                    {content}
                </h3>
            );

        case 'paragraph':
            return (
                <p style={{ margin: '0 0 12px 0', whiteSpace: 'pre-wrap' }}>
                    {content}
                </p>
            );

        case 'quote':
            return (
                <blockquote style={{
                    margin: '12px 0',
                    padding: '12px 20px',
                    borderLeft: '3px solid #999',
                    color: '#555',
                    fontStyle: 'italic',
                    whiteSpace: 'pre-wrap',
                }}>
                    {content}
                    {attribution && (
                        <div style={{
                            marginTop: '8px',
                            fontSize: '11px',
                            color: '#888',
                            fontStyle: 'normal',
                            textAlign: 'right',
                        }}>
                            {attribution}
                        </div>
                    )}
                </blockquote>
            );

        case 'field':
            return (
                <div style={{
                    margin: '6px 0',
                    padding: '6px 12px',
                    background: '#f8f8f8',
                    borderLeft: '3px solid #003399',
                    fontSize: '12px',
                    lineHeight: 1.6,
                }}>
                    <strong>{section.label}：</strong>
                    <span>{section.value}</span>
                </div>
            );

        case 'signature':
            return (
                <div style={{
                    textAlign: 'right',
                    marginTop: '12px',
                    paddingTop: '8px',
                    fontSize: '12px',
                    color: '#666',
                    whiteSpace: 'pre-wrap',
                }}>
                    {content}
                </div>
            );

        case 'divider':
            return (
                <hr style={{
                    border: 'none',
                    borderTop: '1px solid #d0d0d0',
                    margin: '16px 0',
                }} />
            );

        default:
            return null;
    }
};

export default ArchiveHub;
