import React from "react";
import Contact from "../../../components/guest/contact/Contact";
import ServiceList from "../../../components/guest/serviceList/ServiceList";
import "./sellerHome.scss";
import SellerIntro from "../../../components/seller/sellerIntro/SellerIntro";
import SellerSkill from "../../../components/seller/sellerSkill/SellerSkill";
import SellerEducate from "../../../components/seller/sellerEducate/SellerEducate";
import SellerCertificate from "../../../components/seller/sellerCertificate/SellerCertificate";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { Button, Container, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAllCategories } from "../../../redux/categorySlice";
import { fetchServices, selectAllServices } from "../../../redux/serviceSlice";
import { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect } from "react";
import { fetchCurrentUser, selectCurrentUser } from "../../../redux/userSlice";
import { AddAlarm, AddSharp } from "@material-ui/icons";
import { fetchRequestsSeller } from "../../../redux/requestSlice";
function ChangeFormateDate(oldDate) {
  return oldDate.toString().split("-").reverse().join("-");
}
export default function SellerHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const currentUser = useSelector(selectCurrentUser);
  const listService = useSelector(selectAllServices);
  const [selected, setSelected] = useState("featured");
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else if (currentUser.joinSellingAt == null) {
      navigate("/errorPage");
    } else {
      dispatch(fetchCurrentUser());
      dispatch(fetchServices());
      dispatch(fetchRequestsSeller());
    }
  }, [user]);
  const dateJoin = ChangeFormateDate(currentUser.joinSellingAt);
  return (
    <div className="sellerHome">
      <SellerHeader />
      <div className="sellerHome_form">
        <div className="sellerHome_left">
          <div className="sellerHome_leftCard">
            <img
              src={
                currentUser.avatar
                  ? currentUser.avatar
                  : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
              }
              style={{ width: "230px" }}
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
          <div className="serviceList" id="intro">
            <Container className="service_cardGrid" maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {listService
                  .filter((val) => {
                    if (
                      val.userId
                        .toLowerCase()
                        .includes(currentUser.id.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  // .slice(0, 6)
                  .map((item) => (
                    <ServiceList
                      className="service"
                      id={item.id}
                      image={item.gallery.imageGallery1}
                      title={item.title}
                      sellerId={item.sellerId}
                      description={item.description}
                      rating={item.impression}
                      price={item.packages[0].price}
                      status={item.status}
                      firstName={item.firstName}
                      lastName={item.lastName}
                      avatar={item.avatar}
                    />
                  ))}
              </Grid>
              <Pagination
                count={10}
                color="primary"
                className="service_pagging"
              />
            </Container>
          </div>
        </div>{" "}
      </div>
      <div style={{ display: "flex" }}>
        <SellerIntro description={currentUser.seller.descriptionBio} />
        <SellerSkill skills={currentUser.seller.skills} />
      </div>
      <div style={{ display: "flex" }}>
        <SellerEducate educations={currentUser.seller.educations} />
        <SellerCertificate certificates={currentUser.seller.certificates} />
      </div>

      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
