
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
        const storageData = JSON.parse(localStorage.getItem('userData'));


    return storageData ?? [];
  });

  // const product = data[0];
  // const { images } = product;


    return (
        <LayoutPrimary host>
            <ScrollToTop />


      <Formik
        initialValues={{
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
