import React from 'react';
import './payment.css';
import { Link } from 'react-router-dom';

const cards = [
  { title: '1 Month Subscription', details: ['120 minutes workout', '5 personal trainers', 'A nutrition program', '24/7 customer service'], button: 'Select' },
  { title: '3 Month Subscription', details: ['180 minutes workout', '8 personal trainers', 'Advanced nutrition program', '24/7 premium customer service'], button: 'Select' },
  { title: '6 Month Subscription', details: ['240 minutes workout', '10 personal trainers', 'Comprehensive nutrition program', '24/7 VIP customer service'], button: 'Select' }
];

const Card = ({ title, details, button }) => (
  <div className="payment-card">
    <div className="content">
      <h2 className="title">{title}</h2>
      <div className="details">
        {details.map((detail, index) => (
          <p key={index}>{detail}</p>
        ))}
      </div>
      <Link to='/checkout'>{button}</Link>
    </div>
  </div>
);

const Payment = () => (
  <div className="payment-container"> {/* New wrapper div */}
    <h1 className="main-title">Choose a Plan</h1>
    <h2 className="sub-title">PRICING PACKAGE</h2>
    <main className="page-content">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </main>
  </div>
);

export default Payment;
