import React, { useState, useEffect } from 'react';
import '../screen/explore.css';

// Sample data representing images and videos for explore feed
const exploreData = [
    { id: 1, type: 'image', filename: 'a.jpg' },
    { id: 2, type: 'image', filename: 'b.jpg' },
    { id: 3, type: 'image', filename: 'c.jpg' },
    { id: 4, type: 'image', filename: 'd.jpg' },
    { id: 3, type: 'image', filename: 'e.jpg' },
    { id: 4, type: 'image', filename: 'g.jpg' },
    // Add more sample data as needed
];

const ExploreComponent = () => {
    const [feed, setFeed] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Simulate fetching explore feed data
        // In a real application, you would fetch data from an API
        // Here we're just setting the sample data to the feed state
        setFeed(exploreData);
    }, []);

    // Filter feed based on search query
    const filteredFeed = feed.filter(item =>
        item.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="explore-container">
            <h2>Explore</h2>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <div className="image-grid">
                {filteredFeed.map(item => (
                    <div key={item.id} className="media-item">
                        {item.type === 'image' ? (
                            <img src={`/images/${item.filename}`} alt={`Image ${item.id}`} />
                        ) : (
                            <video controls>
                                <source src={`/images/${item.filename}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreComponent;
