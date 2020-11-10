import React , {useEffect, useState} from 'react';
import './style.css';
import store from '../../redux/store';
import {carItem} from '../../redux/actions/CartItems';
import firebase from '../../Config/firebase';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import * as emailjs from 'emailjs-com';


import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  Link
} from "react-router-dom";

const  CheckoutScreeen  = () =>  {

  const [cartitem , setcartitem] = useState([]);
  const [cartsubtotal , setcartsubtotal ] = useState(0);
  const [totalbill , settotalbill] = useState(0);
  const [firstname , setfirstname ] = useState('');
  const [lastname , setlastname] = useState('');
  const [address , setaddress ] = useState('');
  const [ city , setcity ] = useState('');
  const [province , setprovince] = useState('');
  const [number , setnumber] = useState('');
  const [email , setemail] = useState('');
  const [deliverycharges , setdeliverycharges ] = useState(0);
  const [grandtotal  , setgrandtotal ] = useState(0);



  useEffect(() => {
    console.log("cartstore" , store.getState().CartItems.cartItem  );
    setcartitem([...store.getState().CartItems.cartItem]);
    let array = store.getState().CartItems.cartItem;
    let total = 0;
    array.map((data, i ) => {
      total = data.price + total;
      // console.log( "map totoal "   , data.price);
    } )
    settotalbill(total);
    setgrandtotal(total);
    store.subscribe(() => {
      console.log("cartstore" , store.getState().CartItems.cartItem  );
      // HTMLFormControlsCollection.log()
      setcartitem([...store.getState().CartItems.cartItem]);
      let array = store.getState().CartItems.cartItem;
      let total = 0;
      array.map((data, i ) => {
        total = data.price + total;
        // console.log( "map totoal "   , data.price);
      } )
      settotalbill(total);
      setgrandtotal(total);
    } )

  }, [])



  const OrderConfirm = () => {
  //   result.map(item => {
  //     const { childAccounts } = item;

  //     const child = childAccounts.map(item => {
  //         const { __values__ } = item;

  //         return __values__;
  //     });

  //     delete item.childAccounts;

  //     return {
  //         child,
  //         ...item,
  //     };
  // });


  // result = [
  //   {
  //     child: [{}],
  //     ...item,
  //   }

  // ]

// [__values__:  {}]



    // alert("order confirm ");
    if(firstname != '' && number != '' && city != '' && address != ''  )
    {
    let orderdetails = {
      firstname: firstname,
      lastname: lastname,
      email: email ,
      number: number,
      province: province,
      city: city,
      address: address ,
      totalbill: grandtotal,
      cartItem: cartitem
    }
    firebase.firestore().collection('deliveries').add(orderdetails);
    console.log(cartitem);
    let array  =  cartitem?.map((data , index ) => {
     
     
      firebase.firestore().collection('availablegames').doc(data.id).get()
      .then((res) => {
        let value = res.data();
        // console.log(res.data() , "res" );
        let quantity = value.quantity;
        if(quantity > 1){
          value.quantity = value.quantity - 1;
          firebase.firestore().collection('availablegames').doc(data.id).update(value)
          .then((response) => {
            store.dispatch(carItem([]));
            setemail('');
            setaddress('');
            setfirstname('');
            setgrandtotal('');
            setlastname('');
            setcity('');
            setprovince('');
            setnumber('');
            setdeliverycharges('');
            settotalbill('');
            

          } )
          .catch((error) => {
            console.log("error" , error );
          } )
        }
        else {
          firebase.firestore().collection('availablegames').doc(data.id).delete()
          .then((res2) => { 
            // setcartitem([]);
            store.dispatch(carItem([]));
            console.log(res);

            let message1 = "Your Order Has Been Confirmed . Your Total Bill is";
            let message2 = grandtotal;
            let message = message1 + ' ' + message2; 

            let templateParams = {
              from_name: "saadmehmood2012@gmail.com",
              to_name: email,
              subject: "Venture Game Order Confirm",
              message_html: message ,
             }
             emailjs.send(
              'gmail',
              'template_dmdqguf',
               templateParams,
              'user_h832RX4ONDvOzenslSXzZ'
             )


            setemail('');
            setaddress('');
            setfirstname('');
            setgrandtotal(0);
            setlastname('');
            setcity('');
            setprovince('');
            setnumber('');
            setdeliverycharges(0);
            settotalbill(0);
          
          } 
             )
          .catch((err2) => console.log(err2) );
        }

        
      } )
      .catch((err) => {} )
    } )
  

    // console.log(orderdetails);
  }else {
    alert("any field empty");
  }
  }

  const CityChange = (e) => {
    setcity(e.target.value);
    let cityname = e.target.value;
    console.log(cityname === 'karachi');
    if(cityname.toLowerCase() === 'karachi' )
    {
      console.log("ka");
      setdeliverycharges(150);
      setgrandtotal(totalbill + 150);
    }
    else {
      console.log("ou");
      setdeliverycharges(250);
      setgrandtotal(totalbill + 250);
    }
  }

  
  return (
    <div  className="CheckoutMainDiv" >

        {/* <h4>Billing details</h4> */}
        <NavBar  width={'5%'} />
        <div className="billingformparent" >

            <div className="billingformleft" >
              <div className="inputfield1st" >
            <div style={{ display: 'flex' , flexDirection: 'column' , width: '45%' }} > 
            <p className="labelnamestyle" >First name* </p> 
            <input type="text" className="inputstyle"  value={firstname}  onChange={(e) => setfirstname(e.target.value) }  />  </div>
            <div style={{ display: 'flex' , flexDirection: 'column' , width: '45%' }} > 
            <p className="labelnamestyle" >Last name* </p> 
            <input type="text" value={lastname}  className="inputstyle" onChange={(e) => setlastname(e.target.value) }  />  </div>
              </div>


              <div className="inputfield2nd" >
            <div style={{ display: 'flex' , flexDirection: 'column' , width: '100%' }} > 
            <p className="labelnamestyle" >Address* </p> 
            <input type="text" value={address} className="inputstyle" onChange={(e) => setaddress(e.target.value) }  />  </div>
              </div>


              <div className="inputfield2nd" >
            <div style={{ display: 'flex' , flexDirection: 'column' , width: '45%' }} > 
            <p className="labelnamestyle" >City* </p> 
            <input type="text"  value={city} className="inputstyle" onChange={(e) => CityChange(e) } />  </div>
            <div style={{ display: 'flex' , flexDirection: 'column' , width: '45%' }} > 
            <p className="labelnamestyle" >Province* </p> 
            <input type="text" value={province} className="inputstyle" onChange={(e) => setprovince(e.target.value) }   />  </div>
              </div>


              <div className="inputfield2nd" >
            <div style={{ display: 'flex' , flexDirection: 'column' , width: '45%' }} > 
            <p className="labelnamestyle" >Phone Number* </p>
             <input type="text" value={number}  className="inputstyle" onChange={(e) => setnumber(e.target.value) }  />  </div>
            <div style={{ display: 'flex' , flexDirection: 'column' , width: '45%' }} > 
            <p className="labelnamestyle" >Email Address </p> 
            <input type="text"  value={email} className="inputstyle"  onChange={(e) => setemail(e.target.value) }   />  </div>
              </div>


              <div className="orderconfirmparent" >  
            <button className="OrderConfirmBtn"  onClick={() => OrderConfirm() }  >Order Confirm</button>
          </div>


            </div>



            <div className="billingformright">
              <div className="innertopright" > 
            <div style={{ marginTop: '0.5rem' , marginLeft: 'auto' , marginRight: 'auto' , alignSelf: 'center'  }} >
              <h3 style={{ alignSelf: 'center' , marginLeft: '35%'  }} >YOUR ORDER</h3></div>
            <div className="linestyle" ></div>
            <div className="productndtotalparent" >
              <div><h5>Product</h5></div>
              <div> <h5>Total</h5> </div>
            </div>


            {
             cartitem?.map((data , i ) => {
               console.log("Data" , data );
              return(
              <div className="cartitemsstylecheckout" >
                <div style={{ display:"flex" , flexDirection: 'row'  }} >
                 <p>{data.gamename} x</p>
                 <p>{data.quantity}</p>
                 </div>

                 <div>
                   <p>{data.price}</p>
                 </div>

              
               </div>
              );
            })
            } 
              </div>

            <div className="grandtotalshow" >


          <div className="cartsubtotal" >
            <div style={{ }} >
            <p className="cartsubtotaltext" >Cart SubTotal</p> 
              </div> 
              <div style={{ marginRight: '20%'  }} >
              <p className="cartsubtotaltext" >{totalbill}</p> </div>
              </div>

              <div className="grandtotal" style={{ marginBottom: '10px' }}  >
            <div style={{  }} >
            <p className="cartsubtotaltext" >Delivery Charges</p> 
              </div> 
              <div style={{ marginRight: '20%'  }} >
              <p className="cartsubtotaltext" >{deliverycharges}</p> </div>
              </div>


              <div className="grandtotal" >
            <div style={{  }} >
            <p className="cartsubtotaltext" >Grand Total</p> 
              </div> 
              <div style={{ marginRight: '20%'  }} >
              <p className="cartsubtotaltext" >{grandtotal}</p> </div>
              </div>

              
            </div>


            </div>

           
            

        </div>

        <Footer />
        
    </div>
  );
}

export default CheckoutScreeen;
