import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import { BarWave } from '../cmps/BarWave';

import { playSong, pauseSong, onTogglePlay } from '../store/actions/music.player.action';
import { likeSong, unlikeSong } from '../store/actions/user.action';

function _SongPreview(props) {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(user.likedSongs.find((likedSong) => likedSong.id === song.id));
  }, []);

  const onPlaySong = async (songId, songIdx) => {
    try {
      setIsPlaying(true); //this comp
      props.onTogglePlay(true); //the store
      console.log(' 🚀 SongPreview - isPlaying to store', !isPlaying);
      await props.playSong(songId, songIdx);
    } catch (err) {
      console.log(err);
    }
  };

  const onPauseSong = async () => {
    try {
      props.onTogglePlay(false); //the store
      setIsPlaying(false); //this comp
      // await props.pauseSong(songId, songIdx);
    } catch (err) {
      console.log(err);
    }
  };

  const setLikeSong = async () => {
    setIsLiked(true);
    const user = props.user;
    try {
      await props.likeSong(song, user);
    } catch (err) {
      console.log(err);
    }
  };

  const setUnlikeSong = async () => {
    setIsLiked(false);
    const user = props.user;
    try {
      await props.unlikeSong(song, user);
    } catch (err) {
      console.log(err);
    }
  };

  // render() {
  const { song, idx, onRemoveSong, user } = props;

  return (
    <Draggable draggableId={song.id} index={idx}>
      {(provided) => (
        <section
          className='song-preview'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}>
          {isHover && !isPlaying && (
            <button className='play-btn' onClick={() => onPlaySong(song.id, idx)}>
              <svg
                height='18'
                role='img'
                width='18'
                viewBox='0 0 24 24'
                className='UIBT7E6ZYMcSDl1KL62g'>
                <polygon points='21.57 12 5.98 3 5.98 21 21.57 12' fill='currentColor'></polygon>
              </svg>
            </button>
          )}
          {isHover && isPlaying && (
            <button className='pause-btn' onClick={() => onPauseSong()}>
              <svg
                height='18'
                role='img'
                width='18'
                viewBox='0 0 24 24'
                className='UIBT7E6ZYMcSDl1KL62g'>
                <rect x='5' y='3' width='4' height='18' fill='currentColor'></rect>
                <rect x='15' y='3' width='4' height='18' fill='currentColor'></rect>
              </svg>
            </button>
          )}
          {!isHover && isPlaying && <BarWave />}
          {!isHover && !isPlaying && <h4 className='gray'>{idx + 1}</h4>}
          <div className='song-info'>
            <img src={song.imgUrl} />
            <div>
              <h4>{song.title}</h4>
              <h4 className='small gray'>{song.artist}</h4>
            </div>
          </div>
          <h4 className='small gray'>{song.album}</h4>
          <h4 className='small gray'>{song.duration}</h4>
          <div className='song-actions'>
            {/* <button className="like-btn" title="add to likes"><svg role="img" height="22" width="22" viewBox="0 0 32 32" className="Svg-sc-1bi12j5-0 hDgDGI"><path fill="currentColor" d="M27.672 5.573a7.904 7.904 0 00-10.697-.489c-.004.003-.425.35-.975.35-.564 0-.965-.341-.979-.354a7.904 7.904 0 00-10.693.493A7.896 7.896 0 002 11.192c0 2.123.827 4.118 2.301 5.59l9.266 10.848a3.196 3.196 0 004.866 0l9.239-10.819A7.892 7.892 0 0030 11.192a7.896 7.896 0 00-2.328-5.619zm-.734 10.56l-9.266 10.848c-.837.979-2.508.979-3.346 0L5.035 16.104A6.9 6.9 0 013 11.192 6.9 6.9 0 015.035 6.28a6.935 6.935 0 014.913-2.048 6.89 6.89 0 014.419 1.605A2.58 2.58 0 0016 6.434c.914 0 1.555-.53 1.619-.585a6.908 6.908 0 019.346.431C28.277 7.593 29 9.337 29 11.192s-.723 3.6-2.062 4.941z"></path></svg></button> */}
            {!isLiked ? (
              <button className='like-btn' onClick={setLikeSong}>
                <svg
                  className='unliked'
                  width='24'
                  height='24'
                  xmlns='http://www.w3.org/2000/svg'
                  fillRule='evenodd'
                  clipRule='evenodd'>
                  <path d='M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181' />
                </svg>
              </button>
            ) : (
              <button className='like-btn' onClick={setUnlikeSong}>
                <svg
                  className='liked'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'>
                  <path d='M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z' />
                </svg>
              </button>
            )}
            {isHover && (
              <button className='remove-btn' onClick={() => onRemoveSong(song.id, song.title)}>
                <i className='fas fa-trash-alt'></i>
              </button>
            )}
          </div>
        </section>
      )}
    </Draggable>
  );
  // }
}

function mapStateToProps(state) {
  return {
    player: state.musicPlayerModule.player,
    isPlaying: state.musicPlayerModule.isPlaying,
    currSongIdx: state.musicPlayerModule.currSongIdx,
    currStationId: state.musicPlayerModule.currStationId,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  playSong,
  pauseSong,
  likeSong,
  unlikeSong,
  onTogglePlay,
};

export const SongPreview = connect(mapStateToProps, mapDispatchToProps)(_SongPreview);
