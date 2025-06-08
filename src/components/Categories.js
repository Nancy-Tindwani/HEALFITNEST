import React, { useState } from 'react';
import { Grid, Link, Typography } from '@mui/material';
import readyToEat from '../assets/1.png';
import groceries from '../assets/2.png';
import personalCare from '../assets/3.png';
import homeEssential from '../assets/4.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';

const images = [
    { image: `${personalCare}`, color: '#85c147' },
    { image: `${readyToEat}`, color: '#e65c5b' },
    { image: `${homeEssential}`, color: '#7e5a40' },
    { image: `${groceries}`, color: '#cca365' },
]


export default function Categories() {
    let navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const baseUrl = 'http://localhost:8989/api'

    useEffect(() => {
        axios.get(`${baseUrl}/v7/categories`).then((response) => {
            setCategory(response.data)
        }).catch(error => {
            if (!error.response) {
                // network error
                console.log('Error: Network Error');
            } else {
                console.log(error.response);
            }
        })
    })

    return (
        <Grid container>
            <Grid container className="featured-category-container" sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem'
            }}>
                {category.map((item, i) => {
                    return (
                        <Grid item xs={6} sm={3} key={item.categoryName} >

                            <img
                                onClick={() => {
                                    navigate(`/categories/${item.categoryName}`)
                                }}
                                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
                                key={i} src={item.categoryImage}
                                alt={item.categoryName} />

                            <Typography variant="h5" onClick={() => {
                                navigate(`/categories/${item.categoryName}`)
                            }}
                                sx={{
                                    padding: '10px',
                                    borderRadius: '10px',
                                    margin: '10px',
                                    fontWeight: '600',
                                    color: `${item.color}`,
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}> {item.categoryName}</Typography>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid >

    )
}