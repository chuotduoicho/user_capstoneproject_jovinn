import "./topbar.scss";
import { SearchOutlined } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@material-ui/core";
export default function Topbar({
  menuOpen,
  setMenuOpen,
  search,
  handleSearch,
}) {
  const navigate = useNavigate();
  return (
    <div className={menuOpen ? "guest_topbar active" : "guest_topbar"}>
      <div className="guest_wrapper">
        <div className="guest_left">
          <a href="/" className="guest_logo">
            Jovinn.
          </a>
          {/* <div className="guest_search">
            <input
              type="text"
              placeholder="Tìm kiếm theo dịch vụ ..."
              className="search_text"
              onChange={(e) => {
                search(e.target.value);
                setMenuOpen(false);
                navigate("#service");
              }}
            />
            <a href="#service">
              <SearchOutlined className="search_icon" />
            </a> 
             </div>*/}
          <TextField
            placeholder="Tìm kiếm dịch vụ ..."
            variant="outlined"
            InputProps={{
              endAdornment: (
                <a href="#service">
                  <SearchOutlined
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleSearch}
                  />
                </a>
              ),
            }}
            style={{
              width: "500px",
              borderRadius: "4px",
            }}
            onChange={(e) => {
              search(e.target.value);
              setMenuOpen(false);
              navigate("#service");
            }}
            size="small"
          />

          <div className="guest_itemButtons">
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
        <div className="guest_right">
          <div
            className="guest_hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="guest_line1"></span>
            <span className="guest_line2"></span>
            <span className="guest_line3"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
