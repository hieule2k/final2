import styles from "./AddProperties.module.css";
import ScrollToTop from "../../../components/ScrollToTop";
import React, { useState } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import LayoutPrimary from "layouts/LayoutPrimary";
import { useNavigate } from "react-router-dom";
import Form from "../../../module/hotel/Form";

const cx = classNames.bind(styles);

function AddProperties() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("userData"));

    return storageData ?? [];
  });

  // const product = data[0];
  // const { images } = product;

  return (
    <LayoutPrimary host>
      <ScrollToTop />

      <Formik
        initialValues={{
          name: "Sunset",
          star_level: "4",
          rule: "",
          description: "",
          address: {
            detail_address: "1 Phùng Chí Kiên, Hà Nội",
            district: "Quận Cầu Giấy",
            province: "Hà Nội ",
          },
          list_image: [
            {
              url: "https://cf.bstatic.com/xdata/images/hotel/square600/46129592.webp?k=e23728804b1c260cf7c6e8cbc1ee4f917508f462ad3e3839f91a4138b9b2c686&o=&s=1",
              type: "hotel",
            },
            {
              url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/310596687.jpg?k=4aadd27e94206405b1cac5056006dd7ea63e075e29077d3c8f199d333b2f6727&o=&hp=1",
              type: "user",
            },
            {
              url: "https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=600",
              type: "user",
            },
            {
              url: "https://images.pexels.com/photos/13740128/pexels-photo-13740128.jpeg?auto=compress&cs=tinysrgb&w=600",
              type: "user",
            },
            {
              url: "https://images.pexels.com/photos/14011091/pexels-photo-14011091.jpeg?auto=compress&cs=tinysrgb&w=600",
              type: "user",
            },
            {
              url: "https://images.pexels.com/photos/14011091/pexels-photo-14011091.jpeg?auto=compress&cs=tinysrgb&w=600",
              type: "user",
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
            .post(
              `http://103.184.113.181:81/customer/${customer.id}/hotel`,
              JSON.stringify(values)
            )
            .then(function (response) {
              const hotelDataJson = JSON.stringify(response.data.id);
              localStorage.setItem("hotelData", hotelDataJson);
              navigate("/AddRooms1", {
                state: {
                  value: "addproperty1",
                },
              });
            })
            .catch(function (error) {
              console.log(error);
            });

          setTimeout(() => {
            resetForm({
              name: "",
              star_level: "3",
              rate: "2",
              rule: "",
              description: "",
              comment: "",
              address: {
                detail_address: "",
                district: "",
                province: "",
              },
              list_image: [
                {
                  url: "ngon.com",
                  type: "hotel",
                },
                {
                  url: "kongon.com",
                  type: "user",
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

export default AddProperties;
