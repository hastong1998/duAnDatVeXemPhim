import { history, openNotificationWithIcon } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  DANG_NHAP_ACTION,
  SET_DANH_SACH_LOAI_NGUOI_DUNG,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_NGUOI_DUNG_EDIT,
  SET_THONG_TIN_NGUOI_DUNG,
  SET_THONG_TIN_TAI_KHOAN,
} from "../types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

      if (result.status === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        history.goBack();
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Đăng nhập",
        error.response?.data.content
      );
      console.log(error.response?.data.content);
    }
  };
};

export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();

      if (result.status === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const dangKyAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
      alert("Đăng ký thành công");
      history.push("/home");
    } catch (error) {
      console.log(error);
      const aler = error.response.data;
      alert(`${aler}`);
    }
  };
};
export const layThongTinTaiKhoanAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinTaiKhoan();
      console.log(result);
      dispatch({
        type: SET_THONG_TIN_TAI_KHOAN,
        profile: result.data.content,
      });
    } catch (error) {
      console.log(error);
      const aler = error.response.data;
      alert(`${aler}`);
    }
  };
};

export const capNhatThongTinNguoiDungPutAction = (profileUpdated) => {
  return async (dispatch) => {
    try {
      await quanLyNguoiDungService.capNhatThongTinNguoiDungPut(profileUpdated);
      alert("Cập nhật thành công");
    } catch (error) {
      console.log(error.response?.data);
      const aler = error.response?.data;
    }
  };
};
export const layDanhSachNguoiDungAction = (keyword) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(keyword);
      dispatch({
        type: SET_DANH_SACH_NGUOI_DUNG,
        danhSachNguoiDung: result.data.content,
      });
    } catch (error) {
      console.log(error.response?.data);
      const aler = error.response?.data;
      alert(`${aler}`);
    }
  };
};
export const layNguoiDungEdit = (keyword) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(keyword);
      console.log(result);
      dispatch({
        type: SET_NGUOI_DUNG_EDIT,
        arrNguoiDung: result.data.content,
      });
    } catch (error) {
      console.log(error.response?.data);
      const aler = error.response?.data;
      alert(`${aler}`);
    }
  };
};
export const layDanhSachLoaiNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
      console.log(result);
      dispatch({
        type: SET_DANH_SACH_LOAI_NGUOI_DUNG,
        danhSachLoaiNguoiDung: result.data.content,
      });
    } catch (error) {
      console.log(error.response?.data);
      const aler = error.response?.data;
      alert(`${aler}`);
    }
  };
};
export const capNhatThongTinNguoiDungPostAction = (thongTinNguoiDung) => {
  return async (dispatch) => {
    try {
      await quanLyNguoiDungService.capNhatThongTinNguoiDungPost(
        thongTinNguoiDung
      );
      alert("Cập nhật thành công");
      history.push("/admin");
    } catch (error) {
      console.log(error.response?.data);
      const aler = error.response?.data;
      alert(`${aler}`);
    }
  };
};
export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      alert("Xóa thành công");
      dispatch(layDanhSachNguoiDungAction(""));
    } catch (error) {
      console.log(error.response?.data.content);
      alert(`${error.response?.data.content}`);
    }
  };
};

export const themNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      await quanLyNguoiDungService.themNguoiDung(taiKhoan);
      alert("Thêm người dùng thành công");

      dispatch(layDanhSachNguoiDungAction(""));
      history.push("/admin");
    } catch (error) {
      console.log(error.response?.data.content);
      alert(`${error.response?.data.content}`);
    }
  };
};
