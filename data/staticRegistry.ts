import { Blog, Event, Job, Sponsor, Resource } from '../types';

export const STATIC_REGISTRY = {
  blogs: [
    {
      id: 'b1',
      type: 'blog',
      title: { cn: '观测：现代前端的飞行路径', en: 'Observation: The Flight Path of Modern Frontend' },
      date: '2024-05-12',
      location: 'Berlin',
      coordinates: [13.4050, 52.5200],
      summary: { cn: '探索声明式UI的未来演变。', en: 'Exploring the future evolution of declarative UI.' }
    },
    {
      id: 'b2',
      type: 'blog',
      title: { cn: '旧金山湾区的信号塔', en: 'Signal Towers of the SF Bay Area' },
      date: '2024-06-01',
      location: 'San Francisco',
      coordinates: [-122.4194, 37.7749],
      summary: { cn: '硅谷最新的硬件抽象层协议分析。', en: 'Analysis of the latest Hardware Abstraction Layer protocols in Silicon Valley.' }
    },
    {
      id: 'b3',
      type: 'blog',
      title: { cn: '东京：霓虹与代码', en: 'Tokyo: Neon and Code' },
      date: '2024-06-15',
      location: 'Tokyo',
      coordinates: [139.6917, 35.6895],
      summary: { cn: '亚洲开发者社区的赛博朋克式复兴。', en: 'The cyberpunk renaissance of the Asian developer community.' }
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
      link: '/events.html'
    },
    {
      id: 'e2',
      type: 'event',
      name: { cn: '算法挑战赛：第七区', en: 'Algo Challenge: Sector 7' },
      priority: 'medium',
      status: { cn: '即将开始', en: 'Upcoming' },
      tag: { cn: '在线', en: 'Online' },
      date: '2025 Q4',
      link: '/challenges.html'
    },
    {
      id: 'e3',
      type: 'event',
      name: { cn: 'Hackcon: 组织者峰会', en: 'Hackcon: Organizer Summit' },
      priority: 'high',
      status: { cn: '筹备中', en: 'Preparing' },
      tag: { cn: '纽约', en: 'NYC' },
      date: '2025 Q3',
      link: '/hackcon.html'
    },
    {
      id: 'e4',
      type: 'event',
      name: { cn: '极速代码冲刺', en: 'Velocity Code Sprint' },
      priority: 'medium',
      status: { cn: '已结束', en: 'Closed' },
      tag: { cn: '伦敦', en: 'London' },
      date: '2024 Q2',
      link: '/events.html'
    }
  ] as Event[],

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
      industry: { cn: '高性能计算', en: 'HPC' }
    },
    {
      id: 's2',
      type: 'sponsor',
      brandName: { cn: '量子云', en: 'Quantum Cloud' },
      tier: 'Gold',
      industry: { cn: '云服务', en: 'Cloud Services' }
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
  ] as Resource[]
};