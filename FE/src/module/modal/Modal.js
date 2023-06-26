import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Modal.module.css";
import CloseIcon from "module/Icons/CloseIcon";
import StarIcons from "module/Icons/StarIcon";
import TextAreaFormik from "components/TextAreaFormik/TextAreaFormik";
import Button from "components/Button/Button";
import { Formik } from "formik";

import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

import axios from "axios";
const cx = classNames.bind(styles);

const Modal = ({ userId, hotel, handleModalVisible, userName }) => {
  const naviage = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSetRating = (i, setFieldValue) => {
    setRating(i);
    setFieldValue("rate", i);
  };
  console.log(hotel.id, userId);
  const handleFetchComment = async (values) => {
    try {
      const res = await axios.post(
        `http://103.184.113.181:81/hotel/add_comment`,
        JSON.stringify(values)
      );
      alert("Comment Succesfull");
      naviage(`Details/${hotel.id}`);
      console.log(res);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
  return (
    <Formik
      initialValues={{
        text: "",
        type: "txt",
        rate: 2.5,
        hotel_id: hotel.id,
        customer_id: userId,
      }}
      initialTouched={{
        field: true,
      }}
      validateOnMount
      validationSchema={Yup.object({})}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        console.log(values);
        handleFetchComment(values);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className={cx("sign-up__form")}>
          <div className={cx("modal")}>
            <div className={cx("modal-content")}>
              <div className={cx("top-wrapper")}>
                <h2>Review</h2>
                <CloseIcon
                  customclass={cx("close-icon")}
                  onClick={handleModalVisible}
                ></CloseIcon>
              </div>
              <div className={cx("hotel-information__container")}>
                <img
                  className={cx("img")}
                  src="https://media-cdn.tripadvisor.com/media/photo-s/1c/59/4c/d3/hanoi-la-siesta-hotel.jpg"
                  alt="no-img"
                />
                <div>
                  <h3 className={cx("hotel-name")}>{hotel.name}</h3>
                  <p>
                    by <span className="font-bold">{userName}</span>
                  </p>
                </div>
              </div>
              <div className={cx("rating-wrapper")}>
                <p>Give Overall Rating</p>

                <div>
                  {new Array(5).fill(0).map((star, i) => {
                    i += 1;
                    return (
                      <button
                        type="button"
                        key={i}
                        className={
                          i <= (hover || rating) ? cx("on") : cx("off")
                        }
                        onClick={() => handleSetRating(i, formik.setFieldValue)}
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(rating)}
                      >
                        <StarIcons
                          customclass={cx("star-icon")}
                          key={i}
                        ></StarIcons>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p>Write your review</p>
                <TextAreaFormik
                  name="text"
                  placeholder="Enter your review"
                  id="intro"
                  className={cx("text-area")}
                ></TextAreaFormik>
              </div>
              <div className={cx("button-wrapper")}>
                <Button
                  type="button"
                  bgGray
                  small
                  black
                  onClick={handleModalVisible}
                >
                  Cancel
                </Button>
                <Button small green type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Modal;
