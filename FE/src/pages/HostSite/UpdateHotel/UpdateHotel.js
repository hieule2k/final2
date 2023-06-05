import styles from "./UpdateHotel.module.css";
import ScrollToTop from "../../../components/ScrollToTop";
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import LayoutPrimary from "layouts/LayoutPrimary";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "../../../module/hotel/Form";
import Button from "components/Button/Button";

const cx = classNames.bind(styles);

function UpdateHotel() {
  const location = useLocation();
  const [customer, setCustomer] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("userData"));

    return storageData ?? [];
  });

  const data = location.state.hotel;
  const putData = async (values) => {
    try {
      const res = await axios.put(
        `http://103.184.113.181:81/hotel/${data.id}`,
        JSON.stringify(values)
      );
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
  // console.log(data);
  return (
    <LayoutPrimary host>
      <ScrollToTop />

      <Formik
        initialValues={{
          id: data.id,
          name: "a Hotel",
          star_level: 4,
          address: {
            id: 126,
            district: "Quận Từ Liêm",
            province: "Hà Nội",
            detail_address: "98 Quận Từ Liêm, Hà Nội",
          },
          list_image: [
            {
              id: 554,
              url: "google.com",
              type: "hotel",
            },
            {
              id: 555,
              url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/59/4c/d3/hanoi-la-siesta-hotel.jpg",
              type: "hotel",
            },
            {
              id: 556,
              url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/27/30/e0/executive-suite-bedroom.jpg?w=900&h=-1&s=1",
              type: "hotel",
            },
            {
              id: 557,
              url: "https://chatbizfly.mediacdn.vn/2023/03/28backend_chat/_linkimagedefaultpng1679991208.png",
              type: "hotel",
            },
            {
              id: 558,
              url: "https://chatbizfly.mediacdn.vn/2023/03/28backend_chat/_linkimagedefaultpng1679991208.png",
              type: "hotel",
            },
          ],
        }}
        initialTouched={{
          field: true,
        }}
        validateOnMount
        onSubmit={(values, { resetForm, setSubmitting }) => {
          putData(values);
          console.log(values);
          // axios
          //   .put(
          //     `http://103.184.113.181:81/hotel/${data.id}`,
          //     JSON.stringify(values)
          //   )
          //   .then(function (response) {
          //     console.log(response);
          //   });
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={cx("sign-up__form")}>
            <Form></Form>
          </form>
        )}
      </Formik>
    </LayoutPrimary>
  );
}

export default UpdateHotel;
