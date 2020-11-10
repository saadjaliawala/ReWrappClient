import React  , {useState} from 'react';
import './style.css';
import firebase from '../../Config/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

import store from '../../redux/store';
import AdminState from '../../redux/actions/AdminState';

// import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const  AdminLoginScreeen  = () =>  {
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

  const SubmitSignIn = () => {

    if( email != null && password != null )
    {
  firebase.firestore().collection('admins')
  .get()
  .then(datas => {
    //   console.log(datas.d;
    datas.forEach(datas1 => {
        console.log(datas1.data());
        if(datas1.data().email  == email && datas1.data().password == password )
        {
                // alert("Admin true");
                store.dispatch(AdminState(true));
            history.push('./admindashboard');
            setemail('');
            setpassword('');
        }
        else {
            // alert("false");
        }
    })
  })
} else {
    alert("any field empty");
}

  }

   

  return (
    <div  className="maindiv" >
        <div style={{ height: '100%'  , backgroundColor: 'yellow' , display: 'flex' , flexDirection: 'column', 
         alignItems: 'center' }} className="adminleftdiv" >
            
            <h2 style={{ alignSelf: 'center' , textAlign: 'center' , paddingTop: '40px' }} > Welcome Back Admin ! </h2>

            <p style={{display: 'flex' ,  textAlign: 'center' , marginTop: '55px' }} >
                To Keep Connected with us please <br/> login with your personal info </p>
                <button className="SignInButtonStyle" style={{ marginTop: '70px' }}  >Admin Login </button>
        </div>
        <div  className="adminrightdiv" >
        <h1 style={{ color: "yellow" , marginBottom: '8%', marginTop: '6%' , textAlign: 'center' }} >Login Your Account</h1>
    <div className="InputStyle" style={{ marginTop: '15px' }}  >
    <FontAwesomeIcon icon={faEnvelope} size="xs" style={{ color: "white" , paddingLeft: '2px'}} />
    <input value={email} placeholder="Email" style={{ color: 'yellow' , backgroundColor: 'black' , borderStyle: 'none'
    , paddingLeft: '5px' , outline: 'none' }}
    onChange={(e) => EmailChange(e) }
    className= "inputfield"
    />

    </div>
    <div className="InputStyle" style={{ marginTop: '25px' }}  >
    <FontAwesomeIcon icon={faLock} size="xs" style={{ color: "white" , paddingLeft: '2px'}} />
    <input  value={password} placeholder="*********" style={{ color: 'yellow' , backgroundColor: 'black' , borderStyle: 'none'
    , paddingLeft: '5px' , outline: 'none' }}
    onChange={(e) => PasswordChange(e) }
    className= "inputfield"
    />
    </div>
    <button className="SubmitButton" style={{ marginTop: '10%' }} onClick={() => SubmitSignIn() } >LogIn</button>
        </div>
       
        
    </div>
  );
}

export default AdminLoginScreeen;
