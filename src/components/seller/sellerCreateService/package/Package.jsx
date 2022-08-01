import {
  Button,
  FormControlLabel,
  Grow,
  InputAdornment,
  Switch,
  TextField,
} from "@material-ui/core";
import React from "react";

export default function Package({
  packages,
  checked,
  handleChange,
  handleChange2,
  handlePackageChange,
  packagesError,
  // errorPackTitle,
  // num,
  // errorPackDescription,
  // num1,
  // errorPackDelevery,
  // num2,
  // errorPackPrice,
  // num3,
  // errorPackContractFee,
  // num4,
}) {
  // console.log(num);
  // console.log(num1);
  // console.log(num2);
  // console.log(num3);
  console.log(packagesError);
  return (
    <div>
      {packages.length < 3 && (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleChange}
          style={{
            marginBottom: "10px",
          }}
        >
          Thêm gói {packages.length == 1 ? "nâng cao" : "cao cấp"}
        </Button>
      )}
      {packages.length > 1 && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleChange2}
          style={{
            marginBottom: "10px",
          }}
        >
          Xóa gói {packages.length == 2 ? "nâng cao" : "cao cấp"}
        </Button>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "440px",
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
            defaultValue={packages[0].title}
            name="title"
            onChange={(e) => handlePackageChange(e, 0)}
            error={packagesError[0].title.length > 0}
            helperText={packagesError[0].title}
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
            defaultValue={packages[0].shortDescription}
            name="shortDescription"
            onChange={(e) => handlePackageChange(e, 0)}
            error={packagesError[0].shortDescription.length > 0}
            helperText={packagesError[0].shortDescription}
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
              defaultValue={packages[0].deliveryTime}
              InputProps={{ inputProps: { min: 0 } }}
              name="deliveryTime"
              onChange={(e) => handlePackageChange(e, 0)}
              error={packagesError[0].deliveryTime.length > 0}
              helperText={packagesError[0].deliveryTime}
              required
            />
            <TextField
              variant="outlined"
              label="Chi phí ($)"
              type="number"
              defaultValue={packages[0].price}
              InputProps={{ inputProps: { min: 0 } }}
              name="price"
              onChange={(e) => handlePackageChange(e, 0)}
              error={packagesError[0].price.length > 0}
              helperText={packagesError[0].price}
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
            defaultValue={packages[0].contractCancelFee}
            name="contractCancelFee"
            onChange={(e) => handlePackageChange(e, 0)}
            error={packagesError[0].contractCancelFee.length > 0}
            helperText={packagesError[0].contractCancelFee}
            required
          />
        </form>{" "}
        {/* <div> */}
        {/* <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Thêm các gói nâng cao"
        /> */}
        {/* <Grow in={true}>
          <div
            style={{
              display: "flex",
            }}
          > */}
        {packages.slice(1).map((p, index) => {
          return (
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                width: "440px",
                margin: "0 auto",
                border: "2px solid #e0d4d8",
                padding: "20px",
                // marginRight: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "GrayText",
                }}
              >
                {index === 0 ? "Nâng cao" : "Cao cấp"}
              </p>
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Tiêu đề"
                defaultValue={p.title}
                name="title"
                onChange={(e) => handlePackageChange(e, index + 1)}
                error={packagesError[index + 1].title.length > 0}
                helperText={packagesError[index + 1].title}
                required
              />
              <TextField
                style={{
                  marginBottom: "10px",
                }}
                variant="outlined"
                label="Sản phẩm bàn giao"
                name="shortDescription"
                onChange={(e) => handlePackageChange(e, index + 1)}
                defaultValue={p.shortDescription}
                multiline
                rows={4}
                error={packagesError[index + 1].shortDescription.length > 0}
                helperText={packagesError[index + 1].shortDescription}
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
                  defaultValue={p.deliveryTime}
                  InputProps={{ inputProps: { min: 0 } }}
                  name="deliveryTime"
                  onChange={(e) => handlePackageChange(e, index + 1)}
                  error={packagesError[index + 1].deliveryTime.length > 0}
                  helperText={packagesError[index + 1].deliveryTime}
                  required
                />
                <TextField
                  variant="outlined"
                  label="Chi phí ($)"
                  type="number"
                  defaultValue={p.price}
                  InputProps={{ inputProps: { min: 0 } }}
                  name="price"
                  onChange={(e) => handlePackageChange(e, index + 1)}
                  error={packagesError[index + 1].price.length > 0}
                  helperText={packagesError[index + 1].price}
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
                defaultValue={p.contractCancelFee}
                name="contractCancelFee"
                onChange={(e) => handlePackageChange(e, index + 1)}
                error={packagesError[index + 1].contractCancelFee.length > 0}
                helperText={packagesError[index + 1].contractCancelFee}
                required
              />
            </form>
          );
        })}
        {/* </div>
        </Grow> */}
        {/* </div> */}
      </div>
    </div>
  );
}
