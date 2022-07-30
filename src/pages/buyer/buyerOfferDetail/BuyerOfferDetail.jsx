import {
  Button,
  Container,
  MenuItem,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import { selectAllCategories } from "../../../redux/categorySlice";
import { selectOfferById } from "../../../redux/requestSlice";
import "./buyerOfferDetail.scss";

export default function BuyerOfferDetail() {
  const { offerId } = useParams();
  const offerDetail = useSelector((state) => selectOfferById(state, offerId));
  console.log("offerDetail", offerDetail);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const acceptOffer = () => {
    navigate("/buyerHome/paymentOffer", { state: { offerDetail } });
  };

  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Chi tiết đề nghị</h1>
      <Container maxWidth="lg" className="profession_form">
        {" "}
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Mô tả"
            variant="outlined"
            multiline
            rows={6}
            style={{ width: "62%" }}
            defaultValue={offerDetail.descriptionBio}
          />
        </div>
        <div className="profession_row">
          <TextField
            style={{
              marginRight: "5px",
            }}
            variant="outlined"
            label="Số ngày giao"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            defaultValue={offerDetail.totalDeliveryTime}
            required
          />
          <TextField
            variant="outlined"
            label="Chi phí ($)"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            defaultValue={offerDetail.offerPrice}
            required
          />
        </div>
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Phí hủy hợp đồng"
            variant="outlined"
            type="number"
            style={{ width: "30%", margin: "10px" }}
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">% Tổng chi phí</InputAdornment>
              ),
            }}
            defaultValue={offerDetail.cancelFee}
          />
        </div>
        <div className="profession_row">
          <h3>Trạng thái: {offerDetail.offerRequestStatus}</h3>
        </div>
        <div className="profession_row">
          {offerDetail.offerRequestStatus !== "ACCEPTED" && (
            <Button
              variant="contained"
              color="primary"
              className="form_right_row_btn"
              onClick={acceptOffer}
            >
              Chấp nhận đề nghị
            </Button>
          )}

          <Button
            variant="contained"
            color="default"
            className="form_right_row_btn"
            style={{ marginLeft: "20px" }}
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>
          {error !== "" && <Alert severity="error">{error}</Alert>}
          {success !== "" && <Alert severity="success">{success}</Alert>}
        </div>
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
