import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const image = product.images[0];
  const isOutOfStock = product.stock_status === 'outofstock';

  return (
    <article className="product-card">
      <Link to={`/produkt/${product.slug}`} className="product-card__image-link">
        {image ? (
          <img
            src={image.src}
            alt={image.alt || product.name}
            className="product-card__image"
          />
        ) : (
          <div className="product-card__no-image">🧶</div>
        )}
        {product.on_sale && <span className="product-card__badge">Promocja</span>}
      </Link>
      <div className="product-card__body">
        <Link to={`/produkt/${product.slug}`} className="product-card__name">
          {product.name}
        </Link>
        <div className="product-card__price">
          {product.on_sale && (
            <span className="product-card__price--old">{product.regular_price} zł</span>
          )}
          <span className="product-card__price--current">{product.price} zł</span>
        </div>
        <button
          className="product-card__btn"
          onClick={() => addItem(product)}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Brak w magazynie' : 'Dodaj do koszyka'}
        </button>
      </div>
    </article>
  );
}
