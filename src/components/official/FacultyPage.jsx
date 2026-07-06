// src/components/official/FacultyPage.jsx
// 师资队伍页面 — 2010年代大学教师介绍页风格

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { facultyData } from '../../data/mockData.js';

const FacultyPage = () => {
    const [selectedProf, setSelectedProf] = useState(null);

    const professors = facultyData.professors;

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
                <h1 style={{ color: '#ffffff', fontSize: '18px', margin: 0 }}>👥 师资队伍</h1>
            </header>

            <div style={{ padding: '6px 20px', background: '#f0f0f0', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
                <div className="breadcrumbs" style={{ padding: 0 }}>
                    <Link to="/">🖥️ 桌面</Link><span className="sep">›</span>
                    <Link to="/course">编译原理</Link><span className="sep">›</span>
                    <strong>师资队伍</strong>
                </div>
                <Link to="/course" style={{ fontSize: '11px' }}>← 返回课程主页</Link>
            </div>

            <main style={{ maxWidth: '900px', margin: '16px auto', padding: '0 10px' }}>
                {/* 在职教师 */}
                <div className="raised" style={{ background: '#ffffff', padding: '16px', marginBottom: '16px' }}>
                    <h2 style={{
                        fontSize: '15px',
                        color: '#003399',
                        borderBottom: '2px solid #003399',
                        paddingBottom: '6px',
                        marginBottom: '12px',
                    }}>
                        📋 在职教师
                    </h2>

                    {professors.map(prof => (
                        <div
                            key={prof.id}
                            style={{
                                padding: '12px',
                                marginBottom: '10px',
                                border: selectedProf === prof.id ? '2px solid #003399' : '1px solid #d0d0d0',
                                background: selectedProf === prof.id ? '#f8f8ff' : '#fafafa',
                                cursor: 'pointer',
                            }}
                            onClick={() => setSelectedProf(selectedProf === prof.id ? null : prof.id)}
                        >
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                {/* 头像 */}
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    background: prof.id === 'p002'
                                        ? 'linear-gradient(180deg, #666, #888)'  // 林远的灰色头像
                                        : 'linear-gradient(180deg, #003399, #0044cc)',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    flexShrink: 0,
                                    border: '2px solid #c0c0c0',
                                    position: 'relative',
                                }}>
                                    {prof.name[0]}
                                    {prof.id === 'p002' && (
                                        <span style={{
                                            position: 'absolute',
                                            bottom: -6,
                                            fontSize: '9px',
                                            background: '#cc0000',
                                            color: '#ffffff',
                                            padding: '1px 4px',
                                        }}>
                                            离职
                                        </span>
                                    )}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                        {prof.name}
                                        <span style={{
                                            fontSize: '11px',
                                            color: prof.id === 'p002' ? '#cc0000' : '#666',
                                            marginLeft: '8px',
                                        }}>
                                            {prof.title}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                                        📧 {prof.email}
                                        {prof.office !== '——' && <span> | 🏢 {prof.office}</span>}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#003399', marginTop: '2px' }}>
                                        🔬 {prof.research}
                                    </div>

                                    {/* 展开详情 */}
                                    {selectedProf === prof.id && (
                                        <div style={{
                                            marginTop: '10px',
                                            padding: '10px',
                                            background: '#f0f0f8',
                                            border: '1px solid #d0d0e0',
                                            fontSize: '12px',
                                            lineHeight: 1.8,
                                        }}>
                                            {prof.note && (
                                                <p style={{ color: '#333' }}>{prof.note}</p>
                                            )}
                                            {prof.lastSeen && (
                                                <p style={{
                                                    color: '#cc0000',
                                                    fontStyle: 'italic',
                                                    marginTop: '8px',
                                                    padding: '6px',
                                                    background: '#fff0f0',
                                                    border: '1px dashed #cc0000',
                                                }}>
                                                    ⚠️ {prof.lastSeen}
                                                </p>
                                            )}
                                            {prof.id === 'p002' && (
                                                <div style={{ marginTop: '10px', fontSize: '11px' }}>
                                                    <p style={{ color: '#666' }}>
                                                        <strong>林远老师的历史记录：</strong>
                                                    </p>
                                                    <ul style={{ color: '#666', paddingLeft: '20px' }}>
                                                        <li>1970年出生</li>
                                                        <li>1995年加入至诚大学计算机学院</li>
                                                        <li>1998年提出"将编译器原理应用于认知模型"的研究方向</li>
                                                        <li>2000年获得"沙盒认知实验"伦理审批</li>
                                                        <li>2001年11月1日——在课程论坛 v1.0 部署完成当日——宣布离职</li>
                                                        <li>2001年12月20日——最后一次出现在教工会议上</li>
                                                        <li style={{ color: '#cc0000' }}>
                                                            此后25年间，其创建的论坛进程持续运行，从未中断
                                                        </li>
                                                        <li>
                                                            其NT账户显示为"已停用"，但该账户下的一个守护进程（PID: 1）仍在消耗CPU周期
                                                        </li>
                                                    </ul>
                                                    <p style={{
                                                        color: '#808080',
                                                        fontStyle: 'italic',
                                                        marginTop: '8px',
                                                    }}>
                                                        "如果你在系统日志中看到 PID 1 的活动记录——那是我在检查实验数据。别担心。一切都在按计划进行。"
                                                        <br />——《林远离职备忘录》附件，最后一页
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 关于本院的隐藏事实 */}
                <div style={{
                    padding: '12px',
                    background: '#f8f8f0',
                    border: '1px dashed #c0c0c0',
                    fontSize: '11px',
                    color: '#666',
                    lineHeight: 1.8,
                    marginBottom: '16px',
                }}>
                    <strong>📌 学院历史记事：</strong>
                    <p style={{ marginTop: '4px' }}>
                        计算机学院成立于1995年，至今已有31年历史。在学院的官方档案中，
                        共有<strong>38名</strong>教职员工的记录。然而，学院的本地数据库中始终存在
                        <strong style={{ color: '#cc0000' }}>一个额外的、无法匹配到任何档案的用户条目</strong>，
                        其创建日期为2001年11月1日，状态为"活跃"，但关联的姓名、工号和身份信息
                        均已被数据库的垃圾回收机制（sweeper_daemon）清除。
                    </p>
                    <p style={{ marginTop: '4px' }}>
                        IT部门多次尝试删除该孤立条目，但每次删除操作都会在24小时内被自动回滚。
                        日志显示回滚指令来自 PID 1——一个由"已停用"的NT账户拥有的守护进程。
                    </p>
                </div>
            </main>

            <footer className="copyright-bar">
                <span style={{ color: '#808080' }}>页面生成时间: {new Date().toISOString().replace('T', ' ').slice(0, 19)} | 数据来源: local_mind.db::faculty 视图</span>
            </footer>
        </div>
    );
};

export default FacultyPage;
