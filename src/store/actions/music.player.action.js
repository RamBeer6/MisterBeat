export function playSong(songId, songIdx) {
  return (dispatch) => {
    dispatch({
      type: 'SET_SONG',
      currSongId: songId,
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
  console.log('ACTION - is PLAYING', isPlaying);
  return async (dispatch) => {
    dispatch({
      type: 'TOGGLE_ISPLAYING',
      isPlaying,
    });
  };
}

export function setPlayerSongs(songsArray) {
  console.log('songsArray', songsArray);
  return async (dispatch) => {
    dispatch({
      type: 'SET_PLAYER_SONGS',
      songsArray,
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
