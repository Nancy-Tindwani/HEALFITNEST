import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { CART_ID, USER_ID } from '../utils/constant';
import CartReview from '../pages/CartReview'
import axios from 'axios';
import Summary from './Summary';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

const products = [
  {
    name: 'Cherry',
    Quantity: '1box-200gm',
    price: 'Rs.200',
  },
  {
    name: 'Almonds',
    Quantity: '1box-100gm',
    price: 'Rs.100',
  },
  {
    name: 'Onion',
    Quantity: '1Kg',
    price: 'Rs.200',
  },

  { name: 'Shipping', desc: '', price: 'Rs.100' },
];

const addresses = ['Akshya Nagar', '1st Block 1st Cross', 'Rammurthy nagar', 'Bangalore-560016'];
const payments = [
  { name: 'Cash on Delivery', Total: 'Rs.600' },
];

const baseUrl = 'http://localhost:8989/api';

export default function Review() {

  const [orderData, setOrderData] = React.useState();

  const [cartInfo, setCartInfo] = React.useState({});
  const CART_ID = JSON.parse(localStorage.getItem('cartId'));
  const USER_ID = JSON.parse(localStorage.getItem('userId'));
  const ADDRESS_ID = JSON.parse(localStorage.getItem('addressId'))
  const [userAddress, setUserAddress] = React.useState({});
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   if (CART_ID) {
  //     console.log("Local storage", CART_ID);
  //   }
  //   // if (USER_ID) {
  //   //   console.log("Local storage userId", USER_ID);
  //   // }
  //   const fetchData = () => {
  //     axios.get(`${baseUrl}/v4/cart/${CART_ID}`).then((res) => {
  //       setCartInfo(res.data);
  //       console.log("Cart data: ", cartInfo);
  //     }).catch(error => {
  //       if (!error.response) {
  //         console.log('Error: Network Error');
  //       } else {
  //         console.log(error.response);
  //       }
  //     })
  //   };
  //   fetchData();
  // }, [cartInfo]);

  React.useEffect(() => {
    const fetchCart = async () => {
      const cartData = await axios.get(`${baseUrl}/v4/cart/${CART_ID}`);
      setCartInfo(cartData.data);
      console.log("Cart data: ", cartInfo);
    }

      const fetchAddress = async () => {
        const address = await axios.get(`${baseUrl}/v3/getAddresses/${USER_ID}`);
        if (!address) {
          console.log('Address not defined');
        }
        else {
          console.log("User address: ", address.data);
          setUserAddress(address.data[address.data.length - 1]);
        }
      };

    fetchAddress();
    fetchCart();
  }, [])



  return (
    <React.Fragment>
      <Typography>
        Order summary
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
          <ListItemText primary="Total Quantity" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, marginRight: '50px' }}>
            {cartInfo.countItem}
          </Typography>
        </ListItem>
      </List>

      {/* <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.Quantity} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Rs.600
          </Typography>
        </ListItem>
      </List> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{ userAddress.addressLine1}</Typography>
          <Typography gutterBottom>{userAddress.addressLine2}</Typography>
          <Typography gutterBottom>{userAddress.city}, {userAddress.state}, {userAddress.country } - { userAddress.postalCode}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, marginLeft: '70px' }}>
            Payment details
          </Typography>
          <Grid container style={{ marginLeft: '70px' }}>
            <Grid item xs={12}>
              <Typography gutterBottom>Rs. {cartInfo.totalPrice}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}