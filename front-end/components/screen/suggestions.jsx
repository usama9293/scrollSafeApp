import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../src/App";

const Suggestions = () => {
    const [suggestedUsers, setSuggestedUsers] = useState([]);


    useEffect(() => {
        // Fetch suggested users from the server or any data source
        fetchSuggestedUsers();
    }, []);

    const fetchSuggestedUsers = () => {
        // Simulated suggested users data (replace with actual fetching logic)
        const dummySuggestedUsers = [
            { id: 1, type: 'image', filename: 'a.jpg', username: 'Ali' },
            { id: 2, type: 'image', filename: 'cc.jpg', username: 'Kasif' },
            { id: 3, type: 'image', filename: 'm.jpg', username: 'Umer' },
            { id: 4, type: 'image', filename: 'p.jpg', username: 'Awais' },
            { id: 5, type: 'image', filename: 'q.jpg', username: 'Aitzaz' },
            { id: 6, type: 'image', filename: 's.jpg', username: 'Yasir' }
            // Add more suggested users as needed
        ];
        setSuggestedUsers(dummySuggestedUsers);
    };


    return (
        <div className="suggestions">
            <h3>Suggestions for you</h3>
            <div className="suggested-users">
                {suggestedUsers.map((user) => (
                    <div className="user" key={user.id}>
                        <img src={`/images/${user.filename}`} alt={user.username} />
                        <span>{user.username}</span>
                        <button className="follow-button">Follow</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Suggestions;
