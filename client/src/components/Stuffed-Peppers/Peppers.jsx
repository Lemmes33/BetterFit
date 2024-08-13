import React from 'react';
import './Peppers.css';

const ClassicStuffedPeppers = () => {
  return (
    <div className="stuffed-peppers-recipe-wrapper">
      <section className="stuffed-peppers-recipe">
        <div className="stuffed-peppers-image-and-content">
          <div className="stuffed-peppers-image-container">
            <img
              src="https://i.pinimg.com/564x/40/76/b8/4076b84660a4353b9053febe21aee886.jpg" // Replace with actual image URL
              alt="Classic Stuffed Peppers"
              loading="lazy"
            />
            <figcaption>Obala's Kitchen</figcaption>
          </div>
          <div className="stuffed-peppers-content">
            <h1>Classic Stuffed Peppers</h1>
            <ul className="stuffed-peppers-rating">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="stuffed-peppers-star">
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
              <span className="text_bold">Time: </span>45 minutes <br />
              <span className="text_bold">Difficulty: </span>Medium
            </p>
            <div className="stuffed-peppers-ingredients">
              <h2>Ingredients</h2>
              <ul>
                <li>4 large bell peppers</li>
                <li>1 pound ground beef</li>
                <li>1 cup cooked rice</li>
                <li>1 can diced tomatoes</li>
                <li>1 small onion, chopped</li>
                <li>2 cloves garlic, minced</li>
                <li>1 teaspoon dried oregano</li>
                <li>1 teaspoon dried basil</li>
                <li>1 cup shredded cheese (cheddar or mozzarella)</li>
                <li>Salt and pepper to taste</li>
              </ul>
            </div>
            <div className="stuffed-peppers-recipe_steps">
              <h2>Recipe 🧑🏽‍🍳</h2>
              <ol>
                <li>Preheat oven to 375°F (190°C).</li>
                <li>Cut the tops off the bell peppers and remove seeds and membranes.</li>
                <li>In a skillet, cook ground beef with onion and garlic until browned. Drain excess fat.</li>
                <li>Add diced tomatoes, cooked rice, oregano, basil, salt, and pepper to the beef. Stir to combine.</li>
                <li>Stuff the bell peppers with the beef mixture and place them upright in a baking dish.</li>
                <li>Top each pepper with shredded cheese.</li>
                <li>Bake in the preheated oven for 30-35 minutes, until peppers are tender and cheese is melted and bubbly.</li>
                <li>Serve hot and enjoy!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClassicStuffedPeppers;
