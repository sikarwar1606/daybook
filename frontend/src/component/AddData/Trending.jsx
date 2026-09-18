// Trending.jsx
import React from "react";
import { useState, useEffect } from "react";
import "./Trending.css";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const Trending = ({ user }) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getLeadBord = async () => {
      try {
        const res = await fetch(`${API_URL}/api/aggregate/leaderboard`);
        if (res.ok) {
          const data = await res.json();
          setItems(data.leaderboard);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getLeadBord();
  }, [user.user_id]);

  return (
    <div className="trending-list">
      {items.map((item, index) => (
        <div className="trending-row" key={index}>
          <div className="avatar">
            <img
              src={item.avatar_url}
              alt={item.username || "User avatar"}
              width="25"
              height="25"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
          <span className="name">{item.nick_name}</span>
        </div>
      ))}
    </div>
  );
};

export default Trending;
