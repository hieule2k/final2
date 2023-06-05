import styles from "../Details/Details.module.css";
import React, { useEffect, useState } from "react";
import map from "../../../assets/img/map.jpg";
import LayoutPrimary from "layouts/LayoutPrimary";
import ImageGallery from "../../../components/ImageGallery/ImageGallery";
import classNames from "classnames/bind";
import Button from "../../../components/Button/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TbToolsKitchen } from "react-icons/tb";
import { MdBalcony, MdOutlineHealthAndSafety } from "react-icons/md";
import { GiWashingMachine } from "react-icons/gi";
import { FaDesktop } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { BiBuilding } from "react-icons/bi";
import {
  AiOutlineWifi,
  AiOutlineShareAlt,
  AiOutlinePhone,
  AiOutlineHeart,
  AiOutlineArrowRight,
  AiFillStar,
  AiFillHeart,
} from "react-icons/ai";
import DetailTable from "module/table/DetailTable";
import { IconContext } from "react-icons";
// import data5 from "../../json/hotel3.json";
// import data4 from "../../json/hotel6.json";
// import data3 from "../../json/hotelTopRated.json";
// import data2 from "../../json/hotelNearby.json";
// import data from "../../json/hotel.json";

const cx = classNames.bind(styles);

function Details({ wishlist, handleLike }) {
  const [status, setStatus] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("rooms"));

    return storageData ?? [];
  });
  const [comments, setComments] = useState([]);
  const [detailsHotel, setDetailsHotel] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://103.184.113.181:81/hotel/${id}`)
      .then(function (response) {
        setDetailsHotel(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://103.184.113.181:81/hotel/56/comments?page=1&limit=4`)
      .then(function (response) {
        setComments(response.data.items);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const { name, address, list_image } = detailsHotel;
  const itemExist = wishlist
    ? wishlist.find((exa) => exa.id === detailsHotel.id)
    : false;
  console.log(detailsHotel);
  return (
    <LayoutPrimary>
      <ImageGallery />
      <div className={cx("details-container")}>
        <div className={cx("col-left")}>
          <div className={cx("top-title")}>
            <div className={cx("top-left")}>
              <h3 className={cx("top-heading")}>{name}</h3>
              {/* <p className={cx("top-desc")}>{address.street}</p> */}
            </div>
            <div className={cx("top-icon")}>
              <i
                className={cx("top-heart__icon")}
                onClick={() => {
                  handleLike(detailsHotel);
                }}
              >
                {itemExist ? (
                  <IconContext.Provider value={{ color: "red" }}>
                    <AiFillHeart />
                  </IconContext.Provider>
                ) : (
                  <AiOutlineHeart />
                )}
              </i>
              <i className={cx("top-share__icon")}>
                <AiOutlineShareAlt />
              </i>
            </div>
          </div>
          {/* <div className={cx("main-amanities")}>
            {detailRoom.map((detail) => (
              <div key={detail.id} className={cx("amanitie")}>
                <i className={cx("amanitie-icon")}>
                  <BiBed />
                </i>
                <div className={cx("amanitie-desc")}>
                  {detail.total} {detail.name}
                </div>
              </div>
            ))}
          </div> */}
          {/* <div className={cx("details-description")}>
            <h2 className={cx("description-heading")}>Apartment Description</h2>
            <p className={cx("description-desc")}>
              {description}
              <br />
              <br />
              {description}
            </p>
          </div> */}
          <div className={cx("offered-amenities")}>
            <div className={cx("heading")}>Offered Amenities</div>
            <div className={cx("offered-amenities-container")}>
              <div className={cx("offered-icon__wrapper")}>
                <i className={cx("offered-icon")}>
                  <TbToolsKitchen />
                </i>
                <p className={cx("offered-name")}>Kitchen</p>
              </div>
              <div className={cx("offered-icon__wrapper")}>
                <i className={cx("offered-icon")}>
                  <FaDesktop />
                </i>
                <p className={cx("offered-name")}>Television with Netflix</p>
              </div>
              <div className={cx("offered-icon__wrapper")}>
                <i className={cx("offered-icon")}>
                  <BsSnow />
                </i>
                <p className={cx("offered-name")}>Air Conditioner</p>
              </div>
              <div className={cx("offered-icon__wrapper")}>
                <i className={cx("offered-icon")}>
                  <AiOutlineWifi />
                </i>
                <p className={cx("offered-name")}>Free Wireless Internet</p>
              </div>
              <div className={cx("offered-icon__wrapper")}>
                <i className={cx("offered-icon")}>
                  <GiWashingMachine />
                </i>
                <p className={cx("offered-name")}>Washer</p>
              </div>
              <div className={cx("offered-icon__wrapper")}>
                <i className={cx("offered-icon")}>
                  <MdBalcony />
                </i>
                <p className={cx("offered-name")}>Balcony or Patio</p>
              </div>
            </div>
            <div className={cx("show-more__amenitites")}>
              <Button outline mediumx textBlack backGroundWhite>
                Show All 10 Amenities
              </Button>
            </div>
          </div>
          <div className={cx("safety")}>
            <h2 className={cx("heading", "safety-heading")}>
              Safety and Hygiene
            </h2>
            <div className={cx("safety-wrapper")}>
              <div className={cx("safety-icon__container")}>
                <i className={cx("safety-icon")}>
                  <MdOutlineHealthAndSafety />
                </i>
                <p className={cx("safety-name")}>Daily Cleaning</p>
              </div>
              <div className={cx("safety-icon__container")}>
                <i className={cx("safety-icon")}>
                  <MdOutlineHealthAndSafety />
                </i>
                <p className={cx("safety-name")}>Fire Extinguishers</p>
              </div>
              <div className={cx("safety-icon__container")}>
                <i className={cx("safety-icon")}>
                  <MdOutlineHealthAndSafety />
                </i>
                <p className={cx("safety-name")}>
                  Disinfections and Sterilizations
                </p>
              </div>
              <div className={cx("safety-icon__container")}>
                <i className={cx("safety-icon")}>
                  <MdOutlineHealthAndSafety />
                </i>
                <p className={cx("safety-name")}>Smoke Detectors</p>
              </div>
            </div>
          </div>
          <div className={cx("map-container")}>
            <img className={cx("map-img")} src={map} alt="hieu" />
          </div>
          <div className={cx("nearby-services__container")}>
            <h2 className={cx("heading ", "nearby-sevices__heading")}>
              Nearby Services
            </h2>
            <div className={cx("nearby-services__item--wrapper")}>
              <div className={cx("nearby-sevices__item")}>
                <div className={cx("services__item--name")}>
                  Grill Restro & Bar
                </div>
                <div className={cx("services__item--distance")}>
                  100 meters away
                </div>
                <div className={cx("services__item--rating")}>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                </div>
              </div>
              <div className={cx("nearby-sevices__item")}>
                <div className={cx("services__item--name")}>
                  Grill Restro & Bar
                </div>
                <div className={cx("services__item--distance")}>
                  100 meters away
                </div>
                <div className={cx("services__item--rating")}>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                </div>
              </div>
              <div className={cx("nearby-sevices__item")}>
                <div className={cx("services__item--name")}>
                  Grill Restro & Bar
                </div>
                <div className={cx("services__item--distance")}>
                  100 meters away
                </div>
                <div className={cx("services__item--rating")}>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                  <i className={cx("item--rating__star")}>
                    <AiFillStar />
                  </i>
                </div>
              </div>
              <div className={cx("nearby-sevices-icon__container")}>
                <i className={cx("nearby-services__arrow")}>
                  <AiOutlineArrowRight />
                </i>
              </div>
            </div>
            <Button
              black
              mediumx
              rounded
              className={cx("nearby-services__button")}
              href="https://www.google.com/maps/?hl=vi"
            >
              Show On Map
            </Button>
          </div>
          <div className={cx("reviews")}>
            <div className={cx("reviews-heading")}>
              <div className={cx("reviews-star")}>
                <h2 className={cx("heading")}>Reviews</h2>
                <i className={cx("reviews-icon")}>
                  <AiFillStar />
                </i>
              </div>
              <div className={cx("reviews-rate")}>5.0</div>
            </div>
            <div className={cx("reviews-point__container")}>
              <div className={cx("reviews-point")}>
                <div className={cx("reviews-name")}>Amenities</div>
                <div className={cx("reviews-point__rate")}>5.0</div>
              </div>
              <div className={cx("reviews-point")}>
                <div className={cx("reviews-name")}>Hygiene</div>
                <div className={cx("reviews-point__rate")}>5.0</div>
              </div>
              <div className={cx("reviews-point")}>
                <div className={cx("reviews-name")}>Communication</div>
                <div className={cx("reviews-point__rate")}>5.0</div>
              </div>
              <div className={cx("reviews-point")}>
                <div className={cx("reviews-name")}>Location of Property</div>
                <div className={cx("reviews-point__rate")}>5.0</div>
              </div>
              <div className={cx("reviews-point")}>
                <div className={cx("reviews-name")}>Value for Money</div>
                <div className={cx("reviews-point__rate")}>5.0</div>
              </div>
            </div>
            <div className={cx("reviewers-container")}>
              {comments &&
                comments.length > 0 &&
                comments.map((comment) => (
                  <div key={comment.id} className={cx("reviewers")}>
                    <div className={cx("reviewers-information")}>
                      <div className={cx("reviewers-avatar")}>
                        <img
                          className={cx("reviewers-img")}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAAMFBMVEXk5ueutLfo6eqssbTq7O2orrK7wMPa3d7S1dfGyszMz9Hg4+TCxsnd4OG4vcCzuLuHxgkrAAAC/0lEQVR4nO2a626rMAyAwSYXAiTv/7YntIytFQ022Kl0lE+bNG0//DVxnIvXdY1Go9FoNBqNRqPxPwKQv39++Ep8F2YbU4p29lN1CQBvjcF+A00/u6Fm/C4g7uE3CUy+2kCA79/CbxLRVVGALh7GfziECgrgPsbPmDhpO0AoCeRRSIuuwpnA6jCpCjhzJpDRFFgoAn3SM5go8fM8zFqpAPNpEmwKXkmhuA5fFXQMBmr8XBZGDQXwpDTcUFmSiSGACoNAKwU7CisSLDkPV4z8ciDWgn0arPiBhZWHK9ICA7Ua7ThpA85KWMEgbMBMg3VzEE6EhWvQJ2EDxzbohQ08NxHFdye+gWkG4gb8TETptcAeA+m1MHENMEpvTdwRED+jDJFr4GUFOhiZ04CLsAE/FeUPirztGUfxMxJ3GqQPKJmFZRDlBfJhmSGgcFTOcC4MSeXiONBvDEbpUY18VpSvyBuER6TNQLwa7Qq0edBJww1KWdK4N/9C2KTRqj4owqmCWhb+KqSig5G+Kh1hC5XJ1Hjazovy+HG/wqPyrjDN5sDBYKjX6xmmuX+VQEwV469A521CRPP46tPs6jfccsTFh3Ecg3fLNxp+AMNfqhrAAJ3Ln97GlKf/0XSLdh6Dm9a/qEeHyYX4DIwvifj4RRz9ojka+aM/o3+uSGjWpNTJCgA3p6MycGRhPUgX52EZe86TJqLo8syjb0tD/8Eh+k7IAVxkx39KJBEHWEp74Qkm+bv5sG5Cl+M/He4d3D912TngeH0qoGM/qB8qXB4GcPcHYHMIl7IBwr0M+IuxVwS4zzZFMLKTgdzhpSpwm29wowh8UOA1nuBmFTgkMfqwsjnwA+M6B/yHdJoC+T41KUzBA+q1HriNPYYCKRXILyUXwEgZBHZnkaVAmAfpUvQGoTBdaKZwOP/PNeUh6Alv7toCZytSckv+wEllBG4zhw+eTIL6EJxMA/Mfbi5RfvDU2RTfKDY/WF2Mq5TPCfqJmCm+vCfUxxSbYFCDkkCj0Wg0vss/Bz8hBPfP7w0AAAAASUVORK5CYII="
                          alt="hieu"
                        />
                      </div>
                      <div className={cx("reviewers-personal-information")}>
                        <div className={cx("reviewers-name")}>
                          John Doberman
                        </div>
                        <div className={cx("reviewers-date")}>Mar 12 2020</div>
                      </div>
                    </div>
                    <div className={cx("reviewers-desc")}>{comment.text}</div>
                  </div>
                ))}
            </div>
            <div className={cx("reviewers-showmore")}>
              <Button
                mediumx
                backGroundWhite
                outline
                textBlack
                className={cx("reviewers-showmore-button")}
              >
                Show All 100 Reviews
              </Button>
            </div>
          </div>
        </div>
        <div className={cx("col-right")}>
          <DetailTable
            reserve
            title="Price Range"
            detailsHotel={detailsHotel}
            id={id}
          ></DetailTable>
          {/* <DetailTable id={id} title="List Amenity"></DetailTable> */}
        </div>
      </div>
    </LayoutPrimary>
  );
}
export default Details;
