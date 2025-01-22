import React from "react";
import '../App.css'
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Landingpage = () => {
    const navigate = useNavigate()
  return (
    <>
    <Navbar/>
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <h1>Welcome to BlogSphere</h1>
          <p>Your go-to platform for sharing ideas, stories, and experiences.</p>
        </div>
      </header>

      {/* About Blogs Section */}
      <section className="about-blogs">
        <div className="content-container">
          <h2>What is Blogging?</h2>
          <p>
            Blogging is a creative way to express your thoughts, share knowledge,
            and connect with a global audience. It can be about anything—your
            hobbies, experiences, or professional expertise.
          </p>
          <img
            src="public/images/what is blog.webp"
            alt="About Blogs"
            className="image"
          />
        </div>
      </section>

      {/* How to Write a Blog Section */}
      <section className="how-to-blog">
        <div className="content-container reverse">
          <img
            src="public/images/write a blog.webp"
            alt="How to Write a Blog"
            className="image"
          />
          <div>
            <h2>How to Write a Great Blog</h2>
            <ul>
              <li>Choose a topic you’re passionate about.</li>
              <li>Write in a clear and engaging style.</li>
              <li>Use visuals to make your content appealing.</li>
              <li>Edit and proofread before publishing.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Start Your Blogging Journey Today!</h2>
        <p>
          Share your ideas with the world, connect with readers, and make your
          voice heard.
        </p>
        <button onClick={()=>navigate('/login')} className="cta-button">Create Your First Blog</button>
      </section>
    </div>
    </>
  );
};

export default Landingpage;