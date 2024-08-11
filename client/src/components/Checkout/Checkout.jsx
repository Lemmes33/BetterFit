import React, { useState } from 'react';
import './Checkout.css'; // Include your CSS file

function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [plan, setPlan] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+254');
  const [paymentMethod, setPaymentMethod] = useState('');

  const [errors, setErrors] = useState({});

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

  const handlePaymentDateChange = (event) => {
    const date = event.target.value;
    setPaymentDate(date);
    setEndDate(calculateEndDate(date));
  };

  const calculateEndDate = (date) => {
    if (!date) return '';
    
    const paymentDate = new Date(date);
    paymentDate.setMonth(paymentDate.getMonth() + 6);
    
    // Format the end date to YYYY-MM-DD
    const year = paymentDate.getFullYear();
    const month = String(paymentDate.getMonth() + 1).padStart(2, '0');
    const day = String(paymentDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    // Allow only numeric values and limit to 9 digits
    if (/^\d{0,9}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!firstName) formErrors.firstName = 'First name is required';
    if (!lastName) formErrors.lastName = 'Last name is required';
    if (!plan) formErrors.plan = 'Plan selection is required';
    if (!paymentDate) formErrors.paymentDate = 'Payment date is required';
    if (!amount) formErrors.amount = 'Amount is required';
    if (!phoneNumber) formErrors.phoneNumber = 'Phone number is required';
    if (!paymentMethod) formErrors.paymentMethod = 'Payment method is required';

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    // Redirect based on selected payment method
    if (paymentMethod === 'paypal') {
      window.location.href = 'https://www.paypal.com';
    } else if (paymentMethod === 'mpesa') {
      window.location.href = 'https://www.safaricom.co.ke/personal/m-pesa';
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
                  <div className="phone-container">
                    <select
                      id="country-code"
                      name="country-code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="phone-dropdown"
                    >
                      <option value="+254">+254</option>
                      <option value="+256">+256</option>
                      <option value="+255">+255</option>
                      <option value="+253">+253</option>
                      <option value="+252">+252</option>
                      <option value="+211">+211</option>
                    </select>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder="123456789"
                      maxLength="9"
                      className={errors.phoneNumber ? 'error-input' : ''}
                    />
                  </div>

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
                  
                  <label htmlFor="payment-date">
                    Date of Payment
                    {errors.paymentDate && <span className="error">*</span>}
                  </label>
                  <input
                    type="date"
                    id="payment-date"
                    name="payment-date"
                    value={paymentDate}
                    onChange={handlePaymentDateChange}
                    className={errors.paymentDate ? 'error-input' : ''}
                  />

                  <label htmlFor="end-date">Plan End Date</label>
                  <input
                    type="date"
                    id="end-date"
                    name="end-date"
                    value={endDate}
                    readOnly
                  />

                  <h3>Payment Method</h3>
                  <label htmlFor="payment-method">
                    Choose Payment Method
                    {errors.paymentMethod && <span className="error">*</span>}
                  </label>
                  <div className="icon-container">
                    <i className="fa fa-paypal" style={{ color: '#003087' }} title="PayPal"></i>
                    <i className="fa fa-mobile" style={{ color: '#00bfae' }} title="M-Pesa"></i>
                  </div>
                  <select
                    id="payment-method"
                    name="payment-method"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={errors.paymentMethod ? 'error-input' : ''}
                  >
                    <option value="">Select a payment method</option>
                    <option value="paypal">PayPal</option>
                    <option value="mpesa">M-Pesa</option>
                  </select>
                </div>
              </div>
              <label>
                <input type="checkbox" defaultChecked name="terms" /> I agree to the terms and conditions
              </label>
              <input type="submit" value="Complete Purchase" className="btn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
