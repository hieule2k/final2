import React, { useState } from "react";
import styles from "./nav.module.css";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import avatar from "../../assets/img/image1.png";
import user from "../../assets/img/Vector.png";
const cx = classNames.bind(styles);

function NavBar({ host = false }) {
  const [account, setAccount] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem("userData"));

    return storageData ?? false;
  });

  const handleLogOut = () => {
    localStorage.removeItem("wishlist");
    localStorage.removeItem("userData");
    setAccount([]);
    window.location.href = "/";
  };

  return (
    <header className={cx("header")}>
      <HeadlessTippy
        trigger="click"
        hideOnClick
        interactive
        placement="bottom-end"
        render={(attrs) => (
          <div className={cx("wrapper")}>
            <div className={cx("content")} tabIndex="-1" {...attrs}>
              <ul className={cx("sign-in-option")}>
                {!account ? (
                  <li className={cx("sign-in-list")}>
                    <Link to="/SignUp">Sign Up</Link>
                  </li>
                ) : (
                  <li className={cx("sign-in-list")}>
                    <Link to="/Account">Account</Link>
                  </li>
                )}
                {!account ? (
                  <li className={cx("sign-in-list")}>
                    <Link to="/Login">Login</Link>
                  </li>
                ) : (
                  <li className={cx("sign-in-list")} onClick={handleLogOut}>
                    Log Out
                  </li>
                )}
                <li className={cx("sign-in-list")}>Help center</li>
              </ul>
            </div>
          </div>
        )}
      >
        <img
          className={cx("user-avatar")}
          src={account ? avatar : user}
          alt="no img"
        />
      </HeadlessTippy>

      <Link to={host ? "/HostPage" : "/"}>
        <div className={cx("menu__relocate")}>
          <span>Relocate</span>
        </div>
      </Link>

      {!host && (
        <ul className={cx("menu-nav")}>
          <li className={cx("menu-nav__item")}>
            <Link to="/HomeBooking" className={cx("menu-nav__link")}>
              Find a Property
            </Link>
          </li>
          <li className={cx("menu-nav__item")}>
            <Link to="/Wishlists" className={cx("menu-nav__link")}>
              Wishlist
            </Link>
          </li>
          <li className={cx("menu-nav__item")}>
            <Link to="/ReservationStatus" className={cx("menu-nav__link")}>
              History
            </Link>
          </li>
          <HeadlessTippy
            trigger="click"
            hideOnClick
            interactive
            placement="bottom-end"
            render={(attrs) => (
              <div className={cx("wrapper", "host")}>
                <div className={cx("content")} tabIndex="-1" {...attrs}>
                  <ul className={cx("sign-in-option")}>
                    <li className={cx("sign-in-list")}>
                      <Link to="/SignUpHost">Sign Up</Link>
                    </li>
                    <li
                      className={cx("sign-in-list")}
                      style={{ textAlign: "start" }}
                    >
                      <Link to="/LoginHost">Sign In </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          >
            <li className={cx("menu-nav__item")}>
              <div className={cx("menu-nav__link")}>For A Host</div>
            </li>
          </HeadlessTippy>
        </ul>
      )}
      {host && (
        <ul className={cx("menu-nav")}>
          <li className={cx("menu-nav__item")}>
            <Link to="/HostProperties" className={cx("menu-nav__link")}>
              List Properties
            </Link>
          </li>
          <li className={cx("menu-nav__item")}>
            <Link to="/HostReservation" className={cx("menu-nav__link")}>
              Reservations
            </Link>
          </li>
          <li className={cx("menu-nav__item")}>
            <Link to="/TransactionHistory" className={cx("menu-nav__link")}>
              Transactions
            </Link>
          </li>
          <li className={cx("menu-nav__item")}>
            <Link to="/Dashboard" className={cx("menu-nav__link")}>
              Dashboard
            </Link>
          </li>
          <li className={cx("menu-nav__item")}>
            <Link to="/" className={cx("menu-nav__link")}>
              <i>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 25C14.2246 25 15.6236 23.6011 15.6236 21.875H9.3765C9.3765 23.6011 10.7754 25 12.5 25ZM23.0171 17.6899C22.0738 16.6763 20.3086 15.1514 20.3086 10.1562C20.3086 6.3623 17.6485 3.3252 14.0616 2.58008V1.5625C14.0616 0.699707 13.3623 0 12.5 0C11.6377 0 10.9385 0.699707 10.9385 1.5625V2.58008C7.3516 3.3252 4.69144 6.3623 4.69144 10.1562C4.69144 15.1514 2.9263 16.6763 1.98294 17.6899C1.68998 18.0049 1.56009 18.3813 1.56253 18.75C1.5679 19.5508 2.19632 20.3125 3.12992 20.3125H21.8702C22.8037 20.3125 23.4327 19.5508 23.4375 18.75C23.44 18.3813 23.3101 18.0044 23.0171 17.6899Z"
                    fill="black"
                  />
                </svg>
              </i>
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}

export default NavBar;
