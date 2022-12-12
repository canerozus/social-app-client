import "./NavBar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../store/DarkSlice";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const NavBar = () => {
  const { currentUser,setCurrentUser } = useContext(AuthContext);
  const { darkMode } = useSelector(state => state.dark);
  const [inputs, setInputs] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [err, setErr] = useState(null);
  const { logout } = useContext(AuthContext);
  const toggleDark = () => {
    if (darkMode === false) {
      dispatch(setDarkMode(true))
    } else {
      dispatch(setDarkMode(false))

    }
  }
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      localStorage.removeItem("user")
      navigate("/login")
    } catch (err) {
      setErr(err.response.data);
    }
  };
  

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>VukSocial</span>
        </Link>
        <HomeOutlinedIcon />
        {!darkMode ? <DarkModeOutlinedIcon onClick={toggleDark} style={{ cursor: "pointer" }} /> : <WbSunnyOutlinedIcon onClick={toggleDark} style={{ cursor: "pointer" }} />}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span> 
          <LogoutOutlinedIcon onClick={handleLogout} style={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  )
}

export default NavBar