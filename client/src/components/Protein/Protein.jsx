import React from 'react';
import './Protein.css';

const Protein = () => {
  return (
    <div className="card-grid">
      <div className="food-card">
        <img
          className="food-card__image"
          src="https://i.pinimg.com/236x/74/37/ac/7437ac9bfc666fc0e7d6f97c0d129542.jpg"
          alt="Tofu Dish"
        />
        <div className="food-card__details">
          <h1 className="food-card__title">Chicken Cordon Bleu</h1>
          <div className="food-card__text-container">
          <p className="food-card__description">
            Chicken Cordon Bleu features <strong>juicy</strong> chicken stuffed with <strong>ham</strong> and melted cheese, offering a rich and delightful flavor in every bite.
          </p>

          </div>
          <button className="food-card__action-btn">
            Explore <span>&rarr;</span>
          </button>
        </div>
      </div>

      <div className="food-card">
        <img
          className="food-card__image"
          src="https://i.pinimg.com/564x/57/58/f3/5758f3d7f680ceda79c131eaab6ffa0a.jpg"
          alt="Cauliflower Wraps"
        />
        <div className="food-card__details">
          <h1 className="food-card__title">Spinach Feta Steak Pinwheels</h1>
          <div className="food-card__text-container">
          <p className="food-card__description">
             Spinach feta steak pinwheels combine <strong>tender</strong> steak with <strong>savory</strong> spinach and feta, wrapped to create a flavorful and satisfying dish.
          </p>

          </div>
          <button className="food-card__action-btn">
            Explore <span>&rarr;</span>
          </button>
        </div>
      </div>

      <div className="food-card">
        <img
          className="food-card__image"
          src="https://i.pinimg.com/564x/bd/7e/08/bd7e08891164f456db627eebaad5fa2f.jpg"
          alt="Vegetable Salad"
        />
        <div className="food-card__details">
          <h1 className="food-card__title">Bean salad with beef</h1>
          <div className="food-card__text-container">
          <p className="food-card__description">
             Bean salad offers a <strong>crunchy</strong> mix of beans and fresh veggies with a <strong>tangy</strong> dressing, making it a nutritious and satisfying meal.
          </p>

          </div>
          <button className="food-card__action-btn">
            Explore <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Protein;
