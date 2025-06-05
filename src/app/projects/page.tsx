import Link from 'next/link';
import { projects } from '@/lib/data/projects';
import { FolderGit, ArrowRight } from 'lucide-react';

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

      <div className="space-y-8">
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group flex items-start gap-6 rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/30"
          >
            <div className="p-3 rounded-lg bg-primary/10">
              <FolderGit className="h-8 w-8 text-primary" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {project.description}
                </p>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 text-sm rounded-full bg-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <ArrowRight className="h-6 w-6 mt-6 text-primary/50 group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </main>
  );
}