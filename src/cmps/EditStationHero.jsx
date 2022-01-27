// import { useEffect, useState } from 'react'
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BorderColor } from "@mui/icons-material";

import { uploadImg } from "../services/cloudinary.service";

export function EditStationHero({ station, onSaveStation, onCloseEdit }) {
    const [stationInfo, setStationInfo] = useState({
        _id: "",
        name: "",
        imgUrl: "",
        desc: "",
    });

    const [open, setOpen] = useState(true);

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

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "eyb0hduc");
        setLoading(true);
        const res = await fetch(
            "	https://api.cloudinary.com/v1_1/rambeer6/image/upload",
            {
                method: "POST",
                body: data,
            }
        );
        const file = await res.json();
        return file.url;
    };

    const handleImage = async (ev) => {
        try {
            const field = ev.target.name;
            const value = await uploadImage(ev);
            setImage(value);
            setLoading(false);
            setStationInfo({ ...stationInfo, [field]: value });
        } catch (err) { }
    };

    return (
        <section className="edit-station-hero">
            {/* <Button variant="outlined" onClick={handleClickOpen} /> */}
            <Dialog open={open} onClose={handleClose}>
                <section
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "gainsboro",
                        background: "#282828",
                    }}
                    className="hero-main-container"
                >
                    <header className="edit-header">
                        <DialogTitle>Edit details</DialogTitle>
                    </header>
                    <DialogContent>
                        <main
                            className="edit-details"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gridTemplateRows: "1fr 1fr",
                            }}
                        >
                            <label className="edit-img" style={{ gridArea: "1/1/3/2" }}>
                                <input
                                    className="hero-upload-btn"
                                    type="file"
                                    name="imgUrl"
                                    onChange={handleImage}
                                />
                                <img className="hero-upload-img" src={image} alt="img" />
                            </label>
                            <TextField
                                type="text"
                                id="name"
                                margin="dense"
                                value={stationInfo.name}
                                onChange={handleChange}
                                label="Title"
                                autoComplete="off"
                                style={{ color: "red" }}
                            />
                            <TextField
                                type="text"
                                id="desc"
                                value={stationInfo.desc}
                                onChange={handleChange}
                                label="description"
                                autoComplete="off"
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
                                style={{
                                    border: "2px solid transparent",
                                    borderRadius: "500px",
                                    color: "gray",
                                    cursor: "pointer",
                                    display: " inline-block",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    letterSpacing: " 1.76px",
                                    lineHeight: "18px",
                                    padding: " 8px 34px",
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                    transition: "all 33ms cubic-bezier(.3,0,0,1)",
                                    whiteSpace: "nowrap",
                                    willChange: "transform",
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
