import React, { memo } from 'react';
import Image from 'next/image';
import type { AboutImageProps } from './types';

/**
 * Memoized about image component with hover effects
 */
const AboutImage = memo<AboutImageProps>(({ src, alt, width, height }) => (
  <div className="flex justify-center items-center order-1 xl:order-1 -mt-[400px] xl:mt-0 ">
    <div className="w-full max-w-xl">
      <div className="relative">
        <div className="flex justify-center w-full transition-all duration-300 opacity-15 hover:opacity-10 hover:scale-102 relative">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full max-w-sm xl:max-w-md mx-auto drop-shadow-[0_0_15px_rgba(34,211,238,0.15)]"
            priority={false}
          />
        </div>
      </div>
    </div>
  </div>
));

AboutImage.displayName = 'AboutImage';

export default AboutImage;
