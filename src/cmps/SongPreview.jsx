import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { BarWave } from "../cmps/BarWave";

import { userService } from '../services/user.service';

import { playSong, pauseSong, onTogglePlay, songDetails } from '../store/actions/music.player.action';
import { onSetMsg, likeSong, unlikeSong } from '../store/actions/user.action';
import { likeSongActivity } from '../store/actions/activity.log.action';

function _SongPreview(props) {
  const [isHover, setIsHover] = useState(false);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(user.likedSongs.find((likedSong) => likedSong.id === song.id));
  }, []);

  useEffect(() => {
    if (!props.isPlaying) {
      setIsSongPlaying(false);
    }
  }, [props.isPlaying]);

  useEffect(() => {
    if (song.id === props.currSongId) {
      setIsSongPlaying(true);
    } else {
      setIsSongPlaying(false);
    }
  }, [props.currSongId]);

  const onPlaySong = async (songId, songIdx) => {
    try {
      setIsSongPlaying(true); //this comp
      props.onTogglePlay(true); //the store
      props.songDetails(props.song);
      await props.playSong(songId, songIdx);
    } catch (err) {
      console.log(err);
    }
  };

  const onPauseSong = async () => {
    try {
      props.onTogglePlay(false); //the store
      setIsSongPlaying(false); //this comp
    } catch (err) {
      console.log(err);
    }
  };

  const setLikeSong = async () => {
    let guest = userService.getLoggedinUser();
    console.log('setLikeSong' , guest._id);
    if (!guest._id) return;
    setIsLiked(true);
    const user = props.user;
    try {
      await props.likeSong(song, user)
      props.onSongActivity(song, user)
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

  const { song, idx, onRemoveSong, user } = props;
  const { songs, currSongId, isPlaying } = props;
  
  return (
    <div>
      <Draggable draggableId={song.id} index={idx}>
        {(provided) => (
          <section
            className="song-preview"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isHover && !isSongPlaying && (
              <button
                className="play-btn"
                onClick={() => onPlaySong(song.id, idx)}
              >
                <svg
                  height="18"
                  role="img"
                  width="18"
                  viewBox="0 0 24 24"
                  className="UIBT7E6ZYMcSDl1KL62g"
                >
                  <polygon
                    points="21.57 12 5.98 3 5.98 21 21.57 12"
                    fill="currentColor"
                  ></polygon>
                </svg>
              </button>
            )}
            {isHover && isSongPlaying && (
              <button className="pause-btn" onClick={() => onPauseSong()}>
                <svg
                  height="18"
                  role="img"
                  width="18"
                  viewBox="0 0 24 24"
                  className="UIBT7E6ZYMcSDl1KL62g"
                >
                  <rect
                    x="5"
                    y="3"
                    width="4"
                    height="18"
                    fill="currentColor"
                  ></rect>
                  <rect
                    x="15"
                    y="3"
                    width="4"
                    height="18"
                    fill="currentColor"
                  ></rect>
                </svg>
              </button>
            )}
            {!isHover && isSongPlaying && <BarWave />}
            {!isHover && !isSongPlaying && <h4 className="gray">{idx + 1}</h4>}
            <div className="song-info">
              <div className="song-info-img"><img src={song.imgUrl} /></div>
              <div>
                <h4>{song.title}</h4>
                <h4 className="small gray">{song.artist}</h4>
              </div>
            </div>
            <h4 className="small gray">{song.album}</h4>
            {/* <h4 className="small gray">{song.duration}</h4> */}
            <div className="song-actions">
              {!isLiked ? (
                <button className="like-btn" onClick={setLikeSong}>
                  <svg
                    className="unliked"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                  </svg>
                </button>
              ) : (
                <button className="like-btn" onClick={setUnlikeSong}>
                  <svg
                    className="liked"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                  </svg>
                </button>
              )}
              <h4 className="small gray">{song.duration}</h4>
              {isHover && !props.fromLikedSong && (
                <button
                  className="remove-btn"
                  onClick={() => onRemoveSong(song.id, song.title)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              )}
            </div>
          </section>
        )}
      </Draggable>
    </div>
  );
  // }
}

function mapStateToProps(state) {
  return {
    songs: state.stationModule.songs,
    player: state.musicPlayerModule.player,
    isPlaying: state.musicPlayerModule.isPlaying,
    currSongIdx: state.musicPlayerModule.currSongIdx,
    currSongId: state.musicPlayerModule.currSongId,
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
  songDetails,
  likeSongActivity
};

export const SongPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SongPreview);
