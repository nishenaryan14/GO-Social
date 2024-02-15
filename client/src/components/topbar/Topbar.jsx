import { useContext, useRef, useState } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // const [username, setUsername] = useState("");
  const searchRef = useRef(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    // const data = getUser(searchRef.current.value);
    const username = searchRef.current.value;
    navigate(`profile/${username}`);
  };

  const getUser = async (username, userId) => {
    try {
      let response;
      if (userId) {
        response = await axios.get(`/users/`, { params: { userId } });
      } else if (username) {
        // setUsername(username);
        response = await axios.get(`/users/`, { params: { username } });
      } else {
        console.error("Neither username nor userId provided.");
        return;
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Gosocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            ref={searchRef}
            name="searchInput"
            placeholder="Search for friend, post, or video"
            className="searchInput"
            onKeyPress={handleKeyPress}
          />
          <span onClick={handleSubmit} className="search">
            Search
          </span>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={PF + user.profilePicture || `${PF}/person/no_avatar.jpeg`}
            alt=""
            className="topbarImage"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
