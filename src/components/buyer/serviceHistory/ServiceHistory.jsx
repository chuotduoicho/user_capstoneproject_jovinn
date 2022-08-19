import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTopSellers } from "../../../redux/userSlice";
import { Carousel } from "3d-react-carousal";
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
  const listServiceImpression = useSelector(selectServicesImpression);
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServicesHistory());
    setList(
      listServiceImpression.map((item, index) => <ServiceItem item={item} />)
    );
  }, []);
  console.log(list, "length");
  return (
    <div className="serviceHistory" id="serviceHistory">
      <h1>DỊCH VỤ GẦN ĐÂY</h1>
      <Carousel slides={list} autoplay={true} interval={3000} />
    </div>
  );
}
