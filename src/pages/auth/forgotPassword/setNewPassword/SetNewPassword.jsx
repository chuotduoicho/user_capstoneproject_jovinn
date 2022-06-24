import "./setNewPassword.scss";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { clearMessage } from "../../../../redux/message";
import Link from "@material-ui/core/Link";
import Alert from "@material-ui/lab/Alert";
const SetNewPassword = () => {
  const [successful, setSuccessful] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSetNewPassword = (e) => {
    e.preventDefault();
    navigate("/auth/login");
    // console.log("user name password: ", { username, password });
    // dispatch(login({ username, password }))
    //   .unwrap()
    //   .then(() => {
    //     setSuccessful(true);
    //     navigate("/buyerhome");
    //     window.location.reload();
    //   })
    //   .catch(() => {
    //     setSuccessful(false);
    //   });
  };
  return (
    <div className="login">
      <Link href="/">
        <p className="logo_login">Jovinn.</p>
      </Link>

      <form className="form" onSubmit={handleSetNewPassword}>
        <p className="title_form">Thiết lập mật khẩu</p>
        <TextField
          className="input"
          variant="outlined"
          type="password"
          label="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          className="input"
          variant="outlined"
          type="password"
          label="Mật khẩu"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <span className="link">Ít nhất 1 kí tự viết thường</span>
        <span className="link">Ít nhất 1 kí tự viết hoa</span>
        <span className="link">8 đến 16 kí tự</span>
        <span className="link">
          Chỉ chữ cái , số và kí tự phổ biến thông thường
        </span>
        <Button
          variant="outlined"
          className="btn"
          type="submit"
          style={{ marginTop: "15px" }}
        >
          Xác nhận
        </Button>

        {message && (
          <div
            className={successful ? "login_success" : "login_error"}
            role="alert"
          >
            "Tên đăng nhập hoặc mật khẩu không đúng!"
          </div>
        )}
      </form>
    </div>
  );
};

export default SetNewPassword;
