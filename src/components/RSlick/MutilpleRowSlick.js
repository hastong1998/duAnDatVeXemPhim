import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/types/QuanLyPhimType";
import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import styleSlick from "./MutilpleRowSlick.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}

export default function MultipleRows(props) {
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";

  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  const dispatch = useDispatch();

  const renderFilms = () => {
    return props.arrPhim.map((phim, index) => {
      return (
        <div style={{ width: "100%" }} key={index}>
          <Film_Flip phim={phim}></Film_Flip>
        </div>
      );
    });
  };
  const settings = {
    className: "center variable-width",
    centerMode: false,
    infinite: true,
    centerPadding: "500px",
    slidesToShow: 2,
    speed: 500,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesPerRow: 2,
    variableWidth: true,
    swipeToSlide: true,
    cssEase: "linear",
    pauseOnHover: true,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          className: "center variable-width",
          slidesToShow: 1,
          centerPadding: "-120px",
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          className: "center variable-width",
          slidesToShow: 1,
          centerPadding: "-120px",
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          centerPadding: "-120px",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: "-150px",
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            dispatch({
              type: SET_FILM_DANG_CHIEU,
            });
          }}
          className="p-2 rounded-lg text-black font-bold bg-red-400 focus:text-white "
        >
          Phim đang chiếu
        </button>
        <button
          onClick={() => {
            dispatch({
              type: SET_FILM_SAP_CHIEU,
            });
          }}
          className="p-2 rounded-lg text-black font-bold bg-red-400 ml-2 focus:text-white"
        >
          Phim sắp chiếu
        </button>
      </div>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
}
