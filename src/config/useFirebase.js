import { useAuthContext } from "../components/AuthContext";
import { useNavContext } from '../components/NavContext';
import { db, auth } from "../config/firebase"
import { getDocs, collection, where, query } from "firebase/firestore";
import { useState, useEffect } from "react";

const useFirebase = () => {
    const { currentUser } = useAuthContext()
    const { openPopup, openDeletePopup } = useNavContext()
    const [grades, setGrades] = useState([])
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

   

      //pobranie danych z firestorm
      const getUserData = async () => {
        if (currentUser) {
            try {
                const userGradesRef = collection(db, "users", currentUser.uid, "grades")
                const userNotesRef = collection(db, "users", currentUser.uid, "notes")
                // const userId = auth?.currentUser?.uid;

                const data = await getDocs(userGradesRef);
                const filterData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                const notes = await getDocs(userNotesRef);
                const filterNotes = notes.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
            
                setNotes(filterNotes)
                setGrades(filterData)
                setLoading(false)

            }

            catch (err) {
                console.log(err);
                setLoading(false)
            }
        }
    }
    useEffect(() => {
        getUserData();
    }, [currentUser, openPopup, openDeletePopup]); 
  
    return {notes, grades, setGrades, loading, getUserData};
}
 
export default useFirebase;