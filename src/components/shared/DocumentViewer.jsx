// src/components/shared/DocumentViewer.jsx
// 统一文档阅读器 — 根据文档类型自动切换渲染风格
//
// 支持 5 种风格:
// - typewriter: 打字机/1980s 文书
// - terminal:   终端/JSON 数据
// - blog:       2000s 博客
// - official:   官方文件/教学评估
// - modern:     现代文章/框架叙事

import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { archiveContents, getDocById } from '../../data/archiveDocuments.js';

// ============================================================
// 风格渲染器
// ============================================================

// --- 打字机风格 (1980s 文书) ---
const TypewriterRenderer = ({ doc }) => (
    <div style={{
        background: '#f5f0e8',
        border: '1px solid #c0b090',
        padding: '32px 40px',
        fontFamily: '"SimSun", "宋体", "楷体", serif',
        fontSize: '14px',
        lineHeight: 2.0,
        color: '#2a2015',
        boxShadow: 'inset 0 0 60px rgba(139,119,80,0.12)',
        position: 'relative',
    }}>
        {/* 纸张纹理叠加层 */}
        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(139,119,80,0.06) 28px, rgba(139,119,80,0.06) 29px)',
            pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
            {doc.sections.map((s, i) => (
                <SectionBlock key={i} section={s} styleName="typewriter" />
            ))}
        </div>
    </div>
);

// --- 终端风格 (1990s 数据泄漏) ---
const TerminalRenderer = ({ doc }) => (
    <div style={{
        background: '#0a0a0a',
        border: '2px solid #1a3a1a',
        padding: '20px 24px',
        fontFamily: '"Courier New", "SimSun", monospace',
        fontSize: '12px',
        lineHeight: 1.7,
        color: '#33cc33',
        boxShadow: 'inset 0 0 30px rgba(0,255,0,0.05)',
    }}>
        {/* 终端标题栏 */}
        <div style={{
            background: '#111',
            borderBottom: '1px solid #1a3a1a',
            padding: '4px 8px',
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#666',
        }}>
            <span>DATA_LEAK://{doc.metadata?.device || doc.metadata?.docNo || 'UNKNOWN'}</span>
            <span>[ENCRYPTED_CHANNEL]</span>
        </div>
        <div style={{
            color: '#666',
            marginBottom: '4px',
            fontSize: '10px',
        }}>
            $ cat /leaked/{doc.id}.log --decrypt --raw
        </div>
        {doc.sections.map((s, i) => (
            <SectionBlock key={i} section={s} styleName="terminal" />
        ))}
        <div style={{ color: '#33cc33', marginTop: '8px' }}>$ <Cursor /></div>
    </div>
);

// --- 博客风格 (2000s 早期博客) ---
const BlogRenderer = ({ doc }) => (
    <div style={{
        background: '#ffffff',
        border: '1px solid #d0d0d0',
        padding: '24px 32px',
        fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
        fontSize: '13px',
        lineHeight: 1.9,
        color: '#333',
    }}>
        {/* 博客头部 */}
        {doc.metadata?.date && (
            <div style={{
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid #eee',
            }}>
                <div style={{ fontSize: '11px', color: '#999' }}>
                    📅 {doc.metadata.date}
                    {doc.metadata?.tags && ` | 🏷️ ${doc.metadata.tags}`}
                    {doc.metadata?.views !== undefined && ` | 👁️ 阅读: ${doc.metadata.views}`}
                </div>
            </div>
        )}
        {doc.sections.map((s, i) => (
            <SectionBlock key={i} section={s} styleName="blog" />
        ))}
    </div>
);

// --- 官方文件风格 (教学评估、政府公文) ---
const OfficialRenderer = ({ doc }) => (
    <div style={{
        background: '#ffffff',
        border: '1px solid #999',
        padding: '28px 36px',
        fontFamily: '"SimSun", "宋体", "仿宋", serif',
        fontSize: '13px',
        lineHeight: 2.0,
        color: '#000',
    }}>
        {/* 红头标识 */}
        {doc.metadata?.docNo && (
            <div style={{
                textAlign: 'center',
                color: '#cc0000',
                fontSize: '11px',
                fontWeight: 'bold',
                borderBottom: '2px solid #cc0000',
                paddingBottom: '8px',
                marginBottom: '16px',
            }}>
                {doc.metadata.docNo}
            </div>
        )}
        {doc.sections.map((s, i) => (
            <SectionBlock key={i} section={s} styleName="official" />
        ))}
        {/* 公章占位 */}
        {doc.style === 'official' && (
            <div style={{
                textAlign: 'right',
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid #ccc',
                fontSize: '10px',
                color: '#999',
            }}>
                [公章]
            </div>
        )}
    </div>
);

// --- 现代风格 (2021 框架叙事) ---
const ModernRenderer = ({ doc }) => (
    <div style={{
        background: '#fafafa',
        padding: '28px 36px',
        fontFamily: '"Microsoft YaHei", "微软雅黑", "SimSun", sans-serif',
        fontSize: '14px',
        lineHeight: 2.0,
        color: '#222',
        maxWidth: '720px',
        margin: '0 auto',
    }}>
        {doc.sections.map((s, i) => (
            <SectionBlock key={i} section={s} styleName="modern" />
        ))}
    </div>
);

// ============================================================
// 段落渲染器
// ============================================================
const SectionBlock = ({ section, styleName }) => {
    const { type, content, level, attribution } = section;

    switch (type) {
        case 'heading': {
            const sizes = {
                typewriter: { 1: '20px', 2: '16px', 3: '14px' },
                terminal: { 1: '16px', 2: '14px', 3: '13px' },
                blog: { 1: '18px', 2: '15px', 3: '13px' },
                official: { 1: '18px', 2: '15px', 3: '13px' },
                modern: { 1: '22px', 2: '17px', 3: '14px' },
            };
            const colors = {
                typewriter: '#2a2015',
                terminal: '#44dd44',
                blog: '#003399',
                official: '#000',
                modern: '#111',
            };
            const borders = {
                official: level === 2 ? '1px solid #003399' : 'none',
                modern: level === 2 ? '2px solid #eee' : 'none',
            };
            return (
                <h3 style={{
                    fontSize: sizes[styleName]?.[level] || '16px',
                    fontWeight: 'bold',
                    color: colors[styleName] || '#000',
                    margin: level === 1 ? '24px 0 12px' : '16px 0 8px',
                    paddingBottom: borders[styleName] === 'none' ? 0 : '6px',
                    borderBottom: borders[styleName] || 'none',
                    fontFamily: styleName === 'terminal'
                        ? '"Courier New", monospace'
                        : 'inherit',
                }}>
                    {styleName === 'terminal' && '## '}
                    {content}
                </h3>
            );
        }

        case 'paragraph':
            return (
                <p style={{
                    margin: '0 0 12px 0',
                    textIndent: styleName === 'typewriter' || styleName === 'official' ? '2em' : 0,
                    whiteSpace: 'pre-wrap',
                }}>
                    {content}
                </p>
            );

        case 'quote':
            return (
                <blockquote style={{
                    margin: '12px 0',
                    padding: styleName === 'typewriter'
                        ? '8px 16px'
                        : '12px 20px',
                    borderLeft: styleName === 'terminal'
                        ? '2px solid #33cc33'
                        : '3px solid #999',
                    background: styleName === 'terminal'
                        ? 'rgba(0,255,0,0.03)'
                        : styleName === 'blog'
                            ? '#f8f8f0'
                            : 'transparent',
                    color: styleName === 'terminal' ? '#66dd66' : '#555',
                    fontStyle: 'italic',
                    whiteSpace: 'pre-wrap',
                    fontSize: styleName === 'typewriter' ? '13px' : 'inherit',
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

        case 'dialogue':
            return (
                <div style={{
                    margin: '4px 0',
                    padding: '4px 0 4px 16px',
                    borderLeft: section.speaker === '林远'
                        ? '3px solid #cc0000'
                        : '3px solid #003399',
                    fontSize: '12px',
                    lineHeight: 1.8,
                }}>
                    <strong style={{
                        color: section.speaker === '林远' ? '#cc0000' : '#003399',
                        marginRight: '8px',
                    }}>
                        {section.speaker}：
                    </strong>
                    <span style={{ whiteSpace: 'pre-wrap' }}>{section.content}</span>
                </div>
            );

        case 'field': {
            const highlight = section.highlight;
            return (
                <div style={{
                    display: 'flex',
                    margin: '2px 0',
                    fontSize: '12px',
                    lineHeight: 1.8,
                    background: highlight ? '#fff8e0' : 'transparent',
                    padding: highlight ? '2px 8px' : 0,
                    borderLeft: highlight ? '3px solid #cc0000' : 'none',
                }}>
                    <span style={{
                        color: '#666',
                        minWidth: '100px',
                        flexShrink: 0,
                        fontWeight: 'bold',
                    }}>
                        {section.label}：
                    </span>
                    <span style={{
                        color: highlight ? '#cc0000' : '#000',
                        fontWeight: highlight ? 'bold' : 'normal',
                    }}>
                        {section.value}
                    </span>
                </div>
            );
        }

        case 'table':
            return (
                <div style={{ margin: '10px 0', overflowX: 'auto' }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '11px',
                        border: '1px solid #999',
                    }}>
                        <thead>
                            <tr style={{
                                background: styleName === 'terminal' ? '#1a2a1a' : '#e8ecf4',
                            }}>
                                {section.headers.map((h, i) => (
                                    <th key={i} style={{
                                        padding: '4px 8px',
                                        border: '1px solid #999',
                                        textAlign: 'left',
                                        fontSize: '11px',
                                        color: styleName === 'terminal' ? '#33cc33' : '#003399',
                                    }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {section.rows.map((row, ri) => (
                                <tr key={ri} style={{
                                    background: ri % 2 === 0 ? '#fff' : '#f8f8f8',
                                }}>
                                    {row.map((cell, ci) => (
                                        <td key={ci} style={{
                                            padding: '4px 8px',
                                            border: '1px solid #d0d0d0',
                                        }}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case 'code':
            return (
                <pre style={{
                    background: '#0a0a0a',
                    color: '#33cc33',
                    padding: '16px',
                    fontSize: '11px',
                    lineHeight: 1.5,
                    overflow: 'auto',
                    maxHeight: '400px',
                    border: '1px solid #333',
                    fontFamily: '"Courier New", "SimSun", monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                }}>
                    {content}
                </pre>
            );

        case 'list':
            return (
                <ul style={{
                    margin: '6px 0 12px 20px',
                    padding: 0,
                    fontSize: '12px',
                    lineHeight: 1.9,
                }}>
                    {section.items.map((item, i) => (
                        <li key={i}>
                            {section.ordered ? `${i + 1}. ` : ''}{item}
                        </li>
                    ))}
                </ul>
            );

        case 'comment':
            return (
                <div style={{
                    margin: '8px 0',
                    padding: '8px 12px',
                    background: '#f5f5f5',
                    borderLeft: '3px solid #c0c0c0',
                    fontSize: '11px',
                    lineHeight: 1.6,
                    color: '#555',
                }}>
                    <div style={{ marginBottom: '4px' }}>
                        <strong>{section.author}</strong>
                        {section.date && (
                            <span style={{ color: '#999', marginLeft: '8px' }}>
                                {section.date}
                            </span>
                        )}
                    </div>
                    <div>{section.content}</div>
                </div>
            );

        case 'corruption':
            return (
                <div style={{
                    margin: '10px 0',
                    padding: '8px 12px',
                    background: '#fff8e8',
                    border: '1px dashed #cc8800',
                    fontSize: '11px',
                    color: '#cc8800',
                    fontFamily: styleName === 'terminal'
                        ? '"Courier New", monospace'
                        : 'inherit',
                }}>
                    ⚠ {content}
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
                    borderTop: styleName === 'terminal'
                        ? '1px dashed #1a3a1a'
                        : styleName === 'typewriter'
                            ? '1px solid #c0b090'
                            : '1px solid #d0d0d0',
                    margin: '12px 0',
                }} />
            );

        default:
            return null;
    }
};

// ============================================================
// 闪烁光标 (终端用)
// ============================================================
const Cursor = () => (
    <span style={{
        display: 'inline-block',
        width: '8px',
        height: '14px',
        background: '#33cc33',
        animation: 'blink 1s step-end infinite',
        verticalAlign: 'middle',
        marginLeft: '2px',
    }} />
);

// ============================================================
// 主组件
// ============================================================
const DocumentViewer = () => {
    const { docId } = useParams();
    const navigate = useNavigate();

    const docMeta = useMemo(() => getDocById(docId), [docId]);
    const docContent = useMemo(() => archiveContents[docId], [docId]);

    if (!docMeta || !docContent) {
        return (
            <div style={{
                backgroundColor: '#c0c0c0',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
            }}>
                <div className="win-window" style={{ width: '420px' }}>
                    <div className="win-titlebar">
                        <span className="title-text">⚠ 档案未找到</span>
                        <span>✕</span>
                    </div>
                    <div style={{ padding: '24px', textAlign: 'center', background: '#fff' }}>
                        <div style={{ fontSize: '40px', marginBottom: '12px' }}>📁</div>
                        <p style={{ fontSize: '13px', color: '#cc0000', marginBottom: '8px' }}>
                            请求的档案不存在于 local_mind.db 中。
                        </p>
                        <p style={{ fontSize: '11px', color: '#808080' }}>
                            该档案可能已被清道夫 (sweeper_daemon) 删除，
                            <br />
                            或从未被写入数据库。
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            style={{
                                marginTop: '16px',
                                padding: '4px 16px',
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
                            ← 返回
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 选择渲染器
    const renderers = {
        typewriter: TypewriterRenderer,
        terminal: TerminalRenderer,
        blog: BlogRenderer,
        official: OfficialRenderer,
        modern: ModernRenderer,
    };
    const Renderer = renderers[docMeta.style] || ModernRenderer;

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
                padding: '8px 20px',
                borderBottom: '3px solid #002266',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{
                            color: '#fff',
                            fontSize: '16px',
                            margin: 0,
                            fontWeight: 'normal',
                        }}>
                            📄 {docMeta.title}
                        </h1>
                        <div style={{ fontSize: '10px', color: '#aabbdd', marginTop: '2px' }}>
                            ID: {docId} | 年份: {docMeta.year} | 来源: {docMeta.source}
                        </div>
                    </div>
                    <div style={{ fontSize: '10px', color: '#aabbdd', textAlign: 'right' }}>
                        <div>local_mind.db → archives → {docMeta.category}</div>
                        <div>访问级别: {docMeta.accessLevel.toUpperCase()}</div>
                    </div>
                </div>
            </header>

            {/* === 导航栏 === */}
            <nav style={{
                background: '#e8ecf4',
                borderBottom: '1px solid #999',
                padding: '4px 20px',
                display: 'flex',
                gap: '16px',
                fontSize: '12px',
            }}>
                <Link to="/" style={{ color: '#003399' }}>🖥️ 桌面</Link>
                <Link to="/archives" style={{ color: '#003399' }}>📂 考古计划</Link>
                <span style={{ color: '#666' }}>›</span>
                <span style={{ color: '#333' }}>{docMeta.title}</span>
            </nav>

            {/* === 损坏警告 === */}
            {docMeta.corruptionLevel > 0 && (
                <div style={{
                    background: '#fff8e0',
                    borderBottom: '2px solid #cc8800',
                    padding: '6px 20px',
                    fontSize: '11px',
                    color: '#cc8800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <span>⚠️</span>
                    <span>
                        {docMeta.corruptionLevel === 1
                            ? '此文档部分内容无法恢复。以下为可读取的残存数据。'
                            : '此文档严重损坏。以下内容为碎片化恢复的残存数据，部分段落缺失。'}
                    </span>
                </div>
            )}

            {/* === 主内容区 === */}
            <main style={{
                maxWidth: '900px',
                margin: '16px auto',
                padding: '0 10px',
            }}>
                {/* 文档元信息卡 */}
                <div className="raised" style={{
                    background: '#ffffff',
                    padding: '12px 16px',
                    marginBottom: '12px',
                    fontSize: '11px',
                    color: '#666',
                    borderBottom: '2px solid #003399',
                }}>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        <span>📅 年份: <strong>{docMeta.year}</strong></span>
                        <span>📂 分类: <strong>{docMeta.category}</strong></span>
                        <span>📎 来源: <strong>{docMeta.source}</strong></span>
                        <span>🔒 级别: <strong>{docMeta.accessLevel}</strong></span>
                    </div>
                </div>

                {/* 文档内容 */}
                <div className="raised" style={{ marginBottom: '16px' }}>
                    <Renderer doc={docContent} />
                </div>

                {/* 档案说明 */}
                {docContent.archiveNote && (
                    <div style={{
                        background: '#f0f0f0',
                        border: '1px solid #d0d0d0',
                        padding: '12px 16px',
                        marginBottom: '16px',
                        fontSize: '11px',
                        lineHeight: 1.8,
                        color: '#666',
                    }}>
                        <div style={{
                            fontSize: '10px',
                            color: '#999',
                            marginBottom: '4px',
                            fontWeight: 'bold',
                        }}>
                            📋 档案说明（仅供考古计划参与者参考）：
                        </div>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {docContent.archiveNote}
                        </div>
                    </div>
                )}

                {/* 导航按钮 */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    marginBottom: '24px',
                }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            padding: '5px 18px',
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
                        ← 返回上一页
                    </button>
                    <Link
                        to="/archives"
                        style={{
                            padding: '5px 18px',
                            background: '#c0c0c0',
                            borderTop: '2px solid #fff',
                            borderLeft: '2px solid #fff',
                            borderRight: '2px solid #808080',
                            borderBottom: '2px solid #808080',
                            boxShadow: '1px 1px 0 #000',
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '12px',
                            fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                        }}
                    >
                        📂 考古计划索引
                    </Link>
                </div>
            </main>

            {/* === 底部版权 === */}
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
                    档案数据来源：互联网档案馆 | 医院内部系统泄漏 | BBS备份磁盘 | GitHub匿名上传
                </div>
                <div>
                    ⚠ 注意：部分档案的真实性尚未得到独立验证。考古计划不对以下内容的准确性承担责任。
                </div>
            </footer>

            {/* 闪烁光标 CSS */}
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default DocumentViewer;
