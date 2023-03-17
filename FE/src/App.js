import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Home from "./pages/customer/home/home";
import Checkout from "./pages/customer/checkout";
import Details from "./pages/customer/Details/Details";
import HomeBooking from "./pages/customer/Home-Booking/Home-Booking";
import Search from "./pages/customer/Search/search";
import SignUp from "./pages/customer/SignUp/SignUp";

import ButtonTest from "./pages/ButtonTest/ButtonTest";
import Account from "./pages/customer/Account/Account";
import Wishlists from "./pages/customer/Wishlists/Wishlists";
import ReservationForm from "./pages/customer/Reservation-form/Reservation";
import ReservationStatus from "./pages/customer/ReservationStatus/ReservationStatus";
import HostPage from "./pages/HostSite/HostPage/HostPage";
import SignUpHost from "./pages/HostSite/SignUpHost/SignUpHost";
import HostProperties from "./pages/HostSite/HostProperties/HostProperties";
import Admin from "./pages/Admin/Admin";
import AddProperties from "./pages/HostSite/AddProperties/AddProperties";
import AddRooms1 from "./pages/HostSite/AddRooms1/AddRooms1";
import HostReservation from "../src/pages/HostSite/HostReservation/HostReservation";
import TransactionHistory from "./pages/HostSite/TransactionHistory/TransactionHistory";
import ScrollToTop from "./components/ScrollToTop";
import "@fontsource/mulish"; // Import font
import HostSelect from "./pages/HostSite/HostSelect/HostSelect";
import LoginHost from "./pages/HostSite/LoginHost/LoginHost";
import axios from "axios";
import Login from "pages/customer/Login/Login";
function App() {
  // const [data, getData] = useState();
  // useEffect(() => {
  //   axios
  //     .post("103.184.113.181/customer", data)
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [data]);
  // const handleApi = async () => {
  //   const response = await axios.get("/103.184.113.181/customer");

  //   console.log(response);
  // };
  // useEffect(() => {
  //   handleApi();
  // }, []);
  // axios
  //   .get("http://103.184.113.181:81/hotel/1")
  //   .then(function (response) {
  //     console.log(response);
  //     console.log("succes");
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  const [hotel1, setHotel1] = useState([]);
  const [hotel2, setHotel2] = useState([]);
  const [hotel3, setHotel3] = useState([]);
  const [hotel4, setHotel4] = useState([]);
  const [hotel5, setHotel5] = useState([]);
  useEffect(() => {
    axios
      .get(`http://103.184.113.181:81/customer/2/hotels?page=1&limit=4`)
      .then(function (response) {
        setHotel1(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`http://103.184.113.181:81/customer/2/hotels?page=1&limit=4`)
      .then(function (response) {
        setHotel2(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`http://103.184.113.181:81/customer/2/hotels?page=1&limit=4`)
      .then(function (response) {
        setHotel3(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`http://103.184.113.181:81/customer/2/hotels?page=1&limit=6`)
      .then(function (response) {
        setHotel4(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`http://103.184.113.181:81/customer/2/hotels?page=1&limit=3`)
      .then(function (response) {
        setHotel5(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [wishlist, setWishList] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("wishlist"));

    return storageData ?? [];
  });

  const [currentAccount, setCurrentAccount] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("userData"));

    return storageData ?? false;
  });

  const handleLike = (item) => {
    const itemExist = wishlist.find((exa) => exa.id === item.id);
    if (currentAccount) {
      if (itemExist) {
        const newWishList = wishlist.filter((i) => i.id !== item.id);
        setWishList(() => {
          const jsonData = JSON.stringify(newWishList);
          localStorage.setItem("wishlist", jsonData);
          return newWishList;
        });
      } else {
        setWishList((prev) => {
          const newData = [...prev, item];
          const jsonData = JSON.stringify(newData);
          localStorage.setItem("wishlist", jsonData);
          return newData;
        });
      }
    } else {
      alert("please login first");
    }
  };

  const clearAll = () => {
    setWishList(() => {
      const newData = [];
      localStorage.removeItem("wishlist");
      return newData;
    });
  };
  const handleRemove = (id) => {
    const newWishList = wishlist.filter((item) => item.id !== id);

    setWishList(() => {
      const jsonData = JSON.stringify(newWishList);
      localStorage.setItem("wishlist", jsonData);
      return newWishList;
    });
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AX9EaV-372UA-NlE3diV0T5LSqztptRkCyxk5rz0J3x9WSrZc0BSINHOqcqOhdjAB3evTGHGz8XUKqAc",
      }}
    >
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/Details/:id" element={<Details />} />
          <Route
            path="/HomeBooking"
            element={
              <HomeBooking
                handleLike={handleLike}
                hotel1={hotel1}
                hotel2={hotel2}
                hotel3={hotel3}
                hotel4={hotel4}
                hotel5={hotel5}
              />
            }
          />
          <Route path="/Search" element={<Search handleLike={handleLike} />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ButtonTest" element={<ButtonTest />} />
          <Route path="/Account" element={<Account />} />
          <Route
            path="/Wishlists"
            element={
              <Wishlists
                wishlist={wishlist}
                clearAll={clearAll}
                handleRemove={handleRemove}
              />
            }
          />
          <Route path="/ReservationForm" element={<ReservationForm />} />
          <Route path="/ReservationStatus" element={<ReservationStatus />} />
          <Route path="/HostPage" element={<HostPage />} />
          <Route path="/SignUpHost" element={<SignUpHost />} />
          <Route path="/HostProperties" element={<HostProperties />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/AddProperties" element={<AddProperties />} />
          <Route path="/AddRooms1" element={<AddRooms1 />} />
          <Route path="/HostReservation" element={<HostReservation />} />
          <Route path="/TransactionHistory" element={<TransactionHistory />} />
          <Route path="/HostSelect" element={<HostSelect />} />
          <Route path="/LoginHost" element={<LoginHost />} />
        </Routes>
      </div>
    </PayPalScriptProvider>
  );
}
export default App;
