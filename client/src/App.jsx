import React from 'react';
import Payment from './components/Payments/payment';
import Footer from './components/Footer/Footer';
import Training from './components/PersonalTraining/Training';
import Home from './components/Home/Home'
import Trainers from './components/Trainers/Trainers';
import Programs from './components/Programs/Programs'
import './App.css'; // Import stylesheet

function App() {
  return (
    <div className="App">
      <section id="home"><Home /></section>
      <section id="programs"><Programs /></section>
      <section id="training"><Training /></section>
      <section id="trainers"><Trainers /></section>
      <section id="payment"><Payment /></section>
      
      <section id="footer"><Footer /></section>
    </div>
  );
}

export default App;
