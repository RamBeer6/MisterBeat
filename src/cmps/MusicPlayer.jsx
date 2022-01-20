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

export class MusicPlayer extends React.Component {
  state = {
    // url: null, FROM PROPS I THINK
    playing: true,
    controls: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
  };

  componentDidMount() {
    // this.setState((prevState) => ({ ...prevState, playing: !this.state.playing }));
  }

  ref = (player) => {
    this.player = player;
  }

  handlePlayPause = () => {
    this.setState((prevState) => ({ ...prevState, playing: !this.state.playing }));
  };

  handleVolumeChange = (event) => {
    this.setState((prevState) => ({ ...prevState, volume: parseFloat(event.target.value) }));
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
    this.setState((prevState) => ({ ...prevState, played: parseFloat(ev.target.value) }));
  };

  handleSeekMouseUp = (ev) => {
    this.setState((prevState) => ({ ...prevState, seeking: false }));
    this.player.seekTo(parseFloat(ev.target.value));
  };

  handleProgress = (state) => {
    console.log('onProgress');
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) this.setState(state);
  };

  handleDuration = (duration) => {
    console.log('onDuration', duration);
    this.setState((prevState) => ({ ...prevState, duration: duration }));
  };

  render() {
    const { playing, controls, volume, muted, played, loaded, duration } = this.state;
    const { videoId } = this.props;
    let url = `https://www.youtube.com/watch?v=${videoId}`;

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

        <div className='player-info-container'>img, s</div>

        <div className='player-tools'>
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
        <div className='progress-bar-container'>
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
