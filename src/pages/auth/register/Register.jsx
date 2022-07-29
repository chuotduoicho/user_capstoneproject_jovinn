import "./register.scss";
import {
  Radio,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { register } from "../../../redux/authSlice";
import { clearMessage } from "../../../redux/message";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const [successful, setSuccessful] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("BUYER");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearMessage());
    if (user) navigate("/buyerHome");
  }, [dispatch]);

  const handleRegister = (e) => {
    setError("");
    setIsFetching(true);
    dispatch(clearMessage());
    e.preventDefault();
    setSuccessful(false);
    console.log({ username, password, email, firstName, lastName, role });
    if (!/^[a-z]*$/.test(username)) {
      setError("Tên đăng nhập không hợp lệ!");
    } else if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 kí tự!");
    } else if (confirmPassword != password) {
      setError("Xác nhận mật khẩu phải trùng với mật khẩu!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Email không hợp lệ!");
    } else {
      dispatch(
        register({ username, password, email, firstName, lastName, role })
      )
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
  };
  return (
    <div className="login">
      <Link href="/">
        <p className="logo_login">Jovinn.</p>
      </Link>
      <form className="form" onSubmit={handleRegister}>
        <p className="title_form">Đăng kí</p>
        <TextField
          className="input"
          variant="outlined"
          label="Tên đăng nhập"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          className="input"
          type="password"
          variant="outlined"
          label="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          className="input"
          type="password"
          variant="outlined"
          label="Xác nhận mật khẩu"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div style={{ display: "flex" }}>
          <TextField
            className="input"
            variant="outlined"
            label="Họ"
            onChange={(e) => setFirstName(e.target.value)}
            style={{ marginRight: "50px" }}
            required
          />
          <TextField
            className="input"
            variant="outlined"
            label="Tên"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <TextField
          className="input"
          variant="outlined"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button variant="outlined" className="btn" type="submit">
          Đăng kí
        </Button>
        <span className="link">
          Đã có tài khoản?{" "}
          <Link href="/auth/login" color="#5327ef">
            Đăng nhập
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
        {isFetching && <CircularProgress style={{ margin: "0 auto" }} />}
      </form>
    </div>
  );
};

export default Register;
