import React from 'react';
import { Grid } from "@mui/material"
import ProductCard from "./ProductCard"
import { useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const baseUrl = 'http://localhost:8989/api/v7';
const categories = {
    products: []
}

export default function ProdCategory(data) {
    const [state, setState] = React.useState(categories)
    const params = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}/categories/${params.categoryName}/${data.subCategory}`).then((response) => {
            if (params.categoryName) {
                setState({
                    products: response.data.slice(0,3)
                })
            } else {
                setState({
                    products: response.data
                })
            }
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
        <div className="category-container">

            <Grid container style={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center'
            }}>
                {state.products.map((item, i) => {
                    return (
                        <Grid item>
                            <ProductCard item={item} key={i} />
                        </Grid>
                    )
                })}
            </Grid>

        </div>
    )
}