export const facultyData = {
    professors: [
        { id: "p001", name: "张维新", title: "教授", research: "分布式系统" },
        { id: "p002", name: "林远", title: "已离职/特聘讲师(2001届)", research: "编译器底层优化" },
        { id: "p003", name: "陈敏", title: "副教授", research: "人机交互" }
    ]
};

export const archiveData = {
    2026: [
        { id: "26_01", title: "编译原理：课程大纲与考核标准", type: "PDF", size: "2.4MB" },
        { id: "26_02", title: "第一阶段：词法分析器构建指南", type: "DOC", size: "1.1MB" },
        { id: "26_03", title: "2026春季期中作业模板", type: "ZIP", size: "15MB" }
    ],
    2001: [
        { id: "01_01", title: "【教学改革】语义网协议初探 - 林远", type: "PDF", size: "800KB" },
        { id: "01_02", title: "【存档】编译器底层指令集映射逻辑", type: "DOC", size: "2.1MB" }
    ]
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
        description: "本课程系统介绍编译器的基本原理、设计方法和实现技术，涵盖词法分析、语法分析、语义分析、中间代码生成、代码优化和目标代码生成等核心内容。通过理论学习和实践项目，培养学生对程序语言处理系统的深入理解和工程实现能力。"
    },
    
    // 教学团队
    teachingTeam: [
        { 
            id: "t001", 
            name: "张维新", 
            title: "教授/博士生导师", 
            email: "zhangwx@nju.edu.cn",
            office: "计算机楼 B502",
            research: "分布式系统、编译优化",
            bio: "南京大学计算机学院教授，主要研究方向为分布式系统性能优化和编译器后端技术。主持国家自然科学基金重点项目2项，发表CCF-A类论文15篇。"
        },
        { 
            id: "t002", 
            name: "李华", 
            title: "副教授", 
            email: "lihua@nju.edu.cn",
            office: "计算机楼 B408",
            research: "程序分析、静态验证",
            bio: "南京大学计算机学院副教授，专注于程序静态分析和形式化验证方法。获教育部科技进步二等奖，出版教材《现代编译技术》。"
        },
        { 
            id: "t003", 
            name: "王芳", 
            title: "助理研究员", 
            email: "wangfang@nju.edu.cn",
            office: "计算机楼 C205",
            research: "代码生成、运行时系统",
            bio: "南京大学计算机学院助理研究员，负责课程实验设计和辅导工作。在JVM优化和即时编译技术方面有丰富实践经验。"
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
            "content": "将于本周五下午15:00在A301教室举行专题研讨会，邀请业界专家分享最新研究成果。"
        },
        {
            "id": "a002",
            "date": "2026-06-08",
            "title": "第三次实验报告提交提醒",
            "category": "作业通知",
            "important": false,
            "content": "请同学们在6月15日前提交第三次实验报告，逾期将按每天10%扣分。"
        },
        {
            "id": "a003",
            "date": "2026-06-05",
            "title": "期中考试答案及评分标准公布",
            "category": "考试信息",
            "important": false,
            "content": "期中考试答案已在课程平台发布，如有疑问可在答疑时间咨询。"
        },
        {
            "id": "a004",
            "date": "2026-06-01",
            "title": "课程进度调整通知",
            "category": "教学安排",
            "important": true,
            "content": "因端午节假期，原定于6月7日的课程调整至6月10日进行。"
        },
        {
            "id": "a005",
            "date": "2025-12-20",
            "title": "期末课程结课考核安排通知",
            "category": "考试信息",
            "important": true,
            "content": "本学期所有课程将于十二月末完成结课，期末考核安排已公示，请各位同学按时参加考核。"
        },
        {
            "id": "a006",
            "date": "2025-10-15",
            "title": "秋季学期学术讲座报名通知",
            "category": "学术活动",
            "important": false,
            "content": "本学期秋季学术讲座开放线上报名，有意向的同学可在课程平台完成报名登记。"
        },
        {
            "id": "a007",
            "date": "2024-09-08",
            "title": "新学期教材领取通知",
            "category": "教学安排",
            "important": true,
            "content": "2024秋季学期课程教材已统一到位，请各班班委统一领取后分发至每位同学。"
        },
        {
            "id": "a008",
            "date": "2024-07-02",
            "title": "暑期实训实践安排通知",
            "category": "实践实训",
            "important": true,
            "content": "本年度暑期专业实训工作正式启动，全体学生需按照实训方案完成对应实践任务。"
        },
        {
            "id": "a009",
            "date": "2023-11-22",
            "title": "课程期中教学检查通知",
            "category": "教学安排",
            "important": false,
            "content": "学校将开展期中教学质量检查，请各位学生整理课堂笔记与作业以备抽查。"
        },
        {
            "id": "a010",
            "date": "2023-04-10",
            "title": "春季学科竞赛报名通知",
            "category": "学术活动",
            "important": false,
            "content": "校级春季专业学科竞赛开启报名，符合条件的同学可自主报名参与竞赛。"
        },
        {
            "id": "a011",
            "date": "2022-12-05",
            "title": "期末作业统一查重通知",
            "category": "作业通知",
            "important": true,
            "content": "本学期期末课程作业将统一进行查重检测，抄袭作业将按违纪处理。"
        },
        {
            "id": "a012",
            "date": "2022-09-20",
            "title": "新生课程选课补报通知",
            "category": "教学安排",
            "important": false,
            "content": "首轮选课未成功的新生可参与补报选课，补报时间截止至九月二十二日。"
        },
        {
            "id": "a013",
            "date": "2021-06-18",
            "title": "学年学分核对通知",
            "category": "学籍管理",
            "important": true,
            "content": "2020-2021学年学分统计已完成，请学生自行核对个人修读学分信息。"
        },
        {
            "id": "a014",
            "date": "2021-03-05",
            "title": "线上课程考勤规范通知",
            "category": "教学安排",
            "important": false,
            "content": "线上授课期间严格执行考勤制度，缺勤、迟到记录将计入平时成绩。"
        },
        {
            "id": "a015",
            "date": "2020-11-12",
            "title": "实验室设备检修停课通知",
            "category": "教学安排",
            "important": true,
            "content": "因专业实验室设备全面检修，本周四所有实验课程临时停课，后续统一补课。"
        },
        {
            "id": "a016",
            "date": "2020-05-20",
            "title": "毕业论文开题审核通知",
            "category": "毕业事宜",
            "important": true,
            "content": "应届毕业生毕业论文开题报告进入集中审核阶段，请按时修改提交完善材料。"
        },
        {
            "id": "a017",
            "date": "2019-10-08",
            "title": "校级公开课观摩通知",
            "category": "学术活动",
            "important": false,
            "content": "本周将开展校级优质公开课观摩活动，相关专业学生需按时到场参与学习。"
        },
        {
            "id": "a018",
            "date": "2019-01-15",
            "title": "寒假学习任务布置通知",
            "category": "作业通知",
            "important": false,
            "content": "本年度寒假布置专业拓展学习任务，开学后将统一进行作业检查与打分。"
        },
        {
            "id": "a019",
            "date": "2018-08-30",
            "title": "新学期开学报到须知通知",
            "category": "学籍管理",
            "important": true,
            "content": "2018秋季学期正式开学报到，请全体学生按时返校完成报到注册手续。"
        },
        {
            "id": "a020",
            "date": "2017-06-25",
            "title": "毕业资格审核公示通知",
            "category": "毕业事宜",
            "important": true,
            "content": "本年度应届毕业生毕业资格审核结果予以公示，有异议可在公示期内提交申诉。"
        },
        {
            "id": "a021",
            "date": "2016-12-10",
            "title": "冬季课堂作息时间调整通知",
            "category": "教学安排",
            "important": false,
            "content": "根据冬季作息安排，全校课堂上课时间统一调整，望全体师生遵照执行。"
        },
        {
            "id": "a022",
            "date": "2015-04-18",
            "title": "专业技能实训考核通知",
            "category": "实践实训",
            "important": true,
            "content": "本学期专业技能实训考核即将开展，学生需提前完成实训项目练习准备工作。"
        },
        {
            "id": "a023",
            "date": "2014-09-05",
            "title": "图书借阅逾期清理通知",
            "category": "校园管理",
            "important": false,
            "content": "请全体学生及时归还逾期借阅图书，逾期未归还将按照校规收取滞纳金。"
        },
        {
            "id": "a024",
            "date": "2013-07-12",
            "title": "学年评优评先申报通知",
            "category": "学生事务",
            "important": false,
            "content": "2012-2013学年评优评先工作启动，符合条件学生可提交相关申报材料。"
        },
        {
            "id": "a025",
            "date": "2012-03-22",
            "title": "多媒体教室使用规范通知",
            "category": "校园管理",
            "important": false,
            "content": "全体师生使用多媒体教室需遵守设备使用规范，课后及时关闭设备整理场地。"
        },
        {
            "id": "a026",
            "date": "2010-11-01",
            "title": "期中补考工作安排通知",
            "category": "考试信息",
            "important": true,
            "content": "本学期期中考试补考安排已确定，补考学生需携带证件按时参加补考考试。"
        },
        {
            "id": "a027",
            "date": "2008-06-09",
            "title": "暑期校园留校申请通知",
            "category": "学生事务",
            "important": false,
            "content": "需要暑期留校住宿的学生需按时提交留校申请，审核通过后方可留校居住。"
        },
        {
            "id": "a028",
            "date": "2006-09-12",
            "title": "新生入学教育安排通知",
            "category": "教学安排",
            "important": true,
            "content": "2006级新生入学教育系列活动正式开展，全体新生必须全程参与学习。"
        },
        {
            "id": "a029",
            "date": "2003-05-20",
            "title": "校园自习室开放调整通知",
            "category": "校园管理",
            "important": false,
            "content": "为适配期末复习需求，全校自习室开放时间进行延长调整，望学生合理利用。"
        },
        {
            "id": "a030",
            "date": "2001-12-08",
            "title": "年末教学工作总结公示通知",
            "category": "教学安排",
            "important": false,
            "content": "本年度年末教学工作总结已完成编制，相关内容予以全校公示，接受师生监督。"
        }
    ],
    
    // 课程资源
    resources: [
        {
            "id": "r001",
            "title": "《编译原理》第2版",
            "author": "Alfred V. Aho等",
            "type": "教材",
            "format": "PDF",
            "size": "45MB",
            "downloadUrl": "#"
        },
        {
            "id": "r002",
            "title": "《现代编译技术：设计与实现》",
            "author": "Andrew W. Appel",
            "type": "参考书",
            "format": "PDF",
            "size": "38MB",
            "downloadUrl": "#"
        },
        {
            "id": "r003",
            "title": "Lex & Yacc教程",
            "author": "John R. Levine",
            "type": "工具文档",
            "format": "PDF",
            "size": "12MB",
            "downloadUrl": "#"
        },
        {
            "id": "r004",
            "title": "LLVM官方文档中文版",
            "author": "LLVM社区",
            "type": "框架文档",
            "format": "HTML",
            "size": "在线资源",
            "downloadUrl": "#"
        },
        {
            "id": "r005",
            "title": "《龙书习题解答全集》",
            "author": "高校教研团队",
            "type": "习题集",
            "format": "PDF",
            "size": "26MB",
            "downloadUrl": "#"
        },
        {
            "id": "r006",
            "title": "《编译器构造实践指南》",
            "author": "Keith D. Cooper",
            "type": "参考书",
            "format": "PDF",
            "size": "32MB",
            "downloadUrl": "#"
        },
        {
            "id": "r007",
            "title": "GCC内部原理详解",
            "author": "Richard M. Stallman",
            "type": "框架文档",
            "format": "PDF",
            "size": "29MB",
            "downloadUrl": "#"
        },
        {
            "id": "r008",
            "title": "语法分析器开发实战",
            "author": "Martin Bravenboer",
            "type": "实战教程",
            "format": "PDF",
            "size": "18MB",
            "downloadUrl": "#"
        },
        {
            "id": "r009",
            "title": "正则表达式与词法分析手册",
            "author": "Jeffrey E. F. Friedl",
            "type": "工具文档",
            "format": "PDF",
            "size": "15MB",
            "downloadUrl": "#"
        },
        {
            "id": "r010",
            "title": "《程序设计语言编译原理》（国内经典教材）",
            "author": "陈火旺",
            "type": "教材",
            "format": "PDF",
            "size": "41MB",
            "downloadUrl": "#"
        },
        {
            "id": "r011",
            "title": "中间代码生成技术详解",
            "author": "行业技术专家组",
            "type": "专题资料",
            "format": "PDF",
            "size": "21MB",
            "downloadUrl": "#"
        },
        {
            "id": "r012",
            "title": "代码优化算法案例集",
            "author": "编译技术研究组",
            "type": "习题集",
            "format": "PDF",
            "size": "24MB",
            "downloadUrl": "#"
        },
        {
            "id": "r013",
            "title": "Rust编译器源码剖析",
            "author": "Rust官方团队",
            "type": "源码文档",
            "format": "HTML",
            "size": "在线资源",
            "downloadUrl": "#"
        },
        {
            "id": "r014",
            "title": "Bison使用入门与进阶",
            "author": "Free Software Foundation",
            "type": "工具文档",
            "format": "PDF",
            "size": "9MB",
            "downloadUrl": "#"
        },
        {
            "id": "r015",
            "title": "运行时系统与垃圾回收机制",
            "author": "Hans-Juergen Boehm",
            "type": "参考书",
            "format": "PDF",
            "size": "35MB",
            "downloadUrl": "#"
        },
        {
            "id": "r016",
            "title": "编译原理课堂课件合集",
            "author": "本校授课教师",
            "type": "教学课件",
            "format": "PPT",
            "size": "52MB",
            "downloadUrl": "#"
        },
        {
            "id": "r017",
            "title": "静态代码分析工具原理",
            "author": "安全技术研究团队",
            "type": "专题资料",
            "format": "PDF",
            "size": "22MB",
            "downloadUrl": "#"
        },
        {
            "id": "r018",
            "title": "《微编译器从零开始》",
            "author": "Bob Nystrom",
            "type": "实战教程",
            "format": "PDF",
            "size": "27MB",
            "downloadUrl": "#"
        },
        {
            "id": "r019",
            "title": "Java虚拟机编译执行原理",
            "author": "Oracle技术团队",
            "type": "框架文档",
            "format": "PDF",
            "size": "31MB",
            "downloadUrl": "#"
        },
        {
            "id": "r020",
            "title": "历年编译原理期末试题汇总",
            "author": "教务处考务组",
            "type": "试题库",
            "format": "PDF",
            "size": "17MB",
            "downloadUrl": "#"
        },
        {
            "id": "r021",
            "title": "符号表管理与作用域解析",
            "author": "高校计算机教研室",
            "type": "专题资料",
            "format": "PDF",
            "size": "14MB",
            "downloadUrl": "#"
        },
        {
            "id": "r022",
            "title": "WebAssembly编译技术指南",
            "author": "W3C工作组",
            "type": "框架文档",
            "format": "HTML",
            "size": "在线资源",
            "downloadUrl": "#"
        },
        {
            "id": "r023",
            "title": "汇编语言与目标代码生成",
            "author": "William Stallings",
            "type": "参考书",
            "format": "PDF",
            "size": "36MB",
            "downloadUrl": "#"
        },
        {
            "id": "r024",
            "title": "ANTLR语法解析框架使用手册",
            "author": "Terence Parr",
            "type": "工具文档",
            "format": "PDF",
            "size": "16MB",
            "downloadUrl": "#"
        },
        {
            "id": "r025",
            "title": "编译课程实验指导书",
            "author": "实验教学中心",
            "type": "教学课件",
            "format": "PDF",
            "size": "20MB",
            "downloadUrl": "#"
        }
    ],
    
    // 实验项目
    labProjects: [
        // 2016-2017学年 第一学期
        {
            "id": "lab001",
            "name": "词法分析器基础实现",
            "deadline": "2016-10-12",
            "description": "使用Flex/Lex实现一个简单的词法分析器，支持基本标识符、关键字和运算符的识别。"
        },
        {
            "id": "lab002",
            "name": "词法错误检测与处理",
            "deadline": "2016-10-28",
            "description": "完善词法分析器，识别非法字符、标识符格式错误并输出标准化错误提示。"
        },
        {
            "id": "lab003",
            "name": "递归下降语法分析器",
            "deadline": "2016-11-15",
            "description": "基于给定的文法规则，实现递归下降语法分析器，能够构建抽象语法树。"
        },
        {
            "id": "lab004",
            "name": "LL(1)文法构造与分析",
            "deadline": "2016-11-30",
            "description": "对给定文法消除左递归与提取左公因子，构造LL(1)分析表并完成模拟分析。"
        },
        {
            "id": "lab005",
            "name": "语法错误恢复机制",
            "deadline": "2016-12-13",
            "description": "为语法分析器添加错误恢复机制，出现语法错误后继续后续解析流程。"
        },
        {
            "id": "lab006",
            "name": "Bison语法分析器开发",
            "deadline": "2016-12-26",
            "description": "借助Bison工具完成语法分析器开发，验证文法冲突检测与异常处理能力。"
        },
        // 2016-2017学年 第二学期
        {
            "id": "lab007",
            "name": "符号表设计与实现",
            "deadline": "2017-03-10",
            "description": "独立设计哈希结构符号表，完成变量、函数信息的录入、查询与销毁操作。"
        },
        {
            "id": "lab008",
            "name": "语义分析与类型检查",
            "deadline": "2017-03-27",
            "description": "扩展语法分析器，添加语义分析功能，实现类型检查和符号表管理。"
        },
        {
            "id": "lab009",
            "name": "复合数据类型语义处理",
            "deadline": "2017-04-12",
            "description": "扩展语义分析模块，支持数组、自定义结构体的类型校验与内存布局计算。"
        },
        {
            "id": "lab010",
            "name": "LR语法分析器模拟",
            "deadline": "2017-04-28",
            "description": "手工构造LR(0)项目集与分析表，编写程序模拟LR语法分析全过程。"
        },
        {
            "id": "lab011",
            "name": "中间代码生成器",
            "deadline": "2017-05-15",
            "description": "将AST转换为三地址码形式的中间表示，支持基本的控制流结构。"
        },
        {
            "id": "lab012",
            "name": "基础代码优化实现",
            "deadline": "2017-05-30",
            "description": "针对生成的三地址码实现常量折叠、公共子表达式消除等基础代码优化算法。"
        },
        // 2017-2018学年 第一学期
        {
            "id": "lab013",
            "name": "精简版词法分析器开发",
            "deadline": "2017-10-11",
            "description": "使用Flex/Lex实现一个简单的词法分析器，支持基本标识符、关键字和运算符的识别。"
        },
        {
            "id": "lab014",
            "name": "词法规则扩展与测试",
            "deadline": "2017-10-29",
            "description": "完善词法分析器，识别非法字符、标识符格式错误并输出标准化错误提示。"
        },
        {
            "id": "lab015",
            "name": "递归下降语法分析器重构",
            "deadline": "2017-11-14",
            "description": "基于给定的文法规则，实现递归下降语法分析器，能够构建抽象语法树。"
        },
        {
            "id": "lab016",
            "name": "LL(1)分析表自动构造",
            "deadline": "2017-11-29",
            "description": "对给定文法消除左递归与提取左公因子，构造LL(1)分析表并完成模拟分析。"
        },
        {
            "id": "lab017",
            "name": "语法异常捕获与恢复",
            "deadline": "2017-12-12",
            "description": "为语法分析器添加错误恢复机制，出现语法错误后继续后续解析流程。"
        },
        {
            "id": "lab018",
            "name": "基于Bison的综合解析器",
            "deadline": "2017-12-25",
            "description": "借助Bison工具完成语法分析器开发，验证文法冲突检测与异常处理能力。"
        },
        // 2017-2018学年 第二学期
        {
            "id": "lab019",
            "name": "多级作用域符号表",
            "deadline": "2018-03-09",
            "description": "独立设计哈希结构符号表，完成变量、函数信息的录入、查询与销毁操作。"
        },
        {
            "id": "lab020",
            "name": "全量语义分析模块",
            "deadline": "2018-03-26",
            "description": "扩展语法分析器，添加语义分析功能，实现类型检查和符号表管理。"
        },
        {
            "id": "lab021",
            "name": "数组与结构体语义校验",
            "deadline": "2018-04-11",
            "description": "扩展语义分析模块，支持数组、自定义结构体的类型校验与内存布局计算。"
        },
        {
            "id": "lab022",
            "name": "SLR语法分析器实现",
            "deadline": "2018-04-27",
            "description": "手工构造LR(0)项目集与分析表，编写程序模拟LR语法分析全过程。"
        },
        {
            "id": "lab023",
            "name": "控制流中间代码生成",
            "deadline": "2018-05-14",
            "description": "将AST转换为三地址码形式的中间表示，支持基本的控制流结构。"
        },
        {
            "id": "lab024",
            "name": "循环结构代码优化",
            "deadline": "2018-05-29",
            "description": "实现循环不变量外提、循环展开等优化策略，提升循环代码执行效率。"
        },
        // 2018-2019学年 第一学期
        {
            "id": "lab025",
            "name": "定制化词法分析器",
            "deadline": "2018-10-10",
            "description": "使用Flex/Lex实现一个简单的词法分析器，支持基本标识符、关键字和运算符的识别。"
        },
        {
            "id": "lab026",
            "name": "词法报错系统优化",
            "deadline": "2018-10-28",
            "description": "完善词法分析器，识别非法字符、标识符格式错误并输出标准化错误提示。"
        },
        {
            "id": "lab027",
            "name": "带AST输出的语法分析器",
            "deadline": "2018-11-13",
            "description": "基于给定的文法规则，实现递归下降语法分析器，能够构建抽象语法树。"
        },
        {
            "id": "lab028",
            "name": "复杂文法LL(1)改造",
            "deadline": "2018-11-28",
            "description": "对给定文法消除左递归与提取左公因子，构造LL(1)分析表并完成模拟分析。"
        },
        {
            "id": "lab029",
            "name": "同步符号错误恢复",
            "deadline": "2018-12-11",
            "description": "为语法分析器添加错误恢复机制，出现语法错误后继续后续解析流程。"
        },
        {
            "id": "lab030",
            "name": "Bison高级用法实践",
            "deadline": "2018-12-24",
            "description": "借助Bison工具完成语法分析器开发，验证文法冲突检测与异常处理能力。"
        },
        // 2018-2019学年 第二学期
        {
            "id": "lab031",
            "name": "动态符号表管理系统",
            "deadline": "2019-03-08",
            "description": "独立设计哈希结构符号表，完成变量、函数信息的录入、查询与销毁操作。"
        },
        {
            "id": "lab032",
            "name": "强类型语义检查实现",
            "deadline": "2019-03-25",
            "description": "扩展语法分析器，添加语义分析功能，实现类型检查和符号表管理。"
        },
        {
            "id": "lab033",
            "name": "嵌套结构体语义处理",
            "deadline": "2019-04-10",
            "description": "扩展语义分析模块，支持数组、自定义结构体的类型校验与内存布局计算。"
        },
        {
            "id": "lab034",
            "name": "LALR语法分析模拟",
            "deadline": "2019-04-26",
            "description": "手工构造LR(0)项目集与分析表，编写程序模拟LR语法分析全过程。"
        },
        {
            "id": "lab035",
            "name": "多分支中间代码生成",
            "deadline": "2019-05-13",
            "description": "将AST转换为三地址码形式的中间表示，支持基本的控制流结构。"
        },
        {
            "id": "lab036",
            "name": "综合代码优化实践",
            "deadline": "2019-05-28",
            "description": "针对生成的三地址码实现常量折叠、公共子表达式消除等基础代码优化算法。"
        },
        // 2019-2020学年 第一学期
        {
            "id": "lab037",
            "name": "基础词法分析器重构",
            "deadline": "2019-10-09",
            "description": "使用Flex/Lex实现一个简单的词法分析器，支持基本标识符、关键字和运算符的识别。"
        },
        {
            "id": "lab038",
            "name": "词法边界错误识别",
            "deadline": "2019-10-27",
            "description": "完善词法分析器，识别非法字符、标识符格式错误并输出标准化错误提示。"
        },
        {
            "id": "lab039",
            "name": "递归下降解析器调试",
            "deadline": "2019-11-12",
            "description": "基于给定的文法规则，实现递归下降语法分析器，能够构建抽象语法树。"
        },
        {
            "id": "lab040",
            "name": "LL(1)文法综合实验",
            "deadline": "2019-11-27",
            "description": "对给定文法消除左递归与提取左公因子，构造LL(1)分析表并完成模拟分析。"
        },
        {
            "id": "lab041",
            "name": "语法容错机制优化",
            "deadline": "2019-12-10",
            "description": "为语法分析器添加错误恢复机制，出现语法错误后继续后续解析流程。"
        },
        {
            "id": "lab042",
            "name": "Lex+Bison联合开发",
            "deadline": "2019-12-23",
            "description": "借助Bison工具完成语法分析器开发，验证文法冲突检测与异常处理能力。"
        },
        // 2019-2020学年 第二学期
        {
            "id": "lab043",
            "name": "函数作用域符号表",
            "deadline": "2020-03-07",
            "description": "独立设计哈希结构符号表，完成变量、函数信息的录入、查询与销毁操作。"
        },
        {
            "id": "lab044",
            "name": "语义分析流程整合",
            "deadline": "2020-03-24",
            "description": "扩展语法分析器，添加语义分析功能，实现类型检查和符号表管理。"
        },
        {
            "id": "lab045",
            "name": "多维数组语义解析",
            "deadline": "2020-04-09",
            "description": "扩展语义分析模块，支持数组、自定义结构体的类型校验与内存布局计算。"
        },
        {
            "id": "lab046",
            "name": "完整LR分析流程实现",
            "deadline": "2020-04-25",
            "description": "手工构造LR(0)项目集与分析表，编写程序模拟LR语法分析全过程。"
        },
        {
            "id": "lab047",
            "name": "循环语句中间代码",
            "deadline": "2020-05-12",
            "description": "将AST转换为三地址码形式的中间表示，支持基本的控制流结构。"
        },
        {
            "id": "lab048",
            "name": "目标代码生成初探",
            "deadline": "2020-05-27",
            "description": "将优化后的中间代码翻译为简易汇编指令，完成目标代码输出功能。"
        },
        // 2020-2021学年 第一学期
        {
            "id": "lab049",
            "name": "入门级词法分析器",
            "deadline": "2020-10-08",
            "description": "使用Flex/Lex实现一个简单的词法分析器，支持基本标识符、关键字和运算符的识别。"
        },
        {
            "id": "lab050",
            "name": "词法异常分类处理",
            "deadline": "2020-10-26",
            "description": "完善词法分析器，识别非法字符、标识符格式错误并输出标准化错误提示。"
        },
        {
            "id": "lab051",
            "name": "语法树可视化解析器",
            "deadline": "2020-11-11",
            "description": "基于给定的文法规则，实现递归下降语法分析器，能够构建抽象语法树。"
        },
        {
            "id": "lab052",
            "name": "歧义文法LL(1)处理",
            "deadline": "2020-11-26",
            "description": "对给定文法消除左递归与提取左公因子，构造LL(1)分析表并完成模拟分析。"
        },
        {
            "id": "lab053",
            "name": "语句级错误恢复",
            "deadline": "2020-12-09",
            "description": "为语法分析器添加错误恢复机制，出现语法错误后继续后续解析流程。"
        },
        {
            "id": "lab054",
            "name": "Bison冲突解决方案",
            "deadline": "2020-12-22",
            "description": "借助Bison工具完成语法分析器开发，验证文法冲突检测与异常处理能力。"
        },
        // 2020-2021学年 第二学期
        {
            "id": "lab055",
            "name": "全局符号表搭建",
            "deadline": "2021-03-06",
            "description": "独立设计哈希结构符号表，完成变量、函数信息的录入、查询与销毁操作。"
        },
        {
            "id": "lab056",
            "name": "多文件语义检查",
            "deadline": "2021-03-23",
            "description": "扩展语法分析器，添加语义分析功能，实现类型检查和符号表管理。"
        },
        {
            "id": "lab057",
            "name": "复合类型内存布局计算",
            "deadline": "2021-04-08",
            "description": "扩展语义分析模块，支持数组、自定义结构体的类型校验与内存布局计算。"
        },
        {
            "id": "lab058",
            "name": "LR文法综合实训",
            "deadline": "2021-04-24",
            "description": "手工构造LR(0)项目集与分析表，编写程序模拟LR语法分析全过程。"
        },
        {
            "id": "lab059",
            "name": "函数调用中间代码",
            "deadline": "2021-05-11",
            "description": "将AST转换为三地址码形式的中间表示，支持基本的控制流结构。"
        },
        {
            "id": "lab060",
            "name": "简易汇编代码生成",
            "deadline": "2021-05-26",
            "description": "将优化后的中间代码翻译为简易汇编指令，完成目标代码输出功能。"
        },
        // 2021-2022学年 第一学期
        {
            "id": "lab061",
            "name": "标准词法分析器实现",
            "deadline": "2021-10-07",
            "description": "使用Flex/Lex实现一个简单的词法分析器，支持基本标识符、关键字和运算符的识别。"
        },
        {
            "id": "lab062",
            "name": "词法全场景错误测试",
            "deadline": "2021-10-25",
            "description": "完善词法分析器，识别非法字符、标识符格式错误并输出标准化错误提示。"
        },
        {
            "id": "lab063",
            "name": "标准递归下降分析器",
            "deadline": "2021-11-10",
            "description": "基于给定的文法规则，实现递归下降语法分析器，能够构建抽象语法树。"
        },
        {
            "id": "lab064",
            "name": "LL(1)分析程序编写",
            "deadline": "2021-11-25",
            "description": "对给定文法消除左递归与提取左公因子，构造LL(1)分析表并完成模拟分析。"
        },
        {
            "id": "lab065",
            "name": "高级语法错误恢复",
            "deadline": "2021-12-08",
            "description": "为语法分析器添加错误恢复机制，出现语法错误后继续后续解析流程。"
        },
        {
            "id": "lab066",
            "name": "工业级Bison解析器",
            "deadline": "2021-12-21",
            "description": "借助Bison工具完成语法分析器开发，验证文法冲突检测与异常处理能力。"
        },
        // 2021-2022学年 第二学期
        {
            "id": "lab067",
            "name": "分层式符号表系统",
            "deadline": "2022-03-05",
            "description": "独立设计哈希结构符号表，完成变量、函数信息的录入、查询与销毁操作。"
        },
        {
            "id": "lab068",
            "name": "完整语义分析流水线",
            "deadline": "2022-03-22",
            "description": "扩展语法分析器，添加语义分析功能，实现类型检查和符号表管理。"
        },
        {
            "id": "lab069",
            "name": "递归结构体语义解析",
            "deadline": "2022-04-07",
            "description": "扩展语义分析模块，支持数组、自定义结构体的类型校验与内存布局计算。"
        },
        {
            "id": "lab070",
            "name": "LR系列分析器对比实验",
            "deadline": "2022-04-23",
            "description": "手工构造LR(0)项目集与分析表，编写程序模拟LR语法分析全过程。"
        },
        {
            "id": "lab071",
            "name": "完整控制流中间代码",
            "deadline": "2022-05-10",
            "description": "将AST转换为三地址码形式的中间表示，支持基本的控制流结构。"
        },
        {
            "id": "lab072",
            "name": "目标代码优化与生成",
            "deadline": "2022-05-25",
            "description": "将优化后的中间代码翻译为简易汇编指令，完成目标代码输出功能。"
        },
        // 2022-2023学年 第一学期
        {
            "id": "lab073",
            "name": "新版词法分析器开发",
            "deadline": "2022-10-06",
            "description": "使用Flex/Lex实现一个简单的词法分析器，支持基本标识符、关键字和运算符的识别。"
        },
        {
            "id": "lab074",
            "name": "词法模块健壮性测试",
            "deadline": "2022-10-24",
            "description": "完善词法分析器，识别非法字符、标识符格式错误并输出标准化错误提示。"
        },
        {
            "id": "lab075",
            "name": "高兼容性语法分析器",
            "deadline": "2022-11-09",
            "description": "基于给定的文法规则，实现递归下降语法分析器，能够构建抽象语法树。"
        },
        {
            "id": "lab076",
            "name": "大规模文法LL(1)实现",
            "deadline": "2022-11-24",
            "description": "对给定文法消除左递归与提取左公因子，构造LL(1)分析表并完成模拟分析。"
        },
        {
            "id": "lab077",
            "name": "全局语法容错处理",
            "deadline": "2022-12-07",
            "description": "为语法分析器添加错误恢复机制，出现语法错误后继续后续解析流程。"
        },
        {
            "id": "lab078",
            "name": "Lex&Bison综合项目",
            "deadline": "2022-12-20",
            "description": "借助Bison工具完成语法分析器开发，验证文法冲突检测与异常处理能力。"
        },
        // 2022-2023学年 第二学期
        {
            "id": "lab079",
            "name": "智能符号表管理",
            "deadline": "2023-03-04",
            "description": "独立设计哈希结构符号表，完成变量、函数信息的录入、查询与销毁操作。"
        },
        {
            "id": "lab080",
            "name": "强类型系统语义分析",
            "deadline": "2023-03-21",
            "description": "扩展语法分析器，添加语义分析功能，实现类型检查和符号表管理。"
        },
        {
            "id": "lab081",
            "name": "动态数组语义处理",
            "deadline": "2023-04-06",
            "description": "扩展语义分析模块，支持数组、自定义结构体的类型校验与内存布局计算。"
        },
        {
            "id": "lab082",
            "name": "LR分析器完整工程实现",
            "deadline": "2023-04-22",
            "description": "手工构造LR(0)项目集与分析表，编写程序模拟LR语法分析全过程。"
        },
        {
            "id": "lab083",
            "name": "面向对象中间代码",
            "deadline": "2023-05-09",
            "description": "将AST转换为三地址码形式的中间表示，支持基本的控制流结构。"
        },
        {
            "id": "lab084",
            "name": "代码全链路优化实践",
            "deadline": "2023-05-24",
            "description": "针对生成的三地址码实现常量折叠、公共子表达式消除等基础代码优化算法。"
        },
        // 2023-2024学年 第一学期
        {
            "id": "lab085",
            "name": "入门词法分析实战",
            "deadline": "2023-10-05",
            "description": "使用Flex/Lex实现一个简单的词法分析器，支持基本标识符、关键字和运算符的识别。"
        },
        {
            "id": "lab086",
            "name": "词法错误统一规范输出",
            "deadline": "2023-10-23",
            "description": "完善词法分析器，识别非法字符、标识符格式错误并输出标准化错误提示。"
        },
        {
            "id": "lab087",
            "name": "递归下降解析综合实验",
            "deadline": "2023-11-08",
            "description": "基于给定的文法规则，实现递归下降语法分析器，能够构建抽象语法树。"
        },
        {
            "id": "lab088",
            "name": "LL(1)文法工程实践",
            "deadline": "2023-11-23",
            "description": "对给定文法消除左递归与提取左公因子，构造LL(1)分析表并完成模拟分析。"
        },
        {
            "id": "lab089",
            "name": "语法错误自动修复",
            "deadline": "2023-12-06",
            "description": "为语法分析器添加错误恢复机制，出现语法错误后继续后续解析流程。"
        },
        {
            "id": "lab090",
            "name": "Bison冲突规避实践",
            "deadline": "2023-12-19",
            "description": "借助Bison工具完成语法分析器开发，验证文法冲突检测与异常处理能力。"
        },
        // 2023-2024学年 第二学期
        {
            "id": "lab091",
            "name": "高性能符号表设计",
            "deadline": "2024-03-03",
            "description": "独立设计哈希结构符号表，完成变量、函数信息的录入、查询与销毁操作。"
        },
        {
            "id": "lab092",
            "name": "语义检查全功能实现",
            "deadline": "2024-03-20",
            "description": "扩展语法分析器，添加语义分析功能，实现类型检查和符号表管理。"
        },
        {
            "id": "lab093",
            "name": "混合类型语义解析",
            "deadline": "2024-04-05",
            "description": "扩展语义分析模块，支持数组、自定义结构体的类型校验与内存布局计算。"
        },
        {
            "id": "lab094",
            "name": "LR语法全套实现",
            "deadline": "2024-04-21",
            "description": "手工构造LR(0)项目集与分析表，编写程序模拟LR语法分析全过程。"
        },
        {
            "id": "lab095",
            "name": "复杂语句中间代码生成",
            "deadline": "2024-05-08",
            "description": "将AST转换为三地址码形式的中间表示，支持基本的控制流结构。"
        },
        {
            "id": "lab096",
            "name": "目标代码综合优化",
            "deadline": "2024-05-23",
            "description": "将优化后的中间代码翻译为简易汇编指令，完成目标代码输出功能。"
        },
        // 2024-2025学年 第一学期
        {
            "id": "lab097",
            "name": "经典词法分析器复刻",
            "deadline": "2024-10-04",
            "description": "使用Flex/Lex实现一个简单的词法分析器，支持基本标识符、关键字和运算符的识别。"
        },
        {
            "id": "lab098",
            "name": "词法模块异常处理强化",
            "deadline": "2024-10-22",
            "description": "完善词法分析器，识别非法字符、标识符格式错误并输出标准化错误提示。"
        },
        {
            "id": "lab099",
            "name": "标准AST语法分析器",
            "deadline": "2024-11-07",
            "description": "基于给定的文法规则，实现递归下降语法分析器，能够构建抽象语法树。"
        },
        {
            "id": "lab100",
            "name": "LL(1)算法代码实现",
            "deadline": "2024-11-22",
            "description": "对给定文法消除左递归与提取左公因子，构造LL(1)分析表并完成模拟分析。"
        },
        {
            "id": "lab101",
            "name": "多模式语法错误恢复",
            "deadline": "2024-12-05",
            "description": "为语法分析器添加错误恢复机制，出现语法错误后继续后续解析流程。"
        },
        {
            "id": "lab102",
            "name": "Lex与Bison协同开发",
            "deadline": "2024-12-18",
            "description": "借助Bison工具完成语法分析器开发，验证文法冲突检测与异常处理能力。"
        },
        // 2024-2025学年 第二学期
        {
            "id": "lab103",
            "name": "持久化符号表实现",
            "deadline": "2025-03-02",
            "description": "独立设计哈希结构符号表，完成变量、函数信息的录入、查询与销毁操作。"
        },
        {
            "id": "lab104",
            "name": "端到端语义分析模块",
            "deadline": "2025-03-19",
            "description": "扩展语法分析器，添加语义分析功能，实现类型检查和符号表管理。"
        },
        {
            "id": "lab105",
            "name": "高级复合类型处理",
            "deadline": "2025-04-04",
            "description": "扩展语义分析模块，支持数组、自定义结构体的类型校验与内存布局计算。"
        },
        {
            "id": "lab106",
            "name": "LR语法分析完整实训",
            "deadline": "2025-04-20",
            "description": "手工构造LR(0)项目集与分析表，编写程序模拟LR语法分析全过程。"
        },
        {
            "id": "lab107",
            "name": "全功能中间代码生成器",
            "deadline": "2025-05-07",
            "description": "将AST转换为三地址码形式的中间表示，支持基本的控制流结构。"
        },
        {
            "id": "lab108",
            "name": "编译后端综合实验",
            "deadline": "2025-05-22",
            "description": "将优化后的中间代码翻译为简易汇编指令，完成目标代码输出功能。"
        },
        // 2025-2026学年 第一学期
        {
            "id": "lab109",
            "name": "词法分析器实现",
            "deadline": "2025-10-03",
            "description": "使用Flex/Lex实现一个简单的词法分析器，支持基本标识符、关键字和运算符的识别。"
        },
        {
            "id": "lab110",
            "name": "词法错误综合检测",
            "deadline": "2025-10-21",
            "description": "完善词法分析器，识别非法字符、标识符格式错误并输出标准化错误提示。"
        },
        {
            "id": "lab111",
            "name": "递归下降语法分析器",
            "deadline": "2025-11-06",
            "description": "基于给定的文法规则，实现递归下降语法分析器，能够构建抽象语法树。"
        },
        {
            "id": "lab112",
            "name": "LL(1)文法构造实验",
            "deadline": "2025-11-21",
            "description": "对给定文法消除左递归与提取左公因子，构造LL(1)分析表并完成模拟分析。"
        },
        {
            "id": "lab113",
            "name": "语法错误恢复实践",
            "deadline": "2025-12-04",
            "description": "为语法分析器添加错误恢复机制，出现语法错误后继续后续解析流程。"
        },
        {
            "id": "lab114",
            "name": "Bison语法工具实战",
            "deadline": "2025-12-17",
            "description": "借助Bison工具完成语法分析器开发，验证文法冲突检测与异常处理能力。"
        },
        // 2025-2026学年 第二学期（当前学期）
        {
            "id": "lab115",
            "name": "符号表设计与实现",
            "deadline": "2026-03-15",
            "description": "独立设计哈希结构符号表，完成变量、函数信息的录入、查询与销毁操作。"
        },
        {
            "id": "lab116",
            "name": "语义分析与类型检查",
            "deadline": "2026-04-10",
            "description": "扩展语法分析器，添加语义分析功能，实现类型检查和符号表管理。"
        },
        {
            "id": "lab117",
            "name": "数组与结构体语义处理",
            "deadline": "2026-04-28",
            "description": "扩展语义分析模块，支持数组、自定义结构体的类型校验与内存布局计算。"
        },
        {
            "id": "lab118",
            "name": "LR语法分析器模拟",
            "deadline": "2026-05-20",
            "description": "手工构造LR(0)项目集与分析表，编写程序模拟LR语法分析全过程。"
        },
        {
            "id": "lab119",
            "name": "中间代码生成器",
            "deadline": "2026-06-10",
            "description": "将AST转换为三地址码形式的中间表示，支持基本的控制流结构。"
        },
        {
            "id": "lab120",
            "name": "代码优化与目标代码生成",
            "deadline": "2026-06-25",
            "description": "针对三地址码实现基础优化，并将代码翻译为简易汇编指令完成输出。"
        }
    ],
    
    // 课程统计
    statistics: {
        totalStudents: 128,
        averageScore: 82.5,
        passRate: 94.2,
        excellentRate: 23.4,
        weeklyStudyHours: 8.5,
        satisfactionRate: 91.7
    }
};