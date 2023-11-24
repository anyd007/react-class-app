import { useAuthContext } from "../components/AuthContext";
import { useNavContext } from '../components/NavContext';
import { db, auth } from "../config/firebase"
import { getDocs, collection, where, query } from "firebase/firestore";
import { useState, useEffect } from "react";

const useFirebase = () => {
    const { currentUser } = useAuthContext()
    const { openPopup, openDeletePopup } = useNavContext()
    const [grades, setGrades] = useState([])
    const [loading, setLoading] = useState(true)

    const userCollectioRef = collection(db, "users")

      //pobranie danych z firestorm
      const getUserData = async () => {
        if (currentUser) {
            try {
                const userId = auth?.currentUser?.uid;

                const data = await getDocs(query(userCollectioRef, where("userId", "==", userId)));

                const filterData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
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
  
    return {grades, setGrades, loading, getUserData};
}
 
export default useFirebase;