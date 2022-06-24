import { FormControlLabel, Grow, Switch, TextField } from "@material-ui/core";
import React from "react";

export default function Package() {
  const [checked, setChecked] = React.useState(false);

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
          required
        />
        <TextField
          style={{
            marginBottom: "10px",
          }}
          variant="outlined"
          label="Mô tả"
          required
        />
        <TextField
          style={{
            marginBottom: "10px",
          }}
          variant="outlined"
          label="Sản phẩm bàn giao"
          required
        />
        <TextField
          style={{
            marginBottom: "10px",
          }}
          variant="outlined"
          label="Ngày giao"
          type="date"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          style={{
            marginBottom: "10px",
          }}
          variant="outlined"
          label="Giá ($)"
          type="number"
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
            InputProps={{ inputProps: { min: 0 } }}
            required
          />
          <TextField
            variant="outlined"
            label="Giá ($) fast delivery"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
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
                label="Tiêu đề"
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Mô tả"
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Sản phẩm bàn giao"
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Ngày giao"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Giá ($)"
                type="number"
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
                  InputProps={{ inputProps: { min: 0 } }}
                  required
                />
                <TextField
                  variant="outlined"
                  label="Giá ($) fast delivery"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
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
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Mô tả"
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Sản phẩm bàn giao"
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Ngày giao"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Giá ($)"
                type="number"
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
                  InputProps={{ inputProps: { min: 0 } }}
                  required
                />
                <TextField
                  variant="outlined"
                  label="Giá ($) fast delivery"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
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
