import Button from "../ui/Button";
import '../styles/signin.scss';

const signin = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className="signin">
            <h2>rejestracja</h2>
       
                <form className="signin__container" onSubmit={handleSubmit}>
                    <label>Podaj e-mail</label>
                    <input type="text" 
                    placeholder="e-mail..."
                    required
                    />
                    <label>Podaj hasło</label>
                    <input type="text" 
                    placeholder="hasło..."
                    required
                    />
                      <label>Powtórz hasło</label>
                    <input type="text" 
                    placeholder="hasło..."
                    required
                    />
                    <Button  value="REJESTRACJA"/>
                </form>
            
        </div>
    );
}
 
export default signin;