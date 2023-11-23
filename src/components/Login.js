import { useState } from "react"
import Button from "../ui/Button";
import UserNavbar from "../user/UserNavbar";
import {auth, googleProvider} from '../config/firebase'
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import '../styles/login.scss';
import Loading from "../ui/Loading";
import { useNavContext } from "./NavContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {SetShowPrivMenu} = useNavContext()
    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [checkLogin, setCheckLogin] = useState(false)
    const [errorTxt, setErrorTxt] = useState('')
    const [txtStatus, setTxtStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
 


    const loginSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
       
        try{
            await signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
            setCheckLogin(true)
            setLoading(false)
            setTxtStatus("Logowanie udane !")
            SetShowPrivMenu(true)
            setTimeout(() =>{
                navigate('/users')
            }, 500)
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

    const signinWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
            navigate('/users')
        }
        catch(err){
            console.log(err.message);
            setTxtStatus("Błąd rejestacji: " + err.code)
        }
    }

    
   
    return (
        <div className="login">
            {loading && <Loading />}
        {checkLogin ? ( <UserNavbar /> ) : (
            <>
            <h2>Logowanie</h2>
            <p>jeżeli rejestracja odbyła się przez konto google:</p>
            <Button value="PRZEZ GOOGLE" onClick={signinWithGoogle}/>
            <p>lub tradycyjnie:</p>
            <form className="signin__container" onSubmit={loginSubmit}>
                <label>Podaj e-mail</label>
                <input type="text"
                    placeholder="e-mail..."
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                    required
                />
                <label>Podaj hasło</label>
                <input type="password"
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