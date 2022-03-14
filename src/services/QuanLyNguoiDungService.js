import axios from "axios";
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }
  dangNhap = (thongTinDangNhap) => {
    return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  layThongTinNguoiDung = () => {
    return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  dangKy = (thongTinDangKy) => {
    return this.post(`api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };
  layThongTinTaiKhoan = () => {
    return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  capNhatThongTinNguoiDungPut = (profileUpdated) => {
    return this.put(
      `api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      profileUpdated
    );
  };
  layDanhSachNguoiDung = (keyword) => {
    if (keyword === "") {
      return this.get(
        `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
      );
    } else {
      return this.get(
        `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${keyword}`
      );
    }
  };
  layDanhSachLoaiNguoiDung = () => {
    return this.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
  };
  capNhatThongTinNguoiDungPost = (thongTinNguoiDung) => {
    return this.post(
      `api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      thongTinNguoiDung
    );
  };
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  };
  themNguoiDung = (nguoiDung)=>{
    return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`,nguoiDung)
  }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
