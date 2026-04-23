import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { getProducts } from '../api/woocommerce';
import { ProductCard } from '../components/shop/ProductCard';
import './ShopPage.css';

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProducts({ per_page: 20, search })
      .then(setProducts)
      .catch(() => setError('Nie udało się załadować produktów. Spróbuj ponownie.'))
      .finally(() => setLoading(false));
  }, [search]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput);
  }

  return (
    <div className="shop">
      <div className="shop__header">
        <h1 className="shop__title">Produkty</h1>
        <form className="shop__search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Szukaj produktów..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="shop__search-input"
          />
          <button type="submit" className="shop__search-btn">Szukaj</button>
        </form>
      </div>

      {loading && (
        <div className="shop__loading">Ładowanie produktów...</div>
      )}

      {error && (
        <div className="shop__error">{error}</div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="shop__empty">
          {search ? `Brak wyników dla "${search}"` : 'Brak produktów.'}
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="shop__grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
