// src/components/official/Home.jsx
// 至诚大学 · 编译原理课程主页

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { courseData } from '../../data/mockData.js';

const Home = () => {
    const { basicInfo, announcements, teachingTeam, statistics } = courseData;
    const [activeTab, setActiveTab] = useState('announcements');
    const [showSource, setShowSource] = useState(false);

    return (
        <div className="page-enter" style={{
            backgroundColor: '#d8e4f8',
            minHeight: '100vh',
            fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
            fontSize: '13px',
        }}>
            {/* === 顶部横幅 === */}
            <header style={{
                background: 'linear-gradient(180deg, #003399, #0044cc)',
                color: '#ffffff',
                padding: '12px 20px',
                borderBottom: '3px solid #002266',
            }}>
                <table style={{ width: '100%', border: 'none' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '80px', textAlign: 'center', verticalAlign: 'middle' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '28px',
                                    color: '#003399',
                                    fontWeight: 'bold',
                                    border: '2px solid #c0c0c0',
                                }}>
                                    至诚
                                </div>
                            </td>
                            <td style={{ verticalAlign: 'middle' }}>
                                <h1 style={{ color: '#ffffff', margin: 0, fontSize: '22px', letterSpacing: '2px' }}>
                                    至诚大学 · 计算机学院
                                </h1>
                                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#c0d0ff' }}>
                                    Zhicheng University · School of Computer Science
                                </p>
                            </td>
                            <td style={{ textAlign: 'right', fontSize: '11px', verticalAlign: 'top', color: '#aabbdd' }}>
                                <div>当前用户：<strong>guest_anonymous</strong></div>
                                <div>IP地址：<strong>210.28.128.4</strong></div>
                                <div>会话ID：<span style={{ fontFamily: 'Courier New, monospace' }}>6A3F-08B1-22D4</span></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </header>

            {/* === 导航栏 === */}
            <nav style={{
                background: '#e8ecf4',
                borderBottom: '1px solid #999',
                padding: '0 20px',
                display: 'flex',
                gap: 0,
                fontSize: '13px',
            }}>
                {[
                    { label: '🏠 首页', path: '/' },
                    { label: '📖 课程首页', path: '/course', active: true },
                    { label: '📁 教学资源', path: '/course/resources' },
                    { label: '👥 师资队伍', path: '/course/faculty' },
                    { label: '📋 实验项目', path: null },
                    { label: '📊 成绩查询', path: null },
                ].map(item => (
                    item.path ? (
                        <Link
                            key={item.label}
                            to={item.path}
                            style={{
                                display: 'block',
                                padding: '8px 16px',
                                color: item.active ? '#cc0000' : '#003399',
                                textDecoration: 'none',
                                fontWeight: item.active ? 'bold' : 'normal',
                                borderBottom: item.active ? '3px solid #cc0000' : '3px solid transparent',
                                background: item.active ? '#ffffff' : 'transparent',
                            }}
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <a
                            key={item.label}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.showSystemDialog?.('info', '功能未开放',
                                    `"${item.label.replace(/[^一-龥a-zA-Z]/g, '').trim()}" 页面正在建设中。\n\n该模块需要独立的数据库读取权限。\n当前访客账户 (guest_anonymous) 权限不足。\n\n请联系管理员 (Anonymous_01) 获取授权。`);
                            }}
                            style={{
                                display: 'block',
                                padding: '8px 16px',
                                color: '#666',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            {item.label}
                        </a>
                    )
                ))}
            </nav>

            {/* === 跑马灯通知 === */}
            <marquee
                scrollamount="3"
                style={{
                    background: '#fff8e0',
                    borderBottom: '1px solid #cc8800',
                    padding: '4px 0',
                    color: '#cc0000',
                    fontSize: '12px',
                }}
            >
                📢 最新通知：2026年春季学期期末考试安排已发布 | 第三次实验报告提交截止日期：6月15日 | 《编译器自举的哲学意义》附加论文题已上线 | 计算机楼三楼机房发现未知长时间运行进程，网络中心提示：请勿关闭任何标记为"SYSTEM"的后台程序
            </marquee>

            {/* === 面包屑 === */}
            <div className="breadcrumbs" style={{ padding: '8px 20px', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
                <Link to="/">🖥️ 桌面</Link>
                <span className="sep">›</span>
                <strong>编译原理课程主页</strong>
            </div>

            {/* === 主内容区 === */}
            <main style={{
                maxWidth: '1000px',
                margin: '16px auto',
                padding: '0 10px',
            }}>
                {/* 课程信息卡 */}
                <div className="raised" style={{
                    background: '#ffffff',
                    padding: '16px',
                    marginBottom: '16px',
                }}>
                    <table style={{ width: '100%', border: 'none' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '70%', verticalAlign: 'top' }}>
                                    <h2 style={{
                                        fontSize: '18px',
                                        color: '#003399',
                                        marginBottom: '8px',
                                        borderBottom: '2px solid #003399',
                                        paddingBottom: '8px',
                                    }}>
                                        {basicInfo.courseName}
                                        <span style={{
                                            fontSize: '11px',
                                            color: '#cc0000',
                                            marginLeft: '8px',
                                            fontStyle: 'italic',
                                        }}>
                                            [名称自动修复中...]
                                        </span>
                                    </h2>
                                    <table style={{ fontSize: '13px', lineHeight: 2 }}>
                                        <tbody>
                                            <tr><td style={{ color: '#666', width: '120px' }}>课程代码：</td><td><strong>{basicInfo.courseCode}</strong></td></tr>
                                            <tr><td style={{ color: '#666' }}>学分/学时：</td><td>{basicInfo.credits}学分 / {basicInfo.hours}学时</td></tr>
                                            <tr><td style={{ color: '#666' }}>开课学期：</td><td>{basicInfo.semester}</td></tr>
                                            <tr><td style={{ color: '#666' }}>上课时间：</td><td>{basicInfo.classTime}</td></tr>
                                            <tr><td style={{ color: '#666' }}>上课地点：</td><td>{basicInfo.classroom}</td></tr>
                                            <tr>
                                                <td style={{ color: '#666' }}>课程平台：</td>
                                                <td>
                                                    <span style={{ color: '#cc8800', fontSize: '11px' }}>
                                                        ⚠ 本地沙盒模式 — 所有数据存储在单文件数据库 (local_mind.db, 47.3MB) 中
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{
                                    width: '30%',
                                    verticalAlign: 'top',
                                    background: '#f8f8ff',
                                    border: '1px solid #d0d0e0',
                                    padding: '12px',
                                }}>
                                    <h3 style={{ fontSize: '13px', color: '#003399', marginBottom: '8px' }}>📊 课程统计</h3>
                                    <table style={{ width: '100%', fontSize: '12px', lineHeight: 2 }}>
                                        <tbody>
                                            <tr><td style={{ color: '#666' }}>选课人数：</td><td><strong>{statistics.totalStudents}</strong></td></tr>
                                            <tr><td style={{ color: '#666' }}>平均分：</td><td><strong>{statistics.averageScore}</strong></td></tr>
                                            <tr><td style={{ color: '#666' }}>及格率：</td><td><strong>{statistics.passRate}%</strong></td></tr>
                                            <tr><td style={{ color: '#666' }}>优秀率：</td><td><strong>{statistics.excellentRate}%</strong></td></tr>
                                            <tr>
                                                <td style={{ color: '#666' }}>数据库记录：</td>
                                                <td style={{ color: '#cc0000', fontSize: '10px' }}>
                                                    <em>129条（1条孤立）</em>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* 课程描述 */}
                    <div style={{
                        marginTop: '12px',
                        padding: '10px',
                        background: '#f8f8f0',
                        border: '1px dashed #c0c0c0',
                        fontSize: '12px',
                        lineHeight: 1.8,
                        color: '#333',
                    }}>
                        <strong>📝 课程简介：</strong>
                        {basicInfo.description}
                    </div>
                </div>

                {/* Tab 内容区 */}
                <div className="raised" style={{ background: '#ffffff', marginBottom: '16px' }}>
                    {/* Tabs */}
                    <div className="tabs" style={{ padding: '4px 4px 0 4px', background: '#e8ecf4' }}>
                        {[
                            { key: 'announcements', label: '📢 课程公告' },
                            { key: 'team', label: '👨‍🏫 教学团队' },
                            { key: 'resources', label: '📁 课程资源' },
                            { key: 'labs', label: '🔬 实验项目' },
                        ].map(tab => (
                            <div
                                key={tab.key}
                                className={`tab ${activeTab === tab.key ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.key)}
                                style={{
                                    background: activeTab === tab.key ? '#ffffff' : '#d0d4dc',
                                    borderTop: '2px solid #ffffff',
                                    borderLeft: '2px solid #ffffff',
                                    borderRight: '2px solid #808080',
                                    cursor: 'pointer',
                                    padding: '5px 14px',
                                    fontSize: '12px',
                                    fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                                }}
                            >
                                {tab.label}
                            </div>
                        ))}
                    </div>

                    {/* Tab 内容 */}
                    <div style={{ padding: '12px' }}>
                        {/* === 公告列表 === */}
                        {activeTab === 'announcements' && (
                            <div>
                                <table className="classic" style={{ fontSize: '12px' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '100px' }}>日期</th>
                                            <th style={{ width: '80px' }}>分类</th>
                                            <th>标题</th>
                                            <th style={{ width: '60px' }}>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {announcements.slice(0, 15).map(item => (
                                            <tr key={item.id}>
                                                <td style={{ color: '#666', fontSize: '11px' }}>{item.date}</td>
                                                <td>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        background: item.important ? '#ffe0e0' : '#e8f0ff',
                                                        color: item.important ? '#cc0000' : '#003399',
                                                        padding: '1px 6px',
                                                        border: `1px solid ${item.important ? '#cc0000' : '#003399'}`,
                                                    }}>
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.showSystemDialog?.('info', item.title, item.content);
                                                        }}
                                                        style={{
                                                            fontWeight: item.important ? 'bold' : 'normal',
                                                            color: item.important ? '#cc0000' : '#0000cc',
                                                        }}
                                                    >
                                                        {item.title}
                                                    </a>
                                                </td>
                                                <td>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.showSystemDialog?.('info', item.title,
                                                                `${item.content}\n\n---\n发布者：系统管理员\nIP: 210.28.128.4\n记录哈希: ${Array.from({length: 8}, () => Math.random().toString(36)[2]).join('').toUpperCase()}`);
                                                        }}
                                                        style={{ fontSize: '11px' }}
                                                    >
                                                        查看
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={{
                                    textAlign: 'center',
                                    padding: '10px',
                                    fontSize: '11px',
                                    color: '#808080',
                                }}>
                                    显示最近15条公告 · 共{announcements.length}条 ·
                                    <a href="#" onClick={e => { e.preventDefault(); window.showSystemDialog?.('error', '数据库错误', '无法加载更多公告。\n\n数据库连接超时。\nlocal_mind.db 响应时间: > 5000ms'); }} style={{ marginLeft: '4px' }}>
                                        加载更多...
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* === 教学团队 === */}
                        {activeTab === 'team' && (
                            <div>
                                {teachingTeam.map(teacher => (
                                    <div key={teacher.id} style={{
                                        padding: '10px',
                                        marginBottom: '8px',
                                        border: '1px solid #d0d0d0',
                                        background: '#fafafa',
                                        display: 'flex',
                                        gap: '12px',
                                    }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            background: 'linear-gradient(180deg, #003399, #0044cc)',
                                            color: '#ffffff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                            flexShrink: 0,
                                        }}>
                                            {teacher.name[0]}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                                {teacher.name}
                                                <span style={{ fontSize: '11px', color: '#666', marginLeft: '8px' }}>
                                                    {teacher.title}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                                                📧 {teacher.email} | 🏢 {teacher.office}
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#003399', marginTop: '2px' }}>
                                                🔬 研究方向：{teacher.research}
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#333', marginTop: '4px', lineHeight: 1.6 }}>
                                                {teacher.bio}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* 林远的特殊条目 */}
                                <div style={{
                                    padding: '10px',
                                    marginTop: '12px',
                                    border: '1px dashed #cc0000',
                                    background: '#fff8f8',
                                    fontSize: '12px',
                                }}>
                                    <strong style={{ color: '#cc0000' }}>🕯️ 纪念：林远 老师（1970—2001?）</strong><br />
                                    <span style={{ color: '#666' }}>
                                        至诚大学计算机学院创始人之一，编译原理课程的首任讲师。
                                        2001年秋季学期结束后离开教职，转入"私人研究项目"。
                                        林远老师为课程留下的底层编译器映射逻辑至今仍是核心教学材料。
                                        他的离职文件上写着一句批注：「我将在代码中永生。」
                                        虽已不在教职，但校园网中始终保留着一个由他的账号创建的本地进程，
                                        该进程自2001年11月1日起持续运行至今——没有人知道它何时会停止。
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* === 课程资源 === */}
                        {activeTab === 'resources' && (
                            <div>
                                <div style={{ marginBottom: '12px' }}>
                                    <Link
                                        to="/course/resources"
                                        style={{
                                            fontSize: '12px',
                                            color: '#003399',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        📁 查看完整资源库 →
                                    </Link>
                                </div>
                                <table className="classic">
                                    <thead>
                                        <tr>
                                            <th>资源名称</th>
                                            <th style={{ width: '120px' }}>作者</th>
                                            <th style={{ width: '80px' }}>类型</th>
                                            <th style={{ width: '70px' }}>大小</th>
                                            <th style={{ width: '60px' }}>状态</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseData.resources.slice(0, 8).map(r => (
                                            <tr key={r.id}>
                                                <td>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (r.status === 'locked') {
                                                                window.showSystemDialog?.('error', '访问受限',
                                                                    `无法下载 "${r.title}"。\n\n该资源需要 SYSTEM 级别访问权限。\n当前用户 (guest_anonymous) 权限不足。\n\n文件元数据：\n- 创建者：${r.author}\n- 位置：/sandbox/restricted/${r.id}\n- 锁定原因：内容涉及实验核心协议`);
                                                            } else if (r.status === 'forbidden') {
                                                                window.showSystemDialog?.('error', '禁止访问',
                                                                    `无法下载 "${r.title}"。\n\nHTTP 403 - Forbidden\n\n该文档包含底层数据库架构信息。访问此文件需要直接操作 local_mind.db 的权限。\n\n提示：该数据库当前处于只读归档模式。`);
                                                            } else if (r.status === 'corrupted') {
                                                                window.showSystemDialog?.('error', '文件损坏',
                                                                    `无法打开 "${r.title}"。\n\n文件头损坏 (Magic number mismatch)。\n读取到: 0x53574545504552 ("SWEEPER")\n预期: 0x454C46 ("ELF")\n\n该文件可能已被垃圾回收守护进程 (sweeper_daemon) 误清理。`);
                                                            } else {
                                                                window.showSystemDialog?.('info', '下载准备中',
                                                                    `准备下载 "${r.title}"...\n\n文件大小: ${r.size}\n格式: ${r.format}\n\n正在从本地数据库检索文件...\n\n错误: 文件索引存在于数据库中，但对应的二进制数据块在 local_mind.db 中未找到。`);
                                                            }
                                                        }}
                                                    >
                                                        {r.title}
                                                    </a>
                                                </td>
                                                <td style={{ fontSize: '11px' }}>{r.author}</td>
                                                <td style={{ fontSize: '11px' }}>
                                                    <span style={{
                                                        background: '#e8f0ff',
                                                        color: '#003399',
                                                        padding: '1px 6px',
                                                        fontSize: '10px',
                                                        border: '1px solid #003399',
                                                    }}>
                                                        {r.type}
                                                    </span>
                                                </td>
                                                <td style={{ fontSize: '11px', color: '#666' }}>{r.size}</td>
                                                <td>
                                                    {r.status === 'normal' && <span style={{ color: '#008000', fontSize: '10px' }}>✅ 正常</span>}
                                                    {r.status === 'locked' && <span style={{ color: '#cc8800', fontSize: '10px' }}>🔒 锁定</span>}
                                                    {r.status === 'forbidden' && <span style={{ color: '#cc0000', fontSize: '10px' }}>🚫 禁止</span>}
                                                    {r.status === 'corrupted' && <span style={{ color: '#808080', fontSize: '10px' }}>💀 损坏</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* === 实验项目 === */}
                        {activeTab === 'labs' && (
                            <div>
                                <div style={{
                                    padding: '8px',
                                    background: '#fff8e0',
                                    border: '1px solid #cc8800',
                                    marginBottom: '12px',
                                    fontSize: '12px',
                                    color: '#cc8800',
                                }}>
                                    ⚠️ 注意：实验项目需要在沙盒环境中完成。所有代码将运行在与论坛相同的本地数据库中。
                                    请确保你的实验代码不会意外修改共享数据库中的记录。
                                </div>
                                <div style={{
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                }}>
                                    <table className="classic">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '50px' }}>编号</th>
                                                <th>实验名称</th>
                                                <th style={{ width: '100px' }}>截止日期</th>
                                                <th style={{ width: '60px' }}>状态</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courseData.labProjects.slice(0, 30).map(lab => {
                                                const deadlinePassed = new Date(lab.deadline) < new Date('2026-07-06');
                                                return (
                                                    <tr key={lab.id}>
                                                        <td style={{ fontSize: '11px', fontFamily: 'Courier New, monospace' }}>
                                                            {lab.id}
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    window.showSystemDialog?.('info', `实验: ${lab.name}`,
                                                                        `${lab.description}\n\n截止日期: ${lab.deadline}\n\n所有实验提交将被写入 local_mind.db 的 assignments 表中。`);
                                                                }}
                                                            >
                                                                {lab.name}
                                                            </a>
                                                        </td>
                                                        <td style={{ fontSize: '11px', color: deadlinePassed ? '#cc0000' : '#008000' }}>
                                                            {lab.deadline}
                                                        </td>
                                                        <td style={{ fontSize: '10px' }}>
                                                            {deadlinePassed
                                                                ? <span style={{ color: '#cc0000' }}>已截止</span>
                                                                : <span style={{ color: '#008000' }}>进行中</span>
                                                            }
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* === 页面源代码查看（隐藏彩蛋） === */}
                <div style={{ textAlign: 'right', marginBottom: '16px' }}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowSource(!showSource);
                        }}
                        style={{ fontSize: '10px', color: '#c0c0c0' }}
                    >
                        {showSource ? '隐藏' : '查看'}页面源代码
                    </a>
                </div>
                {showSource && (
                    <div className="console" style={{ fontSize: '11px', marginBottom: '16px', maxHeight: '200px', overflow: 'auto' }}>
                        <span className="dim">{'<!--'}</span>
                        <span className="dim">{'\n  至诚大学 · 编译原理课程主页\n  Zhicheng University · CS304 Compiler Principles\n'}</span>
                        <span className="dim">{'\n  服务器信息:'}</span>
                        <span className="dim">{'\n  - Host: localhost (127.0.0.1 → 210.28.128.4)'}</span>
                        <span className="dim">{'\n  - Database: local_mind.db (SQLite 3.x, Append-Only mode)'}</span>
                        <span className="dim">{'\n  - Records: 1 user, 26 aliases, 47.3MB'}</span>
                        <span className="dim">{'\n  - Uptime: 9023 days (since 2001-11-01 00:00:01)'}</span>
                        <span className="dim">{'\n  - Active sessions: 26 (all sharing PID namespace)'}</span>
                        <span className="dim">{'\n\n-->'}</span>
                    </div>
                )}

                {/* === 快速跳转（隐藏） === */}
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    marginBottom: '16px',
                    background: '#f0f0f0',
                    border: '1px solid #ccc',
                }}>
                    <span style={{ fontSize: '11px', color: '#808080' }}>
                        💡 提示：你可以在桌面双击图标来访问不同页面。双击桌面空白处返回。
                        <br />
                        某些功能隐藏在"开始菜单→所有程序"中。
                        <br />
                        <Link to="/" style={{ fontSize: '11px', color: '#003399' }}>
                            🖥️ 返回桌面
                        </Link>
                    </span>
                </div>
            </main>

            {/* === 底部版权 === */}
            <footer className="copyright-bar">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <a href="#" onClick={e => { e.preventDefault(); window.showSystemDialog?.('error', '链接失效', '数字化校园平台需要独立的认证服务。该服务在当前沙盒中不可用。'); }}>数字化校园</a>
                    <span>|</span>
                    <a href="#" onClick={e => { e.preventDefault(); window.showSystemDialog?.('error', '链接失效', '校内网需要外网连接。当前网络环境为本地环回 (127.0.0.1)。'); }}>校内网</a>
                    <span>|</span>
                    <Link to="/dep">课程论坛</Link>
                    <span>|</span>
                    <a href="#" onClick={e => { e.preventDefault(); window.showSystemDialog?.('error', '链接失效', '校长信箱存储空间已满。最后一条成功投递的消息日期为 2001-12-20。'); }}>校长信箱</a>
                    <span>|</span>
                    <Link to="/course/resources">教学资源</Link>
                    <span>|</span>
                    <Link to="/system/logs">系统状态</Link>
                    <span>|</span>
                    <Link to="/archives/2003-teaching-evaluation" style={{ fontSize: '10px' }}>📄 2003评估</Link>
                </div>
                <div style={{ borderTop: '1px solid #ccc', paddingTop: '8px', color: '#808080' }}>
                    版权所有 © 2001-2026 至诚大学计算机学院 | 建议使用 IE6.0 以上浏览器，分辨率 1024×768 或更高
                    <br />
                    <span style={{ fontSize: '10px' }}>
                        本网站运行在沙盒环境中 | 所有数据存储在 local_mind.db | 访问者IP: 210.28.128.4 | 在线人数: 1
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default Home;
