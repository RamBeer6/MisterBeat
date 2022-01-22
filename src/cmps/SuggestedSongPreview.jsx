export function SuggestedSongPreview({ song , idx, onAddSong }) {
    return (
        <section className="suggested-preview" >
            <h4 className="gray">{idx + 1}</h4>
            <div className="song-info">
              <img src={song.imgUrl} />
              <div>
                <h4>{song.title}</h4>
                {/* <h4>{song.artist}</h4> */}
              </div>
            </div>
            {/* <h4>{song.album}</h4> */}
            <h4 className="small gray">{song.duration}</h4>
            <div className="song-actions">
              <button className="add-btn" onClick={() => onAddSong(song)}><i className="fas fa-plus-circle"></i></button>
            </div>
          </section>
    )
}