import { useState } from'react';

const SortGrades = ({grades}) => {  
    const [sortValueChoose, setSortValueChoose] = useState('')
    const [sortedGrades, setSortedGrades] = useState('')
   
    const handleSort = () => {
        switch(sortValueChoose){
            case "ocena rosnaco":
                let sort =  [...grades].sort((a,b) => a.subject.localeCompare(b.subject))
               
                setSortedGrades(sort)
               
                break;
        }
    }
    console.log(sortedGrades);
    return (
        <div className="sort-grades">
            <label>sortuj według:</label>
            <select
             id="sort-grades"
             value={sortValueChoose}
             onChange={(e) => setSortValueChoose(e.target.value)}
             onClick={handleSort}
             >
                <option value="ocena rosnaco">ocena rosnąco</option>
                <option value="ocena malejaco">ocena malejąco</option>
                <option value="data rosnaco">data rosnąco</option>
                <option value="data malejaco">data malejąco</option>
                <option value="przemiot od: a">przedmiot od: a</option>
                <option value="przedmiot od: z">przedmiot od: z</option>
            </select>
        </div>
    );
}
 
export default SortGrades;