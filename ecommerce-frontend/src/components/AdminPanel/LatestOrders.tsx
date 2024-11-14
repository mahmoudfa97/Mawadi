import React from 'react';

const LatestOrders: React.FC = () => {
  const orders = [
    { id: '1', customer: 'John Doe', product: 'Birthday Gift Box', total: '$89.99', status: 'Delivered' },
    { id: '2', customer: 'Jane Smith', product: 'Anniversary Flowers', total: '$59.99', status: 'Processing' },
    { id: '3', customer: 'Bob Johnson', product: 'Custom Gift Basket', total: '$129.99', status: 'Shipped' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestOrders;