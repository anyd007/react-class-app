import { useEffect, useState } from "react"
import Button from "../ui/Button";
import UserNavbar from "../user/UserNavbar";
import {auth} from '../config/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import '../styles/login.scss';
import Loading from "../ui/Loading";
import { useNavContext } from "./NavContext";

const Login = () => {
    const {showPrivMenu, SetShowPrivMenu} = useNavContext()
    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [checkLogin, setCheckLogin] = useState(false)
    const [errorTxt, setErrorTxt] = useState('')
    const [txtStatus, setTxtStatus] = useState('')
    const [loading, setLoading] = useState(false)
 


    const loginSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
       
        try{
            await signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
            setCheckLogin(true)
            setLoading(false)
            setTxtStatus("Logowanie udane !")
            SetShowPrivMenu(true)
        }
        catch(err){
            console.log(err.code);
            if(err.code === "auth/invalid-email"){
                setErrorTxt("błędny email ")
            }
            else if(err.code === "auth/missing-password"){
                setErrorTxt("niewłaściew hasło ")
            }
            else if(err.code === "auth/invalid-login-credentials"){
                setErrorTxt("Nieprawidłowe dane logowania ")
            }
            else{
                setErrorTxt("błąd logowania " + err.message)
            }

            setCheckLogin(false)
            setLoading(false)
        }
    }

    
   
    return (
        <div className="login">
            {loading && <Loading />}
        {checkLogin ? ( <UserNavbar /> ) : (
            <>
            <h2>Logowanie</h2>
            <form className="signin__container" onSubmit={loginSubmit}>
                <label>Podaj e-mail</label>
                <input type="text"
                    placeholder="e-mail..."
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                    required
                />
                <label>Podaj hasło</label>
                <input type="text"
                    placeholder="hasło..."
                    value={passwordLogin}
                    onChange={(e) => setPasswordLogin(e.target.value)}
                    required
                />
               
                <Button value="LOGOWANIE" />
            </form>
            <p className="error-txt">{errorTxt}</p>
            </>
        )}
        
        </div>
    );
}
 
export default Login;