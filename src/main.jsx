import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
      <Toaster position="bottom-right" reverseOrder={false} />
    </CartProvider>
  </StrictMode>
);
