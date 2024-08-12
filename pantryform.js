// components/PantryForm.js
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

function PantryForm() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addItem = async () => {
    await addDoc(collection(db, "pantry"), { itemName, quantity });
    setItemName('');
    setQuantity('');
  };

  const updateItem = async (id) => {
    const itemRef = doc(db, "pantry", id);
    await updateDoc(itemRef, { itemName, quantity });
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "pantry", id));
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
        <Button variant="contained" onClick={addItem}>Add Item</Button>
      </Grid>
    </Grid>
  );
}

export default PantryForm;
