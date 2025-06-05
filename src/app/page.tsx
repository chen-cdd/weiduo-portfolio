"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Github, Linkedin, Mail, BriefcaseIcon, 
  GraduationCapIcon, MessageSquareIcon, ArrowRight, 
  BlocksIcon
} from "lucide-react";
import { projects } from "@/lib/data/projects";
import ScrollIndicator from "../components/ScrollIndicator";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "你好！我是威朵的AI助手。我可以帮你了解更多关于他的经历、技能和背景。你想了解什么？"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputValue("");
    
    try {
      const response = await fetch("/api/coze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: inputValue,
          user_id: "user_" + Math.random().toString(36).substring(2, 9) 
        })
      });
      
      const data = await response.json();
      
      if (data && data.code === 0 && data.data) {
        const conversationId = data.data.conversation_id;
        const chatId = data.data.id;
        // 【修正】将两个ID都传递给轮询函数
        await pollConversationResult(conversationId, chatId);
      } else {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: `抱歉，创建对话失败: ${data.msg || '未知错误'}`
        }]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error calling API:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "抱歉，网络连接似乎出了点问题。" 
      }]);
      setIsLoading(false);
    }
  };

  // ########## 最终版轮询函数 ##########
  const pollConversationResult = async (conversationId: string, chatId: string) => {
    const POLLING_INTERVAL = 2000;
    const MAX_RETRIES = 20;
    
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        if (i === 0) {
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        // 【核心修正】在请求中同时代入 conversation_id 和 chat_id
        const messagesResponse = await fetch(`/api/coze?conversation_id=${conversationId}&chat_id=${chatId}&endpoint=messages`);
        const messagesData = await messagesResponse.json();

        if (messagesData.code === 0 && Array.isArray(messagesData.data)) {
            const answerMessage = messagesData.data.find((msg: any) => 
                msg.role === 'assistant' && msg.type === 'answer'
            );

            if (answerMessage && answerMessage.content) {
                setMessages(prev => [...prev, {
                  role: 'assistant',
                  content: answerMessage.content
                }]);
                setIsLoading(false);
                return; 
            }
        } else if (messagesData.code !== 0) {
            console.error("API error while polling messages:", messagesData);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: `抱歉，获取结果时出错: (${messagesData.code}) ${messagesData.message || messagesData.msg}`
            }]);
            setIsLoading(false);
            return;
        }

        await new Promise(resolve => setTimeout(resolve, POLLING_INTERVAL));

      } catch (error) {
        console.error("Network error during polling:", error);
        setMessages(prev => [...prev, { 
            role: "assistant", 
            content: "抱歉，轮询结果时发生网络错误。" 
        }]);
        setIsLoading(false);
        return; 
      }
    }
    
    setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "抱歉，处理超时，请稍后再试。" 
    }]);
    setIsLoading(false);
  };
  // ########## 修改结束 ##########


  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 -z-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-soft-light filter blur-[100px] opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-soft-light filter blur-[120px] opacity-20 animate-pulse-slow delay-700"></div>
        </div>
        
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-flow"></div>
        
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] animate-grid-pulse"></div>
        
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none animate-float">
                Hi, I'm <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600">Weiduo</span>
              </h1>
              
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

      {/* About Me Section (此处省略未修改的JSX代码) */}
      <section id="about-me" className="py-20 bg-background">
        {/* ... */}
      </section>
      
      {/* Resume Assistant Section */}
      <section id="resume" className="py-20 bg-accent/10">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume Assistant
            </h2>
            <p className="text-lg text-muted-foreground font-mono">
              与我的 AI 助手聊天，了解有关我的经验和技能的更多信息
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-background rounded-2xl border shadow-xl overflow-hidden">
              <div className="p-4 border-b bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    AI
                  </div>
                  <div>
                    <h3 className="font-mono text-left">Weiduo's AI 助手</h3>
                    <p className="font-mono text-sm text-muted-foreground text-left">在线简历问答</p>
                  </div>
                </div>
              </div>
              
              <div ref={chatContainerRef} className="p-4 min-h-[300px] max-h-[400px] overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-3 animate-fade-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.role === "assistant" ? (
                      <>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0 flex items-center justify-center text-white text-sm">
                          AI
                        </div>
                        <div className="bg-muted/50 rounded-2xl p-4 font-mono text-left max-w-[85%]">
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-4 font-mono text-left max-w-[85%]">
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white text-sm">
                          You
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3 animate-fade-in">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0 flex items-center justify-center text-white text-sm">
                      AI
                    </div>
                    <div className="bg-muted/50 rounded-2xl p-4 font-mono">
                      <p>思考中...（大约需要等待30s哦~~）</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="告诉我关于威朵的任何问题..."
                    className="flex-1 rounded-full px-4 py-3 bg-muted/50 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <Button 
                    className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-transform hover:scale-105"
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                  >
                    <MessageSquareIcon className="h-4 w-4 mr-2" />
                    发送
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Experience Section */}
      <section id="experience" className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Internship Experience
          </h2>
          <div className="space-y-12 max-w-3xl mx-auto">
            {[
              {
                company: "德融宝科技（深圳）有限公司",
                position: "AI产品经理",
                project: "AI 驱动的传感器行业智能服务产品",
                period: "2025.02 - 至今",
                description: "商业成果：针对传感器行业选型周期长、服务成本高的痛点，参与产品功能从 0 到 1 落地。独立设计的产品原型获北方兵工业集团高度认可，为公司赢取百万级合同奠定了关键基础。性能优化：负责 AI Agent 核心工作流与 Prompt 设计，通过测试将“智能产品选型”任务成功率提升 85%，显著缩短了潜在销售周期。技术基建：主导构建了项目核心的 RAG 知识库，处理并向量化逾 9 万条行业数据，打造了可复用的 AI 服务底层资产。",
                technologies: ["RAG", "AI Agent", "从 0 到 1 (产品全周期)", "Prompt Engineering", "提效降本", "高保真原型", "知识库构建"]
              },
              {
                company: "JuniGO",
                position: "产品经理",
                project: "AI 赋能的 Web3 安全支付钱包 (PayFi)",
                period: "2024.09 - 2025.02",
                description: "项目背景 (Why):当前 Web3 市场机遇与风险并存，用户面临着日益猖獗的资产盗窃和洗钱风险，同时产品体验普遍复杂。本项目的核心目标是，通过深度行业洞察，并结合 AI 技术，设计一款兼具极致安全与易用性的新一代支付钱包产品（PayFi），抢占 Web3 安全赛道入口。核心职责与成果 (How & What):策略输入与方向定义： 独立进行 Web3 行业研究，通过分析头部项目与技术趋势（如 ZKP, DID），撰写多份深度报告。成功提炼出多个高潜力应用场景，为团队确立“AI+安全”的产品方向提供了关键决策依据。产品设计与落地： 负责 PayFi 钱包 MVP 的核心设计工作，独立完成 Figma 高保真原型及 PRD 文档，有效支持了产品从 0 到 1 的概念验证和研发启动。前沿应用探索： 探索总结了 AI 在 DeFi 安全领域的应用探索，聚焦于反洗钱(AML)、异常行为分析及交易风险预警，为产品构建长期技术壁垒进行了前瞻性布局。",
                technologies: ["Web3 / DeFi", "AI 安全 (AI Security)", "产品设计", "支付钱包","竞品分析","MVP","高保真原型 (Figma)","反洗钱 (AML)"]
              },
              {
                company: "明略科技集团",
                position: "大模型产品经理",
                project: "企业级 AI 智能营销平台",
                period: "2024.07 - 2024.09",
                description: "项目背景 (Why):在数字营销领域，企业普遍面临两大瓶颈：1）内容生产效率低，难以规模化产出高质量、个性化的营销文案；2）数据洞察滞后，难以从海量社媒数据中快速获取有效用户反馈以指导决策。本项目旨在打造一款 AI 驱动的营销平台，核心是实现内容创作的自动化和用户洞察的智能化，赋能企业实现降本增效与精准营销。核心职责与成果 (How & What):AIGC 内容提效： 主导 AI 营销内容生成模块，设计了覆盖营销全链路的 15 组高质量 Prompt 模板与 6 个核心工作流。通过持续的工程优化与测试，最终将 AIGC 内容与业务场景的契合度提升了 30%，大幅缩短内容生产周期。AI 数据洞察： 负责构建了基于 Dify 的自动化数据分析工作流，实现了对超 2 万条社交媒体评论的深度分析。成功将非结构化数据转化为“用户槽点/赞点”、情感倾向、核心用户画像等高价值商业洞察，为产品迭代与营销策略提供了数据决策支持。产品设计与交付： 独立运用墨刀，完成了平台核心功能的高保真原型设计。通过清晰的信息架构与数据可视化方案，有效降低了业务人员理解和使用复杂数据分析功能的门槛。",
                technologies: ["AIGC / 生成式 AI", "智能营销", "Prompt Engineering", "数据洞察", "产品设计", "工作流设计 (Workflow)"]
              }
            ].map((experience, index) => (
              <div key={index} className="relative pl-8 group text-left">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full transition-all duration-300 group-hover:from-blue-400 group-hover:to-purple-400"></div>
                <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 transform -translate-x-2 z-10 ring-4 ring-background transition-all duration-300 group-hover:scale-110"></div>
                
                <div className="pl-6 relative">
                  <div className="bg-card p-6 rounded-xl border shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{experience.company}</h3>
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 text-sm font-medium">
                        {experience.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3 font-mono">{experience.position}</p>
                    <p className="text-muted-foreground mb-3 font-mono">{experience.project}</p>
                    <p className="mb-4 font-mono">{experience.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-accent text-sm transition-transform hover:scale-105 font-light">
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

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-accent/10">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-4xl font-bold tracking-tighter mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground font-mono text-center mb-8">
          这里展示了我亲手打造的部分代表性项目，欢迎交流与探讨！
          </p>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl border bg-background hover:border-foreground/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="p-5 relative text-center">
                    <div className="mb-4 bg-muted rounded-lg h-40 flex items-center justify-center">
                      {/* Placeholder for project image */}
                      <BlocksIcon className="w-16 h-16 text-muted-foreground/50" />
                    </div>
                    <h3 className="font-semibold leading-none tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 h-16 overflow-hidden whitespace-pre-line">{project.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors group-hover:border-blue-500/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button 
              asChild 
              variant="outline"
              className="group transition-all duration-300 hover:scale-105"
            >
              {/* <Link href="/projects" className="flex items-center">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link> */}
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative bg-background flex flex-col items-center justify-center">
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-[80px]"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-[100px]"></div>
        <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <h2 className="text-4xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground font-mono mb-8 text-center">
              我随时乐于接受新的挑战和合作机会。随时通过以下方式与我联系！
            </p>
            
            <div className="flex justify-center space-x-4 md:space-x-6">
              {[
                { 
                  icon: Mail, 
                  label: "Email", 
                  link: "mailto:chenweiduo66960@gmail.com",
                },
                { 
                  icon: Github,
                  label: "GitHub", 
                  link: "https://github.com/chen-cdd",
                },
                { 
                  icon: Linkedin, 
                  label: "LinkedIn", 
                  link: "https://www.linkedin.com/in/weiduo-chen-b8865a2a8/",
                },
                { 
                  icon:BlocksIcon, 
                  label: "CSDN", 
                  link: "https://blog.csdn.net/m0_74113296?type=blog",
                }
              ].map((item, index) => (
                <a 
                  key={index}
                  href={item.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="p-3 rounded-full bg-muted hover:bg-accent hover:text-primary transition-all transform hover:scale-110"
                >
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
