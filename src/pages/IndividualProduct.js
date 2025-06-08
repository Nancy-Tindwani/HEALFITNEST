import React, { useEffect, useState } from 'react'
import { Grid, Button, Chip, Snackbar, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import { useParams } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from 'axios';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';


const baseUrl = 'http://localhost:8989/api';

const IndividualProduct = () => {

    const [product, setProduct] = useState({});
    const [count, setCount] = useState(1);
    const [itemAvailable, setItemAvailable] = useState('')
    const { itemName } = useParams();
    const USER_ID = JSON.parse(localStorage.getItem('userId'))
    const CART_ID = JSON.parse(localStorage.getItem('cartId'))
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState('success');


    const handleIncrement = () => {
        setCount(count + 1);
        console.log(count);
    }
    const handleDecrement = () => {
        if (count <= 1) {
            setCount(1)
        } else {
            setCount(count - 1);
        }
        console.log(count);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };



    useEffect(() => {
        axios.get(`${baseUrl}/v1/item/${itemName}`).then((res) => {
            setProduct(res.data)
            if (product.itemAvailable === true) {
                setItemAvailable('Available')
            } else {
                setItemAvailable('Sold Out')
            }
        }).catch(error => {
            if (!error.response) {
                console.log('Error: Network Error');
            } else {
                console.log(error.response);
            }
        })
    }, [product])

    const addToCart = () => {
        console.log("Local Storage User id: ", USER_ID);
        if (CART_ID === "Cart does not exists.") {
            axios.post(`${baseUrl}/v4/addToCart/${USER_ID}/${product.itemId}/${count}`).then((res) => {
                console.log(res);
                localStorage.setItem('cartId', JSON.stringify(res.data))
                setMessage('Item added to the cart');
                setSeverity('success');
                setOpen(true);
            }).catch(error => {
                if (!error.response) {
                    console.log('Error: Network Error');
                } else {
                    setMessage(`${error.response}`);
                    setSeverity('warning');
                    setOpen(true);
                    console.log(error.response);
                }
            })
        }
        else if (CART_ID === "User and Cart Id does not exist") {
            setMessage("Seems like you aren't logged in yet!");
            setSeverity('warning');
            setOpen(true);
        }
        else {
            console.log("Local storage cartID: ", CART_ID);
            axios.put(`${baseUrl}/v4/updateCart/${CART_ID}/${product.itemId}/${count}`).then((res) => {
                console.log('Update cart response: ', res);
                console.log("CartId:", CART_ID);
                setMessage('Item added to the cart');
                setSeverity('success');
                setOpen(true);
            }).catch(error => {
                if (!error.response) {
                    console.log('Error: Network Error');
                } else {
                    setMessage(`${error.response}`);
                    setSeverity('warning');
                    setOpen(true);
                    console.log(error.response);
                }
            })
        }
    }

    return (
        <>
            <Header />
            <Grid container sx={{ flexGrow: 1, m:0, p:0 }}>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={600} >
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                <Grid item xs={4.8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ width: '100%', objectFit: 'contain' }}
                        src={product.itemImage} alt={product.itemName}
                    />
                </Grid>
                <Grid item xs={6.8} className='product-meta' sx={{ padding: '3%', m: 1 }}>
                    <Grid container >
                        <Grid item xs={12} className='product-meta-header' sx={{ textAlign: 'left' }}>
                            <Chip label={itemAvailable} />
                            <Typography variant='h2'>
                                {product.itemName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container sx={{ textAlign: 'left', py: 2, m: 1 }}>
                                <Grid item xs={6}>
                                    <Typography variant='h6'>Price</Typography>
                                    <Typography variant='h3'>
                                        <span><CurrencyRupeeIcon fontSize='large' /></span>
                                        {product.itemPrice}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='h6'>Quantity</Typography>
                                    <div style={{ display: 'flex', color: 'white' }}>
                                        <div className="value-button" style={{
                                            backgroundColor: '#228B22',
                                            borderTopLeftRadius: '12px',
                                            borderBottomLeftRadius: '12px'
                                        }} id="decrease"
                                            onClick={handleDecrement} value="Decrease Value"><RemoveIcon /></div>
                                        <input type="number" id='number' value={count} readOnly />
                                        <div className="value-button" style={{
                                            backgroundColor: '#228B22',
                                            borderTopRightRadius: '12px',
                                            borderBottomRightRadius: '12px'
                                        }} id="increase"
                                            onClick={handleIncrement} value="Increase Value"><AddIcon /></div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ py: 2, m: 1 }}>
                            <Typography variant='h6'>Description</Typography>
                            <Typography variant='body1'>{product.itemDescription}</Typography>
                        </Grid>
                        <Button variant="contained" size='medium' color='success' endIcon={<AddShoppingCartRoundedIcon />} onClick={addToCart} fullWidth sx={{ borderRadius: '1rem' }}>
                            Add to cart
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </>

    )

}

export default IndividualProduct;