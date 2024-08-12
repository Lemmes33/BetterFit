import React from 'react';
import './Gluten .css';

const Gluten = () => {
  return (
    <div className="food-card-grid">
      <div className="food-item">
        <img
          className="food-item__image"
          src="https://i.pinimg.com/564x/a0/92/7f/a0927ffa213c67f70a31e1560a3ac2a7.jpg"
          alt="Chicken Cordon Bleu"
        />
        <div className="food-item__details">
          <h1 className="food-item__title">Feta & Herb-Crusted Salmon</h1>
          <div className="food-item__description-container">
          <p className="food-item__description">
             Feta & Herb-Crusted Salmon features a <strong>tender</strong> fillet topped with a <strong>crispy</strong> feta and herb crust, offering a flavorful and satisfying seafood experience.
          </p>

          </div>
          <Link to="/">
            Explore <span>&rarr;</span>
          </Link>
        </div>
      </div>

      <div className="food-item">
        <img
          className="food-item__image"
          src="https://i.pinimg.com/564x/05/44/2b/05442b76271ceb121fe75772e1f978a6.jpg"
          alt="Spinach Feta Steak Pinwheels"
        />
        <div className="food-item__details">
          <h1 className="food-item__title">Chili Cheese Sweet Potato Casserole</h1>
          <div className="food-item__description-container">
          <p className="food-item__description">
             Chili Cheese Sweet Potato Casserole combines <strong>creamy</strong> sweet potatoes with <strong>spicy</strong> chili and melted cheese, creating a hearty and deliciously comforting dish.
          </p>

          </div>
          <button className="food-item__action-btn">
            Explore <span>&rarr;</span>
          </button>
        </div>
      </div>

      <div className="food-item">
        <img
          className="food-item__image"
          src="https://i.pinimg.com/564x/3a/02/6f/3a026f3a1dbdd54c9ab22d7175ca2641.jpg"
          alt="Bean Salad with Beef"
        />
        <div className="food-item__details">
          <h1 className="food-item__title">Classic Stuffed Peppers</h1>
          <div className="food-item__description-container">
          <p className="food-item__description">
             Classic Stuffed Peppers feature <strong>tender</strong> bell peppers filled with a <strong>flavorful</strong> mix of seasoned meat, rice, and vegetables, offering a hearty and satisfying meal.
         </p>

          </div>
          <button className="food-item__action-btn">
            Explore <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gluten;
