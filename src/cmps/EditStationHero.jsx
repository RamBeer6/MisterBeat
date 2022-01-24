import { useEffect, useState } from 'react'

export function EditStationHero({ station, onSaveStation, onCloseEdit }) {
    const [stationInfo, setStationInfo] = useState({
        _id: '',
        name: '',
        imgUrl: '',
        desc: ''
    })

    useEffect(() => {
        if(station._id) setStationInfo({...station})
    },[])

    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        setStationInfo({ ...stationInfo, [field]: value })
    }
    
    return(
        <section className="edit-hero">
            <div className="edit-header">
                <h2>Edit Playlist</h2>
                <button>X</button>
            </div>
            <div className="edit-details">
                <label className="edit-img">
                    <input type="file" name="img" value={stationInfo.imgUrl} onChange={handleChange}/>
                </label>
                <input type="text" name="name" value={stationInfo.name} placeholder="Edit playlist name" onChange={handleChange} autoComplete="off"/>

                <textarea name="desc" value={stationInfo.desc} placeholder="Add description" onChange={handleChange}></textarea>

                <button className="save-btn" onClick={() => {
                    onCloseEdit(false)
                    onSaveStation(stationInfo)
                    }}>Save</button>
            </div>
        </section>
    )
}