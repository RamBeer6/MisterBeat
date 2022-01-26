import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { onTogglePlay, setPlayerSongs, playSong } from '../store/actions/music.player.action';

function _StationPreview({
  station,
  setPlayerSongs,
  onTogglePlay,
  playSong,
  isPlaying,
  currStationId,
}) {
  // console.log('station StationPreview', station);
  const [isStationPlaying, setIsStationPlaying] = useState(false);
  const navigate = useNavigate();
  const toggleIsPlaying = (ev) => {
    ev.stopPropagation();
    try {
      setPlayerSongs(station.songs, station._id);
      onTogglePlay(!isPlaying);
      playSong(station.songs[0].id, 0);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    // console.log('isStationPlaying:', isStationPlaying);
    // setisStationPlaying(isPlaying);
    // console.log('isPlaying', isPlaying);
    // console.log('currStationId ', currStationId, 'station._id:', station._id);
    if (currStationId === station._id) setIsStationPlaying(isPlaying);
  }, [isPlaying]);

  const imgSrc = station.imgUrl
    ? station.imgUrl
    : 'https://i.scdn.co/image/ab67706f00000002e3e2727edc2f59616536f30b';

  // console.log('isStationPlaying', isStationPlaying);
  return (
    <section className='station-preview' onClick={() => navigate(`/station/${station._id}`)}>
      <div className='station-img-container'>
        <img src={imgSrc} alt='station' />
        <div className='station-play-btn'>
          <button onClick={toggleIsPlaying}>
            {isStationPlaying ? (
              <svg height='22' role='img' width='22' viewBox='0 0 24 24' aria-hidden='true'>
                <rect x='5' y='3' width='4' height='18' fill='currentColor'></rect>
                <rect x='15' y='3' width='4' height='18' fill='currentColor'></rect>
              </svg>
            ) : (
              <svg height='22' role='img' width='22' viewBox='0 0 24 24' aria-hidden='true'>
                <polygon points='21.57 12 5.98 3 5.98 21 21.57 12' fill='currentColor'></polygon>
              </svg>
            )}
          </button>
          {/* <button><svg height="22" role="img" width="22" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="4" height="18" fill="currentColor"></rect><rect x="15" y="3" width="4" height="18" fill="currentColor"></rect></svg></button> */}
        </div>
      </div>
      <div className='station-content'>
        <h2>{station.name}</h2>
        <div className='station-info'>
          <h4>Created by: {station.createdBy?.userName}</h4>
          <h4>Tags: {station.tags?.join(', ')}</h4>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    player: state.musicPlayerModule.player,
    isPlaying: state.musicPlayerModule.isPlaying,
    currSongs: state.musicPlayerModule.currSongs,
    currStationId: state.musicPlayerModule.currStationId,
  };
}

const mapDispatchToProps = {
  // loadSongsToPlayer,
  // onTogglePlay,
  setPlayerSongs,
  onTogglePlay,
  playSong,
};

export const StationPreview = connect(mapStateToProps, mapDispatchToProps)(_StationPreview);
