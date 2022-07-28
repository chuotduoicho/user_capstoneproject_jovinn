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
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  selectCurrentUser,
  updateUserProfile,
  uploadFile,
} from "../../../redux/userSlice";
import { clearMessage } from "../../../redux/message";
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
        setError("Cập nhật thông tin thành công!");
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
    if (!/((09|03|07|08|05)+([0-9]{8})\b)/.test(phone)) {
      setError(
        "Số điện thoại phải có độ dài 10 số và bắt đầu bằng 09,03,07,08,05!"
      );
    } else {
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
          setError("Cập nhật thông tin thành công!");
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };
  const handleChangePassword = () => {
    dispatch(clearMessage());
    setSuccessful(false);
    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 kí tự!");
    } else if (confirmPassword != newPassword) {
      setError("Xác nhận mật khẩu phải trùng với mật khẩu!");
    } else {
      console.log({ oldPassword, newPassword, confirmPassword });
      dispatch(changePassword({ oldPassword, newPassword, confirmPassword }))
        .unwrap()
        .then(() => {
          setOpen(false);
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };
  const [open, setOpen] = useState(false);
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
              />
              <FormControl
                component="fieldset"
                className="form_right_row_input"
              >
                <FormLabel component="legend">Giới tính</FormLabel>
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
                defaultValue={format(currentUser.birthDate)}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  setIsChange(false);
                }}
              />
            </div>
            <div className="form_right_row">
              <TextField
                id="outlined-basic"
                label="Thành phố"
                variant="outlined"
                className="form_right_row_input_country"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={currentUser.country}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setIsChange(false);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Địa chỉ"
                variant="outlined"
                className="form_right_row_input_adress"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={currentUser.city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setIsChange(false);
                }}
              />
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
            <div className="form_right_row">
              {message && (
                <div
                  className={successful ? "login_success" : "login_error"}
                  role="alert"
                >
                  {message}
                </div>
              )}
              {error != "" && (
                <div
                  className={successful ? "login_success" : "login_error"}
                  role="alert"
                >
                  {error}
                </div>
              )}
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
                required
              />
              <TextField
                className="input"
                variant="outlined"
                type="password"
                label="Mật khẩu mới"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <TextField
                className="input"
                variant="outlined"
                type="password"
                label="Xác nhận mật khẩu"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={handleChangePassword}
              >
                Xác nhận
              </Button>
              <Button onClick={() => setOpen(false)} color="primary">
                Hủy
              </Button>
            </DialogActions>
          </Dialog>
        </Container>

        <Contact />
      </div>
    </div>
  );
}
