export function playSong(songId, songIdx) {
  // console.log('ACTION songId', songId);
  return (dispatch) => {
    dispatch({
      type: 'SET_SONG',
      currSongId: songId,
    });
  };
}

export function songIdx(currSongIdx) {
  // console.log('songIdx ACTION', currSongIdx);
  return (dispatch) => {
    dispatch({
      type: 'SET_IDX_SONG',
      currSongIdx,
    });
  };
}

export function pauseSong(songId, songIdx) {
  return (dispatch) => {
    dispatch({
      type: 'PAUSE_SONG',
      currSongId: songId,
    });
  };
}

export function setPlayer(player) {
  return (dispatch) => {
    dispatch({
      type: 'SET_PLAYER',
      player,
    });
  };
}

export function onTogglePlay(isPlaying) {
  // console.log('ACTION - is PLAYING', isPlaying);
  return async (dispatch) => {
    dispatch({
      type: 'TOGGLE_ISPLAYING',
      isPlaying,
    });
  };
}

export function setPlayerSongs(currSongs, currStationId) {
  // console.log('ACTION - songsArray', currSongs);
  return async (dispatch) => {
    dispatch({
      type: 'SET_PLAYER_SONGS',
      currSongs,
      currStationId,
    });
  };
}

export function shuffleCurrSongs(shuffleSongs) {
  return async (dispatch) => {
    dispatch({
      type: 'SET_SHUFFLE_SONGS',
      shuffleSongs,
    });
  };
}

export function shuffle(isShuffle) {
  return async (dispatch) => {
    dispatch({
      type: 'SET_SHUFFLE',
      isShuffle,
    });
  };
}

export function songDetails(songDetails) {
  return async (dispatch) => {
    dispatch({
      type: 'SET_SONG_OBJECT',
      songDetails,
    });
  };
}

// export function playSong(songIdx) {
//   console.log('action songIdx:' , songIdx);
//   return (dispatch) => {
//     dispatch({
//       type: 'SET_SONG',
//       currSongIdx: songIdx
//     })
//   }
// }

// export function setSongIdx(idx) {
//   return (dispatch) => {
//     dispatch({
//       type: 'SET_SONG',
//       currSongIdx: idx,
//     })
//   }
// }

// export function loadSongsToPlayer(songs) {
//   return (dispatch) => {
//     dispatch({
//       type: 'SET_SONGS_TO_PLAYER',
//       songs,
//     })
//   }
// }
