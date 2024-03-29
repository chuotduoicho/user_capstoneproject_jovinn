import "./setNewPassword.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { clearMessage } from "../../../../redux/message";
import Link from "@material-ui/core/Link";
import { resetPassword } from "../../../../redux/authSlice";
const SetNewPassword = () => {
  const { user } = useSelector((state) => state.auth);
  const [successful, setSuccessful] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState("");
  const { message } = useSelector((state) => state.message);
  const { capcha } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearMessage());
    if (user) navigate("/buyerHome");
  }, [dispatch]);

  const handleSetNewPassword = (e) => {
    e.preventDefault();
    setCheck(true);
    setSuccessful(false);

    console.log({ capcha, password });
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*\s]{6,30}$/.test(
        password
      )
    ) {
    } else if (confirmPassword != password) {
    } else {
      dispatch(resetPassword({ capcha, password }))
        .unwrap()
        .then(() => {
          navigate("/auth/login", {
            state: { alert: "Tạo mật khẩu mới thành công!" },
          });
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
          error={
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*\s]{6,30}$/.test(
              password
            ) && check
          }
          helperText={
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*\s]{6,30}$/.test(
              password
            ) &&
            check &&
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
          error={confirmPassword != password && check}
          helperText={
            confirmPassword != password &&
            check &&
            "Mật khẩu xác nhận phải giống với mật khẩu"
          }
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
        {successful && (
          <div
            className={successful ? "login_success" : "login_error"}
            role="alert"
          >
            Tạo mật khẩu thành công!
          </div>
        )}
      </form>
    </div>
  );
};

export default SetNewPassword;
