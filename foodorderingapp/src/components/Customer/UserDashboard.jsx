import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import { ExitToApp, ListAlt, Search, ShoppingCart } from '@mui/icons-material';
import './UserDashboard.css'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';



const UserDashboard = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');

      console.log('Session data cleared:', localStorage); 

     
      navigate('/');
    }
  };


  return (


    <div className="userbanner flex items-center justify-end min-h-screen bg-gray-100 pr-10">
      <div className="w-full max-w-lg bg-gray-800 text-white rounded-lg shadow-lg p-10">  
        <Typography variant="h4" component="h2" color="lightblue" gutterBottom> 
          User Dashboard....   
          <EmojiEmotionsIcon />
        </Typography>
      
        <Typography variant="body1" color="white" gutterBottom>
          Welcome, User!
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              component={Link}
              to="/customer/search"
              variant="contained"
              sx={{ bgcolor: 'lightgrey', color: 'black', '&:hover': { bgcolor: '#d3d3d3' }, fontSize: '1.1rem', py: 2 }}
              startIcon={<Search />}
              fullWidth
            >
              Search Food
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              component={Link}
              to={`/customer/cart/${localStorage.getItem('userId')}`}
              variant="contained"
              sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#555' }, fontSize: '1.1rem', py: 2 }}
              startIcon={<ShoppingCart />}
              fullWidth
            >
              View Cart
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              component={Link}
              to="/customer/place-order"
              variant="contained"
              sx={{ bgcolor: 'lightgrey', color: 'black', '&:hover': { bgcolor: '#d3d3d3' }, fontSize: '1.1rem', py: 2 }}
              startIcon={<ListAlt />}
              fullWidth
            >
              Place Order
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              component={Link}
              to={`/customer/orders/${localStorage.getItem('userId')}`}
              variant="contained"
              sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#555' }, fontSize: '1.1rem', py: 2 }}
              startIcon={<ListAlt />}
              fullWidth
            >
              View Orders
            </Button>
          </Grid>
        </Grid>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: '#666' }, mt: 5, fontSize: '1.1rem', py: 2 }}
          startIcon={<ExitToApp />}
          fullWidth
        >
          Logout
        </Button>
      </div>
    </div>

  );
};

export default UserDashboard;