import "./setNewPassword.scss";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { clearMessage } from "../../../../redux/message";
import Link from "@material-ui/core/Link";
import { resetPassword } from "../../../../redux/authSlice";
const SetNewPassword = () => {
  const [successful, setSuccessful] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { message } = useSelector((state) => state.message);
  const { capcha } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSetNewPassword = (e) => {
    e.preventDefault();
    setSuccessful(false);
    setError("");
    console.log({ capcha, password });
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 kí tự!");
    } else if (confirmPassword != password) {
      setError("Xác nhận mật khẩu phải trùng với mật khẩu!");
    } else {
      dispatch(resetPassword({ capcha, password }))
        .unwrap()
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
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
          label="Mật khẩu mới"
          onChange={(e) => setPassword(e.target.value)}
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
        {/* <span className="link">Ít nhất 1 kí tự viết thường</span>
        <span className="link">Ít nhất 1 kí tự viết hoa</span>
        <span className="link">8 đến 16 kí tự</span>
        <span className="link">
          Chỉ chữ cái , số và kí tự phổ biến thông thường
        </span> */}
        <Button
          variant="outlined"
          className="btn"
          type="submit"
          style={{ marginTop: "15px" }}
        >
          Xác nhận
        </Button>
        <span className="link">
          <Link href="/auth/login" color="#5327ef">
            ◀️ Quay về đăng nhập
          </Link>
        </span>
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
      </form>
    </div>
  );
};

export default SetNewPassword;
