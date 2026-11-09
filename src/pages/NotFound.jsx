import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="status-page container">
      <p className="eyebrow mono">Error 404</p>
      <h1 className="display-hero">Pulled a blank.</h1>
      <p>That page isn't in the box. Try the shop instead.</p>
      <Link to="/shop" className="btn btn--dark btn--lg">
        Go to the shop
      </Link>
    </section>
  );
}
