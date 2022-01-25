// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { User } from "../cmps/User";
// import logo from "../assets/imgs/logo.png";

// import { LoginSignup } from "./pages/LoginSignup";


export const WelcomePage = () => {
    return (
        <section>
            {/* <LoginSignup /> */}
            <header className="header">
                <ul className="welcome-header-ul">
                    <li>Log in</li>
                    <li>Sign up</li>
                </ul>
            </header>
            <main className="hero">
                <div className="content">
                    <h2>Mister.Beat</h2>
                    <p>Start listening to the best new releases.</p>
                </div>
                <button className="hero-btn">Let's get started</button>
                <div className="waves"></div>
            </main >
        </section >
    );
};
