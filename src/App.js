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
import { useSelector } from "react-redux";




const ProtectedRoute = () => {
  return (
    <div>
      <Navigate to="/login" />
    </div>
  )
}

function App() {
  const { loggedIn } = useSelector(state => state.auth)
  const { darkMode } = useSelector(state => state.dark)
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/register" element={loggedIn ? <Navigate to="/" /> :  <Register />} />
        <Route path="/login" element={loggedIn? <Navigate to="/" /> :  <Login />} />
        <Route path="/" element={!loggedIn ? <ProtectedRoute /> : <Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
