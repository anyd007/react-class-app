import { useEffect, useState } from "react";

const useDate = () => {
  const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
  const [date, setDate] = useState('')
  const [fullTime, setFullTime] = useState('')
  const [dayIndex, setDayIndex] = useState('')
  const [fullDate, setFullDate] = useState('')


  useEffect(() => {
    setInterval(() => {
      let currentDate = new Date()
      let days = currentDate.getDate()
      let month = currentDate.getMonth() + 1; // Dodajemy 1, ponieważ styczeń ma numer 0
      let year = currentDate.getFullYear();
      // Dodaj zero przed liczbami jednocyfrowymi
      days = days < 10 ? `0${days}` : days;
      month = month < 10 ? `0${month}` : month;
      let formattedDate = `${days}.${month}.${year}`;
      setFullDate(formattedDate)
      let hour = currentDate.getHours();
      let minute = currentDate.getMinutes();
      let filerHour = hour < 10 ? '0' + hour : hour;
      let filerMinute = minute < 10 ? '0' + minute : minute;
      setFullTime(`${filerHour}:${filerMinute}`)
     

      const day = currentDate.getDay();
      setDate(daysOfWeek[day]);
      setDayIndex(day - 1);
    }, 1000)



  }, [])


  return { date, fullTime, dayIndex, fullDate }
}

export default useDate;