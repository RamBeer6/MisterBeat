import { SuggestedSongPreview } from '../cmps/SuggestedSongPreview'

export function SuggestedSongList({ songs, onAddSong }) {
    console.log('suggested songs:' , songs);
    return (
        <section className="suggested-list">
          <div className="suggested-list-head">
            <h3>#</h3>
            <h3>Title</h3>
            <h3>Duration</h3>
            <h3>Actions</h3>
          </div>
            {songs?.map((song, idx) => {
                return <SuggestedSongPreview key={song.id} idx={idx} song={song} onAddSong={onAddSong} />
            })}
        </section>
    )
}