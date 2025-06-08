import * as React from 'react';
import Typography from '@mui/material/Typography';
import {FormControlLabel,Radio} from '@mui/material';


export default function PaymentForm() {
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <FormControlLabel value='Cash on delivery' control={<Radio checked={true}/>} label="Cash on Delivery" />
    </React.Fragment>
  );
}