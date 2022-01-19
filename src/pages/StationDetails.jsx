import React from 'react'
import { connect } from 'react-redux'

import { stationService } from '../services/station.service'

import { SongList } from '../cmps/SongList'
import { loadSongs } from '../store/actions/station.action'

class _StationDetails extends React.Component {
  state = {
    station: []
  }

  async componentDidMount() {
    try {
      const stationId = window.location.pathname.split('/')[2]
      console.log('cdm stationId:' , stationId)
      if(stationId) {
        // station from storage
        const station = await stationService.getById(stationId)
        // console.log('station:' , station);
        this.setState(prevState => ({ ...prevState, station }), async () => {
          await this.props.loadSongs(station._id)
        })
        // await this.props.loadSongs(stationId)
      } else {
        // new station
        stationService.save()
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    // const { stationId } = this.props.match.params
    const stationId = window.location.pathname.split('/')[2]
    const { songs } = this.props
    console.log('songs:' , songs)

    return (
      <section className="station-details">
        STATION DETAILS
        <SongList stationId={stationId} songs={songs} />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    songs: state.stationModule.songs,
  }
}
const mapDispatchToProps = {
  loadSongs,
}

export const StationDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StationDetails)
