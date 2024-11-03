import React from 'react';

type IconButtonProps = {
  iconSrc: string;
  alt: string;
};

const IconButton: React.FC<IconButtonProps> = ({ iconSrc, alt }) => (
  <div className="flex justify-center items-center px-2 w-8 h-8 bg-pink-50 rounded-full min-h-[32px]">
    <div className="flex overflow-hidden flex-col w-4 max-w-[32px]">
      <div className="flex overflow-hidden flex-col justify-center items-center py-2 w-full min-h-[32px]">
        <img loading="lazy" src={iconSrc} alt={alt} className="object-contain w-full aspect-[0.89]" />
      </div>
    </div>
  </div>
);

export default IconButton;