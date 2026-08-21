// src/data/archiveDocuments.js
// 忒修斯之船 — 档案文档数据集
//
// 将 docs/ 目录下所有叙事文档转化为结构化数据，
// 供 DocumentViewer 组件渲染。
//
// 设计约束：
// - 文档按发现路径分散，非集中呈现
// - 保留"碎片感"：部分文档标注损坏/截断
// - 角色无上帝视角：档案说明仅对玩家可见

// ============================================================
// 文档注册表（元数据索引）
// ============================================================
export const archiveRegistry = [
    {
        id: '1984-graduate-application',
        title: '攻读神经科学专业硕士研究生申请书',
        year: 1984,
        category: 'personal',
        source: 'XX大学研究生院档案公示',
        accessLevel: 'hidden',
        corruptionLevel: 0,
        style: 'typewriter',
        summary: '22岁的林远写下"人之所以为人"的追问。',
        foundAt: '考古计划索引',
    },
    {
        id: '1987-masters-thesis',
        title: '海马体CA1区在远期记忆提取中的电生理特征研究（摘要）',
        year: 1987,
        category: 'academic',
        source: 'XX大学学位论文数据库（互联网档案馆存档）',
        accessLevel: 'public',
        corruptionLevel: 1,
        style: 'official',
        summary: '27岁的林远写下了对他40岁后经历的无意识预言。',
        foundAt: '教学资源库 → 历史档案',
    },
    {
        id: '1987-hospital-appointment',
        title: 'XX大学附属仁济医院报到通知书',
        year: 1987,
        category: 'medical',
        source: '仁济医院人事处档案（数据泄漏）',
        accessLevel: 'locked',
        corruptionLevel: 0,
        style: 'typewriter',
        summary: '25岁的林远收到第一份工作通知，科室主任写了一张便签。',
        foundAt: '系统控制台 → 数据泄漏终端',
    },
    {
        id: '1995-mri-records',
        title: 'MRI设备使用记录（1995年度）',
        year: 1995,
        category: 'medical',
        source: '仁济医院设备科日志（数据泄漏）',
        accessLevel: 'locked',
        corruptionLevel: 0,
        style: 'terminal',
        summary: '10次凌晨违规操作。操作者与受试者为同一人。',
        foundAt: '系统控制台 → 数据泄漏终端',
    },
    {
        id: '1995-counseling-record',
        title: '谈话记录 · 关于MRI设备非工作时间使用情况',
        year: 1995,
        category: 'medical',
        source: '仁济医院人事处档案（数据泄漏）',
        accessLevel: 'locked',
        corruptionLevel: 0,
        style: 'official',
        summary: '"你自己做受试者？"——科室主任问了一句他无法回答的话。',
        foundAt: '系统控制台 → 数据泄漏终端',
    },
    {
        id: '1995-funding-rejection',
        title: '科研项目申请书及驳回通知',
        year: 1995,
        category: 'medical',
        source: '仁济医院伦理委员会档案 + 科研处存档（数据泄漏）',
        accessLevel: 'locked',
        corruptionLevel: 0,
        style: 'official',
        summary: '"受试者：本人"——一句使整份文件变成绝望自白的话。',
        foundAt: '系统控制台 → 数据泄漏终端',
    },
    {
        id: '1997-self-study-notes',
        title: '个人学习笔记（片段）',
        year: 1997,
        category: 'personal',
        source: '林远个人网站 /notes/ 目录（互联网档案馆 2000年抓取）',
        accessLevel: 'corrupted',
        corruptionLevel: 2,
        style: 'blog',
        summary: '"写下来，就可以慢一点。"——四个深夜思考的残存片段。',
        foundAt: 'BBS 碎片版块',
    },
    {
        id: '2001-blog-information-complexity',
        title: '信息复杂性，以及我为什么开始学编译原理',
        year: 2001,
        category: 'personal',
        source: '林远个人博客（互联网档案馆存档）',
        accessLevel: 'public',
        corruptionLevel: 0,
        style: 'blog',
        summary: '"我的解码器，是不是坏了？"——从神经科学到计算机科学的转向宣言。',
        foundAt: 'BBS → Anonymous_03 签名',
    },
    {
        id: '2001-university-interview',
        title: 'XX大学软件学院教师岗位面试记录',
        year: 2001,
        category: 'academic',
        source: '软件学院人事档案',
        accessLevel: 'hidden',
        corruptionLevel: 0,
        style: 'official',
        summary: '"我需要这份工作。"——不是因为他需要钱。',
        foundAt: '师资队伍 → 林远条目',
    },
    {
        id: '2001-provincial-policy',
        title: 'XX省人民政府办公厅 · 推动高校发挥学术引擎功能的若干意见',
        year: 2001,
        category: 'academic',
        source: '省政府政务公开网',
        accessLevel: 'public',
        corruptionLevel: 0,
        style: 'official',
        summary: '一份官腔文件，成了林远命运的支点。',
        foundAt: '教学资源库 → 历史档案',
    },
    {
        id: '2001-resignation',
        title: '离职申请及相关文件',
        year: 2001,
        category: 'medical',
        source: '仁济医院人事处档案（数据泄漏）',
        accessLevel: 'locked',
        corruptionLevel: 0,
        style: 'official',
        summary: '四行字的离职信。一封从未被寄出的便条。',
        foundAt: '系统控制台 → 数据泄漏终端',
    },
    {
        id: '2002-blog-limits-of-metaphor',
        title: '我是不是在用一个错误的类比骗自己',
        year: 2002,
        category: 'personal',
        source: '林远个人博客（互联网档案馆存档）',
        accessLevel: 'public',
        corruptionLevel: 0,
        style: 'blog',
        summary: '"编译器不会自己修改自己的源码。但我的大脑会。"——阅读量7，评论0。',
        foundAt: 'BBS 帖子链接',
    },
    {
        id: '2002-course-syllabus',
        title: '《计算思维导论》课程大纲',
        year: 2002,
        category: 'academic',
        source: '至诚大学软件学院（学生笔记扫描件，2021年上传）',
        accessLevel: 'public',
        corruptionLevel: 0,
        style: 'official',
        summary: '"他每次说到人脑的时候语气会变。说不上来。"——学生笔记。',
        foundAt: '教学资源库 → 历史档案',
    },
    {
        id: '2003-teaching-evaluation',
        title: '教师教学评估报告（2002-2003学年）',
        year: 2003,
        category: 'academic',
        source: '至诚大学软件学院（互联网档案馆存档）',
        accessLevel: 'public',
        corruptionLevel: 0,
        style: 'official',
        summary: '4.825/5。"编译器是这个世界上最浪漫的软件"——林远的黄金时代。',
        foundAt: '课程主页 → 底部链接',
    },
    {
        id: '2004-bbs-student-discussion',
        title: '校园BBS"软院心声" · 林远相关讨论帖选辑',
        year: 2004,
        category: 'academic',
        source: '校园BBS备份磁盘镜像（2021年恢复）',
        accessLevel: 'hidden',
        corruptionLevel: 1,
        style: 'blog',
        summary: '"他有没有可能，其实并不想当\'神\'？他只是想当林远。"',
        foundAt: 'BBS 碎片版块',
    },
    {
        id: '2007-teaching-evaluation',
        title: '教师教学评估报告（2007-2008学年第一学期）',
        year: 2008,
        category: 'academic',
        source: '至诚大学软件学院内部档案（未公开）',
        accessLevel: 'hidden',
        corruptionLevel: 0,
        style: 'official',
        summary: '2.03/5。"今天先到这里。"——4分钟沉默。',
        foundAt: '师资队伍 → 林远条目（隐藏）',
    },
    {
        id: '2021-archaeology-project',
        title: '关于"忒修斯之船"考古计划',
        year: 2021,
        category: 'frame',
        source: '考古计划发起人在某知识分享平台的公开文章',
        accessLevel: 'public',
        corruptionLevel: 0,
        style: 'modern',
        summary: '"一个被封控在上海出租屋里的年轻人，撞进了一个陌生人的一生。"',
        foundAt: '门户首页 → 档案检索',
    },
    {
        id: '1992-sliding-window-paper',
        title: '《滑动窗式远期记忆渐进性缺失综合征》——病例报告',
        year: 1992,
        category: 'medical',
        source: '《中华神经科杂志》1992年第3期（图书馆扫描存档）',
        accessLevel: 'hidden',
        corruptionLevel: 1,
        style: 'official',
        summary: '一篇只有一名患者的病例报告——而这篇报告的署名作者，正是患者本人。',
        foundAt: '考古计划 → 学术检索',
    },
];

// ============================================================
// 按分类获取文档
// ============================================================
export const getDocsByCategory = (category) =>
    archiveRegistry.filter((d) => d.category === category);

export const getDocsByAccessLevel = (level) =>
    archiveRegistry.filter((d) => d.accessLevel === level);

export const getDocById = (id) =>
    archiveRegistry.find((d) => d.id === id);

// ============================================================
// 文档内容数据
// ============================================================

export const archiveContents = {
    // ==========================================================
    // 1984 — 研究生申请书
    // ==========================================================
    '1984-graduate-application': {
        metadata: {
            applicant: '林远',
            school: 'XX大学 生物医学工程专业',
            date: '1984年4月10日',
            to: 'XX大学研究生招生委员会、神经科学系',
        },
        sections: [
            {
                type: 'heading',
                content: '攻读神经科学专业硕士研究生申请书',
                level: 1,
            },
            {
                type: 'field',
                label: '申请人',
                value: '林远',
            },
            {
                type: 'field',
                label: '毕业院校',
                value: 'XX大学 生物医学工程专业',
            },
            {
                type: 'field',
                label: '申请时间',
                value: '1984年4月',
            },
            { type: 'divider' },
            {
                type: 'paragraph',
                content:
                    '尊敬的XX大学研究生招生委员会、神经科学系各位老师：\n\n您好！\n\n我是XX大学生物医学工程专业1984届应届本科毕业生林远。值此硕士研究生招生之际，我怀着无比崇敬与激动的心情，郑重申请攻读贵校神经科学专业硕士研究生，恳请各位老师予以审核。',
            },
            {
                type: 'paragraph',
                content:
                    '我出生于1962年，从小便对"人之所以为人"这一问题充满好奇。中学时期，一句"学好数理化，走遍天下都不怕"激励着我刻苦钻研自然科学知识。进入大学后，我在系统学习生物医学工程专业知识的过程中，逐渐将目光聚焦于人体最为复杂、最为神秘的器官——大脑。它如何感知外部世界，如何存储记忆，如何产生思想？这些问题时常在我脑海中萦绕，驱使我不断查阅资料、请教老师。我深知，探索大脑的奥秘，不仅是科学的前沿，更是理解人类自身的根本途径。',
            },
            {
                type: 'paragraph',
                content:
                    '贵校神经科学系作为我国该领域的重要研究与教学基地，师资力量雄厚，研究方向前沿。我对贵系在神经电生理、认知神经科学等领域取得的成果仰慕已久。特别是读到贵系发表的有关记忆机制的研究论文后，我更加坚定了报考的决心。我渴望能在这样一个严谨治学、勇于创新的学术环境中，系统学习神经科学理论，掌握实验技能，为我国神经科学事业的发展贡献自己的一份力量。',
            },
            {
                type: 'paragraph',
                content:
                    '在大学四年里，我始终严格要求自己，学习刻苦，成绩优良。我系统学习了高等数学、物理学、电子学、信号处理、人体解剖学、生理学等课程，具备了较为扎实的理工科与生命科学基础。在本科实习阶段，我参与了有关"视觉诱发电位"的初步实验，虽然条件有限，设备简陋，但那段在实验室里反复调试仪器、分析波形图的日子，让我第一次亲身感受到神经科学研究的魅力与艰辛。我体会到，科学研究来不得半点虚假，必须脚踏实地、一丝不苟。这也使我更加向往能进入贵系这样设备更完善、平台更优越的环境中深造。',
            },
            {
                type: 'paragraph',
                content:
                    '我深知，与本校或贵系科班出身的同学相比，我的神经科学专业基础知识尚不够系统，实验经验也较为有限。但我有着强烈的求知欲和不怕吃苦的精神。我相信，在老师的悉心指导下，通过自己的努力，一定能够弥补不足，迎头赶上。如果能有幸被录取，我将在以下几个方面努力：\n\n第一，系统修读神经科学专业研究生课程，夯实理论基础，特别是神经解剖学、神经生理学、认知神经科学等核心课程；\n\n第二，积极融入实验室工作，虚心向导师和师兄师姐学习，尽快掌握电生理、神经影像等相关实验技术；\n\n第三，广泛阅读国内外专业文献，培养独立思考和科研创新的能力，争取在记忆或认知相关领域找到感兴趣的研究方向；\n\n第四，积极参加学术交流活动，开拓视野，不断提升自己的学术水平。',
            },
            {
                type: 'paragraph',
                content:
                    '当前，我们的国家正处在改革开放的伟大时代，百废待兴，百业待举。四个现代化的宏伟蓝图召唤着每一位有志青年。邓小平同志指出，"科学技术是第一生产力"。我深感，作为新时代的大学生，应当将个人理想融入国家发展的洪流之中。尽管神经科学在我国起步较晚，基础薄弱，但我坚信，这门学科对于提升我国医疗水平、理解人类大脑、乃至推动人工智能等新兴领域的发展，都具有重要意义。我愿意做一名神经科学领域的拓荒者，哪怕只能贡献微薄之力，也倍感光荣。',
            },
            {
                type: 'paragraph',
                content:
                    '我深知，这条道路不会一帆风顺。但我已经做好了思想准备。我将以严谨求实的态度、坚韧不拔的毅力，去面对未来学习和研究中的每一个困难。\n\n恳请各位老师给我一个机会，让我能够追随贵系的老师们，在神经科学的广阔天地中学习、成长、探索。\n\n此致\n敬礼！',
            },
            {
                type: 'signature',
                content: '申请人：林远\n1984年4月10日',
            },
        ],
        archiveNote:
            '此文书语气热忱、格式严谨，体现出22岁的林远对神经科学的理想主义追求。文中"人之所以为人"这一追问，将成为他一生的学术执念——也是他后来用编译器理论重新框架记忆问题的原点。',
    },

    // ==========================================================
    // 1987 — 硕士论文摘要
    // ==========================================================
    '1987-masters-thesis': {
        metadata: {
            title: '海马体CA1区在远期记忆提取中的电生理特征研究',
            degree: '理学硕士',
            major: '神经科学',
            author: '林远',
            date: '1987年5月',
        },
        sections: [
            {
                type: 'heading',
                content: '海马体CA1区在远期记忆提取中的电生理特征研究',
                level: 1,
            },
            {
                type: 'field',
                label: '学位类型',
                value: '理学硕士',
            },
            { type: 'field', label: '专业', value: '神经科学' },
            { type: 'field', label: '作者', value: '林远' },
            { type: 'field', label: '完成日期', value: '1987年5月' },
            { type: 'divider' },
            {
                type: 'heading',
                content: '摘要',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '记忆的编码与提取机制是认知神经科学的核心问题之一。本研究以大鼠为模型，采用在体多通道电生理记录技术，系统观察了海马体CA1区锥体神经元在远期空间记忆提取过程中的放电模式变化。',
            },
            {
                type: 'paragraph',
                content:
                    '实验采用Morris水迷宫范式，对大鼠进行为期14天的空间定位训练后，分别于训练结束后第1天、第7天、第30天进行记忆提取测试，同步记录CA1区神经元放电活动。结果表明：\n\n1. CA1区位置细胞（place cell）在记忆提取期的放电频率与训练期高度相关（r = 0.87, p < 0.001），提示远期记忆的提取过程对海马体的依赖程度高于先前文献的估计；\n\n2. 部分记录位点（n=7/24）在记忆提取失败时表现出异常的theta节律调制，提示海马体局部环路在记忆提取失败时存在可被电生理检测的特征性活动模式；\n\n3. 记忆提取成功与失败的神经元集群编码模式存在显著差异（卡方检验，p < 0.01），提示"遗忘"并非简单的信息丢失，而可能对应于一种可被定义的、异常的神经编码状态。',
            },
            {
                type: 'quote',
                content:
                    '记忆提取失败可能不是存储介质的损坏，而是编码-解码过程的功能性故障。',
                attribution: '——林远，1987年硕士论文核心假说',
            },
            {
                type: 'paragraph',
                content:
                    '受实验条件所限，本研究样本量较小（n=8），且仅覆盖了30天的时间窗口。更长时间尺度的远期记忆变化模式，以及"记忆提取通路损伤"假说在人类被试中的验证，有待后续研究。',
            },
            {
                type: 'field',
                label: '关键词',
                value: '海马体；CA1区；远期记忆；记忆提取；位置细胞；theta节律',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '答辩委员会评语（节选）',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '该生的研究工作具有创新性，特别是关于"记忆提取失败可能是编码-解码功能障碍"的假说，为本领域提供了一个值得深入探索的思路。实验设计合理，数据分析严谨。同意通过硕士论文答辩。',
            },
            {
                type: 'corruption',
                content: '[论文正文（共47页）未在互联网档案馆中找到存档。仅摘要页被收录于XX大学学位论文数据库。]',
            },
        ],
        archiveNote:
            '这篇硕士论文是林远学术生涯的起点，但他自己后来很可能完全忘记了这篇论文的存在。文中最重要的那个假说——"记忆提取失败可能不是存储介质的损坏，而是编码-解码过程的功能性故障"——是27岁的林远对他40岁后即将经历的一切做出的无意识预言。他用大鼠做了实验，写了一篇论文，通过了答辩，然后在接下来的14年里，逐渐变成了他自己的实验对象。\n\n1995年伦理委员会驳回他的fMRI自我追踪课题时，他在申请书中未引用这篇硕士论文。这可能是因为他觉得硕士论文"不够分量"——或者，更可能的是，1995年的他已经无法清晰地回忆起1987年自己写过什么。',
    },

    // ==========================================================
    // 1987 — 仁济医院报到通知
    // ==========================================================
    '1987-hospital-appointment': {
        metadata: {
            docNo: '仁医人〔1987〕第49号',
            date: '1987年8月1日',
            position: '神经外科 研究实习员（专业技术十二级）',
        },
        sections: [
            {
                type: 'heading',
                content: 'XX大学附属仁济医院报到通知书',
                level: 1,
            },
            { type: 'field', label: '编号', value: '仁医人〔1987〕第49号' },
            {
                type: 'paragraph',
                content:
                    '林远同志：\n\n经医院研究决定，并报请上级主管部门批准，同意接收您为我院神经外科 研究实习员（专业技术十二级）。请您于1987年8月25日前携带以下材料来我院人事处办理报到手续。',
            },
            {
                type: 'heading',
                content: '报到须知',
                level: 2,
            },
            {
                type: 'list',
                items: [
                    '本人身份证及户口簿复印件',
                    '毕业证书及学位证书原件',
                    '近期一寸免冠照片三张',
                    '党（团）组织关系介绍信',
                    '粮油关系转移证明',
                ],
            },
            {
                type: 'heading',
                content: '薪资待遇',
                level: 2,
            },
            {
                type: 'table',
                headers: ['项目', '金额'],
                rows: [
                    ['基本工资', '人民币78元/月'],
                    ['粮价补贴', '5元/月'],
                    ['奖金', '视科室效益及个人考核情况发放'],
                ],
            },
            {
                type: 'heading',
                content: '其他说明',
                level: 2,
            },
            {
                type: 'list',
                items: [
                    '报到后试用期为六个月，期满考核合格者转正定级；',
                    '医院提供集体宿舍床位一张（需自备被褥），月租金8元。',
                ],
            },
            {
                type: 'paragraph',
                content:
                    '欢迎您加入仁济医院，希望您在未来的工作中，发扬刻苦钻研、精益求精的精神，为我院神经外科的发展贡献力量！',
            },
            {
                type: 'signature',
                content:
                    'XX大学附属仁济医院 人事处（公章）\n1987年8月1日\n\n抄送：神经外科、总务科、财务科\n存档：院办、人事处',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '手写便签（附后，科室主任笔迹）',
                level: 2,
            },
            {
                type: 'quote',
                content:
                    '小林：\n欢迎。别着急，先熟悉环境。\n\n张\n1987.8.3',
                attribution: '',
            },
        ],
        archiveNote:
            '这是林远进入医疗系统的第一份正式文件。25岁的他进入神经外科，以"研究实习员"身份开始职业生涯。科室主任的手写便签显示出对这位新人的善意。这也是林远人生中最后一个"正常"的起点——一切尚未开始，一切尚有可能。',
    },

    // ==========================================================
    // 1995 — MRI使用记录
    // ==========================================================
    '1995-mri-records': {
        metadata: {
            device: 'MRI-01_SIGNA_1.5T',
            hospital: 'XX大学附属仁济医院',
            department: '放射科/MRI室',
            dateRange: '1995-01-01 至 1995-12-31',
        },
        sections: [
            {
                type: 'heading',
                content: 'MRI设备使用记录（1995年度）',
                level: 1,
            },
            {
                type: 'field',
                label: '设备编号',
                value: 'MRI-01_SIGNA_1.5T',
            },
            { type: 'field', label: '科室', value: '放射科/MRI室' },
            {
                type: 'paragraph',
                content:
                    '以下为1995年度全部MRI使用记录的JSON导出。注意：其中10条记录的操作者与受试者均为林远，且均在凌晨1:00-5:30之间，无技师在场。',
            },
            {
                type: 'code',
                language: 'json',
                content: `{
  "device_id": "MRI-01_SIGNA_1.5T",
  "hospital": "XX大学附属仁济医院",
  "department": "放射科/MRI室",
  "date_range": "1995-01-01 至 1995-12-31",
  "records": [
    {
      "date": "1995-01-14",
      "start_time": "09:00:00",
      "end_time": "11:30:00",
      "operator": "[放射科技师A]",
      "technician_present": true,
      "patient_id": "P95011402",
      "scan_type": "头颅平扫",
      "remarks": ""
    },
    {
      "date": "1995-02-23",
      "start_time": "14:00:00",
      "end_time": "16:15:00",
      "operator": "[放射科技师B]",
      "technician_present": true,
      "patient_id": "P95022315",
      "scan_type": "腰椎",
      "remarks": ""
    },
    // ══════════════════════════════════════
    // 以下为林远违规操作记录（共10次）
    // ══════════════════════════════════════
    {
      "date": "1995-03-17",
      "start_time": "02:23:00",
      "end_time": "05:47:00",
      "operator": "林远",
      "technician_present": false,
      "patient_id": "林远",
      "scan_type": "头颅平扫",
      "remarks": ""
    },
    {
      "date": "1995-03-19",
      "start_time": "01:58:00",
      "end_time": "05:12:00",
      "operator": "林远",
      "technician_present": false,
      "patient_id": "林远",
      "scan_type": "头颅平扫",
      "remarks": ""
    },
    {
      "date": "1995-03-21",
      "start_time": "02:10:00",
      "end_time": "04:45:00",
      "operator": "林远",
      "technician_present": false,
      "patient_id": "林远",
      "scan_type": "头颅平扫",
      "remarks": ""
    },
    {
      "date": "1995-06-02",
      "start_time": "01:20:00",
      "end_time": "04:35:00",
      "operator": "林远",
      "technician_present": false,
      "patient_id": "林远",
      "scan_type": "头颅fMRI",
      "remarks": "任务刺激：文字阅读"
    },
    {
      "date": "1995-06-04",
      "start_time": "02:05:00",
      "end_time": "05:00:00",
      "operator": "林远",
      "technician_present": false,
      "patient_id": "林远",
      "scan_type": "头颅fMRI",
      "remarks": "任务刺激：文字阅读"
    },
    {
      "date": "1995-06-07",
      "start_time": "01:45:00",
      "end_time": "04:50:00",
      "operator": "林远",
      "technician_present": false,
      "patient_id": "林远",
      "scan_type": "头颅fMRI",
      "remarks": "任务刺激：文字阅读"
    },
    {
      "date": "1995-06-09",
      "start_time": "02:00:00",
      "end_time": "05:15:00",
      "operator": "林远",
      "technician_present": false,
      "patient_id": "林远",
      "scan_type": "头颅fMRI",
      "remarks": "任务刺激：文字阅读"
    },
    {
      "date": "1995-09-12",
      "start_time": "01:30:00",
      "end_time": "04:40:00",
      "operator": "林远",
      "technician_present": false,
      "patient_id": "林远",
      "scan_type": "头颅fMRI",
      "remarks": "任务刺激：编译原理习题"
    },
    {
      "date": "1995-09-14",
      "start_time": "02:15:00",
      "end_time": "05:30:00",
      "operator": "林远",
      "technician_present": false,
      "patient_id": "林远",
      "scan_type": "头颅fMRI",
      "remarks": "任务刺激：编译原理习题"
    },
    {
      "date": "1995-09-16",
      "start_time": "01:50:00",
      "end_time": "05:05:00",
      "operator": "林远",
      "technician_present": false,
      "patient_id": "林远",
      "scan_type": "头颅fMRI",
      "remarks": "任务刺激：编译原理习题"
    }
  ],
  "export_timestamp": "1996-01-10 09:30:00",
  "exported_by": "设备科"
}`,
            },
            {
                type: 'corruption',
                content: '[注：此数据来自医院内部系统泄露。原始JSON中另含约190条其他患者的正常检查记录，已省略。]',
            },
        ],
        archiveNote:
            '1995年3月至9月间，林远在凌晨时段独自操作MRI设备共计10次。前三次为头颅平扫（3月），后七次为功能性磁共振（6-9月），且任务刺激从"文字阅读"切换为"编译原理习题"——这与他自学计算机科学的时间线吻合。所有林远操作记录均无技师在场，均在凌晨1:00-5:30之间，操作者与受试者均为本人。这些记录是他被约谈的直接导火索。',
    },

    // ==========================================================
    // 1995 — 约谈记录
    // ==========================================================
    '1995-counseling-record': {
        metadata: {
            docNo: '仁医人〔1995〕第21号',
            date: '1995年9月25日 下午14:30',
            location: '神经外科主任办公室',
            present: '科室主任、林远、科室秘书',
        },
        sections: [
            {
                type: 'heading',
                content: '谈话记录 · 关于MRI设备非工作时间使用情况',
                level: 1,
            },
            { type: 'field', label: '编号', value: '仁医人〔1995〕第21号' },
            {
                type: 'field',
                label: '时间',
                value: '1995年9月25日 下午14:30',
            },
            { type: 'field', label: '地点', value: '神经外科主任办公室' },
            { type: 'field', label: '谈话人', value: '科室主任' },
            { type: 'field', label: '被谈话人', value: '林远（神经外科研究实习员）' },
            { type: 'field', label: '记录人', value: '科室秘书' },
            {
                type: 'field',
                label: '事由',
                value: '关于MRI设备非工作时间使用情况',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '谈话内容记录',
                level: 2,
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '小林，今天找你来，是想了解一下最近设备科反馈的情况。MRI室的日志显示，你最近几个月在凌晨时段使用设备的频率比较高。从6月到9月，有好几次。你能跟我说说怎么回事吗？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content: '是的。我在做一组影像数据采集。',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '采集什么数据？申请单和伦理审批材料我这边没有看到。',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '是我自己的。我自己做受试者，想追踪一下特定认知任务下的脑区激活模式。',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content: '你自己的？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '对。患者ID写的是我自己的名字。',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '……你知道按规定，即使是本人，也要走申请流程。而且夜间单独操作设备，安全上也是个问题。',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '我知道。只是白天科室排得太满，我只能晚上做。',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '你在研究什么方向？跟科室目前的工作有关联吗？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '有关联。我在关注记忆的神经编码机制。特别是远期记忆的巩固和提取过程。',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '这个方向跟你92年发的那篇论文有关？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '是。我想继续往下做。',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '但你现在没有独立的课题经费，也没有获批的实验方案。这样自己做，万一出了问题，科室这边也没办法替你担责任。',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '我明白。我会注意安全。',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '（停顿片刻）小林，你是科里学历背景比较特殊的一个人，我一直觉得你对问题的理解比别人深。但这几年我也注意到，你好像越来越……怎么说呢，沉浸在一些自己的事情里。',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content: '（沉默）',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '我说这些，不是要批评你。科里其他同事对你有议论，我压下来了。只是希望你注意方式方法。该走的流程要走，该申请的课题要申请。你这样一个人晚上在MRI室里待三四个小时，传出去不好听。',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content: '我知道了。',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '还有，你最近状态怎么样？有没有哪里不舒服？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content: '没有。',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '你确定？我看你这半年出勤倒是正常，但话比以前少了。',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content: '（停顿）只是睡得不太好。',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '那你自己注意。身体是革命的本钱，这不是套话。你有什么需要科里帮忙的，可以跟我说。',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content: '谢谢主任。',
            },
            {
                type: 'dialogue',
                speaker: '主任',
                content:
                    '设备的事，暂时就这样。以后如果要使用，提前报备一下。别再凌晨自己去了。',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content: '好。',
            },
            { type: 'divider' },
            {
                type: 'signature',
                content:
                    '谈话人签字：[科室主任]\n被谈话人签字：林远\n记录人签字：[科室秘书]\n日期：1995年9月25日',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '备注（手写，主任笔迹）',
                level: 2,
            },
            {
                type: 'quote',
                content:
                    '小林签完字就走了。临走时我说"有问题随时找我"，他点了点头，但没说话。他状态确实不太对，又说不上来哪不对。',
                attribution: '',
            },
        ],
        archiveNote:
            '这是林远在医院期间被约谈的正式记录。对话中林远始终无法给出合理的科研解释——因为根本不存在一个"正常"的科研计划。他只是想看到自己大脑里正在发生什么。主任最后的备注显示，即使是最关心他的人，也只能感受到"不对劲"，而无法理解到底发生了什么。',
    },

    // ==========================================================
    // 1995 — 课题申请与驳回
    // ==========================================================
    '1995-funding-rejection': {
        metadata: {
            projectName: '远期记忆编码与提取的fMRI研究——基于纵向自我受试者的探索性分析',
            applicant: '林远',
            department: '神经外科',
            applyDate: '1995年11月10日',
            amount: '¥48,000.00',
            rejectNo: '仁伦审〔1995〕第18号',
            rejectDate: '1995年11月28日',
        },
        sections: [
            {
                type: 'heading',
                content: '文件一：经费申请书',
                level: 1,
            },
            {
                type: 'field',
                label: '项目名称',
                value: '远期记忆编码与提取的fMRI研究——基于纵向自我受试者的探索性分析',
            },
            { type: 'field', label: '申请人', value: '林远（神经外科）' },
            { type: 'field', label: '申请日期', value: '1995年11月10日' },
            {
                type: 'field',
                label: '申请金额',
                value: '肆万捌仟元整（¥48,000.00）',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '一、立项依据',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '记忆是认知功能的核心。远期记忆的编码、巩固与提取机制，在神经科学领域仍存在大量未知。1992年，本人曾在《中华神经科杂志》发表《滑动窗式远期记忆渐进性缺失综合征》一文，描述了一种以源记忆损害为主要特征的罕见记忆障碍模式。此后三年，本人持续关注该领域，并尝试通过单一个案的纵向追踪，探索记忆丢失的神经相关因素。\n\n目前，国内在该领域尚缺乏基于功能影像学的长时程追踪数据。本研究拟填补这一空白。',
            },
            {
                type: 'heading',
                content: '二、研究目标',
                level: 2,
            },
            {
                type: 'list',
                items: [
                    '追踪特定认知任务（编译原理习题推演、国际象棋残局分析）执行过程中的脑区激活模式；',
                    '探索海马体-前额叶通路在记忆编码与提取中的动态变化；',
                    '为"滑动窗式记忆缺失"假说提供影像学证据。',
                ],
            },
            {
                type: 'heading',
                content: '三、研究方法',
                level: 2,
            },
            {
                type: 'list',
                items: [
                    '受试者：本人（男性，33岁，右利手，无神经病史）',
                    '设备：本院MRI室1.5T磁共振成像仪（SIGNA 1.5T）',
                    '任务范式：闭眼状态下进行编译原理习题默算、国际象棋残局推演，同时采集BOLD信号',
                    '频次：每周2-3次，每次约3小时，持续6个月',
                    '数据分析：使用SPM软件进行脑区激活图谱分析',
                ],
            },
            {
                type: 'heading',
                content: '四、经费预算',
                level: 2,
            },
            {
                type: 'table',
                headers: ['项目', '金额（元）', '说明'],
                rows: [
                    ['MRI设备使用费', '30,000', '按院内价100元/小时，预计300小时'],
                    ['数据分析软件', '8,000', 'SPM软件授权及培训'],
                    ['文献资料费', '5,000', '外文期刊、专著'],
                    ['论文版面费', '5,000', '预留'],
                    ['合计', '48,000', ''],
                ],
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '文件二：驳回通知',
                level: 1,
            },
            {
                type: 'field',
                label: '编号',
                value: '仁伦审〔1995〕第18号',
            },
            { type: 'field', label: '审查日期', value: '1995年11月28日' },
            {
                type: 'field',
                label: '审查结论',
                value: '驳回',
                highlight: true,
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '审查意见',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '经伦理委员会审议，认为本项目存在以下问题，不符合《赫尔辛基宣言》及本院《临床研究伦理准则》的相关规定，决定不予批准。',
            },
            {
                type: 'heading',
                content: '主要问题',
                level: 2,
            },
            {
                type: 'list',
                ordered: true,
                items: [
                    '研究者与受试者身份重叠 — 申请人同时担任研究者和唯一受试者，存在严重利益冲突，无法保证研究过程的客观性和受试者权益的充分保护。',
                    '缺乏独立第三方监督 — 实验过程中无独立的医疗监督人员在场，一旦受试者出现身体不适或设备异常，无法及时获得救助。',
                    '实验方案设计不完整 — 缺少对照组；样本量过小（n=1），无法形成具有统计学意义的结论；未阐明如何区分实验效应与个体差异。',
                    '风险收益评估不充分 — 高频率、长时间的功能磁共振扫描对受试者的未知风险未做充分评估。申请人未提供已有文献中对健康志愿者进行同类研究的安全性数据。',
                    '知情同意问题 — 申请人作为受试者，签署知情同意书的自主性存疑。按现行伦理准则，研究者不应在自己的研究中担任受试者。',
                ],
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '文件三：科室内部备忘录（节选）',
                level: 1,
            },
            {
                type: 'field',
                label: '日期',
                value: '1995年12月5日',
            },
            {
                type: 'paragraph',
                content:
                    '伦理委员会的驳回通知已经下来。昨天我和小林谈了一次，他情绪比较稳定，但对"增加其他受试者"这条建议抵触较大。',
            },
            {
                type: 'quote',
                content:
                    '"主任，我做这个不是为了发论文。我只是想知道我自己脑子里发生了什么。"',
                attribution: '——林远，1995年12月5日',
            },
            {
                type: 'paragraph',
                content:
                    '我当时没接话。他走后，我翻了一下他的出勤记录。最近半年，他白天正常上班，凌晨去做扫描，睡眠时间大概只有三四个小时。一个正常人，撑不住的。我已经跟他说，让他先休一周假。他答应了。这件事先这样。我会继续关注。',
            },
            {
                type: 'signature',
                content: '——[科室主任]\n1995.12.5',
            },
        ],
        archiveNote:
            '申请书与驳回通知构成了一组极为克制的悲剧文本。申请书本身逻辑清晰、格式规范，是一个受过良好训练的科研人员写出的标准文件——但"受试者：本人"四个字让这封申请书成为一份绝望的自白。伦理委员会的每一条驳回理由都是对的。每一条也是悲哀的。',
    },

    // ==========================================================
    // 1997 — 学习笔记片段
    // ==========================================================
    '1997-self-study-notes': {
        metadata: {
            source: '林远个人网站 /notes/ 目录（互联网档案馆 2000年2月24日抓取）',
            recovered: '4个片段。其余页面因 robots.txt 限制未被完整存档。',
        },
        sections: [
            {
                type: 'heading',
                content: '林远 · 个人学习笔记（片段）',
                level: 1,
            },
            {
                type: 'corruption',
                content:
                    '[说明：以下内容来自互联网档案馆 Wayback Machine 对林远个人网站的2000年2月24日抓取快照。该网站于2008年前后无法访问。目前仅恢复以下4个页面片段，其余页面因 robots.txt 限制未被完整存档。片段之间的关联性由恢复者根据内部链接推定。]',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '片段一：compiler-and-brain.txt',
                level: 2,
            },
            {
                type: 'field',
                label: '最后更新',
                value: '1997年11月3日',
            },
            {
                type: 'paragraph',
                content:
                    '今天在龙书第1章读到一个东西。编译器的工作流程：source program → lexical analyzer → syntax analyzer → semantic analyzer → intermediate code generator → code optimizer → code generator → target program。',
            },
            {
                type: 'paragraph',
                content:
                    '这让我想起一些事情。我在仁济医院的时候给病人做神经心理评估，量表里有一个项目叫"语义流畅性"：给被试一个类别词（比如"动物"），让他在60秒内说出尽可能多的属于该类别的词。有些颞叶损伤的病人，他可以说出"猫""狗""鸟"，但他会说"沙发"。\n\n为什么是沙发？沙发不属于"动物"这个语义类别。\n\n如果——我只是在想——如果大脑对词汇的组织方式，不是按"语义类别"分的，而是按"语音"或者"出现频率"分的呢？就像一个糟糕的编译器，在处理符号表的时候，用哈希函数产生了碰撞，把不属于这个 bucket 的 token 也放进来了。\n\n"沙发"是一个碰撞产物。它的哈希值恰好和"猫"落在了同一个桶里。\n\n这不是发疯。如果我能证明这一点——如果我能证明记忆提取的失败是因为"符号表"的索引结构出了问题，而不是因为"记忆"本身被删除了——我就有了一个实验。\n\n但我怎么能证明？我需要一个人的大脑，一个正在出问题的符号表，我需要看到这个人的错误提取模式。\n\n我不知道去哪里找这样一个人。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '片段二：memory-as-compilation.txt',
                level: 2,
            },
            {
                type: 'field',
                label: '创建于',
                value: '1998年1月15日',
            },
            {
                type: 'paragraph',
                content:
                    '假设记忆不是一个"存储"过程，而是一个"编译"过程。',
            },
            {
                type: 'paragraph',
                content:
                    '输入：来自感官的原始信号（声音、图像、气味）\n词法分析：将这些信号切分成有意义的单元（一个面孔、一句话）\n语法分析：建立这些单元之间的结构关系（谁对谁做了什么）\n语义分析：赋予这些结构以含义（这个事件的"意思"是什么）\n中间代码生成：将含义转换为与具体感官通道无关的抽象表示\n优化：丢弃不重要的细节，保留核心结构\n目标代码生成：将抽象表示存储为长期可访问的形式',
            },
            {
                type: 'paragraph',
                content:
                    '如果这个过程是对的，那"遗忘"就不是"存储失败"。遗忘对应的是编译过程中的某一阶段出了问题。\n\n如果词法分析出问题：你能听见别人说话，但听不懂每个词的意思。\n如果语法分析出问题：你能理解每个词，但不能理解它们之间的关系。\n如果语义分析出问题：你能理解句子的结构，但不能理解它的意思。\n如果中间代码生成出问题：你理解了意思，但不能把它转化为抽象的长期记忆。\n\n而我自己的情况——也许是在"优化"阶段？我在丢失那些"不重要"的细节。问题是，什么算"不重要"？\n\n我越来越觉得，我的大脑自己决定什么是重要的，而且我不在这个决策会议里。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '片段三：fragments.txt',
                level: 2,
            },
            {
                type: 'field',
                label: '最后修改',
                value: '1998年6月',
            },
            {
                type: 'corruption',
                content: '（前面部分已损坏，无法恢复）',
            },
            {
                type: 'paragraph',
                content:
                    '……今天在翻仁济医院的旧笔记（1994年那批，我居然还留着），看到我当时做的记忆自评表格。上面列了：具体事件、发生时间、地点、人物、情感色彩、是否清晰。',
            },
            {
                type: 'paragraph',
                content:
                    '1980年的高考。我清楚地记得考场里风扇的声音，嗡嗡嗡嗡。我甚至记得我写完最后一道物理题的时候，手是抖的。但我记不起来谁和我一个考场。监考老师的长相。那天的天气。这些都没有了。\n\n风扇的声音。其他都没了。\n\n按照我的"编译过程"假说，这算是哪种错误？不是"信息丢失"——风扇的声音还在。更像是"选择性保留"——编译器在优化时，认为"风扇的声音"这条信息是重要的，值得保留为"代表高考经验的符号"。其他细节被优化掉了，因为编译器认为它们"冗余"。\n\n但谁来决定什么是冗余的？我？\n\n显然不是。',
            },
            {
                type: 'corruption',
                content: '……（中间部分无法恢复）……',
            },
            {
                type: 'paragraph',
                content:
                    '香农的信息论。最近终于把香农1948年的论文读完了。有一个想法挥之不去：\n\n信道容量。如果一条信道能传输C比特每秒，而信息源产生H比特每秒的信息，那么如果H≤C，传输就应该是无差错的。如果H>C，就一定会出错。不管你用多聪明的编码方式。\n\n如果我的海马体到皮层之间的信道容量在下降呢？\n\n这不一定是"神经元死亡"。也许只是信道的某种物理属性在改变。髓鞘退化？突触间隙的改变？我不知道。fMRI给不了我这么细的分辨率。\n\n但如果是信道容量的问题，那就意味着：只要信息源产生的信息量不超过剩余的信道容量，传输就仍然是无差错的。我可以学会调整我的"信息产生速率"。说话慢一点。写短句子。不要一次想太多。\n\n这就是为什么我最近在写这个笔记。\n\n写下来，就可以慢一点。',
            },
            {
                type: 'corruption',
                content: '……（后面部分无法恢复）……',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '片段四：一个未命名的文件',
                level: 2,
            },
            {
                type: 'field',
                label: '创建于',
                value: '1998年12月',
            },
            {
                type: 'corruption',
                content: '（前面的内容似乎是另一段笔记的结尾，已丢失）',
            },
            {
                type: 'paragraph',
                content:
                    '……编了一下午的程序。一个很简单的词法分析器，读入一段中文文本，输出token序列。分词用的是最大匹配。很粗糙。',
            },
            {
                type: 'paragraph',
                content:
                    '我把1994年博客里写的那篇文章（就是我记录"文革记忆缺失"的那篇）输入进去。分词器跑出来的结果：\n\n- 总token数：1,247\n- 其中动词占31%（比正常文章高很多——我后来查了，正常中文文本动词占比大约22-25%）\n- 情感词的占比不到1%\n\n这可能说明什么？我不确定。也许什么都不说明。也许我在写那篇博客的时候，不是在"回忆"，而是在用分析性的、行为性的语言去覆盖一片我够不到的区域。动词多是因为我在描述自己的行为，而不是自己的感受。',
            },
            {
                type: 'paragraph',
                content:
                    '让我再试一次。这次输入的是我1984年写的硕士申请书。\n\n分词结果：\n- 动词占比：24%\n- 情感词占比：正常\n\n因为那时候我还能"感受"。我还记得"理想"是什么感觉。',
            },
            {
                type: 'quote',
                content:
                    '这个词……我现在写"理想"这个字，手指敲在键盘上，Polo……我在想：我上一次感受到"理想"是什么时候？不是"想起"这个词的定义，而是"感受到"它——胸腔发热，呼吸加快，想要做一件事情的冲动——这种感觉。\n\n我想不起来。理智上我知道这个词的意思。但"感受"不到。\n\n我的编译器优化掉了情感色彩。\n\n只剩下动词。',
                attribution: '',
            },
        ],
        archiveNote:
            '这些笔记片段是2021年考古计划在互联网档案馆中发现的最重要的一批材料。它们展现了一个正在从神经科学语言转向计算机科学语言的人，在深夜独自思考的原始轨迹。档案中可见的那句"写下来，就可以慢一点"，是林远对自己病情的无意识描述——他在用"写"来给自己的认知降速，好让那条正在变窄的信道还能勉强跟上。',
    },

    // ==========================================================
    // 2001 — 博客：信息复杂性
    // ==========================================================
    '2001-blog-information-complexity': {
        metadata: {
            date: '2001年7月16日',
            tags: '神经科学 · 理论计算机 · 记忆 · 转向',
            views: 4,
        },
        sections: [
            {
                type: 'heading',
                content: '信息复杂性，以及我为什么开始学编译原理',
                level: 1,
            },
            {
                type: 'field',
                label: '发布日期',
                value: '2001年7月16日',
            },
            {
                type: 'field',
                label: '标签',
                value: '神经科学 · 理论计算机 · 记忆 · 转向',
            },
            { type: 'field', label: '阅读量', value: '4' },
            { type: 'divider' },
            {
                type: 'paragraph',
                content:
                    '上个月，我在arXiv上读到一篇论文。作者是Chakrabarti和姚期智等人，题目是《信息复杂性》，发表在STOC \'01。',
            },
            {
                type: 'paragraph',
                content:
                    '这不是我第一次接触计算机科学。1994年刚上网那会儿，我就读过图灵、冯·诺依曼、香农。但那都是"科普式的了解"。这次不一样。这次我是真的想弄明白。',
            },
            {
                type: 'paragraph',
                content:
                    '信息复杂性讨论的是这样一个问题：两个人各自知道一些信息，通过对话交换信息，最终每个人都知道了全部。为了达成这个目标，他们需要交换多少比特？或者说，这个计算问题的"信息成本"是多少？\n\n这是个很深刻的问题。它把"信息"从模糊的概念变成了可以量化的对象。一个证明。一个算法。一个定理。它们都有自己的"信息重量"。\n\n我读着读着，心里产生了一个念头。\n\n我们的大脑，是不是也在做同样的事？\n\n海马体。前额叶皮层。它们之间的对话，需要多少比特的信息交换？当一个记忆被编码时，这个记忆的"信息复杂性"是多少？当这个记忆开始丢失时，是信息交换的成本太高了，还是信道本身出了问题？',
            },
            {
                type: 'quote',
                content: '这不是一个比喻。\n\n我越来越觉得这不是一个比喻。',
                attribution: '',
            },
            {
                type: 'paragraph',
                content:
                    '我做神经科学十几年。从1987年进实验室，到1992年发表那篇关于"滑动窗式记忆缺失"的论文。我一直以为我在研究一个"生物学问题"——突触、神经元、神经递质。\n\n但或许我一开始就错了。\n\n或许记忆的根本，不是生物学问题，而是信息问题。',
            },
            {
                type: 'paragraph',
                content:
                    '信息可以被复制。信息可以被编码。信息可以在信道上传输。信息可以被压缩。信息可以被丢失。\n\n信息被丢失，不是因为神经元坏死了（虽然那也会导致丢失），而是因为信息的"信噪比"太低，或者"编码方式"出了问题，或者"解码器"坏了。',
            },
            {
                type: 'quote',
                content: '我的解码器，是不是坏了？',
                attribution: '',
            },
            {
                type: 'paragraph',
                content:
                    '我读完那篇论文，在办公室里坐了很久。然后我做了一个决定：我要从头开始学计算机科学。\n\n不是"了解"，是"学"。\n\n我要学数据结构。我要学算法。我要学计算复杂性。我要学编译原理。\n\n为什么是编译原理？因为我需要知道：一段"意义"是如何从源代码（用高级语言写成的）一步一步变成机器可以执行的指令的。这个过程——词法分析、语法分析、语义分析、中间代码生成、优化、目标代码生成——它不就是"理解"的一个模型吗？',
            },
            {
                type: 'paragraph',
                content:
                    '一个人的大脑，接受到外界的信号（声音、文字、图像），然后把它"编译"成记忆。这个记忆，就是大脑可以"执行"的代码。\n\n我想知道这个编译过程是怎么工作的。更想知道，当这个编译过程出错时，会发生什么。',
            },
            {
                type: 'paragraph',
                content:
                    '我知道这个转向很奇怪。一个三十九岁的神经科学研究者，开始学编译原理。白天我在医院上班，晚上我在灯下读龙书，写词法分析器。办公室里的人大概觉得我不太正常。我确实不太正常。\n\n但我觉得这是对的。\n\n十几年来，我一直在试图"理解"记忆。用生物学的方法。用影像学的方法。用自己的大脑做实验的方法。\n\n都没有用。\n\n也许问题不在于"理解"的方法，而在于"理解"的对象。也许记忆这个东西，本来就不是生物学问题，而是信息问题。\n\n如果是这样，我就需要换一套工具。\n\n所以我在这里。\n\n2001年7月，我三十九岁，从零开始学编译原理。',
            },
            {
                type: 'quote',
                content: '我已经没有太多时间了。',
                attribution: '',
            },
            {
                type: 'paragraph',
                content:
                    '昨天我在办公室翻到1992年的那篇论文。那是我发表的第一篇论文，也是最后一篇。那时候我才三十岁，觉得自己可以在这个领域做出一些不一样的东西。九年过去了。我没做出什么。但我至少知道了，我该往哪个方向走。',
            },
            {
                type: 'paragraph',
                content:
                    '这个博客大概没什么人看。没关系。我写这些，是为了让自己记住：在这一天，在这个时间点，我曾经这样想过。以后的事，以后再说。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '评论区',
                level: 2,
            },
            {
                type: 'comment',
                author: '匿名用户',
                date: '2001年7月17日',
                content:
                    '林老师，你的方向太交叉了。国内可能很难找到支持你的人。加油。',
            },
            {
                type: 'comment',
                author: '林远',
                date: '2001年7月17日',
                content:
                    '我知道。不需要支持。只需要知道这个方向是对的。',
                isReply: true,
            },
            {
                type: 'field',
                label: '最后修改时间',
                value: '2001年7月16日 23:47',
            },
        ],
        archiveNote:
            '此文是林远从神经科学转向计算机科学的关键思想节点。他将记忆的本质重新定义为"信息问题"而非"生物学问题"——这既是突破，也是自我诊断的尝试。文中"我的解码器，是不是坏了？"和"我已经没有太多时间了"两处，是整篇最诚实、最脆弱的瞬间。',
    },

    // ==========================================================
    // 2001 — 大学面试记录
    // ==========================================================
    '2001-university-interview': {
        metadata: {
            docNo: '软院人〔2001〕第09号',
            date: '2001年8月20日 上午9:30',
            location: '软件学院会议室',
            position: '编译原理/计算理论方向 讲师',
            interviewers: '院长、计算机科学系主任、教学督导、编译原理课程负责人（教授）',
        },
        sections: [
            {
                type: 'heading',
                content: 'XX大学软件学院教师岗位面试记录',
                level: 1,
            },
            { type: 'field', label: '编号', value: '软院人〔2001〕第09号' },
            {
                type: 'field',
                label: '时间',
                value: '2001年8月20日 上午9:30',
            },
            { type: 'field', label: '地点', value: '软件学院会议室' },
            { type: 'field', label: '应聘岗位', value: '编译原理/计算理论方向 讲师' },
            {
                type: 'field',
                label: '面试官',
                value: '院长、系主任、教学督导、编译原理课程负责人（教授）',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '面试记录',
                level: 2,
            },
            {
                type: 'dialogue',
                speaker: '院长',
                content:
                    '林远同志，欢迎你来参加面试。先简单介绍一下自己吧。',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '各位老师好。我叫林远，1962年出生。1987年毕业于XX大学生物医学工程专业，之后在仁济医院神经外科工作至今，职务是研究实习员。今年申请离职，想转到高校从事教学工作。',
            },
            {
                type: 'dialogue',
                speaker: '系主任',
                content:
                    '我看你本科是生物医学工程，跟计算机科学的关系……你提交的材料里提到，你最近两年在自学计算机课程？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '是的。我学过数据结构、算法、计算复杂性理论，目前正在系统学习编译原理。龙书我通读过两遍。',
            },
            {
                type: 'dialogue',
                speaker: '教学督导',
                content:
                    '你是学医的，怎么想到要教计算机？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '（停顿片刻）我研究记忆。研究了很多年。后来发现，记忆的根本问题可能不是生物学问题，而是信息问题。计算机科学给了我一套新的语言来描述这个问题。编译原理……特别有意思。它是一个"意义转换"的模型。源代码（人类可读）→ 目标代码（机器可执行）。我觉得这个过程，和大脑理解世界的过程，可能有很多相似的地方。',
            },
            {
                type: 'dialogue',
                speaker: '教授',
                content: '你说你读过龙书？第8章讲什么？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '代码生成。目标代码的生成算法，包括寄存器分配和指令选择。',
            },
            {
                type: 'dialogue',
                speaker: '教授',
                content: '（点头）那你对"数据流分析"的理解呢？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '数据流分析是静态分析的基础。就是通过分析程序的控制流图，在每个程序点计算变量的状态信息。可以用到达定义、活跃变量、可用表达式等。它是优化和错误检测的基础。',
            },
            {
                type: 'dialogue',
                speaker: '教授',
                content:
                    '你没学过计算机专业，这些知识掌握得怎么样？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '理论部分我能理解。但编程实践还不够。我写了几个小的词法分析器和语法分析器，但还没做过完整的编译器。',
            },
            {
                type: 'dialogue',
                speaker: '系主任',
                content:
                    '现在学院招人，要求有正式的计算机学历背景，要么有相关领域的论文。你的材料里……没有计算机方向的论文。',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '我知道。我过去的主要研究在神经科学领域。但我的研究方法和思维方式，和计算机科学有很多相通之处。我从系统层面思考问题，习惯于把复杂系统拆解成模块，分析它们之间的接口和交互。这是编译原理需要的思维方式。',
            },
            {
                type: 'dialogue',
                speaker: '院长',
                content:
                    '林远同志，你这个背景确实比较特殊。我们学院刚成立不久，师资缺口大，理论上可以破格考虑。但有个问题……你今年39岁了，从研究实习员转到讲师……职业跨度比较大。你觉得自己能适应吗？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '我一直在适应。从医学到神经科学，从神经科学到计算机科学。每次跨度都很大。但我都走过来了。',
            },
            {
                type: 'dialogue',
                speaker: '院长',
                content:
                    '你刚才说你研究记忆？具体做什么？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '远期记忆的编码与提取机制。1992年发过一篇论文。后来……（停顿）……后来做了一些自我观察。但一直没有取得突破。这也是我想转向的原因。',
            },
            {
                type: 'dialogue',
                speaker: '系主任',
                content:
                    '林远同志，我们还有一个顾虑。你从医院离职，是"个人健康原因"。你的健康……对教学有影响吗？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '（停顿了几秒）目前不影响。',
            },
            {
                type: 'dialogue',
                speaker: '院长',
                content:
                    '你刚才那句"目前"，是什么意思？',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content:
                    '（长时间沉默）我需要这份工作。',
            },
            {
                type: 'paragraph',
                content: '（会议室沉默）',
            },
            {
                type: 'dialogue',
                speaker: '院长',
                content:
                    '……好，我们先面到这里。有结果我们会通知你。',
            },
            {
                type: 'dialogue',
                speaker: '林远',
                content: '谢谢各位老师。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '面试结束后，面试官内部讨论摘要（手写，院长笔迹）',
                level: 2,
            },
            {
                type: 'quote',
                content:
                    '此人背景太特殊。优点：理论功底扎实，思维清晰，对编译原理的理解不比计算机科班毕业的人差。而且他那种从"系统层面"思考问题的能力，确实很难得。缺点：背景跨度太大，学院的用人制度不一定能走通。另外……他提到"自我观察"和"健康原因"，说话时眼神不太对，感觉像是刻意压抑着什么。结论：可以再看看，不急着拒，也不急着录。先让他来试讲一次？',
                attribution: '——2001.8.20',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '教学督导手写备注（附于记录末尾）',
                level: 2,
            },
            {
                type: 'quote',
                content:
                    '我查了一下他92年的论文。关于"滑动窗式远期记忆渐进性缺失综合征"。看摘要的时候我后背一阵发凉。\n\n他研究的那个病，是他自己得的吗？\n\n这个人，可能不适合上讲台。\n\n——2001.8.22',
                attribution: '',
            },
        ],
        archiveNote:
            '这场面试处于林远人生的分水岭上（8月面试，12月从医院正式离职）。他在面试中展示出的理论功底让专业教授认可，但在回答"健康"问题时那一句"我需要这份工作"——以及对"目前不影响"中"目前"二字的沉默——是整份记录中最令人不安的时刻。教学督导在备注中提出了那个关键问题：他研究的那个病，是他自己得的吗？没有人敢当面问林远，但所有人都隐隐感觉到了答案。',
    },

    // ==========================================================
    // 2001 — 省政府文件
    // ==========================================================
    '2001-provincial-policy': {
        metadata: {
            docNo: 'X政办发〔2001〕第87号',
            date: '2001年9月10日',
            source: 'XX省人民政府办公厅',
        },
        sections: [
            {
                type: 'heading',
                content:
                    'XX省人民政府办公厅关于推动高校发挥学术引擎功能 促进学科交叉融合与科技成果转化的若干意见',
                level: 1,
            },
            {
                type: 'field',
                label: '编号',
                value: 'X政办发〔2001〕第87号',
            },
            { type: 'field', label: '日期', value: '2001年9月10日' },
            {
                type: 'paragraph',
                content:
                    '各市人民政府，省政府各部门、各直属机构，各高等院校：\n\n为深入贯彻落实"科教兴省"战略，充分发挥高等学校在知识创新、技术创新中的源头作用，推动学科交叉融合，促进科技成果向现实生产力转化，经省人民政府同意，现提出如下意见。',
            },
            {
                type: 'heading',
                content: '一、充分认识高校在创新体系中的核心地位',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '高等学校是知识生产、传播和应用的结合点，是科技创新的重要力量。当前，我省正处于经济结构调整和产业升级的关键时期，迫切需要高校发挥"学术引擎"功能，打破学科壁垒，推动理、工、医、文等学科的交叉融合，培育新的学术增长点和技术突破点。',
            },
            {
                type: 'heading',
                content: '二、鼓励学科交叉融合，培育新兴研究方向',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '（一）支持高校打破传统院系壁垒，设立跨学科研究中心、联合实验室，鼓励教师跨院系、跨学科组建科研团队。\n\n（二）重点支持信息科学、生命科学、材料科学等前沿领域与传统优势学科的交叉研究，探索"人工智能+医疗"、"生物信息学"、"计算神经科学"等新兴方向。\n\n（三）在科研立项、成果评审、职称评定等环节，对跨学科研究成果给予倾斜支持，鼓励教师开展高风险、高回报的原创性研究。',
            },
            {
                type: 'heading',
                content: '三、改革人才评价机制，激发创新活力',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '（七）建立以创新质量和实际贡献为导向的评价体系，改变以论文数量为唯一标准的考核方式。\n\n（八）设立省级"学科交叉人才专项"，支持具有跨学科背景的优秀人才引进和培养。',
            },
            {
                type: 'signature',
                content:
                    'XX省人民政府办公厅\n2001年9月10日\n\n（此件公开发布）',
            },
        ],
        archiveNote:
            '该文件印发于2001年9月10日，在林远8月面试之后、12月从医院离职之前。文件中对"计算神经科学"交叉方向的鼓励、对跨学科人才引进的支持，为软件学院院长决定录用林远提供了政策依据。一份省政府文件，间接促成了一个独特个体的命运转折。',
    },

    // ==========================================================
    // 2001 — 离职申请
    // ==========================================================
    '2001-resignation': {
        metadata: {
            date: '2001年12月10日',
            lastDay: '2001年12月31日',
            reason: '个人健康原因',
            years: '14年',
        },
        sections: [
            {
                type: 'heading',
                content: '离职申请及相关文件',
                level: 1,
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '文件一：离职申请书（手写）',
                level: 2,
            },
            {
                type: 'quote',
                content:
                    '尊敬的院领导、人事处：\n\n本人林远，男，1962年9月出生，1987年8月入职，现任神经外科研究实习员。\n\n现因个人健康原因，正式申请离职。最后工作日拟为2001年12月31日。\n\n感谢医院十四年来的培养。在仁济医院工作的这段经历，是我人生中最重要的一段时光。科室主任及各位同事对我多有照顾，在此一并致谢。\n\n我会在离职前完成手头所有工作的交接。\n\n恳请批准。\n\n申请人：林远\n2001年12月10日',
                attribution: '',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '文件二：科室主任写给林远的便条',
                level: 2,
            },
            {
                type: 'corruption',
                content:
                    '[此便条被折成两折，夹在林远的个人档案袋里，似乎从未被送出]',
            },
            {
                type: 'quote',
                content:
                    '小林：\n\n你的离职申请我签字了。\n\n你说"个人健康原因"，我没有多问。但这些年我看着你从二十四岁的小伙子，变成现在这个样子。你刚来科室那会儿，眼睛里有光，对什么都好奇，问的问题我有时候都答不上来。\n\n现在你话越来越少，走路低着头，开会坐在角落里。上周你在办公室对着窗户站了半个小时，我路过叫你两声你都没听见。\n\n我不知道你脑子里到底发生了什么。你不肯说，我也就不问了。\n\n但有一句话我想了很久，还是写下来：\n\n你92年那篇论文，我到现在都觉得是咱们科发过的最好的文章之一。你是真的有才华的人。\n\n如果哪天你想回来，随时给我打电话。科室的门一直开着。\n\n保重。\n\n[科室主任]\n2001年12月23日',
                attribution: '',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '文件三：人事处内部备忘（节选）',
                level: 2,
            },
            {
                type: 'field',
                label: '日期',
                value: '2002年1月10日',
            },
            {
                type: 'paragraph',
                content:
                    '林远（原神经外科研究实习员）已于2001年12月31日正式离职。后续事宜处理如下：\n\n- 工资关系：已停发2002年1月起工资；\n- 社会保险：已办理停缴手续；\n- 人事档案：已于2002年1月8日转至XX市人才服务中心；\n- 固定资产：其办公室内遗留个人物品一箱，已交至档案室暂存。',
            },
            {
                type: 'paragraph',
                content:
                    '附件：林远离留物品清单\n- 笔记本（手写）共12本\n- 专业书籍约30册\n- 软盘一盒（未标注）\n- 个人信件若干\n- 名片盒一个',
            },
            {
                type: 'quote',
                content:
                    '备注：该箱物品按林远要求"原样存放，勿拆封"。目前封存于档案室C12柜。',
                attribution: '',
            },
        ],
        archiveNote:
            '离职文件是林远第一段人生的终点记录。手写申请书极短，与1984年那份长篇硕士申请书形成了跨越17年的对称——从满腔热忱到四个字"个人健康原因"。科室主任未发出的便条是整条时间线上最温柔的文本，也是林远大概率从未读到过的一封信。人事处备忘录中"原样存放，勿拆封"六个字，是林远对自己过去的一种封存仪式。',
    },

    // ==========================================================
    // 2002 — 博客：自我怀疑
    // ==========================================================
    '2002-blog-limits-of-metaphor': {
        metadata: {
            date: '2002年4月3日 凌晨2:14',
            tags: '编译器 · 认知科学 · 自我怀疑',
            views: 7,
        },
        sections: [
            {
                type: 'heading',
                content: '我是不是在用一个错误的类比骗自己',
                level: 1,
            },
            {
                type: 'field',
                label: '发布日期',
                value: '2002年4月3日 凌晨2:14',
            },
            {
                type: 'field',
                label: '标签',
                value: '编译器 · 认知科学 · 自我怀疑',
            },
            { type: 'field', label: '阅读量', value: '7' },
            { type: 'divider' },
            {
                type: 'paragraph',
                content:
                    '上学期我教了一门新的课，《计算思维导论》。全校通识选修。我以为不会有多少人选——通识课嘛，又是"计算"这种听起来就很硬的东西。结果来了一百二十个人。教室坐不下，后排站满了。有一个学生是中文系的，跟我说"老师，我从来不知道计算机可以这样理解"。\n\n她不知道，她的老师也不知道。',
            },
            {
                type: 'paragraph',
                content:
                    '这一年来，我反复跟学生说的一句话是：编译器是一个意义转换的模型。人类的语言 → 机器能执行的命令。每一层转换都是有规律的，每一层转换都不会丢失"意义"——只是变换了它的形式。然后我说，人的大脑也许就是以同样的方式工作的：感觉信号 → 意义 → 记忆。\n\n但这个类比，在我自己身上越来越站不住脚。',
            },
            {
                type: 'quote',
                content:
                    '编译器不会自己修改自己的源码。但我的大脑会——它在我不授权的情况下，删除我的记忆。',
                attribution: '',
            },
            {
                type: 'paragraph',
                content:
                    '编译器是有明确规范说明书的。我的大脑没有——我不知道哪些东西会被删除，以什么顺序，根据什么算法。\n\n一个编译器如果在优化阶段删掉了不该删的东西，我们管这叫bug。可以追溯，可以修复，可以写一个新的测试用例防止它再次出现。但我丢掉的记忆——我连"丢失"这个事实本身，都要通过外部证据来确认。没有编译错误。没有segfault。程序只是默默地少了一个功能，而且你不知道是哪个commit引入的。\n\n这不是编译器。这是一种我不知道名字的东西。',
            },
            {
                type: 'paragraph',
                content:
                    '但我还是继续用这个类比。继续上课。继续跟学生讲"编译器是最浪漫的软件"。因为我找不到更接近的模型。没有更好的工具。我学了三年的计算机科学，我能找到的最精确的语言就是"编译器"三个字——而我自己知道它不够精确。它是一张我勉强画在黑板上的草图。',
            },
            {
                type: 'paragraph',
                content:
                    '明天又是周二。下午两点，A301，编译原理。\n\n我会站在讲台上，对着45个计算机专业大三的学生，讲LR分析算法。我会在黑板上推导状态转移。我会微笑着说"你们看，这就是计算机理解人类语言的方式"。\n\n他们会点头。他们可能还会鼓掌。\n\n然后我会回到办公室，打开这个只有7个人看过的博客，写下这些我不知道能跟谁说的话。',
            },
            {
                type: 'paragraph',
                content:
                    '我是不是在用这个类比骗自己？——也许。但如果没有这个类比，我连"骗自己"的工具都没有。骗自己也比什么都不做强。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '评论区',
                level: 2,
            },
            {
                type: 'paragraph',
                content: '无评论。',
            },
            {
                type: 'corruption',
                content:
                    '[此页面最后一次被Wayback Machine抓取：2002年4月17日。之后至博客关闭的2008年，该文章未被再次抓取。]',
            },
        ],
        archiveNote:
            '这篇日志写于2003年教学评估报告中的"黄金时代"之前一年。此时林远在外界眼中正处在上升期——通识课爆满，学生崇拜他——但他私下里已经意识到"编译器"这个核心隐喻无法解释他的大脑正在发生的事。文章里写"编译器不会自己修改自己的源码。但我的大脑会"——这是他对自己病情最简洁也最精确的技术性描述。最后一段——"骗自己也比什么都不做强"——是整篇的伦理核心。',
    },

    // ==========================================================
    // 2002 — 课程大纲
    // ==========================================================
    '2002-course-syllabus': {
        metadata: {
            courseCode: 'CS100',
            courseName: '计算思维导论',
            credits: 2,
            semester: '2002年秋季学期',
            teacher: '林远',
            classroom: '计算机学院大楼 A301',
            time: '周三 18:30-20:00',
            enrollment: '120人（计划80人）',
        },
        sections: [
            {
                type: 'heading',
                content: '《计算思维导论》课程大纲',
                level: 1,
            },
            { type: 'field', label: '课程编号', value: 'CS100' },
            { type: 'field', label: '开课单位', value: '软件学院' },
            { type: 'field', label: '授课教师', value: '林远' },
            { type: 'field', label: '学期', value: '2002年秋季学期' },
            { type: 'field', label: '学分', value: '2' },
            {
                type: 'field',
                label: '面向对象',
                value: '全校本科生（非计算机专业）',
            },
            { type: 'field', label: '教室', value: '计算机学院大楼 A301' },
            { type: 'field', label: '上课时间', value: '周三 18:30-20:00' },
            { type: 'divider' },
            {
                type: 'heading',
                content: '课程简介',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '本课程旨在为非计算机专业本科生提供计算思维的系统入门。课程的核心目标不是教学生"会用计算机"，而是帮学生建立一种跨学科的思考框架——将"递归""抽象""分解""模组化"等计算思维的核心概念，应用于文学、艺术、生物学、心理学等各个领域的问题解决。',
            },
            {
                type: 'corruption',
                content:
                    '[注：以下内容为2002级物理系学生的课堂笔记扫描件。讲义原文已不可考。]',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '第一讲：什么是"计算思维"',
                level: 2,
            },
            {
                type: 'quote',
                content:
                    '"你们可能会觉得，这门课是要教你们\'怎么用电脑\'。不是的。你们大部分人已经会用电脑了——打字、上网、发邮件。我要讲的不是\'操作计算机\'。我要讲的是\'像计算机一样思考\'。"\n\n"像一个编译原理课上的学生一样思考。递归是什么？就是你在解一个大问题的时候，先解一个同类型的小问题，然后把小问题的答案用在大问题里。你写一篇论文——这是大问题。你先写提纲——这是小问题。作文里先分段，再合并——这就是递归。你不用知道递归的数学定义，但你已经用过了。"',
                attribution: '——林远课堂口述，学生记录',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '第三讲：抽象——忽略细节的艺术',
                level: 2,
            },
            {
                type: 'quote',
                content:
                    '"\'抽象\'这个词在计算机里，跟你们在马克思主义哲学课上学到的那个\'抽象\'不完全一样。哲学里的抽象，是指从具体事物中提炼出普遍概念。计算机里的抽象，是指你故意不看某些细节，好让你能处理更复杂的问题。"\n\n"比如说，你现在坐在A301教室里。这个教室有墙壁、有桌椅、有灯光、有空调、有旁边坐着的同学——这些是细节。但如果你要理解\'大学\'这个概念，你不能同时想这些东西。你把教室抽象为一个词：\'上课的地方\'。这就是抽象——你有意识地、主动地，不看某些东西。"',
                attribution: '——林远课堂口述，学生记录',
            },
            {
                type: 'paragraph',
                content:
                    '学生标注："旁边有人说，林老师讲的东西不像计算机课，像哲学课。"',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '第五讲：算法——每一步都是确定的',
                level: 2,
            },
            {
                type: 'quote',
                content:
                    '"算法的本质是什么？是\'每一步都有规则\'。好的算法，你告诉一个完全不懂你在干什么的人，他只要按照你的步骤做，他就一定能得到跟你一样的结果。"\n\n（此时教室后排有人举手问：\'老师，那谈恋爱有算法吗？\'。全班大笑。）\n\n"没有。因为你和对方都是不确定的。你们两个人在每一轮互动中都会改变自己的状态。你今天的\'最佳策略\'明天可能就是他生气的原因。这是世界上最难的问题之一。不是给定一个算法去执行。是每一个步骤，你都在修改算法本身。"',
                attribution: '——林远课堂口述，学生记录',
            },
            {
                type: 'paragraph',
                content:
                    '学生标注："他回答这个问题的时候表情很认真。不像是随口说的。"',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '第六讲：数据——信息和它的容器',
                level: 2,
            },
            {
                type: 'quote',
                content:
                    '"在计算机里，数据是有类型的。整数、浮点数、字符串、布尔值。每个类型有自己的一套操作规则。你不能把一个字符串加到一个整数上——除非你先把整数转换成字符串。"\n\n"人脑呢？人脑里的数据有没有类型？你关于\'苹果\'的记忆，是什么类型？是图像？是文字？是气味？还是它们混在一起的？而且，如果你把关于苹果的\'图像\'和关于苹果的\'味道\'存在一起——当你失去其中一种的时候，你还能不能说你还记得\'苹果\'？"\n\n（停顿。翻了下讲义。）\n\n"这个问题……我不知道答案。但我觉得你们可以想一想。"',
                attribution: '——林远课堂口述，学生记录',
            },
            {
                type: 'paragraph',
                content:
                    '学生标注："他每次说到人脑的时候语气会变。不太一样。说不上来。"',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '第八讲：信息与信息论——结课讲座',
                level: 2,
            },
            {
                type: 'quote',
                content:
                    '"最后一节课，我想跟你们聊聊信息。信息的本质是什么？香农说，信息是对不确定性的消除。你打开一封信之前，你不知道里面写的什么。打开之后你知道了——信给了你信息。减少的就是你之前的不确定性。"\n\n（学生标注：讲到这里的时候他语速明显变慢了。）\n\n"我今天……（停顿了大概十秒）……我今天先讲到这里。谢谢你们一个学期以来的……谢谢。"',
                attribution: '——林远课堂口述，学生记录',
            },
            {
                type: 'paragraph',
                content:
                    '学生标注："最后一节课他提前二十分钟下课了。他说\'谢谢\'的时候，我感觉他不只是在感谢我们听课。像是在感谢一些别的东西。"',
            },
        ],
        archiveNote:
            '这份大纲的珍贵之处在于学生的手写笔记——它们记录了林远在2002年秋季那个"黄金时代前夜"的课堂实况。可以看到，他讲CS概念时总是将例子引向大脑、记忆、认知——次数远超过教学需要。学生注意到了（"他每次说到人脑的时候语气会变"），但那时没有人知道这意味着什么。他回答"恋爱算法"问题时的那段话（"每一个步骤你都在修改算法本身"），是整份大纲中最诚实的一句——那不只是对学生的回答，也是他对自己的病情的无意识描述。',
    },

    // ==========================================================
    // 2003 — 教学评估（黄金期）
    // ==========================================================
    '2003-teaching-evaluation': {
        metadata: {
            docNo: '软院评〔2003〕第12号',
            period: '2002年9月 — 2003年7月',
            overallRating: 'A（优秀）',
        },
        sections: [
            {
                type: 'heading',
                content: '教师教学评估报告（2002-2003学年）',
                level: 1,
            },
            { type: 'field', label: '编号', value: '软院评〔2003〕第12号' },
            { type: 'field', label: '评估对象', value: '林远（讲师）' },
            { type: 'field', label: '入职时间', value: '2001年12月' },
            {
                type: 'field',
                label: '评估周期',
                value: '2002年9月 — 2003年7月',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '一、基本情况',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '林远同志于2001年12月正式入职我院，其跨学科背景（生物医学工程本科、神经科学科研经历、自学计算机）在当时较为特殊。2002-2003学年，林远同志共承担课程2门：',
            },
            {
                type: 'table',
                headers: ['课程名称', '课程性质', '选课人数', '开课学期'],
                rows: [
                    ['《计算思维导论》', '全校通识选修', '120人', '2002秋'],
                    ['《编译原理》', '计算机专业必修', '45人', '2003春'],
                ],
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '二、教学效果评估',
                level: 2,
            },
            {
                type: 'heading',
                content: '（一）《编译原理》——计算机专业必修课',
                level: 3,
            },
            {
                type: 'table',
                headers: ['评价维度', '得分', '学院平均'],
                rows: [
                    ['教学内容', '4.9', '4.2'],
                    ['教学方法', '4.8', '4.1'],
                    ['教学态度', '4.7', '4.3'],
                    ['课程收获', '4.9', '4.0'],
                    ['综合评分', '4.825', '4.15'],
                ],
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '典型学生评价摘录',
                level: 3,
            },
            {
                type: 'quote',
                content:
                    '"林老师讲词法分析，从正则表达式讲到有限自动机，再讲到大脑的语言处理机制。那一刻我觉得编译原理不是一门课，而是一把钥匙。"',
                attribution: '——计算机2001级',
            },
            {
                type: 'quote',
                content:
                    '"他上课的时候整个人是\'亮\'的。你会觉得他在做的不是\'教书\'，而是在\'分享他热爱的东西\'。"',
                attribution: '——计算机2001级',
            },
            {
                type: 'quote',
                content:
                    '"他说：\'编译器是这个世界上最浪漫的软件，因为它把人类的逻辑变成了机器可以执行的命令。\'我记了这句话。"',
                attribution: '——计算机2001级',
            },
            {
                type: 'quote',
                content:
                    '"这是我大学三年上过最好的课。没有之一。"',
                attribution: '——计算机2001级',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '三、学生群体的特殊现象',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '本评估周期内，出现一个值得关注的现象："林远现象"。\n\n- 部分计算机专业学生自发在校园BBS上建立"林远老师讨论区"，帖子数量在2003年4-6月间累计超过2000条\n- 有学生在BBS上称其为"软院林神"，这一称呼在计算机专业学生中广泛传播\n- 部分非计算机专业学生因选修过《计算思维导论》而"跨系旁听"《编译原理》，每次上课教室后排都挤满了旁听生',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '四、综合评估结论',
                level: 2,
            },
            {
                type: 'table',
                headers: ['评价维度', '评定'],
                rows: [
                    ['教学能力', '优秀'],
                    ['课程建设', '优秀'],
                    ['学生评价', '优秀'],
                    ['跨学科贡献', '突出'],
                    ['综合评定等级', 'A（优秀）'],
                ],
            },
            {
                type: 'quote',
                content:
                    '林远同志入职近两年来，在教学工作中表现出色，其跨学科背景与教学能力的结合成为我院"学科交叉融合"战略的成功案例。',
                attribution: '——评估结论',
            },
        ],
        archiveNote:
            '2003年7月的这份评估报告，是林远职业生涯的顶峰。他成为了学院"跨学科融合"战略的标志性人物，被学生称为"林神"。然而报告中埋下了多处伏笔——"停顿较多""语速偏慢""上课突然停下来望着窗外""工作至深夜"——这些当时被解读为"个性风格"或"备课太投入"的细节，在四年后将显现出完全不同的含义。',
    },

    // ==========================================================
    // 2004 — BBS学生讨论
    // ==========================================================
    '2004-bbs-student-discussion': {
        metadata: {
            source: '校园BBS"软院心声"版（备份磁盘镜像，2021年恢复）',
            period: '2004年2月至6月',
        },
        sections: [
            {
                type: 'heading',
                content: '校园BBS"软院心声" · 林远相关讨论帖选辑',
                level: 1,
            },
            {
                type: 'corruption',
                content:
                    '[说明：以下帖子来自校园BBS"软院心声"板块，时间跨度为2004年2月至6月。2008年BBS服务器迁移时导出为文本备份，随后被遗忘。2021年考古计划从一名前BBS管理员的旧硬盘中恢复了该备份。]',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '帖子一：《我受不了了，必须吹一波林神编译原理》',
                level: 2,
            },
            { type: 'field', label: '发帖时间', value: '2004年2月28日' },
            { type: 'field', label: '发帖人', value: '匿名' },
            {
                type: 'paragraph',
                content:
                    '今天上课讲的是LL(1)文法。说实话，这门课我本来是抱着"为了毕业硬啃"的心态来的，因为大家都说编译原理很难。但林老师讲了一个比喻：\n\n"你们知道为什么LL(1)文法是\'看一个token就知道怎么做\'吗？因为LL(1)的每个产生式，第一个token都不一样。就像你走进食堂，看见第一个窗口写着\'红烧\'，你就知道后面是肉。看见第二个窗口写着\'清炒\'，后面就是素菜。第一个token决定了你接下来走哪条路。不需要回头看，也不需要猜测。"\n\n然后他又加了一句："可惜人的决策不是LL(1)的。你永远不知道一个选择的第一步会把你们带去哪里。"\n\n我说不上来。反正我觉得这个人讲的每一句话，都不是在讲编译原理。他是在讲人生。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content:
                    '帖子二：《有个问题问林老师他没答上来》',
                level: 2,
            },
            { type: 'field', label: '发帖时间', value: '2004年3月15日' },
            {
                type: 'paragraph',
                content:
                    '今天课间我去问了一个问题。就是关于GCC的实现细节——龙书上说代码优化那一章讲的那个寄存器分配算法，在实际的GCC里用的是graph coloring。我就问林老师，graph coloring具体是怎么映射到不同架构的寄存器约束上的。\n\n他愣了一下。然后他说："这个我不太熟。GCC的代码我没有读过。你可以去查一下Andrew Appel那本《Modern Compiler Implementation》的第11章，里面有讲。"\n\n我不是说他不好。他推荐的那本书确实讲得很清楚。但就是……怎么说，一个教编译原理的老师，没读过GCC源码？而且当时的气氛有点奇怪。他愣住的那几秒钟，我整个后背都在出汗。',
            },
            {
                type: 'comment',
                author: 'CS2001_某同学（4楼回复）',
                date: '2004年3月15日',
                content:
                    '林老师本来就不是做工程的啊。人家是做神经科学的转过来的，能讲到这个深度已经很猛了。你要问GCC的实现，你去找做系统的老师问啊。',
            },
            {
                type: 'comment',
                author: 'CS2001_某同学（12楼回复）',
                date: '2004年3月16日',
                content:
                    '不是，你们都没看懂楼主的意思。重点不是"林老师没读过GCC源码"，重点是"他愣住的几秒钟"。我也遇到过。问一个他没想到的问题，他会停住，表情完全空白，然后恢复，给出一个合理但不精彩的回答。感觉像……（我不知道怎么描述）',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '帖子三（已被删除）：《林老师上课的状态真的不对劲》',
                level: 2,
            },
            { type: 'field', label: '发帖时间', value: '2004年4月20日' },
            {
                type: 'corruption',
                content:
                    '[此帖于4月21日被管理员删除。以下内容来自BBS备份数据库中的残存记录。]',
            },
            {
                type: 'paragraph',
                content:
                    '……上周编译原理课，他讲LR分析讲了三个礼拜还没讲完。正常一学期的课，到这个时间点LR早就收尾了，该讲语法制导翻译了。他现在还在讲LR(1)的构造。而且他讲着讲着，会回去重新讲上周的内容。他好像不记得自己之前讲过什么。\n\n今天更夸张。他讲到一半，突然停下来，翻他的教案。翻了大概能有两分钟。整个教室鸦雀无声。然后他抬起头来，表情很困惑，说了一句："我……下一页教案是空白的。"\n\n有人小声说"老师，你上次说这星期讲语法制导翻译"。\n\n他看着那个说话的学生，然后说："你确定？"\n\n他说"你确定"这两个字的时候，语气不是在"确认"。他是在请求。请求那个学生告诉他：对，你应该讲这个。因为你自己不知道你应该讲什么了。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '帖子四：《不黑不吹，客观评价林神的教学水平和局限性》',
                level: 2,
            },
            { type: 'field', label: '发帖时间', value: '2004年5月7日' },
            {
                type: 'paragraph',
                content:
                    '先说结论：他是我在大学遇到过的最好的老师，没有之一。但我不想把他供在神坛上。我们来实事求是地聊一下。',
            },
            {
                type: 'paragraph',
                content:
                    '他擅长的地方：\n1. 理论深度。不是那种"背出来的深度"，是他真的理解编译原理的底层数学。\n2. 思维方式。他思考问题的方式跟所有其他老师都不一样。我觉得这跟他不是科班出身有关。他不是"学"编译原理的——他是"到了需要编译原理的时候自己去搞懂了"的。\n3. 他不是程序员。他是思考者。他不教你写代码，他教你把代码作为一种思维模型去用。',
            },
            {
                type: 'paragraph',
                content:
                    '他不擅长的地方：\n3. 他有时候会忘记东西。不是那种"哎呀我忘了一句话"——是那种，讲到一半，沉默了。然后他说"我讲到哪里了"。你告诉他，他接上。但那个瞬间，他不是那个"神"了。他变成了一个站在黑板前、需要学生帮他捡起话头的人。',
            },
            {
                type: 'comment',
                author: 'CS2001_某同学',
                date: '2004年5月7日',
                content:
                    '我大一上他的通识课，大一到大二之间那个暑假，在机房偶然碰到他，他居然还记得我选过他的课，还问我在做什么项目。今年——2004年——我上他的编译原理课，头一天我坐在第三排中间。第二天我又坐在同样的位置。他进门，看了我一眼，没认出我。',
            },
            {
                type: 'comment',
                author: '匿名',
                date: '2004年5月7日',
                content:
                    '他认不出你不是因为不记得你。是因为他可能不记得他已经见过你第三次了。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content:
                    '帖子五：《恳请大家不要在BBS上讨论林老师的私事了》',
                level: 2,
            },
            { type: 'field', label: '发帖时间', value: '2004年6月1日' },
            {
                type: 'quote',
                content:
                    '"林神"这个称呼，是我们这一届（2001级）先叫起来的。2003年春天第一次上他的编译原理课，我们几个男生下课之后在走廊里说的第一句话就是"这老师是神"。当时是真心实意的。不是调侃。就是觉得他怎么可以把一个这么硬核的课讲出温度来。\n\n但我不确定他看了BBS之后是什么感受。你们想象一下，一个四十二岁的讲师——他可能本来就不太跟人打交道——突然被一群二十岁的学生架到了一个叫"林神"的位置上。这意味着什么？这意味着他不能不好。他每一次沉默，都会被拿放大镜看。他每一次停顿，都会变成BBS上的主题帖。\n\n他有没有可能，其实并不想当"神"？\n\n他只是想当林远。当一个还能在讲台上站住的人。',
                attribution: '——匿名，2004年6月1日',
            },
        ],
        archiveNote:
            '这五篇帖子拼出了2004年的复杂图景。学生中的崇拜者和担忧者同时存在。最打动人的——也是最残忍的——是那个同学写的："他认不出你不是因为不记得你。是因为他可能不记得他已经见过你第三次了。"在2004年，这句话还是一个学生表达的私人观察。到2007年的评估报告里，它变成了督导听课记录中的"四分钟"。到2008年，它变成了整间教室里无声的等待。',
    },

    // ==========================================================
    // 2007 — 教学评估（崩塌）
    // ==========================================================
    '2007-teaching-evaluation': {
        metadata: {
            docNo: '软院评〔2008〕第03号',
            period: '2007年9月 — 2008年1月',
            overallRating: 'D（不合格）',
            dropoutRate: '17.3%',
        },
        sections: [
            {
                type: 'heading',
                content:
                    '教师教学评估报告（2007-2008学年第一学期）',
                level: 1,
            },
            { type: 'field', label: '编号', value: '软院评〔2008〕第03号' },
            { type: 'field', label: '评估对象', value: '林远（讲师）' },
            {
                type: 'field',
                label: '评估周期',
                value: '2007年9月 — 2008年1月',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '一、基本情况',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '林远同志自2001年12月入职我院，曾任《计算思维导论》《编译原理》等课程主讲教师。2002-2005学年期间，教学评估成绩优异。2006年以来，林远同志教学评估成绩连续下滑。本评估周期为2007年秋季学期，林远同志承担《编译原理》一门，选课人数52人，期末实际参加考试43人，退课/缺考9人（退课率17.3%）。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '二、教学效果评估',
                level: 2,
            },
            {
                type: 'table',
                headers: ['评价维度', '得分', '学院平均', '与2003秋对比'],
                rows: [
                    ['教学内容', '2.3', '4.1', '4.9 → 2.3'],
                    ['教学方法', '1.9', '4.0', '4.8 → 1.9'],
                    ['教学态度', '2.1', '4.2', '4.7 → 2.1'],
                    ['课程收获', '1.8', '4.0', '4.9 → 1.8'],
                    ['综合评分', '2.03', '4.08', '4.83 → 2.03'],
                ],
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '典型学生评价摘录（匿名）',
                level: 3,
            },
            {
                type: 'quote',
                content:
                    '"林老师这学期状态很差。上课经常重复上一节课的内容，有时候讲到一半停下来，沉默很久，然后说\'我讲到哪里了\'。"',
                attribution: '',
            },
            {
                type: 'quote',
                content:
                    '"他不再是我们大一时候那个\'林神\'了。他现在上课声音小得跟蚊子叫一样，坐在后排根本听不清。"',
                attribution: '',
            },
            {
                type: 'quote',
                content:
                    '"我能感觉到他很努力。他真的在努力。但他好像已经不是三年前那个他了。这让我很难过。"',
                attribution: '',
            },
            {
                type: 'quote',
                content:
                    '"我退课了。不是因为课程难，是因为我不忍心看下去。"',
                attribution: '',
            },
            {
                type: 'quote',
                content:
                    '"林老师以前上课是\'发光\'的。现在他站在讲台上，像是在受刑。"',
                attribution: '',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '三、教学督导听课记录',
                level: 2,
            },
            {
                type: 'field',
                label: '听课时间',
                value: '第7周 周二 第3-4节',
            },
            {
                type: 'field',
                label: '课程内容',
                value: '中间代码生成',
            },
            {
                type: 'quote',
                content:
                    '林远老师提前五分钟进入教室，打开课件，站在讲台上。上课铃响后，他开始讲解。前三分钟语速正常。随后，他的声音逐渐变小，后排学生开始向前倾身。\n\n10:15左右，他在推导一个三元式转换的例子时，在黑板上写了一个符号，擦了，又写了一个不同的，又擦了。这个过程持续了大约两分钟。有学生在下面小声说"写第二个"。\n\n10:28，他讲完一个段落，说"下面我们讲……"，停顿了约20秒，然后说"我要看一下教案"。他低头翻了大约一分钟，没有翻到。有学生举手说"老师，下一页"。\n\n11:05，距离下课还有15分钟。他讲完一个例子，突然沉默，望向窗外。我记了一下时间——他沉默了约4分钟。教室里没有任何人说话。有学生低头看手机，有学生互相看了一眼。\n\n他最后说："今天先到这里。"然后提前下课了。',
                attribution: '——教学督导听课记录',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '四、2006-2007学年教学评估趋势',
                level: 2,
            },
            {
                type: 'table',
                headers: ['学期', '课程', '综合评分', '趋势'],
                rows: [
                    ['2006春', '编译原理', '3.8', '开始下滑'],
                    ['2006秋', '编译原理', '3.2', '继续下滑'],
                    ['2007春', '编译原理', '2.5', '明显恶化'],
                    ['2007秋', '编译原理', '2.0', '严重恶化'],
                ],
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '五、学生意见座谈会（节选）',
                level: 2,
            },
            { type: 'field', label: '时间', value: '2007年12月10日' },
            {
                type: 'quote',
                content:
                    '"我们不是想告状。我们是真的担心林老师。"',
                attribution: '',
            },
            {
                type: 'quote',
                content:
                    '"我大一上学期上过他的《计算思维导论》，就是因为那门课我才决定选计算机专业的。他说\'编译器是这个世界上最浪漫的软件\'。我现在还记得。但现在……我希望他好好的。如果他不舒服，可以休息一个学期。我们等他。"',
                attribution: '——一位女学生',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '六、学院意见',
                level: 2,
            },
            {
                type: 'quote',
                content:
                    '同意系主任和教学督导的意见。先和林远谈话，了解真实情况。课先停掉，找其他老师接。这件事不要声张，给林远留面子。他以前对学院有贡献，我们不能不管他，也不能让他在讲台上"出丑"。',
                attribution: '——院长，手写批注',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '七、综合评估结论',
                level: 2,
            },
            { type: 'field', label: '综合评定等级', value: 'D（不合格）' },
            {
                type: 'quote',
                content:
                    '处理建议：暂停林远同志主讲课程教学，调整为辅助性教学或科研工作。同时建议其进行健康检查。',
                attribution: '',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '附件：2003年与2007年对比（内部参考）',
                level: 2,
            },
            {
                type: 'table',
                headers: ['', '2003年', '2007年'],
                rows: [
                    [
                        '典型评价',
                        '"编译器是这个世界上最浪漫的软件"',
                        '"他站在讲台上的时候，眼神是空的"',
                    ],
                    [
                        '学生反应',
                        '"跨系旁听，提前占座"',
                        '"退课率17.3%，不忍心看下去"',
                    ],
                    ['课堂氛围', '"发光""神级"', '"沉默五分钟，没有人说话"'],
                    ['教师状态', '"整个人是亮的"', '"像是在受刑"'],
                ],
            },
        ],
        archiveNote:
            '这份评估报告与2003年那份并置，形成叙事中最残酷的"前后对照"。从A到D，从4.83到2.03，从"林神"到"眼神是空的"——仅仅四年。督导听课记录中的4分钟沉默，是整份文件里最令人窒息的段落。没有学生对林远有恶意——他们只是"不忍心看下去"。而林远本人，在讲台上的每一次停顿和每一次"对不起"，都是他在自己不知道的情况下，为自己的病写下的注脚。',
    },

    // ==========================================================
    // 2021 — 考古计划框架
    // ==========================================================
    '2021-archaeology-project': {
        metadata: {
            date: '2021年3月15日',
            author: '考古计划发起人',
            platform: '某知识分享平台',
        },
        sections: [
            {
                type: 'heading',
                content: '关于"忒修斯之船"考古计划',
                level: 1,
            },
            { type: 'field', label: '发布于', value: '2021年3月15日' },
            { type: 'divider' },
            {
                type: 'paragraph',
                content:
                    '去年疫情期间，我被封在上海的出租屋里。和很多人一样，那段时间靠上网打发日子。',
            },
            {
                type: 'paragraph',
                content:
                    '有一天晚上我在翻互联网档案馆（Archive.org）的时候，关键词搜的是"编译原理 课件 2003"。没什么特别的理由——我只是突然想起来，大学时候有个老师曾经说过一句话："编译器是这个世界上最浪漫的软件。"那门课我早就忘了，但这句话一直记得。我想找找看，这句话最早是谁说的。\n\n我没有找到那句话。\n\n但我找到了一些别的东西。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '发现的顺序',
                level: 2,
            },
            {
                type: 'heading',
                content: '第一层：教学文件',
                level: 3,
            },
            {
                type: 'paragraph',
                content:
                    '互联网档案馆里有一份2003年的课程评估报告，来自某大学软件学院。报告中引用了学生对一位姓林的老师（据报告称为"林远"）的评价——有一句是："编译器是这个世界上最浪漫的软件，因为它把人类的逻辑变成了机器可以执行的命令。"这大致是我记忆中的那句话的变体。我很兴奋，以为找到了来源。',
            },
            {
                type: 'heading',
                content: '第二层：BBS帖子',
                level: 3,
            },
            {
                type: 'paragraph',
                content:
                    '报告末尾提到，该老师曾是一名神经科学研究员，后来因为"个人健康原因"转行进入大学。报告还附了一些学生BBS帖子的摘录。其中一篇说的是："他反应了大概五秒才回答。"\n\n我这时觉得不太对劲了。一个能让一百二十个学生挤破头选课的讲师，为什么学生会在BBS上讨论他"反应慢"？',
            },
            {
                type: 'heading',
                content: '第三层：2007年评估报告',
                level: 3,
            },
            {
                type: 'paragraph',
                content:
                    '我开始搜索更多与这个人相关的文件。在一份2007年秋季的教学评估报告中，一切都不一样了。退课率17.3%。学生说"我不忍心看下去"。教学督导记录了一段他在课堂上沉默了四分多钟的描述。\n\n然后是院长手写的批注："不要声张，给林远留面子。"\n\n那时候我知道我找到的不是一门课的故事。我找到的是一个人的故事。',
            },
            {
                type: 'heading',
                content: '第四层：博客',
                level: 3,
            },
            {
                type: 'paragraph',
                content:
                    '互联网档案馆里还有零星几篇博客文章的抓取——一个叫林远的人，2001年写的。他在写信息复杂性理论。他在写"我的解码器是不是坏了"。他在写"我已经没有太多时间了"。阅读量只有4。几乎没有任何互动。\n\n这些博客所在的服务器，于2008年停止响应。',
            },
            {
                type: 'heading',
                content: '第五层：论坛存档',
                level: 3,
            },
            {
                type: 'paragraph',
                content:
                    '我开始搜索"TexiusiShip"。结果指向一个在2018年关闭的匿名哲学BBS。有人在GitHub上放了一份该论坛的静态文本备份。我把所有帖子导出来读。二十六个Anonymous，从2001年到2018年，发了约八十几篇帖子和几百条评论。内容从探讨康德、编译原理和自我意识开始，逐渐变成乱码、标点和沉默。',
            },
            {
                type: 'quote',
                content:
                    '所有二十六个发帖者的IP地址，都是同一个：210.28.128.4。\n所有二十六个账号的句法结构——我写了个脚本跑了一遍——在统计上无法区分。',
                attribution: '',
            },
            {
                type: 'heading',
                content: '第六层：医院记录',
                level: 3,
            },
            {
                type: 'paragraph',
                content:
                    '在搜索过程中，我也偶然发现了一些医疗相关的记录——一份1995年的MRI使用日志、一份约谈记录、一份离职申请。这些属于某医院内部系统泄露的数据包。MRI日志里显示，一个人——林远——在凌晨独自操作设备，把自己作为受试者扫描。操作者和患者的名字，都是他。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '所以我做了一个决定',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '我把所有能找到的文件归集在一起，做了一个共享文档。我叫它"忒修斯之船"考古计划——名字来自论坛的主题。',
            },
            {
                type: 'paragraph',
                content:
                    '到目前为止，参与这个计划的有十几个人。有的是做过类似互联网考古的，有的是纯粹被故事吸引的。我们各自负责一个方向：有人梳理时间线，有人分析帖子内容的句法变化，有人试图确认这些文件的真实性。',
            },
            {
                type: 'quote',
                content:
                    '最后一个能确定的物理事实是：林远，1962年出生，仁济医院前研究实习员，某大学软件学院前讲师。2008年从该学院离职。之后的记录，全是数字的。',
                attribution: '',
            },
            {
                type: 'paragraph',
                content:
                    '如果你对这件事感兴趣——如果你在网络上的某个角落偶然发现了可能的线索——请联系我们。',
            },
            {
                type: 'signature',
                content:
                    '2021年3月15日\n考古计划发起人',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '后续更新',
                level: 2,
            },
            {
                type: 'field',
                label: '2021年5月更新',
                value: '有参与者找到了一个2004年校园BBS的备份磁盘镜像。磁盘来自已离职的前BBS管理员的个人物品拍卖。我们恢复了里面关于林远的部分讨论帖。',
            },
            {
                type: 'field',
                label: '2022年11月更新',
                value: '至诚大学校内网上的校园平台页面已于2022年某日无法访问。IP地址210.28.128.4已于同日停止响应。原因不明。',
            },
            {
                type: 'field',
                label: '2023年2月更新',
                value: '某匿名参与者上传了一份林远个人网站的笔记存档——来自互联网档案馆2000年的抓取快照，是之前我们没有索引到的部分。',
            },
        ],
        archiveNote:
            '这篇考古计划文章是整条档案的外层框架。它解释了档案检索中全部资料的发现经过——不是通过官方档案查询，也不是某个知情人统一发布的，而是通过互联网上分散的、互不相关的存档和泄漏，被一个疫情期间的陌生人偶然串联起来的。这种发现方式本身也是这个故事的一部分：林远从未试图留下一个完整的"传记"，他只留下了痕迹。痕迹被时间打散，然后被另一个人捡起来，排成了一条线。',
    },

    // ==========================================================
    // 1992 — 滑动窗式远期记忆渐进性缺失综合征（病例报告）
    // ==========================================================
    '1992-sliding-window-paper': {
        metadata: {
            journal: '中华神经科杂志',
            year: '1992年第3期',
            title: '滑动窗式远期记忆渐进性缺失综合征：一例报告',
            author: '林远',
            department: 'XX大学附属仁济医院神经外科',
            pages: '412-415',
        },
        sections: [
            {
                type: 'heading',
                content: '滑动窗式远期记忆渐进性缺失综合征：一例报告',
                level: 1,
            },
            {
                type: 'field',
                label: '作者',
                value: '林远（XX大学附属仁济医院神经外科）',
            },
            {
                type: 'field',
                label: '期刊',
                value: '《中华神经科杂志》1992年第3期，第412-415页',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '【摘要】',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '目的：报道一种罕见的、以远期记忆渐进性缺失为特征的临床综合征，并提出其可能的病理机制假说。',
            },
            {
                type: 'paragraph',
                content:
                    '方法：对一例32岁男性患者进行为期四年的系统随访。患者自述自28岁起出现进行性远期记忆丧失。通过标准化记忆量表、事件回忆测试及影像学检查，对其记忆窗口的动态变化进行了追踪记录。',
            },
            {
                type: 'paragraph',
                content:
                    '结果：患者记忆缺失呈现出高度规律性的"滑动窗"模式——记忆并非随机丢失，而是从最早的记忆（童年期）开始，向近期记忆方向逐层剥落，形成一个不断向前推进的遗忘前沿。影像学显示海马体及内侧颞叶出现与年龄不符的渐进性萎缩。',
            },
            {
                type: 'paragraph',
                content:
                    '结论：本病例提示，存在一种以"时间方向性遗忘"为特征的记忆退行性疾病。其记忆丧失模式与传统阿尔茨海默病（近期记忆先受损）明显不同，呈镜像分布。作者提出，"滑动窗"模式可能反映记忆编码-提取系统的某种系统性功能障碍，而非单纯的结构损伤。',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '【个案报告】',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '患者，男性，32岁，某医院研究人员。1988年起自觉对童年及少年时期事件的记忆日渐模糊。至1990年，患者已完全无法回忆起15岁以前的生活细节，包括家庭成员、成长经历等。1992年随访时，遗忘前沿已推进至20岁左右——大学时期的部分经历开始变得不可提取。',
            },
            {
                type: 'paragraph',
                content:
                    '值得注意的是，患者对此状况表现出异常的冷静与兴趣。他主动要求参与每一项检查，并多次请求复制自己的检查数据。随访医生记录道："该患者不像是在接受检查，更像是在研究检查。他看片子的眼神，像在看自己的实验数据。"',
            },
            {
                type: 'paragraph',
                content:
                    '患者自述的最初观察始于28岁："我记得我小时候的事情，非常清楚。然后有一天我发现，我想不起来我小学同桌的脸了。我试图回忆，但那个位置是空的。不是模糊——是空。好像那里从来就没有过东西。"',
            },
            { type: 'divider' },
            {
                type: 'heading',
                content: '【讨论】',
                level: 2,
            },
            {
                type: 'paragraph',
                content:
                    '本病例最具特征性的发现是记忆缺失的"时间方向性"。在已报道的各类记忆障碍中，遗忘通常遵循"近事遗忘先于远事遗忘"的规律（如阿尔茨海默病）。本病例却呈现完全相反的模式：远事先失，近事后失，遗忘前沿如窗口般向当前时刻推进。',
            },
            {
                type: 'paragraph',
                content:
                    '作者提出一种假说：记忆提取失败可能不是存储介质的损坏，而是编码-解码过程的功能性故障。正如某些软件在读取旧格式数据时出现的兼容性问题——数据本身可能仍然存在，但系统已无法对其进行解码。',
            },
            {
                type: 'paragraph',
                content:
                    '若此假说成立，则意味着：患者失去的记忆或许并未真正消失，而是处于一种"不可访问"的状态。这为未来可能的治疗提供了理论窗口——正如恢复旧数据一样，或许存在恢复旧记忆的可能。',
            },
            {
                type: 'paragraph',
                content:
                    '但作者亦须承认：目前尚无任何证据表明这种"恢复"可以实现。对于患者而言，不可访问的数据与已删除的数据，在体验上没有区别。',
            },
            { type: 'divider' },
            {
                type: 'field',
                label: '编辑部注',
                value: '本病例报告系单病例观察，样本量有限，所述假说尚缺乏进一步验证。欢迎学界同仁提供类似病例以供比对研究。',
            },
            {
                type: 'signature',
                content: '林远\n1992年3月',
            },
        ],
        archiveNote:
            '这是林远发表的第一篇、也是最后一篇学术论文。他给自己的病起了名字："滑动窗"——此后二十余年，这个隐喻贯穿了他全部的自我理解。科室主任后来评价这是"咱们科发过的最好的文章之一"。\n\n值得注意的是：论文中"记忆提取失败可能不是存储介质的损坏，而是编码-解码过程的功能性故障"这句话，写于他转向计算机科学之前——他在用一个尚未学过的学科的语言，预言自己的命运。',
    },
};

export default archiveContents;
