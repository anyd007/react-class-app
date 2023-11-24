import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../ui/Loading';
import useFirebase from '../config/useFirebase';

const GradesDetalis = () => {

    const navigate = useNavigate()
    const [gradesBySubject, setGradesBySubject] = useState({});
    const {grades, loading} = useFirebase()

    const extractGradesBySubject = () => {
        {loading && <Loading />}
        if (grades.length !== 0) {
            const gradesBySubjectObj = {};

            grades.forEach((grade) => {
                //destrukturyzacja każdego elemetu grade z grades
                const { subject, grade: gradeValue } = grade;

                if (!gradesBySubjectObj[subject]) {
                    gradesBySubjectObj[subject] = [gradeValue];
                } else {
                    gradesBySubjectObj[subject].push(gradeValue);
                }
            });

            setGradesBySubject(gradesBySubjectObj);
        }
    };

    useEffect(() => {
        extractGradesBySubject();
    }, [grades]);

    console.log(gradesBySubject);


    const handleBack = () => {
        navigate("/users")
    }
    return (
        <div className="grades-details">
            <h2>szczegóły</h2>
            <button onClick={handleBack}>wróć</button>
            {Object.keys(gradesBySubject).map((subject, index) => (
                <>
                    <h2>{subject}</h2>
                    <p>{gradesBySubject[subject]}</p>
                </>
            ))}
            <label>wybierz</label>
            <select>
            {Object.keys(gradesBySubject).map((subject, index) => ( <option value={subject}>{subject}</option>))}
            </select>
        </div>
    );
}

export default GradesDetalis;