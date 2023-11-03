
import '../styles/lessons.scss'
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import CurrentDayLesson from "./CurrentDayLesson";

const Lessons = () => {

    const [lessons, setLessons] = useState([])

    const lessonsCollectionRef = collection(db, "lessons")
    const sortedQuery = query(lessonsCollectionRef, orderBy("sort"));

    const getLessonsList = async () => {
        try {
            const data = await getDocs(sortedQuery)
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setLessons(filterData)
        }
        catch (err) {
            console.log(err.code);
        }
    }
    useEffect(() => {
        getLessonsList()
    }, [])


    return (
        <div className="lessons">
            <h1>plan lekcji klasa <span>1 A</span></h1>
            <CurrentDayLesson lessons={lessons} />
        </div>
    );
}

export default Lessons;