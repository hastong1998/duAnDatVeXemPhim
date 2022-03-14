import axios from "axios";
import {
  quanLyPhimService,
  QuanLyPhimService,
} from "../../services/QuanLyPhimService";
import { DOMAIN } from "../../util/settings/config";
import { SET_CAROUSEL } from "../types/CarouselType";

export const getCarouselAction = (thamSO) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachBanner();

      dispatch({
        type: SET_CAROUSEL,
        arrImg: result.data.content,
      });
    } catch (err) {
      console.log("error", err.response?.data);
    }
  };
};
