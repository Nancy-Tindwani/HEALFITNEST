import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import onion from '../assets/onion.jpeg';
import jaggery from '../assets/jaggeryPowder.jpg';
import mint from '../assets/mint.jpg';
import ghee from '../assets/desiGhee.jpg';
import milk from '../assets/milk.jpg';
import axios from 'axios';
import './ProductsBanner.css';
import React, { useEffect } from "react";

// const bestSellers = [
//     { name: 'Onion', image: `${onion}`, cost: 'Rs. 40.0', quantity: '1 kg' },
//     { name: 'Jaggery Powder', image: `${jaggery}`, cost: 'Rs. 400.0', quantity: '1 kg' },
//     { name: 'Mint Leaves', image: `${mint}`, cost: 'Rs. 70.0', quantity: '1 bunch' },
//     { name: 'Desi Ghee', image: `${ghee}`, cost: 'Rs. 300.0', quantity: '1 kg' },
//     { name: "Cow's Milk", image: `${milk}`, cost: 'Rs. 60.0', quantity: '1 kg' },
// ]

const baseUrl = 'http://localhost:8989/api/v1';
const productData = {
 products: []
}

export default function ProductsBanner(props) {
  const [state, setState] = React.useState(productData)
  

    useEffect(() => {
      axios.get(`${baseUrl}/items`).then((response) => {
        console.log(response);
        setState({
          products: response.data.slice(15, 20)
        })
        console.log(state.products[0].itemName);
      }).catch(error => {
        if (!error.response) {
          // network error
          console.log('Error: Network Error');
        } else {
          console.log(error.response);
        }
      })
    }, []);

    return (
        <Grid container className="container" sx={{backgroundColor: '#fff'}}>
            <Grid item xs={12}>
                <div className="title" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="line"></div>
                    <h1 variant="h4">{props.type }</h1>
                    <div className="line"></div>
                </div>
            </Grid>
            <Grid container className="banner-container" >
                {state.products.map((item, i) => {
                    return (
                        <Grid item sx={{ display: 'flex', justifyContent: 'center'}}>
                            <ProductCard key={i} item={item} />
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>

    )
}