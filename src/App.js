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
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const ProtectedRoute = ({ children }) => {
  return (
    <div>
      <Navigate to="/login" />
    </div>
  )
}

function App() {

  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useSelector(state => state.dark)
  const queryClient = new QueryClient()
  const Layout = () => {

    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <NavBar />
          <div style={{ display: "flex" }}>
            <LeftBar  />
            <div style={{ flex: 10 }}>
              <Outlet />
            </div>
            {/* <RightBar /> */}
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={currentUser === null ? <ProtectedRoute /> : <Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
