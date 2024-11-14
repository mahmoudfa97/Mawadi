import React from 'react';

const Inbox: React.FC = () => {
  const messages = [
    { id: '1', sender: 'John Doe', subject: 'Order Inquiry', preview: 'I have a question about my recent order...', date: '2023-06-15' },
    { id: '2', sender: 'Jane Smith', subject: 'Product Suggestion', preview: 'I think it would be great if you could add...', date: '2023-06-14' },
    { id: '3', sender: 'Bob Johnson', subject: 'Feedback', preview: 'I recently purchased a gift from your store and...', date: '2023-06-13' },
  ];

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">{message.sender}</p>
            <p className="text-sm text-gray-500">{message.date}</p>
          </div>
          <p className="font-medium">{message.subject}</p>
          <p className="text-sm text-gray-600 truncate">{message.preview}</p>
        </div>
      ))}
    </div>
  );
};

export default Inbox;