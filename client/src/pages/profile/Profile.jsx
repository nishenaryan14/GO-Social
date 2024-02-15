import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
export default function Profile() {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const username = useParams().username;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/?username=${username}`);
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUser();
  }, [username]);
  const updateDetails = async (userId, userData) => {
    const response = await axios.put(`users/${userId}`, userData);
    console.log(response);
  };
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <img
            className="profileCoverImg"
            src={
              user.coverPicture
                ? PublicFolder + user.coverPicture
                : `${PublicFolder}/person/noCover.jpeg`
            }
            alt=""
          />
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PublicFolder + user.profilePicture
                    : `${PublicFolder}/person/no_avatar.jpeg`
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
