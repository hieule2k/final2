import styles from "./Reservation.module.css";
import ReservationPaymentMethod from "../../../components/ReservationPaymentMethod/ReservationPaymentMethod";
import ReservationFormFirst from "../../../components/ReservationFormFirst/ReservationFormFirst";
import React, { useState } from "react";
import LayoutPrimary from "layouts/LayoutPrimary";
import classNames from "classnames/bind";
import Button from "../../../components/Button/Button";

const cx = classNames.bind(styles);
function ReservationForm() {
  const [status, setStatus] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("status"));

    return storageData ?? [];
  });
  const [id, setId] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("userData"));

    return storageData ?? [];
  });

  const [checkBill, setCheckBill] = useState(true);
  const handleSetCheckBill = (x) => {
    setCheckBill(!checkBill);
    // const z = { id: id.id, hotel: x };
    // setStatus((prev) => {
    //   const newData = [...prev, z];
    //   const jsonData = JSON.stringify(newData);
    //   localStorage.setItem("status", jsonData);
    //   return newData;
    // });
    // localStorage.removeItem("rooms");
  };

  return (
    <LayoutPrimary>
      <div className={cx("reservation-container")}>
        <div className={cx("col-left")}>
          <h1 className={cx("h1")}>
            Reservation <br /> Form Details
          </h1>
          <Button medium black rounded>
            Go To Home
          </Button>
        </div>
        <div className={cx("col-right")}>
          {checkBill ? (
            <ReservationFormFirst handleSetCheckBill={handleSetCheckBill} />
          ) : (
            <ReservationPaymentMethod
              handleSetCheckBill={() => {
                setCheckBill(!checkBill);
              }}
            />
          )}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default ReservationForm;
