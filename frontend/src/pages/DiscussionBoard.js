import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/component/blogcomponents/Header';
import MainFeaturedPost from '../components/component/blogcomponents/MainFeaturedPost';
import FeaturedPost from '../components/component/blogcomponents/FeaturedPost';
import Main from '../components/component/blogcomponents/Main';
import Sidebar from '../components/component/blogcomponents/Sidebar';
import Footer from '../components/component/blogcomponents/Footer';
import post1 from '../components/component/blogcomponents/blog-post.1.md';
import post2 from '../components/component/blogcomponents/blog-post.2.md';
import post3 from '../components/component/blogcomponents/blog-post.3.md';


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
