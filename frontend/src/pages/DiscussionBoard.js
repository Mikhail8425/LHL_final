import React from "react";

const DiscussionBoard = () => {
  return (
    <div className="body-wrapper">
      <h1>Discussion Board</h1>
      <p>Explore our latest articles, tips, and insights on stock trading and investing:</p>
      <div className="board-list">
        <div className="board-item">
          <h2>5 Essential Tips for Beginner Investors</h2>
          <p>Learn the fundamentals of investing and get started on your investment journey.</p>
          <a href="/board/1">Read More</a>
        </div>
        <div className="board-item">
          <h2>The Importance of Diversification in Your Investment Portfolio</h2>
          <p>Discover why diversifying your investment portfolio is crucial for long-term success.</p>
          <a href="/board/2">Read More</a>
        </div>

      </div>
    </div>
  );
};

export default DiscussionBoard;
