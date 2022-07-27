import {
  Button,
  ButtonGroup,
  Chip,
  Paper,
  TextareaAutosize,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addSkills,
  deleteSkill,
  fetchCurrentUser,
} from "../../../redux/userSlice";
import "./sellerSkill.scss";
export default function SellerSkill({ skills, id }) {
  const dispatch = useDispatch();
  const [editStatus, setEditStatus] = useState(false);
  console.log("userId", id);
  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    const skill = {
      name: value,
      level: "COMPETENT",
      shortDescribe: "coding",
      userId: id,
    };
    dispatch(addSkills(skill))
      .unwrap()
      .then(() => {
        dispatch(fetchCurrentUser());
        e.target.value = "";
      })
      .catch(() => {
        console.log("update error");
      });
  }

  function removeSkill(id) {
    if (skills.length > 1) {
      dispatch(deleteSkill(id))
        .unwrap()
        .then(() => {
          dispatch(fetchCurrentUser());
        })
        .catch(() => {
          console.log("update error");
        });
    } else {
    }
  }
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
                {editStatus ? (
                  <>
                    {" "}
                    {skills.map((item, index) => {
                      return (
                        <Chip
                          key={index}
                          label={item.name}
                          variant="outlined"
                          color="primary"
                          onDelete={() => {
                            removeSkill(item.id);
                          }}
                          className="details_paper_chip"
                        />
                      );
                    })}{" "}
                    <input
                      onKeyDown={handleKeyDown}
                      type="text"
                      className="tags-input"
                      placeholder="Nhập kĩ năng"
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    {skills.map((item, index) => {
                      return (
                        <Chip
                          key={index}
                          label={item.name}
                          variant="outlined"
                          color="primary"
                          className="details_paper_chip"
                        />
                      );
                    })}
                  </>
                )}
              </Paper>
              {editStatus && (
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  className="sellerIntro_btnGroup"
                  style={{ justifyContent: "center" }}
                >
                  <Button onClick={handleNotEdit}>Xong</Button>
                </ButtonGroup>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
