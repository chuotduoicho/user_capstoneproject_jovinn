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
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearMessage());
    if (user) navigate("/buyerHome");
  }, [dispatch]);

  const handleRegister = (e) => {
    setCheck(true);
    dispatch(clearMessage());
    e.preventDefault();
    setSuccessful(false);
    console.log({ username, password, email, firstName, lastName });
    if (
      !/^[a-zA-Z0-9]{6,30}$/.test(username) ||
      !/^[[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{2,30}$/.test(
        lastName
      ) ||
      !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{2,30}$/.test(
        firstName
      )
    ) {
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*\s]{6,30}$/.test(
        password
      )
    ) {
    } else if (confirmPassword != password) {
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
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
          error={!/^[a-zA-Z0-9]{6,30}$/.test(username) && check}
          helperText={
            !/^[a-zA-Z0-9]{6,30}$/.test(username) &&
            check &&
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
          type="password"
          variant="outlined"
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
        <div style={{ display: "flex" }}>
          <TextField
            className="input"
            variant="outlined"
            label="Họ"
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: "48%", marginRight: "4%" }}
            error={
              !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{2,30}$/.test(
                firstName
              ) && check
            }
            helperText={
              !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{3,30}$/.test(
                firstName
              ) &&
              check &&
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
            error={
              !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{2,30}$/.test(
                lastName
              ) && check
            }
            helperText={
              !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{2,30}$/.test(
                lastName
              ) &&
              check &&
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
          error={!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && check}
          helperText={
            !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) &&
            check &&
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
