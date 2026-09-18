// Trending.jsx
import React from "react";
import { useState, useEffect } from "react";
import "./Trending.css";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const Trending = ({ user }) => {
  // const items = [
  //   { id: 1, name: "Name", rank: "Rank" },
  //   { id: 2, name: "Name", rank: "Rank" },
  //   { id: 3, name: "Name", rank: "Rank" },
  //   { id: 4, name: "Name", rank: "Rank" },
  // ];

  //  {
  //     "user_id": 5,
  //     "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocI5GObDXVwod3TwiiJnzJidBCw3WArN2xbBKWC89LmYb8f9aQ=s96-c",
  //     "nick_name": "hustler8889",
  //     "total_savings": "34000.00"
  // },

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getLeadBord = async () => {
      try {
        const res = await fetch(`${API_URL}/api/aggregate/leaderboard`);
        if (res.ok) {
          const data = await res.json();
          setItems(data.leaderboard);
          console.log(items);
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
          {/* <span className="rank">{item.rank}</span> */}
          {/* <span className="rank">{item.rank}</span> */}
        </div>
      ))}
    </div>
  );
};

export default Trending;
