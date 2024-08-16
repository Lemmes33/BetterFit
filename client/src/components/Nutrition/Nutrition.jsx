import React from 'react';
import { Link } from "react-router-dom";
import './Nutrition.css';

const NutriPlannerCard = ({ imageUrl, title, author, description, route }) => {
  return (
    <>
    
    <div className="nutriPlanner-card">
    <button className="back-button1">
          <Link to="/" className="backbutton1">Back</Link>
        </button>
      <div
        className="nutriPlanner-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="nutriPlanner-content">
        <div className="nutriPlanner-header">{title}</div>
        <div className="nutriPlanner-meta">By {author}</div>
        <div className="nutriPlanner-description">{description}</div>
        <Link to={route}>
          <button className="card-button">More</button>
        </Link>
      </div>
    </div>
    </>
  );
};

const NutriPlanner = () => {
  return (
    <section className="nutriPlanner-section">
      <h1>
        <span className='span1'>NUTRITION</span> <span className='span2'>PLAN</span>
      </h1>
      <div className="nutriPlanner-intro">
        <h3>
          Meal planning saves time, reduces stress, and helps maintain a balanced diet by allowing you to make healthier food choices in advance.
          <br />
          
        </h3>
      </div>
      <div className="nutriPlanner-container">
        <NutriPlannerCard
          imageUrl="https://i.pinimg.com/564x/bf/47/ab/bf47ab92ec9e228d30da521926bf0d8a.jpg"
          title="Vegan Diet"
          author="Oballa"
          description="A vegan diet focuses on plant-based foods and excludes all animal products. It's rich in fruitsand vegetables. This diet can promote heart health, reduce the risk of chronic diseases, and support weight management. ."
          route="/vegan"
        />
        
        <NutriPlannerCard
          imageUrl="https://i.pinimg.com/564x/48/ff/38/48ff38738c9f8251a0ce7ecec4d58265.jpg"
          title="Gluten-Free Diet"
          author="Oballa"
          description="A gluten-free diet eliminates all forms of gluten, a protein found in wheat, barley, and rye. This diet involves eating naturally gluten-free foods like fruits, vegetables, meat, and dairy, as well as gluten-free grains like quinoa and rice. "
          route="/gluten"
        />
        <NutriPlannerCard
          imageUrl="https://i.pinimg.com/564x/ca/5d/e9/ca5de9e75f0873f3d38f56fddd854b55.jpg"
          title="Protein-Based Diet"
          author="Oballa"
          description="A protein-based diet focuses on protein-rich foods like lean meats, fish, eggs, dairy, legumes, and tofu. It's popular for supporting muscle growth and aiding in weight management by promoting fullness and reducing calorie intake. "
          route="/protein"
        />
      </div>
    </section>
  );
};

export default NutriPlanner;
