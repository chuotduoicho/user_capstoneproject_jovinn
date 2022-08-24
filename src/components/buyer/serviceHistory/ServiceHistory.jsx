import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTopSellers } from "../../../redux/userSlice";
import { Carousel } from "3d-react-carousal";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./serviceHistory.scss";
import ServiceItem from "../serviceItem/ServiceItem";
import {
  fetchServicesHistory,
  selectServicesHistory,
  selectServicesImpression,
} from "../../../redux/serviceSlice";
import { useEffect } from "react";

export default function ServiceHistory() {
  const listServiceHistory = useSelector(selectServicesHistory);
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServicesHistory());
    // setList(
    //   listServiceHistory.map((item, index) => <ServiceItem item={item} />)
    // );
  }, []);
  useEffect(() => {
    setList(
      listServiceHistory.map((item, index) => <ServiceItem item={item} />)
    );
  }, [listServiceHistory]);
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  return (
    <div className="serviceHistory" id="serviceHistory">
      <div className="history_title">ĐÃ XEM GẦN ĐÂY</div>
      <AliceCarousel
        items={list}
        responsive={responsive}
        autoplay={true}
        interval={3000}
      />
    </div>
  );
}
