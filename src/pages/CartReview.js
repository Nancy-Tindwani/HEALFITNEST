import * as React from 'react';
import { Typography, Paper, Button, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Header from '../shared/Header';
import axios from 'axios';
import Summary from '../components/Summary';

// const products = [
//   {
//     name: 'Cherry',
//     Quantity: '1box-200gm',
//     price: 'Rs.200',
//   },


//   { name: 'Shipping', desc: '', price: 'Rs.100' },
// ];

// const addresses = ['Akshya Nagar', '1st Block 1st Cross', 'Rammurthy nagar', 'Bangalore-560016'];
// const payments = [
//   { name: 'Cash on Delivery', Total: 'Rs.600' },
// ];

// const USER_ID = JSON.parse(localStorage.getItem('userId'))


const baseUrl = "http://localhost:8989/api";
const data = {
  cartData: []
}

export default function Reviewsecond() {

  const [cartInfo, setCartInfo] = React.useState({});
  const CART_ID = JSON.parse(localStorage.getItem('cartId'))
  const navigate = useNavigate();

  React.useEffect(() => {
    if (CART_ID) {
      console.log("Local storage", CART_ID);
    }
    // if (USER_ID) {
    //   console.log("Local storage userId", USER_ID);
    // }
    const fetchData = () => {
      axios.get(`${baseUrl}/v4/cart/${CART_ID}`).then((res) => {
        setCartInfo(res.data);
        console.log("Cart data: ", cartInfo);
      }).catch(error => {
        if (!error.response) {
          console.log('Error: Network Error');
        } else {
          console.log(error.response);
        }
      })
    };
    fetchData();
  }, [cartInfo]);

  return (
    <>
      <Header />
      <Grid container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
        <Paper elevation={10} style={{ width: '45%', padding: '1rem' }}>
          
          <Typography variant="h6" gutterBottom style={{ marginLeft: '10px', fontSize: '30px' }}>
            Cart summary
          </Typography>

          <List disablePadding>
            {cartInfo.cartItems?.map((product) => (
              <ListItem key={product.itemName} sx={{ py: 1, px: 0, marginLeft: '15px' }}>
                <ListItemText primary={product.itemName} />
                <Typography variant="body2" style={{ marginRight: '50px' }}>Rs. {product.itemPrice} | {product.itemQuantity} units</Typography>
              </ListItem>
            ))}

            <Divider />

            <ListItem sx={{ py: 1, px: 0, marginLeft: '15px' }}>
              <ListItemText primary="Total Price" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, marginRight: '50px' }}>
                {cartInfo.totalPrice}
              </Typography>
            </ListItem>

            <ListItem sx={{ py: 1, px: 0, marginLeft: '15px' }}>
              <ListItemText primary="Total Quantity" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, marginRight: '50px' }}>
                {cartInfo.countItem}
              </Typography>
            </ListItem>
          </List>

          <Grid item xs={12}>
            <Button variant="contained" onClick={() => navigate(-1)} style={{ maxWidth: '170px', maxHeight: '30px', minWidth: '170px', minHeight: '30px', marginTop: '10px', marginLeft: '10px', backgroundColor: 'rgb(62 114 62)', marginBottom: '10px' }}>
              Back to cart
            </Button>
            <Button variant="contained" onClick={() => navigate('checkout')} style={{ maxWidth: '170px', maxHeight: '30px', minWidth: '170px', minHeight: '30px', marginTop: '10px', marginLeft: '10px', backgroundColor: 'rgb(62 114 62)', marginBottom: '10px' }}>
              Proceed to buy
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </>


  );
}