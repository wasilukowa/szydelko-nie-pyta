import { useState } from 'react';
import './PasswordGate.css';

const PASSWORD = 'BipBupBup2026';
const STORAGE_KEY = 'sznp_unlocked';

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === '1';
  });
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, '1');
      setUnlocked(true);
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 2000);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="pg">
      <div className="pg__blurred" aria-hidden="true">
        {children}
      </div>
      <div className="pg__overlay">
        <form className="pg__form" onSubmit={handleSubmit}>
          <img src="/logo/logo-image.svg" alt="Szydełko nie pyta" className="pg__logo" />
          <p className="pg__label">Strona jest w przygotowaniu</p>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            placeholder="Hasło"
            className={`pg__input${error ? ' pg__input--error' : ''}`}
            autoFocus
          />
          {error && <p className="pg__error">Nieprawidłowe hasło</p>}
          <button type="submit" className="pg__btn">Wejdź →</button>
        </form>
      </div>
    </div>
  );
}
