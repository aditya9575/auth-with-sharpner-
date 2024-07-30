import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import { myContext } from '../../store/GlobalContext';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {

const navigate = useNavigate();

const newPasswordInputRef = useRef()
const authCtx = useContext(myContext);


const submitHandler = (e) => {
    e.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // fetch request to change the password 
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDXY6vqrdHmUdbcC60-IgQto-bRakHw3-Q" , {
      method: "POST",
      body:JSON.stringify({
        idToken : authCtx.token, 
        password : enteredNewPassword , 
        returnSecureToken : false , 

      }),
      headers:{
        "Content-Type" : "application/json"
      }
    }).then((res)=>{
navigate("/");
    }).catch(()=>{

    })
}
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
