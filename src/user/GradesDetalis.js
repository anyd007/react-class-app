import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../ui/Loading';
import useFirebase from '../config/useFirebase';
import { FaBackspace } from "react-icons/fa";
import '../styles/grade-details.scss';

const GradesDetalis = () => {

    const navigate = useNavigate()
    const [gradesBySubject, setGradesBySubject] = useState({});
    const { grades, loading } = useFirebase()
    const [subjectDetalis, setSubjectDetalis] = useState('')
    

    const extractGradesBySubject = () => {
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


    const handleBack = () => {
        navigate("/users")
    }


    return (
        <div className="grades-details">
            {loading && <Loading />}
            <h2>szczegóły ocen</h2>
            <p>wybierz z listy rozwijanej przedmiot który Cię interesuje</p>
            <FaBackspace className='back' onClick={handleBack}/>

            <select
                value={subjectDetalis}
                onChange={(e) => setSubjectDetalis(e.target.value)}
            >
                {Object.keys(gradesBySubject).map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                ))}
            </select>
           
            {Object.keys(gradesBySubject).map((subject, index) => (
                <div key={index}>
                    {subjectDetalis !== subject ? null :
                    <>
                     <h2>{subjectDetalis}</h2>
                    <p>{gradesBySubject[subject]}</p>
                    </>
                    }
                </div>
            ))}

        </div>
    );
}

export default GradesDetalis;