import { SearchedSongPreview } from '../cmps/SearchedSongPreview'

export function SearchedSongList({ songs }) {
    return (
        <section className="searched-list">
          <div className="searched-list-head">
            <h3>#</h3>
            <h3>Title</h3>
            <h3>Duration</h3>
            <h3>Actions</h3>
          </div>
          {songs?.map((song, idx) => {
            return <SearchedSongPreview key={song.id} idx={idx} song={song} />
          })}
        </section>
    )
}