import "./Posts.scss";
import Post from "../post/Post"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../Axios.js";
const Posts = () => {

  const { isLoading, error, data } = useQuery(["posts"], () => makeRequest.get("/posts").then(
    (res) => {
      return res.data
    }))
  console.log(data)
  return <div className="posts">
    {/* {data.map((post) => (
      <Post post={post} key={post.id} />
    ))} */}
  </div>;
};

export default Posts;