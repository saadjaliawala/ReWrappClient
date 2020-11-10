import React from 'react';
import './style.css';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import RecentlyAdded from '../../components/RecentlyAdded';
import Packages from '../../components/Packages';
import Slider from '../../components/Slider';
import Chat from '../../components/Chat';
// import './App.css';

import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  Link
} from "react-router-dom";

const  HomeScreeen  = () =>  {
  return (
    <div >
      <Chat />
      <NavBar />
      <Slider />
      <Packages />
      <RecentlyAdded />
      <Footer />
        
    </div>
  );
}

export default HomeScreeen;
