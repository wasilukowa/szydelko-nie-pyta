import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="header__inner">

        <Link to="/" className="header__logo">
          <img src="/logo/logo-image.svg" alt="" className="header__logo-image" />
          <img src="/logo/logo-name.svg" alt="Szydełko nie pyta" className="header__logo-name" />
        </Link>

        <nav className="header__nav">
          <span className="header__link header__link--disabled">Sklep</span>
          <span className="header__link header__link--disabled">Zrobię dla Ciebie</span>
          <span className="header__link header__link--disabled">Galeria</span>
          <a href="https://www.facebook.com/profile.php?id=61581252330329" target="_blank" rel="noopener noreferrer" className="header__link">FB</a>
          <a href="https://www.instagram.com/szydelko_nie_pyta/" target="_blank" rel="noopener noreferrer" className="header__link">IG</a>
          <Link to="/kontakt" className="header__link">Kontakt</Link>
          <a href="https://github.com/wasilukowa" target="_blank" rel="noopener noreferrer" className="header__link header__link--programming">PROGRAMOWANIE</a>

          <Link to="/koszyk" className="header__cart" aria-label="Koszyk">
            <svg className="header__cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && <span className="header__cart-count">{totalItems}</span>}
          </Link>
        </nav>

      </div>
    </header>
  );
}
