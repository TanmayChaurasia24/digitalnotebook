import React from 'react';
import homeHero from '../images/home-hero.webp';

const Landing = () => {
  return (
    <>
      <div className='d-flex align-items-center flex-column'>
        <h1>Write, Plan, Connect</h1>
        <p>iNotebook is the connected workspace where better and faster work happens</p>
      </div>
      <div className="container">
        <img src={homeHero} style={{ height: "auto", width: "100%" }} alt="Home Hero" />
      </div>
    </>
  );
}

export default Landing;
