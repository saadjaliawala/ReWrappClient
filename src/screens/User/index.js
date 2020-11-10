import React , {useEffect , useState } from 'react';
import './style.css';
import firebase from '../../Config/firebase';
import { useHistory} from 'react-router-dom';
import store from '../../redux/store';
import UserDetails from '../../redux/actions/UserDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';


// import firebase from '../../Config/firebase';
// import './App.css';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

const  UserScreeen  = () =>  {

  const [availablegames , setavailablegames] = useState([]);
  const [user , setuser] = useState();
  const [userpackagename , setuserpackagename] = useState();
  const [ swapmodal , setswapmodal] = useState(false);
  const [swapgame , setswapgame] = useState();
  const [selected , setselected] = useState();
  const [rent , setrent] = useState();
  const [selectedgameobj , setselectedgameobj] = useState();
  const [swapgameobj , setswapgameobj] = useState();
  const [dummyavailablegames , setdummyavailablegames] =  useState();
  

  useEffect(() => {
    
    setuser(store.getState().UserDetails);
    let packg = store.getState().UserDetails?.user?.packagename;
      setrent(store.getState().UserDetails?.user?.rent , "rent");
      setselected(store.getState().UserDetails?.user?.games[0].gamename);
      console.log(store.getState().UserDetails?.user?.games[0].gamename , " slected" );
      let slectedobj = [];
      slectedobj = store.getState().UserDetails?.user?.games[0];
      console.log(slectedobj);
      if(slectedobj != undefined)
      {
      
        slectedobj.isSelected = true;
        setselectedgameobj(slectedobj);
      }
      
      
      setuserpackagename(packg);





   
    // console.log("user" , store.getState().UserDetails);
    store.subscribe(() => {
      setuser(store.getState().UserDetails);
      // console.log( "user.js" , store.getState().UserDetails);
      let packg = store.getState().UserDetails?.user?.packagename;
      setrent(store.getState().UserDetails?.user?.rent , "rent");
      setselected(store.getState().UserDetails?.user?.games[0].gamename);
      console.log(store.getState().UserDetails?.user?.games[0].gamename , " slected" );
      let slectedobj =  [];
      slectedobj =  store.getState().UserDetails?.user?.games[0];
      // slectedobj.isSelected = true;
      setselectedgameobj(slectedobj);
      setuserpackagename(packg);
    // console.log("user" , store.getState().UserDetails.user.games[0]);

    } )
    
   

    firebase.firestore().collection('availablegames')
    .onSnapshot((data) => {
    let array = [];
      // console.log( "data" , data);
      data.forEach(datas => {
        // console.log( "n" , datas.data());
        array.push(datas.data());
      })
      setavailablegames([...array]);
    } )
    

   
  }, [])
    let history = useHistory();

    const SubmitSignOut = () => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          })
          .then(res => {
            history.push('./');
            store.dispatch(UserDetails(null));
          })
          .catch(function(error) {
            // An error happened.
          });
          
      }



      const SwapClick = (gamename , data ) => {
        console.log(data);
        
        setswapgame(gamename);
        setswapgameobj(data);
        let games = user?.user?.games;
        console.log(games);
        // console.log(user?.user.games);
        // alert("swap");
        setswapmodal(true);
        if(swapmodal == false )
        {
          setswapmodal(true);

        }
        else {
          setswapmodal(false);
        }
      }




      const _renderavailablegames = () => {
        let pckname = user?.user?.packagename;
        // console.log(pckname);
        // console.log( "available" , availablegames);
        // console.log( "package nameeee" , userpackagename);
        return(
          <div>
              { availablegames?.map((data , index) => {
          // console.log("ava" ,  data?.quantity);
          // console.log( "pack" , userpackagename);
          // console.log(data);
          if(pckname == 'Stryker' )
          {
            // console.log("a");

            if(pckname == data.packagename  && data.quantity > 0 )
            {
              // console.log("a inner");
             
          return(
            <div className="availablegamecontainer"  >
            <img   src={data.imageurl}  className="swapimagestyle"  />
            <p className="usergamenamestyle" >{data.gamename}</p>
            <button onClick={() => SwapClick(data.gamename , data )}  className="swapbuttonstyle"  >Swap Button</button>
          </div>
          );
            }
          }
          else if (pckname == 'Reapers'  )
          {
            
            // alert("ciondition a");
              if(data.packagename == 'Reapers' || data.packagename == 'Stryker' && data.quantity > 0 )
              {
                // alert("condition b");
                return(
                  <div className="availablegamecontainer"  >
                  <img   src={data.imageurl}  className="swapimagestyle"  />
                  <p className="usergamenamestyle" >{data.gamename}</p>
                  <button onClick={() => SwapClick(data.gamename , data )}  className="swapbuttonstyle"  >Swap Button</button>
                </div>
                );

              }
          }

          else if (pckname == 'Pro')
          {
            console.log( data.quantity  , data.gamename);
            // let bol = data.quantity > 0;
            // console.log(data.packagename == 'Reapers' || data.packagename == 'Stryker' || data.packagename == 'Pro'   );
            // alert("ciondition a");
            if(data.quantity > 0){
              if(data.packagename == 'Reapers' || data.packagename == 'Stryker'  || data.packagename == 'Pro'   )
              {
                // alert("condition b");
                return(
                  <div className="availablegamecontainer"  >
                    <img   src={data.imageurl}  className="swapimagestyle"  />
                    <p   >{data.gamename}</p>
                    <button onClick={() => SwapClick(data.gamename  , data ) } >Swap Button</button>
                  </div>
                );
              }
            }
              
            }


          else if (pckname == 'UltimatePro')
          {
            // console.log(data.packagename == 'Reapers' || data.packagename == 'Stryker' || data.packagename == 'Pro'   );
            // alert("ciondition a");
            if(data.quantity > 0){
          if(data.packagename == 'Reapers' || data.packagename == 'Stryker'  || data.packagename == 'Pro' || data.packagename == 'UltimatePro' && data.quantity > 0  )
              {
                // alert("condition b");
                return(
                  <div className="availablegamecontainer"  >
                    <img   src={data.imageurl}  className="swapimagestyle"  />
                    <p className="usergamenamestyle" >{data.gamename}</p>
                    <button onClick={() => SwapClick(data.gamename , data )}  className="swapbuttonstyle"  >Swap Button</button>
                  </div>
                ); }

          }
              }
        } )  }



          </div>
        );
      }

      const Selected = (e) => {
        
        // console.log(e.target.value);
        setselected(e.target.value);

        console.log(user?.user?.games , " user");
        // console.log(selectedgameobj);
        let array = [];

        let slectedarray = user?.user?.games.filter((data , i ) => {
          // console.log(data.gamename == e.target.value);
          // console.log(data.gamename , e.target.value);
          return data.gamename === e.target.value;
        } )

        console.log(selectedgameobj);
        setselectedgameobj([...slectedarray]);

        // console.log(slectedarray , "arr")
      }







      const SwapConfirm = async() => {

        if(user?.user?.swaps > 0 )
        {

        let uid = user?.user?.uid;
        // console.log(user?.user?.uid);
        let games = user?.user?.games;
        let dummyselect = selected;
        // console.log( "dummy" ,  dummyselect);
        // console.log( "swap" , swapgame);
        // console.log(games);
        let dummygames = games.filter((v , i) => {
          return v.gamename != dummyselect;
        } )
        swapgameobj.quantity = 1;
        console.log(swapgameobj);
        setswapgameobj(swapgameobj);
        dummygames.push(swapgameobj);
        console.log(dummygames);

        var bool ;
        let i  = 0;
        let c  = 0 ;
        // console.log("swap game " , swapgame );
        // swap game is the game which user choose from available games
        console.log("dummy select" , dummyselect );

        await  firebase.firestore().collection('availablegames')
        .where("gamename" , "==" , swapgame ).get().then(querysnapshot => {
          querysnapshot.forEach(dd => {
           
            let update = dd.data();
            let id = dd.id;
           
              if(update.quantity > 0) {
              update.quantity = update.quantity - 1;
              // console.log(update);
              firebase.firestore().collection('availablegames')
              .doc(id).update(update)
              
             
             
               firebase.firestore().collection('availablegames')
              .get()
              .then(querysnapshot => {
                let size = querysnapshot.size;
                // console.log("snap size" , querysnapshot.size );
                

               querysnapshot.forEach(data => {
                //  console.log(  data.data());
                 
                 ++i;
                //  console.log(i);
                 if(data.data().gamename == dummyselect )
                 {
                  let updating = data.data();
                  let id = data.id;
                  console.log(id);
                  updating.quantity = updating.quantity + 1;
                  firebase.firestore().collection('availablegames')
                  .doc(id).update(updating);
                 }
                 else {
                  
                  ++c;
                 }
                
                //  console.log("c" , c )
          if( size == c ){
           console.log("done with logic");
          //   let game = {
          //   gamename: dummyselect ,
          //   quantity: 1 ,
          //   packagename: userpackagename,

          // }
          firebase.firestore().collection('availablegames').add(selectedgameobj)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
         }

               

               })
              //  console.log(i , c);
               
              })

            }
            else {
              console.log(swapgame , "swapgame");
              // update.gamename = dummyselect;

            }

          })
        })

        // console.log("user package name" , userpackagename );
       
          let swaps = user?.user.swaps - 1 ;

          console.log("swaps " , swaps );

        firebase.firestore().collection('users').doc(uid)
        .update({games: dummygames , rent: 0 , swaps: swaps })
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          // console.log(err);
        })
       

       console.log(user?.user , "user");

       let deliverydetail = {
         name: user?.user.name,
         email: user?.user.email ,
         password: user?.user.name ,
         rent: user?.user?.rent,
         swapgame: swapgame,
         dummyselect: dummyselect,
         address: user?.user?.address ,
         packagename: user?.user?.packagename,
         number: user?.user?.number,
         uid: user?.user?.uid,
       }

       firebase.firestore().collection('rentaldeliveries').add(deliverydetail)
       .then()
       .catch()
        
       console.log("delivery details" , deliverydetail );
      //  firebase.firestore().collection('users')
      setswapmodal(false);



      }
      else {
        alert("your swaps for this month are ended");
        setswapmodal(false);
      }
      
      }



     const CloseSwapModal = () => {
       setswapmodal(false);
     }



const  _renderswapmodal = () => {
  console.log(user?.user);
  let games = user?.user?.games;
  console.log(games);
  return(
    <div className="modalstyle" >
       <FontAwesomeIcon  icon={faTimes} size="sm" color="black"  className="modalcrossstyle"  onClick={() => CloseSwapModal() }  />
      <select  className="selectoptionstyle" onChange={(e) => Selected(e) } >
    {games?.map((data , index) => {
      return(
      
      <option value={data.gamename} >{data.gamename}</option>
      );
    } )}
    </select>

    <div  >
      <button onClick={() => SwapConfirm() }className="swapconfirmstyle"  >swap confirm</button>

  </div>
  </div>

  );
  
}


  return (
    
    <div  style={{  width:' 100% '  }} >


      <div className="userprofile" >
  <div><p>Welcome : {user?.user?.name}</p></div>
  <div className="dropdown " >
    <FontAwesomeIcon  icon={faUserCircle} size="2x" color="blue" className="dropbtn"   />
    <div class="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
    </div>
      </div>





      <div>
        <p>your rent due is  {rent} </p>
      </div>
      { swapmodal &&  _renderswapmodal()  }
        {/* <p style={{  }} >users screen</p> */}
        <button className="SubmitButton"  onClick={() => SubmitSignOut() } >LogOut</button>
        {_renderavailablegames()}
            </div>
  );
}

export default UserScreeen;
