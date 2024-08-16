import React from 'react';
import './teambuilding.css';

const TeamBuilding = () => {
  return (
    <section className="team-hero-section">
      <div className="team-card-grid">
        <a className="team-card" href="#">
          <div className="team-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/564x/6a/c3/1a/6ac31a9551fb44c55f0913f61c2143e0.jpg)' }}></div>
          <div className="team-card__content">
            <p className="team-card__category">Team Building</p>
            <h3 className="team-card__heading">Collaborative Challenges</h3>
            
          </div>
        </a>
        <a className="team-card" href="#">
          <div className="team-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/236x/bf/bd/df/bfbddf6864245fb4173304635652706e.jpg)' }}></div>
          <div className="team-card__content">
            <p className="team-card__category">Team Building</p>
            <h3 className="team-card__heading">Creative Workshops</h3>
            
          </div>
        </a>
        <a className="team-card" href="#">
          <div className="team-card__background" style={{ backgroundImage: 'url(https://i.pinimg.com/236x/f8/1c/90/f81c90f395bbe69875c3be1c14e60957.jpg)' }}></div>
          <div className="team-card__content">
            <p className="team-card__category">Team Building</p>
            <h3 className="team-card__heading">Problem-Solving Activities</h3>
            
          </div>
        </a>
      </div>
      <div className="team-info">
        <p>
          Effective team building activities foster collaboration and communication among team members. Engaging in various challenges and creative workshops helps strengthen relationships, improve problem-solving skills, and boost overall team morale. Whether it’s through collaborative challenges or problem-solving activities, team building is essential for creating a cohesive and motivated team that can tackle any challenge together.
        </p>
      </div>
    </section>
  );
};

export default TeamBuilding;
