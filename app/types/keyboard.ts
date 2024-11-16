export interface HandSvgProps {
  finger: 'Pinky' | 'Ring' | 'Middle' | 'Index' | null;
  isLeft: boolean;
}

export interface KeyboardLayoutType {
  [key: number]: string[];
}

// 定义手指类型
export type FingerType = 
  | 'leftPinky' 
  | 'leftRing' 
  | 'leftMiddle' 
  | 'leftIndex'
  | 'rightIndex' 
  | 'rightMiddle' 
  | 'rightRing' 
  | 'rightPinky';

export type FingerMapType = {
  [K in FingerType]: string[];
};

export type FingerColorsType = {
  [K in FingerType]: string;
};

export interface PracticeModeType {
  id: string;
  name: string;
  keys: string[];
} 