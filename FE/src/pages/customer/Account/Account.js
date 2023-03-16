import React, { useEffect, useState } from "react";
import styles from "./Account.module.css";
import NavBar from "../../../components/nav/nav";
import Footer from "../../../components/footer/footer";
import avatar from "../../../assets/img/Vector.png";
import * as Yup from "yup";
import axios from "axios";
import { Formik } from "formik";
import MyInput from "../../../components/MyInput/MyInput";
import { AiOutlineCheck, AiFillStar, AiOutlineClose } from "react-icons/ai";

import classNames from "classnames/bind";
import Button from "../../../components/Button/Button";

const cx = classNames.bind(styles);
function Account() {
  const [account, setAccount] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("userData"));

    return storageData ?? false;
  });
  const [accountData, setAccountData] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const { name } = account.user;
  const handleEdit = () => {
    setEditProfile(!editProfile);
  };
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  useEffect(() => {
    axios
      .get(`http://103.184.113.181//customer/${account.id}`)
      .then(function (response) {
        setAccountData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [account.id]);
  return (
    <div className={cx("account")}>
      <NavBar />
      <div className={cx("account-container")}>
        <div className={cx("col-left")}>
          <img className={cx("account-avatar")} src={avatar} alt="hieu" />
          <p className={cx("upload")}>Upload a Photo</p>
          {/* <input type="file" /> */}
          <div className={cx("account-verification__container")}>
            <div className={cx("account-verification")}>
              Identity Verification
            </div>
            <div className={cx("account-verification__desc")}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </div>
          </div>
          <div className={cx("account-status__container")}>
            <h2 className={cx("account-status")}>Hieu Le</h2>
            <div className={cx("email-status")}>
              <AiOutlineCheck />
              Email Confirmed
            </div>
            <div className={cx("mobile-status")}>
              <AiOutlineCheck />
              Mobile Confirmed
            </div>
          </div>
        </div>
        <div className={cx("col-right")}>
          <div className={cx("account-information")}>
            <h2 className={cx("account-name")}>Hello, {name} </h2>
            <div className={cx("account-regis-date")}>Joined in 2021</div>
          </div>
          {!editProfile ? (
            <div className={cx("wrapper")}>
              <Button outline transparent onClick={handleEdit}>
                Edit Profile
              </Button>
              <div className={cx("account-review")}>
                <i>
                  <AiFillStar />
                </i>
                <div className={cx("review")}>0 reviews</div>
              </div>
              <div className={cx("reviewed-by")}>Reviewed By You</div>
            </div>
          ) : (
            <Formik
              initialValues={accountData}
              initialTouched={{
                field: true,
              }}
              validateOnMount
              // validationSchema={Yup.object().shape({
              //   user: Yup.object().shape({
              //     name: Yup.string().required("Required"),
              //     email: Yup.string().email().required("Required"),
              //     phone: Yup.string()
              //       .matches(phoneRegExp, "Must be A Phone Number")
              //       .required("Required"),
              //     account: Yup.object().shape({
              //       username: Yup.string().required("Required"),
              //       password: Yup.string().required("Required"),
              //     }),
              //   }),
              // })}

              onSubmit={(values, { resetForm, setSubmitting }) => {
                // console.log(values);
                setTimeout(() => {
                  //   // setSignUpAccount(() => {
                  //   //   const newData = [...signUpAccount, values];
                  //   //   const jsonData = JSON.stringify(newData);
                  //   //   localStorage.setItem("signUpAccount", jsonData);
                  //   // });
                  console.log(JSON.stringify(values));
                  console.log(accountData.id);
                  axios
                    .put(
                      `http://103.184.113.181/customer/${accountData.id}`,
                      JSON.stringify(values)
                    )
                    .then(function (response) {
                      console.log(response);
                      console.log("succes");
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                  // console.log(JSON.stringify(values));
                  // navigate(host ? "/LoginHost" : "/login1");

                  setSubmitting(false);
                }, 1000);
              }}
            >
              {(formik) => (
                <form
                  onSubmit={formik.handleSubmit}
                  className={cx("sign-up__form")}
                >
                  <MyInput
                    type="text"
                    label="Full Name"
                    account
                    className={cx("input")}
                    name="user.name"
                    placeholder="Enter your number"
                  ></MyInput>
                  <MyInput
                    type="text"
                    label="Email"
                    account
                    className={cx("input")}
                    name="user.email"
                    placeholder="Enter your Email "
                  ></MyInput>

                  <MyInput
                    type="text"
                    label="Phone Number"
                    account
                    className={cx("input")}
                    name="user.phone"
                    placeholder="Enter your number"
                  ></MyInput>

                  {/* <MyInput
                    type="text"
                    label="Location"
                    account
                    className={cx("input")}
                    name="user.address"
                    placeholder="Enter your number"
                  ></MyInput> */}
                  <br />
                  {/* <label>
                    Work
                    <br />
                    <input className={cx("input")} type="text" name="work" />
                  </label>
                  <br /> */}
                  <div className={cx("form-bottom")}>
                    <div className={cx("form-desc")}>
                      All the required user information can be added here...
                    </div>
                    <div className={cx("button-container")}>
                      <Button
                        leftIcon={<AiOutlineClose />}
                        onClick={handleEdit}
                        transparent
                        className={cx("button")}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        // onClick={handleEdit}
                        fourth
                        className={cx("button")}
                        // disabled={!formik.isValid || formik.isSubmitting}
                      >
                        Save
                      </Button>
                    </div>
                  </div>

                  {/* <Button
                    className={cx("sign-up__button", "disabled")}
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Sign Up
                  </Button> */}
                </form>
              )}
            </Formik>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;
