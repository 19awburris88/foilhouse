import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

export default function OrderSuccess() {
  return (
    <section className="status-page container">
      <span className="form-card__check">
        <FiCheck />
      </span>
      <p className="eyebrow">Order confirmed</p>
      <h1 className="display-hero">It's on the way.</h1>
      <p>This is a demo store, so no payment was taken and nothing will ship.</p>
      <Link to="/shop" className="btn btn--dark btn--lg">
        Keep shopping
      </Link>
    </section>
  );
}
