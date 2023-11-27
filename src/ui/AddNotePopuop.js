import {useState} from "react";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
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
        const eventsRef = collection(db, 'users');
        // Przekształć datę z pola input type selectedDate na obiekt JavaScript Date
        const selectedDateObject = new Date(noteDate);

        // Utwórz Timestamp z obiektu Date
        const timestamp = Timestamp.fromDate(selectedDateObject);

        // Dodaj nowe wydarzenie do podkolekcji
        await addDoc(eventsRef, {
            noteTitle,
            noteDate: timestamp,
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

    return (
        <div className="add-note">
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