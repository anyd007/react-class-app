import { useEffect, useState } from "react";
import Button from "../ui/Button";
import '../styles/current-day-lessons.scss'
import Loading from "../ui/Loading";
import useDateDate from "../config/useDate";
import useDate from "../config/useDate";


const CurrentDayLesson = ({ lessons, loading }) => {

    const { date, fullTime, dayIndex } = useDate()

    const [selecedDay, setSelectedDay] = useState('')
    const [checkDate, setCheckDate] = useState(true)
    const [checkEndTime, setCheckEndTime] = useState(false)
    const [infoTxt, setInfoTxt] = useState('')
    const [panding, setPanding] = useState(false)



    useEffect(() => {
        if (lessons[dayIndex]) {
            setPanding(false)
            let dinnerTimeParts = lessons[dayIndex].dinner.split(' - ')
            let finishDinnerTime = dinnerTimeParts[1]
            let startDinnerTime = dinnerTimeParts[0]
            console.log(lessons[dayIndex].start);
            console.log(startDinnerTime);
            if (startDinnerTime >= lessons[dayIndex].end && finishDinnerTime <= lessons[dayIndex].end) {
                setCheckDate(false)
                setCheckEndTime(true)
                
                setInfoTxt(`Lekcje się już skończyły 😊\n został tylko obiad 🍽️ w godzinach: ${lessons[dayIndex].dinner}\nsprawdź pełny plan, wybierając z górnego menu ⬆️`)

            }

           else if (fullTime > lessons[dayIndex].end) {
                setCheckDate(false)
                setCheckEndTime(true)
                setInfoTxt("Lekcje się już skończyły 😊\n sprawdź pełny plan, wybierając z górnego menu ⬆️")

            }
        }
        else{
           setPanding(true)
        }
    }, [dayIndex])

    const buttonHandler = (day) => {
        setSelectedDay(day)
        setCheckDate(false)
        setCheckEndTime(false)

    }


    return (
        <div className="current-day">

            <div className="dayname-btn-container">
                {lessons && lessons.map((lesson) => (
                    <Button onClick={() => buttonHandler(lesson.day)} value={lesson.day} key={lesson.id} />
                ))}
            </div>
            {panding && <Loading />}
            {loading && <Loading />}
            {checkEndTime && <h2 className="lessons-txt-info">{infoTxt}</h2>}
            {lessons.map((lesson, i) => (

                checkDate && lesson.day.trim() === date &&

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