import "./Posts.scss";
import Post from "../post/Post"
// import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../Axios.js";
import { useEffect, useState } from "react";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    makeRequest.get('/posts')
      .then(response => { setPosts(response.data); setIsLoading(false) })
      .catch(error => { setError(error.message); setIsLoading(false); console.log(error) });
  }, []);

  /*   const { isLoading, error, data } = useQuery(["posts"], () => makeRequest.get("/posts").then(
      (res) => {
        return res.data
      })) */

  return <div className="posts">
    {error 
    ? "Something went wrong!" 
    : isLoading
    ? "loading"
    :(posts.map((post) => (
      <Post post={post} key={post.id} />
    )))}

  </div>;
};

export default Posts;