import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatThongTinNguoiDungPostAction,
  layDanhSachLoaiNguoiDungAction,
} from "../../../../redux/actions/QuanLyNguoIDungAction";
import { GROUPID } from "../../../../util/settings/config";

export default function EditUser() {
  const { nguoiDungEdit, danhSachLoaiNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: nguoiDungEdit.taiKhoan,
      matKhau: nguoiDungEdit.matKhau,
      email: nguoiDungEdit.email,
      soDt: nguoiDungEdit.soDt,
      maNhom: GROUPID,
      maLoaiNguoiDung: nguoiDungEdit.maLoaiNguoiDung,
      hoTen: nguoiDungEdit.hoTen,
    },
    onSubmit: (values) => {
      dispatch(capNhatThongTinNguoiDungPostAction(values));
    },
  });

  return (
    <form className="w-full " onSubmit={formik.handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Email
          </label>
          <input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Tài khoản
          </label>
          <input
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
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
            name="hoTen"
            value={formik.values.hoTen}
            onChange={formik.handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Số điện thoại
          </label>
          <input
            name="soDt"
            value={formik.values.soDt}
            onChange={formik.handleChange}
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
            name="matKhau"
            value={formik.values.matKhau}
            onChange={formik.handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Loại Khách Hàng
          </label>
          <select
            value={formik.values.maLoaiNguoiDung}
            onChange={formik.handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            name="maLoaiNguoiDung"
          >
            {danhSachLoaiNguoiDung.map((item, index) => {
              return (
                <option key={index} value={item.maLoaiNguoiDung}>
                  {item.tenLoai}
                </option>
              );
            })}
          </select>
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
}
