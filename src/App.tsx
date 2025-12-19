import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddUser,
  api,
  ChangeStatus,
  DeleteImg,
  DeleteUser,
  EditUser,
  GetById,
  GetTodo,
} from "./api/api";
import type { RootState } from "./redux/store";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { clearToDoById } from "./redux/TodoStore";

export default function App() {
  const { data, toDoById } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [descEdit, setDescEdit] = useState("");
  const [idx, setIdx] = useState(null);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [search, setSearch] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

  const filterUser = data.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(GetTodo());
  }, []);

  return (
    <div>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit User"}</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            value={nameEdit}
            onChange={(e) => setNameEdit(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            value={descEdit}
            onChange={(e) => setDescEdit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Disagree</Button>
          <Button
            onClick={() => {
              dispatch(EditUser({ idx, nameEdit, descEdit }));
              setOpenEdit(false);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add User"}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(AddUser(e));
              handleClose();
            }}
          >
            <input type="text" placeholder="Name..." name="nameAdd" />
            <input type="text" placeholder="Description..." name="descAdd" />
            <input type="file" name="imgAdd" />
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openInfo}
        onClose={() => setOpenInfo(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"About this User"}</DialogTitle>
        <DialogContent>
          <div>
            <div className="flex gap-5">
              {toDoById?.images?.map((img) => {
                return (
                  <div className="mb-5">
                    <img
                      src={`${api}/images/${img.imageName}`}
                      alt=""
                      className="w-[200px] h-[150px] mb-5"
                    />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        dispatch(DeleteImg(img.id));
                        setOpenInfo(false);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
            </div>
            <p className="text-[24px] font-semibold mb-3">
              Name: {toDoById?.name}
            </p>
            <p className="text-[24px] font-semibold mb-3 text-gray-500">
              Description: {toDoById?.description}
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenInfo(false);
              dispatch(clearToDoById());
            }}
          >
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
      <div className="flex justify-between p-5 items-center">
        <p className="text-[36px] font-bold">Users Dashboard</p>
        <input
          type="search"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border shadow-sm outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <Button variant="contained" onClick={handleClickOpen}>
          Add User
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ padding: "30px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "700" }}>Image</TableCell>
              <TableCell align="left" sx={{ fontWeight: "700" }}>
                Name
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "700" }}>
                Description
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "700" }}>
                Status
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "700" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterUser?.map((e) => (
              <TableRow
                key={e.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div className="flex gap-2 mx-auto">
                    {e?.images?.map((img) => (
                      <div>
                        <img
                          key={img.id}
                          src={`${api}/images/${img.imageName}`}
                          alt=""
                          className={`w-[50px] h-[50px] ${
                            e.images.length > 1 ? "" : "rounded-full"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell align="left">{e.name}</TableCell>
                <TableCell align="left">{e.description}</TableCell>
                <TableCell align="left">
                  {e.isCompleted ? "Active" : "Inactive"}
                </TableCell>
                <TableCell align="left" sx={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => dispatch(DeleteUser(e.id))}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setOpenEdit(true);
                      setNameEdit(e.name);
                      setDescEdit(e.description);
                      setIdx(e.id);
                    }}
                  >
                    <EditDocumentIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                      dispatch(GetById(e.id));
                      setOpenInfo(true);
                    }}
                  >
                    <InfoOutlineIcon />
                  </Button>
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    checked={e.isCompleted}
                    onClick={() => {
                      dispatch(ChangeStatus(e.id));
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
