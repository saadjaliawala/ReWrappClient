const INITIAL_STATE = {
    messages: []
  }
  
  
  const reducer = (state = INITIAL_STATE, action) => {
      console.log("reducer ",action.payload); 
    
  
      switch (action.type) {
    
      
    
  
          case 'Bot_Messages': {
            return {...state, messages: action.payload}
          }
    
          default: {
            return state;
          }
        }
      };
      
      export default reducer;
    