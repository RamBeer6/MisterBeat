// import { useEffect, useState } from 'react'
import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { ColorPicker } from "material-ui-color";
import { ColorPicker } from "../cmps/ColorPicker"


import demoImg from '../assets/imgs/default-img.png'

export function EditStationHero({ station, onSaveStation, onCloseEdit }) {
    const [stationInfo, setStationInfo] = useState({
        _id: "",
        name: "",
        imgUrl: "",
        desc: "",
        bcgColor: "#2c2b2bfa"
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
    }

    const handleImage = async (ev) => {
        try {
            const field = ev.target.name;
            const value = await uploadImage(ev);
            setImage(value);
            setLoading(false);
            setStationInfo({ ...stationInfo, [field]: value });
        } catch (err) { }
    }

    const onChangeBcgColor = (color) => {
        setStationInfo({ ...stationInfo, bcgColor: color })
    }

    // const onChangeColor = (bgc) => {
    //     this.setState((prevState) => ({
    //         ...prevState,
    //         hero: { ...prevState.hero, bgc },
    //     }));
    // };

    return (
        <section open={open} onDoubleClick={handleClose} className="hero-main-container">
            <div className="edit-details-header">Edit details</div>
            <section className="edit-details" style={{background: stationInfo.bcgColor}}>
                <label className="edit-img">
                    <img
                        className="hero-upload-img"
                        src={
                            !stationInfo.imgUrl.length ? demoImg : stationInfo.imgUrl
                        }
                        alt="img"
                    />
                    <input
                        className="hero-upload-btn"
                        type="file"
                        name="imgUrl"
                        onChange={handleImage}
                    />
                </label>
                <label className="title-input">
                    <input
                        type="text-area"
                        id="name"
                        margin="dense"
                        value={stationInfo.name}
                        onChange={handleChange}
                        label="Title"
                        autoComplete="off"
                        placeholder="title"
                    />
                </label>

                <label className="desc-input">
                    <textarea
                        maxLength={60}
                        type="text"
                        id="desc"
                        value={stationInfo.desc}
                        onChange={handleChange}
                        label="description"
                        autoComplete="off"
                        placeholder="description"
                    />
                </label>
                <label className="color-input">
                    <ColorPicker onChangeBcgColor={onChangeBcgColor} />
                </label>
                <section className="save-btn-container">
                    <button
                        className="save-btn"
                        onClick={() => {
                            onCloseEdit(false);
                            onSaveStation(stationInfo);
                        }}
                    >
                        Save
                    </button>
                </section>
            </section>
        </section>
    );
}

{
    /* // style={{
    //     border: "2px solid transparent",
    //     borderRadius: "500px",
    //     color: "gray",
    //     cursor: "pointer",
    //     display: " inline-block",
    //     fontSize: "12px",
    //     fontWeight: "700",
    //     letterSpacing: " 1.76px",
    //     lineHeight: "18px",
    //     padding: " 8px 34px",
    //     textAlign: "center",
    //     textTransform: "uppercase",
    //     transition: "all 33ms cubic-bezier(.3,0,0,1)",
    //     whiteSpace: "nowrap",
    //     willChange: "transform",
    // }} */
}
