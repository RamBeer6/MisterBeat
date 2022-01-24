import { useEffect, useState } from 'react'

export function EditStationHero({ onAddStation }) {
    const [stationInfo, setStationInfo] = useState({
        name: '',
        imgUrl: '',
        desc: ''
    })

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

                <button className="save-btn" onClick={() => onAddStation(stationInfo)}>Save</button>
            </div>
        </section>
    )
}