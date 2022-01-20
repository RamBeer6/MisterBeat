import React from 'react'
import { connect } from 'react-redux'

class _SongPreview extends React.Component {
  render() {
    const { song, idx } = this.props
    return (
      <section className="song-preview">
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
      </section>
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
