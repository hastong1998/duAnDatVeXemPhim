import { connection } from "../../index";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";

import {
  CHUYEN_TAB,
  DAT_VE,
  SET_CHI_TIET_PHONG_VE,
} from "../types/QuanLyDatVeType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const layChiTietPhongVeAcion = (maLichChieu) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

      if (result.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data.content,
        });
      }
    } catch (error) {
      console.log(error.response?.data);
    }
    dispatch(hideLoadingAction);
  };
};
export const datVeAction = (thongTinDatVe) => {
  return async (dispatch, getState) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      console.log(result.data.content);
      if (result.status === 200) {
      }
      await dispatch(layChiTietPhongVeAcion(thongTinDatVe.maLichChieu));
      await dispatch(hideLoadingAction);

      let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
      connection.invoke(
        "datGheThanhCong",
        userLogin.taiKhoan,
        thongTinDatVe.maLichChieu
      );

      dispatch({ type: CHUYEN_TAB });
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log(error);
    }
  };
};
export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    //Đưa thông tin ghế lên reducer
    await dispatch({
      type: DAT_VE,
      gheDuocChon: ghe,
    });

    //Call api về backend
    let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
    let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

    console.log("danhSachGheDangDat", danhSachGheDangDat);
    console.log("taiKhoan", taiKhoan);
    console.log("maLichChieu", maLichChieu);
    //Biến mảng thành chuỗi
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

    //Call api signalR
    connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};
