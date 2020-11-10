import React , {Component , useEffect } from 'react';
// import { NavLink } from "react-router-dom";
import './style.css';

import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  Link , 
  NavLink, 
  Redirect
} from "react-router-dom";


// style={{ marginBottom: props.width }}
const Navbar = (props) => {

  // console.log(props, " props");
useEffect(() => {

  console.log(props, " props");
  
}, [])


let history = useHistory();


const CartNavBar = () => {
  history.push('./cart');
}

    return(

        
        <div>
        <div className="togglearea">
<label for="toggle">
<span></span>
<span></span>
<span></span>
</label>
</div>
<input type="checkbox" id="toggle" />

<div className="navbar" style={{ marginBottom: props.width }}   >
{/* <img src={gGtLlm} className="image" style={{paddingLeft: '2%' }} /> */}
{/* <a style={{ paddingLeft: '0px'  }} className="NavbarValues" > HOME </a> */}
<NavLink to="/" className="NavbarValues" style={{ textDecoration: 'none' }} > HOME</NavLink>
<Link to="/SignUp" className="NavbarValues" style={{ textDecoration: 'none' }} > Rental SignUp</Link>
<Link to="/purchasegames"  className="NavbarValues" style={{ textDecoration: 'none' }} >Purchase Games</Link>

{/* <a className="NavbarValues" > ABOUT US </a>
<a className="NavbarValues" > VENTURE GAME LIBRARY </a> */}
<a className="NavbarValues" > Packages </a>
<a className="NavbarValues" > Contact Us </a>

<FontAwesomeIcon 
icon={faShoppingCart}
size="sm"
color="white"
onClick={() => CartNavBar() }
className="NavbarValues"

/>



      </div>

          </div>

    );
}


export default Navbar;
