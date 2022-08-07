import React, { useEffect, useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./buyerProfile.scss";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  selectCurrentUser,
  updateUserProfile,
  uploadFile,
} from "../../../redux/userSlice";
import { clearMessage } from "../../../redux/message";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
function format(date) {
  date = new Date(date);

  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  return year + "-" + month + "-" + day;
}
export default function BuyerProfile() {
  const currentUser = useSelector(selectCurrentUser);
  const [successful, setSuccessful] = useState(false);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [gender, setGender] = useState(currentUser.gender);
  const [birthDate, setBirthDate] = useState(format(currentUser.birthDate));
  const [phone, setPhone] = useState(currentUser.phoneNumber);
  const [address, setAddress] = useState(currentUser.country);
  const [city, setCity] = useState(currentUser.city);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const { message } = useSelector((state) => state.message);
  const { url } = useSelector((state) => state.url);
  const [error, setError] = useState("");
  const [isChange, setIsChange] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(clearMessage());
    if (url) setAvatar(url);
  }, [dispatch, url]);
  const handleUploadFile = async (e) => {
    setFile(e.target.files[0]);
    const formData = new FormData();
    console.log(file);
    formData.append("file", e.target.files[0]);
    formData.append("id", currentUser.id);
    formData.append("type", "AVATAR");
    dispatch(uploadFile(formData))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        setIsChange(false);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  const handleUpdate = () => {
    const id = currentUser.id;
    setSuccessful(false);
    console.log(avatar);
    setError("");
    dispatch(
      updateUserProfile({
        id,
        firstName,
        lastName,
        gender,
        birthDate,
        phone,
        address,
        city,
        avatar,
      })
    )
      .unwrap()
      .then(() => {
        setSuccessful(true);
        toast.success(message ? message : "Cập nhật thông tin thành công!");
        setIsChange(true);
      })
      .catch(() => {
        setSuccessful(false);
        toast.error(message ? message : "Cập nhật thông tin thất bại!");
      });
  };
  const handleChangePassword = () => {
    dispatch(clearMessage());
    setSuccessful(false);
    dispatch(changePassword({ oldPassword, newPassword, confirmPassword }))
      .unwrap()
      .then(() => {
        setOpen(false);
        setSuccessful(true);
        toast.success(message ? message : "Đổi mật khẩu thành công!");
      })
      .catch(() => {
        setSuccessful(false);
        setOpen(false);
        toast.error(message ? message : "Dổi mật khẩu thất bại!");
      });
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [dataCountry, setDataCountry] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://countriesnow.space/api/v0.1/countries`
        );
        console.log(response.data.data);
        setDataCountry(response.data.data);
        if (currentUser.country)
          setDataCity(
            response.data.data.find((val) => {
              return val.country == currentUser.country;
            }).cities
          );
        setError(null);
      } catch (err) {
        console.log(err.message);
        setDataCountry([]);
      }
    };
    getData();
  }, []);
  // console.log(dataCountry[0].cities);
  return (
    <div className="buyer_profile">
      {location.pathname == "/buyerhome/profile" ? (
        <BuyerHeader />
      ) : (
        <SellerHeader />
      )}
      <h1 className="buyer_profile_title">Thông tin cá nhân</h1>
      <div className="sections_profile">
        <Container maxWidth="sm" className="form">
          <div className="form_left">
            <Avatar
              className="image"
              alt="Remy Sharp"
              src={file ? URL.createObjectURL(file) : avatar}
            />
            <TextField
              required
              id="standard-required"
              className="text_field"
              type="file"
              onChange={handleUploadFile}
            />
          </div>
          <div className="form_right">
            <div className="form_right_row">
              <TextField
                id="outlined-basic"
                label="Họ"
                variant="outlined"
                className="form_right_row_input"
                defaultValue={currentUser.firstName}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setIsChange(false);
                }}
                error={firstName.length < 2 || firstName.length > 30}
                helperText={
                  (firstName.length < 2 || firstName.length > 30) &&
                  "Từ 2 đến 30 kí tự"
                }
              />

              <TextField
                id="outlined-basic"
                label="Tên"
                variant="outlined"
                className="form_right_row_input"
                defaultValue={currentUser.lastName}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setIsChange(false);
                }}
                error={lastName.length < 2 || lastName.length > 30}
                helperText={
                  (lastName.length < 2 || lastName.length > 30) &&
                  "Từ 2 đến 30 kí tự"
                }
              />
              <FormControl
                component="fieldset"
                className="form_right_row_input"
              >
                <FormLabel component="legend" error={gender == null}>
                  Giới tính
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  defaultValue={gender}
                  className="form_right_row_input_radio"
                  onChange={(e) => {
                    setGender(e.target.value);
                    setIsChange(false);
                  }}
                >
                  <FormControlLabel
                    value="MALE"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    value="FEMALE"
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
                InputLabelProps={{
                  shrink: true,
                }}
                className="form_right_row_input"
                defaultValue={currentUser.email}
                disabled
              />
              <TextField
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                className="form_right_row_input"
                defaultValue={currentUser.phoneNumber}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setIsChange(false);
                }}
                type="number"
                error={!/((09|03|07|08|05)+([0-9]{8})\b)/.test(phone)}
                helperText={
                  !/((09|03|07|08|05)+([0-9]{8})\b)/.test(phone) &&
                  "10 số và bắt đầu bằng 09,03,07,08,05!"
                }
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="date"
                label="Ngày sinh"
                InputLabelProps={{
                  shrink: true,
                }}
                className="form_right_row_input"
                defaultValue={
                  currentUser.birthDate ? format(currentUser.birthDate) : ""
                }
                error={!currentUser.birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  setIsChange(false);
                }}
              />
            </div>
            <div className="form_right_row">
              <TextField
                id="outlined-basic"
                select
                label="Quốc gia"
                variant="outlined"
                className="form_right_row_input"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={currentUser.country}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setIsChange(false);
                  setDataCity(
                    dataCountry.find((val) => {
                      return val.country == e.target.value;
                    }).cities
                  );
                }}
                error={address == null}
              >
                {dataCountry.map((data) => (
                  <MenuItem key={data.country} value={data.country}>
                    {data.country}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-basic"
                select
                label="Tỉnh/Thành phố"
                variant="outlined"
                className="form_right_row_input"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={currentUser.city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setIsChange(false);
                }}
                error={city == null}
              >
                {dataCity.map((data) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField
                id="outlined-basic"
                label="Số nhà/Thôn/Quận huyện"
                variant="outlined"
                className="form_right_row_input"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={currentUser.city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setIsChange(false);
                }}
              /> */}
            </div>
            <div className="form_right_row">
              <Button
                variant="contained"
                color="primary"
                className="form_right_row_btn"
                onClick={handleUpdate}
                disabled={isChange}
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
            </div>
          </div>
          <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">Đổi mật khẩu</DialogTitle>
            <DialogContent style={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <TextField
                className="input"
                variant="outlined"
                type="password"
                label="Mật khẩu cũ"
                onChange={(e) => setOldPassword(e.target.value)}
                style={{ marginBottom: "15px" }}
                error={
                  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
                    oldPassword
                  )
                }
                helperText={
                  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
                    oldPassword
                  ) && "Từ 6 đến 30 kí tự, ít nhất 1 kí tự viết hoa và số"
                }
                required
              />
              <TextField
                className="input"
                variant="outlined"
                type="password"
                label="Mật khẩu mới"
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ marginBottom: "15px" }}
                error={
                  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
                    newPassword
                  )
                }
                helperText={
                  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
                    newPassword
                  ) && "Từ 6 đến 30 kí tự, ít nhất 1 kí tự viết hoa và số"
                }
                required
              />
              <TextField
                className="input"
                variant="outlined"
                type="password"
                label="Xác nhận mật khẩu"
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ marginBottom: "15px" }}
                error={confirmPassword != newPassword}
                helperText={
                  confirmPassword != newPassword &&
                  "Mật khẩu xác nhận phải giống với mật khẩu"
                }
                required
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={handleChangePassword}
                disabled={
                  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
                    oldPassword
                  ) ||
                  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
                    newPassword
                  ) ||
                  confirmPassword != newPassword
                }
              >
                Xác nhận
              </Button>
              <Button onClick={() => setOpen(false)} color="primary">
                Hủy
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
        <ToastContainer position="bottom-right" autoClose={2000} />
        <Contact />
      </div>
    </div>
  );
}
