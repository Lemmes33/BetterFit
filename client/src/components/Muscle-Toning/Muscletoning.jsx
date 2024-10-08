import React from 'react';
import './muscletoning.css';

const MuscleToning = () => {
  return (
    <section className="muscle-hero-section">
      <div className="muscle-card-grid">
        <a className="muscle-card" href="#">
          <div className="muscle-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/564x/38/2b/f9/382bf900baa6f00bceb7d0090edb142a.jpg)' }}></div>
          <div className="muscle-card__content">
            <p className="muscle-card__category">Muscle Toning</p>
            <h3 className="muscle-card__heading">Strength Training</h3>
            
          </div>
        </a>
        <a className="muscle-card" href="#">
          <div className="muscle-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/236x/f7/d1/06/f7d10613a54e7fd59c26e88ecdbecf20.jpg)' }}></div>
          <div className="muscle-card__content">
            <p className="muscle-card__category">Muscle Toning</p>
            <h3 className="muscle-card__heading">Bodyweight Exercises</h3>
            
          </div>
        </a>
        <a className="muscle-card" href="#">
          <div className="muscle-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/236x/a5/23/d6/a523d6aa20f051b73107ee31353b4107.jpg)' }}></div>
          <div className="muscle-card__content">
            <p className="muscle-card__category">Muscle Toning</p>
            <h3 className="muscle-card__heading">Resistance Band Workouts</h3>
            
          </div>
        </a>
      </div>
      <div className="muscle-info">
        <p>
          Muscle toning exercises are essential for building strength and improving endurance. Incorporating a variety of workouts, including strength training, bodyweight exercises, and resistance band workouts, can help enhance muscle definition and overall fitness. Consistent training and proper nutrition are key to achieving and maintaining muscle tone. Explore different methods to find what works best for you and stay committed to your fitness journey.
        </p>
      </div>
    </section>
  );
};

export default MuscleToning;
