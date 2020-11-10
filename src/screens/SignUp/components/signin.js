import React , {useState} from 'react';
import './signin.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

// import  { Redirect } from 'react-router-dom';

import UserDetails from '../../../redux/actions/UserDetails';
import store from '../../../redux/store';
import DatePicker from 'react-date-picker';
import firebase from '../../../Config/firebase';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

const  SignUp  = () =>  {

  
    let history = useHistory();
  const [email , setemail] = useState();
  const [password , setpassword] = useState();
  
  
  const EmailChange = (e) => {
    // console.log(e.target.value);
    setemail(e.target.value);
  }
  const PasswordChange = (e) => {
    console.log(e.target.value);
    setpassword(e.target.value);
  }


  const SubmitSignIn = (props) => {
//    alert("sign in");
    if( email != null && password != null )
    {
   firebase.auth().signInWithEmailAndPassword(email , password)
   .then(res => {
       console.log( "response" ,  res);
       setemail('');
       setpassword('');
       history.push("/User");
       
   } )
   .catch(err => {
    //    console.log(err);
       alert(err.message);
   } )
} else {
    alert("any field empty");
}
  }
  
  const SubmitSignOut = () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
  }


  return (
   
    <div className="RightDiv" >
        <h1 style={{ color: "yellow" , marginBottom: '8%' }} >Login Your Account</h1>
    <div className="InputStyle" style={{ marginTop: '15px' }}  >
    <FontAwesomeIcon icon={faEnvelope} size="xs" style={{ color: "white" , paddingLeft: '2px'}} />
    <input value={email} placeholder="Email" style={{ color: 'yellow' , backgroundColor: 'black' , borderStyle: 'none'
    , paddingLeft: '5px' , outline: 'none' }}
    onChange={(e) => EmailChange(e) }
    className= "inputfield"
    />

    </div>
    <div className="InputStyle" style={{ marginTop: '15px' }}  >
    <FontAwesomeIcon icon={faLock} size="xs" style={{ color: "white" , paddingLeft: '2px'}} />
    <input  value={password} placeholder="*********" style={{ color: 'yellow' , backgroundColor: 'black' , borderStyle: 'none'
    , paddingLeft: '5px' , outline: 'none' }}
    onChange={(e) => PasswordChange(e) }
    className= "inputfield"
    />

    </div>
    
    <button className="SubmitButton"  onClick={() => SubmitSignIn() } >LogIn</button>
    {/* <button className="SubmitButton"  onClick={() => SubmitSignOut() } >LogOut</button> */}


    </div>
  );
}

export default SignUp;
