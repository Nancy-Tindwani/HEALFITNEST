import { Grid, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
    return (
        <footer>
            <Grid container sx={{
                backgroundColor: '#5c963a',
                color: '#d3d3d3',
                padding: '0.8rem',
            }}>
                <Grid item xs={12}>
                    <a href='mailto:upcurveteamh@gmail.com'><EmailIcon sx={{ p: 1, m: 2, borderRadius: '50%', border: '1px solid', backgroundColor: '#282828', color: '#5c963a' }} /></a>
                    <a href="https://www.instagram.com/target/"><InstagramIcon sx={{ p: 1, m: 2, borderRadius: '50%', border: '1px solid', backgroundColor: '#282828', color: '#5c963a' }} /></a>
                    <a href="https://twitter.com/target"><TwitterIcon sx={{ p: 1, m: 2, borderRadius: '50%', border: '1px solid', backgroundColor: '#282828', color: '#5c963a' }} /></a>
                    <a href="https://www.facebook.com/target/" ><FacebookRoundedIcon sx={{ p: 1, m: 2, borderRadius: '50%', border: '1px solid', backgroundColor: '#282828', color: '#5c963a' }} /></a>
                </Grid>
            </Grid>
            <div style={{ backgroundColor: '#282828', color: '#5c963a ', padding: '1rem' }}>
                <Typography variant="body2">
                    © 2022 HealFitNest. All rights reserved
                </Typography>
            </div>
        </footer>
    )
}