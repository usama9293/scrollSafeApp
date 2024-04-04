import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (url) {
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error); // Display error message as a toast
                    } else {
                        toast.success("Created post Successfully"); // Display success message as a toast
                        // Redirect to home after successful post creation
                        window.location.href = "/";
                    }
                })
                .catch(err => {
                    console.error("Error creating post:", err);
                });
        }
    }, [url, title, body, navigate]);

    const postDetails = async () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("title", title);
        formData.append("body", body);

        try {
            const response = await fetch("http://localhost:5001/createpost", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: formData
            });

            const data = await response.json();
            console.log("Server Response:", data); // Log server response
            if (data.photo) {
                // Construct the URL of the uploaded image
                const imageUrl = `http://localhost:5001/uploads/${data.photo}`;
                // Set the URL of the uploaded image in the state
                setUrl(imageUrl);
                // Display success message

            } else {
                // Display error message if photo property is missing in the response
                toast.success("Image uploaded successfully");
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            // Display error message if there's an error during image upload
            toast.error("Failed to upload image");
        }
    };




    return (
        <div className="card input-filed"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}
        >
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => postDetails()}
            >
                Submit post
            </button>
        </div>
    );
};

export default CreatePost;
