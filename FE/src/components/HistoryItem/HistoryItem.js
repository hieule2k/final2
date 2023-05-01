import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./HistoryItem.module.css";
import avatar from "../../assets/img/avatar.jpg";
import Button from "../Button/Button";

const cx = classNames.bind(styles);

function HistoryItem({
  children,
  host = false,
  past = false,
  item,
  removeItem,
  handleHistory,
}) {
  // const { name, address, id, list_image } = item.hotel;
  return (
    <div className={cx("history-item")}>
      <div className={cx("item-container")}>
        <div className={cx("col-left")}>
          <div className={cx("img-container")}>
            <img
              src="https://media-cdn.tripadvisor.com/media/photo-s/1c/59/4c/d3/hanoi-la-siesta-hotel.jpg"
              alt="No img"
              className={cx("image")}
            />
          </div>
          <div className={cx("item-information")}>
            <div className={cx("item-title")}>hotel</div>
            <div className={cx("item-specific")}>
              <div className={cx("specific")}>
                Check In: <span className={cx("time")}>12 Mar 2021</span>
              </div>
              <div className={cx("specific")}>
                Duration: <span className={cx("time")}>Long (2-5 Years)</span>
              </div>
              <div className={cx("specific")}>
                Guest: <span className={cx("time")}>12 Mar 2021</span>
              </div>
            </div>
            <div className={cx("item-price")}>$1000</div>
          </div>
        </div>
        <div className={cx("col-right")}>
          {host ? (
            <div className={cx("button-container")}>
              <Button
                small
                green
                rounded
                onClick={() => {
                  handleHistory(item);
                }}
              >
                Approve
              </Button>
              <Button small black rounded>
                Rejected
              </Button>
            </div>
          ) : (
            <div className={cx("button-wrapper")}>
              <Button
                mediumx
                rounded
                bgGray
                className={cx("button-size")}
                // onClick={() => {
                //   removeItem(id);
                // }}
              >
                Cancel Reservation
              </Button>
              {past && (
                <Button
                  mediumx
                  textBlack
                  className={cx("button-size", "review")}
                >
                  Rate & Review
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryItem;
