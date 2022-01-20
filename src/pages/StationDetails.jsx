import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import { stationService } from '../services/station.service'
import { loadSongs } from '../store/actions/station.action'

import { StationActions } from '../cmps/StationActions'
import { SongList } from '../cmps/SongList'

function _StationDetails(props){
  // state = {
  //   station: [],
  //   params: null
  // }
  const [station, setStation] = useState([]);
  const params = useParams()

  useEffect(() => {
    (async () => {
      const { stationId } = params
      if(stationId) {
        const station = await stationService.getById(stationId)
        setStation(station)
      } else stationService.save()
    })()
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      await props.loadSongs(station._id)
    })()
  }, [station])

  // async componentDidMount() {
  //   try {
  //     const stationId = window.location.pathname.split('/')[2]
  //     // console.log('cdm stationId:', stationId)
  //     if (stationId) {
  //       // station from storage
  //       const station = await stationService.getById(stationId)
  //       // console.log('station:' , station);
  //       this.setState(
  //         (prevState) => ({ ...prevState, station }),
  //         async () => {
  //           await this.props.loadSongs(station._id)
  //         }
  //       )
  //       // await this.props.loadSongs(stationId)
  //     } else {
  //       // new station
  //       stationService.save()
  //     }
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  // render() {
    // const { stationId } = this.props.match.params
    // const stationId = window.location.pathname.split('/')[2]
    const { songs } = props
    // console.log('songs:', songs)
    // console.log('params:', this.props.match.params)

    return (
      <section className="station-details">
        STATION DETAILS
        {/* <StationHero /> */}
        {/* <StationActions /> */}
        <SongList stationId={params.stationId} songs={songs} />
      </section>
    )
  // }
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
