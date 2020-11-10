import React , {useEffect} from 'react';
import './style.css';
import store from '../../redux/store';
// import './App.css';

import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  Link
} from "react-router-dom";

const  AdminDashboardScreeen  = () =>  {

    useEffect(() => {
        console.log(store.getState().AdminState);
        store.subscribe(() => {
            let admin = store.getState().AdminState;
        } )
       
    }, [])

  return (
    <div >
        <p>admin dashboard</p>
        <Link to="/deliveries" >deliveries</Link>
        <Link to="/addgames" >add games</Link>
        {/* <div></div> */}
    </div>
  );
}

export default AdminDashboardScreeen;
