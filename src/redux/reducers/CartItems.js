const INITIAL_STATE = {
  cartItem: []
}


const reducer = (state = INITIAL_STATE, action) => {
    // console.log("reducer ",action.payload); 
  

    switch (action.type) {
  
    
  

        case 'Cart_Items': {
          return {...state, cartItem: action.payload}
        }
  
        default: {
          return state;
        }
      }
    };
    
    export default reducer;
  