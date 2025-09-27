import React, { memo } from 'react';
import type { AppButtonProps } from './types';

/**
 * Memoized mobile app button component
 */
const AppButton = memo<AppButtonProps>(({ app, onClick }) => (
  <button 
    className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 py-3 rounded-full font-semibold hover:bg-cyan-500 transition-all text-right hover:scale-105"
    onClick={onClick}
    aria-label={app.name}
  >
    {app.name}
  </button>
));

AppButton.displayName = 'AppButton';

export default AppButton;
