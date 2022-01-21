import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import { stationService } from '../services/station.service'
import { loadSongs, updateSongs, removeSong } from '../store/actions/station.action'

import { StationActions } from '../cmps/StationActions'
import { SongList } from '../cmps/SongList'
import { SongSearch } from '../cmps/SongSearch'

function _StationDetails(props) {
  const [station, setStation] = useState([])
  const [isSongSearch, setIsSongSearch] = useState(false)
  const myRef = useRef(null)
  const params = useParams()

  useEffect(() => {
    (async () => {
      const { stationId } = params
      if (stationId) {
        const station = await stationService.getById(stationId)
        setStation(station)
      } else stationService.save()
    })()
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    (async () => {
      await props.loadSongs(station._id)
    })()
  }, [station])

  const onRemoveSong = async (songId, songTitle) => {
    console.log('remove song:' , songId , songTitle)
    const { stationId } = params
    await props.removeSong(stationId, songId)
  }

  const onToggleSongSearch = () => {
    setIsSongSearch(!isSongSearch)
    if(isSongSearch) executeScroll()
  }

  const executeScroll = () => myRef.current.scrollIntoView() 

  const onDragEnd = (result) => {
    // console.log('result:' , result);
    const { destination, source } = result
    if (!destination) return

    // same place
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return

    const { songs } = props
    const { stationId } = params
    
    const newSongs = songs.slice()
    const [ song ] = newSongs.splice(source.index, 1)
    newSongs.splice(destination.index, 0, song)
    props.updateSongs(stationId, newSongs)

  }

  const { songs } = props

  return (
    <section className="station-details">
      STATION DETAILS
      {/* <StationHero /> */}
      <StationActions onToggleSongSearch={onToggleSongSearch} />
      <DragDropContext onDragEnd={onDragEnd}>
        <SongList stationId={params.stationId} songs={songs} onRemoveSong={onRemoveSong} />
      </DragDropContext>

      { isSongSearch && 
        <section ref={myRef}>
          <h3>SONG SEARCH</h3>
          <SongSearch stationId={params.stationId} />
        </section>}
    </section>
  )
}

function mapStateToProps(state) {
  return {
    songs: state.stationModule.songs,
  }
}
const mapDispatchToProps = {
  loadSongs,
  updateSongs,
  removeSong
}

export const StationDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StationDetails)
