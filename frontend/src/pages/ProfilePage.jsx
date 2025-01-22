import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { API_PATH } from "../../data/ApiPath";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UserNavbar from "./UserNavbar";
import { Link } from "react-router-dom";
import "../App.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState();
  const [blogs, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logoutloading, setLogoutLoading] = useState(false);

  const fetchuserbyid = async () => {
    try {
      const response = await axios.get(`${API_PATH}/user/userbyid/${id}`);
      setUser(response.data.user);
      setLoading(false);
    } catch (err) {
      setError("Error fetching user data");
      setLoading(false);
    }
  };

  const fetchblogbyuserid = async () => {
    try {
      const response = await axios.get(
        `${API_PATH}/blogs/getblogbyuserid/${id}`
      );
      setBlog(response.data.blog);
      console.log("this is the author", blogs.author);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBlogById = async (blogId) => {
    const userConfirmed = confirm("Are you sure you want to delete this blog?");
    if (!userConfirmed) {
      console.log("User canceled the deletion.");
      return;
    }

    try {
      const response = await axios.delete(
        `${API_PATH}/blogs/deleteblogbyid/${blogId}`
      );
      if (response.status === 201) {
        alert("Blog successfully deleted");
        console.log("Blog deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting the blog:", error);
      alert("Cannot delete the blog. Please try again later.");
    }
  };

  useEffect(() => {
    fetchuserbyid();
    fetchblogbyuserid();
  }, [id]);

  if (!user) {
    return <p>No user found</p>;
  }

  const truncateContent = (content, maxlength) => {
    if (!content) {
      return;
    }
    if (content.length > maxlength) {
      return content.substring(0, maxlength);
    }
    return content;
  };

  const handlenavigate = (path) => {
    navigate(path);
  };
  const handleLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      localStorage.removeItem("authToken");
      handlenavigate("/login");
      setLogoutLoading(false);
    }, 1000);
  };
  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <>
      <UserNavbar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image">
            {user.file ? (
              <img
                src={`${API_PATH}/${user.file.replace(/\\/g, "/")}`}
                alt="Blog visual"
                className="single-blog-image"
              />
            ) : (
              <img
                src="/path/to/placeholder-image.jpg"
                alt="no image"
                className="single-blog-image"
              />
            )}
          </div>
          <h1 className="profile-name">{user.fullname}</h1>
          <h2 className="profile-email">email : {user.email}</h2>
          <h2 className="profile-username">username :{user.username}</h2>
          <button onClick={handleLogout} className="logout-btn">
            {logoutloading ? <div className="spinner"></div> : "Logout"}
          </button>
        </div>
      </div>

      <h1>Your Blogs</h1>
      <div className="all">
        <div className="blog-container">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index} className="blog-item">
                <h2>{blog.title}</h2>

                <h3>{truncateContent(blog.content, 100)}</h3>
                <h3>{blog.tags}</h3>
                <p>By : {user.username}</p>
                <button
                  onClick={() => {
                    deleteBlogById(blog._id);
                  }}
                  className="blogdeletebtn"
                >
                  <FontAwesomeIcon icon={faTrash} size="1x" />
                </button>
            
                <button onClick={()=>{
                  navigate(`/blogs/updateblogbyid/${blog._id}`)
                }}  className="blogupdatebtn">
                  <FontAwesomeIcon icon={faPenToSquare} size="1x" />
                </button>
                
                <Link to={`/blogs/getblogbyid/${blog._id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No blogs available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
