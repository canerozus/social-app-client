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

  useEffect(() => {
    makeRequest.get('/comments?postId=' + postId)
      .then(response => { setComments(response.data); setIsLoading(false) })
      .catch(error => { setError(error.message); setIsLoading(false); console.log(error) });
  }, []);
  //Despite there is a dependency array comments still in infinite loop ? 
  console.log(comments)
  return (
    <div className="comments">
      <div className="write">
        {currentUser.profilePic ?
          <img src={"/upload/" + currentUser.profilePic} alt="" />
          : <AccountCircleIcon style={{ height: "40px", width: "40px" }} />
        }
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment, id) => (
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
      ))}
    </div>
  );
};

export default Comments;