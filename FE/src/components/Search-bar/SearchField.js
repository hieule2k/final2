import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Search-bar.module.css";
import { Portal } from "react-overlays";
import axios from "axios";
import SearchItems from "components/SearchItems/SearchItems";
import provinceData from "../../json/province.json";
import useComponentVisible from "Hooks/useClickOutside";
const CalendarContainer = ({ children }) => {
  const el = document.getElementById("calendar-portal");

  return <Portal container={el}>{children}</Portal>;
};

const cx = classNames.bind(styles);

const SearchField = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [query, setQuery] = useState("");

  useEffect(() => {}, []);
  const handleClick = (item) => {
    navigate("/Search", { state: { item: item } });
  };
  let arr = provinceData.data;
  const filteredArray = [];
  arr.map((x) => {
    if (x.name) {
      filteredArray.push(x.name);
    }
    return filteredArray;
  });

  let hieule = filteredArray.filter((x) => {
    return (
      x.toUpperCase().indexOf(query.toUpperCase()) !== -1 ||
      x.toUpperCase().indexOf(query.split("").join(" ").toUpperCase()) !== -1
    );
  });
  return (
    <div className={cx("fragment")}>
      <div className={cx("search-field")}>
        <div className={cx("item-container")}>
          <div
            className={cx("search-item")}
            onClick={() => {
              setIsComponentVisible(!isComponentVisible);
            }}
          >
            <span className={cx("search-title")}>Location</span>
            <input
              className={cx("search-action")}
              placeholder="Which city do you prefer?"
              onChange={(e) => setQuery(e.target.value)}
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
      {isComponentVisible && query.length > 0 && (
        <div className={cx("search-results")} ref={ref}>
          {hieule.length > 0 &&
            query.length > 0 &&
            hieule.map((item, index) => (
              <div key={index} className={cx("search-item-wrapper")}>
                <SearchItems
                  item={item}
                  onClick={() => {
                    handleClick(item);
                  }}
                ></SearchItems>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchField;
