import React from "react";
import Contact from "../../../components/guest/contact/Contact";
import ServiceList from "../../../components/guest/serviceList/ServiceList";
import "./sellerHome.scss";
import SellerIntro from "../../../components/seller/sellerIntro/SellerIntro";
import SellerSkill from "../../../components/seller/sellerSkill/SellerSkill";
import SellerEducate from "../../../components/seller/sellerEducate/SellerEducate";
import SellerCertificate from "../../../components/seller/sellerCertificate/SellerCertificate";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAllCategories } from "../../../redux/categorySlice";
import {
  fetchServices,
  fetchServicesByCategory,
  fetchServicesSeller,
  selectAllServices,
} from "../../../redux/serviceSlice";
import { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect } from "react";
import {
  fetchCurrentUser,
  fetchTopSellers,
  selectCurrentUser,
} from "../../../redux/userSlice";
import { AddAlarm, AddSharp } from "@material-ui/icons";
import { fetchRequestsSeller } from "../../../redux/requestSlice";
import { fetchContracts } from "../../../redux/contractSlice";
import CategoryList from "../../../components/guest/categoryList/CategoryList";
import usePagination from "../../../Pagination";
function ChangeFormateDate(oldDate) {
  return oldDate.toString().split("-").reverse().join("-");
}
export default function SellerHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const currentUser = useSelector(selectCurrentUser);
  // const listCategory = useSelector(selectAllCategories);
  const listService = useSelector(selectAllServices);
  // const [selected, setSelected] = useState(listCategory[0].id);
  const [sortBy, setSortBy] = useState("impression");
  const [sortDir, setSortDir] = useState("DESC");
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else if (currentUser.joinSellingAt == null) {
      navigate("/errorPage");
    } else {
      const sellerId = currentUser.seller.id;
      const obj = {
        status: "ACTIVE",
      };
      dispatch(fetchServicesSeller({ sellerId, obj }));
    }
  }, [user]);
  // useEffect(
  //   (e) => {
  //     const obj = {
  //       page: page,
  //       // sortBy: sortBy,
  //       // sortDir: sortDir,
  //     };
  //     dispatch(fetchServices(obj));
  //   },
  //   [page]
  // );
  const handleChange = (e, p) => {
    setPage(p);
  };
  const handleChangeSortBy = (e) => {
    // setPage(1);
    // setSortBy(e.target.value);
    // const obj = {
    //   sortBy: e.target.value,
    //   sortDir: sortDir,
    // };
    // dispatch(fetchServices(obj));
  };

  const list = listService.content ? listService.content : [];
  const dateJoin = ChangeFormateDate(currentUser.joinSellingAt);
  return (
    <div className="sellerHome">
      <SellerHeader />
      <div className="sellerHome_form">
        <div className="sellerHome_left">
          <Typography variant="h5" style={{ width: "250px" }}>
            {listService.message}
          </Typography>
          <div className="sellerHome_leftCard">
            <img
              src={
                currentUser.avatar
                  ? currentUser.avatar
                  : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
              }
              style={{ width: "230px", borderRadius: "50%" }}
              alt="avatar"
            />
            {/* <h1 className="lsTitle">Nguyễn Thế Vinh</h1> */}
            <div className="sellerHome_leftCard_lsItem">
              <label>
                {currentUser.firstName} {currentUser.lastName}
              </label>
            </div>
            <div className="sellerHome_leftCard_lsItem">
              {/* <label> {currentUser.firstName}</label> */}
              <div className="sellerHome_leftCard_lsOptions">
                {/* <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    🌏 Quốc gia: Việt Nam
                  </span>
                </div> */}
                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    Tên hãng: {currentUser.seller.brandName}
                  </span>
                </div>
                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    Cấp độ: {currentUser.seller.rankSeller}
                  </span>
                </div>

                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    Tổng số order: {currentUser.seller.totalOrderFinish}
                  </span>
                </div>
                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    Thành phố: {currentUser.country}
                  </span>
                </div>
                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    Tham gia từ : {dateJoin}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sellerHome_right">
          {/* <ul className="list">
            {listCategory.slice(0, 7).map((item) => (
              <CategoryList
                title={item.name}
                active={selected === item.id}
                setSelected={setSelected}
                id={item.id}
              />
            ))}
          </ul> */}
          <div className="sellerHome_rightbar">
            <Link to="/sellerHome/createService">
              <Button
                variant="contained"
                color="primary"
                className="sellerHome_right_btn"
              >
                <AddSharp />
                Tạo dịch vụ{" "}
              </Button>{" "}
            </Link>
            <FormControl className="sellerHome_left_btn">
              <InputLabel id="demo-simple-select-label">
                Sắp xếp theo
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sắp xếp theo"
                variant="filled"
                value={sortBy}
                onChange={handleChangeSortBy}
              >
                <MenuItem value="impression">Lượt mua</MenuItem>
                <MenuItem value="createAt">Ngày tạo</MenuItem>
                <MenuItem value="fromPrice">Giá</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="serviceList" id="intro">
            <Container className="service_cardGrid" maxWidth="md">
              {/* End hero unit */}
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
        </div>{" "}
      </div>
      <div style={{ display: "flex" }}>
        <SellerIntro
          description={currentUser.seller.descriptionBio}
          brandName={
            currentUser.seller.brandName
              ? currentUser.seller.brandName
              : "JOVINN"
          }
        />
        <SellerSkill skills={currentUser.seller.skills} id={currentUser.id} />
      </div>
      <div style={{ display: "flex" }}>
        <SellerEducate
          educations={currentUser.seller.educations}
          id={currentUser.id}
        />
        <SellerCertificate
          certificates={currentUser.seller.certificates}
          id={currentUser.id}
        />
      </div>

      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
