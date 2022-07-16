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
export default function SellerSkill({ skills }) {
  const [editStatus, setEditStatus] = useState(false);
  const handleEdit = (e) => {
    setEditStatus(true);
  };
  const handleNotEdit = (e) => {
    setEditStatus(false);
  };
  console.log("skills", skills);
  console.log("skill 1", skills[0].name);
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
                {skills.map((item, index) => {
                  return (
                    <Chip
                      label={item.name}
                      variant="outlined"
                      color="primary"
                      // onDelete={handleDelete}
                    />
                  );
                })}
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
