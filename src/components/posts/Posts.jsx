import "./Posts.scss";
import Post from "../post/Post"
// import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../Axios.js";
import { useEffect, useState } from "react";
const Posts = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    makeRequest.get('/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.log(error));
  }, []);
  console.log(posts)
/*   const { isLoading, error, data } = useQuery(["posts"], () => makeRequest.get("/posts").then(
    (res) => {
      return res.data
    })) */

  return <div className="posts">
    {posts.map((post) => (
      <Post post={post} key={post.id} />
    ))} 

  </div>;
};

export default Posts;