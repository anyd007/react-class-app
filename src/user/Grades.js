import { useState } from 'react';
import '../styles/grades.scss'
import AddGradesPopup from '../ui/AddGradesPopup';
import { useNavContext } from '../components/NavContext';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Loading from '../ui/Loading';
import DeletePopup from '../ui/DeletePopup';
import SortGrades from './SortGrades';
import  { useNavigate }  from 'react-router-dom';
import useFirebase from '../config/useFirebase';

const Grades = () => {
    const { openPopup, setOpenPopup, openDeletePopup, setOpenDeletePopup} = useNavContext()
    const [deleteItem, setDeleteItem, ] = useState('')
    const {grades, setGrades, loading} = useFirebase()
   
    const navigate = useNavigate()


    const handleOpenPopup = () => {
        setOpenPopup(true)
    }

    const handleOpenGradesDeatalis = () => {
        navigate('/users/grades-detalis')

    }

    const handleDelete = (id) => {
        setOpenDeletePopup(true)
        setDeleteItem(id)

    }
    
    return (
        <div className="grades">
            {loading && <Loading />}
            {openDeletePopup && <DeletePopup setOpenDeletePopup={setOpenDeletePopup} deleteItem={deleteItem} />}
            <h2>oceny twojego dziecka</h2>
            <div className="grades-nav">
            {grades.length <= 1 ? null : <button onClick={handleOpenGradesDeatalis}>zobacz szczegóły</button> }
                <button onClick={handleOpenPopup}>dodaj ocenę</button>
                {grades.length <= 1 ? null : <SortGrades className="sort-grades" grades={grades} setGrades={setGrades} />}
            </div>
            <div className='grades-container'>
                {openPopup && <AddGradesPopup />}
                <div className="show-grades" >

                    {grades.length === 0 ? null : <div className="show-grades-titles">
                        <p >data</p>
                        <p>przedmiot</p>
                        <p>ocena</p>
                    </div>}
                    {grades.map((grade) => (<div className="show-grades-items" key={grade.id}>
                        {/* <FaEdit className='delete'/> */}
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