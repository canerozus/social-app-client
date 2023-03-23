import "./Profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeRequest } from "../../Axios";
import { useLocation } from "react-router-dom";
const Profile = () => {
  const [data, setData] = useState({})
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  useEffect(() => {
      makeRequest.get("/users/find/" + userId).then(response => setData(response.data))
      .catch(err => console.log(err))

  },[setData])
  
const { currentUser } = useContext(AuthContext)

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        {data.profilePic ?
          <img src={data.profilePic} alt="" />
          : <AccountCircleIcon style={{ height: "200px", width: "200px", top: "200px", margin: "auto", position: "absolute", left: "0", right: "0" }} />
        }
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>TR</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lorem ipsum</span>
              </div>
            </div>
            {userId === currentUser.id ? "" : <button>Follow</button>}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
         <Posts /> 
      </div>
    </div>
  );
};

export default Profile;