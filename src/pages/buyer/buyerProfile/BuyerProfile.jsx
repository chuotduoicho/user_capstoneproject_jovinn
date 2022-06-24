import React from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./buyerProfile.scss";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  // Modal,
  Radio,
  RadioGroup,
  TextField
} from "@material-ui/core";

export default function BuyerProfile() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Thông tin cá nhân</h1>
      <div className="sections_profile">
        <Container maxWidth="sm" className="form">
          <div className="form_left">
            <Avatar
              className="image"
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            />
            <TextField
              required
              id="standard-required"
              className="text_field"
              type="file"
            />
          </div>
          <div className="form_right">
            <div className="form_right_row">
              <TextField
                id="outlined-basic"
                label="Họ"
                variant="outlined"
                className="form_right_row_input"
              />

              <TextField
                id="outlined-basic"
                label="Tên"
                variant="outlined"
                className="form_right_row_input"
              />
              <FormControl
                component="fieldset"
                className="form_right_row_input"
              >
                <FormLabel component="legend">Giới tính</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value="male"
                  className="form_right_row_input_radio"
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Nữ"
                  />

                  {/* <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  /> */}
                </RadioGroup>
              </FormControl>
            </div>
            <div className="form_right_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="form_right_row_input"
              />
              <TextField
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
                className="form_right_row_input"
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="date"
                label="Ngày sinh"
                InputLabelProps={{
                  shrink: true
                }}
                className="form_right_row_input"
              />
            </div>
            <div className="form_right_row">
              <TextField
                id="outlined-basic"
                label="Địa chỉ"
                variant="outlined"
                className="form_right_row_input_adress"
              />
            </div>
            <div className="form_right_row">
              <Button
                variant="contained"
                color="primary"
                className="form_right_row_btn"
              >
                Cập nhật
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="form_right_row_btn"
                onClick={handleOpen}
              >
                Đổi mật khẩu
              </Button>
              {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                sadasdasd
              </Modal> */}
            </div>
          </div>
        </Container>

        <Contact />
      </div>
    </div>
  );
}
