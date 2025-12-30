// Memory optimization utilities
export class MemoryOptimizer {
  private static instance: MemoryOptimizer;
  private observers: IntersectionObserver[] = [];
  private animationFrames: number[] = [];
  private intervals: number[] = [];
  private timeouts: number[] = [];

  static getInstance(): MemoryOptimizer {
    if (!MemoryOptimizer.instance) {
      MemoryOptimizer.instance = new MemoryOptimizer();
    }
    return MemoryOptimizer.instance;
  }

  // Track and manage intersection observers
  addObserver(observer: IntersectionObserver): void {
    this.observers.push(observer);
  }

  // Track and manage animation frames
  addAnimationFrame(id: number): void {
    this.animationFrames.push(id);
  }

  // Track and manage intervals
  addInterval(id: number): void {
    this.intervals.push(id);
  }

  // Track and manage timeouts
  addTimeout(id: number): void {
    this.timeouts.push(id);
  }

  // Clean up all tracked resources
  cleanup(): void {
    // Disconnect all observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    // Cancel all animation frames
    this.animationFrames.forEach(id => cancelAnimationFrame(id));
    this.animationFrames = [];

    // Clear all intervals
    this.intervals.forEach(id => clearInterval(id));
    this.intervals = [];

    // Clear all timeouts
    this.timeouts.forEach(id => clearTimeout(id));
    this.timeouts = [];
  }

  // Force garbage collection if available
  forceGC(): void {
    if ('gc' in window) {
      (window as { gc?: () => void }).gc?.();
    }
  }

  // Get memory usage info
  getMemoryInfo(): { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } | null {
    if ('memory' in performance) {
      return (performance as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory || null;
    }
    return null;
  }

  // Check if memory usage is high
  isMemoryHigh(threshold: number = 100 * 1024 * 1024): boolean {
    const memInfo = this.getMemoryInfo();
    return Boolean(memInfo && memInfo.usedJSHeapSize > threshold);
  }
}

// Hook for using memory optimizer in React components
export const useMemoryOptimizer = () => {
  const optimizer = MemoryOptimizer.getInstance();
  
  return {
    addObserver: (observer: IntersectionObserver) => optimizer.addObserver(observer),
    addAnimationFrame: (id: number) => optimizer.addAnimationFrame(id),
    addInterval: (id: number) => optimizer.addInterval(id),
    addTimeout: (id: number) => optimizer.addTimeout(id),
    cleanup: () => optimizer.cleanup(),
    forceGC: () => optimizer.forceGC(),
    getMemoryInfo: () => optimizer.getMemoryInfo(),
    isMemoryHigh: (threshold?: number) => optimizer.isMemoryHigh(threshold)
  };
};

// Throttle function for performance optimization
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = window.setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
        timeoutId = null;
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Debounce function for performance optimization
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = window.setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
};