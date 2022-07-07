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
export default function FalseStage() {
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
          Tùy chọn gói dịch vụ
        </Typography>
        <TextField
          id="outlined-basic"
          label="Sản phẩm bàn giao"
          variant="outlined"
          style={{ marginBottom: "15px" }}
        />
        <TextField
          id="outlined-basic"
          label="Ngày Giao"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          type="date"
          style={{ marginBottom: "15px" }}
        />
        <TextField
          id="outlined-basic"
          label="Giá"
          variant="outlined"
          type="number"
          style={{ marginBottom: "15px" }}
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
