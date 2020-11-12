import React , { useEffect  , useState   } from 'react';
import './style.css';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSms} from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import chatimg from '../../images/chat.jpg';
import sendimage from '../../images/sendimage.png';
import chatuserimage from '../../images/chatuserimage.png';
import store from '../../redux/store';
import Messages from '../../redux/actions/ChatMessages';
import { ApiAiClient } from "api-ai-javascript";



const Chat = () => {

    const [chatmodal , setchatmodal ] = useState(false);
    const [ chatbottext , setchatbottext ] = useState('');
    const [chattingarray , setchattingarray] = useState();
    const [client , setclient]  = useState();

    useEffect(() => {

        const client = new ApiAiClient({
            accessToken: "2f356b0a385a469d9ddd42599a7806a8"
          });
          setclient(client);

        setchattingarray([...store.getState().ChatMessages.messages]);
        store.subscribe(() => {
            setchattingarray([...store.getState().ChatMessages.messages]);
            console.log(store.getState().ChatMessages.messages , "subscribe" );
        } )
       
    }, [])


    const ChatClick = () => {
        // alert("chat click");
        setchatmodal(!chatmodal);
    }


    const SendMessage = () => {
        // alert("send message");
        console.log(chatbottext);
        if(chatbottext != ''  )
        {
            store.dispatch(Messages(chatbottext , client ));
        setchatbottext('');

      }
      else {
          alert("write any text");
      }
        
    }

    const ChatTextChanged = ( e) => {
        let text = e.target.value;
        setchatbottext(text);
        
        
        // setchatbottext(e)
    }



    const _renderChatModal = () => {
        return(
            <div className="chatmodaldesign"  >
                <div style={{ display: 'flex' , alignSelf: 'flex-end' }}  className="ChatHeader" >

                    <div style={{ marginTop: 'auto' , marginBottom: 'auto' , display: 'flex' , flexDirection: 'row'  }}  >
                        <div>
                        <img 
                        src={chatuserimage}
                        className="chatuserimage"
                        
                        />
                        </div>
                        <div style={{  marginLeft: '18px'  , marginTop: 'auto' , marginBottom: 'auto'   }} >
                            <p>Admin</p>
                        </div>
                    </div>


                    <div>
                    <FontAwesomeIcon 
                    icon={faTimes}
                    size="lg"
                    color="black"
                    className="crossstyle"
                    onClick ={() => setchatmodal(!chatmodal)  }
                        />
                    </div>
               
                </div>

                <div className="messagesInChatBox" >
                    { chattingarray?.map((v, i ) => {
                        return(
                            <div style={{ margin: '8px'    }}  >
                                <p>{v.name} : {v.message} </p>
                            </div>
                        );
                    } ) }

                </div>

                <div className="inputcontainer"   >

                    <div className="inputparentchat"  >
                        <div  style={{ paddingLeft: '5px' , width: '100%'  }} >
                            <input  type="text" className="chatinputstyle"onChange={(e) => ChatTextChanged(e)  } 
                            value={chatbottext}
                            
                            />
                        </div>
                        <div>
                            <img 
                            src={sendimage}
                            className="sendimagestyle"
                            onClick={() => SendMessage() }
                            />
                        </div>


                    </div>

                </div>
                
            </div>
        );
    }


    return(
        <div>
            
            <img  
            src={chatimg}
            className="imagestyle5"
            onClick={() => ChatClick() }
            />

            { chatmodal &&  _renderChatModal()}
        
        </div>
    );
}


export default Chat;