import React, { Fragment, useEffect, useState } from "react";
import { Tabs, Radio, Space } from "antd";
import { useDispatch } from "react-redux";
import { layDanhSachHeThongRapAction } from "../../../redux/actions/QuanLyRapAction";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { history } from "../../../App";

export default function HomeMenu(props) {
  const { TabPane } = Tabs;

  const [tabPosition, setTabPosition] = useState("left");

  useEffect(() => {
    const widthWindow = window.innerWidth;

    if (widthWindow < 1200) {
      setTabPosition("top");
    } else {
      setTabPosition("left");
    }
    return () => {};
  }, []);

  const dispatch = useDispatch();

  const { heThongRapChieu } = props;

  const renderHeThongRap = () => {
    return heThongRapChieu.map((rap, index) => {
      return (
        <TabPane
          key={index}
          tab={<img src={rap.logo} className="rounded-full w-10" />}
        >
          <Tabs key={index} tabPosition={tabPosition}>
            {rap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  key={index}
                  tab={
                    <div style={{ width: "360px", display: "flex" }}>
                      <div
                        className="w-10  lg:w-12"
                        style={{
                          backgroundImage: `url(${rap.logo})`,

                          backgroundSize: "100%",
                          backgroundRepeat: "no-repeat",
                          borderRadius: "100%",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      {/* <img src={rap.logo} className="rounded-full w-1/6" /> */}

                      <div className="text-left ml-3 text-white font-bold w-2/3 text-xs lg:text-base ">
                        {cumRap.tenCumRap}
                        <p className="text-red-200 font-semibold">Chi Tiết</p>
                      </div>
                    </div>
                  }
                >
                  {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="my-5" style={{ display: "flex" }}>
                          <div style={{ display: "flex" }}>
                            <div>
                              <img
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  history.push(`/detail/${phim.maPhim}`);
                                }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://picsum.photos/150/150";
                                }}
                                width={150}
                                height={150}
                                src={phim.hinhAnh}
                                alt={phim.hinhAnh}
                              />
                            </div>
                            <div className="ml-2">
                              <h1
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  history.push(`/detail/${phim.maPhim}`);
                                }}
                                className="
                                text-sm  md:text-lg lg:text-2xl text-pink-400"
                              >
                                {phim.tenPhim}
                              </h1>
                              <p className="text-white text-xs md:text-sm  lg:text-xl">
                                Địa chỉ:{" "}
                                <span className="font-bold">
                                  {cumRap.diaChi}
                                </span>
                              </p>
                              <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                                <p className="text-red-500 font-bold   text-xs  lg:text-xl">
                                  Lịch chiếu:{" "}
                                </p>
                                {phim.lstLichChieuTheoPhim
                                  ?.slice(0, 12)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        className="
                                        text-xs
                                       
                                        lg:text-2xl text-yellow-300"
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={index}
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
          ;
        </TabPane>
      );
    });
  };
  return (
    <>
      <Tabs tabPosition={"left"}>{renderHeThongRap()}</Tabs>
    </>
  );
}
