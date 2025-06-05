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
                period: "2025.02 - 至今",
                description: "Developed and maintained responsive web applications using React and TypeScript. Collaborated with the design team to implement UI components.",
                technologies: ["React", "TypeScript", "TailwindCSS"]
              },
              {
                company: "JuniGO",
                position: "产品经理",
                period: "Fall 2022",
                description: "Created user interfaces for mobile applications. Conducted user research and usability testing to improve product design.",
                technologies: ["Figma", "web3", "defi", "支付钱包","竞品分析","产品分析"]
              },
              {
                company: "明略科技集团",
                position: "UI/UX Design Intern",
                period: "Fall 2022",
                description: "Created user interfaces for mobile applications. Conducted user research and usability testing to improve product design.",
                technologies: ["Figma", "Adobe XD", "Prototyping"]
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
                    <p className="text-muted-foreground mb-3">{experience.position}</p>
                    <p className="mb-4">{experience.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-accent text-sm transition-transform hover:scale-105">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.slice(0, 3).map((project) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.id}`}
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
                  <p className="text-sm text-muted-foreground mb-4 h-10 overflow-hidden">{project.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors group-hover:border-blue-500/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
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

      {/* Contact Section */}
      <section id="contact" className="py-20 relative bg-background">
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-[80px]"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-[100px]"></div>
        
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
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