import Link from 'next/link';
import { projects } from '@/lib/data/projects';
import { FolderGit, ArrowRight, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

export default function ProjectsPage() {
  return (
    <main className="container py-12 animate-fade-in-up">
      <div className="mb-12 space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Product Gallery
        </h1>
        <p className="text-lg text-muted-foreground font-simkai">
          每一件作品都是用户体验与技术的完美融合
        </p>
      </div>

      <div className="space-y-16">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-2xl hover:border-primary/30"
          >
            <div className="flex flex-col lg:flex-row">
              {/* 左侧：项目信息卡片 */}
              <div className="flex-1 p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <FolderGit className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-3xl font-bold tracking-tight mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-4">
                        {project.category}
                      </p>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-sm rounded-full bg-accent hover:bg-accent/80 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        查看代码
                      </Link>
                      {project.demo && (
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          在线演示
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：产品截图展示 */}
              <div className="lg:w-1/2 p-8 bg-gradient-to-br from-muted/30 to-muted/10">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-center mb-6">产品截图</h4>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {project.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative group/image overflow-hidden rounded-lg border bg-background shadow-sm hover:shadow-lg transition-all duration-300"
                      >
                        <div className="aspect-video relative">
                          <Image
                            src={image}
                            alt={`${project.title} 截图 ${imgIndex + 1}`}
                            fill
                            className="object-cover group-hover/image:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              // 如果图片加载失败，显示占位符
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const placeholder = target.nextElementSibling as HTMLElement;
                              if (placeholder) placeholder.style.display = 'flex';
                            }}
                          />
                          <div 
                            className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground"
                            style={{ display: 'none' }}
                          >
                            <div className="text-center">
                              <FolderGit className="h-12 w-12 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">图片加载中...</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 悬停时的箭头指示器 */}
            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-6 w-6 text-primary/50" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}