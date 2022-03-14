import React, { Fragment, useEffect } from "react";
import { Button, Table } from "antd";
import { Input, Space } from "antd";
import {
  AudioOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachPhimAction,
  xoaPhimAction,
} from "../../../redux/actions/QuanLyPhimActions";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";

const { Search } = Input;

export default function Films() {
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);

  const onSearch = (value) => {
    dispatch(layDanhSachPhimAction(value));
  };

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      value: (text, object) => {
        return <span>{text}</span>;
      },
      width: 100,
      sorter: (a, b) => a.maPhim - b.maPhim,
      //   sortDirections: ["descend"],
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      width: 100,
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              height={50}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
    },
    {
      title: "Tên phim",
      width: "25%",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      width: "25%",
      sorter: (a, b) => {
        let tenPhimA = a.moTa.toLowerCase().trim();
        let tenPhimB = b.moTa.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      render: (text, film, index) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + "..."
              : film.moTa}
          </Fragment>
        );
      },
      sortDerections: ["descend", "ascend"],
    },
    {
      title: "Hành động",
      dataIndex: "hanhDOng",
      width: "25%",

      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className=" text-blue-600 p-2 mr-2 text-xl"
              to={`/admin/films/edit/${film.maPhim}`}
            >
              <EditOutlined />
            </NavLink>
            <span
              onClick={() => {
                if (
                  window.confirm("Bạn có chắc muốn xóa phim: " + film.tenphim)
                ) {
                  dispatch(xoaPhimAction(film.maPhim));
                }
              }}
              style={{ cursor: "pointer" }}
              key={2}
              className=" text-red-400 p-2 mr-2 text-xl"
            >
              <DeleteOutlined />
            </span>
            <NavLink
              onClick={() => {
                localStorage.setItem("filmParams", JSON.stringify(film));
              }}
              key={3}
              className=" text-blue-600 p-2 mr-2 text-xl"
              to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}
            >
              <CalendarOutlined />
            </NavLink>
          </Fragment>
        );
      },
      sortDerections: ["descend", "ascend"],
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <div className="">
      <h3 className="text-4xl">Quản lý Phim</h3>
      <Button
        className="mb-5"
        onClick={() => {
          history.push("/admin/films/addnew");
        }}
      >
        Thêm phim
      </Button>
      <Search
        className=""
        placeholder="input search text"
        size="large"
        onSearch={onSearch}
      />

      <Table
        rowKey={"maPhim"}
        columns={columns}
        dataSource={arrFilmDefault}
        onChange={onChange}
      />
    </div>
  );
}
