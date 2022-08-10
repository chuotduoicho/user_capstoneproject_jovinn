import React, { useState, useEffect } from "react";
import Topseller from "../../../components/guest/topseller/Topseller";
import Contact from "../../../components/guest/contact/Contact";
import ServiceList from "../../../components/guest/serviceList/ServiceList";
import "./buyerHome.scss";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import { FilterListOutlined } from "@material-ui/icons";
import CategoryList from "../../../components/guest/categoryList/CategoryList";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllCategories } from "../../../redux/categorySlice";
import {
  fetchServices,
  fetchServicesSearchFilter,
  selectAllServices,
} from "../../../redux/serviceSlice";
import Pagination from "@material-ui/lab/Pagination";
import {
  fetchCurrentUser,
  fetchTopSellers,
  fetchWallet,
  selectCurrentUser,
} from "../../../redux/userSlice";
import { fetchRequestsBuyer } from "../../../redux/requestSlice";
export default function BuyerHome() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const listCategory = useSelector(selectAllCategories);
  const listService = useSelector(selectAllServices);
  const currentUser = useSelector(selectCurrentUser);
  console.log("currnet", currentUser);
  const [selected, setSelected] = useState(listCategory[0].id);
  const [search, setSearch] = useState("");
  const [subCateId, setSubCateId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("impression");
  const [sortDir, setSortDir] = useState("DESC");
  const [page, setPage] = useState(1);

  console.log("search", search);
  console.log("listService", listService);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else {
      dispatch(fetchTopSellers());
      dispatch(fetchCurrentUser());
      const obj = {
        categoryId: selected,
        page: page,
      };
      dispatch(fetchServices(obj));
      dispatch(fetchRequestsBuyer());
      dispatch(fetchWallet());
    }
  }, [user]);

  useEffect(
    (e) => {
      setSubCateId("");
      setPage(1);
      const obj = {
        categoryId: selected,
        page: page,
        // subCategoryId: subCateId,
      };
      dispatch(fetchServices(obj));
    },
    [selected]
  );
  useEffect(
    (e) => {
      if (!search) {
        const obj = {
          categoryId: selected,
          page: page,
          subCategoryId: subCateId,
          minPrice: minPrice,
          maxPrice: maxPrice,
          sortBy: sortBy,
          sortDir: sortDir,
        };
        dispatch(fetchServices(obj));
      } else {
        const obj = {
          categoryId: selected,
          page: page - 1,
          subCategoryId: subCateId,
          minPrice: minPrice,
          maxPrice: maxPrice,
          sortBy: sortBy,
          sortDir: sortDir,
        };
        dispatch(fetchServicesSearchFilter({ search, obj }));
      }
    },
    [page]
  );
  // useEffect(
  //   (e) => {
  //     setPage(1);
  //     const obj = {
  //       categoryId: selected,
  //       page: page,
  //       subCategoryId: subCateId,
  //     };
  //     dispatch(fetchServices(obj));
  //   },
  //   [subCateId]
  // );
  const handleChange = (e, p) => {
    setPage(p);
  };

  const handleSetfilter = (e) => {
    setPage(1);

    if (!search) {
      const obj = {
        categoryId: selected,
        page: page,
        subCategoryId: subCateId,
        minPrice: minPrice,
        maxPrice: maxPrice,
        sortBy: sortBy,
        sortDir: sortDir,
      };
      dispatch(fetchServices(obj));
    } else {
      const obj = {
        categoryId: selected,
        page: page - 1,
        subCategoryId: subCateId,
        minPrice: minPrice,
        maxPrice: maxPrice,
        sortBy: sortBy,
        sortDir: sortDir,
      };
      dispatch(fetchServicesSearchFilter({ search, obj }));
    }
  };
  const list = listService.content ? listService.content : [];
  return (
    <div className="buyerHome">
      <BuyerHeader search={setSearch} handleSearch={handleSetfilter} />

      <div className="buyerHome_form">
        <div className="buyerHome_left">
          <Typography variant="h5" style={{ width: "250px" }}>
            {listService.message}
          </Typography>
          <div className="listSearch">
            <h1 className="lsTitle">
              Lọc dịch vụ
              <FilterListOutlined />
            </h1>
            <div className="lsItem">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subCateId}
                  label="Age"
                  onChange={(e) => setSubCateId(e.target.value)}
                >
                  {listCategory
                    .find((val) => {
                      return val.id == selected;
                    })
                    .subCategories.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
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
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá cao nhất <small>($)</small>:
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <label>Sắp xếp theo:</label>
                <div className="lsOptionItem">
                  {/* <InputLabel id="s1">Sắp xếp theo</InputLabel> */}
                  <Select
                    labelId="s1"
                    id="demo-simple-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="impression">Lượt mua</MenuItem>
                    <MenuItem value="createAt">Ngày tạo</MenuItem>
                    <MenuItem value="fromPrice">Giá</MenuItem>
                  </Select>
                </div>
                {/* <label>Tăng/giảm:</label> */}
                <div className="lsOptionItem">
                  <Select
                    labelId="Tăng/Giảm"
                    id="demo-simple-select"
                    value={sortDir}
                    onChange={(e) => setSortDir(e.target.value)}
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="ASC">Tăng dần</MenuItem>
                    <MenuItem value="DESC">Giảm dần</MenuItem>
                  </Select>
                </div>
                <div className="lsOptionItem">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSetfilter}
                  >
                    Lọc
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buyerHome_right">
          <ul className="list">
            {listCategory.slice(0, 7).map((item) => (
              <CategoryList
                title={item.name}
                active={selected === item.id}
                setSelected={setSelected}
                id={item.id}
              />
            ))}
          </ul>

          <div className="serviceList" id="intro">
            <Container className="service_cardGrid" maxWidth="md">
              <Grid container spacing={4}>
                {list.map((item) => (
                  <ServiceList
                    className="service"
                    id={item.id}
                    image={item.imageGallery1}
                    title={item.title}
                    price={item.fromPrice}
                    avatar={item.avatar}
                    impression={item.impression}
                    branchName={item.branchName}
                    rankSeller={item.rankSeller}
                    ratingPoint={item.ratingPoint}
                    totalOrderFinish={item.totalOrderFinish}
                  />
                ))}
              </Grid>
              <Pagination
                count={listService.totalPages}
                color="primary"
                className="service_pagging"
                page={page}
                onChange={handleChange}
              />
            </Container>
          </div>
        </div>
      </div>
      <div className="sections">
        <Topseller />
        <Contact />
      </div>
    </div>
  );
}
