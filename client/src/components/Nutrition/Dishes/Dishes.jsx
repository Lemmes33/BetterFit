import React from 'react';
import './Dishes.css';

// Array of card objects
const cards = [
  { title: 'Gluten free vegan palmeni', copy: 'These gluten free vegan palmeni are a yummy twist on a russian classic, easily made by egg free dough and mushroom spinach filling', button: 'Try Now' },
  { title: 'Chick-pea flour pancakes', copy: 'These are increadibly fluffy and yummy, served with maple syrup. They are perfect for a weekend breakfast or brunch.', button: 'Try Now' },
  { title: 'Roasted sweat potatoe', copy: 'A perfect everyday bowl packed with flavor fresh ingredients and nutrition, made with massaged kale, sauteed spicy chickpeas and roasted potatoes and a drizzle of lemon-tahini dressing', button: 'Try Now' },
  { title: 'Smoothies', copy: 'A refreshing smoothie packed with nutritious ingredients, featuring mango, spinach, and Greek yogurt. Sweetened with honey and blended with coconut water, it’s topped with chia seeds and granola for a tasty, healthy boost', button: 'Try Now' }
];

// Dishes component
const Dishes = ({ title, copy, button }) => (
  <div className="card">
    <div className="content">
      <h2 className="title">{title}</h2>
      <p className="copy">{copy}</p>
      <button className="btn">{button}</button>
    </div>
  </div>
);

// Main component to render the dishes
const Cardio = () => (
  <main className="page-content">
    {cards.map((card, index) => (
      <Dishes key={index} title={card.title} copy={card.copy} button={card.button} />
    ))}
  </main>
);

export default Cardio;
