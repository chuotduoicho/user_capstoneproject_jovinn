import "./intro.scss";
import { init } from "ityped";
import { useEffect, useRef } from "react";

export default function Intro() {
  const textRef = useRef();

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 60,
      strings: ["Developer", "Designer", "Content Creator"],
    });
  }, []);

  return (
    <div className="guest_intro" id="intro">
      <div className="guest_left">
        <div className="guest_imgContainer">
          <img src="assets/man.png" alt="" />
        </div>
      </div>
      <div className="guest_right">
        <div className="guest_wrapper">
          <h2>Xin chào, chúng tôi là</h2>
          <h1>Jovinn Team</h1>
          <h3>
            Freelance <span ref={textRef}></span>
          </h3>
        </div>
        <a href="#service">
          <img src="assets/down.png" alt="" />
        </a>
      </div>
    </div>
  );
}
