import React, { useEffect, useState } from "react";
import { Tabs, Radio, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
import { GROUPID } from "../../util/settings/config";
import { useFormik } from "formik";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  capNhatThongTinNguoiDungPutAction,
  layThongTinTaiKhoanAction,
} from "../../redux/actions/QuanLyNguoIDungAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

export default function Profile() {
  const dispatch = useDispatch();

  const { TabPane } = Tabs;

  const { profile, userLogin } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  useEffect(() => {
    dispatch(layThongTinTaiKhoanAction());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: profile.taiKhoan,
      matKhau: profile.matKhau,
      email: profile.email,
      soDT: profile.soDT,
      maNhom: GROUPID,
      maLoaiNguoiDung: userLogin.maLoaiNguoiDung,
      hoTen: profile.hoTen,
    },

    onSubmit: (values) => {
      dispatch(capNhatThongTinNguoiDungPutAction(values));
    },
  });

  const renderProfile = () => {
    return (
      <form className="w-full " onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email
            </label>
            <input
              disabled
              style={{ cursor: "no-drop" }}
              onChange={formik.handleChange}
              name="email"
              value={formik.values.email}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Tài khoản
            </label>
            <input
              disabled
              style={{ cursor: "no-drop" }}
              onChange={formik.handleChange}
              value={formik.values.taiKhoan}
              name="taiKhoan"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Họ tên
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.hoTen}
              name="hoTen"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Số điện thoại
            </label>
            <input
              name="soDT"
              onChange={formik.handleChange}
              value={formik.values.soDT}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Mật khẩu
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.matKhau}
              name="matKhau"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <button
            type="submit"
            className="mx-auto px-10 py-3 bg-blue-700 text-white font-bold"
          >
            Cập nhật
          </button>
        </div>
      </form>
    );
  };

  const renderThongTinVe = () => {
    return profile.thongTinDatVe?.map((item, index) => {
      return (
        <div
          key={index}
          className="max-w-full s w-full lg:max-w-full lg:flex mb-5"
        >
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{
              backgroundImage: `url(${item.hinhAnh})`,
              backgroundPosition: "center",
            }}
          ></div>
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between w-full leading-normal">
            <div className="mb-8">
              <div className="text-red-600 text-4xl title-font font-medium">
                {item.tenPhim}
              </div>
              <p className="text-black text-lg font-bold">
                Hệ thống rạp:{" "}
                <span className="text-red-400 text-xl">
                  {" "}
                  {_.first(item.danhSachGhe).tenHeThongRap}
                </span>
              </p>
              <p className="text-black text-lg font-bold">
                Cụm rạp:{" "}
                <span className="text-yellow-500 text-2xl font-bold">
                  {" "}
                  {_.first(item.danhSachGhe).tenRap}
                </span>
              </p>
              <div>
                <p className="text-black text-lg font-bold">
                  Ghế :{" "}
                  <span className="text-yellow-500 text-2xl font-bold">
                    {item.danhSachGhe.map((item, index) => {
                      return <span key={index}> [{item.tenGhe}] </span>;
                    })}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                className="w-20 h-20 rounded-full mr-4"
                src={item.hinhAnh}
                alt="Avatar of Jonathan Reinink"
              />
              <div className="text-sm">
                <p className="text-black text-lg font-bold">
                  Người đặt:{" "}
                  <span className="text-yellow-500 text-2xl font-bold">
                    {profile.hoTen}
                  </span>{" "}
                </p>
                <p className="text-black text-lg font-bold">
                  Giờ chiếu:{" "}
                  <span className="text-yellow-500 text-2xl font-bold">
                    {moment(item.ngayDat).format("mm:hh DD/MM/YYYY")}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <HomeCarousel />
      <div className="container mx-auto py-20">
        <Tabs tabPosition={"top"}>
          <TabPane
            tab={<div className="text-4xl">Thông tin cá nhân</div>}
            key="1"
          >
            {renderProfile()}
          </TabPane>
          <TabPane tab={<div className="text-4xl">Lịch sử đặt vé</div>} key="2">
            {renderThongTinVe()}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
