import { useState, useEffect } from 'react';
import '../styles/grades.scss'
import { db, auth } from "../config/firebase"
import { getDocs, collection, where, query } from "firebase/firestore";
import AddGradesPopup from '../ui/AddGradesPopup';
import { useNavContext } from '../components/NavContext';
import { useAuthContext } from "../components/AuthContext";

const Grades = () => {
    const userCollectioRef = collection(db, "users")
    const { currentUser } = useAuthContext()
    const { openPopup, setOpenPopup } = useNavContext()
    const [grades, setGrades] = useState([])
  
    
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
              

            }

            catch (err) {
                console.log(err);
            }
        }
    }
    useEffect(() => {
        getUserData()
        console.log("działa");
    }, [openPopup])


    const handleOpenPopup = () => {
        setOpenPopup(true)
    }
    console.log(grades);
    return (
        <div className="grades">
            <h2>oceny</h2>
            <button onClick={handleOpenPopup}>dodaj ocenę</button>
            <div className='grades-container'>
                {openPopup && <AddGradesPopup />}
                <div className="show-grades" >
                    {grades.length == 0 ? null : <h2>oceny twojejgo dziecka</h2>}
                    {grades.length == 0 ? null : <div className="show-grades-titles">
                        <p>data</p>
                        <p>przedmiot</p>
                        <p>ocena</p>
                    </div> }
                    {grades.map((grade) => (<div className="show-grades-items" key={grade.id}>
                        <p>{grade.selectedDate}</p>
                        <p>{grade.subject}</p>
                        <p>{grade.grade}</p>
                    </div>))}
                </div>
            </div>
        </div>
    );
}

export default Grades;