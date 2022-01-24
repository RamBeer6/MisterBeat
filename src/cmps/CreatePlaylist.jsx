import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { stationService } from '../services/station.service'

import { addSong, loadSongs } from '../store/actions/station.action'

import { StationHero } from './StationHero'
import { SongList } from './SongList'
import { SongSearch } from './SongSearch'


function _CreatePlaylist({ addSong, user, songs, loadSongs }) {
  const [station, setStation] = useState({
    _id: '',
    name: '',
    imgUrl: '',
    desc: '',
  })

  // useEffect(() => {
  //   (async () => {
  //     // console.log('station useEffect?', station)
  //     await loadSongs(station?._id)
  //   })()
  // }, [station])

  const onAddStation = async (station) => {
    try {
      const newStation = await stationService.addNewStation(station, user)
      setStation({ ...newStation })
    } catch (err) {
      console.log(err)
    }
  }

  const onAddSong = async (song) => {
    // if(!station._id) return <h1>First change playlist details</h1>
    try {
        await addSong(station._id, song)
        const newSongs = station.songs.push(song)
        setStation({...station, songs: newSongs })
    } catch (err) {
      console.log(err)
    }
  }

  const onRemoveSong = () => {
      console.log('remove from create playlist');
  }

  console.log('songs?' , songs);
  console.log('station?' , station);

  return (
    <section className="create-playlist">
      <StationHero station={station} onAddStation={onAddStation} />

      {songs?.length && 
      <DragDropContext>
        <SongList stationId={station._id} songs={songs} onRemoveSong={onRemoveSong} />
      </DragDropContext>}

      <div className="add-song-container">
        <h4 className="song-search-header">
          {' '}
          Let's find something for your playlist
        </h4>
        <SongSearch onAddSong={onAddSong} />
      </div>
    </section>
  )
}

function mapStateToProps(state) {
  return {
    songs: state.stationModule.songs,
    user: state.userModule.user
  }
}
const mapDispatchToProps = {
  addSong,
  loadSongs
}

export const CreatePlaylist = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CreatePlaylist)
