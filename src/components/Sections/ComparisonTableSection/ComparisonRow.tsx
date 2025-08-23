import React, { memo } from 'react';
import type { ComparisonRowProps } from './types';

/**
 * Memoized comparison table row component
 * Displays comparison data across different service providers
 */
const ComparisonRow = memo<ComparisonRowProps>(({ row, language }) => (
  <div 
    className="grid grid-cols-4 border-t border-white/5 hover:bg-white/5 transition-all duration-300 group"
    role="row"
  >
 

    {/* Freelancers column */}
    <div className="py-2 px-2 text-center border-l border-white/10 " role="gridcell">
      <div>
        <h4 className="font-medium text-white text-xs" dir="ltr">
          {row.category}
        </h4>
      </div>
      <p className="text-gray-400 text-xs" dir="ltr">
        {row.freelancers}
      </p>
    </div>

    {/* In-house column */}
    <div className="py-2 px-2 text-center border-l border-white/10" role="gridcell">
      <div>
        <h4 className="font-medium text-white text-xs" dir="ltr">
          {row.category}
        </h4>
      </div>
      <p className="text-gray-400 text-xs" dir="ltr">
        {row.inHouse}
      </p>
    </div>
    
    {/* Skreep column - Enhanced */}
    <div className="col-span-2 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 py-2 px-2" role="gridcell">
      <div className="flex items-center gap-2">
        <div 
          className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
          aria-hidden="true"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-white text-xs" dir="ltr">
            {row.category}
          </h4>
          <p className="text-gray-200 text-xs leading-relaxed" dir="ltr">
            {row.skreep}
          </p>
        </div>
      </div>
    </div>
  </div>
));

ComparisonRow.displayName = 'ComparisonRow';

export default ComparisonRow;
