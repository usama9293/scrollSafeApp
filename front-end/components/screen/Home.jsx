import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../src/App";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import Suggestions from "./suggestions";

const Home = () => {
    const [data, setData] = useState([]);
    const { state } = useContext(UserContext);
    const [showComments, setShowComments] = useState({});

    useEffect(() => {
        fetch("http://localhost:5001/allposts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setData(result.posts);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                // Handle error here
            });
    }, []);

    const likePost = (id) => {
        fetch("http://localhost:5001/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        })
            .then(res => res.json())
            .then(result => {
                setData(prevData => {
                    return prevData.map(item => {
                        if (item._id === result._id) {
                            // Update the liked post with the new data
                            return { ...result, postedBy: item.postedBy }; // Retain the postedBy information
                        }
                        return item; // Leave other posts unchanged
                    });
                });
                toast.success("You liked a post!");
            })
            .catch(error => {
                console.error("Error liking post:", error);
                // Handle error here
            });
    };

    const unlikePost = (id) => {
        fetch("http://localhost:5001/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        })
            .then(res => res.json())
            .then(result => {
                setData(prevData => {
                    return prevData.map(item => {
                        if (item._id === result._id) {
                            // Update the unliked post with the new data
                            return { ...result, postedBy: item.postedBy }; // Retain the postedBy information
                        }
                        return item; // Leave other posts unchanged
                    });
                });
                toast.success("You unliked a post!");
            })
            .catch(error => {
                console.error("Error unliking post:", error);
                // Handle error here
            });
    };

    const makeComment = (text, postId) => {
        fetch("http://localhost:5001/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        })
            .then(res => res.json())
            .then(result => {
                const updatedData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(updatedData);
                toast.success("You commented on a post!");
            })
            .catch(error => {
                console.error("Error commenting on post:", error);
                // Handle error here
            });
    };

    const toggleComments = (postId) => {
        setShowComments(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };
    return (
        <div className="home">

            {/* Show Suggestions component at the top */}
            <div className="post-content">

                {data.length > 0 ? (
                    data.map(item => (
                        <div className="card home-card" key={item._id}>
                            {/* Implement logic */}
                            <img className="profile" src="../public\images\profile.jpg"></img>
                            <h5><Link to={state._id !== (item.postedBy && item.postedBy._id) ? "/profile/" + (item.postedBy && item.postedBy._id) : "/profile"}>{item.postedBy?.username}</Link></h5>
                            <img className="more" src="../public\images\more.png"></img>
                            {/* <Link to={state._id !== (item.postedBy && item.postedBy._id) ? "/profile/" + (item.postedBy && item.postedBy._id) : "/profile"}>{item.postedBy?.username}</Link> */}
                            <div className="card-image">
                                <img src="https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=" alt={item.title} />
                            </div>

                            <div className="card-content">
                                {item.likes.includes(state._id) ? (
                                    <i className="material-icons" onClick={(e) => { e.stopPropagation(); unlikePost(item._id); }}>
                                        <img className="heart2" src="../public\images\redh.png" alt="Unlike" />
                                    </i>
                                ) : (
                                    <i className="material-icons" onClick={(e) => { e.stopPropagation(); likePost(item._id); }}>
                                        <img className="heart1" src="../public\images\heart.png" alt="Like" />
                                    </i>
                                )}


                                <img className="cmt" style={{ cursor: "pointer" }} src="../public\images\comment.png" onClick={() => toggleComments(item._id)}></img>                                <h6>{item.title}</h6>
                                <h6>{item.likes.length}</h6>
                                <p>{item.body}</p>
                                {showComments[item._id] && item.comments.map((record) => (
                                    <h6 key={record._id}><span style={{ fontWeight: "500" }}>{record.postedBy.username}</span> {record.text}</h6>
                                ))}
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    makeComment(e.target[0].value, item._id);
                                    e.target.reset();
                                }}>
                                    {showComments[item._id] && <input type="text" placeholder="Add a comment" />}
                                </form>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No posts found</div>
                )}

            </div>
            <Suggestions />
        </div>

    );
};

export default Home;
