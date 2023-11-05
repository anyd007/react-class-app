import { useEffect, useState } from "react";
import Button from "../ui/Button";
import '../styles/current-day-lessons.scss'
import Loading from "../ui/Loading";
import useDateDate from "../config/useDate";
import useDate from "../config/useDate";


const CurrentDayLesson = ({ lessons, loading }) => {

    const { date } = useDate()
    console.log(date);
    lessons.map((lesson, i) =>{
console.log(i +1);
    })

    const [selecedDay, setSelectedDay] = useState('')

    useEffect((day) => {
        setSelectedDay(day)
    }, [])

    return (
        <div className="current-day">
            
            <div className="dayname-btn-container">
                {lessons && lessons.map((lesson) => (
                    <Button onClick={() => setSelectedDay(lesson.day)} value={lesson.day} key={lesson.id} />
                ))}
            </div>
            {loading && <Loading />}

            {lessons.map((lesson, i) => (

                
                lesson.day === selecedDay &&
                <div key={i}>

                    <div className="current-timetable" key={lesson.id}>
                        <p className="day">{lesson.day}</p>
                        <p className="dinner-time">obiad: {lesson.dinner}</p>
                    </div>

                    <div className="current-day-plan">
                        {lesson.hours.map((hour, i) => (
                            <div className="current-day-plan__map" key={i}>
                                <p className="hour">{hour}</p>
                                <p className="lesson">{lesson.lessons[i]}</p>
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    );
}

export default CurrentDayLesson;