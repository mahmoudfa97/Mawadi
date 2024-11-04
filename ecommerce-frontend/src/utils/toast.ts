
type ToastType = 'success' | 'error';

export const toast = (message: string, type: ToastType = 'success') => {
  const toastElement = document.createElement('div');
  toastElement.className = `fixed top-4 right-4 p-4 rounded-md text-white ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  toastElement.textContent = message;
  document.body.appendChild(toastElement);

  setTimeout(() => {
    document.body.removeChild(toastElement);
  }, 3000);
};