import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { PRODUCTS, FRANCHISES, TYPES, franchiseBySlug } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import { photoFor } from '../data/photos';

const STATUSES = [
  ['in-stock', 'In stock'],
  ['preorder', 'Preorder'],
  ['sold-out', 'Sold out'],
];

const SORTS = {
  featured: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name),
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const f = params.get('f');
  const type = params.get('type');
  const status = params.get('status');
  const lang = params.get('lang');
  const q = params.get('q')?.toLowerCase() ?? '';
  const sort = params.get('sort') ?? 'featured';

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    if (value == null || next.get(key) === value) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) =>
        (!f || p.franchise === f) &&
        (!type || p.type === type) &&
        (!status || p.status === status) &&
        (!lang || p.lang === lang) &&
        (!q ||
          `${p.name} ${p.type} ${franchiseBySlug(p.franchise).name}`.toLowerCase().includes(q)),
    );
    // Keep sold-out items at the end, like a real storefront.
    return [...list].sort(
      (a, b) => (a.status === 'sold-out') - (b.status === 'sold-out') || SORTS[sort](a, b),
    );
  }, [f, type, status, lang, q, sort]);

  const franchise = f && franchiseBySlug(f);
  const title = q
    ? `“${params.get('q')}”`
    : status === 'preorder'
      ? 'Preorders'
      : type === 'Graded'
        ? 'The Vault'
        : (franchise?.name ?? type ?? 'Shop all');

  const active = [
    franchise && ['f', franchise.name],
    type && ['type', type],
    status && ['status', STATUSES.find(([s]) => s === status)?.[1]],
    lang && ['lang', 'Japanese'],
    q && ['q', `Search: ${params.get('q')}`],
  ].filter(Boolean);

  return (
    <div className="shop">
      <header
        className="shop__hero"
        style={franchise ? { '--c1': franchise.art[0], '--c2': franchise.art[1] } : undefined}
      >
        <img
          className="shop__hero-bg"
          src={photoFor(
            franchise?.image ??
              (status === 'preorder'
                ? 'card-backs'
                : type === 'Graded'
                  ? 'slabs-teal'
                  : 'vintage-pokemon-pile'),
          )}
          alt=""
        />
        <div className="container">
          <p className="eyebrow eyebrow--light">{franchise ? 'Franchise' : 'Foilhouse shop'}</p>
          <h1 className="display-hero">{title}</h1>
          <p className="shop__sub">
            {franchise?.tagline ??
              'Sealed product, hand-checked singles and verified slabs. Restocks every Friday.'}
          </p>
        </div>
      </header>

      <div className="shop__chips container" role="group" aria-label="Franchise">
        <button className={!f ? 'chip is-active' : 'chip'} onClick={() => set('f', null)}>
          All
        </button>
        {FRANCHISES.map((fr) => (
          <button
            key={fr.slug}
            className={f === fr.slug ? 'chip is-active' : 'chip'}
            onClick={() => set('f', fr.slug)}
            style={{ '--c1': fr.art[0], '--c2': fr.art[1] }}
          >
            <span className="mega__swatch" />
            {fr.name}
          </button>
        ))}
      </div>

      <div className="shop__layout container">
        <aside className="filters" aria-label="Filters">
          <fieldset>
            <legend>Product</legend>
            {TYPES.map((t) => (
              <label key={t} className="check">
                <input type="checkbox" checked={type === t} onChange={() => set('type', t)} />
                <span>{t}</span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Availability</legend>
            {STATUSES.map(([s, l]) => (
              <label key={s} className="check">
                <input type="checkbox" checked={status === s} onChange={() => set('status', s)} />
                <span>{l}</span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Language</legend>
            <label className="check">
              <input type="checkbox" checked={lang === 'EN'} onChange={() => set('lang', 'EN')} />
              <span>English</span>
            </label>
            <label className="check">
              <input type="checkbox" checked={lang === 'JP'} onChange={() => set('lang', 'JP')} />
              <span>Japanese</span>
            </label>
          </fieldset>
        </aside>

        <div className="shop__main">
          <div className="shop__bar">
            <p className="mono">
              {results.length} {results.length === 1 ? 'item' : 'items'}
            </p>
            <div className="shop__active">
              {active.map(([key, label]) => (
                <button key={key} className="pill" onClick={() => set(key, null)}>
                  {label} <FiX aria-hidden="true" />
                </button>
              ))}
              {active.length > 1 && (
                <button className="link-btn" onClick={() => setParams({}, { replace: true })}>
                  Clear all
                </button>
              )}
            </div>
            <label className="sort">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => set('sort', e.target.value === 'featured' ? null : e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>

          {/* Mobile-only compact filters */}
          <div className="shop__mobile-filters">
            <select
              value={type ?? ''}
              onChange={(e) => set('type', e.target.value || null)}
              aria-label="Product type"
            >
              <option value="">All products</option>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select
              value={status ?? ''}
              onChange={(e) => set('status', e.target.value || null)}
              aria-label="Availability"
            >
              <option value="">Any availability</option>
              {STATUSES.map(([s, l]) => (
                <option key={s} value={s}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {results.length ? (
            <div className="grid">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p className="display-sm">Nothing matches that yet.</p>
              <p>Try clearing a filter, or ask us. We source on request.</p>
              <button className="btn btn--dark" onClick={() => setParams({}, { replace: true })}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
