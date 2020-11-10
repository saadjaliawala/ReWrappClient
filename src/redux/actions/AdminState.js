
  const AdminState = (AdminState) => {
    // console.log("action" , AdminState);
     
    //  let arr
    return dispatch => {
      dispatch({
        type: 'Admin_State',
        payload: AdminState
      })
    } 
   }

   export default AdminState;