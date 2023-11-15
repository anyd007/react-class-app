
import { useEffect, useState } from "react";
import {db, auth} from "../config/firebase"
import { getDocs, collection, addDoc, where, query } from "firebase/firestore";
import '../styles/usernavbar.scss';
import Grades from "./Grades";

const UserNavbar = () => {
    

    const[kidName, setKidName] = useState('')
    const [fbKidName, setFbKidName] = useState([])
    
   
   
    const kidNameRef = collection(db, "users")
  
    const handleAddName = async () =>{
        
        try{
            await addDoc(kidNameRef, {
                kidName: kidName,
                userId: auth?.currentUser?.uid
            })
            getKidName()
        }
        catch(err){
            console.log(err.code);
        }
    }

 const getKidName = async () =>{
        
  try{
            
    const data = await getDocs(query(kidNameRef, where("userId", "==", auth?.currentUser?.uid)));
            
    const filterData = data.docs.map((doc) =>({
      ...doc.data(),
      id: doc.id
    }))
    setFbKidName(filterData)
  }
  catch(err){
    console.log(err.message);
  }
}

    useEffect(() =>{
        getKidName()
        console.log("działa");
    },[])
  
   
    return (
        <div className="user-navbar">
            <h2>{`Witaj ${auth?.currentUser?.displayName}`}</h2>
            <input 
            type="text" 
            placeholder="podaj imie dziecka...."
            value={kidName} 
            onChange={(e) => setKidName(e.target.value)}
            />
           <button onClick={handleAddName}>zapis imię</button>
         {fbKidName.map((name) =>(<h2>{name.kidName}</h2>))}
        <Grades />
        </div>
    );
}
 
export default UserNavbar;