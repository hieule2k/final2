import React from "react";
import styles from "./SearchItems.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SearchItems({ item, ...props }) {
  return (
    <div className={cx("search-item")} {...props}>
      <p>{item.address.province}</p>
      <span>{item.name}</span>
    </div>
  );
}

export default SearchItems;
