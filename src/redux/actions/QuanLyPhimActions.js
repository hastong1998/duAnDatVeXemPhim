import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import {
  SET_DANH_SACH_PHIM,
  SET_THONG_TIN_PHIM,
} from "../types/QuanLyPhimType";

export const layDanhSachPhimAction = (tenphim = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenphim);

      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrPhim: result.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const themPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.themPhimUploadHinh(formData);
      alert("thêm phim thành công");
      console.log(result);
      dispatch(layDanhSachPhimAction());
      history.push("/admin/films");
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.layThongTinPhim(maPhim);
      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
export const capNhapPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.capNhatPhimUpload(formData);
      alert("Cập nhật phim thành công");
      console.log(result);
      dispatch(layDanhSachPhimAction());
      history.push("/admin/films");
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.xoaPhim(maPhim);
      alert("Xóa phim thành công");
      console.log(result);
      dispatch(layDanhSachPhimAction());
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
