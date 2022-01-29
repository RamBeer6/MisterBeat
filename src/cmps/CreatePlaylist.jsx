import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import { socketService } from '../services/socket.service'

import { addSong, loadSongs, removeSong, removeStation, updateSongs, addStation, updateStation } from '../store/actions/station.action'
import { addPlaylistActivity } from '../store/actions/activity.log.action'
import { onSetMsg } from '../store/actions/user.action'
import { StationHero } from '../cmps/StationHero'
import { StationActions } from '../cmps/StationActions'
import { SongList } from '../cmps/SongList'
import { SongSearch } from '../cmps/SongSearch'

function _CreatePlaylist({ addSong, user, songs, loadSongs, removeSong, removeStation, updateSongs, addStation, updateStation, addPlaylistActivity, onSetMsg }) {
  const [station, setStation] = useState({
    _id: '',
    name: '',
    imgUrl: '',
    desc: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      loadSongs('');
    };
  }, []);

  useEffect(() => {
    return() => {
     loadSongs('') 
    }
  },[])

  const onSaveStation = async (station) => {
    try {
      let newStation;
      if (station._id) {
        newStation = await updateStation(station, user);
        // socketService.emit('add station', newStation)
      } else {
        // newStation = await stationService.addNewStation(station, user)
        newStation = await addStation(station, user)
        socketService.emit('addStation', newStation)
        addPlaylistActivity(station, user)
        onSetMsg('success', 'Added new playlist')
      }
      setStation({ ...newStation });
    } catch (err) {
      // console.log(err)
      onSetMsg('error', 'Could not create playlist, please try again')
    }
  };

  const onAddSong = async (song) => {
    try {
      await addSong(station._id, song)
      station.songs.push(song)
      const newSongs = station.songs
      setStation({ ...station, songs: newSongs })
      socketService.emit('changeSongs', newSongs)
      onSetMsg('success', 'Added new song to playlist')
    } catch (err) {
      // console.log(err)
      onSetMsg('error', 'Could not add song to playlist, please try again')
    }
  };

  const onRemoveSong = async (songId) => {
    try {
      await removeSong(station._id, songId)
      const newSongs = station.songs.filter(song => song.id !== songId)
      setStation({ ...station, songs: newSongs })
      socketService.emit('changeSongs', newSongs)
      onSetMsg('success', 'Removed song from playlist')
    } catch (err) {
      // console.log(err);
      onSetMsg('error', 'Could not remove song from playlist, please try again')
    }
  };

  const onRemoveStation = async (stationId) => {
    try {
      await removeStation(stationId);
      setStation({});
      loadSongs('');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) return;

    // same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newSongs = songs.slice();
    const [song] = newSongs.splice(source.index, 1);
    newSongs.splice(destination.index, 0, song);
    await updateSongs(station._id, newSongs);
    socketService.emit('changeSongs', newSongs);
  };

  return (
    <section className='create-playlist'>
      <StationHero station={station} onSaveStation={onSaveStation} />
      <StationActions
        stationId={station._id}
        onRemoveStation={onRemoveStation}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <SongList
          stationId={station._id}
          songs={songs}
          onRemoveSong={onRemoveSong}
        />
      </DragDropContext>

      <section className='search-in-playlist-container'>
        <div className='add-song-container'>
          {/* <h4 className='song-search-header'> Let's find something for your playlist</h4> */}
          <SongSearch onAddSong={onAddSong} />
        </div>
      </section>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    songs: state.stationModule.songs,
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  addSong,
  loadSongs,
  removeSong,
  removeStation,
  updateSongs,
  addStation,
  updateStation,
  addPlaylistActivity,
  onSetMsg
}

export const CreatePlaylist = connect(mapStateToProps, mapDispatchToProps)(_CreatePlaylist);
