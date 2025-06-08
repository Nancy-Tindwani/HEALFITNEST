import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProdCategory from '../components/ProdCategory';
import ProductCard from '../components/ProductCard';
import Footer from '../shared/Footer';
import Header from '../shared/Header';

const baseUrl = 'http://localhost:8989/api/v7';

const Subcategory = () => {
    const [currentCategory, setCurrentCategory] = React.useState('');
    const [products, setProducts] = React.useState([]);
    const params = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}/categories/${params.categoryName}/${params.subCategoryName}`).then((response) => {
            setCurrentCategory(params.subCategoryName);
            setProducts(response.data)
            console.log(currentCategory, products);
        }).catch(error => {
            if (!error.response) {
                // network error
                console.log('Error: Network Error');
            } else {
                console.log(error.response);
            }
        })
    }, [])

    return (
        <div style={{marginBottom: '0px', paddingBottom: '0px'}}>
            <Header />
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                {/* {if()} */}
                {products.map((item, i) => {
                    return (
                        <Grid item>
                        <ProductCard item={item} key={i} />
                    </Grid>

                    )
                })}
            </Grid>
            <Footer />
        </div>
    );
};

export default Subcategory;