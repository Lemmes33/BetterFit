import React from 'react';
import './Nutrition.css';

const NutritionCard = ({ imageUrl, title, author, description }) => {
  return (
    <div className="card">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="content">
        <div className="header">{title}</div>
        <div className="meta">By {author}</div>
        <div className="description">{description}</div>
      </div>
    </div>
  );
};

const Nutrition = () => {
  return (
    <div>
      <h1>NUTRIT<span>ION</span> <span>PLAN</span></h1>
     <div className='h3'><h3>Meal planning saves time, reduces stress, and helps maintain a balanced diet by allowing you to make healthier food choices in advance.<br/> It minimizes food waste and supports consistent eating habits, which can aid in weight management. By controlling portion sizes and meal composition, meal planning ,can help<br/> prevent overeating and promote weight loss or maintenance. Additionally, it ensures you have nutritious options readily available, reducing the temptation to opt for unhealthy, high-calorie foods.</h3></div>

    <div className="nutrition-container">
      
      <NutritionCard
        imageUrl="https://i.pinimg.com/564x/bf/47/ab/bf47ab92ec9e228d30da521926bf0d8a.jpg"
        title="Vegan Diet"
        author="Mubanga"
        description="A vegan diet focuses on plant-based foods and excludes all animal products. It's rich in fruits, vegetables, grains, nuts, and seeds, providing essential nutrients and antioxidants. This diet can promote heart health, reduce the risk of chronic diseases, and support weight management. However, it's important to plan meals carefully to ensure adequate intake of protein, iron, calcium, and vitamin B12."
      />
      <NutritionCard
        imageUrl="https://i.pinimg.com/564x/48/ff/38/48ff38738c9f8251a0ce7ecec4d58265.jpg"
        title="Gluten-Free Diet"
        author="Mubanga"
        description="A gluten-free diet eliminates all forms of gluten, a protein found in wheat, barley, and rye. It's essential for individuals with celiac disease or gluten sensitivity. This diet involves eating naturally gluten-free foods like fruits, vegetables, meat, and dairy, as well as gluten-free grains like quinoa and rice. Careful label reading is necessary to avoid hidden gluten in processed foods."
      />
      <NutritionCard
        imageUrl="https://i.pinimg.com/564x/ca/5d/e9/ca5de9e75f0873f3d38f56fddd854b55.jpg"
        title="Protein-Based Diet"
        author="Mubanga"
        description="A protein-based diet emphasizes the intake of protein-rich foods, such as lean meats, fish, eggs, dairy, legumes, and tofu. This diet supports muscle growth, repair, and maintenance, making it popular among athletes and those looking to build lean muscle mass. It can also help with weight management by promoting satiety and reducing overall calorie intake. However, balance is key to avoid excessive saturated fat intake."
      />
    </div>
    </div>
  );
};

export default Nutrition;
