import React, { memo } from 'react';
import type { ComparisonRowProps } from './types';

/**
 * Memoized comparison table row component
 * Displays comparison data with category column, wider Skreep column and muted competitor colors
 */
const ComparisonRow = memo<ComparisonRowProps>(({ row, index, language }) => (
  <div 
    className={`grid gap-0 hover:bg-white/5 transition-all duration-300 group ${index === 0 ? '' : 'border-t border-white/10'}`}
    style={{gridTemplateColumns: '0.8fr 2fr 1fr 1fr 1fr'}}
    role="row"
  >
    {/* Category column - Smaller column */}
    <div className={`py-2 px-2 bg-gradient-to-br from-slate-600/10 to-slate-700/10 flex items-center ${index === 0 ? 'rounded-tr-lg' : ''} ${row.category === 'שירות וזמינות' ? (language === 'he' ? 'rounded-br-2xl' : 'rounded-bl-2xl') : ''}`} role="gridcell">
      <p className="text-slate-300 text-xs leading-tight font-medium" dir={language === 'he' ? 'rtl' : 'ltr'}>
        {row.category}
      </p>
    </div>

    {/* Skreep column - Wider column with enhanced styling */}
    <div className="bg-gradient-to-br from-cyan-500/15 to-purple-500/15 py-4 px-4 relative" role="gridcell">
      <div className="flex items-start gap-3">
        <div 
          className="w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-white text-sm leading-relaxed font-medium" dir={language === 'he' ? 'rtl' : 'ltr'}>
            {row.skreep}
          </p>
        </div>
      </div>
    </div>

    {/* Competitors column */}
    <div className="py-4 px-3 text-center bg-gradient-to-br from-gray-600/10 to-gray-700/10" role="gridcell">
      <p className="text-gray-300 text-xs leading-relaxed" dir={language === 'he' ? 'rtl' : 'ltr'}>
        {row.agencies || row.competitors || 'Limited features'}
      </p>
    </div>

    {/* Freelancers column */}
    <div className="py-4 px-3 text-center bg-gradient-to-br from-gray-600/10 to-gray-700/10" role="gridcell">
      <p className="text-gray-300 text-xs leading-relaxed" dir={language === 'he' ? 'rtl' : 'ltr'}>
        {row.freelancers}
      </p>
    </div>

    {/* Development Software column */}
    <div className={`py-4 px-3 text-center bg-gradient-to-br from-gray-600/10 to-gray-700/10 ${row.category === 'שירות וזמינות' ? (language === 'he' ? 'rounded-bl-2xl' : 'rounded-br-2xl') : ''}`} role="gridcell">
      <p className="text-gray-300 text-xs leading-relaxed" dir={language === 'he' ? 'rtl' : 'ltr'}>
        {row.inHouse || row.software || 'Basic functionality'}
      </p>
    </div>
  </div>
));

ComparisonRow.displayName = 'ComparisonRow';

export default ComparisonRow;
