import React, { useState } from "react";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Search-bar.module.css";
import { Portal } from "react-overlays";

const CalendarContainer = ({ children }) => {
  const el = document.getElementById("calendar-portal");

  return <Portal container={el}>{children}</Portal>;
};

const cx = classNames.bind(styles);

const SearchField = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className={cx("search-field")}>
      <div className={cx("search-item")}>
        <span className={cx("search-title")}>Location</span>
        <input
          className={cx("search-action")}
          placeholder="Which city do you prefer?"
        />
      </div>
      <div className={cx("search-item")}>
        <span className={cx("search-title")}>Check In</span>
        <span className={cx("search-action")}>
          <DatePicker
            portalId="root-portal"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </span>
      </div>
      <div className={cx("search-item")}>
        <span className={cx("search-title")}>Check Out</span>
        <span className={cx("search-action")}>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            popperContainer={CalendarContainer}
          />
        </span>
      </div>
      <div className={cx("search-item")}>
        <span className={cx("search-title")}>Guests</span>

        <input className={cx("search-action")} placeholder="Add guest" />
      </div>

      <Link to="/Search">
        <div className={cx("search-icon__container")}>
          <IconContext.Provider value={{ color: "#fff", size: "20px" }}>
            <i className={cx(".search-icon")}>
              <BsSearch />
            </i>
          </IconContext.Provider>
        </div>
      </Link>
    </div>
  );
};

export default SearchField;
