import "./buyerHeader.scss";
import { SearchOutlined } from "@material-ui/icons";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { logout } from "../../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { selectCurrentUser } from "../../../redux/userSlice";
export default function BuyerHeader({ search }) {
  const currentUser = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleJoinSeller = () => {
    if (currentUser.joinSellingAt) {
      navigate("/sellerHome");
    } else {
      navigate("/sellerHome/sellerTerms");
    }
  };
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  //  Process UI
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className="buyerHeader ">
      <div className="buyerHeader_wrapper">
        <div className="left">
          <a href="/buyerHome" className="logo">
            Jovinn.
          </a>
          <div className="search">
            <input
              type="text"
              placeholder="Tìm kiếm theo dịch vụ ..."
              className="search_text"
              onChange={(e) => search(e.target.value)}
            />
            <SearchOutlined className="search_icon" />
          </div>
        </div>
        <div className="right">
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className="item"
          >
            {/* Xin chào, {currentUser.username} */}
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </Button>

          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <Link
                        to="/buyerhome/profile"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Thông tin cá nhân
                        </MenuItem>
                      </Link>

                      <MenuItem
                        style={{ color: "black" }}
                        onClick={handleJoinSeller}
                      >
                        Trở thành người bán
                      </MenuItem>

                      <Link
                        to="/buyerhome/createRequest"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Tạo yêu cầu
                        </MenuItem>
                      </Link>
                      <Link
                        to="/buyerhome/manageRequest"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Quản lí yêu cầu
                        </MenuItem>
                      </Link>
                      <Link
                        to="/buyerhome/manageOrder"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Quản lí đặt hàng
                        </MenuItem>
                      </Link>
                      <Link
                        to="/buyerhome/manageContract"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Quản lí hợp đồng
                        </MenuItem>
                      </Link>

                      <Link
                        to="/buyerhome/wallet"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Quản lí ví
                        </MenuItem>
                      </Link>
                      <Link
                        to="/auth/login"
                        style={{ textDecoration: "none" }}
                        onClick={logOut}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Đăng xuất
                        </MenuItem>
                      </Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </div>
  );
}
