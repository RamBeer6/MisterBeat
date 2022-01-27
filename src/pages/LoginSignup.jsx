import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { onLogin, onSignup } from "../store/actions/user.action";
import logo from "../assets/imgs/logo.png";

function _LoginSignup({ user, setIsWelcome, setIsLogin, onLogin, onSignup }) {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [userForm, setUserForm] = useState({
    userName: "",
    imgUrl: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    setUserForm({ ...userForm, [field]: value });
  };

  const onLoginSingup = async (isLoginForm, userForm) => {
    try {
      if (isLoginForm) {
        const loggedinUser = await onLogin(userForm);
        if (loggedinUser) {
          console.log("loggedin successfully");
          setIsWelcome(false);
          setIsLogin(false);
          navigate("/");
        } else {
          console.log("worng username or password!!!");
        }
      } else {
        await onSignup(userForm);
        setIsWelcome(false);
        setIsLogin(false);
        navigate("/");
      }
    } catch (err) {
      console.log("something went wrong with login/signup");
    }
  };

  return (
    <>
      {isLoginForm ? (
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
          <form
            className="form-signin"
            onSubmit={(ev) => {
              ev.preventDefault();
              onLoginSingup(isLoginForm, userForm);
            }}
          >
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              value={userForm.userName}
              name="userName"
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={userForm.password}
              name="password"
              onChange={handleChange}
              required
            />
            <input className="login-btn" type="submit" value="Log in" />
          </form>
          <hr />
          <footer className="signup-footer">
            <h4>Don't have an account?</h4>
            <button
              className="signup-btn"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              sign up for Mister.beat
            </button>
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
          <form
            style={{ height: "100vh", justifyContent: "start" }}
            className="form-signin"
            onSubmit={(ev) => {
              ev.preventDefault();
              onLoginSingup(isLoginForm, userForm);
            }}
          >
            <label htmlFor="email">Enter your email:</label>
            <input
              type="email"
              value={userForm.email}
              name="email"
              onChange={handleChange}
              placeholder="Email..."
            />
            <label htmlFor="email">Confirm your email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email..."
            />
            <label htmlFor="password">Enter password</label>
            <input
              type="password"
              name="password"
              value={userForm.password}
              onChange={handleChange}
              placeholder="Password..."
              required
            />
            <label htmlFor="userName">What should we call you?</label>
            <input
              type="text"
              name="userName"
              value={userForm.userName}
              onChange={handleChange}
              placeholder="UserName..."
              required
            />
            <label htmlFor="birthday">Date of Birth:</label>
            <input type="date" id="birthday" name="birthday" />
            <input
              style={{ marginTop: "30px" }}
              className="login-btn"
              type="submit"
              value="Sign up"
            />
          </form>
          <div className="log-in-again">
            <p>
              have an account?
              <button
                className="btn"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                Log in
              </button>
            </p>
          </div>
        </section>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  onLogin,
  onSignup,
};

export const LoginSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginSignup);
