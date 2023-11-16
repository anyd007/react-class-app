import { useState, useEffect } from 'react';
import '../styles/grades.scss'
import {db, auth} from "../config/firebase"
import { getDocs, collection, where, query } from "firebase/firestore";
import AddGradesPopup from '../ui/AddGradesPopup';
import { useNavContext } from '../components/NavContext';

const Grades = () => {
    const userCollectioRef = collection(db, "users")
    const {openPopup, setOpenPopup} = useNavContext()
    const [userData, setUserData] = useState('')

     const getUserData = async () =>{
        try{
            const userId = auth?.currentUser?.uid;
               
            const data = await getDocs(query(userCollectioRef, where("userId", "==", userId)));
                    
            const filterData = data.docs.map((doc) =>({
              ...doc.data(),
              id: doc.id
            }))
            setUserData(filterData)
          
        }
          catch(err){
            console.log(err);
          }
        }
        
            useEffect(() =>{
                getUserData()
                console.log("działa");
            },[auth?.currentUser])

    

    const handleOpenPopup = () =>{
        setOpenPopup(true)
    }
    return (
        <div className="grades">
            <h2>oceny</h2>
            <button onClick={handleOpenPopup}>dodaj ocenę</button>
            <div className='grades-container'>
               {openPopup &&  <AddGradesPopup />}
            </div>
        </div>
    );
}
 
export default Grades;