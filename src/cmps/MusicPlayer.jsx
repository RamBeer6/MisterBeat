import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'
// import ReactPlayer from 'react-player/lazy';
import ReactPlayer from 'react-player/youtube'
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'
import { FaVolumeUp } from 'react-icons/fa'
import Duration from './Duration'

import { setPlayer } from '../store/actions/music.player.action'

class _MusicPlayer extends React.Component {
  state = {
    playing: false,
    controls: false,
    volume: 0.3,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
  }

  componentDidMount() {
    this.setState((prevState) => ({
      ...prevState,
      playing: !this.state.playing,
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currSongId !== this.props.currSongId && this.props.currSongId === ''){
      this.handlePause()
    }
  }

  onReady = (ev) => {
    this.props.setPlayer(ev.target)
  }

  ref = (player) => {
    this.player = player
  }

  handlePlayPause = () => {
    this.setState((prevState) => ({
      ...prevState,
      playing: !this.state.playing,
    }))
  }

  handleVolumeChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      volume: parseFloat(event.target.value),
    }))
  }

  handlePlay = () => {
    this.setState((prevState) => ({ ...prevState, playing: true }))
  }

  handlePause = () => {
    this.setState((prevState) => ({ ...prevState, playing: false }))
  }

  handelSeekMouseDown = (ev) => {
    this.setState((prevState) => ({ ...prevState, seeking: true }))
  }

  handleSeekChange = (ev) => {
    this.setState((prevState) => ({
      ...prevState,
      played: parseFloat(ev.target.value),
    }))
  }

  handleSeekMouseUp = (ev) => {
    this.setState((prevState) => ({ ...prevState, seeking: false }))
    this.player.seekTo(parseFloat(ev.target.value))
  }

  handleProgress = (state) => {
    if (!this.state.seeking) this.setState(state)
  }

  handleDuration = (duration) => {
    this.setState((prevState) => ({ ...prevState, duration: duration }))
  }

  render() {
    const { playing, controls, volume, muted, played, loaded, duration } =
      this.state
    // const { videoId } = this.props
    const videoId  = this.props.currSongId
    let url = `https://www.youtube.com/watch?v=${videoId}`
    console.log('currSongId:' , this.props.currSongId);

    return (
      <section className="player-container">
        <ReactPlayer
          ref={this.ref}
          className="react-player"
          width="0px"
          height="0px"
          url={url}
          playing={playing}
          controls={controls}
          volume={volume}
          muted={muted}
          onReady={this.onReady}
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

        <div className="player-info-container">
          <i className="far fa-heart"></i>
          <img
            src="https://www.udiscovermusic.com/wp-content/uploads/2019/05/Queen-Hot-Space-album-cover-820.jpg"
            alt="image"
          />
          <p>Queen -We are the champions</p>
          {/* <p>currSongs[setSongIdx].title</p> */}
        </div>

        <div className="player-tools">
          <div className="player-center-btns">
            <button className="prev-next">
              <IoIosArrowBack />
            </button>

            <button className="play-pause" onClick={this.handlePlayPause}>
              {!playing ? <FaPlay className="play" /> : <FaPause />}
            </button>

            <button className="prev-next">
              <IoIosArrowForward />
            </button>
          </div>

          {/**current time */}
          <div className="duration-progress-container">
            <Duration seconds={duration * played} />

            {/**progres bar */}

            <input
              type="range"
              className="progress-bar"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={this.onMouseDown}
              onChange={this.handleSeekChange}
              onMouseUp={this.handleSeekMouseUp}
            />

            {/**duration */}

            <Duration seconds={duration} />
          </div>
        </div>

        <div className="volume-container">
          <FaVolumeUp className="volume" />
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={this.handleVolumeChange}
          />
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    player: state.musicPlayerModule.player,
    isPlaying: state.musicPlayerModule.isPlaying,
    currSongIdx: state.musicPlayerModule.currSongIdx,
    currSongId: state.musicPlayerModule.currSongId,
    currStationId: state.musicPlayerModule.currStationId
  }
}

const mapDispatchToProps = {
  setPlayer
}

export const MusicPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MusicPlayer)
