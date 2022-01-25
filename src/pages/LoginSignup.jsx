
import { useState } from "react";
import logo from "../assets/imgs/logo.png";

export function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            {isLogin ? (
                <section className="login-signup-page">
                    <header style={{ marginBottom: "15px" }}>
                        <img src={logo} alt="logo" />
                    </header>
                    <hr />
                    <ul>
                        <h5>To continue, log in to Mister.beat.</h5>
                        <li className="media facebook">
                            <i className="fab fa-facebook-square">
                                <span>continue with facebook</span>
                            </i>
                        </li>
                        <li className="media google">
                            <i className="fab fa-google">
                                <span>continue with google</span>
                            </i>
                        </li>
                    </ul>
                    <div className="hr-or-container">
                        <hr />
                        <p>Or</p>
                        <hr />
                    </div>
                    <form className="form-signin" action="">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" id="pwd" name="pwd" />
                        <input className="login-btn" type="submit" value="Log in" />
                    </form>
                    <hr />
                    <footer className="signup-footer">
                        <h4>Don't have an account?</h4>
                        <button className="signup-btn" onClick={() => setIsLogin(!isLogin)}>sign up for Mister.beat</button>
                    </footer>
                </section>
            ) : (
                <section className="login-signup-page">
                    <header style={{ marginBottom: "15px" }}>
                        <img src={logo} alt="logo" />
                    </header>
                    <ul style={{ marginTop: "40px" }}>
                        <h5>Sign up with your email address</h5>
                        <li className="media facebook">
                            <i className="fab fa-facebook-square">
                                <span>sign up with facebook</span>
                            </i>
                        </li>
                        <li className="media google">
                            <i className="fab fa-google">
                                <span>sign up with google</span>
                            </i>
                        </li>
                    </ul>
                    <div className="hr-or-container">
                        <hr />
                        <p>Or</p>
                        <hr />
                    </div>
                    <form style={{ height: "100vh", justifyContent: "start" }} className="form-signin" action="">
                        <label htmlFor="email">Enter your email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email..."
                        />
                        <label htmlFor="email">Confirm your email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email..."
                        />
                        <label htmlFor="pwd">Enter password</label>
                        <input
                            type="password"
                            id="pwd"
                            name="pwd"
                            placeholder="Password..."
                        />
                        <label htmlFor="username">What should we call you?</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="UserName..."
                        />
                        <label htmlFor="birthday">Date of Birth:</label>
                        <input type="date" id="birthday" name="birthday" />
                        <input style={{ marginTop: "30px" }} className="login-btn" type="submit" value="Sign up" />
                    </form>
                    <div className="log-in-again" >
                        <p>have an account?
                            <button className="btn" onClick={() => setIsLogin(!isLogin)}>Log in</button>
                        </p>

                    </div>
                </section>
            )}
        </>
    );
}
