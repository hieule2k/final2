import styles from "./UpdateHotel.module.css";
import ScrollToTop from "../../../components/ScrollToTop";
import React, { useState } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import LayoutPrimary from "layouts/LayoutPrimary";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "../../../module/hotel/Form";

const cx = classNames.bind(styles);

function UpdateHotel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [customer, setCustomer] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("userData"));

    return storageData ?? [];
  });
  const data = location.state.hotel;
  // const product = data[0];
  // const { images } = product;
  console.log(data);
  return (
    <LayoutPrimary host>
      <ScrollToTop />

      <Formik
        initialValues={{
          id: data.id,
          name: data.name,
          star_level: 4,
          address: {
            id: data.address.id,
            district: data.address.district,
            province: data.address.province,
            detail_address: data.address.detail_address,
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
              url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/27/30/e0/executive-suite-bedroom.pg?w900&h=-1&s=1",
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
        validationSchema={Yup.object({})}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          axios
            .put(
              `http://103.184.113.181:81/hotel/${data.id}`,
              JSON.stringify(values)
            )
            .then(function (response) {
              // const hotelDataJson = JSON.stringify(response.data.id);
              // localStorage.setItem("hotelData", hotelDataJson);
              // navigate("/AddRooms1", {
              //   state: {
              //     value: "addproperty1",
              //   },
              // });
              console.log("success");
            })
            .catch(function (error) {
              console.log(error);
              console.log(values);
            });

          setTimeout(() => {
            resetForm({
              id: data.id,
              name: data.name,
              star_level: 4,
              address: {
                id: data.address.id,
                district: data.address.district,
                province: data.address.province,
                detail_address: data.address.detail_address,
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
                  url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/27/30/e0/executive-suite-bedroom.pg?w900&h=-1&s=1",
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
            });

            setSubmitting(false);
          }, 1000);
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