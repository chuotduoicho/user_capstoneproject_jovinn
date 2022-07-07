import { FormControlLabel, Grow, Switch, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";

export default function Package({
  description1,
  description2,
  description3,
  deliveryTime1,
  deliveryTime2,
  deliveryTime3,
  price1,
  price2,
  price3,
  description1V,
  description2V,
  description3V,
  deliveryTime1V,
  deliveryTime2V,
  deliveryTime3V,
  price1V,
  price2V,
  price3V,
}) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const [skills, setSkills] = useState(["HTML", "CSS", "JavaScript"]);
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          margin: "0 auto",
          border: "2px solid #e0d4d8",
          padding: "20px",
          marginTop: "40px",
          marginRight: "20px",
          marginLeft: "60px",
        }}
      >
        <p
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            color: "GrayText",
          }}
        >
          Cơ bản
        </p>
        <TextField
          style={{
            marginBottom: "10px",
          }}
          variant="outlined"
          label="Mô tả"
          multiline
          rows={3}
          defaultValue={description1V}
          onChange={description1}
          required
        />
        <TextField
          style={{
            marginBottom: "10px",
          }}
          variant="outlined"
          label="Sản phẩm bàn giao"
          multiline
          rows={4}
          // onChange={description1}
          required
        />
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
          }}
        >
          <TextField
            style={{
              marginRight: "5px",
            }}
            variant="outlined"
            label="Số ngày fast delivery"
            type="number"
            defaultValue={deliveryTime1V}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={deliveryTime1}
            required
          />
          <TextField
            variant="outlined"
            label="Giá ($) fast delivery"
            type="number"
            defaultValue={price1V}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={price1}
            required
          />
        </div>
      </form>{" "}
      <div>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Thêm các gói nâng cao"
        />
        <Grow in={checked}>
          <div
            style={{
              display: "flex",
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                width: "400px",
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
                Nâng cao
              </p>

              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Mô tả"
                onChange={description2}
                defaultValue={description2V}
                multiline
                rows={3}
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Sản phẩm bàn giao"
                multiline
                rows={4}
                // onChange={description1}
                required
              />
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                <TextField
                  style={{
                    marginRight: "5px",
                  }}
                  variant="outlined"
                  label="Số ngày fast delivery"
                  type="number"
                  defaultValue={deliveryTime2V}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={deliveryTime2}
                  required
                />
                <TextField
                  variant="outlined"
                  label="Giá ($) fast delivery"
                  type="number"
                  defaultValue={price2V}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={price2}
                  required
                />
              </div>
            </form>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                width: "400px",
                margin: "0 auto",
                marginLeft: "20px",
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
                Cao Cấp
              </p>

              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Mô tả"
                onChange={description3}
                multiline
                defaultValue={description3V}
                rows={3}
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Sản phẩm bàn giao"
                multiline
                rows={4}
                // onChange={description1}
                required
              />
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                <TextField
                  style={{
                    marginRight: "5px",
                  }}
                  variant="outlined"
                  label="Số ngày fast delivery"
                  type="number"
                  defaultValue={deliveryTime3V}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={deliveryTime3}
                  required
                />
                <TextField
                  variant="outlined"
                  label="Giá ($) fast delivery"
                  type="number"
                  defaultValue={price3V}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={price3}
                  required
                />
              </div>
            </form>
          </div>
        </Grow>
      </div>
    </div>
  );
}
