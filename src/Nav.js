import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Nav = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Nammakadai
                </Typography>
                <Button component={Link} to="/" color="inherit">Add Items</Button>
                <Button component={Link} to="/delete" color="inherit">Delete Items</Button>
                <Button component={Link} to="/edit" color="inherit">Edit Items</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Nav;
