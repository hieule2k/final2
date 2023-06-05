import React, { useEffect, useState } from "react";
import styles from "./LoginHost.module.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

import classNames from "classnames/bind";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import MyInput from "../../../components/MyInput/MyInput";

import jwt_decode from "jwt-decode";

const cx = classNames.bind(styles);
function Login1() {
  const [currentAccount, setCurrentAccount] = useState(false);

  const [value] = useState([]);

  useEffect(() => {
    // console.log(value);
  }, [value]);

  const handleContinue = () => {
    setCurrentAccount(!currentAccount);
  };
  return (
    <div className={cx("login")}>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        initialTouched={{
          field: true,
        }}
        validateOnMount
        validationSchema={Yup.object(
          !currentAccount
            ? {
                username: Yup.string().required("Required"),
              }
            : {
                password: Yup.string().required("required"),
              }
        )}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            axios
              .post(
                "http://103.184.113.181:90/authentication/login",
                JSON.stringify(values)
              )
              .then(function (response) {
                console.log(response.data.jwt_token);
                const decoded = jwt_decode(response.data.jwt_token);
                console.log(decoded);

                axios
                  .get(`http://103.184.113.181/customer/${decoded.customer_id}`)
                  .then(function (response) {
                    if (response.data.role === "host") {
                      const userDataJson = JSON.stringify(response.data);
                      localStorage.setItem("userData", userDataJson);
                      window.location.href = "/HostPage";
                    } else {
                      console.log("this is not a host Account");
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              })
              .catch(function (error) {
                alert(
                  "Please check your password and User Name and try again."
                );
                console.log(error.toJSON());
              });
            setSubmitting(false);
          }, 1);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            id="myform"
            className={cx("login-form")}
          >
            <div className={cx("col-left")}>
              <div className={cx("input-container")}>
                <MyInput
                  label="User Name"
                  type="text"
                  name="username"
                  className={cx("phonenumber")}
                  placeholder={"Enter your name"}
                ></MyInput>
                <MyInput
                  label="Password"
                  type="password"
                  name="password"
                  className={cx("password")}
                  placeholder={"Enter your password"}
                ></MyInput>
              </div>
              {/* <p className={cx("login-note")}>
                We’ll call or text you to confirm your number. Standard message
                and data rates apply.
              </p> */}
              <div className={cx("button-container")}>
                <Button
                  className={cx("disabled")}
                  type="submit"
                  fourth
                  green
                  onClick={handleContinue}
                  rounded
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {formik.isSubmitting ? <div></div> : <span>Login</span>}
                </Button>
                <div style={{ fontSize: "14px", color: "#a3a6aa" }}>
                  Need an account?
                  <Link to="/SignUpHost">
                    <span
                      style={{
                        color: "#00b0f4",
                        fontSize: "14px",
                        marginLeft: "3px",
                      }}
                    >
                      Register
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={cx("or")}>or</div>
            <div className={cx("col-right")}>
              <div className={cx("button-alt-container")}>
                <Button
                  href="https://www.facebook.com/"
                  medium
                  black
                  className={cx("button-alt")}
                >
                  Log In with Facebook
                </Button>
                <Button
                  href="https://mail.google.com/"
                  medium
                  black
                  className={cx("button-alt")}
                >
                  Log In with Gmail
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login1;
