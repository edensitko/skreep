// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Handle partner tap/touch events for mobile interaction
 */
export const handlePartnerInteraction = (
  partnerId: number, 
  event: React.MouseEvent | React.TouchEvent,
  setActiveTappedPartner: (id: number | null) => void,
  tapTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
  timeoutDuration: number
): void => {
  // Prevent event bubbling to avoid conflicts with Swiper
  event.preventDefault();
  event.stopPropagation();
  
  // Clear existing timeout
  if (tapTimeoutRef.current) {
    clearTimeout(tapTimeoutRef.current);
  }
  
  // Set active partner
  setActiveTappedPartner(partnerId);
  
  // Set timeout to clear after specified duration
  tapTimeoutRef.current = setTimeout(() => {
    setActiveTappedPartner(null);
  }, timeoutDuration);
};

/**
 * Cleanup timeout utility
 */
export const cleanupTimeout = (timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>): void => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }
};
