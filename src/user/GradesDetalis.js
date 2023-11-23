import { useNavContext } from '../components/NavContext';
import { useNavigate } from 'react-router-dom';
const GradesDetalis = () => {
    const { grades, setGrades } = useNavContext()
    const navigate = useNavigate()

    console.log(grades);

    const handleBack = () =>{
        navigate("/users")
    }
    return (
        <div className="grades-details">
            <h2>szczegóły</h2>
            <button onClick={handleBack}>wróć</button>
        </div>
    );
}

export default GradesDetalis;