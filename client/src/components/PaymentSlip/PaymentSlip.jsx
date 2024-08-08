import React from 'react';
import './paymentslip.css'; // Assuming styles.css holds styles for this component

const PaymentSlip = () => {
  return (
    <div className="payment-slip-container">  {/* Main container */}
      <div className="payment-slip-left"> {/* Left section */}
        <div className="payment-slip-info-box"> {/* Information box */}
          <div className="payment-slip-receipt"> {/* Receipt section */}
            Receipt for <br /> <span>Dribbble</span>
          </div>
          <div className="payment-slip-entry"> {/* Entry item */}
            <i className="icon-wallet" aria-hidden="true"></i>
            <p>
              Amount: <br /> <span>$20.00 USD</span>
            </p>
          </div>
          <div className="payment-slip-entry"> {/* Entry item */}
            <i className="icon-calendar" aria-hidden="true"></i>
            <p>
              Date: <br /> <span>Nov 5</span>
            </p>
          </div>
          {/* ... other entries ... */}
        </div>
      </div>
      <div className="payment-slip-right"> {/* Right section */}
        <div className="payment-slip-content"> {/* Content section */}
          <div className="payment-slip-header"> {/* Header section */}
            <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" alt="PayPal Logo" />
            <h4>Oct 18, 2015   08:30:57   PDT</h4>
          </div>
          <div className="payment-slip-main"> {/* Main content section */}
            <h3>Dribbble Pro Account (1 year)</h3>
            <h5>Total: $20.00 USD</h5>
          </div>
          <div className="payment-slip-message"> {/* Message section */}
            <p>
              Hello Ennio, <br />
              You sent a payment of $20.00 USD to Dribbble (<a href="mailto:paypal@dribbble.com">paypal@dribbble.com</a>)
            </p>
            <h6>
              It may take a few moments for this transaction to appear in your account.
            </h6>
          </div>
          <div className="payment-slip-footer"> {/* Footer section */}
            <a href="#">www.paypal.com/help</a>
            <h6>Invoice ID: 108165</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSlip;
