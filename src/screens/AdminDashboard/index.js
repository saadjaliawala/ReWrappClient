import React , {useEffect} from 'react';
import './style.css';
import store from '../../redux/store';
import chat from '../../images/chat.jpg';
import SidebarComponent from '../../components/Sidebar';


const  AdminDashboardScreeen  = () =>  {


  

    useEffect(() => {
        console.log(store.getState().AdminState);
        store.subscribe(() => {
            let admin = store.getState().AdminState;
        } )
       
    }, [])
    

  return (
    // <div >
    //     <p>admin dashboard</p>
    //     <Link to="/deliveries" >deliveries</Link>
    //     <Link to="/addgames" >add games</Link>
    //     {/* <div></div> */}
    // </div>

   


    <SidebarComponent />
  

  );
}

export default AdminDashboardScreeen;
