// components/PantryForm.js
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

function PantryForm() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addItem = async () => {
    if (itemName && quantity) {
      await addDoc(collection(db, "pantry"), { itemName, quantity });
      setItemName('');
      setQuantity('');
    } else {
      alert("Please enter both item name and quantity");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField 
          label="Item Name" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
          fullWidth 
        />
      </Grid>
      <Grid item xs={3}>
        <TextField 
          label="Quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          fullWidth 
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color="primary" onClick={addItem}>
          Add Item
        </Button>
      </Grid>
    </Grid>
  );
}

export default PantryForm;
