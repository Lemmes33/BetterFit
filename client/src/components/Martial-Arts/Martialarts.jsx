import React from 'react';
import './martialarts.css';

const MartialArts = () => {
  return (
    <section className="martial-hero-section">
      <div className="martial-card-grid">
        <a className="martial-card" href="#">
          <div className="martial-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/564x/47/7b/b6/477bb6d631b460e4aed47d035a94613e.jpg)' }}></div>
          <div className="martial-card__content">
            <p className="martial-card__category">Martial Arts</p>
            <h3 className="martial-card__heading">Karate Training</h3>
            
          </div>
        </a>
        <a className="martial-card" href="#">
          <div className="martial-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/236x/bd/b0/41/bdb041b0169fc462a61ed162fad2b5ca.jpg)' }}></div>
          <div className="martial-card__content">
            <p className="martial-card__category">Martial Arts</p>
            <h3 className="martial-card__heading">Judo Basics</h3>
            
          </div>
        </a>
        <a className="martial-card" href="#">
          <div className="martial-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/564x/e8/08/c6/e808c65fd7d61e4e8852233829a3fcca.jpg)' }}></div>
          <div className="martial-card__content">
            <p className="martial-card__category">Martial Arts</p>
            <h3 className="martial-card__heading">Taekwondo Training</h3>
            
          </div>
        </a>
      </div>
      <div className="martial-info">
        <p>
          Martial arts offer a unique combination of physical fitness, mental discipline, and self-defense skills. Engaging in martial arts training not only improves your strength and flexibility but also enhances your focus and confidence. From traditional techniques to modern combat sports, there's a wide range of styles and practices to explore. Discover the perfect martial art for you and start your journey towards personal growth and fitness today.
        </p>
      </div>
    </section>
  );
};

export default MartialArts;
