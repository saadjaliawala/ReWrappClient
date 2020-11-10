const reducer = (state = {}, action) => {
    // console.log("reducer ",action.payload); 
    switch (action.type) {
  
    
  

        case 'Admin_State': {
          return {...state, user: action.payload}
        }
  
        default: {
          return state;
        }
      }
    };
    
    export default reducer;
  