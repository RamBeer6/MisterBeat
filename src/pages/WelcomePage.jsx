// import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/imgs/logo.png';
// import { User } from "../cmps/User";
// import logo from "../assets/imgs/logo.png";

// import { LoginSignup } from "./pages/LoginSignup";

export const WelcomePage = ({ setIsWelcome, setIsLogin }) => {
  const navigate = useNavigate();

  return (
    <section className='welcome-page'>
      {/* <LoginSignup /> */}
      <header>
        <ul>
          <li
            onClick={() => {
              setIsWelcome(false);
              setIsLogin(true);
              navigate('/login');
            }}>
            Log in
          </li>
          <li
            onClick={() => {
              setIsWelcome(false);
              setIsLogin(true);
              navigate('/signup');
            }}>
            Sign up
          </li>
        </ul>
      </header>
      <main className='hero'>
        <div className='content'>
          <h2>Mister.Beat</h2>
          {/* <img
            className='nav-bar__logo'
            src={logo}
            alt='logo'
            onClick={() => {
              setIsLogin(false);
              setIsWelcome(true);
            }}
          /> */}
          <p>Start listening to the best new releases.</p>
        </div>
        <button className='hero-btn' onClick={() => setIsWelcome(false)}>
          Let's get started
        </button>
        <div className='waves'></div>
      </main>
    </section>
  );
};
