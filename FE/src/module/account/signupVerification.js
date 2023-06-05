import React, { useState } from "react";
import styles from "./signupVerification.module.css";

import classNames from "classnames/bind";
import Button from "components/Button/Button";

const cx = classNames.bind(styles);

const SignupVerification = ({ handleOtp, checkOtp }) => {
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
    console.log(e.target.value);
  };
  console.log(checkOtp);
  return (
    <div className="flex flex-col justify-between gap-12">
      <h1 className="text-3xl font-bold text-white">
        We have send you otp code
      </h1>
      <div>
        <input className="px-4 py-2" onChange={handleChange} />
        {/* <div
          onClick={() => {
            handleOtp(code);
          }}
        >
          Check Otp
        </div> */}
      </div>
      {checkOtp === "Checking OTP successfully" ? (
        <Button green className="">
          Send Otp
        </Button>
      ) : (
        <Button green disabled={true} className="">
          Send Otp
        </Button>
      )}
    </div>
  );
};

export default SignupVerification;
