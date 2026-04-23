import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getCheckoutUrl } from '../api/woocommerce';
import './CartPage.css';

export function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();

  if (totalItems === 0) {
    return (
      <div className="cart cart--empty">
        <p>Twój koszyk jest pusty.</p>
        <Link to="/produkty" className="cart__continue">Przejdź do produktów →</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1 className="cart__title">Koszyk</h1>

      <div className="cart__layout">
        <ul className="cart__items">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="cart-item">
              <div className="cart-item__image">
                {product.images[0] ? (
                  <img src={product.images[0].src} alt={product.images[0].alt || product.name} />
                ) : (
                  <span>🧶</span>
                )}
              </div>
              <div className="cart-item__info">
                <Link to={`/produkt/${product.slug}`} className="cart-item__name">
                  {product.name}
                </Link>
                <span className="cart-item__price">{product.price} zł / szt.</span>
              </div>
              <div className="cart-item__qty">
                <button onClick={() => updateQuantity(product.id, quantity - 1)}>−</button>
                <span>{quantity}</span>
                <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
              </div>
              <span className="cart-item__subtotal">
                {(parseFloat(product.price) * quantity).toFixed(2)} zł
              </span>
              <button
                className="cart-item__remove"
                onClick={() => removeItem(product.id)}
                aria-label="Usuń"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <div className="cart__summary">
          <h2 className="cart__summary-title">Podsumowanie</h2>
          <div className="cart__summary-row">
            <span>Produkty ({totalItems} szt.)</span>
            <span>{totalPrice.toFixed(2)} zł</span>
          </div>
          <div className="cart__summary-row cart__summary-row--shipping">
            <span>Wysyłka</span>
            <span>obliczona przy zamówieniu</span>
          </div>
          <div className="cart__summary-total">
            <span>Razem</span>
            <span>{totalPrice.toFixed(2)} zł</span>
          </div>
          <a href={getCheckoutUrl()} className="cart__checkout-btn">
            Przejdź do kasy
          </a>
          <Link to="/produkty" className="cart__continue">← Kontynuuj zakupy</Link>
        </div>
      </div>
    </div>
  );
}
