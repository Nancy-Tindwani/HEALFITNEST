import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PayementForm';
import Review from '../components/Review';
import Header from '../shared/Header';
import validate from '../utils/checkOutValid';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';



const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
      Checkout(step);
  }
}

const theme = createTheme();
const baseUrl = "http://localhost:8989/api";

export default function Checkout() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const CART_ID = JSON.parse(localStorage.getItem('cartId'))
  let ORDER_ID;
  const [severity, setSeverity] = React.useState('success');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');


  const handleNext = () => {
    if (activeStep == 2) {
      axios.post(`${baseUrl}/v6/addToOrder/${CART_ID}`).then((res) => {
        console.log(CART_ID);
        console.log(res);
        localStorage.setItem('orderId', JSON.stringify(res.data.orderId));
        ORDER_ID = res.data.orderId;

        if (res.data) {
          setMessage('Order placed successfully!');
          setSeverity('success');
          setOpen(true);
          axios.put(`${baseUrl}/v6/orderStatusChange/${ORDER_ID}`).then((res) => {
            console.log(res);
          })
        }
      }).catch(error => {
        if (!error.response) {
          console.log('Error: Network Error');
        } else {
          setSeverity('error');
          setMessage(`${error.response}`);
          setOpen(true);
          console.log(error.response);
        }
      })
    }
    if (activeStep == 0) {
      if (validate()) {
        setActiveStep(activeStep + 1);
      }
    }
    else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={600} >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Your order is placed...
                </Typography>
                <Typography variant="subtitle1">
                  Thank you for shopping with us!! You will soon receive confirmation for your order.
                </Typography>
                <Button variant="contained" onClick={() => navigate('/')} style={{ maxWidth: '150px', maxHeight: '30px', minWidth: '150px', minHeight: '30px', marginTop: '10px', marginRight: '0px', backgroundColor: 'rgb(62 114 62)' }}>
                  Buy More
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}