import React, { useContext, useEffect } from 'react'
import "./Post.scss"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { makeRequest } from '../../Axios';
import { AuthContext } from "../../context/authContext";
const Post = ({ post, setPosts, posts }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [showLike, setShowLike] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    makeRequest.get("/likes?postId=" + post.id).then(response => { setShowLike(response.data)})
    .catch(err => console.log(err))
  },[])


  const handleLikes = () => {
    (!showLike.includes(currentUser.id)) ? makeRequest.post("/likes", { postId: post.id }).then(response => setShowLike([currentUser.id]))
      : makeRequest.delete("/likes?postId=" + post.id).then(response =>setShowLike(showLike.filter(id => id !== currentUser.id)))
  }

  const handleDelete = () => {
    makeRequest.delete("/posts/" + post.id).then(res => {
      const updatedPosts = posts.filter(value => value.id !== post.id);
      setPosts(updatedPosts);
    })
      .catch(err => console.log(err))
  }
  
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {post.profilePic ?
              <img src={post.profilePic} alt="" />
              : <AccountCircleIcon style={{ height: "40px", width: "40px" }} />
            }
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handleLikes}>
            {showLike.includes(currentUser.id) ? <FavoriteOutlinedIcon style={{ color: "red" }} />
              : <FavoriteBorderOutlinedIcon />}
            {showLike.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;