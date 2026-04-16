import './HomePage.css';

export function HomePage() {
  return (
    <div className="home">
      <p className="home__coming-soon">WKRÓTCE<span className="home__ellipsis">...</span></p>
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
