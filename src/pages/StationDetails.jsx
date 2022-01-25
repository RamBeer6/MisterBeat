import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import { stationService } from '../services/station.service';
import { loadSongs, updateSongs, removeSong, addSong, removeStation, updateStation } from '../store/actions/station.action';
import { onTogglePlay, setPlayerSongs, playSong } from '../store/actions/music.player.action';
import { likeStation, unlikeStation } from '../store/actions/user.action';

import { StationHero } from '../cmps/StationHero';
import { StationActions } from '../cmps/StationActions';
import { SongList } from '../cmps/SongList';
import { SongSearch } from '../cmps/SongSearch';

function _StationDetails(props) {
  const [station, setStation] = useState([])
  const [isSongSearch, setIsSongSearch] = useState(false)
  const [isLikedStation, setIsLikedStation] = useState(false)
  const myRef = useRef(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { stationId } = params
      if (stationId) {
        const station = await stationService.getById(stationId);
        setStation(station);
        setIsLikedStation(props.user.likedStations.includes(stationId));
      } else stationService.save();
    })();
    //eslint-disable-next-line
  }, []);

  // ComponentWillUnmount
  useEffect(() => {
    return () => {
      setStation({})
      props.loadSongs('')
    }
  }, [])

  useEffect(() => {
    (async () => {
      await props.loadSongs(station._id);
    })();
  }, [station])

  useEffect(() => {
    if (isSongSearch) executeScroll();
  }, [isSongSearch]);

  const onRemoveSong = async (songId, songTitle) => {
    // const { stationId } = params
    try {
      await props.removeSong(station._id, songId);
    } catch (err) {
      console.log(err);
    }
  };

  const onToggleSongSearch = () => {
    setIsSongSearch(!isSongSearch);
  };

  const onAddSong = async (song) => {
    try {
      await props.addSong(station._id, song);
    } catch (err) {
      console.log(err);
    }
  };

  const executeScroll = () => myRef.current.scrollIntoView();

  const onDragEnd = (result) => {
    // console.log('result:' , result);
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
    props.updateSongs(stationId, newSongs);
  }

  const setLikedStation = async () => {
    setIsLikedStation(true);
    const user = props.user;
    const { stationId } = params;
    const isExists = user.likedStations.find((likedStation) => likedStation === stationId);
    if (isExists) return;
    try {
      await props.likeStation(station._id, user);
    } catch (err) {
      console.log(err);
    }
  };

  const setUnlikedStation = async () => {
    setIsLikedStation(false);
    const user = props.user;
    const { stationId } = params;
    try {
      await props.unlikeStation(stationId, user);
    } catch (err) {
      console.log(err);
    }
  };

  const onSetLikedStation = (value) => {
    if (typeof value !== 'boolean') return;
    if (value) setLikedStation();
    else setUnlikedStation();
  };

  const onGetSongs = async (isStationPlaying) => {
    console.log('isStationPlaying', isStationPlaying);
    console.log('songs', songs);
    console.log('songs[0].id', songs[0].id);
    // func to action with songs
    try {
      props.setPlayerSongs(songs);
      props.onTogglePlay(isStationPlaying);
      props.playSong(songs[0].id, 0);
    } catch (err) {
      // console.log(err);
    }
  }

  const onRemoveStation = async (stationId) => {
    try {
      await props.removeStation(stationId)
      setStation({})
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  const onSaveStation = async (station) => {
    console.log('onSave stationDetails:' , station);
    try {
      const newStation = await props.updateStation(station, props.user)
      setStation({ ...newStation })
    } catch (err) {
      console.log(err);
    }
  }

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
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <SongList stationId={params.stationId} songs={songs} onRemoveSong={onRemoveSong} />
      </DragDropContext>

      {isSongSearch && (
        <section ref={myRef}>
          <SongSearch stationId={params.stationId} onAddSong={onAddSong} />
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
};

export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails);
