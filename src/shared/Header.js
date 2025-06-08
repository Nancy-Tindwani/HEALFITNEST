import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Alert, Autocomplete, Drawer, Snackbar, TextField } from '@mui/material';
import SideDrawer from './SideDrawer';
import logo from '../assets/logo.jpeg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../contexts/CartContext';


const baseUrl = 'http://localhost:8989/api';

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [list, setList] = React.useState([]);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    let { cartId, setCartId } = React.useContext(CartContext);
    const CART_ID = JSON.parse(localStorage.getItem('cartId'))
    const USER_ID = JSON.parse(localStorage.getItem('userId'))
    const [open, setOpen] = React.useState(false);


    const navigate = useNavigate();

    const handleRoute = () => {
        navigate('/login')
    }
    const handleUserRoute = () => {
        if (USER_ID === "User and Cart Id does not exist")
            setOpen(true);
        else
            navigate(`/user/${USER_ID}`)
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleLogOut = () => {
        axios.get(`${baseUrl}/v2/logout`).then((response) => {
            console.log("Response", response)
            localStorage.setItem('userId', JSON.stringify(response.data));
            localStorage.setItem('cartId', JSON.stringify(response.data));

            console.log(JSON.parse(localStorage.getItem('userId')));
            console.log(JSON.parse(localStorage.getItem('cartId')));
            alert('Logged out successfully!!');
            navigate('/');
        }).catch(error => {
            if (!error.response) {
                console.log('Error: Network Error');
            } else {
                console.log(error.response);
            }
        })
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
        >
            <MenuItem onClick={handleRoute}>Login</MenuItem>
            <MenuItem onClick={handleUserRoute}>My Profile</MenuItem>
            <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <IconButton
                    aria-label="add to shopping cart"
                    color="inherit"
                >
                    <ShoppingCartRoundedIcon />
                </IconButton>
                <p>Add to Cart</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>User</p>
            </MenuItem>
        </Menu>
    );


    React.useEffect(() => {
        axios.get(`http://localhost:8989/api/v1/items`).then((res) => {
            setList(res.data)
            console.log("Item list", list);
        })
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }} >
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={600} >
                <Alert onClose={handleClose} severity='warning' sx={{ width: '100%' }}>
                    Please log in first!!
                </Alert>
            </Snackbar>

            <AppBar position="static" style={{
                color: '#1E1E1E',
                boxShadow: 'none',
                background: 'transparent'
            }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            setDrawerOpen(!drawerOpen)
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img onClick={() => {
                        navigate('/');
                    }} src={logo} alt='logo' style={{ display: { xs: 'none', sm: 'block' }, width: '160px', height: '60px', objectFit: 'cover', cursor: 'pointer' }} />
                    <Box sx={{ flexGrow: 1 }} />
                    <Autocomplete
                        onChange={(event, value) => navigate(`/item/${value}`)}
                        id="auto-select"
                        size='small'
                        options={list.map(item => item.itemName)}
                        sx={{
                            width: 300, color: '#0000', backgroundColor: '#f4f6f8',
                            '&:hover': {
                                backgroundColor: '#e5e7e7',
                            }
                        }}
                        renderInput={(params) =>
                            <TextField {...params} label="Search items here.." />}
                    />


                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            aria-label="add to shopping cart"
                            color="inherit"
                            onClick={() => {
                                if (CART_ID === "Cart does not exists.") {
                                    alert("Cart is empty")
                                } else {
                                    console.log('LocalStorage CART_ID: ', CART_ID)
                                    navigate(`/cart/${CART_ID}`);
                                }
                            }}
                        >
                            <ShoppingCartRoundedIcon fontSize='larger' />
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle fontSize='larger' />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <SideDrawer setDrawerOpen={setDrawerOpen} />
            </Drawer>
        </Box>
    );
}
