export interface HandSvgProps {
  finger: 'Pinky' | 'Ring' | 'Middle' | 'Index' | null;
  isLeft: boolean;
}

export interface KeyboardLayoutType {
  [key: number]: string[];
}

export interface FingerMapType {
  [key: string]: string[];
}

export interface FingerColorsType {
  [key: string]: string;
}

export interface PracticeModeType {
  id: string;
  name: string;
  keys: string[];
} 