import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Lessons from "./components/Lessons";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Login from "./components/Login";
import { NavContextProvider } from "./components/NavContext"
import { AuthPrivider } from "./components/AuthContext";
import UserNavbar from "./user/UserNavbar";
import GradesDetalis from "./user/GradesDetalis";



function App() {
  return (
    <div className="App">
      <NavContextProvider>
        <AuthPrivider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Lessons />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/login/*" element={<Login />} />
              <Route path="/users/*" element={<UserNavbar />}/>
              <Route path="/users/grades-detalis" element={<GradesDetalis/>} />
            </Routes>
          </Router>
        </AuthPrivider>
      </NavContextProvider>
    </div>
  );
}

export default App;
