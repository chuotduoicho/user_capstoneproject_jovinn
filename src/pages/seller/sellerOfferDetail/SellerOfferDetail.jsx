import {
  Button,
  Container,
  MenuItem,
  TextField,
  makeStyles,
  InputAdornment,
} from "@material-ui/core";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { selectAllCategories } from "../../../redux/categorySlice";
import "./sellerOfferDetail.scss";

export default function SellerOfferDetail() {
  const listCategory = useSelector(selectAllCategories);
  const [cateId, setCateId] = useState(listCategory[0].id);
  const [subCateId, setSubCateId] = useState(
    listCategory[0].subCategories[0].id
  );

  const [stages, setStages] = useState([
    { dateFrom: "", dateTo: "", product: "", price: "" },

    { dateFrom: "", dateTo: "", product: "", price: "" },
  ]);
  const handleStageChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    list[index][name] = value;
    setStages(list);
  };

  const [skills, setSkills] = useState([{ name: "", level: "" }]);

  const navigate = useNavigate();
  return (
    <div className="buyer_profile">
      <SellerHeader />
      <h1 className="buyer_profile_title">Chi tiết đề nghị</h1>
      <Container maxWidth="lg" className="profession_form">
        {" "}
        <div className="profession_row">
          <TextField
            id="outlined-select-currency"
            select
            label="Chọn danh mục"
            value={cateId}
            onChange={(e) => setCateId(e.target.value)}
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
            onChange={(e) => setSubCateId(e.target.value)}
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
          >
            Cập nhật
          </Button>
          <Button
            variant="contained"
            color="default"
            className="form_right_row_btn"
            style={{ marginLeft: "20px" }}
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>
        </div>
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
