import React, { useState } from "react";
import styles from "./Admin.module.css";
import "@fontsource/mulish"; // Import font
import classNames from "classnames/bind";
import {
  AiOutlineMore,
  AiOutlineSearch,
  AiOutlineFilter,
  AiOutlineBell,
} from "react-icons/ai";
import { BsSortUp, BsSortDownAlt } from "react-icons/bs";
import user from "../../assets/img/Vector.png";
import Button from "../../components/Button/Button";

const cx = classNames.bind(styles);
const customer = [
  {
    id: 1,
    name: "Wasif Hotel",
    update: "5 days ago",
    customername: "Wasif",
    date: "25/10/2022",
    time: "6:30 PM",
    status: "Approve",
    color: "green",
  },
  {
    id: 2,
    name: "Ali",
    update: "3 days ago",
    customername: "Ali",
    date: "05/1/2022",
    time: "6:30 PM",
    status: "Cancel",
    color: "red",
  },
  {
    id: 3,
    name: "Saad",
    update: "2 days ago",
    customername: "Saad",
    date: "09/10/2021",
    time: "6:30 PM",
    status: "Approve",
    color: "green",
  },
  {
    id: 4,
    name: "Asad",
    update: "1 days ago",
    customername: "Asad",
    date: "01/03/2023",
    time: "6:30 PM",
    status: "Pending",
    color: "yeallow",
  },
  {
    id: 5,
    name: "Asad",
    update: "1 days ago",
    customername: "Asad",
    date: "01/03/2023",
    time: "6:30 PM",
    status: "Pending",
    color: "yeallow",
  },
  {
    id: 6,
    name: "Asad",
    update: "1 days ago",
    customername: "Asad",
    date: "01/03/2023",
    time: "6:30 PM",
    status: "Pending",
    color: "yeallow",
  },
];

function Admin() {
  return (
    <div className={cx("wrapper")}>
      <aside className={cx("aside")}>
        <h2 className={cx("h2")}>Sidebar</h2>
        <div className={cx("tab_bar")}>Overview</div>
        <div className={cx("tab_bar")}>Booking Request</div>
        <div className={cx("tab_bar")}>Users</div>
        <div className={cx("tab_bar")}>Hosts</div>
      </aside>
      <main>
        <nav>
          <h1 className={cx("h1")}> Management Booking Request </h1>
          <div className={cx("nav_right")}>
            <div className={cx("noti_icon")}>
              <AiOutlineBell></AiOutlineBell>
            </div>
            <div> Hieudandon</div>
            <img className={cx("user-avatar")} src={user} alt="no img" />
          </div>
        </nav>
        <div className={cx("table-container")}>
          <table>
            <caption>
              <div className={cx("sub_nav")}>
                <h3 className={cx("h3")}> Details </h3>
                <div className={cx("nav_icon")}>
                  <input
                    className={cx("input")}
                    type="text"
                    autoFocus
                    placeholder="a"
                  ></input>
                  <AiOutlineSearch className={cx("icon")}></AiOutlineSearch>
                  <AiOutlineFilter className={cx("icon")}></AiOutlineFilter>
                  <BsSortUp className={cx("icon")}></BsSortUp>
                  <BsSortDownAlt className={cx("icon")}></BsSortDownAlt>
                </div>
              </div>
            </caption>
            <thead>
              <tr>
                <th> Id </th>
                <th> Hotel</th>
                <th> Customer Name </th>
                <th> Date </th>
                <th> Status </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customer.map((cst) => (
                <tr key={cst.id} className={cx("customer")}>
                  <td>{cst.id}</td>
                  <td>
                    <p>{cst.name}</p>
                    <p className={cx("sub_infor")}>{cst.update}</p>
                  </td>
                  <td>
                    <p>{cst.customername}</p>
                    <p className={cx("sub_infor")}>{cst.update}</p>
                  </td>
                  <td>
                    <p>{cst.date}</p>
                    <p className={cx("sub_infor")}>{cst.time}</p>
                  </td>
                  <td>
                    <Button
                      rounded
                      small
                      green
                      className={cx("button", cst.color)}
                    >
                      {cst.status}
                    </Button>
                  </td>
                  <td>
                    <AiOutlineMore></AiOutlineMore>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Admin;
