import React from "react";
import Contact from "../../../components/guest/contact/Contact";
import ServiceList from "../../../components/guest/serviceList/ServiceList";
import "./sellerHome.scss";
import SellerIntro from "../../../components/seller/sellerIntro/SellerIntro";
import SellerSkill from "../../../components/seller/sellerSkill/SellerSkill";
import SellerEducate from "../../../components/seller/sellerEducate/SellerEducate";
import SellerCertificate from "../../../components/seller/sellerCertificate/SellerCertificate";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { Button } from "@material-ui/core";
export default function BuyerHome() {
  return (
    <div className="sellerHome">
      <SellerHeader />
      <div className="sellerHome_form">
        <div className="sellerHome_left">
          <div className="sellerHome_leftCard">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              style={{ width: "230px" }}
              alt="avatar"
            />
            {/* <h1 className="lsTitle">Nguyễn Thế Vinh</h1> */}
            <div className="sellerHome_leftCard_lsItem">
              <label>Nguyễn Thế Vinh</label>
            </div>
            <div className="sellerHome_leftCard_lsItem">
              <label>⭐⭐⭐⭐⭐</label>
              <div className="sellerHome_leftCard_lsOptions">
                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    🌏 Quốc gia: Việt Nam
                  </span>
                </div>
                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    🏛️ Thành phố: Ninh Bình
                  </span>
                </div>
                <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    Tham gia từ : 20/12/2020
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buyerHome_right">
          <ServiceList className="service" />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <SellerIntro />
        <SellerSkill />
      </div>
      <div style={{ display: "flex" }}>
        <SellerEducate />
        <SellerCertificate />
      </div>

      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
