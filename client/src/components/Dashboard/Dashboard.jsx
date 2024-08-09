import React from "react";
import "./Dashboard.css"; // Assuming you are using CSS Modules
import Avartar from '../../assets/Fitness _ les exercices pour maigrir des bras et muscler les épaules.jpeg'
import Goal from '../../assets/Bras___Girlfriend_Collective-removebg-preview.png'
import welcomeImage from '../../assets/The_New_Nike_Air_Zoom_SuperRep_2-removebg-preview.png'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">BetterFit</div>
        <nav className="nav">
          <ul>
            <li className="nav-item">Dashboard</li>
            
          </ul>
        </nav>
        <button className="logout-btn">Logout</button>
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
            <div className="user-name">Aquilla</div>
            <div className="user-avatar">
              <img src={Avartar} alt="Avatar" />
            </div>
          </div>
        </header>

        <section className="welcome-section">
        <div className="welcome-image">
            <img src={welcomeImage}alt="Fitness" />
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
            <button>Day</button>
            <button>Weekly</button>
            <button>Monthly</button>
            <button>Yearly</button>
          </div>
          <div className="chart">
            {/* Chart placeholder */}
            <div className="chart-placeholder">[Chart]</div>
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
    </div>
  );
};

export default Dashboard;
