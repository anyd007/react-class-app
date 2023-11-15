import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Lessons from "./components/Lessons";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Login from "./components/Login";
import {NavContextProvider} from "./components/NavContext"



function App() {
  return (
    <div className="App">
      <NavContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Lessons />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      </NavContextProvider>
    </div>
  );
}

export default App;
