import React from 'react';
import './Vegetable.css';

const VegetableSalad = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Recipe for Vegetable Salad clicked');
  };

  return (
    <div className="vegetable-salad-wrapper">
      <section className="vegetable-salad">
        <div className="vegetable-image-and-content">
          <div className="vegetable-image-container">
            <img
              src="https://i.pinimg.com/736x/7c/0e/41/7c0e41d2f6a129ed95a485d58800a248.jpg"
              alt="Fresh vegetable salad"
              loading="lazy"
            />
            <figcaption>Photo by Chef Salad Master</figcaption>
          </div>
          <div className="vegetable-content">
            <h1>Fresh Vegetable Salad</h1>
            <ul className="vegetable-rating">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="vegetable-star">
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
              <span className="text_bold">Time: </span>15 minutes <br />
              <span className="text_bold">Difficulty: </span>Easy
            </p>
            <div className="vegetable-ingredients">
              <h2>Ingredients</h2>
              <ul>
                <li>1 cucumber, sliced</li>
                <li>1 bell pepper, chopped</li>
                <li>1 cup cherry tomatoes, halved</li>
                <li>1 red onion, thinly sliced</li>
                <li>1/4 cup olive oil</li>
                <li>2 tablespoons vinegar</li>
                <li>Salt and pepper to taste</li>
                <li>Fresh herbs like parsley or basil</li>
              </ul>
            </div>
            <div className="vegetable-recipe-steps">
              <h2>Recipe 🧑🏽‍🍳</h2>
              <ol>
                <li>Combine all the vegetables in a large bowl.</li>
                <li>In a small bowl, whisk together olive oil, vinegar, salt, and pepper.</li>
                <li>Pour the dressing over the vegetables and toss well to coat.</li>
                <li>Garnish with fresh herbs before serving.</li>
                <li>Serve immediately or chill in the refrigerator before serving. Enjoy!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VegetableSalad;
