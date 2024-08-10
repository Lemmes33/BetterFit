import React, { useState } from "react";
import "./Dashboard.css";
import Avatar from '../../assets/Fitness _ les exercices pour maigrir des bras et muscler les épaules.jpeg'
import Goal from '../../assets/Bras___Girlfriend_Collective-removebg-preview.png'
import Dashy from '../../assets/dashy.png'
import { Line, Bar } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Profile from "../Profile/Profile";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [isUsernameDropdownOpen, setIsUsernameDropdownOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false); // State for logout popup
  const [chartType, setChartType] = useState('day'); // State to manage chart type

  const handleAvatarClick = () => {
    setIsAvatarDropdownOpen(!isAvatarDropdownOpen);
  };

  const handleUsernameClick = () => {
    setIsUsernameDropdownOpen(!isUsernameDropdownOpen);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const handleLogoutClick = () => {
    setIsLogoutPopupOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutPopupOpen(false);
    // Add logout functionality here
  };

  const handleCancelLogout = () => {
    setIsLogoutPopupOpen(false);
  };

  // Sample chart data
  const chartData = {
    labels: chartType === 'day' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : chartType === 'weekly' ? ['Week 1', 'Week 2', 'Week 3', 'Week 4'] : ['Month 1', 'Month 2', 'Month 3', 'Month 4'],
    datasets: [
      {
        label: 'Calories Burned',
        data: chartType === 'day' ? [150, 200, 180, 220, 250, 230, 210] : chartType === 'weekly' ? [1200, 1400, 1600, 1800] : [5000, 6000, 7000, 8000],
        fill: false,
        borderColor: '#09ff00',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">BetterFit</div>
        <nav className="nav">
          <ul>
            <li className="nav-item">Dashboard</li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogoutClick}>Logout</button>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="date-picker">
            <input type="date" name="date" id="date" />
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
          <div className="user-info">
            <div className="user-name-dropdown" onClick={handleUsernameClick}>
              Aquilla
              <span className="dropdown-arrow">▼</span>
              {isUsernameDropdownOpen && (
                <div className="account-dropdown-menu">
                  <ul>
                    <li>Switch to Account 1 (Aquilla)</li>
                    <li>Add Another Account</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="user-avatar-dropdown" onClick={handleAvatarClick}>
              <img src={Avatar} alt="Avatar" />
              {isAvatarDropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <Link to="/profile"><li>Edit Profile</li></Link>
                    <li>Settings</li>
                    <li onClick={handleLogoutClick}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="welcome-section">
          <div className="welcome-image">
            <img src={Dashy} alt="Fitness" />
          </div>
          <div className="welcome-text">
            <h1>Welcome to Fitness!</h1>
            <p>Move Your Body, Shape Your Future</p>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-item">
            <h3>Heart Rate</h3>
            <p>72 bpm</p>
          </div>
          <div className="stat-item">
            <h3>Calories Burn</h3>
            <p>120 Kcal</p>
          </div>
          <div className="stat-item">
            <h3>Cardio Full Training</h3>
            <p>01 hr</p>
          </div>
        </section>

        <section className="chart-section">
          <div className="chart-header">
            <button onClick={() => handleChartTypeChange('day')}>Day</button>
            <button onClick={() => handleChartTypeChange('weekly')}>Weekly</button>
            <button onClick={() => handleChartTypeChange('monthly')}>Monthly</button>
            <button onClick={() => handleChartTypeChange('yearly')}>Yearly</button>
          </div>
          <div className="chart">
            <Line data={chartData} />
          </div>
        </section>
      </main>

      <aside className="side-info">
        <div className="summary">
          <div>Total Calories burned</div>
          <div>4012</div>
        </div>
        <div className="summary">
          <div>Average heart rate</div>
          <div>100</div>
        </div>
        <div className="summary">
          <div>Total Distance traveled</div>
          <div>20km</div>
        </div>
        <div className="goals">
          <h3>My Goal</h3>
          <ul>
            <li>Do 5 Workouts in 1 day</li>
            <li>Do 15 Workouts in 3 day</li>
            <li>Burn 5000 Kcal in 1 week</li>
            <li>Run 50km</li>
          </ul>
        </div>
        <div className="goal-image">
          <img src={Goal} alt="Goal" />
        </div>
      </aside>

      {/* Logout Confirmation Popup */}
      {isLogoutPopupOpen && (
        <div className="logout-popup">
          <div className="logout-popup-content">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out of this profile?</p>
            <div className="logout-popup-buttons">
              <button onClick={handleConfirmLogout}>Yes, Logout</button>
              <button onClick={handleCancelLogout}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
