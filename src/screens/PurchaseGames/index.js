import React, { useEffect, useState } from "react";
import "./style.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import firebase from "../../Config/firebase";
import store from "../../redux/store";
import CartItems from "../../redux/actions/CartItems";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useHistory } from "react-router-dom";

// import './App.css';

// import {
//   BrowserRouter as Router,
//   // Switch,
//   // Route,
//   Link
// } from "react-router-dom";

const PurchaseScreen = () => {
  const [availablegames, setavailablegames] = useState();
  const [dummyavailablegames, setdummyavailablegames] = useState();
  const [searchvalue, setsearchvalue] = useState();
  const [cartarray, setcartarray] = useState([]);
  const [reduxcartarray, setreduxcartarray] = useState();
  let  [startIndex , setStartIndex] = useState(0);
  // const [rendergamecounter, setrendergamecounter] = useState(2);

  let history = useHistory();

  useEffect(() => {
    setreduxcartarray("redux", store.getState().CartItems.cartItem);
    store.subscribe(() => {
      setreduxcartarray("redux", store.getState().CartItems.cartItem);
    });
    firebase
      .firestore()
      .collection("availablegames")
      .onSnapshot((data) => {
        let array = [];
        // console.log( "data" , data);
        data.forEach((datas) => {
          console.log(datas.data().quantity);
          if (datas.data().quantity >= 1) {
            let pushdata = datas.data();
            pushdata.id = datas.id;
            array.push(pushdata);
          }
        });
        // console.log(array , "array");
        setavailablegames([...array]);
        setdummyavailablegames([...array]);
      });
  }, []);

  const AddToCart = (data) => {
    // console.log( "data" , data);

    cartarray.push(data);
    let array = [...reduxcartarray];
    array.push(data);
    setreduxcartarray(array);

    setcartarray(cartarray);
    console.log(cartarray);
    store.dispatch(CartItems(data));
    // history.push('./cart');
  };

  const Search = (e) => {
    // let value = e.target.value;
    // console.log(e.target.value);
    let result = dummyavailablegames?.filter((v, i) => {
      //  var res = v.gamename.charAt(0);
      return v.gamename.toLowerCase().startsWith(e.target.value.toLowerCase());
      // return value.toLowerCase().startsWith(v.gamename.toLowerCase());
    });
    console.log(result, "result");
    setavailablegames(result);
  };



  const NextClick = () => {
    startIndex = startIndex+2;
    setStartIndex(startIndex);
  }








  return (
    <div style={{}}>
      <NavBar width={"1%"} />

      <div style={{ width: "100%", paddingTop: "20px", paddingBottom: "25px" }}>
        <div className="searchstyle">
          <div>
            <FontAwesomeIcon
              size="sm"
              color="grey"
              icon={faSearch}
              className="searchicon"
            />
          </div>

          <div>
            <input
              type="text"
              className="inputsearch"
              onChange={(e) => Search(e)}
            />
          </div>
        </div>
      </div>
      <div className="purchasescreendiv">
        {/* <div className="CarMainDiv" >  */}
        {/* <p>PurchaseScreen </p> */}
        {availablegames?.map((data, i) => {
          // let startIndex = 0;
          if (i >= startIndex && i < startIndex+2) {
            return (
              <div className="CartDiv">
                <img src={data.imageurl} className="imagestyle" />
                <div className="innercardstyle">
                  <div style={{ alignContent: "flex-start", width: "80%" }}>
                    <p className="gamename"> {data.gamename} </p>
                    <p className="gameprice"> Rs {data.price} </p>
                  </div>
                  <div style={{ width: "20%" }}>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      size="sm"
                      className="fontcartstyle"
                      onClick={() => AddToCart(data)}
                    />
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div>
          <button onClick={() => NextClick() } >Next</button>
        </div>

      <Footer />

       

    </div>
  );
};

export default PurchaseScreen;
