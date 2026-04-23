import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { getProducts } from '../api/woocommerce';
import { ProductCard } from '../components/shop/ProductCard';
import './HomePage.css';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ per_page: 2 })
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">Szydełkowe wyroby</h1>
        <p className="home__tagline">Chusty i mandale robione z troską</p>
      </section>

      <section className="home__featured">
        {loading && <p className="home__featured-loading">Ładowanie...</p>}
        {!loading && products.length > 0 && (
          <>
            <div className="home__featured-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Link to="/produkty" className="home__featured-cta">Zobacz wszystkie produkty →</Link>
          </>
        )}
      </section>

      <div className="home__socials">
        <a href="https://www.instagram.com/szydelko_nie_pyta/" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://www.facebook.com/profile.php?id=61581252330329" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
      </div>
    </div>
  );
}
