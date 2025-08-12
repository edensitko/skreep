import React, { memo } from 'react';
import Image from 'next/image';
import type { ProjectCardProps } from './types';
import { HERO_IMAGE_PATH } from './constants';

/**
 * Simple project card component without effects
 */
const ProjectCard = memo<ProjectCardProps>(({ 
  section, 
  index
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className="w-full">
      <div className={`bg-gradient-to-br ${section.gradient} border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 relative h-[450px] lg:h-[400px]`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Content */}
          <div className={`${isEven ? 'order-1' : 'order-2'} space-y-4`}>
            <div className="space-y-2">
              <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl" dir="rtl">
                {section.title}
              </h2>
              <h3 className={`text-${section.accentColor} font-semibold text-base sm:text-lg`} dir="rtl">
                {section.subtitle}
              </h3>
            </div>
            
            <p className="text-white/70 text-sm sm:text-base leading-relaxed" dir="rtl">
              {section.description}
            </p>
            
           
          </div>

          {/* Image */}
          <div className={`${isEven ? 'order-2' : 'order-1'} flex justify-center`}>
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
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
