import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_PATH } from "../../data/ApiPath";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
    const { id } = useParams();
    console.log(id)
    const [blogdata, setBlogData] = useState({
        title: "",
        content: "",
        tags: "",
        category: "",
        file: null,
    });

    // useEffect(() => {
    //     if (!id) return;

    //     const fetchBlogById = async () => {
    //         try {
    //             const response = await axios.get(`${API_PATH}/blogs/getblogbyid/${id}`);
    //             if (response.status === 200) {
    //                 const blog = response.data.blog;
    //                 console.log("this is the blog in frontend....",blog)
    //                 setBlogData({
    //                     title: blog.title,
    //                     content: blog.content,
    //                     tags: blog.tags,
    //                     category: blog.category,
    //                     file: blog.file || null,
    //                 });
    //             }
    //         } catch (error) {
    //             console.error("Error fetching blog:", error);
    //         }
    //     };

    //     fetchBlogById();
    // }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", blogdata.title);
        formData.append("content", blogdata.content);
        formData.append("tags", blogdata.tags);
        formData.append("category", blogdata.category);
        if (blogdata.file) {
            formData.append("file", blogdata.file);
        }

        try {
            const response = await axios.put(`${API_PATH}/blogs/updateblogbyid/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                alert("Blog updated successfully!");
                // Redirect or update UI here
            }
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="blog">
                    <div className="blog-section">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={blogdata.title}
                            onChange={(e) => setBlogData({ ...blogdata, title: e.target.value })}
                        />
                        <br />
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            value={blogdata.content}
                            onChange={(e) => setBlogData({ ...blogdata, content: e.target.value })}
                        ></textarea>
                        <br />
                        <label htmlFor="tags">Tags</label>
                        <input
                            type="text"
                            id="tags"
                            value={blogdata.tags}
                            onChange={(e) => setBlogData({ ...blogdata, tags: e.target.value })}
                        />
                        <br />
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={blogdata.category}
                            onChange={(e) => setBlogData({ ...blogdata, category: e.target.value })}
                        >
                            <option value="technology">Technology</option>
                            {/* Add other categories */}
                        </select>
                        <label htmlFor="file">Image</label>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setBlogData({ ...blogdata, file: e.target.files[0] })}
                        />
                        <button type="submit" className="publishbtn">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateBlog;
