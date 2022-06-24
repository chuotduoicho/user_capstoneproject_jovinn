import React from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./buyerProfile.scss";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import {
  Avatar,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function BuyerProfile() {
  const [value, setValue] = React.useState("female");
  const [age, setAge] = React.useState("");

  const handleChangeCountry = (event) => {
    setAge(event.target.value);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="buyer_profile">
      <BuyerHeader />
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
            {" "}
            <TextField
              required
              id="standard-required"
              label="Họ"
              defaultValue="Họ"
              className="text_field"
            />
            <TextField
              required
              id="standard-required"
              label="Tên"
              defaultValue="Vinh"
              className="text_field"
            />
            <TextField
              disabled
              id="standard-disabled"
              label="Email"
              defaultValue="vinh@gmail.com"
              className="text_field"
            />
            <TextField
              required
              id="standard-required"
              label="Số điện thoại"
              defaultValue="0382907147"
              className="text_field"
            />
            <TextField
              required
              id="standard-required"
              label="Ngày sinh"
              defaultValue="2017-05-24"
              type="date"
              className="text_field"
            />
            <div className="btn_group">
              {" "}
              <Button variant="outlined" color="primary" className="btn">
                Cập nhật
              </Button>
              <Button variant="outlined" color="secondary" className="btn">
                Đổi mật khẩu
              </Button>
            </div>
          </div>
          <div className="form_right2">
            <FormControl className="form_control">
              <FormLabel id="demo-row-radio-buttons-group-label">
                Giới tính
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Nữ"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Nam"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Khác"
                />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth className="form_control">
              <InputLabel id="demo-simple-select-label">Quốc gia</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChangeCountry}
              >
                <MenuItem value={10}>Việt Nam</MenuItem>
                <MenuItem value={20}>Hàn Quốc</MenuItem>
                <MenuItem value={30}>Nhật bản</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth className="form_control">
              <InputLabel id="demo-simple-select-label">Thành phố</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChangeCountry}
              >
                <MenuItem value={10}>Hà Nội</MenuItem>
                <MenuItem value={20}>Hải Phòng</MenuItem>
                <MenuItem value={30}>Quảng Ninh</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              id="standard-required"
              label="Địa chỉ"
              defaultValue="FPT Hòa Lạc"
              className="text_field"
            />
            <TextField
              disabled
              id="standard-required"
              label="Ngày tham gia"
              defaultValue="2017-05-24"
              type="date"
              className="text_field"
            />
          </div>
        </Container>

        <Contact />
      </div>
    </div>
  );
}
