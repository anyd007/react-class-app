import { Link } from "react-router-dom";
import '../styles/navbar.scss';
import { useEffect, useState } from "react";

const Navbar = () => {
    const [home, setHome] = useState(false)
    const [signin, setSignin] = useState(true)
    const [login, setLogin] = useState(true)

    const handleClick = () => {
        if (home) {
            setLogin(true)
            setSignin(true)
            setHome(false)
        }
        else if (login) {
            setHome(true)
            setLogin(false)
            setSignin(true)
        }
        else if (signin) {
            setHome(true)
            setLogin(true)
            setSignin(false)
        }
       
    }




    return (
        <nav className="navbar">
            <div className="links">
                {home && <Link onClick={handleClick} className="links__item" to="/">Strona główna</Link>}
                {signin && <Link onClick={handleClick} className="links__item" to="/signin">Rejestracja</Link>}
                {login && <Link onClick={handleClick} className="links__item" to="login">Logowanie</Link>}
            </div>
        </nav>
    );
}

export default Navbar;