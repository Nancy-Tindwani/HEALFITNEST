import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Button, Grid, TextField } from "@mui/material";
import TabContainer from "./TabContainer";
import axios from "axios";

const baseUrl = 'http://localhost:8989/api'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const USER_ID = JSON.parse(localStorage.getItem('userId'));
  const [userInfo, setUserInfo] = React.useState({});
  const [userAddress, setUserAddress] = React.useState({});
  var errorText = React.useState('Oops! Seems like no address added to your account!');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      const userData = await axios.get(`${baseUrl}/v2/myProfile/${USER_ID}`);
      setUserInfo(userData.data);
      console.log("User data: ", userInfo);
    };

    const fetchAddress = async () => {
      const address = await axios.get(`${baseUrl}/v3/getAddresses/${USER_ID}`);
      if (address == undefined) {
        alert(`${errorText}`);
      }
      else {
        console.log("User address: ", address.data[address.data.length - 1]);
        setUserAddress(address.data[address.data.length - 1]);
      }
    };

    const fetchOrders = async () => {
      const orders = await axios.get(`${baseUrl}/v6/orderUser/${USER_ID}`);
      console.log("Orders: ", orders);
      // setUserAddress(address.data[address.data.length-1]);
    };
    fetchUser();
    fetchAddress();
    fetchOrders();
  }, []);

  return (
    <Grid container sx={{ bgcolor: "background.paper", display: "flex" }}>
      <Grid item sm={3}>
        <Tabs
          sm={3}
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab
            label="My details"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "#f4f6f8",
              borderBottom: 2,
              borderColor: "divider",
            }}
            icon={<AccountCircleOutlinedIcon />}
            {...a11yProps(0)}
          />
          <Tab
            label="My address book"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "#f4f6f8",
              borderBottom: 2,
              borderColor: "divider",
            }}
            icon={<LocationOnOutlinedIcon />}
            {...a11yProps(1)}
          />
          {/* <Tab
            label="My orders"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "#f4f6f8",
              borderBottom: 2,
              borderColor: "divider",
            }}
            icon={<LocalMallOutlinedIcon />}
            {...a11yProps(2)}
          /> */}
        </Tabs>
      </Grid>
      <Grid item sm={9} sx={{ backgroundColor: "#f4f6f8" }}>
        <TabPanel sm={9} value={value} index={0}>
          <Grid
            container
            sx={{
              margin: "1rem",
              padding: "1rem",
              borderRadius: "1rem",
              backgroundColor: "#fff",
            }}
          >
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <h1>My details</h1>
            </Grid>
            <Grid container sx={{ textAlign: "left" }}>
              <Grid item xs={12}>
                <h2>Personal Information</h2>
                <hr />
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="body2">First Name</Typography>
                  <TextField
                    fullWidth
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    value={userInfo.firstName}
                    placeholder="First name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2">Last Name</Typography>

                  <TextField
                    fullWidth
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    value={userInfo.lastName}
                    placeholder="Last name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Phone number</Typography>

                  <TextField
                    type="tel"
                    id="outlined-basic"
                    variant="outlined"
                    value={userInfo.contact}
                    placeholder="9999999999"
                    helperText="Keep a 10-digit format with no spaces and dashes."
                  ></TextField>
                </Grid>
                <Grid item>
                  <Button sx={{ px: 4, py: 1 }} variant="contained">
                    Save
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <h2>E-mail address</h2>
                <hr />
              </Grid>
              <Grid container>
                <Grid item xs={5}>
                  <Typography variant="body2">E-mail</Typography>

                  <TextField
                    fullWidth
                    disabled
                    type="email"
                    id="outlined-basic"
                    variant="outlined"
                    value={userInfo.email}
                    placeholder="john@example.com"
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel sm={9} value={value} index={1}>
          {!userAddress ? <Grid>{errorText}</Grid> : <Grid
            container
            sx={{
              margin: "1rem",
              padding: "1rem",
              borderRadius: "1rem",
              backgroundColor: "#fff",
            }}
          >
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <h1>My address book</h1>
            </Grid>
            <Grid container sx={{ textAlign: "left" }}>
              <Grid item xs={12}>
                <h2>Address details</h2>
                <hr />
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="body2">Address Line 1</Typography>
                  <TextField
                    fullWidth
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Address line-1"
                    value={userAddress.addressLine1}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Address Line 2</Typography>

                  <TextField
                    fullWidth
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Address line-2"
                    value={userAddress.addressLine2}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">City</Typography>

                  <TextField
                    fullWidth
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="City name"
                    value={userAddress.city}
                  ></TextField>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">State</Typography>

                  <TextField
                    fullWidth
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="State name"
                    value={userAddress.state}
                  ></TextField>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">Country</Typography>

                  <TextField
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Country name"
                    value={userAddress.country}
                  ></TextField>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">Postal Code</Typography>

                  <TextField
                    fullWidth
                    type="number"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="333333"
                    value={userAddress.postalCode}
                  ></TextField>
                </Grid>

                <Grid item xs={12}>
                  <Button sx={{ px: 4, py: 1 }} variant="contained">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          }

        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          <Grid
            container
            sx={{
              margin: "1rem",
              padding: "1rem",
              borderRadius: "1rem",
              backgroundColor: "#fff",
            }}
          >
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <h1>My orders</h1>
            </Grid>
            <Grid container sx={{ textAlign: "left" }}>
              <Grid item xs={12}>
                <h2>Past orders</h2>
                <hr />
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  order details here..
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel> */}
      </Grid>
    </Grid>
  );
}
