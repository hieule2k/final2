import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ReservationItem.module.css";
import img from "../../assets/img/image1.png";
import BlackCloseIcon from "module/Icons/BlackCloseIcon";
import MinusIcon from "module/Icons/MinusIcon";
import PlusIcon from "module/Icons/PlusIcon";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

function ReservationItem({
  removeItem,
  id,
  item,
  calculatePrice,
  handleIncrease,
  handleDecrease,
}) {
  const { name, type, price } = item;
  // const handleIncrease = () => {
  //   total < 4 && setTotal((prev) => prev + 1);
  // };

  // const handleDecrease = () => {
  //   total > 1 && setTotal((prev) => prev - 1);
  // };
  const location = useLocation();
  const data = location.state.hotelData;
  return (
    <div className={cx("reservation-item")}>
      <div className={cx("img-container")}>
        <img className={cx("avatar")} src={img} alt="hieu" />
      </div>
      <div className={cx("item-information")}>
        <div className={cx("top-information-wrapper")}>
          <div className={cx("top-information")}>
            <h2 className={cx("item-name")}>{name}</h2>
            <i onClick={() => removeItem(type)}>
              <BlackCloseIcon></BlackCloseIcon>
            </i>
          </div>
          <p className={cx("item-location")}>{data.address.detail_address}</p>
        </div>
        <div className={cx("type-information")}>
          <p>Room class: {type}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={cx("total-container")}>
            Total Rooms:
            <MinusIcon
              customclass={cx("icon")}
              onClick={() => {
                handleDecrease(item);
              }}
            ></MinusIcon>
            <span style={{ width: "10px" }}>{item.quantity}</span>
            <PlusIcon
              customclass={cx("icon")}
              onClick={() => {
                handleIncrease(item);
              }}
            ></PlusIcon>
          </div>
          <div> Total : {price * item.quantity}</div>
        </div>
      </div>
    </div>
  );
}

export default ReservationItem;
