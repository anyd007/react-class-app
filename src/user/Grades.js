import { useState } from 'react';
import '../styles/grades.scss'
import AddGradesPopup from '../ui/AddGradesPopup';
import { useNavContext } from '../components/NavContext';

const Grades = () => {

    const {openPopup, setOpenPopup} = useNavContext()

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