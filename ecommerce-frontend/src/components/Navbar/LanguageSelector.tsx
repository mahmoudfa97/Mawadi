import React from 'react';

type LanguageSelectorProps = {
  language: string;
  flagSrc: string;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, flagSrc }) => (
  <div className="flex gap-2 text-base font-semibold text-center whitespace-nowrap text-neutral-900">
    <div className="my-auto">{language}</div>
    <img loading="lazy" src={flagSrc} alt={`${language} flag`} className="object-contain shrink-0 w-10 rounded-full aspect-[1.25]" />
  </div>
);

export default LanguageSelector;