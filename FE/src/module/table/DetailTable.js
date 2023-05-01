import React, { useState } from "react";
import styles from "../../module/table/table.module.css";
import classNames from "classnames/bind";
import Button from "components/Button/Button";
import { BiBuilding } from "react-icons/bi";
import { AiOutlinePhone } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const DetailTable = ({ reserve = false, title = "", detailsHotel = [] }) => {
  const navigate = useNavigate();
  console.log(detailsHotel);
  const reserveStorage = () => {
    navigate("/ReservationForm", { state: { hotelData: detailsHotel } });
  };
  return (
    <div className={cx("side-bar")}>
      <div className={cx("price-range")}>{title}</div>
      <div className={cx("price-container")}>
        <table className={cx("table")}>
          <tr>
            <td>Single:</td>
            <td>10$</td>
          </tr>
          <tr>
            <td>Double:</td>
            <td>20$</td>
          </tr>
          <tr>
            <td>VIP:</td>
            <td>50$</td>
          </tr>
        </table>
      </div>
      {reserve && (
        <Button large black rounded onClick={reserveStorage}>
          Reserve Now
        </Button>
      )}
      <div className={cx("contact")}>
        <div className={cx("contact-information")}>
          <div className={cx("contact-name")}>Property Inquiry</div>
          <i className={cx("contact-icon")}>
            <BiBuilding />
          </i>
        </div>
        <div className={cx("contact-information")}>
          <div className={cx("contact-name")}>Contact Host</div>
          <i className={cx("contact-icon")}>
            <AiOutlinePhone />
          </i>
        </div>
      </div>
    </div>
  );
};

export default DetailTable;
