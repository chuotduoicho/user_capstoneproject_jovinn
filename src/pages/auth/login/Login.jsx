import "./login.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { clearMessage } from "../../../redux/message";
import { login, logout } from "../../../redux/authSlice";
import Link from "@material-ui/core/Link";
import { fetchCurrentUser, selectCurrentUser } from "../../../redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const currentUser = useSelector(selectCurrentUser);
  const [successful, setSuccessful] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { alert } = state || {};
  useEffect(() => {
    dispatch(clearMessage());
    if (user) navigate("/buyerHome");
  }, [dispatch]);
  useEffect(() => {
    if (currentUser.isEnabled && successful) navigate("/buyerHome");
    else {
      if (successful) {
        setSuccessful(false);
        setError("Tài khoản chưa được xác thực");
        dispatch(logout());
      }
    }
  }, [currentUser]);
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    console.log("user name password: ", { username, password });
    if (
      (!(
        /^[a-zA-Z0-9]{6,30}$/.test(username) ||
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)
      ) &&
        check) ||
      password.length < 6 ||
      password.length > 30
    ) {
      setCheck(true);
    } else {
      dispatch(login({ username, password }))
        .unwrap()
        .then(() => {
          setSuccessful(true);
          dispatch(fetchCurrentUser());
          dispatch(clearMessage());
        })

        .catch(() => {
          setSuccessful(false);
        });
    }
  };
  useEffect(() => {
    if (alert) {
      toast.success(alert);
    }
  }, []);
  return (
    <div className="login">
      <ToastContainer limit={5000} position="bottom-right" />
      <Link href="/">
        <p className="logo_login">Jovinn.</p>
      </Link>

      <form className="form" onSubmit={handleLogin}>
        <p className="title_form">Đăng nhập</p>
        <TextField
          className="input"
          variant="outlined"
          label="Tên đăng nhập/Email"
          onChange={(e) => setUsername(e.target.value)}
          error={
            !(
              /^[a-zA-Z0-9]{6,30}$/.test(username) ||
              /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)
            ) && check
          }
          helperText={
            !(
              /^[a-zA-Z0-9]{6,30}$/.test(username) ||
              /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)
            ) &&
            check &&
            "Từ 6 đến 30 kí tự"
          }
          required
        />
        <TextField
          className="input"
          variant="outlined"
          type="password"
          label="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
          error={(password.length < 6 || password.length > 30) && check}
          helperText={
            (password.length < 6 || password.length > 30) &&
            check &&
            "Từ 6 đến 30 kí tự"
          }
          required
        />

        <Button variant="outlined" className="btn" type="submit">
          Đăng nhập
        </Button>
        <Link href="/auth/sendMail" color="#5327ef" className="link">
          Quên mật khẩu?
        </Link>
        <span className="link">
          Chưa có tài khoản?{" "}
          <Link href="/auth/register" color="#5327ef">
            Đăng kí
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
        {error && (
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

export default Login;
