import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';
import { useMemoryOptimizer, throttle } from '@/utils/memoryOptimization';

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);

  const updateWidth = useCallback(throttle(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, 100), [ref]);

  useLayoutEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [updateWidth]);

  return width;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400, // Reduced from 700
  numCopies = 8, // Reduced from 15
  velocityMapping = { input: [0, 1000], output: [0, 3] }, // Reduced output range
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle
}) => {
  const { addTimeout, addInterval } = useMemoryOptimizer();

  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 3],
      { clamp: false }
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef<number>(1);
    const isScrolling = useRef<boolean>(false);
    const scrollTimeout = useRef<number | null>(null);
    const animationFrameId = useRef<number | null>(null);

    // Throttled scroll handler
    const handleScrollStart = useCallback(throttle(() => {
      isScrolling.current = true;
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      const timeoutId = window.setTimeout(() => {
        isScrolling.current = false;
        // Cancel animation frame when not scrolling
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      }, 200);
      
      addTimeout(timeoutId);
      scrollTimeout.current = timeoutId;
    }, 16), [addTimeout]); // 16ms throttle for 60fps

    // Track scrolling state
    useLayoutEffect(() => {
      window.addEventListener('scroll', handleScrollStart, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScrollStart);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }, [handleScrollStart]);

    useAnimationFrame((t, delta) => {
      // Only animate when actively scrolling and limit frame rate
      if (!isScrolling.current || delta < 16) return; // Limit to ~60fps

      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < numCopies!; i++) {
      spans.push(
        <span className={`flex-shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
          {children}
        </span>
      );
    }

    return (
      <div 
        className={`${parallaxClassName} relative overflow-hidden`} 
        style={{ 
          direction: 'ltr', 
          ...parallaxStyle 
        }}
      >
        <motion.div
          className={`${scrollerClassName} flex whitespace-nowrap text-center font-sans text-xl font-medium tracking-[-0.02em] text-gray-500 md:text-2xl md:leading-[2rem]`}
          style={{ 
            x, 
            direction: 'ltr', 
            ...scrollerStyle 
          }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text: string, index: number) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
