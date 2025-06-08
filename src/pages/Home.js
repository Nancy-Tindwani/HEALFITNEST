import MovingCarousel from "../components/MovingCarousel";
import Header from "../shared/Header";
import { Grid, Typography } from "@mui/material";
import potato from '../assets/potato.jpg';
import walnuts from '../assets/walnuts.jpg';
import bread from '../assets/Brown-Bread.png';
import atta from '../assets/WholeWheatAtta.png';
import seeds from '../assets/pumkinSeeds.jpg';
import Footer from "../shared/Footer";
import Categories from "../components/Categories";
import ProductsBanner from "../components/ProductsBanner";
import BestSellerCard from "../components/BestSellerCard";
import bgImage from '../assets/BestSeller1.png';
import bgImage2 from '../assets/BestSeller2.jpg';
import quoteImage from '../assets/HealFitNest2.jpg';
import './Home.css';


export default function Home() {

    const products = [
        { name: 'Potato', image: `${potato}`, cost: 'Rs. 30.0', quantity: '1 kg' },
        { name: 'Kashmiri Walnuts', image: `${walnuts}`, cost: 'Rs. 200.0', quantity: '1 packet' },
        { name: 'Brown Bread', image: `${bread}`, cost: 'Rs. 20.0', quantity: '1 packet' },
        { name: 'Whole Wheat Atta', image: `${atta}`, cost: 'Rs. 70.0', quantity: '1 kg' },
        { name: 'Pumkin Seeds', image: `${seeds}`, cost: 'Rs. 80.0', quantity: '1 packet' },
    ]

    const bestSeller = [
        { image: { bgImage }, title: '-30% off', desc: 'Full Fresh Vegetable' },
        { image: { bgImage2 }, title: '-35% off', desc: '100% Organic Food' }
    ]



    return (
        <div className='home-container'>
            <Header />
            <MovingCarousel />
            <Categories />
            <ProductsBanner type={'Featured Products'} />
            <Grid container className="container">
                <Grid container className="banner-container">
                    <Grid item>
                        <BestSellerCard image={bgImage} id="0" text={'Full Fresh Vegetable'} />
                    </Grid>
                    <Grid item>
                        <BestSellerCard image={bgImage2} id="1" text={'Range of personal care products'} />
                    </Grid>
                </Grid>
            </Grid>


            <Grid container sx={{ m: 0, p: 0, backgroundColor: '#f8f8f8 ' }}>
                <Grid item xs={12} className='image-container'>
                    <img src='https://www.kindpng.com/picc/m/160-1609004_organic-food-vegetable-fruit-meat-organic-vegetables-png.png' className='quoteImage' alt='quote' />
                    <Typography className="text" sx={{
                        fontSize: '3rem', fontWeight: 600
                    }}>"Let food be thy medicine, thy medicine shall be thy food."</Typography>
                    <Typography variant="h5" className="text-author"><i>- Hippocartes</i></Typography>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}