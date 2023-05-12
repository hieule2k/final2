import React from "react";
import styles from "./SearchItems.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SearchItems({ item, ...props }) {
  console.log(item);
  return (
    <div className={cx("search-item")} {...props}>
      {item.address && <p>{item.address.province}</p>}
      <span>{item.name}</span>
    </div>
  );
}

export default SearchItems;
