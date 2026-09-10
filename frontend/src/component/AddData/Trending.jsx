// Trending.jsx
import React from "react";
import "./Trending.css";

const Trending = () => {
  const items = [
    { id: 1, name: "Name", rank: "Rank" },
    { id: 2, name: "Name", rank: "Rank" },
    { id: 3, name: "Name", rank: "Rank" },
    { id: 4, name: "Name", rank: "Rank" },
  ];

  return (
    <div className="trending-list">
      {items.map((item) => (
        <div className="trending-row" key={item.id}>
          <div className="avatar">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>
          <span className="name">{item.name}</span>
          <span className="rank">{item.rank}</span>
        </div>
      ))}
    </div>
  );
};

export default Trending;   