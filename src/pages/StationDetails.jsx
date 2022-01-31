import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import { stationService } from '../services/station.service';
import { socketService } from '../services/socket.service';
import {
  loadSongs,
  updateSongs,
  removeSong,
  addSong,
  removeStation,
  updateStation,
} from '../store/actions/station.action';
import { onTogglePlay, setPlayerSongs, playSong } from '../store/actions/music.player.action';
import { likeStation, unlikeStation, onSetMsg } from '../store/actions/user.action';

import { StationHero } from '../cmps/StationHero';
import { StationActions } from '../cmps/StationActions';
import { SongList } from '../cmps/SongList';
import { SongSearch } from '../cmps/SongSearch';

function _StationDetails(props) {
  const [station, setStation] = useState([]);
  const [isSongSearch, setIsSongSearch] = useState(false);
  const [isLikedStation, setIsLikedStation] = useState(false);
  const myRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { stationId } = params;
      if (stationId) {
        const station = await stationService.getById(stationId);
        setStation(station);
        setIsLikedStation(props.user.likedStations.includes(stationId));
        socketService.on('songsChanged', (songs) => {
          props.loadSongs(stationId);
        });
      }
    })();
    return () => {
      setStation({});
      props.loadSongs('');
      socketService.off('songsChanged');
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      await props.loadSongs(station._id);
    })();
  }, [station]);

  useEffect(() => {
    if (isSongSearch) executeScroll();
  }, [isSongSearch]);

  const onRemoveSong = async (songId, songTitle) => {
    try {
      const updatedUser = await props.removeSong(station._id, songId);
      socketService.emit('changeSongs', updatedUser.songs);
      props.onSetMsg('success', 'Removed song from playlist');
    } catch (err) {
      console.log(err);
      props.onSetMsg('error', 'Could not remove song, please try again');
    }
  };

  const onToggleSongSearch = () => {
    setIsSongSearch(!isSongSearch);
  };

  const onAddSong = async (song) => {
    try {
      const updatedUser = await props.addSong(station._id, song);
      socketService.emit('changeSongs', updatedUser.songs);
      props.onSetMsg('success', 'Add song to playlist');
    } catch (err) {
      // console.log(err);
      props.onSetMsg('error', 'Could not add song to playlist, please try again');
    }
  };

  const executeScroll = () => myRef.current.scrollIntoView();

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) return;

    // same place
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const { songs } = props;
    const { stationId } = params;

    const newSongs = songs.slice();
    const [song] = newSongs.splice(source.index, 1);
    newSongs.splice(destination.index, 0, song);
    await props.updateSongs(stationId, newSongs);
    socketService.emit('changeSongs', newSongs);
  };

  const setLikedStation = async () => {
    setIsLikedStation(true);
    const user = props.user;
    const { stationId } = params;
    const isExists = user.likedStations.find((likedStation) => likedStation === stationId);
    if (isExists) return;
    try {
      const updatedUser = await props.likeStation(station._id, user);
      props.onSetMsg('success', 'Liked playlist');
      const miniUser = {
        _id: updatedUser._id,
        imgUrl: updatedUser.imgUrl,
        userName: updatedUser.userName,
      };
      setStation((prevStation) => ({
        ...prevStation,
        likedByUsers: [...prevStation.likedByUsers, miniUser],
      }));
    } catch (err) {
      // console.log(err);
      props.onSetMsg('error', 'Something went wrong, please try again');
    }
  };

  const setUnlikedStation = async () => {
    setIsLikedStation(false);
    const user = props.user;
    const { stationId } = params;
    try {
      const updatedUser = await props.unlikeStation(stationId, user);
      const filteredUsers = station.likedByUsers.filter((user) => user._id !== updatedUser._id);
      setStation((prevStation) => ({ ...prevStation, likedByUsers: filteredUsers }));
    } catch (err) {
      // console.log(err);
      props.onSetMsg('error', 'Something went wrong, please try again');
    }
  };

  const onSetLikedStation = (value) => {
    if (typeof value !== 'boolean') return;
    // console.log('onSetLikedStation', value);
    if (value) setLikedStation();
    else setUnlikedStation();
  };

  const onGetSongs = async (isStationPlaying) => {
    // console.log('isStationPlaying', isStationPlaying);
    // console.log('songs', songs);
    // console.log('songs[0].id', songs[0].id);
    // func to action with songs
    try {
      props.setPlayerSongs(songs);
      props.onTogglePlay(isStationPlaying);
      props.playSong(songs[0].id, 0);
    } catch (err) {
      // console.log(err);
    }
  };

  const onRemoveStation = async (stationId) => {
    try {
      await props.removeStation(stationId);
      setStation({});
      navigate('/');
    } catch (err) {
      // console.log(err);
      props.onSetMsg('error', 'Something went wrong, please try again');
    }
  };

  const onSaveStation = async (station) => {
    // console.log('onSave stationDetails:' , station);
    try {
      const newStation = await props.updateStation(station, props.user);
      setStation({ ...newStation });
    } catch (err) {
      // console.log(err);
      props.onSetMsg('error', 'Something went wrong, please try again');
    }
  };

  const { songs } = props;

  return (
    <section className='station-details'>
      <StationHero station={station} onSaveStation={onSaveStation} />
      <StationActions
        onGetSongs={onGetSongs}
        onToggleSongSearch={onToggleSongSearch}
        isLikedStation={isLikedStation}
        onSetLikedStation={onSetLikedStation}
        stationId={params.stationId}
        onRemoveStation={onRemoveStation}
        onTogglePlay={props.onTogglePlay}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <SongList stationId={params.stationId} songs={songs} onRemoveSong={onRemoveSong} />
      </DragDropContext>

      {isSongSearch && (
        <section ref={myRef}>
          <SongSearch
            stationId={params.stationId}
            onAddSong={onAddSong}
            onSetMsg={props.onSetMsg}
          />
        </section>
      )}
    </section>
  );
}

function mapStateToProps(state) {
  return {
    songs: state.stationModule.songs,
    user: state.userModule.user,
    currSongs: state.musicPlayerModule.currSongs,
    isPlaying: state.musicPlayerModule.isPlaying /*******added  */,
  };
}
const mapDispatchToProps = {
  loadSongs,
  updateSongs,
  removeSong,
  addSong,
  likeStation,
  unlikeStation,
  setPlayerSongs,
  removeStation,
  updateStation,
  onTogglePlay,
  playSong,
  onSetMsg,
};

export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails);
