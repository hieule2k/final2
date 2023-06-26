import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./HistoryItem.module.css";
import avatar from "../../assets/img/avatar.jpg";
import Button from "../Button/Button";
import axios from "axios";
import Modal from "../../module/modal/Modal";

const cx = classNames.bind(styles);

function HistoryItem({
  host = false,
  past = false,
  userId,
  item,
  userName,
  removeItem,
  handleCancelReservation,
}) {
  const { id, book_date, total_price } = item;
  const [visible, setVisible] = useState(false);

  const [hotelData, setHotelData] = useState([]);
  const handleModalVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const handleFetchHotelData = async () => {
      try {
        const res = await axios.get(`http://103.184.113.181:81/hotel/${id}`);
        console.log(res.data);
        setHotelData(res.data);
      } catch (error) {
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
      }
    };
    handleFetchHotelData();
  }, [id]);
  return (
    <div className={cx("history-item")}>
      {visible && (
        <Modal
          handleModalVisible={handleModalVisible}
          userId={userId}
          hotel={hotelData}
          userName={userName}
        ></Modal>
      )}

      <div className={cx("item-container")}>
        <div className={cx("col-left")}>
          <div className={cx("img-container")}>
            <img
              src="https://media-cdn.tripadvisor.com/media/photo-s/1c/59/4c/d3/hanoi-la-siesta-hotel.jpg"
              alt="No img"
              className={cx("image")}
            />
          </div>
          <div className={cx("item-information")}>
            <div className={cx("item-title")}>{hotelData.name}</div>
            <div className={cx("item-specific")}>
              <div className={cx("specific")}>
                Check In:{" "}
                <span className={cx("time")}>{book_date.split(" ")[0]}</span>
              </div>

              {/* <div className={cx("specific")}>
                Check out: <span className={cx("time")}>12 Mar 2021</span>
              </div> */}
            </div>
            <div className={cx("item-price")}>{total_price} VND</div>
          </div>
        </div>
        <div className={cx("col-right")}>
          {host ? (
            <div className={cx("button-container")}>
              <Button small green rounded>
                Approved
              </Button>
              {/* <Button small black rounded>
                Approve
              </Button> */}
            </div>
          ) : (
            <div className={cx("button-wrapper")}>
              {item.status === "completed" && (
                <Button
                  mediumx
                  rounded
                  bgGray
                  className={cx("button-size")}
                  onClick={() => {
                    handleCancelReservation(item.id);
                  }}
                >
                  Cancel Reservation
                </Button>
              )}
              <Button medium green orange onClick={handleModalVisible}>
                Review
              </Button>
              {past && (
                <Button
                  mediumx
                  textBlack
                  className={cx("button-size", "review")}
                >
                  Rate & Review
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryItem;
