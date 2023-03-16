import React from "react";
import styles from "./AddProperties2.module.css";
import classNames from "classnames/bind";
import { BiEdit } from "react-icons/bi";
const cx = classNames.bind(styles);
function AddProperties2({ handleChangeTab }) {
  return (
    <div className={cx("add-properties")}>
      <div className={cx("container")}>
        <h2>List of properties</h2>
        <div className={cx("add-container")}>
          <div className={cx("banner")}>Add some properties to your palace</div>
          <i className={cx("add-icon")}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.4286 14.1429H21.8571V2.57143C21.8571 1.15152 20.7056 0 19.2857 0H16.7143C15.2944 0 14.1429 1.15152 14.1429 2.57143V14.1429H2.57143C1.15152 14.1429 0 15.2944 0 16.7143V19.2857C0 20.7056 1.15152 21.8571 2.57143 21.8571H14.1429V33.4286C14.1429 34.8485 15.2944 36 16.7143 36H19.2857C20.7056 36 21.8571 34.8485 21.8571 33.4286V21.8571H33.4286C34.8485 21.8571 36 20.7056 36 19.2857V16.7143C36 15.2944 34.8485 14.1429 33.4286 14.1429Z"
                fill="#9A9A9A"
              />
            </svg>
          </i>
        </div>
        <div className={cx("properties-lists")}>
          <div className={cx("properties-item")}>
            <div className={cx("item-information")}>
              <h2 className={cx("item-name")}>Villa 001</h2>
              <p className={cx("total-people")}>For 4-6 people</p>
            </div>
            <i
              className={cx("edit-icon")}
              onClick={() => {
                handleChangeTab("addproperty3");
              }}
            >
              <BiEdit />
            </i>
          </div>
          <div className={cx("properties-item")}>
            <div className={cx("item-information")}>
              <h2 className={cx("item-name")}>Villa 001</h2>
              <p className={cx("total-people")}>For 4-6 people</p>
            </div>
            <i
              className={cx("edit-icon")}
              onClick={() => {
                handleChangeTab("addproperty3");
              }}
            >
              <BiEdit />
            </i>
          </div>
          <div className={cx("properties-item")}>
            <div className={cx("item-information")}>
              <h2 className={cx("item-name")}>Villa 001</h2>
              <p className={cx("total-people")}>For 4-6 people</p>
            </div>
            <i
              className={cx("edit-icon")}
              onClick={() => {
                handleChangeTab("addproperty3");
              }}
            >
              <BiEdit />
            </i>
          </div>
          <div className={cx("properties-item")}>
            <div className={cx("item-information")}>
              <h2 className={cx("item-name")}>Villa 001</h2>
              <p className={cx("total-people")}>For 4-6 people</p>
            </div>
            <i
              className={cx("edit-icon")}
              onClick={() => {
                handleChangeTab("addproperty3");
              }}
            >
              <BiEdit />
            </i>
          </div>
          <div className={cx("properties-item")}>
            <div className={cx("item-information")}>
              <h2 className={cx("item-name")}>Villa 001</h2>
              <p className={cx("total-people")}>For 4-6 people</p>
            </div>
            <i
              className={cx("edit-icon")}
              onClick={() => {
                handleChangeTab("addproperty3");
              }}
            >
              <BiEdit />
            </i>
          </div>
          <div className={cx("properties-item")}>
            <div className={cx("item-information")}>
              <h2 className={cx("item-name")}>Villa 001</h2>
              <p className={cx("total-people")}>For 4-6 people</p>
            </div>
            <i
              className={cx("edit-icon")}
              onClick={() => {
                handleChangeTab("addproperty3");
              }}
            >
              <BiEdit />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProperties2;
