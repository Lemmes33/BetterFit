import React from 'react';
import Payment from './components/Payments/payment';
import Footer from './components/Footer/Footer';
import Training from './components/PersonalTraining/Training';
import Home from './components/Home/Home'
import Trainers from './components/Trainers/Trainers';
import Nutrition from './components/Nutrition/Nutrition'
import Programs from './components/Programs/Programs'


import './App.css'; // Import stylesheet

function App() {
  return (
    <div className="App">
      <section id="home"><Home /></section>
      <section id="programs"><Programs /></section>
      <section id="training"><Training /></section>
     
      <section id="nutrition"><Nutrition /></section>
      <section id="payment"><Payment /></section>
      <section id="trainers"><Trainers /></section>
      
    </div>
  );
}

export default App;
