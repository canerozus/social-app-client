import "./Share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeRequest } from "../../Axios.js";
import moment from "moment"
import { useNavigate } from "react-router-dom";


const Share = ({ setPosts }) => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const date = moment()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault()
    let imgUrl = "";
    if (file) imgUrl = await upload()
    await makeRequest.post("/posts", { desc, img: imgUrl }).then(response => response.data)
    .then((response) => {
      console.log(response);
      setDesc("");
      setFile(null);
      window.location.reload()
    })
      .catch(err => console.log(err.message))
  }


  const { currentUser } = useContext(AuthContext)
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {currentUser.profilePic ?
              <img src={"/upload/" + currentUser.profilePic} alt="" />
              : <AccountCircleIcon style={{ height: "40px", width: "40px" }} />
            }
            <input type="text" required placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={e => setDesc(e.target.value)} value={desc} />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
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