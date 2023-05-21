import styles from "./HostProperties.module.css";
import React, { useEffect, useState } from "react";
import LayoutPrimary from "layouts/LayoutPrimary";
import classNames from "classnames/bind";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import axios from "axios";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function HostProperties() {
  const [customer, setCustomer] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("userData"));

    return storageData ?? [];
  });
  const [listHotels, setListHotels] = useState([]);
  const deleteHotel = (id) => {
    axios
      .delete(`http://103.184.113.181:81/hotel/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  useEffect(() => {
    axios
      .get(
        `http://103.184.113.181:81/customer/${customer.id}/hotels?page=1&limit=10`
      )
      .then(function (response) {
        setListHotels(response.data.items);
        console.log("succes");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [customer.id]);
  return (
    <LayoutPrimary host>
      <div className={cx("top-properties")}>
        <div className={cx("top-container")}>
          <h2>Listed Properties</h2>
          <Link to="/addproperties">
            <Button blue small>
              Add New
            </Button>
          </Link>
        </div>
        <div className={cx("properties-container")}>
          {listHotels
            ? listHotels.map((x) => (
                <Card
                  x={x}
                  key={x.id}
                  id={x.id}
                  desc={x.name}
                  thumbnail={x.list_image[0].url}
                  wishlists
                  host
                  deleteHotel={deleteHotel}
                >
                  {x.name}
                </Card>
              ))
            : null}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default HostProperties;
