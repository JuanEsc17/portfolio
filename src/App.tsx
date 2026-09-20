import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SkillsBar } from './components/SkillsBar';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Certifications } from './components/Certifications';
import { ExperienceSection } from './components/ExperienceSection';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { ContactModal } from './components/modals/ContactModal';
import { ProjectModal } from './components/modals/ProjectModal';
import { ResumeModal } from './components/modals/ResumeModal';
import { AllProjectsModal } from './components/modals/AllProjectsModal';
import { Project } from './types/portfolio';

export function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[#F4F3EF] p-0 sm:p-4 md:p-8 flex justify-center items-start">
      {/* Marco principal del portfolio con bordes negros continuos estilo póster neo-brutalista */}
      <div className="w-full max-w-6xl bg-white border-y-2 sm:border-2 md:border-[3px] border-black shadow-none sm:shadow-neo-xl overflow-hidden flex flex-col">
        {/* 1. Barra de Navegación */}
        <Navbar onOpenContact={() => setIsContactOpen(true)} />

        {/* 2. Sección Hero (Izquierda: Bio/CTAs, Derecha: Foto + Terminal de Código) */}
        <HeroSection 
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* 3. Franja de Habilidades */}
        <SkillsBar />

        {/* 4. Sección Intermedia: Proyectos Destacados (Izq) y Certificaciones (Der) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-black items-stretch">
          <div className="lg:col-span-8 h-full">
            <FeaturedProjects 
              onSelectProject={(project) => setSelectedProject(project)}
              onViewAllProjects={() => setIsAllProjectsOpen(true)}
            />
          </div>
          <div className="lg:col-span-4 h-full">
            <Certifications />
          </div>
        </div>

        {/* 5. Sección Inferior: Experiencia Laboral (Izq) y Banner CTA (Der) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-black items-stretch">
          <div className="lg:col-span-8 h-full">
            <ExperienceSection onOpenResume={() => setIsResumeOpen(true)} />
          </div>
          <div className="lg:col-span-4 h-full">
            <CallToAction onOpenContact={() => setIsContactOpen(true)} />
          </div>
        </div>

        {/* 6. Pie de Página */}
        <Footer onOpenContact={() => setIsContactOpen(true)} />
      </div>

      {/* Modales Interactivos */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <AllProjectsModal 
        isOpen={isAllProjectsOpen}
        onClose={() => setIsAllProjectsOpen(false)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
}

export default App;
