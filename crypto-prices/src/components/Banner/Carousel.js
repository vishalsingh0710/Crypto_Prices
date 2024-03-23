import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../Config/api'
import { CryptoState } from '../../CryptoContext'
import axios from "axios";
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom';

const useStyles =makeStyles( ()=> ({
    carousel: {
        height:'50%',
        display:'flex',
        alignItems:'center'
    },
    carouselItems: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        cursor:'pointer',
        textTransform:'uppercase',
        color:'white'
    }
}))
const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const classes = useStyles()
    const {currency, symbol} = CryptoState();
    const fetchTrendingCoins = async() => {
        try{
            const {data} = await axios.get(TrendingCoins(currency))
            setTrending(data)
        }
        catch(error){
            console.log(error)
        }
    }
    const responsive = {
        0:{
            items:2
        }, 
        512:{
            items:4
        }
    }
    const items = trending.map((coin)=> {
        let profit= coin.price_change_percentage_24h>=0;
        return(
            <Link
            className={classes.carouselItems}
            to={`/coins/${coin.id}`}
            >
                <img 
                src={coin?.image}
                alt={coin.name}
                height='80'
                style = {{marginBottom:10}}/>
                <span>{coin?.symbol}
                &nbsp;
                    <span style={{color: profit>0?"rgb(14,203,120":'red'}}>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}
                    </span>
                </span>
                <span style={{fontSize:22, fontWeight:500}}>
                    {symbol} {(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })
    useEffect(()=> {
        fetchTrendingCoins()
    }, [currency])
  return (
    <div className={classes.Carousel}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            responsive={responsive}
            autoPlay
            disableButtonsControls
            items={items}
        />
    </div>
  )
}

export default Carousel
