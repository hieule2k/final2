import React, { useEffect, useState } from "react";
import styles from "../../module/table/table.module.css";
import classNames from "classnames/bind";
import Button from "components/Button/Button";
import { BiBuilding } from "react-icons/bi";
import { AiOutlinePhone } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

const DetailTable = ({
  reserve = false,
  title = "",
  detailsHotel = [],
  id,
}) => {
  const isLogin = JSON.parse(localStorage.getItem("userData"));
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const reserveStorage = () => {
    if (isLogin) {
      navigate("/ReservationForm", { state: { hotelData: detailsHotel } });
    } else if (!isLogin) {
      alert("Please login first");
    }
  };

  useEffect(() => {
    axios
      .get(`http://103.184.113.181:82/hotel/${id}/rooms?page=1&limit=10`)
      .then(function (response) {
        // console.log(response);
        setRooms(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  const singleRoom = rooms.filter((room) => room.type === "Single");
  const doubleRoom = rooms.filter((room) => room.type === "Double");
  const vipRoom = rooms.filter((room) => room.type === "VIP");
  const update = {
    id: 42,
    name: "Moon Hotel",
    star_level: 4,
    address: {
      id: 126,
      district: "Quận Từ Liêm",
      province: "Hà Nội",
      detail_address: "98 Quận Từ Liêm, Hà Nội",
    },
    list_image: [
      {
        id: 554,
        url: "google.com",
        type: "hotel",
      },
      {
        id: 555,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/59/4c/d3/hanoi-la-siesta-hotel.jpg",
        type: "hotel",
      },
      {
        id: 556,
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/27/30/e0/executive-suite-bedroom.jpg?w=900&h=-1&s=1",
        type: "hotel",
      },
      {
        id: 557,
        url: "https://chatbizfly.mediacdn.vn/2023/03/28backend_chat/_linkimagedefaultpng1679991208.png",
        type: "hotel",
      },
      {
        id: 558,
        url: "https://chatbizfly.mediacdn.vn/2023/03/28backend_chat/_linkimagedefaultpng1679991208.png",
        type: "hotel",
      },
    ],
  };
  const putData = async () => {
    try {
      const res = await axios.put(
        `http://103.184.113.181:81/hotel/42`,
        JSON.stringify(update)
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cx("side-bar")}>
      <div className={cx("price-range")}>{title}</div>
      <div className={cx("price-container")}>
        <table className={cx("table")}>
          <tbody>
            <tr>
              <td>Single:</td>
              {singleRoom.length === 1 ? (
                singleRoom.map((val) => <td key={val.id}>{val.price}</td>)
              ) : (
                <td>Not avaible</td>
              )}
            </tr>
            <tr>
              <td>Double:</td>
              {doubleRoom.length === 1 ? (
                doubleRoom.map((val) => <td key={val.id}>{val.price}</td>)
              ) : (
                <td>Not avaible</td>
              )}
            </tr>
            <tr>
              <td>VIP:</td>
              {vipRoom.length === 1 ? (
                vipRoom.map((val) => <td key={val.id}>{val.price}</td>)
              ) : (
                <td>Not avaible</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      {reserve && (
        <Button large black rounded onClick={reserveStorage}>
          Reserve Now
        </Button>
      )}
      <div className={cx("contact")}>
        <div className={cx("contact-information")}>
          <div className={cx("contact-name")}>Property Inquiry</div>
          <i className={cx("contact-icon")}>
            <BiBuilding />
          </i>
        </div>
        <div className={cx("contact-information")}>
          <div className={cx("contact-name")}>Contact Host</div>
          <i className={cx("contact-icon")}>
            <AiOutlinePhone />
          </i>
        </div>
      </div>
    </div>
  );
};

export default DetailTable;
