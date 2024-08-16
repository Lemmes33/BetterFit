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
            
          </div>
        </a>
        <a className="pilates-card" href="#">
          <div className="pilates-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/236x/d8/a7/23/d8a723d8a784c23322261fb8b439c53b.jpg)' }}></div>
          <div className="pilates-card__content">
            <p className="pilates-card__category">Pilates</p>
            <h3 className="pilates-card__heading">Flexibility Training</h3>
            
          </div>
        </a>
        <a className="pilates-card" href="#">
          <div className="pilates-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/236x/4f/8a/73/4f8a73f89e9c28584de53a1b52fe087d.jpg)' }}></div>
          <div className="pilates-card__content">
            <p className="pilates-card__category">Pilates</p>
            <h3 className="pilates-card__heading">Balance and Stability</h3>
            
          </div>
        </a>
      </div>
      <div className="pilates-info">
        <p>
          Pilates is a fantastic way to enhance core strength, flexibility, and overall balance. 
          By incorporating various exercises into your routine, you can improve your posture, 
          increase your flexibility, and build a strong, stable core. Whether you are looking to 
          alleviate back pain or enhance your athletic performance, Pilates offers a range of 
          exercises suited for all levels. Discover how Pilates can transform your fitness journey.
        </p>
      </div>
    </section>
  );
};

export default Pilates;
