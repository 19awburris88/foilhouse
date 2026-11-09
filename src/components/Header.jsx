import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../CartContext';
import { FRANCHISES, TYPES } from '../data/catalog';

const ANNOUNCEMENTS = [
  'Free US shipping on orders $200+',
  'We buy collections. Get a quote in 24 hours',
  'Live breaks Tue · Thu · Sun at 8PM ET',
];

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Foilhouse home">
      <svg className="logo__mark" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="lg-foil" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF7A59" />
            <stop offset=".35" stopColor="#FFD86B" />
            <stop offset=".65" stopColor="#7DF0D0" />
            <stop offset="1" stopColor="#8F7BFF" />
          </linearGradient>
        </defs>
        <rect x="6" y="3" width="20" height="26" rx="2.5" fill="url(#lg-foil)" />
        <rect
          x="9"
          y="6"
          width="14"
          height="20"
          rx="1"
          fill="none"
          stroke="#0E0E10"
          strokeWidth="1.6"
        />
        <path d="M16 10 L20 16 L16 22 L12 16 Z" fill="#0E0E10" />
      </svg>
      <span className="logo__word">Foilhouse</span>
    </Link>
  );
}

function Announcement() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ANNOUNCEMENTS.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="announce">
      <div className="announce__inner container">
        <span className="announce__live">
          <i /> Live tonight 8PM ET
        </span>
        <p key={i} className="announce__msg">
          {ANNOUNCEMENTS[i]}
        </p>
        <Link to="/sell" className="announce__link">
          Sell to us <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const { count, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close every menu when the route changes.
  const routeKey = location.pathname + location.search;
  const [lastRoute, setLastRoute] = useState(routeKey);
  if (routeKey !== lastRoute) {
    setLastRoute(routeKey);
    setMenuOpen(false);
    setMegaOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q')?.toString().trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
  };

  return (
    <>
      <Announcement />
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header__row container">
          <button
            className="icon-btn header__burger"
            onClick={() => setMenuOpen((m) => !m)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          <Logo />

          <nav className="nav" aria-label="Primary">
            <div
              className={`nav__item nav__item--mega${megaOpen ? ' is-open' : ''}`}
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                className="nav__link"
                aria-expanded={megaOpen}
                onClick={() => setMegaOpen((m) => !m)}
              >
                Shop
              </button>
              <div className="mega">
                <div className="mega__inner container">
                  <div className="mega__col mega__col--wide">
                    <p className="eyebrow">By franchise</p>
                    <ul className="mega__franchises">
                      {FRANCHISES.map((f) => (
                        <li key={f.slug}>
                          <Link
                            to={`/shop?f=${f.slug}`}
                            style={{ '--c1': f.art[0], '--c2': f.art[1] }}
                          >
                            <span className="mega__swatch" />
                            <span>
                              <strong>{f.name}</strong>
                              <small>{f.tagline}</small>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mega__col">
                    <p className="eyebrow">By product</p>
                    <ul className="mega__list">
                      {TYPES.map((t) => (
                        <li key={t}>
                          <Link to={`/shop?type=${encodeURIComponent(t)}`}>{t}</Link>
                        </li>
                      ))}
                      <li>
                        <Link to="/shop?lang=JP">Japanese imports</Link>
                      </li>
                    </ul>
                  </div>
                  <Link to="/shop?status=preorder" className="mega__feature">
                    <span className="eyebrow">Release calendar</span>
                    <strong>Lock in your next box before it sells out.</strong>
                    <span className="mega__cta">
                      View preorders <FiArrowRight />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <NavLink to="/shop?status=preorder" className="nav__link">
              Preorders
            </NavLink>
            <NavLink to="/shop?type=Graded" className="nav__link">
              The Vault
            </NavLink>
            <a href="/#services" className="nav__link">
              Breaks &amp; Grading
            </a>
            <NavLink to="/sell" className="nav__link">
              Sell to us
            </NavLink>
          </nav>

          <div className="header__actions">
            <button
              className="icon-btn"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <FiSearch />
            </button>
            <button
              className="bag-btn"
              onClick={() => setIsOpen(true)}
              aria-label={`Open bag, ${count} items`}
            >
              <FiShoppingBag />
              <span className="bag-btn__label">Bag</span>
              <span className={`bag-btn__count${count ? ' has-items' : ''}`}>{count}</span>
            </button>
          </div>
        </div>

        <div className={`searchbar${searchOpen ? ' is-open' : ''}`}>
          <form className="container searchbar__form" onSubmit={onSearch} role="search">
            <FiSearch aria-hidden="true" />
            <input
              ref={searchRef}
              name="q"
              type="search"
              placeholder="Search boxes, singles, slabs…"
              aria-label="Search products"
            />
            <button type="submit" className="btn btn--dark btn--sm">
              Search
            </button>
          </form>
        </div>
      </header>

      <div className={`mobile-nav${menuOpen ? ' is-open' : ''}`} inert={!menuOpen}>
        <nav className="mobile-nav__inner" aria-label="Mobile">
          <p className="eyebrow">Shop by franchise</p>
          <ul className="mobile-nav__franchises">
            {FRANCHISES.map((f) => (
              <li key={f.slug}>
                <Link to={`/shop?f=${f.slug}`} style={{ '--c1': f.art[0], '--c2': f.art[1] }}>
                  <span className="mega__swatch" />
                  {f.name}
                  <FiArrowRight />
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mobile-nav__links">
            <li>
              <Link to="/shop">Shop all</Link>
            </li>
            <li>
              <Link to="/shop?status=preorder">Preorders</Link>
            </li>
            <li>
              <Link to="/shop?type=Graded">The Vault</Link>
            </li>
            <li>
              <a href="/#services" onClick={() => setMenuOpen(false)}>
                Breaks &amp; Grading
              </a>
            </li>
            <li>
              <Link to="/sell">Sell to us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
