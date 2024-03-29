import { useEffect, useState } from "react";
import Button from "../ui/Button";
import '../styles/current-day-lessons.scss'
import Loading from "../ui/Loading";
import useDate from "../config/useDate";


const CurrentDayLesson = ({ lessons, loading }) => {

    const { date, fullTime, dayIndex } = useDate()

    const [selecedDay, setSelectedDay] = useState('')
    const [checkDate, setCheckDate] = useState(true)
    const [checkEndTime, setCheckEndTime] = useState(false)
    const [infoTxt, setInfoTxt] = useState('')
    const [currentLesson, SetCurrentLesson] = useState(null)
   

    useEffect(() =>{
        
        if (lessons[dayIndex]) {
           
            for(let i=0; i<lessons[dayIndex].hours.length; i++){
                let lessonsHours;
               lessonsHours = lessons[dayIndex].hours[i].split(' - ')
              if(fullTime >= lessonsHours[0] && fullTime <= lessonsHours[1]){
                console.log("pokazywanie obecnej lekcji działa, dla godzin:" + lessonsHours);
                return SetCurrentLesson(i)
                
              }
              else{
               
                SetCurrentLesson(null)
                console.log("pokazywanie obecnej lekcji nie dziła");
              }
            }
           }
         
    }, [fullTime, lessons, dayIndex])
 
    useEffect(() => {
        if (lessons[dayIndex]) {
         
            let dinnerTimeParts = lessons[dayIndex].dinner.split(' - ')
            let finishDinnerTime = dinnerTimeParts[1].replace(":", ".")
            let startDinnerTime = dinnerTimeParts[0].replace(":", ".")
            let endTime = lessons[dayIndex].end.replace(":", ".")
      
            console.log("początek obiadu: " + startDinnerTime, "koniec obiadu: " + finishDinnerTime, "koniec lekcji:" +endTime);
            if (fullTime.replace(":", ".") > endTime && finishDinnerTime > fullTime.replace(":", ".")) {
                setCheckDate(false)
                setCheckEndTime(true)
                
                setInfoTxt(`Lekcje się już skończyły 😊\n został tylko obiad 🍽️ w godzinach: ${lessons[dayIndex].dinner}\nsprawdź pełny plan, wybierając z górnego menu ⬆️`)

            }

           else if(fullTime.replace(":", ".") >= endTime) {
                setCheckDate(false)
                setCheckEndTime(true)
                setInfoTxt("Lekcje się już skończyły 😊\n sprawdź pełny plan, wybierając z górnego menu ⬆️")

            }
        }
        else{
           
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
                                <p className="hour">{currentLesson == i && currentLesson !== null ? `TERAZ:  ${hour}` : hour}</p>
                                <p className="lesson">{lesson.lessons[i]}</p>
                                <p>sala:{lesson.classrooms[i]}</p>
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
                                <p>sala: {lesson.classrooms[i]}</p>
                            </div>
                        ))}
                    </div>

                </div>
            ))}
            
        </div>
    );
}

export default CurrentDayLesson;