import React , {useEffect , useState , useCallback } from 'react';
import './style.css';
import firebase from '../../Config/firebase';

import {useDropzone} from 'react-dropzone';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

const  AddGamesScreeen  = () =>  {

    const [addgamestext , setaddgamestext] = useState();
    const [packagename , setpackagename] = useState('Stryker');
    const [quantity , setquantity] = useState(1);
    const [url  , seturl] = useState();
    const [price , setprice] = useState();
    const [value , setvalue] = useState();

    useEffect(() => {
       
       
    }, [])

    const AddGamesText = (e) => {
        let text = e.target.value;
        setaddgamestext(text);
    }

    const PackageSelect = (e) => {
        setpackagename(e.target.value);
        console.log(e.target.value);

    }

    const SubmitGame = () => {
        alert("submit");
        let quantity1 = parseInt(quantity);
        let price1 = parseInt(price);
        let value1 = parseInt(value);
        let game = {
            gamename: addgamestext,
            packagename: packagename ,
            quantity: quantity1,
            imageurl: url,
            price: price1 ,
            value: value1
        }
        firebase.firestore().collection('availablegames').add(game)
        .then(res => {
            console.log(res);
            setaddgamestext('');
            setvalue('');
            setprice('');
            // setpackagename('');
        } )
        .catch(err => {
            console.log(err);
        } )
    }


    const QuantitySelect = (e) => {
        console.log(e.target.value);
        setquantity(e.target.value);
    }
    

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
     
    
        const onDrop = useCallback( async acceptedFiles => {
          console.log("accepted fil" , acceptedFiles[0] );
          const file = acceptedFiles[0];
        //   const file = await toBase64
        // const string = await toBase64(file);
        //   console.log(await toBase64(file));
        //   console.log(file.path);
        //   firebase.storage().ref().child(file.path).putString(string , 'data_url' )
        //   .then((res) => {
        //       console.log(res);
        //   } )

        const reference = firebase.storage().ref('Images/' + new Date().getTime());
      await reference.put(file);
      const url = await reference.getDownloadURL();
      console.log( "url" , url);
      seturl(url);


        }, [])
        const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
      
    








  return (
    <div className="maindiv1" >
        <h1 style={{ color: "yellow" }} >ADD GAMES SCREEEN </h1>
        <div className="inputparent" >
        <input type="text" className="TextInput" placeholder="add games" value={addgamestext} onChange={(e) => AddGamesText(e)   } />
        </div>

        {/* className="CityOptionStyle" */}
  <select  className="GamePackage" onChange={(e) => PackageSelect(e) }  >
    <option value="Stryker">Stryker</option>
    <option value="Pro">Pro</option>
    <option value="Reapers">Reapers</option>
    <option value="UltimatePro">Ultimate pro</option>
     </select>

     <select  className="GamePackage" onChange={(e) => QuantitySelect(e) }  >
    <option value= "1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
     </select>

     <div {...getRootProps()} className="inputfile" >
      <input {...getInputProps()} className="inputfile"  />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
    <div className="inputparentaddgames" >
    <input type="text" className="TextInput" placeholder="game price" value={price} onChange={(e) => setprice(e.target.value)   } />
    </div>
    <div className="inputparentaddgames" >
    <input type="text" className="TextInput" placeholder="game value" value={value} onChange={(e) => setvalue(e.target.value)   } />
    </div>
      
    

    {/* <input type="text" className="TextInput" placeholder="add games" value={addgamestext} onChange={(e) => AddGamesText(e)   } /> */}
       
        <button className="submitstyle" onClick={() => SubmitGame() } >Add games</button>
        {/* <div></div> */}
    </div>
  );
}


export default AddGamesScreeen;
