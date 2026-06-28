import {courseData} from "../../data/mockData.js";

const Home = () => {
    // 假设数据从 mockData 获取
    const { basicInfo, announcements } = courseData;

    return (
        <div style={{
            backgroundColor: '#d8e4f8', // 还原当年的淡蓝底色
            minHeight: '100vh',
            padding: '10px',
            fontFamily: 'SimSun, "宋体", serif' // 当年最经典的正文字体
        }}>
            {/* 顶栏区域：Logo 与学校名称 */}
            <header style={{
                borderBottom: '2px solid #003399',
                paddingBottom: '10px',
                marginBottom: '20px'
            }}>
                <h1 style={{ color: '#003399', margin: 0 }}>{basicInfo.courseName}</h1>
            </header>

            {/* 主内容区域：模拟当年的“信息列表”布局 */}
            <main style={{
                backgroundColor: '#ffffff',
                border: '1px solid #999',
                padding: '15px',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                <h2 style={{ fontSize: '16px', color: '#c00', borderBottom: '1px dashed #ccc' }}>课程公告</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {announcements.map(item => (
                        <li key={item.id} style={{ padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                            <span style={{ color: '#666', marginRight: '10px' }}>[{item.date}]</span>
                            <a href="#" style={{ color: '#000', textDecoration: 'none' }}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            </main>

            {/* 底部导航栏：还原“一排排密集的链接” */}
            <footer style={{
                marginTop: '40px',
                textAlign: 'center',
                color: '#003399',
                fontSize: '12px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', padding: '10px' }}>
                    {['数字化校园', '校内网', '校长信箱', '校友会', '规章制度'].map(link => (
                        <a key={link} href="#" style={{ color: '#003399' }}>{link}</a>
                    ))}
                    <a href="/#/dep" style={{ color: '#003399' }}>联系我们</a>
                </div>
                <div style={{ borderTop: '1px solid #999', paddingTop: '10px' }}>
                    版权所有 © 至诚大学 | 建议使用 IE6.0 以上浏览器，分辨率 1024x768
                </div>
            </footer>
        </div>
    );
};

export default Home;