import {useState} from "react";
import { addDoc, collection, Timestamp, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavContext } from '../components/NavContext';
import '../styles/add-note-popup.scss'

const AddNotepopup = () => {
const [noteTitle, setNoteTitle] = useState('')
const [noteTxt, setNoteTxt] = useState('')
const [noteDate, setNoteDate] = useState('')
const {setOpenPopup} = useNavContext()

const handleSubmit = async (e) => {
    e.preventDefault()

    
    try {
        const userId = auth?.currentUser?.uid;
        const notesRef = collection(db, 'users', userId, "notes");

        // Dodaj nowe wydarzenie do podkolekcji
        await addDoc(notesRef, {
            noteTitle,
            serverDate: serverTimestamp(),
            remindDate: Timestamp.fromDate(new Date(noteDate)),
            noteTxt,
            userId
        });

        console.log('notka została dodana.');
        setOpenPopup(false)
    }
    catch (err) {
        console.error('Błąd podczas dodawania notki:', err.message);
    }
}

const handleClousePopup = () => {
    setOpenPopup(false)
}

    return (
        <div className="add-note">
              <button onClick={handleClousePopup} className='clouse-btn'>zamknij</button>
            <form onSubmit={handleSubmit} className="add-note-container">
                <h2>dodaj przypomnienie</h2>
                <label>nazwa przypomnienia</label>
                <input 
                type="text" 
                maxLength="50"
                required
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                />
                <label>tekst przypomnienia</label>
                <textarea 
                maxLength="200"
                required
                value={noteTxt}
                onChange={(e) => setNoteTxt(e.target.value)}
                ></textarea>
                <label>ustaw termin przypomnienia</label>
                <input 
                type="date" 
                required
                value={noteDate}
                onChange={(e) => setNoteDate(e.target.value)}
                />
                <button>dodaj</button>
            </form>

        </div>
    );
}

export default AddNotepopup;