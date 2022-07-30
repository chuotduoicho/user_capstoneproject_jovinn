import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUrl } from "../../../../redux/url";
import { selectCurrentUser, uploadFile } from "../../../../redux/userSlice";

export default function ProductImg({
  galley1,
  galley2,
  galley3,
  document,
  galley1V,
  galley2V,
  galley3V,
  documentV,
}) {
  const { url } = useSelector((state) => state.url);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  console.log(galley1V);
  console.log(galley2V);
  console.log(galley3V);
  const handleUploadFile1 = async (e) => {
    setFile1(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("id", currentUser.id);
    formData.append("type", "AVATAR");
    dispatch(uploadFile(formData))
      .unwrap()
      .then(() => {
        setCheck1(true);
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
      })
      .catch(() => {});
  };
  const handleUploadFile2 = async (e) => {
    setFile2(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("id", currentUser.id);
    formData.append("type", "BOX");
    dispatch(uploadFile(formData))
      .unwrap()
      .then(() => {
        setCheck1(false);
        setCheck2(true);
        setCheck3(false);
        setCheck4(false);
      })
      .catch(() => {});
  };
  const handleUploadFile3 = async (e) => {
    setFile3(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("id", currentUser.id);
    formData.append("type", "BOX");
    dispatch(uploadFile(formData))
      .unwrap()
      .then(() => {
        setCheck1(false);
        setCheck2(false);
        setCheck3(true);
        setCheck4(false);
      })
      .catch(() => {});
  };
  const handleUploadFile4 = async (e) => {
    setFile4(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("id", currentUser.id);
    formData.append("type", "BOX");
    dispatch(uploadFile(formData))
      .unwrap()
      .then(() => {
        setCheck1(false);
        setCheck2(false);
        setCheck3(false);
        setCheck4(true);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (url && check1) {
      galley1(url);
      console.log(url);
      dispatch(clearUrl());
    }
  }, [handleUploadFile1]);
  useEffect(() => {
    if (url && check2) {
      galley2(url);
      console.log(url);
      dispatch(clearUrl());
    }
  }, [handleUploadFile2]);
  useEffect(() => {
    if (url && check3) {
      galley3(url);
      console.log(url);
    }
  }, [handleUploadFile3]);
  useEffect(() => {
    if (url && check4) document(url);
  }, [handleUploadFile4]);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
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
              src={file1 ? URL.createObjectURL(file1) : galley1}
              alt=""
              style={{ width: "100px", height: "80px" }}
            />
            <label
              htmlFor="file1"
              style={{ border: "2px solid #e5e0e2", padding: "5px" }}
            >
              Chọn ảnh
            </label>
            <input
              type="file"
              id="file1"
              onChange={handleUploadFile1}
              style={{ display: "none" }}
            />
          </div>
          <div className="formInput" style={{ marginRight: "50px" }}>
            <img
              src={file2 ? URL.createObjectURL(file2) : galley2V}
              alt=""
              style={{ width: "100px", height: "80px" }}
            />
            <label
              htmlFor="file2"
              style={{ border: "2px solid #e5e0e2", padding: "5px" }}
            >
              Chọn ảnh
            </label>
            <input
              type="file"
              id="file2"
              onChange={handleUploadFile2}
              style={{ display: "none" }}
            />
          </div>
          <div className="formInput" style={{ marginRight: "50px" }}>
            <img
              src={file3 ? URL.createObjectURL(file3) : galley3V}
              alt=""
              style={{ width: "100px", height: "80px" }}
            />
            <label
              htmlFor="file3"
              style={{ border: "2px solid #e5e0e2", padding: "5px" }}
            >
              Chọn ảnh
            </label>
            <input
              type="file"
              id="file3"
              onChange={handleUploadFile3}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="duoi">
          <h4>Tải lên tài liệu của bạn</h4>
          <div className="formInput">
            <img
              src={file4 ? URL.createObjectURL(file4) : documentV}
              alt=""
              style={{ width: "100px" }}
            />
            <TextField
              required
              id="standard-required"
              className="text_field"
              type="file"
              label="Chọn tài liệu"
              onChange={handleUploadFile4}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
