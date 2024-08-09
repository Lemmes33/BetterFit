import React from 'react';
import './trainers.css'
import Footer from '../Footer/Footer'


const trainers = [
  {
    name: 'Mary Jane',
    title: 'Zumba Instructor',
    image: 'https://i.pinimg.com/564x/fe/4e/65/fe4e659f1aa84bc93c0cc6ab0e477bbe.jpg',
    socialLink: '#',
    socialIcon: <i className="fa-brands fa-facebook-f"></i>,
  },
  {
    name: 'Walter Black',
    title: 'Boxing Instructor',
    image: 'https://i.pinimg.com/564x/0d/e9/46/0de946a65460be4c0ba675e1f280807c.jpg',
    socialLink: '#',
    socialIcon: <i className="fa-brands fa-x-twitter"></i>,
  },
  // Add more trainer objects following the same structure
  {
    name: 'Joseph Koige',
    title: 'Fitness Instructor',
    image: 'https://i.pinimg.com/564x/30/47/29/304729cc9b534f33eefb35a4325c3f39.jpg',
    socialLink: '#',
    socialIcon: <i className="fa-brands fa-linkedin-in"></i>,
  },
];

const Trainers = () => {
  return (
    <section className="trainer-section">
      <h2>Our Trainers</h2>
      <div className="trainer-cards">
        {trainers.map((trainer) => (
          <div className="trainer-card" key={trainer.name}>
            <div className="trainer-img-wrapper">
              <img src={trainer.image} alt={trainer.name} />
            </div>
            <a href={trainer.socialLink} className="social-icon">
              {trainer.socialIcon}
            </a>
            <div className="trainer-content-wrapper">
              <a href="#" className="trainer-content">
                <h3>{trainer.name}</h3>
                <p>{trainer.title}</p>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="star-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </section>
  );
};

export default Trainers;
