import Button from "../ui/Button";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try{
            await signOut(auth)
            navigate('/')
        }
        catch(err){
            console.log(err.code);
        }
    }
    return (
        <div className="user-navbar">
             <Button onClick={handleLogout} value="WYLOGUJ SIĘ"/>
            <h2>to będzie nawigacja</h2>
           
        </div>
    );
}
 
export default UserNavbar;