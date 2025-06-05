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
    title: "智能任务管理平台",
    description: "一站式智能任务与团队协作平台，支持多端同步与自动化提醒。",
    category: "Web应用",
    techStack: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/your-github/project1",
    demo: "https://demo1.example.com"
  },
  {
    id: "project2",
    title: "数据可视化大屏",
    description: "支持多维数据分析与实时可视化的企业级大屏解决方案。",
    category: "数据可视化",
    techStack: ["Vue", "ECharts", "TypeScript"],
    github: "https://github.com/your-github/project2",
    demo: "https://demo2.example.com"
  },
  {
    id: "project3",
    title: "AI 智能问答助手",
    description: "基于大模型的智能问答与知识检索系统，支持多语言切换。",
    category: "人工智能",
    techStack: ["Next.js", "OpenAI API", "TailwindCSS"],
    github: "https://github.com/your-github/project3",
    demo: "https://demo3.example.com"
  }
];