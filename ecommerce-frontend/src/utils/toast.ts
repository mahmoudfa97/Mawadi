type ToastType = 'success' | 'error';

export const toast = (message: { title: string, description?: string }, type: ToastType) => {
  const toastElement = document.createElement('div');
  const toastElementSpan = document.createElement('span');

  // Apply base styles and conditional type styles
  toastElement.className = `fixed top-4 right-4 p-4 rounded-md text-white shadow-md flex items-start gap-2 z-50 opacity-0 transition-opacity duration-300 transform translate-y-[-10px] ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;

  // Optional icon based on toast type
  const icon = document.createElement('span');
  icon.className = 'mr-2';
  icon.innerHTML = type === 'success' ? '✓' : '✖️';
  toastElement.appendChild(icon);

  // Title and optional description
  toastElement.textContent = message.title;
  if (message.description) {
    toastElementSpan.textContent = message.description;
    toastElement.appendChild(toastElementSpan);
  }

  // Append toast and handle spacing for stacking
  document.body.appendChild(toastElement);
  const toastIndex = document.querySelectorAll('.toast').length;
  toastElement.style.top = `${4 + (toastIndex * 60)}px`;
  toastElement.classList.add('toast');

  // Fade in and remove after delay
  setTimeout(() => {
    toastElement.style.opacity = '1';
    toastElement.style.transform = 'translateY(0)';
  }, 0);

  setTimeout(() => {
    toastElement.style.opacity = '0';
    toastElement.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, 300); // Match fade-out duration
  }, 3000);
};
