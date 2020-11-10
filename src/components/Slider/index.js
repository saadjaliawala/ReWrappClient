import React , {Component} from 'react';
import { NavLink } from "react-router-dom";
import './style.css';







import CarouselSlider from 'react-carousel-slider';
import CodModern from '../../images/CodModern.jpg';
import Fifa20 from '../../images/Fifa20.jpg';
import StarWarJedi from '../../images/StarWarJedi.jpg';
import Sekiro from '../../images/Sekiro.jpg';






class Slider extends Component {

    constructor(props){
      super(props);
      this.state = {
        
        SliderImages: [
          {image: CodModern},
          {image: Fifa20},
          {image: StarWarJedi},
          {image: Sekiro}
        ]
      }
    }
  
  
  
    
  
    render(){
  
      let items = this.state.SliderImages.map((item , index) => 
        <img  src={item.image} />
      )
      
  
  
      return(
  
            <div className="SliderParent"  >
             
  
                  
                <CarouselSlider slideCpnts = {items} />
                         
              
  
  
  
  
              </div>
      );
    }
  
  
  }
  
  
  export default Slider;
  