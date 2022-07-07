import "./aboutus.scss";

export default function Aboutus() {
  const data = [
    {
      id: 1,
      name: "Đoàn Minh Đức",
      title: "Backend Developer",
      img: "assets/duc.jpg",
      icon: "assets/twitter.png",
      desc: "Chúng tôi là số 2, không ai là số 1.",
    },
    {
      id: 2,
      name: "Võ Đức Tài",
      title: "Frontend Developer",
      img: "assets/tai.jpg",
      icon: "assets/twitter.png",
      desc: "Kết sức mạnh, nối thành công.",
    },
    {
      id: 3,
      name: "Nguyễn Thế Vinh",
      title: "Leader",
      img: "assets/vinh.jpg",
      icon: "assets/leader-icon.png",
      desc: "Suy nghĩ không cũ về vấn đề không mới. ",
      featured: true,
    },
    {
      id: 4,
      name: "Lê Thanh Tùng",
      title: "Backend Developer",
      img: "assets/tung.jpg",
      icon: "assets/linkedin.png",
      desc: "Gieo ý tưởng, gặt thành công.",
    },
    {
      id: 5,
      name: "Trần Xuân Sơn",
      title: "Backend Developer",
      img: "assets/son.jpg",
      icon: "assets/linkedin.png",
      desc: "Học hết mình, chơi nhiệt tình",
    },
  ];
  return (
    <div className="aboutus" id="testimonials">
      <h1>THÀNH VIÊN DỰ ÁN</h1>
      <div className="aboutus_container">
        {data.map((d) => (
          <div className={d.featured ? "card featured" : "card"}>
            <div className="aboutus_top">
              <img className="aboutus_user" src={d.img} alt="" />
            </div>
            <div className="aboutus_center">{d.desc}</div>
            <div className="aboutus_bottom">
              <h3>{d.name}</h3>
              <h4>{d.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
