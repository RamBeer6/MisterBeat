import React from 'react'
import { connect } from 'react-redux'

class _SongPreview extends React.Component {
  render() {
    const { song } = this.props
   return (
    <section className="song-preview">
    <img src={song.imgUrl} />
      <h4>{song.title}</h4>
      <h4>{song.artist}</h4>
      <h4>{song.album}</h4>
      <h4>{song.duration}</h4>
    </section>
  ) 
  }
}

function mapStateToProps(state) {
  return {
  }
}

const mapDispatchToProps = {

}


export const SongPreview = connect(mapStateToProps, mapDispatchToProps)(_SongPreview)
