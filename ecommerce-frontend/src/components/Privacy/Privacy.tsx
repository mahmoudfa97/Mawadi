import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-right text-gray-800">سياسة الخصوصية</h1>
      <div className="prose prose-lg max-w-none text-right text-gray-700 rtl:ml-0">
        <p>
          في موادة، نحن نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. تصف هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية.
        </p>
        <ol className="list-decimal list-inside">
          <li className="mt-4 mb-2">
            <h2 className="text-2xl font-semibold text-gray-800">المعلومات التي نجمعها</h2>
            <p className="mt-2">
              نجمع المعلومات التي تقدمها لنا مباشرة، مثل اسمك وعنوان بريدك الإلكتروني وعنوان الشحن عند إجراء عملية شراء.
            </p>
          </li>
          <li className="mt-4 mb-2">
            <h2 className="text-2xl font-semibold text-gray-800">كيف نستخدم معلوماتك</h2>
            <p className="mt-2">
              نستخدم معلوماتك لتوفير وتحسين خدماتنا، ومعالجة المعاملات، والتواصل معك بشأن طلباتك وعروضنا الترويجية.
            </p>
          </li>
          <li className="mt-4 mb-2">
            <h2 className="text-2xl font-semibold text-gray-800">حماية المعلومات</h2>
            <p className="mt-2">
              نتخذ تدابير أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف.
            </p>
          </li>
          <li className="mt-4 mb-2">
            <h2 className="text-2xl font-semibold text-gray-800">مشاركة المعلومات</h2>
            <p className="mt-2">
              لا نبيع أو نتاجر بمعلوماتك الشخصية. قد نشارك معلوماتك مع مقدمي الخدمات الذين يساعدوننا في تشغيل موقعنا وإدارة أعمالنا.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Privacy;