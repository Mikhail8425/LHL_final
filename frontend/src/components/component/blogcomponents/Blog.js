import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Events', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Energy', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'Welcome to Stock Market Magnet Forums!',
  description:
    "Join our community to discuss hot stock tips, share insights, and upvote posts from fellow members. Let's keep the conversation focused on the stock market and related topics. Start exploring and engaging with like-minded investors today!",
  image: 'https://www.shutterstock.com/shutterstock/photos/416888221/display_1500/stock-photo-stock-market-or-forex-trading-graph-and-candlestick-chart-suitable-for-financial-investment-concept-416888221.jpg',
  imageText: 'main image description',
  linkText: '',
};

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'X', icon: XIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const defaultTheme = createTheme();

export default function Blog() {
  const user_id = cookies.get("user_id");
  const user_name = cookies.get("user_name");
  const [newPosts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);



  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [postData, setPostData] = useState({
    title: '',
    date: getCurrentDate(), // Set initial state with today's date
    description: '',
    likes: 0,
    image: '',
    image_label: '',
    user_id: user_id,
    username: user_name
    // Add more fields here as needed
  });


  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddPost = async () => {
    try {
      const response = await axios.post("/blogs", postData);
      // console.log("New post added:", response.data);
      // Assuming your backend returns the newly created post in the response
      // You can add code here to update the state with the new post or fetch the posts again to refresh the list
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error posting:", error);
    }
    handleCloseModal();
  };


  const fetchPosts = async () => {
    try {
      const response = await axios.get("/blogs");
      setPosts(response.data); // Assuming your backend returns an array of posts
    } catch (error) {
      console.error("Error fetching featured posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const posts = [post1, post2, post3];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">

        <Header title="Blog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          {user_id && (
  <Button 
    variant="contained" 
    color="primary" 
    onClick={handleOpenModal} 
    style={{ 
      width: '100%', // Set width to 85%
      margin: '0 auto', // Center horizontally
      marginBottom: '20px' // Add space on the bottom
    }}
  >
    Create New Post
  </Button>
)}



          <Grid container spacing={4}>
            {newPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>


          </Grid>

        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
      {/* Modal for adding new posts */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={postData.description}
            onChange={(e) => setPostData({ ...postData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            id="image"
            label="Image URL"
            fullWidth
            value={postData.image}
            onChange={(e) => setPostData({ ...postData, image: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="imageDescription"
            fullWidth
            multiline
            rows={4}
            value={postData.image_label}
            onChange={(e) => setPostData({ ...postData, image_label: e.target.value })}
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleAddPost} variant="contained" color="primary">Add Post</Button>
        </DialogActions>
      </Dialog>


    </ThemeProvider>
  );
}