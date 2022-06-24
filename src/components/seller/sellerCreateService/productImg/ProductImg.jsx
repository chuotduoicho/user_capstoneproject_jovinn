import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Image } from "@material-ui/icons";
import React, { useState } from "react";

export default function ProductImg() {
  const [file, setFile] = useState("");
  const [value, setValue] = useState("female");
  const [age, setAge] = useState("");

  const handleChangeCountry = (event) => {
    setAge(event.target.value);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          margin: "0 auto",
          border: "2px solid #e0d4d8",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            color: "GrayText",
          }}
        >
          Sản phẩm thử nghiệm
        </p>
        <h4>Tải lên tối đa 3 hình ảnh</h4>
        <div className="tren" style={{ display: "flex", marginBottom: "50px" }}>
          <div className="formInput" style={{ marginRight: "50px" }}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              style={{ width: "100px" }}
            />
            <label
              htmlFor="file"
              style={{ border: "2px solid #e5e0e2", padding: "5px" }}
            >
              Chọn ảnh
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          <div className="formInput" style={{ marginRight: "50px" }}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              style={{ width: "100px" }}
            />
            <label
              htmlFor="file"
              style={{ border: "2px solid #e5e0e2", padding: "5px" }}
            >
              Chọn ảnh
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          <div className="formInput" style={{ marginRight: "50px" }}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              style={{ width: "100px" }}
            />
            <label
              htmlFor="file"
              style={{ border: "2px solid #e5e0e2", padding: "5px" }}
            >
              Chọn ảnh
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="duoi">
          <h4>Tải lên tài liệu của bạn</h4>
          <div className="formInput">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://png.pngtree.com/png-vector/20190118/ourlarge/pngtree-vector-files-icon-png-image_323843.jpg"
              }
              alt=""
              style={{ width: "100px" }}
            />
            <label
              htmlFor="file"
              style={{ border: "2px solid #e5e0e2", padding: "5px" }}
            >
              Chọn tài liệu
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
