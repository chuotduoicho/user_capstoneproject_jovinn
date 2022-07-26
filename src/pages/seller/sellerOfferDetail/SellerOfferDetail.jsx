import {
  Button,
  Container,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Contact from "../../../components/guest/contact/Contact";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { selectOfferById } from "../../../redux/requestSlice";
import "./sellerOfferDetail.scss";

export default function SellerOfferDetail() {
  const { offerId } = useParams();
  const offerDetail = useSelector((state) => selectOfferById(state, offerId));
  console.log("offerDetail", offerDetail);
  const [description, setDescription] = useState("");
  const [totalDeliveryTime, setTotalDeliveryTime] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [cancleFee, setCancleFee] = useState(0);
  const offer = {
    descriptionBio: description,
    totalDeliveryTime: totalDeliveryTime,
    offerPrice: offerPrice,
    cancelFee: cancleFee,
  };
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateOffer = () => {
    setError("");

    if (description == "") {
      setError("Chưa nhập mô tả!");
    } else if (totalDeliveryTime == 0) {
      setError("Chưa nhập số ngày bàn giao!");
    } else if (offerPrice == 0) {
      setError("Chưa nhập chi phí!");
    } else if (cancleFee == 0) {
      setError("Chưa nhập phí hủy hợp đồng!");
    } else {
      // dispatch(addOffer({ offer, requestId }))
      //   .unwrap()
      //   .then(() => {
      //     dispatch(fetchRequestsSeller());
      //     setSuccess("Tạo đề nghị thành công!");
      //   })
      //   .catch(() => {
      //     setError("Tạo đề nghị thất bại!");
      //   });
    }
  };

  return (
    <div className="buyer_profile">
      <SellerHeader />
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
            onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setTotalDeliveryTime(e.target.value)}
            defaultValue={offerDetail.totalDeliveryTime}
            required
          />
          <TextField
            variant="outlined"
            label="Chi phí ($)"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(e) => setOfferPrice(e.target.value)}
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
            onChange={(e) => setCancleFee(e.target.value)}
          />
        </div>
        <div className="profession_row">
          <h3>Trạng thái: {offerDetail.offerRequestStatus}</h3>
        </div>
        <div className="profession_row">
          <Button
            variant="contained"
            color="primary"
            className="form_right_row_btn"
            onClick={updateOffer}
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
