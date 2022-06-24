import "./serviceList.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  CardActions,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import { FavoriteOutlined } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
export default function ServiceList() {
  return (
    <div className="serviceList" id="intro">
      <Container className="service_cardGrid" maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {Array.from(Array(9)).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Link to="/buyerHome/service" style={{ textDecoration: "none" }}>
                <Card className="service_card">
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://imic.edu.vn/Contents/images/news/nghe-lap-trinh-vien-web-front-end-dang-rat-hot-hien-nay-muc-thu-nhap-cao.png"
                    alt="Paella dish"
                  />
                  <CardContent className="service_cardContent">
                    <div className="service_intro">
                      <CardMedia
                        component="img"
                        className="image"
                        image="assets/tai.jpg"
                        alt="Paella dish"
                      />
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className="name"
                      >
                        Võ Đức Tài
                      </Typography>
                    </div>

                    <Typography>
                      Tôi có thể thiết kế 1 wesite hiện đại.
                    </Typography>
                  </CardContent>
                  <CardActions className="service_cardAction">
                    <Button size="small" color="primary">
                      Chi tiết
                    </Button>
                    {/* <Button size="small" color="primary">
                    Edit
                  </Button> */}
                    <FavoriteOutlined color="secondary" />
                    <p className="service_rating">Đánh giá : 5 ⭐</p>
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Pagination count={10} color="primary" className="service_pagging" />
      </Container>
    </div>
  );
}
