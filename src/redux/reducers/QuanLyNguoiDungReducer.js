import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  DANG_NHAP_ACTION,
  SET_DANH_SACH_LOAI_NGUOI_DUNG,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_NGUOI_DUNG_EDIT,
  SET_THONG_TIN_NGUOI_DUNG,
  SET_THONG_TIN_TAI_KHOAN,
} from "../types/QuanLyNguoiDungType";
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
  userLogin: user,
  thongTinNguoiDung: {},
  profile: {},
  danhSachNguoiDung: [
    {
      taiKhoan: "0941234234",
      hoTen: "string",
      email: "xxcxx@gmail.com",
      soDt: "123123123",
      matKhau: "123456",
      maLoaiNguoiDung: "QuanTri",
    },
  ],
  nguoiDungEdit: {},
  danhSachLoaiNguoiDung: [],
};

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION:
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      return { ...state, userLogin: thongTinDangNhap };
    case SET_THONG_TIN_NGUOI_DUNG: {
      return { ...state, thongTinNguoiDung: action.thongTinNguoiDung };
    }
    case SET_THONG_TIN_TAI_KHOAN: {
      state.profile = action.profile;
      return { ...state };
    }
    case SET_DANH_SACH_NGUOI_DUNG: {
      state.danhSachNguoiDung = action.danhSachNguoiDung;
      return { ...state };
    }
    case SET_NGUOI_DUNG_EDIT: {
      state.nguoiDungEdit = _.first(action.arrNguoiDung);
      return { ...state };
    }
    case SET_DANH_SACH_LOAI_NGUOI_DUNG: {
      state.danhSachLoaiNguoiDung = action.danhSachLoaiNguoiDung;
      return { ...state };
    }
    default:
      return state;
  }
};
