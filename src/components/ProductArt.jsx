import { franchiseBySlug } from '../data/catalog';
import { photoFor } from '../data/photos';

// CSS-rendered product artwork: sealed boxes, raw cards, and graded slabs.
// Colors come from product.art.colors so every product has its own look.

function CardFace({ product, compact }) {
  const { colors, set } = product.art;
  const franchise = franchiseBySlug(product.franchise);
  return (
    <div className="art-cardface-wrap">
      <div className="art-cardface" style={vars(colors)}>
        <div className="art-cardface__top">
          <span>{shortName(product.name)}</span>
          {!compact && <span className="art-cardface__hp">◆</span>}
        </div>
        <div className="art-cardface__window">
          <div className="art-cardface__burst" />
          <div className="art-cardface__orb" />
        </div>
        <div className="art-cardface__bottom">
          <span>{franchise?.name}</span>
          <span>{set ?? product.art.code}</span>
        </div>
        <div className="holo-layer" />
      </div>
    </div>
  );
}

function Box({ product }) {
  const { colors, code } = product.art;
  const franchise = franchiseBySlug(product.franchise);
  return (
    <div className="art-box" style={vars(colors)}>
      <div className="art-box__body">
        <div className="art-box__top" />
        <div className="art-box__side" />
        <div className="art-box__front">
          <span className="art-box__franchise">{franchise?.name}</span>
          <span className="art-box__code">{code}</span>
          <span className="art-box__rings" />
          <span className="art-box__type">
            {product.type}
            {product.lang === 'JP' && ' · JP'}
          </span>
          <div className="holo-layer holo-layer--soft" />
        </div>
      </div>
      <div className="art-shadow" />
    </div>
  );
}

function Slab({ product }) {
  const { grader, grade, label, set } = product.art;
  const cert = certFor(product.id);
  return (
    <div className="art-slab">
      <div className="art-slab__case">
        <div className={`art-slab__label art-slab__label--${grader.toLowerCase()}`}>
          <div className="art-slab__label-text">
            <span>{set}</span>
            <strong>{shortName(product.name)}</strong>
            <span className="mono">#{cert}</span>
          </div>
          <div className="art-slab__grade">
            <span>{label}</span>
            <strong>{grade}</strong>
          </div>
        </div>
        <div className="art-slab__window">
          <CardFace product={product} compact />
        </div>
        <span className="art-slab__grader">{grader}</span>
      </div>
      <div className="art-shadow" />
    </div>
  );
}

export default function ProductArt({ product, image, eager = false }) {
  const kind = product.art.kind;
  const photo = image ?? product.image;
  if (photo) {
    return (
      <div className="product-art product-art--photo">
        <img
          src={photoFor(photo)}
          alt={product.name}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    );
  }
  return (
    <div className={`product-art product-art--${kind}`}>
      {kind === 'box' && <Box product={product} />}
      {kind === 'slab' && <Slab product={product} />}
      {kind === 'card' && (
        <div className="art-single">
          <CardFace product={product} />
          <div className="art-shadow" />
        </div>
      )}
    </div>
  );
}

function vars([c1, c2, c3]) {
  return { '--c1': c1, '--c2': c2, '--c3': c3 };
}

function shortName(name) {
  return name
    .replace(/\s(Alt Art|SIR|SCR|Manga Rare|Silver Prizm RC).*$/, '')
    .replace(/\s\d+\/\d+$/, '');
}

function certFor(id) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return String(h % 100000000).padStart(8, '0');
}
