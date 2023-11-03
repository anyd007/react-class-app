import '../styles/button.scss';

const Button = ({onClick, value}) => {
    return (
        <div className="button-container">
            <button onClick={onClick}>{value}</button>
        </div>
    );
}
 
export default Button;