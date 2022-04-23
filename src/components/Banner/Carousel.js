import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import CryptoContext from "../../CryptoContext";

const Carousel = () => {
  const { currency, symbol } = useContext(CryptoContext);
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    try {
      const trendingCoins = await axios.get(TrendingCoins(currency));
      setTrending(trendingCoins.data);
    } catch (e) {
      console.log("ERROR ====> ", e);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const useStyles = makeStyles(() => ({
    carousel: {
      height: "50%",
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      textTransform: "uppercase",
      alignItems: "center",
      cursor: "pointer",
      color: "white",
    },
    price: {
      ['@media (max-width:700px)']: {
        fontSize: 16,
        fontWeight: 500
      },
      fontSize: 22, 
      fontWeight: 500
    }
  }));

  const classes = useStyles();

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`} className={classes.carouselItem}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className={classes.price}>
          {symbol}{" "}
          {coin?.current_price.toLocaleString(
            currency === "INR" ? "en-IN" : "en-US",
            {
              minimumFractionDigits: 2,
            }
          )}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        infinite={true}
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls={true}
        disableButtonsControls={true}
        items={items}
        autoPlayDirection="ltr"
        autoPlay={true}
        responsive={responsive}
      />
    </div>
  );
};

export default Carousel;
