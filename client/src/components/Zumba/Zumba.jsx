import React from 'react';
import './Zumba.css';

const Zumba = () => {
  return (
    <section className="zumba-hero-section">
      <div className="zumba-card-grid">
        <a className="zumba-card" href="#">
          <div className="zumba-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/236x/4d/40/45/4d40457efe8c8d34f3ac00a6575d767b.jpg)' }}></div>
          <div className="zumba-card__content">
            <p className="zumba-card__category">Zumba</p>
            <h3 className="zumba-card__heading">Dance Fitness</h3>
            
          </div>
        </a>
        <a className="zumba-card" href="#">
          <div className="zumba-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/474x/9e/d8/97/9ed8975a6536117afd000685375a3445.jpg)' }}></div>
          <div className="zumba-card__content">
            <p className="zumba-card__category">Zumba</p>
            <h3 className="zumba-card__heading">Cardio Dance</h3>
            
          </div>
        </a>
        <a className="zumba-card" href="#">
          <div className="zumba-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/236x/59/85/c2/5985c2349753359b130df12f31293202.jpg)' }}></div>
          <div className="zumba-card__content">
            <p className="zumba-card__category">Zumba</p>
            <h3 className="zumba-card__heading">Latin Dance</h3>
            
          </div>
        </a>
      </div>
      <div className="zumba-paragraph">
        <p>
          Zumba combines dance and fitness to create a fun and effective workout. With its energetic moves and rhythms, it helps improve cardiovascular health, build endurance, and boost mood. Perfect for all fitness levels, Zumba classes offer a lively and engaging way to stay active and burn calories. Join the rhythm and experience the joy of dance while getting fit and healthy.
        </p>
      </div>
    </section>
  );
};

export default Zumba;
