import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import { stationService } from '../services/station.service';
import { loadSongs, updateSongs, removeSong, addSong } from '../store/actions/station.action';
import { setPlayerSongs } from '../store/actions/music.player.action';
import { likeStation, unlikeStation } from '../store/actions/user.action';

import { StationActions } from '../cmps/StationActions';
import { SongList } from '../cmps/SongList';
import { SongSearch } from '../cmps/SongSearch';

function _StationDetails(props) {
  const [station, setStation] = useState([]);
  const [isSongSearch, setIsSongSearch] = useState(false);
  const [isLikedStation, setIsLikedStation] = useState(false);
  const myRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    (async () => {
      const { stationId } = params;
      if (stationId) {
        const station = await stationService.getById(stationId);
        setStation(station);
        setIsLikedStation(
          props.user.likedStations.find((likedStation) => likedStation === stationId)
        );
      } else stationService.save();
    })();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      await props.loadSongs(station._id);
    })();
  }, [station]);

  useEffect(() => {
    if (isLikedStation) setLikedStation();
    else setUnlinkedStation();
  }, [isLikedStation]);

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
  };

  const setLikedStation = async () => {
    // console.log('like station');
    const user = props.user;
    const isExists = user.likedStations.find((likedStation) => likedStation === station._id);
    if (isExists) return;
    try {
      await props.likeStation(station._id, user);
    } catch (err) {
      console.log(err);
    }
  };

  const setUnlinkedStation = async () => {
    // console.log('unlike station');
    const user = props.user;
    try {
      await props.unlikeStation(station._id, user);
    } catch (err) {
      console.log(err);
    }
  };

  const onSetLikedStation = (value) => {
    if (typeof value !== 'boolean') return;
    setIsLikedStation(value);
    // if(isLikedStation) setLikedStation()
    // else setUnlinkedStation()
  };

  const onGetSongs = async (isStationPlaying) => {
    console.log('isStationPlaying', isStationPlaying);
    // func to action with songs
    try {
      await props.setPlayerSongs(songs);
    } catch (err) {
      // console.log(err);
    }
  };

  const { songs } = props;

  return (
    <section className='station-details'>
      {/* <StationHero /> */}
      <StationActions
        onGetSongs={onGetSongs}
        onToggleSongSearch={onToggleSongSearch}
        isLikedStation={isLikedStation}
        onSetLikedStation={onSetLikedStation}
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
};

export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails);
