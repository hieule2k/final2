import React, { useState } from "react";
import styles from "./SignUp.module.css";

import { AiOutlineClose } from "react-icons/ai";

import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import FormikSignUp from "../../../components/FormikSignUp/FormikSignUp";
const cx = classNames.bind(styles);
function SignUp({ getData }) {
  return (
    <div className={cx("sign-up")}>
      {/* <div className={cx("sign-up__top")}>
        <h1 className={cx("heading")}>Sign-Up</h1>
        <Link to="/" className={cx("close-icon__container")}>
          <AiOutlineClose />
        </Link>
      </div> */}
      {/* <div className={cx("sign-up__intro")}>Let's get you started</div>
      <div className={cx("sign-up__desc")}>Sign up with your information</div> */}
      <FormikSignUp getData={getData} />
      {/* <p className={cx("or")}>or</p>
      <button className={cx("sign-up__alt--fb")}>Sign up with FaceBook</button>
      <button className={cx("sign-up__alt--google")}>
        Sign up with Google
      </button> */}
    </div>
  );
}

export default SignUp;
