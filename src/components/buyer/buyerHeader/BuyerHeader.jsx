import "./buyerHeader.scss";
import {
  SearchOutlined,
  NotificationImportantOutlined,
  ChatBubbleOutline,
} from "@material-ui/icons";
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
export default function BuyerHeader() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
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
            />
            <Link to="#" style={{ textDecoration: "none" }}>
              <SearchOutlined className="search_icon" />
            </Link>
          </div>
        </div>
        <div className="right">
          <div className="item">
            <NotificationImportantOutlined className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutline className="icon" />
            <div className="counter">2</div>
          </div>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className="item"
          >
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
                      <Link to="/sellerHome" style={{ textDecoration: "none" }}>
                        <MenuItem style={{ color: "black" }}>
                          Trở thành người bán
                        </MenuItem>
                      </Link>
                      <Link
                        to="/buyerhome/offers"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Quản lí offer
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
