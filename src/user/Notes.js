import { useState } from "react";
import { FaBackspace } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AddNotepopup from "../ui/AddNotePopuop";
import { useNavContext } from '../components/NavContext';
import useFirebase from "../config/useFirebase";
import Loading from "../ui/Loading";

import '../styles/notes.scss';
import EditNotePopup from "../ui/EditNotePopup";

const Notes = () => {
    const navigate = useNavigate()
    const { openPopup, setOpenPopup, openEditPopup, setOpenEditPopup } = useNavContext()
    const { notes, loading } = useFirebase()
    
    const [editItem, setEditItem] = useState({
        id: '',
        title: '',
        txt: ''
    })



    const handleBack = () => {
        navigate("/users")
    }
    const handleopenPopup = () => {
        setOpenPopup(true)
    }



    const handleOpenEditTitle = (id, title) => {
        setEditItem({
            id,
            title
        })
        setOpenEditPopup(true)
    }
    const handleOpenEditTxt = (id, txt) => {
        setEditItem({
            id,
            txt
        })
        setOpenEditPopup(true)
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
                {notes && notes.map((note, index) => (
                    <div className="notes-items" key={index}>
                        <FaEdit className="edit-title" onClick={() => handleOpenEditTitle(note.id, note.noteTitle)} />
                        <h3>{note.noteTitle}</h3>
                        <p>{note.noteTxt}</p>
                        <FaEdit className="edit-txt" onClick={() => handleOpenEditTxt(note.id, note.noteTxt)} />
                        <MdDoneOutline className="done" />

                    </div>
                ))}
            </div>
             {openEditPopup && <EditNotePopup setOpenEditPopup={setOpenEditPopup} editItem={editItem}/> }   
        </div>
    );
}

export default Notes;