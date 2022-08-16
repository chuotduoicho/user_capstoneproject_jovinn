import React from "react";
import { Avatar, Grid, Paper, Chip } from "@material-ui/core";
import moment from "moment";
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function CommentService({ comments }) {
  return (
    <div style={{ padding: 14 }}>
      {comments.length == 0 ? (
        <p>Không có bình luận</p>
      ) : (
        <Paper style={{ padding: "40px 20px", width: "100%" }}>
          {comments.map((item, index) => (
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} />
              </Grid>
              <Grid justifyContent="left" item xs>
                <h4 style={{ margin: 0, textAlign: "left", display: "flex" }}>
                  <p style={{ marginTop: "5px", marginRight: "5px" }}>
                    {item.name}
                  </p>
                  <Chip
                    label={item.type}
                    style={{
                      background: item.type == "BUYER" ? "#ba000d" : "#5e35b1",
                      color: "white",
                    }}
                  />
                </h4>
                <p style={{ textAlign: "left" }}>{item.comments}</p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  {moment(item.createAt).fromNow()}
                </p>
              </Grid>
            </Grid>
          ))}
        </Paper>
      )}
    </div>
  );
}
