import './ContactPage.css';

export function ContactPage() {
  return (
    <div className="contact">
      <p className="contact__text">
        Mogę Ci zrobić chustę, mandalę lub stronę internetową{' '}
        <span className="contact__smile">:)</span>
      </p>
      <p className="contact__sub">
        Skontaktuj się ze mną przez wiadomość prywatną na portalach{' '}
        <a href="https://www.facebook.com/profile.php?id=61581252330329" target="_blank" rel="noopener noreferrer">
          FB
        </a>{' '}
        lub{' '}
        <a href="https://www.instagram.com/szydelko_nie_pyta/" target="_blank" rel="noopener noreferrer">
          IG
        </a>{' '}
        lub mailem na{' '}
        <a href="mailto:wasiluk.natalia@gmail.com">
          wasiluk.natalia@gmail.com
        </a>
      </p>
    </div>
  );
}
