import React from 'react';
import './SweetPotato.css';

const SweetPotatoCasserole = () => {
  

  return (
    <div className="casserole-recipe-wrapper">
      <section className="casserole-recipe">
        <div className="casserole-image-and-content">
          <div className="casserole-image-container">
            <img
              src="https://i.pinimg.com/564x/56/61/2c/56612c50e58b20add4f4e8ee78995013.jpg"
              alt="Sweet Potato Casserole"
              loading="lazy"
            />
            <figcaption>Photo by Obala's Kitchen</figcaption>
          </div>
          <div className="casserole-content">
            <h1>Sweet Potato Casserole</h1>
            <ul className="casserole-rating">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="casserole-star">
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
              <span className="text_bold">Servings: </span>6 <br />
              <span className="text_bold">Time: </span>1 hour <br />
              <span className="text_bold">Difficulty: </span>Moderate
            </p>
            <div className="casserole-ingredients">
              <h2>Ingredients</h2>
              <ul>
                <li>4 large sweet potatoes, peeled and cubed</li>
                <li>1/2 cup brown sugar</li>
                <li>1/4 cup melted butter</li>
                <li>2 eggs</li>
                <li>1/2 cup milk</li>
                <li>1 teaspoon vanilla extract</li>
                <li>1/2 teaspoon ground cinnamon</li>
                <li>1/4 teaspoon ground nutmeg</li>
                <li>1/2 cup chopped pecans (optional)</li>
                <li>Marshmallows for topping (optional)</li>
              </ul>
            </div>
            <div className="casserole-recipe_steps">
              <h2>Recipe 🧑🏽‍🍳</h2>
              <ol>
                <li>Preheat oven to 350°F (175°C).</li>
                <li>Boil sweet potatoes in a large pot of salted water until tender, about 15 minutes. Drain and mash.</li>
                <li>In a large bowl, mix together the mashed sweet potatoes, brown sugar, melted butter, eggs, milk, vanilla extract, cinnamon, and nutmeg until smooth.</li>
                <li>Transfer the mixture to a greased baking dish. If desired, sprinkle chopped pecans on top.</li>
                <li>Bake for 30 minutes. If using marshmallows, add them during the last 10 minutes of baking and bake until golden brown.</li>
                <li>Remove from oven and let cool slightly before serving. Enjoy!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SweetPotatoCasserole;
