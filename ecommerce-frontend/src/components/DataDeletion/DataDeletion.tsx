import React, { useState } from 'react';

const DataDeletion: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the deletion request to your backend
    console.log('Data deletion requested for:', email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-right">سياسة حذف البيانات</h1>
      <div className="prose prose-lg max-w-none text-right mb-8">
        <p>
          في موادة، نحترم حقك في التحكم في بياناتك الشخصية. إذا كنت ترغب في حذف جميع بياناتك من أنظمتنا، يرجى تقديم طلب باستخدام النموذج أدناه.
        </p>
        <p>
          بمجرد استلام طلبك، سنقوم بمعالجته في غضون 30 يومًا. يرجى ملاحظة أن هذه العملية لا رجعة فيها وستؤدي إلى إزالة جميع معلوماتك الشخصية من قواعد بياناتنا.
        </p>
      </div>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-right">البريد الإلكتروني المرتبط بحسابك</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="text-right">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              طلب حذف البيانات
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-lg font-semibold text-green-600">تم استلام طلبك بنجاح. سنقوم بمعالجة طلب حذف البيانات الخاص بك في أقرب وقت ممكن.</p>
        </div>
      )}
    </div>
  );
};

export default DataDeletion;