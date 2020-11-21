import React , {useEffect, useState} from 'react';
import './style.css';
import firebase from '../../Config/firebase';
import SidebarComponent from '../../components/Sidebar';

import ReactExport from "react-export-excel";



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const  DeliveriesScreeen  = () =>  {

  const [deliveries , setdeliveries] = useState([]);
  const [games , setgames ] = useState([]);
  const [deliveriesarray , setdeliveriesarray] = useState([]);

    useEffect(() => {

      let array = [];
      firebase.firestore().collection('deliveries')
      .onSnapshot(querySnapshot => {
        let array = [];
        
        setdeliveries([...array]);
        // setgames([...array2]);
        // console.log(querySnapshot._data() , "deliveries screen" );
        querySnapshot.forEach(datas => {
          // console.log(datas.data());
          let value = datas.data();
          value.id = datas.id;
          array.push(value);
          let {cartItem}  = datas.data();
          // let {gamename} = cartItem;
          

        })

        setdeliveries([...array]);

        let newarray = [];
        array.map((v, i) => {
          newarray.push(v);
          console.log(v);
          v.cartItem.map((value , index) => {
            // newarray[i].game  = value.gamename;
            newarray[i][`game${index}`]=value.gamename;
          })
  
        } )

        setdeliveriesarray([...newarray]);
  

        // setgames([...array2]);
        // console.log(array2 , "arrat2"  );
       
      })
       
       
    }, [])


    const DeliveryConfirm = (data) => {
      console.log(data);
      firebase.firestore().collection('deliveries').doc(data.id)
      .delete()
      .then((res) => console.log(res) )
      .catch((err) => console.log(err) );
    }



    const _renderExcel = () => {
      return (
        <ExcelFile element={<button>Download Data</button>}>
            <ExcelSheet data={deliveriesarray} name="Deliveries">
                <ExcelColumn label="Name" value="firstname"/>
                <ExcelColumn label="Address " value="address"/>
                <ExcelColumn label="Numbers" value="number"/>
                <ExcelColumn label="Total Bill" value="totalbill"/>
                <ExcelColumn label="City" value="city"/>
                <ExcelColumn label="Game0" value="game0"/>
                <ExcelColumn label="Game1" value="game1"/>
                {/* <ExcelColumn label="gamename" value= {(cartItem) => cartItem.gamename } /> */}

               
                
            </ExcelSheet>
          
        </ExcelFile>
    );
    }


    const Checking = () => {
      // console.log(deliveries);
      let newarray = [];
      deliveries.map((v, i) => {
        newarray.push(v);
        console.log(v);
        v.cartItem.map((value , index) => {
          // newarray[i].game  = value.gamename;
          newarray[i][`game${index}`]=value.gamename;
        })

      } )
      console.log(newarray);
    }

    const _renderCheckingButton = () => {
      console.log("checking");
      return(
        <button onClick={ () => Checking() }  >Check</button>
      );
      
    }


  return (
    <div >

        <SidebarComponent />
        {_renderCheckingButton()}
        {_renderExcel()  }

        {/* <h1>Deliveries Screeen </h1> */}
        {deliveries?.map((data , index ) => {
          // console.log(deliveries , "deded");
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
            // games.push(itemdata);
            // setgames([...games]);
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
