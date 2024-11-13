// src/pages/Faq.tsx
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  { question: 'ما هي مودة؟', answer: 'مودة هي منصة تهدف إلى تقديم هدايا فريدة ومميزة تلبي جميع الأذواق والمناسبات.' },
  { question: 'ما هي سياسة الاسترجاع؟', answer: 'نحن نضمن رضا العملاء. يمكن استرجاع المنتجات غير المرضية خلال 14 يومًا من تاريخ الاستلام.' },
  { question: 'هل تقدمون تغليف خاص للهدايا؟', answer: 'نعم، نوفر خدمة تغليف الهدايا بتصميم أنيق يناسب جميع المناسبات.' },
  // Add more questions and answers as needed
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">الأسئلة الشائعة</h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleAnswer(index)}
              className="flex justify-between w-full text-lg font-medium text-left text-gray-700 focus:outline-none"
            >
              {faq.question}
              <span>{activeIndex === index ? '-' : '+'}</span>
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
