import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

class _SongPreview extends React.Component {
  render() {
    const { song, idx, onRemoveSong } = this.props
    return (
      <Draggable draggableId={song.id} index={idx}>
        {(provided) => (
          <section className="song-preview" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <h4>{idx + 1}</h4>
            <div className="song-info">
              <img src={song.imgUrl} />
              <div>
                <h4>{song.title}</h4>
                <h4>{song.artist}</h4>
              </div>
            </div>
            <h4>{song.album}</h4>
            <h4>{song.duration}</h4>
            <div className="song-actions">
              <button><i className="far fa-heart"></i></button>
              <button><i className="fas fa-heart"></i></button>
              <button onClick={() => onRemoveSong(song.id, song.title)}><i className="fas fa-trash-alt"></i></button>
            </div>
          </section>
        )}
      </Draggable>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

const mapDispatchToProps = {}

export const SongPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SongPreview)
