import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./Stories.scss"

const Stories = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "Jane Walker",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "Jane Walker",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "Jane Walker",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "Jane Walker",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        {currentUser.profilePic ?
          <img src={currentUser.profilePic} alt="" />
          : <AccountCircleIcon style={{ height: "100%", width: "100%", }} />
        }
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map(story => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories