import React from "react";
import classNames from "classnames/bind";
import styles from "./TransactionItem.module.css";

const cx = classNames.bind(styles);

function TransactionItem() {
  return (
    <div className={cx("transaction-item")}>
      <div className={cx("item-wrapper")}>
        <div className={cx("item-information")}>
          <div className={cx("title")}>Transaction Title</div>
          <div className={cx("time")}>12 Mar 2021 at 2:00 PM</div>
        </div>
        <div className={cx("income")}>$ 1000 USD</div>
      </div>
    </div>
  );
}

export default TransactionItem;
