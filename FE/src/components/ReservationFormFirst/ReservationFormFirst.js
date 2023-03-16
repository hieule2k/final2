import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ReservationFormFirst.module.css";
import ReservationItem from "../ReservationItem/ReservationItem";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaypalCheckoutButton from "../../PaypalCheckoutButton";
import Button from "../Button/Button";
import { IconContext } from "react-icons/lib";
const cx = classNames.bind(styles);

function ReservationFormFirst({ handleSetCheckBill }) {
  const [room, setRooms] = useState(() => {
    const storageRoomsData = JSON.parse(localStorage.getItem("rooms"));

    return storageRoomsData ?? [];
  });

  const [status, setStatus] = useState(() => {
    const storageRoomsData = JSON.parse(localStorage.getItem("status"));

    return storageRoomsData ?? [];
  });
  const [total, setTotal] = useState(1);
  // const [showRoomStyle, setShowRoomStyle] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [serviceFee, setServiceFee] = useState(2);
  let tax = 0.1;
  let totalFee = (total * 19 + serviceFee) * tax + (total * 18 + serviceFee);
  useEffect(() => {
    console.log(startDate);
  }, [startDate]);
  const handleIncrease = () => {
    setTotal((prev) => prev + 1);
  };

  const handleDecrease = () => {
    total > 1 && setTotal((prev) => prev - 1);
  };

  const removeItem = (id) => {
    if (room.length > 0) {
      const newItems = room.filter((item) => item.id !== id);

      setRooms(() => {
        const jsonData = JSON.stringify(newItems);
        localStorage.setItem("rooms", jsonData);
        return newItems;
      });
    }
  };
  const paypal = {
    description: room.name,
    price: totalFee,
  };
  // const addItem = () => {
  //   setShowRoomStyle(!showRoomStyle);
  // };

  // const addItem1 = () => {
  //   let id = 200;
  //   if (status.length > 0) {
  //     id = status[status.length - 1].id + 1;
  //   }

  //   setRooms((prev) => {
  //     const newData = [
  //       ...prev,
  //       {
  //         id: id,
  //         name: "single",
  //         address: {
  //           street: "101",
  //         },
  //         list_image: {
  //           url: "https://cf.bstatic.com/xdata/images/hotel/square600/46129592.webp?k=e23728804b1c260cf7c6e8cbc1ee4f917508f462ad3e3839f91a4138b9b2c686&o=&s=1",
  //         },
  //       },
  //     ];
  //     const jsonNewData = JSON.stringify(newData);
  //     localStorage.setItem("rooms", jsonNewData);
  //     return newData;
  //   });
  // };

  // const addItem2 = () => {
  //   let id = 100;
  //   if (status.length > 0) {
  //     id = status[status.length - 1].id + 1;
  //   }

  //   setRooms((prev) => {
  //     const newData = [
  //       ...prev,
  //       {
  //         id: id,
  //         name: "double",
  //         address: {
  //           street: "101",
  //         },
  //         list_image: {
  //           url: "https://cf.bstatic.com/xdata/images/hotel/square600/46129592.webp?k=e23728804b1c260cf7c6e8cbc1ee4f917508f462ad3e3839f91a4138b9b2c686&o=&s=1",
  //         },
  //       },
  //     ];
  //     const jsonNewData = JSON.stringify(newData);
  //     localStorage.setItem("rooms", jsonNewData);
  //     return newData;
  //   });
  // };

  // const addItem3 = () => {
  //   let id = 1;
  //   if (status.length > 0) {
  //     id = status[status.length - 1].id + 1;
  //   }

  //   setRooms((prev) => {
  //     const newData = [
  //       ...prev,
  //       {
  //         id: id,
  //         name: "triple",
  //         address: {
  //           street: "101",
  //         },
  //         list_image: {
  //           url: "https://cf.bstatic.com/xdata/images/hotel/square600/46129592.webp?k=e23728804b1c260cf7c6e8cbc1ee4f917508f462ad3e3839f91a4138b9b2c686&o=&s=1",
  //         },
  //       },
  //     ];
  //     const jsonNewData = JSON.stringify(newData);
  //     localStorage.setItem("rooms", jsonNewData);
  //     return newData;
  //   });
  // };

  return (
    <div className={cx("reservation-form-first")}>
      <div className={cx("reservation-top")}>
        {/* {showRoomStyle && (
          <ul className={cx("rooms-list")}>
            <li className={cx("room-list-item")} onClick={addItem1}>
              Single
            </li>
            <li className={cx("room-list-item")} onClick={addItem2}>
              Double
            </li>
            <li className={cx("room-list-item")} onClick={addItem3}>
              Vip
            </li>
          </ul>
        )} */}
        {/* <Button className={cx("add")} medium onClick={addItem}>
          Add Room
        </Button> */}
      </div>
      <div className={cx("reservation-item--container")}>
        {room.length > 0 &&
          room.map((item) => (
            <ReservationItem
              id={item.id}
              key={item.id}
              item={item}
              removeItem={removeItem}
            />
          ))}
      </div>
      <div className={cx("bill")}>
        <div className={cx("col-3")}>
          <h2 className={cx("top-heading")}>Details</h2>
          <div className={cx("total-days")}>
            <p className={cx("total")}>Total Days</p>
            <div className={cx("minus")} onClick={handleDecrease}>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.834 3.99756C7.41463 3.99756 3.83398 7.5782 3.83398 11.9976C3.83398 16.4169 7.41463 19.9976 11.834 19.9976C16.2533 19.9976 19.834 16.4169 19.834 11.9976C19.834 7.5782 16.2533 3.99756 11.834 3.99756ZM7.57592 13.2879C7.36302 13.2879 7.18882 13.1137 7.18882 12.9008V11.0943C7.18882 10.8814 7.36302 10.7072 7.57592 10.7072H16.092C16.305 10.7072 16.4791 10.8814 16.4791 11.0943V12.9008C16.4791 13.1137 16.305 13.2879 16.092 13.2879H7.57592Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className={cx("number")}>{total}</div>
            <div className={cx("plus")} onClick={handleIncrease}>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.834 3.99756C7.41463 3.99756 3.83398 7.5782 3.83398 11.9976C3.83398 16.4169 7.41463 19.9976 11.834 19.9976C16.2533 19.9976 19.834 16.4169 19.834 11.9976C19.834 7.5782 16.2533 3.99756 11.834 3.99756ZM16.4791 12.9008C16.4791 13.1137 16.305 13.2879 16.092 13.2879H13.1243V16.2556C13.1243 16.4685 12.9501 16.6427 12.7372 16.6427H10.9308C10.7179 16.6427 10.5437 16.4685 10.5437 16.2556V13.2879H7.57592C7.36302 13.2879 7.18882 13.1137 7.18882 12.9008V11.0943C7.18882 10.8814 7.36302 10.7072 7.57592 10.7072H10.5437V7.73949C10.5437 7.52659 10.7179 7.3524 10.9308 7.3524H12.7372C12.9501 7.3524 13.1243 7.52659 13.1243 7.73949V10.7072H16.092C16.305 10.7072 16.4791 10.8814 16.4791 11.0943V12.9008Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className={cx("type-container")}>
            Total rooms
            <div>{room.length}</div>
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
            <p>{total} nights:</p>
            <p>{total * 8}</p>
          </div>
          <div className={cx("fee")}>
            <p>Service Fee:</p>
            <p>{serviceFee}</p>
          </div>
          <div className={cx("fee")}>
            <p>tax: </p>
            <p>{tax * 100} %</p>
          </div>
          <div className={cx("fee", "total-price")}>
            <p>Totals fee:</p>
            <p>{totalFee}</p>
          </div>
        </div>
      </div>
      <Button
        medium
        black
        onClick={() => {
          handleSetCheckBill(room[0]);
        }}
        className={cx("custom-button")}
      >
        Next
      </Button>
      {/* <PaypalCheckoutButton
        product={paypal}
        handleSetCheckBill={handleSetCheckBill}
      /> */}
    </div>
  );
}

export default ReservationFormFirst;
