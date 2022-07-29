import React, { useEffect } from "react";
import Topbar from "../../../components/guest/topbar/Topbar";
import Intro from "../../../components/guest/intro/Intro";
import Contact from "../../../components/guest/contact/Contact";
import "./home.scss";
import { useState } from "react";
import Menu from "../../../components/guest/menu/Menu";
import Topseller from "../../../components/guest/topseller/Topseller";
import Aboutus from "../../../components/guest/aboutus/Aboutus";
import ServiceFeature from "../../../components/guest/serviceFeature/ServiceFeature";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/categorySlice";
import { fetchServices } from "../../../redux/serviceSlice";
import { fetchTopSellers } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTopSellers());
    dispatch(fetchServices());
    if (user) navigate("/buyerHome");
  }, []);
  return (
    <div className="app">
      <Topbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        search={setSearch}
      />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} search={search} />
      <div className="sections">
        <Intro />
        <ServiceFeature search={search} />
        <Topseller />
        <Aboutus />
        <Contact />
      </div>
    </div>
  );
}
