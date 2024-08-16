import React from 'react';
import './training.css';
import Shaina from '../../assets/Shaina_West_fitness_shoot-removebg-preview.png'
import { Link } from 'react-router-dom';

const training = () => {
  return (
    <section className="training">
      <div className="training__content">
        <div className="training__text">
          <h1 className="training__title">Why should people choose <span>Our services</span></h1>
          <h2 className="training__subtitle">Personal Training</h2>
          <p className="training__description">
            Step into our virtual-gym and embark on journey.
            to healthier you with the support of personal
            trainers
          </p>
          <h2 className="training__subtitle">Expert Trainer</h2>
          <p className="training__description">
            We have experts who expertise in technique and
            motivation ensuring effective and safe workouts
          </p>
          <Link to="/Membership" className='be'><h3>Become a member now</h3></Link>
        </div>
        <div className="training__image">
          <img src={Shaina} alt="Woman working out" className="training__img" />
        </div> 
      </div>
    </section>
  );
};

export default training;