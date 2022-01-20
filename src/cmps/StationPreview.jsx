import React from 'react'
import { connect } from 'react-redux'

class _StationPreview extends React.Component {
  render() {
    const { station } = this.props
    const imgSrc = station.imgUrl ? station.imgUrl : 'https://i.scdn.co/image/ab67706f00000002e3e2727edc2f59616536f30b'
    return (
        <section className="station-preview">
            <div className="station-img-container">
                <img src={imgSrc} alt="station" />
                <div className="station-play-btn">
                    <button>Play</button>
                </div>
            </div>
            <div className="station-content">
                <h2>{station.name}</h2>
                <div className="station-info">
                    <h4>Created by: {station.createdBy.fullname}</h4>
                    <h4>Tags: {station.tags.join(', ')}</h4>
                </div>
            </div>
        </section>)
  }
}

function mapStateToProps(state) {
  return {}
}

const mapDispatchToProps = {}

export const StationPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StationPreview)
