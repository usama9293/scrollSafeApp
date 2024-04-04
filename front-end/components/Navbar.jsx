import { Link } from "react-router-dom";
import { UserContext } from "../src/App";
import { useContext, useState } from "react"; // Import useState hook

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const [showNotifications, setShowNotifications] = useState(false); // State to track whether notifications are shown or not

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications); // Toggle the state to show/hide notifications
    };

    const renderList = () => {
        if (state) {
            return (
                <>
                    <li>
                        <i onClick={toggleNotifications} className="noti fas fa-bell btn"></i>
                        {/* Show notifications dropdown if state is true */}
                        {showNotifications && (
                            <div className="notifications-dropdown">
                                {/* Render notifications here */}
                                <p>Notification 1</p>
                                <p>Notification 2</p>
                                <p>Notification 3</p>
                            </div>
                        )}
                    </li>
                    <li><Link to="/Explore">Explore</Link></li>
                    <li><Link to="/Profile">Profile</Link></li>
                    <li><Link to="/Createpost">Create Post</Link></li>
                    <li>
                        <button
                            className="btn  red darken-3" type="submit"
                            name="action"
                            onClick={() => { localStorage.clear(); dispatch({ type: "CLEAR" }); window.location.href = "/Login"; }}
                        >
                            Log Out
                        </button>
                    </li>
                    {/* Notification button */}

                </>
            );
        } else {
            return (
                <>
                    <li><Link to="/Login">LogIn</Link></li>
                    <li><Link to="/Signup">SignUp</Link></li>
                </>
            );
        }
    }

    return (
        <nav>
            <div className="nav-wrapper white">
                {/* Title on the left side */}
                <Link to={state ? "/" : "Login"} className="brand-logo">ScrollSafeApp</Link>
                {/* Navigation links on the right side */}
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderList()}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
