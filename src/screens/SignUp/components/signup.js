import React , {useState} from 'react';
import './signup.css';
// import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { useHistory } from "react-router-dom";

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

    const [selectedDate, handleDateChange] = useState(new Date());
  const [packagename , setpackagename] = useState('Stryker');
  const [gamecount , setgamecount] = useState(1);
  const [name , setname] = useState();
  const [email , setemail] = useState();
  const [password , setpassword] = useState();
  const [cityname , setcityename] = useState('Karachi');
  const [game1 , setgame1] = useState();
  const [game2 , setgame2] = useState();
  const [currentgames , setcurrentgames] = useState([]);
  const [address , setaddress] = useState();
  const [number , setnumber] = useState();

  const DateChange = (date) => {
    console.log(date);
    handleDateChange(date);
    let d = date.getTime();
    console.log(d);

  }

  const NameChange = (e) => {
    // console.log(e.target.value);
    setname(e.target.value);
  }
  const EmailChange = (e) => {
    // console.log(e.target.value);
    setemail(e.target.value);
  }
  const PasswordChange = (e) => {
    console.log(e.target.value);
    setpassword(e.target.value);
  }

  const CityChange = (e) => {
    setcityename(e.target.value);
  }

  const Game1Changed = (e) => {
    setgame1(e.target.value);
  }
  const Game2Changed = (e) => {
    setgame2(e.target.value);
  }
  const AddressChanged = (e) => {
    setaddress(e.target.value);
  }

  const NumberChanged = (e) => {
    setnumber(e.target.value);

  }

  const PackageChange = (e) => {
    console.log(e.target.value);
    
    setpackagename(e.target.value);
    if( e.target.value == 'Pro' || e.target.value == 'UltimatePro'  )
    {
      setgamecount(2);
    }
    else {
      setgamecount(1);
    }
  }

  const SubmitSignUp = () => {
    // alert("submit");
    if(email != null && password != null && game1 != null && address != null && number != null )
    {
      // alert("if");
      let games = [];
      if(game2 != null)
      {
        // let games = [];
        games.push(game1);
        games.push(game2);
        // console.log(games);
      }
      else {
        // let games = [];
        games.push(game1);
        // console.log(games2)
      }
      console.log(games);
      let d = selectedDate.getTime();
      let swaps = 2 ;
      
     
      firebase.auth().createUserWithEmailAndPassword(email , password)
      .then(res => {
        let userdata = {
          name: name ,
          email: email,
          password: password ,
          number: number,
          address: address,
          games: games ,
          city: cityname,
          packagename: packagename, 
          startingdate: selectedDate,
          miliseconds: d,
          rent: 0,
          uid: res.user.uid ,
          swaps: swaps
        }
        console.log(res.user.uid);
        firebase.firestore().collection('users').doc(res.user.uid).set(userdata)
        .then(response => {
          // console.log(response);
          alert("user created successfully");
          // store.dispatch(UserDetails(userdata));
          // store.subscribe(() => {
          //   console.log("subscirbe", store.getState().UserDetails);
            
          // } )
          setaddress('');
          setname('');
          setgame1('');
          setgame2('');
          setnumber('');
          setemail('');
          setpassword('');
          setpackagename('');
          history.push("/User");
        })
        .catch(error => {
          console.log(error);
        })
      })
      .catch(err => {
        alert(JSON.stringify(err.message));
        // console.log(err);
      })
     
    }
    else {
      alert("empty");
    }
   
  }
  


  return (
   
    <div className="RightDiv" >
    <h1 style={{ color: "yellow" , marginTop: '20px' , marginBottom: '40px' }} >Create Account</h1>
    <div className="InputStyle" >
    <FontAwesomeIcon icon={faUser} size="xs" style={{ color: "white" , paddingLeft: '2px'}} />
    <input value={name}  placeholder="Name" style={{ color: 'yellow' , backgroundColor: 'black' , borderStyle: 'none'
    , paddingLeft: '5px' , outline: 'none' }}
    onChange={(e) => NameChange(e) }
    className= "inputfield"
    />

    </div>
    <div className="InputStyle" style={{ marginTop: '20px' }}  >
    <FontAwesomeIcon icon={faEnvelope} size="xs" style={{ color: "white" , paddingLeft: '2px'}} />
    <input value={email} placeholder="Email" style={{ color: 'yellow' , backgroundColor: 'black' , borderStyle: 'none'
    , paddingLeft: '5px' , outline: 'none' }}
    onChange={(e) => EmailChange(e) }
    className= "inputfield"
    />

    </div>
    <div className="InputStyle" style={{ marginTop: '20px' }}  >
    <FontAwesomeIcon icon={faLock} size="xs" style={{ color: "white" , paddingLeft: '2px'}} />
    <input  value={password} placeholder="*********" style={{ color: 'yellow' , backgroundColor: 'black' , borderStyle: 'none'
    , paddingLeft: '5px' , outline: 'none' }}
    onChange={(e) => PasswordChange(e) }
    className= "inputfield"
    />

    </div>
    
    <select className="CityOptionStyle" value={cityname} onChange={(e) => CityChange(e) }   >
    <option value="Karachi">Karachi</option>
    <option value="OutsideKarachi">OutsideKarachi</option>
     </select>

     <select  onChange={(e) => PackageChange(e) } value={packagename} className="CityOptionStyle" >
    <option value="Stryker">Stryker</option>
    <option value="Pro">Pro</option>
    <option value="Reapers">Reapers</option>
    <option value="UltimatePro">UltimatePro   </option>
     </select>
     <div className="InputStyle" style={{ marginTop: '25px' }}  >
    <FontAwesomeIcon icon={faGamepad} size="xs" style={{ color: "white" , paddingLeft: '2px'}} />
    <input value={game1} placeholder="Current Game" style={{ color: 'yellow' , backgroundColor: 'black' , borderStyle: 'none'
    , paddingLeft: '5px' , outline: 'none' }}
    onChange={(e) => Game1Changed(e) }
    className= "inputfield"
    />
    </div>
    { gamecount == 2 && 

<div className="InputStyle" style={{ marginTop: '25px' }}  >
<FontAwesomeIcon icon={faGamepad} size="xs" style={{ color: "white" , paddingLeft: '2px'}} />
<input value={game2} placeholder="Current Game" style={{ color: 'yellow' , backgroundColor: 'black' , borderStyle: 'none'
  , paddingLeft: '5px' , outline: 'none' }}
  onChange={(e) => Game2Changed(e) }
className= "inputfield"
  />
      </div>
    
    }
     <DatePicker
      onChange={(date) => DateChange(date)}
      value={selectedDate}
      className="react-date-picker"
          />

    <div className="InputStyle" style={{ marginTop: '25px' }}  >
    <FontAwesomeIcon icon={faPhoneAlt} size="xs" style={{ color: "white" , paddingLeft: '2px'}} />
    <input value={number}  placeholder="Number"  style={{ color: 'yellow' , backgroundColor: 'black' , borderStyle: 'none'
    , paddingLeft: '5px' , outline: 'none'  }}
    className= "inputfield"
    onChange= {(e) => NumberChanged(e) }
    />
    </div>  

    <div className="AreaInputStyle" style={{ marginTop: '25px' }}  >
    <FontAwesomeIcon icon={faMapMarkerAlt} size="xs" style={{ color: "white" , paddingLeft: '2px'}} />
    <textarea  value={address} placeholder="Address" style={{ color: 'yellow' , backgroundColor: 'black' , borderStyle: 'none'
    , paddingLeft: '5px' , outline: 'none'  , padding: '5px' }}
    onChange={(e) => AddressChanged(e) }
    className= "inputfield"
    />
    </div>  

    <button className="SubmitButton"  onClick={() => SubmitSignUp() } >Submit</button>


    </div>
  );
}

export default SignUp;
