import '../styles/delete-popup.scss';
import { db } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useAuthContext } from "../components/AuthContext";
import useFirebase from '../config/useFirebase';
import { useEffect } from 'react';


const DeletePopup = ({ setOpenDeletePopup, deleteItem}) => {
    const { getUserData } = useFirebase()
    const { currentUser } = useAuthContext()
    const handleNo = () => {
        setOpenDeletePopup(false)

    }
    
    const handleYes = async () => {
        try {
            const gradieDoc = doc(db, "users", currentUser.uid, "grades", deleteItem);
            await deleteDoc(gradieDoc)
            await getUserData()
            console.log("element został usunięty ");
            setOpenDeletePopup(false)
        }
        catch (err) {
            console.log("nie udało się usunąć pozycji: " + err.message);
        }
    }
    
    return (
        <div className="delete-popup">
            <div className="delete-item">
                <h2>czy na pewno chcesz usunąć?</h2>
                <button onClick={handleYes}>tak</button>
                <button onClick={handleNo}>nie</button>
            </div>
        </div>
    );
}

export default DeletePopup;