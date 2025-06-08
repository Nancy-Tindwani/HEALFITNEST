import { Grid, Paper, styled, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, IconButton, Snackbar, Alert } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import Header from "../shared/Header.js";
import { useNavigate, useParams } from "react-router-dom";
// import { CART_ID, USER_ID } from '../utils/constant';
import axios from "axios";
import ListItemText from "@mui/material/ListItemText";
import "./Button.css";
import "./Cart.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const commonStyles = {
  m: 1,
  borderColor: "text.primary",
  width: "5rem",
  height: "5rem",
};
const tblHead = {
  backgroundColor: 'rgb(60 168 135)',
  fontSize: '1rem',
  color: 'white'
}

const baseUrl = "http://localhost:8989/api";

export default function Cart() {
  const { cartId } = useParams();
  const [cartData, setCartData] = useState({});
  const navigate = useNavigate();
  const USER_ID = JSON.parse(localStorage.getItem('userId'))
  const CART_ID = JSON.parse(localStorage.getItem('cartId'))

  const [severity, setSeverity] = useState('success');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');


  const handleDecrement = (itemId) => {
    console.log(itemId);
    axios.put(`${baseUrl}/v4/updateCartItemSub/${cartId}/${itemId}`).then((res) => {
      console.log(res);
    })

  };
  const handleIncrement = (itemId) => {
    console.log(itemId);
    axios.put(`${baseUrl}/v4/updateCartItemAdd/${cartId}/${itemId}`).then((res) => {
      console.log(res);
    })
  };

  const deleteItem = (itemId) => {
    console.log(itemId);
    axios.delete(`${baseUrl}/v4/deleteItem/${cartId}/${itemId}`).then((res) => {
      console.log("Delete response", res);
      setSeverity('success');
      setMessage("Item deleted successfully!");
      setOpen(true);
    })
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    // if (CART_ID) {
    //   console.log("Local storage", CART_ID);
    // }
    // if (USER_ID) {
    //   console.log("Local storage userId", USER_ID);
    // }
    const fetchData = async () => {
      const cartInfo = await axios.get(`${baseUrl}/v4/cart/${cartId}`);
      setCartData(cartInfo.data);
      console.log("Cart data: ", cartData);
    };
    fetchData();
  }, [cartData]);

  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={600} >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

      <Header />
      <Grid container columnSpacing={2}>
        <Grid item xs={8}>
          <Typography style={{ fontSize: "30px" }}>
            Your Organic Basket
          </Typography>
        </Grid>

        <Grid container sx={{ overflowX: 'hidden' }}>
          <Grid item xs={12} sm={8.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TableContainer component={Paper} sx={{ margin: '2.5%' }}>
              <Table id='mainTbl' sx={{ minWidth: '100%', maxWidth: '100%' }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ ...tblHead }}>
                    <TableCell sx={{ ...tblHead }} align="center">Item</TableCell>
                    <TableCell sx={{ ...tblHead }} align="center">Quantity</TableCell>
                    <TableCell sx={{ ...tblHead }} align="center">Price each</TableCell>
                    <TableCell sx={{ ...tblHead }} align="center">Total price</TableCell>
                    <TableCell sx={{ ...tblHead }} align="center">Remove item</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartData.cartItems?.map((item, i) => {
                    return (
                      <TableRow
                        key={item.itemName}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid item xs={6}>
                              <img alt={item.itemName} src={item.itemImage} style={{ height: 70, width: 70, maxHeight: { xs: 233, md: 167 }, maxWidth: { xs: 350, md: 250 }, marginTop: '15px', marginLeft: '40px', borderRadius: 4, objectFit: 'cover' }} />
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="h6">
                                {item.itemName}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <form >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <div class="value-button" id="decrease" onClick={() => handleDecrement(item.itemId)} value="Decrease Value"><RemoveIcon /></div>
                              <input type="number" disabled id='number' value={item.itemQuantity} />
                              <div class="value-button" id="increase" onClick={() => handleIncrement(item.itemId)} value="Increase Value">+</div>
                            </div>
                          </form>
                        </TableCell>
                        <TableCell align="center">Rs. {item.itemPrice}</TableCell>
                        <TableCell align="center">Rs. {item.itemPrice * item.itemQuantity}</TableCell>
                        <TableCell align="center">
                          <IconButton color='error' aria-label="delete" onClick={() => deleteItem(item.itemId)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>

                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* **************** Summary ************** */}
          <Grid item xs={12} sm={3.5} className="summary">
            <Paper elevation={3} sx={{ p: 1, m: 2 }}>
              <Grid container align='center'>
                <Grid item xs={12}>
                  <Typography
                    style={{ fontSize: "30px", color: "black" }}>
                    Order Summary
                  </Typography>
                </Grid>

                <Grid container id="box" sx={{
                  ...commonStyles,
                  borderTop: 1,
                  borderBottom: 1,
                  width: "100%",
                  minHeight: '220px',
                }}>
                  <Grid item xs={12}>
                    <List>
                      <ListItem >
                        <ListItemText>Total items:</ListItemText>
                        <ListItemText>{cartData.countItem}</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>Total price:</ListItemText>
                        <ListItemText>{cartData.totalPrice}</ListItemText>
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="success" onClick={() => navigate('cartReview')}>Proceed to buy</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

        </Grid>
      </Grid>
    </div>
  );
}
