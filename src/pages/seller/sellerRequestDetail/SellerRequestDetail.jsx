import {
  Button,
  Container,
  MenuItem,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Contact from "../../../components/guest/contact/Contact";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { selectAllCategories } from "../../../redux/categorySlice";
import {
  applyRequest,
  fetchRequestsSeller,
  selectRequestById,
} from "../../../redux/requestSlice";
import "./sellerRequestDetail.scss";

export default function SellerRequestDetail() {
  const { requestId } = useParams();
  const requestDetail = useSelector((state) =>
    selectRequestById(state, requestId)
  );
  const listCategory = useSelector(selectAllCategories);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAccept = (e) => {
    e.preventDefault();
    dispatch(applyRequest(requestId))
      .unwrap()
      .then(() => {
        dispatch(fetchRequestsSeller());
        setSuccess("Ứng tuyển thành công!");
      })
      .catch(() => {
        setError("Ứng tuyển thất bại!");
      });
  };
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
                {requestDetail.buyerFirstName +
                  " " +
                  requestDetail.buyerLastname}
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
                    Địa chỉ: {requestDetail.city}
                  </span>
                </div>
                {/* <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    Tham gia từ : 01/01/2020
                  </span>
                </div> */}
                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    Đã đăng :{" "}
                    {requestDetail.numberPostRequestCreated
                      ? requestDetail.numberPostRequestCreated
                      : 0}{" "}
                    yêu cầu
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
              value={requestDetail.categoryId}
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
              value={requestDetail.subcategoryId}
              style={{ width: "30%", margin: "10px" }}
              variant="outlined"
              disabled
            >
              {listCategory
                .find((val) => {
                  return val.id == requestDetail.categoryId;
                })
                .subCategories.map((subCategory, index) => (
                  <MenuItem key={index} value={subCategory.id}>
                    {subCategory.name}
                  </MenuItem>
                ))}
            </TextField>
          </div>
          <div className="profession_row">
            <TextField
              id="outlined-select-currency"
              select
              label="Trình độ người bán"
              defaultValue={requestDetail.recruitLevel}
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
            <div className="tags-input-container">
              {requestDetail.skillsName.map((skill, index) => (
                <div className="tag-item" key={index}>
                  <span className="text">{skill.name}</span>
                  {/* 
                  <span className="close" onClick={() => removeSkill(index)}>
                    &times;
                  </span> */}
                </div>
              ))}
              {/* <input
                onKeyDown={handleKeyDown}
                type="text"
                className="tags-input"
                placeholder="Nhập kĩ năng"
              /> */}
            </div>
          </div>
          <div className="profession_row">
            <TextField
              id="outlined-basic"
              label="Mô tả"
              variant="outlined"
              multiline
              rows={3}
              style={{ width: "62%" }}
              defaultValue={requestDetail.shortRequirement}
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
              value={requestDetail.milestoneContracts.length}
              style={{ width: "8%", margin: "10px" }}
              disabled
            />
          </div>
          {requestDetail.milestoneContracts.map((stage, index) => (
            <div className="profession_itemStage">
              {requestDetail.milestoneContracts.length > 1 && (
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
                  value={stage.startDate}
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
                  value={stage.endDate}
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
                  value={stage.description}
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
                  value={stage.milestoneFee}
                  disabled
                />
              </div>
            </div>
          ))}
          <div className="profession_row">
            <Typography variant="h4">
              Tổng chi phí :{" "}
              {requestDetail.milestoneContracts.reduce(
                (total, item) => total + parseInt(item.milestoneFee),
                0
              )}{" "}
              $
            </Typography>
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
              value={requestDetail.contractCancelFee}
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
              onClick={handleAccept}
            >
              Ứng tuyển
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="form_right_row_btn"
              style={{ marginLeft: "20px" }}
              onClick={() => navigate("/sellerHome/createOffer/" + requestId)}
            >
              Tạo đề nghị
            </Button>
          </div>
          {error !== "" && <Alert severity="error">{error}</Alert>}
          {success !== "" && <Alert severity="success">{success}</Alert>}
        </Container>
      </div>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
