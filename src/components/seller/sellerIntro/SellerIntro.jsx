import { Button, ButtonGroup, TextareaAutosize } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchCurrentUser,
  updateDescriptionBio,
} from "../../../redux/userSlice";
import "./sellerIntro.scss";
export default function SellerIntro({ description, brandName }) {
  const [editStatus, setEditStatus] = useState(false);
  const [descriptionBio, setDescriptionBio] = useState(description);
  const dispatch = useDispatch();
  const handleEdit = (e) => {
    setEditStatus(true);
  };
  const handleNotEdit = (e) => {
    setEditStatus(false);
  };
  const handleUpdate = (e) => {
    dispatch(updateDescriptionBio({ descriptionBio, brandName }))
      .unwrap()
      .then(() => {
        dispatch(fetchCurrentUser());
        setEditStatus(false);
        toast.success("Chỉnh sửa giới thiệu thành công!");
      })
      .catch(() => {
        toast.error("Chỉnh sửa giới thiệu thất bại!");
      });
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
              <textarea
                aria-label="minimum height"
                minRows={10}
                placeholder="Nhập phần giới thiệu của bạn"
                defaultValue={descriptionBio}
                onChange={(e) => setDescriptionBio(e.target.value)}
                style={{ width: 615, height: 160, padding: "20px" }}
                disabled={!editStatus}
              />
              {editStatus && (
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  className="sellerIntro_btnGroup"
                  style={{ justifyContent: "center" }}
                >
                  <Button color="primary" onClick={handleUpdate}>
                    Cập nhật
                  </Button>
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
