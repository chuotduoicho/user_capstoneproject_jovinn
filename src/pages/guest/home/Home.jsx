import React from "react";
import Topbar from "../../../components/guest/topbar/Topbar";
import Intro from "../../../components/guest/intro/Intro";
import Contact from "../../../components/guest/contact/Contact";
import "./home.scss";
import { useState } from "react";
import Menu from "../../../components/guest/menu/Menu";
import Topseller from "../../../components/guest/topseller/Topseller";
import Aboutus from "../../../components/guest/aboutus/Aboutus";
import ServiceFeature from "../../../components/guest/serviceFeature/ServiceFeature";
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="app">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="sections">
        <Intro />
        <ServiceFeature />
        <Topseller />
        <Aboutus />
        <Contact />
      </div>
    </div>
  );
}
