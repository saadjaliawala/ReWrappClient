import React , {useEffect, useState} from 'react';
import './style.css';
import firebase from '../../Config/firebase';
import store from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from  '@fortawesome/free-solid-svg-icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const  StartMembershipScreeen  = () =>  {

 

    const [availablegames , setavailablegames] = useState([]);
    const [user , setuser] = useState();
    const [userpackagename , setuserpackagename] = useState();
    const [rent , setrent] = useState();
    const [selectedgames , setselectedgames] = useState([]);
    const [dummyavailablegames , setdummyavailablegames] =  useState();
    const [packagecounter , setpackagecounter] = useState(0);
    let [counter , setcounter] = useState(0);


    useEffect(() => {


        setuser(store.getState().UserDetails);
   
        // console.log("user" , store.getState().UserDetails);
        store.subscribe(() => {
          setuser(store.getState().UserDetails);
          console.log( "user.js" , store.getState().UserDetails);
          let packg = store.getState().UserDetails?.user?.packagename;
          if(packg == 'Stryker')
          {
              setpackagecounter(1);
          }
          else if(packg == 'Reapers'){
            setpackagecounter(1);

          }
          else if(packg == 'Pro'){
            setpackagecounter(2);

          }
          else if(packg == 'UltimatePro'){
            setpackagecounter(2);

          }
          
          

          setrent(store.getState().UserDetails?.user?.rent , "rent");
          
          setuserpackagename(packg);
        // console.log("user" , store.getState().UserDetails.user.games[0]);
    
        } )





        firebase.firestore().collection('availablegames')
        .onSnapshot((data) => {
        let array = [];
          // console.log( "data" , data);
          data.forEach(datas => {
            // console.log( "n" , datas.data());
            let value = datas.data();
            value.id = datas.id;
            array.push(value);
          })
          setavailablegames([...array]);
          setdummyavailablegames([...array]);
        } )
        

       
    }, [])


    const StartMembership = () => {
        // alert("confirm");
        console.log(counter);
        if(counter  <= packagecounter )
        {
           let newarray = availablegames.filter((data , i) => {
               console.log(data);
               return data.isSelected == true;
           })
        //    console.log(newarray);
           newarray.map((datas , i) => {
               newarray[i].isSelected = false;
               console.log(datas , "datas");

            firebase.firestore().collection('availablegames').doc(datas.id)
           .get()
           .then(querysnapshot => {
               console.log(querysnapshot.data());
               console.log("checking asyn");
               let gamedata = querysnapshot.data();
               gamedata.quantity = gamedata.quantity -1;
               
               firebase.firestore().collection('availablegames').doc(datas.id)
               .update(gamedata)
            
           })
        
          
           } )

           
           let userdata = user?.user;
           console.log(userdata , "user");
           firebase.firestore().collection('users').doc(userdata.uid)
           .update({games: newarray})

        }
        else {
            alert("your  package doesnt support this much games please unselect  ");
        }
    }


    const CheckBoxSelect = (e , data , gamename , index ) => {
        console.log(counter <= packagecounter );
       
            if(e.target.checked == true)
            {
                counter++;
                setcounter(counter);
            }
            else {
                counter--;
                setcounter(counter);
            }
         
        
        console.log(packagecounter , "packagecounter" );
        console.log(userpackagename , " userpackagename");
        console.log(e.target.value , gamename);
        console.log(e.target.checked);
        // console.log("available games" , availablegames );
        console.log(index , "index");
        availablegames[index].isSelected = e.target.checked;
        console.log(availablegames  , "availablegames" );
        setavailablegames(availablegames);
        
      
    }


    const _renderavailablegames = () => {
        let pckname = user?.user?.packagename;
 
        return(
          <div>
              { availablegames?.map((data , index) => {

          if(pckname == 'Stryker' )
          {
            // console.log("a");

            if(pckname == data.packagename  && data.quantity > 0 )
            {
              // console.log("a inner");
             
          return(
            <div className="showgamescontainer" >
              <img src={data.imageurl} className="startmembershipimagestyle"   />
              <p>{data.gamename}</p>
              <input
                type="checkbox"
                value={data.gamename}
                onChange={(e) => CheckBoxSelect(e , data , data.gamename , index ) }
  
                    />
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
                  <div className="showgamescontainer" >
                    <p>{data.gamename}</p>
                    <input
                type="checkbox"
                value={data.gamename}
                onChange={(e) => CheckBoxSelect(e , data , data.gamename  , index  ) }
  
                    />
                    
                  </div>
                );

              }
          }

          else if (pckname == 'Pro')
          {
            console.log( data.quantity  , data.gamename);
           
            if(data.quantity > 0){
              if(data.packagename == 'Reapers' || data.packagename == 'Stryker'  || data.packagename == 'Pro'   )
              {
                // alert("condition b");
                return(
                  <div className="showgamescontainer" >
                    <p>{data.gamename}</p>
                    <input
                type="checkbox"
                value={data.gamename}
                onChange={(e) => CheckBoxSelect(e , data , data.gamename , index ) }
  
                    />
                   
                  </div>
                );
              }
            }
              
            }


          else if (pckname == 'UltimatePro')
          {
            
            if(data.quantity > 0){
          if(data.packagename == 'Reapers' || data.packagename == 'Stryker'  || data.packagename == 'Pro' || data.packagename == 'UltimatePro' && data.quantity > 0  )
              {
                // alert("condition b");
                return(
                  <div className="showgamescontainer" >
                   
                   
                     <p>{data.gamename}</p>
                     <input
                        type="checkbox"
                        value={data.gamename}
                        onChange={(e) => CheckBoxSelect(e , data , data.gamename , index ) }
                    />
                    
                  </div>
                ); }

          }
              }
        } )  }



          </div>
        );
      }


      const Search = (e) => {
       
     let result =  dummyavailablegames?.filter((v, i) => {
        //  var res = v.gamename.charAt(0);
         return v.gamename.toLowerCase().startsWith(e.target.value.toLowerCase());
        // return value.toLowerCase().startsWith(v.gamename.toLowerCase());
         
        } )
        console.log(result , "result" );
        setavailablegames(result);
      }


const _renderSearch = () => {
    return(
        <div className="searchconatainer" >
        
        <div>
          <FontAwesomeIcon  
          size="sm"
          color="grey"
          icon={faSearch}
          className="searchicon"
          />
        </div>

        <div>
        <input type="text" className="searchfield"   onChange={(e) => Search(e) }  />
        </div>
 

      </div>

    );
}





  return (
    <div >
        <p>Start Membership screen</p>
        <button className="startmembership"  onClick={() => StartMembership() }  >Start Membership</button>
        {_renderSearch()}
        {_renderavailablegames()}
    </div>
  );
}

export default StartMembershipScreeen;
