import React, { useEffect, useReducer } from "react";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Chip,
} from "@material-ui/core";
import {
  addComment,
  deleteComment,
  fetComments,
  getAvatar,
  selectAllComment,
  selectAvatarBuyer,
  selectAvatarSeller,
} from "../../../redux/contractSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function Comment({ comments, contractId }) {
  const avatarBuyer = useSelector(selectAvatarBuyer);
  const avatarSeller = useSelector(selectAvatarSeller);
  const comment = useSelector(selectAllComment);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAvatar(contractId));
    setInterval(() => {
      dispatch(fetComments(contractId));
    }, 3000);
    dispatch(fetComments(contractId));
  }, []);
  const handleComment = () => {
    console.log("text", text);
    const obj = { contractId, text };
    dispatch(addComment(obj))
      .unwrap()
      .then(() => {
        setText("");
      })
      .catch(() => {
        // setError("Tải lên bàn giao thất bại!");
      });
  };
  const handleUpdateComment = (value) => {
    dispatch(deleteComment(value))
      .unwrap()
      .then(() => {
        setText("");
      })
      .catch(() => {
        // setError("Tải lên bàn giao thất bại!");
      });
  };
  const handleDeleteComment = (value) => {
    dispatch(deleteComment(value))
      .unwrap()
      .then(() => {
        setText("");
      })
      .catch(() => {
        // setError("Tải lên bàn giao thất bại!");
      });
  };

  console.log("commet", comments);
  // const listComment = [...comment].sort(
  //   (a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
  // );

  return (
    <div style={{ padding: 14 }}>
      {" "}
      <h1>Trao đổi thông tin</h1>
      <Paper
        style={{
          padding: "40px 20px",
          width: "1170px",
          height: 300,
          overflowX: "auto",
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        {comment.map((item, index) => (
          // <div className="container_message" style={item.type == "SELLER" ? {backgroundColor: "#f1f1f1"} : {backgroundColor: "#ddd;"}}>
          //   <Avatar alt="Remy Sharp" src={imgLink} className="img_avatar"
          //     style={item.type == "SELLER" ? {float: "left"} : {float: "right"}} />
          //   <Grid justifyContent="left" item xs>
          //     <h4 style={item.type == "SELLER" ? {float: "left", margin: 0, textAlign: "left", display: "flex"} : {float: "right", margin: 0, textAlign: "left", display: "flex"}}>
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
          //     {/* <p style={{ textAlign: "left" }}>{item.text}</p> */}
          //     <p style={item.type == "SELLER" ? {float: "left", textAlign: "left", color: "gray"} : {float: "right", textAlign: "left", color: "gray"}}>
          //       {moment(item.createAt).fromNow()}
          //     </p>
          //   </Grid>
          //   <p>{item.text}</p>
          // </div>

          <Grid container wrap="nowrap" spacing={2}>
            {item.type == "BUYER" ? (
              <>
                {" "}
                <Grid item>
                  <Avatar
                    alt="avatar"
                    src={item.type == "SELLER" ? avatarSeller : avatarBuyer}
                  />
                </Grid>
                <Grid item xs>
                  <h4
                    style={{
                      margin: 0,
                      justifyContent: "left",
                      display: "flex",
                    }}
                  >
                    <p style={{ marginTop: "5px", marginRight: "5px" }}>
                      {item.name}
                    </p>

                    <p
                      style={{
                        textAlign: "left",
                        fontSize: "12px",
                        marginTop: "8px",
                        color: "#ba000d",
                      }}
                    >
                      - {item.type}
                    </p>
                    {/* <Chip
                      label={item.type}
                      style={{
                        background:
                          item.type == "BUYER" ? "#ba000d" : "#5e35b1",
                        color: "white",
                      }}
                    /> */}
                    <EditOutlined style={{ cursor: "pointer" }} />
                    <DeleteOutline
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteComment(item.id)}
                    />
                  </h4>
                  <p style={{ textAlign: "left" }}>{item.text}</p>
                  {/* <p style={{ textAlign: "left", color: "gray" }}>
                {moment(item.createAt).fromNow()}
              </p> */}
                </Grid>
              </>
            ) : (
              <>
                {" "}
                <Grid item xs>
                  <h4
                    style={{
                      margin: 0,
                      justifyContent: "right",
                      display: "flex",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "left",
                        fontSize: "12px",
                        marginTop: "8px",
                        color: "#5e35b1",
                      }}
                    >
                      {item.type} -
                    </p>
                    {/* <Chip
                      label={item.type}
                      style={{
                        background:
                          item.type == "BUYER" ? "#ba000d" : "#5e35b1",
                        color: "white",
                      }}
                    /> */}
                    <p style={{ marginTop: "5px", marginRight: "5px" }}>
                      {item.name}
                    </p>
                  </h4>
                  <p style={{ textAlign: "right" }}>{item.text}</p>
                  {/* <p style={{ textAlign: "left", color: "gray" }}>
                {moment(item.createAt).fromNow()}
              </p> */}
                </Grid>
                <Grid item>
                  <Avatar
                    alt="avatar"
                    src={item.type == "SELLER" ? avatarSeller : avatarBuyer}
                  />
                </Grid>
              </>
            )}
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
