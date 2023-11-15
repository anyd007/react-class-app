import { Link } from "react-router-dom";
import '../styles/navbar.scss';
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useNavContext } from "./NavContext";
import { useAuthContext } from "./AuthContext";
import Button from "../ui/Button";
import { useEffect } from "react";

const Navbar = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuthContext()
    const {showPrivMenu, SetShowPrivMenu} = useNavContext()

    const handleLogout = async () => {
        try{
            await signOut(auth)
            navigate('/')
        }
        catch(err){
            console.log(err.code);
        }
    }
    useEffect(() =>{
        if(currentUser){
            SetShowPrivMenu(true)
        }
        else{
            SetShowPrivMenu(false)
        }
    })



    return (
        <nav className="navbar">
            <div className="links">
                <Link className="links__item" to="/">Strona główna</Link>
                {!showPrivMenu && <Link  className="links__item" to="/signin">Rejestracja</Link>}
                {!showPrivMenu && <Link  className="links__item" to="login">Logowanie</Link>}
                {showPrivMenu && <Link className="links__item" to="/users/*">twoje dane</Link>}
                {showPrivMenu && <Button onClick={handleLogout} value="WYLOGUJ SIĘ"/>}
            </div>
        </nav>
    );
}

export default Navbar;