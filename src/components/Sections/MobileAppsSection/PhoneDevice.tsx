import React, { memo } from 'react';
import type { PhoneDeviceProps } from './types';
import { MOBILE_APPS, SECTION_CONTENT } from './constants';

/**
 * Memoized phone device component with app icons
 */
const PhoneDevice = memo<PhoneDeviceProps>(({ device, apps = MOBILE_APPS }) => {
  const isMainPhone = device.id === 1;

  if (isMainPhone) {
    return (
      <div className={device.className}>
        <div className="w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-2xl">
          <div className={`w-full h-full bg-gradient-to-br ${device.gradient} rounded-[2.5rem] relative overflow-hidden`}>
            {/* Phone Screen Content */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
            <div className="p-6 pt-12">
              <div className="text-white text-sm mb-4">{SECTION_CONTENT.greeting}</div>
              <div className="text-gray-400 text-xs mb-8">{SECTION_CONTENT.subtitle}</div>
              
              {/* App Icons */}
              <div className="grid grid-cols-3 gap-4">
                {apps.map((app) => (
                  <div 
                    key={app.id}
                    className={`${app.color} w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-110`}
                    role="button"
                    tabIndex={0}
                    aria-label={app.name}
                  >
                    <span className="text-white text-xs">{app.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Secondary and tertiary phones
  const isSecondary = device.id === 2;
  const phoneSize = isSecondary ? "w-48 h-96" : "w-40 h-80";
  const borderRadius = isSecondary ? "rounded-[2rem]" : "rounded-[1.5rem]";
  const padding = isSecondary ? "p-4 pt-8" : "p-3 pt-6";
  const contentHeight = isSecondary ? "h-32" : "h-24";
  const lineHeight = isSecondary ? "h-3" : "h-2";

  return (
    <div className={device.className}>
      <div className={`${phoneSize} bg-gradient-to-br ${device.gradient} ${borderRadius} shadow-xl`}>
        <div className={padding}>
          <div className={`w-full ${contentHeight} bg-white/20 rounded-lg mb-${isSecondary ? '4' : '3'}`}></div>
          <div className="space-y-2">
            <div className={`w-${isSecondary ? '3/4' : 'full'} ${lineHeight} bg-white/30 rounded`}></div>
            <div className={`w-${isSecondary ? '1/2' : '2/3'} ${lineHeight} bg-white/30 rounded`}></div>
          </div>
        </div>
      </div>
    </div>
  );
});

PhoneDevice.displayName = 'PhoneDevice';

export default PhoneDevice;
