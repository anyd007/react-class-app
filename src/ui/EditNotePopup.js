import { doc, updateDoc } from 'firebase/firestore';
import useFirebase from '../config/useFirebase';
import '../styles/edit-note-popup.scss';
import { useState } from 'react';
import { db, auth } from '../config/firebase';
import Loading from './Loading';

const EditNotePopup = ({ setOpenEditPopup, editItem }) => {
    const [editTitle, setEditTitle] = useState('')
    const [editTxt, setEditTxt] = useState('')
    const {loading} = useFirebase();

    const handleClousePopup = () => {
        setOpenEditPopup(false)
    }
    const handleApplyEdit = async () => {
        try {
            const userId = auth?.currentUser?.uid;
            const noteTitle = doc(db, "users", userId, "notes", editItem.id)
            if (editItem.title) {
                await updateDoc(noteTitle, { noteTitle: editTitle })
                setOpenEditPopup(false)
            }
            else if (editItem.txt) {
                await updateDoc(noteTitle, { noteTxt: editTxt })
                setOpenEditPopup(false)
            }
        } catch (err) {
            console.error('Błąd podczas zmiany daych:', err.message);
        }
    }

    return (
        <div className="edit-note-popup">
            {loading && <Loading/>}
         
            <div className="edit-note-popup__container">
                <div className="edit-note-popup__container__header">
                    <h2>Edytuj przypomnienie</h2>
                </div>
                <div className="edit-note-popup__container__body">
                    {editItem.title ? <div>
                        <h3>dotychczasowy tytuł przypomnienia:</h3>
                        <p>{editItem.title}</p>
                        <h3>nowy tytuł przypomnienia:</h3>
                        <input
                            type="text"
                            maxLength="50"
                            placeholder='podaj nowy tytuł....'
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        /><br/>
                        <button onClick={handleApplyEdit}>zatwierdź</button>
                        <button onClick={handleClousePopup}>odrzuć</button>
                    </div> : null}
                    {editItem.txt ? <div>
                        <h3>dotychczasowy tekst przypomnienia:</h3>
                        <p>{editItem.txt}</p>
                        <h3>nowy tekst przypomnienia:</h3>
                        <textarea
                            maxLength="200"
                            placeholder='podaj nowy tekst....'
                            value={editTxt}
                            onChange={(e) => setEditTxt(e.target.value)}
                        ></textarea><br/>
                        <button onClick={handleApplyEdit}>zatwierdź</button>
                        <button onClick={handleClousePopup}>odrzuć</button>
                    </div> : null}
                </div>
            </div>
        </div>
    );
}

export default EditNotePopup;