import "./menu.scss";

export default function Menu({ menuOpen, setMenuOpen }) {
  return (
    <div className={"homeMenu " + (menuOpen && "homeActive")}>
      <ul>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#intro">Giới thiệu</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#portfolio">Dịch vụ</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#works">Top seller</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#testimonials">Về chúng tôi</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#contact">Liên hệ</a>
        </li>
      </ul>
    </div>
  );
}
