
import '../styles/usernavbar.scss';
import Grades from "./Grades";
import { useAuthContext } from "../components/AuthContext";

const UserNavbar = () => {
    const { currentUser } = useAuthContext()



   
   

//  const getKidName = async () =>{
        
//   try{
//     if (auth?.currentUser?.uid) {       
//     const data = await getDocs(query(kidNameRef, where("userId", "==", auth?.currentUser?.uid)));
            
//     const filterData = data.docs.map((doc) =>({
//       ...doc.data(),
//       id: doc.id
//     }))
//     setDisplayName(filterData)
//   }
// }
//   catch(err){
//     console.log(err);
//   }
// }

//     useEffect(() =>{
//         getKidName()
//         console.log("działa");
//     },[auth?.currentUser])
  
   
    return (
        <div className="user-navbar">
           <h2>{`Witaj ${currentUser.displayName}`}</h2> 
        <Grades />
        </div>
    );
}
 
export default UserNavbar;