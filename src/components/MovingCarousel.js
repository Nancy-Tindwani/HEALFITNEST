import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Grid } from '@mui/material'
import slider1 from "../assets/home.jpg";
import slider2 from "../assets/home1.jpg";
import slider3 from "../assets/home2.jpg";
import './MovingCarousel.css';


export default function MovingCarousel() {
    const items = [
        {
            image: 'https://img.freepik.com/free-photo/concept-gift-with-basket-cosmetics-beige-background_185193-68915.jpg?t=st=1659692994~exp=1659693594~hmac=764caefc8568f47994e8301bbe1f5ba2e005f33b0ad921683e208b35d85f52a3'
        },
        {
            image: 'https://img.freepik.com/free-photo/top-view-assortment-vegetables-paper-bag_23-2148853335.jpg?t=st=1659693217~exp=1659693817~hmac=64207f320196e072a2f485beca546aa7a59103886cd837b8d115e2613290ed8a', title: 'Healthy you', desc: 'happy Us'
        },
        {
            image: `${slider2}`, title: 'The best ', desc: 'in quality'
        },
    ]

    return (
        <Carousel animation='slide' duration={500}>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

function Item(props) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <div className='slide'>
                    <div className='slider-image'>
                        <img src={props.item.image}
                            alt='carousel'/>
                    </div>
                    <div className='meta' >
                        <h1><span className='title-emphasis'>Healthy</span> you</h1>
                        <p>happy <span className='title-emphasis'>Us</span></p>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}