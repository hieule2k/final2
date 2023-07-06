import styles from "./Home-booking.module.css";
import SideSection from "../../../components/side-section/side-section";
import SearchBar from "../../../components/Search-bar/Search-bar";
import React, { useEffect, useState } from "react";
import LayoutPrimary from "layouts/LayoutPrimary";
import classNames from "classnames/bind";
import CardList from "../../../components/CardList/CardList";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import Banner from "../../../components/banner/banner";
import { IoLogoAndroid, IoLogoApple } from "react-icons/io";
import { IconContext } from "react-icons";
import { DiAndroid } from "react-icons/di";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Card2 from "components/Card/card2";

const cx = classNames.bind(styles);
function HomeBooking({ handleLike, hotel2, hotel3, hotel4, hotel5, wishlist }) {
  const location = useLocation();

  const [hotel1, setHotel1] = useState([]);

  useEffect(() => {
    const fetchHotelBySearch = async () => {
      const res = await axios.get(
        `http://103.184.113.181:81/hotels?page=1&limit=4&location=${location.state.searchValue}`
      );
      setHotel1(res.data.items);
    };
    fetchHotelBySearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutPrimary>
      <Banner />
      <SearchBar />
      <div className={cx("home-booking__body")}>
        <CardList desc="Latest on the property listing">
          {hotel1.map((x) => (
            <Card2
              handleLike={handleLike}
              key={x.id}
              id={x.id}
              name={x.name}
              star={x.star_level}
              rate={x.rate}
              address={x.address.detail_address}
              thumbnail={x.list_image[0].url}
              wishlist={wishlist}
            />
          ))}
        </CardList>
        <CardList desc="Nearby Listed Properties">
          {hotel2.map((x) => (
            <Card
              key={x.id}
              name={x.name}
              id={x.id}
              address={x.address.street}
              thumbnail={x.list_image[0].url}
              handleLike={handleLike}
            />
          ))}
        </CardList>
        <CardList desc="Top Rated Properties">
          {hotel3.map((x) => (
            <Card
              key={x.id}
              id={x.id}
              star
              name={x.name}
              address={x.address.street}
              thumbnail={x.list_image[0].url}
              handleLike={handleLike}
            />
          ))}
        </CardList>
        <SideSection
          h3="Try Hosting With Us"
          span="Earn extra just by renting your property..."
        >
          Become A Host
        </SideSection>
        <CardList id="featured" grid desc="Featured Property on our list">
          {hotel4.map((x) => (
            <Card
              featured
              key={x.id}
              id={x.id}
              name={x.name}
              address={x.address.street}
              thumbnail={x.list_image[0].url}
              handleLike={handleLike}
            />
          ))}
        </CardList>
        <div className={cx("hotel-5")}>
          <CardList button grid desc="Property Rental Guides & Tips">
            {hotel5.map((x) => (
              <Card
                guide
                featured
                key={x.id}
                id={x.id}
                name={x.name}
                address={x.address.street}
                thumbnail={x.list_image[0].url}
                handleLike={handleLike}
              />
            ))}
          </CardList>
        </div>
      </div>
      <div className={cx("doawnload-section")}>
        <div className={cx("doawnload-container")}>
          <h2>
            Download Our <br /> Mobile App
          </h2>
          <span>Available for free these platforms</span>
          <div className={cx("button-container")}>
            <Button
              className={cx("icon-font")}
              leftIcon={<IoLogoAndroid />}
              medium
              third
            >
              PlayStore
            </Button>

            <Button
              className={cx("icon-font")}
              leftIcon={<IoLogoApple />}
              medium
              third
            >
              AppleStore
            </Button>
          </div>
        </div>
        <div className={cx("icon-download")}>
          <DiAndroid />
        </div>
      </div>

      <div className={cx("newsletter")}>
        <div className={cx("newsletter__information")}>
          <h3 className={cx("newsletter__title")}>newsletter</h3>
          <span className={cx("newsletter__desc")}>Stay Up To Date</span>
        </div>
        <div className={cx("input-container")}>
          <input className={cx("input-field")} placeholder="Email" />

          <IconContext.Provider value={{ color: "#fff" }}>
            <div className={cx("send__container")}>
              <AiOutlineSend />
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </LayoutPrimary>
  );
}
export default HomeBooking;
