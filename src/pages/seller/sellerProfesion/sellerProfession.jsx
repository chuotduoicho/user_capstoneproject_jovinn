import React, { useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./sellerProfession.scss";

import { Button, Container, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { Add, Delete } from "@material-ui/icons";
import {
  fetchCurrentUser,
  joinSeller,
  selectCurrentUser,
} from "../../../redux/userSlice";

export default function SellerProfession() {
  // const currentUser = useSelector(selectCurrentUser);
  const [descriptionBio, setDescriptionBio] = useState("");
  const [skills, setSkills] = useState([{ name: "HTML" }]);
  const [edus, setEdus] = useState([
    { title: "", universityName: "", fromDate: "", major: "", toDate: "" },
  ]);

  const [certificates, setCertificates] = useState([
    { title: "", name: "", linkCer: "" },
  ]);
  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setSkills([...skills, { name: value }]);
    e.target.value = "";
  }

  function removeSkill(index) {
    setSkills(skills.filter((el, i) => i !== index));
  }

  const handleEduChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...edus];
    list[index][name] = value;
    setEdus(list);
  };

  const handleEduAdd = () => {
    setEdus([
      ...edus,
      { title: "", universityName: "", major: "", fromDate: "", toDate: "" },
    ]);
  };

  const handleEduRemove = (index) => {
    const list = [...edus];
    list.splice(index, 1);
    setEdus(list);
  };
  const handleCerChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...certificates];
    list[index][name] = value;
    setCertificates(list);
  };

  const handleCerAdd = () => {
    setCertificates([...certificates, { title: "", name: "", linkCer: "" }]);
  };

  const handleCerRemove = (index) => {
    const list = [...certificates];
    list.splice(index, 1);
    setCertificates(list);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const info = {
    descriptionBio: descriptionBio,
    skills: skills,
    educations: edus,
    certificates: certificates,
  };
  const handleSaveInfo = () => {
    // const userId = currentUser.id;
    // console.log("currentUser", currentUser.id);
    console.log("descriptionBio", descriptionBio);
    console.log("skills", skills);
    console.log("edus", edus);
    console.log("certificates", certificates);

    // console.log("info", info, userId);
    // const obj = { userId, info };
    // console.log("obj", obj);

    dispatch(joinSeller(info))
      .unwrap()
      .then(() => {
        // setSuccessful(true);
        dispatch(fetchCurrentUser());
        navigate("/sellerHome/createService");
      })

      .catch(() => {
        // setSuccessful(false);
      });
  };
  return (
    <div className="buyer_profile">
      <SellerHeader />
      <h1 className="buyer_profile_title">Thông tin nâng cao</h1>
      <Container maxWidth="lg" className="profession_form">
        {" "}
        <div className="profession_row">
          {/* <h2>Giới thiệu</h2> */}
          <TextField
            id="outlined-basic"
            label="Giới thiệu"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e) => setDescriptionBio(e.target.value)}
          />
        </div>
        <div className="profession_row">
          {" "}
          {/* <h2>Kĩ năng</h2> */}
          <div className="tags-input-container">
            {skills.map((skill, index) => (
              <div className="tag-item" key={index}>
                <span className="text">{skill.name}</span>
                <span className="close" onClick={() => removeSkill(index)}>
                  &times;
                </span>
              </div>
            ))}
            <input
              onKeyDown={handleKeyDown}
              type="text"
              className="tags-input"
              placeholder="Nhập kĩ năng"
            />
          </div>
        </div>
        <div
          className="profession_row"
          style={{ border: "2px solid  rgb(238, 225, 225)" }}
        >
          <h2 style={{ marginTop: "10px" }}>
            Học vấn{" "}
            <Button
              variant="contained"
              style={{ marginBottom: "10px" }}
              onClick={handleEduAdd}
            >
              Thêm <Add />
            </Button>
          </h2>
          {edus.map((edu, index) => (
            <div className="profession_row_item">
              <TextField
                id="outlined-basic"
                label="Tiêu đề"
                variant="outlined"
                style={{ width: "29%" }}
                name="title"
                onChange={(e) => handleEduChange(e, index)}
              />

              <TextField
                id="outlined-basic"
                label="Trường"
                variant="outlined"
                name="universityName"
                style={{ width: "25%" }}
                onChange={(e) => handleEduChange(e, index)}
              />
              <TextField
                id="outlined-basic"
                label="Ngành"
                variant="outlined"
                name="major"
                style={{ width: "20%" }}
                onChange={(e) => handleEduChange(e, index)}
              />
              {/* <TextField
                id="outlined-basic"
                label="Quốc gia"
                variant="outlined"
                style={{ width: "10%" }}
              /> */}
              <TextField
                id="outlined-basic"
                label="Năm bắt đầu "
                variant="outlined"
                type="date"
                style={{ width: "10%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                name="fromDate"
                onChange={(e) => handleEduChange(e, index)}
              />
              <TextField
                id="outlined-basic"
                label="Năm tốt nghiệp "
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "10%" }}
                name="toDate"
                onChange={(e) => handleEduChange(e, index)}
              />
              {edus.length !== 1 && (
                <Button
                  variant="contained"
                  style={{ width: "5%", height: "55px" }}
                  onClick={() => handleEduRemove(index)}
                >
                  Xóa <Delete />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div
          className="profession_row"
          style={{ border: "2px solid  rgb(238, 225, 225)" }}
        >
          {" "}
          <h2 style={{ marginTop: "10px" }}>
            Chứng chỉ{" "}
            <Button
              variant="contained"
              style={{ marginBottom: "10px" }}
              onClick={handleCerAdd}
            >
              {" "}
              Thêm <Add />
            </Button>
          </h2>
          {certificates.map((cer, index) => (
            <div className="profession_row_item">
              <TextField
                id="outlined-basic"
                label="Nội dung"
                variant="outlined"
                style={{ width: "20%" }}
                name="title"
                onChange={(e) => handleCerChange(e, index)}
              />
              <TextField
                id="outlined-basic"
                label="Tên chứng chỉ"
                variant="outlined"
                style={{ width: "20%" }}
                name="name"
                onChange={(e) => handleCerChange(e, index)}
              />
              <TextField
                id="outlined-basic"
                label="Năm"
                variant="outlined"
                style={{ width: "10%" }}
              />
              <TextField
                id="outlined-basic"
                label="Liên kết"
                variant="outlined"
                style={{ width: "40%" }}
                name="linkCer"
                onChange={(e) => handleCerChange(e, index)}
              />
              <Button
                variant="contained"
                style={{ width: "10%", height: "55px" }}
                onClick={() => handleCerRemove(index)}
              >
                Xóa <Delete />
              </Button>
            </div>
          ))}
        </div>
        <div className="profession_row">
          {" "}
          <Button variant="contained" color="primary" onClick={handleSaveInfo}>
            Lưu thông tin
          </Button>
        </div>
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
