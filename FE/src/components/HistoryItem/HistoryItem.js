import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./HistoryItem.module.css";
import avatar from "../../assets/img/avatar.jpg";
import Button from "../Button/Button";
import axios from "axios";
import Modal from "../../module/modal/Modal";
import { useDispatch } from "react-redux";
import { deleteHistoryBooking } from "features/booked/historyBookingSlice";
import BookingModal from "module/modal/bookingModal";

const cx = classNames.bind(styles);

function HistoryItem({
  host = false,
  past = false,
  userId,
  item,
  userName,
  // handleCancelReservation,
}) {
  const dispatch = useDispatch();
  const { id, book_date, total_price, hotel } = item;
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  console.log(isOpen);

  const handleModalVisible = () => {
    setVisible(!visible);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={cx("history-item")}>
      {visible && (
        <Modal
          handleModalVisible={handleModalVisible}
          userId={userId}
          // hotel={hotelData}
          userName={userName}
        ></Modal>
      )}

      {isOpen && <BookingModal closeModal={closeModal} item={item} />}

      <div className={cx("item-container")}>
        <div className={cx("col-left")} onClick={openModal}>
          <div className={cx("img-container")}>
            <img
              src="https://media-cdn.tripadvisor.com/media/photo-s/1c/59/4c/d3/hanoi-la-siesta-hotel.jpg"
              alt="No img"
              className={cx("image")}
            />
          </div>
          <div className={cx("item-information")}>
            <div className={cx("item-title")}>{hotel.name}</div>
            <div className={cx("item-specific")}>
              <div className={cx("specific")}>
                Booked Date:{" "}
                <span className={cx("time")}>{book_date.split(" ")[0]}</span>
              </div>

              {/* <div className={cx("specific")}>
                Check out: <span className={cx("time")}>12 Mar 2021</span>
              </div> */}
            </div>
            <div className={cx("item-price")}>{total_price} $</div>
          </div>
        </div>
        <div className={cx("col-right")}>
          {host ? (
            <div className={cx("button-container")}>
              <Button small green rounded>
                Approved
              </Button>
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
                    dispatch(deleteHistoryBooking({ itemId: item.id }));
                  }}
                >
                  Cancel Reservation
                </Button>
              )}
              {item.status === "completed" && (
                <Button medium green orange onClick={handleModalVisible}>
                  Review
                </Button>
              )}
              {item.status === "cancelled" && (
                <Button className={cx("cancelled")} medium red>
                  Cancelled
                </Button>
              )}
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
