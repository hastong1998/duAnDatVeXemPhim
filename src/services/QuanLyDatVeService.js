import axios from "axios";
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService {
  constructor() {
    super();
  }
  layChiTietPhongVe = (id) => {
    return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`);
  };
  datVe = (thongTinDatVe) => {
    return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
  };
  taoLichChieu = (obj) => {
    return this.post(`api/QuanLyDatVe/TaoLichChieu`, obj);
  };
}
export const quanLyDatVeService = new QuanLyDatVeService();
