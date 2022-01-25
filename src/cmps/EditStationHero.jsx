// import { useEffect, useState } from 'react'
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function EditStationHero({ station, onSaveStation, onCloseEdit }) {
    const [stationInfo, setStationInfo] = useState({
        _id: "",
        name: "",
        imgUrl: "",
        desc: "",
    });


    const [open, setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        onCloseEdit(false);
        setOpen(false);
    };


    useEffect(() => {
        if (station._id) setStationInfo({ ...station });
    }, []);

    const handleChange = (ev) => {
        const field = ev.target.id;
        const value = ev.target.value;
        setStationInfo({ ...stationInfo, [field]: value });
    };

    return (
        <section className="edit-station-hero">
            {/* <Button variant="outlined" onClick={handleClickOpen} /> */}
            <Dialog open={open} onClose={handleClose}>
                <section className="hero-main-container">
                    <header className="edit-header">
                        <DialogTitle>Edit details</DialogTitle>
                        {/* <div className="close-btn">
                            <button>X</button>
                        </div> */}
                    </header>
                    <DialogContent>
                        <main className="edit-details">
                            <label className="edit-img">
                                <input
                                    type="file"
                                    name="img"
                                    value={stationInfo.imgUrl}
                                    onChange={handleChange}
                                />
                            </label>
                            <TextField
                                type="text"
                                id="name"
                                margin="dense"
                                value={stationInfo.name}
                                // placeholder="Edit playlist name"
                                onChange={handleChange}
                                label="Title"
                                autoComplete="off"
                            // variant="standard"
                            />
                            <TextField
                                type="text"
                                id="desc"
                                value={stationInfo.desc}
                                // placeholder="Add description"
                                onChange={handleChange}
                                label="description"

                            />
                        </main>
                    </DialogContent>
                    <footer className="edit-footer">
                        <DialogActions>
                            <button
                                className="save-btn"
                                onClick={() => {
                                    onCloseEdit(false);
                                    onSaveStation(stationInfo);
                                }}
                            >
                                Save
                            </button>
                        </DialogActions>
                    </footer>
                </section>
            </Dialog>
        </section>
    );
}
