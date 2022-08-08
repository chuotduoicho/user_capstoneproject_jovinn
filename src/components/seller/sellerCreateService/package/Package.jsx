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
  handleChange,
  handleChange2,
  handlePackageChange,
  check2,
}) {
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
            error={
              (packages[0].title.length > 50 || packages[0].title.length < 5) &&
              check2
            }
            helperText={
              (packages[0].title.length > 50 || packages[0].title.length < 5) &&
              check2 &&
              "Từ 5 đến 50 kí tự"
            }
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
            error={
              (packages[0].shortDescription.length > 500 ||
                packages[0].shortDescription.length < 30) &&
              check2
            }
            helperText={
              (packages[0].shortDescription.length > 500 ||
                packages[0].shortDescription.length < 30) &&
              check2 &&
              "Từ 30 đến 500 kí tự"
            }
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
              error={packages[0].deliveryTime < 1 && check2}
              helperText={
                packages[0].deliveryTime < 1 && check2 && "Tối thiểu là 1 ngày"
              }
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
              error={packages[0].price < 1 && check2}
              helperText={packages[0].price < 1 && check2 && "Tối thiểu là 1$"}
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
            error={
              (packages[0].contractCancelFee < 0 ||
                packages[0].contractCancelFee > 100 ||
                packages[0].contractCancelFee.length == 0) &&
              check2
            }
            helperText={
              (packages[0].contractCancelFee < 0 ||
                packages[0].contractCancelFee > 100 ||
                packages[0].contractCancelFee.length == 0) &&
              check2 &&
              "Tối thiểu là 0%,tối đa là 100%"
            }
            required
          />
        </form>{" "}
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
                error={(p.title.length > 50 || p.title.length < 5) && check2}
                helperText={
                  (p.title.length > 50 || p.title.length < 5) &&
                  check2 &&
                  "Từ 5 đến 50 kí tự"
                }
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
                error={
                  (p.shortDescription.length > 500 ||
                    p.shortDescription.length < 30) &&
                  check2
                }
                helperText={
                  (p.shortDescription.length > 500 ||
                    p.shortDescription.length < 30) &&
                  check2 &&
                  "Từ 30 đến 500 kí tự"
                }
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
                  error={p.deliveryTime < 1 && check2}
                  helperText={p.deliveryTime < 1 && check2 && "Tối thiểu là 1"}
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
                  error={p.price < 1 && check2}
                  helperText={p.price < 1 && check2 && "Tối thiểu là 1$"}
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
                error={
                  (p.contractCancelFee < 0 ||
                    p.contractCancelFee > 100 ||
                    p.contractCancelFee.length == 0) &&
                  check2
                }
                helperText={
                  (p.contractCancelFee < 0 ||
                    p.contractCancelFee > 100 ||
                    p.contractCancelFee.length == 0) &&
                  check2 &&
                  "Tối thiểu là 0%,tối đa là 100%"
                }
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
