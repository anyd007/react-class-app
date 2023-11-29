import { useState } from "react";
import { FaBackspace } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AddNotepopup from "../ui/AddNotePopuop";
import { useNavContext } from '../components/NavContext';
import useFirebase from "../config/useFirebase";
import Loading from "../ui/Loading";
import { animated, useSpring } from '@react-spring/web'
import '../styles/notes.scss';

const Notes = () => {
    const navigate = useNavigate()
    const { openPopup, setOpenPopup } = useNavContext()
    const { notes, loading } = useFirebase()
    const [edit, setEdit] = useState(false)
    const [editItem, setEditItem] = useState('')
    const [isInputVisible, setInputVisible] = useState(false);


    const handleBack = () => {
        navigate("/users")
    }
    const handleopenPopup = () => {
        setOpenPopup(true)
    }

    const props = useSpring({
        from: { fontSize: "0px" },
        to: { fontSize: isInputVisible ? "16px" : "0px" },
      });

    const handleOpenEdit = (id) => {

        setEdit(true)
        setEditItem(id)
        if(editItem !==id){
        // setInputVisible(!isInputVisible)
        }
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
                    <h3>{note.noteTitle}</h3>
                    {edit && editItem === note.id ?
                        <animated.input 
                        type="text" 
                        maxLength="50"
                        style={{ fontSize: props.fontSize }}
                         />
                        : null}
                    <p>{note.noteTxt}</p>
                    <MdDoneOutline className="done" />
                    <FaEdit className="edit" onClick={() => handleOpenEdit(note.id)} />
                </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;