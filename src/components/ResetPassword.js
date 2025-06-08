import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Typography} from '@mui/material';
import {Button} from '@mui/material';
import logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const ResetPassword=()=>{
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
            <Typography style={{marginTop:'20px',fontSize:'30px',color:'gray'}}>
                Create New Password
            </Typography>
            </Grid>
            <TextField style={{marginTop:'20px'}} type='password'
             required
             id="outlined-required"
             label="New password"
             fullWidth
            />
            <TextField style={{marginTop:'20px'}} type='password'
             required
             id="outlined-required"
             label="Confirm password"
             fullWidth
            />
            <Button variant="contained" onClick={() => navigate('/login')} fullWidth style={{marginTop:'20px',backgroundColor:'rgb(47,124,47)'}}>
             Confirm
          </Button>    
            </Paper>
        </Grid>
    )
}
export default ResetPassword;