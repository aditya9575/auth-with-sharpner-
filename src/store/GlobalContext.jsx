import React, { createContext, useEffect, useState } from 'react';

// steps
// step 1 create a new context at the top using create context 
// Create a context with a default value if needed or just the context and also add a export statement here 
export const myContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// step 2 Context provider component pass in props to this function and then inside it write what all you need as global context 
 const GlobalContextProvider = (props) => {

// checking local storage for existing token 
const initialToken = localStorage.getItem("token")

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

//   setting up the logic of token expiry in 5 minutes 
useEffect(() => {
    // Set a timer for 5 minutes (300000 ms) to log out the user
    if (token) {
      const timer = setTimeout(logoutHandler, 300000);
      return () => clearTimeout(timer); // Clear the timer if the component unmounts or token changes
    }
  }, [token]); 

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token" , token)
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

//step 3 make an object of all these context values so that it can be passed in the return statement   
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
//step 4 wrap the {props.children} with the [name of your context.Provider component] and pass in the above created object of all the 
//contexts to the value prop of it 
    <myContext.Provider value={contextValue}>
      {props.children}
    </myContext.Provider>
  );
};

//step5 export the component created 
export default GlobalContextProvider;



