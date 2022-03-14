import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import {
  CHANGE_TAB,
  CHUYEN_TAB,
  DAT_GHE,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
} from "../types/QuanLyDatVeType";

const initialState = {
  chiTietPhongVe: new ThongTinLichChieu(),
  danhSachGheDangDat: [],
  tabActive: "1",
  danhSachGheKhachDat: [{ maGhe: 52207 }, { maGhe: 52208 }],
};

export const QuanLyDatVeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE: {
      state.chiTietPhongVe = action.chiTietPhongVe;
      return { ...state };
    }
    case DAT_VE: {
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];

      let index = danhSachGheCapNhat.findIndex(
        (gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe
      );
      if (index != -1) {
        //Nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã click vào rồi => xoá đi
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(action.gheDuocChon);
      }
      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }
    case DAT_VE_HOAN_TAT: {
      state.danhSachGheDangDat = [];
      return { ...state };
    }
    case CHUYEN_TAB: {
      return { ...state, tabActive: "2" };
    }
    case CHANGE_TAB: {
      console.log(action);
      return { ...state, tabActive: action.number };
    }
    case DAT_GHE: {
      state.danhSachGheKhachDat = action.arrGheKhachDat;
      return { ...state };
    }
    default:
      return state;
  }
};
