import {
  FormControlLabel,
  Grow,
  InputAdornment,
  Switch,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";

export default function Package({
  title1,
  title2,
  title3,
  description1,
  description2,
  description3,
  deliveryTime1,
  deliveryTime2,
  deliveryTime3,
  price1,
  price2,
  price3,
  contractCancelFee1,
  contractCancelFee2,
  contractCancelFee3,
  title1V,
  title2V,
  title3V,
  description1V,
  description2V,
  description3V,
  deliveryTime1V,
  deliveryTime2V,
  deliveryTime3V,
  price1V,
  price2V,
  price3V,
  contractCancelFee1V,
  contractCancelFee2V,
  contractCancelFee3V,
}) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
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
          label="Tiêu đề"
          defaultValue={title1V}
          onChange={title1}
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
          defaultValue={description1V}
          onChange={description1}
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
            label="Số ngày giao"
            type="number"
            defaultValue={deliveryTime1V}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={deliveryTime1}
            required
          />
          <TextField
            variant="outlined"
            label="Chi phí ($)"
            type="number"
            defaultValue={price1V}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={price1}
            required
          />
        </div>
        <TextField
          variant="outlined"
          label="Phí hủy hợp đồng"
          type="number"
          // defaultValue={price1V}
          InputProps={{
            inputProps: { min: 0 },
            endAdornment: (
              <InputAdornment position="end">% Tổng chi phí</InputAdornment>
            ),
          }}
          defaultValue={contractCancelFee1V}
          onChange={contractCancelFee1}
          required
        />
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
                label="Tiêu đề"
                defaultValue={title2V}
                onChange={title2}
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Sản phẩm bàn giao"
                onChange={description2}
                defaultValue={description2V}
                multiline
                rows={4}
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
                  label="Số ngày giao"
                  type="number"
                  defaultValue={deliveryTime2V}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={deliveryTime2}
                  required
                />
                <TextField
                  variant="outlined"
                  label="Chi phí ($)"
                  type="number"
                  defaultValue={price2V}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={price2}
                  required
                />
              </div>
              <TextField
                variant="outlined"
                label="Phí hủy hợp đồng"
                type="number"
                // defaultValue={price1V}
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end">
                      % Tổng chi phí
                    </InputAdornment>
                  ),
                }}
                defaultValue={contractCancelFee2V}
                onChange={contractCancelFee2}
                required
              />
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
                label="Tiêu đề"
                defaultValue={title3V}
                onChange={title3}
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Sản phẩm bàn giao"
                onChange={description3}
                multiline
                defaultValue={description3V}
                rows={4}
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
                  label="Số ngày giao"
                  type="number"
                  defaultValue={deliveryTime3V}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={deliveryTime3}
                  required
                />
                <TextField
                  variant="outlined"
                  label="Chi phí ($)"
                  type="number"
                  defaultValue={price3V}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={price3}
                  required
                />
              </div>
              <TextField
                variant="outlined"
                label="Phí hủy hợp đồng"
                type="number"
                // defaultValue={price1V}
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end">
                      % Tổng chi phí
                    </InputAdornment>
                  ),
                }}
                defaultValue={contractCancelFee3V}
                onChange={contractCancelFee3}
                required
              />
            </form>
          </div>
        </Grow>
      </div>
    </div>
  );
}
