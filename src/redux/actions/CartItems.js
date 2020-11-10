import store from '../store';
  const CartItems = (Items) => {
    // console.log("action" , Items );
    let array = store.getState().CartItems.cartItem;
    // console.log(array,'array');
     
    //  let arr
    return dispatch => {
      array.push(Items);
      console.log(array);
      dispatch( carItem(array) )
     
    } 
   }



  export const RemoveCartItems = (index) => {
    
    let array = store.getState().CartItems.cartItem;
    
    // console.log("action called");
    return dispatch => {
      array.splice(index , 1);
      console.log( "action array " ,  array);
      dispatch(carItem(array) )
     
    } 
   }



   export const ClearCartItems = () => {
    
    // let array = store.getState().CartItems.cartItem;
    // array = [];
    
    // console.log("action called");
    return dispatch => {
    //  let array=[]
      dispatch(carItem([]) )
     
    } 
   }


   


   export const carItem = item =>  {
     return{
       type: 'Cart_Items',
       payload: item
       
     }
   }

   export default CartItems;
  //  export const RemoveCartItems;