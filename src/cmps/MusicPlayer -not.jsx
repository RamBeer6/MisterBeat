import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
// import ReactPlayer from 'react-player/lazy';
import ReactPlayer from 'react-player/youtube';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';

/*********************OBJECT DATA **************************/
//https://www.youtube.com/watch?v=04854XqcfCY
//https://youtu.be/04854XqcfCY

//DURATION :  event.target.playerInfo.duration
//PLAYERSTATE: event.target.playerInfo.PlayerState       - 1 is playing, 2 - not playin
// AUTHOR: event.target.playerInfo.videoData.author
// TITLE: event.target.playerInfo.videoData.title
// ID: event.target.playerInfo.videoData.video_id
// VOLUME: event.target.playerInfo.volume

//STATUS:
//-1 – unstarted
//0 – ended
//1 – playing
//2 – paused
//3 – buffering
//5 – video cued

// more possible relevant: setVolume, setShuffle, pauseVideo, playVideo etc.

/*********************OBJECT DATA **************************/
export class MusicPlayer extends React.Component {
  state = {
    isPlaying: false,
  };

  videoOnReady(event) {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();

    // event.target.playVideoAt();
    event.target.playVideo();
    event.target.seekTo(50);
    // this.setState({
    //   playerObj: event.target,
    // });
    console.log('🚀 Music Player - event.target', event.target);
    console.log('🚀 Music Player INFO - event.target INFO', event.target.playerInfo);
  }

  videoOnPlay(event) {
    // access to player in all event handlers via event.target
    event.target.playVideo();

    console.log('🚀 Music Player - currentTime', event.target.getCurrentTime());
  }

  videoOnPause(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    console.log('🚀 Music Player - currentTime', event.target.getCurrentTime());
  }

  //   componentWillUnmount() {
  //     const { playerObj } = this.state;
  //     console.log(playerObj.target.getCurrentTime());
  //   }

  togglePlayPause = () => {
    // console.log('isplaying', this.state.isPlaying);
    this.setState((prevState) => ({ ...prevState, isPlaying: !this.state.isPlaying }));
    // this.state.isPlaying ? this.videoOnPlay() : this.videoOnPause();
    // this.setState(prevState=>({ ...: !this.state.isPlaying });
  };

  render() {
    const { videoId } = this.props;
    const { isPlaying } = this.state;

    if (!videoId) return <h1>Loading...</h1>;

    return (
      <div>
        <YouTube
          videoId={videoId}
          onReady={this.videoOnReady}
          onPlay={this.videoOnPlay}
          opts={{
            playerVars: {
              origin: 'http://localhost:3000',
            },
          }}
        />

        <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />

        <div className='music-player'>
          <button className='prev-next'>
            <IoIosArrowBack />
          </button>

          <button className='play-pause' onClick={this.togglePlayPause}>
            {isPlaying ? <FaPlay className='play' /> : <FaPause />}
          </button>

          <button className='prev-next'>
            <IoIosArrowForward />
          </button>

          {/**current time */}
          <div className='curr-time'>0:00</div>

          {/**progres bar */}
          <div>
            <input type='range' className='progress-bar' />
          </div>

          {/**duration */}
          <div className='duration'>2:49</div>
        </div>
      </div>
    );
  }
}
