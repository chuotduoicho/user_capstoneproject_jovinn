import React from "react";
import { Avatar, Grid, Paper, Chip } from "@material-ui/core";
import moment from "moment";
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function CommentService({ ratings }) {
  return (
    <div className="rating_details" style={{ padding: 0 }}>
      {ratings.length == 0 ? (
        <p>Không có bình luận</p>
      ) : (
        <Paper style={{ padding: "40px 0px", width: "100%" }}>
          {ratings.map((rating, index) => (
            <div className="infor_rating">
              <div className="card_rating">
                <img
                  src={
                    rating.avatarBuyer ? rating.avatarBuyer :
                    "https://elements-video-cover-images-0.imgix.net/files/127924249/previewimg.jpg?auto=compress&crop=edges&fit=crop&fm=jpeg&h=800&w=1200&s=13978d17ddbcd5bafe3a492797e90465"
                  }
                  className="avatar_buyer"
                />
                <p>{rating.fullNameBuyer}
                  <h4>Điểm đánh giá - {rating.ratingPoint} ⭐</h4>
                </p>
              </div>
              <div className="comment_rating">
                <p>
                  {rating.comment}
                </p>
              </div>
            </div>
              // <Grid container wrap="nowrap" spacing={2}>
              //   <Grid item>
              //     <Avatar alt="Remy Sharp" src={imgLink} />
              //   </Grid>
              //   <Grid justifyContent="left" item xs>
              //     <h4 style={{ margin: 0, textAlign: "left", display: "flex" }}>
              //       <p style={{ marginTop: "5px", marginRight: "5px" }}>
              //         {item.name}
              //       </p>
              //       <Chip
              //         label={item.type}
              //         style={{
              //           background: item.type == "BUYER" ? "#ba000d" : "#5e35b1",
              //           color: "white",
              //         }}
              //       />
              //     </h4>
              //     <p style={{ textAlign: "left" }}>{item.comments}</p>
              //     <p style={{ textAlign: "left", color: "gray" }}>
              //       {moment(item.createAt).fromNow()}
              //     </p>
              //   </Grid>
              // </Grid>
            ))}
        </Paper>
      )}
    </div>
  );
}
