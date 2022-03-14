import React, { Fragment, useEffect, useState } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/Styles/circle.css";
import { Tabs, Radio, Space, Rate } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SET_CHI_TIET_PHIM } from "../../redux/types/QuanLyRapType";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;
export default function Detail(props) {
  const { filmDetail } = useSelector((state) => state.QuanLyPhimReducer);

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
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CustomCard
        style={{ paddingTop: "150px", minHeight: "100vh" }}
        effectColor="#black" // required
        color="#FFF" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="grid grid-cols-12 py-20 ">
          <div className="col-span-12 col-start-1 lg:col-span-4 lg:col-start-4">
            <div className="grid grid-cols-2 ">
              <img
                className="col-span-2 lg:col-span-1"
                src={filmDetail.hinhAnh}
                style={{ width: "100%", height: "auto" }}
                alt="123"
              ></img>
              <div className="mt-5 col-span-2 lg:col-span-1 lg:ml-5">
                <p className="text-center  text-white text-xs lg:text-xl  font-extrabold">
                  Ngày chiếu:{" "}
                  {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YY")}
                </p>
                <p className="text-center text-lg lg:text-4xl text-red-600 font-bold font-serif uppercase mt-20">
                  {filmDetail.tenPhim}
                </p>
                <p className="text-xl">{filmDetail.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 mt-3 lg:col-span-4 flex justify-around items-center">
            <div>
              <div className="mb-5">
                <h1
                  className="text-center text-black mb-1 text-2xl
                "
                >
                  Đánh giá
                </h1>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={Number(filmDetail.danhGia / 2)}
                />
              </div>
              <div
                className={`c100 p${filmDetail.danhGia * 10} default green `}
              >
                <span className="text-white">{filmDetail.danhGia * 10}%</span>
                <div className="slice">
                  <div className="bar" />
                  <div className="fill" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mt-20 container mx-auto  bg-white px-5 py-5 mb-20"
          style={{
            backgroundImage:
              "url(https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/bg-home-02.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <Tabs defaultActiveKey="1" centered>
            <TabPane
              tab={
                <div className="text-white text-lg lg:text-4xl font-bold">
                  Lịch chiếu
                </div>
              }
              key="1"
            >
              <Tabs tabPosition={tabPosition}>
                {filmDetail.heThongRapChieu?.map((htr, index) => {
                  return (
                    <TabPane
                      tab={
                        <div className="ml-5 lg:ml-0 flex justify-center items-center ">
                          <img
                            className="w-5 lg:w-12"
                            src={htr.logo}
                            alt={htr.logo}
                          ></img>
                          <p className="ml-2 text-xs lg:text-base lg:ml-4 text-left  text-white font-bold">
                            {htr.tenHeThongRap}
                          </p>
                        </div>
                      }
                      key={index}
                    >
                      <Tabs tabPosition={tabPosition}>
                        {htr.cumRapChieu?.map((crc, index) => {
                          return (
                            <TabPane
                              tab={
                                <div className="flex mr-5 ">
                                  <img
                                    src={crc.hinhAnh}
                                    alt={crc.hinhAnh}
                                    width={50}
                                    height={50}
                                  ></img>
                                  <div className="ml-4">
                                    <p className="text-left ml-0 w-1/3 lg:ml-2 text-xs lg:text-lg text-white font-bold">
                                      {crc.tenCumRap}
                                    </p>
                                    <div
                                      className="text-red-200 font-semibold"
                                      style={{ wordWrap: "break-word" }}
                                    >
                                      {crc.diaChi}
                                    </div>
                                  </div>
                                </div>
                              }
                              key={index}
                            >
                              <div className="grid grid-cols-4">
                                {crc.lichChieuPhim
                                  .slice(0, 12)
                                  ?.map((lcp, index) => {
                                    return (
                                      <NavLink
                                        to={`/checkout/${lcp.maLichChieu}`}
                                        key={index}
                                        className="text-2xl text-yellow-300"
                                      >
                                        {moment(lcp.ngayChieuGioChieu).format(
                                          "hh:mm a"
                                        )}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </TabPane>
                          );
                        })}
                      </Tabs>
                    </TabPane>
                  );
                })}
              </Tabs>
            </TabPane>
            <TabPane
              tab={
                <div className="text-white text-lg lg:text-4xl font-bold">
                  Thông tin
                </div>
              }
              key="2"
            >
              Thông tin
            </TabPane>
            <TabPane
              tab={
                <div className="text-white text-lg lg:text-4xl font-bold">
                  Đánh giá
                </div>
              }
              key="3"
            >
              Đánh giá
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
