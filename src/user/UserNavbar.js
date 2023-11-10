import Button from "../ui/Button";
import { signOut } from "firebase/auth";
// import { Auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {db, auth} from "../config/firebase"
import { getDocs, collection, addDoc } from "firebase/firestore";

const UserNavbar = ({user}) => {
    

    const[kidName, setKidName] = useState('')
    const [fbKidName, setFbKidName] = useState([])

    const navigate = useNavigate()
   
    const kidNameRef = collection(db, "test")
  
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
            
           const data = await getDocs(kidNameRef);
            
            const filterData = data.docs.map((doc) =>({
                ...doc.data,
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
  
   

    const handleLogout = async () => {
        try{
            await signOut(auth)
            navigate('/')
        }
        catch(err){
            console.log(err.code);
        }
    }
    console.log(fbKidName);
    return (
        <div className="user-navbar">
             <Button onClick={handleLogout} value="WYLOGUJ SIĘ"/>
            <h2>to będzie nawigacja</h2>
            <input 
            type="text" 
            placeholder="podaj imie dziecka...."
            value={kidName} 
            onChange={(e) => setKidName(e.target.value)}
            />
           <button onClick={handleAddName}>zapis imię</button>
         {fbKidName.map((name) =>(<h2>{name.kidName}</h2>))}
     
        </div>
    );
}
 
export default UserNavbar;