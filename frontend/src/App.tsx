import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { PasswordGate } from './components/PasswordGate';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#888', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ color: '#fff', fontWeight: 'normal', marginBottom: '1rem' }}>404</h1>
      <p>Strona nie istnieje.</p>
      <a href="/" style={{ color: '#fff', marginTop: '1rem', display: 'inline-block' }}>← Strona główna</a>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <PasswordGate>
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produkty" element={<ShopPage />} />
            <Route path="/produkt/:slug" element={<ProductPage />} />
            <Route path="/koszyk" element={<CartPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
    </PasswordGate>
  );
}
