import React, { useState } from "react";
import styles from "./Search-bar.module.css";
// import search from "../../assets/img/search-icon.png";
import classNames from "classnames/bind";
import "react-datepicker/dist/react-datepicker.css";
import SearchField from "./SearchField";
const cx = classNames.bind(styles);

function SearchBar() {
  const myObject = ["Apartments", "Rooms", "Villas"];

  // const [type, setType] = useState(myObject[0]);
  const [state, changeState] = useState({
    activeObject: myObject[0],
  });

  function handleClick(index, element) {
    changeState({ ...state, activeObject: myObject[index] });
    // setType(element);
  }

  function toggleActive(index) {
    if (myObject[index] === state.activeObject) {
      return cx("option-item", "active");
    } else {
      return cx("option-item");
    }
  }

  return (
    <div className={cx("search-bar")}>
      <div className={cx("find")}>
        <span>FIND</span>
      </div>
      <div className={cx("search-option")}>
        <ul className={cx("option-lists")}>
          {myObject.map((element, index) => (
            <li
              key={index}
              className={toggleActive(index)}
              onClick={() => {
                handleClick(index, element);
              }}
            >
              {element}
            </li>
          ))}
        </ul>
      </div>
      <SearchField></SearchField>
    </div>
  );
}

export default SearchBar;
