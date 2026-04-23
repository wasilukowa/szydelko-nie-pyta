import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__columns">
          <div className="footer__col">
            <h3 className="footer__col-title">Produkty</h3>
            <span className="footer__col-item--disabled">Wszystkie produkty</span>
            <span className="footer__col-item--disabled">Chusty</span>
            <span className="footer__col-item--disabled">Mandale</span>
            <span className="footer__col-item--disabled">Serwety</span>
            <span className="footer__col-item--disabled">Zrobię dla Ciebie</span>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Wysyłka</h3>
            <p>Wysyłka w ciągu 3–5 dni roboczych</p>
            <p>Polska: Poczta Polska, InPost</p>
            <p>Każdy produkt pakowany z troską</p>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Kontakt</h3>
            <a href="mailto:wasiluk.natalia@gmail.com" className="footer__col-link">wasiluk.natalia@gmail.com</a>
            <a href="https://www.instagram.com/szydelko_nie_pyta/" target="_blank" rel="noopener noreferrer" className="footer__col-link">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61581252330329" target="_blank" rel="noopener noreferrer" className="footer__col-link">Facebook</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Szydełko nie pyta</p>
          <div className="footer__bottom-links">
            <span className="footer__bottom-item--disabled">Regulamin</span>
            <span className="footer__bottom-item--disabled">Polityka prywatności</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
