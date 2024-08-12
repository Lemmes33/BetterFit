import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Goal from '../../assets/Bras___Girlfriend_Collective-removebg-preview.png';
import Dashy from '../../assets/dashy.png';
import { Line, Doughnut } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [isUsernameDropdownOpen, setIsUsernameDropdownOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [chartType, setChartType] = useState('day');
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  // Get avatar and username from local storage
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '../../assets/Fitness _ les exercices pour maigrir des bras et muscler les épaules.jpeg');
  const [username, setUsername] = useState(localStorage.getItem('name') || 'Aquilla');

  useEffect(() => {
    // Load goals from local storage
    const storedGoals = JSON.parse(localStorage.getItem('goals')) || [];
    setGoals(storedGoals);
  }, []);

  useEffect(() => {
    // Save goals to local storage
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    // Update avatar when it changes
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  useEffect(() => {
    // Update username when it changes
    const storedUsername = localStorage.getItem('name');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

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

  const handleGoalChange = (e) => {
    setNewGoal(e.target.value);
  };

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal('');
    }
  };

  const handleDeleteGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const chartData = {
    labels: chartType === 'day' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : chartType === 'weekly' ? ['Week 1', 'Week 2', 'Week 3', 'Week 4'] : ['Month 1', 'Month 2', 'Month 3', 'Month 4'],
    datasets: [
      {
        label: 'Calories Burned',
        data: chartType === 'day' ? [150, 200, 180, 220, 250, 230, 210] : chartType === 'weekly' ? [1200, 1400, 1600, 1800] : [5000, 6000, 7000, 8000],
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(9, 255, 0, 0.7)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          return gradient;
        },
        borderColor: '#09ff00',
        pointBackgroundColor: '#000',
        pointBorderColor: '#09ff00',
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
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

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { width, height } } = chart;
      ctx.save();
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#09ff00';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const text = `${chart.data.datasets[0].data[0]}%`;
      const textX = width / 2;
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.restore();
    }
  };

  const heartRateData = {
    datasets: [
      {
        data: [72, 28],
        backgroundColor: ['#09ff00', '#000'],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  const caloriesData = {
    datasets: [
      {
        data: [50, 50],
        backgroundColor: ['#09ff00', '#000'],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  const cardioTrainingData = {
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#09ff00', '#000'],
        borderWidth: 0,
        cutout: '80%',
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
          <div className="user-info">
            <div className="user-name-dropdown" onClick={handleUsernameClick}>
              {username}
              {isUsernameDropdownOpen && (
                <div className="user-name-dropdown-menu">
                  <ul>
                    <li>{username}</li>
                    {/* Add more menu items here if needed */}
                  </ul>
                </div>
              )}
            </div>
            <div className="user-avatar-dropdown" onClick={handleAvatarClick}>
              <img src={avatar} alt="Avatar" />
              {isAvatarDropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <Link to="/profile"><li>Edit Profile</li></Link>
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
            <Doughnut data={heartRateData} options={{ plugins: { centerText: {} } }} plugins={[centerTextPlugin]} />
          </div>
          <div className="stat-item">
            <h3>Calories Burn</h3>
            <Doughnut data={caloriesData} options={{ plugins: { centerText: {} } }} plugins={[centerTextPlugin]} />
          </div>
          <div className="stat-item">
            <h3>Cardio Full Training</h3>
            <Doughnut data={cardioTrainingData} options={{ plugins: { centerText: {} } }} plugins={[centerTextPlugin]} />
          </div>
        </section>

        <section className="chart-section">
          <div className="chart-header">
            {/* Additional content for chart header can go here */}
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
          <div>Average Heart Rate</div>
          <div>100 bpm</div>
        </div>
        <div className="summary">
          <div>Total Distance Traveled</div>
          <div>20 km</div>
        </div>
        <div className="goals">
          <h3>My Goals</h3>
          <ul>
            {goals.map((goal, index) => (
              <li key={index}>
                {goal}
                <button className="delete-goal-btn" onClick={() => handleDeleteGoal(index)}>Delete</button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newGoal}
            onChange={handleGoalChange}
            placeholder="Add new goal"
          />
          <button className="add-goal-btn" onClick={handleAddGoal}>Add Goal</button>
          <img src={Goal} alt="Goal" className="goal-image" />
        </div>
      </aside>

      {isLogoutPopupOpen && (
        <div className="logout-popup-overlay">
          <div className="logout-popup">
            <h3>Logout</h3>
            <p>Are you sure you want to logout?</p>
            <Link to="/" className="button-link" onClick={handleConfirmLogout}>Confirm</Link>
            <button className="cancel" onClick={handleCancelLogout}>Cancel</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
