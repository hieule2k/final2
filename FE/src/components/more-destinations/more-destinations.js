import React, { useState, useEffect } from "react";
import "./more-destinations.css";
import axios from "axios";
import { Link } from "react-router-dom";

function MoreDestinations() {
  // const hotel = [
  //   {
  //     name: "minh''s hotel",
  //     star_level: "3",
  //     rate: "2",
  //     rule: "cam dai bay",
  //     description: "ngu the",
  //     comment: "dan lam",
  //     address: {
  //       number: "123",
  //       street: "800A",
  //       village: "nghia do",
  //       district: "cau giay",
  //       province: "ha noi",
  //     },
  //     list_image: [
  //       {
  //         url: "ngon.com",
  //         type: "hotel",
  //       },
  //       {
  //         url: "kongon.com",
  //         type: "user",
  //       },
  //     ],
  //   },
  //   {
  //     name: "minh''s hotel",
  //     star_level: "3",
  //     rate: "2",
  //     rule: "cam dai bay",
  //     description: "ngu the",
  //     comment: "dan lam",
  //     address: {
  //       number: "123",
  //       street: "800A",
  //       village: "nghia do",
  //       district: "cau giay",
  //       province: "ha noi",
  //     },
  //     list_image: [
  //       {
  //         url: "ngon.com",
  //         type: "hotel",
  //       },
  //       {
  //         url: "kongon.com",
  //         type: "user",
  //       },
  //     ],
  //   },
  //   {
  //     name: "minh''s hotel",
  //     star_level: "3",
  //     rate: "2",
  //     rule: "cam dai bay",
  //     description: "ngu the",
  //     comment: "dan lam",
  //     address: {
  //       number: "123",
  //       street: "800A",
  //       village: "nghia do",
  //       district: "cau giay",
  //       province: "ha noi",
  //     },
  //     list_image: [
  //       {
  //         url: "ngon.com",
  //         type: "hotel",
  //       },
  //       {
  //         url: "kongon.com",
  //         type: "user",
  //       },
  //     ],
  //   },
  //   {
  //     name: "minh''s hotel",
  //     star_level: "3",
  //     rate: "2",
  //     rule: "cam dai bay",
  //     description: "ngu the",
  //     comment: "dan lam",
  //     address: {
  //       number: "123",
  //       street: "800A",
  //       village: "nghia do",
  //       district: "cau giay",
  //       province: "ha noi",
  //     },
  //     list_image: [
  //       {
  //         url: "ngon.com",
  //         type: "hotel",
  //       },
  //       {
  //         url: "kongon.com",
  //         type: "user",
  //       },
  //     ],
  //   },
  // ];
  const country = ["france", "iceland", "norway", "jamaica"];
  const [hotel, setHotel] = useState([]);
  useEffect(() => {
    axios
      .get(`http://103.184.113.181:81/customer/2/hotels?page=1&limit=4`)
      .then(function (response) {
        console.log(response);
        console.log("succes");
        setHotel(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="more-destinations">
      <div className="more-destinations__content">
        <h2 className="more-destinations__top">more</h2>
        <h2 className="more-destinations__dest">destinations</h2>
        <p className="more-destinations__desc">
          Your peace of mind doesn’t have to be tied to where everyone else is.
          We have a good number of travel and relocation destinations. Take your
          time and find the perfect one for you.
        </p>
      </div>

      <div className="more-destinations-container">
        {hotel.map((destination, index) => (
          <div
            className={`more-destinations-item ${country[index]}`}
            key={index}
          >
            <Link to="/HomeBooking">
              <img
                src={destination.list_image[0].url}
                className="more-destinations-item__img"
                alt=""
              />
            </Link>
            <div className="more-destinations-info">
              <h3 className="more-destinations-state">{destination.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoreDestinations;
