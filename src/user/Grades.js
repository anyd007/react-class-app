import { useState, useEffect } from 'react';
import '../styles/grades.scss'
import { db, auth } from "../config/firebase"
import { getDocs, collection, where, query, deleteDoc, doc } from "firebase/firestore";
import AddGradesPopup from '../ui/AddGradesPopup';
import { useNavContext } from '../components/NavContext';
import { useAuthContext } from "../components/AuthContext";
import { AiFillDelete } from "react-icons/ai";

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
        getUserData();
        console.log("działa");
    }, [currentUser]);

    useEffect(() => {
        
            getUserData();

    }, [openPopup]);


    const handleOpenPopup = () => {
        setOpenPopup(true)
    }

    const handleDelete = async (id) => {
        try{
            const gradieDoc = doc(db, "users", id)
            await deleteDoc(gradieDoc)
            getUserData();
            console.log("element został usunięty ");
        }
        catch(err){
            console.log("nie udało się usunąć pozycji: " + err.message);
        }
    }

    const subtitleSort = () =>{
       let sort =  [...grades].sort((a,b) => a.subject.localeCompare(b.subject))
        setGrades(sort)
    }

    return (
        <div className="grades">
            <h2>oceny twojego dziecka</h2>
            <button onClick={handleOpenPopup}>dodaj ocenę</button>
            <div className='grades-container'>
                {openPopup && <AddGradesPopup />}
                <div className="show-grades" >
                   
                    {grades.length == 0 ? null : <div className="show-grades-titles">
                        <p >data</p>
                        <p onClick={subtitleSort}>przedmiot</p>
                        <p>ocena</p>
                    </div> }
                    {grades.map((grade) => (<div className="show-grades-items" key={grade.id}>
                        <p>{grade.selectedDate}</p>
                        <p>{grade.subject}</p>
                        <p>{grade.grade}</p>
                        <AiFillDelete onClick={() => handleDelete(grade.id)} className='delete' />
                    </div>))}
                </div>
            </div>
        </div>
    );
}

export default Grades;