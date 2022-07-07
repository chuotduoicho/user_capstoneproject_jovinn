import React from "react";

export default function Confirm() {
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
          Xác Nhận dịch vụ
        </p>
      </form>
    </div>
  );
}
