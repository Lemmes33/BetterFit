import React, { useState } from "react";
import "./Dashboard.css";
import Avatar from '../../assets/Fitness _ les exercices pour maigrir des bras et muscler les épaules.jpeg';
import Goal from '../../assets/Bras___Girlfriend_Collective-removebg-preview.png';
import Dashy from '../../assets/dashy.png';
import { Line, Doughnut } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

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

  // Enhanced line chart data with gradient, customized points, and tooltips
  const chartData = {
    labels: chartType === 'day' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : chartType === 'weekly' ? ['Week 1', 'Week 2', 'Week 3', 'Week 4'] : ['Month 1', 'Month 2', 'Month 3', 'Month 4'],
    datasets: [
      {
        label: 'Calories Burned',
        data: chartType === 'day' ? [150, 200, 180, 220, 250, 230, 210] : chartType === 'weekly' ? [1200, 1400, 1600, 1800] : [5000, 6000, 7000, 8000],
        fill: true, // Set to true for gradient fill
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(9, 255, 0, 0.7)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          return gradient;
        },
        borderColor: '#09ff00',
        pointBackgroundColor: '#000', // Customize point color
        pointBorderColor: '#09ff00',
        pointBorderWidth: 2,
        pointRadius: 5, // Customize point radius
        tension: 0.4, // Make line smoother
      }
    ]
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Lighten grid lines
        },
        ticks: {
          color: '#ffffff', // Axis labels color
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Lighten grid lines
        },
        ticks: {
          color: '#ffffff', // Axis labels color
          font: {
            size: 14,
          },
        },
      }
    },
    plugins: {
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#09ff00',
        bodyColor: '#ffffff',
        borderColor: '#09ff00',
        borderWidth: 1,
      },
    },
  };

  // Sample data for donut charts
  const heartRateData = {
    datasets: [
      {
        data: [72, 28], // 72% green, 28% black
        backgroundColor: ['#09ff00', '#000'],
        borderWidth: 0,
        cutout: '80%', // To make the donut thinner
      },
    ],
  };

  const caloriesData = {
    datasets: [
      {
        data: [50, 50], // 50% green, 50% black
        backgroundColor: ['#09ff00', '#000'],
        borderWidth: 0,
        cutout: '80%', // To make the donut thinner
      },
    ],
  };

  const cardioTrainingData = {
    datasets: [
      {
        data: [60, 40], // 60% green, 40% black
        backgroundColor: ['#09ff00', '#000'],
        borderWidth: 0,
        cutout: '80%', // To make the donut thinner
      },
    ],
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
              
              {isUsernameDropdownOpen && (
                <div className="user-name-dropdown-menu">
                  <ul>
                    <li>Aquilla</li>
                    <li> + Add Another Account</li>
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
            <Doughnut data={heartRateData} />
          </div>
          <div className="stat-item">
            <h3>Calories Burn</h3>
            <Doughnut data={caloriesData} />
          </div>
          <div className="stat-item">
            <h3>Cardio Full Training</h3>
            <Doughnut data={cardioTrainingData} />
          </div>
        </section>

        <section className="chart-section">
          <div className="chart-header">
            
          </div>
          <div className="chart">
            <Line data={chartData} options={chartOptions} />
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
            <li>Do 15 Workouts in 1 Week</li>
            <li>Do 30 Workouts in 1 Month</li>
            <li>Do 365 Workouts in 1 Year</li>
          </ul>
          <img src={Goal} alt="Goal" className="goal-image" />
        </div>
      </aside>

      {isLogoutPopupOpen && (
  <div className="logout-popup-overlay">
    <div className="logout-popup">
      <h3>Logout</h3>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleConfirmLogout}>Confirm</button>
      <button className="cancel" onClick={handleCancelLogout}>Cancel</button>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
