import React from 'react';
import './Pilates.css';

const Pilates = () => {
  return (
    <section className="pilates-hero-section">
      <div className="pilates-card-grid">
        <a className="pilates-card" href="#">
          <div className="pilates-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/564x/70/24/b3/7024b3d2cc1b89e16e5e696eae3bb601.jpg)' }}></div>
          <div className="pilates-card__content">
            <p className="pilates-card__category">Pilates</p>
            <h3 className="pilates-card__heading">Core Strength</h3>
            <button className="pilates-card__button">More</button>
          </div>
        </a>
        <a className="pilates-card" href="#">
          <div className="pilates-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/236x/d8/a7/23/d8a723d8a784c23322261fb8b439c53b.jpg)' }}></div>
          <div className="pilates-card__content">
            <p className="pilates-card__category">Pilates</p>
            <h3 className="pilates-card__heading">Flexibility Training</h3>
            <button className="pilates-card__button">More</button>
          </div>
        </a>
        <a className="pilates-card" href="#">
          <div className="pilates-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/236x/4f/8a/73/4f8a73f89e9c28584de53a1b52fe087d.jpg)' }}></div>
          <div className="pilates-card__content">
            <p className="pilates-card__category">Pilates</p>
            <h3 className="pilates-card__heading">Balance and Stability</h3>
            <button className="pilates-card__button">More</button>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Pilates;
