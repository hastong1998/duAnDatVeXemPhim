import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, InputNumber, Select } from "antd";
import { Cascader } from "antd";
import { DatePicker, Space } from "antd";
import { quanLyRapService } from "../../../../services/QuanLyRapService";
import { useFormik } from "formik";
import { quanLyDatVeService } from "../../../../services/QuanLyDatVeService";
import moment from "moment";

export default function Showtime(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);

        alert(result.data.content);
      } catch (error) {
        console.log("error", error.response?.data);
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  }, []);

  const handleChangeHeThongRap = async (value) => {
    try {
      let result = await quanLyRapService.layThongTinCumRapTheoHeThong(value);
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };
  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onchangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };
  const convertSelectHTR = () => {
    // state.heThongRapChieu?.map((htr, index) => ({ label: htr.tenHeThongRap, value: htr.tenHeThongRap }))
    return state.heThongRapChieu?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
    });
  };
  let film = {};
  if (localStorage.getItem("filmParams")) {
    film = JSON.parse(localStorage.getItem("filmParams"));
  }
  return (
    <div className="container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onSubmitCapture={formik.handleSubmit}
      >
        <h3 className="text-2xl">
          T???o l???ch chi???u - {props.match.params.tenPhim}
        </h3>
        <img src={film.hinhAnh} alt="..." width={200} height={100} />
        <Form.Item label="H??? th???ng r???p">
          <Select
            options={convertSelectHTR()}
            onChange={handleChangeHeThongRap}
            placeholder="Ch???n h??? th???ng r???p"
          />
        </Form.Item>

        <Form.Item label="C???m r???p">
          <Select
            options={state.cumRapChieu?.map((cumRap, index) => ({
              label: cumRap.tenCumRap,
              value: cumRap.maCumRap,
            }))}
            onChange={handleChangeCumRap}
            placeholder="Ch???n c???m r???p"
          />
        </Form.Item>

        <Form.Item label="Ng??y chi???u gi??? chi???u">
          <DatePicker
            format="DD/MM/YYYY hh:mm:ss"
            showTime
            onChange={onChangeDate}
            onOk={onOk}
          />
        </Form.Item>

        <Form.Item label="Gi?? v??">
          <InputNumber onChange={onchangeInputNumber} />
        </Form.Item>
        <Form.Item label="Ch???c n??ng">
          <Button htmlType="submit">T???o l???ch chi???u</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
