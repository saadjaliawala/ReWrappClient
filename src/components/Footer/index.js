import React , {Component} from 'react';
import { NavLink } from "react-router-dom";
import './style.css';


// import addressicon from '../../images/a'
import addressicon from "../../images/addressicon.png";
import phoneicon from "../../images/phoneicon.png";
import emailicon from "../../images/emailicon.png";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import googleplus from "../../images/googleplus.png";
import send from "../../images/send.png";




class Footer extends Component {

    

  
  render(){
    return(


                    
        <div  className="FooterStart" >

        <div className="FooterCol1" >
          <p className="Col1Text1" > VentureGame.Pk </p>
        
          <div className="addressFooter" >
            <img src={addressicon}  className="addressiconstyle" />
            <p className="addressicontext"  > Office Address: Bahadurabad, <br/> 412, karachi </p>
            </div>
        
            <div className="phoneFooter" >
              <img src={phoneicon} className="phoneiconstyle" />
              <p className="addressicontext" > +923358243343 <br/> Mon-Fri 24-Hrs  </p>
              </div>
        
            <div className="emailFooter" >
                  <img src={emailicon} className="emailiconstyle" />
                  <p className="addressicontext" > info@venturegame.pk </p>
            </div>
        
            <p className="joinustext" > JOIN US</p>
        
            <div className="rowIconFooter" >
              <img src={facebook}  />
              <img src={twitter} style={{ paddingLeft: '3px' }} />
              <img src={googleplus}  style={{ paddingLeft: '3px' }} />
              </div>
        
              <p className="rightReservedText" > 
                  2020 VentureGame.Pk All Right Reserved
               </p>
           </div>
        
        
           <div className="FooterCol2" >
             <a className="Col2TopText" > INFORMATION </a>
             <a className="CommonCol2text" > About  Us  </a>
             <a className="CommonCol2text" > Customer Services </a>
             <a className="CommonCol2text" > Privacy Policy </a>
             <a className="CommonCol2text" > Search Terms </a>
             <a className="CommonCol2text" > Coontact Us </a>
             <a className="CommonCol2text" > Order & Returns </a>
             <a className="CommonCol2text" > Our Sitemap </a>
             
             </div> 
        
        
             <div className="FooterCol3" >
             <a className="Col2TopText" > WHY BUY FROM US </a>
             <a className="CommonCol2text" > Shopping & Delivery </a>
             <a className="CommonCol2text" > Support </a>
             <a className="CommonCol2text" > Guarantee </a>
             <a className="CommonCol2text" > Terms & Condition </a>
             <a className="CommonCol2text" > Returns </a>
             </div> 
        
             <div className="lastCol" >
                <a className="Col2TopText" > SUBSCRIBE AND GET 5% OFF DISCOUNT </a>
                <a className="CommonCol2text" > Subscribe to Our NewsLetter and get bonus  <br/> for the next  purchase </a>
                <div className="inputFieldIcon" >
                <input   className="subscribeEmailInput" />
                      <div className="SendIcon" >
                        <img  src={send} className="sendImage" /> 
                      </div>
                </div>
                 
                {/* <p className="WeAcceptClass" > WE ACCEPT:  </p>
        
                <div className="WeAcceptRow" >
                  <img src={visaicon} className="visicon" />
                  <img src={paypalicon} className="paypalicon" />
                  <img src={discovericon} className="paypalicon" />
        
                </div> */}
        
               </div> 
        
        
        
        
            
        
        </div>
        
          

               

                
    );
  }


}


export default Footer;
