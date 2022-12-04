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
import { logout } from "../../store/AuthSlice"
const NavBar = () => {
  const { darkMode } = useSelector(state => state.dark);
  const {name, profilePic } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const toggleDark = () => {
    if (darkMode === false) {
      dispatch(setDarkMode(true))
    } else {
      dispatch(setDarkMode(false))

    }
  }
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout(true))
    navigate("/login");
  }

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
          <img src={profilePic} alt="" />
          <span>{name}</span>
          <LogoutOutlinedIcon onClick={handleLogout} style={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  )
}

export default NavBar