import React from 'react';
import './Bean.css';

const BeanSalad = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Recipe for Bean Salad with Beef clicked');
  };

  return (
    <div className="bean-recipe-wrapper">
      <section className="bean-recipe">
        <div className="bean-image-and-content">
          <div className="bean-image-container">
            <img
              src="https://i.pinimg.com/236x/bd/7e/08/bd7e08891164f456db627eebaad5fa2f.jpg"
              alt="Bean Salad with Beef"
              loading="lazy"
            />
            <figcaption>Photo by El'chefe Obala</figcaption>
          </div>
          <div className="bean-content">
            <h1>Bean Salad with Beef</h1>
            <ul className="bean-rating">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="bean-star">
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
              <span className="bean-text_bold">Servings: </span>4 <br />
              <span className="bean-text_bold">Time: </span>30 minutes <br />
              <span className="bean-text_bold">Difficulty: </span>Medium
            </p>
            <div className="bean-ingredients">
              <h2>Ingredients</h2>
              <ul>
                <li>1 cup mixed beans, drained and rinsed</li>
                <li>200g beef, thinly sliced</li>
                <li>1 tablespoon olive oil</li>
                <li>1 clove garlic, minced</li>
                <li>1 red bell pepper, chopped</li>
                <li>1 small onion, chopped</li>
                <li>1 tablespoon balsamic vinegar</li>
                <li>Salt and pepper to taste</li>
                <li>Fresh parsley for garnish</li>
              </ul>
            </div>
            <div className="bean-recipe_steps">
              <h2>Recipe 🧑🏽‍🍳</h2>
              <ol>
                <li>Heat olive oil in a pan over medium heat. Add beef and cook until browned. Remove and set aside.</li>
                <li>Add garlic, onion, and bell pepper to the pan. Sauté until vegetables are softened.</li>
                <li>Add mixed beans to the pan and cook for 3-4 minutes.</li>
                <li>Return the beef to the pan and add balsamic vinegar. Stir well to combine.</li>
                <li>Season with salt and pepper to taste.</li>
                <li>Serve warm, garnished with fresh parsley. Enjoy!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BeanSalad;
