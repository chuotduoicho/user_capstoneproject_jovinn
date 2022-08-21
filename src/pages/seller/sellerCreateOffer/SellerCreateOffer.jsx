import React, { useState } from "react";

import "./sellerCreateOffer.scss";

import {
  Button,
  Container,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";
import Contact from "../../../components/guest/contact/Contact";
import { addOffer, fetchRequestsSeller } from "../../../redux/requestSlice";
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
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const sendOffer = () => {
    setError("");
    setCheck(true);
    if (
      !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,500}$/.test(
        description
      )
    ) {
      setError("Chưa nhập mô tả!");
    } else if (totalDeliveryTime == 0 || totalDeliveryTime < 1) {
      setError("Chưa nhập số ngày bàn giao!");
    } else if (
      offerPrice.length == 0 ||
      offerPrice < 1 ||
      offerPrice.length > 10
    ) {
      setError("Chưa nhập chi phí!");
    } else if (cancleFee.length == 0 || cancleFee < 0 || cancleFee > 100) {
      setError("Chưa nhập phí hủy hợp đồng!");
    } else {
      dispatch(addOffer({ offer, requestId }))
        .unwrap()
        .then(() => {
          dispatch(fetchRequestsSeller());
          setSuccess("Tạo đề nghị thành công!");
          setCheck(false);
          navigate("/sellerHome/manageOffer", {
            state: {
              alert: "Tạo đề nghị thành công",
            },
          });
        })
        .catch(() => {
          setCheck(false);
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
            error={
              !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,500}$/.test(
                description
              ) && check
            }
            helperText={
              !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,500}$/.test(
                description
              ) &&
              check &&
              "Không được để trống và tối đa 500 kí tự"
            }
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
            error={totalDeliveryTime < 1 && check}
            helperText={totalDeliveryTime < 1 && check && "Tối thiểu là 1 ngày"}
            required
          />
          <TextField
            variant="outlined"
            label="Chi phí ($)"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(e) => setOfferPrice(e.target.value)}
            error={
              (offerPrice < 1 || offerPrice.length > 10 || offerPrice == "") &&
              check
            }
            helperText={
              (offerPrice < 1 || offerPrice.length > 10 || offerPrice == "") &&
              check &&
              "Tối thiểu là 1$ , tối đa 10 chữ số"
            }
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
            error={(cancleFee < 0 || cancleFee > 100 || !cancleFee) && check}
            helperText={
              (cancleFee < 0 || cancleFee > 100 || !cancleFee) &&
              check &&
              "Tối thiểu là 0% , tối đa là 100%"
            }
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
          {/* {error !== "" && <Alert severity="error">{error}</Alert>}
          {success !== "" && <Alert severity="success">{success}</Alert>} */}
        </div>
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
