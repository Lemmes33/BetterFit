import React from 'react';
import './Cardio.css';

const Cardio = () => {
  return (
    <section className="cardio-hero-section">
      <div className="cardio-card-grid">
        <a className="cardio-card" href="#">
          <div className="cardio-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/736x/a1/48/b8/a148b89a7ff86660e8c8bdcd2a3f0f00.jpg)' }}></div>
          <div className="cardio-card__content">
            <p className="cardio-card__category">Cardio</p>
            <h3 className="cardio-card__heading">High-Intensity Workout</h3>
            
          </div>
        </a>
        <a className="cardio-card" href="#">
          <div className="cardio-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/564x/ec/1b/b5/ec1bb56b49f2f6df17124d86eb848a6e.jpg)' }}></div>
          <div className="cardio-card__content">
            <p className="cardio-card__category">Cardio</p>
            <h3 className="cardio-card__heading">Running for Fitness</h3>
            
          </div>
        </a>
        <a className="cardio-card" href="#">
          <div className="cardio-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/564x/c6/cc/51/c6cc51ff490c8d89f34a66ea745e459b.jpg)' }}></div>
          <div className="cardio-card__content">
            <p className="cardio-card__category">Cardio</p>
            <h3 className="cardio-card__heading">Cycling Adventures</h3>
            
          </div>
        </a>
      </div>
      <div className="cardio-paragraph">
        <p>
          Cardio workouts are crucial for improving cardiovascular health and increasing overall fitness levels. Engaging in high-intensity interval training, running, or cycling can boost your endurance, help with weight management, and enhance mental well-being. Incorporate these activities into your routine to experience significant health benefits and achieve your fitness goals more effectively. Remember to stay hydrated and consult a fitness professional to tailor workouts to your individual needs.
        </p>
      </div>
    </section>
  );
};

export default Cardio;
