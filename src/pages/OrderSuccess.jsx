import { Link, useSearchParams } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const demo = params.get('demo');
  return (
    <section className="status-page container">
      <span className="form-card__check">
        <FiCheck />
      </span>
      <p className="eyebrow">Order confirmed</p>
      <h1 className="display-hero">It's on the way.</h1>
      <p>
        {demo
          ? 'This is a demo store, so no payment was taken and nothing will ship.'
          : "You'll get a confirmation email with tracking within 24 hours. Preorders ship the week of release."}
      </p>
      <Link to="/shop" className="btn btn--dark btn--lg">
        Keep shopping
      </Link>
    </section>
  );
}
