import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/youtube';
import Slider from '@mui/material/Slider';

import Duration from './Duration';

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
  };

  handleSeekChange = (ev) => {
    this.setState((prevState) => ({
      ...prevState,
      played: parseFloat(ev.target.value),
    }));
  };

  handleSeekMouseUp = (ev) => {
    this.setState((prevState) => ({ ...prevState, seeking: false }));
    this.player.seekTo(parseFloat(ev.target.value));
  };

  handleSeekMouseDown = (ev) => {
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
    this.props.onTogglePlay(false);
    this.props.shuffle(true);
    const array = [...this.props.songs];
    let currShuffleIdx = array.length;
    while (currShuffleIdx != 0) {
      let randomIdx = Math.floor(Math.random() * currShuffleIdx);
      currShuffleIdx--;

      [array[currShuffleIdx], array[randomIdx]] = [array[randomIdx], array[currShuffleIdx]];
    }
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
    const { controls, volume, muted, played, duration } = this.state;
    const { isPlaying, currSongs, currSongIdx, songDetails, isShuffle, shuffleSongs, songs } =
      this.props;

    const videoId = this.props.currSongId;
    let url = `https://www.youtube.com/watch?v=${videoId}`;

    return (
      <section className='music-player-container'>
        <ReactPlayer
          ref={this.ref}
          className='react-player'
          width='0px'
          height='0px'
          url={url}
          playing={isPlaying}
          controls={controls}
          volume={volume}
          muted={muted}
          onReady={this.onReady}
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
                !songs || (!songs.length && !songDetails)
                  ? 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'
                  : songs[currSongIdx]?.imgUrl || songDetails.imgUrl
              }
              alt='image'
              className='song-img'
            />
          )}

          {isShuffle && (
            <img
              src={
                !currSongs || (!currSongs.length && !songDetails)
                  ? 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'
                  : shuffleSongs[currSongIdx]?.imgUrl
              }
              className='song-img'
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
        </div>

        <div className='middle-player-container'>
          <div className='middle-controls-container'>
            <div className='middle-left-controls hide-to-moblie'>
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

            <div className='middle-right-controls hide-to-moblie'>
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
            <Slider
              className='duration-slider'
              size='medium'
              aria-label='Medium'
              min={0}
              max={0.999999}
              step={0.00000001}
              defaultValue={0}
              value={played}
              onChange={this.handleSeekMouseDown}
            />
            {/**duration */}
            <Duration seconds={duration} />
          </div>
        </div>
        <div className='right-side-container hide-to-moblie'>
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
