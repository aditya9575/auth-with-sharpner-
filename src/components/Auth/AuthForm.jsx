import React, { useState , useContext } from "react";
import classes from "./AuthForm.module.css";
import { myContext } from "../../store/GlobalContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {

 const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const authCtx = useContext(myContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXY6vqrdHmUdbcC60-IgQto-bRakHw3-Q"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXY6vqrdHmUdbcC60-IgQto-bRakHw3-Q";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // Handle successful response
        authCtx.login(data.idToken);
        console.log(data);
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className={classes.actions}>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <button>{isLogin ? "Login" : "Sign Up"}</button>
            )}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin
                ? "Create new account"
                : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;


