import { Grid } from '@mui/material';
import React from 'react';

const TabContainer = () => {
    return (
        <div>
            <Grid container >
                <Grid item xs={12}>
                    <h1>My details</h1>
                </Grid>

                <Grid container className='meta'>
                    <Grid item className='title' xs={12}>
                        <h3>Personal Information</h3>
                    </Grid>
                    <hr></hr>
                </Grid>
            </Grid>
        </div>
    );
};

export default TabContainer;