import React from 'react';
import './Programs.css';
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx";

const Programs = () => {
  return (
    
    <section className='programs-section'>
      
      <div className="wrapper1">
        <h1>Our Training Programs</h1>
        <h2>
          Embark on your fitness journey with us and discover a range of programs tailored to help you achieve your health and wellness goals. 
          Whether you're a beginner looking to start fresh or an experienced athlete seeking new challenges, 
          our expertly designed programs offer something for everyone. 
          Join us today and take the first step towards a healthier, stronger you!
        </h2>
        <div className="cols1">
          {cardData.map((card, index) => (
            <div className="col1" key={index} onTouchStart={() => document.querySelector(`#card-${index}`).classList.toggle('hover1')}>
              <div className="container1" id={`card-${index}`}>
                <div className="front1" style={{ backgroundImage: `url(${card.image})` }}>
                  <div className="inner1">
                    <p>{card.title}</p>
                    <span>{card.subtitle}</span>
                  </div>
                </div>
                <div className="back1">
                  <div className="inner1">
                    <p>{card.description}</p>
                    <Link to={card.link} className="program-button">
                      More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const cardData = [
  {
    image: 'https://media.womensweekly.com.sg/public/2023/02/123rf-2.jpg?compress=true&quality=80&w=1080&dpr=2.6',
    title: 'Cardio',
    subtitle: 'High intensity cardio workouts',
    description: 'Engage in various cardio activities to improve your endurance and burn calories.',
    link: '/cardio'
  },
  {
    image: 'https://centurymartialarts.com/cdn/shop/files/karate_bf9a9265-2e89-4b33-98af-13da6678fc99.jpg?crop=center&height=1080&v=1679339437&width=1200',
    title: 'Martial Arts',
    subtitle: 'Learn self-defense and discipline',
    description: 'Improve your fitness and mental discipline through martial arts training.',
    link: '/martialarts'
  },
  {
    image: 'https://miro.medium.com/v2/resize:fit:1400/0*bE477BKlkxgjPjFz',
    title: 'Muscle Toning',
    subtitle: 'Strengthen and tone muscles',
    description: 'Focus on exercises to build and tone your muscles for a strong physique.',
    link: '/muscletoning'
  },
  {
    image: 'https://i.pinimg.com/564x/49/21/d7/4921d715c30efe4208d103fc1a65ef60.jpg',
    title: 'Pilates',
    subtitle: 'Core strength and stability',
    description: 'Enhance your core strength and stability through controlled movements.',
    link: '/pilates'
  },
  {
    image: 'https://www.sojournsafaris.co.ke/wp-content/uploads/2017/06/DSC3233-1.jpg',
    title: 'Team Building',
    subtitle: 'Group activities for fitness',
    description: 'Engage in group exercises to build camaraderie and teamwork.',
    link: '/teambuilding'
  },
  {
    image: 'https://luna-askmen-images.askmen.com/1080x540/2016/06/23-115444-zumba_classes_for_men.jpg',
    title: 'Zumba',
    subtitle: 'Dance fitness',
    description: 'Join a fun and energetic dance workout to improve your fitness while having fun.',
    link: '/zumba'
  },
];

export default Programs;
