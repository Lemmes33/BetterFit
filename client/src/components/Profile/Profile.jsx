import React, { useState } from 'react';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  const [nav, setNav] = useState('profile');

  return (
    <div className="profile-settings">
      <input 
        className="profile-nav-radio" 
        type="radio" 
        name="profile-nav" 
        checked={nav === 'profile'} 
        onChange={() => setNav('profile')} 
      />
      <span className="profile-nav-label">Profile</span>
      <input 
        className="profile-nav-radio" 
        type="radio" 
        name="profile-nav" 
        checked={nav === 'account'} 
        onChange={() => setNav('account')} 
      />
     
      <main className="profile-content">
        {nav === 'profile' && (
          <section id="profile">
            <form>
              <ul>
                <li className="profile-large profile-padding profile-avatar">
                  <span
                    style={{
                      backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/345377/selca-square.jpg')"
                    }}
                  ></span>
                  <div>
                    
                    <fieldset className="profile-button">
                      <div>
                        <button>Select File</button>
                      </div>
                    </fieldset>
                  </div>
                </li>
                <li>
                  <fieldset className="profile-input">
                    <div>
                      <input type="text" required defaultValue="Gabrielle Wee" />
                      <label>Name</label>
                      <hr />
                    </div>
                  </fieldset>
                </li>
                <li>
                  <fieldset className="profile-input">
                    <div>
                      <input type="text" required />
                      <label>Location</label>
                      <hr />
                    </div>
                  </fieldset>
                </li>
                <li>
                  <fieldset className="profile-input">
                    <div>
                      <input type="text" required />
                      <label>Title</label>
                      <hr />
                    </div>
                  </fieldset>
                </li>
                <li>
                  <fieldset className="profile-input">
                    <div>
                      <input type="text" required />
                      <label>Website</label>
                      <hr />
                    </div>
                  </fieldset>
                </li>
                <li className="profile-large">
                  <fieldset className="profile-input">
                    <div>
                      <input type="text" required />
                      <label>About</label>
                      <hr />
                    </div>
                  </fieldset>
                </li>
                <li className="profile-large profile-padding">
                  <fieldset className="profile-button center">
                    <div>
                      <input className="profile-save" type="submit" value="Save" />
                    </div>
                  </fieldset>
                </li>
              </ul>
            </form>
          </section>
        )}

        {nav === 'account' && (
          <section id="account">
            <form>
              <ul>
                <li>
                  <fieldset className="profile-input">
                    <div>
                      <input type="text" required defaultValue="email@domain.com" />
                      <label>Email</label>
                      <hr />
                    </div>
                  </fieldset>
                </li>
                <li>
                  <fieldset className="profile-input">
                    <div>
                      <input type="text" required />
                      <label>Username</label>
                      <hr />
                    </div>
                  </fieldset>
                </li>
                <li>
                  <fieldset className="profile-input">
                    <div>
                      <input type="password" required />
                      <label>Password</label>
                      <hr />
                    </div>
                  </fieldset>
                </li>
                <li>
                  <fieldset className="profile-input">
                    <div>
                      <input type="password" required />
                      <label>Confirm Password</label>
                      <hr />
                    </div>
                  </fieldset>
                </li>
                <li className="profile-padding">
                  <fieldset className="profile-button">
                    <div>
                      <button className="profile-connect gh connected">
                        <span>Unlink Github Account</span>
                      </button>
                    </div>
                  </fieldset>
                </li>
                <li className="profile-padding">
                  <fieldset className="profile-button">
                    <div>
                      <button className="profile-connect tw">
                        <span>Link Twitter Account</span>
                      </button>
                    </div>
                  </fieldset>
                </li>
                <li className="profile-padding">
                  <fieldset className="profile-button">
                    <div>
                      <button className="profile-connect fb">
                        <span>Link Facebook Account</span>
                      </button>
                    </div>
                  </fieldset>
                </li>
                <li className="profile-padding">
                  <fieldset className="profile-button">
                    <div>
                      <button className="profile-connect li">
                        <span>Link LinkedIn Account</span>
                      </button>
                    </div>
                  </fieldset>
                </li>
                <li className="profile-large profile-padding">
                  <fieldset className="profile-button center">
                    <div>
                      <input className="profile-save" type="submit" value="Save" />
                    </div>
                  </fieldset>
                </li>
              </ul>
            </form>
          </section>
        )}

        {nav === 'privacy' && (
          <section id="privacy" className="profile-upcoming">
            <h1>Coming&nbsp;soon!</h1>
          </section>
        )}

        {nav === 'advanced' && (
          <section id="advanced" className="profile-upcoming">
            <h1>Coming&nbsp;soon!</h1>
          </section>
        )}
      </main>
    </div>
  );
};

export default Profile;
