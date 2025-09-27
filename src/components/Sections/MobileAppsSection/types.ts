// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface MobileApp {
  readonly id: number;
  readonly name: string;
  readonly icon: string;
  readonly color: string;
}

export interface PhoneDevice {
  readonly id: number;
  readonly className: string;
  readonly gradient: string;
  readonly zIndex: string;
  readonly opacity: string;
  readonly position: string;
}

export interface AppButtonProps {
  app: MobileApp;
  onClick?: () => void;
}

export interface PhoneDeviceProps {
  device: PhoneDevice;
  apps?: MobileApp[];
}
