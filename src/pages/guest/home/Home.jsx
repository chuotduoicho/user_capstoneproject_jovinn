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
import {
  fetchServicesImpression,
  fetchServicesSearchFilter,
} from "../../../redux/serviceSlice";
import { fetchTopSellers } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTopSellers());
    dispatch(fetchServicesImpression());
    if (user) navigate("/buyerHome");
  }, []);
  const handleSetfilter = (e) => {
    if (search) {
      const obj = {
        categoryId: selected,
      };
      console.log({ search, obj });
      dispatch(fetchServicesSearchFilter({ search, obj }));
    }
  };
  return (
    <div className="guest_app">
      <Topbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        search={setSearch}
        handleSearch={handleSetfilter}
      />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="guest_sections">
        <Intro />
        <ServiceFeature
          search={search}
          selected={selected}
          setSelected={setSelected}
        />
        <Topseller />
        <Aboutus />
        <Contact />
      </div>
    </div>
  );
}
