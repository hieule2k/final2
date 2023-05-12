import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ReservationFormFirst.module.css";
import ReservationItem from "../ReservationItem/ReservationItem";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { IconContext } from "react-icons/lib";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { differenceInDays } from "date-fns";
const cx = classNames.bind(styles);

function ReservationFormFirst({ handleSetCheckBill, userData }) {
  const [bookedData, setBookedData] = useState({
    note: "bellofen",
    customer_id: userData.id,
    bookedroom: [
      {
        check_in: "2023-05-10 13:18:41.017Z",
        check_out: "2023-05-10 10:07:26.486Z",
        price: 1000,
        discount: 100,
        room_id: 784,
      },
    ],
  });
  const [totalPrices, setTotalPrices] = useState();
  const [rooms, setRooms] = useState([]);
  const [cart, setCart] = useState([]);
  const [showRoomStyle, setShowRoomStyle] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const location = useLocation();
  const data = location.state.hotelData;
  const result = differenceInDays(endDate, startDate);
  // let k = new Date();
  // let c = k.toISOString().split("T");
  // console.log(c.join(" "));
  useEffect(() => {
    axios
      .get(`http://103.184.113.181:82/hotel/${data.id}/rooms?page=1&limit=10`)
      .then(function (response) {
        // console.log(response);
        setRooms(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });

    setTotalPrices(
      cart
        .map((cartItem) => {
          return cartItem.totalPrice;
        })
        .reduce((acc, cur) => acc + cur, 0)
    );
  }, [data.id, cart]);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join("-") +
      " " +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );
  }

  const removeItem = (type) => {
    const newItems = cart.filter((item) => item.type !== type);
    setCart(newItems);
  };

  const addItem = () => {
    setShowRoomStyle(!showRoomStyle);
  };

  const addRoom = (type) => {
    // console.log(rooms.filter((room) => room.type === type));
    const newRoom = rooms.filter((room) => room.type === type);
    const { price, id } = newRoom[0];
    const roomData = [
      {
        check_in: formatDate(startDate),
        check_out: formatDate(endDate),
        price: price,
        discount: 100,
        room_id: id,
      },
    ];
    setCart([
      ...cart,
      { ...newRoom[0], quantity: 1, totalPrice: newRoom[0].price },
    ]);

    setBookedData({
      ...bookedData,
      bookedroom: roomData,
    });
  };

  console.log(bookedData);
  // console.log(cart);

  const handleIncrease = (item) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.type === item.type
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalPrice: cartItem.price * (cartItem.quantity + 1),
            }
          : cartItem
      )
    );
  };

  const handleDecrease = (item) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.type === item.type
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const calculatePrice = (val) => {
    // SetTotalPrices(val);
    console.log(val);
  };

  const handleFetchData = async () => {
    try {
      const res = await axios.post(
        "http://103.184.113.181:88/create_booking",
        JSON.stringify(bookedData)
      );
      cart.length > 0
        ? handleSetCheckBill()
        : alert("Vui long chon phong truoc");
      const fakeBookingData = {
        id: res.data.id,
        check_in: bookedData.bookedroom[0].check_in,
        check_out: bookedData.bookedroom[0].check_out,
        price: bookedData.bookedroom[0].price,
        discount: bookedData.bookedroom[0].discount,
        room_id: bookedData.bookedroom[0].room_id,
      };
      localStorage.setItem("bookingData", JSON.stringify(fakeBookingData));
      console.log(res.data.id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cx("reservation-form-first")}>
      <div className={cx("reservation-top")}>
        {showRoomStyle && (
          <ul className={cx("rooms-list")}>
            {rooms.filter((room) => room.type === "Single").length > 0 &&
              cart.filter((room) => room.type === "Single").length === 0 && (
                <li
                  className={cx("room-list-item")}
                  onClick={() => {
                    addRoom("Single");
                  }}
                >
                  Single
                </li>
              )}
            {rooms.filter((room) => room.type === "Double").length > 0 &&
              cart.filter((room) => room.type === "Double").length === 0 && (
                <li
                  className={cx("room-list-item")}
                  onClick={() => {
                    addRoom("Double");
                  }}
                >
                  Double
                </li>
              )}
            {rooms.filter((room) => room.type === "VIP").length > 0 &&
              cart.filter((room) => room.type === "VIP").length === 0 && (
                <li
                  className={cx("room-list-item")}
                  onClick={() => {
                    addRoom("VIP");
                  }}
                >
                  VIP
                </li>
              )}
          </ul>
        )}
        <Button className={cx("add")} medium onClick={addItem}>
          Add Room
        </Button>
      </div>
      <div className={cx("reservation-item--container")}>
        {cart.length > 0 &&
          cart.map((item) => (
            <ReservationItem
              id={item.id}
              key={item.id}
              item={item}
              removeItem={removeItem}
              calculatePrice={calculatePrice}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
            />
          ))}
      </div>
      <div className={cx("bill")}>
        <div className={cx("col-3")}>
          <h2 className={cx("top-heading")}>Details</h2>
          <div className={cx("total-days")}>
            <p className={cx("total")}>Total Days: {result}</p>
          </div>
        </div>
        <div className={cx("col-3")}>
          <h2 className={cx("top-heading")}>Date</h2>
          <div className={cx("date")}>
            <div className={cx("check")}>Check-in:</div>
            <label className={cx("label")}>
              <IconContext.Provider value={{ color: "blue" }}>
                <div>
                  <AiOutlineCalendar />
                </div>
              </IconContext.Provider>
              <DatePicker
                wrapperClassName={cx("datePicker")}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </label>
          </div>
          <div className={cx("date")}>
            <div className={cx("check")}>Check-out:</div>
            <label className={cx("label")}>
              <IconContext.Provider value={{ color: "blue" }}>
                <div>
                  <AiOutlineCalendar />
                </div>
              </IconContext.Provider>
              <DatePicker
                wrapperClassName={cx("datePicker")}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </label>
          </div>
        </div>
        <div className={cx("col-3", "cost")}>
          <h2 className={cx("top-heading", "price")}>Price</h2>

          <div className={cx("fee")}>
            <p>Fee: </p>
            <p>{totalPrices}</p>
          </div>
          <div className={cx("fee")}>
            <p>Tax: </p>
            <p>a</p>
          </div>
          <div className={cx("fee", "total-price")}>
            <p>Totals fee:</p>
            <p></p>
          </div>
        </div>
      </div>
      <Button
        medium
        black
        onClick={handleFetchData}
        className={cx("custom-button")}
      >
        Next
      </Button>
    </div>
  );
}

export default ReservationFormFirst;
