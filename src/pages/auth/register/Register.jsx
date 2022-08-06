import "./register.scss";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { register } from "../../../redux/authSlice";
import { clearMessage } from "../../../redux/message";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const [successful, setSuccessful] = useState(false);
  const { isFetching } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearMessage());
    if (user) navigate("/buyerHome");
  }, [dispatch]);

  const handleRegister = (e) => {
    // setError("");
    dispatch(clearMessage());
    e.preventDefault();
    setSuccessful(false);
    console.log({ username, password, email, firstName, lastName });
    if (
      !/^[a-zA-Z0-9]{6,30}$/.test(username) ||
      firstName.length < 2 ||
      firstName.length > 30 ||
      lastName.length < 2 ||
      lastName.length > 30
    ) {
      // setError("Tên đăng nhập không hợp lệ!");
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
        password
      )
    ) {
      // setError("Mật khẩu phải có ít nhất 6 kí tự!");
    } else if (confirmPassword != password) {
      // setError("Xác nhận mật khẩu phải trùng với mật khẩu!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      // setError("Email không hợp lệ!");
    } else {
      dispatch(register({ username, password, email, firstName, lastName }))
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
      <form className="form" onSubmit={handleRegister}>
        <p className="title_form">Đăng kí</p>
        <TextField
          className="input"
          variant="outlined"
          label="Tên đăng nhập"
          onChange={(e) => setUsername(e.target.value)}
          error={!/^[a-zA-Z0-9]{6,30}$/.test(username)}
          helperText={
            !/^[a-zA-Z0-9]{6,30}$/.test(username) &&
            "Từ 6 đến 30 kí tự và không gồm kí tự đặc biệt"
          }
          required
        />
        <TextField
          className="input"
          type="password"
          variant="outlined"
          label="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
          error={
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
              password
            )
          }
          helperText={
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,30}$/.test(
              password
            ) && "Từ 6 đến 30 kí tự, ít nhất 1 kí tự viết hoa và số"
          }
          required
        />
        <TextField
          className="input"
          type="password"
          variant="outlined"
          label="Xác nhận mật khẩu"
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword != password}
          helperText={
            confirmPassword != password &&
            "Mật khẩu xác nhận phải giống với mật khẩu"
          }
          required
        />
        <div style={{ display: "flex" }}>
          <TextField
            className="input"
            variant="outlined"
            label="Họ"
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: "48%", marginRight: "4%" }}
            error={firstName.length < 2 || firstName.length > 30}
            helperText={
              (firstName.length < 2 || firstName.length > 30) &&
              "Từ 2 đến 30 kí tự"
            }
            required
          />
          <TextField
            className="input"
            variant="outlined"
            label="Tên"
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: "48%" }}
            error={lastName.length < 2 || lastName.length > 30}
            helperText={
              (lastName.length < 2 || lastName.length > 30) &&
              "Từ 2 đến 30 kí tự"
            }
            required
          />
        </div>

        <TextField
          className="input"
          variant="outlined"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          error={!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}
          helperText={
            !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) &&
            "Email phải theo mẫu 'mysite123@gmail.com'"
          }
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
        {isFetching && <CircularProgress style={{ margin: "0 auto" }} />}
      </form>
    </div>
  );
};

export default Register;
