import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useDispatch, useSelector } from "react-redux";

import MultipleRows from "../../components/RSlick/MutilpleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
export default function Home(props) {
  const { arrPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachHeThongRapAction());
  }, []);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  return (
    <div>
      <HomeCarousel />

      <div
        className="pb-20"
        style={{
          backgroundImage:
            "url(https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/movie-details-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <h3 className="text-center text-white font-extrabold text-3xl py-20 m-0 md:text-5xl">
          MOVIE SELECTION
        </h3>
        <div className="container mx-auto">
          <MultipleRows arrPhim={arrPhim} />
        </div>
      </div>
      <div
        className="pb-20"
        style={{
          backgroundImage:
            "url(https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/bg-home-02.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <h3 className="text-center text-white font-extrabold text-3xl py-20 m-0 md:text-5xl">
          ĐẶT VÉ
        </h3>
        <div className="container mx-auto">
          <HomeMenu heThongRapChieu={heThongRapChieu} />
        </div>
      </div>
    </div>
  );
}
