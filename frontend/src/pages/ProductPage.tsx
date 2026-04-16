import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { getProduct } from '../api/woocommerce';
import { useCart } from '../context/CartContext';
import './ProductPage.css';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProduct(slug)
      .then(p => { setProduct(p); setActiveImage(0); })
      .catch(() => setError('Nie znaleziono produktu.'))
      .finally(() => setLoading(false));
  }, [slug]);

  function handleAddToCart() {
    if (!product) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) return <div className="product-page__loading">Ładowanie...</div>;
  if (error || !product) return (
    <div className="product-page__error">
      <p>{error ?? 'Produkt nie znaleziony'}</p>
      <Link to="/sklep" className="product-page__back">← Wróć do sklepu</Link>
    </div>
  );

  const isOutOfStock = product.stock_status === 'outofstock';

  return (
    <div className="product-page">
      <Link to="/sklep" className="product-page__back">← Wróć do sklepu</Link>

      <div className="product-page__layout">
        <div className="product-page__gallery">
          <div className="product-page__main-image">
            {product.images[activeImage] ? (
              <img src={product.images[activeImage].src} alt={product.images[activeImage].alt || product.name} />
            ) : (
              <div className="product-page__no-image">🧶</div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="product-page__thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  className={`product-page__thumb ${i === activeImage ? 'product-page__thumb--active' : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img.src} alt={img.alt} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-page__info">
          <h1 className="product-page__name">{product.name}</h1>

          <div className="product-page__price">
            {product.on_sale && (
              <span className="product-page__price--old">{product.regular_price} zł</span>
            )}
            <span className="product-page__price--current">{product.price} zł</span>
          </div>

          {product.short_description && (
            <div
              className="product-page__short-desc"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          <div className="product-page__stock">
            {isOutOfStock ? (
              <span className="product-page__stock--out">Brak w magazynie</span>
            ) : (
              <span className="product-page__stock--in">Dostępny</span>
            )}
          </div>

          <button
            className={`product-page__btn ${added ? 'product-page__btn--added' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {added ? '✓ Dodano do koszyka' : 'Dodaj do koszyka'}
          </button>

          {product.description && (
            <div className="product-page__desc">
              <h2>Opis produktu</h2>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
