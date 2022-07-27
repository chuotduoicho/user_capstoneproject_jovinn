import React, { useState } from "react";

import "./sellerCreateOffer.scss";

import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  makeStyles,
  Toolbar,
  Typography,
  List,
  ListItem,
  InputAdornment,
  ListItemText,
  ListItemAvatar,
  Avatar,
  FormControl,
} from "@material-ui/core";
import { Close, CloudUpload, AddSharp, RemoveSharp } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import { selectAllCategories } from "../../../redux/categorySlice";
import {
  addOffer,
  addRequest,
  fetchRequestsBuyer,
  fetchRequestsSeller,
} from "../../../redux/requestSlice";

import { selectTopSellers } from "../../../redux/userSlice";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { useNavigate, useParams } from "react-router-dom";

export default function SellerCreateOffer() {
  const { requestId } = useParams();
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
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const sendOffer = () => {
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
      dispatch(addOffer({ offer, requestId }))
        .unwrap()
        .then(() => {
          dispatch(fetchRequestsSeller());
          setSuccess("Tạo đề nghị thành công!");
          navigate("/sellerHome/manageOffer");
        })
        .catch(() => {
          setError("Tạo đề nghị thất bại!");
        });
    }
  };

  return (
    <div className="buyer_profile">
      <SellerHeader />
      <h1 className="buyer_profile_title">Tạo đề nghị</h1>
      <Container maxWidth="lg" className="profession_form">
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Mô tả"
            variant="outlined"
            multiline
            rows={6}
            style={{ width: "62%" }}
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
            required
          />
          <TextField
            variant="outlined"
            label="Chi phí ($)"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(e) => setOfferPrice(e.target.value)}
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
            onChange={(e) => setCancleFee(e.target.value)}
          />
        </div>
        <div className="profession_row">
          {" "}
          <Button
            variant="contained"
            color="primary"
            className="form_right_row_btn"
            onClick={sendOffer}
          >
            Gửi đề nghị
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
