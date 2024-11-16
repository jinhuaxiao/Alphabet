import Image from 'next/image';

interface FingerIconProps {
  isActive: boolean;
  side: 'left' | 'right';
}

export const FingerIcon: React.FC<FingerIconProps> = ({ isActive, side }) => {
  return (
    <div className={`finger-icon ${isActive ? 'active' : ''}`}>
      <Image
        src={`/images/finger-${side}.png`}
        alt={`${side} hand finger`}
        width={90}
        height={90}
        className="w-full h-full object-contain"
      />
    </div>
  );
}; 