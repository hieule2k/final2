import React from "react";
import styles from "./SearchItems.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SearchItems({ item, ...props }) {
  console.log(item.name);
  return (
    <div className={cx("search-item")} {...props}>
      <p>{item.name}</p>
    </div>
  );
}

export default SearchItems;
