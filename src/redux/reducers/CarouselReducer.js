import { SET_CAROUSEL } from "../types/CarouselType";

const initialState = {
  arrImg: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
  danhSachPhim: [
    {
      hinhAnh:
        "https://songmoi.vn/public/upload_editor/posts/images/ve-xem-avengers-endgame-5.jpg",
    },

    {
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
    },
    {
      hinhAnh: "https://i.ytimg.com/vi/PDp4Ic8ZGUM/maxresdefault.jpg",
    },
    {
      hinhAnh: "https://i.ytimg.com/vi/szYtbuml9mk/maxresdefault.jpg",
    },
  ],
};
export const CarouselReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAROUSEL:
      state.arrImg = action.arrImg;
      return { ...state };

    default:
      return state;
  }
};
