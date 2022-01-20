import { SongPreview } from './SongPreview'

export function SongList({ stationId, songs }) {
    return (
        <section className="song-list">
        <div className="song-list-head">
            <h3>#</h3>
            <h3>Title</h3>
            <h3>Album</h3>
            <h3>Duration</h3>
        </div>
            {songs.map((song, idx) => {
                return  <SongPreview key={song.id} song={song} idx={idx} />
            })}
        </section>
    )  
}