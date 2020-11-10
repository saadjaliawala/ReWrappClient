import React , {useEffect, useState} from 'react';
import './style.css';
import store from '../../redux/store';
import  {RemoveCartItems} from '../../redux/actions/CartItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { useHistory } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const  CartScreeen  = () =>  {

    const [ cartarray , setcartarray  ] = useState([]);
    const [totalbill , settotalbill] = useState(0);
    const [ delivery , setdelivery ] = useState(0);
    let history = useHistory();

    useEffect(() => {
       setcartarray(store.getState().CartItems.cartItem);
      //  console.log( "1cart" , store.getState().CartItems.user);
       let calculatingarray = [];
       store.subscribe(() => {
         console.log("subscribe");
        setcartarray([...store.getState().CartItems.cartItem]);
        console.log(store.getState().CartItems.cartItem);
        
        let array = store.getState().CartItems.cartItem;
        let total = 0;
        array.map((data, i ) => {
          total = data.price + total;
          // console.log( "map totoal "   , data.price);
        } )
        settotalbill(total);
        console.log(total);
        //  calculatingarray = store.getState().CartItems.user;
        // console.log( " cart"  , store.getState().CartItems.cartItem);
       } )
       console.log(calculatingarray);
       
    }, [])


    const RemoveProduct = (i) => {

      store.dispatch(RemoveCartItems(i));
      console.log(cartarray.length , "length" );

    }


    const Checkout = () => {
      // alert("checkout");
      history.push('./checkout');
    }


  return (
    <div >
        {/* <p>Cart Screeen  </p> */}
        <NavBar  width={'4%'} />

        {/* <div></div> */}
        <div className="CartParent" >
          <div  className="cart1stparent"  >
            <div className="productname" > <p>Product Name</p>  </div>
            <div  className="unitprice" > <p>Unit Price</p> </div>
            <div className="quantity" > <p>Quantity</p> </div>
            <div className="subtotal" > <p>Sub Total</p> </div>

          </div>
          <div  className="cart2ndparent" > </div>

          <div className="cart3rdparent" >
          { cartarray?.map((data , i ) => {
            console.log("cartarray");
            // let total = 0;
            //  total = data.price  ;
            // console.log(total , data.price , totalbill ,"total ");
            // settotalbill(data.price + totalbill );

            return(
              <div className="CartItem" >
                <div>
                <FontAwesomeIcon  icon={faTimes} size="sm" color="black"  className="crossstyle" onClick={() => RemoveProduct(i) }  />

                </div>
                
              <div className="productname"  >  <p>{data.gamename}</p> </div>
              <div className="unitprice" > <p>{data.price}</p> </div>
              <div className="quantity" > <p>{data.quantity}</p> </div>
              <div className="quantity" > <p>{data.price}</p> </div>
            {/* <div> <p>{total}</p> </div> */}
              </div>
            );
          } )
          }
          
          </div>

          <div  className="cart4thparent" > </div>
          <div className="cart5thparent" > 
          <div>
            <button className="continueshoppingbtn" >Continue Shopping</button>
          </div>
          <div>
            <button className="proceedtocheckoutbtn" onClick={() => Checkout() }  >Proceed To Checkout</button>
          </div>
           </div>

        </div>
        <Footer />

        
    </div>
  );
}

export default CartScreeen;
