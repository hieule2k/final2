import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import styles from "./FormikSignUp.module.css";
import axios from "axios";
import * as Yup from "yup";
import MyInput from "../../components/MyInput/MyInput";
import InputRadio from "../InputRadio/InputRadio";
import RadioFormik from "../RadioFormik/RadioFormik";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function FormikSignUp({ host = false }) {
  // const [data, setData] = useState([]);
  // useEffect(() => {

  // .catch(function (error) {
  //   console.log(error);
  // });
  // }, [data]);
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  const navigate = useNavigate();
  let role = "customer";
  if (host) {
    role = "host";
  }
  return (
    <div className={cx("sign-up")}>
      <Formik
        initialValues={{
          role: role,
          description: "abcxyz",
          user: {
            name: "",
            email: "",
            phone: "",
            gender: "",
            account: {
              username: "",
              password: "",
            },
          },
        }}
        initialTouched={{
          field: true,
        }}
        validateOnMount
        validationSchema={Yup.object().shape({
          user: Yup.object().shape({
            name: Yup.string().required("Required"),
            email: Yup.string().email().required("Required"),
            phone: Yup.string()
              .matches(phoneRegExp, "Must be A Phone Number")
              .required("Required"),
            account: Yup.object().shape({
              username: Yup.string().required("Required"),
              password: Yup.string().required("Required"),
            }),
          }),
        })}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);

          setTimeout(() => {
            // setSignUpAccount(() => {
            //   const newData = [...signUpAccount, values];
            //   const jsonData = JSON.stringify(newData);
            //   localStorage.setItem("signUpAccount", jsonData);
            // });
            axios
              .post("http://103.184.113.181/customer", JSON.stringify(values))
              .then(function (response) {
                console.log(response);
                console.log("succes");
              })
              .catch(function (error) {
                console.log(error);
              });
            console.log(JSON.stringify(values));
            navigate(host ? "/LoginHost" : "/login1");
            resetForm({
              role: role,
              description: "",
              user: {
                name: "",
                email: "",
                phone: "",
                gender: "",
                account: {
                  username: "",
                  password: "",
                },
                address: {
                  number: "",
                  street: "",
                  village: " ",
                  district: " ",
                  province: " ",
                },
              },
            });

            setSubmitting(false);
          }, 1000);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={cx("sign-up__form")}>
            <div className={cx("wrapper")}>
              <div className={cx("col-left")}>
                <MyInput
                  type="text"
                  label="Full Name"
                  className={cx("input")}
                  name="user.name"
                  placeholder="Enter your Full Name"
                ></MyInput>

                <MyInput
                  type="email"
                  label="Email Address"
                  className={cx("input")}
                  name="user.email"
                  placeholder="Enter your email"
                ></MyInput>

                <MyInput
                  type="password"
                  label="Password"
                  className={cx("input")}
                  name="user.account.password"
                  placeholder="Enter your password"
                ></MyInput>
              </div>
              <div className={cx("col-right")}>
                <MyInput
                  type="text"
                  label="User Name"
                  className={cx("input")}
                  name="user.account.username"
                  placeholder="Enter your name"
                ></MyInput>
                <MyInput
                  type="text"
                  label="Phone Number"
                  className={cx("input")}
                  name="user.phone"
                  placeholder="Enter your number"
                ></MyInput>
                <div className={cx("container-parent")}>
                  <div className={cx("container")}>
                    <div className={cx("gender")}>Gender</div>
                    <div className={cx("radio-container")}>
                      <RadioFormik origin name="user.gender" value="Male">
                        Male
                      </RadioFormik>
                      <RadioFormik origin name="user.gender" value="Female">
                        Female
                      </RadioFormik>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className={cx("sign-up__button", "disabled")}
              type="submit"
              fourth
              rounded
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? <div></div> : <span>Create Account</span>}
            </Button>
            <div style={{ fontSize: "14px", color: "#a3a6aa" }}>
              Already have an account
              <Link to={!host ? "/Login1" : "/LoginHost"}>
                <span
                  style={{
                    color: "#00b0f4",
                    fontSize: "14px",
                    marginLeft: "3px",
                  }}
                >
                  Log in
                </span>
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default FormikSignUp;
