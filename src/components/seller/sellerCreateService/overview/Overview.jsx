import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";

export default function Overview() {
  const [value, setValue] = React.useState("female");
  const [age, setAge] = React.useState("");

  const handleChangeCountry = (event) => {
    setAge(event.target.value);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          margin: "0 auto",
          border: "2px solid #e0d4d8",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            color: "GrayText",
          }}
        >
          Tổng quan
        </p>
        <TextField
          style={{
            marginBottom: "10px",
          }}
          variant="outlined"
          label="Tiêu đề"
          required
        />
        <TextField
          style={{
            marginBottom: "10px",
          }}
          variant="outlined"
          label="Thẻ"
          required
        />
        <FormControl
          fullWidth
          style={{
            marginBottom: "10px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChangeCountry}
          >
            <MenuItem value={10}>Hà Nội</MenuItem>
            <MenuItem value={20}>Hải Phòng</MenuItem>
            <MenuItem value={30}>Quảng Ninh</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          style={{
            marginBottom: "10px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Danh mục con</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChangeCountry}
          >
            <MenuItem value={10}>Hà Nội</MenuItem>
            <MenuItem value={20}>Hải Phòng</MenuItem>
            <MenuItem value={30}>Quảng Ninh</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          style={{
            marginBottom: "10px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Kiểu </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChangeCountry}
          >
            <MenuItem value={10}>Hà Nội</MenuItem>
            <MenuItem value={20}>Hải Phòng</MenuItem>
            <MenuItem value={30}>Quảng Ninh</MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
  );
}
