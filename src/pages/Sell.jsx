import { useState } from 'react';
import { FiCamera, FiMessageSquare, FiDollarSign, FiCheck } from 'react-icons/fi';
import { FRANCHISES } from '../data/catalog';
import { PHOTOS } from '../data/photos';

const STEPS = [
  {
    icon: <FiCamera />,
    title: 'Send photos',
    body: 'Tell us what you have and attach a few clear photos.',
  },
  {
    icon: <FiMessageSquare />,
    title: 'Get a firm offer',
    body: 'A real offer within 24 hours. No lowball "estimates".',
  },
  {
    icon: <FiDollarSign />,
    title: 'Get paid',
    body: 'Free insured label. Paid the day it arrives: cash, or credit at +15%.',
  },
];

export default function Sell() {
  const [sent, setSent] = useState(false);

  return (
    <div className="sell">
      <header className="sell__hero">
        <img className="sell__hero-bg" src={PHOTOS.sportsPile.src} alt="" />
        <div className="container">
          <p className="eyebrow eyebrow--light">Sell to us</p>
          <h1 className="display-hero">
            Your collection,
            <br />
            <span className="foil-text">a fair offer.</span>
          </h1>
          <p className="sell__lede">
            We buy sealed product, binders, singles and graded slabs across Pokémon, One Piece,
            Dragon Ball and sports.
          </p>
        </div>
      </header>

      <div className="container sell__grid">
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="steps__num mono">0{i + 1}</span>
              <span className="steps__icon">{s.icon}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="form-card">
          {sent ? (
            <div className="form-card__done" role="status">
              <span className="form-card__check">
                <FiCheck />
              </span>
              <h2 className="display-md">Quote request received.</h2>
              <p>
                We'll reply within 24 hours with a firm offer. Keep the cards sleeved until then.
              </p>
              <button className="btn btn--dark" onClick={() => setSent(false)}>
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <h2 className="display-md">Request a quote</h2>
              <div className="field-row">
                <label className="field">
                  <span>Name</span>
                  <input required name="name" autoComplete="name" />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input required type="email" name="email" autoComplete="email" />
                </label>
              </div>
              <div className="field-row">
                <label className="field">
                  <span>What are you selling?</span>
                  <select name="franchise" defaultValue="">
                    <option value="" disabled>
                      Choose one
                    </option>
                    {FRANCHISES.map((f) => (
                      <option key={f.slug}>{f.name}</option>
                    ))}
                    <option>Mixed collection</option>
                  </select>
                </label>
                <label className="field">
                  <span>Rough value</span>
                  <select name="value" defaultValue="">
                    <option value="" disabled>
                      Choose one
                    </option>
                    <option>Under $500</option>
                    <option>$500 – $2,500</option>
                    <option>$2,500 – $10,000</option>
                    <option>$10,000+</option>
                  </select>
                </label>
              </div>
              <label className="field">
                <span>Tell us about it</span>
                <textarea
                  name="details"
                  rows={5}
                  required
                  placeholder="e.g. 3 sealed Evolving Skies booster boxes, a binder of 2000s holos, 6 PSA 10 slabs…"
                />
              </label>
              <label className="field field--file">
                <span>Photos (optional)</span>
                <input type="file" name="photos" accept="image/*" multiple />
              </label>
              <button className="btn btn--accent btn--lg btn--block" type="submit">
                Get my offer
              </button>
              <p className="form-card__fine">Demo form. Nothing is sent.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
