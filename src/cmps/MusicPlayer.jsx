import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/youtube';
import Slider from '@mui/material/Slider';

import Duration from './Duration';
import imgSong from '../assets/imgs/default-song.png';

import {
  onTogglePlay,
  playSong,
  pauseSong,
  songIdx,
  shuffleCurrSongs,
  shuffle,
} from '../store/actions/music.player.action';

import { setPlayer } from '../store/actions/music.player.action';

class _MusicPlayer extends React.Component {
  state = {
    playing: false,
    controls: false,
    volume: 0.3,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
  };

  onReady = (ev) => {
    this.props.setPlayer(ev.target);
  };

  ref = (player) => {
    this.player = player;
  };

  handlePlayPause = () => {
    this.props.onTogglePlay(!this.props.isPlaying);
  };

  handleVolumeChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      volume: parseFloat(event.target.value),
    }));
    // this.setState((prevState) => ({
    //   ...prevState,
    //   volume: event.target.value,
    // }))
  };

  handleSeekChange = (ev) => {
    console.log('seek handlechange', ev.target.value);
    this.setState((prevState) => ({
      ...prevState,
      played: parseFloat(ev.target.value),
    }));
    console.log('this.state.played', this.state.played);
    // this.setState((prevState) => ({
    //   ...prevState,
    //   played: ev.target.value,
    // }));
  };

  handleSeekMouseUp = (ev) => {
    // console.log('seek mouse up:' , ev.target.value);

    // this.setState((prevState) => ({ ...prevState, seeking: false }), () => {
    //   this.player.seekTo(parseFloat(ev.target.value))
    // })

    this.setState((prevState) => ({ ...prevState, seeking: false }));
    this.player.seekTo(parseFloat(ev.target.value));
  };

  handleSeekMouseDown = (ev) => {
    // this.setState((prevState) => ({ ...prevState, seeking: true })); //ORIGINAL
    this.setState((prevState) => ({ ...prevState, played: ev.target.value }));
    this.player.seekTo(parseFloat(ev.target.value));
  };

  handleProgress = (state) => {
    if (!this.state.seeking) this.setState(state); //ORIGINAL
  };

  handleDuration = (duration) => {
    this.setState((prevState) => ({ ...prevState, duration: duration }));
  };

  nextSong = () => {
    const { currSongs, currSongIdx, isShuffle, shuffleSongs, songs } = this.props;
    const { playSong, songIdx } = this.props;

    if (!isShuffle) {
      if (currSongIdx === songs.length - 1) {
        songIdx(0);
        playSong(songs[0].id);
      } else {
        songIdx(currSongIdx + 1);
        playSong(songs[currSongIdx + 1].id);
      }
    } else {
      if (currSongIdx === shuffleSongs.length - 1) {
        songIdx(0);
        playSong(shuffleSongs[0].id);
      } else {
        songIdx(currSongIdx + 1);
        playSong(shuffleSongs[currSongIdx + 1].id);
      }
    }
  };

  prevSong = () => {
    const { currSongs, currSongIdx, isShuffle, shuffleSongs, songs } = this.props;
    const { playSong, songIdx } = this.props;
    if (!isShuffle) {
      if (currSongIdx === 0) {
        songIdx(currSongs.length - 1);
        playSong(currSongs[currSongs.length - 1].id);
      } else {
        songIdx(currSongIdx - 1);
        playSong(currSongs[currSongIdx - 1].id);
      }
    } else {
      if (currSongIdx === 0) {
        songIdx(shuffleSongs.length - 1);
        playSong(shuffleSongs[currSongs.length - 1].id);
      } else {
        songIdx(currSongIdx - 1);
        playSong(shuffleSongs[currSongIdx - 1].id);
      }
    }
  };

  onShuffle = () => {
    // console.log('shuffle');
    this.props.onTogglePlay(false);
    this.props.shuffle(true);
    // console.log('old array', this.props.currSongs);
    const array = [...this.props.songs];
    let currShuffleIdx = array.length;
    while (currShuffleIdx != 0) {
      let randomIdx = Math.floor(Math.random() * currShuffleIdx);
      console.log(randomIdx, randomIdx);
      currShuffleIdx--;

      [array[currShuffleIdx], array[randomIdx]] = [array[randomIdx], array[currShuffleIdx]];
    }
    // console.log('new array', array);
    // console.log('this.props.currSongIdx', this.props.currSongIdx);
    this.props.shuffleCurrSongs(array);
    this.props.playSong(array[0].id);
    this.props.onTogglePlay(true);
  };

  unShuffle = () => {
    this.props.onTogglePlay(false);
    this.props.shuffle(false);
    this.props.shuffleCurrSongs([]);
    this.props.setPlayerSongs(...this.props.songs);
    this.props.playSong(this.props.currSongs[0].id);
    this.props.onTogglePlay(true);
  };

  render() {
    const { playing, controls, volume, muted, played, loaded, duration } = this.state;
    const { isPlaying, currSongs, currSongIdx, songDetails, isShuffle, shuffleSongs, songs } =
      this.props;

    const videoId = this.props.currSongId;
    let url = `https://www.youtube.com/watch?v=${videoId}`;

    console.log('played', played);
    console.log('duration', duration);

    return (
      <section className='music-player-container'>
        <ReactPlayer
          ref={this.ref}
          className='react-player'
          width='0px'
          height='0px'
          url={url}
          // playing={playing}
          playing={isPlaying}
          controls={controls}
          volume={volume}
          muted={muted}
          onReady={this.onReady}
          // onStart={() => console.log('onStart')}
          onStart={this.onStart}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onBuffer={() => console.log('onBuffer')}
          onSeek={(e) => console.log('onSeek', e)}
          onEnded={this.handleEnded}
          onError={(e) => console.log('onError', e)}
          onProgress={this.handleProgress}
          onDuration={this.handleDuration}
        />

        <div className='left-side-container'>
          {!isShuffle && (
            <img
              src={
                !songs && !songs.length && !songDetails
                  ? { imgSong }
                  : songs[currSongIdx]?.imgUrl || songDetails.imgUrl
              }
              alt='image'
            />
          )}

          {isShuffle && (
            <img
              src={
                !currSongs && !currSongs.length && !songDetails
                  ? ''
                  : shuffleSongs[currSongIdx]?.imgUrl
              }
              // alt='image'
            />
          )}

          <div className='p-container'>
            {
              <section>
                {!isShuffle && <span>{songs[currSongIdx]?.artist || songDetails.artist}</span>}
                {isShuffle && <span>{shuffleSongs[currSongIdx]?.artist}</span>}
                <br></br>
                {!isShuffle && <span>{songs[currSongIdx]?.title || songDetails.title}</span>}
                {isShuffle && <span>{shuffleSongs[currSongIdx]?.title}</span>}
              </section>
            }
          </div>
          <svg // love
            role='img'
            height='16'
            width='16'
            viewBox='0 0 16 16'
            className='svg-love'>
            <path d='M13.764 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253A4.05 4.05 0 00.974 5.61c0 1.089.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195A4.052 4.052 0 0014.96 5.61a4.057 4.057 0 00-1.196-2.883zm-.722 5.098L8.58 13.048c-.307.36-.921.36-1.228 0L2.864 7.797a3.072 3.072 0 01-.905-2.187c0-.826.321-1.603.905-2.187a3.091 3.091 0 012.191-.913 3.05 3.05 0 011.957.709c.041.036.408.351.954.351.531 0 .906-.31.94-.34a3.075 3.075 0 014.161.192 3.1 3.1 0 01-.025 4.403z'></path>
          </svg>
          {/* 
          <svg // song img
            className="svg-mini-img"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="currentColor" fill-rule="evenodd">
              <path
                d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
                fill-rule="nonzero"
              ></path>
              <path d="M10 8h4v3h-4z"></path>
            </g>
          </svg> */}
        </div>

        <div className='middle-player-container'>
          <div className='middle-controls-container'>
            <div className='middle-left-controls'>
              <button className='shuffle-btn' onClick={this.onShuffle}>
                <svg //shuffle
                  role='img'
                  height='16'
                  width='16'
                  viewBox='0 0 16 16'
                  className='svg-shuffle'>
                  <path d='M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z'></path>
                </svg>
              </button>
              <button className='prev-btn' onClick={this.prevSong}>
                <svg //prev
                  role='img'
                  height='16'
                  width='16'
                  viewBox='0 0 16 16'
                  className='svg-prev'>
                  <path d='M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z'></path>
                </svg>
              </button>
            </div>
            <div className='middle-play-pause-controls'>
              <button className='play-pause' onClick={this.handlePlayPause}>
                {!isPlaying ? (
                  <svg role='img' height='16' width='16' viewBox='0 0 16 16' className='svg-play'>
                    <path d='M4.018 14L14.41 8 4.018 2z'></path>
                  </svg>
                ) : (
                  <svg //pause
                    role='img'
                    height='16'
                    width='16'
                    viewBox='0 0 16 16'
                    className='svg-pause'>
                    <path fill='none' d='M0 0h16v16H0z'></path>
                    <path d='M3 2h3v12H3zm7 0h3v12h-3z'></path>
                  </svg>
                )}
              </button>
            </div>
            <div className='middle-right-controls'>
              <button className='next-btn' onClick={this.nextSong}>
                <svg // next
                  role='img'
                  height='16'
                  width='16'
                  viewBox='0 0 16 16'
                  className='svg-next'>
                  <path d='M11 3v4.119L3 2.5v11l8-4.619V13h2V3z'></path>
                </svg>
              </button>

              <button className='unshuffle-btn' onClick={this.unShuffle}>
                <svg //play again
                  role='img'
                  height='16'
                  width='16'
                  viewBox='0 0 16 16'
                  className='svg-again'>
                  <path d='M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z'></path>
                </svg>
              </button>
            </div>
          </div>

          {/**current time */}
          <div className='duration-progress-container'>
            <Duration seconds={duration * played} />

            {/**progres bar */}

            {/* <input
              type='range'
              className='progress-bar'
              min={0}
              max={0.999999}
              step='any'
              value={played}
              onMouseDown={this.onMouseDown}
              onChange={this.handleSeekChange}
              onMouseUp={this.handleSeekMouseUp}
            /> */}

            <Slider
              className='duration-slider'
              size='medium'
              aria-label='Medium'
              min={0}
              max={0.999999}
              step={0.00000001}
              defaultValue={0}
              value={played}
              // onMouseDown={this.handleSeekMouseDown}
              // onChange={this.handleSeekChange}
              onChange={this.handleSeekMouseDown}
              // onMouseUp={this.handleSeekMouseUp}
            />

            {/**duration */}

            <Duration seconds={duration} />
          </div>
        </div>
        <div className='right-side-container'>
          {/* <svg // lyrics
            role="img"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            className="svg-lyrics"
          >
            <path d="M8.5 1A4.505 4.505 0 004 5.5c0 .731.191 1.411.502 2.022L1.99 13.163a1.307 1.307 0 00.541 1.666l.605.349a1.307 1.307 0 001.649-.283L9.009 9.95C11.248 9.692 13 7.807 13 5.5 13 3.019 10.981 1 8.5 1zM4.023 14.245a.307.307 0 01-.388.066l-.605-.349a.309.309 0 01-.128-.393l2.26-5.078A4.476 4.476 0 007.715 9.92l-3.692 4.325zM8.5 9C6.57 9 5 7.43 5 5.5S6.57 2 8.5 2 12 3.57 12 5.5 10.429 9 8.5 9z"></path>
          </svg> */}

          {/* <svg //next songs
            role='img'
            height='16'
            width='16'
            viewBox='0 0 16 16'
            className='svg-lists'>
            <path d='M2 2v5l4.33-2.5L2 2zm0 12h14v-1H2v1zm0-4h14V9H2v1zm7-5v1h7V5H9z'></path>
          </svg> */}

          {/* <svg // connect to device
            role="img"
            height="16"
            width="16"
            aria-label="Connect to a device"
            viewBox="0 0 16 16"
            className="svg-connect-to"
          >
            <path d="M0 3v8c0 .55.45 1 1 1h5v-1H1V3h5V2H1c-.55 0-1 .45-1 1zm3 11.5c0 .275.225.5.5.5H6v-1H3.5c-.275 0-.5.225-.5.5zM15 2H9c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H9V3h6v11zm-3-8a.75.75 0 100-1.5.75.75 0 000 1.5zm0 6a2 2 0 100-4 2 2 0 000 4zm0-3c.551 0 1 .449 1 1s-.449 1-1 1-1-.449-1-1 .449-1 1-1z"></path>
          </svg> */}

          <div className='volume-container'>
            <button className='player-vol-btn'>
              {!volume ? (
                <svg //volume on
                  role='presentation'
                  height='16'
                  width='16'
                  aria-label='Volume medium'
                  id='volume-icon'
                  viewBox='0 0 16 16'
                  className='Svg-sc-1bi12j5-0 hDgDGI'>
                  <path d='M0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302zm4.464-2.314q.401-.925.401-1.956 0-1.032-.4-1.957-.402-.924-1.124-1.623L11 3.69q.873.834 1.369 1.957.496 1.123.496 2.385 0 1.262-.496 2.385-.496 1.123-1.369 1.956l-.659-.762q.722-.698 1.123-1.623z'></path>
                </svg>
              ) : (
                <svg //volume off
                  role='presentation'
                  height='16'
                  width='16'
                  aria-label='Volume medium'
                  id='volume-icon'
                  viewBox='0 0 16 16'
                  className='Svg-sc-1bi12j5-0 hDgDGI'>
                  <path d='M0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302zm4.464-2.314q.401-.925.401-1.956 0-1.032-.4-1.957-.402-.924-1.124-1.623L11 3.69q.873.834 1.369 1.957.496 1.123.496 2.385 0 1.262-.496 2.385-.496 1.123-1.369 1.956l-.659-.762q.722-.698 1.123-1.623z'></path>
                </svg>
              )}
            </button>
            {/* <input
              className='volume-input'
              type='range'
              min={0}
              max={1}
              step='any'
              value={volume}
              onChange={this.handleVolumeChange}
            />   */}
          </div>
          <Slider
            className='volumn-slider'
            size='medium'
            min={0}
            max={1}
            step={0.05}
            aria-label='Volume'
            defaultValue={0.3}
            value={volume}
            onChange={this.handleVolumeChange}
          />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    songs: state.stationModule.songs,
    player: state.musicPlayerModule.player,
    isPlaying: state.musicPlayerModule.isPlaying,
    currSongIdx: state.musicPlayerModule.currSongIdx,
    currSongId: state.musicPlayerModule.currSongId,
    currStationId: state.musicPlayerModule.currStationId,
    currSongs: state.musicPlayerModule.currSongs,
    songDetails: state.musicPlayerModule.songDetails,
    isShuffle: state.musicPlayerModule.isShuffle,
    shuffleSongs: state.musicPlayerModule.shuffleSongs,
  };
}

const mapDispatchToProps = {
  setPlayer,
  onTogglePlay,
  playSong,
  pauseSong,
  songIdx,
  shuffleCurrSongs,
  shuffle,
};

export const MusicPlayer = connect(mapStateToProps, mapDispatchToProps)(_MusicPlayer);
