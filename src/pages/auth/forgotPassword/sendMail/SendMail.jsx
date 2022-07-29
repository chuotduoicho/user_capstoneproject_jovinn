import "./sendMail.scss";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { clearMessage } from "../../../../redux/message";
import Link from "@material-ui/core/Link";
import { sendMail } from "../../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
const SendMail = () => {
  const { user } = useSelector((state) => state.auth);
  const [successful, setSuccessful] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
    if (user) navigate("/buyerHome");
  }, [dispatch]);

  const handleSendMail = (e) => {
    setIsFetching(true);
    e.preventDefault();
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Email không hợp lệ!");
    } else {
      dispatch(sendMail(email))
        .unwrap()
        .then(() => {
          setSuccessful(true);
          setIsFetching(false);
        })
        .catch(() => {
          setSuccessful(false);
          setIsFetching(false);
        });
    }

    console.log("email: ", email);
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
        {isFetching && <CircularProgress style={{ margin: "0 auto" }} />}
      </form>
    </div>
  );
};

export default SendMail;
