import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Card.module.css";
import { IconContext } from "react-icons";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineStar,
  AiOutlineCar,
  AiOutlineClose,
} from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { BiBed, BiBath } from "react-icons/bi";
import { MdPets } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
const cx = classNames.bind(styles);

function Card({
  star = false,
  featured = false,
  row = false,
  guide = false,
  wishlists = false,
  add = false,
  host = false,
  fragment = cx("fragment"),
  desc,
  children,
  className,
  mb300,
  name,
  deleteHotel,
  address,
  thumbnail,
  handleLike,
  id,
  wishlist,
  x,
  ...props
}) {
  const navigate = useNavigate();
  const data = {
    id,
    name,
    address,
    thumbnail,
  };
  const itemExist = wishlist
    ? wishlist.find((exa) => exa.id === data.id)
    : false;

  let classes =
    featured && !guide && !row
      ? cx("feature-container")
      : featured && guide && !row
      ? cx("guide-container")
      : row && featured && !guide
      ? cx("feature-row")
      : wishlists && !row && !featured && !guide
      ? cx("wishlists-container")
      : cx("card-container");
  const cardClasses = cx("card", {
    featured,
    wishlists,
    row,
    add,
    mb300,
    [className]: className,
  });
  let src = `/Details/${id}`;
  if (add) {
    src = "/HomeBooking";
  } else if (wishlists && !host) {
    src = "/Wishlists";
  } else if (wishlists && host) {
    src = "/AddRoom";
  }
  // const props = { onClick };

  const toUpdateHotel = () => {
    navigate("/UpdateHotel", { state: { hotel: x } });
  };
  return (
    <div className={fragment}>
      {!guide && !row && !wishlists && (
        <div
          onClick={() => {
            handleLike(data);
          }}
          className={cx("icon-heart")}
        >
          {itemExist ? (
            <IconContext.Provider value={{ color: "red" }}>
              <AiFillHeart />
            </IconContext.Provider>
          ) : (
            <AiOutlineHeart />
          )}
        </div>
      )}
      {wishlists && !add && !host && (
        <i className={cx("close-icon")} {...props}>
          <AiOutlineClose />
        </i>
      )}

      <Link to={src} state={host ? { id: x.id } : null}>
        <div
          className={cardClasses}
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          {star && (
            <div className={cx("star-rated")}>
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </div>
          )}

          {/* {wishlists && !add && (
            <i className={cx("close-icon")} {...props}>
              <AiOutlineClose />
            </i>
          )} */}
          {featured && !row && !guide && (
            <div className={cx("feature-information")}>
              <span className={cx("price")}>$ 1000 - 5000 USD</span>
              <div className={cx("circle-wrapper")}>
                <span className={cx("circle")}></span>
                <span className={cx("circle")}></span>
                <span className={cx("circle")}></span>
                <span className={cx("circle")}></span>
              </div>
            </div>
          )}
          {add ? (
            <i className={cx("add-icon")} {...props}>
              <IoAdd />
            </i>
          ) : (
            <div className={classes}>
              {wishlists ? (
                <div>
                  <h3 className={cx("wishlist-title")}>{children}</h3>
                  <span className={cx("wishlist-desc")}>{desc}</span>
                </div>
              ) : (
                <div className={cx("background")}>
                  <h3 className={cx("card-title")}>{name}</h3>
                  <span className={cx("card-desc")}>{address}</span>

                  {featured && !guide && (
                    <div className={cx("feature-icons")}>
                      <div className={cx("icon")}>
                        <BiBed />
                        <span>1</span>
                      </div>
                      <div className={cx("icon")}>
                        <BiBath />
                        <span>1</span>
                      </div>
                      <div className={cx("icon")}>
                        <AiOutlineCar />
                        <span>1</span>
                      </div>
                      <div className={cx("icon")}>
                        <MdPets />
                        <span>1</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
      {host && (
        <div className={cx("host-button")}>
          <Button
            small
            rounded
            onClick={() => {
              toUpdateHotel();
            }}
            className={cx("modify")}
          >
            Modify
          </Button>
          <Button
            small
            rounded
            className={cx("remove")}
            onClick={() => {
              deleteHotel(id);
            }}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

export default Card;
