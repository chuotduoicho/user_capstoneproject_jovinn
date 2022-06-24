import { Button, ButtonGroup, TextareaAutosize } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import "./sellerIntro.scss";
export default function SellerIntro() {
  const [editStatus, setEditStatus] = useState(false);
  const handleEdit = (e) => {
    setEditStatus(true);
  };
  const handleNotEdit = (e) => {
    setEditStatus(false);
  };
  return (
    <div className="sellerIntro">
      {" "}
      <div className="sellerIntro_top">
        <div className="sellerIntro_left">
          <div className="sellerIntro_editButton" onClick={handleEdit}>
            Chỉnh sửa
          </div>
          <h1 className="sellerIntro_title">Giới thiệu</h1>
          <div className="sellerIntro_item">
            <div className="sellerIntro_details">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={10}
                placeholder="Nhập phần giới thiệu của bạn"
                defaultValue="Tôi là sinh viên đại học fpt.Tôi là sinh viên đại học fptTôi là sinh viên đại học fptTôi là sinh viên đại học fptTôi là sinh viên đại học fptTôi là sinh viên đại học fptTôi là sinh viên đại học fptTôi là sinh viên đại học fpt"
                style={{ width: 600 }}
                disabled={!editStatus}
              />
              {editStatus && (
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  className="sellerIntro_btnGroup"
                  style={{ justifyContent: "center" }}
                >
                  <Button color="primary">Cập nhật</Button>
                  <Button onClick={handleNotEdit}>Hủy</Button>
                </ButtonGroup>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
