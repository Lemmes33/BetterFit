import React, { useState } from 'react';
import './Checkout.css'; // Include your CSS file

function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [plan, setPlan] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+'); // Initialize with '+'
  const [paymentMethod, setPaymentMethod] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePlanChange = (event) => {
    const selectedPlan = event.target.value;
    setPlan(selectedPlan);
    
    // Update the amount based on the selected plan
    switch (selectedPlan) {
      case 'basic':
        setAmount('4000');
        break;
      case 'premium':
        setAmount('8000');
        break;
      case 'pro':
        setAmount('12000');
        break;
      default:
        setAmount('');
    }
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;

    // Ensure the input starts with a '+' and allow only numeric values after it, limiting to 13 digits
    if (value === '' || /^\+\d{0,12}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!firstName) formErrors.firstName = 'First name is required';
    if (!lastName) formErrors.lastName = 'Last name is required';
    if (!plan) formErrors.plan = 'Plan selection is required';
    if (!amount) formErrors.amount = 'Amount is required';
    if (!phoneNumber || phoneNumber === '+') formErrors.phoneNumber = 'Phone number is required';
    if (!paymentMethod) formErrors.paymentMethod = 'Payment method is required';

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleMpesPayment = async () => {
    setLoading(true);
    setPaymentStatus("Prompt sent, waiting for payment...");

    try {
      const response = await fetch("http://127.0.0.1:5000/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneNumber,  // No country code
          amount: amount,
        }),
      });

      if (response.ok) {
        const paymentResponse = await response.json();

        if (paymentResponse.success) {
          setPaymentStatus("Payment successful!");
          // Handle successful payment, e.g., navigate to confirmation page
        } else {
          setPaymentStatus("Payment failed. Please try again.");
        }
      } else {
        setPaymentStatus("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setPaymentStatus("Payment failed due to a network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    if (paymentMethod === 'mpesa') {
      handleMpesPayment();
    } else {
      alert('Please select a payment method.');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Gym Plan Checkout</h1>
      <div className="row">
        <div className="col-75">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-50">
                  <h3>Personal Information</h3>
                  <label htmlFor="first-name">
                    <i className="fa fa-user"></i> First Name
                    {errors.firstName && <span className="error">*</span>}
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className={errors.firstName ? 'error-input' : ''}
                  />
                  
                  <label htmlFor="last-name">
                    <i className="fa fa-user"></i> Last Name
                    {errors.lastName && <span className="error">*</span>}
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className={errors.lastName ? 'error-input' : ''}
                  />
                  
                  <label htmlFor="phone">
                    <i className="fa fa-phone"></i> Phone Number
                    {errors.phoneNumber && <span className="error">*</span>}
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="+123456789012"
                    maxLength="13"
                    className={errors.phoneNumber ? 'error-input' : ''}
                  />

                  <label htmlFor="email">
                    <i className="fa fa-envelope"></i> Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="col-50">
                  <h3>Payment Details</h3>
                  <label htmlFor="plan">
                    Choose Your Plan
                    {errors.plan && <span className="error">*</span>}
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    value={plan}
                    onChange={handlePlanChange}
                    className={errors.plan ? 'error-input' : ''}
                  >
                    <option value="">Select a plan</option>
                    <option value="basic">Basic Plan</option>
                    <option value="premium">Premium Plan</option>
                    <option value="pro">Pro Plan</option>
                  </select>
                  
                  <label htmlFor="amount">
                    Amount
                    {errors.amount && <span className="error">*</span>}
                  </label>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={amount}
                    readOnly
                    className={errors.amount ? 'error-input' : ''}
                  />

                  <h3>Payment Method</h3>
                  <label htmlFor="payment-method">
                    Select Payment Method
                    {errors.paymentMethod && <span className="error">*</span>}
                  </label>
                  <div className="payment-options">
                    <label>
                      <input
                        type="radio"
                        name="payment-method"
                        value="mpesa"
                        checked={paymentMethod === 'mpesa'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      M-Pesa
                    </label>
                  </div>
                </div>
              </div>
              {loading && <p>Loading...</p>}
              {paymentStatus && <p>{paymentStatus}</p>}
              <button type="submit" className="btn">Submit</button>
            </form>
          </div>
        </div>

        <div className="col-25">
          <div className="container">
            <h4>Cart 
              <span className="price" style={{ color: 'black' }}>
                <i className="fa fa-shopping-cart"></i> 
                <b>1</b>
              </span>
            </h4>
            <p><a href="#">Selected Plan</a> <span className="price">${amount}</span></p>
            <hr />
            <p>Total <span className="price"><b>${amount}</b></span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
