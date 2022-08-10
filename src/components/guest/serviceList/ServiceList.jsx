import "./serviceList.scss";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import { Shop, ShoppingCart, Visibility } from "@material-ui/icons";
export default function ServiceList({
  id,
  image,
  title,
  price,
  avatar,
  impression,
  branchName,
  rankSeller,
  ratingPoint,
  totalOrderFinish,
}) {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={4} height="415">
      <Card
        className="service_card"
        onClick={() => navigate("serviceDetail/" + id)}
      >
        <CardMedia
          component="img"
          height="194"
          image={
            image
              ? image
              : "https://img6.thuthuatphanmem.vn/uploads/2022/01/28/anh-ve-co-trang-nu-trung-quoc-dep-nhat_044336041.jpg"
          }
          alt="Paella dish"
        />
        <CardContent className="service_cardContent">
          <div className="service_intro">
            <CardMedia
              component="img"
              className="image"
              image={
                avatar
                  ? avatar
                  : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
              }
              alt="Paella dish"
            />
            <div className="service_introContent">
              <Typography variant="h5" className="service_introContent_brand">
                {branchName}
              </Typography>
              <Typography variant="h7" className="name">
                {rankSeller} {ratingPoint}⭐
              </Typography>
              <Typography variant="h7" className="name">
                Số đơn hoàn thành: {totalOrderFinish}
              </Typography>
            </div>
          </div>
          <Typography className="service_cardContentDes" variant="h3">
            {title}
          </Typography>
        </CardContent>
        <CardActions className={"service_cardAction"}>
          <p className="service_rating">Giá từ: {price} $</p>
          <Typography variant="h7" className="name">
            Lượt mua: {totalOrderFinish} 🛒
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
}
