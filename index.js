// pages/index.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pantry App
      </Typography>
      <PantryForm />
      <PantryList />
    </Container>
  );
}
