import React from 'react';
import { Link } from 'react-router-dom';
import './Paymentmethod.css'

function PaymentMethod() {
  return (
    <div className="payment-method-container">
      <div className="payment-method-top-segment">
        <div className="payment-method-breadcrumb">
          <div className="payment-method-crumb" style={{ background: 'grey' }}></div>
          <div className="payment-method-crumb"></div>
          <div className="payment-method-crumb"></div>
        </div>
        <div className="payment-method-top-text">PAYMENT METHOD</div>
      </div>

      <div className="payment-method-segment" id="Mpesa">
        <div><i className="fa fa-cc-mastercard" aria-hidden="true"></i></div>
        <div style={{ color: 'black' }}>
          <a href="#">Mpesa</a>
        </div>
        <div><i className="fa fa-check" style={{ color: 'green' }}></i></div>
      </div>
      <div className="payment-method-segment" id="paypal">
        <div><i className="fa fa-cc-paypal" aria-hidden="true"></i></div>
        <div style={{ color: 'black' }}>
          <a href="#">PayPal</a>
        </div>
        <div><i className="fa fa-check"></i></div>
      </div>

      <div className="payment-method-bottom-segment">
        <div className="payment-method-bottom-segment-text">
          <Link to="#">
            NEXT STEP              <span id="arrow">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
