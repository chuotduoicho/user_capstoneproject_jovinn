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
export default function ServiceList({
  id,
  image,
  description,
  rating,
  title,
  price,
  status,
  firstName,
  lastName,
  avatar,
}) {
  console.log(image);
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
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className="name"
            >
              {firstName} {lastName}
            </Typography>
          </div>
          <Typography variant="h6">{title}.</Typography>
          <Typography>{description}.</Typography>
        </CardContent>
        <CardActions
          className={
            status === "ACTIVE" ? "service_cardAction" : "service_cardAction2"
          }
        >
          <Button size="small" color="primary">
            Chi tiết
          </Button>
          <p className="service_rating">Giá : {price} $</p>
        </CardActions>
      </Card>
    </Grid>
  );
}
