import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Button, Box, Paper } from '@mui/material';
export default function ItemDetail() {
    const { category } = useParams()
    const [itemData, setItemData] = useState([]);

    console.log(category)
    useEffect(() => {

        axios.get(`https://igneous-gamma-398113.el.r.appspot.com/item/${category}`)
            .then(response => {
                setItemData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [category]);

    const handleDelete = (event) => {

        const itemName=event.target.getAttribute("data-category")
        console.log("name "+itemName)
        axios.delete(`https://igneous-gamma-398113.el.r.appspot.com/item/${itemName}`)
            .then(response => {
                console.log(response);
                if(response.status === 200){
                    window.location.reload()
                }

                // Handle success, such as showing a confirmation message or updating the UI
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error, such as showing an error message
            });
    };

    return (
        <Box justifyContent="center" alignItems="center" minHeight="100vh">
            {
                itemData.map(data => (
                    <Paper elevation={3} style={{ padding: '20px', minWidth: '200px', width: '200px%', marginRight: "20px" }} >
                        <img src={`data:image/jpeg;base64,${data.itemImage}`} alt={data.itemName} style={{ width: '200px',height:'200px',borderRadius:"10px"}} />
                        <Typography variant="h5" gutterBottom>
                            {data.itemName}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Price: {data.itemCost}
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={handleDelete} data-category={data.itemName}>
                            Delete 
                        </Button>
                    </Paper>
                ))
            }
        </Box>
    );

}
