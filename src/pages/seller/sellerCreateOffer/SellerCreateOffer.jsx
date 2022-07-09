import React, { useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./sellerCreateOffer.scss";

import {
  Button,
  Container,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { AddSharp, RemoveSharp } from "@material-ui/icons";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";

export default function SellerCreateOffer() {
  const [chooseStage, setChooseStage] = useState("one");
  const [description, setDescription] = useState("");
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

  const handleStageAdd = () => {
    setStages([
      ...stages,
      { dateFrom: "", dateTo: "", product: "", price: "" },
    ]);
  };

  const handleStageRemove = () => {
    if (stages.length > 2) {
      const list = [...stages];
      list.pop();
      setStages(list);
    }
  };
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
            multiline
            rows={3}
            style={{ width: "62%" }}
            onChange={(e) => setDescription(e.target.value)}
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
        {chooseStage == "one" ? (
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
                multiline
                rows={3}
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
        ) : (
          <>
            <div className="profession_row">
              {" "}
              <Button style={{ height: "70px" }} onClick={handleStageRemove}>
                <RemoveSharp />
              </Button>
              <TextField
                id="outlined-basic"
                label="Số giai đoạn"
                variant="outlined"
                type="number"
                value={stages.length}
                style={{ width: "8%", margin: "10px" }}
                disabled
              />
              <Button style={{ height: "70px" }} onClick={handleStageAdd}>
                <AddSharp />
              </Button>
            </div>
            {stages.map((stage, index) => (
              <div className="profession_itemStage">
                <div className="profession_row">
                  <h3>Giai đoạn {index + 1}</h3>
                </div>
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
                    multiline
                    rows={3}
                    style={{ width: "62%" }}
                    // onChange={(e) => setDescriptionBio(e.target.value)}
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
                    // onChange={(e) => setDescriptionBio(e.target.value)}
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
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
