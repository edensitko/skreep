'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  pillarRotation?: number;
  parentRef?: React.RefObject<HTMLElement | null>;
}

const LightPillar: React.FC<LightPillarProps> = ({
  topColor = '#5227FF',
  bottomColor = '#FF9FFC',
  intensity = 1.0,
  rotationSpeed = 0.3,
  interactive = true,
  className = '',
  glowAmount = 0.005,
  pillarWidth = 3.0,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  mixBlendMode = 'screen',
  pillarRotation = 0,
  parentRef
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const timeRef = useRef<number>(0);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLSupported(false);
      console.warn('WebGL is not supported in this browser');
    }
  }, []);

  // Add memory monitoring and cleanup
  useEffect(() => {
    let memoryCheckInterval: number | null = null;
    
    // Monitor memory usage and force cleanup if needed
    if ('memory' in performance) {
      memoryCheckInterval = window.setInterval(() => {
        const memInfo = (performance as { memory?: { usedJSHeapSize: number } }).memory;
        if (memInfo && memInfo.usedJSHeapSize > 100 * 1024 * 1024) { // 100MB threshold
          // Force garbage collection if available
          if ('gc' in window) {
            (window as { gc?: () => void }).gc?.();
          }
        }
      }, 30000); // Check every 30 seconds
    }

    return () => {
      if (memoryCheckInterval) {
        clearInterval(memoryCheckInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !webGLSupported) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Reduce quality on mobile devices to save memory
    const isMobile = window.innerWidth < 768;
    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5);

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false, // Disabled for better performance
        alpha: true,
        powerPreference: 'default', // Changed from high-performance to save battery
        precision: 'lowp',
        stencil: false,
        depth: false,
        preserveDrawingBuffer: false // Added for better memory management
      });
    } catch (error) {
      console.error('Failed to create WebGL renderer:', error);
      setWebGLSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    // Reduce context memory usage
    renderer.info.autoReset = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Convert hex colors to RGB
    const parseColor = (hex: string): THREE.Vector3 => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };

    // Shader material
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uPillarRotation;

      varying vec2 vUv;

      const float PI = 3.141592653589793;
      const float EPSILON = 0.001;
      const float E = 2.71828182845904523536;
      const float HALF = 0.5;

      mat2 rot(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
      }

      // Simplified noise function for better performance
      float noise(vec2 coord) {
        return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453);
      }

      // Simplified wave deformation - reduced iterations
      vec3 applyWaveDeformation(vec3 pos, float timeOffset) {
        float frequency = 1.0;
        float amplitude = 1.0;
        vec3 deformed = pos;
        
        // Reduced from 4 to 2 iterations for better performance
        for(float i = 0.0; i < 2.0; i++) {
          deformed.xz *= rot(0.4);
          float phase = timeOffset * i * 2.0;
          vec3 oscillation = cos(deformed.zxy * frequency - phase);
          deformed += oscillation * amplitude;
          frequency *= 2.0;
          amplitude *= HALF;
        }
        
        return deformed;
      }

      // Simplified blending functions
      float blendMin(float a, float b, float k) {
        float h = max(k - abs(a - b), 0.0);
        return min(a, b) - h * h * 0.25 / k;
      }

      float blendMax(float a, float b, float k) {
        return -blendMin(-a, -b, k);
      }

      void main() {
        vec2 fragCoord = vUv * uResolution;
        vec2 uv = (fragCoord * 2.0 - uResolution) / uResolution.y;
        
        // Apply 2D rotation to UV coordinates
        float rotAngle = uPillarRotation * PI / 180.0;
        uv *= rot(rotAngle);

        vec3 origin = vec3(0.0, 0.0, -10.0);
        vec3 direction = normalize(vec3(uv, 1.0));

        float maxDepth = 30.0; // Reduced from 50.0
        float depth = 0.1;

        mat2 rotX = rot(uTime * 0.3);
        if(uInteractive && length(uMouse) > 0.0) {
          rotX = rot(uMouse.x * PI * 2.0);
        }

        vec3 color = vec3(0.0);

        // Reduced iterations from 100 to 50 for better performance
        for(float i = 0.0; i < 50.0; i++) {
          vec3 pos = origin + direction * depth;
          pos.xz *= rotX;

          // Apply vertical scaling and wave deformation
          vec3 deformed = pos;
          deformed.y *= uPillarHeight;
          deformed = applyWaveDeformation(deformed + vec3(0.0, uTime, 0.0), uTime);

          // Calculate distance field using cosine pattern
          vec2 cosinePair = cos(deformed.xz);
          float fieldDistance = length(cosinePair) - 0.2;

          // Radial boundary constraint
          float radialBound = length(pos.xz) - uPillarWidth;
          fieldDistance = blendMax(radialBound, fieldDistance, 1.0);
          fieldDistance = abs(fieldDistance) * 0.15 + 0.01;

          vec3 gradient = mix(uBottomColor, uTopColor, smoothstep(15.0, -15.0, pos.y));
          color += gradient * pow(1.0 / fieldDistance, 1.0);

          if(fieldDistance < EPSILON || depth > maxDepth) break;
          depth += fieldDistance;
        }

        // Normalize by pillar width to maintain consistent glow regardless of size
        float widthNormalization = uPillarWidth / 3.0;
        color = tanh(color * uGlowAmount / widthNormalization);

        // Simplified noise postprocessing
        float rnd = noise(gl_FragCoord.xy);
        color -= rnd * 0.05 * uNoiseIntensity; // Reduced noise impact

        gl_FragColor = vec4(color * uIntensity, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: mouseRef.current },
        uTopColor: { value: parseColor(topColor) },
        uBottomColor: { value: parseColor(bottomColor) },
        uIntensity: { value: intensity },
        uInteractive: { value: interactive },
        uGlowAmount: { value: glowAmount },
        uPillarWidth: { value: pillarWidth },
        uPillarHeight: { value: pillarHeight },
        uNoiseIntensity: { value: noiseIntensity },
        uPillarRotation: { value: pillarRotation }
      },
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse/Touch interaction - throttled for performance
    // Use parentRef if provided, otherwise use container
    const interactionTarget = parentRef?.current || container;
    let interactionTimeout: number | null = null;
    
    const updatePosition = (clientX: number, clientY: number) => {
      const rect = interactionTarget.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.set(x, y);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      if (interactionTimeout) return;

      interactionTimeout = window.setTimeout(() => {
        interactionTimeout = null;
      }, 16); // ~60fps throttle

      updatePosition(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!interactive) return;
      if (interactionTimeout) return;

      interactionTimeout = window.setTimeout(() => {
        interactionTimeout = null;
      }, 16); // ~60fps throttle

      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!interactive) return;
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    if (interactive) {
      interactionTarget.addEventListener('mousemove', handleMouseMove, { passive: true });
      interactionTarget.addEventListener('touchmove', handleTouchMove, { passive: true });
      interactionTarget.addEventListener('touchstart', handleTouchStart, { passive: true });
    }

    // Animation loop with adaptive frame rate and visibility check
    let lastTime = performance.now();
    const deviceIsMobile = window.innerWidth < 768;
    const targetFPS = deviceIsMobile ? 30 : 45; // Reduced FPS for better performance
    const frameTime = 1000 / targetFPS;
    let isVisible = true;

    // Intersection Observer to pause animation when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible && rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        } else if (isVisible && !rafRef.current) {
          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    const animate = (currentTime: number) => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current || !isVisible) return;

      const deltaTime = currentTime - lastTime;
      if (deltaTime >= frameTime) {
        timeRef.current += 0.016 * rotationSpeed;
        materialRef.current.uniforms.uTime.value = timeRef.current;
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        lastTime = currentTime - (deltaTime % frameTime);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Handle resize with debouncing
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        if (!rendererRef.current || !materialRef.current || !containerRef.current) return;

        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;

        rendererRef.current.setSize(newWidth, newHeight);
        materialRef.current.uniforms.uResolution.value.set(newWidth, newHeight);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        interactionTarget.removeEventListener('mousemove', handleMouseMove);
        interactionTarget.removeEventListener('touchmove', handleTouchMove);
        interactionTarget.removeEventListener('touchstart', handleTouchStart);
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      if (rendererRef.current) {
        // Force garbage collection of WebGL resources
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        const canvas = rendererRef.current.domElement;
        if (container.contains(canvas)) {
          container.removeChild(canvas);
        }
        // Clear canvas context
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl && 'getParameter' in gl) {
          const webglContext = gl as WebGLRenderingContext;
          const numTextureUnits = webglContext.getParameter(webglContext.MAX_TEXTURE_IMAGE_UNITS);
          for (let unit = 0; unit < numTextureUnits; ++unit) {
            webglContext.activeTexture(webglContext.TEXTURE0 + unit);
            webglContext.bindTexture(webglContext.TEXTURE_2D, null);
            webglContext.bindTexture(webglContext.TEXTURE_CUBE_MAP, null);
          }
          webglContext.bindBuffer(webglContext.ARRAY_BUFFER, null);
          webglContext.bindBuffer(webglContext.ELEMENT_ARRAY_BUFFER, null);
          webglContext.bindRenderbuffer(webglContext.RENDERBUFFER, null);
          webglContext.bindFramebuffer(webglContext.FRAMEBUFFER, null);
        }
      }

      if (materialRef.current) {
        materialRef.current.dispose();
      }

      if (geometryRef.current) {
        geometryRef.current.dispose();
      }

      // Clear all references
      rendererRef.current = null;
      materialRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      geometryRef.current = null;
      rafRef.current = null;
    };
  }, [
    topColor,
    bottomColor,
    intensity,
    rotationSpeed,
    interactive,
    glowAmount,
    pillarWidth,
    pillarHeight,
    noiseIntensity,
    pillarRotation,
    webGLSupported,
    parentRef
  ]);

  if (!webGLSupported) {
    return (
      <div
        className={`w-full h-full absolute top-0 left-0 flex items-center justify-center bg-black/10 text-gray-500 text-sm ${className}`}
        style={{ mixBlendMode }}
      >
        WebGL not supported
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-full absolute top-0 left-0 ${className}`}
      style={{ mixBlendMode }}
    />
  );
};

export default LightPillar;
