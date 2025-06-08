import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect } from 'react';

// const baseUrl = 'http://localhost:8989/api/v1';
// const productData = {
//  post: []
// }

export default function ProductCard(props) {
  const navigate = useNavigate();
  console.log("Props", props);

  return (
    <Card elevation={6} sx={{ minWidth: 240, maxWidth: 240, borderRadius: '10px', margin: 2 }}>
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography varaint='h5' gutterBottom sx={{ fontWeight: '600' }}>
          {props.item.itemName}      {props.item.quantity}
        </Typography>
      </CardContent>
      <CardMedia
        onClick={() => navigate(`/item/${props.item.itemName}`)}
        component="img"
        alt={props.item.name}
        height="200"
        image={props.item.itemImage}
        sx={{ cursor: 'pointer' }}
      />

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', background: '#f5f5f5' }}>
        <Typography variant="body2" sx={{ fontWeight: '600' }} color="text.secondary">
          Rs. {props.item.itemPrice}
        </Typography>

        <Button size="small"><AddShoppingCartIcon sx={{ color: '#267919' }} /></Button>
      </CardActions>
    </Card>
  );
}
