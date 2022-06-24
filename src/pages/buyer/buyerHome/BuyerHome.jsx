import React, { useState, useEffect } from "react";
import Topseller from "../../../components/guest/topseller/Topseller";
import Contact from "../../../components/guest/contact/Contact";
import ServiceList from "../../../components/guest/serviceList/ServiceList";
import "./buyerHome.scss";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import { FilterListOutlined } from "@material-ui/icons";
import CategoryList from "../../../components/guest/categoryList/CategoryList";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function BuyerHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [selected, setSelected] = useState("featured");
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth/login");
  //   }
  // }, [user]);
  const list = [
    {
      id: "featured",
      title: "Featured",
    },
    {
      id: "web",
      title: "Web App",
    },
    {
      id: "mobile",
      title: "Mobile App",
    },
    {
      id: "design",
      title: "Design",
    },
    {
      id: "content",
      title: "Content",
    },
  ];
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="buyerHome">
      <BuyerHeader />
      <div className="buyerHome_form">
        <div className="buyerHome_left">
          <div className="listSearch">
            <h1 className="lsTitle">
              Bộ lọc <FilterListOutlined />
            </h1>
            <div className="lsItem">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>IT</MenuItem>
                  <MenuItem value={20}>Content</MenuItem>
                  <MenuItem value={30}>Bảo vệ</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="lsItem">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Thành phố</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Hà Nội</MenuItem>
                  <MenuItem value={20}>Ninh Bình</MenuItem>
                  <MenuItem value={30}>Nghệ An</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="lsItem">
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá thấp nhất <small>($)</small>:
                  </span>
                  <input
                    type="number"
                    // onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá cao nhất <small>($)</small>:
                  </span>
                  <input
                    type="number"
                    // onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <label>Đánh giá</label>
                <div className="lsOptionItem">
                  <Rating name="size-small" defaultValue={2} size="small" />
                </div>
              </div>
              {/* <button onClick={handleClick}>Search</button> */}
            </div>
          </div>
        </div>
        <div className="buyerHome_right">
          <ul className="list">
            {list.map((item) => (
              <CategoryList
                title={item.title}
                active={selected === item.id}
                setSelected={setSelected}
                id={item.id}
              />
            ))}
          </ul>
          <ServiceList className="service" />
        </div>
      </div>
      <div className="sections">
        <Topseller />
        <Contact />
      </div>
    </div>
  );
}
