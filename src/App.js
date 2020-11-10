import React  , {useEffect , useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import HomeScreen from './screens/Home';
import SignUpScreen from './screens/SignUp';
import UserScreen from './screens/User';
import AdminLoginScreeen from './screens/AdminLogin';
import DeliveriesScreen from './screens/Deliveries';
import AddGames from './screens/AddGames';
import PurhcaseScreen from './screens/PurchaseGames';
import CartScreen from './screens/ShoppingCart';
import CheckoutScreeen from './screens/Checkout';
import RentalDeliveriesScreeen from './screens/RentalDeliveries';
import StartMembershipScreeen from './screens/StartMembership';
import AdminDashboardScreeen from './screens/AdminDashboard';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserDetails from '././redux/actions/UserDetails';
import firebase from './Config/firebase';

// import history from "./history";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // Redirect
} from "react-router-dom";

const  App = () =>  {

  const [adminstate , setadminstate] = useState();
  const [user , setuser] = useState();

  // firebase.auth().onAuthStateChanged(user => {
  //   console.log("auth state changed");
    
  //   console.log(user.uid);
    
  //   firebase.firestore().collection('users').doc(user.uid)
  //   .get()
  //   .then(datas => {
  //     console.log(datas.data());
  //     store.dispatch(UserDetails(datas.data()));
  //     // datas.data()
    
  //   })

  // })
  const onAuthStateChanged = (user => {
    setuser(user);
    if(user) {
    console.log("auth state changed");


      firebase.firestore().collection('users').doc(user.uid)
      .onSnapshot(datas  => {
        // console.log(datas.data() , "on snapshot" );
        // console.log(datas.data());
      store.dispatch(UserDetails(datas.data()));
      let oldmiliseconds = datas.data().miliseconds;
      console.log(oldmiliseconds , "mili");
     
      var d = new Date();
      var n = d.getTime();
      let city = datas.data().city;
      console.log(city , " ctuy ");
      let packagename = datas.data().packagename;
      console.log(packagename);

      let difference = n - oldmiliseconds;
      // console.log("differcnce" , difference );
      if (difference > 2592000000) {

        let updateduser = datas.data();

        
          // alert("double rent");
          // console.log("Rent");

         
          let updatingdate = oldmiliseconds + 2592000000;
          let updateddate = new Date(updatingdate);
          let datees = updateddate.toString();
          updateduser.startingdate = datees;
          updateduser.miliseconds = updatingdate;
          updateduser.swaps = 2;
  
         
  
          if(city == 'Karachi')
          {
            if(packagename == 'Stryker'){
              updateduser.rent =   updateduser.rent + 600;
            }
            else if(packagename == 'Reapers' ){
              updateduser.rent =  updateduser.rent + 800;
            }
            else if(packagename == 'Pro' ){
              updateduser.rent =  updateduser.rent + 1100;
            }
            else if(packagename == 'UltimatePro' ){
              updateduser.rent =  updateduser.rent + 1800;
            }
  
  
          }
          else {
            if(packagename == 'Stryker'){
              updateduser.rent = 1000;
            }
            else if(packagename == 'Reapers' ){
              updateduser.rent = 1200;
            }
            else if(packagename == 'Pro' ){
              updateduser.rent = 1800;
            }
            else if(packagename == 'UltimatePro' ){
              updateduser.rent = 2400;
            }
  
          }
  


        

      // console.log(updateduser, "updated usereer else");

        firebase.firestore().collection('users').doc(user.uid)
        .update(updateduser);

        store.dispatch(UserDetails(updateduser));

      }
      




      } )

      













    // firebase.firestore().collection('users').doc(user.uid)
    // .get()
    // .then(datas => {
    //   // console.log(datas.data());
    //   store.dispatch(UserDetails(datas.data()));
    //   let oldmiliseconds = datas.data().miliseconds;
    //   console.log(oldmiliseconds , "mili");
     
    //   var d = new Date();
    //   var n = d.getTime();
    //   let city = datas.data().city;
    //   console.log(city , " ctuy ");
    //   let packagename = datas.data().packagename;
    //   console.log(packagename);

    //   let difference = n - oldmiliseconds;
    //   console.log("differcnce" , difference );
    //   if (difference > 3600000) {

    //     let updateduser = datas.data();

    //     if( difference >  7200000){
    //       // alert("double rent");

         
    //       let updatingdate = oldmiliseconds + 7200000;
    //       let updateddate = new Date(updatingdate);
    //       let datees = updateddate.toString();
    //       updateduser.startingdate = datees;
    //       updateduser.miliseconds = updatingdate;
    //       updateduser.swaps = 2;
  
         
  
    //       if(city == 'Karachi')
    //       {
    //         if(packagename == 'Stryker'){
    //           updateduser.rent = 1200;
    //         }
    //         else if(packagename == 'Reapers' ){
    //           updateduser.rent = 1600;
    //         }
    //         else if(packagename == 'Pro' ){
    //           updateduser.rent = 2200;
    //         }
    //         else if(packagename == 'UltimatePro' ){
    //           updateduser.rent = 3600;
    //         }
  
  
    //       }
    //       else {
    //         if(packagename == 'Stryker'){
    //           updateduser.rent = 2000;
    //         }
    //         else if(packagename == 'Reapers' ){
    //           updateduser.rent = 2400;
    //         }
    //         else if(packagename == 'Pro' ){
    //           updateduser.rent = 3600;
    //         }
    //         else if(packagename == 'UltimatePro' ){
    //           updateduser.rent = 4800;
    //         }
  
    //       }
  


    //     }
    //     else {

    //       alert("single rent");

    //     let updateduser = datas.data();
    //     let updatingdate = oldmiliseconds + 3600000;
    //     let updateddate = new Date(updatingdate);
    //     let datees = updateddate.toString();
    //     updateduser.startingdate = datees;
    //     updateduser.miliseconds = updatingdate;
    //     updateduser.swaps = 2;

       

    //     if(city == 'Karachi')
    //     {
    //       if(packagename == 'Stryker'){
    //         updateduser.rent = 600;
    //       }
    //       else if(packagename == 'Reapers' ){
    //         updateduser.rent = 800;
    //       }
    //       else if(packagename == 'Pro' ){
    //         updateduser.rent = 1100;
    //       }
    //       else if(packagename == 'UltimatePro' ){
    //         updateduser.rent = 1800;
    //       }


    //     }
    //     else {
    //       if(packagename == 'Stryker'){
    //         updateduser.rent = 1000;
    //       }
    //       else if(packagename == 'Reapers' ){
    //         updateduser.rent = 1200;
    //       }
    //       else if(packagename == 'Pro' ){
    //         updateduser.rent = 1800;
    //       }
    //       else if(packagename == 'UltimatePro' ){
    //         updateduser.rent = 2400;
    //       }

    //     }

    //   }

    //     firebase.firestore().collection('users').doc(user.uid)
    //     .update(updateduser);

    //     store.dispatch(UserDetails(updateduser));

    //   }
    // })


  }
  else {
    setuser(null);
    store.dispatch(UserDetails(null));
  }

  }) 
  useEffect(() => {
    firebase.auth().onAuthStateChanged(onAuthStateChanged);  
    let admin = store.getState().AdminState;
    console.log("Admin state" , admin)
    setadminstate(admin);
    store.subscribe(() => {
      let admin2 = store.getState().AdminState;
      setadminstate(admin2);
      console.log("app.js" , admin2);
    } )
  },[])

  return (
    <Provider store={store}  >
    <Router  >
      <div>
        
       
        <Switch>

        {/* <Route
                exact
                path="/"
                render={() => {
                    return (
                      user ?
                      <Redirect to="/User" /> :
                      <Redirect to="/" /> 
                    )
                }}
              /> */}

       


          <Route exact path="/SignUp">
            <SignUpScreen />
          </Route>

         
            <Route exact  path="/User">
            <UserScreen />
          </Route> 
         
          <Route  exact path="/admin">
            <AdminLoginScreeen />
          </Route>
          <Route exact path="/admindashboard">
            < AdminDashboardScreeen />
          </Route>

          <Route exact path="/deliveries">
            < DeliveriesScreen />
          </Route>

          <Route exact path="/addgames">
            < AddGames />
          </Route>

          <Route exact path="/purchasegames">
            < PurhcaseScreen />
          </Route>

          <Route exact path="/cart">
            <CartScreen />
          </Route>

          <Route exact path="/checkout">
            <CheckoutScreeen />
          </Route>

          <Route exact path="/rentaldeliveries">
            <RentalDeliveriesScreeen />
          </Route>

          <Route exact path="/startmembership">
            <StartMembershipScreeen />
          </Route>
 

          <Route  exact path="/">
            <HomeScreen />
          </Route>

         
        </Switch>
      </div>
    </Router>

    </Provider>
      
    
  );
}

export default App;
