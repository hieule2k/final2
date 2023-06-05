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

const SearchField = ({ data, setData }) => {
  // console.log(handleSearch);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [query, setQuery] = useState("");
  const [param, setParam] = useState({
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  });
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
      ].join(":") +
      "." +
      ["000", "00"].join(" +")
    );
  }

  const handleClick = (item) => {
    setParam({ ...param, name: item });
    setIsComponentVisible(false);
    setQuery(item);
  };
  const handleClickStartDate = (date) => {
    setStartDate(date);
    setParam({ ...param, startDate: formatDate(date) });
  };

  const handleClickEndDate = (date) => {
    setEndDate(date);
    setParam({ ...param, endDate: formatDate(date) });
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

  const fetchData = async () => {
    const response = await axios.get(
      `http://103.184.113.181:81/hotels?page=1&limit=4&location=${param.name}&check_in=${param.startDate}&check_out=${param.endDate}`
    );
    setData(response.data.items);
  };

  const handleSearch = () => {
    if (data) {
      fetchData();
    } else if (!data) {
      navigate("/Search", { state: { item: param } });
    }
  };

  return (
    <div className={cx("fragment")}>
      <div className={cx("search-field")}>
        <div className={cx("item-container")}>
          <div className={cx("search-item")}>
            <span className={cx("search-title")}>Location</span>
            <input
              className={cx("search-action")}
              onClick={() => {
                setIsComponentVisible(true);
              }}
              value={query}
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
                onChange={(date) => handleClickStartDate(date)}
              />
            </span>
          </div>
          <div className={cx("search-item")}>
            <span className={cx("search-title")}>Check Out</span>
            <span className={cx("search-action")}>
              <DatePicker
                selected={endDate}
                onChange={(date) => handleClickEndDate(date)}
                popperContainer={CalendarContainer}
              />
            </span>
          </div>
          <div className={cx("search-item")}>
            <span className={cx("search-title")}>Guests</span>

            <input className={cx("search-action")} placeholder="Add guest" />
          </div>
        </div>

        <div
          className={cx("search-icon__container")}
          onClick={() => {
            handleSearch(param);
          }}
        >
          <IconContext.Provider value={{ color: "#fff", size: "20px" }}>
            <i className={cx(".search-icon")}>
              <BsSearch />
            </i>
          </IconContext.Provider>
        </div>
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
