import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Typography} from '@mui/material';
import {Button} from '@mui/material';
import logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import reset from '../components/ResetPassword';

const ForgotPassword=()=>{
    const navigate=useNavigate();
    const paperStyle={padding:20,height :'55vh',width :330,margin:'90px auto'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
            <Avatar
            alt="Remy Sharp"
            src={`${logo}?w=160&h=150&fit=crop&auto=format`}
             sx={{ width: 130, height: 130 }}
            />
            <Typography style={{marginTop:'20px',fontSize:'30px',color:'grey'}}>
                Reset password
            </Typography>
            </Grid>
            <TextField style={{marginTop:'20px'}}
             required
             id="outlined-required"
             label="Email id"
             fullWidth
            />
            <Button variant="contained" fullWidth style={{marginTop:'10px',backgroundColor:'rgb(47,124,47)'}}>Send otp</Button>
            <Grid container spacing={2} align='center'>
            <TextField style={{marginTop:'40px',marginLeft:'19px'}}
             required
             id="outlined-required"
             label="Enter otp"
            />
            <Button variant="contained" onClick={() => navigate('/reset')} style={{maxWidth:'150px',maxHeight:'50px',minWidth:'90px',minHeight:'39px',marginTop:'40px',marginLeft:'10px',backgroundColor:'rgb(47,124,47)'}}>
             Verify
          </Button>
            </Grid>   
            </Paper>
        </Grid>
    )
}
export default ForgotPassword;