import React , {useEffect, useState} from 'react';
import './style.css';
import firebase from '../../Config/firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const  DeliveriesScreeen  = () =>  {

  const [deliveries , setdeliveries] = useState([]);

    useEffect(() => {

      let array = [];
      firebase.firestore().collection('deliveries')
      .onSnapshot(querySnapshot => {
        let array = [];
        setdeliveries([...array]);
        // console.log(querySnapshot._data() , "deliveries screen" );
        querySnapshot.forEach(datas => {
          console.log(datas.data());
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
      firebase.firestore().collection('deliveries').doc(data.id)
      .delete()
      .then((res) => console.log(res) )
      .catch((err) => console.log(err) );
    }

  return (
    <div >
        <h1>Deliveries Screeen </h1>
        {deliveries?.map((data , index ) => {
          console.log(deliveries , "deded");
          return(
            <div>
              <div className="innerrowdetails" > 
              <h4>NAME  :  </h4>
              <p style={{ paddingLeft: '10px' }} >{data.firstname}</p>
                <p style={{ paddingLeft: '10px' }}  >{data.lastname}</p>
                </div>

              <div  className="innerrowdetails" >
                <h4> ADDRESS :  </h4>
                <p style={{ paddingLeft: '10px' }} >{data.address}</p>
              </div>

              <div  className="innerrowdetails" >
                <h4> CITY :  </h4>
                <p style={{ paddingLeft: '10px' }} >{data.city}</p>
              </div>

              <div  className="innerrowdetails" >
                <h4> PROVINCE :  </h4>
                <p style={{ paddingLeft: '10px' }} >{data.province}</p>
              </div>
         
              <div  className="innerrowdetails" >
                <h4> TOTAL BILL :  </h4>
                <p style={{ paddingLeft: '10px' }} >{data.totalbill}</p>
              </div>


              <div  className="innerrowdetails" >
                <h4> MOBILE NUMBER :  </h4>
                <p style={{ paddingLeft: '10px' }} >{data.number}</p>
              </div>
            
         
          {data.cartItem.map((itemdata , index) => {
            return(
            <div className="innerrowdetails" >
                <h4>GAMENAME</h4>
              <p style={{ paddingLeft: '10px' }} > {itemdata.gamename} </p>
              </div>
            );
          } )}

          <button className="DeliveryConfirmBtn" onClick={() => DeliveryConfirm(data) }  >  Delivery Done</button>

            </div>
          );
        } ) }
        {/* <div></div> */}
    </div>
  );
}

export default DeliveriesScreeen;
