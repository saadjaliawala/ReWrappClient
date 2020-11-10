import React , {useState} from 'react';
import './style.css';

import SignUp from './components/signup';
import SignIn from './components/signin';

// import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const  SignUpScreen  = (props) =>  {

  const [authbutton , setauthbutton] = useState('Sign In');
  // const []

  const AuthChange = () => {
    // alert("auth");
    if(authbutton == 'Sign In' )
    {
    setauthbutton('Sign Up');
    }
    else {
      setauthbutton('Sign In');
    }
  }

  
  return (
    <div  style={{ height: '100vh' , width: '100%' }} >
      {/* <p>Sign up  screen s </p> */}
      <div className="SignUpDiv" style={ authbutton == 'Sign Up' ? {height: '100%'} : {} }  >

   

        <div className="LeftDiv"  >
            <p style={{ fontWeight: 'bold' , fontSize: 30 , textAlign: 'center', marginTop: '25%' }} >WELCOME BACK !</p>
            <p style={{display: 'flex' ,  textAlign: 'center' , marginTop: '40px' }} >To Keep Connected with us please <br/> login with your personal info </p>
            {/* <p style={{ alignSelf: 'center' , padding: 0 }} >login with your personal info</p> */}
  <button className="SignInButtonStyle" onClick={() => AuthChange() } >{authbutton}</button>
  
  
  {/* <button className="AdminButtonStyle" onClick={() => AuthChange() } >Admin LogIn</button> */}
        </div>

        { authbutton == 'Sign In' ?  <SignUp props= {props} /> : <SignIn props={props} />
      
    
    
    }

        


      </div>

    </div>
  );
}

export default SignUpScreen;
