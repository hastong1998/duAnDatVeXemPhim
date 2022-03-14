import {
  SET_DANH_SACH_PHIM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
  SET_THONG_TIN_PHIM,
} from "../types/QuanLyPhimType";
import { SET_CHI_TIET_PHIM } from "../types/QuanLyRapType";

const initialState = {
  arrPhim: [
    {
      maPhim: 9589,
      tenPhim: "Captain America: The Winter Soldier (2014)",
      biDanh: "captain-america-the-winter-soldier-2014-",
      trailer: "https://www.youtube.com/embed/7SlILk2WMTI",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/captain-america-the-winter-soldier-2014-_gp00.jpg",
      moTa: "Captain America (giờ đây dưới quyền S.H.I.E.L.D.) vẫn đang tiếp tục thích nghi với thế giới hiện tại và thực hiện nhiều nhiệm vụ bảo vệ thế giới. Sau khi Nick Fury bị tấn công, Steve Rogers phát hiện S.H.I.E.L.D. đã bị HYDRA khống chế. Steve cùng với Black Widow và người bạn mới Falcon phải đối đầu chống lại Hydra và Chiến binh Mùa đông, cũng chính là Bucky Barnes, người bạn thân của Steve. Bucky đã không chết hồi Thế chiến thứ 2 mà đã bị HYDRA bắt về để lập trình lại não.",
      maNhom: "GP00",
      ngayKhoiChieu: "2022-02-21T22:59:37.627",
      danhGia: 8,
      hot: false,
      dangChieu: false,
      sapChieu: false,
    },
    {
      maPhim: 9590,
      tenPhim: "Guardians of the Galaxy 1 (2014)",
      biDanh: "guardians-of-the-galaxy-1-2014-",
      trailer: "https://www.youtube.com/embed/2LIQ2-PZBC8",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/guardians-of-the-galaxy-1-2014-_gp00.jpg",
      moTa: "Năm 1988, sau khi mẹ qua đời, Peter Quill bị bắt khỏi Trái đất bởi Tộc Yondu Ravager, từ đó anh trở thành đạo chích với biệt danh Star-Lord. Quill tìm được một quả cầu, bên trong là Viên đá Sức mạnh, nhưng rồi anh lại bị bắt ở hành tinh Xandar của Nova Corps. Tại đó Quill gặp Gamora, Rocket Racoon, Groot, Drax và cùng thoát ra. Họ cùng nhau ngăn cản âm mưu của tên chiến binh Kree là Ronan, kẻ muốn dùng quả cầu để hủy diệt Xandar.",
      maNhom: "GP00",
      ngayKhoiChieu: "2021-11-17T00:00:00",
      danhGia: 8,
      hot: true,
      dangChieu: true,
      sapChieu: false,
    },
    {
      maPhim: 9592,
      tenPhim: "Avengers: Age of Ultron (2015)",
      biDanh: "avengers-age-of-ultron-2015-",
      trailer: "https://www.youtube.com/embed/tmeOjFno6Do",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/avengers-age-of-ultron-2015-_gp00.jpg",
      moTa: "Sau sự kiện ở Captain America: The Winter Soldier các Avengers tập hợp cùng nhau để tiêu diệt tàn dư Hydra. Nhóm thu giữ được cây trượng của Loki với Viên đá Tâm trí, Tony tính dùng sức mạnh của viên đá để bảo vệ nền hòa bình Trái đất nhưng vô tình tạo ra Ultron, một thực thể tàn ác với ý định hủy diệt thế giới. Nhóm Avenger lại cùng nhau hợp sức bảo vệ thế giới và đánh bại kẻ thù mới này.",
      maNhom: "GP00",
      ngayKhoiChieu: "2021-11-17T00:00:00",
      danhGia: 8,
      hot: true,
      dangChieu: true,
      sapChieu: false,
    },
    {
      maPhim: 9593,
      tenPhim: "Ant-Man (2015)",
      biDanh: "ant-man-2015-",
      trailer: "https://www.youtube.com/embed/pWdKf3MneyI",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ant-man-2015-_gp00.jpg",
      moTa: "Scott Lang, một đạo chích đã hoàn lương, đang tìm một công việc mới. Trong một lần ngứa nghề, anh đã gặp được Hank Pym và được ông giao cho bộ giáp Ant-Man với công nghệ thu nhỏ. Scott cùng con gái Hank Pym là Hope van Dyne, bắt tay lấy lại công nghệ công nghệ thu nhỏ này từ tay Darren Cross (học trò cũ của hank Pym) nhưng đang có ý định bán công nghệ này cho Hydra",
      maNhom: "GP00",
      ngayKhoiChieu: "2021-11-17T00:00:00",
      danhGia: 8,
      hot: true,
      dangChieu: true,
      sapChieu: false,
    },
  ],
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],
  filmDetail: {},
  thongTinPhim: {},
};

export const QuanLyPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      state.arrPhim = action.arrPhim;
      state.arrFilmDefault = state.arrPhim;
      return { ...state };
    }
    case SET_FILM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;
      state.arrPhim = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }
    case SET_FILM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrPhim = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }
    case SET_CHI_TIET_PHIM: {
      state.filmDetail = action.filmDetail;
      return { ...state };
    }
    case SET_THONG_TIN_PHIM: {
      state.thongTinPhim = action.thongTinPhim;
      return { ...state };
    }
    default:
      return state;
  }
};
