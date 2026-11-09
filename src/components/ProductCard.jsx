import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { fmt, fmtDate, franchiseBySlug } from '../data/catalog';
import ProductArt from './ProductArt';

export function StatusTag({ product }) {
  if (product.status === 'sold-out') return <span className="tag tag--muted">Sold out online</span>;
  if (product.status === 'preorder')
    return <span className="tag tag--accent">Preorder · {fmtDate(product.release)}</span>;
  if (product.badge) return <span className="tag">{product.badge}</span>;
  return null;
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const franchise = franchiseBySlug(product.franchise);
  const soldOut = product.status === 'sold-out';

  return (
    <article className={`pcard${soldOut ? ' pcard--soldout' : ''}`}>
      <Link to={`/product/${product.id}`} className="pcard__media" aria-label={product.name}>
        <ProductArt product={product} />
        <div className="pcard__tags">
          <StatusTag product={product} />
          {product.lang === 'JP' && <span className="tag tag--ghost">JP</span>}
        </div>
      </Link>
      <div className="pcard__body">
        <p className="pcard__meta">
          {franchise?.name} <span>/</span> {product.type}
        </p>
        <h3 className="pcard__title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="pcard__foot">
          <strong className="pcard__price">{fmt(product.price)}</strong>
          <button
            className="pcard__add"
            onClick={() => addItem(product)}
            disabled={soldOut}
            aria-label={soldOut ? `${product.name} is sold out` : `Add ${product.name} to cart`}
          >
            {soldOut ? 'Sold out' : product.status === 'preorder' ? 'Preorder' : 'Add'}
            {!soldOut && <span aria-hidden="true">+</span>}
          </button>
        </div>
      </div>
    </article>
  );
}
