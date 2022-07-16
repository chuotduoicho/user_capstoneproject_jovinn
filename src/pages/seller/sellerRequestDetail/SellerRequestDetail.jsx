import {
  Button,
  Container,
  MenuItem,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Contact from "../../../components/guest/contact/Contact";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { selectAllCategories } from "../../../redux/categorySlice";
import "./sellerRequestDetail.scss";

export default function SellerRequestDetail() {
  const listCategory = useSelector(selectAllCategories);
  const [cateId, setCateId] = useState(listCategory[0].id);
  const [subCateId, setSubCateId] = useState(
    listCategory[0].subCategories[0].id
  );

  const [stages, setStages] = useState([
    { dateFrom: "", dateTo: "", product: "", price: "" },

    { dateFrom: "", dateTo: "", product: "", price: "" },
  ]);

  const [skills, setSkills] = useState([{ name: "", level: "" }]);

  const navigate = useNavigate();
  return (
    <div className="buyer_profile">
      <SellerHeader />
      <h1 className="buyer_profile_title">Chi tiết yêu cầu</h1>
      <div className="sellerHome_form">
        <div className="sellerHome_left">
          <div className="sellerHome_leftCard">
            <div className="sellerHome_leftCard_lsOptionItem">
              <h3>Thông tin của khách hàng</h3>
            </div>
            <img
              src={
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
              }
              style={{ width: "230px" }}
              alt="avatar"
            />
            {/* <h1 className="lsTitle">Nguyễn Thế Vinh</h1> */}
            <div className="sellerHome_leftCard_lsItem">
              <label>
                {/* {currentUser.firstName} {currentUser.lastName} */}
                Nguyễn Vinh
              </label>
            </div>
            <div className="sellerHome_leftCard_lsItem">
              {/* <label> {currentUser.firstName}</label> */}
              <div className="sellerHome_leftCard_lsOptions">
                {/* <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    🌏 Quốc gia: Việt Nam
                  </span>
                </div> */}
                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    🏛️ Thành phố: Ninh bình
                  </span>
                </div>
                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    Tham gia từ : 01/01/2020
                  </span>
                </div>
                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    Đã đăng : 9 yêu cầu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container maxWidth="lg" className="profession_form">
          {" "}
          <div className="profession_row">
            <TextField
              id="outlined-select-currency"
              select
              label="Chọn danh mục"
              value={cateId}
              style={{ width: "30%", margin: "10px" }}
              variant="outlined"
              disabled
            >
              {listCategory.map((category, index) => (
                <MenuItem key={index} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Chọn danh mục con"
              value={subCateId}
              style={{ width: "30%", margin: "10px" }}
              variant="outlined"
              disabled
            >
              {listCategory
                .find((val) => {
                  return val.id == cateId;
                })
                .subCategories.map((subCategory, index) => (
                  <MenuItem key={index} value={subCategory.id}>
                    {subCategory.name}
                  </MenuItem>
                ))}
            </TextField>
          </div>
          <div
            className="profession_row"
            // style={{ border: "2px solid rgb(238, 225, 225)" }}
          >
            {skills.map((stage, index) => (
              <div className="profession_rowLeft">
                <TextField
                  id="outlined-basic"
                  label="Kĩ Năng"
                  variant="outlined"
                  style={{ width: "30%", margin: "10px" }}
                  name="name"
                  defaultValue="HTML"
                  disabled
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Trình độ"
                  defaultValue="BEGINNER"
                  name="level"
                  style={{ width: "23%", margin: "10px" }}
                  variant="outlined"
                  disabled
                >
                  <MenuItem value="BEGINNER">BEGINNER</MenuItem>
                  <MenuItem value="ADVANCED">ADVANCED</MenuItem>
                  <MenuItem value="COMPETENT">COMPETENT</MenuItem>
                  <MenuItem value="PROFICIENT">PROFICIENT</MenuItem>
                  <MenuItem value="EXPERT">EXPERT</MenuItem>
                </TextField>
              </div>
            ))}
          </div>
          <div className="profession_row">
            <TextField
              id="outlined-basic"
              label="Mô tả"
              variant="outlined"
              multiline
              rows={3}
              style={{ width: "62%" }}
              defaultValue="Tôi muốn thật nhiều tiền"
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
          </div>
          <div className="profession_row">
            {" "}
            <TextField
              id="outlined-basic"
              label="Số giai đoạn"
              variant="outlined"
              type="number"
              value={stages.length}
              style={{ width: "8%", margin: "10px" }}
              disabled
            />
          </div>
          {stages.map((stage, index) => (
            <div className="profession_itemStage">
              {stages.length > 1 && (
                <div className="profession_row">
                  <h3>Giai đoạn {index + 1}</h3>
                </div>
              )}

              <div className="profession_row">
                <TextField
                  id="outlined-basic"
                  label="Ngày bắt đầu"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "30%", margin: "10px" }}
                  name="dateFrom"
                  disabled
                />
                <TextField
                  id="outlined-basic"
                  label="Ngày kết thúc"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "30%", margin: "10px" }}
                  name="dateTo"
                  disabled
                />
              </div>
              <div className="profession_row">
                {" "}
                <TextField
                  id="outlined-basic"
                  label="Sản phẩm bàn giao"
                  variant="outlined"
                  multiline
                  rows={3}
                  style={{ width: "62%" }}
                  name="product"
                  disabled
                />
              </div>
              <div className="profession_row">
                {" "}
                <TextField
                  id="outlined-basic"
                  label="Chi phí"
                  variant="outlined"
                  type="number"
                  style={{ width: "30%", margin: "10px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">$</InputAdornment>
                    ),
                  }}
                  name="price"
                  disabled
                />
              </div>
            </div>
          ))}
          <div className="profession_row">
            {" "}
            <TextField
              id="outlined-basic"
              label="Tổng chi phí"
              variant="outlined"
              type="number"
              style={{ width: "30%", margin: "10px" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
              disabled
              // onChange={(e) => setDescriptionBio(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Phí hủy hợp đồng"
              variant="outlined"
              type="number"
              style={{ width: "30%", margin: "10px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">% Tổng chi phí</InputAdornment>
                ),
              }}
              disabled
              // onChange={(e) => setDescriptionBio(e.target.value)}
            />
          </div>
          <div className="profession_row">
            {" "}
            <Button
              variant="contained"
              color="primary"
              className="form_right_row_btn"

              // onClick={handleOpen}
            >
              Ứng tuyển
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="form_right_row_btn"
              style={{ marginLeft: "20px" }}
              onClick={() => navigate("/sellerHome/createOffer/test")}
            >
              Tạo đề nghị
            </Button>
          </div>
        </Container>
      </div>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
