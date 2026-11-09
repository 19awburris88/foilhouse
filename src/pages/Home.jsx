import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiRadio,
  FiAward,
  FiDollarSign,
  FiCheck,
} from 'react-icons/fi';
import { PRODUCTS, FRANCHISES, fmt, fmtDate, franchiseBySlug } from '../data/catalog';
import { PHOTOS, photoFor } from '../data/photos';
import { useCountdown } from '../hooks/useCountdown';
import ProductRail from '../components/ProductRail';
import ProductArt from '../components/ProductArt';
import Tilt from '../components/Tilt';
import Reveal from '../components/Reveal';
import { useCart } from '../CartContext';

const preorders = PRODUCTS.filter((p) => p.status === 'preorder').sort((a, b) =>
  a.release.localeCompare(b.release),
);
const withPhotosFirst = (list) => [...list].sort((a, b) => !!b.image - !!a.image);
const newReleases = withPhotosFirst(
  PRODUCTS.filter((p) => p.art.kind === 'box' || p.type === 'Booster Pack'),
);
const vault = withPhotosFirst(PRODUCTS.filter((p) => p.type === 'Graded' || p.type === 'Single'));

function HouseCard() {
  return (
    <div className="house-card">
      <div className="house-card__top">
        <span>Foilhouse</span>
        <span className="mono">No. 001</span>
      </div>
      <div className="house-card__art">
        <div className="house-card__sun" />
        <div className="house-card__diamond" />
      </div>
      <div className="house-card__text">
        <strong>The House Card</strong>
        <p>Every pull checked by hand. Every slab verified. Every box sealed.</p>
      </div>
      <div className="house-card__bottom mono">
        <span>FH-26</span>
        <span>★ Secret Rare</span>
      </div>
      <div className="holo-layer" />
      <div className="glare-layer" />
    </div>
  );
}

function Countdown({ iso }) {
  const t = useCountdown(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div className="countdown" aria-label={`${t.days} days ${t.hours} hours until release`}>
      {[
        ['Days', t.days],
        ['Hrs', t.hours],
        ['Min', t.minutes],
        ['Sec', t.seconds],
      ].map(([l, v]) => (
        <div key={l}>
          <strong className="mono">{pad(v)}</strong>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const next = preorders[0];
  return (
    <section className="hero">
      <div className="hero__grain" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--light">
            <span className="dot" /> Card house · Est. 2019
          </p>
          <h1 className="hero__title">
            <span>Rip it.</span>
            <span>Grade it.</span>
            <span className="foil-text">Keep it.</span>
          </h1>
          <p className="hero__lede">
            Sealed Pokémon, One Piece, Dragon Ball and sports, hand-checked singles and verified
            slabs. Run by collectors who still open every box like it's the first.
          </p>
          <div className="hero__ctas">
            <Link to="/shop" className="btn btn--accent btn--lg">
              Shop new releases <FiArrowRight />
            </Link>
            <Link to="/shop?status=preorder" className="btn btn--ghost-light btn--lg">
              Release calendar
            </Link>
          </div>
        </div>

        <div className="hero__stage" aria-hidden="true">
          <div className="hero__stack">
            <figure className="hero__print hero__print--back">
              <img src={PHOTOS.heroAlt.src} alt="" />
            </figure>
            <figure className="hero__print">
              <img src={PHOTOS.hero.src} alt="" fetchPriority="high" />
              <figcaption className="mono">In the vault · 4/102</figcaption>
            </figure>
            <Tilt className="hero__card" max={18}>
              <HouseCard />
            </Tilt>
          </div>
        </div>
      </div>

      {next && (
        <div className="container">
          <Link to={`/product/${next.id}`} className="hero__drop">
            <span className="hero__drop-label">
              <span className="pulse" /> Next drop
            </span>
            <span className="hero__drop-name">
              <small>
                {franchiseBySlug(next.franchise).name} · {fmtDate(next.release)}
              </small>
              {next.name}
            </span>
            <Countdown iso={next.release} />
            <span className="hero__drop-cta">
              Preorder {fmt(next.price)} <FiArrowUpRight />
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}

function Ticker() {
  const words = [
    'Pokémon',
    'One Piece',
    'Dragon Ball',
    'Sports',
    'Japanese imports',
    'Graded slabs',
    'Live breaks',
  ];
  const row = [...words, ...words];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[...row, ...row].map((w, i) => (
          <span key={i}>
            {w}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, link, linkLabel, light }) {
  return (
    <div className="section-head">
      <div>
        <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}>{eyebrow}</p>
        <h2 className="display-xl">{title}</h2>
      </div>
      {link && (
        <Link to={link} className={`arrow-link${light ? ' arrow-link--light' : ''}`}>
          {linkLabel} <FiArrowRight />
        </Link>
      )}
    </div>
  );
}

function Franchises() {
  return (
    <Reveal className="section container">
      <SectionHead eyebrow="Explore the house" title="Shop by franchise" />
      <div className="franchise-grid">
        {FRANCHISES.map((f, i) => {
          const items = PRODUCTS.filter((p) => p.franchise === f.slug);
          return (
            <Link
              to={`/shop?f=${f.slug}`}
              key={f.slug}
              className="franchise-tile"
              style={{ '--c1': f.art[0], '--c2': f.art[1], '--c3': f.art[2] }}
            >
              <span className="franchise-tile__index mono">0{i + 1}</span>
              <div className="franchise-tile__art">
                <img src={photoFor(f.image)} alt="" loading="lazy" />
              </div>
              <div className="franchise-tile__copy">
                <h3>{f.name}</h3>
                <p>{f.tagline}</p>
                <span className="franchise-tile__cta">
                  {items.length} items <FiArrowRight />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Reveal>
  );
}

function Calendar() {
  const { addItem } = useCart();
  return (
    <section className="band band--ink" id="calendar">
      <Reveal as="div" className="container section">
        <SectionHead
          light
          eyebrow="Release calendar"
          title="Lock in the next chase"
          link="/shop?status=preorder"
          linkLabel="All preorders"
        />
        <ol className="calendar">
          {preorders.map((p) => {
            const d = new Date(p.release + 'T12:00:00');
            return (
              <li key={p.id} className="calendar__row">
                <div className="calendar__date">
                  <span className="mono">{d.toLocaleDateString('en-US', { month: 'short' })}</span>
                  <strong>{d.getDate()}</strong>
                </div>
                <div className="calendar__art">
                  <ProductArt product={p} />
                </div>
                <div className="calendar__info">
                  <p className="eyebrow eyebrow--light">
                    {franchiseBySlug(p.franchise).name} · {p.lang === 'JP' ? 'Japanese' : 'English'}
                  </p>
                  <Link to={`/product/${p.id}`}>{p.name}</Link>
                </div>
                <strong className="calendar__price">{fmt(p.price)}</strong>
                <button className="btn btn--light" onClick={() => addItem(p)}>
                  Preorder
                </button>
              </li>
            );
          })}
        </ol>
        <p className="calendar__fine">
          Preorders ship the week of release. Japanese preorders cannot be cancelled. Check out
          preorders separately from in-stock items.
        </p>
      </Reveal>
    </section>
  );
}

const SERVICES = [
  {
    icon: <FiRadio />,
    photo: PHOTOS.handHolos,
    eyebrow: 'Live breaks',
    title: 'Pull with the room.',
    body: 'Team and random breaks streamed three nights a week. Every hit is shipped to you, slabbed if you want it.',
    points: ['Tue · Thu · Sun, 8PM ET', 'Pokémon, One Piece & sports', 'Hits ship within 72 hours'],
    cta: 'See the schedule',
    to: '/#services',
  },
  {
    icon: <FiAward />,
    photo: PHOTOS.slabsBw,
    eyebrow: 'Grading',
    title: 'Send it. We slab it.',
    body: 'We pre-grade, sleeve and submit to PSA, BGS and CGC, then ship your slabs home insured.',
    points: ['Free pre-grade on 10+ cards', 'Bulk tiers from $22/card', 'Tracking at every step'],
    cta: 'Start a submission',
    to: '/sell',
  },
  {
    icon: <FiDollarSign />,
    photo: PHOTOS.vintagePile,
    eyebrow: 'Sell to us',
    title: 'Cash for your collection.',
    body: 'Sealed product, binders, slabs. Send photos and get a firm offer in 24 hours, with payout the day it arrives.',
    points: ['Offers within 24 hours', 'Store credit pays +15%', 'Free insured shipping label'],
    cta: 'Get a quote',
    to: '/sell',
  },
];

function Services() {
  return (
    <Reveal className="section container" id="services">
      <SectionHead eyebrow="More than a shop" title="Break. Grade. Sell." />
      <div className="services">
        {SERVICES.map((s) => (
          <Link to={s.to} className="service" key={s.eyebrow}>
            <div className="service__photo">
              <img src={s.photo.src} alt={s.photo.alt} loading="lazy" />
              <span className="service__icon">{s.icon}</span>
            </div>
            <p className="eyebrow">{s.eyebrow}</p>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <ul>
              {s.points.map((pt) => (
                <li key={pt}>
                  <FiCheck aria-hidden="true" /> {pt}
                </li>
              ))}
            </ul>
            <span className="arrow-link">
              {s.cta} <FiArrowRight />
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}

const GALLERY = [
  {
    ...PHOTOS.showFloor,
    caption: 'Show season: we set up at every major card show in the Midwest.',
  },
  { ...PHOTOS.playTable, caption: 'Friday Night Rips' },
  { ...PHOTOS.slabs, caption: 'Fresh back from grading' },
  { ...PHOTOS.charizardSlabs, caption: 'Chase pulls, sleeved on the spot' },
  { ...PHOTOS.hockeyWall, caption: 'The vintage wall' },
];

function Gallery() {
  return (
    <Reveal className="section container">
      <SectionHead eyebrow="Inside the house" title="Where the hobby happens" />
      <div className="gallery">
        {GALLERY.map((g, i) => (
          <figure key={g.src} className={`gallery__item gallery__item--${i}`}>
            <img src={g.src} alt={g.alt} loading="lazy" />
            <figcaption>{g.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Reveal>
  );
}

function Visit() {
  return (
    <Reveal className="section container visit" id="visit">
      <div className="visit__copy">
        <p className="eyebrow">Built by collectors</p>
        <h2 className="display-xl">A card shop that still smells like fresh packs.</h2>
        <p>
          Foilhouse started as two friends trading binders at a folding table. Now it's a shop, a
          break room and a grading desk, still run by people who'd rather talk pulls than sell you
          something.
        </p>
        <dl className="stats">
          <div>
            <dt>Collectors served</dt>
            <dd>12k+</dd>
          </div>
          <div>
            <dt>Orders ship in</dt>
            <dd>24h</dd>
          </div>
          <div>
            <dt>Slabs verified</dt>
            <dd>100%</dd>
          </div>
        </dl>
      </div>
      <div className="visit__card">
        <img
          className="visit__photo"
          src={PHOTOS.hoops.src}
          alt={PHOTOS.hoops.alt}
          loading="lazy"
        />
        <p className="eyebrow eyebrow--light">Visit the shop</p>
        <h3>Columbus, Ohio</h3>
        <dl className="hours">
          <div>
            <dt>Tue – Fri</dt>
            <dd>12 – 8PM</dd>
          </div>
          <div>
            <dt>Saturday</dt>
            <dd>10AM – 8PM</dd>
          </div>
          <div>
            <dt>Sunday</dt>
            <dd>12 – 6PM</dd>
          </div>
          <div>
            <dt>Monday</dt>
            <dd>Closed</dd>
          </div>
        </dl>
        <p className="visit__note">Friday Night Rips: open play and pack battles every week.</p>
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />

      <Reveal className="section container">
        <SectionHead
          eyebrow="Hot off the press"
          title="New releases"
          link="/shop"
          linkLabel="Shop all"
        />
        <ProductRail products={newReleases} label="New releases" />
      </Reveal>

      <Franchises />
      <Calendar />

      <section className="band band--paper2">
        <Reveal as="div" className="container section">
          <SectionHead
            eyebrow="The Vault"
            title="Graded & chase singles"
            link="/shop?type=Graded"
            linkLabel="Enter the vault"
          />
          <ProductRail products={vault} label="Graded and chase singles" />
        </Reveal>
      </section>

      <Services />
      <Gallery />
      <Visit />
    </>
  );
}
