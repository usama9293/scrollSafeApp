import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../src/App";

const Profile = () => {
    const [profilePic, setProfilePic] = useState(null);
    const { state, dispatch } = useContext(UserContext);
    console.log("State:", state);

    useEffect(() => {
        fetch("http://localhost:5001/myposts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.myposts.length > 0) {
                    const firstPost = result.myposts[0];
                    setProfilePic(firstPost.photo);
                }
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                // Handle error here
            });
    }, []);

    return (
        <div className="container">
            <div className="dp">
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww"
                        alt="Profile"
                    />

                </div>
                <div>
                    <h4>{state ? state.username : "Loading"}</h4>
                    <div className="pf">
                        <h6>1 posts</h6>
                        <h6>3followers</h6>
                        <h6>30 following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {profilePic && (
                    <>
                        <img className="item" src={`https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291cmNlfGVufDB8fDB8fHww`} alt="Profile Pic" />
                        <img className="item" src={`https://images.unsplash.com/photo-1559837627-de5ea80a1f43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c291cmNlfGVufDB8fDB8fHww`} alt="Profile Pic" />
                        <img className="item" src={`https://images.unsplash.com/photo-1594136662380-3580470c089d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c291cmNlfGVufDB8fDB8fHww`} alt="Profile Pic" />

                    </>)}
            </div>
        </div>
    );
}

export default Profile;
