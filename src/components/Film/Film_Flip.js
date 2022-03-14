import React from "react";

import "./Film_Flip.css";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import moment from "moment";
export default function Film_Flip(props) {
  const { phim } = props;
  return (
    <div className="card mx-2 w-full">
      <NavLink to={`/detail/${phim.maPhim}`}>
        <div
          className="img1"
          style={{
            backgroundImage: `url(${phim.hinhAnh}),url('https://picsum.photos/200/400') `,
          }}
        />
        <div
          className="img2"
          style={{
            backgroundImage: `url(${phim.hinhAnh}),url('https://picsum.photos/200/400') `,
          }}
        />
        <div className="title">{phim.tenPhim} </div>
        <div className="text">
          <p>
            {phim.moTa.length > 50 ? phim.moTa.slice(0, 50) + "..." : phim.moTa}
          </p>
          <button
            onClick={() => {
              history.push(`//detail/${phim.maPhim}`);
            }}
            className="text-sm font-bold py-2 px-4 rounded bg-orange-400 hover:text-lg"
          >
            Đặt vé
          </button>
        </div>
      </NavLink>
      <NavLink to={`/detail/${phim.maPhim}`}>
        <div className="catagory">
          {phim.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
          <i className="fas fa-film" />
        </div>
      </NavLink>
      <NavLink to={`/detail/${phim.maPhim}`}>
        <div className="views">
          {moment(phim.ngayKhoiChieu).format("YYYY")}
          <i className="far fa-eye" />{" "}
        </div>
      </NavLink>
    </div>
  );
}
