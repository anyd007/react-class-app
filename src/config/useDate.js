import { useEffect, useState } from "react";

const useDate = () => {
    const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const [date, setDate] = useState('')
    const [fullTime, setFullTime] = useState('')
    const [dayIndex, setDayIndex] = useState(0)
    const time = "15:40"
    const dinnerTime = "12:31"
    // const updateFullTime = () => {
    //     let currentDate = new Date()
    //     let hour = currentDate.getHours();
    //     let minute = currentDate.getMinutes();
    //     let filerHour = hour < 10 ? '0' + hour : hour;
    //     let filerMinute = minute < 10 ? '0' + minute : minute;
    //     setFullTime(`${filerHour}:${filerMinute}`)

    // }
    useEffect(() => {
       
            const currentDate = new Date();
            const day = currentDate.getDay();
            setDate(daysOfWeek[day]);
            setDayIndex(day - 1);
       

      
    }, []);
  useEffect(() =>{
    setInterval(() => {
        let currentDate = new Date()
        let hour = currentDate.getHours();
        let minute = currentDate.getMinutes();
        let filerHour = hour < 10 ? '0' + hour : hour;
        let filerMinute = minute < 10 ? '0' + minute : minute;
        setFullTime(`${filerHour}:${filerMinute}`)
    }, 1000)
  }, [])
   

    return { date, fullTime, dayIndex, time, dinnerTime }
}

export default useDate;