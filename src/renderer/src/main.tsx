import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import UserProvider from './providers/UserProvider'
import OrderProvider from './providers/OrderProvider'
import ProductProvider from './providers/ProductProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductProvider>
      <OrderProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </OrderProvider>
    </ProductProvider>
  </StrictMode>
)
