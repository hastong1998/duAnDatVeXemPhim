import React, { Fragment, useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachNguoiDungAction,
  layNguoiDungEdit,
  xoaNguoiDungAction,
} from "../../../redux/actions/QuanLyNguoIDungAction";
import { Input, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { history } from "../../../App";

export default function Dashboard() {
  const { Search } = Input;

  const { danhSachNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction(""));
  }, []);

  const onSearch = (value) => {
    dispatch(layDanhSachNguoiDungAction(value));
  };

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
    },
    {
      title: "Thao tác",
      render: (record, index) => {
        return (
          <Fragment>
            <button
              onClick={() => {
                dispatch(layNguoiDungEdit(record.taiKhoan));
                history.push(`/admin/edituser/${record.taiKhoan}`);
              }}
              style={{ color: "#52c41a" }}
            >
              <EditOutlined />
            </button>
            <button
              onClick={() => {
                dispatch(xoaNguoiDungAction(record.taiKhoan));
              }}
              style={{ color: "#eb2f96" }}
              className="ml-3"
            >
              <DeleteOutlined />
            </button>
          </Fragment>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};

  return (
    <div>
      <h3>Quản lý người dùng</h3>
      <Search
        className="mb-3"
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={danhSachNguoiDung}
        onChange={onChange}
      />
    </div>
  );
}
