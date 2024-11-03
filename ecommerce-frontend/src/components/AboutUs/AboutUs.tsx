import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-right">من نحن</h1>
      <div className="prose prose-lg max-w-none text-right">
        <p>
          مرحبًا بكم في موادة، وجهتكم المفضلة للهدايا الفريدة والمميزة. نحن نؤمن بأن كل هدية هي فرصة لإظهار الحب والتقدير، ولهذا نسعى جاهدين لتوفير أفضل الخيارات لعملائنا الكرام.
        </p>
        <p>
          تأسست موادة بهدف تسهيل عملية اختيار وتقديم الهدايا، مع التركيز على الجودة والتميز في كل منتج نقدمه. نحن نفخر بتقديم مجموعة واسعة من الهدايا التي تناسب جميع المناسبات والأذواق.
        </p>
        <p>
          فريقنا المتخصص يعمل بشغف لاختيار أفضل المنتجات وضمان تجربة تسوق سلسة وممتعة لكل عميل. نحن نؤمن بأن الهدية المثالية يمكن أن تترك أثرًا دائمًا، ونسعى لمساعدتكم في إيجاد تلك الهدية الخاصة.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;