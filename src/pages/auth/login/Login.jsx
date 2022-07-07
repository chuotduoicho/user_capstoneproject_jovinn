import "./login.scss";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { clearMessage } from "../../../redux/message";
import { login } from "../../../redux/authSlice";
import Link from "@material-ui/core/Link";
import { fetchCurrentUser } from "../../../redux/userSlice";
const Login = () => {
  const [successful, setSuccessful] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("user name password: ", { username, password });
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        dispatch(fetchCurrentUser());
      })
      .then(() => {
        navigate("/buyerhome");
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  return (
    <div className="login">
      <Link href="/">
        <p className="logo_login">Jovinn.</p>
      </Link>

      <form className="form" onSubmit={handleLogin}>
        <p className="title_form">Đăng nhập</p>
        <TextField
          className="input"
          variant="outlined"
          label="Tên đăng nhập"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          className="input"
          variant="outlined"
          type="password"
          label="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
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
      </form>
    </div>
  );
};

export default Login;
