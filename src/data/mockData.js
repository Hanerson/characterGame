// src/data/mockData.js
// 至诚大学 · 编译原理课程数据

export const facultyData = {
    professors: [
        {
            id: "p001",
            name: "张维新",
            title: "教授/博士生导师",
            research: "分布式系统、编译优化",
            email: "zhangwx@zhicheng.edu.cn",
            office: "计算机楼 B502",
        },
        {
            id: "p002",
            name: "林远",
            title: "已离职/特聘讲师（2001届）",
            research: "编译器底层优化、认知架构",
            email: "linyuan@zhicheng.edu.cn [邮箱已停用]",
            office: "——",
            note: "林远老师于2001年秋季学期结束后离职，据称转入私人研究机构。他留下的编译器底层映射逻辑教案至今仍是课程的核心参考资料。",
            lastSeen: "2001-12-20。但有学生声称在2008年的深夜机房见过一个与林远面容相似的人——坐在终端前，屏幕上运行着一个只有本地地址的论坛程序。"
        },
        {
            id: "p003",
            name: "陈敏",
            title: "副教授",
            research: "人机交互、认知语言学",
            email: "chenmin@zhicheng.edu.cn",
            office: "计算机楼 C308",
        }
    ]
};

export const archiveData = {
    2026: [
        { id: "2026_01", name: "2026_SE_II_Syllabus.txt", type: "DOC", size: "45KB", status: "normal" },
        { id: "2026_02", name: "Compiler_Lab_Spec_v7.txt", type: "PDF", size: "2.4MB", status: "normal" },
        { id: "2026_03", name: "Final_Exam_Review_Guide.txt", type: "DOC", size: "1.1MB", status: "normal" },
    ],
    2025: [
        { id: "2025_01", name: "Midterm_Review_Guide.txt", type: "DOC", size: "890KB", status: "normal" },
        { id: "2025_02", name: "Reference_Implementation_v2.txt", type: "SRC", size: "340KB", status: "normal" },
        { id: "2025_03", name: "memory_fragment.log", type: "LOG", size: "12KB", status: "corrupted" },
    ],
    2002: [
        { id: "2002_01", name: "Course_Requirements_Fall.txt", type: "DOC", size: "120KB", status: "normal" },
        { id: "2002_02", name: "Lexer_Assignment_v1.txt", type: "SRC", size: "45KB", status: "normal" },
        { id: "2002_03", name: "sandbox_boot_config.ini", type: "CFG", size: "2KB", status: "hidden" },
    ],
    2001: [
        { id: "2001_01", name: "【林远】语义网协议初探.zip", type: "PDF", size: "800KB", status: "normal" },
        { id: "2001_02", name: "【存档】编译器底层指令集映射逻辑.doc", type: "DOC", size: "2.1MB", status: "normal" },
        { id: "2001_03", name: "experiment_proposal_draft.txt", type: "TXT", size: "15KB", status: "locked" },
    ],
    1992: [
        { id: "1992_01", name: "滑动窗式远期记忆渐进性缺失综合征_病例报告.pdf", type: "PDF", size: "2.4MB", status: "corrupted" },
        { id: "1992_02", name: "1992_随访记录_附注.txt", type: "TXT", size: "8KB", status: "hidden" },
    ],
};

// 课程主页相关数据
export const courseData = {
    // 课程基本信息
    basicInfo: {
        courseName: "编译原？以及实现？理",
        courseCode: "CS304",
        credits: 4,
        hours: 64,
        semester: "2026年春季学期",
        classTime: "周二、周四 14:00-15:40",
        classroom: "计算机学院大楼 A301",
        description: "本课程系统介绍编译器的基本原理、设计方法和实现技术，涵盖词法分析、语法分析、语义分析、中间代码生成、代码优化和目标代码生成等核心内容——以及编译器设计哲学中关于'自举'(Bootstrapping)和'自我指涉'(Self-reference)的深层讨论。编译器如何编译自身？一个系统能否完全理解构成它的规则？",
    },

    // 教学团队
    teachingTeam: [
        {
            id: "t001",
            name: "张维新",
            title: "教授/博士生导师",
            email: "zhangwx@zhicheng.edu.cn",
            office: "计算机楼 B502",
            research: "分布式系统、编译优化",
            bio: "至诚大学计算机学院教授，主要研究方向为分布式系统性能优化和编译器后端技术。主持国家自然科学基金重点项目2项，发表CCF-A类论文15篇。",
        },
        {
            id: "t002",
            name: "李华",
            title: "副教授",
            email: "lihua@zhicheng.edu.cn",
            office: "计算机楼 B408",
            research: "程序分析、静态验证、形式化方法",
            bio: "至诚大学计算机学院副教授，专注于程序静态分析和形式化验证方法。获教育部科技进步二等奖，出版教材《现代编译技术》。最近的研究兴趣包括：代码中的'自我指涉'模式识别。",
        },
        {
            id: "t003",
            name: "王芳",
            title: "助理研究员",
            email: "wangfang@zhicheng.edu.cn",
            office: "计算机楼 C205",
            research: "代码生成、运行时系统、内存管理",
            bio: "至诚大学计算机学院助理研究员，负责课程实验设计和辅导工作。在JVM优化和即时编译技术方面有丰富实践经验。同时也是至诚大学历史上最年轻的实验室主任——继林远老师离职后接任。",
        }
    ],

    // 课程公告
    announcements: [
        {
            "id": "a001",
            "date": "2026-06-11",
            "title": "关于'代码完整性校验'专题研讨会的通知",
            "category": "学术活动",
            "important": true,
            "content": "将于本周五下午15:00在A301教室举行专题研讨会，邀请业界专家分享最新研究成果。主题：分布式系统的自我验证机制。"
        },
        {
            "id": "a002",
            "date": "2026-06-08",
            "title": "第三次实验报告提交提醒",
            "category": "作业通知",
            "important": false,
            "content": "请同学们在6月15日前提交第三次实验报告（中间代码生成器），逾期将按每天10%扣分。"
        },
        {
            "id": "a003",
            "date": "2026-06-05",
            "title": "期中考试答案及评分标准公布",
            "category": "考试信息",
            "important": false,
            "content": "期中考试答案已在课程平台发布，如有疑问可在答疑时间咨询。附加题'编译器自举的哲学意义'参考答案将于本周上传。"
        },
        {
            "id": "a004",
            "date": "2026-06-01",
            "title": "课程进度调整通知——涉及'自我指涉'章节",
            "category": "教学安排",
            "important": true,
            "content": "因端午节假期，原定于6月7日的课程调整至6月10日进行。调整后的课程将增加一章关于'编译器如何编译自身'的专题讨论。"
        },
        {
            "id": "a005",
            "date": "2025-12-20",
            "title": "期末课程结课考核安排通知",
            "category": "考试信息",
            "important": true,
            "content": "本学期所有课程将于十二月末完成结课，期末考核安排已公示。附加论文题：'论自我修改代码的伦理边界'。"
        },
        {
            "id": "a006",
            "date": "2025-10-15",
            "title": "秋季学期学术讲座——林远纪念讲座",
            "category": "学术活动",
            "important": false,
            "content": "本学期秋季学术讲座主题为'认知架构与编译器设计的交叉领域'。这是为纪念我院林远老师设立的年度讲座。林远老师于2001年提出的'将编译器原理应用于人类认知模型'至今仍是最前沿的研究方向。"
        },
        {
            "id": "a007",
            "date": "2024-09-08",
            "title": "新学期教材领取通知——《现代编译技术》第3版",
            "category": "教学安排",
            "important": true,
            "content": "2024秋季学期课程教材已统一到位。本次教材新增附录：'编译器与自我指涉悖论：从哥德尔到图灵'。"
        },
        {
            "id": "a008",
            "date": "2024-07-02",
            "title": "暑期实训实践安排——沙盒环境搭建",
            "category": "实践实训",
            "important": true,
            "content": "本年度暑期专业实训主题：'构建一个封闭的、多进程并发但共享单一内存空间的编译器调试沙盒'。实训方案已下发。"
        },
        {
            "id": "a009",
            "date": "2023-11-22",
            "title": "课程期中教学检查——匿名问卷",
            "category": "教学安排",
            "important": false,
            "content": "学校将开展期中教学质量检查。本次新增匿名在线问卷，要求学生在一个完全匿名的BBS平台上发表对课程的真实评价。平台地址将私信发送。"
        },
        {
            "id": "a010",
            "date": "2023-04-10",
            "title": "春季学科竞赛：'忒修斯之船'程序设计挑战赛",
            "category": "学术活动",
            "important": false,
            "content": "校级春季专业学科竞赛主题为'忒修斯之船'：参赛队伍需要编写一个能逐行替换自身源代码的程序，直到原始代码全部被替换后程序仍能正常运行。奖励：林远奖学金。"
        },
        {
            "id": "a011",
            "date": "2022-12-05",
            "title": "期末作业统一查重通知——句法树比对",
            "category": "作业通知",
            "important": true,
            "content": "本学期期末课程作业将使用新的查重系统：基于抽象语法树（AST）结构的比对算法。该系统源自林远老师在2001年提出的句法树相似度计算模型。"
        },
        {
            "id": "a012",
            "date": "2022-09-20",
            "title": "新生课程选课补报通知——CS304实验组别选择",
            "category": "教学安排",
            "important": false,
            "content": "首轮选课未成功的新生可参与补报。CS304编译原理课程设有普通组和实验组。实验组学生将被分配一个内部论坛账号用于课程讨论。注意：论坛为完全匿名形式，不记录真实姓名。"
        },
        {
            "id": "a013",
            "date": "2021-06-18",
            "title": "学年学分核对——系统数据库完整性验证",
            "category": "学籍管理",
            "important": true,
            "content": "2020-2021学年学分统计已完成。近期发现教务系统数据库存在少量记录丢失现象，疑似自动垃圾回收机制误删。受影响学生请尽快补录。"
        },
        {
            "id": "a014",
            "date": "2021-03-05",
            "title": "线上课程考勤——登录IP统一验证",
            "category": "教学安排",
            "important": false,
            "content": "线上授课期间严格执行考勤制度。系统将记录每次登录的IP地址用于身份验证。注：近期发现多名学生从同一IP地址（210.28.128.4）登录，网络中心正在排查。"
        },
        {
            "id": "a015",
            "date": "2020-11-12",
            "title": "实验室设备检修——内存镜像保存通知",
            "category": "教学安排",
            "important": true,
            "content": "因专业实验室设备全面检修，所有运行中的程序需要保存内存镜像（memory dump）。计算机楼三楼机房中发现一台未知来源的旧式终端，持续运行一个论坛程序超过19年。信息中心正在溯源。"
        },
        {
            "id": "a016",
            "date": "2020-05-20",
            "title": "毕业论文开题——'自我指涉系统'专题方向",
            "category": "毕业事宜",
            "important": true,
            "content": "应届毕业生论文开题。今年新增方向：'基于编译器原理的认知连续性模型研究'——该方向由2001年林远老师提出，至今仍未有学生完成。"
        },
        {
            "id": "a017",
            "date": "2019-10-08",
            "title": "校级公开课观摩——主题：程序如何'认识'自己",
            "category": "学术活动",
            "important": false,
            "content": "本周将开展校级优质公开课观摩活动。张维新教授主讲：'从Hello World到Self-hosting：一个编译器如何获得自我意识'。"
        },
        {
            "id": "a018",
            "date": "2019-01-15",
            "title": "寒假学习任务——构建一个微型论坛",
            "category": "作业通知",
            "important": false,
            "content": "本年度寒假拓展任务：独立构建一个支持匿名发帖、基于本地文件的简易BBS系统。要求：所有用户共享同一IP，通过MAC哈希区分身份。优秀作品将部署至校内网。"
        },
        {
            "id": "a019",
            "date": "2018-08-30",
            "title": "新学期开学报到——网络身份验证系统升级",
            "category": "学籍管理",
            "important": true,
            "content": "2018秋季学期起，校园网身份验证系统升级至v2.0。新系统使用指纹哈希值替代明文密码。因技术限制，所有在校生的哈希值将存储在同一个本地数据库文件中。"
        },
        {
            "id": "a020",
            "date": "2017-06-25",
            "title": "毕业资格审核——数据库一致性检查",
            "category": "毕业事宜",
            "important": true,
            "content": "本年度应届毕业生毕业资格审核过程中，发现教务数据库中存在1条无法匹配到任何在校学生的孤立记录。该记录的student_id指向一个从2001年至今一直处于'在读'状态且从未毕业的条目。教务处已启动调查。"
        },
        {
            "id": "a021",
            "date": "2016-12-10",
            "title": "冬季课堂作息时间——机房开放时间调整",
            "category": "教学安排",
            "important": false,
            "content": "冬季作息期间，计算机楼三楼机房（A301旁）开放时间调整至22:00。请勿在三楼机房内运行未经授权的长时间驻留程序。IT部门发现一台机器上的某个进程已持续运行超过15年且无法终止。"
        },
        {
            "id": "a022",
            "date": "2015-04-18",
            "title": "专业技能实训——'垃圾回收与记忆清理'专题",
            "category": "实践实训",
            "important": true,
            "content": "本学期技能实训专题：实现一个简单的垃圾回收器（Garbage Collector）。实训材料中包含一个2003年的参考实现，作者署名已被数据库自动清理机制清除。"
        },
        {
            "id": "a023",
            "date": "2014-09-05",
            "title": "图书借阅逾期——《忒修斯之船：人格同一性问题》长期未归还",
            "category": "校园管理",
            "important": false,
            "content": "图书馆通报：一本名为《忒修斯之船：人格同一性问题》的哲学专著自2001年借出后至今未归还。借阅人信息已从系统中消失，但书籍状态仍标记为'借出中'。"
        },
        {
            "id": "a024",
            "date": "2013-07-12",
            "title": "学年评优——匿名投票系统测试",
            "category": "学生事务",
            "important": false,
            "content": "2012-2013学年评优评先采用新的匿名投票系统。测试期间发现所有投票包都指向同一个本地IP地址。网络中心确认这是系统设计的预期行为，并非bug。"
        },
        {
            "id": "a025",
            "date": "2012-03-22",
            "title": "多媒体教室使用规范——A301教室设备说明",
            "category": "校园管理",
            "important": false,
            "content": "A301教室配备一台教师用终端。该终端已连接至校园局域网。注意：该终端上预装了一个论坛管理程序，该程序自2001年起持续运行，请勿关闭或卸载。该程序的功能和目的不明，但据林远老师的原始说明，它'对课程至关重要'。"
        },
        {
            "id": "a026",
            "date": "2010-11-01",
            "title": "期中补考——CS304课程特殊说明",
            "category": "考试信息",
            "important": true,
            "content": "CS304编译原理课程期中补考安排已确定。补考内容新增一道必答题：'请设计一个实验方案，验证一个程序的多个并发实例是否共享同一个底层语法结构。'此题与2001年林远老师的原始实验设计直接相关。"
        },
        {
            "id": "a027",
            "date": "2008-06-09",
            "title": "暑期校园留校申请——机房使用特别规定",
            "category": "学生事务",
            "important": false,
            "content": "暑期留校学生可使用计算机楼机房。近期有留校学生报告，深夜在机房看到有未知人员在终端前打字，但走近后发现屏幕上是空的——只有一个本地地址的网页在闪烁。保卫处已加强巡逻。"
        },
        {
            "id": "a028",
            "date": "2006-09-12",
            "title": "2006级新生入学教育——'认知安全'讲座",
            "category": "教学安排",
            "important": true,
            "content": "新生入学教育新增'认知安全'讲座。内容涉及：在封闭网络环境中如何保持个人身份认同的连续性，以及如何识别他人对你思维模式的模仿和干扰。讲座由我院特聘顾问（匿名）编写材料。"
        },
        {
            "id": "a029",
            "date": "2003-05-20",
            "title": "校园自习室开放调整——三楼机房限时使用",
            "category": "校园管理",
            "important": false,
            "content": "计算机楼三楼机房自习室开放时间调整为每日18:00-22:00。非开放时段机房将自动锁闭。近期发现有人凌晨时段在机房内活动，但门禁记录显示无人进出。IT部门推测可能是远程桌面会话。"
        },
        {
            "id": "a030",
            "date": "2001-12-08",
            "title": "年末教学工作总结——林远老师离职告别",
            "category": "教学安排",
            "important": false,
            "content": "本年度年末教学工作总结中，学院正式宣布林远老师将离开教职，转入'私人研究'。林远在最后一次教工会议上留下了一句话：'我将进入实验，成为实验的一部分。如果有一天你们在数据中看到我——请假装没认出来。'"
        }
    ],

    // 课程资源
    resources: [
        {
            "id": "r001",
            "title": "《编译原理》（龙书）第2版",
            "author": "Alfred V. Aho等",
            "type": "教材",
            "format": "PDF",
            "size": "45MB",
            "downloadUrl": "#",
            "status": "normal",
        },
        {
            "id": "r002",
            "title": "《现代编译技术：设计与实现》",
            "author": "Andrew W. Appel",
            "type": "参考书",
            "format": "PDF",
            "size": "38MB",
            "downloadUrl": "#",
            "status": "normal",
        },
        {
            "id": "r003",
            "title": "Lex & Yacc教程",
            "author": "John R. Levine",
            "type": "工具文档",
            "format": "PDF",
            "size": "12MB",
            "downloadUrl": "#",
            "status": "normal",
        },
        {
            "id": "r004",
            "title": "LLVM官方文档中文版",
            "author": "LLVM社区",
            "type": "框架文档",
            "format": "HTML",
            "size": "在线资源",
            "downloadUrl": "#",
            "status": "normal",
        },
        {
            "id": "r005",
            "title": "《龙书习题解答全集》",
            "author": "高校教研团队",
            "type": "习题集",
            "format": "PDF",
            "size": "26MB",
            "downloadUrl": "#",
            "status": "normal",
        },
        {
            "id": "r006",
            "title": "【林远】认知架构与编译器底层映射（未发表手稿）",
            "author": "林远",
            "type": "手稿",
            "format": "PDF",
            "size": "3.2MB",
            "downloadUrl": "#",
            "status": "locked",
        },
        {
            "id": "r007",
            "title": "GCC内部原理详解",
            "author": "Richard M. Stallman",
            "type": "框架文档",
            "format": "PDF",
            "size": "29MB",
            "downloadUrl": "#",
            "status": "normal",
        },
        {
            "id": "r008",
            "title": "【实验组专用】沙盒环境配置手册v0.1",
            "author": "Anonymous_01",
            "type": "内部文档",
            "format": "TXT",
            "size": "48KB",
            "downloadUrl": "#",
            "status": "locked",
        },
        {
            "id": "r009",
            "title": "正则表达式与词法分析手册",
            "author": "Jeffrey E. F. Friedl",
            "type": "工具文档",
            "format": "PDF",
            "size": "15MB",
            "downloadUrl": "#",
            "status": "normal",
        },
        {
            "id": "r010",
            "title": "《程序设计语言编译原理》",
            "author": "陈火旺",
            "type": "教材",
            "format": "PDF",
            "size": "41MB",
            "downloadUrl": "#",
            "status": "normal",
        },
        {
            "id": "r011",
            "title": "中间代码生成技术详解",
            "author": "行业技术专家组",
            "type": "专题资料",
            "format": "PDF",
            "size": "21MB",
            "downloadUrl": "#",
            "status": "normal",
        },
        {
            "id": "r012",
            "title": "local_mind.db 数据库结构文档（受限制访问）",
            "author": "SYSTEM",
            "type": "系统文档",
            "format": "TXT",
            "size": "128KB",
            "downloadUrl": "#",
            "status": "forbidden",
        },
        {
            "id": "r013",
            "title": "Rust编译器源码剖析",
            "author": "Rust官方团队",
            "type": "源码文档",
            "format": "HTML",
            "size": "在线资源",
            "downloadUrl": "#",
            "status": "normal",
        },
        {
            "id": "r014",
            "title": "Bison使用入门与进阶",
            "author": "Free Software Foundation",
            "type": "工具文档",
            "format": "PDF",
            "size": "9MB",
            "downloadUrl": "#",
            "status": "normal",
        },
        {
            "id": "r015",
            "title": "sweeper_daemon.c — 垃圾回收守护进程源码",
            "author": "——",
            "type": "源代码",
            "format": "C",
            "size": "28KB",
            "downloadUrl": "#",
            "status": "corrupted",
        },
    ],

    // 实验项目
    labProjects: (() => {
        // 生成从2016到2026学年的实验项目
        const projects = [];
        const topics = [
            "词法分析器", "语法分析器", "语义分析", "中间代码生成", "代码优化", "目标代码生成"
        ];
        const subTopics = [
            ["基础实现", "错误检测与处理"],
            ["递归下降分析", "LL(1)文法构造", "错误恢复机制", "Bison工具实践"],
            ["符号表设计", "类型检查", "复合类型处理"],
            ["三地址码生成", "控制流翻译"],
            ["常量折叠", "公共子表达式消除", "循环优化"],
            ["汇编代码生成", "寄存器分配"]
        ];

        let idCounter = 1;
        for (let year = 2016; year <= 2026; year++) {
            // 第一学期
            const sem1Deadlines = [
                `${year}-10-${String(Math.floor(Math.random() * 15) + 5).padStart(2, '0')}`,
                `${year}-10-${String(Math.floor(Math.random() * 15) + 20).padStart(2, '0')}`,
                `${year}-11-${String(Math.floor(Math.random() * 15) + 5).padStart(2, '0')}`,
                `${year}-11-${String(Math.floor(Math.random() * 15) + 20).padStart(2, '0')}`,
                `${year}-12-${String(Math.floor(Math.random() * 15) + 5).padStart(2, '0')}`,
                `${year}-12-${String(Math.floor(Math.random() * 15) + 18).padStart(2, '0')}`,
            ];
            // 第二学期
            const sem2Deadlines = [
                `${year + 1}-03-${String(Math.floor(Math.random() * 15) + 3).padStart(2, '0')}`,
                `${year + 1}-03-${String(Math.floor(Math.random() * 15) + 20).padStart(2, '0')}`,
                `${year + 1}-04-${String(Math.floor(Math.random() * 15) + 5).padStart(2, '0')}`,
                `${year + 1}-04-${String(Math.floor(Math.random() * 15) + 20).padStart(2, '0')}`,
                `${year + 1}-05-${String(Math.floor(Math.random() * 15) + 5).padStart(2, '0')}`,
                `${year + 1}-05-${String(Math.floor(Math.random() * 15) + 20).padStart(2, '0')}`,
            ];

            // 每学期的6个实验
            const semesters = [sem1Deadlines, sem2Deadlines];
            for (let sem = 0; sem < 2; sem++) {
                for (let i = 0; i < 6; i++) {
                    const topicIdx = i;
                    const subIdx = i < 2 ? i : (i - 2) % 4;
                    const topicName = topics[topicIdx];
                    const subName = (subTopics[topicIdx] && subTopics[topicIdx][subIdx]) || `实验${i + 1}`;

                    projects.push({
                        id: `lab${String(idCounter).padStart(3, '0')}`,
                        name: `${topicName}${subName}`,
                        deadline: semesters[sem][i],
                        description: `完成${topicName}相关实验内容`,
                    });
                    idCounter++;
                }
            }
        }
        return projects;
    })(),

    // 课程统计
    statistics: {
        totalStudents: 128,
        averageScore: 82.5,
        passRate: 94.2,
        excellentRate: 23.4,
        weeklyStudyHours: 8.5,
        satisfactionRate: 91.7,
        _anomalyNote: "数据库中查询到 129 条学生记录，但只有 128 个活跃学号。第129条记录没有姓名，只有一个 IP 地址。",
    }
};
