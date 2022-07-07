import {
  Button,
  ButtonGroup,
  Chip,
  Paper,
  TextareaAutosize,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import "./sellerSkill.scss";
export default function SellerSkill() {
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
      <div className="top">
        <div className="left">
          <div className="editButton" onClick={handleEdit}>
            Chỉnh sửa
          </div>
          <h1 className="title">Kỹ Năng</h1>
          <div className="item">
            <div className="details">
              <Paper elevation={3} className="details_paper">
                <Chip
                  label="Java"
                  variant="outlined"
                  color="primary"
                  // onDelete={handleDelete}
                />
                <Chip
                  label="HTML"
                  variant="outlined"
                  color="primary"
                  // onDelete={handleDelete}
                />
                <Chip
                  label="CSS"
                  variant="outlined"
                  color="primary"
                  // onDelete={handleDelete}
                />
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
