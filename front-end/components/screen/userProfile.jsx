import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../src/App";
import { useParams } from "react-router-dom";

const Profile = () => {
    const [userProfile, setUserProfile] = useState({ followers: [] });
    const { state, dispatch } = useContext(UserContext);
    const { id } = useParams();
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        fetchUserProfile(id);
    }, [id]);

    useEffect(() => {
        // Check if the logged-in user is following the profile user
        if (state && userProfile && Array.isArray(userProfile.followers)) {
            setIsFollowing(userProfile.followers.includes(state._id));
        }
    }, [state, userProfile]);

    const fetchUserProfile = (userId) => {
        fetch(`http://localhost:5001/user/${userId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setUserProfile(result.user);
            })
            .catch(error => {
                console.error("Error fetching user profile:", error);
                // Handle error here
            });
    };

    const followUser = () => {
        fetch("http://localhost:5001/follow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: id
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } });
                localStorage.setItem("user", JSON.stringify(data));
                setUserProfile(prevUserProfile => ({
                    ...prevUserProfile,
                    followers: [...prevUserProfile.followers, data._id] // Update followers array based on the response
                }));
                setIsFollowing(true); // Update state to indicate following
            })
            .catch(error => {
                console.error("Error following user:", error);
                // Handle error here
            });
    };

    const unfollowUser = () => {
        fetch("http://localhost:5001/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: id
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } });
                localStorage.setItem("user", JSON.stringify(data));
                setUserProfile(prevUserProfile => ({
                    ...prevUserProfile,
                    followers: data.followers // Update followers array based on the response
                }));
                setIsFollowing(false); // Update state to indicate not following
            })
            .catch(error => {
                console.error("Error unfollowing user:", error);
                // Handle error here
            });
    };

    return (
        <div className="container">
            {userProfile && (
                <div className="dp">
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww"
                            alt="Profile"
                        />
                    </div>
                    <div>
                        <h4>{state ? state.username : "Loading"}</h4>
                        <div className="pf">
                            <h6>3 posts</h6>
                            <h6>{userProfile.followers ? userProfile.followers.length : 0} followers</h6>
                            <h6>{userProfile.following ? userProfile.following.length : 0} following</h6>
                        </div>
                        {console.log("userProfile:", userProfile)}
                        {console.log("userProfile.followers:", userProfile.followers)}
                        {console.log("state:", state)}
                        {console.log("state._id:", state && state._id)}
                        {isFollowing ? (
                            <button
                                type="button"
                                className="btn waves-effect waves-light #1e88e5 blue darken-1"
                                onClick={unfollowUser}
                            >
                                Unfollow
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn waves-effect waves-light #1e88e5 blue darken-1"
                                onClick={followUser}
                            >
                                Follow
                            </button>
                        )}
                    </div>
                </div>
            )}
            {/* Gallery section */}
            <div className="gallery">
                {userProfile && (
                    <>
                        <img className="item" src={`https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291cmNlfGVufDB8fDB8fHww`} alt="Profile Pic" />
                        <img className="item" src={`https://images.unsplash.com/photo-1559837627-de5ea80a1f43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c291cmNlfGVufDB8fDB8fHww`} alt="Profile Pic" />
                        <img className="item" src={`https://images.unsplash.com/photo-1594136662380-3580470c089d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c291cmNlfGVufDB8fDB8fHww`} alt="Profile Pic" />
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;
