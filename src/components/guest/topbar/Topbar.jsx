import "./topbar.scss";
import { SearchOutlined } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
export default function Topbar({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();
  return (
    <div className={"topbarHome " + (menuOpen && "active")}>
      <div className="topbarHome_wrapper">
        <div className="left">
          <a href="/" className="logo">
            Jovinn.
          </a>
          <div className="search">
            <input
              type="text"
              placeholder="Tìm kiếm theo dịch vụ ..."
              className="search_text"
            />
            <Link to="#" style={{ textDecoration: "none" }}>
              <SearchOutlined className="search_icon" />
            </Link>
          </div>
          <div className="itemButtons">
            <Button
              className="button"
              onClick={() => navigate("/auth/register")}
            >
              <span>Đăng kí</span>
            </Button>
            <Button
              variant="outlined"
              className="button"
              onClick={() => navigate("/auth/login")}
            >
              <span>Đăng nhập</span>
            </Button>
          </div>
        </div>
        <div className="right">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
