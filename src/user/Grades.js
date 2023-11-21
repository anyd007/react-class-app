import { useState, useEffect } from 'react';
import '../styles/grades.scss'
import { db, auth } from "../config/firebase"
import { getDocs, collection, where, query, deleteDoc, doc } from "firebase/firestore";
import AddGradesPopup from '../ui/AddGradesPopup';
import { useNavContext } from '../components/NavContext';
import { useAuthContext } from "../components/AuthContext";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Loading from '../ui/Loading';
import DeletePopup from '../ui/DeletePopup';

const Grades = () => {
    const userCollectioRef = collection(db, "users")
    const { currentUser } = useAuthContext()
    const { openPopup, setOpenPopup } = useNavContext()
    const [grades, setGrades] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteItem, setDeleteItem] = useState('')
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
  
    
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
        console.log("lekcja dodana");
    }, [currentUser, openPopup]);


    const handleOpenPopup = () => {
        setOpenPopup(true)
    }

    const handleDelete = (id) => {
        setOpenDeletePopup(true)
        setDeleteItem(id)
        
    }

    const subtitleSort = () =>{
       let sort =  [...grades].sort((a,b) => a.subject.localeCompare(b.subject))
        setGrades(sort)
    }

    return (
        <div className="grades">
            {loading && <Loading />}
           {openDeletePopup && <DeletePopup setOpenDeletePopup={setOpenDeletePopup} deleteItem={deleteItem} getUserData={getUserData}/> }
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
                    <FaEdit className='delete'/>
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