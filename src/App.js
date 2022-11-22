import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import LeftBar from "./components/leftbar/LeftBar";
import RightBar from "./components/rightbar/RightBar";


const currentUser = true;

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex:6}}>
        <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  )
}
const ProtectedRoute = () => {
  return (
    <div>
      <Navigate to="/login" />
    </div>
  )
}

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={!currentUser ? <ProtectedRoute /> : <Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
