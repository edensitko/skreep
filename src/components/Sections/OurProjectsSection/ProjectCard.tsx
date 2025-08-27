import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectCardProps } from './types';

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
        <div className={`bg-gradient-to-br ${section.gradient} border border-white/10 rounded-2xl pr-4 pt-6 lg:pr-10 lg:pt-10 relative h-[400px] lg:h-[400px] hover:border-white/20 transition-all duration-300 cursor-pointer`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start items-center">
          {/* Content */}
          <div className={`${language === 'he' ? 'order-1' : 'order-2'} space-y-4`}>
            <div className="space-y-2">
              <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl" dir={language === 'he' ? 'rtl' : 'ltr'}>
                {section.title}
              </h2>
              <h3 className="text-white font-semibold text-base sm:text-lg" dir={language === 'he' ? 'rtl' : 'ltr'}>
                {section.subtitle}
              </h3>
            </div>
            
            <p className="text-white/70 text-sm sm:text-base leading-relaxed" dir={language === 'he' ? 'rtl' : 'ltr'}>
              {section.description}
            </p>
            
          </div>

          {/* Image */}
          <div className={`${language === 'he' ? 'order-2' : 'order-1'} flex justify-end`}>
            <div className="h-[220px] lg:h-[400px] w-full lg:w-[500px] overflow-hidden">
              <Image 
                src={section.image}
                alt={`${section.title} project showcase`}
                width={180}
                height={220}
                className="object-cover w-full h-full"
                style={{ width: 'auto', height: 'auto' }}
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
