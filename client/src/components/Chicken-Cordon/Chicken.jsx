import React from 'react';
import './Chicken.css';

const ChickenCordonBleu = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Recipe for Chicken Cordon Bleu clicked');
  };

  return (
    <div className="chicken-cordon-bleu-wrapper">
      <section className="chicken-cordon-bleu">
        <div className="chicken-cordon-bleu-image-and-content">
          <div className="chicken-cordon-bleu-image-container">
            <img
              src="https://i.pinimg.com/236x/ab/42/b2/ab42b2877b3ef58f1490d110fbdf7671.jpg"
              alt="Chicken Cordon Bleu"
              loading="lazy"
            />
            <figcaption>Photo by Obala's Kitchen</figcaption>
          </div>
          <div className="chicken-cordon-bleu-content">
            <h1>Chicken Cordon Bleu</h1>
            <ul className="chicken-cordon-bleu-rating">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="chicken-cordon-bleu-star">
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
            <div className="chicken-cordon-bleu-ingredients">
              <h2>Ingredients</h2>
              <ul>
                <li>4 chicken breasts, pounded thin</li>
                <li>4 slices ham</li>
                <li>4 slices Swiss cheese</li>
                <li>1 cup breadcrumbs</li>
                <li>1/2 cup flour</li>
                <li>2 eggs, beaten</li>
                <li>Salt and pepper to taste</li>
                <li>1 tablespoon olive oil</li>
                <li>1 tablespoon butter</li>
              </ul>
            </div>
            <div className="chicken-cordon-bleu-steps">
              <h2>Recipe 🧑🏽‍🍳</h2>
              <ol>
                <li>Preheat the oven to 350°F (175°C).</li>
                <li>Season chicken breasts with salt and pepper.</li>
                <li>Place a slice of ham and a slice of cheese on each chicken breast, then roll up tightly.</li>
                <li>Dredge each chicken roll in flour, dip in beaten eggs, and coat with breadcrumbs.</li>
                <li>Heat olive oil and butter in a pan over medium heat. Brown the chicken rolls on all sides.</li>
                <li>Transfer the chicken to a baking dish and bake for 20-25 minutes, until cooked through.</li>
                <li>Let rest for a few minutes before slicing. Serve hot with your favorite sides. Enjoy!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChickenCordonBleu;
