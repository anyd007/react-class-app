import { useEffect, useState } from "react";
import Button from "../ui/Button";
import '../styles/current-day-lessons.scss'


const CurrentDayLesson = ({ lessons }) => {

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

            {lessons.map((lesson) => (
                lesson.day === selecedDay &&
                <div>

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