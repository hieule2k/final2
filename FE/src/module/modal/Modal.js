import React from "react";
import classNames from "classnames/bind";
import styles from "./Modal.module.css";
import CloseIcon from "module/Icons/CloseIcon";
import StarIcons from "module/Icons/StarIcon";
import TextAreaFormik from "components/TextAreaFormik/TextAreaFormik";
import Button from "components/Button/Button";
import { Formik } from "formik";
import * as Yup from "yup";

const cx = classNames.bind(styles);

const modal = () => {
  return (
    <Formik
      initialValues={{
        text: "Khách sạn đẹp",
        type: "txt",
        rate: 5,
        hotel_id: 24,
        customer_id: 2,
      }}
      initialTouched={{
        field: true,
      }}
      validateOnMount
      validationSchema={Yup.object({})}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          resetForm({
            text: "leu leu",
            type: "txt",
            rate: 2.5,
            hotel_id: 2,
            customer_id: 6,
          });

          setSubmitting(false);
        }, 1000);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className={cx("sign-up__form")}>
          <div className={cx("modal")}>
            <div className={cx("top-wrapper")}>
              <h2>Review</h2>
              <CloseIcon customclass={cx("close-icon")}></CloseIcon>
            </div>
            <div className={cx("hotel-information__container")}>
              <img
                className={cx("img")}
                src="https://media-cdn.tripadvisor.com/media/photo-s/1c/59/4c/d3/hanoi-la-siesta-hotel.jpg"
                alt="no-img"
              />
              <div>
                <h3 className={cx("hotel-name")}>Khach san thang 4</h3>
                <p>by me</p>
              </div>
            </div>
            <div className={cx("rating-wrapper")}>
              <p>Give Overall Rating</p>
              <div>
                <StarIcons customclass={cx("star-icon")}></StarIcons>
                <StarIcons customclass={cx("star-icon")}></StarIcons>
                <StarIcons customclass={cx("star-icon")}></StarIcons>
                <StarIcons customclass={cx("star-icon")}></StarIcons>
                <StarIcons customclass={cx("star-icon")}></StarIcons>
              </div>
            </div>
            <div>
              <p>Write your review</p>
              {/* <TextAreaFormik
          label="Introduce yourself"
          name="description"
          placeholder="Enter your introduce"
          id="intro"
          className={cx("text-area")}
        ></TextAreaFormik> */}
            </div>
            <div className={cx("button-wrapper")}>
              <Button bgGray small black>
                Cancel
              </Button>
              <Button small green type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default modal;
