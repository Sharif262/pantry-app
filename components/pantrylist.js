// components/PantryList.js
import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function PantryList() {
  const [pantryItems, setPantryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, "pantry"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setPantryItems(items);
    });
    return () => unsubscribe();
  }, []);

  const filteredItems = pantryItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "pantry", id));
  };

  return (
    <div>
      <TextField 
        label="Search Items" 
        fullWidth 
        onChange={(e) => setSearchTerm(e.target.value)} 
        value={searchTerm} 
      />
      <List>
        {filteredItems.map(item => (
          <ListItem key={item.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={`${item.itemName} - ${item.quantity}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default PantryList;
