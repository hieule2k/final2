import React from "react";
import styles from "./AddProperties4.module.css";
import classNames from "classnames/bind";
import InputRadio from "../InputRadio/InputRadio";
import Button from "../Button/Button";
const cx = classNames.bind(styles);

function AddProperties4({ handleChangeTab }) {
  const resetTab = () => {
    alert("Successfull");
    handleChangeTab("addproperty1");
  };
  return (
    <div>
      <div className={cx("add4-content-container")}>
        <h1 id={styles["title"]}>Information can be added in similar way.</h1>
        <p>
          The other required information can be added in a similar presentation
          for listing the property fluently...
        </p>
        <Button
          className={cx("save")}
          medium
          secondary
          rounded
          onClick={resetTab}
        >
          Post My Property
        </Button>
      </div>
    </div>
  );
}

export default AddProperties4;
