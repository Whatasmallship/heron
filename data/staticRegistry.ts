import { Blog, Event, Job, Sponsor, Resource, Career } from '../types';

export const STATIC_REGISTRY = {
  blogs: [
    {
      id: 'b1',
      type: 'blog',
      title: { cn: '观测：现代前端的飞行路径', en: 'Observation: The Flight Path of Modern Frontend' },
      date: '2024-05-12',
      location: 'Berlin',
      coordinates: [13.4050, 52.5200],
      summary: { cn: '探索声明式UI的未来演变。', en: 'Exploring the future evolution of declarative UI.' },
      excerpt: {
        cn: '在柏林的技术峰会上，我们深入探讨了声明式UI框架如何改变前端开发的格局。从React的函数式组件到Solid的响应式原语，前端开发正经历一场静默的革命。本文将分析这些变化背后的设计哲学，以及它们对未来开发者工作流的影响。',
        en: 'At the Berlin tech summit, we explored how declarative UI frameworks are reshaping frontend development. From React\'s functional components to Solid\'s reactive primitives, frontend development is undergoing a silent revolution. This article analyzes the design philosophy behind these changes and their impact on future developer workflows.'
      }
    },
    {
      id: 'b2',
      type: 'blog',
      title: { cn: '旧金山湾区的信号塔', en: 'Signal Towers of the SF Bay Area' },
      date: '2024-06-01',
      location: 'San Francisco',
      coordinates: [-122.4194, 37.7749],
      summary: { cn: '硅谷最新的硬件抽象层协议分析。', en: 'Analysis of the latest HAL protocols in Silicon Valley.' },
      excerpt: {
        cn: '硅谷的创新从未停止。在最新一轮的技术浪潮中，硬件抽象层（HAL）协议正在被重新定义。我们走访了湾区多家顶尖科技公司，深入了解他们如何构建下一代芯片与软件的桥梁，以及这对全球开发者生态意味着什么。',
        en: 'Innovation in Silicon Valley never stops. In the latest wave of technology, Hardware Abstraction Layer (HAL) protocols are being redefined. We visited several top tech companies in the Bay Area to understand how they are building the bridge between next-generation chips and software, and what this means for the global developer ecosystem.'
      }
    },
    {
      id: 'b3',
      type: 'blog',
      title: { cn: '东京：霓虹与代码', en: 'Tokyo: Neon and Code' },
      date: '2024-06-15',
      location: 'Tokyo',
      coordinates: [139.6917, 35.6895],
      summary: { cn: '亚洲开发者社区的赛博朋克式复兴。', en: 'The cyberpunk renaissance of the Asian developer community.' },
      excerpt: {
        cn: '东京的夜晚闪烁着霓虹灯光，而在这些灯光背后，一群充满热情的开发者正在书写新的代码传奇。从独立游戏工作室到大型企业研发中心，日本开发者社区正展现出前所未有的活力。我们探访了秋叶原的黑客空间和涩谷的初创公司，记录这场赛博朋克式的技术复兴。',
        en: 'Tokyo nights flicker with neon lights, and behind these lights, passionate developers are writing new code legends. From indie game studios to large enterprise R&D centers, the Japanese developer community is showing unprecedented vitality. We visited hacker spaces in Akihabara and startups in Shibuya to document this cyberpunk-style tech renaissance.'
      }
    }
  ] as Blog[],

  events: [
    {
      id: 'e1',
      type: 'event',
      name: { cn: '鹭羽扇动黑客松 2026', en: 'Heron Wing-Beat Hackathon 2026' },
      priority: 'high',
      status: { cn: '报名中', en: 'Open' },
      tag: { cn: '全球', en: 'Global' },
      date: '2026 Q1',
      link: '/events.html',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
      shortIntro: { cn: '全球最大的AI与开源黑客松', en: 'The world\'s largest AI & open-source hackathon' },
      detailedIntro: {
        cn: '2026年鹭羽扇动黑客松将在全球30个城市同步举行，预计超过10,000名开发者参与。本次活动将聚焦AI驱动的开源项目，提供总计100万美元的奖金池和来自顶级科技公司的导师支持。',
        en: 'The 2026 Heron Wing-Beat Hackathon will be held simultaneously in 30 cities worldwide, with over 10,000 developers expected to participate. This event focuses on AI-driven open-source projects, offering a total prize pool of $1 million and mentorship from top tech companies.'
      }
    },
    {
      id: 'e2',
      type: 'event',
      name: { cn: '算法挑战赛：第七区', en: 'Algo Challenge: Sector 7' },
      priority: 'medium',
      status: { cn: '即将开始', en: 'Upcoming' },
      tag: { cn: '在线', en: 'Online' },
      date: '2025 Q4',
      link: '/challenges.html',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
      shortIntro: { cn: '面向顶尖算法工程师的极限挑战', en: 'Ultimate challenge for top algorithm engineers' },
      detailedIntro: {
        cn: '第七区算法挑战赛专为资深算法工程师设计，包含动态规划、图论、机器学习等高难度题目。排名前50的选手将获得直接面试顶级科技公司的机会。',
        en: 'Sector 7 Algorithm Challenge is designed for senior algorithm engineers, featuring advanced problems in dynamic programming, graph theory, and machine learning. Top 50 ranked participants will receive direct interview opportunities with leading tech companies.'
      }
    },
    {
      id: 'e3',
      type: 'event',
      name: { cn: 'Hackcon: 组织者峰会', en: 'Hackcon: Organizer Summit' },
      priority: 'high',
      status: { cn: '筹备中', en: 'Preparing' },
      tag: { cn: '纽约', en: 'NYC' },
      date: '2025 Q3',
      link: '/hackcon.html',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
      shortIntro: { cn: '黑客松组织者年度盛会', en: 'Annual gathering of hackathon organizers' },
      detailedIntro: {
        cn: 'Hackcon是全球黑客松组织者的年度峰会，汇集来自50+国家的社区领袖。今年将在纽约举办，主题是"规模化社区运营"，包含工作坊、圆桌讨论和高规格社交晚宴。',
        en: 'Hackcon is the annual summit for hackathon organizers worldwide, bringing together community leaders from 50+ countries. This year in NYC, the theme is "Scaling Community Operations", featuring workshops, roundtables, and a high-profile networking dinner.'
      }
    },
    {
      id: 'e4',
      type: 'event',
      name: { cn: '极速代码冲刺', en: 'Velocity Code Sprint' },
      priority: 'medium',
      status: { cn: '已结束', en: 'Closed' },
      tag: { cn: '伦敦', en: 'London' },
      date: '2024 Q2',
      link: '/events.html',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
      shortIntro: { cn: '48小时极限编程马拉松', en: '48-hour extreme coding marathon' },
      detailedIntro: {
        cn: '极速代码冲刺是一场为期48小时的高强度编程马拉松，参与者需要在极短时间内完成一个完整的产品原型。本次活动已成功举办，共有200支队伍参与，产出了多个优秀的开源项目。',
        en: 'Velocity Code Sprint is a 48-hour high-intensity coding marathon where participants must complete a full product prototype in minimal time. This event concluded successfully with 200 teams participating and producing multiple excellent open-source projects.'
      }
    },
    {
      id: 'e5',
      type: 'event',
      name: { cn: '开源之夏', en: 'Open Source Summer' },
      priority: 'high',
      status: { cn: '报名中', en: 'Open' },
      tag: { cn: '柏林', en: 'Berlin' },
      date: '2025 Q2',
      link: '/events.html',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
      shortIntro: { cn: '面向学生的开源贡献计划', en: 'Open source contribution program for students' },
      detailedIntro: {
        cn: '开源之夏是一项为期三个月的暑期计划，帮助学生参与真实的开源项目。参与者将获得导师指导和丰厚奖金。',
        en: 'Open Source Summer is a three-month program helping students contribute to real open-source projects with mentor guidance and generous stipends.'
      }
    },
    {
      id: 'e6',
      type: 'event',
      name: { cn: 'AI创新日', en: 'AI Innovation Day' },
      priority: 'medium',
      status: { cn: '即将开始', en: 'Upcoming' },
      tag: { cn: '上海', en: 'Shanghai' },
      date: '2025 Q1',
      link: '/events.html',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      shortIntro: { cn: '探索人工智能前沿应用', en: 'Exploring cutting-edge AI applications' },
      detailedIntro: {
        cn: 'AI创新日汇集业界顶尖专家，分享最新的人工智能研究成果和商业应用案例。',
        en: 'AI Innovation Day brings together industry experts to share the latest AI research and commercial applications.'
      }
    },
    {
      id: 'e7',
      type: 'event',
      name: { cn: '区块链黑客松', en: 'Blockchain Hackathon' },
      priority: 'medium',
      status: { cn: '已结束', en: 'Closed' },
      tag: { cn: '新加坡', en: 'Singapore' },
      date: '2024 Q4',
      link: '/events.html',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
      shortIntro: { cn: 'Web3开发者盛会', en: 'Web3 developer gathering' },
      detailedIntro: {
        cn: '区块链黑客松聚焦去中心化应用开发，吸引了来自全球的500+开发者参与。',
        en: 'Blockchain Hackathon focuses on decentralized app development, attracting 500+ developers globally.'
      }
    },
    {
      id: 'e8',
      type: 'event',
      name: { cn: '云原生峰会', en: 'Cloud Native Summit' },
      priority: 'high',
      status: { cn: '筹备中', en: 'Preparing' },
      tag: { cn: '深圳', en: 'Shenzhen' },
      date: '2025 Q3',
      link: '/events.html',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      shortIntro: { cn: 'Kubernetes与容器技术大会', en: 'Kubernetes and container tech conference' },
      detailedIntro: {
        cn: '云原生峰会探讨容器化、微服务和DevOps最佳实践，预计超过2000名技术专家参会。',
        en: 'Cloud Native Summit explores containerization, microservices and DevOps best practices with 2000+ tech experts.'
      }
    },
    {
      id: 'e9',
      type: 'event',
      name: { cn: '前端嘉年华', en: 'Frontend Carnival' },
      priority: 'medium',
      status: { cn: '已结束', en: 'Closed' },
      tag: { cn: '杭州', en: 'Hangzhou' },
      date: '2024 Q3',
      link: '/events.html',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
      shortIntro: { cn: 'Web前端技术盛宴', en: 'Web frontend tech feast' },
      detailedIntro: {
        cn: '前端嘉年华是国内最大的前端技术会议之一，涵盖React、Vue、性能优化等热门话题。',
        en: 'Frontend Carnival is one of the largest frontend conferences, covering React, Vue, performance optimization and more.'
      }
    },
    {
      id: 'e10',
      type: 'event',
      name: { cn: '安全攻防赛', en: 'Security CTF' },
      priority: 'high',
      status: { cn: '报名中', en: 'Open' },
      tag: { cn: '线上', en: 'Online' },
      date: '2026 Q2',
      link: '/events.html',
      image: 'data/pics/PixPin_2026-01-29_11-14-38.png',
      shortIntro: { cn: '网络安全实战演练', en: 'Cybersecurity combat drill' },
      detailedIntro: {
        cn: '安全攻防赛(CTF)是面向安全研究人员的实战比赛，涵盖Web安全、逆向工程、密码学等方向。',
        en: 'Security CTF is a hands-on competition for security researchers, covering web security, reverse engineering, and cryptography.'
      }
    }
  ] as Event[],

  careers: [
    {
      id: 'c1',
      type: 'career',
      title: { cn: '工作机会', en: 'Job Opportunities' },
      stats: [
        { label: { cn: '合作企业', en: 'Partner Companies' }, value: '500+' },
        { label: { cn: '输送实习生', en: 'Placed Interns' }, value: '1,200+' },
        { label: { cn: '平均薪资涨幅', en: 'Avg Salary Increase' }, value: '35%' }
      ],
      description: {
        cn: '通过PROJECT HERON的职业网络，我们已帮助超过1200名开发者找到理想的技术岗位。我们的合作企业涵盖硅谷巨头、独角兽公司和创新型初创企业。',
        en: 'Through Project Heron\'s career network, we have helped over 1,200 developers find their ideal tech positions. Our partner companies include Silicon Valley giants, unicorns, and innovative startups.'
      }
    },
    {
      id: 'c2',
      type: 'career',
      title: { cn: '导师指导', en: 'Coach Mentorship' },
      stats: [
        { label: { cn: '认证导师', en: 'Certified Coaches' }, value: '150+' },
        { label: { cn: '辅导时长', en: 'Coaching Hours' }, value: '10,000+' },
        { label: { cn: '学员满意度', en: 'Mentee Satisfaction' }, value: '98%' }
      ],
      description: {
        cn: 'Coach导师计划连接资深工程师与新晋开发者。导师职责包括：1对1技术辅导、代码审查、职业规划咨询。每位导师经过严格筛选，确保提供最高质量的指导。',
        en: 'The Coach Mentorship program connects senior engineers with emerging developers. Coach responsibilities include: 1-on-1 technical guidance, code reviews, and career planning. Each coach is rigorously vetted to ensure the highest quality mentorship.'
      }
    },
    {
      id: 'c3',
      type: 'career',
      title: { cn: '职业课程', en: 'Career Courses' },
      stats: [
        { label: { cn: '课程数量', en: 'Total Courses' }, value: '50+' },
        { label: { cn: '学习者', en: 'Learners' }, value: '25,000+' },
        { label: { cn: '完课率', en: 'Completion Rate' }, value: '72%' }
      ],
      description: {
        cn: '我们的职业课程涵盖系统设计、算法面试、软技能培养等核心领域。所有课程均由业界专家设计，结合实战项目和模拟面试，帮助开发者全面提升竞争力。',
        en: 'Our career courses cover core areas including system design, algorithm interviews, and soft skills development. All courses are designed by industry experts, combining hands-on projects and mock interviews to help developers comprehensively enhance their competitiveness.'
      }
    }
  ] as Career[],

  jobs: [
    {
      id: 'j1',
      type: 'job',
      position: { cn: '首席创意工程师', en: 'Lead Creative Engineer' },
      department: { cn: '创意技术部', en: 'Creative Tech Dept' },
      salaryRange: '$120k - $180k',
      link: '/jobs.html'
    },
    {
      id: 'j2',
      type: 'job',
      position: { cn: 'Rust 系统架构师', en: 'Rust Systems Architect' },
      department: { cn: '核心基建', en: 'Core Infrastructure' },
      salaryRange: '$150k - $220k',
      link: '/jobs.html'
    },
    {
      id: 'j3',
      type: 'job',
      position: { cn: '黑客松活动教练', en: 'Hackathon Coach' },
      department: { cn: '社区运营', en: 'Community Ops' },
      salaryRange: '$80k - $100k',
      link: '/coaches.html'
    },
    {
      id: 'j4',
      type: 'job',
      position: { cn: 'WebGL 视觉专家', en: 'WebGL Visualist' },
      department: { cn: '设计实验室', en: 'Design Lab' },
      salaryRange: '$110k - $160k',
      link: '/jobs.html'
    },
    {
      id: 'j5',
      type: 'job',
      position: { cn: '开发者关系专员', en: 'DevRel Specialist' },
      department: { cn: '增长团队', en: 'Growth Team' },
      salaryRange: '$90k - $130k',
      link: '/jobs.html'
    },
    {
      id: 'j6',
      type: 'job',
      position: { cn: '实习：前端开发', en: 'Intern: Frontend Dev' },
      department: { cn: '工程部', en: 'Engineering' },
      salaryRange: '$5k/mo',
      link: '/fellowship.html'
    }
  ] as Job[],

  sponsors: [
    {
      id: 's1',
      type: 'sponsor',
      brandName: { cn: '钛逻辑', en: 'Titanium Logic' },
      tier: 'Platinum',
      industry: { cn: '高性能计算', en: 'HPC' },
      logo: 'TL',
      url: 'https://example.com/titanium'
    },
    {
      id: 's2',
      type: 'sponsor',
      brandName: { cn: '量子云', en: 'Quantum Cloud' },
      tier: 'Gold',
      industry: { cn: '云服务', en: 'Cloud Services' },
      logo: 'QC',
      url: 'https://example.com/quantum'
    },
    {
      id: 's3',
      type: 'sponsor',
      brandName: { cn: '神经网络', en: 'Neural Net' },
      tier: 'Gold',
      industry: { cn: '人工智能', en: 'AI' },
      logo: 'NN',
      url: 'https://example.com/neural'
    },
    {
      id: 's4',
      type: 'sponsor',
      brandName: { cn: '代码堡垒', en: 'Code Fortress' },
      tier: 'Silver',
      industry: { cn: '网络安全', en: 'Cybersecurity' },
      logo: 'CF',
      url: 'https://example.com/fortress'
    },
    {
      id: 's5',
      type: 'sponsor',
      brandName: { cn: '星链数据', en: 'Starlink Data' },
      tier: 'Silver',
      industry: { cn: '大数据', en: 'Big Data' },
      logo: 'SD',
      url: 'https://example.com/starlink'
    },
    {
      id: 's6',
      type: 'sponsor',
      brandName: { cn: '边缘计算', en: 'Edge Compute' },
      tier: 'Silver',
      industry: { cn: '边缘计算', en: 'Edge Computing' },
      logo: 'EC',
      url: 'https://example.com/edge'
    }
  ] as Sponsor[],

  resources: [
    {
      id: 'r1',
      type: 'resource',
      resourceName: { cn: 'Heron OS: 社区组织手册', en: 'Heron OS: The Community Organizer Guide' },
      format: 'GitHub',
      description: { cn: '开源的黑客松组织标准化流程。', en: 'Open source standardized process for hackathons.' },
      link: '/organizer-guide.html'
    },
    {
      id: 'r2',
      type: 'resource',
      resourceName: { cn: '官方品牌视觉包', en: 'Official Brand Kit' },
      format: 'PDF/SVG',
      description: { cn: 'Logo、字体与配色规范。', en: 'Logos, fonts, and color guidelines.' },
      link: '/branding.html'
    }
  ] as Resource[],

  impactData: {
    prizePool: { cn: '¥ 5,000,000', en: '¥ 5,000,000' },
    prizeLabel: { cn: '奖金池', en: 'Prize Pool' },
    partners: { cn: '200+', en: '200+' },
    partnersLabel: { cn: '合作伙伴', en: 'Partners' }
  }
};