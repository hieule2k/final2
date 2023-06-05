import React from "react";
import classNames from "classnames/bind";
import styles from "./form.module.css";
import MyInput from "components/MyInput/MyInput";
import SelectFormik from "components/SelectFormik/SelectFormik";
import TextAreaFormik from "components/TextAreaFormik/TextAreaFormik";
import { Button } from "@mui/material";
import Counter from "components/Counter/Counter";
import city from "../../json/province.json";

const cx = classNames.bind(styles);
const province = city.data;
const Form = () => {
  return (
    <div className={cx("add3-properties")}>
      <div>
        {/* <ImageGallery images={images} /> */}
        <div className={cx("content3-container")}>
          <div className={cx("input-container")}>
            <h1
              className={cx("title")}
              style={{ fontSize: "2em", marginBottom: "25px" }}
            >
              Add New Property
            </h1>
            <MyInput
              customContainerClasses={cx("custom-container")}
              label="Hotel Name"
              type="text"
              name="name"
              className={cx("name")}
              placeholder={"Enter your Hotel Name"}
            ></MyInput>
          </div>
          <div className={cx("input-container")}>
            <h3>Add Your location.</h3>
            <div className={cx("location-input__wrapper")}>
              <div className={cx("location-input")}>
                <SelectFormik name="address.province" label="Province">
                  {province.map((i, index) => (
                    <option key={index} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                </SelectFormik>
                <SelectFormik name="address.district" label="District">
                  <option value="CauGiay">Cau Giay</option>
                  <option value="BaDinh">Ba Dinh </option>
                  <option value="HoangMai">Hoang Mai</option>
                </SelectFormik>
              </div>
              <div>
                {/* <label className={cx("select-type")}>
                  <span className={cx("select_name")}> Address</span>
                  <input
                    type="text"
                    className={cx("input")}
                    placeholder="input"
                    name="address.number"
                  />
                </label> */}{" "}
                <MyInput
                  label="Address"
                  type="text"
                  name="address.detail_address"
                  className={cx("name")}
                  placeholder={"Enter your address"}
                ></MyInput>
              </div>
            </div>
          </div>
          {/* <div>
          <h3 className={cx("title")}>Total Rooms</h3>
          <MyInput
            customContainerClasses={cx("custom-input")}
            className={cx("name", "name-input")}
            name="quantity"
            type="number"
          ></MyInput>
        </div> */}
          {/* <div className={cx("input-container")}>
            <h3>Add facilities available at your place.</h3>
            <div className={cx("counter-container")}>
              <Counter>Pool</Counter>
              <Counter>Parking lot</Counter>
            </div>
          </div> */}
          <div className={cx("input-container")}>
            <div>
              <h3 style={{ marginBottom: "25px" }}>
                Add description at your place.
              </h3>
            </div>
            <div>
              <TextAreaFormik
                label="Introduce yourself"
                name="description"
                placeholder="Enter your introduce"
                id="intro"
                className={cx("text-area")}
              ></TextAreaFormik>
            </div>
          </div>
          <Button
            type="submit"
            className={cx("save")}
            small="true"
            green="true"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
