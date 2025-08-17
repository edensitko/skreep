'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  accentColor: string;
  fullDescription?: string;
  technologies?: string[];
  features?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
  images?: string[];
  client?: string;
  duration?: string;
  category?: string;
}

interface ProjectPageClientProps {
  projectEn: ProjectData | null;
  projectHe: ProjectData | null;
  allProjectsEn: ProjectData[];
  allProjectsHe: ProjectData[];
  projectSlug: string;
}

export default function ProjectPageClient({
  projectEn,
  projectHe,
  allProjectsEn,
  allProjectsHe,
  projectSlug
}: ProjectPageClientProps) {
  const { language } = useLanguage();
  
  // Get the project data based on current language
  const project = language === 'he' ? projectHe : projectEn;
  const allProjects = language === 'he' ? allProjectsHe : allProjectsEn;
  
  const textDirection = language === 'he' ? 'rtl' : 'ltr';

  // Navigation functions
  const getNextProject = () => {
    if (!allProjects.length) return null;
    const currentIndex = allProjects.findIndex(p => p.slug === projectSlug);
    const nextIndex = (currentIndex + 1) % allProjects.length;
    return allProjects[nextIndex];
  };

  const getPrevProject = () => {
    if (!allProjects.length) return null;
    const currentIndex = allProjects.findIndex(p => p.slug === projectSlug);
    const prevIndex = currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1;
    return allProjects[prevIndex];
  };

  // If no project data, show not found
  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'he' ? 'פרויקט לא נמצא' : 'Project Not Found'}
          </h1>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">
            {language === 'he' ? 'חזרה לעמוד הבית' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  const nextProject = getNextProject();
  const prevProject = getPrevProject();

  return (
    <div className="min-h-screen bg-black text-white" dir={textDirection}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white">{language === 'he' ? 'בית' : 'Home'}</Link></li>
                <li className="mx-2">/</li>
                <li><Link href="/projects" className="hover:text-white">{language === 'he' ? 'פרוייקטים ' : 'projects'}</Link></li>
                <li className="mx-2">/</li>
                <li className="text-white">{project.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <span className={`inline-block px-3 py-1 bg-${project.accentColor}/20 text-${project.accentColor} text-sm font-medium rounded-full`}>
                    {project.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                    {project.title}
                  </h1>
                  <h2 className={`text-xl md:text-2xl text-${project.accentColor} font-semibold`}>
                    {project.subtitle}
                  </h2>
                </div>
                
                <p className="text-lg text-white/80 leading-relaxed">
                  {project.fullDescription}
                </p>

                {/* Project Meta */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-1">
                      {language === 'he' ? 'לקוח' : 'Client'}
                    </h3>
                    <p className="text-white">{project.client}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-1">
                      {language === 'he' ? 'משך פיתוח' : 'Duration'}
                    </h3>
                    <p className="text-white">{project.duration}</p>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-2xl blur-xl`}></div>
                  <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <Image 
                      src={project.images?.[0] || `./assets/images/project-${project.id}.svg`}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {project.stats && project.stats.length > 0 && (
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {project.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-3xl md:text-4xl font-bold text-${project.accentColor} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm md:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {project.features && project.features.length > 0 && (
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                {language === 'he' ? 'תכונות עיקריות' : 'Key Features'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.features.map((feature, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className={`w-12 h-12 bg-${project.accentColor}/20 rounded-lg flex items-center justify-center mb-4`}>
                      <div className={`w-6 h-6 bg-${project.accentColor} rounded`}></div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technologies Section */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                {language === 'he' ? 'טכנולוגיות' : 'Technologies'}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {project.technologies.map((tech, index) => (
                  <span key={index} className={`px-4 py-2 bg-${project.accentColor}/10 border border-${project.accentColor}/20 text-${project.accentColor} rounded-full text-sm font-medium`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Navigation Section */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
              {/* Previous Project */}
              {prevProject && (
                <Link href={`/projects/${prevProject.slug}`} className="group flex items-center space-x-4 hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm text-gray-400">{language === 'he' ? 'פרויקט קודם' : 'Previous Project'}</div>
                    <div className="font-semibold">{prevProject.title}</div>
                  </div>
                </Link>
              )}

              {/* Back to Projects */}
              <Link href="/projects" className="text-center">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-3 hover:bg-white/10 transition-colors">
                  {language === 'he' ? 'כל העבודות' : 'All Works'}
                </div>
              </Link>

              {/* Next Project */}
              {nextProject && (
                <Link href={`/projects/${nextProject.slug}`} className="group flex items-center space-x-4 hover:text-cyan-400 transition-colors">
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{language === 'he' ? 'פרויקט הבא' : 'Next Project'}</div>
                    <div className="font-semibold">{nextProject.title}</div>
                  </div>
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
