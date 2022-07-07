import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
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
export default function TrueStage() {
  const [numberStage, setNumberStage] = useState(0);
  const [arr, setArr] = useState([]);
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
          Tùy chọn chia giai đoạn
        </Typography>
        <FormControl
          fullWidth
          style={{
            marginBottom: "10px",
          }}
        >
          <InputLabel id="demo-simple-select-label">
            Chọn số giai Đoạn
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={numberStage}
            label="Chọn số giai đoạn"
            onChange={(e) => (
              setNumberStage(e.target.value),
              (arr.length = e.target.value),
              arr.fill(0),
              setArr(arr)
            )}
          >
            <MenuItem value={2}>2 giai đoạn</MenuItem>
            <MenuItem value={3}>3 giai đoạn</MenuItem>
            <MenuItem value={4}>4 giai đoạn</MenuItem>
            <MenuItem value={5}>5 giai đoạn</MenuItem>
          </Select>
        </FormControl>
        {arr.map((value, index) => (
          <>
            <label>Giai đoạn {index + 1}</label>
            <div style={{ display: "flex" }}>
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
            </div>
          </>
        ))}
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
