import React, { useState } from "react";
import styles from "./SignUpHost.module.css";

import { AiOutlineClose } from "react-icons/ai";

import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import FormikSignUp from "../../../components/FormikSignUp/FormikSignUp";
const cx = classNames.bind(styles);
function SignUp({ getData }) {
  return (
    <div className={cx("sign-up")}>
      <FormikSignUp host />
    </div>
  );
}

export default SignUp;
