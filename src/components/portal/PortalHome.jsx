// src/components/portal/PortalHome.jsx
// 至诚大学 · 门户首页
//
// 这是一个真实存在的大学门户网站首页，而不是"游戏桌面"。
// 页面上的一切都应当是这所学校会展示的内容：
// 新闻、公告、部门链接、公共服务。
// 违和感只以真实世界的方式存在（异常的通知、奇怪的链接、
// 不合理的日期），绝不以"游戏提示"的形式出现。

import { Link } from 'react-router-dom';
import { useState } from 'react';

const PortalHome = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const today = '2026年7月21日 星期二';

    // 新闻列表（部分真实新闻，部分微妙异常）
    const news = [
        { date: '2026-06-20', tag: '综合', title: '计算机学院举办"代码完整性校验"专题研讨会', important: false },
        { date: '2026-06-08', tag: '教务', title: '关于2026年春季学期期末考核安排的通知', important: false },
        { date: '2025-12-15', tag: '公告', title: '林远纪念讲座：认知架构与编译器设计的交叉领域', important: false },
        { date: '2024-09-08', tag: '教务', title: '2024秋季学期教材《现代编译技术》第3版领取通知', important: false },
        { date: '2020-11-12', tag: '后勤', title: '计算机楼三楼机房设备检修通知', important: false },
        { date: '2017-06-25', tag: '教务', title: '关于毕业资格审核中异常学籍记录的说明', important: false },
        { date: '2012-03-22', tag: '后勤', title: '多媒体教室（A301）使用注意事项', important: false },
        { date: '2008-06-09', tag: '保卫', title: '暑期机房使用特别规定', important: false },
    ];

    // 公告（带一条微妙的异常）
    const notices = [
        { date: '2026-06-11', title: '关于"代码完整性校验"专题研讨会的通知', from: '计算机学院' },
        { date: '2026-06-08', title: '第三次实验报告提交提醒', from: '教务办公室' },
        { date: '2025-12-20', title: '期末课程结课考核安排通知', from: '教务处' },
        { date: '2023-11-22', title: '期中教学检查——课程评价匿名问卷', from: '教学质量评估中心' },
        { date: '2014-09-05', title: '图书借阅逾期：《忒修斯之船：人格同一性问题》长期未归还', from: '图书馆' },
        { date: '2001-12-08', title: '关于林远老师离任教学岗位的说明', from: '计算机学院' },
    ];

    // 快速链接（公共服务/教学）
    const quickLinks = [
        { label: '编译原理课程', path: '/course', desc: 'CS304 · 计算机学院' },
        { label: '教学资源库', path: '/course/resources', desc: '课程资料下载' },
        { label: '师资队伍', path: '/course/faculty', desc: '计算机学院教师名录' },
    ];

    // 其他入口（不显眼，需自行发现）
    const otherLinks = [
        { label: '课程论坛', path: '/dep' },
        { label: '档案检索', path: '/archives' },
        { label: '系统诊断', path: '/system/logs' },
    ];

    const handleSearch = () => {
        window.showSystemDialog?.('info', '站内搜索',
            `正在搜索 "${searchQuery || '……'}"……\n\n搜索结果: 0 条。\n\n该搜索只检索校园网内已索引的页面。\n如需更多内容，请直接访问相关站点。`);
    };

    return (
        <div style={{
            background: '#e8ecf4',
            minHeight: '100%',
            fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
            fontSize: '13px',
        }}>
            {/* ============ 顶部：学校横幅 ============ */}
            <header style={{
                background: 'linear-gradient(180deg, #003399, #0044cc)',
                color: '#ffffff',
                padding: '10px 20px',
                borderBottom: '3px solid #002266',
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: '#ffffff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '26px',
                        color: '#003399',
                        fontWeight: 'bold',
                        border: '2px solid #c0c0c0',
                        flexShrink: 0,
                    }}>
                        至诚
                    </div>
                    <div style={{ flex: 1 }}>
                        <h1 style={{
                            color: '#ffffff',
                            margin: 0,
                            fontSize: '22px',
                            letterSpacing: '3px',
                            fontWeight: 'bold',
                        }}>
                            至诚大学
                        </h1>
                        <div style={{ fontSize: '11px', color: '#c0d0ff', marginTop: '2px' }}>
                            ZHICHENG UNIVERSITY · 始建于1985年 · 全国重点建设高校
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(255,255,255,0.12)',
                        padding: '4px 8px',
                        borderRadius: '3px',
                    }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                            placeholder="站内搜索"
                            style={{
                                width: '140px',
                                fontSize: '11px',
                                padding: '3px 6px',
                                border: '1px solid #88a0cc',
                                background: '#ffffff',
                                outline: 'none',
                            }}
                        />
                        <button
                            onClick={handleSearch}
                            style={{
                                fontSize: '11px',
                                padding: '3px 10px',
                                minWidth: 'unset',
                                cursor: 'pointer',
                            }}
                        >
                            搜索
                        </button>
                    </div>
                    <div style={{ fontSize: '10px', color: '#aabbdd', textAlign: 'right', lineHeight: 1.6 }}>
                        <div>{today}</div>
                        <div>您好，访客</div>
                    </div>
                </div>
            </header>

            {/* ============ 主导航 ============ */}
            <nav style={{
                background: '#003377',
                borderBottom: '3px solid #002255',
            }}>
                <div style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    display: 'flex',
                    fontSize: '13px',
                }}>
                    {['学校概况', '机构设置', '师资队伍', '人才培养', '科学研究', '招生就业', '公共服务'].map((item, i) => (
                        <div key={item} style={{
                            padding: '8px 18px',
                            color: '#e0ecff',
                            cursor: 'pointer',
                            background: i === 0 ? 'rgba(255,255,255,0.15)' : 'transparent',
                            borderLeft: '1px solid #114488',
                        }}
                            onClick={() => window.showSystemDialog?.('info', item,
                                i === 2
                                    ? '师资队伍页面已迁移至：计算机学院 → 师资队伍。'
                                    : `${item}栏目正在建设中。\n\n如有疑问请联系学校办公室。`)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </nav>

            {/* ============ 内容区 ============ */}
            <main style={{
                maxWidth: '1100px',
                margin: '14px auto',
                padding: '0 12px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
            }}>
                {/* ---------- 左栏：新闻 + 公告 ---------- */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* 新闻中心 */}
                    <div style={{
                        background: '#ffffff',
                        border: '1px solid #c0c8d8',
                        marginBottom: '12px',
                    }}>
                        <div style={{
                            background: 'linear-gradient(180deg, #f0f4fa, #dce4f0)',
                            borderBottom: '2px solid #003399',
                            padding: '6px 12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <span style={{ fontWeight: 'bold', color: '#003399', fontSize: '13px' }}>
                                新闻中心
                            </span>
                            <span style={{ fontSize: '10px', color: '#888' }}>更多»</span>
                        </div>
                        <div style={{ padding: '6px 10px' }}>
                            {news.map((n, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '5px 4px',
                                    borderBottom: i < news.length - 1 ? '1px dotted #e0e4ec' : 'none',
                                    fontSize: '12px',
                                }}>
                                    <span style={{
                                        fontSize: '9px',
                                        padding: '1px 5px',
                                        background: n.important ? '#ffe0e0' : '#e8f0ff',
                                        color: n.important ? '#cc0000' : '#003399',
                                        border: `1px solid ${n.important ? '#cc0000' : '#003399'}`,
                                        flexShrink: 0,
                                    }}>
                                        {n.tag}
                                    </span>
                                    <span style={{
                                        flex: 1,
                                        color: '#222',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        cursor: 'pointer',
                                    }}
                                        onClick={() => window.showSystemDialog?.('info', n.title,
                                            `[${n.date}] ${n.title}\n\n来源：至诚大学新闻网\n\n(本条新闻正文暂不可用。\n校园新闻数据库自2019年起仅保留标题索引。)`)}
                                    >
                                        {n.title}
                                    </span>
                                    <span style={{
                                        fontSize: '10px',
                                        color: '#999',
                                        fontFamily: 'Tahoma, sans-serif',
                                        flexShrink: 0,
                                    }}>
                                        {n.date.slice(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 通知公告 */}
                    <div style={{
                        background: '#ffffff',
                        border: '1px solid #c0c8d8',
                    }}>
                        <div style={{
                            background: 'linear-gradient(180deg, #f0f4fa, #dce4f0)',
                            borderBottom: '2px solid #003399',
                            padding: '6px 12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <span style={{ fontWeight: 'bold', color: '#003399', fontSize: '13px' }}>
                                通知公告
                            </span>
                            <span style={{ fontSize: '10px', color: '#888' }}>更多»</span>
                        </div>
                        <div style={{ padding: '6px 10px' }}>
                            {notices.map((n, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '5px 4px',
                                    borderBottom: i < notices.length - 1 ? '1px dotted #e0e4ec' : 'none',
                                    fontSize: '12px',
                                }}>
                                    <span style={{
                                        width: '70px',
                                        fontSize: '10px',
                                        color: '#666',
                                        fontFamily: 'Tahoma, sans-serif',
                                        flexShrink: 0,
                                    }}>
                                        {n.date}
                                    </span>
                                    <span style={{
                                        flex: 1,
                                        color: n.title.includes('忒修斯')
                                            ? '#cc0000'
                                            : n.title.includes('林远')
                                                ? '#333'
                                                : '#003399',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                        onClick={() => window.showSystemDialog?.('info', n.title,
                                            `[${n.date}] ${n.title}\n\n发布单位：${n.from}\n\n公告全文存储于校园网通知数据库。\n该数据库与课程平台共用同一存储分区，\n部分早期记录可能无法完整读取。`)}
                                    >
                                        {n.title}
                                    </span>
                                    <span style={{
                                        fontSize: '9px',
                                        color: '#aaa',
                                        flexShrink: 0,
                                    }}>
                                        {n.from}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---------- 右栏：快速链接 ---------- */}
                <div style={{
                    width: '300px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}>
                    {/* 快速链接 */}
                    <div style={{
                        background: '#ffffff',
                        border: '1px solid #c0c8d8',
                    }}>
                        <div style={{
                            background: 'linear-gradient(180deg, #f0f4fa, #dce4f0)',
                            borderBottom: '2px solid #003399',
                            padding: '6px 12px',
                        }}>
                            <span style={{ fontWeight: 'bold', color: '#003399', fontSize: '13px' }}>
                                快速链接
                            </span>
                        </div>
                        <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {quickLinks.map(l => (
                                <Link
                                    key={l.path}
                                    to={l.path}
                                    style={{
                                        display: 'block',
                                        padding: '8px 10px',
                                        background: '#f4f7fb',
                                        border: '1px solid #d0d8e4',
                                        color: '#003399',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{l.label}</div>
                                    <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
                                        {l.desc}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 校内站点（部分不对外公开） */}
                    <div style={{
                        background: '#ffffff',
                        border: '1px solid #c0c8d8',
                    }}>
                        <div style={{
                            background: 'linear-gradient(180deg, #f0f4fa, #dce4f0)',
                            borderBottom: '2px solid #003399',
                            padding: '6px 12px',
                        }}>
                            <span style={{ fontWeight: 'bold', color: '#003399', fontSize: '13px' }}>
                                校内站点
                            </span>
                        </div>
                        <div style={{ padding: '8px 10px', fontSize: '11px', lineHeight: 2 }}>
                            {otherLinks.map(l => (
                                <Link
                                    key={l.path}
                                    to={l.path}
                                    style={{
                                        color: '#666',
                                        textDecoration: 'none',
                                        display: 'block',
                                        padding: '2px 6px',
                                    }}
                                >
                                    {l.label} ›
                                </Link>
                            ))}
                            <div style={{ color: '#ccc', padding: '2px 6px' }}>
                                数字化校园平台 <span style={{ fontSize: '9px' }}>(内网)</span>
                            </div>
                            <div style={{ color: '#ccc', padding: '2px 6px' }}>
                                校长信箱 <span style={{ fontSize: '9px' }}>(维护中)</span>
                            </div>
                        </div>
                    </div>

                    {/* 校园公告牌（跑马灯） */}
                    <div style={{
                        background: '#ffffff',
                        border: '1px solid #c0c8d8',
                        padding: '8px 10px',
                        fontSize: '11px',
                        color: '#555',
                        lineHeight: 1.8,
                    }}>
                        <div style={{ fontWeight: 'bold', color: '#003399', marginBottom: '4px' }}>
                            📌 温馨提示
                        </div>
                        <div>
                            1. 校园网采用实名认证，请勿将账号借予他人。
                            <br />
                            2. 计算机楼三楼机房于每日22:00关闭，请提前保存资料。
                            <br />
                            3. 如遇页面无法打开，请稍后再试，或将情况反映至网络中心。
                        </div>
                    </div>
                </div>
            </main>

            {/* ============ 底部 ============ */}
            <footer style={{
                background: '#dce4f0',
                borderTop: '2px solid #8090b0',
                padding: '14px 20px 40px',
                textAlign: 'center',
                fontSize: '11px',
                color: '#778',
                lineHeight: 1.9,
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => window.showSystemDialog?.('info', '联系我们', '至诚大学地址：\n（此处信息已被系统删除）')}>联系我们</span>
                    <span>|</span>
                    <span style={{ cursor: 'pointer' }} onClick={() => window.showSystemDialog?.('info', '友情链接', '友情链接列表为空。\n\n（所有外部链接已于某次系统维护中被移除）')}>友情链接</span>
                    <span>|</span>
                    <span style={{ cursor: 'pointer' }} onClick={() => window.showSystemDialog?.('info', '版权声明', '本网站所有内容版权归至诚大学所有。')}>版权声明</span>
                </div>
                <div>
                    版权所有 © 2001-2026 至诚大学 | 建议使用 IE6.0 以上浏览器，分辨率 1024×768
                </div>
                <div style={{ fontSize: '10px', color: '#99a', marginTop: '4px' }}>
                    校园网内网服务 | 服务器维护单位：网络与信息化办公室
                </div>
            </footer>
        </div>
    );
};

export default PortalHome;
