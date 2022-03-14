import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import _, { set } from "lodash";
import { TOKEN, USER_LOGIN } from "../../../../util/settings/config";
import "./Header.css";
const { Option } = Select;

export default function Header(props) {
  const { t, i18n } = useTranslation();

  const [onScroll, setOnScroll] = useState(false);

  const [navMenu, setNavMenu] = useState(false);

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            Đăng nhập
          </button>
          <button
            onClick={() => {
              history.push("/register");
            }}
            className="self-center px-8 py-3 font-semibold rounded dark:text-coolGray-900"
          >
            Đăng ký
          </button>{" "}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <button
          className="mr-3"
          onClick={() => {
            history.push("/profile");
          }}
        >
          Xin chào:{" "}
          <span className="text-lg text-pink-400 font-bold">
            {userLogin.taiKhoan}
          </span>
        </button>
        <button
          className="p-2 rounded-lg text-black font-bold bg-pink-400 "
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push("/home");
            window.location.reload();
          }}
        >
          Đăng xuất
        </button>
      </Fragment>
    );
  };
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 10) {
      setOnScroll(true);
    } else {
      setOnScroll(false);
    }
  });

  return (
    <header className={onScroll ? "header_onscroll" : "header_static"}>
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          to={"/home"}
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            style={{ width: "150px" }}
            src="./img/removebg-preview1.png"
            alt="logo"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to={"/home"}
              className="flex items-center px-4 -mb-1   text-white"
              activeClassName="border-b-2 border-white"
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to={"/contact"}
              activeClassName="border-b-2 border-white"
              className=" text-white flex items-center px-4 -mb-1  "
            >
              Contact
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to={"/news"}
              activeClassName="border-b-2 border-white"
              className=" border-white text-white flex items-center px-4 -mb-1 "
            >
              News
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}
        </div>
        <button
          onClick={() => {
            setNavMenu(!navMenu);
          }}
          className="p-4 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-coolGray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div
        className={
          navMenu
            ? "header_static text-center navMenu_show "
            : "header_static text-center navMenu_hidden"
        }
      >
        <ul>
          <li className="flex justify-center mb-5">
            <NavLink
              to={"/home"}
              className="flex items-center px-4 -mb-1   text-white"
              activeClassName="border-b-2 border-white"
            >
              Home
            </NavLink>
          </li>
          <li className="flex justify-center mb-5">
            <NavLink
              to={"/contact"}
              activeClassName="border-b-2 border-white"
              className=" text-white flex items-center px-4 -mb-1  "
            >
              Contact
            </NavLink>
          </li>
          <li className="flex justify-center mb-5">
            <NavLink
              to={"/news"}
              activeClassName="border-b-2 border-white"
              className=" border-white text-white flex items-center px-4 -mb-1 "
            >
              News
            </NavLink>
          </li>
        </ul>
        <div>{renderLogin()}</div>
      </div>
    </header>
  );
}
