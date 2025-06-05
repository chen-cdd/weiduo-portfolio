export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  github: string;
  demo: string;
}

export const projects: Project[] = [
  {
    id: "project1",
    title: "职场女性健康管理平台",
    description: "洞察职场女性健康管理痛点，提出通过 AI 技术构建智能化、个性化健康解决方案的产品。\n实现：个性化健康引擎：设计了核心的“个性化周期追踪”功能，思考如何利用用户数据提供精准预测与定制化健康建议。AI 驱动的交互体验：规划并推动实现了基于 Dify.AI 的“Ask Sani”智能健康助手，旨在通过自然语言交互提升用户获取健康支持的便捷性与即时性。构建服务闭环：设计“医疗咨询预约”模块，将线上 AI 健康管理与线下专业医疗服务有效链接。",
    category: "健康管理",
    techStack: ["AI", "Dify.AI", "个性化周期追踪"],
    github: "https://github.com/chen-cdd/UNwomen-hackthon",
    demo: ""
  },
  {
    id: "project2",
    title: "TechDora - 一站式 AI 技术与资讯聚合平台",
    description: "针对 AI 学习者信息获取分散优质资源难寻的痛点，旨在聚合 AI 领域高质量与开源资源，提供高效学习与交流的一站式入口。\n实现：内容聚合与智能发现：打造资讯系统，高效聚合 AI 价值信息，优化用户获取路径。互动学习与社区生态：设计 UGC 互动社区（树洞、评论），促进知识分享与学习者连接。",
    category: "AI平台",
    techStack: ["内容聚合", "UGC 社区", "AI 资讯系统"],
    github: "https://github.com/chen-cdd/aitechdora/tree/master",
    demo: ""
  }
];