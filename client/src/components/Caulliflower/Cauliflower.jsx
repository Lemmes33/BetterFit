import React from 'react';
import './Cauliflower.css';

const Cauliflower = () => {
  const handleClick = (e) => {
    e.preventDefault();
    // Add your click handling logic here
    console.log('Recipe for Cauliflower clicked');
  };

  return (
    <div className="cauliflower-wrapper">
      <section className="cauliflower-recipe">
        <div className="cauliflower-image-and-content">
          <div className="cauliflower-image-container">
            <img
              src="https://assets.codepen.io/652/shania-pinnata-7E-vKgzahd8-unsplash.jpg"
              alt="Spaghetti with pesto sauce and cherry tomatoes"
              loading="lazy"
            />
            <figcaption>Photo by Obala Le Chef Steve</figcaption>
          </div>
          <div className="cauliflower-content">
            <h1>Cauliflower with Pesto and Tomatoes</h1>
            <ul className="cauliflower-rating">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="cauliflower-star">
                  <svg
                    height="19px"
                    width="19px"
                    viewBox="0 -10 511.98685 511"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
                      fill="#ffc107"
                    />
                  </svg>
                </li>
              ))}
            </ul>
            <p>
              <span className="cauliflower-text_bold">Servings: </span>4 <br />
              <span className="cauliflower-text_bold">Time: </span>20 minutes <br />
              <span className="cauliflower-text_bold">Difficulty: </span>Easy
            </p>
            <div className="cauliflower-ingredients">
              <h2>Ingredients</h2>
              <ul>
                <li>1 head of cauliflower, cut into florets</li>
                <li>2 tablespoons olive oil</li>
                <li>1 teaspoon salt</li>
                <li>1/2 teaspoon black pepper</li>
                <li>1/2 cup pesto sauce</li>
                <li>1/4 cup grated Parmesan cheese</li>
                <li>1/2 cup cherry tomatoes, halved</li>
                <li>Fresh basil for garnish</li>
              </ul>
            </div>
            <div className="cauliflower-recipe_steps">
              <h2>Recipe 🧑🏽‍🍳</h2>
              <ol>
                <li>Preheat oven to 400°F (200°C).</li>
                <li>Toss cauliflower florets with olive oil, salt, and pepper.</li>
                <li>Spread on a baking sheet and roast for 25-30 minutes until tender and golden.</li>
                <li>In a large bowl, combine roasted cauliflower with pesto sauce, cherry tomatoes, and Parmesan cheese.</li>
                <li>Garnish with fresh basil and serve warm.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cauliflower;
