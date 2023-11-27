import { useState } from "react";
import { FaBackspace } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddNotepopup from "../ui/AddNotePopuop";
import { useNavContext } from '../components/NavContext';
import useFirebase from "../config/useFirebase";
import Loading from "../ui/Loading";
import '../styles/notes.scss';

const Notes = () => {
    const navigate = useNavigate()
    const { openPopup, setOpenPopup } = useNavContext()
    const { grades, setGrades, loading } = useFirebase()

    const handleBack = () => {
        navigate("/users")
    }
    const handleopenPopup = () => {
        setOpenPopup(true)
    }
    return (
        <div className="notes">
            {openPopup && <AddNotepopup />}
            {loading && <Loading />}
            <div className="notes-container">
                <div className="notes-title">
                    <h2>przypomnienia</h2>
                </div>
                <FaBackspace className='back' onClick={handleBack} />
                <button onClick={handleopenPopup}>dodaj przypomnienie</button>
                {grades && grades.map((grade, index) => (<div className="notes-items">
                        <h3>{grade.noteTitle}</h3>
                        <p>{grade.noteTxt}</p>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;