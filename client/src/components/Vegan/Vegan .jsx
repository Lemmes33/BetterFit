import React from 'react';
import './Vegan.css';

const Vegan = () => {
  return (
    <div className="grid">
      <div className="card">
        <img
          className="card__img"
          src="https://i.pinimg.com/736x/ac/b4/71/acb47114ee47b39674b7173ca92b8f48.jpg"
          alt="Snowy Mountains"
        />
        <div className="card__content">
          <h1 className="card__header">Tofu</h1>
          <div className="card__text-wrapper">
          <p className="card__text">
                Tofu, a <strong>versatile</strong> plant-based protein, is truly something much more than just an ingredient. It can absorb a wide variety of flavors and is a staple in many healthy, delicious meals.
           </p>

          </div>
          <button className="card__btn">
            Explore <span>&rarr;</span>
          </button>
        </div>
      </div>

      <div className="card">
        <img
          className="card__img"
          src="https://i.pinimg.com/564x/24/55/a5/2455a531bf726822aa5a6011b3fbf0f6.jpg"
          alt="Desert"
        />
        <div className="card__content">
          <h1 className="card__header">Roasted Cauliflower-wraps</h1>
          <div className="card__text-wrapper">
          <p className="card__text">
             Roasted cauliflower wraps deliver a <strong>crisp</strong> and <strong>flavorful</strong> bite. Tender cauliflower in a soft tortilla provides a satisfying crunch and boosts your health.
          </p>


          </div>
          <button className="card__btn">
            Explore <span>&rarr;</span>
          </button>
        </div>
      </div>

      <div className="card">
        <img
          className="card__img"
          src="https://i.pinimg.com/564x/b8/15/18/b8151873e00d80c631191a180f41760e.jpg"
          alt="Canyons"
        />
        <div className="card__content">
          <h1 className="card__header">Vegetable salad</h1>
          <div className="card__text-wrapper">
          <p className="card__text">
            Vegetable salad features a <strong>crisp</strong> mix of fresh veggies and a <strong>zesty</strong> dressing, offering a light and nutritious meal option to get you healthy and in shape.
          </p>



          </div>
          <button className="card__btn">
            Explore <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vegan;
