import React, { useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./sellerOfferCreate.scss";

import {
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { Add, Delete } from "@material-ui/icons";
import { fetchCurrentUser, joinSeller } from "../../../redux/userSlice";

export default function SellerOfferCreate() {
  const [chooseStage, setChooseStage] = useState("");
  const [numberStage, setNumberStage] = useState(2);
  return (
    <div className="buyer_profile">
      <SellerHeader />
      <h1 className="buyer_profile_title">Tạo đề nghị</h1>
      <Container maxWidth="lg" className="profession_form">
        {" "}
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Mô tả"
            variant="outlined"
            style={{ width: "100%" }}
            // onChange={(e) => setDescriptionBio(e.target.value)}
          />
        </div>
        <div className="profession_row">
          <p>Tùy chọn giai đoạn :</p>
          <RadioGroup
            aria-label="gender"
            name="role"
            value={chooseStage}
            onChange={(e) => setChooseStage(e.target.value)}
            className="input_radio"
          >
            <FormControlLabel
              value="one"
              control={<Radio />}
              label="Bàn giao 1 lần "
            />
            <FormControlLabel
              value="many"
              control={<Radio />}
              label="Bàn giao nhiều lần"
            />
          </RadioGroup>
        </div>
        {chooseStage == "one" && (
          <>
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
                // onChange={(e) => setDescriptionBio(e.target.value)}
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
                // onChange={(e) => setDescriptionBio(e.target.value)}
              />
            </div>
            <div className="profession_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Sản phẩm bàn giao"
                variant="outlined"
                style={{ width: "62%" }}
                // onChange={(e) => setDescriptionBio(e.target.value)}
              />
            </div>
            <div className="profession_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Tổng chi phí"
                variant="outlined"
                type="number"
                style={{ width: "30%", margin: "10px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">$</InputAdornment>
                  ),
                }}
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
                    <InputAdornment position="end">
                      % Tổng chi phí
                    </InputAdornment>
                  ),
                }}
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
                Gửi đề nghị
              </Button>
            </div>
          </>
        )}
        <div className="profession_row">
          {" "}
          <TextField
            id="outlined-basic"
            label="Số giai đoạn"
            variant="outlined"
            type="number"
            defaultValue={numberStage}
            style={{ width: "10%", margin: "10px" }}
            onChange={(e) => setNumberStage(e.target.value)}
          />
        </div>
        <>
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
              // onChange={(e) => setDescriptionBio(e.target.value)}
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
              // onChange={(e) => setDescriptionBio(e.target.value)}
            />
          </div>
          <div className="profession_row">
            {" "}
            <TextField
              id="outlined-basic"
              label="Sản phẩm bàn giao"
              variant="outlined"
              style={{ width: "62%" }}
              // onChange={(e) => setDescriptionBio(e.target.value)}
            />
          </div>
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
              Gửi đề nghị
            </Button>
          </div>
        </>
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
