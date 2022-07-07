import { Box, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};
export default function ChangePassword() {
  return (
    <div>
      {" "}
      <Box sx={style}>
        <Typography
          id="keep-mounted-modal-title"
          variant="h6"
          component="h2"
          style={{ marginBottom: "15px" }}
        >
          Đổi mật khẩu
        </Typography>
        <TextField
          style={{ marginBottom: "15px" }}
          variant="outlined"
          type="password"
          label="Mật khẩu cũ"
          //   onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          style={{ marginBottom: "15px" }}
          variant="outlined"
          type="password"
          label="Mật khẩu mới"
          //   onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          style={{ marginBottom: "15px" }}
          variant="outlined"
          type="password"
          label="Xác nhận mật khẩu mới"
          //   onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          Xác nhận
        </Button>{" "}
      </Box>
    </div>
  );
}
