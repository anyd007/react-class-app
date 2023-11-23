import { useEffect, useState } from 'react';

const SortGrades = ({ grades, setGrades }) => {
    const [sortValueChoose, setSortValueChoose] = useState('')


    const handleSort = () => {
        let sort;
        switch (sortValueChoose) {
            //jeśli wynik (b - a) jest dodatni, to b jest "większe" 
            //i będzie miało wyższy indeks niż a w posortowanej tablicy, co prowadzi do sortowania malejącego.
            case "ocena od nawyzszej":
                sort = [...grades].sort((a, b) => b.grade - a.grade)
                setGrades(sort)
                break;
            case "ocena od najnizszej":
                sort = [...grades].sort((a, b) => a.grade - b.grade)
                setGrades(sort)
                break;
            case "data rosnaco":
                sort = [...grades].sort((a, b) => a.dateDate - b.dateDate)
                setGrades(sort)
                break;
            case "data malejaco":
                sort = [...grades].sort((a, b) => b.dateDate - a.dateDate)
                setGrades(sort)
                break;
                //localeCompare() jest metodą wbudowaną w JavaScript, która porównuje dwa łańcuchy znaków
                // na podstawie ustawień lokalnych (języka i regionu). Metoda ta zwraca liczbę całkowitą, 
                //która wskazuje, czy łańcuchy są równe, a jeśli nie, to który z nich powinien pojawić się 
                //wcześniej lub później w sortowaniu alfabetycznym.
            case "przemiot od: a":
                sort = [...grades].sort((a, b) => a.subject.localeCompare(b.subject))
                setGrades(sort)
                break;
            case "przedmiot od: z":
                sort = [...grades].sort((a, b) => b.subject.localeCompare(a.subject))
                setGrades(sort)
                break;
            default:
                setGrades([...grades])
        }
    }
    useEffect(() =>{
        handleSort()
    }, [sortValueChoose])

    return (
        <div className="sort-grades">
            <label>sortuj według:</label>
            <select
                id="sort-grades"
                value={sortValueChoose}
                onChange={(e) => setSortValueChoose(e.target.value)}
               
            >  <option value=""></option>
                <option value="ocena od nawyzszej">ocena od nawyższej</option>
                <option value="ocena od najnizszej">ocena od najniższej</option>
                <option value="data rosnaco">data rosnąco</option>
                <option value="data malejaco">data malejąco</option>
                <option value="przemiot od: a">przedmiot od: a</option>
                <option value="przedmiot od: z">przedmiot od: z</option>
            </select>
        </div>
    );
}

export default SortGrades;