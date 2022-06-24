import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";

export default function Confirm() {
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
          Xác Nhận tạo dịch vụ
        </p>
      </form>
    </div>
  );
}
