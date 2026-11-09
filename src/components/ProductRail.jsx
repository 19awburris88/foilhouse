import { useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import ProductCard from './ProductCard';

export default function ProductRail({ products, label = 'Products' }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    const el = ref.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="rail">
      <div className="rail__controls">
        <button onClick={() => scroll(-1)} aria-label={`Scroll ${label} left`}>
          <FiArrowLeft />
        </button>
        <button onClick={() => scroll(1)} aria-label={`Scroll ${label} right`}>
          <FiArrowRight />
        </button>
      </div>
      <div className="rail__track" ref={ref} role="list" aria-label={label}>
        {products.map((p) => (
          <div className="rail__item" role="listitem" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
