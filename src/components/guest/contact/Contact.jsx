import { Box, Container, Grid } from "@material-ui/core";
import { Facebook, Instagram, Mail, Person, Twitter } from "@material-ui/icons";
import { useState } from "react";
import "./contact.scss";

export default function Contact() {
  const [message, setMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
  };
  return (
    <div className="contact" id="contact">
      <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} className="box">
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} className="head">
                Giới thiệu
              </Box>
              <Box className="item">Nghề nghiệp</Box>
              <Box className="item">Báo chí & Tin tức</Box>
              <Box className="item">Quan hệ đối tác</Box>
              <Box className="item">Chính sách bảo mật</Box>
              <Box className="item">Điều khoản dịch vụ</Box>
              <Box className="item">Khiếu nại sở hữu trí tuệ</Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} className="head">
                Hỗ trợ
              </Box>
              <Box className="item">Trợ giúp & hỗ trợ</Box>
              <Box className="item">Niềm tin & An toàn</Box>
              <Box className="item">Bán trên Jovinn</Box>
              <Box className="item">Mua trên Jovinn</Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} className="head">
                Liên hệ
              </Box>
              <Box className="item">
                {" "}
                <Person className="icon" />
                <span> +382 907 147</span>
              </Box>
              <Box className="item">
                {" "}
                <Mail className="icon" />
                <span> jovinn@fpt.edu.vn</span>
              </Box>
              <Box className="item">
                <Facebook className="icon" />
                <Instagram className="icon" />
                <Twitter className="icon" />
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 10 }}>
            Tạo bởi Jovinn Team {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </div>
  );
}
