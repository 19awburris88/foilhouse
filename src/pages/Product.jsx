import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiShield, FiTruck, FiPackage, FiChevronRight } from 'react-icons/fi';
import { PRODUCTS, productById, franchiseBySlug, fmt, fmtDate } from '../data/catalog';
import { useCart } from '../CartContext';
import ProductArt from '../components/ProductArt';
import ProductRail from '../components/ProductRail';
import { StatusTag } from '../components/ProductCard';
import Tilt from '../components/Tilt';
import NotFound from './NotFound';

export default function Product() {
  const { id } = useParams();
  const product = productById(id);
  const { addItem } = useCart();
  const [shot, setShot] = useState(null);
  if (!product) return <NotFound />;
  const gallery = product.gallery ?? (product.image ? [product.image] : []);
  const active = gallery.includes(shot) ? shot : gallery[0];

  const franchise = franchiseBySlug(product.franchise);
  const related = PRODUCTS.filter((p) => p.franchise === product.franchise && p.id !== product.id);
  const soldOut = product.status === 'sold-out';
  const preorder = product.status === 'preorder';

  const specs = [
    ['Franchise', franchise.name],
    ['Product', product.type],
    ['Language', product.lang === 'JP' ? 'Japanese' : 'English'],
    product.art.grader && [
      'Grade',
      `${product.art.grader} ${product.art.grade} ${product.art.label}`,
    ],
    preorder && ['Release', fmtDate(product.release)],
    ['SKU', product.id.toUpperCase()],
  ].filter(Boolean);

  return (
    <div className="pdp">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/shop">Shop</Link>
          <FiChevronRight aria-hidden="true" />
          <Link to={`/shop?f=${franchise.slug}`}>{franchise.name}</Link>
          <FiChevronRight aria-hidden="true" />
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pdp__grid">
          <div
            className={`pdp__stage${active ? ' pdp__stage--photo' : ''}`}
            style={{ '--c1': product.art.colors[0], '--c2': product.art.colors[1] }}
          >
            {active ? (
              <>
                <ProductArt product={product} image={active} eager />
                {gallery.length > 1 && (
                  <div className="pdp__thumbs" role="group" aria-label="Product photos">
                    {gallery.map((g, i) => (
                      <button
                        key={g}
                        className={g === active ? 'is-active' : ''}
                        onClick={() => setShot(g)}
                        aria-label={`Photo ${i + 1}`}
                        aria-pressed={g === active}
                      >
                        <ProductArt product={product} image={g} />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <Tilt className="pdp__tilt" max={12}>
                  <ProductArt product={product} />
                </Tilt>
                <p className="pdp__hint mono">Move your cursor to tilt</p>
              </>
            )}
          </div>

          <div className="pdp__info">
            <div className="pdp__tags">
              <StatusTag product={product} />
              {product.lang === 'JP' && <span className="tag tag--ghost">Japanese</span>}
            </div>
            <p className="eyebrow">
              {franchise.name} / {product.type}
            </p>
            <h1 className="display-lg">{product.name}</h1>
            <p className="pdp__price">{fmt(product.price)}</p>
            <p className="pdp__desc">{product.description}</p>

            <button
              className="btn btn--accent btn--lg btn--block"
              disabled={soldOut}
              onClick={() => addItem(product)}
            >
              {soldOut
                ? 'Sold out online'
                : preorder
                  ? `Preorder · ships ${fmtDate(product.release)}`
                  : 'Add to bag'}
            </button>
            {soldOut && (
              <p className="pdp__restock">
                Sold out online. Call the shop for in-store availability, or join drop alerts below
                for the restock.
              </p>
            )}

            <ul className="pdp__assure">
              <li>
                <FiShield aria-hidden="true" />
                <span>
                  <strong>Authenticity guaranteed</strong> Sealed product from distributors only.
                  Slabs cert-verified.
                </span>
              </li>
              <li>
                <FiPackage aria-hidden="true" />
                <span>
                  <strong>Packed like it's ours</strong> Box protectors, top-loaders and double
                  boxing.
                </span>
              </li>
              <li>
                <FiTruck aria-hidden="true" />
                <span>
                  <strong>Free US shipping $200+</strong> USPS with tracking. Ships in 24 hours.
                </span>
              </li>
            </ul>

            <dl className="specs">
              {specs.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {related.length > 0 && (
          <section className="section">
            <div className="section-head">
              <div>
                <p className="eyebrow">Keep digging</p>
                <h2 className="display-xl">More {franchise.name}</h2>
              </div>
            </div>
            <ProductRail products={related} label={`More ${franchise.name}`} />
          </section>
        )}
      </div>
    </div>
  );
}
