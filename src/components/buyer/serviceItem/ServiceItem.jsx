import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { selectTopSellers } from "../../../redux/userSlice";
import { Carousel } from "3d-react-carousal";
import "./serviceItem.scss";
import { Button } from "@material-ui/core";

export default function ServiceItem({ item }) {
  console.log(item);
  const location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  return (
    <div className="topseller_container">
      <div className="topseller_item">
        <div className="topseller_right">
          <img src={item.imageGallery1} alt="" />
        </div>
        <div className="topseller_left">
          <div className="topseller_leftContainer">
            <h2>{item.branchName}</h2>
            {/* <h3>Tổng số hợp đồng: {item.totalFinalContract}</h3> */}
            <p>{item.title}</p>
            <h4>Giá từ: {item.fromPrice} $</h4>
            {location.pathname.includes("/buyerHome/") ? (
              <Button
                onClick={() => {
                  navigate("/buyerHome/serviceDetail/" + item.id);
                }}
              >
                {" "}
                Xem chi tiết
              </Button>
            ) : (
              <Button onClick={() => navigate("serviceDetail/" + item.id)}>
                {" "}
                Xem chi tiết
              </Button>
            )}
            {/* <Button onClick={() => navigate("serviceDetail/" + item.id)}>
              {" "}
              Xem chi tiết
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
