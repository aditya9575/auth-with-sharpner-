import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import { myContext } from '../../store/GlobalContext';

const MainNavigation = () => {

  const authCtx = useContext(myContext);

  const isLoggedIn = authCtx.isLoggedIn;

  // logout functionality
  const logoutHandler = ( ) =>{
    authCtx.logout();
  } 

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
        {!isLoggedIn &&
          <li>
            <Link to='/auth'>Login</Link>
          </li>
        }
        {isLoggedIn && 
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        }
        {isLoggedIn &&
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
