import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function _StationPreview({ station }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const toggleIsPlaying = (ev) => {
    ev.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const imgSrc = station.imgUrl
    ? station.imgUrl
    : 'https://i.scdn.co/image/ab67706f00000002e3e2727edc2f59616536f30b';

  return (
    <section className='station-preview' onClick={() => navigate(`/station/${station._id}`)}>
      <div className='station-img-container'>
        <img src={imgSrc} alt='station' />
        <div className='station-play-btn'>
          <button onClick={toggleIsPlaying}>
            {isPlaying ? (
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
          <h4>Created by: {station.createdBy.fullname}</h4>
          <h4>Tags: {station.tags.join(', ')}</h4>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    player: state.musicPlayerModule.player,
    isPlaying: state.musicPlayerModule.isPlaying,
  };
}

const mapDispatchToProps = {
  // loadSongsToPlayer,
  // onTogglePlay,
};

export const StationPreview = connect(mapStateToProps, mapDispatchToProps)(_StationPreview);
