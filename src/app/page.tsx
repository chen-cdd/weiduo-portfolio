import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Github, Linkedin, Mail, BriefcaseIcon, 
  GraduationCapIcon, MessageSquareIcon, ArrowRight, 
  BlocksIcon
} from "lucide-react";
import { projects } from "@/lib/data/projects";
import { ArrowDown } from "lucide-react";
import ScrollIndicator from "../components/ScrollIndicator";
import { link } from "fs";



export default function Home() {
  return (
    <div className="flex min-h-screen flex-col"> {/* 将main改为div */}
      {/* Hero Section - 增强视觉效果 */}
      <section className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
        {/* 3D 粒子背景 */}
        <div className="absolute inset-0 -z-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-soft-light filter blur-[100px] opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-soft-light filter blur-[120px] opacity-20 animate-pulse-slow delay-700"></div>
        </div>
        
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-flow"></div>
        
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] animate-grid-pulse"></div>
        
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
            <div className="space-y-4 animate-fade-in-up">
              {/* 添加浮动动画和文字阴影 */}
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none animate-float">
                Hi, I'm <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600">Weiduo</span>
              </h1>
              
              {/* 添加打字机动画效果 */}
              <div className="h-8 flex justify-center">
                <p className="text-xl md:text-2xl text-muted-foreground dark:text-gray-300 inline-block border-r-2 border-r-foreground animate-typewriter overflow-hidden whitespace-nowrap">
                  Product Manager & Creative Developer
                </p>
              </div>  
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section id="about-me" className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto text-center"></div>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>

            <div className="flex flex-col gap-12">
              {/* 上部分：左右布局 */}
              <div className="grid gap-12 md:grid-cols-[1fr_1fr] items-start">
                {/* 左侧：自我介绍 */}
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    关于我
                  </h2>

                  <p className="font-mono  text-lg text-muted-foreground leading-relaxed">
                  你好，我是 威朵 ！
                  </p>
                  <p className="font-mono  text-lg text-muted-foreground leading-relaxed">
                  一名 AI 产品路上的探索者与实践者（也是个爱捣鼓代码的创意开发者！）。
                  </p>
                  <p className="font-mono  text-lg text-muted-foreground leading-relaxed">
                    我对 AI 无比着迷，并通过多项 AI 产品实习，锻炼了快速学习、洞察需求，以及运用 LLM、RAG、AI Agent 等技术设计创新方案的能力。
                  </p>
                  <p className="font-mono  text-lg text-muted-foreground leading-relaxed">
                    我热衷协作，对新事物充满好奇，立志打造能带来真正价值和惊喜的产品体验。
                  </p>
                
              </div>

              {/* 右侧：形象+学历经历 */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl transform -rotate-3 animate-pulse-slow"></div>
                <div className="relative bg-card p-6 rounded-2xl border shadow-xl space-y-6">
                  <img 
                    src="/app/profile.jpg" 
                    alt="Profile"
                    className="w-full aspect-[4/3] object-cover rounded-lg
    max-w-[320px] mx-auto"
                  />
                  <div className="space-y-3">

                  <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                      <GraduationCapIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium font-mono">兰州理工大学 软件工程</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full">
                      <BriefcaseIcon className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium font-mono">1年+实习经历，AI产品经历</p>
                    </div>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 下部分技能板块 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl transform rotate-3 animate-pulse-slow"></div>
              <div className="relative bg-card p-6 rounded-2xl border shadow-xl">
                <h3 className="text-xl font-mono mb-4">Technical Skills 技能展示</h3>
                <div className="space-y-8">
                  {/* AI & Machine Learning */}
                  <div>
                    <h4 className="text-lg font-mono mb-2">AI &amp; Machine Learning</h4>
                    <div className="flex flex-wrap gap-2">
                      <img src="https://img.shields.io/badge/-PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="PyTorch" />
                      <img src="https://img.shields.io/badge/-LangChain-3178C6?style=flat-square&logo=chainlink&logoColor=white" alt="LangChain" />
                      <img src="https://img.shields.io/badge/-YOLO-00FFFF?style=flat-square&logo=yolo&logoColor=black" alt="YOLO" />
                      <img src="https://img.shields.io/badge/-LLM-FF4B4B?style=flat-square&logo=openai&logoColor=white" alt="LLM" />
                      <img src="https://img.shields.io/badge/-Pandas-150458?style=flat-square&logo=pandas&logoColor=white" alt="Pandas" />
                      <img src="https://img.shields.io/badge/-NumPy-013243?style=flat-square&logo=numpy&logoColor=white" alt="NumPy" />
                    </div>
                  </div>
                  {/* AI Tools & Platforms */}
                  <div>
                    <h4 className="text-lg font-mono mb-2">AI Tools &amp; Platforms</h4>
                    <div className="flex flex-wrap gap-2">
                      <img src="https://img.shields.io/badge/-Ollama-000000?style=flat-square&logo=llama&logoColor=white" alt="Ollama" />
                      <img src="https://img.shields.io/badge/-Gradio-F39019?style=flat-square&logo=gradio&logoColor=white" alt="Gradio" />
                      <img src="https://img.shields.io/badge/-Dify-4B32C3?style=flat-square&logo=dify&logoColor=white" alt="Dify" />
                      <img src="https://img.shields.io/badge/-Coze-00ADD8?style=flat-square&logo=coze&logoColor=white" alt="Coze" />
                      <img src="https://img.shields.io/badge/-n8n.cloud-FE6100?style=flat-square&logo=n8n&logoColor=white" alt="n8n.cloud" />
                      <img src="https://img.shields.io/badge/-Camel-FF6B6B?style=flat-square&logo=camel&logoColor=white" alt="Camel" />
                      <img src="https://img.shields.io/badge/-Mofa-4A90E2?style=flat-square&logo=mofa&logoColor=white" alt="Mofa" />
                      <img src="https://img.shields.io/badge/-SearXNG-7289DA?style=flat-square&logo=search&logoColor=white" alt="SearXNG" />
                    </div>
                  </div>
                  {/* Web Development */}
                  <div>
                    <h4 className="text-lg font-mono mb-2">Web Development</h4>
                    <div className="flex flex-wrap gap-2">
                      <img src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
                      <img src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
                      <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
                      <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
                      <img src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
                      <img src="https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
                      <img src="https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
                      <img src="https://img.shields.io/badge/-Java-007396?style=flat-square&logo=java&logoColor=white" alt="Java" />
                      <img src="https://img.shields.io/badge/-Django-092E20?style=flat-square&logo=django&logoColor=white" alt="Django" />
                      <img src="https://img.shields.io/badge/-Flask-000000?style=flat-square&logo=flask&logoColor=white" alt="Flask" />
                    </div>
                  </div>
                  {/* Development Tools */}
                  <div>
                    <h4 className="text-lg font-mono mb-2">Development Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      <img src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" alt="Git" />
                      <img src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
                      <img src="https://img.shields.io/badge/-Transflow-FF6C37?style=flat-square&logo=apache&logoColor=white" alt="Transflow" />
                    </div>
                  </div>
                  <div>
                  <h4 className="text-lg font-mono mb-2">持续学习中...</h4>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section id="resume" className="py-20 bg-accent/10">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume Assistant
            </h2>
            <p className="text-lg text-muted-foreground">
              Chat with my AI assistant to learn more about my experience and skills
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-background rounded-2xl border shadow-xl overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    AI
                  </div>
                  <div>
                    <h3 className="font-semibold">Weiduo's AI Assistant</h3>
                    <p className="text-sm text-muted-foreground">Ask me anything about my experience</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 min-h-[300px] max-h-[400px] overflow-y-auto space-y-4">
                <div className="flex items-start gap-3 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
                    AI
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-2xl p-4">
                    <p>Hi! I'm Weiduo's AI assistant. I can help you learn more about his experience, skills, and background. What would you like to know?</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask me anything about Weiduo..."
                    className="flex-1 rounded-full px-4 py-3 bg-muted/50 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    disabled
                  />
                  <Button 
                    className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-transform hover:scale-105"
                    disabled
                  >
                    <MessageSquareIcon className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-3">
                  AI integration coming soon...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Internship Experience
          </h2>
          <div className="space-y-12 max-w-3xl mx-auto">
            {[
              {
                company: "Tech Company A",
                position: "Frontend Developer Intern",
                period: "Summer 2023",
                description: "Developed and maintained responsive web applications using React and TypeScript. Collaborated with the design team to implement UI components.",
                technologies: ["React", "TypeScript", "TailwindCSS"]
              },
              {
                company: "Tech Company B",
                position: "UI/UX Design Intern",
                period: "Fall 2022",
                description: "Created user interfaces for mobile applications. Conducted user research and usability testing to improve product design.",
                technologies: ["Figma", "Adobe XD", "Prototyping"]
              }
            ].map((experience, index) => (
              <div 
                key={index} 
                className="relative pl-8 group"
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 transform -translate-x-2 z-10"></div>
                
                <div className="pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-background transform rotate-45"></div>
                  <div className="bg-card p-6 rounded-xl border shadow-lg group-hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{experience.company}</h3>
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 text-sm">
                        {experience.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">{experience.position}</p>
                    <p className="mb-4">{experience.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 rounded-full bg-accent text-sm transition-transform hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-accent/10">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tighter mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="flex flex-col items-center justify-center mx-auto max-w-7xl">

          <div className="flex justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl">
            {projects.slice(0, 3).map((project) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.id}`}
                className="group relative overflow-hidden rounded-xl border bg-background hover:border-foreground/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-5 relative text-center">
                  <div className="mb-4 bg-muted rounded-lg h-40 flex items-center justify-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  </div>
                  <h3 className="font-semibold leading-none tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.techStack.map((tech) => (
                      <span 
                        key={tech} 
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors group-hover:border-blue-500/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          </div>

          <div className="mt-16 text-center">
            <Button 
              asChild 
              variant="outline"
              className="group transition-all duration-300 hover:scale-105"
            >
              <Link href="/projects" className="flex items-center">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section - 增强视觉效果 */}
      <section id="contact" className="py-20 relative">
        {/* 装饰元素 */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-[80px]"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-[100px]"></div>
        
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              
            </p>
            
            <div className="flex justify-center space-x-6">
              {[
                { 
                  icon: Mail, 
                  label: "Email", 
                  link: "mailto:chenweiduo66960@gmail.com",
                  color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300"
                },
                { 
                  icon: Github,
                  label: "GitHub", 
                  link: "https://github.com/chen-cdd",
                  color: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                },
                { 
                  icon: Linkedin, 
                  label: "LinkedIn", 
                  link: "https://www.linkedin.com/in/weiduo-chen-b8865a2a8/",
                  color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                },
                { 
                  icon:BlocksIcon, 
                  label: " CSDN", 
                  link: "https://blog.csdn.net/m0_74113296?type=blog",
                  color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300"
                }
              ].map((item, index) => (
                <a 
                  key={index}
                  href={item.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${item.color} hover:bg-accent transition-all`}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}