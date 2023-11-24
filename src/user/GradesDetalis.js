import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../ui/Loading';
import useFirebase from '../config/useFirebase';
import { FaBackspace } from "react-icons/fa";
import useDate from "../config/useDate";
import '../styles/grade-details.scss';

const GradesDetalis = () => {

    const navigate = useNavigate()
    const [gradesBySubject, setGradesBySubject] = useState({});
    const { grades, loading } = useFirebase()
    const [subjectDetalis, setSubjectDetalis] = useState('')
    const [makeAverage, setMakeAverage] = useState(null)
    const {fullDate} = useDate()

console.log(fullDate);
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

    const averageGrade = () =>{
      
        Object.keys(gradesBySubject).forEach((el, index) => {
           if(subjectDetalis === el){
            const gradesArr = gradesBySubject[el]
            const average = gradesArr.reduce((a, b) => a + b, 0) / gradesArr.length;
            const roundedAverage = Math.ceil(average);

            setMakeAverage(roundedAverage);
           }

        })
    }
    useEffect(() =>{
        averageGrade()
    }, [subjectDetalis])
  

    

    const handleBack = () => {
        navigate("/users")
    }


    return (
        <div className="grades-details">
            {loading && <Loading />}
            <h2>szczegóły ocen</h2>
            <p>wybierz z listy rozwijanej przedmiot który Cię interesuje</p>
            <FaBackspace className='back' onClick={handleBack} />

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
                            <p>oceny:</p>
                            <div className="subject-grades" >
                                {gradesBySubject[subject].map((grade, index) => (
                                    <p className='grande-txt' key={index}>
                                        {gradesBySubject[subject].length <= 1 ? grade : `${grade},`}
                                    </p>
                                ))}
                            </div>
                            <p>{`ocena końcowa na dzień: ${fullDate}`}</p>
                            <p className='grande-txt'>{makeAverage}</p>
                        </>
                    }
                </div>
            ))}

        </div>
    );
}

export default GradesDetalis;