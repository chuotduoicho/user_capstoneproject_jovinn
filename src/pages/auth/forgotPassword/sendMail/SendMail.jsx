import "./sendMail.scss";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { clearMessage } from "../../../../redux/message";
import Link from "@material-ui/core/Link";
import { sendMail } from "../../../../redux/authSlice";
const SendMail = () => {
  const [successful, setSuccessful] = useState(false);
  const [email, setEmail] = useState("");
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSendMail = (e) => {
    e.preventDefault();
    navigate("/auth/verifyMail");
    console.log("email: ", email);
    // dispatch(sendMail(email))
    //   .unwrap()
    //   .then(() => {
    //     setSuccessful(true);
    //     navigate("/auth/verifyMail");
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

      <form className="form" onSubmit={handleSendMail}>
        <p className="title_form">Đặt lại mật khẩu</p>
        <TextField
          className="input"
          variant="outlined"
          label="Địa chỉ Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button variant="outlined" className="btn" type="submit">
          Tiếp theo
        </Button>
        <Link href="/auth/login" color="#5327ef" className="link">
          ◀️ Trở lại đăng nhập
        </Link>
        {message && (
          <div
            className={successful ? "login_success" : "login_error"}
            role="alert"
          >
            Email không tồn tại
          </div>
        )}
      </form>
    </div>
  );
};

export default SendMail;
