import store from '../store';
import { ApiAiClient } from "api-ai-javascript";


const Messages = (text , client  ) => {

    return async(dispatch) => {
 // console.log(text , "action text" );

 let array = store.getState().ChatMessages.messages;

 array.push({
    name: 'user',
    message: text
})

 const result = await client.textRequest(text);
console.log(result,'check');
const mesg = result.result.fulfillment.speech;
//   console.log(result.result.fulfillment.speech);
array.push({name: 'bot' , message: mesg });
console.log("checking await")
 // let array = store.getState().CartItems.cartItem;





        dispatch({
            type: 'Bot_Messages',
            payload: array
        })

    }
}







export default Messages;