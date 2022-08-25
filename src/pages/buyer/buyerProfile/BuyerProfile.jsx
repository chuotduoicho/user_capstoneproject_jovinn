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
  LinearProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  fetchCurrentUser,
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
  const [alert, setAlert] = useState(message);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(clearMessage());
    if (url) setAvatar(url);
  }, [dispatch, url]);
  const handleUploadFile = async (e) => {
    setFile(e.target.files[0]);
    setLoading(true);
    const formData = new FormData();
    console.log(file);
    formData.append("file", e.target.files[0]);
    formData.append("id", currentUser.id);
    formData.append("type", "AVATAR");
    dispatch(uploadFile(formData))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        setLoading(false);
      })
      .catch(() => {
        setSuccessful(false);
        setLoading(false);
      });
  };
  const handleUpdate = () => {
    dispatch(clearMessage());
    const id = currentUser.id;
    setSuccessful(false);
    console.log(avatar);

    if (
      firstName.length < 1 ||
      lastName.length < 1 ||
      firstName.length > 30 ||
      lastName.length > 30 ||
      !gender ||
      !birthDate ||
      !/((09|03|07|08|05)+([0-9]{8})\b)/.test(phone)
    ) {
      setCheck1(true);
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
          setCheck1(false);
          toast.success("Cập nhật thông tin thành công!");
          dispatch(fetchCurrentUser());
        })
        .catch(() => {
          setSuccessful(false);
          toast.error("Cập nhật thông tin thất bại!");
        });
    }
  };
  const handleChangePassword = () => {
    dispatch(clearMessage());
    setSuccessful(false);

    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
        oldPassword
      ) ||
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
        newPassword
      ) ||
      confirmPassword != newPassword
    ) {
      setCheck2(true);
    } else {
      dispatch(changePassword({ oldPassword, newPassword, confirmPassword }))
        .unwrap()
        .then(() => {
          setOpen(false);
          setSuccessful(true);
          setCheck2(false);
          toast.success("Đổi mật khẩu thành công!");
        })
        .catch(() => {
          setSuccessful(false);
          setOpen(false);
          setCheck2(false);
          toast.error("Đổi mật khẩu thất bại!");
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
      <div className="sections_profile_change">
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
            {loading && <LinearProgress />}
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
                }}
                error={
                  !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{1,30}$/.test(
                    firstName
                  ) && check1
                }
                helperText={
                  !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{1,30}$/.test(
                    firstName
                  ) &&
                  check1 &&
                  "Tối đa 30 kí tự"
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
                }}
                error={
                  !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{0,28}$/.test(
                    lastName
                  ) && check1
                }
                helperText={
                  !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{1,30}$/.test(
                    lastName
                  ) &&
                  check1 &&
                  "Tối đa 30 kí tự"
                }
              />
              <FormControl
                component="fieldset"
                className="form_right_row_input"
              >
                <FormLabel component="legend" error={gender == null && check1}>
                  Giới tính
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  defaultValue={gender}
                  className="form_right_row_input_radio"
                  onChange={(e) => {
                    setGender(e.target.value);
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
                }}
                type="number"
                error={!/((09|03|07|08|05)+([0-9]{8})\b)/.test(phone) && check1}
                helperText={
                  !/((09|03|07|08|05)+([0-9]{8})\b)/.test(phone) &&
                  check1 &&
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
                error={!currentUser.birthDate && check1}
                onChange={(e) => {
                  setBirthDate(e.target.value);
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
                  setDataCity(
                    dataCountry.find((val) => {
                      return val.country == e.target.value;
                    }).cities
                  );
                }}
                error={!address && check1}
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
                }}
                error={city == null && check1}
              >
                {dataCity.map((data) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="form_right_row">
              <Button
                variant="contained"
                color="primary"
                className="form_right_row_btn"
                onClick={handleUpdate}
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
                  ) && check2
                }
                helperText={
                  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
                    oldPassword
                  ) &&
                  check2 &&
                  "Từ 6 đến 30 kí tự, ít nhất 1 kí tự viết hoa và số"
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
                  ) && check2
                }
                helperText={
                  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
                    newPassword
                  ) &&
                  check2 &&
                  "Từ 6 đến 30 kí tự, ít nhất 1 kí tự viết hoa và số"
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
                error={confirmPassword != newPassword && check2}
                helperText={
                  confirmPassword != newPassword &&
                  check2 &&
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
              >
                Xác nhận
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  setCheck2(false);
                }}
                color="primary"
              >
                Hủy
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Contact />
    </div>
  );
}
