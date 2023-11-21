import { Link } from "react-router-dom";
import '../styles/navbar.scss';
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useNavContext } from "./NavContext";
import { useAuthContext } from "./AuthContext";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import Popup from '../ui/Popup'

const Navbar = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuthContext()
    const {showPrivMenu, SetShowPrivMenu} = useNavContext()
    const [openPopup, setOpenPopup] = useState(false)
    const [popupTxt, setPopuopTxt] = useState('')

    const handleOpenPopup = () => {
        setOpenPopup(true)
        setPopuopTxt('czy napewno chcesz się wylogować?')
    }
    useEffect(() =>{
        if(currentUser){
            SetShowPrivMenu(true)
        }
        else{
            SetShowPrivMenu(false)
        }
    },[currentUser])



    return (
        <nav className="navbar">
            <div className="links">
                <Link className="links__item" to="/">Strona główna</Link>
                {!showPrivMenu && <Link  className="links__item" to="/signin">Rejestracja</Link>}
                {!showPrivMenu && <Link  className="links__item" to="login">Logowanie</Link>}
                {showPrivMenu && <Link className="links__item" to="/users/">twoje dane</Link>}
                {showPrivMenu && <Button onClick={handleOpenPopup} value="WYLOGUJ SIĘ"/>}
                {openPopup && <Popup setOpenPopup={setOpenPopup} popupTxt={popupTxt}/>}
            </div>
        </nav>
    );
}

export default Navbar;