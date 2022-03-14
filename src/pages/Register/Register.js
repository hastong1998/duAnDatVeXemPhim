import { useFormik } from "formik";

import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { dangKyAction } from "../../redux/actions/QuanLyNguoIDungAction";
import { GROUPID } from "../../util/settings/config";
import * as Yup from "yup";
export default function Register() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      hoTen: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      soDt: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      hoTen: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      matKhau: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required!"),
      xacNhanMatKhau: Yup.string()
        .oneOf([Yup.ref("matKhau")], "Password's not match")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      dispatch(dangKyAction(values));
    },
  });
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <h3 className="text-2xl font-bold text-center">Join us</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="Name">
                Tài khoản
                <label>
                  <input
                    onChange={formik.handleChange}
                    type="text"
                    name="taiKhoan"
                    placeholder="Nhập vào tài khoản bạn muốn đăng ký"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
              </label>
              <span className="text-red-600">{formik.errors.taiKhoan}</span>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Email
                <label>
                  <input
                    onChange={formik.handleChange}
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
              </label>
              <span className="text-red-600">{formik.errors.email}</span>
            </div>
            <div className="mt-4">
              <label className="block">
                Mật khẩu
                <label>
                  <input
                    onChange={formik.handleChange}
                    name="matKhau"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
              </label>
              <span className="text-red-600">{formik.errors.matKhau}</span>
            </div>
            <div className="mt-4">
              <label className="block">
                Confirm Password
                <label>
                  <input
                    onChange={formik.handleChange}
                    name="xacNhanMatKhau"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
              </label>
              <span className="text-red-600">
                {formik.errors.xacNhanMatKhau}
              </span>
            </div>
            <div className="mt-4">
              <label className="block">
                Họ tên
                <label>
                  <input
                    onChange={formik.handleChange}
                    name="hoTen"
                    type="text"
                    placeholder="Nhập họ tên..."
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
              </label>
              <span className="text-red-600">{formik.errors.hoTen}</span>
            </div>

            <div className="mt-4">
              <label className="block">
                Số điện thoại
                <label>
                  <input
                    onChange={formik.handleChange}
                    name="soDt"
                    type="tel"
                    placeholder="Nhập họ tên..."
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
              </label>
              <span className="text-red-600">{formik.errors.soDt}</span>
            </div>
            <div className="flex">
              <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Create Account
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              Already have an account?
              <NavLink className="text-blue-600 hover:underline" to="/login">
                Log in
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
