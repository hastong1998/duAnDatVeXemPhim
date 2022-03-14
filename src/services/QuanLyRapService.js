import axios from "axios";
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }
  layDanhSachRap = () => {
    return this.get(
      `api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  };
  layThongTinHeThongRap = () => {
    return this.get(`api/QuanLyRap/LayThongTinHeThongRap`);
  };
  layThongTinLichChieuPhim = (maPhim) => {
    return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  };
  layThongTinCumRapTheoHeThong = (maHeThong) => {
    return this.get(
      `api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThong}`
    );
  };
}
export const quanLyRapService = new QuanLyRapService();
