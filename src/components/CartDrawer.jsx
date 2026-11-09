import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiMinus, FiPlus, FiAlertTriangle } from 'react-icons/fi';
import { useCart } from '../CartContext';
import { fmt, fmtDate, productById, FREE_SHIPPING_CENTS } from '../data/catalog';
import ProductArt from './ProductArt';

const LIVE_CHECKOUT = import.meta.env.VITE_SQUARE_LIVE === 'true';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clear, total, count, isOpen, setIsOpen } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, setIsOpen]);

  const hasPreorder = items.some((i) => i.status === 'preorder');
  const hasInStock = items.some((i) => i.status !== 'preorder');
  const remaining = Math.max(0, FREE_SHIPPING_CENTS - total);
  const progress = Math.min(100, (total / FREE_SHIPPING_CENTS) * 100);

  const checkout = async () => {
    setError(null);
    if (!LIVE_CHECKOUT) {
      clear();
      setIsOpen(false);
      navigate('/order-success?demo=1');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed');
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className={`drawer${isOpen ? ' is-open' : ''}`} inert={!isOpen}>
      <div className="drawer__scrim" onClick={() => setIsOpen(false)} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label="Cart">
        <header className="drawer__head">
          <h2>
            Your bag <span className="mono">({count})</span>
          </h2>
          <button className="icon-btn" onClick={() => setIsOpen(false)} aria-label="Close cart">
            <FiX />
          </button>
        </header>

        {items.length > 0 && (
          <div className="ship-meter">
            <p>
              {remaining > 0 ? (
                <>
                  <strong>{fmt(remaining)}</strong> away from free US shipping
                </>
              ) : (
                <strong>Free US shipping unlocked</strong>
              )}
            </p>
            <div className="ship-meter__bar">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="drawer__empty">
            <p className="display-sm">Nothing in the bag yet.</p>
            <p>New releases land every Friday at 10AM ET.</p>
            <button
              className="btn btn--dark"
              onClick={() => {
                setIsOpen(false);
                navigate('/shop');
              }}
            >
              Shop the house
            </button>
          </div>
        ) : (
          <>
            <ul className="drawer__items">
              {items.map((item) => {
                const product = productById(item.id);
                return (
                  <li className="line" key={item.id}>
                    <div className="line__art">{product && <ProductArt product={product} />}</div>
                    <div className="line__info">
                      <p className="line__name">{item.name}</p>
                      {item.status === 'preorder' && (
                        <p className="line__note">Preorder · ships {fmtDate(item.release)}</p>
                      )}
                      <div className="qty">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease ${item.name}`}
                        >
                          <FiMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase ${item.name}`}
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>
                    <div className="line__right">
                      <strong>{fmt(item.price * item.quantity)}</strong>
                      <button className="link-btn" onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="drawer__foot">
              {hasPreorder && hasInStock && (
                <p className="notice">
                  <FiAlertTriangle aria-hidden="true" />
                  Preorders and in-stock items ship together when the preorder arrives. Check out
                  separately if you want in-stock items now.
                </p>
              )}
              <div className="drawer__total">
                <span>Subtotal</span>
                <strong>{fmt(total)}</strong>
              </div>
              {error && <p className="form-error">{error}</p>}
              <button className="btn btn--accent btn--block" onClick={checkout} disabled={loading}>
                {loading ? 'Opening secure checkout…' : 'Checkout'}
              </button>
              <p className="drawer__fine">
                Taxes calculated at checkout. All TCG sales final.
                {!LIVE_CHECKOUT && ' Demo store: no payment is taken.'}
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
