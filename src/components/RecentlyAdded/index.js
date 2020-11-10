import React , {Component} from 'react';
import { NavLink } from "react-router-dom";
import './style.css';




import RCodModern from '../../images/RCodModern.jpg';
import RFifa20 from '../../images/RFifa20.jpg';
import RStarWarJedi from '../../images/RStarWarJedi.jpg';
import RPlagueTale from '../../images/RPlagueTale.jpg';
import RCodeVein from '../../images/RCodeVein.jpg';
import RNfsHeat from '../../images/RNfsHeat.jpg';
import RDoom from '../../images/RDoom.jpg';
import RControl from '../../images/RControl.jpg';
import RNioh2 from '../../images/RNioh2.jpg';


class RecentlyAdded extends Component {

    

  
  render(){
    return(
        <div>

        <div className="RecentTextParent" >
        <p className="RecentText" >Recently Added Games</p>
      </div>




      <div className="RecentlyAddedGamesParent" >

        <div className="Inner" >    
          <img src={RCodModern} className="RecentlyAddedGamesImage"  />     
          <a className="RecentGamesTextStyle" >COD Modern Warefare 2019</a>
        </div>


        <div className="Inner" >    
          <img src={RPlagueTale} className="RecentlyAddedGamesImage"  />     
          <a className="RecentGamesTextStyle"  >Plague Tale</a>
        </div>


        <div className="Inner" >    
          <img src={RStarWarJedi} className="RecentlyAddedGamesImage"  />     
          <a className="RecentGamesTextStyle" >Star War Jedi</a>
        </div>

      </div>





      <div className="RecentlyAddedGamesParent" >

<div className="Inner" >    
<img src={RFifa20} className="RecentlyAddedGamesImage"  />     
<p className="RecentGamesTextStyle" >Fifa 20</p>
</div>


<div className="Inner" >    
<img src={RCodeVein} className="RecentlyAddedGamesImage"  />     
<p className="RecentGamesTextStyle"  >Code Vein</p>
</div>


<div className="Inner" >    
<img src={RNfsHeat} className="RecentlyAddedGamesImage"  />     
<p className="RecentGamesTextStyle" >Need for Speed Heat</p>
</div>

</div>






<div className="RecentlyAddedGamesParent" >

<div className="Inner" >    
<img src={RDoom} className="RecentlyAddedGamesImage"  />     
<p className="RecentGamesTextStyle" >DOOM</p>
</div>


<div className="Inner" >    
<img src={RNioh2} className="RecentlyAddedGamesImage"  />     
<p className="RecentGamesTextStyle"  >Nioh 2</p>
</div>


<div className="Inner" >    
<img src={RControl} className="RecentlyAddedGamesImage"  />     
<p className="RecentGamesTextStyle" >Control</p>
</div>

</div>





</div>


                
    );
  }


}


export default RecentlyAdded;
