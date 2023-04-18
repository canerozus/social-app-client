import "./Posts.scss";
import Post from "../post/Post"
import { makeRequest } from "../../Axios.js";
import { useEffect, useState } from "react";

const Posts = ({ userId}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect( () => {
     makeRequest.get('/posts?userId=' + userId)
      .then(response => { setPosts(response.data); setIsLoading(false);})
      .catch(error => { setError(error.message); setIsLoading(false); console.log(error) });
  },[]);


  return <div className="posts">
    {error
      ? "Something went wrong!"
      : isLoading
        ? "loading"
        : (posts.map((post) => (
          <Post post={post} posts={posts} setPosts={setPosts} key={post.id} />
        )))}

  </div>;
};

export default Posts;