import '../styles/add-grades-popup.scss';
import { useNavContext } from '../components/NavContext';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useState } from 'react';

const AddGradesPopup = () => {
    const { setOpenPopup } = useNavContext()
    const [selectedDate, setSelectedDate] = useState('')
    const [subject, setSubject] = useState('')
    const [grade, setGrade] = useState(0)
   
    const handleAddGrades = async (e) => {
        e.preventDefault();
    
        try {
            const userId = auth?.currentUser?.uid;
       // Utwórz referencję do kolekcji ocen danego użytkownika
       const gradesCollection = collection(db, 'users', userId, 'grades');


        // Przekształć grade na liczbę
       const gradeNumber = parseFloat(grade);


       // Dodaj nowe wydarzenie do kolekcji
       await addDoc(gradesCollection, {
           selectedDate,
           dateDate: serverTimestamp(),
           subject,
           grade: gradeNumber,
       });

            console.log('ocena została dodana.');
            setOpenPopup(false)
        }
        catch (err) {
            console.error('Błąd podczas dodawania oceny:', err.message);
        }
    }


    const handleClousePopup = () => {
        setOpenPopup(false)
    }

    return (

        <div className="add-grades-popup">
            <button onClick={handleClousePopup} className='clouse-btn'>zamknij</button>
            <form className="grades-container" onSubmit={handleAddGrades}>
                <label>podaj datę</label>
                <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <label>przedmiot</label>
                <select
                    id="subjects"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                >
                    <option value=""></option>
                    <option value="Język polski">Język polski</option>
                    <option value="Edukacja Plastyczna">Edukacja Plastyczna</option>
                    <option value="Informatyka">Informatyka</option>
                    <option value="WF">WF</option>
                    <option value="Matematyka">Matematyka</option>
                    <option value="Muzyka">Muzyka</option>
                    <option value="Religia">Religia</option>
                    <option value="Język angielski">Język angielski</option>
                </select>
                <label>ocena</label>
                <select
                    id="grades"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                >
                    <option value=""></option>
                    <option value="6">6</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
                <button>dodaj ocenę</button>
            </form>

        </div>
    );
}

export default AddGradesPopup;