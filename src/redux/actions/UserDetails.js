
  const UserDetails = (UserDetails) => {
    // console.log("action" ,UserDetails);
     
    //  let arr
    return dispatch => {
      dispatch({
        type: 'User_Details',
        payload: UserDetails
      })
    } 
   }

   export default UserDetails;