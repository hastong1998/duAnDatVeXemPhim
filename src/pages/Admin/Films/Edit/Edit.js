import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhapPhimUploadAction,
  layThongTinPhimAction,
  themPhimUploadHinhAction,
} from "../../../../redux/actions/QuanLyPhimActions";
import { GROUPID } from "../../../../util/settings/config";

const Edit = (props) => {
  const dispatch = useDispatch();
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);
  useEffect(() => {
    let { id } = props.match.params;

    dispatch(layThongTinPhimAction(id));

    return () => {};
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim?.maPhim,
      tenPhim: thongTinPhim?.tenPhim,
      trailer: thongTinPhim?.trailer,
      moTa: thongTinPhim?.moTa,
      ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
      dangChieu: thongTinPhim?.dangChieu,
      sapChieu: thongTinPhim?.sapChieu,
      hot: thongTinPhim?.hot,
      danhGia: thongTinPhim?.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      values.maNhom = GROUPID;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      dispatch(capNhapPhimUploadAction(formData));
    },
  });
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };
  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3 className="">Thêm phim mới</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim">
        <Input
          name="tenPhim"
          value={formik.values.tenPhim}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input
          name="trailer"
          value={formik.values.trailer}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Mô tả ">
        <Input
          name="moTa"
          value={formik.values.moTa}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          format="DD/MM/YYYY"
          value={moment(formik.values.ngayKhoiChieu)}
          onChange={handleChangeDatePicker}
        />
      </Form.Item>
      <Form.Item label="Đang chiếu">
        <Switch
          name="dangChieu"
          checked={formik.values.dangChieu}
          onChange={handleChangeSwitch("dangChieu")}
        />
      </Form.Item>
      <Form.Item label="Sắp chiếu">
        <Switch
          name="sapChieu"
          checked={formik.values.sapChieu}
          onChange={handleChangeSwitch("sapChieu")}
        />
      </Form.Item>
      <Form.Item label="Hot">
        <Switch
          name="hot"
          checked={formik.values.hot}
          onChange={handleChangeSwitch("hot")}
        />
      </Form.Item>
      <Form.Item label="Đánh giá">
        <InputNumber
          min={1}
          max={10}
          value={formik.values.danhGia}
          onChange={handleChangeInputNumber("danhGia")}
        />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input type="file" onChange={handleChangeFile} />
        <br />
        <img
          width={200}
          height={200}
          src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc}
          alt=""
        ></img>
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button className="bg-blue-700 text-white p-2" type="submit">
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  );
};
export default Edit;
