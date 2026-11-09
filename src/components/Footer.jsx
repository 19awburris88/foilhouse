import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTiktok, FaYoutube, FaDiscord } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { FRANCHISES } from '../data/catalog';
import { Logo } from './Header';
import { PHOTOS } from '../data/photos';

function DropAlerts() {
  const [sent, setSent] = useState(false);
  return (
    <div className="alerts">
      <div className="alerts__copy">
        <p className="eyebrow eyebrow--light">Drop alerts</p>
        <h2 className="display-lg">
          First to know.
          <br />
          First to rip.
        </h2>
        <p>
          Preorder windows, restocks and break schedules, the moment they go live. One email a week,
          tops.
        </p>
      </div>
      {sent ? (
        <p className="alerts__done" role="status">
          You're on the list. Watch your inbox Friday morning.
        </p>
      ) : (
        <form
          className="alerts__form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label htmlFor="alert-email" className="sr-only">
            Email address
          </label>
          <input id="alert-email" type="email" required placeholder="you@email.com" />
          <button className="btn btn--accent" type="submit">
            Get alerts <FiArrowRight />
          </button>
        </form>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__band">
        <img className="footer__band-bg" src={PHOTOS.cardBacks.src} alt="" loading="lazy" />
        <div className="container">
          <DropAlerts />
        </div>
      </div>
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>
              A collector-run card house for Pokémon, One Piece, Dragon Ball and sports. Sealed,
              singles, slabs and breaks. Every card checked by hand.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="#" aria-label="Discord">
                <FaDiscord />
              </a>
            </div>
          </div>

          <div>
            <h3>Shop</h3>
            <ul>
              {FRANCHISES.map((f) => (
                <li key={f.slug}>
                  <Link to={`/shop?f=${f.slug}`}>{f.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/shop?status=preorder">Preorders</Link>
              </li>
              <li>
                <Link to="/shop?type=Graded">The Vault</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Services</h3>
            <ul>
              <li>
                <a href="/#services">Live breaks</a>
              </li>
              <li>
                <a href="/#services">Grading submissions</a>
              </li>
              <li>
                <Link to="/sell">Sell to us</Link>
              </li>
              <li>
                <a href="/#visit">Visit the shop</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Policies</h3>
            <ul>
              <li>Ships USPS to US, territories &amp; Canada</li>
              <li>Free US shipping on $200+</li>
              <li>All TCG sales final</li>
              <li>Preorders ship week of release</li>
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <p>© 2026 Foilhouse Collectibles. A fictional concept store.</p>
          <p className="mono">Demo store · No payments taken</p>
        </div>
      </div>
      <div className="footer__wordmark" aria-hidden="true">
        FOILHOUSE
      </div>
    </footer>
  );
}
