import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [postUpdated, setPostUpdated] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get("/posts/profile/" + username)
          : await axios.get("/posts/timeline/" + user._id);
        console.log(res);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        setPostUpdated(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [username, user._id, postUpdated]);
  const updatePosts = (newPost) => {
    if (newPost) {
      setPosts((posts) => [newPost, ...posts]);
      setPostUpdated(true);
    }
  };
  const updateEditedPosts = (newPost) => {
    if (newPost) {
      setPostUpdated(true);
    }
  };
  const updateDeletedPost = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && (
          <Share updatePosts={updatePosts} />
        )}
        {posts.map((post) => {
          return (
            <Post
              key={post._id}
              post={post}
              updateDeletedPosts={updateDeletedPost}
              updatePosts={updatePosts}
              updateEditedPosts={updateEditedPosts}
            />
          );
        })}
      </div>
    </div>
  );
}
