import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/lazy';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import Duration from './Duration';
import { strategy } from 'workbox-streams';
import {
  setPlayer,
  setSongIdx,
  onTogglePlay,
  loadSongsToPlayer,
} from '../store/actions/musicPlayer.action';

export class _MusicPlayer extends React.Component {
  state = {
    // url: null, FROM PROPS I THINK
    // station:[],
    // currSongIdx:0,
    playing: false,
    controls: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
  };

  componentDidMount() {
    // this.setState((prevState) => ({ ...prevState, playing: !this.state.playing }));
    // this.setState((prevState) => ({ ...prevState, playing: this.props.isPlaying })); //as given by StationPreview
    console.log('🎵  MusicPlayer - playing in comp', this.state.playing);
    console.log('🎵  MusicPlayer - props isplaying', this.props.isPlaying);
    this.setState((prevState) => ({
      ...prevState,
      playing: this.props.isPlaying,
    }));

    // loadStation();
  }

  // loadStation=()=>{
  //   this.setState((prevState) => ({ ...prevState, station: this.props.currSongs }));
  // }

  // setPlaying=()=>{
  //   this.setState((prevState) => ({ ...prevState, playing: this.props.isPlaying }));
  // }

  ref = (player) => {
    this.player = player;
    console.log('REF - player', player);

    setPlayer(player);
  };

  handlePlayPause = () => {
    this.setState((prevState) => ({
      ...prevState,
      playing: !this.state.playing,
    }));
  };

  handleVolumeChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      volume: parseFloat(event.target.value),
    }));
  };

  handlePlay = () => {
    console.log('on play');
    this.setState((prevState) => ({ ...prevState, playing: true }));
  };

  handlePause = () => {
    console.log('on play');
    this.setState((prevState) => ({ ...prevState, playing: false }));
  };

  handelSeekMouseDown = (ev) => {
    this.setState((prevState) => ({ ...prevState, seeking: true }));
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

  handleProgress = (state) => {
    // console.log("onProgress");
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) this.setState(state);
  };

  handleDuration = (duration) => {
    console.log('onDuration', duration);
    this.setState((prevState) => ({ ...prevState, duration: duration }));
  };

  render() {
    const { playing, controls, volume, muted, played, loaded, duration } = this.state;
    const { currSongs, setSongIdx } = this.props;

    // const { videoId } = this.props.currSongs[0].id;
    // const { img } = this.props.currSongs[0].imgUrl;
    // const { videoId } = this.props.currSongs[0]._id;
    // console.log('currSongs', this.props.currSongs[0].id);
    const videoId = '04854XqcfCY';
    let url = `https://www.youtube.com/watch?v=${videoId}`;
    // let url = `https://www.youtube.com/watch?v=${currSongs[setSongIdx]?.id}`;

    // const { videoId } = this.props;
    // let url = `https://www.youtube.com/watch?v=${videoId}`;

    return (
      <section className='player-container'>
        <ReactPlayer
          ref={this.ref}
          className='react-player'
          width='0px'
          height='0px'
          url={url}
          playing={playing}
          controls={controls}
          volume={volume}
          muted={muted}
          onReady={() => console.log('onReady')}
          onStart={() => console.log('onStart')}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onBuffer={() => console.log('onBuffer')}
          onSeek={(e) => console.log('onSeek', e)}
          onEnded={this.handleEnded}
          onError={(e) => console.log('onError', e)}
          onProgress={this.handleProgress}
          onDuration={this.handleDuration}
        />

        <div className='player-info-container'>
          <i className='far fa-heart'></i>
          <img
            src='https://www.udiscovermusic.com/wp-content/uploads/2019/05/Queen-Hot-Space-album-cover-820.jpg'
            alt='image'
          />
          <p>Queen -We are the champions</p>
          {/* <p>currSongs[setSongIdx].title</p> */}
        </div>

        <div className='player-tools'>
          <div className='player-center-btns'>
            <button className='prev-next'>
              <IoIosArrowBack />
            </button>

            <button className='play-pause' onClick={this.handlePlayPause}>
              {!playing ? <FaPlay className='play' /> : <FaPause />}
            </button>

            <button className='prev-next'>
              <IoIosArrowForward />
            </button>
          </div>

          {/**current time */}
          <div className='duration-progress-container'>
            <Duration seconds={duration * played} />

            {/**progres bar */}

            <input
              type='range'
              className='progress-bar'
              min={0}
              max={0.999999}
              step='any'
              value={played}
              onMouseDown={this.onMouseDown}
              onChange={this.handleSeekChange}
              onMouseUp={this.handleSeekMouseUp}
            />

            {/**duration */}

            <Duration seconds={duration} />
          </div>
        </div>

        <div className='volume-container'>
          <FaVolumeUp className='volume' />
          <input
            type='range'
            min={0}
            max={1}
            step='any'
            value={volume}
            onChange={this.handleVolumeChange}
          />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  console.log(' 🎵 state props musicPLayer', state);
  return {
    player: state.musicPlayerModule.player,
    isPlaying: state.musicPlayerModule.isPlaying,
    currSongIdx: state.musicPlayerModule.currSongId,
    // currStationIdx: state.stationModule.currStationId,
    currSongs: state.musicPlayerModule.currSongs,
  };
}

const mapDispatchToProps = {
  setSongIdx,
  setPlayer,
  loadSongsToPlayer,
  onTogglePlay,
  // onTogglePlay,
  // onLikeTrack,
  // onUnlikeTrack,
};

export const MusicPlayer = connect(mapStateToProps, mapDispatchToProps)(_MusicPlayer);
