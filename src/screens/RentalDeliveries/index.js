import React , {useEffect, useState} from 'react';
import './style.css';
import firebase from '../../Config/firebase';
import SidebarComponent from '../../components/Sidebar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const  RentalDeliveriesScreeen  = () =>  {

  const [deliveries , setdeliveries] = useState([]);

    useEffect(() => {

      let array = [];
      firebase.firestore().collection('rentaldeliveries')
      .onSnapshot(querySnapshot => {
        let array = [];
        setdeliveries([...array]);
        // console.log(querySnapshot._data() , "deliveries screen" );
        querySnapshot.forEach(datas => {
          console.log( "data" , datas.data());
          let value = datas.data();
          value.id = datas.id;
          array.push(value);
          
          // let newvalue = datas.data().cartItem;
          // value.id = datas.id;
          // let dummy =   newvalue?.map((mapdata , index )  => {
          //   console.log(mapdata , "mapdata" );
          // } )
          

        })

        setdeliveries([...array]);
      })
       
       
    }, [])


    const DeliveryConfirm = (data) => {
      console.log(data);
      firebase.firestore().collection('rentaldeliveries').doc(data.id)
      .delete()
      .then((res) => console.log(res) )
      .catch((err) => console.log(err) );
    }

  return (
    <div >
      <SidebarComponent />
        {/* <h1> Rental  Deliveries Screeen </h1> */}
        {deliveries?.map((data , index ) => {
          console.log(data , "deded");
          return(
            <div>
              <div className="innerrowdetails" > 
              <h4>NAME  :  </h4>
              <p style={{ paddingLeft: '10px' }} >{data.name}</p>
                {/* <p style={{ paddingLeft: '10px' }}  >{data.lastname}</p> */}
                </div>

              <div  className="innerrowdetails" >
                <h4> ADDRESS :  </h4>
                <p style={{ paddingLeft: '10px' }} >{data.address}</p>
              </div>

              <div  className="innerrowdetails" >
                <h4> PACKAGE NAME :  </h4>
                <p style={{ paddingLeft: '10px' }} >{data.packagename}</p>
              </div>

              <div  className="innerrowdetails" >
                <h4> NUMBER :  </h4>
                <p style={{ paddingLeft: '10px' }} >{data.number}</p>
              </div>
         
              <div  className="innerrowdetails" >
                <h4> TOTAL RENT DUE :  </h4>
                <p style={{ paddingLeft: '10px' }} >{data.rent}</p>
              </div>


              <div  className="innerrowdetails" >
                <h4> SWAP GAME :  </h4>
                <p style={{ paddingLeft: '10px' }} >{data.swapgame}</p>
              </div>

              <div  className="innerrowdetails" >
                <h4> SELECTED  GAME :  </h4>
                <p style={{ paddingLeft: '10px' }} >{data.dummyselect}</p>
              </div>
            
         
         

          <button className="DeliveryConfirmBtn" onClick={() => DeliveryConfirm(data) }  >  Delivery Done</button>

            </div>
          );
        } ) }
        {/* <div></div> */}
    </div>
  );
}

export default RentalDeliveriesScreeen;
