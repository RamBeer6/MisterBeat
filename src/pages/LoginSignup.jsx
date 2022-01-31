import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { onLogin, onSignup } from "../store/actions/user.action";
import { Logo } from '../cmps/Logo';

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
          // console.log("loggedin successfully");
          setIsWelcome(false);
          setIsLogin(false);
          navigate("/");
        } else {
          // console.log("worng username or password!!!");
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

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleFailure = (result) => {
    alert(result);
  };

  // const handleLogin = async (googleData) => {
  //   const res = await fetch("/api/google-login", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       token: googleData.tokenId,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await res.json();
  //   setLoginData(data);
  //   localStorage.setItem("loginData", JSON.stringify(data));
  // };
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  const responseGoogle = (response) => {
    // setIsLogin(false);
    // setUserForm({
    //   ...userForm,
    //   userName: response.profileObj.name,
    //   password: response.profileObj.googleId,
    //   imgUrl: response.profileObj.imageUrl,
    // });
    console.log(response);
    const userToLogin = {
      //userName: response.profileObj.name,
      userName: `${response.profileObj.givenName} ${response.profileObj.familyName}`,
      password: response.profileObj.googleId,
      imgUrl: response.profileObj.imageUrl,
    }
    onLoginSingup(isLoginForm, userToLogin)

    // console.log(response.profileObj.imageUrl);
    // console.log(response.profileObj.googleId);
  };
  // console.log(userForm);

  return (
    <>
      {isLoginForm ? (
        <section className="login-signup-page">
          <header>
            <div className="logo-header">
              <Logo />
            </div>
          </header>
          <ul>
            <div className="header-h5">
              <h5>To continue, log in to Mister.beat.</h5>
            </div>
            {/* <li className="media facebook">
              <i className="fab fa-facebook-square">
                <span>continue with facebook</span>
              </i>
            </li> */}
            <div className="btn-warpper">
              <GoogleLogin
                clientId={
                  "700873867407-i37i35b14k35o5ot4aopvaibpgvn53j5.apps.googleusercontent.com"
                }
                buttonText="Log in with Google"
                onSuccess={(res) => {
                  console.log('res from onSuccess', res);
                  responseGoogle(res)
                }}
                onFailure={(res) => {
                  console.log('res from onFailure', res);
                  responseGoogle(res)
                }}
                // onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            </div>
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
              placeholder="Enter you username here"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={userForm.password}
              name="password"
              onChange={handleChange}
              required
              placeholder="Enter your passwoed here"
            />
            <input className="login-btn" type="submit" value="Log in" />
          </form>
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
          <header>
            <div className="logo-header">
              <Logo />
            </div>
          </header>
          <ul>
            <div className="header-h5">
              <h5>Sign up with your email address</h5>
            </div>
            {/* <li className="media facebook">
              <i className="fab fa-facebook-square">
                <span>sign up with facebook</span>
              </i>
            </li> */}
            <div className="btn-warpper">
              <GoogleLogin
                clientId={
                  "700873867407-i37i35b14k35o5ot4aopvaibpgvn53j5.apps.googleusercontent.com"
                }
                buttonText="Sign up with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            </div>
          </ul>
          <div className="hr-or-container">
            <hr />
            <p>Or</p>
            <hr />
          </div>
          <form
            style={{ justifyContent: "start" }}
            className="form-signin"
            onSubmit={(ev) => {
              ev.preventDefault();
              onLoginSingup(isLoginForm, userForm);
            }}
          >
            {/* <label htmlFor="email">Enter your email:</label>
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
            /> */}
            <label htmlFor="userName">What should we call you?</label>
            <input
              type="text"
              name="userName"
              value={userForm.userName}
              onChange={handleChange}
              placeholder="Enter username here"
              required
            />
            <label htmlFor="password" />Password:
            <input
              type="password"
              name="password"
              value={userForm.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
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
