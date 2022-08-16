import React from "react";
import {
  Divider,
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Chip,
} from "@material-ui/core";
import { addComment, fetchContractDetail } from "../../../redux/contractSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function Comment({ comments, contractId }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const handleComment = () => {
    console.log("text", text);
    const obj = { contractId, text };
    dispatch(addComment(obj))
      .unwrap()
      .then(() => {
        dispatch(fetchContractDetail(contractId));
        setText("");
      })
      .catch(() => {
        // setError("Tải lên bàn giao thất bại!");
      });
  };
  console.log("commet", comments);
  const listComment = [...comments].sort(
    (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );
  return (
    <div style={{ padding: 14 }}>
      {" "}
      <h1>Bình luận</h1>
      <Paper style={{ padding: "40px 20px", width: "1170px" }}>
        {listComment.map((item, index) => (
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
              <p style={{ textAlign: "left" }}>{item.text}</p>
              <p style={{ textAlign: "left", color: "gray" }}>
                {moment(item.createAt).fromNow()}
              </p>
            </Grid>
          </Grid>
        ))}
      </Paper>
      <TextField
        id="outlined-basic"
        placeholder="Viết bình luận"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={text}
        style={{ border: "30px" }}
        onChange={(e) => setText(e.target.value)}
        InputProps={{
          endAdornment: (
            <Button
              variant="contained"
              style={{ backgroundColor: "#6a50ca", color: "white" }}
              onClick={handleComment}
            >
              Gửi
            </Button>
          ),
        }}
      />
    </div>
  );
}
