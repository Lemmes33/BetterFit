import React from 'react';
import './Tofu .css';

const Tofu = () => {
  const handleClick = (e) => {
    e.preventDefault();
    // Add your click handling logic here
    console.log('Recipe for Tofu clicked');
  };

  return (
    <div className="recipe-wrapper">
      <section className="recipe">
        <div className="image-and-content">
          <div className="image-Tofu">
            <img
              src="https://assets.codepen.io/652/shania-pinnata-7E-vKgzahd8-unsplash.jpg"
              alt="Spaghetti with pesto sauce and cherry tomatoes"
              loading="lazy"
            />
            <figcaption>Photo by Obala Le Chef Steve</figcaption>
          </div>
          <div className="content">
            <h1>Tofu with Pesto and Tomatoes</h1>
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
              <span className="text_bold">Time: </span>20 minutes <br />
              <span className="text_bold">Difficulty: </span>Easy
            </p>
            <div className="ingredients">
              <h2>Ingredients</h2>
              <ul>
                <li>1 block of firm tofu, drained and cubed</li>
                <li>2 tablespoons soy sauce</li>
                <li>1 tablespoon sesame oil</li>
                <li>2 cloves garlic, minced</li>
                <li>1 tablespoon ginger, minced</li>
                <li>1 tablespoon cornstarch</li>
                <li>1 bell pepper, sliced</li>
                <li>1 cup broccoli florets</li>
                <li>2 tablespoons hoisin sauce</li>
                <li>2 green onions, chopped</li>
                <li>Cooked rice or noodles for serving</li>
              </ul>
            </div>
            <div className="recipe_steps">
              <h2>Recipe 🧑🏽‍🍳</h2>
              <ol>
                <li>Press tofu to remove excess moisture, then cut into cubes.</li>
                <li>In a bowl, toss tofu with cornstarch until evenly coated.</li>
                <li>Heat sesame oil in a pan over medium heat. Add tofu and cook until golden brown on all sides. Remove and set aside.</li>
                <li>Add garlic and ginger to the same pan and cook until fragrant.</li>
                <li>Add bell pepper and broccoli to the pan, stir-fry until vegetables are tender-crisp.</li>
                <li>Return tofu to the pan and add soy sauce and hoisin sauce. Stir well to combine.</li>
                <li>Cook for an additional 2-3 minutes, then garnish with green onions.</li>
                <li>Serve hot over cooked rice or noodles. Enjoy!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Tofu;
