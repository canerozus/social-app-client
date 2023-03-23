import { useContext, useEffect, useState } from "react";
import "./Comments.scss";
import { AuthContext } from "../../context/authContext"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeRequest } from "../../Axios.js";
import moment from "moment";


const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [desc, setDesc] = useState("");
  const date = moment()

  useEffect(() => {
    makeRequest.get('/comments?postId=' + postId)
      .then(response => { setComments(response.data); setIsLoading(false) })
      .catch(error => { setError(error.message); setIsLoading(false); console.log(error) });
  }, [comments]);
  //Despite there is a dependency array comments still in infinite loop ? 
  const handleClick = (e) => {
    e.preventDefault();
    makeRequest.post("/comments", { desc, postId }).then(response => response.data)
      .then(response => { console.log(response); setDesc("") })
      .catch(err => console.log(err.message))
  }

  return (
    <div className="comments">
      <div className="write">
        {currentUser.profilePic ?
          <img src={"/upload/" + currentUser.profilePic} alt="" />
          : <AccountCircleIcon style={{ height: "40px", width: "40px" }} />
        }
        <input type="text" placeholder="Write a comment" onChange={(e) => setDesc(e.target.value)} value={desc} />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong!"
        : isLoading
          ? "loading"
          : comments.map((comment, id) => (
            <div className="comment" key={id}>
              {comment.profilePic ?
                <img src={"/upload/" + comment.profilePic} alt="" />
                : <AccountCircleIcon style={{ height: "40px", width: "40px" }} />
              }
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">{moment(comment.createdAt).fromNow()}</span>
            </div>
          ))
      }
    </div>
  );
};

export default Comments;