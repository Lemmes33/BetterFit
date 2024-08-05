// Nutrition.jsx
import React from 'react';
import Dishes from './Dishes'; // Make sure the path is correct based on your file structure
import './Nutrition.css';

const Nutrition = () => {
  return (
    <div>
      <h1>NUTRITION PLAN</h1>
      <div className="infobox">
      <h2></h2>
      <p><h3>Embarking on a gym journey can be significantly enhanced by embracing our healthy meal plan. Designed to complement your fitness goals, our meal plan provides balanced and nutritious options that fuel your workouts and aid in recovery. By enjoying a variety of wholesome foods that support muscle growth, boost energy, and improve overall performance, you'll find that reaching your fitness targets becomes more attainable and enjoyable. Our meal plan is crafted to ensure that you not only meet your dietary needs but also savor every bite, making your fitness journey both rewarding and delicious. Embrace our healthy meal plan to fuel your progress and achieve your gym goals with enthusiasm and vitality.</h3></p>
      
    </div>
      <Dishes />
    </div>
  );
}

export default Nutrition;
