import React, { useState } from "react";
import styles from "./AddProperties55.module.css";
import classNames from "classnames/bind";
import data from "../../json/hotel.json";
import Counter from "../Counter/Counter";
import InputRadio from "../InputRadio/InputRadio";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";

const cx = classNames.bind(styles);
function AddProperties3({ handleChangeTab }) {
  const [text, setText] = useState("haha");
  const product = data[0];
  const { images } = product;

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className={cx("add3-properties")}>
      <div>
        <ImageGallery images={images} />
        <div className={cx("content3-container")}>
          <div className="address-container">
            <h3 className={cx("title3")}>Add Your location.</h3>
            <div className={cx("location-input__wrapper")}>
              <div className={cx("location-input")}>
                <InputRadio select name="select_amenities">
                  Television
                </InputRadio>
                <InputRadio select name="select_amenities">
                  Television
                </InputRadio>
              </div>
              <div>
                <label className={cx("select-type")}>
                  <span className={cx("select_name")}> Address</span>
                  <input className={cx("input")} placeholder="input" />
                </label>
              </div>
            </div>
          </div>
          <div className={cx("facilities-container")}>
            <h3 className={cx("title")}>
              Add facilities available at your place.
            </h3>
            <div className={cx("counter-container")}>
              <Counter>Bedrooms</Counter>
              <Counter>Bathrooms</Counter>
              <Counter>Parking</Counter>
            </div>
          </div>
          <div>
            <h3 className={cx("title3")}>
              Add amenities available at your place.
            </h3>
            <div className={cx("amenities-list")}>
              <InputRadio name="select_amenities">Television</InputRadio>
              <InputRadio name="select_amenities">Wifi</InputRadio>
              <InputRadio name="select_amenities">Washer</InputRadio>
              <InputRadio name="select_amenities">Balcony</InputRadio>
              <InputRadio name="select_amenities">Cleaner</InputRadio>
              <InputRadio name="select_amenities">Radio</InputRadio>
              <InputRadio name="select_amenities">Lift</InputRadio>
              <InputRadio name="select_amenities">Other</InputRadio>
            </div>
          </div>
          <div>
            <h3 className={cx("title")}>Add description at your place.</h3>
            <div>
              <textarea
                className={cx("text-area")}
                value={text}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <Button
            className={cx("save")}
            small
            green
            onClick={() => {
              handleChangeTab("addproperty4");
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddProperties3;
