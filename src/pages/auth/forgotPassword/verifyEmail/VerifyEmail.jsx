import "./verifyEmail.scss";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { clearMessage } from "../../../../redux/message";
import Link from "@material-ui/core/Link";
const VerifyEmail = () => {
  const [successful, setSuccessful] = useState(false);
  // const [OTP, setOTP] = useState("");
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleVerify = (e) => {
    e.preventDefault();
    navigate("/auth/setNewPassword");
    setSuccessful(true);
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

      <form className="form" onSubmit={handleVerify}>
        <p className="title_form">Nhập mã xác minh</p>
        <span className="link" style={{ marginBottom: "15px" }}>
          Mã xác minh của bạn đã được gửi vào email của bạn
        </span>
        <TextField
          className="input"
          variant="outlined"
          label="Nhập mã xác minh"
          // onChange={(e) => setOTP(e.target.value)}
          required
        />

        <Button variant="outlined" className="btn" type="submit">
          Xác nhận
        </Button>
        <Link href="/auth/login" color="#5327ef" className="link">
          ◀️ Quay về đăng nhập
        </Link>
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

export default VerifyEmail;
