import { InputAdornment, TextField } from "@material-ui/core";
import React from "react";

export default function PackageEdit({
  titlePack,
  shortDescription,
  deliveryTime,
  price,
  contractCancelFee,
  titlePackV,
  shortDescriptionV,
  deliveryTimeV,
  priceV,
  contractCancelFeeV,
  titlePackE,
  shortDescriptionE,
  deliveryTimeE,
  priceE,
  contractCancelFeeE,
}) {
  console.log("titlePackE", titlePackE);
  console.log("deliveryTimeE", deliveryTimeE);
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
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Gói dịch vụ
        </p>
        <TextField
          style={{
            marginBottom: "10px",
          }}
          variant="outlined"
          label="Tiêu đề"
          defaultValue={titlePackV}
          onChange={titlePack}
          error={titlePackE.length > 0}
          helperText={titlePackE}
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
          defaultValue={shortDescriptionV}
          onChange={shortDescription}
          error={shortDescriptionE.length > 0}
          helperText={shortDescriptionE}
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
            InputProps={{ inputProps: { min: 0 } }}
            name="deliveryTime"
            defaultValue={deliveryTimeV}
            onChange={deliveryTime}
            error={deliveryTimeE.length > 0}
            helperText={deliveryTimeE}
            required
          />
          <TextField
            variant="outlined"
            label="Chi phí ($)"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            defaultValue={priceV}
            onChange={price}
            error={priceE.length > 0}
            helperText={priceE}
            required
          />
        </div>
        <TextField
          variant="outlined"
          label="Phí hủy hợp đồng"
          type="number"
          InputProps={{
            inputProps: { min: 0 },
            endAdornment: (
              <InputAdornment position="end">% Tổng chi phí</InputAdornment>
            ),
          }}
          defaultValue={contractCancelFeeV}
          onChange={contractCancelFee}
          error={contractCancelFeeE.length > 0}
          helperText={contractCancelFeeE}
          required
        />
      </form>
    </div>
  );
}
