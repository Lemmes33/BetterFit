import React from 'react';
import './Programs.css';

const Programs = () => {
  return (
    <div className="wrapper">
      <h1>Our Training Programs</h1>
      <div className="cols">
        {cardData.map((card, index) => (
          <div className="col" key={index} onTouchStart={() => document.querySelector(`#card-${index}`).classList.toggle('hover')}>
            <div className="container" id={`card-${index}`}>
              <div className="front" style={{ backgroundImage: `url(${card.image})` }}>
                <div className="inner">
                  <p>{card.title}</p>
                  <span>{card.subtitle}</span>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>{card.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardData = [
  {
    image: 'https://media.womensweekly.com.sg/public/2023/02/123rf-2.jpg?compress=true&quality=80&w=1080&dpr=2.6',
    title: 'Cardio',
    subtitle: 'High intensity cardio workouts',
    description: 'Engage in various cardio activities to improve your endurance and burn calories.'
  },
  {
    image: 'https://centurymartialarts.com/cdn/shop/files/karate_bf9a9265-2e89-4b33-98af-13da6678fc99.jpg?crop=center&height=1080&v=1679339437&width=1200',
    title: 'Martial Arts',
    subtitle: 'Learn self-defense and discipline',
    description: 'Improve your fitness and mental discipline through martial arts training.'
  },
  {
    image: 'https://miro.medium.com/v2/resize:fit:1400/0*bE477BKlkxgjPjFz',
    title: 'Muscle Toning',
    subtitle: 'Strengthen and tone muscles',
    description: 'Focus on exercises to build and tone your muscles for a strong physique.'
  },
  {
    image: 'https://thecore.balancedbody.com/wp-content/uploads/2021/02/Martin-Reid-Teaser-scaled-e1613418047330.jpeg',
    title: 'Pilates',
    subtitle: 'Core strength and stability',
    description: 'Enhance your core strength and stability through controlled movements.'
  },
  {
    image: 'https://www.sojournsafaris.co.ke/wp-content/uploads/2017/06/DSC3233-1.jpg',
    title: 'Team Building',
    subtitle: 'Group activities for fitness',
    description: 'Engage in group exercises to build camaraderie and teamwork.'
  },
  {
    image: 'https://luna-askmen-images.askmen.com/1080x540/2016/06/23-115444-zumba_classes_for_men.jpg',
    title: 'Zumba',
    subtitle: 'Dance fitness',
    description: 'Join a fun and energetic dance workout to improve your fitness while having fun.'
  },
];

export default Programs;
