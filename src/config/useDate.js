import { useEffect, useState } from "react";

const useDate = () => {
    const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const [date, setDate] = useState('')

    const currentDate = new Date()
    const day = currentDate.getDay()
    useEffect(() =>{
        setDate(daysOfWeek[day])
    })
    

    return {date}
}
 
export default useDate;