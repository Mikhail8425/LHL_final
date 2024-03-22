import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import axios from "axios";
import Cookies from "universal-cookie";



const cookies = new Cookies();

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function FeaturedPost(props) {
  const { post } = props;
  const user_id = cookies.get("user_id");
  const user_name = cookies.get("user_name");
  const [openModal, setOpenModal] = useState(false);

  const [currentPostData, setCurrentPostData] = useState({
    title: '',
    date: "", // Set initial state with today's date
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

  const handleDeletePost = async (postId) => {
    try {
      // Set the current post data before attempting to delete it
      setCurrentPostData({
        title: post.title,
        date: post.date,
        description: post.description,
        likes: post.likes,
        image: post.image,
        image_label: post.imageLabel,
        user_id: user_id,
        username: user_name
      });
  
      // Now, you can proceed to delete the post using the post ID
      const response = await axios.delete("/blogs", { data: { id: postId, user_id: user_id } });
  
      // Assuming your backend returns a response with the deleted post data
      // Update the state with the deleted post data
      setCurrentPostData(response.data);
      
      // Optionally, you can also update other state variables or perform any other actions here
       // Reload the page
       window.location.reload()
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdatePost = async (postId) => {
    try {
      // Prepare the updated post data
      const updatedPostData = {
        id: postId,
        date: getCurrentDate(),
        user_id: user_id,
        title: currentPostData.title,
        description: currentPostData.description,
        image: currentPostData.image,
        image_label: currentPostData.image_label,
      };
  
      // Send the updated post data to the backend
      const response = await axios.put(`/blogs`, updatedPostData);
  console.log(response)
      // Update the state with the updated post data (if needed)
      // setCurrentPostData(response.data);
  
      // Optionally, you can also update other state variables or perform any other actions here
      handleCloseModal();
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  
  
  

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.username}
            </Typography>
            
            {user_name === post.username && (
              <Button onClick={() => handleDeletePost(post.id)} variant="contained" color="primary" sx={{ mr: 1 }}>
                Delete Post
              </Button>
            )}
            {user_name === post.username && (
              <Button onClick={handleOpenModal} variant="contained" color="primary">
              Update Post
            </Button>
            )}
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
      {/* Modal for adding new posts */}
    <Dialog open={openModal} onClose={handleCloseModal}>
    <DialogTitle>Update Post</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Title"
        fullWidth
        value={currentPostData.title}
        onChange={(e) => setCurrentPostData({ ...currentPostData, title: e.target.value })}
      />
      <TextField
        margin="dense"
        id="description"
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={currentPostData.description}
        onChange={(e) => setCurrentPostData({ ...currentPostData, description: e.target.value })}
      />
      <TextField
        margin="dense"
        id="image"
        label="Image URL"
        fullWidth
        value={currentPostData.image}
        onChange={(e) => setCurrentPostData({ ...currentPostData, image: e.target.value })}
      />
      <TextField
        margin="dense"
        id="description"
        label="imageDescription"
        fullWidth
        multiline
        rows={4}
        value={currentPostData.image_label}
        onChange={(e) => setCurrentPostData({ ...currentPostData, image_label: e.target.value })}
      />
      {/* Add more fields as needed */}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseModal}>Cancel</Button>
      <Button onClick={() => handleUpdatePost(post.id)} variant="contained" color="primary">Update Post</Button>

    </DialogActions>
  </Dialog>
    </Grid>

    
  );
  
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;