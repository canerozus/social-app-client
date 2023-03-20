import "./Share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeRequest } from "../../Axios.js";
import moment from "moment"
const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const date = moment()

  const handleClick = e => {
    e.preventDefault()
    makeRequest.post("/posts",{desc,file,date}).then(response=>response.data)
    .catch(err => console.log(err.message))
  }
  const { currentUser } = useContext(AuthContext)
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          {currentUser.profilePic ?
            <img src={currentUser.profilePic} alt="" />
            : <AccountCircleIcon style={{ height: "40px", width: "40px" }} />
          }
          <input type="text" required placeholder={`What's on your mind ${currentUser.name}?`}
            onChange={e => setDesc(e.target.value)} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }}
              onChange={e => setFile(e.target.files[0])} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;