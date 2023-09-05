import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Button, Box, Paper, TextField } from '@mui/material';

export default function ItemDetail() {
    const  category  = useParams().item;
    console.log(category)
    const [itemData, setItemData] = useState([]);
    const [updated, setupdated] = useState({
        color: 'red',
        show: false,
        text: ""
    })
    const st = {
        color: updated.color,
        display: updated.show
    }

    useEffect(() => {
        axios.get(`https://igneous-gamma-398113.el.r.appspot.com/item/${category}`)
            .then(response => {
                setItemData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [category]);

    const handlePriceChange = (event, itemName) => {
        const updatedItemData = itemData.map(data => {
            if (data.itemName === itemName) {
                data.itemCost = event.target.value;
            }
            return data;
        });
        setItemData(updatedItemData);
    };

    const handleUpdatePrice = (itemName) => {
        const selectedItem = itemData.find(data => data.itemName === itemName);
  console.log(itemName)
        axios.put(`https://igneous-gamma-398113.el.r.appspot.com/item/${itemName}`, {
            itemCost: selectedItem.itemCost, // You can also use newPrice if needed
        })
            .then(response => {
                if(response.status===200){
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
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            {
                itemData.map(data => (
                    <Paper elevation={3} style={{ padding: '15px 10px 15px 29px ', minWidth: '200px', width: '200px%', marginRight: "20px",borderRadius:"10px"}} key={data.itemName}>
                        <img src={`data:image/jpeg;base64,${data.itemImage}`} alt={data.itemName} style={{ width: '200px',height:'200px',borderRadius:"20px" }} />
                        <Typography variant="h5" gutterBottom>
                            {data.itemName}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Price: {data.itemCost}
                        </Typography>
                        <TextField
                            label="New Price"
                            type="number"
                            // value={data.itemCost} // You can use newPrice here if needed
                             onChange={(e) => handlePriceChange(e, data.itemName)}
                        /><br></br>
                        <span style={st}>{updated.text}</span>
                        <Button
                          style={{marginTop:"7px"}}
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdatePrice(data.itemName)}
                        >
                            Update Price
                        </Button>
                    </Paper>
                ))
            }
        </Box>
    );
}
