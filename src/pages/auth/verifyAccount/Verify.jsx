import { Link } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { verifyAccount } from "../../../redux/authSlice";

const Verify = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("verify", userId);
    dispatch(verifyAccount(userId));
  }, []);
  return (
    <div className="login">
      <Link href="/">
        <p className="logo_login">Jovinn.</p>
      </Link>
      <div className="form">
        <p className="title_form">Tài khoản đã được xác thực ✅</p>
        <span className="link">
          {" "}
          <Link href="/auth/login" color="#5327ef">
            ◀️ Trở về đăng nhập
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Verify;
