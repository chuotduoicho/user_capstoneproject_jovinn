import {
  Button,
  ButtonGroup,
  Chip,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchSkills, selectAllSkills } from "../../../redux/categorySlice";
import {
  addSkills,
  deleteSkill,
  fetchCurrentUser,
} from "../../../redux/userSlice";
import "./sellerSkill.scss";
export default function SellerSkill({ skills, id }) {
  const listSkills = useSelector(selectAllSkills);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSkills());
  }, []);
  const [editStatus, setEditStatus] = useState(false);
  const [skillName, setSkillName] = useState("");
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
  const handleAddSkill = () => {
    const skill = {
      name: skillName,
      level: "COMPETENT",
      shortDescribe: "coding",
      userId: id,
    };
    dispatch(addSkills(skill))
      .unwrap()
      .then(() => {
        dispatch(fetchCurrentUser());
        toast.success("Thêm kĩ năng thành công!");
        setOpen(false);
      })
      .catch(() => {
        toast.error("Thêm kĩ năng thất bại!");
        setOpen(false);
      });
  };

  function removeSkill(id) {
    if (skills.length > 1) {
      setOpenDelete(false);
      dispatch(deleteSkill(id))
        .unwrap()
        .then(() => {
          dispatch(fetchCurrentUser());
          toast.success("Xóa kĩ năng thành công!");
        })
        .catch(() => {
          toast.error("Xóa kĩ năng thất bại!");
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
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  var listskillConvert = listSkills.map(function (item) {
    return item["name"];
  });
  var skillConvert = skills.map(function (item) {
    return item["name"];
  });
  var array3 = listskillConvert.filter(function (obj) {
    return skillConvert.indexOf(obj) == -1;
  });
  console.log(skillConvert, "skillConvert");
  console.log(array3, "array3");
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
                        <>
                          {" "}
                          <Chip
                            key={index}
                            label={item.name}
                            variant="outlined"
                            color="primary"
                            onDelete={handleClickOpenDelete}
                            className="details_paper_chip"
                          />
                          <Dialog
                            open={openDelete}
                            onClose={handleCloseDelete}
                            aria-labelledby="responsive-dialog-title"
                          >
                            <DialogTitle id="responsive-dialog-title">
                              {"Bạn có muốn xóa kĩ năng này?"}
                            </DialogTitle>
                            <DialogActions>
                              <Button
                                onClick={() => {
                                  removeSkill(item.id);
                                }}
                                color="secondary"
                                variant="outlined"
                              >
                                Xóa
                              </Button>
                              <Button
                                onClick={handleCloseDelete}
                                color="default"
                                variant="outlined"
                              >
                                Hủy
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </>
                      );
                    })}{" "}
                    {/* <input
                      onKeyDown={handleKeyDown}
                      type="text"
                      className="tags-input"
                      placeholder="Nhập kĩ năng"
                    /> */}
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
                  <Button onClick={() => setOpen(true)}>Thêm</Button>
                  <Button onClick={handleNotEdit}>Xong</Button>
                </ButtonGroup>
              )}
            </div>
            <Dialog
              fullWidth
              maxWidth="xs"
              open={open}
              onClose={handleClose}
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="max-width-dialog-title">
                Thêm kĩ năng
              </DialogTitle>
              <DialogContent>
                <InputLabel id="demo-dialog-select-label">
                  Chọn kĩ năng
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  onChange={(e) => setSkillName(e.target.value)}
                  input={<OutlinedInput label="Chọn kĩ năng" />}
                  style={{ width: "100%" }}
                >
                  {array3.map((skill, index) => (
                    <MenuItem
                      key={index}
                      value={skill}
                      // style={getStyles(skill.name, skills, theme)}
                    >
                      {skill}
                    </MenuItem>
                  ))}
                </Select>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleAddSkill}
                  color="primary"
                  variant="contained"
                >
                  Thêm
                </Button>
                <Button onClick={handleClose} color="primary">
                  Đóng
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
