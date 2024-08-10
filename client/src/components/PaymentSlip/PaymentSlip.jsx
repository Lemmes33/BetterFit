import React from 'react';
import './paymentslip.css'; // Ensure the path is correct

const PaymentSlip = ({ method = 'PayPal' }) => {
  return (
    <div className="payment-slip-container"> {/* Main container */}
      <div className="payment-slip-content"> {/* Content section */}
        <div className="payment-slip-header"> {/* Header section */}
          <img 
            src={method === 'PayPal' ? "https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" : "https://www.example.com/mpesa-logo.png"} 
            alt={`${method} Logo`} 
            className="payment-logo"
          />
          <h4>Oct 18, 2024   08:30:57 PDT</h4>
        </div>
        <div className="payment-slip-main"> {/* Main content section */}
          <h3>Subscription Payment</h3>
          <h5>Total: $20.00 USD</h5>
        </div>
        <div className="payment-slip-message"> {/* Message section */}
          <p>
            Hello User, <br />
            You sent a payment of $20.00 USD via {method}.
          </p>
          <h6>
            It may take a few moments for this transaction to appear in your account.
          </h6>
        </div>
        <div className="payment-slip-footer"> {/* Footer section */}
          <a href={`https://www.${method.toLowerCase()}.com/help`} className="payment-help-link">Help Center</a>
          <h6>Invoice ID: 108165</h6>
        </div>
      </div>
    </div>
  );
};

export default PaymentSlip;
