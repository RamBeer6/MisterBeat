import { Droppable } from 'react-beautiful-dnd'
import { SongPreview } from './SongPreview'

export function SongList({ stationId, songs }) {
  return (
    <Droppable droppableId={stationId}>
      {(provided) => (
        <section className="song-list" {...provided.droppableProps} ref={provided.innerRef}>
          <div className="song-list-head">
            <h3>#</h3>
            <h3>Title</h3>
            <h3>Album</h3>
            <h3>Duration</h3>
          </div>
          {songs.map((song, idx) => {
            return <SongPreview key={song.id} song={song} idx={idx} />
          })}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  )
}
