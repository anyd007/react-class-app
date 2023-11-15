import '../styles/add-grades-popup.scss';
import { useNavContext } from '../components/NavContext';

const AddGradesPopup = () => {
    const {openPopup, setOpenPopup} = useNavContext()

    const handleClousePopup = ( ) => {
        setOpenPopup(false)
    }
    return (

        <div className="add-grades-popup">
                <button onClick={handleClousePopup} className='clouse-btn'>zamknij</button>
              <form className="grades-container">
                <label>podaj datę</label>
                <input 
                type="date" 
                required
                />
                <label>przedmiot</label>
                <select 
                id="subjects"
                required
                >
                    <option value=""></option>
                    <option value="">Język polski</option>
                    <option value="">Edukacja Plastyczna</option>
                    <option value="">Informatyka</option>
                    <option value="">WF</option>
                    <option value="">Matematyka</option>
                    <option value="">Muzyka</option>
                    <option value="">Religia</option>
                    <option value="">Język angielski</option>
                </select>
                <label>ocena</label>
                <select 
                id="grades"
                required
                >
                    <option value=""></option>
                    <option value="">6</option>
                    <option value="">5</option>
                    <option value="">4</option>
                    <option value="">3</option>
                    <option value="">2</option>
                    <option value="">1</option>
                </select>
                <button>dodaj ocenę</button>
            </form>

        </div>
    );
}
 
export default AddGradesPopup;