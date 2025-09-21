export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  github: string;
  demo: string;
  images: string[];
}

export const projects: Project[] = [
  {
   id: "project1",
   title: "明镜 - 心理向自我成长 AI 小程序",description: "洞察当代人情绪表达无出口、自我认知不清晰、心理调节缺方法的痛点，提出以 “记录 - 映照 - 引导” 三阶段为核心的 AI 陪伴式心理成长解决方案。\n 实现：多模态情绪记录引擎：设计 “语音倾诉 + 文字记录” 双输入功能，集成百度语音识别（ASR）技术，实现实时录音转写与情感特征提取，思考如何通过多维度输入捕捉用户真实情绪状态。AI 驱动的情感映照与引导：规划并落地基于 LLM 的智能分析与对话功能，通过 NLP 技术解析情绪倾向，提供共情回应与客观分析，同时结合用户情绪推荐个性化技能卡（如呼吸法、沟通脚本），构建 “识别 - 分析 - 引导 - 实践” 的完整闭环。隐私友好的成长追踪：设计 “内心世界” 数据沉淀模块，在保障隐私前提下，记录长期情绪变化趋势，助力用户洞察自我成长规律，同时搭建紧急救助入口，完善心理支持安全防线。",
   category: "心理成长 / 情绪管理",
   techStack: ["AI", "LLM", "ASR", "NLP 情绪分析", "多模态输入处理"],
   github: "https://github.com/chen-cdd/Mingjing-aiia",
   demo: "",
   images: [
    "/projects/mingjing-1.jpg",
   ]
  },
  {
    id: "project2",
    title: "职场女性健康管理平台",
    description: "洞察职场女性健康管理痛点，提出通过 AI 技术构建智能化、个性化健康解决方案的产品。\n实现：个性化健康引擎：设计了核心的“个性化周期追踪”功能，思考如何利用用户数据提供精准预测与定制化健康建议。AI 驱动的交互体验：规划并推动实现了基于 Dify.AI 的“Ask Sani”智能健康助手，旨在通过自然语言交互提升用户获取健康支持的便捷性与即时性。构建服务闭环：设计“医疗咨询预约”模块，将线上 AI 健康管理与线下专业医疗服务有效链接。",
    category: "健康管理",
    techStack: ["AI", "Dify.AI", "个性化周期追踪","个性化推荐","AI 驱动的交互体验"],
    github: "https://github.com/chen-cdd/UNwomen-hackthon",
    demo: "/projects/unwomen.mp4",
    images: [
      "/projects/health-1.jpg",
    ]
  },
  {
    id: "project3",
    title: "TechDora - 一站式 AI 技术与资讯聚合平台",
    description: "针对 AI 学习者信息获取分散优质资源难寻的痛点，旨在聚合 AI 领域高质量与开源资源，提供高效学习与交流的一站式入口。\n实现：内容聚合与智能发现：打造资讯系统，高效聚合 AI 价值信息，优化用户获取路径。互动学习与社区生态：设计 UGC 互动社区（树洞、评论），促进知识分享与学习者连接。",
    category: "AI平台",
    techStack: ["内容聚合", "UGC 社区", "AI 资讯系统","前后端"],
    github: "https://github.com/chen-cdd/aitechdora/tree/master",
    demo: "",
    images: [
      "/projects/techdora-1.jpg",
    ]
  },
  {
    id: "project4",
    title: "DailyNews - AI 自动资讯摘要与微信发布工具",
    description: "洞察资讯处理中 “抓取低效、编辑耗时、发布繁琐” 的痛点，提出以 “自动化采集 + AI 智能加工 + 一键发布” 为核心的资讯处理解决方案。\n 实现：多源资讯自动抓取引擎：设计支持微信公众号、企业官网等平台的文章抓取功能（fetcher.py），思考如何通过灵活的链接配置与页面解析，高效获取目标资讯内容，同时通过 seen.json 记录已处理链接避免重复抓取。AI 驱动的资讯加工模块：规划并落地基于 OpenAI 模型的摘要生成与扩写功能（rewriter.py），实现资讯内容的精炼总结与深度分析，同时配套 renderer.py 与 md2html.py 工具，自动生成适配微信公众号风格的 Markdown 与美化 HTML，解决格式适配难题。全流程发布闭环：构建 “抓取 - 加工 - 渲染 - 发布” 一体化链路，支持手动模式（读取 urls.txt）、自动模式（定时抓取）与多维度发布选项（草稿 / 预览 / 群发），通过 publisher.py 对接微信 API，实现资讯一键推送至微信公众号草稿箱，大幅简化资讯运营流程。",
    category: "资讯自动化处理",
    techStack: ["AI", "OpenAI", "微信 API", "网页抓取", "定时调度"],
    github: "https://github.com/chen-cdd/DailyNews",
    demo: "",
    images: [
      "/projects/dailynews.jpg",
    ]
  }
];