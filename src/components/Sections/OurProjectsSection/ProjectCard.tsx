import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectCardProps } from './types';
import { HERO_IMAGE_PATH } from './constants';

/**
 * Simple project card component without effects
 */
const ProjectCard = memo<ProjectCardProps>(({ 
  section, 
  index,
  language
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className="w-full">
      <Link href={`/projects/${section.slug}`} className="block group">
        <div className={`bg-gradient-to-br ${section.gradient} border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 relative h-[450px] lg:h-[400px] hover:border-white/20 transition-all duration-300 cursor-pointer`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Content */}
          <div className={`${language === 'he' ? (isEven ? 'order-1' : 'order-2') : (isEven ? 'order-2' : 'order-1')} space-y-4`}>
            <div className="space-y-2">
              <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl" dir={language === 'he' ? 'rtl' : 'ltr'}>
                {section.title}
              </h2>
              <h3 className={`text-${section.accentColor} font-semibold text-base sm:text-lg`} dir={language === 'he' ? 'rtl' : 'ltr'}>
                {section.subtitle}
              </h3>
            </div>
            
            <p className="text-white/70 text-sm sm:text-base leading-relaxed" dir={language === 'he' ? 'rtl' : 'ltr'}>
              {section.description}
            </p>
            
            {/* View Details Button */}
            <div 
              className={`inline-flex items-center gap-2 bg-gradient-to-l from-${section.accentColor}/10 via-${section.accentColor}/30 to-${section.accentColor}/60 text-white border border-white/20 px-4 py-2 rounded-full font-semibold text-sm group-hover:bg-${section.accentColor}/20 transition-all duration-300`}
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {language === 'he' ? 'צפה בפרטים' : 'View Details'}
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={language === 'he' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </div>
          </div>

          {/* Image */}
          <div className={`${language === 'he' ? (isEven ? 'order-2' : 'order-1') : (isEven ? 'order-1' : 'order-2')} flex justify-center`}>
            <div className="w-[300px] h-[180px] rounded-lg overflow-hidden">
              <Image 
                src={HERO_IMAGE_PATH}
                alt={`${section.title} project showcase`}
                width={300}
                height={180}
                className="object-cover w-full h-full"
                priority={index === 0}
              />
            </div>
          </div>
        </div>
        </div>
      </Link>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
