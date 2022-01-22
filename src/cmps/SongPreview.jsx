import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import { BarWave } from '../cmps/BarWave'

function _SongPreview (props) {
  const [isHover, setIsHover] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // render() {
    const { song, idx, onRemoveSong } = props
    return (
      <Draggable draggableId={song.id} index={idx}>
        {(provided) => (
          <section className="song-preview" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            {isHover && !isPlaying && <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}><svg height="18" role="img" width="18" viewBox="0 0 24 24" className="UIBT7E6ZYMcSDl1KL62g"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></svg></button>}
            {isHover && isPlaying && <button className="pause-btn" onClick={() => setIsPlaying(!isPlaying)}>||</button>}
            {!isHover && isPlaying && <BarWave />}
            {!isHover && !isPlaying && <h4 className="gray">{idx + 1}</h4>}
            <div className="song-info">
              <img src={song.imgUrl} />
              <div>
                <h4>{song.title}</h4>
                <h4 className="small gray">{song.artist}</h4>
              </div>
            </div>
            <h4 className="small gray">{song.album}</h4>
            <h4 className="small gray">{song.duration}</h4>
            <div className="song-actions">
              <button className="like-btn" title="add to likes"><svg role="img" height="22" width="22" viewBox="0 0 32 32" className="Svg-sc-1bi12j5-0 hDgDGI"><path fill="currentColor" d="M27.672 5.573a7.904 7.904 0 00-10.697-.489c-.004.003-.425.35-.975.35-.564 0-.965-.341-.979-.354a7.904 7.904 0 00-10.693.493A7.896 7.896 0 002 11.192c0 2.123.827 4.118 2.301 5.59l9.266 10.848a3.196 3.196 0 004.866 0l9.239-10.819A7.892 7.892 0 0030 11.192a7.896 7.896 0 00-2.328-5.619zm-.734 10.56l-9.266 10.848c-.837.979-2.508.979-3.346 0L5.035 16.104A6.9 6.9 0 013 11.192 6.9 6.9 0 015.035 6.28a6.935 6.935 0 014.913-2.048 6.89 6.89 0 014.419 1.605A2.58 2.58 0 0016 6.434c.914 0 1.555-.53 1.619-.585a6.908 6.908 0 019.346.431C28.277 7.593 29 9.337 29 11.192s-.723 3.6-2.062 4.941z"></path></svg></button>
              {isHover && <button className="remove-btn" onClick={() => onRemoveSong(song.id, song.title)}><i className="fas fa-trash-alt"></i></button>}
            </div>
          </section>
        )}
      </Draggable>
    )
  // }
}

function mapStateToProps(state) {
  return {}
}

const mapDispatchToProps = {}

export const SongPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SongPreview)
