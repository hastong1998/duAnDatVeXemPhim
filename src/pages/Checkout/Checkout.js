import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tabs } from "antd";
import {
  datGheAction,
  datVeAction,
  layChiTietPhongVeAcion,
} from "../../redux/actions/QuanLyDatVeAction";
import style from "./Checkout.module.css";
import "./Checkout.css";
import {
  CloseOutlined,
  UserOutlined,
  CheckOutlined,
  SmileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  CHANGE_TAB,
  CHUYEN_TAB,
  DAT_GHE,
  DAT_VE,
} from "../../redux/types/QuanLyDatVeType";
import _, { set } from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoIDungAction";
import moment from "moment";
import { connection } from "../../index";
import { history } from "../../App";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;
function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    //Gọi hàm tạo ra 1 async function
    const action = layChiTietPhongVeAcion(props.match.params.id);
    //Dispatch function này đi
    dispatch(action);

    //Có 1 client nào thực hiện việc đặt vé thành công mình sẽ load lại danh sách phòng vé của lịch chiếu đó
    connection.on("datVeThanhCong", () => {
      dispatch(action);
    });

    //Vừa vào trang load tất cả ghế của các người khác đang đặt
    connection.invoke("loadDanhSachGhe", props.match.params.id);

    //Load danh sách ghế đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      //Bước 1: Loại mình ra khỏi danh sách
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== userLogin.taiKhoan
      );
      //Bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung

      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);

        return [...result, ...arrGhe];
      }, []);

      //Đưa dữ liệu ghế khách đặt cập nhật redux
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

      //Đưa dữ liệu ghế khách đặt về redux
      dispatch({
        type: "DAT_GHE",
        arrGheKhachDat,
      });
    });

    //Cài đặt sự kiện khi reload trang
    window.addEventListener("beforeunload", clearGhe);

    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);
  const clearGhe = (event) => {
    connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
  };
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);

  const { danhSachGhe, thongTinPhim } = chiTietPhongVe;

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";

      let classGheDat = ghe.daDat === true ? "gheDaDat" : "";

      let classGheDangDat = "";

      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );

      let classGheKhachDat = "";

      let indexGheKhachDat = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKhachDat != -1) {
        classGheKhachDat = "gheKhachDat";
      }

      if (indexGheDD != -1) {
        classGheDangDat = "gheDangDat";
      }

      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }
      return (
        <Fragment key={index}>
          {
            <button
              onClick={() => {
                const action = datGheAction(ghe, props.match.params.id);
                dispatch(action);
              }}
              disabled={ghe.daDat || classGheKhachDat !== ""}
              className={`ghe ${classGheVip} ${classGheDangDat} ${classGheDat} ${classGheDaDuocDat} ${classGheKhachDat} `}
            >
              {ghe.daDat ? (
                classGheDaDuocDat != "" ? (
                  <UserOutlined />
                ) : (
                  <CloseOutlined />
                )
              ) : classGheKhachDat !== "" ? (
                <SmileOutlined spin />
              ) : (
                ghe.stt
              )}
            </button>
          }
          {(index + 1) % 16 === 0 ? <br></br> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className=" lg:container lg:mx-auto mt-2">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-10">
          <div>
            <div className="flex justify-center mt-5">
              <div className="bg-black" style={{ width: "80%" }}>
                12313
              </div>
            </div>
            <div className="flex justify-center">
              <div
                className={`${
                  style[`trapezoid`]
                } text-center text-gray-900 font-bold`}
              >
                Màn hình
              </div>
            </div>
          </div>
          <div className=" ">{renderSeats()}</div>

          <div className="mt-5 flex justify-center">
            <table className=" divide-y divide-gray-200 w-2/3">
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế đã đặt</th>
                  <th>Ghế mình đặt</th>
                  <th>Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td>
                    <button className="ghe text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDangDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheVip text-center">
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDaDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDaDuocDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheKhachDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className=" col-span-12 lg:col-span-2">
          <h3 className="text-center text-green-400 text-2xl">
            {danhSachGheDangDat
              .reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            Đ
          </h3>
          <hr />
          <h3 className="text-xl">{thongTinPhim?.tenPhim}</h3>
          <p>Địa điểm: {thongTinPhim?.tenCumRap}</p>
          <p>
            Ngày chiếu: {thongTinPhim?.ngayChieu} - Giờ chiếu:{" "}
            {thongTinPhim?.gioChieu}
          </p>
          <p>{thongTinPhim?.diaChi}</p>
          <hr></hr>
          <div className="flex justify-between">
            <p className="text-red-400">
              <span>Ghế: </span>
              {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                return (
                  <span key={index} className="text-green-500 text-xl ml-2">
                    {gheDD.stt}
                  </span>
                );
              })}
            </p>
            <p className="text-green-400">
              {danhSachGheDangDat
                .reduce((tongTien, ghe, index) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}
            </p>
          </div>
          <hr></hr>
          <div>
            <p>Email</p>
            <p>{userLogin.email}</p>
          </div>
          <hr></hr>
          <div>
            <p>Phone</p>
            <p>{userLogin.soDT}</p>
          </div>
          <hr></hr>
          <div className="">
            <div
              onClick={() => {
                let thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                dispatch(datVeAction(thongTinDatVe));
              }}
              className="bg-green-500 text-white w-full text-center py-3 text-2xl hover:text-3xl"
            >
              Đặt vé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Demo(props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          {" "}
          <button
            onClick={() => {
              history.push("/profile");
            }}
          >
            {" "}
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-2xl ml-5 rounded-full bg-red-200"
            >
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
            Hello ! {userLogin.taiKhoan}
          </button>{" "}
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/home");
              window.location.reload();
            }}
            className="text-blue-800"
          >
            Đăng xuất
          </button>{" "}
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
  return (
    <div className="p-5">
      <Tabs
        tabBarExtraContent={operations}
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: CHANGE_TAB,
            Number: key.toString(),
          });
        }}
        defaultActiveKey="1"
      >
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe />
        </TabPane>
        <TabPane
          tab={
            <div
              className="text-center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NavLink to={"/Home"}>
                <HomeOutlined style={{ marginLeft: 10, fontSize: 25 }} />
              </NavLink>
            </div>
          }
          key="3"
        ></TabPane>
      </Tabs>
    </div>
  );
}
function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { thongTinNguoiDung, userLogin } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
  }, []);

  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);
      return (
        <div key={index} className="p-2 lg:w-1/2 md:w-1/2 w-full">
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-red-600 text-xl lg:text-4xl title-font font-medium">
                {ticket.tenPhim}
              </h2>
              <p className="text-yellow-500 text-lg lg:text-2xl font-bold">
                <span className="text-black text-base lg:text-lg">
                  Giờ chiếu:{" "}
                </span>
                {moment(ticket.ngayDat).format("hh:mm A")} -
                <span className="text-black text-base lg:text-lg">
                  {" "}
                  Ngày chiếu:
                </span>{" "}
                {moment(ticket.ngayDat).format("DD/MM/YYYY")}
              </p>
              <p className="text-black text-base lg:text-lg font-bold">
                Địa điểm:{" "}
                <span className="text-red-400 text-lg lg:text-xl">
                  {seats.tenHeThongRap}
                </span>
              </p>
              <p className="text-black text-sm lg:text-lg font-bold">
                Tên rạp:{" "}
                <span className="text-yellow-500 text-lg lg:text-2xl font-bold">
                  {seats.tenCumRap}
                </span>{" "}
                - Ghế :
                <span className="text-yellow-500 text-lg lg:text-2xl font-bold">
                  {ticket.danhSachGhe.map((ghe, index) => {
                    return <span key={index}> [{ghe.tenGhe}]</span>;
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-6xl text-2xl font-medium title-font mb-4 text-purple-700">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
              Hãy xem thông tin địa điểm và thời gian để xem phim vui vẻ bạn
              nhé!
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
}
