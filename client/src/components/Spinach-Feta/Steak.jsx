import React from 'react';
import './Steak.css';

const SpinachFetaSteak = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Recipe for Spinach Feta Steak clicked');
  };

  return (
    <div className="recipe-wrapper">
      <section className="recipe">
        <div className="image-and-content">
          <div className="image-container">
            <img
              src="https://i.pinimg.com/564x/ac/52/4d/ac524d5215aac932f89dc8e1287cac1e.jpg" // Replace with the actual image URL
              alt="Spinach Feta Steak"
              loading="lazy"
            />
            <figcaption>Photo by Oballa's Kitchen</figcaption>
          </div>
          <div className="content">
            <h1>Spinach Feta Steak</h1>
            <ul className="rating">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="star">
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
              <span className="text_bold">Servings: </span>4 <br />
              <span className="text_bold">Time: </span>30 minutes <br />
              <span className="text_bold">Difficulty: </span>Medium
            </p>
            <div className="ingredients">
              <h2>Ingredients</h2>
              <ul>
                <li>4 steak fillets</li>
                <li>1 cup fresh spinach leaves</li>
                <li>1/2 cup crumbled feta cheese</li>
                <li>2 tablespoons olive oil</li>
                <li>2 cloves garlic, minced</li>
                <li>Salt and pepper to taste</li>
                <li>1 teaspoon dried oregano</li>
                <li>1 lemon, cut into wedges</li>
              </ul>
            </div>
            <div className="recipe_steps">
              <h2>Recipe 🧑🏽‍🍳</h2>
              <ol>
                <li>Season the steak fillets with salt, pepper, and oregano.</li>
                <li>Heat olive oil in a pan over medium heat. Add minced garlic and cook until fragrant.</li>
                <li>Add the steak fillets to the pan and cook to your desired level of doneness.</li>
                <li>Remove the steaks from the pan and set aside.</li>
                <li>In the same pan, sauté the spinach until wilted, then stir in the crumbled feta cheese.</li>
                <li>Top each steak with the spinach and feta mixture.</li>
                <li>Serve hot with lemon wedges on the side. Enjoy!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SpinachFetaSteak;
