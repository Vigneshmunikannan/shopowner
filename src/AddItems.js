import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { Outlet,useLocation } from 'react-router-dom';
import Nav from './Nav';
const AddItems = () => {
    const location=useLocation()
    const [itemCategory, setItemCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemCost, setItemCost] = useState('');
    const [itemImage, setItemImage] = useState(null); // Use null to store the image file
    const [categoryImage, setCategoryImage] = useState(null); // Use null to store the image file
    const [updated, setupdated] = useState({
        color: 'red',
        show: false,
        text: ""
    })
    const st = {
        color: updated.color,
        display: updated.show
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("im here")
        const formData = new FormData();
    formData.append('itemCategory', itemCategory);
    formData.append('itemName', itemName);
    formData.append('itemCost', itemCost);
    formData.append('itemImage', itemImage);
    formData.append('categoryImage', categoryImage);
    

        try {
            const response = await axios.post('https://igneous-gamma-398113.el.r.appspot.com/additems', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.statusText === 'OK') {
                console.log("inside ok")


                setTimeout(() => {
                    setupdated(pre => {
                        return {
                            ...pre,
                            color: 'green',
                            show: true,
                            text: "Item added Successfully"
                        }
                    })
                    setTimeout(() => {
                        setItemCategory('')
                        setItemName('')
                        setItemCost('')
                        setItemImage(null)
                        setCategoryImage(null)
                        setupdated(pre => {
                            return {
                                ...pre,
                                color: '',
                                show: false,
                                text: ""
                            }
                        })
                    },2000)
                    
                }, 1000)



                console.log('im done')
            }
        }
        catch (err) {
            console.log("error " + err)
        }
    };

    return (
        <div>
            <Nav/>

            {
                location.pathname==='/' ? <Grid container justifyContent="center" style={{ marginTop: "30px" }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Add New Item
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Item Category"
                                fullWidth
                                value={itemCategory}
                                onChange={(e) => setItemCategory(e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Item Name"
                                fullWidth
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Item Cost"
                                fullWidth
                                value={itemCost}
                                onChange={(e) => setItemCost(e.target.value)}
                                margin="normal"
                                required
                            />
                            <label htmlFor="itemImage">Item Image</label>
                            <input
                                type="file"
                                accept="image/jpeg, image/png"
                                onChange={(e) => setItemImage(e.target.files[0])}
                                required
                            />
                            <label htmlFor="categoryImage">Category Image</label>
                            <input
                                type="file"
                                accept="image/jpeg, image/png"
                                onChange={(e) => setCategoryImage(e.target.files[0])}
                                required
                            />
                            <Button style={{ marginTop: "20px" }} type="submit" variant="contained" color="primary">
                                Add Item
                            </Button><br></br>
                            <span style={st}>{updated.text}</span>
    
                        </form>
                    </Paper>
                </Grid>
                <Outlet/>
            </Grid>: <Outlet/>
            }
            
            
        </div>
    );
};

export default AddItems;
