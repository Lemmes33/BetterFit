import React from "react";
import "./membership.css";
import Chroma from '../../assets/___3_-removebg-preview.png'

const Membership = () => {
  return (
    <div className="container-fluid">
      <div id="main">
        <div className="row main_header">
          <div className="col-md-12">
            <h5>BetterFit</h5>
            <h1>BECOME A MEMBER</h1>
            <p>
              Join a community of like-minded individuals: Find inspiration,
              support, and accountability as you reach new heights.
            </p>
          </div>
        </div>
        <div className="row button1_block">
          <div className="col-md-6 membership_text">
            {/* Text content for membership details */}
          </div>
          <div className="membership_image">
          <img src={Chroma} alt="chroma" />
          </div>
          <div className="button1_container">
            {" "}
            {/* Container for button1s */}
            <div className="button1">
              <img
                src="http://www.picshare.ru/uploads/161004/3EX8EfXzgK.png"
                className="button1_img"
                alt="Regular Member"
              />
              <h4>Regular Member+</h4>
            </div>
            <div className="button1">
              <img
                src="http://www.picshare.ru/uploads/161004/NUqA07voFD.png"
                className="button1_img"
                alt="Pro Member"
              />
              <h4>Pro Member+</h4>
            </div>
            <div className="button1">
              <img
                src="http://www.picshare.ru/uploads/161004/V77aR3V9yX.png"
                className="button1_img"
                alt="Premium Member"
              />
              <h4>Premium Member+</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 sign_in_block">
            <hr />
            </div>
            </div>
      </div>
    </div>
  );
};

export default Membership;
